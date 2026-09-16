# POC Features and Production Follow-Ups

## POC goal

Demonstrate the local commissioning flow end to end:

1. Discover or identify a 2N door station.
2. Guide the installer through initial administrator setup.
3. Verify a dedicated HAPI account.
4. Download the current configuration.
5. Install a temporary Automation webhook rule.
6. Run a local webhook receiver.
7. Prove that a physical call-button press reaches the receiver programmatically.
8. Restore the prior Automation group.

The POC favors a visible, understandable flow over production architecture. Items below are intentionally deferred unless they prevent a safe demonstration.

## Current POC behavior

- `commission` stops at the `hapi-ready` checkpoint. It does not write a webhook.
- `verify-button` always uses Automation group `0`, optionally uploads the rule with `--apply`, starts the receiver, and waits for one physical button press.
- `listen-webhook` starts only the receiver. It is useful after a compatible Automation rule already exists; it does not configure the device.
- Device writes require an explicit `--apply` flag.
- The current test webhook uses HTTP and a token in the JSON body.
- Device and webhook passwords are prompted or generated for the current process rather than managed as production secrets.
- The POC preserves a pre-change configuration and the prior Automation group for restoration.

## Production fixes and hardening

### Credentials and secrets

- Do not use shared administrator or HAPI credentials across installations.
- Replace plaintext or reversibly exported configuration backups with encrypted storage and an explicit retention policy.
- Redact or remove HAPI passwords, CWMP credentials, switch codes, provisioning data, certificate material, salts, hashes, and other secrets from support artifacts.
- Never place webhook tokens or passwords in logs, command history, URLs, checkpoints, analytics, or client-visible responses.
- Define credential rotation, recovery, handoff, revocation, and installer access policies.
- Use the platform-approved secret store instead of local files.

### Authentication and transport

- Use HTTPS with certificate validation for device HAPI traffic; enroll or pin trusted device certificates instead of relying on `--insecure`.
- Use an authenticated production webhook protocol with replay protection, request signing, expiry, and key rotation.
- Replace plain HTTP webhook testing with the processor's production TLS endpoint.
- Confirm Basic versus Digest behavior for every supported firmware version and avoid unnecessary duplicate authentication attempts.
- Add rate limiting and lockout-aware retry behavior.

### Privileges and authorization

- Validate the minimum runtime privileges for every driver operation.
- Decide whether the long-lived driver account should retain `SystemControl` or whether a separate commissioning identity should own configuration repair.
- Add `IoControl`, `SwitchControl`, `CallControl`, `AutomationControl`, or keypad access only when a concrete supported feature requires it.
- Verify that unselected API operations are denied.
- Audit configuration changes and sensitive actions.

### Configuration safety

- Prefer a vendor-supported partial configuration operation if one becomes available instead of round-tripping the complete configuration.
- Validate device model, firmware, schema version, and required license before mutation.
- Preserve XML comments, ordering, unknown elements, encryption metadata, namespaces, and schema-specific fields where required by 2N.
- Never edit `Encryption="3"` values as plaintext.
- Validate the generated Automation JSON against the target firmware's Automation schema before upload.
- Compare a normalized before/after diff and require approval for changes outside owned paths.
- Verify upload success after the device apply interval and handle an ambiguous timeout by reading live state before retrying.
- Add transactional rollback or a documented recovery process for failed configuration application.
- Confirm whether uploading plaintext HAPI-export credentials causes the device to re-encrypt them or creates unintended exposure.

### Discovery and networking

- Replace bounded subnet probing with the supported 2N discovery mechanism when its contract is available.
- Discover active interfaces and CIDRs automatically while retaining manual IP fallback.
- Handle multiple NICs, VLANs, VPNs, IPv6, duplicate devices, DHCP address changes, and processors on a different management network.
- Bind the webhook only to approved interfaces and negotiate firewall access intentionally.
- Detect whether the advertised webhook address is reachable from the door station before installing the rule.

### Webhook semantics

- Confirm the authoritative physical button event for every model. The POC uses outgoing `CallStateChanged` in the `ringing` state based on the captured sample.
- Define debounce, deduplication, ordering, retry, timeout, and event-expiry behavior.
- Include stable Home, processor, room, and door-station identifiers in the production event contract.
- Distinguish call-button presses from calls initiated by another source.
- Return meaningful status codes and collect delivery metrics without logging sensitive payloads.
- Decide whether commissioning must prove one physical event before completion or exposes the test as an optional diagnostic.

### State and recovery

- Store commissioning state durably on the owning processor/service rather than under a local `.state` directory.
- Add concurrency control so two installers cannot commission or restore the same device simultaneously.
- Track configuration ownership and version so a later repair does not overwrite installer changes.
- Make resume behavior explicit for device replacement, factory reset, firmware update, changed IP, changed credentials, and expired licenses.
- Define when a checkpoint is complete, abandoned, expired, or safe to delete.
- Add a production-grade factory-reset and credential-recovery policy as a last resort.

### Product and UI integration

- Insert local discovery, admin setup, HAPI verification, config application, and button verification between `renderStepName()` and the existing My2N credential step.
- Keep 2N administrator, 2N HAPI, webhook, and My2N credentials visibly separate.
- Show named progress states such as discovered, admin configured, HAPI ready, configuration pending, applied but unverified, verified, and cleanup pending.
- Provide clear retry destinations without rolling back successful earlier phases.
- Surface missing license, privilege, network, certificate, and firewall failures distinctly.
- Represent devices already commissioned to a Room and prevent duplicates.

### Testing and operations

- Add hardware-in-the-loop coverage for each supported model and firmware range.
- Test factory-default, previously commissioned, firmware-updated, license-missing, unreachable, and partially configured devices.
- Test power loss and network loss during upload and apply intervals.
- Validate backup restoration on disposable hardware before relying on it as recovery.
- Add structured diagnostics, support bundles with automatic redaction, metrics, and health checks.
- Establish supported Python/runtime packaging or move the implementation into the production Configure Pro/driver stack.

## Known evidence from the current 2N IP One

- Device: 2N IP One, firmware 2.48.1.72.5, configuration schema 41.
- HAPI configuration download works with Digest authentication and a System Control account.
- The HAPI plaintext export exposes multiple sensitive values and must not be treated as a production-safe backup format.
- Browser exports may encrypt Automation sources while HAPI `encryption=0` exports them as editable JSON text.
- The current configuration has six empty Automation groups available for the POC.
- The license key field is empty even though HAPI configuration download succeeded on this device; production code should detect capabilities by behavior/API response rather than inferring license state from that field alone.
