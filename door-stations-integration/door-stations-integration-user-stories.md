# Initiative: Door Station Support | Mobile Answering & Remote Control
**Jira:** [CHOME-113883](https://crestroneng.atlassian.net/browse/CHOME-113883)

**Vision:** First-class door station support in Crestron Home — enabling homeowners to see, hear, respond to, and control access for visitors from any touch panel or mobile device, whether at home or away. This integration makes Crestron Home a trusted, end-to-end door and access platform rather than an ecosystem of isolated third-party devices.

**Personas:**
- **Homeowner / Resident** — Receives visitor notifications, communicates with visitors, grants access remotely
- **Dealer / Installer** — Discovers, commissions, and configures door station hardware in Configure Pro

**Story Map Structure:** Epics reflect capability areas. Within each epic, stories are organized into NOW / NEXT / LATER swim lanes that match the Story Map Summary at the bottom of this document.

**Source of truth:** The **Summary** and **Acceptance Criteria** for each story below are copied **verbatim from Jira** (`customfield_10095`). The Use Case section reproduces the Jira **Description** field verbatim. Only the Story Map Summary table at the bottom is paraphrased for readability.

**ID Scheme:** Jira issue keys are used as permanent identifiers (e.g., CHOME-113693). Epic keys are noted at the top of each section.

---

## Epic 1: Touch Panels — Ubiquiti Door Station Integration
**Jira Epic:** [CHOME-113611](https://crestroneng.atlassian.net/browse/CHOME-113611)

*Homeowners and residents can respond to visitors from within the home using Crestron touch panels. Panels ring persistently when a doorbell is pressed; users can answer, view live camera, and trigger quick actions.*

---

### NEXT — Phase B

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
User can answer the “call” and establshes two-way audio

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
*[image]*
 Example of existing manual camera add
*[image]*

---

#### User Story CHOME-113622
- **Summary:** In Home || Trigger predefined quick actions during an active door call(unlock/gate open/scenes)

##### Use Case (Jira Description):
As a homeowner/resident, I want to trigger predefined quick actions (like unlock, gate open, or scenes) during an active door call so that I can manage access and environment conveniently.

##### Acceptance Criteria (verbatim from Jira):
Quick actions are visible as an overlay on the active call video panel
​[2N® Door Stations Screen | Crestron Home OS Documentation](https://docs.crestron.com/en-us/8525/Content/CP4R/Operation/Door-Stations.htm?Highlight=2n)
Actions must be secure and logged.
*[image]*
*[image]*

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

## Epic 2: Touch Panels — Notifications from Door Stations
**Jira Epic:** [CHOME-116727](https://crestroneng.atlassian.net/browse/CHOME-116727)

*Extending the in-home touch panel experience with richer notification handling, including geolocation-based suppression of mobile notifications when the homeowner is at home.*

---

### LATER

---

#### User Story CHOME-117307
- **Summary:** In Home | Use geolocation to recognize a user is home or away

##### Use Case (Jira Description):
As a homeowner/resident, I want to the recognize when I am home or away from home so that I can automatically turn mobile notifications on and off based on my location.

##### Acceptance Criteria (verbatim from Jira):
*(AC field is empty in Jira)*

---

## Epic 3: Device Support — Ubiquiti Doorbell
**Jira Epic:** [CHOME-113671](https://crestroneng.atlassian.net/browse/CHOME-113671)

*Dealers and installers can discover, commission, and configure Ubiquiti door station hardware in Configure Pro. Targeted first-release hardware: UVC-G6-Pro-Entry, UCG-Max, UA-Hub-Door-Mini.*

---

### NEXT — Phase B

---

#### User Story CHOME-113676
- **Summary:** Ubiquiti G6 Pro Entry || Discover & Add Device

##### Use Case (Jira Description):
As a dealer, I want to be able to commission Ubiquiti devices into the Creston Home processor & ecosystem so they can be programmed.

# Open Questions

* How are these devices integrated? Do I commission each device (preferred) or commission Ubiquiti UniFi access for controlling any UniFi devices?
* Are there other devices that are needed? (Ubiquiti Hubs, Ubiquiti NVR for video, Viewport?, some device that runs the Protect platform)
* Can we integrate with Viewport and make it a Crestron Home source?
* Which relay controlled devices do we want to call out and add support for “routing”?

##### Acceptance Criteria (verbatim from Jira):
- Given the user is on the Devices tab in Confiugure Pro
- When a the user selects Add Device
- And selects Drivers
- And searches for Ubiquiti -->Is there where we want our integrated support? There is already a [Unifi Access Driver by ControlWorks](https://store.controlworks.com/products/Unifi-Access_License)
- And Ubiquiti **[G6 Pro Entry](https://techspecs.ui.com/unifi/door-access/uvc-g6-pro-entry?subcategory=all-door-access)**** **device is discovered
- And the user assigns the device to a room
- Then the device is added to the selected room
- And the device configuration popup is displayed
---
Examples:
<u>[CHOME-84629: DIN-8SWU8 || Device SupportRefinement](https://crestroneng.atlassian.net/browse/CHOME-84629)</u>
<u>[CHOME-99856: DIN-8SWU8 || Adding DeviceRefinement](https://crestroneng.atlassian.net/browse/CHOME-99856)</u>
# Commissioning Devices in Configure Pro
- Navigate to Devices Tab
- Discover Popup → **Then where?**
- Discover and view the Ubiquiti device → Select Room in Right List → Hit Plus sign to add the Ubiquiti device to the room
  1. Popup
    1. Input Name of Device
    2. Output configuration options
      1. **SIP configuration for Audio & Video “calls”  ??**
    3. Advanced
      1. Anything here? Maybe this is for SIP?
    4. Page to Configure the Installation Settings of the Device
      1. Digital Input Settings (Works the same as the DIN-4DIMU4 implementation)
        1. Local Settings
        2. Local Mode
        3. Remote Mode
- Device Successfully Adds
- Folder Populates in Internal Cresnet Gateway with “DIN-8SWU8 Name” **>> What is this for?**
- I can add any of the Relay Controlled Devices in CH to the output bew controlled by the Ubiquiti device(s)
  - Light (Need to create. This would allow the device to work as a native switched lighting load)
  - Generic Relay
  - Screen **>> What is a screen in this case? **
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
* lcdMessage - Message that's set on the LCD screen (for doorbells and/or other devices with LCD screens). To upload image assets for the LCD screen, use the \`/files/{fileType}\` endpoint.
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

### LATER

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

## Epic 4: Device Support — 2N Door Stations
**Jira Epic:** [CHOME-114571](https://crestroneng.atlassian.net/browse/CHOME-114571)

*Dealers and installers can discover, commission, and configure 2N door station hardware in Configure Pro. Targeted first-release hardware: 2N IP Verso 2.0, 2N IP Solo, 2N IP One, 2N Security Relay.*

---

### NOW — Phase A

---

#### User Story CHOME-114756
- **Summary:** 2N Door station || Discover & Add Devices

##### Use Case (Jira Description):
As a dealer, I want to be able to commission 2N door stations into the Creston Home processor & ecosystem so they can be programmed.

---

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
- And the my2N registration flow is initiated (required for integrated notifications to mobile) https://crestroneng.atlassian.net/browse/CHOME-114755
# Commissioning Devices in Configure Pro
- Navigate to Devices Tab
- Discover Popup → **Then where?**
- Discover and view the 2N device(s) → Select Room in Right List → Hit Plus sign to add the 2N device to the room
  1. Popup
    1. Input Name of Device
    2. Output configuration options
      1. **SIP configuration for Audio & Video “calls”  ??**
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
- **Summary:** 2N Door station || My2N Registration & Authentication

##### Use Case (Jira Description):
As a dealer, I want to be able to invite my clients (site admins) to register to the my2N portal so they can be billed for My2N audio & video services related to connecting remotely to their door stations and intercoms.

---

### 🎯 Goals/Outcomes & Measurements

* Dealers/Installers can register or sign in to their My2N account from within Configure Pro.
* Dealers/Installers can invite homeowners to sign in to their My2N account from within Configure Pro.

📋 Acceptance criteria include

* Homeowners are registered for a My2N Site(s)
* Homeowners pay for their subscription seamlessly and without intervention by Crestron

---

In order to be able to use the My2N service which is required for end user to connect audio and video to door stations and intercoms.

The goal is to minimize friction in the installation flow and billing lifecycle.

* In the commissioning flow for 2N devices, the user/installer should get prompted to create or login to their My2N account
* The experience should be designed so that the end user does not feel like they are 

    * What should the model be here?
    * Does the installer create the account and include the fee in the the installation invoice?
    * Does 2N provide a lifetime subscripton fee, or is it only a monthly fee?
    * How does this work for MDUs?
    

Acceptance Criteria:

* Users are prompted to create a My2N account during device commissioning
* Maintain a transparent, value-driven billing experience that maintains trust for end users rather than resentment (end users should not feel like they are being “nickle and dimed” by Crestron)
* Minimize 'subscription fatigue' by offering clear, aggregated pricing that respects customer retention.

 

Related Links

* <custom data-type="smartlink" data-id="id-0">https://www.2n.com/en-GB/faqs/how-to-purchase-subscription-in-my2n-kA0Rn000000r5xdKAA</custom>  
* <custom data-type="smartlink" data-id="id-1">https://crestron1-my.sharepoint.com/:b:/g/personal/pshea_crestron_com/IQDJYSnKYdmLSZuulcXamRmkAU44DGmoPX5B9h2QTls-GW8?e=Rg8jPF</custom>

##### Acceptance Criteria (verbatim from Jira):
- Given the installer is setting up a 2N Door station in Configure Pro
- When the installer adds 2N door station
- Then the My2N registration flow is initiated
- And the installer can seamlessly register the client for the subscription
### My2N Registration
- User redirected to https://my2n.com/register
*[image]*
- After registration, …
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

---

### 🎯 Goals/Outcomes & Measurements

* Dealers/Installers can view all the details about a specific 2N door station device

    * OPEN What is available through their API?
    

📋 Acceptance criteria include

* device About screen shows pertinent device information

##### Acceptance Criteria (verbatim from Jira):
The following information shall be included on the About tab for the camera:   
- id - The primary key of camera
- model key - The model key of the camera
- state - Connection state of the device.
- name - the name of the camera
- MAC address - The MAC address of the device

---

#### User Story CHOME-114753
- **Summary:** 2N Door station|| Device Specific settings

##### Use Case (Jira Description):
As a Dealer, I want to use Configure Pro to configure advanced settings of the 2N door stations

**What settings are configurable on the 2N door stations and what do we want to expose?**

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

---

### 🎯 Goals/Outcomes & Measurements

* Dealers/Installers can detect, configure, and setup Ubiquiti doorbells and intercoms in Configure Pro when connected to a Crestron processor
* Offline configuration with myCrestron (stretch goal?)

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
- **Summary:** 2N Door station || Scenes

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

#### User Story CHOME-114748
- **Summary:** 2N Door station || Routing

##### Use Case (Jira Description):
###

##### Acceptance Criteria (verbatim from Jira):
#### Scenario: Relay output routed to a gate (happy path)
- Given a 2N door station is commissioned in Configure Pro
- When the dealer opens the routing configuration and assigns relay output 1 to a Gate device type
- Then the gate appears as a controllable device in the homeowner's Crestron Home app
- And the dealer can verify the routing by triggering a test open/close command from Configure Pro
#### Scenario: Same relay output reassigned to a different device type
- Given relay output 1 has been routed to a Gate
- When the dealer changes the routing to assign it to a Garage Door instead
- Then the previous Gate assignment is removed
- And the Garage Door device replaces it in the homeowner's app without requiring a full recommission
#### Scenario: I/O input routed to an entry sensor
- Given a magnetic entry sensor is wired to a 2N I/O input
- When the dealer assigns that input to an Entry Sensor device type in Configure Pro
- Then the sensor state (open/closed) is visible in the Crestron Home system
- And the state can be used in Conditionals, Events, and Sequences
#### Scenario: Routing attempted on a disconnected 2N device
- Given a 2N door station is offline
- When the dealer attempts to configure routing for that device
- Then the routing interface shows the device as offline
- And the dealer can save the routing configuration, which takes effect when the device reconnects
#### Scenario: Multiple 2N devices routed in the same home
- Given two 2N door stations are commissioned (front door and rear gate)
- When the dealer routes each device's outputs independently
- Then each device's routing is independent — rear gate relay does not appear under front door controls
- And both device routings are visible in a unified routing summary in Configure Pro

---

## Epic 5: Mobile — Push Notifications from Door Stations
**Jira Epic:** [CHOME-113680](https://crestroneng.atlassian.net/browse/CHOME-113680)

*Homeowners and residents receive push notifications on iOS and Android when a doorbell is pressed or motion is detected. From the notification, users can preview live video, talk to visitors, and trigger quick actions — all from the Crestron Home app.*

---

### NOW — Phase A

---

#### User Story CHOME-113693
- **Summary:** Receive a push notification on my mobile device(s) when Door Station button is pressed

##### Use Case (Jira Description):
As a homeowner/resident, I want to receive a standard push notification on my mobile device(s) when a doorbell is pressed so that I can quickly decide whether to answer, ignore, or save it to review later.

##### Acceptance Criteria (verbatim from Jira):
**Given someone pushed the button on the door station**
When the event is received by the Crestron Home system,
Then a push notification shall be sent to the user's mobile devices that are enabled for notifications,
And the push notification shall be delivered within 1 second of the doorbell press event,
And the notification shall be delivered to supported iOS & Android devices
### Alternate Scenarios
#### Scenario: Homeowner has notifications disabled at the OS level
- Given the homeowner has revoked notification permission for Crestron Home in their device OS settings
- When the door station button is pressed
- Then no notification is delivered to that device
- And no error is surfaced to the visitor or the system — the failure is silent to the door station
- And the homeowner's in-app notification preference is unaffected (it reflects the OS-level block separately)
#### Scenario: Door station button is pressed rapidly multiple times
- Given a visitor presses the doorbell button 3 or more times within 5 seconds
- When the events are received by the Crestron Home system
- Then only one push notification is delivered per defined cooldown window (debounce)
- And subsequent presses within the cooldown window are logged but do not generate additional notifications
#### Scenario: Notification delivery when processor is temporarily disconnected from cloud
- Given the Crestron processor loses its cloud connection momentarily
- When the door station button is pressed during the outage
- Then the event is queued or logged locally
- And upon reconnection, the system does not retroactively deliver a stale notification
- And the missed event is visible in the door station event log
#### Scenario: Homeowner has multiple registered devices
- Given the homeowner has two devices registered (iPhone and iPad) both with notifications enabled
- When the door station button is pressed
- Then a push notification is delivered to both devices within 1 second
- And when the homeowner acts on one device, the notification on the other is dismissed (see CHOME-116147)
#### Scenario: Notification for a 2N door station requires active my2N subscription
- Given the homeowner's 2N device is configured but their my2N subscription has expired
- When the door station button is pressed
- Then no push notification is delivered to the homeowner's mobile device
- And the homeowner sees an in-app indicator that their notification service is inactive

---

#### User Story CHOME-117707
- **Summary:** User can enable or disable push notifications from the mobile app when away from home.

##### Use Case (Jira Description):
### Summary

As a homeowner using the Crestron Home mobile app, I want to be able to selectively enable or disable push notifications for my Homes from my mobile device.

### Context

The issue is about allowing homeowners to manage mobile push notifications in the Crestron Home mobile app when they are at home or away from home

##### Acceptance Criteria (verbatim from Jira):
### 
Push Notification Enable/Disable — User Acceptance Criteria
Mock of Crestron Home mobile app --> https://pshea-crestron.github.io/software-apps-product-team/door-stations-integration/crestronhome-enable-push-notifications-flow.html 
**Scenario: Navigate to push notification settings**
> *Given* the user is signed into the Crestron Home app and has access to at least one Home
> *When* they tap into a Home, open the 3-dot menu, and select Settings
> *Then* they see a **Notifications** settings 
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
> *Then* the user is shown a message explaining that notifications must be enabled in the device's system settings, with a shortcut/link to open the OS settings for the Crestron Home app
---
**Scenario: Disable push notifications for this device**
> *Given* the user has push notifications enabled on this device for a Home
> *When* they toggle Notifications off on the Push Notifications screen
> *Then* the toggle reflects the disabled state, the device stops receiving push notifications for that Home, and no confirmation prompt is required (the action is reversible by toggling back on)
---
**Scenario: Setting persists across app restarts**
> *Given* the user has set their Notifications preference (Enabled or Disabled) for a Home
> *When* they close and reopen the app, or sign out and back in on the same device
> *Then* the Notifications toggle reflects their last saved preference
> *And *notifications are based on that preference
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

#### User Story CHOME-118206
- **Summary:** User is subscribed and unsubscribed for push notifications with the Crestron Home server

##### Use Case (Jira Description):
### Summary

As a homeowner who is logs into Crestron cloud services (Cloud relay) for the first time, I want to **subscribe** for push notifications for the homes I can access, so that I can receive door station push notifications on my mobile device whether I am home or away from my home.

### Context

This user story is about the user scenarios that trigger device **subscription** (valid tokens). This does NOT imply that the user is ENABLED to receive push notifications (<custom data-type="smartlink" data-id="id-0">https://crestroneng.atlassian.net/browse/CHOME-117707</custom> ). A user can be registered with the push notification service and NOT receive push notifications.

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
> *Then* the devices only receives push notifications for the Home(s) where that they enabled
###  Category 1: First-time user — no app, no Cloud Relay account
####  **Scenario 1a: New user (Owner)**
> *Given* an Owner has no app installed and no Cloud Relay account, and they own a Crestron Home processor
> *When* they install the app, create a Cloud Relay account, and claim their home (pair their processor)
> *Then* at the end of the pairing flow, they are prompted to enable push notifications for their home
> And they accept (choose yes) 
> *And* they are opted into push notifications for all homes until they opt out from individual homes
####  **Scenario 1b: New user (User), invited to someone else's home (no hardware ownership)**
> *Given* a user has no app installed and no Cloud Relay account, and they have received an invite to another user's Crestron Home
> *When* they install the app, create a Cloud Relay account, and accept the invite
> *Then* their account is associated with the owner's home via the cloud <u>***without a pairing step***</u>, 
> *And* they are prompted to enable push notifications
> And they accept (choose yes) 
> And they are opted into push notifications for all homes until they opt out from individual homes
####  **Scenario 1c: User does not have any devices in the home that can trigger a push notification**
> *Given* a user does not have any devices in their home that can trigger a push notification
> *When* they login in to the app
> *Then* they are prompted to enable push notifications for the Home
> And they accept (choose yes) 
> *And* they are opted into push notifications for all homes until they opt out from individual homes
---
**Category 2 moved to **https://crestroneng.atlassian.net/browse/CHOME-119594 
---
###  Category 3: User has the app and a Cloud Relay account, but is not signed in (do not prompt)
####  **Scenario 3a: Returning user, not signed into cloud services (cloud relay) in the app**
> *Given* a user has the app installed, 
> And has a Cloud Relay account, 
> And is signed out of the account,
> When an event happens that triggers a push notification in the Home
> Then I should not receive a push notification from the 
####  **Scenario 3b: Returning user, signing back in on the same device**
> *Given* a user has the app installed, 
> And has a Cloud Relay account, 
> **And has previously subscribed for push notifications,** but is currently signed out
> *When* they sign back into the app
> *Then* their account and server associations are restored and the last active setting for notifications is restored
#### ** Scenario 3b: Existing user, signing into the app on a new device for the first time**
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
> *(if their push notification token is still valid, we still need to re-subscribe for push notifications from the cloud relay; if the token has changed (e.g. OS reset), the app should update the PNS subscription endpoint with a new updated token)*
---
### Category 6: Additional Backend <u>**Unsubscribing**</u> Scenarios
These don't have a direct user-facing registration flow but need backend handling to clean up PNS tokens:
***Sunny Day: When users sign out of the CH app, then they are signing out of cloud services (cloud relay) and they should not receive notifications from the home(s) anymore***
> *Given* a user is signed in to the Crestron Home app (cloud services)
> *When* they sign out of the app and cloud services (Cloud Relay)
> *Then* they should no longer receive push notifications from their home(s)
**Scenario 6a: User is removed from a processor/server**
> *Given* a user is subscribed for PN from a server
> *When* they are removed from that server by the owner or an admin
> *Then* the user’s devices are removed from receiving push notifications from that home
> (*The* the backend removes the association between their token(s) and that server)
**Scenario 6b: User deletes their Cloud Relay account**
> *Given* a user is subscribed for PN from a server or servers
> *When* they delete their Cloud Relay account
> *Then* the user’s devices are removed from receiving push notifications from that home
> (*Then* the backend removes all push notification tokens and server associations and user profiles for that account)
**Scenario 6c: Ownership transfer / reclaim - ****This is not a real scenario**
> *Given* a user is subscribed for PN from a server or servers, 
> And ownership is being transferred to another user
> *When* the transfer is completed
> *Then* the previous owner’s devices are removed from receiving push notifications from that home
> (*Then* the backend removes the previous owner's token associations from that server and applies whatever tokens the new owner already has registered)

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
**Given** I am on the Preview screen,
**When** I select the **Chat / Start Talking / Microphone / Mute** icon,
**Then** the app shall automatically enable two-way audio on my mobile device,
**And** I shall see a visual indicator confirming that the microphone is active.
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
- Then the audio session ends immediately, the microphone is released, and the preview screen closes or returns to a one-way view

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

#### User Story CHOME-116147
- **Summary:** Dismiss all phone calls & push notifications to other devices

##### Use Case (Jira Description):
As a homeowner/resident, I want all other notifications for a doorbell press to be canceled when someone answers one of them.

##### Acceptance Criteria (verbatim from Jira):
- **Given** a that someone pushed the button on the door station
- **When** a push notification is sent to the all <u>**registered**</u> devices,
- **And** one of the registered users opens the push notification
- **Then** the notification to all other registered users/devices shall be canceled.

---

#### User Story CHOME-116146
- **Summary:** Answering a call from the door station on one device will end or dismiss the call on all other devices

##### Use Case (Jira Description):
Answering a phone call from the door station on one device will end or dismiss all calls & notifications to all other devices.

##### Acceptance Criteria (verbatim from Jira):
- **Given** a that someone pushed the button on the door station
- **When** a phone call is made to the all <u>**registered**</u> devices,
- **And** one of the registered users answers the phone call
- **Then** the notifications (push notifications and phone calls) to all other registered users/devices shall be canceled.

---

### NEXT — Phase B

---

#### User Story CHOME-113690
- **Summary:** Reviewing missed doorbell events

##### Use Case (Jira Description):
As a homeowner/resident, I want to tap a doorbell notification on my mobile device(s) and open the Crestron Home app and see the camera of the doorstation even if someone is no longer at the door

##### Acceptance Criteria (verbatim from Jira):
- Given I have received a push notification for a "Doorbell" or "Person Detected" event,
- And I missed the earlier notification
- When I tap the old notification on my mobile device well after the doorbell event occurred
[This is the same as if the notification just came in]
- Then the door station preview screen shall launch immediately within the Crestron Home app
- And the screen shall default to one-way audio and one-way video (stream from the door to the phone)
- And the screen shall display the following actionable buttons:
  - Chat: Initiates the two-way communication flow.
  - Unlock / Lock: Toggles the current state of the associated door lock.
  - Exit / Cancel

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

#### User Story CHOME-113709
- **Summary:** Control || Actuate gates, garage doors, or entry motors using door station controls

##### Use Case (Jira Description):
As a homeowner/resident, I want to actuate gates, garage doors, or entry motors so that I can grant access to visitors.

As a dealer I want to be able to assign I/Os and Relays on my Ubiquiti devices when setting up Garage Doors and Gates

##### Acceptance Criteria (verbatim from Jira):
Send open/close commands to the device(s) for gates
Send open/close commands to the device(s) for garage doors
*[image]*

---

#### User Story CHOME-113710
- **Summary:** Control || Assign I/Os and Relays on my devices

##### Use Case (Jira Description):
As a homeowner/resident, I want to actuate gates, garage doors, or entry motors so that I can grant access to visitors.

As a dealer I want to be able to assign I/Os and Relays on my Ubiquiti devices when setting up Garage Doors and Gates

##### Acceptance Criteria (verbatim from Jira):
Send open/close commands to the device(s) for gates
Send open/close commands to the device(s) for garage doors
*[image]*

---

#### User Story CHOME-113739
- **Summary:** Add relay controlled lock option in Configure Pro

##### Use Case (Jira Description):
Implement a relay control lock option in Configure Pro with the same functionality as garage and gates today. Reference issue CHOME-80924 for related details on Door Locks and Relay Controlled Door Locks.

##### Acceptance Criteria (verbatim from Jira):
*(AC field is empty in Jira)*

---

#### User Story CHOME-113738
- **Summary:** Link Relay controlled lock to Ubiquiti door station for PIN code creation

##### Use Case (Jira Description):
Enable linking of relay controlled locks to Ubiquiti door stations to allow end-users to create PIN codes via the end-user application. This feature is requested by dealers to enhance user control over door lock access.

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

#### User Story CHOME-113741
- **Summary:** Integrate Ubiquiti events, commands, and feedback states within Crestron Home programming

##### Use Case (Jira Description):
Use Ubiquiti events, commands, and feedback states within the Crestron Home programming ecosystem to allow homeowners/residents to configure lighting scenes that run automatically when a doorbell is pressed and to turn on exterior lights when motion is detected near an entry. Include configurable scene selection, adjustable motion sensitivity, and configurable motion categories (person, car, animal, environment). Add all commands to sequences, handle device-specific events, support device-specific properties in conditionals and variables, and control scenes with lighting, shades, general I/O, etc.

##### Acceptance Criteria (verbatim from Jira):
*(AC field is empty in Jira)*

---

### New / Backlog

---

#### User Story CHOME-118647
- **Summary:** Receive a rich push notification on my mobile device(s) when Door Station button is pressed

##### Use Case (Jira Description):
* As a homeowner/resident, I want to receive a rich push notification on my mobile device(s) when a doorbell is pressed so that I can see who is at the door/gate before connecting to the device.

##### Acceptance Criteria (verbatim from Jira):
### Acceptance Criteria
- **Given** a that someone pushed the button on the door station
- **When** the event is received by the Crestron Home system,
- **Then** a push notification shall be sent to the user’s mobile devices that are <u>**enabled**</u> for notifications,
- **And** the push notification shall be delivered immediately (within **1 second** of the doorbell press event),
- **And** the notification shall be delivered to supported iOS & Android devices

### User Scenarios

---

## Epic 6: Mobile — Phone Calls from Door Stations
**Jira Epic:** [CHOME-115337](https://crestroneng.atlassian.net/browse/CHOME-115337)

*In addition to push notifications, homeowners and residents can receive a traditional phone call on their mobile device when the door station button is pressed, allowing them to answer using the native phone call experience.*

---

### NOW — Phase A

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

### LATER

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

## Epic 7: Platform Support — Push Notifications
**Jira Epic:** [CHOME-116008](https://crestroneng.atlassian.net/browse/CHOME-116008)

*Platform-level engineering work required to deliver reliable push notification delivery for door station events across iOS, Android, and Crestron Home touch panels.*

---

### NOW — Phase A

*This epic currently contains platform engineering tasks rather than user stories. User-facing outcomes are captured in Epics 2 and 5. Refer to [CHOME-116008](https://crestroneng.atlassian.net/browse/CHOME-116008) in Jira for task-level detail.*

---

## Story Map Summary

| Epic | NOW<br>*(actively being built)* | NEXT<br>*(planned for Phase B)* | LATER<br>*(future releases)* |
|---|---|---|---|
| **1. Touch Panels — Ubiquiti** | — | Live camera view on tap · Persistent panel ring · Two-way audio/one-way video · Live camera page · Quick actions overlay · Ring tone customization<br>CHOME-113614, 113615, 113616, 113621, 113622, 115739 | — |
| **2. Touch Panels — Notifications** | — | — | Geolocation-based notification suppression when at home<br>CHOME-117307 |
| **3. Device Support — Ubiquiti** | — | Device discovery & commissioning · About page · Advanced settings · Documentation<br>CHOME-113676, 113677, 113890, 113742 | Lighting & shade scenes · Conditionals · Events · Sequences · Routing<br>CHOME-113914, 113916, 113917, 113918, 114191 |
| **4. Device Support — 2N** | Full commissioning flow · my2N registration · Device details · Settings · Scenes · Conditionals · Events · Sequences · Routing<br>CHOME-114756, 114755, 114754, 114753, 114752, 114751, 114750, 114749, 114748 | — | — |
| **5. Mobile — Push Notifications** | Push notification from doorbell press · Subscribe/unsubscribe device · Multi-user/multi-device flows · Tap notification → preview screen · Two-way audio · Quick actions · Live camera · Default sound · Multi-device dismissal (PN + calls)<br>CHOME-113693, 117707, 118206, 113691, 113688, 113692, 113689, 113702, 116147, 116146 | Missed notification / late tap · Motion detection notification · Notification recipients · Gate/garage actuation · I/O and relay assignment · Relay lock in Configure Pro · PIN code linking · PIN code creation · Ubiquiti automation programming<br>CHOME-113690, 113694, 113700, 113709, 113710, 113739, 113738, 113740, 113741 | — |
| **6. Mobile — Phone Calls** | Receive phone call from doorbell · Answer call → preview screen<br>CHOME-114324, 114337 | — | Phone call recipient configuration<br>CHOME-116068 |
| **7. Platform — Push Notifications** | Platform engineering tasks (PN framework, Azure integration, architecture, API contracts)<br>CHOME-116008 (engineering tasks) | — | — |

> **Note on swim lane placement:** Several stories still have a blank NOW/NEXT/LATER value (`customfield_10030`) in Jira. The lane placement above reflects the product team's intended Story Map; where Jira's field disagrees or is blank, the Jira field is the discrepancy to reconcile, not this table.

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
