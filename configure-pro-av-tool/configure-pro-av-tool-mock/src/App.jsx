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
      { id: "family-room", name: "Family Room" },
      { id: "office", name: "Office" },
    ]
  },
  {
    id: "2nd-floor", name: "2nd Floor", type: "floor",
    children: [
      { id: "master-bedroom", name: "Master Bedroom" },
      { id: "bedroom-2", name: "Bedroom 2" },
      { id: "bedroom-3", name: "Bedroom 3" },
    ]
  },
  {
    id: "basement", name: "Basement", type: "floor",
    children: [
      { id: "theater", name: "Theater" },
      { id: "game-room", name: "Game Room" },
    ]
  },
  {
    id: "outside", name: "Outside", type: "floor",
    children: [
      { id: "deck", name: "Deck" },
      { id: "pool", name: "Pool" },
      { id: "front-porch", name: "Front Porch" },
    ]
  },
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
    inputs: [], outputs: [out("hdmi-out","HDMI Out","hdmi")]
  },
  { id: "lr-tv", name: "LG TV", model: "LG OLED77C3", manufacturer: "LG", room: "living-room", type: "Display", status: "Online",
    inputs: [inp("hdmi1","HDMI 1","hdmi"), inp("hdmi2","HDMI 2","hdmi"), inp("hdmi3","HDMI 3 (eARC)","hdmi"), inp("hdmi4","HDMI 4","hdmi")],
    outputs: [out("rv1","Room Video 1","hdmi"), out("ra1","Room Audio 1","analog_audio"), out("opt","Optical Out","digital_audio")]
  },
  { id: "lr-receiver", name: "Marantz Receiver", model: "Marantz Cinema 50", manufacturer: "Marantz", room: "living-room", type: "AV Receiver", status: "Online",
    inputs: [inp("hdmi1","HDMI 1","hdmi"), inp("hdmi2","HDMI 2","hdmi"), inp("hdmi3","HDMI 3","hdmi"), inp("opt","Optical In","digital_audio"), inp("ain","Analog In","analog_audio")],
    outputs: [out("hdmi-out","HDMI Out","hdmi"), out("zone2","Zone 2 Out","analog_audio"), out("sub","Subwoofer Out","analog_audio")]
  },
  { id: "lr-btio", name: "DM-NAX-BTIO-1G", model: "DM-NAX-BTIO-1G", manufacturer: "Crestron", room: "living-room", type: "DSP", status: "Online",
    inputs: [inp("ain1","Analog Line In 1","analog_audio"), inp("ain2","Analog Line In 2","analog_audio"), inp("bt-l","Bluetooth In L","bluetooth"), inp("bt-r","Bluetooth In R","bluetooth"),
             inp("aoip-i1l","AoIP In 1L","aoip"), inp("aoip-i1r","AoIP In 1R","aoip"), inp("aoip-i2l","AoIP In 2L","aoip"), inp("aoip-i2r","AoIP In 2R","aoip")],
    outputs: [out("aout-l","Analog Line Out L","analog_audio"), out("aout-r","Analog Line Out R","analog_audio"), out("usb-l","USB Out L","digital_audio"), out("usb-r","USB Out R","digital_audio"),
              out("aoip-o1l","AoIP Out 1L","aoip"), out("aoip-o1r","AoIP Out 1R","aoip"), out("aoip-o2l","AoIP Out 2L","aoip"), out("aoip-o2r","AoIP Out 2R","aoip")]
  },
  { id: "lr-shades", name: "Lutron Shades", model: "Lutron Serena", manufacturer: "Lutron", room: "living-room", type: "Shade", status: "Online",
    inputs: [], outputs: []
  },
  // Family Room
  { id: "fr-tv", name: "Sony TV", model: "Sony XR-75X95L", manufacturer: "Sony", room: "family-room", type: "Display", status: "Online",
    inputs: [inp("hdmi1","HDMI 1","hdmi"), inp("hdmi2","HDMI 2","hdmi")],
    outputs: [out("rv1","Room Video 1","hdmi"), out("opt","Optical Out","digital_audio")]
  },
  { id: "fr-firetv", name: "Fire TV Cube", model: "Fire TV Cube (3rd Gen)", manufacturer: "Amazon", room: "family-room", type: "Media Player", status: "Online",
    inputs: [], outputs: [out("hdmi-out","HDMI Out","hdmi")]
  },
  // Office
  { id: "of-display", name: "Dell Monitor", model: "Dell U3223QE", manufacturer: "Dell", room: "office", type: "Display", status: "Online",
    inputs: [inp("hdmi1","HDMI 1","hdmi"), inp("usb-c","USB-C","hdmi")],
    outputs: [out("dp-out","DP Out","hdmi")]
  },
  // Master Bedroom
  { id: "mb-tv", name: "Samsung TV", model: "Samsung QN55S90C", manufacturer: "Samsung", room: "master-bedroom", type: "Display", status: "Online",
    inputs: [inp("hdmi1","HDMI 1","hdmi"), inp("hdmi2","HDMI 2","hdmi")],
    outputs: [out("rv1","Room Video 1","hdmi"), out("opt","Optical Out","digital_audio")]
  },
  { id: "mb-sonos", name: "Sonos Era 300", model: "Sonos Era 300", manufacturer: "Sonos", room: "master-bedroom", type: "Speaker", status: "Online",
    inputs: [inp("line-in","Line In","analog_audio"), inp("wifi","WiFi In","aoip")],
    outputs: [out("spk-l","Speaker L","analog_audio"), out("spk-r","Speaker R","analog_audio")]
  },
  // Bedroom 2
  { id: "b2-tv", name: "Vizio TV", model: "Vizio M-Series 4K", manufacturer: "Vizio", room: "bedroom-2", type: "Display", status: "Online",
    inputs: [inp("hdmi1","HDMI 1","hdmi")], outputs: [out("opt","Optical Out","digital_audio")]
  },
  // Bedroom 3
  { id: "b3-spk", name: "Sonos One", model: "Sonos One SL", manufacturer: "Sonos", room: "bedroom-3", type: "Speaker", status: "Offline",
    inputs: [inp("wifi","WiFi In","aoip")], outputs: []
  },
  // Theater
  { id: "th-proj", name: "Epson Projector", model: "Epson LS800", manufacturer: "Epson", room: "theater", type: "Projector", status: "Online",
    inputs: [inp("hdmi1","HDMI 1","hdmi"), inp("hdmi2","HDMI 2","hdmi")], outputs: []
  },
  { id: "th-receiver", name: "Bose AV Receiver", model: "Lifestyle 235", manufacturer: "Bose", room: "theater", type: "AV Receiver", status: "Online",
    inputs: [inp("hdmi1","HDMI 1","hdmi"), inp("hdmi2","HDMI 2","hdmi"), inp("opt","Optical In","digital_audio"), inp("ain","Analog In","analog_audio")],
    outputs: [out("hdmi-out","HDMI Out","hdmi"), out("zone1","Zone 1 Out","analog_audio"), out("zone2","Zone 2 Out","analog_audio")]
  },
  { id: "th-appletv", name: "Apple TV 4K", model: "Apple TV 4K (3rd Gen)", manufacturer: "Apple", room: "theater", type: "Media Player", status: "Online",
    inputs: [], outputs: [out("hdmi-out","HDMI Out","hdmi")]
  },
  { id: "th-btio", name: "DM-NAX-BTIO-1G", model: "DM-NAX-BTIO-1G", manufacturer: "Crestron", room: "theater", type: "DSP", status: "Online",
    inputs: [inp("ain1","Analog Line In 1","analog_audio"), inp("ain2","Analog Line In 2","analog_audio"), inp("bt-l","Bluetooth In L","bluetooth"), inp("bt-r","Bluetooth In R","bluetooth"),
             inp("aoip-i1l","AoIP In 1L","aoip"), inp("aoip-i1r","AoIP In 1R","aoip"), inp("aoip-i2l","AoIP In 2L","aoip"), inp("aoip-i2r","AoIP In 2R","aoip")],
    outputs: [out("aout-l","Analog Line Out L","analog_audio"), out("aout-r","Analog Line Out R","analog_audio"), out("usb-l","USB Out L","digital_audio"), out("usb-r","USB Out R","digital_audio"),
              out("aoip-o1l","AoIP Out 1L","aoip"), out("aoip-o1r","AoIP Out 1R","aoip"), out("aoip-o2l","AoIP Out 2L","aoip"), out("aoip-o2r","AoIP Out 2R","aoip")]
  },
  { id: "th-screen", name: "Screen Innovations", model: "SI Solo Pro 2", manufacturer: "Screen Innovations", room: "theater", type: "Shade", status: "Online",
    inputs: [], outputs: []
  },
  // Game Room
  { id: "gr-tv", name: "LG TV", model: "LG OLED55G3", manufacturer: "LG", room: "game-room", type: "Display", status: "Online",
    inputs: [inp("hdmi1","HDMI 1","hdmi"), inp("hdmi2","HDMI 2","hdmi")],
    outputs: [out("rv1","Room Video 1","hdmi"), out("opt","Optical Out","digital_audio")]
  },
  { id: "gr-ps5", name: "PlayStation 5", model: "Sony PlayStation 5", manufacturer: "Sony", room: "game-room", type: "Media Player", status: "Online",
    inputs: [], outputs: [out("hdmi-out","HDMI Out","hdmi")]
  },
  // Outside
  { id: "dk-spk", name: "Sonos Outdoor", model: "Sonos Outdoor", manufacturer: "Sonos", room: "deck", type: "Speaker", status: "Online",
    inputs: [inp("wifi","WiFi In","aoip")], outputs: []
  },
  { id: "pl-spk", name: "Polk Audio", model: "Polk Atrium 6", manufacturer: "Polk Audio", room: "pool", type: "Speaker", status: "Online",
    inputs: [inp("wire","Speaker Wire In","analog_audio")], outputs: []
  },
];

const INITIAL_ROUTES = [
  { id: "r1", fromDevice: "lr-appletv", fromPort: "hdmi-out", toDevice: "lr-tv", toPort: "hdmi1", signalType: "hdmi" },
  { id: "r2", fromDevice: "lr-receiver", fromPort: "hdmi-out", toDevice: "lr-tv", toPort: "hdmi3", signalType: "hdmi" },
  { id: "r3", fromDevice: "th-appletv", fromPort: "hdmi-out", toDevice: "th-receiver", toPort: "hdmi1", signalType: "hdmi" },
  { id: "r4", fromDevice: "th-receiver", fromPort: "hdmi-out", toDevice: "th-proj", toPort: "hdmi1", signalType: "hdmi" },
  { id: "r5", fromDevice: "gr-ps5", fromPort: "hdmi-out", toDevice: "gr-tv", toPort: "hdmi1", signalType: "hdmi" },
  { id: "r6", fromDevice: "fr-firetv", fromPort: "hdmi-out", toDevice: "fr-tv", toPort: "hdmi1", signalType: "hdmi" },
  { id: "r7", fromDevice: "eq-nax-aio", fromPort: "aoip-o1l", toDevice: "eq-nax-amp", toPort: "aoip-i1l", signalType: "aoip" },
  { id: "r8", fromDevice: "eq-nax-aio", fromPort: "aoip-o1r", toDevice: "eq-nax-amp", toPort: "aoip-i1r", signalType: "aoip" },
  { id: "r9", fromDevice: "lr-btio", fromPort: "aoip-o1l", toDevice: "eq-nax-amp", toPort: "aoip-i2l", signalType: "aoip" },
  { id: "r10", fromDevice: "lr-btio", fromPort: "aoip-o1r", toDevice: "eq-nax-amp", toPort: "aoip-i2r", signalType: "aoip" },
];

// Room clusters for canvas layout — generous spacing between rooms
const ROOM_LAYOUT = {
  "equipment-room": { x: 40, y: 40, label: "Equipment Room" },
  "kitchen": { x: 700, y: 40, label: "Kitchen" },
  "living-room": { x: 700, y: 500, label: "Living Room" },
  "family-room": { x: 700, y: 1200, label: "Family Room" },
  "office": { x: 700, y: 1650, label: "Office" },
  "master-bedroom": { x: 1400, y: 40, label: "Master Bedroom" },
  "bedroom-2": { x: 1400, y: 480, label: "Bedroom 2" },
  "bedroom-3": { x: 1400, y: 760, label: "Bedroom 3" },
  "theater": { x: 1400, y: 1040, label: "Theater" },
  "game-room": { x: 1400, y: 1700, label: "Game Room" },
  "deck": { x: 2100, y: 40, label: "Deck" },
  "pool": { x: 2100, y: 340, label: "Pool" },
  "front-porch": { x: 2100, y: 640, label: "Front Porch" },
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
    <div style={{ minHeight: "100vh", background: "#eeeef3", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, fontFamily: "system-ui, -apple-system, sans-serif" }}>
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
    <div style={{ minHeight: "100vh", background: "#eeeef3", fontFamily: "system-ui, -apple-system, sans-serif" }}>
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

  const navItems = [
    { id: "rooms", label: "Rooms", icon: "🏠" },
    { id: "devices", label: "Devices", icon: "📟" },
    { id: "routing", label: "Routing", icon: "🔀" },
    { id: "scenes", label: "Scenes", icon: "⭐" },
    { id: "actions", label: "Actions", icon: "⚡" },
    { id: "schedules", label: "Schedules", icon: "📅" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", background: "#eeeef3", overflow: "hidden" }}>
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
            return (
              <button key={item.id} onClick={() => clickable && setTab(item.id)}
                style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "7px 14px", background: active ? "rgba(0,115,207,0.06)" : "none", border: "none",
                  borderLeft: active ? "2.5px solid #0073CF" : "2.5px solid transparent", cursor: clickable ? "pointer" : "default", color: active ? "#0073CF" : "#1c1c1e", opacity: clickable ? 1 : 0.35, fontSize: 13, fontWeight: active ? 600 : 400 }}>
                <span style={{ fontSize: 15 }}>{item.icon}</span> {item.label}
              </button>
            );
          })}
        </div>
        <button style={{ padding: "10px 14px", borderTop: "1px solid #e5e5ea", background: "none", border: "none", cursor: "pointer", color: "#0073CF", fontSize: 13, display: "flex", alignItems: "center", gap: 8, width: "100%", borderTopWidth: 1, borderTopStyle: "solid", borderTopColor: "#e5e5ea" }}>⚙ Settings</button>
      </div>

      {/* TREE PANEL */}
      <TreePanel tab={tab} sel={sel} setSel={setSel} expanded={expanded} toggleFloor={toggleFloor} routes={routes} />

      {/* CONTENT PANEL */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
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
            return (
              <div key={node.id} onClick={() => setSel({ id: node.id, type: "room", name: node.name })}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 8px 6px 16px", borderRadius: 7, cursor: "pointer", background: isSel2 ? "#0073CF" : "transparent", color: isSel2 ? "#fff" : "#1c1c1e", fontSize: 13, marginBottom: 1 }}
                onMouseEnter={e => !isSel2 && (e.currentTarget.style.background = "#eeeef3")} onMouseLeave={e => !isSel2 && (e.currentTarget.style.background = "transparent")}>
                <span>🏠</span> <span style={{ flex: 1 }}>{node.name}</span>
                {devCount > 0 && <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 10, background: isSel2 ? "rgba(255,255,255,0.25)" : "#e5e5ea", color: isSel2 ? "#fff" : "#8e8e93" }}>{devCount}</span>}
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
                  return (
                    <div key={room.id}>
                      <div onClick={() => setSel({ id: room.id, type: "room", name: room.name })}
                        style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 8px 5px 28px", borderRadius: 7, cursor: "pointer", background: isRSel ? "#0073CF" : "transparent", color: isRSel ? "#fff" : "#1c1c1e", fontSize: 12.5, marginBottom: 1 }}
                        onMouseEnter={e => !isRSel && (e.currentTarget.style.background = "#eeeef3")} onMouseLeave={e => !isRSel && (e.currentTarget.style.background = "transparent")}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: isRSel ? "#fff" : "#34c759", flexShrink: 0 }} />
                        <span style={{ flex: 1 }}>{room.name}</span>
                        {rDevCount > 0 && <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 10, background: isRSel ? "rgba(255,255,255,0.25)" : "#e5e5ea", color: isRSel ? "#fff" : "#8e8e93" }}>{rDevCount}</span>}
                      </div>
                      {showDevices && roomDevs.map(dev => {
                        const isDSel = sel.id === dev.id;
                        return (
                          <div key={dev.id} onClick={(e) => { e.stopPropagation(); setSel({ id: dev.id, type: "device", name: dev.name, device: dev }); }}
                            style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 8px 4px 44px", borderRadius: 7, cursor: "pointer", background: isDSel ? "#0073CF" : "transparent", color: isDSel ? "#fff" : "#1c1c1e", fontSize: 12, marginBottom: 1 }}
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
  const [dragging, setDragging] = useState(null); // { type: 'pan'|'device'|'wire', ... }
  const [wirePreview, setWirePreview] = useState(null);
  const [selectedDev, setSelectedDev] = useState(null);

  const visibleDevices = useMemo(() => {
    if (sel.type === "system") return DEVICES;
    if (sel.type === "floor") return devicesInFloor(sel.id);
    if (sel.type === "room") return devicesInRoom(sel.id);
    return DEVICES;
  }, [sel]);

  // Zoom to fit selection
  useEffect(() => {
    if (!containerRef.current) return;
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
  }, [sel.id, positions]);

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
    }
  };

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
        const fromPort = fromDev?.outputs.find(p => p.id === wirePreview.fromPort);
        addRoute(wirePreview.fromDev, wirePreview.fromPort, toDevId, toPortId, fromPort?.signal || "hdmi");
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
    const pos = positions[devId] || { x: 0, y: 0 };
    const py = portY(dev, portId, "output");
    setWirePreview({ fromDev: devId, fromPort: portId, fx: pos.x + CARD_W, fy: pos.y + py, mx: pos.x + CARD_W + 20, my: pos.y + py });
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
    <div ref={containerRef} style={{ flex: 1, overflow: "hidden", position: "relative", width: "100%", height: "100%", cursor: dragging ? "grabbing" : "default", background: "#eeeef3" }}
      onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
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
            return (
              <g key={r.id}>
                <path d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`} stroke="transparent" strokeWidth={10} fill="none" style={{ pointerEvents: "stroke", cursor: "pointer" }}
                  onDoubleClick={() => removeRoute(r.id)} />
                <path d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`} stroke={col} strokeWidth={2} fill="none" style={{ pointerEvents: "none" }} />
                <circle cx={x1} cy={y1} r={3} fill={col} style={{ pointerEvents: "none" }} />
                <circle cx={x2} cy={y2} r={3} fill={col} style={{ pointerEvents: "none" }} />
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
          return (
            <div key={dev.id} style={{ position: "absolute", left: pos.x, top: pos.y, width: CARD_W, height: h, background: "#fff", borderRadius: 10, border: isSelected ? "2px solid #0073CF" : "1px solid #d1d1d6",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)", cursor: "grab", userSelect: "none", opacity: dim ? 0.3 : 1, zIndex: isSelected ? 20 : 10 }}
              onPointerDown={(e) => startDeviceDrag(dev.id, e)}
              onDoubleClick={() => setSel({ id: dev.id, type: "device", name: dev.name, device: dev })}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 10px", background: "#f5f5f7", borderRadius: "10px 10px 0 0", borderBottom: "1px solid #e5e5ea", height: HEADER_H, boxSizing: "border-box" }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: "#0073CF15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#0073CF" }}>
                  {dev.type === "Display" ? "📺" : dev.type === "Amplifier" ? "🔊" : dev.type === "DSP" ? "🎛" : dev.type === "AV Receiver" ? "📻" : dev.type === "Media Player" ? "▶" : dev.type === "Projector" ? "📽" : "📦"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#1c1c1e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{dev.name}</div>
                  <div style={{ fontSize: 9, color: "#8e8e93", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{dev.model}</div>
                </div>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: dev.status === "Online" ? "#34c759" : "#ff3b30" }} />
              </div>
              {/* Ports */}
              {hasPorts && (
                <div style={{ position: "relative", padding: `${CARD_PAD}px 0` }}>
                  {dev.inputs.map((p, i) => (
                    <div key={p.id} style={{ position: "absolute", left: 0, top: CARD_PAD + i * PORT_H, height: PORT_H, display: "flex", alignItems: "center", paddingLeft: 4 }}>
                      <div data-port-dev={dev.id} data-port-id={p.id} data-port-type="input"
                        style={{ width: 10, height: 10, borderRadius: "50%", background: SIGNAL_COLORS[p.signal] || "#3b82f6", border: "2px solid #fff", boxShadow: `0 0 0 1px ${SIGNAL_COLORS[p.signal] || "#3b82f6"}`, cursor: "pointer", marginLeft: -5, flexShrink: 0, zIndex: 30 }} />
                      <span style={{ fontSize: 9, color: "#666", marginLeft: 6, whiteSpace: "nowrap", pointerEvents: "none" }}>{p.label}</span>
                    </div>
                  ))}
                  {dev.outputs.map((p, i) => (
                    <div key={p.id} style={{ position: "absolute", right: 0, top: CARD_PAD + i * PORT_H, height: PORT_H, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 4 }}>
                      <span style={{ fontSize: 9, color: "#666", marginRight: 6, whiteSpace: "nowrap", pointerEvents: "none" }}>{p.label}</span>
                      <div data-port-dev={dev.id} data-port-id={p.id} data-port-type="output"
                        style={{ width: 10, height: 10, borderRadius: "50%", background: SIGNAL_COLORS[p.signal] || "#10b981", border: "2px solid #fff", boxShadow: `0 0 0 1px ${SIGNAL_COLORS[p.signal] || "#10b981"}`, cursor: "crosshair", marginRight: -5, flexShrink: 0, zIndex: 30 }}
                        onPointerDown={(e) => startWireDrag(dev.id, p.id, e)} />
                    </div>
                  ))}
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
                    {availableSources.map(s => (
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
                    {availableDests.map(d => (
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
              return (
                <div key={`c-${ci}`}
                  onClick={() => !sameDevice && toggleCell(src, dst)}
                  onMouseEnter={() => { setHoverR(ri); setHoverC(ci); }}
                  onMouseLeave={() => { setHoverR(-1); setHoverC(-1); }}
                  style={{ width: CELL, height: CELL, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid #eee", borderBottom: "1px solid #eee",
                    background: sameDevice ? "#f0f0f0" : (hoverR === ri || hoverC === ci) ? (hoverR === ri && hoverC === ci ? "#d0e3f7" : "#eef4fc") : ri % 2 === 0 ? "#fff" : "#fafafa",
                    cursor: sameDevice ? "default" : "pointer" }}>
                  {routed ? (
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#0073CF", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 9 }}>✓</div>
                  ) : sameDevice ? (
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
