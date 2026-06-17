# Configure Pro AV — Product Capabilities
name: product-capabilities
description: Core feature capabilities for the Configure Pro AV Tool 
---

# Part 1: Product Brief

_Read this section to understand the product. \~5–7 minutes._

---

## Executive Summary

**What we're building:** An offline and real-time, visual AV configuration workspace inside Configure Pro — a canvas-based experience where designers and installers can design audio and video systems, visualize signal flow, create and modify routing, configure device-level DSP, and troubleshoot live systems without switching tools.

**Why it matters:** Today, AV configuration is fragmented across multiple disconnected tools — legacy software, device-specific WebUIs, and domain-specific tools like NVX Director. Installers lose time switching between them, mentally reconstruct signal flow from spreadsheets and text-based UIs, make avoidable errors, and can't design systems before arriving on site. This initiative replaces that fragmented workflow with a unified visual workspace that works both online and offline.

**Strategic bet:** This positions Configure Pro as the single tool an installer needs from pre-wire design through final commissioning — a differentiated capability that competitors cannot easily replicate.

**Phasing:**

| Phase | Focus | One-line outcome |
| --- | --- | --- |
| **A (NOW)** | MVP Foundation | Run a real commissioning job on small/medium systems without switching tools |
| **B (NEXT)** | Onsite Loop | Complete the full discover → route → troubleshoot → deploy cycle in Configure Pro |
| **C (LATER)** | Depth & Scale | Handle complex systems and power users comfortably |
| **D (LATER)** | Offline & Advanced | Extend into pre-wire design and advanced workflows |

---

## Problem Definition (WHY)

### Core Problems

1. **Fragmented tooling:** Installers switch between multiple tools to design systems, discover devices, build routes, configure DSP, and troubleshoot — creating context loss, wasted time, and errors at every handoff.
2. **No visual signal flow:** There is no way to see how audio and video signals flow through a system end-to-end. Installers must mentally reconstruct signal paths from text-based UIs and spreadsheet-style grids.
3. **Offline design gap:** Installers cannot pre-design systems before arriving on site. All configuration requires a live connection to the control processor, eliminating pre-wire planning.
4. **Grid/canvas disconnect:** Routing changes made in one view (canvas vs. grid) do not reliably reflect in the other, eroding trust in the system's accuracy.
5. **Fragmented configuration surfaces:** Key capabilities (e.g., DSP, routing insights, diagnostics) exist across multiple tools and device interfaces today. Configure Pro consolidates these into a single, unified workflow.

### User Journey Context

These problems surface at critical points in the installer workflow:

- **Commissioning / onsite:** Switching between tools during time-pressured onsite work leads to mistakes in routing and device configuration.
- **Troubleshooting / post-install:** Without visual signal tracing, diagnosing "no audio" or "wrong source" problems requires trial-and-error across multiple screens.
- **Pre-wire / design phase:** No offline design capability means installers arrive on site without a plan, increasing commissioning time.

---

## Personas & Context

| Persona | Context | Key Needs |
| --- | --- | --- |
| **Designer** | Connected to control processor OR working offline; pre-wire planning and system architecture | Visual system layout, offline design capability, drag-and-drop device placement, signal flow visualization |
| **Installer** | Connected to control processor; working in live system / commissioning context | Real-time device status, signal tracing for troubleshooting, reliable routing, DSP adjustment, confidence that changes persist |

---

## Key Scenarios / Workflows (WHAT)

### Scenario 1: System Design (Pre-Wire)

1. Designer opens Configure Pro while connected to a processor
2. Designer creates a new system/room on the canvas
3. Designer drags devices from the panel onto the canvas
4. Designer connects device nodes to define intended routing and signal flow
5. Designer configures basic DSP settings (gain, delay) on placeholder nodes
6. Designer saves layout — positions, zoom, grouping all persist

### Scenario 2: Troubleshoot "No Audio" on a Live System

1. Installer selects the destination device on the canvas
2. Installer traces the signal path backward — highlighted end-to-end
3. Installer identifies where the signal breaks (a disconnected node, a muted device, a gain set to 0)
4. Installer taps into the device node to see internal DSP flow
5. Installer adjusts the gain or unmutes the device inline
6. Installer confirms audio is restored via live meters on the path

### Scenario 3: Large System Routing via Grid + Canvas

1. Installer opens a large system with 25+ devices
2. Installer switches to the routing grid for high-density channel routing
3. Installer creates multiple routes in the matrix view
4. Installer switches back to canvas — all routes are reflected and visually connected
5. Installer validates by tracing signal paths on the canvas

### Scenario 4: Offline System Design (Pre-Wire)

1. Designer opens Configure Pro **without** a processor connection
2. Designer creates a new system/room on the canvas
3. Designer drags placeholder devices from the panel onto the canvas
4. Designer connects device nodes to define intended routing and signal flow
5. Designer configures basic DSP settings (gain, delay) on placeholder nodes
6. Designer saves layout — positions, zoom, grouping all persist
7. _Later:_ Designer/Installer arrives on site and connects to processor

### Scenario 5: Commission & Deploy (Offline → Online)

1. Installer opens an offline-designed system
2. Installer connects to live processor — real devices are discovered
3. Installer associates discovered devices to placeholder nodes
4. System validates compatibility (I/O counts, capabilities)
5. Installer deploys configuration with clear confirmation
6. Configuration persists on devices after disconnect
7. Installer verifies via live status indicators and meters

---

## Discovery & Validation

_This section tracks what we've validated, what we're assuming, and what we need to prove before committing scope. A product operating model requires separating discovery (should we build this?) from delivery (build it right)._

### What We Believe to Be True (Assumptions)

| # | Assumption | Confidence | Basis |
| --- | --- | --- | --- |
| 1 | Installers spend significant time switching between tools during commissioning | 🟢 High | Support data, dealer feedback |
| 2 | A canvas-based visual paradigm and an enhanced routing grid is the right approach (vs. wizard-based, or form-based) | 🟢 High | Competitive analysis — not yet validated with users |
| 4 | Offline pre-wire design is a high-value capability (not just a nice-to-have) | 🟢 High | Dealer requests |
| 6 | Installers will trust a canvas view over direct device WebUI interaction | 🟡 Medium | Unvalidated — installers may prefer direct device control they already know |
| 3 | Signal-path tracing is the primary troubleshooting mental model for installers | 🟡 Medium | Inferred from support patterns |
| 5 | 25–50 device systems represent the performance ceiling we need to target for Phase A | 🟡 Medium | Based on "typical" system sizes — needs data validation |

### What We've Validated

_Update this section as discovery work is completed._

- [ ] Prototype testing of canvas-based routing with real users
- [ ] Competitive analysis of visual configuration tools in adjacent domains
- [ ] Quantified time-on-task for current multi-tool workflows
- [ ] Dealer survey on offline design demand and frequency

### What We Need to Prove Before Phase A Commitment

| Question | Why it matters | How we'll answer it | Status |
| --- | --- | --- | --- |
| What does "signal tracing" actually look like in practice? | The troubleshooting scenario assumes a specific mental model. If installers think differently, the UX will miss. | Contextual inquiry during live troubleshooting (3–5 sessions) | Not started |
| What's the real distribution of system sizes? | Determines Phase A performance targets. If most systems are 50+, the 25-device baseline is too low. | Analyze system telemetry data from deployed processors | Not started |

### What We'll Validate During Phase A (Learn While Building)

These don't need answers before starting, but must be actively measured:

- **Canvas adoption rate** — Are users actually working on canvas, or defaulting to grid?
- **Tool switching** — After Phase A ships, do installers still open WebUIs and NVX Director?
- **Routing error rate** — Does visual routing reduce errors vs. baseline?
- **Performance at scale** — Where does the canvas start to degrade?

---

## System Behavior & Key Rules (HOW)

_These rules avoid ambiguity and define non-negotiable system behavior — What are the rules of the system that must always be true?:_

1. **Routing must be validated before creation** — nodes only expose valid, relevant connection options based on real device capabilities.
2. **Canvas and grid must remain perfectly synchronized** — zero sync inconsistencies between views; a route created in one view must instantly appear in the other.
3. **Device state must update in near real-time** — live meters and status indicators must reflect actual device state, not cached data.
4. **UI interactions must feel instantaneous** — canvas zoom, pan, node selection, and connection creation should not introduce noticeable lag or friction.
5. **Routing updates must propagate quickly across the system** — updates in one view are reflected across all representations without delay that could impact user trust.
6. **Canvas must scale to real-world system sizes** — small and medium systems can be managed without performance degradation or loss of clarity.
7. **Layout must persist across sessions** — positions, zoom level, grouping, and working context must survive page navigation and app restarts.
8. **System/room switching must not cause cross-system errors** — clear boundaries between rooms prevent accidental routing across system boundaries.
9. **Configuration must persist on devices after disconnect** — deployed settings are stored on devices, not just in the Configure Pro session.
10. **Offline vs. live mode must be unambiguous** — clear visual indicators ensure the user always knows whether they are affecting a live system.

---

## Risks & Mitigation

- **Canvas performance degradation at scale (25+ devices)**
  Impact: Users lose trust in the canvas and fall back to other tools.
  Mitigation: Establish a 25–50 device baseline, test performance early, and optimize the rendering pipeline.

- **Inaccurate device capability modeling**
  Impact: Invalid configurations may be deployed to live systems, leading to loss of installer trust.
  Mitigation: Validate device models against real hardware specifications and enforce constraints at the node level.

- **Sync issues between canvas and grid views**
  Impact: Users begin to distrust routing and manually double-check all configurations.
  Mitigation: Treat bidirectional sync as an architectural requirement and implement automated sync validation testing.

- **Latency in real-time updates (meters, status)**
  Impact: Installers cannot trust what they see during live troubleshooting.
  Mitigation: Define acceptable latency targets, use real-time update mechanisms (e.g., WebSockets), and support local state reconciliation.

- **Offline → online transition data loss**
  Impact: Installers may lose pre-designed work during commissioning.
  Mitigation: Implement robust state persistence, define a clear conflict resolution strategy, and validate configurations before deployment.

- **DSP model complexity exceeding UI capacity**
  Impact: Internal DSP visualization becomes cluttered or difficult to understand in complex systems.
  Mitigation: Use progressive disclosure, allow expandable levels of detail, and validate usability with real DSP configurations.

---

# Part 2: Detailed Specification

_Delivery-level detail. Read this section for capabilities, phasing, execution mapping, and architecture._

---

## Overview

Deliver an **offline & real-time, visual AV configuration workflow** that allows designers and installers to design audio & video systems for a space, understand system signal flow, create and modify routing, configure device-level DSP, and troubleshoot live systems — all within a single, continuous canvas-based experience inside of Configure Pro.

Today, AV configuration requires switching between multiple disconnected tools, mentally reconstructing signal flow from spreadsheets and text-based UIs or other drawing tools, and working without any visual representation of how devices relate to one another. Installers lose time, make avoidable errors, and lack confidence that what they see reflects reality. This initiative replaces that fragmented workflow with a unified visual workspace that works both online and offline — making Configure Pro the single tool an installer needs from pre-wire design through final commissioning.

Today, Crestron dealers rely on a fragmented landscape of tools—including legacy configuration software, device-specific WebUIs, and domain-specific tools like NVX Director—to design, configure, and maintain systems. While each tool has evolved to serve a specific purpose, this fragmentation creates inefficiencies, duplicated workflows, and inconsistent user experiences across the platform.

Configure Pro is a deliberate shift in Crestron's strategy: to unify these experiences into a single, cohesive dealer interface that becomes the primary way to interact with Crestron systems. Rather than relying on multiple disconnected tools, Configure Pro centralizes system design, routing, configuration, and diagnostics into one continuous workflow—aligned with Crestron's long-term vision for Crestron Spaces and Crestron Home as a unified platform.

**Strategic importance:** This positions Configure Pro as the industry-leading AV configuration experience for the Crestron ecosystem, reducing installer friction, lowering deployment error rates, and creating a differentiated capability that competitors cannot easily replicate. Dealers should be able to design, configure, and troubleshoot an entire AV system without leaving Configure Pro.

### Supporting Documentation

| Resource | Link |
| --- | --- |
| AV Configuration Workflow — Foundational Epics (RevB 5-1-2026) | [SharePoint Document](https://crestron1.sharepoint.com/:w:/r/sites/AudioSolutions/_layouts/15/Doc.aspx?sourcedoc=%7B4AC80BF5-76B9-40A8-9914-AA48494379A7%7D&file=AV%20Configuration%20Workflow%20-%20Foundational%20Epics%20-%20RevB%205-1-2026.docx&action=default&mobileredirect=true) |

---

## Outcomes & Success Metrics (WHY → MEASURE)

_What will change for the user? How do we know it worked?_

| Outcome | Metric | Target |
| --- | --- | --- |
| Users can accurately trace signal flow across a system without assistance | % of routing interactions occurring on canvas (vs. legacy methods) | ≥70% |
| Users can represent a full room/system without switching tools | Systems fully designed in Configure Pro without external tools | Baseline → measure |
| Users can locate and add any device within seconds | Drag-and-drop success rate | Near 100% |
| Users correctly distinguish physical vs. virtual devices | % of systems started via drag-drop from panel | ≥80% |
| Zero sync inconsistencies between canvas and grid views | Reported sync errors between views | 0 |
| Zero data loss during mode transitions (offline → online) | Data loss incidents | 0 |
| Canvas remains performant at scale | UI interaction latency | <100–200ms perceived |
| Routing updates reflect in near real-time | Routing update latency | Within X ms |
| Reduction in switching to external DSP tools | DSP tasks completed in Configure Pro vs. external | Baseline → measure |
| Faster completion of DSP-related tasks | Time to complete DSP configuration | Baseline → measure |
| Users can complete full system design offline | Offline design completion rate | Baseline → measure |
| Smooth transition from offline design → live deployment | First-time deployment success rate | Baseline → measure |

---

## Capabilities (WHAT we are delivering)

_These capabilities are intentionally consolidated into Configure Pro as the primary dealer-facing interface for Crestron systems. Where functionality previously existed across multiple tools or device-specific interfaces, the goal is to bring those capabilities into a unified, consistent workflow._

### Device Discovery & Representation

- Searchable device/objects panel with drag-and-drop to canvas
- Device status indicators and live meters
- Generic placeholder devices for offline pre-design
- Device nodes reflect real hardware capabilities (I/O, channels)
- Discovered devices vs. virtual/placeholder devices clearly differentiated

### Visual System Design (Canvas)

- Large, zoomable canvas for full-system visualization
- Devices and DSP objects as visual nodes with connections
- Signal flow visible at a glance via node connections
- Room/system switching with clear boundaries
- Layout persistence (positions, zoom, grouping)
- Connection selection, removal, and visual feedback

### Routing & Signal Flow

- Create/adjust routes directly on canvas via node connections
- Routing grid (matrix view) for high-density channel routing
- Bidirectional sync between canvas and grid views
- Visual indicators of active routes for auditing
- Signal tracing: select a path, highlight end-to-end, show where it breaks

### Device-Level DSP

- Expand a device node to see internal DSP signal flow
- Visual signal path inside the device (not abstract)
- Inline adjustment of simple DSP controls (gain, mute, delay)
- Deeper views for complex DSP blocks (EQ, mixer)
- Signal path flow through individual DSP blocks

### Device Capability Modeling

- Nodes reflect real I/O, channel counts, and capabilities
- Constraints enforce valid routing (prevent invalid configurations)
- Clear differentiation: DSP-capable vs. static vs. amp devices
- Only valid, relevant options exposed per device

### Dual-Mode Operation (Offline & Online)

- Full system design capability without network access
- Placeholder/generic devices for pre-wire planning
- Device discovery and association when online
- Configuration persistence on devices after disconnect
- Clear indicators of offline vs. live mode
- Validation before deployment

### Troubleshooting & Live Monitoring

- Signal tracing with end-to-end path highlighting
- Live meters and status on key nodes/paths
- Device status: "is this live?" indicator and mode awareness
- Error surfacing: suspicious states, mismatched capabilities, offline devices

---

## Scope Definition (NOW / NEXT / LATER)

### NOW — Phase A: MVP Foundation

**Goal:** Run a real-world commissioning job on small/medium systems without switching tools or doubting what you see.

#### Capabilities:

- **Canvas as primary workspace**
  - Zoomable schematic with nodes and connections
  - Layout persistence (position, zoom, grouping)
  - System/room switching with clear boundaries

- **Accurate capability modeling**
  - Nodes reflect real I/O, channels, and basic capabilities
  - Enforce constraints so invalid routes are hard to create

- **Routing that matches intent**
  - Create/adjust routes directly on canvas
  - Routing grid available, synced bidirectionally, trustworthy and consistent

- **Core troubleshooting loop**
  - Signal tracing: select a path, highlight end-to-end, show where it breaks
  - Live meters and status on key nodes/paths. Device status "is this live?" indicator

#### Explicit Exclusions (NOW):

- Full offline design mode
- System-wide DSP chaining across devices (intelligent DSP allocation)
- Collaboration/multi-user editing
- Versioning/rollback

**Outcome:** You can run a real-world commissioning job on small/medium systems without switching tools or doubting what you see, even if device config is still shallow.

---

### NEXT — Phase B: MVP Completeness (Finish Onsite Loop)

**Goal:** Make the full onsite lifecycle (discover → understand → route → troubleshoot → deploy) feel coherent and safe.

#### Capabilities:

- **Troubleshooting as a first-class flow** — Structured "find where signal breaks" flow, not just tools. Better error surfacing: suspicious states, mismatched capabilities, offline devices.
- **Trust-in-deployment** — "What is running right now?" view. Simple, trustworthy deployment history.

**Outcome:** For typical projects, installers can start and finish onsite using Configure Pro alone, with confidence in what's live and what will persist.

---

### LATER — Phase C & D

#### Phase C: Depth & Scale (Device/DSP + Large Systems)

**Goal:** Make Configure Pro comfortable for complex systems and power users.

- Device-level dashboards — no-scroll audio-centric views
- Deeper DSP block editing (graphical EQ, mixers, internal matrices)
- Performance improvements for large channel counts
- Custom node views, filtering, and smarter grouping

#### Phase D: Offline & Advanced

**Goal:** Extend value before and beyond onsite, without destabilizing the core.

- Offline design mode maturity — rich placeholder/generic device flows
- Bind discovered devices to placeholder nodes
- Smooth offline → online transition with strong compatibility validation
- Cross-device DSP chaining, simulation, automated substitution
- Collaboration, versioning/rollback, advanced analytics

**Outcome:** Configure Pro supports pre-config and advanced workflows, but only after onsite trust is rock-solid.

---

### Measuring Outcomes by Release

| Phase | Problem We Are Solving | Outcome | How It's Measured |
| --- | --- | --- | --- |
| A (NOW) | Installers switch between multiple tools to configure AV systems | Users can represent a full room/system without switching tools | % of systems fully designed in Configure Pro |
| A (NOW) | No visual representation of signal flow | Users can accurately trace signal flow without assistance | ≥70% of routing interactions on canvas |
| A (NOW) | Routing errors from text-based/grid-only workflows | Routing interactions are visual and intuitive | Drag-drop success rate near 100% |
| A (NOW) | UI performance erodes trust | Canvas feels fast and responsive | UI interactions <100–200ms |
| B (NEXT) | No structured troubleshooting flow | Installers can diagnose signal issues without trial-and-error | Time to diagnose "no audio" issues |
| B (NEXT) | Uncertainty about what is deployed and running | Installers trust what they see is what is live | Reduction in "is this actually running?" support queries |
| B (NEXT) | Configuration lost after disconnect | Deployed settings persist on devices | Zero data loss during mode transitions |
| C (LATER) | Complex systems overwhelm the UI | Power users can work comfortably at scale | Performance at 50+ devices; DSP task completion time |
| D (LATER) | No pre-site design capability | Installers can plan systems before arriving on site | % of systems with offline pre-design |

---

## Execution Mapping (Scenario → Epic Mapping)

### Purpose

This section maps **user scenarios and capabilities** to **Jira epics and delivery workstreams**, ensuring a clear relationship between product intent and execution.

This prevents:

- Fragmented backlogs
- Loss of context between stories
- Misalignment across Product, UX, and Engineering

---

### Scenario: Understand & Visualize Audio System

**User Goal:**
As an installer, I want to quickly understand how the system is wired so I can validate or troubleshoot audio behavior.

**Mapped Epics:**
- Epic: System Canvas & Visual Schematic Framework
- Epic: Audio Device Node Library & Capability Modeling

**Key Capabilities Involved:**
- Node-based device representation
- Signal path visualization
- Room/system scoping

**Representative Stories:**
- Render devices as nodes with inputs/outputs
- Display existing signal connections between nodes
- Switch between room/system/device views

---

### Scenario: Create or Modify Audio Routing

**User Goal:**
As an installer, I want to connect sources to destinations intuitively so I can configure the system correctly.

**Mapped Epics:**
- Epic: System Canvas & Visual Schematic Framework
- Epic: System-Wide Audio Routing Grid

**Key Capabilities Involved:**
- Drag-and-drop routing (canvas)
- Matrix-based routing (grid)
- Routing validation & constraints

**Representative Stories:**
- Create connection via drag from output → input
- Toggle routes in matrix grid view
- Validate routing compatibility before creation
- Sync routing state between canvas and grid

---

### Scenario: Configure Device & DSP Behavior

**User Goal:**
As an installer, I want to quickly adjust device settings and DSP so I can tune the system.

**Mapped Epics:**
- Epic: Device-Level View Overview
- Epic: Device & Object Settings Panel

**Key Capabilities Involved:**
- Expandable device view
- Inline DSP controls (gain, mute, delay)
- Contextual settings panel

**Representative Stories:**
- Open device-level dashboard from node
- Adjust gain/mute/delay in real time
- View device properties in settings panel

---

### Scenario: Troubleshoot Audio Issues

**User Goal:**
As an installer, I want to quickly identify where signal is failing so I can fix issues efficiently.

**Mapped Epics:**
- Epic: System Canvas & Visual Schematic Framework
- Epic: Devices & Objects Panel
- Epic: Device-Level View Overview

**Key Capabilities Involved:**
- Signal visibility (connections + meters)
- Device status indicators
- DSP flow inspection

**Representative Stories:**
- Display signal presence at IO points (meters/status)
- Highlight active signal path
- Identify missing or broken connections
- Adjust DSP to restore signal

---

### Scenario: Discover & Represent Live Devices

**User Goal:**
As an installer, I want to see devices that exist on the system so I can configure them immediately.

**Mapped Epics:**
- Epic: Devices & Objects Panel
- Epic: Dual-Mode Operation

**Key Capabilities Involved:**
- Device discovery
- Device status display
- Drag-to-canvas representation

**Representative Stories:**
- Discover devices from network
- Display devices in panel with status
- Drag discovered device onto canvas as node

---

### Scenario: Deploy & Validate Live System

**User Goal:**
As an installer, I want confidence that my configuration is live and stable.

**Mapped Epics:**
- Epic: Dual-Mode Operation
- Epic: Audio Device Node Library & Capability Modeling

**Key Capabilities Involved:**
- Live system state awareness
- Real-time configuration application
- Persistence of system state

**Representative Stories:**
- Apply configuration changes in real time
- Reflect live state in UI immediately
- Persist configuration after disconnect

---

# Dependencies

### Hardware Dependencies

- Real device specs & capability definitions — Required to ensure node models match actual I/O, channels, and DSP capabilities

### API / Data Dependencies

- Device-level DSP definitions — Needed to visualize internal signal paths per device

---

# System Architecture (At a Glance)

## Core UI Surfaces

1. **Canvas (Primary Workspace)** — Zoomable, persistent visual schematic
2. **Device/Objects Panel (Left)** — Already part of Native Configure Pro UI
3. **Device View / Settings (Contextual)** — Drag-and-drop devices; expand for settings when focused
4. **Routing Grid (Alternate View)** — Matrix view, bidirectionally synced with canvas

## Core Models

- Device Node Model
- Routing Model (external connections)
- DSP Model (device-level only)
- System Mode State (online/offline)
