#!/usr/bin/env python3
"""Reusable 2N LAN discovery and guarded commissioning helpers."""

from __future__ import annotations

import hashlib
import ipaddress
import json
import os
import tempfile
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Iterable, Optional
from xml.etree import ElementTree

import requests
from requests.auth import HTTPBasicAuth, HTTPDigestAuth


DEFAULT_TIMEOUT = (1.0, 3.0)
MAX_DISCOVERY_HOSTS =1024
CHECKPOINT_VERSION = 1


class DeviceError(RuntimeError):
    """Base error for a device operation."""


class AuthenticationError(DeviceError):
    """The device rejected the supplied HAPI credentials."""


class PermissionError(DeviceError):
    """The HAPI account lacks a required privilege."""


class DeviceResponseError(DeviceError):
    """The endpoint returned an unexpected response."""


def _content_type(response: requests.Response) -> str:
    return response.headers.get("Content-Type", "<missing>").split(";", 1)[0].strip()


def _api_error(response: requests.Response) -> Optional[str]:
    try:
        body = response.json()
    except (ValueError, TypeError):
        return None
    if not isinstance(body, dict) or body.get("success") is not False:
        return None
    error = body.get("error")
    if not isinstance(error, dict):
        return "2N API reported an unspecified error"
    code = error.get("code", "unknown")
    description = error.get("description", "unspecified error")
    parameter = error.get("param")
    suffix = f" (parameter: {parameter})" if parameter else ""
    return f"2N API error {code}: {description}{suffix}"


def _api_error_code(response: requests.Response) -> Optional[int]:
    try:
        body = response.json()
        error = body.get("error", {})
        return int(error["code"]) if body.get("success") is False else None
    except (ValueError, TypeError, KeyError):
        return None


def _parse_config(config_xml: bytes):
    parser = ElementTree.XMLParser(
        target=ElementTree.TreeBuilder(insert_comments=True)
    )
    return ElementTree.fromstring(config_xml, parser=parser)


@dataclass(frozen=True)
class DeviceInfo:
    ip: str
    model: str
    device_name: str
    serial_number: str
    mac_address: str
    firmware_version: str
    hardware_version: str
    online: bool = True

    @property
    def identity(self) -> str:
        return self.serial_number or self.mac_address or self.ip


@dataclass
class Checkpoint:
    device_ip: str
    device_identity: str
    phase: str
    backup_path: Optional[str] = None
    backup_sha256: Optional[str] = None
    desired_config_sha256: Optional[str] = None
    automation_group: Optional[int] = None
    verified: bool = False
    version: int = CHECKPOINT_VERSION


class TwoNClient:
    """Small HTTP client for documented 2N OS endpoints."""

    def __init__(
        self,
        ip: str,
        username: Optional[str] = None,
        password: Optional[str] = None,
        *,
        verify_tls: bool = True,
        timeout=DEFAULT_TIMEOUT,
        session: Optional[requests.Session] = None,
    ) -> None:
        self.ip = str(ipaddress.ip_address(ip))
        self.base_url = f"https://{self.ip}"
        self.username = username
        self.password = password
        self.verify_tls = verify_tls
        self.timeout = timeout
        self.session = session or requests.Session()

    def _request(self, method: str, path: str, **kwargs) -> requests.Response:
        kwargs.setdefault("timeout", self.timeout)
        kwargs.setdefault("verify", self.verify_tls)
        auth = None
        if self.username is not None:
            auth = HTTPBasicAuth(self.username, self.password or "")

        response = self.session.request(
            method, f"{self.base_url}{path}", auth=auth, **kwargs
        )
        if (
            response.status_code == 401 or _api_error_code(response) in (8, 9)
        ) and self.username is not None:
            response = self.session.request(
                method,
                f"{self.base_url}{path}",
                auth=HTTPDigestAuth(self.username, self.password or ""),
                **kwargs,
            )
        if response.status_code == 401 or _api_error_code(response) in (8, 9):
            raise AuthenticationError("2N rejected the HAPI credentials")
        if response.status_code == 403:
            raise PermissionError("HAPI account lacks the required privilege")
        response.raise_for_status()
        return response

    def get_info(self) -> DeviceInfo:
        response = self._request("GET", "/api/system/info")
        try:
            body = response.json()
            result = body["result"]
        except (ValueError, KeyError, TypeError) as exc:
            raise DeviceResponseError("Not a valid 2N system-info response") from exc

        required = ("variant", "serialNumber", "macAddr", "swVersion")
        if body.get("success") is not True or not all(key in result for key in required):
            raise DeviceResponseError("Response does not identify a 2N device")
        return DeviceInfo(
            ip=self.ip,
            model=str(result.get("variant", "")),
            device_name=str(result.get("deviceName", "")),
            serial_number=str(result.get("serialNumber", "")),
            mac_address=str(result.get("macAddr", "")),
            firmware_version=str(result.get("swVersion", "")),
            hardware_version=str(result.get("hwVersion", "")),
        )

    def download_config(self) -> bytes:
        response = self._request(
            "GET",
            "/api/config",
            params={"encryption": "0", "exportHash": "1"},
            headers={"Accept": "application/xml"},
        )
        content = response.content.lstrip()
        if content.startswith(b"<?xml") or content.startswith(b"<DeviceDatabase"):
            return response.content

        api_error = _api_error(response)
        if api_error:
            raise DeviceResponseError(
                f"{api_error}. GET /api/config requires System Control and the "
                "Enhanced Integration license."
            )

        content_type = _content_type(response)
        if content.startswith((b"<!DOCTYPE html", b"<html")):
            raise DeviceResponseError(
                "GET /api/config returned HTML instead of XML "
                f"(HTTP {response.status_code}, Content-Type {content_type}). "
                "The request may have reached the web login rather than the HAPI function."
            )
        raise DeviceResponseError(
            "GET /api/config returned an unexpected body "
            f"(HTTP {response.status_code}, Content-Type {content_type}, "
            f"{len(response.content)} bytes)."
        )

    def upload_config(self, config_xml: bytes) -> None:
        response = self._request(
            "PUT",
            "/api/config",
            files={"blob-cfg": ("2n-config.xml", config_xml, "application/xml")},
            headers={"Accept": "application/json"},
        )
        try:
            body = response.json()
        except ValueError as exc:
            raise DeviceResponseError("Config upload response was not JSON") from exc
        if body.get("success") is not True:
            raise DeviceResponseError(f"Config upload failed: {body}")


def discover_subnet(
    subnet: str,
    *,
    verify_tls: bool = True,
    timeout=DEFAULT_TIMEOUT,
    workers: int = 32,
) -> list[DeviceInfo]:
    network = ipaddress.ip_network(subnet, strict=False)
    hosts = list(network.hosts())
    if len(hosts) > MAX_DISCOVERY_HOSTS:
        raise ValueError(
            f"Subnet has {len(hosts)} hosts; limit is {MAX_DISCOVERY_HOSTS}. "
            "Use a smaller CIDR."
        )

    found: list[DeviceInfo] = []

    def probe(host) -> Optional[DeviceInfo]:
        try:
            return TwoNClient(
                str(host), verify_tls=verify_tls, timeout=timeout
            ).get_info()
        except (DeviceError, requests.RequestException, ValueError):
            return None

    with ThreadPoolExecutor(max_workers=max(1, workers)) as executor:
        futures = [executor.submit(probe, host) for host in hosts]
        for future in as_completed(futures):
            device = future.result()
            if device is not None:
                found.append(device)

    deduplicated = {device.identity: device for device in found}
    return sorted(deduplicated.values(), key=lambda device: ipaddress.ip_address(device.ip))


def choose_automation_group(config_xml: bytes) -> int:
    root = _parse_config(config_xml)
    groups = root.findall("./Automation/Group")
    for group in groups:
        source_element = group.find("Source")
        if source_element is not None and source_element.get("Encryption"):
            continue
        source = group.findtext("Source", default="").strip()
        if not source or source == '{"title":"","source":[]}':
            return int(group.attrib["At"])
    if any(
        group.find("Source") is not None
        and group.find("Source").get("Encryption")
        for group in groups
    ):
        raise DeviceError(
            "Automation sources are encrypted in this configuration export. "
            "Use a plaintext HAPI export; browser-exported encrypted fields cannot be edited safely."
        )
    raise DeviceError("No empty Automation group is available")


def build_button_automation(webhook_url: str, device_identity: str, token: str) -> str:
    payload = json.dumps(
        {"device": device_identity, "event": "button_pressed", "token": token},
        separators=(",", ":"),
    )
    automation = {
        "title": "Crestron button verification",
        "source": [
            {
                "id": "button",
                "model": "callstatechanged",
                "in": {"istate": "ringing", "idir": "outgoing", "num": "any"},
                "pos": [200, 200],
            },
            {
                "id": "webhook",
                "model": "sendhttprequest",
                "in": {
                    "event": {"id": "button", "pin": "event"},
                    "uri": webhook_url,
                    "method": "POST",
                    "type": "application/json",
                    "text": payload,
                    "verifyservercertificate": False,
                },
                "pos": [600, 200],
            },
        ],
    }
    return json.dumps(automation, separators=(",", ":"))


def set_automation_group(
    config_xml: bytes, group_index: int, source: str, *, enabled_value: str = "1"
) -> bytes:
    root = _parse_config(config_xml)
    group = root.find(f"./Automation/Group[@At='{group_index}']")
    if group is None:
        raise DeviceError(f"Automation group {group_index} does not exist")
    enabled = group.find("Enabled")
    source_element = group.find("Source")
    if enabled is None or source_element is None:
        raise DeviceResponseError("Automation group is missing required fields")
    if source_element.get("Encryption"):
        raise DeviceError(
            "Automation source is encrypted and cannot be replaced safely. "
            "Download a plaintext configuration through HAPI first."
        )
    enabled.text = enabled_value
    source_element.text = source
    return ElementTree.tostring(
        root,
        encoding="utf-8",
        xml_declaration=True,
        short_empty_elements=False,
    )


def get_automation_group(config_xml: bytes, group_index: int) -> dict[str, str]:
    root = _parse_config(config_xml)
    group = root.find(f"./Automation/Group[@At='{group_index}']")
    if group is None:
        raise DeviceError(f"Automation group {group_index} does not exist")
    return {
        "enabled": group.findtext("Enabled", default="0"),
        "source": group.findtext("Source", default=""),
    }


def get_automation_source(config_xml: bytes, group_index: int) -> str:
    return get_automation_group(config_xml, group_index)["source"]


def sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


def write_private_file(path: Path, content: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary = tempfile.mkstemp(prefix=path.name, dir=path.parent)
    try:
        os.fchmod(descriptor, 0o600)
        with os.fdopen(descriptor, "wb") as handle:
            handle.write(content)
        os.replace(temporary, path)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)


def save_checkpoint(path: Path, checkpoint: Checkpoint) -> None:
    serialized = json.dumps(asdict(checkpoint), indent=2, sort_keys=True).encode("utf-8")
    write_private_file(path, serialized)


def load_checkpoint(path: Path) -> Checkpoint:
    data = json.loads(path.read_text(encoding="utf-8"))
    if data.get("version") != CHECKPOINT_VERSION:
        raise DeviceError("Unsupported checkpoint version")
    return Checkpoint(**data)


def device_dicts(devices: Iterable[DeviceInfo]) -> list[dict]:
    return [asdict(device) for device in devices]