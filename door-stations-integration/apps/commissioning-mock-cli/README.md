# 2N Commissioning Mock CLI

This is a guarded Python prototype for discovering a 2N door station, reading its identity, guiding initial administrator and HAPI account setup, and verifying a physical call-button event through a temporary LAN webhook.

The sample does not change the 2N web administrator password through an undocumented API. It opens the supported 2N web configuration interface and asks the installer to complete that step there.

## Setup

Use a Python virtual environment. The `urllib3<2` constraint supports the LibreSSL-linked Python currently installed on the development Mac.

```bash
cd apps/commissioning-mock-cli
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements.txt
```

## Discover and inspect

Discovery deliberately requires a bounded CIDR. Use `--insecure` for a lab device with its default self-signed certificate.

```bash
python3 cli.py discover --subnet 192.168.1.0/24 --insecure
python3 cli.py info --ip 192.168.1.78 --insecure
```

Discovery probes documented `GET /api/system/info` and identifies a device from the shape of the 2N response. A subnet larger than 1,024 usable hosts is rejected.

## Commissioning bootstrap

```bash
python3 cli.py commission --ip 192.168.1.78 --insecure
```

The command:

1. Reads and displays device identity.
2. Opens the 2N web configuration interface.
3. Asks the installer to complete the initial administrator-password step.
4. Asks the installer to create a `crestron` HTTP API account with Camera Monitor, Call Monitor, I/O Monitor, and System Control.
5. Prompts for that HAPI password without echoing it.
6. Verifies `GET /api/config` access and writes a private local backup.
7. Saves a non-secret checkpoint under `.state/`.

Resume an interrupted flow with:

```bash
python3 cli.py commission --ip 192.168.1.78 --insecure --resume
```

A failed HAPI login does not require a factory reset. Reopen the web UI, correct the HAPI account or privileges, and resume. A factory reset is reserved for loss of all administrative access, unrecoverable configuration corruption, or a vendor-directed recovery procedure.

`GET /api/config` is separate from the browser's configuration-download action. The HAPI function requires System Control and an Enhanced Integration license. A device can successfully download configuration in the browser while HAPI returns a JSON error. The CLI reports the 2N error code and description when this occurs.

## Verify a physical button press

First run a dry run. It creates a reviewable candidate XML file without changing the device:

```bash
python3 cli.py verify-button \
  --ip 192.168.1.78 \
  --listen-ip 192.168.1.20 \
  --insecure
```

Review the generated file under `backups/`. Then rerun with `--apply`:

```bash
python3 cli.py verify-button \
  --ip 192.168.1.78 \
  --listen-ip 192.168.1.20 \
  --insecure \
  --apply
```

The command starts an HTTP receiver on port `8765`, installs a test Automation rule in fixed POC group `0`, verifies the rule after the documented apply interval, and waits for a physical call-button press. Repeated POC runs replace group `0` instead of consuming additional groups. The event body contains an unguessable per-run token and the expected device serial number. The receiver rejects the wrong path, token, event, device identity, malformed JSON, and bodies over 16 KiB.

If the process is interrupted after it owns an Automation group, rerun the same command with `--resume --apply`. It reuses that group and preserves the first restore record rather than treating the temporary test rule as the original configuration.

`--listen-ip` must be the Mac's LAN address reachable from the door station, not `127.0.0.1` or `localhost`. macOS may prompt to permit incoming connections. This prototype uses HTTP on the local lab network; it is not the production webhook security design.

Restore the prior Automation group after testing:

```bash
python3 cli.py restore-webhook \
  --ip 192.168.1.78 \
  --group 1 \
  --insecure \
  --apply
```

The saved restore record includes both the prior Automation source and its enabled state. The tool never overwrites a non-empty group automatically.

`verify-button` always uses group `0`. The `--group` option on `restore-webhook` remains available only to clean up groups created by earlier POC versions.

## Run only the webhook receiver

Use this only after the 2N device already has an Automation rule that sends the expected JSON body to the receiver:

```bash
python3 cli.py listen-webhook \
  --listen-ip 192.168.1.20 \
  --token my-test-token \
  --device 54-6719-0271
```

The matching Automation payload is:

```json
{"device":"54-6719-0271","event":"button_pressed","token":"my-test-token"}
```

Starting `listen-webhook` does not configure the door station. For the normal POC flow, use `verify-button --apply`; it creates a temporary token, writes the matching Automation rule, starts the receiver, and prompts for the physical button press in one command.

## Failure behavior

| Failure | Result | Recovery |
| --- | --- | --- |
| Device not discovered | No device mutation | Check power, VLAN/subnet, firewall, or use `info --ip` |
| HAPI returns 401 | Checkpoint retained | Correct username/password in the 2N web UI and resume |
| HAPI lacks System Control | Checkpoint retained | Grant System Control and resume |
| Enhanced Integration/Automation license missing | Upload rejected; checkpoint retained | Install the license and retry |
| Upload response is lost | Outcome remains unverified | Download and compare live config before another upload |
| Button event times out | Installed state retained | Check listener IP/firewall, press again, or restore the group |
| Process is interrupted | Non-secret checkpoint and restore record retained | Resume or run `restore-webhook` |

## Tests

Tests mock device HTTP behavior and use only a loopback webhook receiver.

```bash
python3 -m unittest discover -s . -p 'test_*.py' -v
```

## Current prototype boundaries

- Automatic active-interface detection is not implemented yet; pass `--subnet` and `--listen-ip` explicitly.
- The HAPI account is created in the 2N web UI because web administrator and HAPI accounts are separate.
- Administrator-password rotation is not automated because no confirmed published HAPI contract has been identified.
- `verify-button` defaults to dry-run and requires `--apply` for device mutation.
- My2N cloud authentication and the existing setup-app mock are not modified.
- Hardware calls still require validation against the target 2N models, firmware, and licenses.
- Browser-exported configurations may contain `Encryption="3"` Automation sources. The CLI refuses to edit those values; it requires a plaintext HAPI configuration export.

See [commissioning-flow.md](commissioning-flow.md) for the relationship to the setup-app flow.
See [poc-features.md](poc-features.md) for intentionally deferred production work.
