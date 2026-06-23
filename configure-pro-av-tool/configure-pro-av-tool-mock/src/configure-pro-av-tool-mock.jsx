import { useState, useRef, useCallback, useEffect, useMemo } from "react";

// ═══════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════

const ROOMS_TREE = [
  { id: "whole-system", name: "Whole System", type: "system" },
  { id: "equipment-room", name: ".Equipment Room", type: "room", floor: null },
  {
    id: "1st-floor", name: "1st Floor", type: "floor",
    children: [
      { id: "kitchen", name: "Kitchen" },
      { id: "living-room", name: "Living Room" },
      // { id: "family-room", name: "Family Room" },
      // { id: "office", name: "Office" },
    ]
  },
  // {
  //   id: "2nd-floor", name: "2nd Floor", type: "floor",
  //   children: [
  //     { id: "master-bedroom", name: "Master Bedroom" },
  //     { id: "bedroom-2", name: "Bedroom 2" },
  //     { id: "bedroom-3", name: "Bedroom 3" },
  //   ]
  // },
  // {
  //   id: "basement", name: "Basement", type: "floor",
  //   children: [
  //     { id: "theater", name: "Theater" },
  //     { id: "game-room", name: "Game Room" },
  //   ]
  // },
  // {
  //   id: "outside", name: "Outside", type: "floor",
  //   children: [
  //     { id: "deck", name: "Deck" },
  //     { id: "pool", name: "Pool" },
  //     { id: "front-porch", name: "Front Porch" },
  //   ]
  // },
];

const inp = (id, label, signal) => ({ id, label, signal });
const out = (id, label, signal) => ({ id, label, signal });

const DEVICES = [
  // Equipment Room
  {
    id: "eq-nax-aio", name: "DM-NAX-AUD-IO", model: "DM-NAX-AUD-IO", manufacturer: "Crestron", room: "equipment-room", type: "DSP", status: "Online",
    inputs: [inp("ain1","Analog Line In 1","analog_audio"), inp("ain2","Analog Line In 2","analog_audio"), inp("aoip-i1l","AoIP In 1L","aoip"), inp("aoip-i1r","AoIP In 1R","aoip")],
    outputs: [out("aout1","Analog Line Out 1","analog_audio"), out("aout2","Analog Line Out 2","analog_audio"), out("aoip-o1l","AoIP Out 1L","aoip"), out("aoip-o1r","AoIP Out 1R","aoip")]
  },
  {
    id: "eq-nax-amp", name: "DM-NAX-AMP-X300", model: "DM-NAX-AMP-X300", manufacturer: "Crestron", room: "equipment-room", type: "Amplifier", status: "Online",
    inputs: [inp("ain1","Analog In 1","analog_audio"), inp("ain2","Analog In 2","analog_audio"), inp("ain3","Analog In 3","analog_audio"), inp("ain4","Analog In 4","analog_audio"),
             inp("aoip-i1l","AoIP In 1L","aoip"), inp("aoip-i1r","AoIP In 1R","aoip"), inp("aoip-i2l","AoIP In 2L","aoip"), inp("aoip-i2r","AoIP In 2R","aoip")],
    outputs: [out("amp1","Amp Out 1","analog_audio"), out("amp2","Amp Out 2","analog_audio"), out("amp3","Amp Out 3","analog_audio"), out("amp4","Amp Out 4","analog_audio"),
              out("line1","Line Out 1","analog_audio"), out("line2","Line Out 2","analog_audio"), out("line3","Line Out 3","analog_audio"), out("line4","Line Out 4","analog_audio"),
              out("aoip-o1l","AoIP Out 1L","aoip"), out("aoip-o1r","AoIP Out 1R","aoip"), out("aoip-o2l","AoIP Out 2L","aoip"), out("aoip-o2r","AoIP Out 2R","aoip"),
              out("aoip-o3l","AoIP Out 3L","aoip"), out("aoip-o3r","AoIP Out 3R","aoip"), out("aoip-o4l","AoIP Out 4L","aoip"), out("aoip-o4r","AoIP Out 4R","aoip")]
  },
  // Kitchen
  { id: "k-tv", name: "Samsung TV", model: "Samsung QN65S95D", manufacturer: "Samsung", room: "kitchen", type: "Display", status: "Online",
    inputs: [inp("hdmi1","HDMI 1","hdmi"), inp("hdmi2","HDMI 2","hdmi")],
    outputs: [out("rv1","Room Video 1","hdmi"), out("ra1","Room Audio 1","analog_audio"), out("opt","Optical Out","digital_audio")]
  },
  { id: "k-amp", name: "Sonos Amp", model: "Sonos Amp", manufacturer: "Sonos", room: "kitchen", type: "Amplifier", status: "Online",
    inputs: [inp("line-in","Line In","analog_audio"), inp("hdmi-in","HDMI In","hdmi")],
    outputs: [out("spk-l","Speaker L","analog_audio"), out("spk-r","Speaker R","analog_audio")]
  },
  // Living Room
  { id: "lr-appletv", name: "Apple TV", model: "Apple TV 4K (3rd Gen)", manufacturer: "Apple", room: "living-room", type: "Media Player", status: "Online",
    inputs: [], outputs: [out("hdmi-out","HDMI Out","hdmi"), out("bt-l","Bluetooth Out L","bluetooth"), out("bt-r","Bluetooth Out R","bluetooth")]
  },
  { id: "lr-tv", name: "LG TV", model: "LG OLED77C3", manufacturer: "LG", room: "living-room", type: "Display", status: "Online",
    inputs: [inp("hdmi1","HDMI 1","hdmi"), inp("hdmi2","HDMI 2","hdmi"), inp("hdmi3","HDMI 3 (eARC)","hdmi"), inp("hdmi4","HDMI 4","hdmi")],
    outputs: [out("rv1","Room Video 1","hdmi"), out("ra1","Room Audio 1","analog_audio"), out("opt","Optical Out","digital_audio")]
  },
  { id: "lr-btio", name: "DM-NAX-BTIO-1G", model: "DM-NAX-BTIO-1G", manufacturer: "Crestron", room: "living-room", type: "DSP", status: "Online",
    inputs: [inp("ain1","Analog Line In 1","analog_audio"), inp("ain2","Analog Line In 2","analog_audio"), inp("bt-l","Bluetooth In L","bluetooth"), inp("bt-r","Bluetooth In R","bluetooth"),
             inp("aoip-i1l","AoIP In 1L","aoip"), inp("aoip-i1r","AoIP In 1R","aoip"), inp("aoip-i2l","AoIP In 2L","aoip"), inp("aoip-i2r","AoIP In 2R","aoip")],
    outputs: [out("aout-l","Analog Line Out L","analog_audio"), out("aout-r","Analog Line Out R","analog_audio"), out("usb-l","USB Out L","digital_audio"), out("usb-r","USB Out R","digital_audio"),
              out("aoip-o1l","AoIP Out 1L","aoip"), out("aoip-o1r","AoIP Out 1R","aoip"), out("aoip-o2l","AoIP Out 2L","aoip"), out("aoip-o2r","AoIP Out 2R","aoip")]
  },
  // // Family Room
  // { id: "fr-tv", name: "Sony TV", model: "Sony XR-75X95L", manufacturer: "Sony", room: "family-room", type: "Display", status: "Online",
  //   inputs: [inp("hdmi1","HDMI 1","hdmi"), inp("hdmi2","HDMI 2","hdmi")],
  //   outputs: [out("rv1","Room Video 1","hdmi"), out("opt","Optical Out","digital_audio")]
  // },
  // { id: "fr-firetv", name: "Fire TV Cube", model: "Fire TV Cube (3rd Gen)", manufacturer: "Amazon", room: "family-room", type: "Media Player", status: "Online",
  //   inputs: [], outputs: [out("hdmi-out","HDMI Out","hdmi")]
  // },
  // // Office
  // { id: "of-display", name: "Dell Monitor", model: "Dell U3223QE", manufacturer: "Dell", room: "office", type: "Display", status: "Online",
  //   inputs: [inp("hdmi1","HDMI 1","hdmi"), inp("usb-c","USB-C","hdmi")],
  //   outputs: [out("dp-out","DP Out","hdmi")]
  // },
  // // Master Bedroom
  // { id: "mb-tv", name: "Samsung TV", model: "Samsung QN55S90C", manufacturer: "Samsung", room: "master-bedroom", type: "Display", status: "Online",
  //   inputs: [inp("hdmi1","HDMI 1","hdmi"), inp("hdmi2","HDMI 2","hdmi")],
  //   outputs: [out("rv1","Room Video 1","hdmi"), out("opt","Optical Out","digital_audio")]
  // },
  // { id: "mb-sonos", name: "Sonos Era 300", model: "Sonos Era 300", manufacturer: "Sonos", room: "master-bedroom", type: "Speaker", status: "Online",
  //   inputs: [inp("line-in","Line In","analog_audio"), inp("wifi","WiFi In","aoip")],
  //   outputs: [out("spk-l","Speaker L","analog_audio"), out("spk-r","Speaker R","analog_audio")]
  // },
  // // Bedroom 2
  // { id: "b2-tv", name: "Vizio TV", model: "Vizio M-Series 4K", manufacturer: "Vizio", room: "bedroom-2", type: "Display", status: "Online",
  //   inputs: [inp("hdmi1","HDMI 1","hdmi")], outputs: [out("opt","Optical Out","digital_audio")]
  // },
  // // Bedroom 3
  // { id: "b3-spk", name: "Sonos One", model: "Sonos One SL", manufacturer: "Sonos", room: "bedroom-3", type: "Speaker", status: "Offline",
  //   inputs: [inp("wifi","WiFi In","aoip")], outputs: []
  // },
  // // Theater
  // { id: "th-proj", name: "Epson Projector", model: "Epson LS800", manufacturer: "Epson", room: "theater", type: "Projector", status: "Online",
  //   inputs: [inp("hdmi1","HDMI 1","hdmi"), inp("hdmi2","HDMI 2","hdmi")], outputs: []
  // },
  // { id: "th-receiver", name: "Bose AV Receiver", model: "Lifestyle 235", manufacturer: "Bose", room: "theater", type: "AV Receiver", status: "Online",
  //   inputs: [inp("hdmi1","HDMI 1","hdmi"), inp("hdmi2","HDMI 2","hdmi"), inp("opt","Optical In","digital_audio"), inp("ain","Analog In","analog_audio")],
  //   outputs: [out("hdmi-out","HDMI Out","hdmi"), out("zone1","Zone 1 Out","analog_audio"), out("zone2","Zone 2 Out","analog_audio")]
  // },
  // { id: "th-appletv", name: "Apple TV 4K", model: "Apple TV 4K (3rd Gen)", manufacturer: "Apple", room: "theater", type: "Media Player", status: "Online",
  //   inputs: [], outputs: [out("hdmi-out","HDMI Out","hdmi")]
  // },
  // { id: "th-btio", name: "DM-NAX-BTIO-1G", model: "DM-NAX-BTIO-1G", manufacturer: "Crestron", room: "theater", type: "DSP", status: "Online",
  //   inputs: [inp("ain1","Analog Line In 1","analog_audio"), inp("ain2","Analog Line In 2","analog_audio"), inp("bt-l","Bluetooth In L","bluetooth"), inp("bt-r","Bluetooth In R","bluetooth"),
  //            inp("aoip-i1l","AoIP In 1L","aoip"), inp("aoip-i1r","AoIP In 1R","aoip"), inp("aoip-i2l","AoIP In 2L","aoip"), inp("aoip-i2r","AoIP In 2R","aoip")],
  //   outputs: [out("aout-l","Analog Line Out L","analog_audio"), out("aout-r","Analog Line Out R","analog_audio"), out("usb-l","USB Out L","digital_audio"), out("usb-r","USB Out R","digital_audio"),
  //             out("aoip-o1l","AoIP Out 1L","aoip"), out("aoip-o1r","AoIP Out 1R","aoip"), out("aoip-o2l","AoIP Out 2L","aoip"), out("aoip-o2r","AoIP Out 2R","aoip")]
  // },
  // { id: "th-screen", name: "Screen Innovations", model: "SI Solo Pro 2", manufacturer: "Screen Innovations", room: "theater", type: "Shade", status: "Online",
  //   inputs: [], outputs: []
  // },
  // // Game Room
  // { id: "gr-tv", name: "LG TV", model: "LG OLED55G3", manufacturer: "LG", room: "game-room", type: "Display", status: "Online",
  //   inputs: [inp("hdmi1","HDMI 1","hdmi"), inp("hdmi2","HDMI 2","hdmi")],
  //   outputs: [out("rv1","Room Video 1","hdmi"), out("opt","Optical Out","digital_audio")]
  // },
  // { id: "gr-ps5", name: "PlayStation 5", model: "Sony PlayStation 5", manufacturer: "Sony", room: "game-room", type: "Media Player", status: "Online",
  //   inputs: [], outputs: [out("hdmi-out","HDMI Out","hdmi")]
  // },
  // // Outside
  // { id: "dk-spk", name: "Sonos Outdoor", model: "Sonos Outdoor", manufacturer: "Sonos", room: "deck", type: "Speaker", status: "Online",
  //   inputs: [inp("wifi","WiFi In","aoip")], outputs: []
  // },
  // { id: "pl-spk", name: "Polk Audio", model: "Polk Atrium 6", manufacturer: "Polk Audio", room: "pool", type: "Speaker", status: "Online",
  //   inputs: [inp("wire","Speaker Wire In","analog_audio")], outputs: []
  // },
];

const INITIAL_ROUTES = [
  { id: "r1", fromDevice: "lr-appletv", fromPort: "hdmi-out", toDevice: "lr-tv", toPort: "hdmi1", signalType: "hdmi" },
  //{ id: "r3", fromDevice: "th-appletv", fromPort: "hdmi-out", toDevice: "th-receiver", toPort: "hdmi1", signalType: "hdmi" },
  //{ id: "r4", fromDevice: "th-receiver", fromPort: "hdmi-out", toDevice: "th-proj", toPort: "hdmi1", signalType: "hdmi" },
  //{ id: "r5", fromDevice: "gr-ps5", fromPort: "hdmi-out", toDevice: "gr-tv", toPort: "hdmi1", signalType: "hdmi" },
  //{ id: "r6", fromDevice: "fr-firetv", fromPort: "hdmi-out", toDevice: "fr-tv", toPort: "hdmi1", signalType: "hdmi" },
  { id: "r7", fromDevice: "eq-nax-aio", fromPort: "aoip-o1l", toDevice: "eq-nax-amp", toPort: "aoip-i1l", signalType: "aoip" },
  { id: "r8", fromDevice: "eq-nax-aio", fromPort: "aoip-o1r", toDevice: "eq-nax-amp", toPort: "aoip-i1r", signalType: "aoip" },
  { id: "r9", fromDevice: "lr-btio", fromPort: "aoip-o1l", toDevice: "eq-nax-amp", toPort: "aoip-i2l", signalType: "aoip" },
  { id: "r10", fromDevice: "lr-btio", fromPort: "aoip-o1r", toDevice: "eq-nax-amp", toPort: "aoip-i2r", signalType: "aoip" },
];

// Room clusters for canvas layout — generous spacing between rooms
const ROOM_LAYOUT = {
  "equipment-room": { x: 500, y: 40, label: "Equipment Room" },
  "kitchen": { x: 700, y: 700, label: "Kitchen" },
  "living-room": { x: 0, y: 700, label: "Living Room" },
  // "family-room": { x: 700, y: 1200, label: "Family Room" },
  // "office": { x: 700, y: 1650, label: "Office" },
  // "master-bedroom": { x: 1400, y: 40, label: "Master Bedroom" },
  // "bedroom-2": { x: 1400, y: 480, label: "Bedroom 2" },
  // "bedroom-3": { x: 1400, y: 760, label: "Bedroom 3" },
  // "theater": { x: 1400, y: 1040, label: "Theater" },
  // "game-room": { x: 1400, y: 1700, label: "Game Room" },
  // "deck": { x: 2100, y: 40, label: "Deck" },
  // "pool": { x: 2100, y: 340, label: "Pool" },
  // "front-porch": { x: 2100, y: 640, label: "Front Porch" },
};

function buildDevicePositions() {
  const pos = {};
  const roomDevices = {};
  DEVICES.forEach(d => {
    if (!roomDevices[d.room]) roomDevices[d.room] = [];
    roomDevices[d.room].push(d);
  });
  Object.entries(roomDevices).forEach(([room, devs]) => {
    const rl = ROOM_LAYOUT[room] || { x: 0, y: 0 };
    devs.forEach((dev, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const h = cardHeight(dev);
      pos[dev.id] = { x: rl.x + 24 + col * 280, y: rl.y + 40 + row * (h + 30) };
    });
  });
  return pos;
}

const SIGNAL_COLORS = { hdmi: "#3b82f6", analog_audio: "#f59e0b", digital_audio: "#8b5cf6", aoip: "#0ea5e9", voip: "#6366f1", bluetooth: "#06b6d4" };
const SIGNAL_LABELS = { hdmi: "HDMI", analog_audio: "Analog", digital_audio: "Digital", aoip: "AoIP", voip: "VoIP", bluetooth: "BT" };

// Signal compatibility — only matching types can connect
function signalsCompatible(sigA, sigB) {
  if (!sigA || !sigB) return false;
  return sigA === sigB;
}

const CARD_W = 240;
const PORT_H = 26;
const HEADER_H = 48; // box-sizing: border-box — includes padding + border
const CARD_PAD = 8;

function cardHeight(dev) {
  const n = Math.max(dev.inputs.length, dev.outputs.length, 1);
  return HEADER_H + n * PORT_H + CARD_PAD * 2;
}

function portY(dev, portId, side) {
  const ports = side === "input" ? dev.inputs : dev.outputs;
  const idx = ports.findIndex(p => p.id === portId);
  if (idx < 0) return HEADER_H + CARD_PAD;
  return HEADER_H + CARD_PAD + idx * PORT_H + PORT_H / 2;
}

function allRooms() {
  const rooms = [];
  ROOMS_TREE.forEach(n => {
    if (n.type === "room") rooms.push({ id: n.id, name: n.name });
    if (n.children) n.children.forEach(c => rooms.push({ id: c.id, name: c.name }));
  });
  return rooms;
}

function devicesInRoom(roomId) { return DEVICES.filter(d => d.room === roomId); }
function devicesInFloor(floorId) {
  const floor = ROOMS_TREE.find(n => n.id === floorId);
  if (!floor?.children) return [];
  return floor.children.flatMap(c => devicesInRoom(c.id));
}
function deviceById(id) { return DEVICES.find(d => d.id === id); }

// Signal presence helpers — used for live meter mockup
function portHasSignal(routes, devId, portId, side) {
  if (side === "input") return routes.some(r => r.toDevice === devId && r.toPort === portId);
  return routes.some(r => r.fromDevice === devId && r.fromPort === portId);
}
function deviceSignalStatus(routes, devId) {
  const hasInput = routes.some(r => r.toDevice === devId);
  const hasOutput = routes.some(r => r.fromDevice === devId);
  if (hasInput && hasOutput) return "passing"; // signal flowing through
  if (hasInput || hasOutput) return "endpoint"; // source or destination
  return "idle";
}

// ═══════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════

export default function App() {
  const [screen, setScreen] = useState("home");
  const navigate = (s) => setScreen(s);

  if (screen === "home") return <HomeScreen onNav={navigate} />;
  if (screen === "systems") return <SystemsScreen onNav={navigate} />;
  return <MainApp onNav={navigate} />;
}

// ═══════════════════════════════════════════════════════════════════
// HOME SCREEN
// ═══════════════════════════════════════════════════════════════════

function HomeScreen({ onNav }) {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "#eeeef3", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg,#3ab5f0,#0073CF)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 20 }}>P</div>
        <span style={{ fontSize: 26, fontWeight: 700 }}>Configure Pro</span>
      </div>
      <p style={{ color: "#6e6e73", fontSize: 14, marginBottom: 6 }}>Welcome to the Configure Pro experience</p>
      <p style={{ color: "#8e8e93", fontSize: 13, maxWidth: 380, textAlign: "center", lineHeight: 1.5, marginBottom: 40 }}>To get started, choose one of the options below to find your Crestron hardware or connect an existing system</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 340 }}>
        <button onClick={() => onNav("systems")} style={{ background: "#0073CF", color: "#fff", border: "none", borderRadius: 10, padding: "14px 20px", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>Systems</button>
        <button style={{ background: "#fff", border: "1px solid #d1d1d6", borderRadius: 10, padding: "14px 20px", fontSize: 16, cursor: "pointer" }}>Auto-Discover</button>
        <button style={{ background: "#fff", border: "1px solid #d1d1d6", borderRadius: 10, padding: "14px 20px", fontSize: 16, cursor: "pointer" }}>Add Manually</button>
      </div>
    </div>
  );
}

function SystemsScreen({ onNav }) {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "#eeeef3", fontFamily: "system-ui, -apple-system, sans-serif", overflowY: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "14px 20px", gap: 12, borderBottom: "1px solid #d1d1d6" }}>
        <button onClick={() => onNav("home")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20 }}>⌂</button>
        <h1 style={{ fontSize: 22, fontWeight: 700, flex: 1, margin: 0 }}>Systems</h1>
      </div>
      <p style={{ color: "#6e6e73", padding: "10px 20px", fontSize: 14 }}>Edit or select your systems below.</p>
      <div style={{ padding: "0 16px" }}>
        <div onClick={() => onNav("main")} style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e5ea", padding: "16px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16 }}
          onMouseEnter={e => e.currentTarget.style.background = "#f5f5f7"} onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
          <div style={{ width: 48, height: 36, borderRadius: 6, background: "#eeeef3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🏠</div>
          <div>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>My Home</p>
            <p style={{ margin: "2px 0 0", fontSize: 13, color: "#8e8e93" }}>DIN-AP4-R-C442681A557D</p>
            <p style={{ margin: "2px 0 0", fontSize: 13, color: "#0073CF" }}>Select to connect</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN 3-PANEL APP
// ═══════════════════════════════════════════════════════════════════

function MainApp({ onNav }) {
  const [tab, setTab] = useState("routing");
  const [sel, setSel] = useState({ id: "whole-system", type: "system", name: "Whole System" });
  const [expanded, setExpanded] = useState({ "1st-floor": true, "basement": true });
  const [routes, setRoutes] = useState(INITIAL_ROUTES);
  const [positions, setPositions] = useState(buildDevicePositions);
  const [routingView, setRoutingView] = useState("canvas"); // "canvas" | "grid"

  const addRoute = useCallback((fromDev, fromPort, toDev, toPort, sigType) => {
    setRoutes(prev => {
      const filtered = prev.filter(r => !(r.toDevice === toDev && r.toPort === toPort));
      return [...filtered, { id: `r${Date.now()}`, fromDevice: fromDev, fromPort, toDevice: toDev, toPort, signalType: sigType }];
    });
  }, []);

  const removeRoute = useCallback((routeId) => {
    setRoutes(prev => prev.filter(r => r.id !== routeId));
  }, []);

  const removeRouteByTarget = useCallback((toDev, toPort) => {
    setRoutes(prev => prev.filter(r => !(r.toDevice === toDev && r.toPort === toPort)));
  }, []);

  const toggleFloor = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  // Icon components — pass color to match active/inactive state
  const NavIcons = {
    rooms: (c) => (
     <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_34497_17754)">
<path d="M13 22.1037H21M3 22.1037H5.5M5.5 22.1037L13 23.1318V1.54199L5.5 4.1122V22.1037ZM18.5 22.1037V4.1122H13M10.5 12.3369V15.4211" stroke="black" stroke-width="2" stroke-linecap="round"/>
</g>
<defs>
<clipPath id="clip0_34497_17754">
<rect width="24" height="24.674" fill="white"/>
</clipPath>
</defs>
</svg>
    ),
    devices: (c) => (
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.2429 4.89071C18.586 7.29966 18.586 11.2053 16.2429 13.6143M7.75758 13.6143C5.41444 11.2053 5.41443 7.29966 7.75758 4.89071M4.85853 16.4491C1.02383 12.4287 1.0473 5.97356 4.92893 1.98291M19.0715 1.98291C22.9531 5.97356 22.9766 12.4287 19.1419 16.4491M12.0002 16.4491V9.25254M5.00022 22.6176H19.0002C19.9321 22.6176 20.398 22.6176 20.7656 22.4611C21.2556 22.2524 21.645 21.8521 21.848 21.3483C22.0002 20.9705 22.0002 20.4914 22.0002 19.5334C22.0002 18.5753 22.0002 18.0963 21.848 17.7184C21.645 17.2146 21.2556 16.8143 20.7656 16.6056C20.398 16.4491 19.9321 16.4491 19.0002 16.4491H5.00022C4.06834 16.4491 3.6024 16.4491 3.23485 16.6056C2.7448 16.8143 2.35545 17.2146 2.15246 17.7184C2.00022 18.0963 2.00022 18.5753 2.00022 19.5334C2.00022 20.4914 2.00022 20.9705 2.15246 21.3483C2.35545 21.8521 2.7448 22.2524 3.23485 22.4611C3.6024 22.6176 4.06834 22.6176 5.00022 22.6176Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    ),
    routing: (c) => (
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.5 5.14041H11.9344C14.9816 5.14041 16.5053 5.14041 17.0836 5.70306C17.5836 6.18943 17.8051 6.90592 17.6702 7.5998C17.514 8.40253 16.2701 9.30708 13.7823 11.1162L9.71772 14.0719C7.2299 15.8809 5.98599 16.7855 5.82984 17.5882C5.69486 18.2821 5.91642 18.9986 6.41636 19.485C6.99474 20.0476 8.51836 20.0476 11.5656 20.0476H12.5M8 5.14041C8 6.84379 6.65685 8.22466 5 8.22466C3.34315 8.22466 2 6.84379 2 5.14041C2 3.43702 3.34315 2.05615 5 2.05615C6.65685 2.05615 8 3.43702 8 5.14041ZM22 19.5336C22 21.237 20.6569 22.6178 19 22.6178C17.3431 22.6178 16 21.237 16 19.5336C16 17.8302 17.3431 16.4493 19 16.4493C20.6569 16.4493 22 17.8302 22 19.5336Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    ),
    scenes: (c) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l2.09 6.26L20.18 9l-5.09 3.74L17.18 19 12 15.27 6.82 19l2.09-6.26L3.82 9l6.09-.74L12 2z" stroke={c} strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
    actions: (c) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    schedules: (c) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke={c} strokeWidth="2"/>
        <path d="M16 2v4M8 2v4M3 10h18" stroke={c} strokeWidth="2" strokeLinecap="round"/>
        <rect x="7" y="14" width="4" height="4" rx="0.5" fill={c}/>
      </svg>
    ),
  };

  // Drop the icon field from navItems — the id is the lookup key
  const navItems = [
    { id: "rooms", label: "Rooms" },
    { id: "devices", label: "Devices" },
    { id: "routing", label: "Routing" },
    { id: "scenes", label: "Scenes" },
    { id: "actions", label: "Actions" },
    { id: "schedules", label: "Schedules" },
  ];

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, display: "flex", fontFamily: "system-ui, -apple-system, sans-serif", background: "#eeeef3", overflow: "hidden" }}>
      {/* NAV PANEL */}
      <div style={{ width: 160, background: "#fff", borderRight: "1px solid #e5e5ea", display: "flex", flexDirection: "column", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <div style={{ padding: "12px 14px", borderBottom: "1px solid #e5e5ea", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: 5, background: "linear-gradient(135deg,#3ab5f0,#0073CF)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 700 }}>P</div>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Configure Pro</span>
          </div>
          <button onClick={() => onNav("systems")} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 14px", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#1c1c1e" }}>⌂ Home</button>
          <div style={{ padding: "8px 14px 2px", fontSize: 10, fontWeight: 700, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.08em" }}>Setup</div>
          {navItems.map(item => {
            const active = tab === item.id;
            const clickable = ["rooms", "devices", "routing"].includes(item.id);
            const iconColor = active ? "#0073CF" : "#8e8e93";
            return (
              <button key={item.id} onClick={() => clickable && setTab(item.id)}
                style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "7px 14px", background: active ? "rgba(0,115,207,0.06)" : "none", border: "none",
                  borderLeft: active ? "2.5px solid #0073CF" : "2.5px solid transparent", cursor: clickable ? "pointer" : "default", color: active ? "#0073CF" : "#1c1c1e", opacity: clickable ? 1 : 0.35, fontSize: 13, fontWeight: active ? 600 : 400 }}>
                {NavIcons[item.id]?.(iconColor)}
                {item.label}
              </button>
            );
          })}
        </div>
        <button style={{ padding: "10px 14px", borderTop: "1px solid #e5e5ea", background: "none", border: "none", cursor: "pointer", color: "#0073CF", fontSize: 13, display: "flex", alignItems: "center", gap: 8, width: "100%", borderTopWidth: 1, borderTopStyle: "solid", borderTopColor: "#e5e5ea" }}>⚙ Settings</button>
      </div>

      {/* TREE PANEL */}
      <TreePanel tab={tab} sel={sel} setSel={setSel} expanded={expanded} toggleFloor={toggleFloor} routes={routes} />

      {/* CONTENT PANEL */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {tab === "routing" && (
          <div style={{ padding: "8px 16px", background: "#fff", borderBottom: "1px solid #e5e5ea", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{sel.name} — Routing</span>
            <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: "1px solid #d1d1d6" }}>
              {["canvas", "grid"].map(v => (
                <button key={v} onClick={() => setRoutingView(v)}
                  style={{ padding: "4px 14px", fontSize: 12, border: "none", cursor: "pointer", background: routingView === v ? "#0073CF" : "#fff", color: routingView === v ? "#fff" : "#555", fontWeight: 500 }}>
                  {v === "canvas" ? "Canvas" : "Grid"}
                </button>
              ))}
            </div>
          </div>
        )}
        {tab === "routing" ? (
          sel.type === "device" ? (
            <DeviceRoutingPanel device={deviceById(sel.id)} routes={routes} addRoute={addRoute} removeRouteByTarget={removeRouteByTarget} />
          ) : routingView === "canvas" ? (
            <RoutingCanvas sel={sel} routes={routes} addRoute={addRoute} removeRoute={removeRoute} positions={positions} setPositions={setPositions} setSel={setSel} />
          ) : (
            <RoutingGrid sel={sel} routes={routes} addRoute={addRoute} removeRouteByTarget={removeRouteByTarget} />
          )
        ) : tab === "devices" && sel.type === "device" ? (
          <DeviceDetailPanel device={deviceById(sel.id)} />
        ) : (
          <GenericPanel tab={tab} sel={sel} />
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TREE PANEL
// ═══════════════════════════════════════════════════════════════════

function TreePanel({ tab, sel, setSel, expanded, toggleFloor, routes }) {
  const showDevices = tab === "devices" || tab === "routing";
  const [expandedRooms, setExpandedRooms] = useState({});
  const toggleRoom = (id) => setExpandedRooms(p => ({ ...p, [id]: !p[id] }));
  const isRoomExpanded = (id) => expandedRooms[id] !== false; // default open
  return (
    <div style={{ width: 230, background: "#fff", borderRight: "1px solid #e5e5ea", display: "flex", flexDirection: "column", flexShrink: 0, overflow: "hidden" }}>
      <div style={{ padding: "12px 14px 8px", borderBottom: "1px solid #e5e5ea" }}>
        <span style={{ fontSize: 14, fontWeight: 700 }}>My Home</span>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 8px", background: "#eeeef3", borderRadius: 7, marginTop: 8 }}>
          <span style={{ fontSize: 12, color: "#8e8e93" }}>🔍</span>
          <input readOnly placeholder="Search" style={{ border: "none", background: "none", outline: "none", fontSize: 12, width: "100%" }} />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "4px 6px" }}>
        {ROOMS_TREE.map(node => {
          if (node.type === "system") {
            const isSel = sel.id === node.id;
            return (
              <div key={node.id} onClick={() => setSel({ id: node.id, type: "system", name: node.name })}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 8px", borderRadius: 7, cursor: "pointer", background: isSel ? "#0073CF" : "transparent", color: isSel ? "#fff" : "#1c1c1e", fontWeight: 600, fontSize: 13, marginBottom: 1 }}
                onMouseEnter={e => !isSel && (e.currentTarget.style.background = "#eeeef3")} onMouseLeave={e => !isSel && (e.currentTarget.style.background = "transparent")}>
                🏢 {node.name}
              </div>
            );
          }
          if (node.type === "room") {
            const isSel2 = sel.id === node.id;
            const devCount = devicesInRoom(node.id).length;
            const roomDevs = devicesInRoom(node.id);
            const isRExp = isRoomExpanded(node.id);
            return (
              <div key={node.id}>
                <div onClick={() => setSel({ id: node.id, type: "room", name: node.name })}
                  style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 8px 6px 12px", borderRadius: 7, cursor: "pointer", background: isSel2 ? "#0073CF" : "transparent", color: isSel2 ? "#fff" : "#1c1c1e", fontSize: 13, marginBottom: 1 }}
                  onMouseEnter={e => !isSel2 && (e.currentTarget.style.background = "#eeeef3")} onMouseLeave={e => !isSel2 && (e.currentTarget.style.background = "transparent")}>
                  {showDevices && devCount > 0 && (
                    <span onClick={(e) => { e.stopPropagation(); toggleRoom(node.id); }} style={{ fontSize: 10, padding: "0 2px", cursor: "pointer" }}>{isRExp ? "▼" : "▶"}</span>
                  )}
                  <span>🏠</span> <span style={{ flex: 1 }}>{node.name}</span>
                  {devCount > 0 && <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 10, background: isSel2 ? "rgba(255,255,255,0.25)" : "#e5e5ea", color: isSel2 ? "#fff" : "#8e8e93" }}>{devCount}</span>}
                </div>
                {showDevices && isRExp && roomDevs.map(dev => {
                  const isDSel = sel.id === dev.id;
                  return (
                    <div key={dev.id} onClick={(e) => { e.stopPropagation(); setSel({ id: dev.id, type: "device", name: dev.name, device: dev }); }}
                      style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 8px 4px 36px", borderRadius: 7, cursor: "pointer", background: isDSel ? "#0073CF" : "transparent", color: isDSel ? "#fff" : "#1c1c1e", fontSize: 12, marginBottom: 1 }}
                      onMouseEnter={e => !isDSel && (e.currentTarget.style.background = "#eeeef3")} onMouseLeave={e => !isDSel && (e.currentTarget.style.background = "transparent")}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: dev.status === "Online" ? "#34c759" : "#ff3b30", flexShrink: 0 }} />
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{dev.name}</span>
                    </div>
                  );
                })}
              </div>
            );
          }
          if (node.type === "floor") {
            const isExp = expanded[node.id];
            const isSel3 = sel.id === node.id;
            const floorDevCount = devicesInFloor(node.id).length;
            return (
              <div key={node.id}>
                <div onClick={() => { setSel({ id: node.id, type: "floor", name: node.name }); toggleFloor(node.id); }}
                  style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 8px", borderRadius: 7, cursor: "pointer", background: isSel3 ? "#0073CF" : "transparent", color: isSel3 ? "#fff" : "#1c1c1e", fontSize: 13, marginBottom: 1 }}
                  onMouseEnter={e => !isSel3 && (e.currentTarget.style.background = "#eeeef3")} onMouseLeave={e => !isSel3 && (e.currentTarget.style.background = "transparent")}>
                  <span style={{ fontSize: 10 }}>{isExp ? "▼" : "▶"}</span>
                  <span>📂</span> <span style={{ flex: 1, fontWeight: 500 }}>{node.name}</span>
                  {floorDevCount > 0 && <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 10, background: isSel3 ? "rgba(255,255,255,0.25)" : "#e5e5ea", color: isSel3 ? "#fff" : "#8e8e93" }}>{floorDevCount}</span>}
                </div>
                {isExp && node.children.map(room => {
                  const isRSel = sel.id === room.id;
                  const rDevCount = devicesInRoom(room.id).length;
                  const roomDevs = devicesInRoom(room.id);
                  const isRExp = isRoomExpanded(room.id);
                  return (
                    <div key={room.id}>
                      <div onClick={() => setSel({ id: room.id, type: "room", name: room.name })}
                        style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 8px 5px 24px", borderRadius: 7, cursor: "pointer", background: isRSel ? "#0073CF" : "transparent", color: isRSel ? "#fff" : "#1c1c1e", fontSize: 12.5, marginBottom: 1 }}
                        onMouseEnter={e => !isRSel && (e.currentTarget.style.background = "#eeeef3")} onMouseLeave={e => !isRSel && (e.currentTarget.style.background = "transparent")}>
                        {showDevices && rDevCount > 0 ? (
                          <span onClick={(e) => { e.stopPropagation(); toggleRoom(room.id); }} style={{ fontSize: 10, padding: "0 2px", cursor: "pointer" }}>{isRExp ? "▼" : "▶"}</span>
                        ) : <span style={{ width: 14 }} />}
                        <span style={{ fontSize: 12 }}>🏠</span>
                        <span style={{ flex: 1 }}>{room.name}</span>
                        {rDevCount > 0 && <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 10, background: isRSel ? "rgba(255,255,255,0.25)" : "#e5e5ea", color: isRSel ? "#fff" : "#8e8e93" }}>{rDevCount}</span>}
                      </div>
                      {showDevices && isRExp && roomDevs.map(dev => {
                        const isDSel = sel.id === dev.id;
                        return (
                          <div key={dev.id} onClick={(e) => { e.stopPropagation(); setSel({ id: dev.id, type: "device", name: dev.name, device: dev }); }}
                            style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 8px 4px 50px", borderRadius: 7, cursor: "pointer", background: isDSel ? "#0073CF" : "transparent", color: isDSel ? "#fff" : "#1c1c1e", fontSize: 12, marginBottom: 1 }}
                            onMouseEnter={e => !isDSel && (e.currentTarget.style.background = "#eeeef3")} onMouseLeave={e => !isDSel && (e.currentTarget.style.background = "transparent")}>
                            <div style={{ width: 5, height: 5, borderRadius: "50%", background: dev.status === "Online" ? "#34c759" : "#ff3b30", flexShrink: 0 }} />
                            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{dev.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ROUTING CANVAS
// ═══════════════════════════════════════════════════════════════════

function RoutingCanvas({ sel, routes, addRoute, removeRoute, positions, setPositions, setSel }) {
  const containerRef = useRef(null);
  const [vp, setVp] = useState({ x: 0, y: 0, z: 0.45 });
  const [dragging, setDragging] = useState(null);
  const [wirePreview, setWirePreview] = useState(null);
  const [selectedDev, setSelectedDev] = useState(null);
  const [tracedChain, setTracedChain] = useState(null);
  const [outOfOrder, setOutOfOrder] = useState(new Set()); // devices taken offline for testing

  const toggleOutOfOrder = useCallback((devId) => {
    setOutOfOrder(prev => {
      const next = new Set(prev);
      if (next.has(devId)) next.delete(devId); else next.add(devId);
      return next;
    });
  }, []);

  // Signal-flow-aware tracing: walk the chain, compute where signal actually flows
  const buildTrace = useCallback((startRouteIds) => {
    // Step 1: find all connected routes in the chain
    const allRouteIds = new Set();
    const allDeviceIds = new Set();
    const queue = [...startRouteIds];
    while (queue.length > 0) {
      const rid = queue.pop();
      if (allRouteIds.has(rid)) continue;
      const r = routes.find(rt => rt.id === rid);
      if (!r) continue;
      allRouteIds.add(rid);
      allDeviceIds.add(r.fromDevice);
      allDeviceIds.add(r.toDevice);
      routes.filter(rt => rt.fromDevice === r.toDevice && !allRouteIds.has(rt.id)).forEach(rt => queue.push(rt.id));
      routes.filter(rt => rt.toDevice === r.fromDevice && !allRouteIds.has(rt.id)).forEach(rt => queue.push(rt.id));
    }

    // Step 2: propagate signal flow through the chain
    // A device outputs signal if: it's NOT out of order, AND (it's a source OR has signal on at least one chain input)
    const chainRoutes = routes.filter(r => allRouteIds.has(r.id));
    const deviceHasSignalOut = new Set(); // devices that are outputting signal
    const signalRouteIds = new Set(); // routes carrying signal
    const noSignalPorts = []; // {devId, portId} — input ports expecting signal but not getting it

    // Find chain sources: devices whose inputs are NOT fed by any chain route
    const devicesWithChainInput = new Set(chainRoutes.map(r => r.toDevice));
    const sourceDevs = [...allDeviceIds].filter(d => !devicesWithChainInput.has(d));

    // Initialize sources
    sourceDevs.forEach(d => {
      if (!outOfOrder.has(d)) deviceHasSignalOut.add(d);
    });

    // Iterative propagation (handles chains of any length)
    let changed = true;
    let iterations = 0;
    while (changed && iterations < 20) {
      changed = false;
      iterations++;
      chainRoutes.forEach(r => {
        if (signalRouteIds.has(r.id)) return;
        if (deviceHasSignalOut.has(r.fromDevice)) {
          signalRouteIds.add(r.id);
          changed = true;
          // Does the destination device now have signal and can output?
          if (!outOfOrder.has(r.toDevice) && !deviceHasSignalOut.has(r.toDevice)) {
            deviceHasSignalOut.add(r.toDevice);
            changed = true;
          }
        }
      });
    }

    // Step 3: find "no signal detected" ports — input ports with a chain route but no signal
    chainRoutes.forEach(r => {
      if (!signalRouteIds.has(r.id)) {
        noSignalPorts.push({ devId: r.toDevice, portId: r.toPort });
      }
    });

    setTracedChain({ routeIds: allRouteIds, deviceIds: allDeviceIds, signalRouteIds, noSignalPorts });
  }, [routes, outOfOrder]);

  const traceFromRoute = useCallback((routeId) => buildTrace([routeId]), [buildTrace]);
  const traceFromDevice = useCallback((devId) => {
    const devRoutes = routes.filter(r => r.fromDevice === devId || r.toDevice === devId);
    if (devRoutes.length === 0) {
      setTracedChain({ routeIds: new Set(), deviceIds: new Set([devId]), signalRouteIds: new Set(), noSignalPorts: [] });
      return;
    }
    buildTrace(devRoutes.map(r => r.id));
  }, [routes, buildTrace]);

  // Re-run trace when outOfOrder changes (if currently tracing)
  useEffect(() => {
    if (!tracedChain) return;
    const rids = [...tracedChain.routeIds];
    if (rids.length > 0) buildTrace(rids);
  }, [outOfOrder]);

  const visibleDevices = useMemo(() => {
    if (sel.type === "system") return DEVICES;
    if (sel.type === "floor") return devicesInFloor(sel.id);
    if (sel.type === "room") return devicesInRoom(sel.id);
    return DEVICES;
  }, [sel]);

  // Zoom to fit selection — only on explicit tree selection changes, not device moves
  const lastZoomSelRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current) return;
    if (lastZoomSelRef.current === sel.id) return; // already zoomed for this selection
    lastZoomSelRef.current = sel.id;
    const rect = containerRef.current.getBoundingClientRect();
    const devs = sel.type === "system" ? DEVICES : sel.type === "floor" ? devicesInFloor(sel.id) : sel.type === "room" ? devicesInRoom(sel.id) : sel.type === "device" ? [deviceById(sel.id)].filter(Boolean) : DEVICES;
    if (devs.length === 0) return;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    devs.forEach(d => {
      const p = positions[d.id] || { x: 0, y: 0 };
      const h = cardHeight(d);
      minX = Math.min(minX, p.x); minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x + CARD_W); maxY = Math.max(maxY, p.y + h);
    });
    const pad = 80;
    minX -= pad; minY -= pad; maxX += pad; maxY += pad;
    const w = maxX - minX, h = maxY - minY;
    const zx = rect.width / w, zy = rect.height / h;
    const z = Math.min(zx, zy, 1.2);
    const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
    setVp({ x: rect.width / 2 - cx * z, y: rect.height / 2 - cy * z, z });
  }, [sel.id]);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const factor = e.deltaY < 0 ? 1.08 : 1 / 1.08;
    setVp(prev => {
      const nz = Math.max(0.1, Math.min(3, prev.z * factor));
      return { x: mx - (mx - prev.x) * (nz / prev.z), y: my - (my - prev.y) * (nz / prev.z), z: nz };
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  const toCanvas = (clientX, clientY) => {
    const rect = containerRef.current.getBoundingClientRect();
    return { x: (clientX - rect.left - vp.x) / vp.z, y: (clientY - rect.top - vp.y) / vp.z };
  };

  const onPointerDown = (e) => {
    if (e.target === containerRef.current || e.target.tagName === "svg" || e.target.classList.contains("canvas-bg")) {
      setDragging({ type: "pan", sx: e.clientX, sy: e.clientY, ox: vp.x, oy: vp.y });
      setSelectedDev(null);
      setTracedChain(null);
    }
  };

  // Escape key resets to whole-system view
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setTracedChain(null);
        setSelectedDev(null);
        setSel({ id: "whole-system", type: "system", name: "Whole System" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSel]);

  const onPointerMove = (e) => {
    if (!dragging) { if (wirePreview) { const c = toCanvas(e.clientX, e.clientY); setWirePreview(p => ({ ...p, mx: c.x, my: c.y })); } return; }
    if (dragging.type === "pan") {
      setVp(p => ({ ...p, x: dragging.ox + e.clientX - dragging.sx, y: dragging.oy + e.clientY - dragging.sy }));
    } else if (dragging.type === "device") {
      const c = toCanvas(e.clientX, e.clientY);
      setPositions(p => ({ ...p, [dragging.id]: { x: c.x - dragging.offX, y: c.y - dragging.offY } }));
    } else if (dragging.type === "room") {
      const c = toCanvas(e.clientX, e.clientY);
      setPositions(p => {
        const updated = { ...p };
        Object.entries(dragging.offsets).forEach(([devId, off]) => {
          updated[devId] = { x: c.x + off.dx, y: c.y + off.dy };
        });
        return updated;
      });
    }
  };

  const onPointerUp = (e) => {
    if (wirePreview) {
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const toDevId = target?.getAttribute("data-port-dev");
      const toPortId = target?.getAttribute("data-port-id");
      const toType = target?.getAttribute("data-port-type");
      if (toDevId && toPortId && toType === "input" && toDevId !== wirePreview.fromDev) {
        const fromDev = deviceById(wirePreview.fromDev);
        const toDev = deviceById(toDevId);
        const fromPort = fromDev?.outputs.find(p => p.id === wirePreview.fromPort);
        const toPort = toDev?.inputs.find(p => p.id === toPortId);
        if (fromPort && toPort && signalsCompatible(fromPort.signal, toPort.signal)) {
          addRoute(wirePreview.fromDev, wirePreview.fromPort, toDevId, toPortId, fromPort.signal);
        }
      }
      setWirePreview(null);
    }
    setDragging(null);
  };

  const startDeviceDrag = (devId, e) => {
    e.stopPropagation();
    const c = toCanvas(e.clientX, e.clientY);
    const pos = positions[devId] || { x: 0, y: 0 };
    setDragging({ type: "device", id: devId, offX: c.x - pos.x, offY: c.y - pos.y });
    setSelectedDev(devId);
  };

  const startWireDrag = (devId, portId, e) => {
    e.stopPropagation();
    const dev = deviceById(devId);
    const port = dev?.outputs.find(p => p.id === portId);
    const pos = positions[devId] || { x: 0, y: 0 };
    const py = portY(dev, portId, "output");
    setWirePreview({ fromDev: devId, fromPort: portId, signal: port?.signal, fx: pos.x + CARD_W, fy: pos.y + py, mx: pos.x + CARD_W + 20, my: pos.y + py });
  };

  const startRoomDrag = (roomId, e) => {
    const c = toCanvas(e.clientX, e.clientY);
    const devs = devicesInRoom(roomId);
    const offsets = {};
    devs.forEach(d => {
      const p = positions[d.id] || { x: 0, y: 0 };
      offsets[d.id] = { dx: p.x - c.x, dy: p.y - c.y };
    });
    setDragging({ type: "room", roomId, offsets });
  };

  const allDevices = DEVICES; // always render all for wires
  const visibleIds = new Set(visibleDevices.map(d => d.id));

  // Room boundaries
  const roomBounds = useMemo(() => {
    const bounds = {};
    allRooms().forEach(r => {
      const devs = devicesInRoom(r.id);
      if (!devs.length) return;
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      devs.forEach(d => {
        const p = positions[d.id] || { x: 0, y: 0 };
        minX = Math.min(minX, p.x); minY = Math.min(minY, p.y);
        maxX = Math.max(maxX, p.x + CARD_W); maxY = Math.max(maxY, p.y + cardHeight(d));
      });
      bounds[r.id] = { x: minX - 24, y: minY - 36, w: maxX - minX + 48, h: maxY - minY + 56, name: r.name, roomId: r.id };
    });
    return bounds;
  }, [positions]);

  return (
    <div ref={containerRef} style={{ flex: "1 1 0%", minHeight: 0, overflow: "hidden", position: "relative", cursor: dragging ? "grabbing" : "default", background: "#eeeef3" }}
      onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
      <style>{`
        @keyframes signalPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes signalRing { 0%,100% { box-shadow: 0 0 0 0px rgba(52,199,89,0.6); } 50% { box-shadow: 0 0 0 3px rgba(52,199,89,0.2); } }
      `}</style>
      {/* Trace indicator */}
      {tracedChain && (
        <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", zIndex: 50, display: "flex", alignItems: "center", gap: 10, padding: "6px 16px", background: "#fff", borderRadius: 10, border: "1px solid #0073CF44", boxShadow: "0 2px 12px rgba(0,115,207,0.12)" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#0073CF", animation: "signalPulse 1.5s infinite" }} />
          <span style={{ fontSize: 12, color: "#1c1c1e", fontWeight: 500 }}>Signal trace: {tracedChain.deviceIds.size} devices, {tracedChain.signalRouteIds.size}/{tracedChain.routeIds.size} routes carrying signal</span>
          {tracedChain.noSignalPorts.length > 0 && (
            <span style={{ fontSize: 11, color: "#ff3b30", fontWeight: 600 }}>⚠ No signal on {tracedChain.noSignalPorts.length} port{tracedChain.noSignalPorts.length > 1 ? "s" : ""}</span>
          )}
          <button onClick={() => setTracedChain(null)} style={{ padding: "2px 10px", borderRadius: 6, border: "1px solid #d1d1d6", background: "#f5f5f7", fontSize: 11, cursor: "pointer", color: "#555" }}>Clear</button>
        </div>
      )}
      {/* Zoom controls */}
      <div style={{ position: "absolute", bottom: 16, right: 16, zIndex: 50, display: "flex", gap: 4 }}>
        <button onClick={() => setVp(p => ({ ...p, z: Math.min(3, p.z * 1.3) }))} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #d1d1d6", background: "#fff", cursor: "pointer", fontSize: 16 }}>+</button>
        <button onClick={() => setVp(p => ({ ...p, z: Math.max(0.1, p.z / 1.3) }))} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #d1d1d6", background: "#fff", cursor: "pointer", fontSize: 16 }}>−</button>
        <span style={{ padding: "6px 10px", background: "#fff", borderRadius: 8, border: "1px solid #d1d1d6", fontSize: 11, color: "#666", display: "flex", alignItems: "center" }}>{Math.round(vp.z * 100)}%</span>
      </div>
      {/* Canvas content */}
      <div style={{ transform: `translate(${vp.x}px, ${vp.y}px) scale(${vp.z})`, transformOrigin: "0 0", position: "absolute", top: 0, left: 0 }}>
        {/* Room boundaries — drag label to move all devices in room */}
        {Object.entries(roomBounds).map(([roomId, b]) => (
          <div key={roomId} style={{ position: "absolute", left: b.x, top: b.y, width: b.w, height: b.h, border: "1.5px dashed #c7c7cc", borderRadius: 14, pointerEvents: "none" }}>
            <span
              onPointerDown={(e) => { e.stopPropagation(); startRoomDrag(roomId, e); }}
              style={{ position: "absolute", top: -22, left: 8, fontSize: 11, fontWeight: 600, color: "#8e8e93", background: "#eeeef3", padding: "2px 8px", borderRadius: 6, cursor: "grab", pointerEvents: "auto", userSelect: "none" }}>{b.name}</span>
          </div>
        ))}

        {/* Wires SVG */}
        <svg style={{ position: "absolute", top: 0, left: 0, width: 3000, height: 2400, pointerEvents: "none", overflow: "visible" }}>
          {routes.map(r => {
            const fd = deviceById(r.fromDevice), td = deviceById(r.toDevice);
            if (!fd || !td) return null;
            const fp = positions[r.fromDevice] || { x: 0, y: 0 };
            const tp = positions[r.toDevice] || { x: 0, y: 0 };
            const fy = portY(fd, r.fromPort, "output"), ty = portY(td, r.toPort, "input");
            const x1 = fp.x + CARD_W, y1 = fp.y + fy, x2 = tp.x, y2 = tp.y + ty;
            const mx = (x1 + x2) / 2;
            const col = SIGNAL_COLORS[r.signalType] || "#888";
            const isTracing = !!tracedChain;
            const isInChain = tracedChain?.routeIds?.has(r.id);
            const hasSignal = tracedChain?.signalRouteIds?.has(r.id);
            const wireOpacity = isTracing ? (isInChain ? 1 : 0.08) : 1;
            const wireColor = isTracing && isInChain ? (hasSignal ? col : "#ff3b30") : col;
            const wireWidth = isTracing && isInChain ? 3.5 : 2;
            const wireDash = isTracing && isInChain && !hasSignal ? "8,4" : "none";
            return (
              <g key={r.id} style={{ opacity: wireOpacity, transition: "opacity 0.25s" }}>
                <path d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`} stroke="transparent" strokeWidth={12} fill="none" style={{ pointerEvents: "stroke", cursor: "pointer" }}
                  onClick={(e) => { e.stopPropagation(); traceFromRoute(r.id); }}
                  onDoubleClick={(e) => { e.stopPropagation(); removeRoute(r.id); setTracedChain(null); }} />
                <path d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`} stroke={wireColor} strokeWidth={wireWidth} fill="none" strokeDasharray={wireDash} style={{ pointerEvents: "none", transition: "stroke-width 0.2s" }} />
                {isInChain && hasSignal && <path d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`} stroke={col} strokeWidth={8} fill="none" strokeOpacity={0.12} style={{ pointerEvents: "none" }} />}
                <circle cx={x1} cy={y1} r={isInChain ? 4 : 3} fill={wireColor} style={{ pointerEvents: "none" }} />
                <circle cx={x2} cy={y2} r={isInChain ? 4 : 3} fill={wireColor} style={{ pointerEvents: "none" }} />
              </g>
            );
          })}
          {/* "No signal detected" indicators on input ports */}
          {tracedChain?.noSignalPorts?.map((nsp, i) => {
            const dev = deviceById(nsp.devId);
            if (!dev) return null;
            const pos = positions[nsp.devId] || { x: 0, y: 0 };
            const py = portY(dev, nsp.portId, "input");
            const x = pos.x - 12, y = pos.y + py;
            return (
              <g key={`nosig-${i}`}>
                <rect x={x - 32} y={y - 8} width={28} height={16} rx={4} fill="#ff3b30" fillOpacity={0.9} />
                <text x={x - 18} y={y + 4} textAnchor="middle" fill="#fff" fontSize={8} fontWeight={600} style={{ pointerEvents: "none" }}>NO SIG</text>
              </g>
            );
          })}
          {wirePreview && (
            <path d={`M${wirePreview.fx},${wirePreview.fy} C${(wirePreview.fx + wirePreview.mx) / 2},${wirePreview.fy} ${(wirePreview.fx + wirePreview.mx) / 2},${wirePreview.my} ${wirePreview.mx},${wirePreview.my}`}
              stroke="#34c759" strokeWidth={2} fill="none" strokeDasharray="5,4" style={{ pointerEvents: "none" }} />
          )}
        </svg>

        {/* Device cards */}
        {allDevices.map(dev => {
          const pos = positions[dev.id] || { x: 0, y: 0 };
          const h = cardHeight(dev);
          const hasPorts = dev.inputs.length > 0 || dev.outputs.length > 0;
          const isSelected = selectedDev === dev.id;
          const dim = !visibleIds.has(dev.id);
          const isTracing = !!tracedChain;
          const isTracedDev = tracedChain?.deviceIds?.has(dev.id);
          const traceOpacity = isTracing ? (isTracedDev ? 1 : 0.15) : 1;
          const finalOpacity = dim ? 0.3 : traceOpacity;
          const isOOO = outOfOrder.has(dev.id);
          const borderColor = isOOO ? "#ff3b30" : isSelected ? "#0073CF" : isTracedDev ? "#0073CF66" : "#d1d1d6";
          return (
            <div key={dev.id} style={{ position: "absolute", left: pos.x, top: pos.y, width: CARD_W, height: h, background: isOOO ? "#fff5f5" : "#fff", borderRadius: 10, border: `${isSelected || isOOO ? 2 : 1}px solid ${borderColor}`,
              boxShadow: isTracedDev ? "0 0 12px rgba(0,115,207,0.15)" : "0 1px 3px rgba(0,0,0,0.06)", cursor: "grab", userSelect: "none", opacity: finalOpacity, zIndex: isSelected ? 20 : isTracedDev ? 15 : 10, transition: "opacity 0.25s, box-shadow 0.25s" }}
              onPointerDown={(e) => startDeviceDrag(dev.id, e)}
              onClick={(e) => { if (!dragging) { e.stopPropagation(); traceFromDevice(dev.id); setSelectedDev(dev.id); } }}
              onDoubleClick={() => setSel({ id: dev.id, type: "device", name: dev.name, device: dev })}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 6px 0 10px", background: isOOO ? "#fee2e2" : "#f5f5f7", borderRadius: "10px 10px 0 0", borderBottom: `1px solid ${isOOO ? "#fca5a5" : "#e5e5ea"}`, height: HEADER_H, boxSizing: "border-box" }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: isOOO ? "#ff3b3020" : "#0073CF15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: isOOO ? "#ff3b30" : "#0073CF" }}>
                  {dev.type === "Display" ? "📺" : dev.type === "Amplifier" ? "🔊" : dev.type === "DSP" ? "🎛" : dev.type === "AV Receiver" ? "📻" : dev.type === "Media Player" ? "▶" : dev.type === "Projector" ? "📽" : "📦"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#1c1c1e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{dev.name}</div>
                  <div style={{ fontSize: 9, color: isOOO ? "#ff3b30" : "#8e8e93", fontWeight: isOOO ? 600 : 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{isOOO ? "OUT OF ORDER" : dev.model}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  {(() => {
                    const sigStatus = deviceSignalStatus(routes, dev.id);
                    const isLive = dev.status === "Online" && !isOOO && sigStatus !== "idle";
                    return isLive ? <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#0ea5e9", animation: "signalPulse 2s infinite" }} /> : null;
                  })()}
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: isOOO ? "#ff3b30" : dev.status === "Online" ? "#34c759" : "#ff3b30" }} />
                  {/* Out-of-order toggle */}
                  <button
                    onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggleOutOfOrder(dev.id); }}
                    onDoubleClick={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.stopPropagation()}
                    title={isOOO ? "Bring back online" : "Take out of order (simulate failure)"}
                    style={{ width: 20, height: 20, borderRadius: 4, border: `1px solid ${isOOO ? "#ff3b30" : "#d1d1d6"}`, background: isOOO ? "#ff3b30" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                    <span style={{ fontSize: 10, color: isOOO ? "#fff" : "#8e8e93", lineHeight: 1 }}>{isOOO ? "↻" : "⏻"}</span>
                  </button>
                </div>
              </div>
              {/* Ports */}
              {hasPorts && (
                <div style={{ position: "relative", padding: `${CARD_PAD}px 0` }}>
                  {dev.inputs.map((p, i) => {
                    const isDraggingWire = !!wirePreview;
                    const isCompatible = isDraggingWire && signalsCompatible(wirePreview.signal, p.signal) && wirePreview.fromDev !== dev.id;
                    const isIncompat = isDraggingWire && !isCompatible;
                    const portColor = SIGNAL_COLORS[p.signal] || "#3b82f6";
                    const hasSignal = portHasSignal(routes, dev.id, p.id, "input");
                    return (
                    <div key={p.id} style={{ position: "absolute", left: 0, top: CARD_PAD + i * PORT_H, height: PORT_H, display: "flex", alignItems: "center", paddingLeft: 4, opacity: isIncompat ? 0.25 : 1, transition: "opacity 0.15s" }}>
                      <div data-port-dev={dev.id} data-port-id={p.id} data-port-type="input"
                        style={{ width: isCompatible ? 14 : 10, height: isCompatible ? 14 : 10, borderRadius: "50%", background: portColor, border: "2px solid #fff",
                          boxShadow: isCompatible ? `0 0 0 2px ${portColor}, 0 0 8px ${portColor}88` : hasSignal ? `0 0 0 1px ${portColor}, 0 0 6px ${portColor}66` : `0 0 0 1px ${portColor}`,
                          cursor: "pointer", marginLeft: -5, flexShrink: 0, zIndex: 30, transition: "all 0.15s",
                          animation: hasSignal && !isDraggingWire ? "signalRing 2.5s infinite" : "none" }} />
                      <span style={{ fontSize: 9, color: hasSignal ? "#1c1c1e" : "#666", fontWeight: hasSignal ? 500 : 400, marginLeft: 6, whiteSpace: "nowrap", pointerEvents: "none" }}>{p.label}</span>
                      {hasSignal && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#34c759", marginLeft: 3, animation: "signalPulse 2s infinite", pointerEvents: "none" }} />}
                    </div>
                    );
                  })}
                  {dev.outputs.map((p, i) => {
                    const portColor = SIGNAL_COLORS[p.signal] || "#10b981";
                    const hasSignal = portHasSignal(routes, dev.id, p.id, "output");
                    return (
                    <div key={p.id} style={{ position: "absolute", right: 0, top: CARD_PAD + i * PORT_H, height: PORT_H, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 4 }}>
                      {hasSignal && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#34c759", marginRight: 3, animation: "signalPulse 2s infinite", pointerEvents: "none" }} />}
                      <span style={{ fontSize: 9, color: hasSignal ? "#1c1c1e" : "#666", fontWeight: hasSignal ? 500 : 400, marginRight: 6, whiteSpace: "nowrap", pointerEvents: "none" }}>{p.label}</span>
                      <div data-port-dev={dev.id} data-port-id={p.id} data-port-type="output"
                        style={{ width: 10, height: 10, borderRadius: "50%", background: portColor, border: "2px solid #fff",
                          boxShadow: hasSignal ? `0 0 0 1px ${portColor}, 0 0 6px ${portColor}66` : `0 0 0 1px ${portColor}`,
                          cursor: "crosshair", marginRight: -5, flexShrink: 0, zIndex: 30,
                          animation: hasSignal ? "signalRing 2.5s infinite" : "none" }}
                        onPointerDown={(e) => startWireDrag(dev.id, p.id, e)} />
                    </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// DEVICE ROUTING PANEL (AV40-style)
// ═══════════════════════════════════════════════════════════════════

function DeviceRoutingPanel({ device, routes, addRoute, removeRouteByTarget }) {
  if (!device) return null;
  const inputRoutes = {};
  const outputRoutes = {};
  routes.forEach(r => {
    if (r.toDevice === device.id) inputRoutes[r.toPort] = r;
    if (r.fromDevice === device.id) outputRoutes[r.fromPort] = r;
  });

  // All available outputs from other devices (for connecting to this device's inputs)
  const availableSources = DEVICES.filter(d => d.id !== device.id).flatMap(d =>
    d.outputs.map(p => ({ devId: d.id, devName: d.name, portId: p.id, portLabel: p.label, signal: p.signal, room: d.room }))
  );

  // All available inputs on other devices (for connecting from this device's outputs)
  const availableDests = DEVICES.filter(d => d.id !== device.id).flatMap(d =>
    d.inputs.map(p => ({ devId: d.id, devName: d.name, portId: p.id, portLabel: p.label, signal: p.signal, room: d.room }))
  );

  const maxRows = Math.max(device.inputs.length, device.outputs.length);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px", background: "#eeeef3" }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px" }}>{device.name} Configuration</h2>
      <p style={{ fontSize: 13, color: "#8e8e93", margin: "0 0 20px" }}>{device.manufacturer}, {device.model}</p>
      <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#8e8e93", margin: "0 0 12px" }}>Routing</p>

      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e5ea", padding: "16px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, paddingBottom: 12, borderBottom: "1px solid #f0f0f0" }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "#0073CF15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🎛</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{device.name}</div>
            <div style={{ fontSize: 12, color: device.status === "Online" ? "#34c759" : "#ff3b30" }}>Status: {device.status === "Online" ? "Online" : "Offline, Not Configured"}</div>
          </div>
        </div>

        {/* Input/Output grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {/* Inputs column */}
          <div>
            {device.inputs.map(p => {
              const route = inputRoutes[p.id];
              const srcDev = route ? deviceById(route.fromDevice) : null;
              const srcPort = srcDev?.outputs.find(op => op.id === route?.fromPort);
              return (
                <div key={p.id} style={{ marginBottom: 12, padding: "10px 12px", background: "#f5f5f7", borderRadius: 10, border: "1px solid #e5e5ea" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: SIGNAL_COLORS[p.signal] || "#3b82f6" }} />
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{p.label}</span>
                    <span style={{ fontSize: 9, color: "#8e8e93", background: "#e5e5ea", padding: "1px 5px", borderRadius: 4 }}>{SIGNAL_LABELS[p.signal]}</span>
                  </div>
                  {route && srcDev && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6, padding: "3px 8px", background: "#dbeafe", borderRadius: 6, fontSize: 11, color: "#1e40af" }}>
                      <span>←</span> {srcDev.name}/{srcPort?.label}
                    </div>
                  )}
                  <select value={route ? `${route.fromDevice}|${route.fromPort}` : ""}
                    onChange={(e) => {
                      if (e.target.value === "") { removeRouteByTarget(device.id, p.id); }
                      else { const [fd, fp] = e.target.value.split("|"); const src = availableSources.find(s => s.devId === fd && s.portId === fp); addRoute(fd, fp, device.id, p.id, src?.signal || p.signal); }
                    }}
                    style={{ width: "100%", padding: "5px 8px", borderRadius: 6, border: "1px solid #d1d1d6", background: "#fff", fontSize: 11, color: "#333" }}>
                    <option value="">Connect to …</option>
                    {availableSources.filter(s => signalsCompatible(s.signal, p.signal)).map(s => (
                      <option key={`${s.devId}|${s.portId}`} value={`${s.devId}|${s.portId}`}>{s.devName} / {s.portLabel}</option>
                    ))}
                  </select>
                </div>
              );
            })}
            {device.inputs.length === 0 && <div style={{ padding: 16, color: "#8e8e93", fontSize: 12, textAlign: "center" }}>No inputs</div>}
          </div>
          {/* Outputs column */}
          <div>
            {device.outputs.map(p => {
              const route = outputRoutes[p.id];
              const dstDev = route ? deviceById(route.toDevice) : null;
              const dstPort = dstDev?.inputs.find(ip => ip.id === route?.toPort);
              return (
                <div key={p.id} style={{ marginBottom: 12, padding: "10px 12px", background: "#f5f5f7", borderRadius: 10, border: "1px solid #e5e5ea" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, justifyContent: "flex-end" }}>
                    <span style={{ fontSize: 9, color: "#8e8e93", background: "#e5e5ea", padding: "1px 5px", borderRadius: 4 }}>{SIGNAL_LABELS[p.signal]}</span>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{p.label}</span>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: SIGNAL_COLORS[p.signal] || "#10b981" }} />
                  </div>
                  {route && dstDev && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6, padding: "3px 8px", background: "#d1fae5", borderRadius: 6, fontSize: 11, color: "#065f46", justifyContent: "flex-end" }}>
                      {dstDev.name}/{dstPort?.label} <span>→</span>
                    </div>
                  )}
                  <select value={route ? `${route.toDevice}|${route.toPort}` : ""}
                    onChange={(e) => {
                      if (e.target.value === "") { if (route) removeRouteByTarget(route.toDevice, route.toPort); }
                      else { const [td, tp] = e.target.value.split("|"); addRoute(device.id, p.id, td, tp, p.signal); }
                    }}
                    style={{ width: "100%", padding: "5px 8px", borderRadius: 6, border: "1px solid #d1d1d6", background: "#fff", fontSize: 11, color: "#333" }}>
                    <option value="">Connect to …</option>
                    {availableDests.filter(d => signalsCompatible(d.signal, p.signal)).map(d => (
                      <option key={`${d.devId}|${d.portId}`} value={`${d.devId}|${d.portId}`}>{d.devName} / {d.portLabel}</option>
                    ))}
                  </select>
                </div>
              );
            })}
            {device.outputs.length === 0 && <div style={{ padding: 16, color: "#8e8e93", fontSize: 12, textAlign: "center" }}>No outputs</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ROUTING GRID (Crosspoint Matrix)
// ═══════════════════════════════════════════════════════════════════

function RoutingGrid({ sel, routes, addRoute, removeRouteByTarget }) {
  const devices = sel.type === "system" ? DEVICES : sel.type === "floor" ? devicesInFloor(sel.id) : sel.type === "room" ? devicesInRoom(sel.id) : DEVICES;

  // Sources = all output ports, Destinations = all input ports
  const sources = devices.flatMap(d => d.outputs.map(p => ({ devId: d.id, devName: d.name, portId: p.id, portLabel: p.label, signal: p.signal })));
  const dests = devices.flatMap(d => d.inputs.map(p => ({ devId: d.id, devName: d.name, portId: p.id, portLabel: p.label, signal: p.signal })));

  if (sources.length === 0 || dests.length === 0) {
    return <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#8e8e93", fontSize: 14 }}>No routable ports in this view</div>;
  }

  const isRouted = (srcDev, srcPort, dstDev, dstPort) =>
    routes.some(r => r.fromDevice === srcDev && r.fromPort === srcPort && r.toDevice === dstDev && r.toPort === dstPort);

  const toggleCell = (src, dst) => {
    if (src.devId === dst.devId) return;
    if (isRouted(src.devId, src.portId, dst.devId, dst.portId)) {
      removeRouteByTarget(dst.devId, dst.portId);
    } else {
      addRoute(src.devId, src.portId, dst.devId, dst.portId, src.signal);
    }
  };

  const [hoverR, setHoverR] = useState(-1);
  const [hoverC, setHoverC] = useState(-1);

  const CELL = 30, LABEL_W = 160, HDR_H = 120;

  return (
    <div style={{ flex: 1, overflow: "auto", background: "#eeeef3" }}>
      <div style={{ display: "inline-block", minWidth: "100%" }}>
        <div style={{ display: "flex" }}>
          {/* Top-left corner */}
          <div style={{ width: LABEL_W, height: HDR_H, flexShrink: 0, background: "#f5f5f7", borderRight: "1px solid #d1d1d6", borderBottom: "1px solid #d1d1d6", display: "flex", alignItems: "flex-end", padding: "0 8px 6px", fontSize: 10, fontWeight: 600, color: "#8e8e93" }}>Source → Dest</div>
          {/* Destination headers */}
          {dests.map((d, ci) => (
            <div key={`h-${ci}`} style={{ width: CELL, height: HDR_H, flexShrink: 0, background: hoverC === ci ? "#e8f0fe" : "#f5f5f7", borderRight: "1px solid #eee", borderBottom: "1px solid #d1d1d6", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4 }}>
              <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: 9, fontWeight: 500, color: "#333", overflow: "hidden", maxHeight: HDR_H - 8, whiteSpace: "nowrap" }}>{d.devName}/{d.portLabel}</div>
            </div>
          ))}
        </div>
        {/* Rows */}
        {sources.map((src, ri) => (
          <div key={`r-${ri}`} style={{ display: "flex" }}>
            <div style={{ width: LABEL_W, height: CELL, flexShrink: 0, display: "flex", alignItems: "center", padding: "0 8px", borderRight: "1px solid #d1d1d6", borderBottom: "1px solid #eee", fontSize: 10, color: "#333", background: hoverR === ri ? "#e8f0fe" : ri % 2 === 0 ? "#fff" : "#fafafa", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: SIGNAL_COLORS[src.signal] || "#888", marginRight: 6, flexShrink: 0 }} />
              {src.devName}/{src.portLabel}
            </div>
            {dests.map((dst, ci) => {
              const routed = isRouted(src.devId, src.portId, dst.devId, dst.portId);
              const sameDevice = src.devId === dst.devId;
              const incompatible = !signalsCompatible(src.signal, dst.signal);
              const disabled = sameDevice || incompatible;
              return (
                <div key={`c-${ci}`}
                  onClick={() => !disabled && toggleCell(src, dst)}
                  onMouseEnter={() => { setHoverR(ri); setHoverC(ci); }}
                  onMouseLeave={() => { setHoverR(-1); setHoverC(-1); }}
                  style={{ width: CELL, height: CELL, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid #eee", borderBottom: "1px solid #eee",
                    background: disabled ? "#f0f0f0" : (hoverR === ri || hoverC === ci) ? (hoverR === ri && hoverC === ci ? "#d0e3f7" : "#eef4fc") : ri % 2 === 0 ? "#fff" : "#fafafa",
                    cursor: disabled ? "default" : "pointer" }}>
                  {routed ? (
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#0073CF", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 9 }}>✓</div>
                  ) : disabled ? (
                    <div style={{ width: 6, height: 1, background: "#d1d1d6" }} />
                  ) : (
                    <div style={{ width: 8, height: 8, borderRadius: "50%", border: "1px solid #d1d1d6" }} />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// GENERIC PANELS (Rooms/Devices tabs)
// ═══════════════════════════════════════════════════════════════════

function DeviceDetailPanel({ device }) {
  if (!device) return <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#8e8e93" }}>Select a device</div>;
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px", background: "#eeeef3" }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px" }}>{device.name} Configuration</h2>
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e5ea", overflow: "hidden", marginTop: 16 }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0", fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#8e8e93", letterSpacing: "0.06em" }}>About</div>
        {[["Status", device.status, device.status === "Online" ? "#34c759" : "#ff3b30"], ["Model", device.model], ["Manufacturer", device.manufacturer], ["Type", device.type], ["Room", device.room]].map(([k, v, c]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid #f5f5f5", fontSize: 13 }}>
            <span>{k}</span><span style={{ color: c || "#8e8e93" }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e5ea", overflow: "hidden", marginTop: 12 }}>
        <div style={{ padding: "12px 16px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#8e8e93", letterSpacing: "0.06em" }}>Ports</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
          <div style={{ borderRight: "1px solid #f0f0f0" }}>
            <div style={{ padding: "6px 16px", fontSize: 10, fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", borderBottom: "1px solid #f0f0f0" }}>Inputs ({device.inputs.length})</div>
            {device.inputs.map(p => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 16px", borderBottom: "1px solid #f5f5f5", fontSize: 12 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: SIGNAL_COLORS[p.signal] || "#3b82f6" }} /> {p.label}
              </div>
            ))}
          </div>
          <div>
            <div style={{ padding: "6px 16px", fontSize: 10, fontWeight: 700, color: "#10b981", textTransform: "uppercase", borderBottom: "1px solid #f0f0f0" }}>Outputs ({device.outputs.length})</div>
            {device.outputs.map(p => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 16px", borderBottom: "1px solid #f5f5f5", fontSize: 12 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: SIGNAL_COLORS[p.signal] || "#10b981" }} /> {p.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GenericPanel({ tab, sel }) {
  if (sel.type === "system") {
    const totalDevs = DEVICES.length;
    const totalRooms = allRooms().length;
    return (
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px", background: "#eeeef3" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 20px" }}>Whole System</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[["Rooms", totalRooms], ["Devices", totalDevs], ["Floors", 4]].map(([k, v]) => (
            <div key={k} style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e5ea", padding: "14px 16px" }}>
              <div style={{ fontSize: 11, color: "#8e8e93", marginBottom: 4, textTransform: "uppercase", fontWeight: 600 }}>{k}</div>
              <div style={{ fontSize: 26, fontWeight: 700 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (sel.type === "floor") {
    const floor = ROOMS_TREE.find(n => n.id === sel.id);
    return (
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px", background: "#eeeef3" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px" }}>{sel.name} Configuration</h2>
        <p style={{ color: "#8e8e93", fontSize: 13, marginBottom: 16 }}>Room group details</p>
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e5ea", padding: "16px 18px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#8e8e93", marginBottom: 8 }}>Include room(s)</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {floor?.children?.map(r => (
              <span key={r.id} style={{ padding: "4px 10px", borderRadius: 14, border: "1px solid #d1d1d6", fontSize: 12, background: "#fafafa" }}>{r.name} ✕</span>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (sel.type === "room") {
    const devs = devicesInRoom(sel.id);
    return (
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px", background: "#eeeef3" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px" }}>{sel.name} Configuration</h2>
        <p style={{ color: "#8e8e93", fontSize: 13, marginBottom: 16 }}>Room details · {devs.length} devices</p>
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e5ea", padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
            <span style={{ fontSize: 13 }}>Show in end-user UI</span>
            <div style={{ width: 40, height: 22, borderRadius: 11, background: "#34c759", position: "relative" }}><div style={{ position: "absolute", right: 2, top: 2, width: 18, height: 18, borderRadius: "50%", background: "#fff" }} /></div>
          </div>
          <div style={{ height: 1, background: "#f0f0f0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
            <span style={{ fontSize: 13 }}>Voice Control</span>
            <div style={{ width: 40, height: 22, borderRadius: 11, background: "#34c759", position: "relative" }}><div style={{ position: "absolute", right: 2, top: 2, width: 18, height: 18, borderRadius: "50%", background: "#fff" }} /></div>
          </div>
        </div>
      </div>
    );
  }
  return <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#8e8e93" }}>Select an item</div>;
}
