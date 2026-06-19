# Initiative: Door Station Support | Mobile Answering & Remote Control
**Jira:** [CHOME-113883](https://crestroneng.atlassian.net/browse/CHOME-113883)

**Vision:** First-class door station support in Crestron Home — enabling homeowners to see, hear, respond to, and control access for visitors from any touch panel or mobile device, whether at home or away. This integration makes Crestron Home a trusted, end-to-end door and access platform rather than an ecosystem of isolated third-party devices.

**Personas:**
- **Homeowner / Resident** — Receives visitor notifications, communicates with visitors, grants access remotely
- **Dealer / Installer** — Discovers, commissions, and configures door station hardware in Configure Pro

**Story Map Structure:** Epics reflect capability areas. Within each epic, stories are organized into NOW / NEXT / LATER swim lanes that match the Story Map Summary at the bottom of this document.

**ID Scheme:** Jira issue keys are used as permanent identifiers (e.g., CHOME-113693). Epic keys are noted at the top of each section.

---

## Epic 1: Touch Panels — Ubiquiti Door Station Integration
**Jira Epic:** [CHOME-113611](https://crestroneng.atlassian.net/browse/CHOME-113611)

*Homeowners and residents can respond to visitors from within the home using Crestron touch panels. Panels ring persistently when a doorbell is pressed; users can answer, view live camera, and trigger quick actions.*

---

### NEXT — Phase B

---

#### User Story CHOME-113614
- **Summary:** Launch directly into the relevant call screen with live camera view on touch screens from a door station press

##### Use Case:
- **As a** homeowner/resident
- **I want to** launch directly into the relevant live camera view in the Crestron Home app from a door-related notification
- **so that** I can quickly assess the situation

##### Acceptance Criteria:
- **Scenario:** Visitor presses the door station button (doorbell)
- **Given:** A Ubiquiti door station button is pressed
- **and Given:** The homeowner is at a Crestron Home touch panel
- **When:** The homeowner taps the notification on the touch panel
- **Then:** The Crestron Home app launches and immediately displays the live camera view for the relevant door station

---

#### User Story CHOME-113615
- **Summary:** Receive a persistent ring on Crestron touch screens when the doorbell is pressed

##### Use Case:
- **As a** homeowner/resident
- **I want to** receive a persistent doorbell notification on my Crestron touch panel(s) when a doorbell is pressed
- **so that** I can quickly decide whether to answer, ignore, or review later

##### Acceptance Criteria:
- **Scenario:** Doorbell is pressed and all configured touch panels ring
- **Given:** A Ubiquiti doorbell is pressed
- **When:** The event reaches the Crestron Home system
- **Then:** All configured touch panels ring persistently until answered, ignored, or timed out; the prompt offers the user actions to Answer or Ignore

---

#### User Story CHOME-113616
- **Summary:** Answer the call with two-way audio and one-way video from a Crestron touch panel

##### Use Case:
- **As a** homeowner/resident
- **I want to** answer a doorbell call (entryway, gate) with two-way audio and one-way video from a Crestron touch panel
- **so that** I can interact with visitors while at home

##### Acceptance Criteria:
- **Scenario:** Homeowner answers a door station call from a touch panel
- **Given:** A door station ring is active on the touch panel
- **When:** The homeowner taps Answer
- **Then:** The touch panel auto-launches the Call UI; the user hears the ring, sees one-way video from the door station, and can establish two-way audio with the visitor

---

#### User Story CHOME-113621
- **Summary:** View the door station and entry cameras live from touch panels

##### Use Case:
- **As a** homeowner/resident
- **I want to** view the door station and entry cameras live from the Crestron Home app on my touch panel(s)
- **so that** I can monitor my property in real time

##### Acceptance Criteria:
- **Scenario:** Homeowner browses to the camera page on a touch panel
- **Given:** A Ubiquiti door station camera is commissioned in Crestron Home
- **When:** The homeowner opens the Whole House Camera page
- **Then:** The door station camera is visible with a live snapshot and stream available; the camera populates automatically after commissioning; one-way audio is available when viewing

---

#### User Story CHOME-113622
- **Summary:** Trigger predefined quick actions during an active door call (unlock / gate open / scenes)

##### Use Case:
- **As a** homeowner/resident
- **I want to** trigger predefined quick actions (unlock, gate open, scenes) during an active door call
- **so that** I can manage access and environment conveniently

##### Acceptance Criteria:
- **Scenario:** Homeowner triggers a quick action during a live door call
- **Given:** A door call is active on a touch panel
- **When:** The homeowner selects a quick action from the call overlay
- **Then:** The action is executed (e.g., unlock gate, trigger scene); actions are secure and logged; the overlay is visible on the active call video panel

---

#### User Story CHOME-115739
- **Summary:** Customize the ring notification on Crestron touch panels

##### Use Case:
- **As a** homeowner/resident
- **I want to** customize the ring tone and ringing behavior for door station calls on each touch panel
- **so that** doorbell and detection events are noticeable but appropriate for each room

##### Acceptance Criteria:
- **Scenario:** Homeowner configures ring tone per panel
- **Given:** The homeowner has access to touch panel notification settings
- **When:** The homeowner selects a ring tone and behavior for a specific panel
- **Then:** That panel uses the selected ring tone and behavior for subsequent door station events; other panels retain their own settings

---

## Epic 2: Touch Panels — Notifications from Door Stations
**Jira Epic:** [CHOME-116727](https://crestroneng.atlassian.net/browse/CHOME-116727)

*Extending the in-home touch panel experience with richer notification handling, including geolocation-based suppression of mobile notifications when the homeowner is at home.*

---

### LATER

---

#### User Story CHOME-117307
- **Summary:** Use geolocation to recognize when a user is home or away

##### Use Case:
- **As a** homeowner/resident
- **I want to** have the system recognize when I am home or away
- **so that** mobile notifications automatically turn on and off based on my location

##### Acceptance Criteria:
- **Scenario:** Homeowner leaves and returns home
- **Given:** Geolocation permission is granted in the Crestron Home mobile app
- **When:** The homeowner's device leaves or enters the home geofence
- **Then:** Mobile push notifications for door station events are automatically enabled when away and suppressed when at home

---

## Epic 3: Device Support — Ubiquiti Doorbell
**Jira Epic:** [CHOME-113671](https://crestroneng.atlassian.net/browse/CHOME-113671)

*Dealers and installers can discover, commission, and configure Ubiquiti door station hardware in Configure Pro. Targeted first-release hardware: UVC-G6-Pro-Entry, UCG-Max, UA-Hub-Door-Mini.*

---

### NEXT — Phase B

---

#### User Story CHOME-113676
- **Summary:** Discover and add the Ubiquiti G6 Pro Entry device in Configure Pro

##### Use Case:
- **As a** dealer
- **I want to** commission Ubiquiti devices into the Crestron Home processor and ecosystem
- **so that** they can be programmed and controlled within Crestron Home

##### Acceptance Criteria:
- **Scenario:** Dealer discovers and adds a Ubiquiti G6 Pro Entry during installation
- **Given:** The dealer is connected to a Crestron processor with a Ubiquiti device on the network
- **When:** The dealer initiates device discovery in Configure Pro
- **Then:** The Ubiquiti device is discovered and can be added either via auto-discovery or by manually adding a device driver; the device is available for programming in the Crestron Home system

---

#### User Story CHOME-113677
- **Summary:** View device details for the Ubiquiti G6 Pro Entry

##### Use Case:
- **As a** dealer
- **I want to** see information about the door station(s) such as serial number and firmware version
- **so that** I can verify device identity and support status during and after installation

##### Acceptance Criteria:
- **Scenario:** Dealer reviews device details in Configure Pro
- **Given:** A Ubiquiti door station has been commissioned in Configure Pro
- **When:** The dealer opens the About tab for the device
- **Then:** The device's manufacturer, model, driver version, firmware version, online/offline status, signal strength, and PoE/power state are all displayed

---

#### User Story CHOME-113890
- **Summary:** Configure device-specific settings for the Ubiquiti G6 Doorbell Pro

##### Use Case:
- **As a** dealer
- **I want to** use Configure Pro to configure advanced device settings on the Ubiquiti G6 Pro
- **so that** I can tailor device behavior for each installation without leaving Crestron Home

##### Acceptance Criteria:
- **Scenario:** Dealer configures camera and device settings in Configure Pro
- **Given:** A Ubiquiti G6 Pro Entry is commissioned
- **When:** The dealer opens device settings in Configure Pro
- **Then:** The dealer can configure: device name, OSD settings, LED settings, LCD message, microphone volume, video mode (default / highFps / sport / slowShutter / lprReflex / lprNoneReflex), HDR type (auto / on / off), and smart detect settings

---

#### User Story CHOME-113914
- **Summary:** Include Ubiquiti G6 Pro Entry output channels in lighting and shade scenes

##### Use Case:
- **As a** dealer
- **I want to** include each output channel from the Ubiquiti doorbell that is configured in lighting and shade scenes
- **so that** I can create automations (e.g., turn on exterior lights when the doorbell is pressed)

##### Acceptance Criteria:
- **Scenario:** Dealer adds a doorbell-connected light to a scene
- **Given:** A Ubiquiti G6 Pro Entry is commissioned with at least one output configured as a Light
- **When:** The dealer creates or edits a lighting or shade scene
- **Then:** The Ubiquiti-connected light output is available as a scene participant and responds to scene triggers

---

#### User Story CHOME-113916
- **Summary:** Use Ubiquiti G6 Pro Entry I/O input states in Conditionals and Variables

##### Use Case:
- **As a** dealer
- **I want to** use the state from a device assigned to an I/O input of a Ubiquiti doorbell within a Conditional in my configuration
- **so that** I can build logic that reacts to entry sensor states or contact closures

##### Acceptance Criteria:
- **Scenario:** Dealer builds a Conditional using a Ubiquiti I/O input state
- **Given:** A device is assigned to an I/O input on the Ubiquiti doorbell
- **When:** The dealer creates a Conditional in Crestron Home
- **Then:** The state of the assigned I/O input device is available as a Conditional variable and evaluates correctly at runtime

---

#### User Story CHOME-113917
- **Summary:** Program to Events from Ubiquiti G6 Pro Entry input and output channels

##### Use Case:
- **As a** dealer
- **I want to** program to Events from each device associated with an input or output channel of the Ubiquiti doorbell
- **so that** I can trigger automations on doorbell press, motion detection, and relay state changes

##### Acceptance Criteria:
- **Scenario:** Dealer programs an Event triggered by a doorbell press
- **Given:** A Ubiquiti G6 Pro Entry is commissioned with inputs and outputs configured
- **When:** The dealer opens the Events programming surface in Crestron Home
- **Then:** All device-specific events from the Ubiquiti doorbell's input and output channels are available to program against

---

#### User Story CHOME-113918
- **Summary:** Add Ubiquiti G6 Pro Entry output channel control to Sequences

##### Use Case:
- **As a** dealer
- **I want to** add control for any device associated with an output of the Ubiquiti doorbell and/or gateway to a Sequence in Crestron Home
- **so that** I can chain door station actions with other system behaviors (e.g., unlock gate after greeting)

##### Acceptance Criteria:
- **Scenario:** Dealer adds a relay-controlled gate to a Sequence
- **Given:** A gate motor is connected to a Ubiquiti output and the device is commissioned
- **When:** The dealer creates or edits a Sequence
- **Then:** The Ubiquiti output-connected device is available as a Sequence action; executing the Sequence triggers the device as expected

---

#### User Story CHOME-114191
- **Summary:** Route Ubiquiti G6 Pro Entry and UDM devices within Configure Pro

##### Use Case:
- **As a** dealer
- **I want to** route I/O and relay-connected devices from Ubiquiti G6 Pro Entry and UDM hardware in Configure Pro
- **so that** gates, locks, and accessories are logically assigned and controllable in the Crestron Home system

##### Acceptance Criteria:
- **Scenario:** Dealer routes a relay-controlled gate to the Ubiquiti doorbell in Configure Pro
- **Given:** A Ubiquiti G6 Pro Entry and UDM are commissioned
- **When:** The dealer opens the routing configuration for the Ubiquiti devices
- **Then:** The dealer can assign I/O inputs and relay outputs to Crestron Home device types (gates, garage doors, locks) and the routing is reflected in the end-user experience

---

#### User Story CHOME-113742
- **Summary:** Document third-party door station devices in Crestron Home OS Documentation

##### Use Case:
- **As a** dealer
- **I want to** find supported third-party products quickly via the Crestron Manual
- **so that** I can verify compatibility and set expectations with clients before a job

##### Acceptance Criteria:
- **Scenario:** Dealer searches for Ubiquiti door station support in Crestron documentation
- **Given:** Ubiquiti door station support has shipped
- **When:** The dealer searches the Crestron Home OS Documentation under Third Party Devices
- **Then:** Supported Ubiquiti and relay-controlled lock devices are listed with setup guidance

---

## Epic 4: Device Support — 2N Door Stations
**Jira Epic:** [CHOME-114571](https://crestroneng.atlassian.net/browse/CHOME-114571)

*Dealers and installers can discover, commission, and configure 2N door station hardware in Configure Pro. Targeted first-release hardware: 2N IP Verso 2.0, 2N IP Solo, 2N IP One, 2N Security Relay.*

---

### NOW — Phase A

---

#### User Story CHOME-114756
- **Summary:** Discover and add 2N door station devices in Configure Pro

##### Use Case:
- **As a** dealer
- **I want to** commission 2N door stations into the Crestron Home processor and ecosystem
- **so that** they can be programmed and controlled within Crestron Home

##### Acceptance Criteria:
- **Scenario:** Dealer commissions a 2N IP Verso 2.0 during installation
- **Given:** A 2N door station is on the network and a Crestron processor is connected
- **When:** The dealer initiates device discovery in Configure Pro
- **Then:** The 2N device is discovered and commissioned; supported models include 2N IP Verso 2.0, 2N IP Solo, 2N IP One, and 2N Security Relay; device details (model, firmware, status) are visible after commissioning

---

#### User Story CHOME-114755
- **Summary:** Register clients to the my2N portal for mobile notifications

##### Use Case:
- **As a** dealer
- **I want to** register my clients to the my2N portal during commissioning
- **so that** end users can receive push notifications and video calls on mobile devices when not at home

##### Acceptance Criteria:
- **Scenario:** Dealer registers homeowner to my2N during device commissioning
- **Given:** A 2N device is being commissioned in Configure Pro
- **When:** The dealer reaches the my2N registration step in the commissioning flow
- **Then:** The dealer is prompted to create or link a my2N account for the end user; end users are registered and pay for subscriptions without Crestron intervention; the billing experience is transparent and does not create "nickel-and-dimed" perception; subscription fatigue is minimized through clear, aggregated pricing

---

#### User Story CHOME-114754
- **Summary:** View device details for the 2N door station

##### Use Case:
- **As a** dealer
- **I want to** see information about the 2N door station(s) such as serial number and firmware version
- **so that** I can verify device identity and support status

##### Acceptance Criteria:
- **Scenario:** Dealer reviews 2N device details in Configure Pro
- **Given:** A 2N door station has been commissioned
- **When:** The dealer opens the About screen for the device
- **Then:** All pertinent device information is displayed (details subject to 2N API availability)

---

#### User Story CHOME-114753
- **Summary:** Configure device-specific settings for the 2N door station

##### Use Case:
- **As a** dealer
- **I want to** use Configure Pro to configure advanced settings on 2N door stations
- **so that** I can tailor device behavior per installation without leaving Crestron Home

##### Acceptance Criteria:
- **Scenario:** Dealer configures camera and relay settings on a 2N device
- **Given:** A 2N door station is commissioned
- **When:** The dealer opens device settings in Configure Pro
- **Then:** The dealer can configure: device name, OSD settings, LED settings, LCD message, microphone volume, video mode, HDR type, and smart detect settings; built-in relay outputs can be configured for door locks, garage doors, and gates

---

#### User Story CHOME-114752
- **Summary:** Include 2N door station output channels as Lights in lighting and shade scenes

##### Use Case:
- **As a** dealer
- **I want to** include each output channel from the 2N door station configured as a Light in lighting and shade scenes
- **so that** I can build automations triggered by door events

##### Acceptance Criteria:
- **Scenario:** Dealer adds a 2N-connected light to a scene
- **Given:** A 2N door station is commissioned with at least one output configured as a Light
- **When:** The dealer creates or edits a lighting or shade scene
- **Then:** The 2N output-connected light is available as a scene participant and responds to scene triggers

---

#### User Story CHOME-114751
- **Summary:** Use 2N door station I/O input states in Conditionals and Variables

##### Use Case:
- **As a** dealer
- **I want to** use the state from a device assigned to an I/O input of a 2N door station within a Conditional
- **so that** I can build logic that reacts to contact closures or sensor states on the 2N device

##### Acceptance Criteria:
- **Scenario:** Dealer builds a Conditional using a 2N I/O input state
- **Given:** A device is assigned to an I/O input on the 2N door station
- **When:** The dealer creates a Conditional in Crestron Home
- **Then:** The state of the I/O input device is available as a Conditional variable

---

#### User Story CHOME-114750
- **Summary:** Program to Events from 2N door station input and output channels

##### Use Case:
- **As a** dealer
- **I want to** program to Events from each device associated with an input or output channel of the 2N door station
- **so that** I can trigger automations on doorbell press, motion, or relay state changes

##### Acceptance Criteria:
- **Scenario:** Dealer programs an Event triggered by a 2N doorbell press
- **Given:** A 2N door station is commissioned with inputs and outputs configured
- **When:** The dealer opens the Events programming surface
- **Then:** All device-specific events from the 2N door station's input and output channels are available to program against

---

#### User Story CHOME-114749
- **Summary:** Add 2N door station output channel control to Sequences

##### Use Case:
- **As a** dealer
- **I want to** add control for any device associated with an output of the 2N door station to a Sequence in Crestron Home
- **so that** I can chain door station actions with other system behaviors

##### Acceptance Criteria:
- **Scenario:** Dealer adds a 2N relay-connected device to a Sequence
- **Given:** A device is connected to a 2N door station output and commissioned
- **When:** The dealer creates or edits a Sequence
- **Then:** The 2N output-connected device is available as a Sequence action and executes correctly

---

#### User Story CHOME-114748
- **Summary:** Route 2N door station devices within Configure Pro

##### Use Case:
- **As a** dealer
- **I want to** route I/O and relay-connected devices from 2N door station hardware in Configure Pro
- **so that** gates, locks, and accessories are logically assigned and controllable in the Crestron Home system

##### Acceptance Criteria:
- **Scenario:** Dealer routes a 2N relay output to a gate in Configure Pro
- **Given:** A 2N door station is commissioned
- **When:** The dealer opens the routing configuration for the 2N device
- **Then:** The dealer can assign I/O inputs and relay outputs to Crestron Home device types and the routing is reflected in the end-user experience

---

## Epic 5: Mobile — Push Notifications from Door Stations
**Jira Epic:** [CHOME-113680](https://crestroneng.atlassian.net/browse/CHOME-113680)

*Homeowners and residents receive push notifications on iOS and Android when a doorbell is pressed or motion is detected. From the notification, users can preview live video, talk to visitors, and trigger quick actions — all from the Crestron Home app.*

---

### NOW — Phase A

---

#### User Story CHOME-113693
- **Summary:** Receive a push notification on mobile when the door station button is pressed

##### Use Case:
- **As a** homeowner/resident
- **I want to** receive a push notification on my mobile device(s) when a doorbell is pressed
- **so that** I can quickly decide whether to answer, ignore, or review later

##### Acceptance Criteria:
- **Scenario:** Visitor presses the doorbell while homeowner is away
- **Given:** The homeowner has push notifications enabled in the Crestron Home mobile app
- **When:** The door station button is pressed
- **Then:** A standard OS push notification is delivered to iOS and Android within 1 second

---

#### User Story CHOME-117707
- **Summary:** Register and unregister mobile devices for push notifications from the mobile app

##### Use Case:
- **As a** homeowner
- **I want to** enable push notifications for homes I can access from the Crestron Home mobile app
- **so that** I receive door station push notifications whether I am home or away

##### Acceptance Criteria:
- **Scenario:** Homeowner enables push notifications in the app
- **Given:** The homeowner is logged into the Crestron Home mobile app
- **When:** The homeowner enables or disables push notifications for a home
- **Then:** The device is registered or unregistered for push notifications for that home; changes take effect immediately

---

#### User Story CHOME-113691
- **Summary:** Tapping the push notification for the doorbell opens the Crestron Home app preview screen

##### Use Case:
- **As a** homeowner/resident
- **I want to** tap a doorbell notification on my mobile device and open the Crestron Home app to see and hear who is at the door
- **so that** I can quickly assess the situation before deciding to engage

##### Acceptance Criteria:
- **Scenario:** Homeowner taps a doorbell push notification
- **Given:** A push notification has been received on the homeowner's mobile device
- **When:** The homeowner taps the notification
- **Then:** The Crestron Home app launches and immediately displays the notification action screen with one-way audio and video; direct actions available include Chat (two-way audio/video), Unlock/Lock the door

---

#### User Story CHOME-113688
- **Summary:** Talk with the visitor via the Crestron Home app

##### Use Case:
- **As a** homeowner/resident
- **I want to** communicate with the person at the door
- **so that** I can greet, instruct, or decline the visitor remotely

##### Acceptance Criteria:
- **Scenario:** Homeowner initiates two-way communication with a visitor
- **Given:** The homeowner is on the notification action screen with the visitor present at the door
- **When:** The homeowner chooses to Chat
- **Then:** Two-way audio (and two-way video where supported) is established between the homeowner's mobile device and the door station

---

#### User Story CHOME-113690
- **Summary:** Review missed doorbell events from a late notification

##### Use Case:
- **As a** homeowner/resident
- **I want to** tap a doorbell notification on my mobile device and open the Crestron Home app to see the camera even if someone is no longer at the door
- **so that** I can review who visited even after the event has passed

##### Acceptance Criteria:
- **Scenario:** Homeowner taps a late doorbell notification
- **Given:** A doorbell notification was received but not acted on in time
- **When:** The homeowner taps the late notification
- **Then:** The Crestron Home app launches and displays the door station camera view; the experience is the same as if someone were still at the door

---

#### User Story CHOME-113694
- **Summary:** Receive a push notification on mobile when motion is detected

##### Use Case:
- **As a** homeowner/resident
- **I want to** receive a push notification on my mobile device(s) when motion is detected
- **so that** I can quickly decide my next action

##### Acceptance Criteria:
- **Scenario:** Motion is detected at the door station while homeowner is away
- **Given:** Motion detection is configured on the door station
- **When:** Motion is detected
- **Then:** A standard push notification is delivered to iOS and Android within 1 second

---

#### User Story CHOME-113692
- **Summary:** Trigger predefined quick actions during an active door call on mobile

##### Use Case:
- **As a** homeowner/resident
- **I want to** trigger predefined quick actions (unlock, gate open, scenes) during an active door call
- **so that** I can manage access and environment conveniently from anywhere

##### Acceptance Criteria:
- **Scenario:** Homeowner triggers a quick action during a mobile door call
- **Given:** A door call is active in the Crestron Home mobile app
- **When:** The homeowner selects a quick action from the call overlay
- **Then:** The action is executed; actions are visible as an overlay on the active call video panel; actions are secure and logged

---

#### User Story CHOME-113689
- **Summary:** View the door station and entry cameras live from the Crestron Home mobile app

##### Use Case:
- **As a** homeowner/resident
- **I want to** view the door station and entry cameras live from the Crestron Home app on my mobile device(s)
- **so that** I can monitor my property in real time

##### Acceptance Criteria:
- **Scenario:** Homeowner browses to the camera page in the mobile app
- **Given:** A Ubiquiti door station camera is commissioned in Crestron Home
- **When:** The homeowner opens the Whole House Camera page on mobile
- **Then:** The door station camera is visible with a live snapshot and stream available; one-way audio is available when viewing; cameras populate automatically on commissioning

---

#### User Story CHOME-113700
- **Summary:** An owner selects who will get push notifications from the door station(s)

##### Use Case:
- **As a** homeowner/resident
- **I want to** invite others to respond to notifications and configure which users receive which notification types
- **so that** the right household members are alerted based on the event

##### Acceptance Criteria:
- **Scenario:** Homeowner configures notification recipients
- **Given:** The homeowner has access to the User section of the Crestron Home end-user app
- **When:** The homeowner configures notification recipients for a door station
- **Then:** Selected users receive push notifications for the configured event types; unselected users do not

---

#### User Story CHOME-113702
- **Summary:** Default notification sounds on mobile devices

##### Use Case:
- **As a** homeowner/resident
- **I expect** visitor notifications to instantly tell me someone is at the door
- **so that** I am always aware of doorbell and motion events without configuration

##### Acceptance Criteria:
- **Scenario:** Homeowner receives a default doorbell notification
- **Given:** No custom notification sound has been set
- **When:** A doorbell press notification is delivered
- **Then:** The notification plays a sound that is distinct from standard messages, sounds urgent, offers immediate action options, and is not silent by default

---

### NEXT — Phase B

---

#### User Story CHOME-113709
- **Summary:** Actuate gates, garage doors, or entry motors using door station controls

##### Use Case:
- **As a** homeowner/resident
- **I want to** actuate gates, garage doors, or entry motors
- **so that** I can grant access to visitors remotely without being physically present

##### Acceptance Criteria:
- **Scenario:** Homeowner opens a gate remotely during a door call
- **Given:** A gate motor is connected via door station relay and commissioned in Crestron Home
- **When:** The homeowner taps the gate open action in the Crestron Home app
- **Then:** An open/close command is sent to the gate motor and the gate responds accordingly

---

#### User Story CHOME-113710
- **Summary:** Assign I/Os and Relays on door station devices for gates and garage doors

##### Use Case:
- **As a** dealer
- **I want to** assign I/Os and Relays on devices when setting up garage doors and gates
- **so that** homeowners can control those entry points from the Crestron Home app

##### Acceptance Criteria:
- **Scenario:** Dealer assigns a relay to a gate during commissioning
- **Given:** A Ubiquiti device with relay outputs is commissioned in Configure Pro
- **When:** The dealer configures the garage/gate setup in Configure Pro
- **Then:** The dealer can assign I/O inputs and relay outputs to gate or garage door device types; the assignment is reflected in the homeowner's end-user app

---

#### User Story CHOME-113739
- **Summary:** Add a relay-controlled lock option in Configure Pro

##### Use Case:
- **As a** dealer
- **I want to** configure relay-controlled locks in Configure Pro with the same functionality as garage doors and gates
- **so that** homeowners can lock and unlock doors via Crestron Home

##### Acceptance Criteria:
- **Scenario:** Dealer configures a relay-controlled door lock
- **Given:** A relay-controlled lock is connected to a door station device
- **When:** The dealer sets up the lock in Configure Pro
- **Then:** The lock appears as a controllable device in the homeowner's Crestron Home app; lock/unlock commands are supported (ref: CHOME-80924 parity)

---

#### User Story CHOME-113738
- **Summary:** Link a relay-controlled lock to the door station for PIN code creation

##### Use Case:
- **As a** dealer
- **I want to** link relay-controlled locks to door stations
- **so that** end users can create PIN codes that control the lock via the door station

##### Acceptance Criteria:
- **Scenario:** Homeowner creates a temporary PIN for a delivery
- **Given:** A relay-controlled lock is linked to a door station in Configure Pro
- **When:** The homeowner opens access management in the end-user app
- **Then:** The homeowner can create a temporary PIN; entering the PIN at the door station triggers the relay to unlock the door

---

#### User Story CHOME-113740
- **Summary:** Create PIN codes for locks controlled by Crestron, door station I/O, or Relays

##### Use Case:
- **As a** homeowner/resident
- **I want to** create temporary PIN codes for locks controlled by Crestron, door station I/O, or relays
- **so that** I can grant secure, time-limited access to guests or delivery personnel

##### Acceptance Criteria:
- **Scenario:** Homeowner sends a temporary PIN to a guest
- **Given:** A PIN-capable lock is configured in Crestron Home
- **When:** The homeowner creates a temporary PIN in the end-user app
- **Then:** The PIN is sent to the supported door station; entering the PIN grants access during the configured window; the PIN expires after the set time or use limit

---

#### User Story CHOME-113741
- **Summary:** Integrate events, commands, and feedback states within Crestron Home programming

##### Use Case:
- **As a** homeowner/resident
- **I want to** configure lighting scenes and other automations that run automatically when a doorbell is pressed or motion is detected
- **so that** my home responds intelligently to entry events without manual intervention

##### Acceptance Criteria:
- **Scenario:** Exterior light turns on when motion is detected at night
- **Given:** A motion-triggered scene is configured using Ubiquiti door station events
- **When:** The door station detects motion matching the configured category (person, car, animal, environment)
- **Then:** The configured scene executes (e.g., exterior lights turn on); all Ubiquiti commands are available in Sequences; all device-specific events are handled; device properties are supported in Conditionals and Variables

---

#### User Story CHOME-116147
- **Summary:** Tapping a push notification on one device ends or dismisses notifications on all other devices

##### Use Case:
- **As a** homeowner/resident
- **I want to** have all other notifications for a doorbell press canceled when someone answers one of them
- **so that** I am not disturbed across multiple devices after the event has been handled

##### Acceptance Criteria:
- **Scenario:** Homeowner answers a doorbell from their phone; other devices stop notifying
- **Given:** A doorbell press notification has been sent to multiple mobile devices and touch panels
- **When:** One device answers or dismisses the notification
- **Then:** All other devices immediately stop ringing or displaying the notification; no additional action is required on the other devices

---

## Epic 6: Mobile — Phone Calls from Door Stations
**Jira Epic:** [CHOME-115337](https://crestroneng.atlassian.net/browse/CHOME-115337)

*In addition to push notifications, homeowners and residents can receive a traditional phone call on their mobile device when the door station button is pressed, allowing them to answer using the native phone call experience.*

---

### NOW — Phase A

---

#### User Story CHOME-114324
- **Summary:** Receive a phone call on mobile when the door station button is pressed

##### Use Case:
- **As a** homeowner/resident
- **I want to** receive a phone call on my mobile device(s) when a doorbell is pressed
- **so that** I can be notified even when my phone is not actively in use

##### Acceptance Criteria:
- **Scenario:** Visitor presses the doorbell; homeowner receives a phone call
- **Given:** Phone call notifications are enabled for the homeowner's mobile device
- **When:** The door station button is pressed
- **Then:** A phone call is delivered to the homeowner's iOS or Android device with doorbell-to-ring latency under 1 second

---

#### User Story CHOME-114337
- **Summary:** Answering the phone call from the doorbell opens the Crestron Home app preview screen

##### Use Case:
- **As a** homeowner/resident
- **I want to** answer a doorbell phone call and immediately see and hear who is at the door in the Crestron Home app
- **so that** I can assess the situation before deciding how to engage

##### Acceptance Criteria:
- **Scenario:** Homeowner answers a doorbell phone call
- **Given:** A phone call from a door station is ringing on the homeowner's mobile device
- **When:** The homeowner answers the call
- **Then:** The Crestron Home app launches and immediately prioritizes the door station call screen; live video from the door station is displayed; one-way audio is initially established; the homeowner can unmute to establish two-way audio

---

### NEXT — Phase B

---

#### User Story CHOME-116146
- **Summary:** Answering a phone call on one device ends the call on all other phones and touch panels

##### Use Case:
- **As a** homeowner/resident
- **I want to** have all other calls and notifications dismissed when one device answers the door station call
- **so that** I am not simultaneously disturbed on every device in the household

##### Acceptance Criteria:
- **Scenario:** Homeowner answers from their phone; all other devices stop ringing
- **Given:** A door station phone call is active on multiple mobile devices and touch panels
- **When:** One device answers the call
- **Then:** All other mobile phone calls and touch panel rings are immediately ended or dismissed

---

### LATER

---

#### User Story CHOME-116068
- **Summary:** An owner selects who will get phone calls from the door station(s)

##### Use Case:
- **As a** homeowner/resident
- **I want to** configure which users receive phone calls from the door station
- **so that** the right household members are alerted based on their preferences

##### Acceptance Criteria:
- **Scenario:** Homeowner configures phone call recipients for a door station
- **Given:** The homeowner has access to the User section of the Crestron Home end-user app
- **When:** The homeowner configures phone call recipients for a door station event
- **Then:** Selected users receive phone calls for the configured events; unselected users receive push notifications only or none

---

## Epic 7: Platform Support — Push Notifications
**Jira Epic:** [CHOME-116008](https://crestroneng.atlassian.net/browse/CHOME-116008)

*Platform-level engineering work required to deliver reliable push notification delivery for door station events across iOS, Android, and Crestron Home touch panels.*

---

### NOW — Phase A

*This epic currently contains platform engineering tasks rather than user stories. User-facing outcomes are captured in Epics 2 and 5. Refer to [CHOME-116008](https://crestroneng.atlassian.net/browse/CHOME-116008) in Jira for task-level detail.*

---

## Story Map Summary

| Epic | NOW | NEXT | LATER |
|---|---|---|---|
| 1. Touch Panels — Ubiquiti | - | CHOME-113614, CHOME-113615, CHOME-113616, CHOME-113621, CHOME-113622, CHOME-115739 | - |
| 2. Touch Panels — Notifications | — | - | CHOME-117307 |
| 3. Device Support — Ubiquiti | - | CHOME-113676, CHOME-113677, CHOME-113890, CHOME-113742 | CHOME-113914, CHOME-113916, CHOME-113917, CHOME-113918, CHOME-114191 |
| 4. Device Support — 2N | CHOME-114756, CHOME-114755, CHOME-114754, CHOME-114753, CHOME-114752, CHOME-114751, CHOME-114750, CHOME-114749, CHOME-114748 | — | - |
| 5. Mobile — Push Notifications | CHOME-113693, CHOME-117707, CHOME-113691, CHOME-113688, CHOME-113690, CHOME-113694, CHOME-113692, CHOME-113689, CHOME-113700, CHOME-113702 | CHOME-113709, CHOME-113710, CHOME-113739, CHOME-113738, CHOME-113740, CHOME-113741, CHOME-116147 | - |
| 6. Mobile — Phone Calls | CHOME-114324, CHOME-114337 | CHOME-116146 | CHOME-116068 |
| 7. Platform — Push Notifications | CHOME-116008 (engineering tasks) | — | - |

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
