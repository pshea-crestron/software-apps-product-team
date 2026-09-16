#!/usr/bin/env python3
"""CLI prototype for discovering and commissioning 2N door stations."""

from __future__ import annotations

import argparse
import getpass
import json
import secrets
import sys
import time
import webbrowser
from dataclasses import asdict
from pathlib import Path

import requests

from two_n_device import (
    AuthenticationError,
    Checkpoint,
    DeviceError,
    PermissionError,
    TwoNClient,
    build_button_automation,
    choose_automation_group,
    discover_subnet,
    get_automation_group,
    get_automation_source,
    load_checkpoint,
    save_checkpoint,
    set_automation_group,
    sha256_bytes,
    write_private_file,
)
from webhook import WEBHOOK_PATH, WebhookServer


ROOT = Path(__file__).resolve().parent
STATE_DIR = ROOT / ".state"
BACKUP_DIR = ROOT / "backups"
POC_AUTOMATION_GROUP = 0


def print_device(device, json_output: bool = False) -> None:
    if json_output:
        print(json.dumps(asdict(device), indent=2))
        return
    print(f"IP:       {device.ip}")
    print(f"Model:    {device.model}")
    print(f"Name:     {device.device_name or '<not set>'}")
    print(f"Serial:   {device.serial_number}")
    print(f"MAC:      {device.mac_address}")
    print(f"Firmware: {device.firmware_version}")
    print(f"Hardware: {device.hardware_version or '<unknown>'}")


def client_from_args(args, *, credentials: bool = False) -> TwoNClient:
    username = getattr(args, "username", None)
    password = None
    if credentials:
        username = username or input("HAPI username [crestron]: ").strip() or "crestron"
        password = getpass.getpass("HAPI password: ")
    return TwoNClient(
        args.ip,
        username,
        password,
        verify_tls=not args.insecure,
    )


def checkpoint_path(identity: str) -> Path:
    safe = "".join(character for character in identity if character.isalnum() or character in "-_")
    return STATE_DIR / f"{safe}.json"


def command_info(args) -> int:
    device = client_from_args(args).get_info()
    print_device(device, args.json)
    return 0


def command_discover(args) -> int:
    devices = discover_subnet(
        args.subnet,
        verify_tls=not args.insecure,
        timeout=(args.connect_timeout, args.read_timeout),
        workers=args.workers,
    )
    if args.json:
        print(json.dumps([asdict(device) for device in devices], indent=2))
    elif not devices:
        print("No 2N devices found. Check power, subnet/VLAN, firewall, or use info --ip.")
    else:
        for index, device in enumerate(devices):
            if index:
                print()
            print_device(device)
    return 0 if devices else 2


def command_commission(args) -> int:
    read_client = client_from_args(args)
    device = read_client.get_info()
    path = checkpoint_path(device.identity)
    checkpoint = load_checkpoint(path) if args.resume and path.exists() else Checkpoint(
        device_ip=device.ip,
        device_identity=device.identity,
        phase="device-identified",
    )
    save_checkpoint(path, checkpoint)
    print_device(device)

    if checkpoint.phase == "device-identified":
        print("\nComplete these supported steps in the 2N web configuration interface:")
        print("  1. Change the initial administrator password if prompted.")
        print("  2. Create/enable a HAPI account named 'crestron'.")
        print("  3. Grant Camera Monitor, Call Monitor, I/O Monitor, and System Control.")
        if not args.no_browser:
            webbrowser.open(f"https://{device.ip}/")
        input("Press Enter after those web-interface steps are complete...")
        checkpoint.phase = "admin-configured"
        save_checkpoint(path, checkpoint)

    hapi = client_from_args(args, credentials=True)
    try:
        config = hapi.download_config()
    except AuthenticationError:
        print("HAPI authentication failed. Reopen the web UI and correct the account.", file=sys.stderr)
        return 3
    except PermissionError:
        print("HAPI account needs System Control for configuration access.", file=sys.stderr)
        return 4
    except DeviceError as exc:
        print(f"HAPI config download failed: {exc}", file=sys.stderr)
        print(
            "The browser's configuration export is a separate admin-UI path and does not "
            "prove that HAPI GET /api/config is licensed and enabled.",
            file=sys.stderr,
        )
        return 5

    backup_path = BACKUP_DIR / f"{device.identity}-before.xml"
    if not backup_path.exists():
        write_private_file(backup_path, config)
    checkpoint.phase = "hapi-ready"
    checkpoint.backup_path = str(backup_path.relative_to(ROOT))
    checkpoint.backup_sha256 = sha256_bytes(config)
    save_checkpoint(path, checkpoint)
    print(f"HAPI verified. Current config backed up to {backup_path.relative_to(ROOT)}")
    print("\nCommissioning bootstrap complete. No webhook has been written yet.")
    print("Next, install the test webhook and wait for a physical button press:")
    print(
        f"  {Path(sys.argv[0]).name} verify-button --ip {device.ip} "
        "--listen-ip <this-mac-lan-ip> --insecure --apply"
    )
    return 0


def command_listen_webhook(args) -> int:
    print(f"Listening on http://{args.listen_ip}:{args.port}{WEBHOOK_PATH}")
    print("This command does not configure the 2N device. Its Automation rule must already POST here.")
    print(f"Expected JSON token: {args.token}")
    with WebhookServer(
        args.bind_ip,
        args.port,
        token=args.token,
        expected_device=args.device,
    ) as receiver:
        event = receiver.wait(args.event_timeout)
        if event is None:
            print("No matching event arrived before the timeout.")
            return 5
        print(json.dumps({
            "payload": event.payload,
            "source_ip": event.source_ip,
            "received_at": event.received_at,
        }, indent=2))
    return 0


def command_verify_button(args) -> int:
    client = client_from_args(args, credentials=True)
    device = client.get_info()
    path = checkpoint_path(device.identity)
    checkpoint = load_checkpoint(path) if path.exists() else Checkpoint(
        device_ip=device.ip,
        device_identity=device.identity,
        phase="device-identified",
    )
    current_config = client.download_config()
    group_index = POC_AUTOMATION_GROUP
    if args.resume and checkpoint.automation_group not in (None, POC_AUTOMATION_GROUP):
        print(
            f"Ignoring legacy checkpoint group {checkpoint.automation_group}; "
            f"the POC now uses Automation group {POC_AUTOMATION_GROUP}.",
            file=sys.stderr,
        )
    previous_group = get_automation_group(current_config, group_index)
    token = secrets.token_urlsafe(24)
    webhook_url = f"http://{args.listen_ip}:{args.port}{WEBHOOK_PATH}"
    automation = build_button_automation(webhook_url, device.identity, token)
    desired_config = set_automation_group(current_config, group_index, automation)

    checkpoint.phase = "webhook-pending"
    checkpoint.automation_group = group_index
    checkpoint.desired_config_sha256 = sha256_bytes(desired_config)
    restore_path = BACKUP_DIR / f"{device.identity}-automation-{group_index}.txt"
    if not restore_path.exists():
        write_private_file(
            restore_path,
            json.dumps(previous_group, indent=2, sort_keys=True).encode("utf-8"),
        )
    save_checkpoint(path, checkpoint)

    with WebhookServer(
        args.bind_ip,
        args.port,
        token=token,
        expected_device=device.identity,
    ) as receiver:
        print(f"Webhook receiver listening at {webhook_url}")
        if args.apply:
            upload_error = None
            try:
                client.upload_config(desired_config)
                print("Configuration accepted. Allow approximately 15 seconds for it to apply.")
            except requests.RequestException as exc:
                upload_error = exc
                print("Upload response was lost; checking live configuration before retrying.")
            time.sleep(args.apply_wait)
            try:
                live_config = client.download_config()
            except requests.RequestException:
                if upload_error is not None:
                    raise DeviceError(
                        "Upload outcome is unknown and the device is unreachable. Resume later; do not upload again yet."
                    ) from upload_error
                raise
            if get_automation_source(live_config, group_index) != automation:
                if upload_error is not None:
                    raise DeviceError(
                        "Upload failed and the desired webhook is absent from live config. It is safe to resume."
                    ) from upload_error
                raise DeviceError("Webhook config was not present after upload")
            checkpoint.phase = "config-applied-unverified"
            save_checkpoint(path, checkpoint)
        else:
            preview = BACKUP_DIR / f"{device.identity}-webhook-preview.xml"
            write_private_file(preview, desired_config)
            print(f"Dry run only. Review {preview.relative_to(ROOT)} and rerun with --apply.")
            return 0

        print("Press the physical 2N call button now.")
        started = time.time()
        event = receiver.wait(args.event_timeout)
        if event is None:
            print("No matching event arrived. State is preserved; no reset or re-upload was attempted.")
            return 5
        checkpoint.phase = "verified"
        checkpoint.verified = True
        save_checkpoint(path, checkpoint)
        print(json.dumps({
            "payload": event.payload,
            "source_ip": event.source_ip,
            "received_at": event.received_at,
            "wait_seconds": round(event.received_at - started, 3),
            "automation_group": group_index,
        }, indent=2))
        print(f"Restore the prior group with: {Path(sys.argv[0]).name} restore-webhook --ip {device.ip} --group {group_index} --apply")
    return 0


def command_restore_webhook(args) -> int:
    client = client_from_args(args, credentials=True)
    device = client.get_info()
    restore_path = BACKUP_DIR / f"{device.identity}-automation-{args.group}.txt"
    if not restore_path.exists():
        raise DeviceError(f"No saved Automation group at {restore_path}")
    current_config = client.download_config()
    previous_group = json.loads(restore_path.read_text(encoding="utf-8"))
    restored = set_automation_group(
        current_config,
        args.group,
        previous_group["source"],
        enabled_value=previous_group["enabled"],
    )
    if not args.apply:
        print("Dry run. Add --apply to restore the saved Automation group.")
        return 0
    client.upload_config(restored)
    print(f"Restore accepted for Automation group {args.group}; verify after the apply interval.")
    return 0


def add_connection_arguments(parser) -> None:
    parser.add_argument("--ip", required=True, help="2N device IPv4 address")
    parser.add_argument("--insecure", action="store_true", help="Allow the device's self-signed TLS certificate")


def add_credentials(parser) -> None:
    parser.add_argument("--username", help="HAPI username; password is always prompted")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="command", required=True)

    discover = subparsers.add_parser("discover", help="Probe a bounded subnet for 2N devices")
    discover.add_argument("--subnet", required=True, help="IPv4 CIDR, for example 192.168.1.0/24")
    discover.add_argument("--workers", type=int, default=32)
    discover.add_argument("--connect-timeout", type=float, default=0.5)
    discover.add_argument("--read-timeout", type=float, default=1.5)
    discover.add_argument("--insecure", action="store_true")
    discover.add_argument("--json", action="store_true")
    discover.set_defaults(handler=command_discover)

    info = subparsers.add_parser("info", help="Read identity from a known device")
    add_connection_arguments(info)
    info.add_argument("--json", action="store_true")
    info.set_defaults(handler=command_info)

    commission = subparsers.add_parser("commission", help="Guide admin/HAPI bootstrap and create a checkpoint")
    add_connection_arguments(commission)
    add_credentials(commission)
    commission.add_argument("--resume", action="store_true")
    commission.add_argument("--no-browser", action="store_true")
    commission.set_defaults(handler=command_commission)

    verify = subparsers.add_parser("verify-button", help="Install a test webhook and wait for a physical press")
    add_connection_arguments(verify)
    add_credentials(verify)
    verify.add_argument("--listen-ip", required=True, help="LAN IP advertised to the 2N device")
    verify.add_argument("--bind-ip", default="0.0.0.0")
    verify.add_argument("--port", type=int, default=8765)
    verify.add_argument("--resume", action="store_true")
    verify.add_argument("--event-timeout", type=float, default=60)
    verify.add_argument("--apply-wait", type=float, default=15)
    verify.add_argument("--apply", action="store_true", help="Actually upload the reviewed config")
    verify.set_defaults(handler=command_verify_button)

    listen = subparsers.add_parser(
        "listen-webhook",
        help="Run only the webhook receiver for an already-configured device",
    )
    listen.add_argument("--listen-ip", required=True, help="LAN IP shown in the webhook URL")
    listen.add_argument("--bind-ip", default="0.0.0.0")
    listen.add_argument("--port", type=int, default=8765)
    listen.add_argument("--token", required=True, help="Token expected in the JSON body")
    listen.add_argument("--device", help="Expected device serial or identifier")
    listen.add_argument("--event-timeout", type=float, default=300)
    listen.set_defaults(handler=command_listen_webhook)

    restore = subparsers.add_parser("restore-webhook", help="Restore the Automation group saved by verify-button")
    add_connection_arguments(restore)
    add_credentials(restore)
    restore.add_argument("--group", required=True, type=int)
    restore.add_argument("--apply", action="store_true")
    restore.set_defaults(handler=command_restore_webhook)
    return parser


def main() -> int:
    args = build_parser().parse_args()
    if getattr(args, "insecure", False):
        requests.packages.urllib3.disable_warnings()
        print("WARNING: TLS certificate verification is disabled.", file=sys.stderr)
    try:
        return args.handler(args)
    except (DeviceError, requests.RequestException, ValueError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    except KeyboardInterrupt:
        print("\nCancelled. Non-secret checkpoint state was preserved.", file=sys.stderr)
        return 130


if __name__ == "__main__":
    raise SystemExit(main())