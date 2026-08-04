# Initiative: Door Station Support | Mobile Answering & Remote Control
**Jira:** [CHOME-113883](https://crestroneng.atlassian.net/browse/CHOME-113883)

**Vision:** First-class door station support in Crestron Home — enabling homeowners to see, hear, respond to, and control access for visitors from any touch panel or mobile device, whether at home or away. This integration makes Crestron Home a trusted, end-to-end door and access platform rather than an ecosystem of isolated third-party devices.

**Personas:**
- **Homeowner / Resident** — Receives visitor notifications, communicates with visitors, grants access remotely
- **Dealer / Installer** — Discovers, commissions, and configures door station hardware in Configure Pro
- **Cloud / Platform service** — Non-human enabler persona for cloud-side authentication, ingest, and dispatch stories

**Story Map Structure:** Milestone-based epics (M1–M7) chain the end-to-end push-notification and call flow, from ingest through delivery to on-device experience. Capability epics (touch panels, device support, drivers, advanced features) hold hardware- and audience-specific stories that don't line up on the milestone chain.

**Source of truth:** The **Summary** and **Acceptance Criteria** for each story below are copied **verbatim from Jira** (`customfield_10095`). The Use Case section reproduces the Jira **Description** field verbatim. Only the Story Map Summary is paraphrased for readability. Captured on 2026-07-22 from initiative CHOME-113883.

**ID Scheme:** Jira issue keys are used as permanent identifiers (e.g., CHOME-113693). Epic keys are noted at the top of each section.

---

## Current Epic Structure (children of CHOME-113883)

| Epic Jira ID | Current Name (verbatim) | Role | Notable changes since last capture |
|---|---|---|---|
| CHOME-113680 | M1 Push Notification Infrastructure | Milestone M1 | CHOME-120504 moved to M3; CHOME-116147 moved to Advanced Features; new task CHOME-120561 |
| CHOME-120512 | M2 My2N Authentication | Milestone M2 | New stories: CHOME-120665 (Shadow Users), CHOME-120698 (Failed Auth), CHOME-120699 (Credential Lifecycle) |
| CHOME-120513 | M3 Delivery of events as push notifications | Milestone M3 | Now owns CHOME-120504 (ingest from My2N) |
| CHOME-115337 | M4 Receive Phone Calls | Milestone M4 | New: CHOME-120562 (multi-station settings); task CHOME-120630 (2N mobile SDKs) |
| CHOME-120514 | M5 2N Audio & Video Access | Milestone M5 | — |
| CHOME-120515 | M6 Quick Actions from Preview/Camera pages | Milestone M6 | Task CHOME-120066 added |
| CHOME-120516 | M7 Rich push notifications | Milestone M7 | — |
| CHOME-114571 | Configure Pro 2N Door Station settings | Capability (Dealer) | New: CHOME-120666 (My2N credential web page), CHOME-120718 (create site / Site Owner) |
| CHOME-113671 | Device Support \|\| Ubiquiti Doorbell Support | Capability (Dealer) | keep |
| CHOME-116727 | Touch Panels \|\| Improved in-home experience | Capability (In-home) | **Now owns the former Touch Panels—Ubiquiti epic content; CHOME-113611 is now a User Story here, not an epic** |
| CHOME-118331 | Advanced Features | Capability (Advanced) | Now owns CHOME-116147; new CHOME-118594 (automated message) |
| CHOME-116008 | Platform Support \|\| Push Notifications | Platform (tasks) | keep |
| CHOME-120692 | Drivers \|\| Door Station Driver | **NEW epic** — Driver eng. | New epic; holds 2N driver tasks + CHOME-120954 |

> **Structural note:** The prior document listed *Touch Panels — Ubiquiti Door Station Integration* (CHOME-113611) as a standalone epic. In current Jira, CHOME-113611 is a **User Story** parented under CHOME-116727, and its former sibling stories (CHOME-113614/615/616/621/622, CHOME-115739, CHOME-116146) are now direct children of CHOME-116727.

---

## Story Map Summary

| Epic | NOW<br>*(actively being built)* | NEXT<br>*(planned)* | LATER<br>*(future releases)* |
|---|---|---|---|
| **CHOME-116008 Platform Support — Push Notifications** | Platform engineering tasks (PN framework, interrupt sink, CRPC registration, data contract, Azure integration, 2N architecture) | — | — |
| **M1 Push Notification Infrastructure**<br>*CHOME-113680* | Subscribe/unsubscribe w/ CH server (CHOME-118206) · Enable/disable PN from app (CHOME-117707) · Register with providers APN/FCM (CHOME-119594) · Cloud/platform tasks (CHOME-120331/332/333/334/335/505/561) | — | — |
| **M2 My2N Authentication**<br>*CHOME-120512* | Authenticate to my2N (CHOME-120517) · Create shadow users (CHOME-120665) · Failed auth handling (CHOME-120698) · Credential lifecycle (CHOME-120699) | — | — |
| **M3 Delivery of events as push notifications**<br>*CHOME-120513* | PN from doorbell press (CHOME-113693) · Default notification sound (CHOME-113702) · Ingest door events from My2N (CHOME-120504) | — | — |
| **M4 Receive Phone Calls**<br>*CHOME-115337* | Receive phone call (CHOME-114324) · Answer call → preview (CHOME-114337) · Multi-station settings (CHOME-120562) · 2N mobile SDKs task (CHOME-120630) | — | — |
| **M5 2N Audio & Video Access**<br>*CHOME-120514* | Tap PN → app preview (CHOME-113691) · Two-way audio with visitor (CHOME-113688) | — | — |
| **M6 Quick Actions from Preview/Camera pages**<br>*CHOME-120515* | Quick actions during active door call (CHOME-113692) · PN on sequence/action events task (CHOME-120066) | — | — |
| **M7 Rich push notifications**<br>*CHOME-120516* | — | — | Rich notification with camera thumbnail (CHOME-118647) |
| **CHOME-114571 Configure Pro 2N Door Station settings** | Discover & add (CHOME-114756) · My2N registration (CHOME-114755) · My2N credential page (CHOME-120666) · Create site / Site Owner (CHOME-120718) · Conditionals/Events/Sequences (CHOME-114751/750/749) | About/settings/scenes (CHOME-114754/753/752) | Mobile live camera view (CHOME-113689) · Gate/garage actuation (CHOME-113709) · I/O and relay assignment (CHOME-113710) |
| **CHOME-113671 Device Support — Ubiquiti** | — | Discover & commission (CHOME-113676) · About (CHOME-113677) · Advanced settings (CHOME-113890) · Documentation (CHOME-113742) | Scenes · Conditionals · Events · Sequences · Routing · Programming (CHOME-113914/916/917/918, CHOME-114191, CHOME-113741) |
| **CHOME-116727 Touch Panels — Improved In-Home Experience** | — | Ubiquiti integration umbrella (CHOME-113611) · Launch into call screen (CHOME-113614) · Persistent ring (CHOME-113615) · Two-way audio/one-way video (CHOME-113616) · Live camera page (CHOME-113621) · Quick actions overlay (CHOME-113622) · Ring-tone customization (CHOME-115739) | Multi-device call dismissal (CHOME-116146) |
| **CHOME-118331 Advanced Features** | — | — | Geolocation suppression (CHOME-117307) · Event history (CHOME-113690) · Motion notification (CHOME-113694) · Notification recipients PN (CHOME-113700) & phone (CHOME-116068) · Multi-device PN dismissal (CHOME-116147) · Relay lock + PIN (CHOME-113738/739/740) · Automated message (CHOME-118594) |
| **CHOME-120692 Drivers — Door Station Driver** | 2N driver tasks (CHOME-120062/064/068) · Upload automation script (CHOME-120954) | — | — |

> **Note on swim lane placement:** The Jira swimlane field (`customfield_10030`) is blank on most stories. Lane placement above reflects the product team's intended Story Map and milestone sequencing; where Jira's field disagrees or is blank, the Jira field is the discrepancy to reconcile, not this table.

---

## Measuring Outcomes

| Problem | Outcome | Key Metrics |
|---|---|---|
| Installers avoid selling Crestron Home to homeowners wanting away-from-home visitor control | Installers are confident in Crestron's door station integrations | Dealer adoption rate for Ubiquiti and 2N configurations |
| Installers cannot reliably discover and set up door station devices | Installers can discover and commission Ubiquiti and 2N devices in Configure Pro without custom programming | Commissioning success rate; support tickets related to setup |
| Homeowners cannot see, hear, or communicate with visitors | Homeowners can see and speak with visitors through Crestron Home at home or away | **% of doorbell calls answered remotely** / **Average time from doorbell press to call answer** |
| Homeowners cannot grant access to visitors unless physically present | Homeowners can unlock doors, open gates, and open garages remotely | **% of unlock/gate actions performed remotely** / Unlocks during active calls |
| Homeowners are not reliably notified of visitors | Homeowners reliably notice visitors and can assess who is at the door | % of detection events acknowledged / Audio-visual alert delivery success rate |
| System fails silently during network outages | Core door functionality works under failure conditions | **Successful door events during network outages** / **Failure recovery time after restoration** |
| Door interactions feel slow or unreliable | Door interactions feel fast and responsive | **Doorbell-to-notification latency** / **Intercom connection setup time** / **Unlock command acknowledgment time** |

---

# Milestone Epics (M1–M7)

## Epic M1: Push Notification Infrastructure
**Jira Epic:** [CHOME-113680](https://crestroneng.atlassian.net/browse/CHOME-113680)

**Milestone definition:** This epic is done when a simulated button press results in a push notification on a mobile device with Notifications enabled.

### Epic Description (verbatim from Jira):
## Reacting to a Doorbell Push Notification on a Mobile Device (Primary MVP Use Case)

**User Value**
End users can respond to visitors at the door even when away from home.

**User Journey**

1. Visitor presses the button on the **Door Station**
2. End user receives a **push notification** on their iOS or Android device with a camera snapshot
3. User taps the notification
4. Crestron Home app launches and **prioritizes the door station call screen**
5. Live video from the door station camera is displayed.
6. User can trigger **quick actions** from the call screen (e.g., unlock gate via relay, scene trigger)
7. User can choose to **answer or dismiss** the call
8. If answered, **bi‑directional audio** is established

Implement the basic functionality for notifications on mobile devices in the Crestron Home app. This includes:

* Adding mobile push notifications for door station button presses.
* Enabling answering door notifications remotely via the Crestron Home app.
* Supporting generic I/O control for locks, gates, and garages.
* Supporting temporary PIN codes for access control.
* Door and gate control and lock control functionalities.
* Using Ubiquiti events, commands, and feedback states within the Crestron Home programming ecosystem.
* Adding all commands to sequences.
* Handling all device-specific events.
* Supporting device-specific properties in conditionals and variables.
* Controlling scenes with lighting, shades, general I/O, etc.

---

#### User Story CHOME-118206
- **Summary:** User is subscribed and unsubscribed for push notifications with the Crestron Home server

##### Use Case (Jira Description):
### Summary

As a homeowner who is logs into Crestron cloud services (Cloud relay) for the first time, I want to **subscribe** for push notifications for the homes I can access, so that I can receive door station push notifications on my mobile device whether I am home or away from my home.

### Context

This user story is about the user scenarios that trigger device **subscription** (valid tokens). This does NOT imply that the user is ENABLED to receive push notifications (https://crestroneng.atlassian.net/browse/CHOME-117707 ). A user can be registered with the push notification service and NOT receive push notifications.

### Mobile → Cloud relay API

When the CH mobile app subscribes for push notifications with the cloud relay, there are 2 scenarios:

1. Mobile app sends specific homes/devices in the subscription list, then the devices is subscribed for push notifications from those homes/devices only
2. Mobile app sends a subscription with NO homes/devices in the subscription list, then the cloud services subscribes for push notifications from ALL homes in the users' profile

##### Acceptance Criteria (verbatim from Jira):
**Scenario: Setting is per-device, not per-account**

> *Given* the user has the Crestron Home app installed on more than one device (e.g. iPhone and Android phones, tablets)
> And is signed into the same cloud services account on both
> *When* they enable Notifications on one device and disable them on the other
> *Then* each device independently honors its own setting — for instance, the iPhone receives notifications, the Android phone does not

**Scenario: Setting is per-Home for users with access to multiple Homes**

> *Given* the user has access to more than one Home and is signed in
> *When* they enable Notifications under one Home's settings and leave another Home's Notifications off
> *Then* the device only receives push notifications for the Home(s) where Notifications is toggled on

**Scenario: Multiple Homes and Multiple Devices**

> *Given* the user has access to more than one Home and is signed in to Cloud services on more than one device
> *When* they enable Notifications under one Home's settings on one device
> And they enable notifications in another Home's setting on the 2nd device
> *Then* the devices only receives push notifications for the Home(s) that are enabled

### Category 1: First-time user — no app, no Cloud Relay account

#### Scenario 1a: New user (Owner)

> *Given* an Owner has no app installed and no Cloud Relay account, and they own a Crestron Home processor
> *When* they install the app, create a Cloud Relay account, and claim their home (pair their processor)
> *Then* at the end of the pairing flow, they are prompted to enable push notifications for their home
> And they accept (choose yes)
> *And* they are opted into push notifications for all homes until they opt out from individual homes

#### Scenario 1b: New user (User), invited to someone else's home (no hardware ownership)

> *Given* a user has no app installed and no Cloud Relay account, and they have received an invite to another user's Crestron Home
> *When* they install the app, create a Cloud Relay account, and accept the invite
> *Then* their account is associated with the owner's home via the cloud _**without a pairing step**_,
> *And* they are prompted to enable push notifications
> And they accept (choose yes)
> And they are opted into push notifications for all homes until they opt out from individual homes

#### Scenario 1c: User does not have any devices in the home that can trigger a push notification

> *Given* a user does not have any devices in their home that can trigger a push notification
> *When* they login in to the app
> *Then* they are prompted to enable push notifications for the Home
> And they accept (choose yes)
> *And* they are opted into push notifications for all homes until they opt out from individual homes

---

**Category 2 moved to** https://crestroneng.atlassian.net/browse/CHOME-119594

---

### Category 3: User has the app and a Cloud Relay account, but is not signed in (do not prompt)

#### Scenario 3a: Returning user, not signed into cloud services (cloud relay) in the app

> *Given* a user has the app installed,
> And has a Cloud Relay account,
> And is signed out of the account,
> When an event happens that triggers a push notification in the Home
> Then I should not receive a push notification from the

#### Scenario 3b: Returning user, signing back in on the same device

> *Given* a user has the app installed,
> And has a Cloud Relay account,
> **And has previously subscribed for push notifications,** but is currently signed out
> *When* they sign back into the app
> *Then* their account and server associations are restored and the last active setting for notifications is restored

#### Scenario 3b: Existing user, signing into the app on a new device for the first time

> *Given* a user has a Cloud Relay account with one or more paired servers
> And PNS already registered on another device, and they are not yet signed into the app on a new device
> *When* they sign into the app on the new device
> *Then* their account and server associations are available immediately (no re-pairing needed),
> And push notifications have not yet been registered for this device;
> Then the app will surface a prompt to ask them if they want to enable push notifications for this device

---

### Category 4: User has the app and a Cloud Relay account, and is signed in

**Main theme: Claiming a new home does NOT result in automatically subscribing to push notifications for the new home.**

**Scenario 4a: Signed-in user adding a new processor/server**

> *Given* a user is signed into the app with an existing Cloud Relay account
> And has push notifications subscribed across one or more homes and devices
> *When* they claim/pair an additional server or processor in a home
> *Then* the user is NOT automatically subscribed for push notifications from the new home

**Scenario 4b: Signed-in user who has never subscribed for push notifications, adding a new server**

> *Given* a user is signed in with an existing account and paired servers,
> And has never registered for push notifications on any of the homes
> *When* they claim/pair an additional server
> *Then* the user is NOT automatically subscribed for push notifications from the new home

**Scenario 4c: Signed-in user accepting an invite to a new home and already subscribed to push notifications from other homes**

> *Given* a user is signed in and has push notifications subscribed for a home(s),
> And the user receives an invite to a new server from another owner
> *When* they accept the invite to claim the new home
> *Then* the user is NOT automatically subscribed for push notifications from the new home

**Scenario 4d: Signed-in user accepting an invite to a new home (no PNS registered)**

> *Given* a user is signed in but has never subscribed to push notifications,
> And they receive and accept an invite to another owner's home
> *When* the invite is accepted
> *Then* the user is NOT automatically subscribed for push notifications from the new home

---

### Category 5: Existing user signs out and back in to the app.

**Scenario 5a: Returning user, signing back in on the same device**

> *Given* a user has all the account services and is signed in
> And that user is subscribed for push notifications
> And the user signs out of the CH home app (cloud relay)
> *When* they sign back into the app
> *Then* their account and server associations are restored and the last active setting for notifications is restored
> And they should still be subscribed for push notifications from all homes
>
> _(if their push notification token is still valid, we still need to re-subscribe for push notifications from the cloud relay; if the token has changed (e.g. OS reset), the app should update the PNS subscription endpoint with a new updated token)_

**Scenario 5b: Existing user signs out and new user signs back in to the Crestron Home app on the same device.**

*Given* a user has all the account services and is signed in
And that user is subscribed for push notifications
And the user signs out of the CH home app (cloud relay)
*When* a new user signs into the app/cloud relay **on the same device**
*Then* the new user should not inherit the push notification settings from the previous user of that device

---

### Category 6: Additional Backend **Unsubscribing** Scenarios

These don't have a direct user-facing registration flow but need backend handling to clean up PNS tokens:

_**Sunny Day: When users sign out of the CH app, then they are signing out of cloud services (cloud relay) and they should not receive notifications from the home(s) anymore**_

> *Given* a user is signed in to the Crestron Home app (cloud services)
> *When* they sign out of the app and cloud services (Cloud Relay)
> *Then* they should no longer receive push notifications from their home(s)

**Scenario 6a: User is removed from a processor/server**

> *Given* a user is subscribed for PN from a server
> *When* they are removed from that server by the owner or an admin
> *Then* the user's devices are removed from receiving push notifications from that home
> (_The_ the backend removes the association between their token(s) and that server)

**Scenario 6b: User deletes their Cloud Relay account**

> *Given* a user is subscribed for PN from a server or servers
> *When* they delete their Cloud Relay account
> *Then* the user's devices are removed from receiving push notifications from that home
> (*Then* the backend removes all push notification tokens and server associations and user profiles for that account)

---

#### User Story CHOME-117707
- **Summary:** User can enable or disable push notifications from the mobile app when away from home.

##### Use Case (Jira Description):
### Summary

As a homeowner using the Crestron Home mobile app, I want to be able to selectively enable or disable push notifications for my Homes from my mobile device.

### Context

The issue is about allowing homeowners to manage mobile push notifications in the Crestron Home mobile app when they are at home or away from home

##### Acceptance Criteria (verbatim from Jira):
### Push Notification Enable/Disable — User Acceptance Criteria

Mock of Crestron Home mobile app --> [crestronhome-enable-push-notifications-flow.html](https://pshea-crestron.github.io/software-apps-product-team/door-stations-integration/crestronhome-enable-push-notifications-flow.html)

**Scenario: Navigate to push notification settings**

> *Given* the user is signed into the Crestron Home app and has access to at least one Home
> *When* they tap into a Home, open the 3-dot menu, and select Settings
> *Then* they see **Notifications** settings
> And can enable or disable the settings by toggle switch
> And enabling notifications shows the option to choose a Notification sound.

*(image: image-20260626-153104.png)*

---

**Scenario: Enable push notifications for the first time**

> *Given* the user has navigated to the Notifications settings screen
> And push notifications are currently off for this device
> *When* they toggle Notifications on
> *Then* the app requests OS-level notification permission (if not already granted),
> *And* the toggle reflects the enabled state,
> *And* the device begins receiving push notifications for this Home

---

**Scenario: Enable push notifications when OS permission was previously denied**

> *Given* the user toggles Notifications setting on
> And the user had previously denied notification permission at the OS level
> *When* the app detects that OS permission is not granted
> *Then* the user is shown a message explaining that notifications must be enabled in the device's system settings,
> And is given a shortcut/link to open the OS settings for the Crestron Home app

---

**Scenario: Disable push notifications for this device**

> *Given* the user has push notifications enabled on this device for a Home
> *When* they toggle Notifications off on the Push Notifications screen
> *Then* the toggle reflects the disabled state,
> And the device stops receiving push notifications for that Home,
> And no confirmation prompt is required (the action is reversible by toggling back on)

---

**Scenario: Disable push notifications for Crestron Home in the OS Settings**

> *Given* the user has push notifications enabled on this device for a Home
> *When* they toggle Notifications off for the Crestron Home app
> *Then* the device stops receiving push notifications from the Crestron Home platform,
> *(And the Crestron Home app on the device doesn't know anything about it, and the cloud will unsubscribe the device for push notifications on the  error it gets back from the provider platform)*

---

**Scenario: Setting persists across app restarts**

> *Given* the user has set their Notifications preference (Enabled or Disabled) for a Home
> *When* they close and reopen the app, or **sign out and back in on the same device**
> *Then* the Notifications toggle reflects their last saved preference
> *And* notifications are based on that preference

---

**Scenario: Setting is per-device, not per-account**

> *Given* the user has the Crestron Home app installed on more than one device (e.g. iPhone and Android phones) and is signed into the same account on both
> *When* they enable Notifications on one device and disable them on the other
> *Then* each device independently honors its own setting — for instance, the iPhone receives notifications, the Android phone does not

---

**Scenario: Setting is per-Home for users with access to multiple Homes**

> *Given* the user has access to more than one Home and is signed in
> *When* they enable Notifications under one Home's settings and leave another Home's Notifications off
> *Then* the device only receives push notifications for the Home(s) where Notifications is toggled on

---

**Scenario: User newly invited to a Home**

> *Given* the user already has push notifications enabled on this device for one or more existing Homes
> *When* they accept an invite to a new Home
> *Then* push notifications for the new Home default to on, and the new Home appears in the user's Home list with the Notifications toggle reflecting the enabled state (subject to confirmation — this matches the auto-opt-in decision from the standup, but UX may want a prompt instead)

**Scenario: Signed-in user opting out of push notifications (soft disable)**

> *Given* a user is signed in and has push notifications registered on a device
> *When* they choose to turn off push notifications through app settings
> *Then* the app sets a local profile setting suppressing notifications; the backend token is retained (not deleted), simplifying future flows involving ownership transfer or account changes

---

#### User Story CHOME-119594
- **Summary:** Users' devices are registered for push notifications with the providers

##### Use Case (Jira Description):
### Summary

As a homeowner using the Crestron Home mobile app, I want my device to register for push notifications with my provider

### Context

Providers are:

* Apple Push Notification Service (APN)
* Firebase Cloud Messaging (FCM)

##### Acceptance Criteria (verbatim from Jira):
### Sunny Day Scenario

> *Given* the user is signed in to the Crestron Home app and has access to at least one Home
> *When* they enable push Notifications in to the Crestron Home app Settings,
> *Then* they are asked to give push notifications permissions (OS level)
> And they are registered for Push Notifications from their provider
> And they are subscribed for push notifications from the Crestron Home platform

---

### Other scenarios

**Scenario - User doesn't allow permissions the first time:**

> *Given* the user is signed in to the Crestron Home app and has access to at least one Home
> *When* they enable push Notifications in to the Crestron Home app Settings
> And they are asked to give push notifications permissions (OS level)
> And they say No
> *Then* the device/user is NOT registered for push notifications with the provider
> And they are not subscribed to push notifications from the platform

**Scenario - User doesn't allow permissions the first time, then tries to enable them again later:**

> *Given* the user is signed in to the Crestron Home app and has access to at least one Home
> *When* they enable push Notifications in to the Crestron Home app Settings
> And they are NOT asked to give push notifications permissions again (OS level)
>
> [ Add more stuff here]

**Scenario - User doesn't allow permissions:**

> *Given* the user is signed in to the Crestron Home app and has access to at least one Home
> *When* they enable push Notifications in to the Crestron Home app Settings,
> *Then* they are registered for Push Notifications from their provider
> And they are subscribed for push notifications from the Crestron Home platform

---

##### Platform/Cloud tasks (task-level detail in Jira only):
- CHOME-120331 — PNS Subscription API - Deploy to AKS
- CHOME-120332 — PNS Dispatcher API - Deploy to Azure Kubernetes Service (AKS)
- CHOME-120333 — Configure User Assigned Managed Identity for Azure SQL Access
- CHOME-120334 — Setup Azure Notification Hub
- CHOME-120335 — Configure DataDog Monitoring and Observability
- CHOME-120505 — [Cloud] Dispatch notification messages to providers (APNs, FCM)
- CHOME-120561 — [Platform] Send Notifications to the Cloud

---

## Epic M2: My2N Authentication
**Jira Epic:** [CHOME-120512](https://crestroneng.atlassian.net/browse/CHOME-120512)

### Epic Description (verbatim from Jira):
**Milestone definition:** This epic is done when the Crestron cloud service(s) can authenticate against My2N on behalf of a Home's enrolled users and receive events from a device registered in a My2N account.

**Reference: 2N Partner API** — [https://developer.2n.com/docs/my2n-papi/api/2-n-partner-api](https://developer.2n.com/docs/my2n-papi/api/2-n-partner-api)

### Approach

Crestron Home integrates with My2N using a partner-level (shadow-user) model rather than requiring each family member to hold their own My2N login:

* The dealer provisions a **companyId** in My2N during onboarding.
* The dealer invites the homeowner to create a My2N account for billing purposes — this becomes the **Site Owner** (siteId), which can have any number of 2N devices assigned.
* Additional household members are invited and managed entirely within Crestron Home — they never create or manage a My2N account themselves.
* For each enrolled Crestron user (exact key — per-user vs. per-device — TBD in refinement), a **My2N shadow user** (`type: SHADOW`) is created and scoped to the Home's `companyId`/`siteId`. Shadow users have no login/email and require no confirmation flow, so they can be minted entirely server-side.
* The cloud retrieves and manages a My2N **access token** per shadow user, used to authenticate mobile video calls to the door station. Only one active call session exists at a time regardless of which user answers ("first responder wins" — see CHOME-116146/116147), but each user authenticates under their own shadow identity.

**Note:** Event ingestion/subscription itself is tracked separately under a different epic (CHOME-120513 / CHOME-120504), which depends on this epic's authentication work completing first.

### Open Questions

* Is the shadow-user key per mobile device (mobile device)? Determines the exact mapping stored between a Home, its enrolled users, and their shadow `uuid`s.
    * shadow user is connected to a site somehow by My2N
    * Crestron needs to supply a Bearer token to get access - can this be a special "SITE_ADMIN" account in order to be able to get access tokens?
        * We need to be very careul about where we store credentials - the special "SITE_ADMIN"
* What is the teardown/revocation behavior when a user or device is removed from a Home, or the Home itself is deleted?
* Does `apartmentId` map 1:1 with a Home for standard single-family installs, with per-unit mapping only needed for MDU?

### Billing Model Decision

**Business decision**: Crestron will not hold any billing relationship with 2N for Mobile Video services — no bulk COMPANY_ADMIN/MOBILE_VIDEO_BUYER subscription created by Crestron and the dealer should not have to use their COMPANY_ADMIN/MOBILE_VIDEO_BUYER account on homeowners' behalf to pay for services.

Instead, the My2N site-level role **"Site admin with payments permission"** allows the individual homeowner to be the paying party for their own site's Mobile Video subscription, entered directly through My2N's own consumer flow (email invite from Configure Pro → My2N login → payment information). This confirms that Crestron and the dealer/installer are not required to carry recurring 2N service fees.

**Open verification item**
"Site admin with payments permission" is a UI label observed in the My2N web console; it does not appear by that name in the Partner API role documentation (which only lists site roles ADMIN and USER). Need to confirm the exact role identifier(s) this maps to at the API level before building CHOME-120666 against it.

---

#### User Story CHOME-120517
- **Summary:** Authenticate to my2N server

##### Use Case (Jira Description):
## Use Case

* **As** the Crestron Home cloud service(s)
* **I want to** authenticate the credentials submitted via the My2N credential page (CHOME-120666) against the my2N cloud services
* **so that** I have a token to use to create the shadow user (CHOME-120665) before subscribing to door-station events

## Notes

* Scope is limited to the one-time authentication handshake. Failure handling is tracked separately in https://crestroneng.atlassian.net/browse/CHOME-120698. Credential storage/rotation/revocation is tracked separately in https://crestroneng.atlassian.net/browse/CHOME-120699.
* Sibling of the my2N portal registration (CHOME-114755, handled during commissioning under CHOME-114571).
* Enabler story — persona is the cloud service, not an end user.
* Prerequisite for CHOME-120504 (Cloud ingests door events from My2N).

##### Acceptance Criteria (verbatim from Jira):
### Scenario: Successful authentication

- **Given** a dealer has submitted valid my2N credentials via web page (CHOME-120666)
- **When** the cloud service sends the authentication request to my2N
- **Then** the cloud service receives a valid auth token/session
- **And** the session is marked ready for event subscription (CHOME-120504)

---

#### User Story CHOME-120665
- **Summary:** Create Shadow Users

##### Use Case (Jira Description):
### Primary Use Case

* As the Crestron Home cloud service
* I want to create a My2N shadow user for a homeowner's account when they don't already have a My2N login
* so that the homeowner's door station events can be associated with a My2N identity without requiring them to create or manage a separate My2N account

### Notes

* API reference: POST [https://my2n.com/middleware/api/partner/v1/users](https://my2n.com/middleware/api/partner/v1/users) (type: SHADOW)
* The role grant payload (companyId, siteId, apartmentId + role types) must map to something meaningful in Crestron's model — needs confirmation during refinement on where siteId/apartmentId originate (per-Home vs. per-installation) and whether a single site/apartment structure is sufficient for non-MDU single-family homes.
* Per My2N's role table, the calling credential needs sufficient authoring role (e.g., COMPANY_ADMIN) to grant SITE/APARTMENT roles — this is expected to be satisfied by the dealer's company credentials, established manually and outside this story, not per-request.
* Token retrieval for this shadow user (GET /get-user-token/:userUuid) is explicitly out of scope here — tracked in CHOME-120517.
* Sibling of CHOME-120666 (existing-account linking path) and CHOME-120517 (authentication/token retrieval).
* Enabler story — persona is the cloud service, not an end user.

##### Acceptance Criteria (verbatim from Jira):
### Scenario: Successful shadow user creation

- Given a Crestron Home account is being linked to a 2N door station for the first time
- and Given no existing My2N account is being linked (see the credential webpage flow, CHOME-120666, for that alternate path)
- When the cloud service calls POST /partner/v1/users with type "SHADOW" and the appropriate companyId, and siteId role grants for that Home
- Then My2N returns a new shadow user record including a uuid
- And the cloud service stores that uuid mapped to the homeowner's Crestron Home account, ready for use in CHOME-120517 (token retrieval)

### Scenario: Shadow user already exists for this Home

- Given a shadow user has already been created and mapped for this Home
- When shadow user creation is attempted again (e.g., re-commissioning, retry after a partial failure)
- Then the cloud service detects the existing mapping and does not create a duplicate shadow user
- And the existing uuid is reused

### Scenario: Shadow user creation fails

- Given the cloud service calls POST /partner/v1/users
- When My2N rejects the request (e.g., invalid companyId/siteId, malformed role grant, or a 5xx/timeout from My2N)
- Then no partial mapping is stored for this Home
- And the failure is surfaced in a way that lets commissioning be retried without manual cleanup
- And the failure is distinguishable from an authentication failure (CHOME-120517) in logs/state, since this is a separate API call

---

#### User Story CHOME-120698
- **Summary:** Failed My2N Authentication Handling

##### Use Case (Jira Description):
### Primary Use Case

* **As** the Crestron Home cloud service
* **I want to** detect and handle a failed authentication attempt against the my2N server
* **so that** the installer/homeowner gets a clear, actionable state instead of a silent or ambiguous failure

### Notes

* Split from CHOME-120517 (business rule variation: success vs. failure).
* Enabler story — persona is the cloud service.
* Exact retry/backoff policy and UI surfacing details to be confirmed during refinement.

##### Acceptance Criteria (verbatim from Jira):
### Scenario: Invalid credentials

- Given a homeowner has submitted my2N credentials via CHOME-120666
- When the cloud service submits them to my2N and my2N rejects them as invalid
- Then the cloud service marks the shadow user's authentication state as "failed: invalid credentials"
- And no session/token is created or activated
- And the state is surfaced back through the commissioning/settings flow so the user can retry

### Scenario: my2N service unavailable or request times out

- Given the cloud service attempts to authenticate with my2N
- When the my2N server does not respond within the defined timeout, or returns a 5xx error
- Then the cloud service marks the authentication attempt as "failed: service unavailable"
- And the attempt is retried according to the agreed retry policy (exact backoff/retry count to be defined during refinement)
- And this failure state is distinguishable from "invalid credentials" in any surfaced UI/logs

### Scenario: Previously valid session expires or is revoked by my2N

- Given a shadow user previously had a valid my2N session
- When that session is no longer valid (expired or revoked upstream)
- Then the cloud service detects this on next use and re-enters the "failed: needs re-authentication" state
- And event subscription/ingestion (CHOME-120504) is paused until re-authentication succeeds
- In what cases can this happen, and how often?

---

#### User Story CHOME-120699
- **Summary:** My2N Credential Lifecycle Management

##### Use Case (Jira Description):
### Use Case

* As the Crestron Home cloud service
* I want to securely store, rotate, and revoke my2N authentication credentials/tokens over time
* so that long-lived access to my2N stays secure and is cleanly torn down when no longer needed

### Notes

* Split from CHOME-120517 (major effort — explicitly flagged as an open scoping question in the original story).
* Enabler story — persona is the cloud service.
* Depends on my2N's supported auth protocol (token-based vs. long-lived key) — confirm against 2N HAPI docs before estimating.

##### Acceptance Criteria (verbatim from Jira):
### Scenario: Secure storage

- Given a (shadow) user has successfully authenticated with my2N (CHOME-120517)
- When the resulting credentials/tokens are persisted
- Then they are stored using [Crestron's approved secrets-management approach — to be confirmed with security/platform team]
- And are never exposed in plaintext logs or client-facing responses

### Scenario: Credential rotation

- Given a stored my2N credential/token has a defined expiry or rotation policy
- When that period elapses
- Then the cloud service automatically refreshes/rotates the credential without requiring homeowner re-entry

### Scenario: Revocation on disconnect or account removal

- Given a homeowner disconnects my2N or their (shadow) user/account is deleted (for failed payment?)
- When the removal is processed
- Then the associated my2N credentials/tokens are revoked and purged from storage

---

## Epic M3: Delivery of events as push notifications
**Jira Epic:** [CHOME-120513](https://crestroneng.atlassian.net/browse/CHOME-120513)

**Milestone definition:** This epic is done when events received from a 2N device are delivered to the mobile notification providers/push gateways of the device. Ubiquiti is out of scope for this milestone.

*Design Document — https://crestroneng.atlassian.net/wiki/spaces/CHOME/pages/2972123137/2N+Door+Station+Integration+Design*

---

#### User Story CHOME-113693
- **Summary:** Receive a push notification on my mobile device(s) when Door Station button is pressed

##### Use Case (Jira Description):
As a homeowner/resident, I want to receive a standard push notification on my mobile device(s) when a doorbell is pressed so that I can quickly decide whether to answer, ignore, or save it to review later.

##### Acceptance Criteria (verbatim from Jira):
### Sunny Day Scenario

- Given someone pushed the button on the door station
- When the event is received by the Crestron cloud service(s) and the Crestron Home platform,
- Then a push notification shall be sent to the user's mobile devices **that are enabled for notifications**,
- And the push notification should feel simultaneous to the user, and the person at the door shouldn't feel ignored]
- And the notification shall be delivered to supported iOS & Android devices

### Alternate Scenarios

### Scenario: Homeowner has notifications disabled at the OS level

- Given the homeowner has revoked notification permission for Crestron Home in their device OS settings
- When the door station button is pressed
- Then no notification is delivered to that device
- And no error is surfaced to the visitor or the system — the failure is silent to the door station
- And the homeowner's in-app notification preference is unaffected (it reflects the OS-level block separately)

### Scenario: Door station button is pressed rapidly multiple times

- Given a visitor presses the doorbell button 3 or more times within 5 seconds
- When the events are received by the Crestron Home system
- Then only one push notification is delivered per defined cooldown window (debounce)
- And subsequent presses within the cooldown window are logged but do not generate additional notifications

---

#### User Story CHOME-113702
- **Summary:** Default notification sounds on mobile devices

##### Use Case (Jira Description):
As an homeowner/resident, I expect the notification for visitors (someone that pressed  the doorbell or someone detected at the door) to instantly tell me someone is at the door.

Some attributes of the notification are that it should:

* Sound urgent
* Be distinct from messages
* Offer immediate actions within the notification bubble
* Not be silent by default

##### Acceptance Criteria (verbatim from Jira):
**Given** I am a homeowner with a registered mobile device, and a person presses the doorbell or is detected at the door by a supported sensor,

**When** my mobile device receives the door activity notification,

**Then** the notification shall immediately convey that someone is at the door,

**And** the notification shall use a high-priority, attention-demanding alert sound by default,

**And** the alert sound shall be perceptibly distinct from standard messaging or social app notifications,

**And** the alert shall not be silent by default,

**And** the notification shall repeat or persist for a defined duration or until acknowledged,

**And** shall present immediate actionable options (for example: Chat, Answer, or Dismiss) directly within the notification bubble,

**And** shall be displayed using standard mobile OS notification mechanisms on both iOS and Android.

### Alternate Scenarios

#### Scenario: Device is on silent/vibrate mode

- Given the homeowner's device is set to silent or vibrate
- When a doorbell notification arrives
- Then the notification is delivered with vibration (if enabled) and appears in the notification shade
- And the app does not override the device's silent mode to force audio playback
- And the notification is still actionable (Chat, Dismiss) from the notification shade

#### Scenario: Homeowner is wearing Bluetooth headphones

- Given the homeowner has Bluetooth audio output active
- When a doorbell notification arrives
- Then the notification alert sound plays through the connected Bluetooth device

#### Scenario: Notification arrives when app is in foreground

- Given the homeowner has the Crestron Home app open on screen
- When a doorbell notification arrives
- Then the notification is presented as an in-app alert (banner or modal) rather than an OS-level notification bubble
- And the same actionable options (Chat, Dismiss, View) are available

#### Scenario: Notification persists on locked screen

- Given the homeowner's device is locked and the screen is off
- When a doorbell notification arrives
- Then the screen wakes or the notification appears on the lock screen
- And the homeowner can take action (Chat, Dismiss) directly from the lock screen without unlocking

---

#### User Story CHOME-120504
- **Summary:** Register for and ingest door events from My2N

##### Use Case (Jira Description):
## Use Case

* **As** the Crestron Home platform/cloud service(s)
* **I want to** register for and receive door-station events from the My2N platform
* **so that** 2N doorbell presses can trigger notifications to a homeowner's devices

## Notes

* Sibling of CHOME-113693 under epic CHOME-113680.
* Enabler story — persona is the platform/cloud service, not an end user. End-user value is realized in CHOME-113693.
* The "latency budget" here is the ingest slice of the 1-second end-to-end target in CHOME-113693; the team should agree on a specific value during refinement.
* Related work expected under this story includes: CHOME-116148 (rapid-press debounce SPIKE), CHOME-119145 / CHOME-119146 / CHOME-119150 (arch and API-contract review), CHOME-120068 (2N driver PN integration).

https://crestroneng.atlassian.net/wiki/spaces/CHOME/pages/2972123137/2N+Door+Station+Integration+Design - this is the workflow for consuming 2N events from their cloud through Amazon SQS

Can we use an API to setup a webhook? or do we have to use the 2N Automation tool to do that?

##### Acceptance Criteria (rewritten 2026-07-31 — pending push to Jira):

**Persona for this AC:** As the **Crestron Home platform**, I want to receive a door station event from a commissioned 2N device and publish a well-formed event message to the **Crestron Cloud**, so that the cloud can dispatch it as a push notification to every subscribed mobile device in the Home.

> **Integration path.** This AC is written for **Option 1 — local webhook ingest**: an automation config uploaded to the device via `PUT api/config` that fires `sendhttprequest` to the platform on the chosen 2N Automation events. That matches the current Jira description, where Option 2 (consuming 2N's cloud Amazon SQS feed) is marked **not a valid option**. R1 scope here is the doorbell press; the full 2N Automation event list in the Jira description is the future surface, not this story.
>
> **Two preconditions were deliberately removed** from the earlier draft:
> * *"The 2N device has an active My2N portal account"* — not required for a local doorbell event. The My2N account and Mobile Video subscription gate the **call** (M5 / CHOME-120514), not the **event**. Keeping it here couples this story to billing state it does not depend on.
> * *"At least one mobile device is subscribed for push notifications"* — subscriber fan-out is the cloud's job (CHOME-120505 → Azure Notification Hub). If the platform only emits when subscribers exist, subscription state leaks onto the processor and the "zero subscribers" and "subscriber added mid-flight" cases break. The platform publishes unconditionally; the cloud decides who to notify.

**Preconditions (shared by all scenarios — stated once rather than repeated):**

| # | Precondition |
|---|---|
| P1 | A 2N door station is commissioned to the processor and assigned to a room |
| P2 | The platform holds valid credentials for that door station |
| P3 | The platform has a reachable IP address for that door station |
| P4 | The door station has a valid 2N Automation license loaded, with the event webhook automation config uploaded |
| P5 | The processor has an active connection to Crestron Cloud |

### Scenario 1: Doorbell press is published to the cloud (sunny day)

- **Given** P1–P5
- **When** a visitor presses the call button
- **Then** the platform receives a doorbell press event from the door station
- **And** publishes a door event message to the Crestron Cloud API

### Scenario 2: The event message is complete

- **Given** the platform received a doorbell press event
- **When** it composes the message for the cloud
- **Then** the message contains everything the cloud needs to build a push notification without a second call back to the processor:

| Field | Why the cloud needs it |
|---|---|
| Home / processor identifier | Resolve which Home's subscribers to notify |
| Door station identifier | Identify the source device |
| Door station display name + room | Notification body text ("Front Door") |
| Event type (`doorbell_press`) | Choose notification template and sound (CHOME-113702) |
| Event timestamp (UTC) | Late-notification handling and ordering |
| Event ID | Idempotency and dedupe |
| Media reference | Snapshot for rich notification (M7 / CHOME-118647) — reference only, not payload |

*Refinement item:* confirm this field list against the CHOME-116008 push-notification data contract so the two do not drift.

### Scenario 3: Multiple door stations in one Home

- **Given** two or more commissioned door stations
- **When** one is pressed
- **Then** the message identifies that specific door station and its room
- **And** no event is published for the others

### Scenario 4: Repeated presses

- **Given** a doorbell press has just been published
- **When** the button is pressed again within the debounce window
- **Then** the platform publishes at most one event message per window
- **And** each published message carries a distinct event ID

*Refinement item:* debounce window length is a product decision and needs a number — see SPIKE CHOME-116148.

### Scenario 5: Cloud is unreachable

- **Given** the processor has lost its cloud connection
- **When** the doorbell is pressed
- **Then** the platform retries publication within the notification-relevance window
- **And** stops retrying once the event is no longer worth notifying on, rather than delivering a stale notification later
- **And** the failure is logged as a delivery failure, distinguishable from a device-side failure

*Refinement item:* relevance window and retry policy need numbers.

### Scenario 6: Internet is down but the local network is healthy

- **Given** P1–P4, **and** the processor has no WAN/cloud connectivity
- **And** the door station and processor remain reachable on the LAN
- **When** the doorbell is pressed
- **Then** the platform still receives the doorbell press event from the door station
- **And** the event remains available to local consumers on the LAN (touch panel ring and in-home answer, CHOME-116727)
- **And** only the cloud publication step fails, handled per Scenario 5 — loss of internet must not suppress local event reception

> **Why this scenario matters:** it forces event reception and cloud publication to be separate concerns in the implementation. If they are coupled, the in-home touch panel experience delivered later inherits a cloud dependency it should never have had, and the "core door function during outage" outcome in the capabilities doc is unachievable without rework.

### Scenario 7: Latency budget

- **Given** P1–P5
- **When** the doorbell is pressed
- **Then** the platform publishes to the cloud fast enough to keep press-to-notification within the ~1 second end-to-end target (CHOME-113693)
- **And** the platform's own contribution to that budget is measurable in isolation

### Out of scope for this story

Dispatch to APNs/FCM (CHOME-120505) · notification sound (CHOME-113702) · snapshot capture (CHOME-118647) · non-doorbell events — motion, noise, entry (CHOME-113694, Advanced Features) · anything requiring a My2N account or Mobile Video subscription (M2 / M5).

---

## Epic M4: Receive Phone Calls
**Jira Epic:** [CHOME-115337](https://crestroneng.atlassian.net/browse/CHOME-115337)

**Milestone definition:** This epic is done when a simulated door station button press results in a traditional phone call ringing on a pre-enabled mobile device.

### Epic Description (verbatim from Jira):
## Answering a Doorbell Phone Call on a Mobile Device (Primary MVP Use Case)

**User Value**
End users can respond to visitors at the door even when away from home.

**User Journey**

1. Visitor presses the button on the **Door Station**
2. End user receives a **phone call** on their iOS or Android device
3. User answers the phone call
4. Crestron Home app launches and **prioritizes the door station call screen**
5. Live video from the door station camera is displayed and **one-way audio** is established
6. User can trigger **quick actions** from the call screen (e.g., unlock gate via relay, scene trigger)
7. User can unmute themselves to talk to the visitor

---

#### User Story CHOME-114324
- **Summary:** Receive a phone call on my mobile device(s) when Door Station button is pressed

##### Use Case (Jira Description):
As a homeowner/resident, I want to receive a push notification on my mobile device(s) when a doorbell is pressed so that I can quickly decide whether to answer, ignore, or review later.

##### Acceptance Criteria (verbatim from Jira):
**Given** someone pushed the button on the door station,

**When** the event is received by the Crestron Home system,

**Then** a phone call is triggered to the user's **registered** mobile devices,

**And** the phone call shall be received within **1 second** of the doorbell being pressed,

**And** the phone call shall be triggered on supported iOS & Android devices.

### Alternate Scenarios

#### Scenario: Homeowner is already on an active phone call

- Given the homeowner is on an active cellular or VoIP call
- When the door station button is pressed
- Then the door station call is delivered as a call waiting notification (if the OS supports it)
- And if the homeowner ignores it, the door station call terminates after a defined ring timeout

#### Scenario: Phone call goes unanswered — fallback to push notification

- Given the door station phone call rings on the homeowner's device
- When the homeowner does not answer within the ring timeout
- Then the call terminates
- And a push notification is delivered as a fallback (if push is also enabled)
- And the missed call is logged in the door station event log

#### Scenario: Homeowner declines the phone call

- Given the door station phone call is ringing
- When the homeowner taps Decline
- Then the call terminates immediately and the declined call is logged

#### Scenario: Phone call received when device is in Do Not Disturb mode

- Given the homeowner's device is in Do Not Disturb mode
- When the door station phone call arrives
- Then if the homeowner has configured critical alerts or DND exceptions for Crestron Home, the call rings through
- And if no exception is configured, the call is silenced and appears as a missed call notification

---

#### User Story CHOME-114337
- **Summary:** Answering the phone call from the doorbell opens the Crestron Home app preview screen

##### Use Case (Jira Description):
As a homeowner/resident, I want to tap a doorbell notification on my mobile device(s) and open the Crestron Home app and see & hear who is at the door

##### Acceptance Criteria (verbatim from Jira):
Dependency → UX Mock up of notification action screen

Scenario: Launching the Notification Action Screen from a Phone Call

- Given I have received a phone call for a "Doorbell" or "Person Detected" event,
- When I answer the phone call on my mobile device,
- Then the video first screen shall launch immediately within the Crestron Home app,
- And the screen shall default to one-way audio and video (stream from the door to the phone),
- And the screen shall display: Chat (two-way audio), Unlock/Lock buttons.

### Alternate Scenarios

#### Scenario: App is not running when call is answered

- Given the Crestron Home app is not running in the background
- When the homeowner answers the door station phone call
- Then the app launches from cold start and navigates directly to the preview screen
- And video begins loading immediately without requiring a separate tap

#### Scenario: Homeowner answers but video fails to connect

- Given the homeowner answers the phone call
- When video does not connect within 5 seconds
- Then audio-only mode is active and clearly indicated
- And a visual placeholder is shown rather than a blank screen
- And a retry option is available for video without ending the audio

#### Scenario: Homeowner unlocks door during the answered call

- Given the preview screen is active after answering the phone call
- When the homeowner taps Unlock
- Then the associated lock receives an unlock command and the action is logged
- And the call continues — the unlock does not terminate the call

#### Scenario: Call is answered simultaneously on two devices

- Given the door station call is ringing on two devices simultaneously
- When both attempt to answer within milliseconds of each other
- Then only one session is established (first-answer wins)
- And the second device is informed the call has already been answered and stops ringing (see CHOME-116146)

---

#### User Story CHOME-120562
- **Summary:** Settings for notifications from multiple door stations

##### Use Case (Jira Description):
*(No description in Jira)*

##### Acceptance Criteria (verbatim from Jira):
*(AC field is empty in Jira)*

---

##### Related task (task-level detail in Jira only):
- CHOME-120630 — Integrate 2N mobile SDKs and required dependencies

---

## Epic M5: 2N Audio & Video Access
**Jira Epic:** [CHOME-120514](https://crestroneng.atlassian.net/browse/CHOME-120514)

**Milestone definition:** This epic is done when tapping a notification or answering a call results in audio and video streaming from the 2N device.

---

#### User Story CHOME-113691
- **Summary:** Tapping the push notification for the doorbell opens the Crestron Home app preview screen

##### Use Case (Jira Description):
As a homeowner/resident, I want to tap a doorbell notification on my mobile device(s) and open the Crestron Home app and see & hear who is at the door

##### Acceptance Criteria (verbatim from Jira):
Dependency → UX Mock up of notification action screen

Scenario: Launching the door station preview screen from a Push Notification

- Given I have received a push notification for a "Doorbell" event,
- When I tap the notification on my mobile device,
- Then the door station preview screen shall launch within 2 seconds within the Crestron Home app.
- And the screen shall default to one-way audio and one-way video (stream from the door to the phone)
- And the audio should be live audio from the door station within 2 seconds
- And the video should be live video from the door station within 5 seconds
- And the screen shall display: Chat/Unmute icon, Hangup icon, up to 4 other programmable quick actions

### Alternate Scenarios

#### Scenario: App is force-quit when notification is tapped

- Given the Crestron Home app is not running in the background
- When the homeowner taps the doorbell push notification
- Then the app launches from cold start and navigates directly to the preview screen
- And the 2-second launch SLA is measured from tap, not from when the app was last active

#### Scenario: Video stream fails to connect within 5 seconds

- Given the homeowner has tapped the notification and the preview screen is open
- When the video stream does not establish within 5 seconds
- Then the screen shows a visual placeholder (spinner or last known snapshot) rather than a blank screen
- And the audio stream continues if it has connected
- And a retry option is visible

#### Scenario: Multiple notifications from different door stations — homeowner taps the older one

- Given the homeowner has two unread doorbell notifications from different door stations
- When the homeowner taps the older notification
- Then the preview screen opens for the door station associated with that specific notification

#### Scenario: Preview screen opened while device is on cellular

- Given the homeowner's device is connected via cellular (not home Wi-Fi)
- When the preview screen opens
- Then audio and video streams establish using the available network path
- And the homeowner is not required to be on the home network for the preview to function

---

#### User Story CHOME-113688
- **Summary:** Establish audio&video visitor(s) via the Crestron Home App

##### Use Case (Jira Description):
As a homeowner/resident, I want a way to communicate with the person at the door

##### Acceptance Criteria (verbatim from Jira):
### Sunny Day Scenario

- **Given** I am on the Preview screen,
- **When** I select the microphone icon,
- **Then** the app shall enables two-way audio on my mobile device,
- **And** I shall see a visual indicator confirming that the microphone is active.

### Alternate Scenarios

#### Scenario: Homeowner mutes themselves during a conversation

- Given two-way audio is active
- When the homeowner taps the mute icon
- Then their outbound audio is muted and the visual indicator reflects the muted state
- And the visitor's incoming audio continues unaffected
- And the homeowner can unmute by tapping again

#### Scenario: Homeowner's device microphone permission is denied

- Given the homeowner has revoked microphone permission for Crestron Home at the OS level
- When the homeowner taps the Chat icon
- Then the app surfaces a prompt explaining that microphone access is required
- And provides a shortcut to the OS settings to grant permission

#### Scenario: Two-way audio drops mid-conversation

- Given two-way audio is active between the homeowner and visitor
- When the audio connection drops due to network instability
- Then the app displays a connection lost indicator and attempts to automatically reconnect
- And if reconnection fails within a defined timeout, the homeowner is offered a manual retry

#### Scenario: Homeowner ends the conversation

- Given two-way audio is active
- When the homeowner taps the Hangup icon
- Then the audio session ends immediately, the microphone is released, and the preview screen closes

---

## Epic M6: Quick Actions from Preview/Camera pages
**Jira Epic:** [CHOME-120515](https://crestroneng.atlassian.net/browse/CHOME-120515)

**Milestone definition:** This epic is done when the user can perform up to 3 preprogrammed Quick Actions from the preview and/or camera screen.

---

#### User Story CHOME-113692
- **Summary:** Trigger predefined quick actions during an active door call

##### Use Case (Jira Description):
As a homeowner/resident, I want to trigger predefined quick actions (like unlock, gate open, or scenes) during an active door call so that I can manage access and environment conveniently.

##### Acceptance Criteria (verbatim from Jira):
Quick actions are visible as an overlay on the active call video panel

Actions must be secure and logged.

### Alternate Scenarios

#### Scenario: Homeowner unlocks door during active call (happy path)

- Given an active door call is in progress
- When the homeowner taps the Unlock quick action from the overlay
- Then an unlock command is sent to the associated lock within 3 seconds
- And the action is logged with: timestamp, user account, device, and action taken

#### Scenario: Quick action fails — lock does not respond

- Given the homeowner taps Unlock during an active call
- When the lock does not acknowledge the command within the timeout
- Then the homeowner sees a failure indicator on the quick action button
- And the audio/video call is not interrupted by the failure
- And the homeowner can retry the action

#### Scenario: Quick action triggered by unauthorized user

- Given a user with Guest role is viewing the call screen
- When the guest attempts to tap an action that requires Owner permission (e.g. Unlock)
- Then the action is blocked with a clear message
- And the blocked attempt is logged

#### Scenario: Homeowner dismisses the quick action overlay

- Given the quick action overlay is visible during an active call
- When the homeowner taps outside the overlay or uses a dismiss gesture
- Then the overlay hides and the full video panel is visible
- And a control to re-show the overlay remains accessible

---

##### Related task (task-level detail in Jira only):
- CHOME-120066 — Raise Push Notifications on Sequence & Action Events

---

## Epic M7: Rich push notifications
**Jira Epic:** [CHOME-120516](https://crestroneng.atlassian.net/browse/CHOME-120516)

**Milestone definition:** This epic is done when the user can see a snapshot of the person at the door from a rich notification.

---

#### User Story CHOME-118647
- **Summary:** Receive a rich push notification on my mobile device(s) when Door Station button is pressed

##### Use Case (Jira Description):
* As a homeowner/resident, I want to receive a rich push notification on my mobile device(s) when a doorbell is pressed so that I can see who is at the door/gate before connecting to the device.

##### Acceptance Criteria (verbatim from Jira):
### Acceptance Criteria

- **Given** a that someone pushed the button on the door station
- **When** the event is received by the Crestron Home system,
- **Then** a push notification shall be sent to the user's mobile devices that are **_enabled_** for notifications,
- **And** the push notification shall be delivered immediately (within **1 second** of the doorbell press event),
- **And** the notification shall be delivered to supported iOS & Android devices

### User Scenarios

---

# Capability Epics

## Epic: Configure Pro 2N Door Station settings
**Jira Epic:** [CHOME-114571](https://crestroneng.atlassian.net/browse/CHOME-114571)

### Epic Description (verbatim from Jira):
### 🎯 Goals/Outcomes & Measurements

* Dealers/Installers can detect, configure, and setup 2N door stations and intercoms in Configure Pro when connected to a Crestron processor

📋 Acceptance criteria include

* successful commissioning of devices in the Crestron Home ecosystem,
* visibility of device details (model, firmware, status),
* ability to configure built-in relays to control door locks, garage doors and gates
* ability to program and control devices within the Crestron Home system.

### Note on registration with My2N

In order to be able to use the My2N service which is required for end user to receive push notifications and phone & video calls.

Our goal is to minimize friction in the installation flow and billing lifecycle.

* In the commissioning flow for 2N devices, the user/installer should get prompted to login to or create a My2N account
* The expereince should be designed so that the end user does not feel like they are
    * What should the model be here?
    * Does the installer create the account and include the fee in the the installation invoice?
    * Does 2N provide a lifetime subscripton fee, or is it only a monthly fee?
    * How does this work for MDUs?

## Targeted Hardware (top picks on 2N website)

* [2N IP Verso 2.0](https://www.2n.com/en-US/products/intercoms/2n-ip-verso-2/): A highly modular, "Unicorn" intercom designed for flexibility. It features a Full HD camera, night vision, and allows up to 30 custom modules to be added (fingerprint, keypad, Bluetooth).
* 2N IP Solo: A compact, stylish IP intercom ideal for smart home automation, featuring a hidden camera and high-definition audio.
* [2N IP One](https://www.2n.com/en-US/products/intercoms/2n-ip-one/): A highly durable IP video intercom designed to protect family homes.

---

#### User Story CHOME-114756
- **Summary:** 2N Door station || Discover & Add Devices

##### Use Case (Jira Description):
As a dealer, I want to be able to commission 2N door stations into the Creston Home processor & ecosystem so they can be programmed.

### 🎯 Goals/Outcomes & Measurements

* Dealers/Installers can detect, configure, and setup 2N door stations and intercoms in Configure Pro when connected to a Crestron processor

📋 Acceptance criteria include

* successful commissioning of devices
    * [2N IP Verso 2.0](https://www.2n.com/en-US/products/intercoms/2n-ip-verso-2/)
    * 2N IP Solo: A compact, stylish IP intercom ideal for smart home automation, featuring a hidden camera and high-definition audio.
    * [2N IP One](https://www.2n.com/en-US/products/intercoms/2n-ip-one/)
    * [2N Security Relay](https://www.2n.com/en-US/products/security-relay)
* visibility of device details (model, firmware, status),
* ability to program and control devices within the Crestron Home system.

##### Acceptance Criteria (verbatim from Jira):
- Given the user is on the Devices tab in Confiugure Pro
- When a the user selects Add Device
- **And selects Drivers**
- **And searches for 2N**
- **And 2N device(s) is discovered**
- And the user assigns the device to a room
- Then the device is added to the selected room
- And the device configuration popup is displayed
- And the my2N registration flow is initiated (required for integrated notifications to mobile) [CHOME-114755](https://crestroneng.atlassian.net/browse/CHOME-114755)

# Commissioning Devices in Configure Pro

- Navigate to Devices Tab
- Discover Popup → **Then where?**
- Discover and view the 2N device(s) → Select Room in Right List → Hit Plus sign to add the 2N device to the room
    1. Popup
        1. Input Name of Device
        2. Output configuration options
            1. **SIP configuration for Audio & Video "calls"  ??**
        3. Advanced
            1. Anything here? Maybe this is for SIP?
        4. Page to Configure the Installation Settings of the Device
            1. Digital Input Settings (Works the same as the DIN-4DIMU4 implementation)
                1. Local Settings
                2. Local Mode
                3. Remote Mode
- Device Successfully Added

---

#### User Story CHOME-114755
- **Summary:** Cloud / Platform || My2N Registration & Authentication

##### Use Case (Jira Description):
As a dealer, I want to be able to invite my clients (site admins) to register to the my2N portal so they can be billed for My2N audio & video services related to connecting remotely to their door stations and intercoms.

### 🎯 Goals/Outcomes & Measurements

* Dealers/Installers can register or sign in to their My2N account from within Configure Pro.
* Dealers/Installers can invite homeowners to sign in to their My2N account from within Configure Pro.

📋 Acceptance criteria include

* Homeowners are registered for a My2N Site(s)
* Homeowners pay for their subscription seamlessly and without intervention by Crestron

In order to be able to use the My2N service which is required for end user to connect audio and video to door stations and intercoms.

The goal is to minimize friction in the installation flow and billing lifecycle.

* In the commissioning flow for 2N devices, the user/installer should get prompted to create or login to their My2N account
* The experience should be designed so that the end user does not feel like they are being charged by Crestron
    * **RESOLVED (see CHOME-120512 Billing Model Decision):** Crestron holds no billing relationship with 2N for Mobile Video services whatsoever — no invoice pass-through, no bulk subscription paid by the dealer. The homeowner is the direct paying party via the My2N site-level "Site admin with payments permission" role, entered through My2N's own consumer flow (signup → login → payment). This answers the "lifetime vs. monthly fee" and "installer invoice" questions: neither applies, since Crestron/the dealer never touches that transaction.
    * MDU handling is already captured in this story's Alternate Scenarios (independent per-unit registration).
    * **Dependency**: the technical implementation of the site-creation and Site Owner invitation API calls underlying this flow is tracked separately in CHOME-120718 — this story depends on that one for the actual cloud/platform mechanics.

##### Acceptance Criteria (verbatim from Jira):
Installers are redirected from Configure Pro to [my2n.com/register](https://my2n.com/register)

*(A table with three commissioning-flow screenshots follows here in Jira: image-20260710-144454.png, image-20260710-145244.png, image-20260623-163823.png)*

### Sunny Day Scenarios

#### Scenario: Dealer creates a My2N account for the Owner

- Given the installer is setting up a 2N Door station in Configure Pro
- When the installer adds 2N door station
- Then the My2N registration flow is initiated
- And the installer can seamlessly register the client for the subscription

#### Scenario: Dealer invites Owner to create/Authenticate with a My2N account

- Given the installer is setting up a 2N Door station in Configure Pro
- When the installer adds 2N door station
- Then the My2N registration flow is initiated
- And the installer can seamlessly register the client for the subscription

### Alternate Scenarios

#### Scenario: Client already has a My2N account

- Given the installer initiates the My2N registration flow
- When the dealer enters the client's email address
- And that email is already linked to an existing My2N account
- Then the system links the existing account rather than creating a duplicate
- And the dealer is informed the account already exists and has been connected

#### Scenario: Client declines to register during commissioning

- Given the My2N registration flow is initiated during device add
- When the dealer skips or dismisses the registration step
- Then the device is still added and functional for local operation
- And a persistent prompt or indicator remains in Configure Pro to complete registration later
- And the homeowner does not receive mobile push notifications until registration is completed

#### Scenario: Registration flow fails due to network error

- Given the dealer is in the My2N registration flow
- When a network timeout or API error occurs during registration
- Then the dealer is shown a clear error message with the reason
- And the device addition is not rolled back — the 2N device remains in the system
- And the dealer can retry registration without recommissioning the device

#### Scenario: my2N subscription is expired or lapsed

- Given a client was previously registered and their My2N subscription has expired
- When the dealer or homeowner attempts to use push notifications
- Then the system surfaces a clear message that the subscription is inactive
- And provides a path to renew without contacting Crestron support

#### Scenario: Dealer registers multiple units (MDU context)

- Given the dealer is commissioning multiple units in the same building
- When registering each unit's homeowner to My2N
- Then each unit's registration is independent with its own account and credentials
- And one unit's registration failure does not block other units from completing

---

#### User Story CHOME-114754
- **Summary:** 2N Door station || About the device

##### Use Case (Jira Description):
As a dealer, I want to see the information about the door station(s) such as the serial number and firmware version.

### 🎯 Goals/Outcomes & Measurements

* Dealers/Installers can view all the details about a specific 2N door station device
    * OPEN What is available through their API?

📋 Acceptance criteria include

* device About screen shows pertinent device information

##### Acceptance Criteria (verbatim from Jira):
The following information shall be included on the About tab for the camera:  `DRAFT`

- id - The primary key of camera
- model key - The model key of the camera
- state - Connection state of the device.
- name - the name of the camera
- MAC address - The MAC address of the device

---

#### User Story CHOME-114753
- **Summary:** 2N Door station|| Device Specific settings

##### Use Case (Jira Description):
As a Dealer, I want to use Configure Pro to configure advanced settings of the 2N door stations so that events from the device like a button press are delivered as push notifications to enabled mobile devices.

**What settings are configurable on the 2N door stations and what do we want to expose?**

* **name - The name of the device**
* osdSettings - On Screen Display settings.
* ledSettings - LED settings.
* lcdMessage - Message that's set on the LCD screen (for doorbells and/or other devices with LCD screens). To upload image assets for the LCD screen, use the `/files/{fileType}` endpoint.
* micVolume
* videoMode - Current video mode of the camera
  Enum: default, highFps, sport, slowShutter, lprReflex, lprNoneReflex
* hdrType - High Dynamic Range (HDR) mode setting.
  Enum: auto, on, off
* smartDetectSettings - Smart detection settings for the camera.

### 🎯 Goals/Outcomes & Measurements

* Dealers/Installers can detect, configure, and setup the 2N door stations and intercoms in Configure Pro when connected to a Crestron processor

📋 Acceptance criteria include

* successful commissioning of devices,
* visibility of device details (model, firmware, status),
* ability to use built-in relays with doors (locks), garage doors, and gates.
* ability to program and control devices within the Crestron Home system.

##### Acceptance Criteria (verbatim from Jira):
Given that I am a dealer trying to configure my clients 2N door station(s)
When I am setting up a home system that contains 2N door stations and intercoms
Then…

---

#### User Story CHOME-114752
- **Summary:** NA 2N Door station || Scenes

##### Use Case (Jira Description):
As a Dealer, I want to include each of the output channels from the 2N door station that are configured as Lights in lighting scenes and shade scenes.

##### Acceptance Criteria (verbatim from Jira):
For each of the outputs set as lighting on the outputs of the 2N door station, I can do the following in the Crestron Home Lighting Scene Editor.

- Add / Remove a Lighting load to a scene
- Turn the load on / off from the scene editor

For each of the outputs set as Shades on the outputs of the 2N door station, I can do the following in the Crestron Home Shades Scene Editor.

- Add / Remove a Shade or Drape  to a scene
- Turn the Shade or Drape on / off from the scene editor
  The same scene control functions are available in the Setup app and the End User App

---

#### User Story CHOME-114751
- **Summary:** 2N Door station || Conditionals and Variables

##### Use Case (Jira Description):
As a Dealer, I want to use the State from a device assigned to an I/O input of a 2N door station within a Conditional used in my configuration.

##### Acceptance Criteria (verbatim from Jira):
#### Scenario: I/O input state used in a Conditional (happy path)

- Given a contact sensor is assigned to an I/O input on the 2N door station
- And the dealer has opened the Conditionals editor in Crestron Home
- When the dealer creates a Conditional referencing that input's state
- Then the Conditional evaluates correctly when the sensor opens or closes

#### Scenario: I/O input device is unassigned after a Conditional is created

- Given a Conditional references a 2N I/O input that was previously assigned to a device
- When the dealer removes the device assignment from that input
- Then the Conditional is flagged as having an invalid or unresolved reference
- And the system does not silently evaluate the Conditional as true or false

#### Scenario: Multiple I/O inputs used in a single Conditional

- Given a 2N door station has two inputs assigned (e.g. motion sensor and entry sensor)
- When the dealer creates a Conditional combining both input states with AND logic
- Then the Conditional evaluates only when both conditions are simultaneously true

#### Scenario: I/O input state persists through a 2N device reboot

- Given a Conditional is evaluating a 2N I/O input state
- When the 2N device reboots and reconnects
- Then the input state is re-read from the device after reconnection
- And the Conditional resumes evaluating correctly without requiring a configuration change

---

#### User Story CHOME-114750
- **Summary:** 2N Door station || Events

##### Use Case (Jira Description):
As a Dealer, I want to be able to program to Events from each device associated with an Input or output channel of the 2N door station

Note: Expose other events - GoTo the 2N API docs (use ONIO help file for this) and see what other events are available.

##### Acceptance Criteria (verbatim from Jira):
#### Scenario: Doorbell press event triggers a programmed action (happy path)

- Given a 2N door station is commissioned with a button input configured
- And the dealer has programmed an Event for the doorbell press
- When a visitor presses the doorbell button
- Then the programmed Event fires and executes the associated action (e.g. turn on exterior light)

#### Scenario: Motion detection event triggers an action

- Given a 2N door station has motion detection enabled
- And the dealer has programmed an Event for motion detected
- When the door station detects motion
- Then the Event fires and the associated action executes

#### Scenario: Rapid successive events (debounce)

- Given a doorbell press Event is programmed
- When a visitor presses the doorbell button multiple times in rapid succession
- Then the Event fires once per defined cooldown window
- And subsequent presses within the window are suppressed and logged but do not trigger duplicate actions

#### Scenario: Event fires when 2N device comes back online after outage

- Given a 2N device was offline and has reconnected
- When the device reconnects and its state has changed
- Then queued or missed events are handled gracefully — either replayed or discarded per configuration
- And the dealer can review missed events in the event log

---

#### User Story CHOME-114749
- **Summary:** 2N Door station || Sequences

##### Use Case (Jira Description):
As a Dealer, I want to add control for any device associated with an output of the 2N door station to a Sequence in Crestron Home.

##### Acceptance Criteria (verbatim from Jira):
#### Scenario: Relay-controlled gate added to a Sequence (happy path)

- Given a gate motor is connected to a 2N door station relay output and commissioned
- When the dealer creates a Sequence and adds the gate as a step
- Then the Sequence editor lists the 2N-connected gate as an available action
- And executing the Sequence sends an open or close command to the gate motor

#### Scenario: Sequence contains a mix of 2N and non-2N devices

- Given a Sequence includes both a 2N relay-controlled light and a native Crestron dimmer
- When the Sequence executes
- Then all steps fire in the defined order regardless of device type
- And a failure on the 2N step does not abort subsequent steps unless configured to do so

#### Scenario: Sequence step fails because 2N device is offline

- Given a Sequence includes a 2N output control step
- When the Sequence executes but the 2N device is offline
- Then the failed step is logged with a timestamp and reason
- And the dealer or homeowner can view the failure in the system log

#### Scenario: Sequence triggered by a door station Event

- Given a Sequence has been programmed to run when the 2N doorbell is pressed
- When a visitor presses the doorbell
- Then the Event fires and triggers the full Sequence (e.g. turn on porch light, unlock door, send notification)

---

#### User Story CHOME-113689
- **Summary:** View the door station and entry cameras live from the Crestron Home app - Touch Panels first, then Mobile Devices next?

##### Use Case (Jira Description):
As a homeowner/resident, I want to view the door station and entry cameras live from the Crestron Home app on my mobile device(s) so that I can monitor my property in real time.

##### Acceptance Criteria (verbatim from Jira):
Camera of the Door Station must be made visible on the Whole House Camera page after it is added to the system

Snapshot and Camera Stream must be made available

1-way audio should be available when viewing camera stream

This should populate automatically when we commission the door station device

### Alternate Scenarios

#### Scenario: Camera stream fails to load

- Given the homeowner opens the camera for a door station
- When the stream fails to establish within a defined timeout
- Then a clear error state is shown (not a blank screen)
- And the last known snapshot is displayed if available
- And a retry option is visible

#### Scenario: Multiple door stations visible on the camera page

- Given two door stations are commissioned (front door and rear gate)
- When the homeowner opens the Whole House Camera page
- Then both door station cameras appear as distinct entries
- And the homeowner can switch between streams without leaving the page

#### Scenario: Camera viewed while device is on cellular

- Given the homeowner is away from home on cellular data
- When they open the door station camera stream
- Then the stream loads (may be at reduced quality based on bandwidth)
- And there is no hard requirement to be on the home Wi-Fi network

---

#### User Story CHOME-113709
- **Summary:** Control || Actuate gates, garage doors, or entry motors using door station controls

##### Use Case (Jira Description):
As a homeowner/resident, I want to actuate gates, garage doors, or entry motors so that I can grant access to visitors.

As a dealer I want to be able to assign I/Os and Relays on my Ubiquiti devices when setting up Garage Doors and Gates

##### Acceptance Criteria (verbatim from Jira):
Send open/close commands to the device(s) for gates

Send open/close commands to the device(s) for garage doors

*(An image follows here in Jira: image-20260422-185337.png)*

---

#### User Story CHOME-113710
- **Summary:** Control || Assign I/Os and Relays on my devices

##### Use Case (Jira Description):
As a homeowner/resident, I want to actuate gates, garage doors, or entry motors so that I can grant access to visitors.

As a dealer I want to be able to assign I/Os and Relays on my Ubiquiti devices when setting up Garage Doors and Gates

##### Acceptance Criteria (verbatim from Jira):
Send open/close commands to the device(s) for gates

Send open/close commands to the device(s) for garage doors

*(An image follows here in Jira: image-20260422-185337.png)*

---

#### User Story CHOME-120666
- **Summary:** [Cloud] Authentication web page for My2N credentials

##### Use Case (Jira Description):
### Use Case

* As a dealer/installer setting up My2N integration for a Crestron Home system
* I want to enter my My2N company credentials
* so that the Crestron cloud can authenticate as my company and begin creating shadow users for door station devices

### Notes

* This story is scoped ONLY to capturing and authenticating the dealer's own My2N credentials — a simple, one-time (or per commissioning session?) credential entry page.
* Site creation, homeowner/Site Owner invitation, and any other Home/installation details are explicitly OUT of scope here — tracked under a separate epic responsible for capturing that information in the processor for later use by cloud services.
* Enabler for CHOME-120665 (shadow-user creation needs this authenticated context to exist first).
* Whether the dealer's credentials are reused per-request or used once to bootstrap a persistent shadow admin credential is tracked as a spike under CHOME-120665.
* Persona is the dealer/installer — this is the one story in this epic with a real human user, not just the cloud service.

##### Acceptance Criteria (verbatim from Jira):
### Scenario: Dealer submits My2N credentials

- Given a dealer is setting up My2N integration for the first time (or re-authenticating)
- When the dealer enters their My2N company email/password into the credential web page and submits
- Then the cloud service uses those credentials to authenticate against My2N on the dealer's behalf
- And the dealer's real credentials are not persisted beyond this one-time authentication step

### Scenario: Invalid dealer credentials

- Given the dealer submits credentials
- When My2N rejects them as invalid
- Then the web page shows a clear error and does not proceed to shadow-user creation

### Scenario: Successful authentication hands off to shadow-user creation

- Given the dealer's credentials are validated
- Then the cloud service is ready to begin creating shadow users (CHOME-120665) for this company

---

#### User Story CHOME-120718
- **Summary:** [Cloud/Platform] Create My2N site and grant homeowner payments-capable Site Owner role

##### Use Case (Jira Description):
## Use Case

* As the Crestron commissioning tool (Configure Pro), via cloud and/or processor platform APIs
* I want to create a My2N site under the dealer's company and grant the homeowner the site-level role needed to pay for Mobile Video service
* so that CHOME-114755's dealer-facing registration flow has the underlying API mechanics to create sites and invite homeowners

## Notes

* Enabler story — implements the technical mechanics underneath CHOME-114755 (dealer/UX-level flow). This story does not duplicate 114755's use case; it exists one layer below it. No new UX mockup is expected here by default — see open question below on whether that assumption holds.
* Lumps together two APIs that may or may not both be needed:
    1. A Crestron cloud service API that calls My2N's POST .../sites and POST .../users
    2. A Crestron Home processor/platform API that Configure Pro calls locally (which may itself proxy to #1)
      Exact division of responsibility between cloud vs. processor is unresolved — see spike.
* Depends on CHOME-120666 (dealer authenticates before any site/user creation can happen).
* Site creation and Site Owner invitation are two separate My2N API calls — confirmed via schema (no admin field in the create-site request body).
* Open question: does Configure Pro already hold all data needed to create a site (name, type, locale, address) as part of general commissioning, allowing this to happen silently with no new screen — or is at least one field (e.g. site "type": FAMILY_HOME/MDU/OTHER/etc., which has no obvious existing Crestron equivalent) missing, requiring new Configure Pro UI? This determines whether UX work is needed here or stays fully within CHOME-114755's existing flow.

##### Acceptance Criteria (verbatim from Jira):
Scenario: Create a site for a new Home

- Given a dealer's My2N company is authenticated (CHOME-120666)
- When Configure Pro (via cloud and/or platform API — TBD) calls POST /companies/:companyId/sites with name, type, locale, and address
- Then My2N returns the new site's id, my2nId, and available services (including MOBILE_VIDEO)
- And the siteId is stored, mapped to the Crestron Home

Scenario: Invite homeowner as paying Site Owner

- Given a site has been created for a Home
- When the cloud/platform calls POST /users (type: USER) with the homeowner's name/email and the site role for payments-capable admin
- Then My2N sends the homeowner a confirmation email
- And the homeowner completes signup, password, and payment entirely within My2N's own flow

Scenario: Site name collision

- Given a site name may already exist under the company
- When Configure Pro checks HEAD /companies/:companyId/sites?name=X before creating
- Then a match indicates the name is taken and a different name must be chosen

---

## Epic: Device Support — Ubiquiti Doorbell
**Jira Epic:** [CHOME-113671](https://crestroneng.atlassian.net/browse/CHOME-113671)

### Epic Description (verbatim from Jira):
## 🎯 Goals/Outcomes & Measurements

* Dealers/Installers can detect, configure, and setup Ubiquiti doorbells and intercoms in Configure Pro when connected to a Crestron processor

## 📋 Acceptance criteria include

* successful commissioning of devices
* visibility of device details (model, firmware, status),
* ability to program and control devices within the Crestron Home system.

## Target base hardware

* Ubiquity UniFi Cloud Gateway Max [UCG-Max]
* Ubiquity UniFi Door Hub Mini [UA-Hub-Door-Mini]
* Ubiquiti UniFi Access G6 Pro Entry (Black)	UVC-G6-Pro-Entry

### Example Setup

[ Internet ] → [ UniFi Cloud Gateway Max ] → LAN → [ UniFi PoE switch ] → [ UniFi Cloud Gateway ] -> [ UniFi Doorbell (G6 Pro) ] → Relay, I/O → [ Door Strike, Gate, Garage ]

---

#### User Story CHOME-113676
- **Summary:** Ubiquiti G6 Pro Entry || Discover & Add Device

##### Use Case (Jira Description):
As a dealer, I want to be able to commission Ubiquiti devices into the Creston Home processor & ecosystem so they can be programmed.

# Open Questions

* How are these devices integrated? Do I commission each device (preferred) or commission Ubiquiti UniFi access for controlling any UniFi devices?
* Are there other devices that are needed? (Ubiquiti Hubs, Ubiquiti NVR for video, Viewport?, some device that runs the Protect platform)
* Can we integrate with Viewport and make it a Crestron Home source?
* Which relay controlled devices do we want to call out and add support for "routing"?

##### Acceptance Criteria (verbatim from Jira):
- Given the user is on the Devices tab in Confiugure Pro
- When a the user selects Add Device
- And selects Drivers
- And searches for Ubiquiti -->Is there where we want our integrated support? There is already a [Unifi Access Driver by ControlWorks](https://store.controlworks.com/products/Unifi-Access_License)
- And Ubiquiti **[G6 Pro Entry](https://techspecs.ui.com/unifi/door-access/uvc-g6-pro-entry?subcategory=all-door-access)** device is discovered
- And the user assigns the device to a room
- Then the device is added to the selected room
- And the device configuration popup is displayed

---

Examples:

[CHOME-84629: DIN-8SWU8 || Device SupportRefinement](https://crestroneng.atlassian.net/browse/CHOME-84629)

[CHOME-99856: DIN-8SWU8 || Adding DeviceRefinement](https://crestroneng.atlassian.net/browse/CHOME-99856)

# Commissioning Devices in Configure Pro

- Navigate to Devices Tab
- Discover Popup → **Then where?**
- Discover and view the Ubiquiti device → Select Room in Right List → Hit Plus sign to add the Ubiquiti device to the room
  1. Popup
     1. Input Name of Device
     2. Output configuration options
        1. **SIP configuration for Audio & Video "calls"  ??**
     3. Advanced
        1. Anything here? Maybe this is for SIP?
     4. Page to Configure the Installation Settings of the Device
        1. Digital Input Settings (Works the same as the DIN-4DIMU4 implementation)
           1. Local Settings
           2. Local Mode
           3. Remote Mode
- Device Successfully Adds
- Folder Populates in Internal Cresnet Gateway with "DIN-8SWU8 Name" **>> What is this for?**
- I can add any of the Relay Controlled Devices in CH to the output bew controlled by the Ubiquiti device(s)
  - Light (Need to create. This would allow the device to work as a native switched lighting load)
  - Generic Relay
  - Screen **>> What is a screen in this case?**
  - Gates
  - Garage Door
- Power Reporting
  - Enable / Disable

---

#### User Story CHOME-113677
- **Summary:** Ubiquiti G6 Pro Entry || About the device 

##### Use Case (Jira Description):
As a dealer, I want to see the information about the door station(s) such as the serial number and firmware version.

##### Acceptance Criteria (verbatim from Jira):
The following information shall be included on the About tab for the camera:

- id - The primary key of camera
- model key - The model key of the camera
- state - Connection state of the device.
- name - the name of the camera
- MAC address - The MAC address of the device

---

#### User Story CHOME-113890
- **Summary:** Ubiquiti G6 Doorbell Pro || Device Specific settings

##### Use Case (Jira Description):
As a Dealer, I want to use Configure Pro to configure advanced settings.

* name - The name of the camera
* osdSettings - On Screen Display settings.
* ledSettings - LED settings.
* lcdMessage - Message that's set on the LCD screen (for doorbells and/or other devices with LCD screens). To upload image assets for the LCD screen, use the `/files/{fileType}` endpoint.
* micVolume
* videoMode - Current video mode of the camera
  Enum: default, highFps, sport, slowShutter, lprReflex, lprNoneReflex
* hdrType - High Dynamic Range (HDR) mode setting.
  Enum: auto, on, off
* smartDetectSettings - Smart detection settings for the camera.

##### Acceptance Criteria (verbatim from Jira):
Given that I am a dealer trying to configure my clients Ubiquiti door station(s)
When I am setting up a home system that contgains Ubiquiti doorbell cameras and intercoms
Then

---

#### User Story CHOME-113742
- **Summary:** Document third-party devices in Crestron Home OS Documentation

##### Use Case (Jira Description):
Document supported third-party devices, including relay controlled locks and Ubiquiti door stations, in the Crestron Home OS Documentation under the Third Party Devices section. 

This will help dealers quickly find available third-party products via the Crestron Manual.

##### Acceptance Criteria (verbatim from Jira):
*(AC field is empty in Jira)*

---

#### User Story CHOME-113914
- **Summary:** Ubiquiti G6 Pro Entry || Scenes

##### Use Case (Jira Description):
As a Dealer, I want to include each of the output channels from the Ubiquiti doorbell that are configured as Lights in lighting scenes and shade scenes.

##### Acceptance Criteria (verbatim from Jira):
For each of the outputs set as lighting on the outputs of the Ubiquiti doorbell, I can do the following in the Crestron Home Lighting Scene Editor.

- Add / Remove a Lighting load to a scene
- Turn the load on / off from the scene editor

The same scene control functions are available in the Setup app and the End User App

For each of the outputs set as Shades on the outputs of the Ubiquity doorbell, I can do the following in the Crestron Home Shades Scene Editor.

- Add / Remove a Shade or Drape  to a scene
- Turn the Shade or Drape on / off from the scene editor
The same scene control functions are available in the Setup app and the End User App

---

#### User Story CHOME-113916
- **Summary:** Ubiquiti G6 Pro Entry || Conditionals and Variables

##### Use Case (Jira Description):
As a Dealer, I want to use the State from a device assigned to an I/O input of a Ubiquiti doorbell within a Conditional used in my configuration.

##### Acceptance Criteria (verbatim from Jira):
*(AC field is empty in Jira)*

---

#### User Story CHOME-113917
- **Summary:** Ubiquiti G6 Pro Entry || Events

##### Use Case (Jira Description):
As a Dealer, I want to be able to program to Events from each device associated with an Input or output channel of the Ubiquiti doorbell 

##### Acceptance Criteria (verbatim from Jira):
*(AC field is empty in Jira)*

---

#### User Story CHOME-113918
- **Summary:** Ubiquiti G6 Pro Entry || Sequences

##### Use Case (Jira Description):
As a Dealer, I want to add control for any device associated with an output of the Ubiquiti doorbell and/or gateway to a Sequence in Crestron Home.

##### Acceptance Criteria (verbatim from Jira):
*(AC field is empty in Jira)*

---

#### User Story CHOME-114191
- **Summary:** Ubiquiti G6 Pro Entry, Ubiquiti UDM || Routing

##### Use Case (Jira Description):
*(No description in Jira)*

##### Acceptance Criteria (verbatim from Jira):
*(AC field is empty in Jira)*

---

#### User Story CHOME-113741
- **Summary:** Integrate Ubiquiti events, commands, and feedback states within Crestron Home programming

##### Use Case (Jira Description):
Use Ubiquiti events, commands, and feedback states within the Crestron Home programming ecosystem to allow homeowners/residents to configure lighting scenes that run automatically when a doorbell is pressed and to turn on exterior lights when motion is detected near an entry. Include configurable scene selection, adjustable motion sensitivity, and configurable motion categories (person, car, animal, environment). Add all commands to sequences, handle device-specific events, support device-specific properties in conditionals and variables, and control scenes with lighting, shades, general I/O, etc.

##### Acceptance Criteria (verbatim from Jira):
*(AC field is empty in Jira)*

---

## Epic: Touch Panels — Improved In-Home Experience
**Jira Epic:** [CHOME-116727](https://crestroneng.atlassian.net/browse/CHOME-116727)

### Epic Description (verbatim from Jira):
## Reacting to a Doorbell Push Notification on a Crestron Touch panel

**User Value**
End users can respond to visitors at the door when at home without continuous interruption

**User Journey**

1. Visitor presses the button on the **Door Station**
2. All confgured touch panels play a notification sound (persistent ring?)
3. User taps the notification on a panel
4. Crestron Home app **prioritizes the door station call screen**
5. Live video from the door station camera is displayed.
6. User can trigger **quick actions** from the call screen (e.g., unlock gate via relay, scene trigger)
7. User can choose to **answer or dismiss** the call
8. If answered, **bi‑directional audio** is established

---

#### User Story CHOME-113611
- **Summary:** Touch Panels || Ubiquiti Door Station Integration

##### Use Case (Jira Description):
  🎯 Goals and Outcomes

Users that use Ubiquiti doorbell cameras and intercoms can

* respond to visitors from within the home
* perform quick actions to
    * unlock the door
    * open garage doors
    * open gates
    * send temporary PINs
    * execute scenes

Acceptance Criteria:

* When a Ubiquiti doorbell is pressed, all Crestron Home touch panels ring persistently until answered or time out.
* Two-way audio and one-way video call functionality from each touch panel when answered.
* Ability to trigger predefined quick actions during an active door call
* Ability to view the door station and entry cameras live from the Crestron Home app
* Integration tested with Ubiquiti doorbell devices.

##### Acceptance Criteria (verbatim from Jira):
*(AC field is empty in Jira)*

---

#### User Story CHOME-113614
- **Summary:** In Home || Launch directly into the relevant call screen with live camera view on my touch screens from a door station press

##### Use Case (Jira Description):
As a homeowner/resident, I want to launch directly into the relevant live camera view in the Crestron Home app from a door-related notification so that I can quickly assess the situation.

##### Acceptance Criteria (verbatim from Jira):
- **Given** that the end user is at home
- **When** a visitor presses the door station
- **Then** I want to immediately see and hear the visitor on the Crestron touch panels without the need for interaction
- And be presented with some choices of actions to
    - Answer
    - Dismiss
    - Send an automated message
- And once I choose an action from one panel all calls to other panels should end.

---

#### User Story CHOME-113615
- **Summary:** In Home || Receive a persistent ring on my Crestron touch screen(s) when the doorbell is pressed

##### Use Case (Jira Description):
As a homeowner/resident, I want to receive a persistent doorbell notification on my Crestron touch panel(s) when a doorbell is pressed so that I can quickly decide whether to answer, ignore, or review later.

##### Acceptance Criteria (verbatim from Jira):
The doorbell should prompt the user for actions:

- Answer
- Ignore
- what else does it do today?

---

#### User Story CHOME-113616
- **Summary:** In Home || Answer the call with two-way audio and one-way video from a Crestron touch screen

##### Use Case (Jira Description):
As a homeowner/resident, I want to answer a doorbell call (entry way, gate) with two-way audio and one-way video **from a Crestron touch panel** so that I can interact with visitors while at home.

##### Acceptance Criteria (verbatim from Jira):
Touch panel auto-launches Call UI.

User hears ring and sees one-way video stream

User can answer the "call" and establshes two-way audio

---

#### User Story CHOME-113621
- **Summary:** In Home || View the door station and entry cameras live from the touch screens

##### Use Case (Jira Description):
As a homeowner/resident, I want to view the door station and entry cameras live from the Crestron Home app on my touch panel(s) so that I can monitor my property in real time.

##### Acceptance Criteria (verbatim from Jira):
Camera of the Door Station must be made visible on the Whole House Camera page after it is added to the system

Snapshot and Camera Stream must be made available

This should populate automatically when we commission the door station device

UI Link: https://www.figma.com/design/uXgBee3HBSx5p05IaZ4oIT/Crestron-Home-4.0-UX?node-id=7235-426443&m=dev

*(image: image-20260422-144613.png)*

 Example of existing manual camera add

*(image: image-20260422-182515.png)*

---

#### User Story CHOME-113622
- **Summary:** In Home || Trigger predefined quick actions during an active door call(unlock/gate open/scenes)

##### Use Case (Jira Description):
As a homeowner/resident, I want to trigger predefined quick actions (like unlock, gate open, or scenes) during an active door call so that I can manage access and environment conveniently.

##### Acceptance Criteria (verbatim from Jira):
Quick actions are visible as an overlay on the active call video panel

​[2N® Door Stations Screen | Crestron Home OS Documentation](https://docs.crestron.com/en-us/8525/Content/CP4R/Operation/Door-Stations.htm?Highlight=2n)

Actions must be secure and logged.

*(image: image-20260422-181958.png)*
*(image: image-20260422-182009.png)*

---

#### User Story CHOME-115739
- **Summary:** Customize the ring notification on the Crestron touch panels.

##### Use Case (Jira Description):
As a homeowner/resident, I want to customize the ring tone and ringing behavior for door station calls on each touch panel,
so that doorbell and detection events are noticeable but appropriate for each room.

##### Acceptance Criteria (verbatim from Jira):
**Given** a door station generates a call‑eligible event (for example: doorbell press or supported detection),
**When** the event is routed to Crestron Home touch panels,
**Then** the system shall use the ring tone configured for each individual touch panel,

**And** I shall be able to select a ring tone per touch panel from the available options,
**And** I shall be able to configure the number of rings or ring duration per touch panel,
**And** different touch panels may use different ring tones or ring counts for the same door station event,
**And** the configured ring behavior shall persist across system restarts,
**And** changing the ring tone or ring count shall not require re‑commissioning the touch panel,
**And** disabling ringing on a touch panel shall prevent audio alerts while still allowing visual call indication.

---

#### User Story CHOME-116146
- **Summary:** Answering a call from the door station on one device will end or dismiss the call on all other devices

##### Use Case (Jira Description):
Answering a phone call from the door station on one device will end or dismiss all calls & notifications to all other devices.

##### Acceptance Criteria (verbatim from Jira):
- **Given** a that someone pushed the button on the door station
- **When** a phone call is made to the all **registered** devices,
- **And** one of the registered users answers the phone call
- **Then** the notifications (push notifications and phone calls) to all other registered users/devices shall be canceled.

---

## Epic: Advanced Features
**Jira Epic:** [CHOME-118331](https://crestroneng.atlassian.net/browse/CHOME-118331)

*Capabilities beyond the core visitor-notification flow: geolocation-based suppression, event history, motion notifications, notification recipient administration, multi-device dismissal, PIN/relay-lock features, and automated messaging.*

*(No epic description in Jira)*

---

#### User Story CHOME-117307
- **Summary:** In Home | Use geolocation to recognize a user is home or away

##### Use Case (Jira Description):
As a homeowner/resident, I want to the recognize when I am home or away from home so that I can automatically turn mobile notifications on and off based on my location.

##### Acceptance Criteria (verbatim from Jira):
*(AC field is empty in Jira)*

---

#### User Story CHOME-113690
- **Summary:** Reviewing doorbell events history

##### Use Case (Jira Description):
As a homeowner/resident, I want to tap a doorbell notification on my mobile device(s) and open the Crestron Home app and see the camera of the doorstation even if someone is no longer at the door

##### Acceptance Criteria (verbatim from Jira):
Sunny Day Scenario

- Given I have received a push notification for a "Doorbell" event,
- And I missed the earlier notification
- When I tap the old notification on my mobile device well after the doorbell event occurred
  - [This is the same as if the notification just came in]
- Then the door station preview screen shall launch immediately within the Crestron Home app
- And the screen shall default to one-way audio and one-way video (stream from the door to the phone)
- And the screen shall display the following actionable buttons:
  - Chat: Initiates the two-way communication flow.
  - Unlock / Lock: Toggles the current state of the associated door lock.
  - Exit / Cancel

**Scenario: Notification delivery when processor is temporarily disconnected from cloud**

- Given the Crestron processor loses its cloud connection momentarily
- When the door station button is pressed during the outage
- Then the event is still queued or logged
- And upon reconnection, the system does not retroactively deliver a stale notification
- And the user can see details about the doorbell event in the history log.

---

#### User Story CHOME-113694
- **Summary:** Receive a push notification on my mobile device(s) when motion is detected

##### Use Case (Jira Description):
As a homeowner/resident, I want to receive a push notification on my mobile device(s) when a doorbell is pressed so that I can quickly decide whether to answer, ignore, or review later.

##### Acceptance Criteria (verbatim from Jira):
Notification is a standard mobile OS push notification

Notification is received withing 1 second

Notifications are sent to iOS & Android devices

---

#### User Story CHOME-113700
- **Summary:** An Owner selects who will get push notifications from the door station(s)

##### Use Case (Jira Description):
As a homeowner/resident, I want to invite others to respond to notifications and select/configure users for different notification types.

##### Acceptance Criteria (verbatim from Jira):
**Given** that I am an Owner in my Crestron Home system,

**When** I enter the Settings > Users menu for my house,

**Then** I have the option to Add New Users,

**And** can change attributes for existing Users,

**And** they will have access to the settings to enable push notifications for door stations in the home.

### Alternate Scenarios

#### Scenario: Owner disables notifications for a user

- Given a user currently receives door station push notifications
- When the Owner disables notifications for that user in Settings > Users
- Then that user's devices stop receiving notifications immediately
- And in-flight notifications already delivered are not retracted

#### Scenario: Non-owner user tries to change another user's notification settings

- Given a user with a non-Owner role is in the app
- When they attempt to navigate to Settings > Users to modify another user's notification preferences
- Then the settings are either hidden or read-only for non-Owner roles
- And a clear message explains that only Owners can manage user settings

#### Scenario: Invited user has not yet accepted — notification behavior

- Given an invite has been sent but not yet accepted
- When the door station button is pressed
- Then the pending user does not receive notifications
- And notifications only begin upon invite acceptance and device registration

---

#### User Story CHOME-113738
- **Summary:** Link Relay controlled lock to Ubiquiti door station for PIN code creation

##### Use Case (Jira Description):
Enable linking of relay controlled locks to Ubiquiti door stations to allow end-users to create PIN codes via the end-user application. This feature is requested by dealers to enhance user control over door lock access.

##### Acceptance Criteria (verbatim from Jira):
*(AC field is empty in Jira)*

---

#### User Story CHOME-113739
- **Summary:** Add relay controlled lock option in Configure Pro

##### Use Case (Jira Description):
Implement a relay control lock option in Configure Pro with the same functionality as garage and gates today. Reference issue CHOME-80924 for related details on Door Locks and Relay Controlled Door Locks.

##### Acceptance Criteria (verbatim from Jira):
*(AC field is empty in Jira)*

---

#### User Story CHOME-113740
- **Summary:** Create PIN codes for locks controlled by Crestron, Ubiquity I/O, or Relays

##### Use Case (Jira Description):
Develop functionality to create PIN codes for locks controlled by Crestron, Ubiquity I/O, or relays. Include the ability to send a temporary PIN for supported door stations.

##### Acceptance Criteria (verbatim from Jira):
*(AC field is empty in Jira)*

---

#### User Story CHOME-116068
- **Summary:** An Owner selects who will get phone calls from the door station(s)

##### Use Case (Jira Description):
As a homeowner/resident, I want to invite others to respond to notifications and select/configure users for different notification types.

##### Acceptance Criteria (verbatim from Jira):
- Given that I am an Owner in my Crestron Home system,
- When I enter the Settings > Users menu for my house
- Then I have the option to Add New Users
- And can change attributes for new & existing Users so they will have access to the settings to enable push notifications for door stations in the home

---

#### User Story CHOME-116147
- **Summary:** Dismiss all phone calls & push notifications to other devices

##### Use Case (Jira Description):
As a homeowner/resident, I want all other notifications for a doorbell press to be canceled when someone answers one of them.

##### Acceptance Criteria (verbatim from Jira):
- **Given** a that someone pushed the button on the door station
- **When** a push notification is sent to the all **subscribed** devices,
- **And** one of the subscribed users opens the push notification
- **Then** the notification to all other registered users/devices shall be canceled.

---

#### User Story CHOME-118594
- **Summary:** Send an automated message to the door station

##### Use Case (Jira Description):
As a homeowner, I want to send an automated message as a response to a door station notification so I can communicate with the person at the door or gate without talking.

##### Acceptance Criteria (verbatim from Jira):
Door station must support text to speech.

---

# Platform & Driver Epics (engineering)

## Epic: Platform Support — Push Notifications
**Jira Epic:** [CHOME-116008](https://crestroneng.atlassian.net/browse/CHOME-116008)

*Platform-level engineering work required to deliver reliable push notification delivery for door station events across iOS, Android, and Crestron Home touch panels. This epic contains platform engineering tasks rather than user stories:*

- CHOME-116009 — Platform support || Push Notifications || Analyze the user stories and come up with high level design and task breakdown
- CHOME-116572 — Create a POC for the Push Notification
- CHOME-116573 — Setup Crestron Home and Mobile App and Enable Interrupt feature
- CHOME-116574 — Understand the Interrupt Feature and learn the interrupt sub-system
- CHOME-116575 — Analyse the interrupt feature as Notification Sink and make sure this feature works as like current - Backward compatibility
- CHOME-116576 — Create a Notification Framework and include interrupt sink under the notification FW
- CHOME-116578 — Create a Mobile CRPC interface for device registration and Un Registration
- CHOME-120056 — Create Push Notification Foundation
- CHOME-120059 — Define Push Notification Message Data Contract
- CHOME-120065 — Define Common Push Tag Enum and Share with Mobile
- CHOME-120072 — High-level Design and Architecture for 2N Integration
- CHOME-120182 — [Spike] Explore generic Entry driver which is completely configurable using configuration file and connect to the cloud service

---

## Epic: Drivers — Door Station Driver
**Jira Epic:** [CHOME-120692](https://crestroneng.atlassian.net/browse/CHOME-120692)

*Driver engineering for the door station integration (2N first). Engineering tasks:*

- CHOME-120062 — Implement 2N Capabilities
- CHOME-120064 — Persist 2N Driver Settings in CH Server
- CHOME-120068 — Integrate Push Notification Framework with 2N Door Station Driver

---

#### User Story CHOME-120954
- **Summary:** Upload a pre-configured automation script

##### Use Case (Jira Description):
*(No description in Jira)*

##### Acceptance Criteria (verbatim from Jira):
*(AC field is empty in Jira)*
