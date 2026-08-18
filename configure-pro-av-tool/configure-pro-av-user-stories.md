# Initiative: Configure Pro AV Configuration Workspace

**Vision:** A unified, offline and real-time visual AV configuration workspace that replaces fragmented tooling — giving designers and installers a single environment to design, route, configure, troubleshoot, and deploy AV systems from pre-wire through final commissioning.

**Personas:**
- **Installer Ivan** — Onsite commissioning and live system work; needs real-time confidence in what he sees
- **Designer Dana** — Pre-wire planning and system architecture; needs to design before arriving on site
- **Product Team** — Internal; needs telemetry and usage data to validate outcomes and guide iteration

**Story Map Structure:** Epics run left → right as capability areas. Releases (NOW / NEXT / LATER) are the swim lanes top → bottom.

**ID Scheme:** The number is a permanent, sequential identifier assigned in the order the story was created — it never changes. The letter prefix reflects the current phase assignment (A = NOW, B = NEXT, C = LATER Phase C, D = LATER Phase D) and is the only thing that changes if a story is reprioritized.

---

## Story Map Summary

| Epic | NOW (Phase A) | NEXT (Phase B) | LATER (Phases C, D) |
|---|---|---|---|
| Summary | + Deliver the primary zoomable workspace where installers and designers see, arrange, and interact with their full AV system through node-based device representation, signal connections, and room/system switching. <br>+ View and create routes in a matrix-based routing matrix for high-density channel routing. <br>+ Enable core route creation with drag-to-connect routing, constraint validation, and bidirectional sync between the canvas and routing matrix. <br>+ Provide signal tracing, device status widgets, and core troubleshooting instrumentation for the initial onsite commissioning experience. <br>+ Give installers quick-access gain, mute, and delay adjustments directly from within the advanced device view on the canvas. | + Build on the routing foundation with canvas labeling, port visibility controls, and schematic refinement tools for more polished system designs. <br>+ Surface real-time signal metering on canvas connections to confirm what's actually active during live operation, plus guided signal-break detection.| + Deliver structured diagnostic flows, sequential DSP path inspection, and proactive error surfacing to speed up complex issue resolution. |
|---|---|---|---|
| **1. Canvas & Visual Workspace** | **A-01:** Render live devices as visual nodes so installers can see the full system at a glance<br><br>**A-02:** Persist canvas layout across sessions so context is never lost<br><br>**A-03:** Switch between rooms to zoom in on a set of devices<br><br>**A-37:** Show a short labeled stub for wires that lead to off-canvas devices so connections stay legible<br><br>**A-27:** Instrument canvas workspace usage to measure whether the canvas is becoming the primary configuration surface<br><br>**A-35:** Snap devices and rooms to a grid while dragging so the canvas stays cleanly aligned | — | — |
| **2. Routing & Signal Flow** | **A-05:** Create a route by connecting device nodes on the canvas<br><br>**A-06:** See canvas and routing matrix stay in sync so routing can be trusted<br><br>**A-07:** Prevent invalid routes from being created to avoid bad configurations<br><br>**A-28:** Instrument routing interactions to measure drag-drop success rate and routing error frequency<br><br>**A-34:** View and create routes in a matrix-based routing matrix for high-density channel routing | — | **C-40:** Define fixed AoIP and AVoIP routes on hardware that supports them |
| **3. Advanced Routing & Canvas Customization** | — | **B-08:** Add a text tag to label any source or destination point on the canvas<br><br>**B-09:** Customize which inputs and outputs are visible on a device node to reduce canvas clutter<br><br>**B-34:** Filter the canvas and Matrix by signal type from a consistent legend so only relevant ports and wires are shown<br><br>**B-36:** Resize a device node automatically when its ports are hidden so no empty space remains<br><br>**B-38:** Hide a source row or destination column directly from the Matrix view, synced to the Routing Map | — |
| **4. Basic Troubleshooting & Live Monitoring** | **A-10:** Trace a signal path end-to-end to quickly find where it breaks<br><br>**A-12:** See a real-time status widget for each NAX device to monitor crucial device health at a glance<br><br>**A-13:** Enter troubleshooting mode to establish the designed AoIP/AVoIP path on the hardware and find where signal breaks<br><br>**A-29:** Instrument troubleshooting workflows to measure time-to-diagnosis and external tool switching | — | — |
| **5. Live Meters & Signal Presence** | — | **B-11:** See live meters and device status directly on canvas nodes | — |
| **6. Advanced Troubleshooting** | — | — | **C-14:** View the sequential DSP blocks for any signal path and edit any block inline<br><br>**C-15:** Surface error states and suspicious device conditions proactively on the canvas |
| **7. Inline DSP Controls** | — | **B-16:** Adjust gain or mute inline on a device node<br><br>**B-30:** Instrument DSP interactions to measure whether Configure Pro is replacing external DSP tools | — |
| **8. Device-Level DSP Configuration** | — | — | **C-17:** Open a device-level dashboard with a focused audio view for deep per-device configuration<br><br>**C-18:** Edit DSP blocks graphically (EQ, mixers, internal matrices) for advanced tuning |
| **9. Device Discovery & Representation** | **A-31:** Instrument device panel usage to measure how installers are adding devices to the canvas | — | **C-19:** Clearly distinguish discovered (physical) devices from placeholder devices on the canvas<br><br>**C-20:** Represent analog amplifiers and passive speakers as static nodes so they can participate in routing and visualization |
| **10. Deployment & Live System State** | — | **B-23:** See a "what is live right now" view to confirm deployed configuration<br><br>**B-24:** Confirm that configuration will persist on devices after disconnecting<br><br>**B-32:** Instrument deployment events to measure first-time success rate and catch data loss incidents | — |
| **11. Performance & Scale** | **A-33:** Instrument canvas performance to detect latency and degradation thresholds before users do | — | **C-26:** Work fluidly on systems with 50+ devices without canvas performance degradation |
| **12. Offline System Design & Deployment** | — | — | **D-04:** Always know whether changes will affect a live system or only an offline design<br><br>**D-21:** Design a full system offline before arriving on site<br><br>**D-22:** Associate discovered live devices to offline placeholder nodes during commissioning<br><br>**D-25:** Deploy an offline-designed configuration to the live system with a clear confirmation<br><br>**D-39:** Open a system on any machine and find the canvas arrangement intact |

---

## Epic 1: Canvas & Visual Workspace

*The primary zoomable workspace where installers and designers see, arrange, and interact with their full system.*

---

### NOW — Phase A

---

#### User Story A-01
- **Summary:** Render live devices as visual nodes so installers can see the full system at a glance
- **Jira:** CHOME-118684

##### Use Case:
- **As an** installer commissioning a live system
- **I want to** see all routable devices rendered as nodes on a canvas
- **so that** I can create the routes based on how the system is wired without mentally reconstructing it from a text-based list

##### Acceptance Criteria:
**Scenario:** Installer opens a system with devices that have been added or get added and are represented visually
- **Given:** I am connected to a control processor with discovered/added AV devices
- **and Given:** I have opened the system in Configure Pro
- **and Given:** The Routing tab is selected
- **and Given:** The Whole System, a Room Group (floor), or a Room is selected
- **and Given:** The canvas is the active workspace
- **When:** The canvas loads
- **Then:** All routable devices in the current scope appear as a node showing its device name, model, online/offline status, and its input and output AV ports

**Scenario:** Existing routes are drawn on load
- **Given:** The system has routes already configured on the hardware
- **and Given:** The canvas has loaded with all routable devices rendered as nodes
- **When:** The canvas finishes rendering
- **Then:** Each existing route is drawn as a wire from the source output port to the destination input port, color-coded by signal type

**Scenario:** Canvas scope follows the tree selection
- **Given:** I have a multi-room system with Whole System, Room Group (floor), and Room nodes in the tree
- **and Given:** The Routing Map is the active workspace
- **When:** I select Whole System, a Room Group, or a single Room
- **Then:** Only the devices belonging to that scope are rendered as active nodes on the canvas

**Scenario:** First open frames the whole system in view
- **Given:** I am opening a system on the canvas for the first time, with no saved layout
- **and Given:** The system contains more devices than fit at 100% zoom
- **When:** The canvas loads
- **Then:** The view auto-fits so that every node in the current scope is visible on screen without manual pan or zoom
- **And** The devices are not overlapping

**Scenario:** Ports reflect real device capability
- **Given:** I have devices with differing I/O counts and signal types (HDMI, AoIP, AES67, AVoIP, analog, Toslink, S/PDIF, RCA, USB, Bluetooth)
- **and Given:** The canvas has loaded
- **When:** I inspect a device node
- **Then:** The node shows the actual number inputs and outputs that device exposes and the port types are labeled

**Scenario:** Each physical connector type is modeled as its own signal type
- **Given:** I have a device that exposes several kinds of digital audio connector on the same node — for example Toslink, S/PDIF, and USB
- **and Given:** Connector types that cannot be interconnected are modeled as distinct signal types rather than grouped under a single generic "digital audio" type
- **When:** The node renders
- **Then:** Each port carries its own signal type with its own color, that color is used consistently for the port, its wires, and its legend entry, and a port of one connector type is never offered as a valid drop target for another (see A-07)

**Scenario:** A device that comes online or goes offline updates in place
- **Given:** I have the canvas open on a live system
- **When:** A rendered device changes connection state on the processor
- **Then:** That node's status indicator updates to reflect the new state without requiring me to reload the canvas

**Scenario:** Canvas is usable at the minimum supported viewport
- **Given:** I am running Configure Pro on a laptop at the minimum supported resolution of [TBD]
- **and Given:** I have a system open on the Routing Map
- **When:** The canvas loads
- **Then:** The full canvas workspace, tree panel, and zoom controls are usable without horizontal page scrolling or clipped controls

**Scenario:** Canvas renders a Phase A-scale system
- **Given:** I have a system containing up to 50 routable devices
- **When:** I open the Routing Map at Whole System scope
- **Then:** All 50 device nodes and their existing routes render, with no node or wire omitted or truncated (interaction performance at this scale is covered by C-26)

**Scenario:** System with no devices yet
- **Given:** I have opened a system that has no discovered or added devices
- **and Given:** The Routing Map is the active workspace
- **When:** The canvas loads
- **Then:** An empty canvas is shown rather than a blank screen

##### Out of Scope:
- Off-canvas wire stubs with Room / Device labels - covered by **A-37** (CHOME-123543)
- Interaction performance targets at 50+ devices - covered by CHOME-118714
- Layout persistence across sessions - covered by CHOME-118685

---

#### User Story A-02
- **Summary:** Persist canvas layout across sessions so context is never lost

##### Use Case:
- **As an** installer who works across multiple visits to a job site or multiple sites
- **I want to** return to Configure Pro and find my canvas layout exactly as I left it
- **so that** I don't waste time re-arranging nodes and re-establishing my working context every session

##### Acceptance Criteria:
**Scenario:** Layout restores after closing and reopening the system
- **Given:** I have a system open with nodes positioned, zoom set, and groupings defined on the canvas
- **When:** I close Configure Pro and reopen the same system on the same machine
- **Then:** The canvas restores to the exact same node positions, zoom level, pan position, and groupings I had previously, with no manual reconstruction required

**Scenario:** Layout is saved without an explicit save action
- **Given:** I have the Routing Map open
- **When:** I move a node, change zoom, or pan the canvas
- **Then:** The new layout state is persisted automatically, with no Save button or prompt required

**Scenario:** Layout survives navigating away within a session
- **Given:** I have a canvas layout arranged on the Routing Map
- **When:** I navigate to another tab (Devices, Scenes) and return to Routing
- **Then:** The canvas is restored to the layout and viewport I left, not reset to the default fit

**Scenario:** A newly discovered device does not disturb the saved layout
- **Given:** I have a saved canvas layout for a system
- **and Given:** A new device is discovered or added since my last session
- **When:** I reopen the system
- **Then:** All previously positioned nodes remain exactly where I placed them, and the new device is placed in an unoccupied position where I can see it

**Scenario:** A removed device leaves the rest of the layout intact
- **Given:** I have a saved canvas layout for a system
- **and Given:** A device that was on the canvas is no longer present on the processor
- **When:** I reopen the system
- **Then:** That node is removed from the canvas and every remaining node keeps its saved position, with no error state or re-arrangement

**Scenario:** Layout cannot be lost by an interrupted session
- **Given:** I have arranged the canvas and made no other changes
- **When:** Configure Pro closes unexpectedly or the connection to the processor drops
- **Then:** On the next open, the last successfully persisted layout is restored rather than an empty or partial layout

## Can we cover these scenarios easily in Phase-A MVP? If not, can we achieve these in a later phase?
**Scenario:** Each scope keeps its own view state
- **Given:** I have arranged and zoomed the canvas differently at Whole System, Room Group, and individual Room scopes
- **When:** I switch away from a scope and later return to it
- **Then:** That scope's own node positions, zoom, and pan are restored independently of the other scopes

**Scenario:** Installer resets a layout back to the default arrangement
- **Given:** I have a canvas layout I no longer want
- **When:** I choose the reset-layout action and confirm
- **Then:** The canvas returns to the default auto-arranged, auto-fit view for that scope, and that reset becomes the new saved layout

**Scenario:** Layout is stored per machine, not carried between machines
#### Does this need to wait until Phase-D? What does it mean to change the place where the layout is persisted? Are the choices are locally, cloud, or control processor?
- **Given:** I have a saved canvas layout for a system on my primary machine
- **and Given:** Phase A stores layout locally on the machine running Configure Pro
- **When:** I open the same system from a different machine that has no saved layout for it
- **Then:** The canvas opens at the default auto-arranged, auto-fit view rather than showing an error or an empty canvas — carrying layout between machines is covered by D-39


##### Out of Scope:
- Layout travelling with the system between machines or from offline design to site — covered by **D-39**
- Persistence of hidden-port state and signal-type filter selection — those features are Phase B (**B-09**, **B-34**, **B-38**) and each will carry its own persistence criteria

---

#### User Story A-03
- **Summary:** Switch between rooms to zoom in on a set of devices
- **Jira:** CHOME-118686

##### Use Case:
- **As an** installer managing a multi-room installation
- **I want to** switch between room/system views in Configure Pro
- **so that** I can focus on one room's devices and routes at a time without the rest of the system in the way

##### Acceptance Criteria:
**Scenario:** Installer switches from one room to another
- **Given:** I have multiple rooms or systems configured in Configure Pro
- **and Given:** I am actively working in Room A with routes defined
- **When:** I switch to Room B
- **Then:** Room B becomes the focus on the canvas and routing context, only Room B's devices are rendered as nodes, and connections that leave the room are shown as labeled stubs (**A-37** / CHOME-123543)

**Scenario:** Returning to a wider scope
- **Given:** I am scoped to Room B
- **When:** I select the Room Group or Whole System
- **Then:** The devices of that wider scope are rendered and previously stubbed connections are drawn as full wires between their real nodes

**Scenario:** Framing the room on entry
- **Given:** I switch to a room I have not arranged yet
- **When:** The canvas loads
- **Then:** The view auto-fits that room's devices so they are all visible without manual pan or zoom (per **A-01** / CHOME-118684), and a room I have arranged restores its saved view instead (per **A-02** / CHOME-118685)

---

#### User Story A-37
- **Summary:** Show a short labeled stub for wires that lead to off-canvas devices so connections stay legible
- **Jira:** CHOME-123543

##### Use Case:
- **As an** installer zoomed or panned into part of a large system
- **I want to** see wires that leave the visible area collapse into a short stub labeled with the Room/Device they connect to
- **so that** I can understand where a connection goes without following a long line into empty space or losing track of the destination

##### Acceptance Criteria:
**Scenario:** Installer pans so that a connected device moves off-screen
- **Given:** I have a routed system open on the canvas
- **and Given:** A wire connects a visible device to a device whose node is currently outside the viewport
- **When:** The canvas renders at the current pan/zoom
- **Then:** The wire is drawn as a short stub from the on-screen port ending in a label showing the off-screen device's Room and Device name, and the stub remains selectable to trace the path the same as a full wire

---

#### User Story A-27
- **Summary:** Instrument canvas workspace usage to measure whether the canvas is becoming the primary configuration surface

##### Use Case:
- **As a** product manager tracking Configure Pro adoption
- **I want to** capture telemetry on how users interact with the canvas — including session frequency, active time on canvas, and routing interactions initiated from the canvas versus other surfaces
- **so that** I can measure whether the canvas is achieving its target of ≥70% of routing interactions and validate that users are not defaulting back to legacy tools

##### Acceptance Criteria:
**Scenario:** Product team reviews canvas adoption metrics after Phase A launch
- **Given:** The canvas workspace has shipped and is in active use
- **and Given:** Telemetry instrumentation is in place for the canvas surface
- **When:** The product team reviews usage data
- **Then:** The data includes: percentage of routing interactions initiated on the canvas vs. the routing grid vs. external tools; canvas session frequency per user; and layout persistence success rate — all queryable per system and per time period

---

#### User Story A-35
- **Summary:** Snap devices and rooms to a grid while dragging so the canvas stays cleanly aligned

##### Use Case:
- **As an** installer arranging device nodes and room groups on the canvas
- **I want to** have both device nodes and room groups snap to a shared alignment grid as I drag them
- **so that** I can line everything up neatly without fiddling for pixel-perfect placement

##### Acceptance Criteria:
**Scenario:** Installer drags a device node across the canvas
- **Given:** I have a system open on the canvas with at least one device node
- **and Given:** The canvas alignment grid is active
- **When:** I drag a device node and release it
- **Then:** The node's position snaps to the nearest grid increment on both axes, aligning with other nodes placed on the same grid

**Scenario:** Installer drags a room group across the canvas
- **Given:** I have a system on the canvas with a room group containing one or more devices
- **and Given:** The canvas alignment grid is active
- **When:** I drag the room group by its label
- **Then:** The room group snaps to the same grid increments as devices, the devices inside retain their relative positions, and the group aligns with other rooms and nodes on the grid

**Scenario:** Installer drags a room group toward another room
- **Given:** I have a system on the canvas with two or more room groups
- **and Given:** I am dragging one room group
- **When:** The dragged room's bounds would overlap another room's bounds
- **Then:** The move is prevented at that position so the two rooms never overlap, and the room can still be moved freely into any non-overlapping position

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
**Scenario:** Installer creates a route between two device nodes
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
**Scenario:** Installer creates a route in the grid and switches to canvas
- **Given:** I have a system open with multiple devices on the canvas
- **and Given:** I switch to the routing grid view
- **When:** I create or modify a route in the routing grid
- **Then:** The connection appears on the canvas immediately when I return to canvas view, with zero inconsistency between the two representations

---

#### User Story A-07
- **Summary:** Prevent invalid routes from being created to avoid bad configurations
- **Jira:** CHOME-118692

##### Use Case:
- **As an** installer wiring up device connections
- **I want to** only see valid connection options when I begin dragging from a device port
- **so that** I cannot accidentally deploy an incompatible configuration that breaks the system

##### Acceptance Criteria:
**Scenario:** Installer attempts to connect incompatible device ports
- **Given:** I have devices on the canvas with different I/O capabilities
- **and Given:** I begin dragging from an output port
- **When:** I hover over an incompatible input port on another device
- **Then:** The incompatible port is visually indicated as invalid, the connection is not created, and only compatible ports remain highlighted as valid drop targets

**Scenario:** Installer views a non-routeable port on a device node
- **Given:** I have a device on the canvas that exposes a Bluetooth, AoIP, or AVoIP input or output port
- **and Given:** Bluetooth, AoIP, and AVoIP are non-routeable signal types in this release — Bluetooth because it is a point-to-point pairing rather than a matrix path, and AoIP/AVoIP because their streams are established by the platform rather than drawn by hand
- **When:** The device node renders
- **Then:** The port is still shown on the node for completeness but is rendered greyed-out (filled grey with a muted label) to indicate it cannot participate in routing

**Scenario:** Installer attempts to route to or from a non-routeable port
- **Given:** I have a device with a Bluetooth, AoIP, or AVoIP port on the canvas, in the Matrix, or in the device routing panel
- **When:** I try to drag a wire from that output, drop a wire onto that input, select its Matrix intersection, or pick it from a connection dropdown
- **Then:** No route is created — a non-routeable port is never offered as a valid connection option in any view, and its greyed-out state signals this consistently across the canvas and Matrix

**Scenario:** Installer needs to understand why an AoIP or AVoIP path cannot be drawn
- **Given:** I can see AoIP or AVoIP ports greyed-out on a device node
- **and Given:** Those streams may still be carrying signal on the hardware
- **When:** I hover or select one of those ports
- **Then:** I am told the port is not routeable in this release and pointed to troubleshooting mode (A-13) as the way to establish and verify an AoIP/AVoIP path end-to-end

##### Out of Scope:
- Making AoIP and AVoIP ports hand-routeable on the canvas and in the Matrix — this depends on a platform change to expose stream creation as a routing operation, and is deferred beyond Phase B. Fixed AoIP/AVoIP routes for specific hardware are captured in **C-40**.

---

#### User Story A-28
- **Summary:** Instrument routing interactions to measure drag-drop success rate and routing error frequency

##### Use Case:
- **As a** product manager tracking routing quality in Configure Pro
- **I want to** capture telemetry on routing attempts, completions, failures, and invalid connection attempts
- **so that** I can measure whether visual routing is achieving a near-100% drag-drop success rate and whether routing errors are declining versus the pre-canvas baseline

##### Acceptance Criteria:
**Scenario:** Product team reviews routing quality metrics after Phase A launch
- **Given:** Canvas routing and grid routing have shipped with instrumentation in place
- **When:** The product team reviews routing telemetry
- **Then:** The data includes: total routing attempts vs. successful completions (drag-drop success rate); count of invalid connection attempts blocked by constraint enforcement; routing changes made via canvas vs. grid (split by surface); and canvas-to-grid sync error rate — all queryable per system and per time period

---

#### User Story A-34
- **Summary:** View and create routes in a matrix-based routing grid for high-density channel routing

##### Use Case:
- **As an** installer configuring a system with many channels across multiple devices
- **I want to** open a routing grid that displays all available sources and destinations in a matrix format and create routes by selecting intersections
- **so that** I can efficiently build and audit large-scale routing without relying solely on the canvas, which becomes dense at high channel counts

##### Acceptance Criteria:
**Scenario:** Installer opens the routing grid and creates routes via matrix intersections
- **Given:** I have a system open in Configure Pro with multiple routable devices
- **And Given:** The routing grid view is available as an alternate view to the canvas
- **And Given:** The grid displays sources (devices and channels) on one axis and destinations on the other
- **When:** I select an intersection in the grid to create a route
- **Then:** The route is created, the intersection is visually marked as an active route, and the route is immediately reflected on the canvas view when I switch back

---

### LATER — Phase C

---

#### User Story C-40
- **Summary:** Define fixed AoIP and AVoIP routes on hardware that supports them, so network streams appear as real paths on the canvas
- **Jira:** CHOME-123541

##### Use Case:
- **As an** installer commissioning a system whose audio and video move over the network
- **I want to** create a persistent AoIP or AVoIP route between two devices that support it and see it on the canvas like any other connection
- **so that** the network legs of the system are part of the schematic I design and hand off, rather than something I can only observe in troubleshooting mode

##### Acceptance Criteria:
**Scenario:** Installer creates a fixed AoIP route between two capable devices
- **Given:** I have two devices on the canvas whose AoIP ports support fixed, persistent stream assignment
- **and Given:** The platform exposes stream creation as a routing operation (the dependency that keeps this out of Phase A and B — see A-07)
- **When:** I connect the AoIP output of one device to the AoIP input of the other
- **Then:** A persistent route is created on the hardware, drawn on the canvas as a normal wire in the AoIP color, reflected in the Matrix, and retained after I disconnect

**Scenario:** Ports that do not support fixed routing stay non-routeable
- **Given:** I have a mix of devices, only some of which support fixed AoIP/AVoIP route assignment
- **When:** I begin dragging from a fixed-routing-capable AoIP output
- **Then:** Only AoIP inputs on devices that also support fixed routing are offered as valid targets, and ports on devices without that support remain greyed-out and non-routeable exactly as in A-07

##### Open Questions:
- Which hardware supports fixed AoIP/AVoIP route assignment is **TBD** — the device list and the platform capability that exposes it must be confirmed before this story can be estimated.

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
**Scenario:** Installer adds a text tag to a source output on the canvas
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
**Scenario:** Installer marks individual ports and hides them from a device node
- **Given:** I have a device node on the canvas with more inputs and outputs than are used in the current system
- **and Given:** I hover a port and click it to mark it for hiding, which shows a red "X" on that port
- **and Given:** An eye-with-slash (hide) icon appears on the device header once at least one port is marked, and clicking a marked port again unmarks it
- **When:** I finish marking the ports I want to remove and select the eye-with-slash (hide) icon
- **Then:** The marked ports are hidden from the node on the canvas, the node resizes accordingly, and no existing routes to still-visible ports are affected

**Scenario:** Installer unhides ports and can re-hide or refine the selection
- **Given:** I have a device node with one or more individually hidden ports
- **and Given:** An eye (unhide) icon is shown on the device header
- **When:** I select the eye (unhide) icon
- **Then:** All hidden ports reappear on the node in the marked-for-hiding state — highlighted red with the red "X" — the eye icon switches back to the eye-with-slash (hide) icon, and from there I can select the hide icon to re-hide the same ports or click individual ports to unmark the ones I want to keep visible; no routes are changed by unhiding

**Scenario:** Ports hidden in the Routing Map are excluded from the Matrix view
- **Given:** I have hidden one or more ports on a device in the Routing Map
- **and Given:** I switch to the Matrix (routing grid) view
- **When:** The Matrix renders
- **Then:** The hidden output ports do not appear as rows and the hidden input ports do not appear as columns, matching exactly what is visible on the canvas

---

#### User Story B-34
- **Summary:** Filter the canvas and Matrix by signal type from a consistent legend so only relevant ports and wires are shown
- **Jira:** CHOME-120563

##### Use Case:
- **As an** installer working on a mixed-signal system (HDMI, AoIP, analog, Bluetooth, etc.)
- **I want to** toggle signal types on and off directly from an interactive legend/key that looks and behaves the same in both the Routing Map and the Matrix
- **so that** I can focus on one signal domain at a time — for example showing only HDMI ports and wires — without visual noise from unrelated signal types

##### Acceptance Criteria:
**Scenario:** Installer opens the canvas with a mixed-signal system
- **Given:** I have a system open on the canvas with devices spanning multiple signal types
- **and Given:** The legend is displayed as an interactive filter
- **When:** The canvas loads
- **Then:** Every signal type present in the system is shown as selected (visible) by default, so I see the full system before narrowing it down

**Scenario:** Installer unselects a signal type to hide it
- **Given:** All signal types are currently selected on the canvas
- **When:** I click a signal type in the legend (e.g., AoIP) to unselect it
- **Then:** All ports and wires of that signal type are hidden from the canvas, the remaining signal types stay visible, and the legend clearly indicates which types are currently selected vs. hidden

**Scenario:** Installer isolates a single signal type
- **Given:** I have unselected several signal types
- **When:** Only one signal type (e.g., HDMI) remains selected
- **Then:** The canvas shows only HDMI ports and HDMI wires, and a control is available to re-show all signal types in one action

**Scenario:** Filtering does not alter the underlying configuration
- **Given:** I have hidden one or more signal types via the legend filter
- **When:** I view or later re-show the hidden types
- **Then:** No routes are created, removed, or modified by filtering — the filter only affects what is displayed, and hidden ports remain valid endpoints for their existing connections

**Scenario:** Installer opens the Matrix view and sees the same legend as the Routing Map
- **Given:** I have a mixed-signal system open
- **and Given:** I switch from the Routing Map to the Matrix (routing grid) view
- **When:** The Matrix renders
- **Then:** The same interactive signal-type legend is shown, using the identical small colored circle symbols that represent ports on the device nodes, so the two views read consistently

**Scenario:** Legend symbols match the device port style
- **Given:** The legend is displayed on either the Routing Map or the Matrix
- **When:** I look at each signal type in the legend
- **Then:** Each entry is marked by the same small colored circle used for that signal type's ports on device nodes (not a differing swatch or line style), reinforcing a single visual language across the app

**Scenario:** Signal-type filter selection is shared across the Routing Map and Matrix
- **Given:** I have unselected one or more signal types from the legend in one view
- **When:** I switch to the other view
- **Then:** The same signal types remain hidden — hidden ports do not appear as canvas ports/wires, nor as Matrix rows/columns — keeping the filter state consistent between the two views

**Scenario:** Non-routeable (Bluetooth) signal type is represented in the legend
- **Given:** The system includes Bluetooth ports
- **When:** The legend renders in either view
- **Then:** Bluetooth appears with a greyed-out circle and a "no routing" indication, making clear it is shown for reference only and cannot be routed (see A-07)

---

#### User Story B-36
- **Summary:** Resize a device node automatically when its ports are hidden so no empty space remains
- **Jira:** CHOME-123542

##### Use Case:
- **As an** installer working on a canvas with partially-hidden device nodes
- **I want to** have a node shrink to fit only its visible ports
- **so that** hidden ports don't leave dead space that wastes canvas real estate and breaks visual alignment

##### Acceptance Criteria:
**Scenario:** Installer hides ports via individual selection or the signal-type filter
- **Given:** I have a device node on the canvas with several visible ports
- **and Given:** I hide one or more ports — individually (B-09) or by toggling a signal type off in the legend filter (B-34)
- **When:** The ports are hidden
- **Then:** The node's height reduces to fit only the remaining visible ports, existing wires stay connected to their unchanged port positions, and the node returns to full size when the ports are shown again

---

#### User Story B-38
- **Summary:** Hide a source row or destination column directly from the Matrix view, synced to the Routing Map
- **Jira:** CHOME-123544

##### Use Case:
- **As an** installer building routes primarily in the Matrix view
- **I want to** hide a source (row) or destination (column) without leaving the grid
- **so that** I can reduce a large matrix to only the ports I care about, and have that choice carry over to the canvas

##### Acceptance Criteria:
**Scenario:** Installer hides a row and a column from the Matrix
- **Given:** I have a system open in the Matrix view with multiple source rows and destination columns
- **and Given:** I hover the device-name cell of a row label or column header, which reveals an eye-with-slash (hide) icon — the icon is not shown until I hover that device-name cell
- **When:** I select the eye-with-slash (hide) icon on that row or column
- **Then:** The row or column is removed from the Matrix, a control to restore hidden ports remains available, and the same port is hidden on the Routing Map canvas — with no routes created, removed, or modified by the hide action

**Scenario:** Installer unhides Matrix ports, mirroring the canvas re-select behavior
- **Given:** I have one or more ports hidden while in the Matrix view
- **and Given:** A "Show hidden" restore control is available
- **When:** I select the restore control
- **Then:** The hidden ports reappear as rows/columns in the Matrix and are returned to the marked-for-hiding (pending) state, so that on the Routing Map canvas they show highlighted red with the red "X" — ready to be re-hidden or individually unmarked — with no routes changed

**Scenario:** Re-selected (pending) ports are indicated in the Matrix and can be unhidden
- **Given:** I have re-selected (pending) ports showing in the Matrix after a "Show hidden" action
- **and Given:** Each pending row label and column header shows a persistent eye icon (and a red-tinted device-name cell) indicating the port is still marked hidden
- **When:** I click the eye icon on a pending row or column
- **Then:** That port is unhidden — its pending mark is removed so it stays visible as a normal row/column — and the same change is reflected on the Routing Map canvas, with no routes created, removed, or modified

---

## Epic 4: Basic Troubleshooting & Live Monitoring

*Signal tracing, device status widgets, and core troubleshooting instrumentation for the initial onsite experience.*

---

### NOW — Phase A

---

#### User Story A-10
- **Summary:** Trace a signal path end-to-end to quickly find where it breaks
- **Jira:** CHOME-118696

##### Use Case:
- **As an** installer troubleshooting a "no audio" complaint
- **I want to** select a signal path and see it highlighted end-to-end across all connected devices
- **so that** I can identify exactly where the signal is failing without trial-and-error across multiple screens

##### Acceptance Criteria:
**Scenario:** Installer traces signal from source to destination
- **Given:** I have a system open with a routed signal path
- **and Given:** I am on the canvas view
- **When:** I select any device node with an end-to-end signal path
- **Then:** The full signal path from source to destination is highlighted on the canvas, and any break in the path (disconnected node, muted device, zero-gain point) is visually flagged

**Scenario:** Installer selects a source device and sees everything it can feed
- **Given:** I have a routed system on the canvas
- **and Given:** I select a source device that has outputs but no inputs carrying signal into it — for example an Apple TV
- **When:** The trace is drawn
- **Then:** Every device downstream of that source is highlighted — the devices it feeds directly and, in turn, everything those devices feed — following the direction of signal flow to the end of each path

**Scenario:** Installer selects a terminating device and sees only what can feed it
- **Given:** I have a routed system on the canvas
- **and Given:** I select a terminating device whose outputs feed nothing — for example a TV or a room's speakers
- **When:** The trace is drawn
- **Then:** Only the devices upstream of it are highlighted — the devices feeding it directly and, in turn, everything feeding those — and no device downstream of it is highlighted, because there is nothing it can feed

**Scenario:** Devices that merely share an upstream device are not highlighted
- **Given:** I have an upstream device whose outputs feed two separate destinations — for example an amplifier feeding both a room's speakers and a separate receiver
- **and Given:** I select one of those destinations
- **When:** The trace is drawn
- **Then:** The shared upstream device and its own sources are highlighted, but the sibling destination is not — a device only joins the trace when a signal path reaches it without reversing direction, so no device is implied to be on a path it cannot actually reach

**Scenario:** Trace updates when something on the path changes
- **Given:** I have a device selected and its upstream and downstream path highlighted
- **When:** A device on that path is muted, taken to zero gain, goes out of order, or a route on the path is added or removed
- **Then:** The highlighted path and its signal-break flags are recalculated from the device I originally selected, so the trace continues to reflect the device I am investigating rather than drifting to a different starting point

---

#### User Story A-12
- **Summary:** See a real-time status widget for each NAX device to monitor crucial device health at a glance
- **Jira:** CHOME-118697

##### Use Case:
- **As an** installer monitoring a live system during commissioning
- **I want to** see a real-time status widget on each NAX device node showing the current state of its crucial features and functions
- **so that** I can spot device-level issues immediately without opening a separate device interface or WebUI

##### Acceptance Criteria:
**Scenario:** Installer scans device status widgets across the canvas during a live session
- **Given:** I am connected to a live control processor
- **and Given:** I have a system open on the canvas with one or more NAX device nodes
- **When:** I view the canvas
- **Then:** Each NAX device node displays a status widget showing the real-time state of its crucial features and functions (health status and gain readout), and the widget updates automatically as device state changes without requiring a manual refresh

**Scenario:** Signal flow is shown by animated wires rather than a device-level meter/equalizer
- **Given:** I have a live system open on the canvas with routed connections
- **and Given:** The device node does NOT show an animated level-meter (equalizer) to indicate audio/video flow
- **and Given:** I am in troubleshooting mode (A-13)
- **When:** A signal is flowing along a wire
- **Then:** The wire itself is animated — a travelling "bubble" marker moves from the source output toward the destination input — to indicate live audio/video flow, and a wire with no signal present is drawn static (not animated)

**Scenario:** The canvas stays static while designing and routing
- **Given:** I have a live system open on the canvas with routed connections carrying signal
- **and Given:** I am NOT in troubleshooting mode — I am laying out devices and creating routes
- **When:** I view the canvas
- **Then:** No wire is animated, so the schematic reads cleanly as a static diagram while I work, and flow animation appears only once I enter troubleshooting mode to investigate a problem

**Scenario:** The flow indicator is visible on any wire color and accessible to color-blind users
- **Given:** I have a live system with wires of multiple signal-type colors (including light colors such as the yellow analog wires)
- **and Given:** Flow is conveyed by motion and shape (a moving bubble), not by color alone
- **When:** A wire is carrying signal
- **Then:** The bubble reads clearly against every wire color by using a high-contrast form — a bright core with a contrasting outline/halo rather than relying on hue — so that presence and direction of flow are distinguishable without depending on color perception

**Scenario:** Bubbles travel at a consistent speed regardless of wire length
- **Given:** I have flowing wires of different lengths on the canvas
- **When:** I observe the flow bubbles on short and long wires at the same time
- **Then:** All bubbles travel at a roughly constant on-screen speed — the animation duration scales with the wire's length rather than being fixed — so a long wire does not appear to move faster than a short one (within sensible minimum/maximum bounds)

**Scenario:** Flow is detected by the receiving component at its input port
- **Given:** I have a routed connection from a source output to a destination input on the canvas
- **and Given:** The receiving (destination) component is the one that detects whether a signal is present at its input port
- **and Given:** The receiving component is a networked Crestron device (NAX or NVX) that can report its receive status
- **When:** The receiving component detects audio/video at its input port
- **Then:** The connecting wire animates to show flow into that input; when the receiving component detects no signal at its input port (e.g., the upstream source is muted, at zero gain, out of order, or disconnected), the wire stops animating and renders static

**Scenario:** A wire into a device that cannot report receive status is never animated
- **Given:** I have a routed connection whose destination is a device that provides no audio/video receive status — a third-party display or soundbar, or a passive speaker with no network interface
- **and Given:** Configure Pro has no way to read whether that device is actually receiving signal
- **When:** I view that wire in troubleshooting mode
- **Then:** The wire is drawn static rather than animated, so the canvas never implies a receive reading that cannot be taken, and the wire remains fully selectable and traceable like any other

**Scenario:** Installer understands why a path stops animating at a third-party endpoint
- **Given:** I am tracing a path in troubleshooting mode that ends at a TV, soundbar, or room speakers
- **and Given:** The last animated wire on that path is the one feeding the final Crestron device
- **When:** I inspect the unanimated final leg
- **Then:** I am told that receive status is unavailable for that endpoint rather than being shown a "no signal" fault, so an absent reading is not mistaken for a broken path

---

#### User Story A-13
- **Summary:** Enter troubleshooting mode to establish the designed AoIP/AVoIP path on the hardware and find where signal breaks
- **Jira:** CHOME-118700

##### Use Case:
- **As an** installer troubleshooting a reported "no audio" or "no video" problem
- **I want to** switch the canvas into a troubleshooting mode that builds my designed source-to-destination path on the actual NAX and NVX hardware over IP, then shows me where signal stops
- **so that** I can prove whether the path itself works instead of guessing from a diagram that only shows what I intended

##### Acceptance Criteria:
**Scenario:** Installer enters troubleshooting mode and the designed path is established on the hardware
- **Given:** I have a live system open on the canvas with a source connected through to a destination
- **and Given:** Some legs of that path are AoIP or AVoIP, which cannot be drawn by hand in this release (A-07)
- **When:** I enter troubleshooting mode
- **Then:** Configure Pro creates the matching routes on the live NAX and NVX devices over IP so the designed path is actually carrying signal, and those routes are drawn on the canvas as part of the path

**Scenario:** Installer leaves troubleshooting mode and the system returns to how it was
- **Given:** I am in troubleshooting mode with test routes established on the hardware
- **and Given:** Entering the mode displaced one or more routes that previously fed the same destination inputs
- **When:** I exit troubleshooting mode
- **Then:** Every route created for troubleshooting is torn down on the hardware and removed from the canvas, and each displaced route is restored exactly as it was, leaving the system in the state I found it

**Scenario:** Troubleshooting routes never overwrite the saved design
- **Given:** I have entered troubleshooting mode and routes have been created on the hardware
- **When:** My layout and routing are saved during that session
- **Then:** Only my real designed routing is persisted — the troubleshooting routes are session-only and never become part of the saved configuration, so ending the session cannot leave test routes behind as the design

**Scenario:** Every endpoint on the path is made visible when the mode is entered
- **Given:** I have hidden ports on a device, collapsed a device to connected ports only, or filtered a signal type off the canvas
- **and Given:** The path being established touches one of those hidden endpoints
- **When:** I enter troubleshooting mode
- **Then:** Each port the path touches is made visible again and its signal type is re-shown, so every leg of the path is drawn against its true port and no wire appears to attach to the wrong row

**Scenario:** Installer finds where the signal breaks along the established path
- **Given:** I am in troubleshooting mode with the path established from source to destination
- **and Given:** I initiate the flow from the affected destination device
- **When:** The system traces the signal path backward from that destination
- **Then:** The flow highlights the exact point where the signal stops — a muted device, a zero-gain point, a missing route, or an offline device — and surfaces it as a flagged issue with context about why the signal failed

**Scenario:** Troubleshooting mode is unmistakable while it is active
- **Given:** Troubleshooting mode changes the routing that is live on the hardware
- **When:** The mode is active
- **Then:** A persistent, clearly-marked indicator shows I am in troubleshooting mode and that live routing is being altered, so I cannot mistake a test path for the delivered configuration

##### Open Questions — this story writes to live hardware:
Entering the mode creates real routes on live NAX/NVX devices and tears them down on exit. These need decisions before the story is estimable:
- What happens if a route write fails partway through establishing the path — is the partial path left up, or rolled back?
- What happens if Configure Pro crashes or the processor connection drops while the mode is active — who tears the test routes down, and when?
- Should the mode be blocked, or only warned against, on a system that has already been handed off to a client?

##### Out of Scope:
- Hand-drawing AoIP/AVoIP routes outside troubleshooting mode — deferred pending a platform change; see **A-07** and **C-40**
- Proactive surfacing of suspicious device states without an installer-initiated trace — covered by **C-15**
- Directional upstream/downstream highlighting rules — covered by **A-10**
- Flow animation behavior and which receivers report status — covered by **A-12**

---

#### User Story A-29
- **Summary:** Instrument troubleshooting workflows to measure time-to-diagnosis and external tool switching

##### Use Case:
- **As a** product manager tracking troubleshooting effectiveness in Configure Pro
- **I want to** capture telemetry on signal tracing sessions, time spent in troubleshooting flows, and any context switches to external tools during a session
- **so that** I can establish a baseline for time-to-diagnose "no audio" issues and measure whether Configure Pro is reducing reliance on WebUIs and NVX Director for troubleshooting

##### Acceptance Criteria:
**Scenario:** Product team reviews troubleshooting telemetry after Phase A launch
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
**Scenario:** Installer checks signal presence on a live system
- **Given:** I am connected to a live control processor
- **and Given:** I have a system open on the canvas
- **When:** I highlight any signal wire on the canvas during active signal flow
- **Then:** I see a live signal meter and a clear online/offline status indicator that updates in near real-time

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
**Scenario:** Installer selects a signal path and edits a DSP block from the sequential view
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
**Scenario:** Canvas flags a device with a mismatched capability during system review
- **Given:** I have a live system open on the canvas
- **and Given:** One or more devices have a state inconsistency (e.g., an offline device that should be active, a capability mismatch in a route)
- **When:** I view the canvas
- **Then:** Affected device nodes display a clear error or warning indicator, and I can select a flagged node to see a plain-language description of the issue

---

## Epic 7: Inline DSP Controls

*Quick-access gain, mute, and delay adjustments directly on canvas device nodes without leaving the schematic view.*

---

### NEXT — Phase B

---

#### User Story B-16
- **Summary:** Adjust gain or mute inline on a device node

##### Use Case:
- **As an** installer tuning audio during a live commissioning session
- **I want to** adjust gain or toggle mute directly on a device node on the canvas
- **so that** I can make and verify DSP corrections immediately without context-switching to a device WebUI

##### Acceptance Criteria:
**Scenario:** Installer adjusts gain on a device directly from the canvas
- **Given:** I have a live system open on the canvas
- **and Given:** A device node is selected and its inline DSP controls are visible
- **When:** I adjust the gain slider or toggle the mute control on the node
- **Then:** The change is applied to the live device in real time and the signal meter on the node reflects the updated state

---

#### User Story B-30
- **Summary:** Instrument DSP interactions to measure whether Configure Pro is replacing external DSP tools

##### Use Case:
- **As a** product manager tracking DSP workflow adoption in Configure Pro
- **I want to** capture telemetry on DSP adjustments made within Configure Pro versus sessions where users launch external DSP tools
- **so that** I can establish a baseline for DSP task completion in-product and measure reduction in external tool dependency over time

##### Acceptance Criteria:
**Scenario:** Product team reviews DSP usage telemetry after Phase A launch
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
**Scenario:** Installer opens device dashboard from a canvas node
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
**Scenario:** Installer opens a graphical EQ editor from a device node
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
**Scenario:** Product team reviews device addition telemetry after Phase A launch
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
**Scenario:** Canvas shows a mix of discovered and placeholder devices
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
**Scenario:** Installer adds an analog amplifier and passive speaker to the canvas and routes signal through them
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
**Scenario:** Installer confirms live system state before client handoff
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
**Scenario:** Installer deploys configuration and disconnects
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
**Scenario:** Product team reviews deployment reliability telemetry after Phase B launch
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
**Scenario:** Product team reviews canvas performance telemetry across system sizes
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
**Scenario:** Installer pans and zooms on a 50-device canvas
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
**Scenario:** User switches between offline and live mode
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
**Scenario:** Designer creates a full system layout offline
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
**Scenario:** Installer maps discovered devices to placeholder nodes
- **Given:** I have an offline-designed system open in Configure Pro
- **and Given:** I connect to a live processor and devices are discovered
- **When:** I associate a discovered device to a placeholder node
- **Then:** The placeholder node adopts the real device's identity and capabilities, compatibility is validated (I/O and channel counts match), and any incompatibilities are surfaced as warnings before I proceed

---

#### User Story D-39
- **Summary:** Open a system on any machine and find the canvas arrangement intact

##### Use Case:
- **As a** designer or installer who arranges a system in one place and works on it in another
- **I want to** open a system on any machine and find my canvas arrangement intact
- **so that** I don't lose my layout when I pre-design at the office and commission on site, switch laptops, or hand the job to a colleague

##### Acceptance Criteria:
**Scenario:** Layout arranged offline is present when the system is opened on site
- **Given:** I have designed a system offline and arranged its canvas layout
- **and Given:** I open that system from a different machine at the job site
- **When:** The canvas loads
- **Then:** My node positions, zoom, pan, and groupings are restored exactly as I arranged them offline, without re-arrangement

**Scenario:** Layout is retained with the system at commissioning
- **Given:** I have an offline-designed system with an arranged canvas layout
- **and Given:** I connect to the live processor and deploy the configuration (D-25)
- **When:** The deployment completes
- **Then:** The canvas arrangement is retained with the system so any subsequent machine that opens it restores the same layout

**Scenario:** Two people working the same system share one layout
- **Given:** A system has a stored canvas layout
- **and Given:** Another installer opens the same system and re-arranges nodes
- **When:** I next open that system
- **Then:** I see the most recently saved arrangement — one layout per system, last write wins — and it is clear when the layout was last changed and by whom

**Scenario:** Existing per-machine layouts are not lost when storage changes
- **Given:** I have canvas layouts saved on my machine from an earlier release (A-02)
- **When:** I upgrade to the release where a layout is available from any machine
- **Then:** My existing layouts are carried forward rather than discarded, and I am not returned to a default auto-fit view

**Scenario:** Arrangement is available without a processor connection
- **Given:** I am working offline with no connection to a control processor
- **When:** I open a system I previously arranged
- **Then:** The saved arrangement is restored, so layout continuity does not depend on being connected to live hardware

##### Out of Scope:
- Per-user layouts, where two people each keep their own private arrangement of the same system — layout is shared per system in this story

---

#### User Story D-25
- **Summary:** Deploy an offline-designed configuration to the live system with a clear confirmation

##### Use Case:
- **As an** installer who pre-designed a system offline
- **I want to** deploy my offline configuration to the live system in a single, guided action
- **so that** I can complete commissioning quickly and be confident the live system matches my design intent

##### Acceptance Criteria:
**Scenario:** Installer deploys offline configuration to live devices
- **Given:** I have an offline-designed system with all placeholder nodes mapped to discovered devices
- **and Given:** All compatibility validations have passed
- **When:** I initiate deployment
- **Then:** Configure Pro applies the configuration to all live devices, confirms successful deployment with a clear status message, and updates the canvas to reflect the live state — with zero data loss from my offline design

