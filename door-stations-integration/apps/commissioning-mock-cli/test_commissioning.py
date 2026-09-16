#!/usr/bin/env python3

import json
import sys
import tempfile
import unittest
import urllib.error
import urllib.request
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parent))

from two_n_device import (  # noqa: E402
    Checkpoint,
    DeviceError,
    DeviceInfo,
    DeviceResponseError,
    TwoNClient,
    build_button_automation,
    choose_automation_group,
    discover_subnet,
    get_automation_group,
    get_automation_source,
    load_checkpoint,
    save_checkpoint,
    set_automation_group,
)
from webhook import WEBHOOK_PATH, WebhookServer  # noqa: E402


SAMPLE_CONFIG = b"""<?xml version="1.0"?>
<DeviceDatabase Version="45">
  <WebServer><PasswordHash>keep-me</PasswordHash></WebServer>
  <Automation>
    <Group At="0"><Enabled>1</Enabled><Source>{"title":"occupied"}</Source></Group>
    <Group At="1"><Enabled>0</Enabled><Source>{"title":"","source":[]}</Source></Group>
  </Automation>
</DeviceDatabase>
"""

ENCRYPTED_AUTOMATION_CONFIG = b"""<?xml version="1.0"?>
<DeviceDatabase Version="41">
    <Automation>
        <Group At="0">
            <Enabled>1</Enabled>
            <Source Encryption="3">encrypted-value</Source>
        </Group>
    </Automation>
</DeviceDatabase>
"""


class FakeResponse:
    status_code = 200

    def __init__(self, body, content_type="application/json"):
        self.body = body
        self.content = json.dumps(body).encode("utf-8")
        self.headers = {"Content-Type": content_type}

    def json(self):
        return self.body

    def raise_for_status(self):
        return None


class FakeSession:
    def __init__(self, response):
        self.response = response
        self.calls = []

    def request(self, method, url, **kwargs):
        self.calls.append((method, url, kwargs))
        return self.response


class SequenceSession:
    def __init__(self, responses):
        self.responses = iter(responses)
        self.calls = []

    def request(self, method, url, **kwargs):
        self.calls.append((method, url, kwargs))
        return next(self.responses)


class DeviceClientTests(unittest.TestCase):
    def test_parses_documented_system_info(self):
        response = FakeResponse(
            {
                "success": True,
                "result": {
                    "variant": "2N IP Style",
                    "deviceName": "Front Door",
                    "serialNumber": "12-3456",
                    "macAddr": "00:11:22:33:44:55",
                    "swVersion": "3.2.0",
                    "hwVersion": "v1",
                },
            }
        )
        device = TwoNClient("192.168.1.10", session=FakeSession(response)).get_info()
        self.assertEqual(device.model, "2N IP Style")
        self.assertEqual(device.identity, "12-3456")

    def test_rejects_non_2n_shape(self):
        client = TwoNClient(
            "192.168.1.10",
            session=FakeSession(FakeResponse({"success": True, "result": {}})),
        )
        with self.assertRaises(DeviceResponseError):
            client.get_info()

    def test_subnet_limit_prevents_unbounded_scan(self):
        with self.assertRaisesRegex(ValueError, "Use a smaller CIDR"):
            discover_subnet("10.0.0.0/8")

    def test_config_download_reports_2n_json_error(self):
        response = FakeResponse(
            {
                "success": False,
                "error": {"code": 1, "description": "Function not supported"},
            }
        )
        client = TwoNClient(
            "192.168.1.10",
            "crestron",
            "secret",
            session=FakeSession(response),
        )
        with self.assertRaisesRegex(
            DeviceResponseError,
            "2N API error 1: Function not supported.*Enhanced Integration",
        ):
            client.download_config()

    def test_retries_digest_for_http_200_invalid_auth_method(self):
        basic_error = FakeResponse(
            {
                "success": False,
                "error": {"code": 8, "description": "Invalid authentication method"},
            }
        )
        xml_response = FakeResponse({}, "application/xml")
        xml_response.content = b"<?xml version='1.0'?><DeviceDatabase Version='41'/>"
        session = SequenceSession([basic_error, xml_response])
        client = TwoNClient(
            "192.168.1.10",
            "crestron",
            "secret",
            session=session,
        )
        self.assertEqual(client.download_config(), xml_response.content)
        self.assertEqual(len(session.calls), 2)
        self.assertEqual(session.calls[1][2]["auth"].__class__.__name__, "HTTPDigestAuth")

    def test_config_download_reports_html_login_response(self):
        response = FakeResponse({}, "text/html")
        response.content = b"<!DOCTYPE html><html><title>2N</title></html>"
        client = TwoNClient(
            "192.168.1.10",
            "crestron",
            "secret",
            session=FakeSession(response),
        )
        with self.assertRaisesRegex(DeviceResponseError, "returned HTML instead of XML"):
            client.download_config()

    def test_config_download_accepts_xml_with_leading_whitespace(self):
        response = FakeResponse({}, "application/xml")
        response.content = b"\n <?xml version='1.0'?><DeviceDatabase Version='41'/>"
        client = TwoNClient(
            "192.168.1.10",
            "crestron",
            "secret",
            session=FakeSession(response),
        )
        self.assertEqual(client.download_config(), response.content)

    @patch("two_n_device.TwoNClient.get_info")
    def test_discovery_deduplicates_identity(self, get_info):
        get_info.return_value = DeviceInfo(
            ip="192.168.1.2",
            model="2N IP Style",
            device_name="Front Door",
            serial_number="same-device",
            mac_address="00:11:22:33:44:55",
            firmware_version="3.2.0",
            hardware_version="v1",
        )
        devices = discover_subnet("192.168.1.0/30", workers=2)
        self.assertEqual(len(devices), 1)


class ConfigTests(unittest.TestCase):
    def test_selects_empty_group_without_overwriting_occupied_group(self):
        self.assertEqual(choose_automation_group(SAMPLE_CONFIG), 1)

    def test_rejects_encrypted_browser_export_for_automation_edit(self):
        with self.assertRaisesRegex(DeviceError, "browser-exported encrypted fields"):
            choose_automation_group(ENCRYPTED_AUTOMATION_CONFIG)
        with self.assertRaisesRegex(DeviceError, "cannot be replaced safely"):
            set_automation_group(ENCRYPTED_AUTOMATION_CONFIG, 0, '{"title":"test"}')

    def test_mutation_preserves_unrelated_password_hash(self):
        source = build_button_automation(
            "http://192.168.1.5:8765/webhook/2n", "12-3456", "secret-token"
        )
        changed = set_automation_group(SAMPLE_CONFIG, 1, source)
        self.assertIn(b"<PasswordHash>keep-me</PasswordHash>", changed)
        self.assertEqual(get_automation_source(changed, 0), '{"title":"occupied"}')
        self.assertEqual(get_automation_source(changed, 1), source)

    def test_generated_xml_uses_explicit_empty_tags(self):
        changed = set_automation_group(SAMPLE_CONFIG, 1, '{"title":"test"}')
        self.assertIn(b"<PasswordHash>keep-me</PasswordHash>", changed)
        self.assertIn(b"<DeviceDatabase", changed)
        self.assertNotIn(b"<WebServer />", changed)

    def test_restore_preserves_prior_enabled_state(self):
        previous = get_automation_group(SAMPLE_CONFIG, 1)
        changed = set_automation_group(SAMPLE_CONFIG, 1, '{"title":"test"}')
        restored = set_automation_group(
            changed,
            1,
            previous["source"],
            enabled_value=previous["enabled"],
        )
        self.assertEqual(get_automation_group(restored, 1), previous)

    def test_automation_payload_contains_expected_identity_and_token(self):
        source = json.loads(
            build_button_automation("http://host/webhook/2n", "device-1", "token-1")
        )
        body = json.loads(source["source"][1]["in"]["text"])
        self.assertEqual(body["device"], "device-1")
        self.assertEqual(body["token"], "token-1")


class CheckpointTests(unittest.TestCase):
    def test_checkpoint_round_trip_has_no_secret_fields(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "checkpoint.json"
            original = Checkpoint("192.168.1.10", "12-3456", "hapi-ready")
            save_checkpoint(path, original)
            self.assertEqual(load_checkpoint(path), original)
            text = path.read_text(encoding="utf-8").lower()
            self.assertNotIn("password", text)
            self.assertNotIn("token", text)


class WebhookTests(unittest.TestCase):
    def request(self, server, payload):
        request = urllib.request.Request(
            f"http://127.0.0.1:{server.port}{WEBHOOK_PATH}",
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        return urllib.request.urlopen(request, timeout=2)

    def test_accepts_expected_authenticated_event(self):
        with WebhookServer("127.0.0.1", 0, token="token", expected_device="device") as server:
            response = self.request(
                server,
                {"device": "device", "event": "button_pressed", "token": "token"},
            )
            self.assertEqual(response.status, 200)
            event = server.wait(1)
            self.assertIsNotNone(event)
            self.assertEqual(event.payload["event"], "button_pressed")

    def test_rejects_wrong_token(self):
        with WebhookServer("127.0.0.1", 0, token="right") as server:
            with self.assertRaises(urllib.error.HTTPError) as raised:
                self.request(
                    server,
                    {"device": "device", "event": "button_pressed", "token": "wrong"},
                )
            self.assertEqual(raised.exception.code, 401)
            self.assertIsNone(server.wait(0.01))

    def test_rejects_wrong_device(self):
        with WebhookServer("127.0.0.1", 0, token="token", expected_device="right") as server:
            with self.assertRaises(urllib.error.HTTPError) as raised:
                self.request(
                    server,
                    {"device": "wrong", "event": "button_pressed", "token": "token"},
                )
            self.assertEqual(raised.exception.code, 422)


if __name__ == "__main__":
    unittest.main()