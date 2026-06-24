# Door Stations — Jira vs. MD Comparison

> Use the **Decision** column to record your choice for each story: **Overwrite** (replace Jira with MD content), **Merge** (combine both), or **Keep Jira** (leave Jira AC as-is, only write NOW/NEXT/LATER).
> 
> `customfield_10015` (NOW/NEXT/LATER) is **null on all stories** — that field will be written to Jira for every story once you confirm.

**Legend:**
- ✅ Match — AC is equivalent in both; only formatting/Gherkin structure may differ
- 🟡 Both have AC — content exists in both but differs; needs your decision
- 🟢 AC empty in Jira — MD adds new content; safe to write
- 🔴 Jira AC wrong/incomplete — Jira content is broken or mismatched; recommend overwrite

---

## Epic 1: Touch Panels — Ubiquiti (CHOME-113611)

### [CHOME-113614](https://crestroneng.atlassian.net/browse/CHOME-113614) — In Home || Launch directly into the relevant call screen with live camera view on my touch screens from a door station press

**NOW/NEXT/LATER:** NEXT

| | Jira | MD |
|---|---|---|
| **Use Case** | As a homeowner/resident, I want to launch directly into the relevant live camera view in the Crestron Home app from a door-related notification so that I can quickly assess the situation. | As a homeowner/resident, I want to launch directly into the relevant live camera view in the Crestron Home app from a door-related notification, so that I can quickly assess the situation. |
| **Acceptance Criteria** | Given that the end user is at homeWhen a visitor presses the door stationThen I want to immediately see and hear the visitor on the Crestron touch panels without the need for interactionAnd be presented with some choices of actions to AnswerDismissSend an automated messageAnd once I choose an action… | Scenario: Visitor presses the door station button. Given: A Ubiquiti door station button is pressed. and Given: The homeowner is at a Crestron Home touch panel. When: The homeowner taps the notification on the touch panel. Then: The Crestron Home app launches and immediately displays the live camera… |

**Status:** 🟡 Both have AC

**Diff note:** Jira is richer — adds 'Send automated message' as a third action option, and 'one answer ends all panel calls' (a cross-panel concern). MD scopes to launching the camera view only.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113615](https://crestroneng.atlassian.net/browse/CHOME-113615) — In Home || Receive a persistent ring on my Crestron touch screen(s) when the doorbell is pressed

**NOW/NEXT/LATER:** NEXT

| | Jira | MD |
|---|---|---|
| **Use Case** | As a homeowner/resident, I want to receive a persistent doorbell notification on my Crestron touch panel(s) when a doorbell is pressed so that I can quickly decide whether to answer, ignore, or review | As a homeowner/resident, I want to receive a persistent doorbell notification on my Crestron touch panel(s) when a doorbell is pressed, so that I can quickly decide whether to answer, ignore, or revie |
| **Acceptance Criteria** | The doorbell should prompt the user for actions:AnswerIgnorewhat else does it do today? | Scenario: Doorbell is pressed and all configured touch panels ring. Given: A Ubiquiti doorbell is pressed. When: The event reaches the Crestron Home system. Then: All configured touch panels ring persistently until answered, ignored, or timed out; the prompt offers the user actions to Answer or Igno… |

**Status:** 🟡 Both have AC

**Diff note:** Jira AC is informal and contains an unanswered open question ('what else does it do today?'). MD is complete and clean.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113616](https://crestroneng.atlassian.net/browse/CHOME-113616) — In Home || Answer the call with two-way audio and one-way video from a Crestron touch screen

**NOW/NEXT/LATER:** NEXT

| | Jira | MD |
|---|---|---|
| **Use Case** | As a homeowner/resident, I want to answer a doorbell call (entry way, gate) with two-way audio and one-way video **from a Crestron touch panel** so that I can interact with visitors while at home. | As a homeowner/resident, I want to answer a doorbell call (entryway, gate) with two-way audio and one-way video from a Crestron touch panel, so that I can interact with visitors while at home. |
| **Acceptance Criteria** | Touch panel auto-launches Call UI.User hears ring and sees one-way video streamUser can answer the “call” and establshes two-way audio | Scenario: Homeowner answers a door station call from a touch panel. Given: A door station ring is active on the touch panel. When: The homeowner taps Answer. Then: The touch panel auto-launches the Call UI; the user hears the ring, sees one-way video from the door station, and can establish two-way … |

**Status:** ✅ Match

**Diff note:** Same substance — minor wording differences only.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113621](https://crestroneng.atlassian.net/browse/CHOME-113621) — In Home || View the door station and entry cameras live from the touch screens

**NOW/NEXT/LATER:** NEXT

| | Jira | MD |
|---|---|---|
| **Use Case** | As a homeowner/resident, I want to view the door station and entry cameras live from the Crestron Home app on my touch panel(s) so that I can monitor my property in real time. | As a homeowner/resident, I want to view the door station and entry cameras live from the Crestron Home app on my touch panel(s), so that I can monitor my property in real time. |
| **Acceptance Criteria** | Camera of the Door Station must be made visible on the Whole House Camera page after it is added to the systemSnapshot and Camera Stream must be made availableThis should populate automatically when we commission the door station deviceUI Link:   Example of existing manual camera add | Scenario: Homeowner browses to the camera page on a touch panel. Given: A Ubiquiti door station camera is commissioned in Crestron Home. When: The homeowner opens the Whole House Camera page. Then: The door station camera is visible with a live snapshot and stream available; the camera populates aut… |

**Status:** 🟡 Both have AC

**Diff note:** MD adds 'one-way audio available when viewing' which Jira doesn't mention. Jira has a UI reference link to an example camera page.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113622](https://crestroneng.atlassian.net/browse/CHOME-113622) — In Home || Trigger predefined quick actions during an active door call(unlock/gate open/scenes)

**NOW/NEXT/LATER:** NEXT

| | Jira | MD |
|---|---|---|
| **Use Case** | As a homeowner/resident, I want to trigger predefined quick actions (like unlock, gate open, or scenes) during an active door call so that I can manage access and environment conveniently. | As a homeowner/resident, I want to trigger predefined quick actions (unlock, gate open, scenes) during an active door call, so that I can manage access and environment conveniently. |
| **Acceptance Criteria** | Quick actions are visible as an overlay on the active call video panel​2N® Door Stations Screen | Crestron Home OS DocumentationActions must be secure and logged. | Scenario: Homeowner triggers a quick action during a live door call. Given: A door call is active on a touch panel. When: The homeowner selects a quick action from the call overlay. Then: The action is executed (e.g., unlock gate, trigger scene); actions are secure and logged; the overlay is visible… |

**Status:** 🟡 Both have AC

**Diff note:** Jira includes a link to 2N documentation. MD is more explicit on security/logging. Substance matches.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-115739](https://crestroneng.atlassian.net/browse/CHOME-115739) — Customize the ring notification on the Crestron touch panels.

**NOW/NEXT/LATER:** NEXT

| | Jira | MD |
|---|---|---|
| **Use Case** | As a homeowner/resident, I want to customize the ring tone and ringing behavior for door station calls on each touch panel,   so that doorbell and detection events are noticeable but appropriate for e | As a homeowner/resident, I want to customize the ring tone and ringing behavior for door station calls on each touch panel, so that doorbell and detection events are noticeable but appropriate for eac |
| **Acceptance Criteria** | Given a door station generates a call‑eligible event (for example: doorbell press or supported detection),When the event is routed to Crestron Home touch panels,Then the system shall use the ring tone configured for each individual touch panel,And I shall be able to select a ring tone per touch pane… | Scenario: Homeowner configures ring tone per panel. Given: The homeowner has access to touch panel notification settings. When: The homeowner selects a ring tone and behavior for a specific panel. Then: That panel uses the selected ring tone and behavior for subsequent door station events; other pan… |

**Status:** 🟡 Both have AC

**Diff note:** Jira AC is significantly richer — covers: ring count/duration configurable per panel, persists across restarts, no recommissioning needed, disable suppresses audio but keeps visual call indication. MD captures the per-panel ring tone selection only.

**Decision:** _(Overwrite / Merge / Keep Jira)_

---

## Epic 2: Touch Panels — Notifications (CHOME-116727)

### [CHOME-117307](https://crestroneng.atlassian.net/browse/CHOME-117307) — In Home | Use geolocation to recognize a user is home or away

**NOW/NEXT/LATER:** LATER

| | Jira | MD |
|---|---|---|
| **Use Case** | As a homeowner/resident, I want to the recognize when I am home or away from home so that I can automatically turn mobile notifications on and off based on my location. | As a homeowner/resident, I want to have the system recognize when I am home or away, so that mobile notifications automatically turn on and off based on my location. |
| **Acceptance Criteria** | *empty* | Scenario: Homeowner leaves and returns home. Given: Geolocation permission is granted in the Crestron Home mobile app. When: The homeowner's device leaves or enters the home geofence. Then: Mobile push notifications for door station events are automatically enabled when away and suppressed when at h… |

**Status:** 🟢 AC empty in Jira

**Diff note:** No AC in Jira. MD content is purely additive.

**Decision:** _Overwrite_

---

## Epic 3: Device Support — Ubiquiti (CHOME-113671)

### [CHOME-113676](https://crestroneng.atlassian.net/browse/CHOME-113676) — Ubiquiti G6 Pro Entry || Discover & Add Device

**NOW/NEXT/LATER:** NEXT

| | Jira | MD |
|---|---|---|
| **Use Case** | As a dealer, I want to be able to commission Ubiquiti devices into the Creston Home processor & ecosystem so they can be programmed.  # Open Questions  * How are these devices integrated? Do I commiss | As a dealer, I want to commission Ubiquiti devices into the Crestron Home processor and ecosystem, so that they can be programmed and controlled within Crestron Home. |
| **Acceptance Criteria** | Given the user is on the Devices tab in Confiugure ProWhen a the user selects Add DeviceAnd selects Drivers And searches for Ubiquiti -->Is there where we want our integrated support? There is already a Unifi Access Driver by ControlWorksAnd Ubiquiti G6 Pro Entry device is discovered And the user as… | Scenario: Dealer discovers and adds a Ubiquiti G6 Pro Entry during installation. Given: The dealer is connected to a Crestron processor with a Ubiquiti device on the network. When: The dealer initiates device discovery in Configure Pro. Then: The Ubiquiti device is discovered and can be added either… |

**Status:** 🟡 Both have AC

**Diff note:** Jira is far richer — includes a full step-by-step commissioning UI flow, open questions (ControlWorks driver conflict, which hubs are needed, relay routing types), and output device type options. MD has a clean Given/When/Then only.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113677](https://crestroneng.atlassian.net/browse/CHOME-113677) — Ubiquiti G6 Pro Entry || About the device 

**NOW/NEXT/LATER:** NEXT

| | Jira | MD |
|---|---|---|
| **Use Case** | As a dealer, I want to see the information about the door station(s) such as the serial number and firmware version. | As a dealer, I want to see information about the door station(s) such as serial number and firmware version, so that I can verify device identity and support status during and after installation. |
| **Acceptance Criteria** | The following information shall be included on the About tab for the camera:id - The primary key of cameramodel key - The model key of the camerastate - Connection state of the device.name - the name of the cameraMAC address - The MAC address of the device | Scenario: Dealer reviews device details in Configure Pro. Given: A Ubiquiti door station has been commissioned in Configure Pro. When: The dealer opens the About tab for the device. Then: The device's manufacturer, model, driver version, firmware version, online/offline status, signal strength, and … |

**Status:** 🟡 Both have AC

**Diff note:** Different field lists. Jira: id, model key, state, name, MAC address. MD: manufacturer, model, driver version, firmware version, online/offline status, signal strength, PoE/power state. Should merge.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113890](https://crestroneng.atlassian.net/browse/CHOME-113890) — Ubiquiti G6 Doorbell Pro || Device Specific settings

**NOW/NEXT/LATER:** NEXT

| | Jira | MD |
|---|---|---|
| **Use Case** | As a Dealer, I want to use Configure Pro to configure advanced settings.  * name - The name of the camera * osdSettings - On Screen Display settings. * ledSettings - LED settings. * lcdMessage - Messa | As a dealer, I want to use Configure Pro to configure advanced device settings on the Ubiquiti G6 Pro, so that I can tailor device behavior for each installation without leaving Crestron Home. |
| **Acceptance Criteria** | Given that I am a dealer trying to configure my clients Ubiquiti door station(s)When I am setting up a home system that contgains Ubiquiti doorbell cameras and intercomsThen | Scenario: Dealer configures camera and device settings in Configure Pro. Given: A Ubiquiti G6 Pro Entry is commissioned. When: The dealer opens device settings in Configure Pro. Then: The dealer can configure: device name, OSD settings, LED settings, LCD message, microphone volume, video mode (defau… |

**Status:** 🔴 Jira AC incomplete

**Diff note:** Jira AC is broken — starts 'Given...When...Then' but the Then clause is empty. MD has complete Gherkin AC with all configurable settings listed.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113742](https://crestroneng.atlassian.net/browse/CHOME-113742) — Document third-party devices in Crestron Home OS Documentation

**NOW/NEXT/LATER:** NEXT

| | Jira | MD |
|---|---|---|
| **Use Case** | Document supported third-party devices, including relay controlled locks and Ubiquiti door stations, in the Crestron Home OS Documentation under the Third Party Devices section.   This will help deale | As a dealer, I want to find supported third-party products quickly via the Crestron Manual, so that I can verify compatibility and set expectations with clients before a job. |
| **Acceptance Criteria** | *empty* | Scenario: Dealer searches for Ubiquiti door station support in Crestron documentation. Given: Ubiquiti door station support has shipped. When: The dealer searches the Crestron Home OS Documentation under Third Party Devices. Then: Supported Ubiquiti and relay-controlled lock devices are listed with … |

**Status:** 🟢 AC empty in Jira

**Diff note:** No AC in Jira. MD content is purely additive.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113914](https://crestroneng.atlassian.net/browse/CHOME-113914) — Ubiquiti G6 Pro Entry || Scenes

**NOW/NEXT/LATER:** LATER

| | Jira | MD |
|---|---|---|
| **Use Case** | As a Dealer, I want to include each of the output channels from the Ubiquiti doorbell that are configured as Lights in lighting scenes and shade scenes. | As a dealer, I want to include each output channel from the Ubiquiti doorbell configured as a Light in lighting and shade scenes, so that I can create automations (e.g., turn on exterior lights when t |
| **Acceptance Criteria** | For each of the outputs set as lighting on the outputs of the Ubiquiti doorbell, I can do the following in the Crestron Home Lighting Scene Editor.Add / Remove a Lighting load to a sceneTurn the load on / off from the scene editorThe same scene control functions are available in the Setup app and th… | Scenario: Dealer adds a doorbell-connected light to a scene. Given: A Ubiquiti G6 Pro Entry is commissioned with at least one output configured as a Light. When: The dealer creates or edits a lighting or shade scene. Then: The Ubiquiti-connected light output is available as a scene participant and r… |

**Status:** 🟡 Both have AC

**Diff note:** Jira is more detailed — explicitly covers shade/drape scenes (Add/Remove, turn on/off) in addition to lighting scenes. MD only mentions lighting scene participation.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113916](https://crestroneng.atlassian.net/browse/CHOME-113916) — Ubiquiti G6 Pro Entry || Conditionals and Variables

**NOW/NEXT/LATER:** LATER

| | Jira | MD |
|---|---|---|
| **Use Case** | As a Dealer, I want to use the State from a device assigned to an I/O input of a Ubiquiti doorbell within a Conditional used in my configuration. | As a dealer, I want to use the state from a device assigned to an I/O input of a Ubiquiti doorbell within a Conditional in my configuration, so that I can build logic that reacts to entry sensor state |
| **Acceptance Criteria** | *empty* | Scenario: Dealer builds a Conditional using a Ubiquiti I/O input state. Given: A device is assigned to an I/O input on the Ubiquiti doorbell. When: The dealer creates a Conditional in Crestron Home. Then: The state of the assigned I/O input device is available as a Conditional variable and evaluates… |

**Status:** 🟢 AC empty in Jira

**Diff note:** No AC in Jira. MD content is purely additive.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113917](https://crestroneng.atlassian.net/browse/CHOME-113917) — Ubiquiti G6 Pro Entry || Events

**NOW/NEXT/LATER:** LATER

| | Jira | MD |
|---|---|---|
| **Use Case** | As a Dealer, I want to be able to program to Events from each device associated with an Input or output channel of the Ubiquiti doorbell | As a dealer, I want to program to Events from each device associated with an input or output channel of the Ubiquiti doorbell, so that I can trigger automations on doorbell press, motion detection, an |
| **Acceptance Criteria** | *empty* | Scenario: Dealer programs an Event triggered by a doorbell press. Given: A Ubiquiti G6 Pro Entry is commissioned with inputs and outputs configured. When: The dealer opens the Events programming surface in Crestron Home. Then: All device-specific events from the Ubiquiti doorbell's input and output … |

**Status:** 🟢 AC empty in Jira

**Diff note:** No AC in Jira. MD content is purely additive.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113918](https://crestroneng.atlassian.net/browse/CHOME-113918) — Ubiquiti G6 Pro Entry || Sequences

**NOW/NEXT/LATER:** LATER

| | Jira | MD |
|---|---|---|
| **Use Case** | As a Dealer, I want to add control for any device associated with an output of the Ubiquiti doorbell and/or gateway to a Sequence in Crestron Home. | As a dealer, I want to add control for any device associated with an output of the Ubiquiti doorbell and/or gateway to a Sequence in Crestron Home, so that I can chain door station actions with other  |
| **Acceptance Criteria** | *empty* | Scenario: Dealer adds a relay-controlled gate to a Sequence. Given: A gate motor is connected to a Ubiquiti output and the device is commissioned. When: The dealer creates or edits a Sequence. Then: The Ubiquiti output-connected device is available as a Sequence action; executing the Sequence trigge… |

**Status:** 🟢 AC empty in Jira

**Diff note:** No AC in Jira. MD content is purely additive.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-114191](https://crestroneng.atlassian.net/browse/CHOME-114191) — Ubiquiti G6 Pro Entry, Ubiquiti UDM || Routing

**NOW/NEXT/LATER:** LATER

| | Jira | MD |
|---|---|---|
| **Use Case** |  | As a dealer, I want to route I/O and relay-connected devices from Ubiquiti G6 Pro Entry and UDM hardware in Configure Pro, so that gates, locks, and accessories are logically assigned and controllable |
| **Acceptance Criteria** | *empty* | Scenario: Dealer routes a relay-controlled gate to the Ubiquiti doorbell in Configure Pro. Given: A Ubiquiti G6 Pro Entry and UDM are commissioned. When: The dealer opens the routing configuration for the Ubiquiti devices. Then: The dealer can assign I/O inputs and relay outputs to Crestron Home dev… |

**Status:** 🟢 AC empty in Jira

**Diff note:** No AC in Jira. MD content is purely additive.

**Decision:** _(Overwrite / Merge / Keep Jira)_

---

## Epic 4: Device Support — 2N (CHOME-114571)

### [CHOME-114756](https://crestroneng.atlassian.net/browse/CHOME-114756) — 2N Door station || Discover & Add Devices

**NOW/NEXT/LATER:** NOW

| | Jira | MD |
|---|---|---|
| **Use Case** | As a dealer, I want to be able to commission 2N door stations into the Creston Home processor & ecosystem so they can be programmed.  ---  ### 🎯 Goals/Outcomes & Measurements  * Dealers/Installers can | As a dealer, I want to commission 2N door stations into the Crestron Home processor and ecosystem, so that they can be programmed and controlled within Crestron Home. |
| **Acceptance Criteria** | Given the user is on the Devices tab in Confiugure ProWhen a the user selects Add DeviceAnd selects DriversAnd searches for 2N -->Is this where we want our integrated support? And 2N device(s) is discoveredAnd the user assigns the device to a roomThen the device is added to the selected roomAnd the … | Scenario: Dealer commissions a 2N IP Verso 2.0 during installation. Given: A 2N door station is on the network and a Crestron processor is connected. When: The dealer initiates device discovery in Configure Pro. Then: The 2N device is discovered and commissioned; supported models include 2N IP Verso… |

**Status:** 🟡 Both have AC

**Diff note:** Jira is far richer — includes full commissioning UI flow, open questions about 2N integration approach, relay output device types (Light, Generic Relay, Gate, Garage Door, etc.), and my2N registration flow trigger. MD has clean Given/When/Then only.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-114755](https://crestroneng.atlassian.net/browse/CHOME-114755) — 2N Door station || my2N Registration

**NOW/NEXT/LATER:** NOW

| | Jira | MD |
|---|---|---|
| **Use Case** | As a dealer, I want to be able to register my clents to the my2N portal so they can receive notifications to mobile devices when they are not home.  ---  ### 🎯 Goals/Outcomes & Measurements  * Dealers | As a dealer, I want to register my clients to the my2N portal during commissioning, so that end users can receive push notifications and video calls on mobile devices when not at home. |
| **Acceptance Criteria** | Given the installer is setting up a 2N Door station in Configure ProWhen the installer adds a device to a roomAnd the device is added to a roomThen the my2N registration flow is initiated And the installer can seamlessly register the client for the subscription my2N Registration flowTBD | Scenario: Dealer registers homeowner to my2N during device commissioning. Given: A 2N device is being commissioned in Configure Pro. When: The dealer reaches the my2N registration step in the commissioning flow. Then: The dealer is prompted to create or link a my2N account for the end user; end user… |

**Status:** 🟡 Both have AC

**Diff note:** Jira AC has 'TBD' for the my2N registration flow detail. MD has the billing intent (transparent, no nickel-and-dimed, aggregated pricing). Both are incomplete in different ways.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-114754](https://crestroneng.atlassian.net/browse/CHOME-114754) — 2N Door station || About the device 

**NOW/NEXT/LATER:** NOW

| | Jira | MD |
|---|---|---|
| **Use Case** | As a dealer, I want to see the information about the door station(s) such as the serial number and firmware version.  ---  ### 🎯 Goals/Outcomes & Measurements  * Dealers/Installers can view all the de | As a dealer, I want to see information about the 2N door station(s) such as serial number and firmware version, so that I can verify device identity and support status. |
| **Acceptance Criteria** | The following information shall be included on the About tab for the camera:   id - The primary key of cameramodel key - The model key of the camerastate - Connection state of the device.name - the name of the cameraMAC address - The MAC address of the device | Scenario: Dealer reviews 2N device details in Configure Pro. Given: A 2N door station has been commissioned. When: The dealer opens the About screen for the device. Then: All pertinent device information is displayed (details subject to 2N API availability). |

**Status:** 🟡 Both have AC

**Diff note:** Jira lists specific fields: id, model key, state, name, MAC address. MD says 'all pertinent device information (subject to 2N API)'. Jira is more specific.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-114753](https://crestroneng.atlassian.net/browse/CHOME-114753) — 2N Door station|| Device Specific settings

**NOW/NEXT/LATER:** NOW

| | Jira | MD |
|---|---|---|
| **Use Case** | As a Dealer, I want to use Configure Pro to configure advanced settings of the 2N door stations  **What settings are configurable on the 2N door stations and what do we want to expose?**  * name - The | As a dealer, I want to use Configure Pro to configure advanced settings on 2N door stations, so that I can tailor device behavior per installation without leaving Crestron Home. |
| **Acceptance Criteria** | Given that I am a dealer trying to configure my clients 2N door station(s)When I am setting up a home system that contgains Ubiquiti doorbell cameras and intercomsThen | Scenario: Dealer configures camera and relay settings on a 2N device. Given: A 2N door station is commissioned. When: The dealer opens device settings in Configure Pro. Then: The dealer can configure: device name, OSD settings, LED settings, LCD message, microphone volume, video mode, HDR type, and … |

**Status:** 🔴 Jira AC incomplete

**Diff note:** Jira AC is broken — starts 'Given...When...Then' but the Then clause is empty. MD has complete Gherkin AC with all configurable settings and relay configuration listed.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-114752](https://crestroneng.atlassian.net/browse/CHOME-114752) — 2N Door station || Scenes

**NOW/NEXT/LATER:** NOW

| | Jira | MD |
|---|---|---|
| **Use Case** | As a Dealer, I want to include each of the output channels from the 2N door station that are configured as Lights in lighting scenes and shade scenes. | As a dealer, I want to include each output channel from the 2N door station configured as a Light in lighting and shade scenes, so that I can build automations triggered by door events. |
| **Acceptance Criteria** | For each of the outputs set as lighting on the outputs of the 2N door station, I can do the following in the Crestron Home Lighting Scene Editor.Add / Remove a Lighting load to a sceneTurn the load on / off from the scene editorFor each of the outputs set as Shades on the outputs of the 2N door stat… | Scenario: Dealer adds a 2N-connected light to a scene. Given: A 2N door station is commissioned with at least one output configured as a Light. When: The dealer creates or edits a lighting or shade scene. Then: The 2N output-connected light is available as a scene participant and responds to scene t… |

**Status:** 🟡 Both have AC

**Diff note:** Jira is more detailed — explicitly covers shade/drape scenes in addition to lighting scenes, and notes setup app + end user app parity. MD covers lighting scene participation only.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-114751](https://crestroneng.atlassian.net/browse/CHOME-114751) — 2N Door station || Conditionals and Variables

**NOW/NEXT/LATER:** NOW

| | Jira | MD |
|---|---|---|
| **Use Case** | As a Dealer, I want to use the State from a device assigned to an I/O input of a 2N door station within a Conditional used in my configuration. | As a dealer, I want to use the state from a device assigned to an I/O input of a 2N door station within a Conditional, so that I can build logic that reacts to contact closures or sensor states on the |
| **Acceptance Criteria** | *empty* | Scenario: Dealer builds a Conditional using a 2N I/O input state. Given: A device is assigned to an I/O input on the 2N door station. When: The dealer creates a Conditional in Crestron Home. Then: The state of the I/O input device is available as a Conditional variable. |

**Status:** 🟢 AC empty in Jira

**Diff note:** No AC in Jira. MD content is purely additive.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-114750](https://crestroneng.atlassian.net/browse/CHOME-114750) — 2N Door station || Events

**NOW/NEXT/LATER:** NOW

| | Jira | MD |
|---|---|---|
| **Use Case** | As a Dealer, I want to be able to program to Events from each device associated with an Input or output channel of the 2N door station | As a dealer, I want to program to Events from each device associated with an input or output channel of the 2N door station, so that I can trigger automations on doorbell press, motion, or relay state |
| **Acceptance Criteria** | *empty* | Scenario: Dealer programs an Event triggered by a 2N doorbell press. Given: A 2N door station is commissioned with inputs and outputs configured. When: The dealer opens the Events programming surface. Then: All device-specific events from the 2N door station's input and output channels are available… |

**Status:** 🟢 AC empty in Jira

**Diff note:** No AC in Jira. MD content is purely additive.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-114749](https://crestroneng.atlassian.net/browse/CHOME-114749) — 2N Door station || Sequences

**NOW/NEXT/LATER:** NOW

| | Jira | MD |
|---|---|---|
| **Use Case** | As a Dealer, I want to add control for any device associated with an output of the 2N door station to a Sequence in Crestron Home. | As a dealer, I want to add control for any device associated with an output of the 2N door station to a Sequence in Crestron Home, so that I can chain door station actions with other system behaviors. |
| **Acceptance Criteria** | *empty* | Scenario: Dealer adds a 2N relay-connected device to a Sequence. Given: A device is connected to a 2N door station output and commissioned. When: The dealer creates or edits a Sequence. Then: The 2N output-connected device is available as a Sequence action and executes correctly. |

**Status:** 🟢 AC empty in Jira

**Diff note:** No AC in Jira. MD content is purely additive.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-114748](https://crestroneng.atlassian.net/browse/CHOME-114748) — 2N Door station || Routing

**NOW/NEXT/LATER:** NOW

| | Jira | MD |
|---|---|---|
| **Use Case** | {'type': 'doc', 'version': 1, 'content': [{'type': 'heading', 'attrs': {'level': 3}}]} | As a dealer, I want to route I/O and relay-connected devices from 2N door station hardware in Configure Pro, so that gates, locks, and accessories are logically assigned and controllable in the Crestr |
| **Acceptance Criteria** | *empty* | Scenario: Dealer routes a 2N relay output to a gate in Configure Pro. Given: A 2N door station is commissioned. When: The dealer opens the routing configuration for the 2N device. Then: The dealer can assign I/O inputs and relay outputs to Crestron Home device types and the routing is reflected in t… |

**Status:** 🟢 AC empty in Jira

**Diff note:** No AC in Jira. MD content is purely additive.

**Decision:** _(Overwrite / Merge / Keep Jira)_

---

## Epic 5: Mobile — Push Notifications (CHOME-113680)

### [CHOME-113693](https://crestroneng.atlassian.net/browse/CHOME-113693) — Receive a push notification on my mobile device(s) when Door Station button is pressed

**NOW/NEXT/LATER:** NOW

| | Jira | MD |
|---|---|---|
| **Use Case** | As a homeowner/resident, I want to receive a push notification on my mobile device(s) when a doorbell is pressed so that I can quickly decide whether to answer, ignore, or save it to review later. | As a homeowner/resident, I want to receive a push notification on my mobile device(s) when a doorbell is pressed, so that I can quickly decide whether to answer, ignore, or review later. |
| **Acceptance Criteria** | Given a that someone pushed the button on the door stationWhen the event is received by the Crestron Home system,Then a push notification shall be sent to the user’s mobile devices that are enabled for notifications,And the push notification shall be delivered immediately (within 1 second of the doo… | Scenario: Visitor presses the doorbell while homeowner is away. Given: The homeowner has push notifications enabled in the Crestron Home mobile app. When: The door station button is pressed. Then: A standard OS push notification is delivered to iOS and Android within 1 second. |

**Status:** ✅ Match

**Diff note:** Same substance — within 1 second, iOS & Android. Minor wording differences only.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-117707](https://crestroneng.atlassian.net/browse/CHOME-117707) — User can enable or disable push notifications from the mobile app when away from home.

**NOW/NEXT/LATER:** NOW

| | Jira | MD |
|---|---|---|
| **Use Case** | ### Summary  As a homeowner using the Crestron Home mobile app, I want to be able to selectively enable or disable push notifications for my Homes from my mobile device.  ### Context  The issue is abo | As a homeowner, I want to enable push notifications for homes I can access from the Crestron Home mobile app, so that I receive door station push notifications whether I am home or away. |
| **Acceptance Criteria** | Push Notification Enable/Disable — User Acceptance CriteriaMock of Crestron Home mobile app -  Scenario: Navigate to push notification settingsGiven the user is signed into the Crestron Home app and has access to at least one HomeWhen they tap into a Home, open the 3-dot menu, and select Settings → … | Scenario: Homeowner enables push notifications in the app. Given: The homeowner is logged into the Crestron Home mobile app. When: The homeowner enables or disables push notifications for a home. Then: The device is registered or unregistered for push notifications for that home; changes take effect… |

**Status:** 🟡 Both have AC

**Diff note:** Jira AC is far richer — 7 detailed scenarios covering: navigate to settings, first-time enable, OS permission denied flow, disable, persists across restarts, per-device (not per-account), per-home, new home invite default. MD has a simple single Given/When/Then.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113691](https://crestroneng.atlassian.net/browse/CHOME-113691) — Tapping the push notification for the doorbell opens the Crestron Home app preview screen

**NOW/NEXT/LATER:** NOW

| | Jira | MD |
|---|---|---|
| **Use Case** | As a homeowner/resident, I want to tap a doorbell notification on my mobile device(s) and open the Crestron Home app and see & hear who is at the door | As a homeowner/resident, I want to tap a doorbell notification on my mobile device and open the Crestron Home app to see and hear who is at the door, so that I can quickly assess the situation before  |
| **Acceptance Criteria** | Dependency →  UX Mock up of notification action screenScenario: Launching the door station preview screen from a Push NotificationGiven I have received a push notification for a "Doorbell" event,When I tap the notification on my mobile device,Then the door station preview screen shall launch within … | Scenario: Homeowner taps a doorbell push notification. Given: A push notification has been received on the homeowner's mobile device. When: The homeowner taps the notification. Then: The Crestron Home app launches and immediately displays the notification action screen with one-way audio and video; … |

**Status:** 🟡 Both have AC

**Diff note:** Jira adds specific latency SLAs: app launches within 2 seconds, audio within 2 seconds, video within 5 seconds. Also specifies 'up to 4 other programmable quick actions'. MD lacks these specifics.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113688](https://crestroneng.atlassian.net/browse/CHOME-113688) — Talk with the visitor(s) via the Crestron Home App

**NOW/NEXT/LATER:** NOW

| | Jira | MD |
|---|---|---|
| **Use Case** | As a homeowner/resident, I want a way to communicate with the person at the door | As a homeowner/resident, I want to communicate with the person at the door, so that I can greet, instruct, or decline the visitor remotely. |
| **Acceptance Criteria** | Given I am on the Preview screen,When I select the Chat / Start Talking / Microphone / Mute icon,Then the app shall automatically enable two‑way audio on my mobile device,And I shall see a visual indicator confirming that the microphone is active.Example of what this screen could look like? (not fin… | Scenario: Homeowner initiates two-way communication with a visitor. Given: The homeowner is on the notification action screen with the visitor present at the door. When: The homeowner chooses to Chat. Then: Two-way audio (and two-way video where supported) is established between the homeowner's mobi… |

**Status:** ✅ Match

**Diff note:** Same substance — Chat icon triggers two-way audio, visual mic indicator shown.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113690](https://crestroneng.atlassian.net/browse/CHOME-113690) — Reviewing missed doorbell events

**NOW/NEXT/LATER:** NOW

| | Jira | MD |
|---|---|---|
| **Use Case** | As a homeowner/resident, I want to tap a doorbell notification on my mobile device(s) and open the Crestron Home app and see the camera of the doorstation even if someone is no longer at the door | As a homeowner/resident, I want to tap a doorbell notification on my mobile device and open the Crestron Home app to see the camera even if someone is no longer at the door, so that I can review who v |
| **Acceptance Criteria** | Given I have received a push notification for a "Doorbell" or "Person Detected" event,And I missed the earlier notification When I tap the old notification on my mobile device well after the doorbell event occurred [This is the same as if the notification just came in]Then the door station preview s… | Scenario: Homeowner taps a late doorbell notification. Given: A doorbell notification was received but not acted on in time. When: The homeowner taps the late notification. Then: The Crestron Home app launches and displays the door station camera view; the experience is the same as if someone were s… |

**Status:** ✅ Match

**Diff note:** Same substance — Jira more explicit on the action buttons (Chat, Unlock/Lock, Exit). MD says 'same as if someone were still at the door'.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113694](https://crestroneng.atlassian.net/browse/CHOME-113694) — Receive a push notification on my mobile device(s) when motion is detected

**NOW/NEXT/LATER:** NOW

| | Jira | MD |
|---|---|---|
| **Use Case** | As a homeowner/resident, I want to receive a push notification on my mobile device(s) when a doorbell is pressed so that I can quickly decide whether to answer, ignore, or review later. | As a homeowner/resident, I want to receive a push notification on my mobile device(s) when motion is detected, so that I can quickly decide my next action. |
| **Acceptance Criteria** | Notification is a standard mobile OS push notificationNotification is received withing 1 secondNotifications are sent to iOS & Android devices | Scenario: Motion is detected at the door station while homeowner is away. Given: Motion detection is configured on the door station. When: Motion is detected. Then: A standard push notification is delivered to iOS and Android within 1 second. |

**Status:** 🟡 Both have AC

**Diff note:** Jira AC is bullet-format rather than Gherkin. Same content: standard OS push, within 1 second, iOS & Android. MD has proper Gherkin structure but same meaning.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113692](https://crestroneng.atlassian.net/browse/CHOME-113692) — Trigger predefined quick actions during an active door call 

**NOW/NEXT/LATER:** NOW

| | Jira | MD |
|---|---|---|
| **Use Case** | As a homeowner/resident, I want to trigger predefined quick actions (like unlock, gate open, or scenes) during an active door call so that I can manage access and environment conveniently. | As a homeowner/resident, I want to trigger predefined quick actions (unlock, gate open, scenes) during an active door call, so that I can manage access and environment conveniently from anywhere. |
| **Acceptance Criteria** | Quick actions are visible as an overlay on the active call video panelActions must be secure and logged. | Scenario: Homeowner triggers a quick action during a mobile door call. Given: A door call is active in the Crestron Home mobile app. When: The homeowner selects a quick action from the call overlay. Then: The action is executed; actions are visible as an overlay on the active call video panel; actio… |

**Status:** ✅ Match

**Diff note:** Same substance — quick actions as overlay, secure and logged.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113689](https://crestroneng.atlassian.net/browse/CHOME-113689) — View the door station and entry cameras live from the Crestron Home app

**NOW/NEXT/LATER:** NOW

| | Jira | MD |
|---|---|---|
| **Use Case** | As a homeowner/resident, I want to view the door station and entry cameras live from the Crestron Home app on my mobile device(s) so that I can monitor my property in real time. | As a homeowner/resident, I want to view the door station and entry cameras live from the Crestron Home app on my mobile device(s), so that I can monitor my property in real time. |
| **Acceptance Criteria** | Camera of the Door Station must be made visible on the Whole House Camera page after it is added to the systemSnapshot and Camera Stream must be made available 1 way audio should available when viewing camera streamThis should populate automatically when we commission the door station deviceUI Link:… | Scenario: Homeowner browses to the camera page in the mobile app. Given: A Ubiquiti door station camera is commissioned in Crestron Home. When: The homeowner opens the Whole House Camera page on mobile. Then: The door station camera is visible with a live snapshot and stream available; one-way audio… |

**Status:** ✅ Match

**Diff note:** Same substance. Jira has a UI reference link.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113700](https://crestroneng.atlassian.net/browse/CHOME-113700) — An Owner selects who will get push notifications from the door station(s)

**NOW/NEXT/LATER:** NOW

| | Jira | MD |
|---|---|---|
| **Use Case** | As a homeowner/resident, I want to invite others to respond to notifications and select/configure users for different notification types. | As a homeowner/resident, I want to invite others to respond to notifications and configure which users receive which notification types, so that the right household members are alerted based on the ev |
| **Acceptance Criteria** | Given that I am an Owner in my Crestron Home system,When I enter the Settings > Users menu for my houseThen I have the option to Add New UsersAnd can change attributes for exising UsersAnd they will have access to the settings to enable push notifications for door stations in the home | Scenario: Homeowner configures notification recipients. Given: The homeowner has access to the User section of the Crestron Home end-user app. When: The homeowner configures notification recipients for a door station. Then: Selected users receive push notifications for the configured event types; un… |

**Status:** 🟡 Both have AC

**Diff note:** Jira specifies the UI path (Settings > Users menu) and framing as 'Add New Users / change attributes'. MD focuses on the outcome (selected users receive notifications). Different emphasis.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113702](https://crestroneng.atlassian.net/browse/CHOME-113702) — Default notification sounds on mobile devices

**NOW/NEXT/LATER:** NOW

| | Jira | MD |
|---|---|---|
| **Use Case** | As an homeowner/resident, I expect the notification for visitors (someone that pressed  the doorbell or someone detected at the door) to instantly tell me someone is at the door.  Some attributes of t | As a homeowner/resident, I expect visitor notifications to instantly tell me someone is at the door, so that I am always aware of doorbell and motion events without configuration. |
| **Acceptance Criteria** | Given I am a homeowner with a registered mobile device,And a person presses the doorbell or is detected at the door by a supported sensor,When my mobile device receives the door activity notification,Then the notification shall immediately convey that someone is at the door,And the notification shal… | Scenario: Homeowner receives a default doorbell notification. Given: No custom notification sound has been set. When: A doorbell press notification is delivered. Then: The notification plays a sound that is distinct from standard messages, sounds urgent, offers immediate action options, and is not s… |

**Status:** 🟡 Both have AC

**Diff note:** Jira AC is significantly richer — covers: high-priority sound, distinct from other apps, not silent, repeating/persistent, actionable buttons in notification bubble, iOS & Android, defined duration. MD is a condensed version of the same intent.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113709](https://crestroneng.atlassian.net/browse/CHOME-113709) — Control || Actuate gates, garage doors, or entry motors using door station controls

**NOW/NEXT/LATER:** NEXT

| | Jira | MD |
|---|---|---|
| **Use Case** | As a homeowner/resident, I want to actuate gates, garage doors, or entry motors so that I can grant access to visitors.  As a dealer I want to be able to assign I/Os and Relays on my Ubiquiti devices  | As a homeowner/resident, I want to actuate gates, garage doors, or entry motors, so that I can grant access to visitors remotely without being physically present. |
| **Acceptance Criteria** | Send open/close commands to the device(s) for gatesSend open/close commands to the device(s) for garage doors | Scenario: Homeowner opens a gate remotely during a door call. Given: A gate motor is connected via door station relay and commissioned in Crestron Home. When: The homeowner taps the gate open action in the Crestron Home app. Then: An open/close command is sent to the gate motor and the gate responds… |

**Status:** 🟡 Both have AC

**Diff note:** Jira AC is thin — just 'send open/close commands for gates / garage doors'. MD has full Gherkin with commissioning context and relay configuration.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113710](https://crestroneng.atlassian.net/browse/CHOME-113710) — Control || Assign I/Os and Relays on my devices

**NOW/NEXT/LATER:** NEXT

| | Jira | MD |
|---|---|---|
| **Use Case** | As a homeowner/resident, I want to actuate gates, garage doors, or entry motors so that I can grant access to visitors.  As a dealer I want to be able to assign I/Os and Relays on my Ubiquiti devices  | As a dealer, I want to assign I/Os and Relays on devices when setting up garage doors and gates, so that homeowners can control those entry points from the Crestron Home app. |
| **Acceptance Criteria** | Send open/close commands to the device(s) for gatesSend open/close commands to the device(s) for garage doors | Scenario: Dealer assigns a relay to a gate during commissioning. Given: A Ubiquiti device with relay outputs is commissioned in Configure Pro. When: The dealer configures the garage/gate setup in Configure Pro. Then: The dealer can assign I/O inputs and relay outputs to gate or garage door device ty… |

**Status:** 🔴 Jira AC wrong

**Diff note:** Jira AC is identical to CHOME-113709 — 'send open/close commands for gates / garage doors'. This story is about dealer assigning I/Os in Configure Pro, not homeowner actuation. The AC doesn't match the story.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113739](https://crestroneng.atlassian.net/browse/CHOME-113739) — Add relay controlled lock option in Configure Pro

**NOW/NEXT/LATER:** NEXT

| | Jira | MD |
|---|---|---|
| **Use Case** | Implement a relay control lock option in Configure Pro with the same functionality as garage and gates today. Reference issue CHOME-80924 for related details on Door Locks and Relay Controlled Door Lo | As a dealer, I want to configure relay-controlled locks in Configure Pro with the same functionality as garage doors and gates, so that homeowners can lock and unlock doors via Crestron Home. |
| **Acceptance Criteria** | *empty* | Scenario: Dealer configures a relay-controlled door lock. Given: A relay-controlled lock is connected to a door station device. When: The dealer sets up the lock in Configure Pro. Then: The lock appears as a controllable device in the homeowner's Crestron Home app; lock/unlock commands are supported… |

**Status:** 🟢 AC empty in Jira

**Diff note:** No AC in Jira. MD content is purely additive.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113738](https://crestroneng.atlassian.net/browse/CHOME-113738) — Link Relay controlled lock to Ubiquiti door station for PIN code creation

**NOW/NEXT/LATER:** NEXT

| | Jira | MD |
|---|---|---|
| **Use Case** | Enable linking of relay controlled locks to Ubiquiti door stations to allow end-users to create PIN codes via the end-user application. This feature is requested by dealers to enhance user control ove | As a dealer, I want to link relay-controlled locks to door stations, so that end users can create PIN codes that control the lock via the door station. |
| **Acceptance Criteria** | *empty* | Scenario: Homeowner creates a temporary PIN for a delivery. Given: A relay-controlled lock is linked to a door station in Configure Pro. When: The homeowner opens access management in the end-user app. Then: The homeowner can create a temporary PIN; entering the PIN at the door station triggers the … |

**Status:** 🟢 AC empty in Jira

**Diff note:** No AC in Jira. MD content is purely additive.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113740](https://crestroneng.atlassian.net/browse/CHOME-113740) — Create PIN codes for locks controlled by Crestron, Ubiquity I/O, or Relays

**NOW/NEXT/LATER:** NEXT

| | Jira | MD |
|---|---|---|
| **Use Case** | Develop functionality to create PIN codes for locks controlled by Crestron, Ubiquity I/O, or relays. Include the ability to send a temporary PIN for supported door stations. | As a homeowner/resident, I want to create temporary PIN codes for locks controlled by Crestron, door station I/O, or relays, so that I can grant secure, time-limited access to guests or delivery perso |
| **Acceptance Criteria** | *empty* | Scenario: Homeowner sends a temporary PIN to a guest. Given: A PIN-capable lock is configured in Crestron Home. When: The homeowner creates a temporary PIN in the end-user app. Then: The PIN is sent to the supported door station; entering the PIN grants access during the configured window; the PIN e… |

**Status:** 🟢 AC empty in Jira

**Diff note:** No AC in Jira. MD content is purely additive.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-113741](https://crestroneng.atlassian.net/browse/CHOME-113741) — Integrate Ubiquiti events, commands, and feedback states within Crestron Home programming

**NOW/NEXT/LATER:** NEXT

| | Jira | MD |
|---|---|---|
| **Use Case** | Use Ubiquiti events, commands, and feedback states within the Crestron Home programming ecosystem to allow homeowners/residents to configure lighting scenes that run automatically when a doorbell is p | As a homeowner/resident, I want to configure lighting scenes and other automations that run automatically when a doorbell is pressed or motion is detected, so that my home responds intelligently to en |
| **Acceptance Criteria** | *empty* | Scenario: Exterior light turns on when motion is detected at night. Given: A motion-triggered scene is configured using Ubiquiti door station events. When: The door station detects motion matching the configured category (person, car, animal, environment). Then: The configured scene executes (e.g., … |

**Status:** 🟢 AC empty in Jira

**Diff note:** No AC in Jira. MD content is purely additive.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-116147](https://crestroneng.atlassian.net/browse/CHOME-116147) — Tapping a push notification from the door station on one mobile device will end or dismiss all phone calls & push notifications to other devices

**NOW/NEXT/LATER:** NEXT

| | Jira | MD |
|---|---|---|
| **Use Case** | As a homeowner/resident, I want all other notifications for a doorbell press to be canceled when someone answers one of them. | As a homeowner/resident, I want all other notifications for a doorbell press to be canceled when someone answers one of them, so that I am not disturbed across multiple devices after the event has bee |
| **Acceptance Criteria** | Given a that someone pushed the button on the door stationWhen a push notification is sent to the all registered devices,And one of the registered users opens the push notificationThen the notification to all other registered users/devices shall be canceled. | Scenario: Homeowner answers a doorbell from their phone; other devices stop notifying. Given: A doorbell press notification has been sent to multiple mobile devices and touch panels. When: One device answers or dismisses the notification. Then: All other devices immediately stop ringing or displayin… |

**Status:** ✅ Match

**Diff note:** Same substance — doorbell press, one device answers, all others cancel.

**Decision:** _(Overwrite / Merge / Keep Jira)_

---

## Epic 6: Mobile — Phone Calls (CHOME-115337)

### [CHOME-114324](https://crestroneng.atlassian.net/browse/CHOME-114324) — Receive a phone call on my mobile device(s) when Door Station button is pressed

**NOW/NEXT/LATER:** NOW

| | Jira | MD |
|---|---|---|
| **Use Case** | As a homeowner/resident, I want to receive a push notification on my mobile device(s) when a doorbell is pressed so that I can quickly decide whether to answer, ignore, or review later. | As a homeowner/resident, I want to receive a phone call on my mobile device(s) when a doorbell is pressed, so that I can be notified even when my phone is not actively in use. |
| **Acceptance Criteria** | Given a that someone pushed the button on the door stationWhen the event is received by the Crestron Home system,Then a phone call is triggered to the user’s registered mobile devices,And the phone call shall be received immediately (within 1 second of the doorbell being pressed)And the phone call s… | Scenario: Visitor presses the doorbell; homeowner receives a phone call. Given: Phone call notifications are enabled for the homeowner's mobile device. When: The door station button is pressed. Then: A phone call is delivered to the homeowner's iOS or Android device with doorbell-to-ring latency und… |

**Status:** ✅ Match

**Diff note:** Same substance — phone call within 1 second, iOS & Android.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-114337](https://crestroneng.atlassian.net/browse/CHOME-114337) — Answering the phone call from the doorbell opens the Crestron Home app preview screen

**NOW/NEXT/LATER:** NOW

| | Jira | MD |
|---|---|---|
| **Use Case** | As a homeowner/resident, I want to tap a doorbell notification on my mobile device(s) and open the Crestron Home app and see & hear who is at the door | As a homeowner/resident, I want to answer a doorbell phone call and immediately see and hear who is at the door in the Crestron Home app, so that I can assess the situation before deciding how to enga |
| **Acceptance Criteria** | Dependency →  UX Mock up of notification action screenScenario: Launching the Notification Action Screen from a Push NotificationGiven I have received a phone call for a "Doorbell" or "Person Detected" event,When I answer the phone call on my mobile device,Then the video first screen shall launch im… | Scenario: Homeowner answers a doorbell phone call. Given: A phone call from a door station is ringing on the homeowner's mobile device. When: The homeowner answers the call. Then: The Crestron Home app launches and immediately prioritizes the door station call screen; live video from the door statio… |

**Status:** ✅ Match

**Diff note:** Jira specifies 'video first screen launches immediately'. MD adds 'homeowner can unmute to establish two-way audio'. Same core flow.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-116068](https://crestroneng.atlassian.net/browse/CHOME-116068) — An Owner selects who will get phone calls from the door station(s)

**NOW/NEXT/LATER:** LATER

| | Jira | MD |
|---|---|---|
| **Use Case** | As a homeowner/resident, I want to invite others to respond to notifications and select/configure users for different notification types. | As a homeowner/resident, I want to configure which users receive phone calls from the door station, so that the right household members are alerted based on their preferences. |
| **Acceptance Criteria** | Given that I am an Owner in my Crestron Home system,When I enter the Settings > Users menu for my houseThen I have the option to Add New UsersAnd can change attributes for new & existing Users so they will have access to the settings to enable push notifications for door stations in the home | Scenario: Homeowner configures phone call recipients for a door station. Given: The homeowner has access to the User section of the Crestron Home end-user app. When: The homeowner configures phone call recipients for a door station event. Then: Selected users receive phone calls for the configured e… |

**Status:** 🟡 Both have AC

**Diff note:** Jira AC says 'enable push notifications for door stations' — likely copy-pasted from CHOME-113700. This story is about configuring phone call recipients, not push notifications.

**Decision:** _(Overwrite / Merge / Keep Jira)_

### [CHOME-116146](https://crestroneng.atlassian.net/browse/CHOME-116146) — Answering a phone call from the door station on one mobile device will end or dismiss the call on all other mobile phones and touch screens

**NOW/NEXT/LATER:** NEXT

| | Jira | MD |
|---|---|---|
| **Use Case** | Answering a phone call from the door station on one device will end or dismiss all calls & notifications to all other devices. | As a homeowner/resident, I want to have all other calls and notifications dismissed when one device answers the door station call, so that I am not simultaneously disturbed on every device in the hous |
| **Acceptance Criteria** | Given a that someone pushed the button on the door stationWhen a phone call is made to the all registered devices,And one of the registered users answers the phone callThen the notifications (push notifications and phone calls) to all other registered users/devices shall be canceled. | Scenario: Homeowner answers from their phone; all other devices stop ringing. Given: A door station phone call is active on multiple mobile devices and touch panels. When: One device answers the call. Then: All other mobile phone calls and touch panel rings are immediately ended or dismissed. |

**Status:** ✅ Match

**Diff note:** Same substance — one device answers phone call, all other calls and notifications canceled.

**Decision:** _(Overwrite / Merge / Keep Jira)_
