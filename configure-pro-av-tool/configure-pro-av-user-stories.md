# Initiative: Configure Pro AV Configuration Workspace

**Vision:** A unified, offline and real-time visual AV configuration workspace that replaces fragmented tooling — giving designers and installers a single environment to design, route, configure, troubleshoot, and deploy AV systems from pre-wire through final commissioning.

**Personas:**
- **Installer Ivan** — Onsite commissioning and live system work; needs real-time confidence in what he sees
- **Designer Dana** — Pre-wire planning and system architecture; needs to design before arriving on site
- **Product Team** — Internal; needs telemetry and usage data to validate outcomes and guide iteration

**Story Map Structure:** Epics run left → right as capability areas. Releases (NOW / NEXT / LATER) are the swim lanes top → bottom.

**ID Scheme:** The number is a permanent, sequential identifier assigned in the order the story was created — it never changes. The letter prefix reflects the current phase assignment (A = NOW, B = NEXT, C = LATER Phase C, D = LATER Phase D) and is the only thing that changes if a story is reprioritized.

---

## Epic 1: Canvas & Visual Workspace

*The primary zoomable workspace where installers and designers see, arrange, and interact with their full system.*

---

### NOW — Phase A

---

#### User Story A-01
- **Summary:** Render live devices as visual nodes so installers can see the full system at a glance

##### Use Case:
- **As an** installer commissioning a live system
- **I want to** see all routable devices rendered as nodes on a canvas
- **so that** I can create the routes based on how the system is wired without mentally reconstructing it from a text-based list

##### Acceptance Criteria:
- **Scenario:** Installer opens a new system and adds devices
- **Scenario:** Installer opens a system with devices that have been added
- **Given:** I am connected to a control processor with discovered/added devices
- **and Given:** I have opened the system in Configure Pro
- **and Given:** The Routing tab is selected
- **and Given:** The Whole System, a Room Group (floor), or a Room is selected
- **and Given:** The canvas is the active workspace
- **When:** The canvas loads
- **Then:** All routable devices appear as nodes on the canvas with visible inputs, outputs, and any existing signal connections between them

---

#### User Story A-02
- **Summary:** Persist canvas layout across sessions so context is never lost

##### Use Case:
- **As an** installer who works across multiple visits to a job site or multiple sites
- **I want to** return to Configure Pro and find my canvas layout exactly as I left it
- **so that** I don't waste time re-arranging nodes and re-establishing my working context every session

##### Acceptance Criteria:
- **Scenario:** Installer returns to a system after closing Configure Pro
- **Given:** I have a system open with nodes positioned, zoom set, and groupings defined on the canvas
- **When:** I close Configure Pro and reopen the same system
- **Then:** The canvas restores to the exact same node positions, zoom level, and groupings I had previously, with no manual reconstruction required

---

#### User Story A-03
- **Summary:** Switch between rooms without accidentally cross-routing systems

##### Use Case:
- **As an** installer managing a multi-room installation
- **I want to** switch between room/system views in Configure Pro
- **so that** I can work on each room independently without risking routing changes leaking across system boundaries

##### Acceptance Criteria:
- **Scenario:** Installer switches from one room to another
- **Given:** I have multiple rooms or systems configured in Configure Pro
- **and Given:** I am actively working in Room A with routes defined
- **When:** I switch to Room B
- **Then:** Room B becomes the focus on the canvas and routing context, and only the routing connections from Room B are visible

---

#### User Story A-27
- **Summary:** Instrument canvas workspace usage to measure whether the canvas is becoming the primary configuration surface

##### Use Case:
- **As a** product manager tracking Configure Pro adoption
- **I want to** capture telemetry on how users interact with the canvas — including session frequency, active time on canvas, and routing interactions initiated from the canvas versus other surfaces
- **so that** I can measure whether the canvas is achieving its target of ≥70% of routing interactions and validate that users are not defaulting back to legacy tools

##### Acceptance Criteria:
- **Scenario:** Product team reviews canvas adoption metrics after Phase A launch
- **Given:** The canvas workspace has shipped and is in active use
- **and Given:** Telemetry instrumentation is in place for the canvas surface
- **When:** The product team reviews usage data
- **Then:** The data includes: percentage of routing interactions initiated on the canvas vs. the routing grid vs. external tools; canvas session frequency per user; and layout persistence success rate — all queryable per system and per time period

---

## Epic 2: Routing & Signal Flow

*Core route creation, validation, and bidirectional sync between canvas and routing grid.*

---

### NOW — Phase A

---

#### User Story A-05
- **Summary:** Create a route by connecting device nodes on the canvas

##### Use Case:
- **As an** installer configuring audio routing
- **I want to** draw a connection from one device's output to another device's input on the canvas
- **so that** I can establish routing without switching to a separate routing tool

##### Acceptance Criteria:
- **Scenario:** Installer creates a route between two device nodes
- **Given:** I have at least two devices on the canvas with compatible I/O
- **and Given:** The devices are not yet connected
- **and Given:** Routing constraints are enforced based on real device capabilities
- **When:** I drag from an output port on one node to an input port on another
- **Then:** A route is created, the connection is visually drawn between the nodes, and the route is immediately reflected in the routing grid and routing subsystem

---

#### User Story A-06
- **Summary:** See canvas and routing grid stay in sync so routing can be trusted

##### Use Case:
- **As an** installer who switches between canvas and grid views
- **I want to** see routing changes I make in the grid instantly reflected on the canvas (and vice versa)
- **so that** I can trust that both views are accurate and don't need to manually verify them against each other

##### Acceptance Criteria:
- **Scenario:** Installer creates a route in the grid and switches to canvas
- **Given:** I have a system open with multiple devices on the canvas
- **and Given:** I switch to the routing grid view
- **When:** I create or modify a route in the routing grid
- **Then:** The connection appears on the canvas immediately when I return to canvas view, with zero inconsistency between the two representations

---

#### User Story A-07
- **Summary:** Prevent invalid routes from being created to avoid bad configurations

##### Use Case:
- **As an** installer wiring up device connections
- **I want to** only see valid connection options when I begin dragging from a device port
- **so that** I cannot accidentally deploy an incompatible configuration that breaks the system

##### Acceptance Criteria:
- **Scenario:** Installer attempts to connect incompatible device ports
- **Given:** I have devices on the canvas with different I/O capabilities
- **and Given:** I begin dragging from an output port
- **When:** I hover over an incompatible input port on another device
- **Then:** The incompatible port is visually indicated as invalid, the connection is not created, and only compatible ports remain highlighted as valid drop targets

---

#### User Story A-28
- **Summary:** Instrument routing interactions to measure drag-drop success rate and routing error frequency

##### Use Case:
- **As a** product manager tracking routing quality in Configure Pro
- **I want to** capture telemetry on routing attempts, completions, failures, and invalid connection attempts
- **so that** I can measure whether visual routing is achieving a near-100% drag-drop success rate and whether routing errors are declining versus the pre-canvas baseline

##### Acceptance Criteria:
- **Scenario:** Product team reviews routing quality metrics after Phase A launch
- **Given:** Canvas routing and grid routing have shipped with instrumentation in place
- **When:** The product team reviews routing telemetry
- **Then:** The data includes: total routing attempts vs. successful completions (drag-drop success rate); count of invalid connection attempts blocked by constraint enforcement; routing changes made via canvas vs. grid (split by surface); and canvas-to-grid sync error rate — all queryable per system and per time period

---

## Epic 3: Advanced Routing & Canvas Customization

*Canvas labeling, port visibility controls, and schematic refinement tools that build on the core routing foundation.*

---

### NEXT — Phase B

---

#### User Story B-08
- **Summary:** Add a text tag to label any source or destination point on the canvas

##### Use Case:
- **As an** installer building out a system schematic
- **I want to** place an editable text tag and connect it to any node input or output point
- **so that** I can see a complete, labeled view of all sources and destinations without relying on memory or external notes

##### Acceptance Criteria:
- **Scenario:** Installer adds a text tag to a source output on the canvas
- **Given:** I have a system open on the canvas with at least one routable device node
- **and Given:** The text tag object is available in the devices/objects panel
- **When:** I drag a text tag onto the canvas and connect it to a node input or output point
- **Then:** The text tag appears as an editable label attached to that connection point, and I can type any custom text to identify the source or destination

---

#### User Story B-09
- **Summary:** Customize which inputs and outputs are visible on a device node to reduce canvas clutter

##### Use Case:
- **As an** installer working on a dense canvas with many-channel devices
- **I want to** choose which inputs and outputs are shown on a device node
- **so that** I can focus the canvas on the connections that matter for this system without being overwhelmed by unused ports

##### Acceptance Criteria:
- **Scenario:** Installer hides unused ports on a device node
- **Given:** I have a device node on the canvas with more inputs and outputs than are used in the current system
- **and Given:** I open the node's view options
- **When:** I deselect specific inputs or outputs from the visible port list
- **Then:** The deselected ports are hidden from the node on the canvas, the node resizes accordingly, and no existing routes to visible ports are affected

---

#### User Story B-34
- **Summary:** Filter the canvas by signal type from the legend so only relevant ports and wires are shown

##### Use Case:
- **As an** installer working on a mixed-signal system (HDMI, AoIP, analog, Bluetooth, etc.)
- **I want to** toggle signal types on and off directly from the canvas legend/key
- **so that** I can focus on one signal domain at a time — for example showing only HDMI ports and wires — without visual noise from unrelated signal types

##### Acceptance Criteria:
- **Scenario:** Installer opens the canvas with a mixed-signal system
- **Given:** I have a system open on the canvas with devices spanning multiple signal types
- **and Given:** The legend is displayed as an interactive filter
- **When:** The canvas loads
- **Then:** Every signal type present in the system is shown as selected (visible) by default, so I see the full system before narrowing it down

- **Scenario:** Installer unselects a signal type to hide it
- **Given:** All signal types are currently selected on the canvas
- **When:** I click a signal type in the legend (e.g., AoIP) to unselect it
- **Then:** All ports and wires of that signal type are hidden from the canvas, the remaining signal types stay visible, and the legend clearly indicates which types are currently selected vs. hidden

- **Scenario:** Installer isolates a single signal type
- **Given:** I have unselected several signal types
- **When:** Only one signal type (e.g., HDMI) remains selected
- **Then:** The canvas shows only HDMI ports and HDMI wires, and a control is available to re-show all signal types in one action

- **Scenario:** Filtering does not alter the underlying configuration
- **Given:** I have hidden one or more signal types via the legend filter
- **When:** I view or later re-show the hidden types
- **Then:** No routes are created, removed, or modified by filtering — the filter only affects what is displayed, and hidden ports remain valid endpoints for their existing connections

---

## Epic 4: Basic Troubleshooting & Live Monitoring

*Signal tracing, device status widgets, and core troubleshooting instrumentation for the initial onsite experience.*

---

### NOW — Phase A

---

#### User Story A-10
- **Summary:** Trace a signal path end-to-end to quickly find where it breaks

##### Use Case:
- **As an** installer troubleshooting a "no audio" complaint
- **I want to** select a signal path and see it highlighted end-to-end across all connected devices
- **so that** I can identify exactly where the signal is failing without trial-and-error across multiple screens

##### Acceptance Criteria:
- **Scenario:** Installer traces signal from source to destination
- **Given:** I have a system open with a routed signal path
- **and Given:** I am on the canvas view
- **When:** I select any device node with an end-to-end signal path
- **Then:** The full signal path from source to destination is highlighted on the canvas, and any break in the path (disconnected node, muted device, zero-gain point) is visually flagged

---

#### User Story A-12
- **Summary:** See a real-time status widget for each NAX device to monitor crucial device health at a glance

##### Use Case:
- **As an** installer monitoring a live system during commissioning
- **I want to** see a real-time status widget on each NAX device node showing the current state of its crucial features and functions
- **so that** I can spot device-level issues immediately without opening a separate device interface or WebUI

##### Acceptance Criteria:
- **Scenario:** Installer scans device status widgets across the canvas during a live session
- **Given:** I am connected to a live control processor
- **and Given:** I have a system open on the canvas with one or more NAX device nodes
- **When:** I view the canvas
- **Then:** Each NAX device node displays a status widget showing the real-time state of its crucial features and functions, and the widget updates automatically as device state changes without requiring a manual refresh

---

#### User Story A-29
- **Summary:** Instrument troubleshooting workflows to measure time-to-diagnosis and external tool switching

##### Use Case:
- **As a** product manager tracking troubleshooting effectiveness in Configure Pro
- **I want to** capture telemetry on signal tracing sessions, time spent in troubleshooting flows, and any context switches to external tools during a session
- **so that** I can establish a baseline for time-to-diagnose "no audio" issues and measure whether Configure Pro is reducing reliance on WebUIs and NVX Director for troubleshooting

##### Acceptance Criteria:
- **Scenario:** Product team reviews troubleshooting telemetry after Phase A launch
- **Given:** Signal tracing and live monitoring have shipped with instrumentation in place
- **When:** The product team reviews troubleshooting usage data
- **Then:** The data includes: count and duration of signal tracing sessions initiated; frequency of external tool launches (WebUI, NVX Director) during a Configure Pro session; and the rate at which signal breaks are identified via tracing vs. manual investigation — all queryable per session and per time period

---

## Epic 5: Live Meters & Signal Presence

*Real-time signal metering on canvas connections to confirm what is actually active during live operation, and guided signal-break detection.*

---

### NEXT — Phase B

---

#### User Story B-11
- **Summary:** See live meters and device status directly on canvas nodes

##### Use Case:
- **As an** installer verifying a live system during commissioning
- **I want to** see real-time signal meters and an online/offline status indicator on each device node
- **so that** I can confirm what is actually active without opening a separate device interface

##### Acceptance Criteria:
- **Scenario:** Installer checks signal presence on a live system
- **Given:** I am connected to a live control processor
- **and Given:** I have a system open on the canvas
- **When:** I highlight any signal wire on the canvas during active signal flow
- **Then:** I see a live signal meter and a clear online/offline status indicator that updates in near real-time

---

#### User Story B-13
- **Summary:** Follow a structured "find where signal breaks" flow to diagnose audio issues confidently

##### Use Case:
- **As an** installer troubleshooting a reported audio problem
- **I want to** follow a guided signal-tracing flow that surfaces suspicious states, mismatched capabilities, and offline devices
- **so that** I can diagnose the root cause of an audio issue without trial-and-error across multiple tools

##### Acceptance Criteria:
- **Scenario:** Installer uses the structured troubleshooting flow to find a broken signal
- **Given:** I have a live system open with a reported "no audio" condition
- **and Given:** I initiate the troubleshooting flow from the affected destination device
- **When:** The system traces the signal path backward from the destination
- **Then:** The flow highlights the exact point where the signal breaks — a muted device, a zero-gain DSP block, a missing route, or an offline device — and surfaces it as a flagged issue with context about why the signal failed


---

## Epic 6: Advanced Troubleshooting

*Structured diagnostic flows, sequential DSP path inspection, proactive error surfacing*

---

### LATER — Phase C

---
#### User Story C-14
- **Summary:** View the sequential DSP blocks for any signal path and edit any block inline

##### Use Case:
- **As an** installer troubleshooting or tuning a source-to-destination signal path
- **I want to** see all DSP blocks applied to a selected signal path in sequence and be able to open and edit any block directly from that view
- **so that** I can understand and adjust the full DSP chain for a path without navigating into each device individually

##### Acceptance Criteria:
- **Scenario:** Installer selects a signal path and edits a DSP block from the sequential view
- **Given:** I have a system open with a routed source-to-destination signal path
- **and Given:** One or more DSP blocks are applied along that path
- **When:** I select the signal path and open the Dynamic Sequential DSP widget
- **Then:** All DSP blocks applied to that path are displayed in order from source to destination, and I can select any individual block to open its edit view and make changes without leaving the widget
---

#### User Story C-15
- **Summary:** Surface error states and suspicious device conditions proactively on the canvas

##### Use Case:
- **As an** installer doing a final system check before handoff
- **I want to** see devices with suspicious states — mismatched capabilities, offline status, or unexpected signal conditions — flagged directly on the canvas
- **so that** I can catch and resolve issues before the client notices them

##### Acceptance Criteria:
- **Scenario:** Canvas flags a device with a mismatched capability during system review
- **Given:** I have a live system open on the canvas
- **and Given:** One or more devices have a state inconsistency (e.g., an offline device that should be active, a capability mismatch in a route)
- **When:** I view the canvas
- **Then:** Affected device nodes display a clear error or warning indicator, and I can select a flagged node to see a plain-language description of the issue

---

## Epic 7: Inline DSP Controls

*Quick-access gain, mute, and delay adjustments directly on canvas device nodes without leaving the schematic view.*

---

### NOW — Phase A

---

#### User Story A-16
- **Summary:** Adjust gain or mute inline on a device node

##### Use Case:
- **As an** installer tuning audio during a live commissioning session
- **I want to** adjust gain or toggle mute directly on a device node on the canvas
- **so that** I can make and verify DSP corrections immediately without context-switching to a device WebUI

##### Acceptance Criteria:
- **Scenario:** Installer adjusts gain on a device directly from the canvas
- **Given:** I have a live system open on the canvas
- **and Given:** A device node is selected and its inline DSP controls are visible
- **When:** I adjust the gain slider or toggle the mute control on the node
- **Then:** The change is applied to the live device in real time and the signal meter on the node reflects the updated state

---

#### User Story A-30
- **Summary:** Instrument DSP interactions to measure whether Configure Pro is replacing external DSP tools

##### Use Case:
- **As a** product manager tracking DSP workflow adoption in Configure Pro
- **I want to** capture telemetry on DSP adjustments made within Configure Pro versus sessions where users launch external DSP tools
- **so that** I can establish a baseline for DSP task completion in-product and measure reduction in external tool dependency over time

##### Acceptance Criteria:
- **Scenario:** Product team reviews DSP usage telemetry after Phase A launch
- **Given:** Inline DSP controls have shipped with instrumentation in place
- **When:** The product team reviews DSP telemetry
- **Then:** The data includes: count of DSP adjustments (gain, mute, delay) made per session in Configure Pro; frequency of external DSP tool launches during a Configure Pro session; and time-on-task for inline DSP adjustments — all queryable per device type and per time period

---

## Epic 8: Device-Level DSP Configuration

*Deep per-device audio dashboards and graphical DSP block editing for power users and complex systems.*

---

### LATER — Phase C

---

#### User Story C-17
- **Summary:** Open a device-level dashboard with a focused audio view for deep per-device configuration

##### Use Case:
- **As an** installer fine-tuning a complex audio system
- **I want to** open a dedicated device-level dashboard from a canvas node that shows all device settings in a single, no-scroll view
- **so that** I can configure a device thoroughly without hunting across multiple tabs or panels

##### Acceptance Criteria:
- **Scenario:** Installer opens device dashboard from a canvas node
- **Given:** I have a system open on the canvas with a DSP-capable device node
- **and Given:** I double-click on the device node
- **When:** The device dashboard opens
- **Then:** I see all relevant audio-centric device settings — inputs, outputs, gain, mute, delay, routing — in a single, focused view without needing to scroll to access any primary control

---

#### User Story C-18
- **Summary:** Edit DSP blocks graphically (EQ, mixers, internal matrices) for advanced tuning

##### Use Case:
- **As an** installer tuning a complex DSP chain
- **I want to** open a graphical editor for DSP blocks such as parametric EQ, mixers, and internal matrices
- **so that** I can make precise audio adjustments visually without switching to a separate DSP tool

##### Acceptance Criteria:
- **Scenario:** Installer opens a graphical EQ editor from a device node
- **Given:** I have a DSP-capable device node open in the device-level view
- **and Given:** The device has a parametric EQ block in its DSP chain
- **When:** I select the EQ block
- **Then:** A graphical EQ editor opens showing the frequency curve, band handles I can drag to adjust, and numerical fields for precise entry — and any changes I make are applied to the live device in real time

---

## Epic 9: Device Discovery & Representation

*How devices are found, displayed, and differentiated — including static analog devices and placeholder vs. physical device clarity.*

---

### NOW — Phase A

---

#### User Story A-31
- **Summary:** Instrument device panel usage to measure how installers are adding devices to the canvas

##### Use Case:
- **As a** product manager tracking device workflow adoption in Configure Pro
- **I want to** capture telemetry on how devices are added to the canvas — drag-drop from panel, auto-discovery, or manual entry — and how often placeholder nodes are used vs. discovered physical devices
- **so that** I can measure whether ≥80% of systems are being started via drag-drop from the panel and identify friction points in the device addition workflow

##### Acceptance Criteria:
- **Scenario:** Product team reviews device addition telemetry after Phase A launch
- **Given:** The device panel and canvas have shipped with instrumentation in place
- **When:** The product team reviews device usage data
- **Then:** The data includes: count of devices added via drag-drop vs. other methods; ratio of placeholder nodes to discovered physical device nodes per system; and frequency of placeholder-to-physical association events — all queryable per system and per time period

---

### LATER — Phase C

---

#### User Story C-19
- **Summary:** Clearly distinguish discovered (physical) devices from placeholder devices on the canvas

##### Use Case:
- **As an** installer working with a mix of live and pre-configured placeholder devices
- **I want to** immediately see which nodes represent real discovered hardware and which are placeholders
- **so that** I don't accidentally configure a placeholder as if it were a live device and waste time on site

##### Acceptance Criteria:
- **Scenario:** Canvas shows a mix of discovered and placeholder devices
- **Given:** I have a system open that contains both discovered live devices and placeholder/generic device nodes
- **When:** I view the canvas
- **Then:** Discovered devices and placeholder devices are visually differentiated through distinct iconography or labeling, making it unambiguous which nodes represent real hardware

---

#### User Story C-20
- **Summary:** Represent analog amplifiers and passive speakers as static nodes so they can participate in routing and visualization

##### Use Case:
- **As an** installer designing a system that includes analog amplifiers and passive speakers
- **I want to** place static nodes for those devices on the canvas and include them in signal routing
- **so that** the full system — including non-networked, non-configurable devices — is visible and traceable in a single schematic

##### Acceptance Criteria:
- **Scenario:** Installer adds an analog amplifier and passive speaker to the canvas and routes signal through them
- **Given:** I have a system open on the canvas
- **and Given:** Analog amplifier and passive speaker node types are available in the devices/objects panel
- **When:** I drag an analog amplifier and a passive speaker onto the canvas and connect them in the signal path
- **Then:** Both devices appear as static nodes with appropriate inputs and outputs, signal connections can be drawn to and from them, and they are visually distinguishable from configurable NAX device nodes

---

## Epic 10: Deployment & Live System State

*Deploying configuration to live hardware, confirming persistence, and maintaining trust in what is running.*

---

### NEXT — Phase B

---

#### User Story B-23
- **Summary:** See a "what is live right now" view to confirm deployed configuration

##### Use Case:
- **As an** installer wrapping up a commissioning job
- **I want to** see a clear view of which configuration is currently running on the live system
- **so that** I can hand the system off to the client with confidence that what I see in Configure Pro matches what the system is actually doing

##### Acceptance Criteria:
- **Scenario:** Installer confirms live system state before client handoff
- **Given:** I have finished configuring a system and it is connected to a live processor
- **and Given:** I navigate to the live state view
- **When:** I review the current system state
- **Then:** The view shows all active routes, device states, and applied DSP settings as they exist on the hardware at that moment, with a clear distinction between what is live versus what may be a pending change

---

#### User Story B-24
- **Summary:** Confirm that configuration will persist on devices after disconnecting

##### Use Case:
- **As an** installer preparing to leave a job site
- **I want to** deploy my configuration and receive confirmation that it is stored on the devices themselves
- **so that** the system continues to operate correctly after I disconnect Configure Pro

##### Acceptance Criteria:
- **Scenario:** Installer deploys configuration and disconnects
- **Given:** I have a fully configured system connected to a live processor
- **and Given:** I initiate a deployment action
- **When:** The deployment completes
- **Then:** Configure Pro confirms that the configuration has been written to and persisted on the devices, and a subsequent reconnection shows the same configuration still active on the hardware

---

#### User Story B-32
- **Summary:** Instrument deployment events to measure first-time success rate and catch data loss incidents

##### Use Case:
- **As a** product manager tracking deployment reliability in Configure Pro
- **I want to** capture telemetry on every deployment attempt — including outcomes, failure reasons, and any data loss events during offline-to-online transitions
- **so that** I can measure first-time deployment success rate and validate that the target of zero data loss incidents is being met

##### Acceptance Criteria:
- **Scenario:** Product team reviews deployment reliability telemetry after Phase B launch
- **Given:** Deployment workflows have shipped with instrumentation in place
- **When:** The product team reviews deployment telemetry
- **Then:** The data includes: count of deployment attempts vs. successful first-time deployments; categorized failure reasons (compatibility mismatch, network error, validation failure, etc.); count of data loss incidents during offline-to-online transitions; and time from deployment initiation to confirmation — all queryable per system and per time period

---

## Epic 11: Performance & Scale

*Ensuring the canvas and tooling remain fast and trustworthy as system complexity grows.*

---

### NOW — Phase A

---

#### User Story A-33
- **Summary:** Instrument canvas performance to detect latency and degradation thresholds before users do

##### Use Case:
- **As a** product manager tracking Configure Pro performance
- **I want to** capture telemetry on canvas interaction latency — including pan, zoom, node selection, and connection creation — across varying system sizes
- **so that** I can identify where the canvas begins to degrade, validate the <200ms interaction target, and proactively surface performance issues before they erode installer trust

##### Acceptance Criteria:
- **Scenario:** Product team reviews canvas performance telemetry across system sizes
- **Given:** The canvas has shipped with performance instrumentation in place
- **When:** The product team reviews latency data
- **Then:** The data includes: p50, p90, and p99 interaction latency for pan, zoom, node selection, and connection creation; system size (device count) at time of interaction; and frequency of interactions exceeding the 200ms threshold — all queryable by interaction type, device count, and time period

---

### LATER — Phase C

---

#### User Story C-26
- **Summary:** Work fluidly on systems with 50+ devices without canvas performance degradation

##### Use Case:
- **As an** installer commissioning a large multi-zone installation
- **I want to** pan, zoom, and interact with a canvas containing 50 or more devices without lag or rendering slowdowns
- **so that** I can work on large systems with the same fluency I have on smaller ones and don't lose trust in the tool

##### Acceptance Criteria:
- **Scenario:** Installer pans and zooms on a 50-device canvas
- **Given:** I have a system open with 50 or more device nodes on the canvas
- **and Given:** Multiple routes are defined between devices
- **When:** I pan across the canvas and zoom in and out
- **Then:** All canvas interactions — pan, zoom, node selection, connection creation — respond within 200ms with no visible frame drops or rendering artifacts

---

## Epic 12: Offline System Design & Deployment

*Full offline design capability — from pre-wire planning through device association and deployment to live hardware.*

---

### LATER — Phase D

---

#### User Story D-04
- **Summary:** Always know whether changes will affect a live system or only an offline design

##### Use Case:
- **As a** designer or installer working in Configure Pro
- **I want to** see a persistent, unambiguous indicator of whether I am in offline design mode or connected to a live system
- **so that** I never accidentally make changes I think are "just planning" that actually affect live hardware

##### Acceptance Criteria:
- **Scenario:** User switches between offline and live mode
- **Given:** I have Configure Pro open
- **and Given:** The system transitions between offline and live-connected states
- **When:** I view any screen in Configure Pro
- **Then:** A persistent visual indicator clearly shows my current mode (offline vs. live), is always visible regardless of which view or panel I am in, and updates immediately when the connection state changes

---

#### User Story D-21
- **Summary:** Design a full system offline before arriving on site

##### Use Case:
- **As a** designer preparing for a new installation
- **I want to** open Configure Pro without a processor connection and build a complete system layout using placeholder devices
- **so that** I arrive on site with a pre-built plan and can commission faster without designing from scratch under time pressure

##### Acceptance Criteria:
- **Scenario:** Designer creates a full system layout offline
- **Given:** I open Configure Pro with no network connection to a control processor
- **and Given:** The offline mode indicator is clearly visible
- **When:** I drag placeholder devices onto the canvas, connect them, and configure basic DSP settings
- **Then:** The full layout — node positions, connections, and DSP values — is saved and available for the next session, with no data loss

---

#### User Story D-22
- **Summary:** Associate discovered live devices to offline placeholder nodes during commissioning

##### Use Case:
- **As an** installer arriving on site with a pre-designed offline layout
- **I want to** connect to the live processor and map each discovered device to its corresponding placeholder node
- **so that** my pre-designed layout becomes the live configuration without having to rebuild it from scratch on site

##### Acceptance Criteria:
- **Scenario:** Installer maps discovered devices to placeholder nodes
- **Given:** I have an offline-designed system open in Configure Pro
- **and Given:** I connect to a live processor and devices are discovered
- **When:** I associate a discovered device to a placeholder node
- **Then:** The placeholder node adopts the real device's identity and capabilities, compatibility is validated (I/O and channel counts match), and any incompatibilities are surfaced as warnings before I proceed

---

#### User Story D-25
- **Summary:** Deploy an offline-designed configuration to the live system with a clear confirmation

##### Use Case:
- **As an** installer who pre-designed a system offline
- **I want to** deploy my offline configuration to the live system in a single, guided action
- **so that** I can complete commissioning quickly and be confident the live system matches my design intent

##### Acceptance Criteria:
- **Scenario:** Installer deploys offline configuration to live devices
- **Given:** I have an offline-designed system with all placeholder nodes mapped to discovered devices
- **and Given:** All compatibility validations have passed
- **When:** I initiate deployment
- **Then:** Configure Pro applies the configuration to all live devices, confirms successful deployment with a clear status message, and updates the canvas to reflect the live state — with zero data loss from my offline design

---

## Story Map Summary

| Epic | NOW (Phase A) | NEXT (Phase B) | LATER (Phases C, D) |
|---|---|---|---|
| Summary | - Deliver the primary zoomable workspace where installers and designers see, arrange, and interact with their full AV system through node-based device representation, signal connections, and room/system switching. <br>- Enable core route creation with drag-to-connect routing, constraint validation, and bidirectional sync between the canvas and routing grid. <br>- Provide signal tracing, device status widgets, and core troubleshooting instrumentation for the initial onsite commissioning experience. <br>- Give installers quick-access gain, mute, and delay adjustments directly from within the advanced device view on the canvas. | NEXT (Phase B) <br>- Build on the routing foundation with canvas labeling, port visibility controls, and schematic refinement tools for more polished system designs. <br>- Surface real-time signal metering on canvas connections to confirm what's actually active during live operation, plus guided signal-break detection.| LATER (Phases C, D) <br>- Deliver structured diagnostic flows, sequential DSP path inspection, and proactive error surfacing to speed up complex issue resolution. |
| 1. Canvas & Visual Workspace | A-01, A-02, A-03, A-27 | — | — |
| 2. Routing & Signal Flow | A-05, A-06, A-07, A-28 | — | — |
| 3. Advanced Routing & Canvas Customization | — | B-08, B-09, B-34 | — |
| 4. Basic Troubleshooting & Live Monitoring | A-10, A-12, A-29 | — | — |
| 5. Live Meters & Signal Presence | — | B-11, B-13 | — |
| 6. Advanced Troubleshooting | — | - | B-14, B-15 |
| 7. Inline DSP Controls | A-16, A-30 | — | — |
| 8. Device-Level DSP Configuration | — | — | C-17, C-18 |
| 9. Device Discovery & Representation | A-31 | — | C-19, C-20 |
| 10. Deployment & Live System State | — | B-23, B-24, B-32 | — |
| 11. Performance & Scale | A-33 | — | C-26 |
| 12. Offline System Design & Deployment | — | — | D-04, D-21, D-22, D-25 |



CHOME-118676: Epic 6: Advanced Troubleshooting
Backlog
 — Deliver structured diagnostic flows, sequential DSP path inspection, and proactive error surfacing to speed up complex issue resolution.

CHOME-118677: Epic 7: Inline DSP Controls
Backlog
 — Give installers quick-access gain, mute, and delay adjustments directly from within the advanced device view on the canvas.

CHOME-118678: Epic 8: Device-Level DSP Configuration
Backlog
 — Provide deep per-device audio dashboards and graphical DSP block editing for power users working with complex audio systems.

CHOME-118679: Epic 9: Device Discovery & Representation
Backlog
 — Define how devices are found, displayed, and differentiated — including static analog devices and clarity between placeholder vs. physical devices.

CHOME-118680: Epic 10: Deployment & Live System State
Backlog
 — Handle deploying configuration to live hardware, confirming persistence, and maintaining trust in what is actually running on the system.

CHOME-118681: Epic 11: Performance & Scale
Backlog
 — Ensure the canvas and tooling remain fast and trustworthy as system complexity and device count grow.

CHOME-118682: Epic 12: Offline System Design & Deployment
Backlog
 — Enable full offline design capability from pre-wire planning through device association and deployment to live hardware, supporting Designer Dana's workflow before arriving on site.


