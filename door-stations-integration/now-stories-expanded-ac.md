# Door Stations — NOW Stories: Expanded Acceptance Criteria
**Initiative:** [CHOME-113883](https://crestroneng.atlassian.net/browse/CHOME-113883)

> Each story shows the **existing Jira AC** (verbatim, as the happy path baseline) followed by **expanded scenarios** covering corner cases, error paths, and edge conditions that fall under the same user intent. These are candidates to add to Jira — not replacements for what's already there.

---

## Epic 4: Device Support — 2N Door Stations

---

### [CHOME-114755](https://crestroneng.atlassian.net/browse/CHOME-114755) — 2N Door Station: my2N Registration

**Use Case:** As a dealer, I want to register my clients to the my2N portal so they can receive notifications when not home.

#### Existing AC (Jira)
- Given the installer is setting up a 2N door station in Configure Pro
- When the installer adds a device to a room and the device is added
- Then the my2N registration flow is initiated
- And the installer can seamlessly register the client for the subscription *(my2N Registration flow TBD)*

#### Expanded Scenarios

**Scenario: Client already has a my2N account**
- Given the installer initiates the my2N registration flow
- When the dealer enters the client's email address
- And that email is already linked to an existing my2N account
- Then the system links the existing account rather than creating a duplicate
- And the dealer is informed the account already exists and has been connected

**Scenario: Client declines to register during commissioning**
- Given the my2N registration flow is initiated during device add
- When the dealer skips or dismisses the registration step
- Then the device is still added and functional for local operation
- And a persistent prompt or indicator remains in Configure Pro to complete registration later
- And the homeowner does not receive mobile push notifications until registration is completed

**Scenario: Registration flow fails due to network error**
- Given the dealer is in the my2N registration flow
- When a network timeout or API error occurs during registration
- Then the dealer is shown a clear error message with the reason
- And the device addition is not rolled back — the 2N device remains in the system
- And the dealer can retry registration without recommissioning the device

**Scenario: my2N subscription is expired or lapsed**
- Given a client was previously registered and their my2N subscription has expired
- When the dealer or homeowner attempts to use push notifications
- Then the system surfaces a clear message that the subscription is inactive
- And provides a path to renew without contacting Crestron support

**Scenario: Dealer registers multiple units (MDU context)**
- Given the dealer is commissioning multiple units in the same building
- When registering each unit's homeowner to my2N
- Then each unit's registration is independent with its own account and credentials
- And one unit's registration failure does not block other units from completing

---

### [CHOME-114752](https://crestroneng.atlassian.net/browse/CHOME-114752) — 2N Door Station: Scenes

**Use Case:** As a dealer, I want to include 2N door station output channels in lighting and shade scenes.

#### Existing AC (Jira)
- For each output configured as a Light: dealer can Add/Remove it to a lighting scene and turn it on/off from the scene editor
- For each output configured as a Shade/Drape: dealer can Add/Remove it and turn it on/off from the shade scene editor
- Same scene control functions available in Setup app and End User app

#### Expanded Scenarios

**Scenario: Output type changes after scene is created**
- Given a 2N output has been added to a lighting scene as a Light
- When the dealer later reconfigures that output as a Generic Relay
- Then the scene editor flags the affected scene with a warning
- And the dealer is prompted to review and update the scene before saving

**Scenario: 2N device goes offline while a scene is triggered**
- Given a lighting scene includes a 2N-connected load
- When the scene is triggered but the 2N device is offline
- Then the rest of the scene executes for all other loads
- And the 2N load failure is logged
- And the homeowner or dealer is notified of the partial execution

**Scenario: No outputs configured as Lights**
- Given a 2N door station has been commissioned with no outputs assigned as Lights
- When the dealer opens the Lighting Scene Editor
- Then no 2N loads appear as available participants
- And the scene editor does not show an error — the absence is treated as expected

**Scenario: Scene triggered from End User app**
- Given a scene containing a 2N lighting load has been configured by a dealer
- When the homeowner triggers the scene from the Crestron Home end-user app
- Then the 2N-connected light responds identically to how it would respond when triggered from the Setup app

---

### [CHOME-114751](https://crestroneng.atlassian.net/browse/CHOME-114751) — 2N Door Station: Conditionals and Variables

**Use Case:** As a dealer, I want to use I/O input states from a 2N door station in Conditionals.

#### Existing AC (Jira)
- *(Empty — no AC written yet)*

#### Expanded Scenarios

**Scenario: I/O input state used in a Conditional (happy path)**
- Given a contact sensor is assigned to an I/O input on the 2N door station
- And the dealer has opened the Conditionals editor in Crestron Home
- When the dealer creates a Conditional referencing that input's state
- Then the Conditional evaluates correctly when the sensor opens or closes

**Scenario: I/O input device is unassigned after a Conditional is created**
- Given a Conditional references a 2N I/O input that was previously assigned to a device
- When the dealer removes the device assignment from that input
- Then the Conditional is flagged as having an invalid or unresolved reference
- And the system does not silently evaluate the Conditional as true or false

**Scenario: Multiple I/O inputs used in a single Conditional**
- Given a 2N door station has two inputs assigned (e.g. motion sensor and entry sensor)
- When the dealer creates a Conditional combining both input states with AND logic
- Then the Conditional evaluates only when both conditions are simultaneously true

**Scenario: I/O input state persists through a 2N device reboot**
- Given a Conditional is evaluating a 2N I/O input state
- When the 2N device reboots and reconnects
- Then the input state is re-read from the device after reconnection
- And the Conditional resumes evaluating correctly without requiring a configuration change

---

### [CHOME-114750](https://crestroneng.atlassian.net/browse/CHOME-114750) — 2N Door Station: Events

**Use Case:** As a dealer, I want to program to Events from 2N door station input and output channels.

#### Existing AC (Jira)
- *(Empty — no AC written yet)*

#### Expanded Scenarios

**Scenario: Doorbell press event triggers a programmed action (happy path)**
- Given a 2N door station is commissioned with a button input configured
- And the dealer has programmed an Event for the doorbell press
- When a visitor presses the doorbell button
- Then the programmed Event fires and executes the associated action (e.g. turn on exterior light)

**Scenario: Motion detection event triggers an action**
- Given a 2N door station has motion detection enabled
- And the dealer has programmed an Event for motion detected
- When the door station detects motion
- Then the Event fires and the associated action executes

**Scenario: Relay state change event triggers an action**
- Given a 2N door station output relay is configured
- And the dealer has programmed an Event for relay state change
- When the relay opens or closes (e.g. gate actuated)
- Then the Event fires for both state changes (open and close) independently

**Scenario: Rapid successive events (debounce)**
- Given a doorbell press Event is programmed
- When a visitor presses the doorbell button multiple times in rapid succession
- Then the Event fires once per defined cooldown window
- And subsequent presses within the window are suppressed and logged but do not trigger duplicate actions

**Scenario: Event fires when 2N device comes back online after outage**
- Given a 2N device was offline and has reconnected
- When the device reconnects and its state has changed (e.g. a relay was manually actuated during the outage)
- Then queued or missed events are handled gracefully — either replayed or discarded per configuration
- And the dealer can review missed events in the event log

---

### [CHOME-114749](https://crestroneng.atlassian.net/browse/CHOME-114749) — 2N Door Station: Sequences

**Use Case:** As a dealer, I want to add 2N door station output channel control to Sequences.

#### Existing AC (Jira)
- *(Empty — no AC written yet)*

#### Expanded Scenarios

**Scenario: Relay-controlled gate added to a Sequence (happy path)**
- Given a gate motor is connected to a 2N door station relay output and commissioned
- When the dealer creates a Sequence and adds the gate as a step
- Then the Sequence editor lists the 2N-connected gate as an available action
- And executing the Sequence sends an open or close command to the gate motor

**Scenario: Sequence contains a mix of 2N and non-2N devices**
- Given a Sequence includes both a 2N relay-controlled light and a native Crestron dimmer
- When the Sequence executes
- Then all steps fire in the defined order regardless of device type
- And a failure on the 2N step does not abort subsequent steps unless configured to do so

**Scenario: Sequence step fails because 2N device is offline**
- Given a Sequence includes a 2N output control step
- When the Sequence executes but the 2N device is offline
- Then the failed step is logged with a timestamp and reason
- And the dealer or homeowner can view the failure in the system log

**Scenario: Sequence triggered by a door station Event**
- Given a Sequence has been programmed to run when the 2N doorbell is pressed
- When a visitor presses the doorbell
- Then the Event fires and triggers the full Sequence (e.g. turn on porch light, unlock door, send notification)

---

### [CHOME-114748](https://crestroneng.atlassian.net/browse/CHOME-114748) — 2N Door Station: Routing

**Use Case:** As a dealer, I want to route I/O and relay-connected devices from 2N hardware in Configure Pro.

#### Existing AC (Jira)
- *(Empty — no AC written yet)*

#### Expanded Scenarios

**Scenario: Relay output routed to a gate (happy path)**
- Given a 2N door station is commissioned in Configure Pro
- When the dealer opens the routing configuration and assigns relay output 1 to a Gate device type
- Then the gate appears as a controllable device in the homeowner's Crestron Home app
- And the dealer can verify the routing by triggering a test open/close command from Configure Pro

**Scenario: Same relay output reassigned to a different device type**
- Given relay output 1 has been routed to a Gate
- When the dealer changes the routing to assign it to a Garage Door instead
- Then the previous Gate assignment is removed
- And the Garage Door device replaces it in the homeowner's app without requiring a full recommission

**Scenario: I/O input routed to an entry sensor**
- Given a magnetic entry sensor is wired to a 2N I/O input
- When the dealer assigns that input to an Entry Sensor device type in Configure Pro
- Then the sensor state (open/closed) is visible in the Crestron Home system
- And the state can be used in Conditionals, Events, and Sequences

**Scenario: Routing attempted on a disconnected 2N device**
- Given a 2N door station is offline (disconnected from the network)
- When the dealer attempts to configure routing for that device
- Then the routing interface shows the device as offline
- And the dealer can save the routing configuration, which takes effect when the device reconnects

**Scenario: Multiple 2N devices routed in the same home**
- Given two 2N door stations are commissioned (front door and rear gate)
- When the dealer routes each device's outputs independently
- Then each device's routing is independent — rear gate relay does not appear under front door controls
- And both device routings are visible in a unified routing summary in Configure Pro

---

## Epic 5: Mobile — Push Notifications

---

### [CHOME-113693](https://crestroneng.atlassian.net/browse/CHOME-113693) — Receive a push notification when door station button is pressed

**Use Case:** As a homeowner, I want a push notification when the doorbell is pressed so I can decide whether to answer, ignore, or review later.

#### Existing AC (Jira)
- Given someone pushed the button on the door station
- When the event is received by the Crestron Home system
- Then a push notification shall be sent to the user's mobile devices that are **enabled** for notifications
- And the push notification shall be delivered within **1 second** of the doorbell press event
- And the notification shall be delivered to supported iOS & Android devices

#### Expanded Scenarios

**Scenario: Homeowner has notifications disabled at the OS level**
- Given the homeowner has revoked notification permission for Crestron Home in their device OS settings
- When the door station button is pressed
- Then no notification is delivered to that device
- And no error is surfaced to the visitor or the system — the failure is silent to the door station
- And the homeowner's in-app notification preference is unaffected (it reflects the OS-level block separately)

**Scenario: Homeowner has multiple registered devices**
- Given the homeowner has two devices registered (iPhone and iPad) both with notifications enabled
- When the door station button is pressed
- Then a push notification is delivered to both devices within 1 second
- And when the homeowner acts on one device, the notification on the other device is dismissed (see CHOME-116147)

**Scenario: Door station button is pressed rapidly multiple times**
- Given a visitor presses the doorbell button 3 times within 5 seconds
- When the events are received by the Crestron Home system
- Then only one push notification is delivered per defined cooldown window (debounce)
- And subsequent presses within the cooldown window are logged but do not generate additional notifications

**Scenario: Notification delivery when processor is temporarily disconnected from cloud**
- Given the Crestron processor loses its cloud connection momentarily
- When the door station button is pressed during the outage
- Then the event is queued or logged locally
- And upon reconnection, the system does not retroactively deliver a stale notification
- And the missed event is visible in the door station event log

**Scenario: Notification received while homeowner is on a phone call**
- Given the homeowner is on an active cellular call on their iOS or Android device
- When the door station button is pressed
- Then a push notification is delivered and visible in the notification shade or banner
-  And the /Android system should display a notification banner at the top of the screen
- And the iOS/Android system should play a soft system audio chirp (tri-tone) instead of the full custom app sound to protect call audio

**Scenario: Notification for a 2N door station requires active my2N subscription**
- Given the homeowner's 2N device is configured but their my2N subscription has expired
- When the door station button is pressed
- Then no push notification is delivered to the homeowner's mobile device
- And the homeowner sees an in-app indicator that their notification service is inactive

---

### [CHOME-117707](https://crestroneng.atlassian.net/browse/CHOME-117707) — Register and unregister mobile devices for push notifications

**Use Case:** As a homeowner, I want to enable or disable push notifications for my homes from the mobile app.

#### Existing AC (Jira)
Seven scenarios already defined (navigate to settings, first-time enable, OS permission denied, disable, persists across restarts, per-device, per-home, new invite default-on).

#### Expanded Scenarios

**Scenario: User removes the app and reinstalls**
- Given the homeowner had push notifications enabled for a Home
- When they delete and reinstall the Crestron Home app on the same device
- Then upon signing back in, they are prompted to re-enable notifications (the OS token has changed)
- And the previous notification preference is not silently restored without re-granting OS permission

**Scenario: Device OS token changes (e.g. after iOS update)**
- Given the homeowner has push notifications enabled
- When the device's APNs or FCM token changes due to an OS update or app reinstall
- Then the new token is automatically registered with the system on next app launch
- And notifications resume without the homeowner needing to toggle the setting off and back on

**Scenario: User is removed from a Home by the Owner**
- Given a user has push notifications enabled for a Home they were invited to
- When the Owner removes that user from the Home
- Then the removed user's device is unregistered for notifications for that Home
- And the user no longer receives notifications for that Home immediately upon removal

**Scenario: Notification toggle disabled while a doorbell event is in-flight**
- Given a push notification has already been sent to the device
- When the homeowner disables notifications in the app before tapping the notification
- Then the already-delivered notification remains actionable on the lock screen
- And subsequent doorbell events do not generate new notifications until re-enabled

---

### [CHOME-113691](https://crestroneng.atlassian.net/browse/CHOME-113691) — Tapping the push notification opens the Crestron Home app preview screen

**Use Case:** As a homeowner, I want tapping a doorbell notification to show me who's at the door in the app.

#### Existing AC (Jira)
- Given I received a push notification for a "Doorbell" event
- When I tap the notification
- Then the preview screen launches within **2 seconds**
- And defaults to one-way audio (within 2s) and one-way video (within 5s)
- And shows: Chat/Unmute icon, Hangup icon, up to 4 programmable quick actions

#### Expanded Scenarios

**Scenario: App is not installed or has been force-quit**
- Given the Crestron Home app is force-quit (not running in background)
- When the homeowner taps the doorbell push notification
- Then the app launches from cold start and still navigates directly to the preview screen
- And the 2-second launch SLA is measured from tap, not from when the app was last active

**Scenario: Video stream fails to connect within 5 seconds**
- Given the homeowner has tapped the notification and the preview screen is open
- When the video stream does not establish within 5 seconds
- Then the screen shows a visual placeholder (e.g. spinner or last known snapshot) rather than a blank screen
- And the audio stream continues if it has connected
- And a retry option is visible to the homeowner

**Scenario: Visitor has already left before the homeowner taps the notification**
- Given the homeowner taps the notification more than 30 seconds after the doorbell press
- When the preview screen opens
- Then the camera view loads and shows the current state of the door station (live, even if no visitor is present)
- And the experience is identical to CHOME-113690 (late notification behavior)

**Scenario: Multiple notifications received — homeowner taps the older one**
- Given the homeowner has two unread doorbell notifications from different door stations
- When the homeowner taps the older notification
- Then the preview screen opens for the door station associated with that specific notification
- And tapping the newer notification opens the correct alternate door station

**Scenario: Preview screen opened while device is on Wi-Fi vs. cellular**
- Given the homeowner's device is connected via cellular (not home Wi-Fi)
- When the preview screen opens
- Then audio and video streams establish using the available network path
- And the homeowner is not required to be on the home network for the preview to function

---

### [CHOME-113688](https://crestroneng.atlassian.net/browse/CHOME-113688) — Talk with the visitor via the Crestron Home app

**Use Case:** As a homeowner, I want to communicate with the person at the door.

#### Existing AC (Jira)
- Given I am on the Preview screen
- When I select the Chat / Start Talking / Microphone / Mute icon
- Then the app automatically enables two-way audio on my mobile device
- And I see a visual indicator confirming the microphone is active

#### Expanded Scenarios

**Scenario: Homeowner mutes themselves during a conversation**
- Given two-way audio is active
- When the homeowner taps the microphone/mute icon
- Then their outbound audio is muted
- And the visual indicator changes to reflect the muted state
- And the visitor's incoming audio continues unaffected
- And the homeowner can unmute by tapping again

**Scenario: Visitor cannot hear the homeowner (one-sided audio)**
- Given two-way audio was established
- When the homeowner speaks but the visitor reports no audio
- Then the app provides a visual indicator of outbound audio level (e.g. microphone activity waveform)
- So the homeowner can self-diagnose a mute or permission issue

**Scenario: Homeowner's device microphone permission is denied**
- Given the homeowner has revoked microphone permission for Crestron Home at the OS level
- When the homeowner taps the Chat icon
- Then the app does not crash or silently fail
- And the app surfaces a prompt explaining that microphone access is required
- And provides a shortcut to the OS settings to grant permission

**Scenario: Two-way audio drops mid-conversation**
- Given two-way audio is active between the homeowner and visitor
- When the audio connection drops due to network instability
- Then the app displays a connection lost indicator
- And attempts to automatically reconnect
- And if reconnection fails within a defined timeout, the homeowner is offered a manual retry

**Scenario: Homeowner ends the conversation**
- Given two-way audio is active
- When the homeowner taps the Hangup icon
- Then the audio session ends immediately
- And the microphone is released (no background audio capture)
- And the preview screen either closes or returns to a one-way view depending on configuration

**Scenario: Two-way video (where device and door station support it)**
- Given the door station supports outbound video from the homeowner's device
- When the homeowner activates Chat
- Then the homeowner is offered the option to enable their camera in addition to audio
- And the visitor sees the homeowner's video feed on the door station display (where supported)

---

### [CHOME-113690](https://crestroneng.atlassian.net/browse/CHOME-113690) — Reviewing missed doorbell events

**Use Case:** As a homeowner, I want to tap a late notification and still see who was at the door.

#### Existing AC (Jira)
- Given I received a push notification for a doorbell or person-detected event, and missed it
- When I tap the old notification
- Then the preview screen launches immediately
- And defaults to one-way audio and video
- And shows: Chat, Unlock/Lock, Exit/Cancel buttons

#### Expanded Scenarios

**Scenario: Notification tapped hours after the event**
- Given a doorbell notification was received 3 hours ago and not yet dismissed
- When the homeowner taps it
- Then the preview screen opens showing the current live camera view (not a recording of the event)
- And a timestamp or indicator shows when the original event occurred

**Scenario: Door station is offline when the late notification is tapped**
- Given the homeowner taps a late notification
- When the door station is currently offline
- Then the preview screen opens and shows an offline state with a clear message
- And the homeowner is not shown a blank or error screen without context
- And cached snapshot (if available) is displayed with an offline indicator

**Scenario: Lock/Unlock action from a late notification**
- Given the homeowner opens the preview screen from a late notification
- When they tap Unlock to let someone in (e.g. a delivery person who left a package)
- Then the unlock command is sent and the door responds as expected
- And the action is logged with the timestamp of when it was triggered (not when the original event occurred)

**Scenario: Multiple missed notifications — oldest tapped first**
- Given the homeowner has 3 unread doorbell notifications spanning 2 hours
- When they tap the oldest one first
- Then the preview screen opens for that specific door station and event
- And navigating back shows the remaining notifications still available to review

---

### [CHOME-113694](https://crestroneng.atlassian.net/browse/CHOME-113694) — Receive a push notification when motion is detected

**Use Case:** As a homeowner, I want a push notification when motion is detected so I can quickly decide my next action.

#### Existing AC (Jira)
- Notification is a standard mobile OS push notification
- Notification is received within 1 second
- Notifications are sent to iOS & Android devices

#### Expanded Scenarios

**Scenario: Motion detected, homeowner taps notification**
- Given motion is detected at the door station
- When the homeowner taps the motion notification
- Then the preview screen opens showing the live camera view for that door station
- And the experience is the same as tapping a doorbell notification (CHOME-113691)

**Scenario: Motion and doorbell press occur within seconds of each other**
- Given motion is detected and then the doorbell is pressed within 3 seconds
- When both events are processed
- Then the homeowner receives a doorbell notification (higher priority) rather than two overlapping notifications
- And the motion event is logged but does not generate a separate notification in the same window

**Scenario: Motion detected repeatedly over a sustained period**
- Given a person is standing near the door station for 2 minutes (sustained motion)
- When motion events continue to be generated
- Then the homeowner receives one notification per defined cooldown window (not one per motion frame)
- And the notification count does not overwhelm the device notification shade

**Scenario: Motion sensitivity configured to low — small animal triggers it**
- Given motion sensitivity is set to a threshold that detects animals
- When a small animal passes the door station
- Then a motion notification is sent per the standard AC
- And the homeowner can review the event and adjust sensitivity settings if desired (separate configuration story)

**Scenario: Motion notification received during Do Not Disturb hours**
- Given the homeowner has configured Do Not Disturb hours in the Crestron Home app
- When motion is detected during those hours
- Then no notification is pushed during the DND window
- And the motion event is still logged for review

---

### [CHOME-113692](https://crestroneng.atlassian.net/browse/CHOME-113692) — Trigger predefined quick actions during an active door call

**Use Case:** As a homeowner, I want to trigger quick actions (unlock, gate open, scenes) during an active door call.

#### Existing AC (Jira)
- Quick actions are visible as an overlay on the active call video panel
- Actions must be secure and logged

#### Expanded Scenarios

**Scenario: Homeowner unlocks door during active call (happy path)**
- Given an active door call is in progress in the Crestron Home mobile app
- When the homeowner taps the Unlock quick action from the overlay
- Then an unlock command is sent to the associated lock
- And the lock responds within a defined timeout (e.g. 3 seconds)
- And the action is logged with: timestamp, user account, device, and action taken

**Scenario: Quick action fails — lock does not respond**
- Given the homeowner taps Unlock during an active call
- When the lock does not acknowledge the command within the timeout
- Then the homeowner sees a failure indicator on the quick action button
- And the audio/video call is not interrupted by the failure
- And the homeowner can retry the action

**Scenario: Quick action triggered by unauthorized user**
- Given a user with Guest role (not Owner) is viewing the call screen
- When the guest attempts to tap a quick action that requires Owner permission (e.g. Unlock)
- Then the action is blocked with a clear message (e.g. "You don't have permission to unlock this door")
- And the blocked attempt is logged

**Scenario: Homeowner triggers a scene quick action**
- Given "Welcome" scene is configured as a quick action on the call overlay
- When the homeowner taps it during an active call
- Then the scene executes (e.g. porch light turns on, gate unlocks)
- And a confirmation indicator appears on the overlay
- And the call continues uninterrupted

**Scenario: Quick action panel obscures video — homeowner dismisses overlay**
- Given the quick action overlay is visible during an active call
- When the homeowner taps outside the overlay or uses a dismiss gesture
- Then the overlay hides and the full video panel is visible
- And a gesture or button to re-show the overlay is available

---

### [CHOME-113689](https://crestroneng.atlassian.net/browse/CHOME-113689) — View door station cameras live from the mobile app

**Use Case:** As a homeowner, I want to view door station cameras live from the mobile app to monitor my property.

#### Existing AC (Jira)
- Camera visible on Whole House Camera page after commissioning
- Snapshot and camera stream available
- One-way audio available when viewing stream
- Populates automatically on commissioning

#### Expanded Scenarios

**Scenario: Homeowner opens camera while visitor is present**
- Given the homeowner navigates to the Whole House Camera page
- When they tap on the door station camera while a visitor is at the door
- Then the live stream opens without requiring a doorbell press
- And one-way audio from the door station is available

**Scenario: Camera stream fails to load**
- Given the homeowner opens the camera for a door station
- When the stream fails to establish within a defined timeout
- Then a clear error state is shown (not a blank screen)
- And the last known snapshot is displayed if available
- And a retry option is visible

**Scenario: Multiple door stations visible on the camera page**
- Given two door stations are commissioned (front door and rear gate)
- When the homeowner opens the Whole House Camera page
- Then both door station cameras appear as distinct entries
- And the homeowner can switch between streams without leaving the page

**Scenario: One-way audio activates automatically on stream open**
- Given the homeowner opens a door station camera stream
- When the stream connects
- Then audio from the door station begins playing through the device speaker automatically
- And the homeowner can mute the incoming audio via a visible control

**Scenario: New door station commissioned — camera auto-populates**
- Given a dealer adds a new Ubiquiti door station in Configure Pro
- When commissioning completes
- Then the camera appears on the homeowner's Whole House Camera page without any manual step required by the homeowner

**Scenario: Camera viewed while device is on cellular**
- Given the homeowner is away from home on cellular data
- When they open the door station camera stream
- Then the stream loads (may be at reduced quality based on bandwidth)
- And there is no hard requirement to be on the home Wi-Fi network

---

### [CHOME-113700](https://crestroneng.atlassian.net/browse/CHOME-113700) — Owner selects who gets push notifications

**Use Case:** As a homeowner, I want to configure which users receive push notifications from door stations.

#### Existing AC (Jira)
- Given I am an Owner in my Crestron Home system
- When I enter Settings > Users menu
- Then I can Add New Users and change attributes for existing users
- And they have access to settings to enable push notifications for door stations

#### Expanded Scenarios

**Scenario: Owner enables notifications for a specific user**
- Given the Owner is in the Settings > Users menu
- When the Owner opens a specific user's profile and enables door station notifications for them
- Then that user's registered devices begin receiving push notifications for door station events
- And the Owner sees a visual confirmation that the setting has been saved

**Scenario: Owner disables notifications for a user**
- Given a user currently receives door station push notifications
- When the Owner disables notifications for that user in Settings > Users
- Then that user's devices stop receiving notifications immediately
- And in-flight notifications already delivered are not retracted

**Scenario: Owner invites a new user and sets notification preference during invite**
- Given the Owner is adding a new user to the home
- When the Owner sends the invite
- Then the Owner can set a default notification preference (on/off) for the new user at invite time
- And the new user can override their own preference after accepting the invite

**Scenario: Non-owner user tries to change another user's notification settings**
- Given a user with a non-Owner role is in the app
- When they attempt to navigate to Settings > Users to modify another user's notification preferences
- Then the settings are either hidden or read-only for non-Owner roles
- And a clear message explains that only Owners can manage user settings

**Scenario: Invited user has not yet accepted — notification behavior**
- Given an invite has been sent but not yet accepted
- When the door station button is pressed
- Then the pending user does not receive notifications
- And notifications only begin upon invite acceptance and device registration

---

### [CHOME-113702](https://crestroneng.atlassian.net/browse/CHOME-113702) — Default notification sounds on mobile devices

**Use Case:** As a homeowner, I expect visitor notifications to instantly tell me someone is at the door.

#### Existing AC (Jira)
- Notification uses a high-priority, attention-demanding alert sound by default
- Alert sound is perceptibly distinct from standard messaging or social app notifications
- Alert shall not be silent by default
- Notification repeats or persists for a defined duration or until acknowledged
- Presents immediate actionable options (Chat, Answer, Dismiss) in the notification bubble
- Displayed using standard OS notification mechanisms on iOS and Android

#### Expanded Scenarios

**Scenario: Device is on silent/vibrate mode**
- Given the homeowner's device is set to silent or vibrate
- When a doorbell notification arrives
- Then the notification is delivered with vibration (if enabled) and appears in the notification shade
- And the app does not override the device's silent mode to force audio playback
- And the notification is still actionable (Chat, Dismiss) from the notification shade

**Scenario: Homeowner is wearing AirPods or Bluetooth headphones**
- Given the homeowner has Bluetooth audio output active (headphones connected)
- When a doorbell notification arrives
- Then the notification alert sound plays through the connected Bluetooth device
- And the sound is not suppressed because audio is routed to headphones

**Scenario: Homeowner customizes notification sound (future state / config)**
- Given the homeowner navigates to notification sound settings in the Crestron Home app
- When they select a different alert sound for door station events
- Then subsequent door station notifications use the selected sound
- And the system default is restored if the custom sound is deleted or unavailable

**Scenario: Notification arrives when app is in foreground**
- Given the homeowner has the Crestron Home app open on screen
- When a doorbell notification arrives
- Then the notification is presented as an in-app alert (banner or modal) rather than an OS-level notification bubble
- And the same actionable options (Chat, Dismiss, View) are available

**Scenario: Notification persists on locked screen**
- Given the homeowner's device is locked and the screen is off
- When a doorbell notification arrives
- Then the screen wakes or the notification appears on the lock screen
- And the homeowner can take action (Chat, Dismiss) directly from the lock screen without unlocking

---

## Epic 6: Mobile — Phone Calls

---

### [CHOME-114324](https://crestroneng.atlassian.net/browse/CHOME-114324) — Receive a phone call when door station button is pressed

**Use Case:** As a homeowner, I want to receive a phone call when the doorbell is pressed so I can be notified even when my phone is not actively in use.

#### Existing AC (Jira)
- Given someone pushed the button on the door station
- When the event is received by the Crestron Home system
- Then a phone call is triggered to the user's **registered** mobile devices
- And the phone call is received within **1 second** of the doorbell being pressed
- And the phone call is triggered on supported iOS & Android devices

#### Expanded Scenarios

**Scenario: Homeowner is already on an active phone call**
- Given the homeowner is on an active cellular or VoIP call
- When the door station button is pressed
- Then the door station call is delivered as a call waiting notification (if the OS supports it)
- And the homeowner can choose to hold the current call and answer the door station call
- And if the homeowner ignores it, the door station call terminates after a defined ring timeout

**Scenario: Phone call goes unanswered — fallback to push notification**
- Given the door station phone call rings on the homeowner's device
- When the homeowner does not answer within the ring timeout
- Then the call terminates
- And a push notification is delivered as a fallback (if push is also enabled)
- And the missed call is logged in the door station event log

**Scenario: Homeowner declines the phone call**
- Given the door station phone call is ringing
- When the homeowner taps Decline
- Then the call terminates immediately
- And the visitor at the door station receives an audio or visual indication that no answer is available
- And the declined call is logged

**Scenario: Phone call received on multiple registered devices**
- Given the homeowner has two devices registered for phone calls (iPhone and iPad)
- When the door station button is pressed
- Then both devices ring simultaneously
- And when the homeowner answers on one device, ringing stops on the other (see CHOME-116146)

**Scenario: Phone call received when device is in Do Not Disturb mode**
- Given the homeowner's device is in Do Not Disturb mode
- When the door station phone call arrives
- Then if the homeowner has configured critical alerts or DND exceptions for Crestron Home, the call rings through
- And if no exception is configured, the call is silenced and appears as a missed call notification

**Scenario: Cellular network is unavailable — device is on Wi-Fi only**
- Given the homeowner's device is on Wi-Fi with no cellular connection
- When the door station button is pressed
- Then the phone call is delivered over the available network path (VoIP over Wi-Fi)
- And the 1-second SLA applies regardless of transport

---

### [CHOME-114337](https://crestroneng.atlassian.net/browse/CHOME-114337) — Answering the phone call opens the Crestron Home app preview screen

**Use Case:** As a homeowner, I want to answer a doorbell phone call and immediately see and hear who is at the door.

#### Existing AC (Jira)
- Given I received a phone call for a "Doorbell" or "Person Detected" event
- When I answer the phone call on my mobile device
- Then the video-first screen launches immediately in the Crestron Home app
- And defaults to one-way audio and video (door to phone)
- And shows: Chat (two-way audio), Unlock/Lock buttons

#### Expanded Scenarios

**Scenario: App is not running when call is answered**
- Given the Crestron Home app is not running in the background
- When the homeowner answers the door station phone call
- Then the app launches from cold start and navigates directly to the preview screen
- And video begins loading immediately without requiring a separate tap

**Scenario: Homeowner answers but video fails to connect**
- Given the homeowner answers the phone call
- When video does not connect within 5 seconds
- Then audio-only mode is active and clearly indicated
- And a visual placeholder (spinner or last snapshot) is shown rather than a blank screen
- And a retry option is available for video without ending the audio

**Scenario: Homeowner escalates to two-way audio mid-call**
- Given the homeowner answered the call and is in one-way audio mode
- When the homeowner taps the Chat icon
- Then two-way audio is established with the visitor
- And the homeowner's microphone is activated with a visual indicator
- And the visitor can hear the homeowner through the door station speaker

**Scenario: Homeowner unlocks door during the answered call**
- Given the preview screen is active after answering the phone call
- When the homeowner taps Unlock
- Then the associated lock receives an unlock command
- And the action is logged
- And the call continues — the unlock does not terminate the call

**Scenario: Call is answered simultaneously on two devices**
- Given the door station call is ringing on both the homeowner's iPhone and their spouse's iPhone
- When both attempt to answer within milliseconds of each other
- Then only one session is established (first-answer wins)
- And the second device is informed the call has already been answered
- And the second device stops ringing (see CHOME-116146)

**Scenario: Homeowner hangs up the phone call**
- Given the homeowner has answered the door station call and is on the preview screen
- When the homeowner taps the Hangup icon or ends the call via the native phone UI
- Then the call terminates cleanly
- And the microphone and camera are released
- And the preview screen closes or returns to the camera view

