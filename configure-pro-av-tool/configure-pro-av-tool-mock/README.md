# Configure Pro AV Tool — Interactive Mockup

A visual AV configuration workspace mockup for Crestron's Configure Pro platform. This React app demonstrates canvas-based system design, signal routing, DSP visualization, and troubleshooting workflows for audio/video systems.

## Quick Start

```bash
cd configure-pro-av-tool-mock
npm install
npm run dev -- --host 0.0.0.0
```

Then open your browser to the URL shown in the terminal (typically `http://localhost:5173/`). Use the Network URL to access from other devices on the same network.

## What This Mockup Demonstrates

This is a functional UI mockup — no real hardware connection required. All device data is static and defined in the source code.

### Navigation

The app starts at the Configure Pro home screen. Click **Systems → My Home** to enter the main workspace. Three tabs are functional:

- **Rooms** — browse the room hierarchy, view room and floor configurations
- **Devices** — browse devices by room, view device details and port definitions
- **Routing** — the primary workspace with two views (Canvas and Grid)

### Routing Canvas

The canvas is a Miro-like infinite workspace showing all devices as cards with labeled input/output ports.

| Action | How |
|---|---|
| Pan | Click and drag empty space |
| Zoom | Scroll wheel (centers on cursor) |
| Zoom controls | +/− buttons, bottom-right corner |
| Move a device | Click and drag the device card |
| Move a room | Drag the room label above the dashed boundary |
| Create a route | Drag from an output port (green) to an input port (blue) |
| Remove a route | Double-click a wire |
| Trace signal | Click a device or wire to highlight the full signal chain |
| Clear trace | Click empty canvas, or press Escape |
| Simulate device failure | Click the ⏻ button on any device card |
| Open device routing panel | Double-click a device card |
| Reset to bird's eye | Press Escape |

### Routing Grid

Toggle to Grid view using the Canvas/Grid switch in the toolbar. This is a standard AV crosspoint matrix with source output ports as rows and destination input ports as columns. Click a cell to create or remove a route. Routes sync bidirectionally with the canvas.

> [!CAUTION]
> Below this point might NOT be the latest information about the mockup
> I'll update this once I've included some more ideas into the mockup and I'm happy with the idea.

### Signal Type Enforcement

Ports are color-coded by signal type. Only compatible types can connect:

| Color | Signal Type |
|---|---|
| Blue | HDMI |
| Orange/Amber | Analog Audio |
| Purple | Digital Audio |
| Cyan | AoIP (AES67/NAX) |
| Teal | Bluetooth |

When dragging a wire, compatible input ports glow and enlarge while incompatible ports dim.

### Troubleshooting Flow

Click any device or wire to trace the signal chain. Then use the ⏻ button on a device to simulate taking it out of order. Downstream wires turn red and dashed, and "NO SIG" badges appear on input ports that lose signal. The trace bar at the top shows how many routes are carrying signal vs. total.

## Devices in the Mockup

The system ("My Home") includes the following rooms and devices:

- **Equipment Room** — DM-NAX-AUD-IO, DM-NAX-AMP-X300
- **Kitchen** — 2× Saros Speaker (DM-NAX-IC4A-W)
- **Living Room** — Apple TV, LG TV, DM-NAX-BTIO-1G
- **Family Room** — Sony TV, Fire TV Cube
- **Office** — Dell Monitor
- **Master Bedroom** — Samsung TV, Sonos Era 300
- **Bedroom 2** — Vizio TV
- **Bedroom 3** — Sonos One (offline)
- **Theater** — Epson Projector, Bose AV Receiver, Fire TV 4K, DM-NAX-BTIO-1G
- **Game Room** — LG TV, PlayStation 5
- **Deck** — Sonos Outdoor
- **Pool** — Polk Audio

Devices and their port definitions are in the `DEVICES` array at the top of `src/App.jsx`.

## Internal DSP View

A separate visualization (`dm-nax-1zsa-dsp.jsx`) shows the internal DSP signal flow for the DM-NAX-1ZSA device. This demonstrates how signal flows through Gain, Mute, the 8×2 Routing Matrix, PEQ, Volume, Delay, and output stages. To run it standalone, replace the App import in `main.jsx`.

## Project Structure

```
src/
  App.jsx          — Main application (canvas, grid, routing, navigation)
  main.jsx         — React entry point
```

## Tech Stack

- React 19 + Vite
- No external UI libraries — all components use inline styles
- SVG for wires, signal flow lines, and indicators
- CSS transforms for canvas zoom/pan

## Modifying Devices and Routes

All data is defined at the top of `src/App.jsx`:

- `DEVICES` — add or modify devices, their rooms, ports, and signal types
- `INITIAL_ROUTES` — pre-configured routes that load on startup
- `ROOM_LAYOUT` — canvas x/y coordinates for room cluster positioning
- `ROOMS_TREE` — room hierarchy for the sidebar tree

## Related Files

- `configure-pro-av-product-capabilities.md` — Product brief and detailed specification
- `configure-pro-av-user-stories.md` — User stories for the full product roadmap
- `1ZSA_DSP.csv` / `X300_DSP.csv` — Device DSP chain specifications
