import { useState, useEffect } from "react";

// ─── MOCK DATA (NOW LOADED FROM API) ──────────────────────────────────────────

export let DROPS = [];
export let SPARK_PROFILES = [];
export let CREW_INTERESTS = [];
export let CREW_MEMBERS = [];
export let EVENTS = [];
export let HUSTLERS = [];
export let GAMES = [];
export let LEADERBOARD = [];

// ─── MAP COMPONENT ───────────────────────────────────────────────────────────

function MapView({ drops, onDropClick }) {
  const pins = [
    { x: 22, y: 35, type: "drop", drop: drops[0] },
    { x: 48, y: 25, type: "drop", drop: drops[1] },
    { x: 65, y: 50, type: "drop", drop: drops[2] },
    { x: 30, y: 62, type: "drop", drop: drops[3] },
    { x: 72, y: 30, type: "player" },
    { x: 55, y: 65, type: "player" },
    { x: 40, y: 45, type: "you" },
  ];

  return (
    <div style={{ position: "relative", width: "100%", height: "200px", borderRadius: "12px", overflow: "hidden", background: "linear-gradient(135deg, #1a2744 0%, #0f1f3d 50%, #162038 100%)" }}>
      {/* Grid lines */}
      {[0, 1, 2, 3, 4].map(i => (
        <div key={`h${i}`} style={{ position: "absolute", left: 0, right: 0, top: `${i * 25}%`, height: "1px", background: "rgba(255,255,255,0.05)" }} />
      ))}
      {[0, 1, 2, 3, 4].map(i => (
        <div key={`v${i}`} style={{ position: "absolute", top: 0, bottom: 0, left: `${i * 25}%`, width: "1px", background: "rgba(255,255,255,0.05)" }} />
      ))}

      {/* Street lines */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <line x1="0" y1="45%" x2="100%" y2="45%" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
        <line x1="0" y1="70%" x2="100%" y2="70%" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
        <line x1="40%" y1="0" x2="40%" y2="100%" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
        <line x1="70%" y1="0" x2="70%" y2="100%" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
        <line x1="15%" y1="0" x2="15%" y2="100%" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" />
      </svg>

      {/* Range circle */}
      <div style={{ position: "absolute", left: "40%", top: "45%", width: "120px", height: "120px", borderRadius: "50%", border: "1px dashed rgba(232,52,26,0.3)", transform: "translate(-50%, -50%)", background: "rgba(232,52,26,0.04)" }} />

      {/* Pins */}
      {pins.map((pin, i) => (
        <div key={i} onClick={() => pin.type === "drop" && onDropClick(pin.drop)}
          style={{ position: "absolute", left: `${pin.x}%`, top: `${pin.y}%`, transform: "translate(-50%,-50%)", cursor: pin.type === "drop" ? "pointer" : "default", zIndex: 2 }}>
          {pin.type === "drop" && !pin.drop?.claimed && (
            <div style={{ background: pin.drop?.color || "#E8341A", borderRadius: "20px", padding: "3px 8px", fontSize: "12px", color: "white", fontWeight: "700", boxShadow: `0 0 10px ${pin.drop?.color || "#E8341A"}60`, animation: "pulse 2s infinite", whiteSpace: "nowrap" }}>
              {pin.drop?.emoji} {pin.drop?.brand}
            </div>
          )}
          {pin.type === "drop" && pin.drop?.claimed && (
            <div style={{ background: "#555", borderRadius: "20px", padding: "3px 8px", fontSize: "12px", color: "#999", fontWeight: "700" }}>✓ Claimed</div>
          )}
          {pin.type === "player" && (
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#5B21B6", border: "2px solid white", boxShadow: "0 0 6px #5B21B680" }} />
          )}
          {pin.type === "you" && (
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#E8341A", border: "3px solid white", boxShadow: "0 0 12px #E8341A" }} />
          )}
        </div>
      ))}

      {/* Map label */}
      <div style={{ position: "absolute", top: "10px", left: "12px", fontSize: "11px", color: "rgba(255,255,255,0.5)", fontWeight: "600", letterSpacing: "1px" }}>ST. PETE, FL</div>
      <div style={{ position: "absolute", top: "10px", right: "12px", background: "rgba(232,52,26,0.9)", borderRadius: "8px", padding: "3px 8px", fontSize: "11px", color: "white", fontWeight: "700" }}>
        {drops.filter(d => !d.claimed).length} DROPS NEARBY
      </div>
    </div>
  );
}

// ─── SHIELD PANEL ───────────────────────────────────────────────────────────

function ShieldPanel({ onClose }) {
  const [hrv, setHrv] = useState(72);
  const [stage, setStage] = useState(4);

  useEffect(() => {
    const t = setInterval(() => {
      setHrv(h => Math.max(60, Math.min(95, h + Math.round((Math.random() - 0.5) * 4))));
    }, 1500);
    return () => clearInterval(t);
  }, []);

  const safeColor = stage >= 4 ? "#2E7D32" : stage >= 2 ? "#D97706" : "#E8341A";
  const safeLabel = stage >= 4 ? "SAFE" : stage >= 2 ? "CAUTION" : "ALERT";

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", alignItems: "flex-end" }} onClick={onClose}>
      <div style={{ width: "100%", background: "#0D1B2A", borderRadius: "20px 20px 0 0", padding: "24px", maxHeight: "85vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "28px" }}>🛡️</span>
            <div>
              <div style={{ color: "white", fontWeight: "800", fontSize: "18px" }}>LootDrop Shield</div>
              <div style={{ color: "#666", fontSize: "12px" }}>Guardian Pass Active</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "#333", border: "none", color: "white", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", fontSize: "16px" }}>×</button>
        </div>

        {/* Status cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
          <div style={{ background: "#1a2744", borderRadius: "12px", padding: "16px" }}>
            <div style={{ color: "#888", fontSize: "11px", marginBottom: "6px" }}>HEART RATE</div>
            <div style={{ color: "white", fontSize: "26px", fontWeight: "800" }}>{hrv} <span style={{ fontSize: "14px", color: "#888" }}>bpm</span></div>
            <div style={{ color: "#2E7D32", fontSize: "11px" }}>● Normal</div>
          </div>
          <div style={{ background: "#1a2744", borderRadius: "12px", padding: "16px" }}>
            <div style={{ color: "#888", fontSize: "11px", marginBottom: "6px" }}>SAFETY STAGE</div>
            <div style={{ color: safeColor, fontSize: "26px", fontWeight: "800" }}>Stage {stage}</div>
            <div style={{ color: safeColor, fontSize: "11px" }}>● {safeLabel}</div>
          </div>
          <div style={{ background: "#1a2744", borderRadius: "12px", padding: "16px" }}>
            <div style={{ color: "#888", fontSize: "11px", marginBottom: "6px" }}>SAFE ZONES</div>
            <div style={{ color: "white", fontSize: "26px", fontWeight: "800" }}>4</div>
            <div style={{ color: "#888", fontSize: "11px" }}>Within 0.5 mi</div>
          </div>
          <div style={{ background: "#1a2744", borderRadius: "12px", padding: "16px" }}>
            <div style={{ color: "#888", fontSize: "11px", marginBottom: "6px" }}>CREW STATUS</div>
            <div style={{ color: "white", fontSize: "26px", fontWeight: "800" }}>3</div>
            <div style={{ color: "#2E7D32", fontSize: "11px" }}>● All safe</div>
          </div>
        </div>

        {/* Safe zones */}
        <div style={{ background: "#1a2744", borderRadius: "12px", padding: "16px", marginBottom: "12px" }}>
          <div style={{ color: "#888", fontSize: "11px", marginBottom: "10px", fontWeight: "700" }}>NEAREST SAFE ZONES</div>
          {["Starbucks — 0.1 mi ●", "Nike Store — 0.2 mi ●", "CVS Pharmacy — 0.3 mi ●"].map((z, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", color: "white", fontSize: "13px", padding: "6px 0", borderBottom: i < 2 ? "1px solid #333" : "none" }}>
              <span>{z.split(" ●")[0]}</span>
              <span style={{ color: "#2E7D32", fontWeight: "700" }}>SAFE ●</span>
            </div>
          ))}
        </div>

        {/* Emergency */}
        <button style={{ width: "100%", background: "#E8341A", border: "none", color: "white", borderRadius: "12px", padding: "16px", fontSize: "16px", fontWeight: "800", cursor: "pointer", marginBottom: "8px" }}>
          🚨 Emergency Alert — Notify Crew
        </button>
        <button style={{ width: "100%", background: "#1565C0", border: "none", color: "white", borderRadius: "12px", padding: "14px", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}>
          🚗 Book Ride Home (via LootDrop Rides)
        </button>
      </div>
    </div>
  );
}

// ─── SCREENS ────────────────────────────────────────────────────────────────

function DropsScreen({ drops, setDrops }) {
  const [claimed, setClaimed] = useState(null);

  const claimDrop = (drop) => {
    setClaimed(drop);
    setDrops(prev => prev.map(d => d.id === drop.id ? { ...d, claimed: true } : d));
    setTimeout(() => setClaimed(null), 2500);
  };

  return (
    <div>
      <MapView drops={drops} onDropClick={claimDrop} />

      {claimed && (
        <div style={{ background: "linear-gradient(135deg, #2E7D32, #1B5E20)", borderRadius: "12px", padding: "16px", margin: "12px 0", textAlign: "center", animation: "slideIn 0.3s ease" }}>
          <div style={{ fontSize: "32px" }}>🎉</div>
          <div style={{ color: "white", fontWeight: "800", fontSize: "16px" }}>Drop Claimed!</div>
          <div style={{ color: "#a5d6a7", fontSize: "14px" }}>{claimed.offer} from {claimed.brand}</div>
          <div style={{ color: "#81c784", fontSize: "12px", marginTop: "4px" }}>+{claimed.points} XP earned</div>
        </div>
      )}

      <div style={{ marginTop: "12px" }}>
        <div style={{ color: "#888", fontSize: "12px", fontWeight: "700", marginBottom: "8px", letterSpacing: "1px" }}>DROPS NEARBY</div>
        {drops.map(drop => (
          <div key={drop.id} onClick={() => !drop.claimed && claimDrop(drop)}
            style={{ display: "flex", alignItems: "center", gap: "12px", background: drop.claimed ? "#1a1a1a" : "#1e1e2e", borderRadius: "12px", padding: "14px", marginBottom: "8px", cursor: drop.claimed ? "default" : "pointer", border: `1px solid ${drop.claimed ? "#333" : drop.color + "40"}`, opacity: drop.claimed ? 0.5 : 1, transition: "all 0.2s" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: drop.claimed ? "#333" : drop.color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>{drop.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: drop.claimed ? "#666" : "white", fontWeight: "700", fontSize: "14px" }}>{drop.offer}</div>
              <div style={{ color: "#888", fontSize: "12px" }}>{drop.brand} · {drop.distance} · Expires in {drop.expires}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              {drop.claimed
                ? <span style={{ color: "#2E7D32", fontSize: "12px", fontWeight: "700" }}>✓ Done</span>
                : <div style={{ background: drop.color, borderRadius: "20px", padding: "6px 14px", color: "white", fontSize: "12px", fontWeight: "800" }}>+{drop.points} XP</div>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SparkScreen() {
  const [profiles, setProfiles] = useState(SPARK_PROFILES);
  const [matched, setMatched] = useState(null);

  const handleLike = (id) => {
    const p = profiles.find(p => p.id === id);
    setMatched(p);
    setProfiles(prev => prev.filter(p => p.id !== id));
    setTimeout(() => setMatched(null), 2500);
  };

  const handlePass = (id) => setProfiles(prev => prev.filter(p => p.id !== id));

  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #C2185B20, #5B21B620)", borderRadius: "12px", padding: "14px", marginBottom: "16px", border: "1px solid #C2185B30" }}>
        <div style={{ color: "#C2185B", fontWeight: "800", fontSize: "13px" }}>⚡ SPARK — AR DATING</div>
        <div style={{ color: "#888", fontSize: "12px", marginTop: "4px" }}>Connect with people playing LootDrop nearby. Safety verified by the Shield.</div>
      </div>

      {matched && (
        <div style={{ background: "linear-gradient(135deg, #C2185B, #880E4F)", borderRadius: "12px", padding: "20px", marginBottom: "16px", textAlign: "center" }}>
          <div style={{ fontSize: "40px" }}>💞</div>
          <div style={{ color: "white", fontWeight: "800", fontSize: "18px" }}>It's a Match!</div>
          <div style={{ color: "#f48fb1", fontSize: "14px" }}>You and {matched.name} liked each other!</div>
        </div>
      )}

      {profiles.length === 0 && !matched && (
        <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>😊</div>
          <div style={{ fontSize: "16px", fontWeight: "700" }}>You've seen everyone nearby</div>
          <div style={{ fontSize: "13px", marginTop: "6px" }}>More players are joining all the time!</div>
        </div>
      )}

      {profiles.map(p => (
        <div key={p.id} style={{ background: "#1e1e2e", borderRadius: "16px", padding: "18px", marginBottom: "12px", border: "1px solid #C2185B20" }}>
          <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
            <div style={{ width: "54px", height: "54px", borderRadius: "50%", background: "linear-gradient(135deg, #C2185B, #880E4F)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", flexShrink: 0 }}>{p.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ color: "white", fontWeight: "800", fontSize: "16px" }}>{p.name}, {p.age}</div>
                <div style={{ background: "#C2185B20", borderRadius: "20px", padding: "4px 10px", color: "#C2185B", fontSize: "12px", fontWeight: "700" }}>{p.match}% match</div>
              </div>
              <div style={{ color: "#888", fontSize: "12px", marginTop: "4px" }}>📍 {p.distance} · 🎮 Playing {p.playing}</div>
              <div style={{ display: "flex", gap: "6px", marginTop: "10px", flexWrap: "wrap" }}>
                {p.interests.map(i => (
                  <span key={i} style={{ background: "#2d2d4e", borderRadius: "20px", padding: "4px 10px", color: "#aaa", fontSize: "11px" }}>{i}</span>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
            <button onClick={() => handlePass(p.id)} style={{ flex: 1, background: "#333", border: "none", color: "white", borderRadius: "10px", padding: "12px", cursor: "pointer", fontSize: "14px", fontWeight: "700" }}>✕ Pass</button>
            <button onClick={() => handleLike(p.id)} style={{ flex: 2, background: "linear-gradient(135deg, #C2185B, #880E4F)", border: "none", color: "white", borderRadius: "10px", padding: "12px", cursor: "pointer", fontSize: "14px", fontWeight: "700" }}>⚡ Connect</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function CrewScreen() {
  const [selected, setSelected] = useState([]);
  const [joined, setJoined] = useState(null);

  const toggle = (i) => setSelected(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i]);
  const join = (crew) => { setJoined(crew); setTimeout(() => setJoined(null), 2500); };

  return (
    <div>
      <div style={{ background: "#1e1e2e", borderRadius: "12px", padding: "14px", marginBottom: "16px" }}>
        <div style={{ color: "#888", fontSize: "12px", fontWeight: "700", marginBottom: "10px" }}>YOUR INTERESTS</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {CREW_INTERESTS.map(i => (
            <button key={i} onClick={() => toggle(i)}
              style={{ background: selected.includes(i) ? "#5B21B6" : "#2d2d4e", border: "none", color: "white", borderRadius: "20px", padding: "6px 14px", cursor: "pointer", fontSize: "13px", fontWeight: selected.includes(i) ? "700" : "400", transition: "all 0.2s" }}>
              {i}
            </button>
          ))}
        </div>
      </div>

      {joined && (
        <div style={{ background: "linear-gradient(135deg, #5B21B6, #3b0f8c)", borderRadius: "12px", padding: "16px", marginBottom: "16px", textAlign: "center" }}>
          <div style={{ fontSize: "32px" }}>👥</div>
          <div style={{ color: "white", fontWeight: "800" }}>Joined {joined.name}!</div>
          <div style={{ color: "#c4b5fd", fontSize: "13px" }}>You're now part of the crew</div>
        </div>
      )}

      <div style={{ color: "#888", fontSize: "12px", fontWeight: "700", marginBottom: "10px" }}>ACTIVE CREWS NEARBY</div>
      {CREW_MEMBERS.map(c => (
        <div key={c.id} style={{ background: "#1e1e2e", borderRadius: "12px", padding: "16px", marginBottom: "10px", border: "1px solid #5B21B620" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <span style={{ fontSize: "28px" }}>{c.emoji}</span>
              <div>
                <div style={{ color: "white", fontWeight: "700", fontSize: "15px" }}>{c.name}</div>
                <div style={{ color: "#888", fontSize: "12px" }}>{c.members} members · {c.activity}</div>
              </div>
            </div>
            <span style={{ background: "#5B21B620", color: "#a78bfa", borderRadius: "20px", padding: "4px 10px", fontSize: "11px", fontWeight: "700" }}>{c.level}</span>
          </div>
          <button onClick={() => join(c)} style={{ width: "100%", marginTop: "12px", background: "#5B21B6", border: "none", color: "white", borderRadius: "10px", padding: "10px", cursor: "pointer", fontWeight: "700", fontSize: "14px" }}>Join Crew</button>
        </div>
      ))}
    </div>
  );
}

function GatherScreen() {
  const [rsvp, setRsvp] = useState({});

  const toggleRsvp = (id) => setRsvp(r => ({ ...r, [id]: !r[id] }));

  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #D9770620, #B4530020)", borderRadius: "12px", padding: "14px", marginBottom: "16px", border: "1px solid #D9770630" }}>
        <div style={{ color: "#D97706", fontWeight: "800", fontSize: "13px" }}>📍 GATHER — REAL MEETUPS</div>
        <div style={{ color: "#888", fontSize: "12px", marginTop: "4px" }}>Spontaneous and planned events happening near you right now.</div>
      </div>

      {EVENTS.map(ev => (
        <div key={ev.id} style={{ background: "#1e1e2e", borderRadius: "12px", padding: "16px", marginBottom: "10px", border: ev.hot ? "1px solid #D9770640" : "1px solid #333" }}>
          {ev.hot && <div style={{ background: "#D97706", color: "white", fontSize: "10px", fontWeight: "800", borderRadius: "20px", padding: "3px 8px", display: "inline-block", marginBottom: "8px" }}>🔥 HOT</div>}
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <span style={{ fontSize: "32px" }}>{ev.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ color: "white", fontWeight: "700", fontSize: "15px" }}>{ev.name}</div>
              <div style={{ color: "#888", fontSize: "12px", marginTop: "2px" }}>{ev.type} · {ev.time}</div>
              <div style={{ display: "flex", gap: "12px", marginTop: "6px" }}>
                <span style={{ color: "#D97706", fontSize: "12px" }}>👥 {ev.players.toLocaleString()}</span>
                <span style={{ color: "#888", fontSize: "12px" }}>🎟️ {ev.entry}</span>
              </div>
            </div>
            <button onClick={() => toggleRsvp(ev.id)}
              style={{ background: rsvp[ev.id] ? "#2E7D32" : "#D97706", border: "none", color: "white", borderRadius: "10px", padding: "8px 14px", cursor: "pointer", fontWeight: "700", fontSize: "13px", flexShrink: 0 }}>
              {rsvp[ev.id] ? "✓ Going" : "RSVP"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function HustleScreen() {
  const [connected, setConnected] = useState({});

  const connect = (id) => setConnected(c => ({ ...c, [id]: true }));

  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #2E7D3220, #1B5E2020)", borderRadius: "12px", padding: "14px", marginBottom: "16px", border: "1px solid #2E7D3230" }}>
        <div style={{ color: "#2E7D32", fontWeight: "800", fontSize: "13px" }}>💼 HUSTLE — NETWORK IN THE WILD</div>
        <div style={{ color: "#888", fontSize: "12px", marginTop: "4px" }}>These professionals are physically nearby right now. One tap to connect.</div>
      </div>

      {HUSTLERS.map(h => (
        <div key={h.id} style={{ background: "#1e1e2e", borderRadius: "12px", padding: "16px", marginBottom: "10px", border: "1px solid #2E7D3220" }}>
          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "linear-gradient(135deg, #2E7D32, #1B5E20)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>{h.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "white", fontWeight: "700", fontSize: "15px" }}>{h.name}</div>
              <div style={{ color: "#aaa", fontSize: "12px" }}>{h.role} at {h.company}</div>
              <div style={{ color: "#888", fontSize: "11px" }}>📍 {h.distance} · {h.mutual} mutual connections</div>
            </div>
            <button onClick={() => connect(h.id)}
              style={{ background: connected[h.id] ? "#2E7D32" : "#1a3a1a", border: `1px solid ${connected[h.id] ? "#2E7D32" : "#2E7D3260"}`, color: connected[h.id] ? "white" : "#4CAF50", borderRadius: "10px", padding: "8px 14px", cursor: "pointer", fontWeight: "700", fontSize: "13px" }}>
              {connected[h.id] ? "✓ Connected" : "Connect"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function GamesScreen() {
  const [joined, setJoined] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const join = (game) => {
    if (game.name === "Championship") { setShowLeaderboard(true); return; }
    setJoined(game);
    setTimeout(() => setJoined(null), 2500);
  };

  return (
    <div>
      {showLeaderboard && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 50, display: "flex", alignItems: "flex-end" }}>
          <div style={{ width: "100%", background: "#0D1B2A", borderRadius: "20px 20px 0 0", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ color: "white", fontWeight: "800", fontSize: "18px" }}>🏆 Season Leaderboard</div>
              <button onClick={() => setShowLeaderboard(false)} style={{ background: "#333", border: "none", color: "white", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer" }}>×</button>
            </div>
            <div style={{ background: "linear-gradient(135deg, #B8860B20, #8B6914 20)", borderRadius: "12px", padding: "12px", marginBottom: "12px", border: "1px solid #B8860B40" }}>
              <div style={{ color: "#B8860B", fontSize: "12px", fontWeight: "700" }}>NATIONAL CHAMPIONSHIP · SEASON 1</div>
              <div style={{ color: "#888", fontSize: "11px" }}>Finals: March 28 · St. Pete, FL · $250,000 prize</div>
            </div>
            {LEADERBOARD.map(l => (
              <div key={l.rank} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 0", borderBottom: "1px solid #222" }}>
                <span style={{ fontSize: "20px", width: "30px" }}>{l.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: l.rank === 3 ? "#E8341A" : "white", fontWeight: l.rank === 3 ? "800" : "600", fontSize: "14px" }}>{l.name} {l.rank === 3 ? "← YOU" : ""}</div>
                  <div style={{ color: "#888", fontSize: "11px" }}>{l.city}</div>
                </div>
                <div style={{ color: "#B8860B", fontWeight: "800", fontSize: "14px" }}>{l.points.toLocaleString()} pts</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {joined && (
        <div style={{ background: `linear-gradient(135deg, ${joined.color}, ${joined.color}99)`, borderRadius: "12px", padding: "16px", marginBottom: "16px", textAlign: "center" }}>
          <div style={{ fontSize: "36px" }}>{joined.emoji}</div>
          <div style={{ color: "white", fontWeight: "800", fontSize: "16px" }}>You're in — {joined.name}!</div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>Shield monitoring activated. Stay safe.</div>
        </div>
      )}

      <div style={{ color: "#888", fontSize: "12px", fontWeight: "700", marginBottom: "10px", letterSpacing: "1px" }}>SECOND CHILDHOOD · THE WORLD IS YOUR PLAYGROUND</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {GAMES.map(g => (
          <div key={g.id} onClick={() => join(g)}
            style={{ background: "#1e1e2e", borderRadius: "14px", padding: "16px", cursor: "pointer", border: `1px solid ${g.color}30`, position: "relative", overflow: "hidden", transition: "transform 0.1s" }}>
            {g.hot && <div style={{ position: "absolute", top: "8px", right: "8px", background: "#E8341A", borderRadius: "20px", padding: "2px 6px", fontSize: "9px", color: "white", fontWeight: "800" }}>HOT</div>}
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>{g.emoji}</div>
            <div style={{ color: "white", fontWeight: "800", fontSize: "13px", lineHeight: 1.2, marginBottom: "6px" }}>{g.name}</div>
            <div style={{ color: "#888", fontSize: "10px", marginBottom: "8px", lineHeight: 1.4 }}>{g.desc}</div>
            <div style={{ color: g.color, fontSize: "10px", fontWeight: "700" }}>{g.players}</div>
            <div style={{ marginTop: "8px", background: g.color, borderRadius: "8px", padding: "6px", textAlign: "center", color: "white", fontSize: "11px", fontWeight: "800" }}>
              {g.entry === "Free" ? "JOIN FREE" : g.entry === "Qualified" ? "VIEW BOARD" : `JOIN · ${g.entry}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────

const TABS = [
  { id: "drops", label: "Drops", icon: "💰", color: "#E8341A" },
  { id: "spark", label: "Spark", icon: "⚡", color: "#C2185B" },
  { id: "crew", label: "Crew", icon: "👥", color: "#5B21B6" },
  { id: "gather", label: "Gather", icon: "📍", color: "#D97706" },
  { id: "hustle", label: "Hustle", icon: "💼", color: "#2E7D32" },
  { id: "games", label: "Games", icon: "🎮", color: "#1565C0" },
];

export default function LootDropDemo() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("drops");
  const [showShield, setShowShield] = useState(false);
  const [drops, setDrops] = useState(DROPS);
  const [xp, setXp] = useState(1240);
  const activeColor = TABS.find(t => t.id === activeTab)?.color || "#E8341A";

  useEffect(() => {
    fetch('http://localhost:3001/api/game-data')
      .then(res => res.json())
      .then(data => {
        DROPS = data.drops;
        SPARK_PROFILES = data.sparkProfiles;
        CREW_INTERESTS = data.crewInterests;
        CREW_MEMBERS = data.crewMembers;
        EVENTS = data.events;
        HUSTLERS = data.hustlers;
        GAMES = data.games;
        LEADERBOARD = data.leaderboard;
        setDrops(data.drops);
        setIsLoaded(true);
      })
      .catch(err => console.error("API error:", err));
  }, []);

  useEffect(() => {
    if (drops.length > 0 && drops.some(d => d.claimed)) {
      setXp(x => x + 10);

      const latestClaimed = drops.find(d => d.claimed);
      if (latestClaimed) {
        fetch('http://localhost:3001/api/claim-drop', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dropId: latestClaimed.id })
        }).catch(err => console.error(err));
      }
    }
  }, [drops]);

  if (!isLoaded) {
    return <div style={{ minHeight: "100vh", background: "#111", display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontFamily: "sans-serif" }}><h3>Loading API Data...</h3></div>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#111", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "'Segoe UI', system-ui, sans-serif", padding: "20px" }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.85;transform:scale(1.04)} }
        @keyframes slideIn { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        button:active { transform: scale(0.97); }
      `}</style>

      {/* Phone frame */}
      <div style={{ width: "390px", maxWidth: "100%", background: "#0a0a0a", borderRadius: "44px", border: "10px solid #222", boxShadow: "0 40px 80px rgba(0,0,0,0.8)", overflow: "hidden", display: "flex", flexDirection: "column", height: "780px" }}>

        {/* Status bar */}
        <div style={{ background: "#0a0a0a", padding: "10px 20px 4px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <span style={{ color: "white", fontSize: "12px", fontWeight: "700" }}>9:41</span>
          <div style={{ width: "80px", height: "20px", background: "#0a0a0a", borderRadius: "10px" }} />
          <span style={{ color: "white", fontSize: "11px" }}>📶 🔋</span>
        </div>

        {/* Header */}
        <div style={{ background: "#0a0a0a", padding: "8px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0, borderBottom: "1px solid #1a1a1a" }}>
          <div>
            <div style={{ color: "white", fontWeight: "900", fontSize: "22px", letterSpacing: "-0.5px" }}>
              <span style={{ color: activeColor }}>LOOT</span>DROP
            </div>
            <div style={{ color: "#888", fontSize: "11px" }}>St. Pete, FL · {xp.toLocaleString()} XP</div>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button onClick={() => setShowShield(true)}
              style={{ background: "#1a2744", border: "1px solid #1565C060", borderRadius: "20px", padding: "6px 12px", color: "white", cursor: "pointer", fontSize: "12px", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#2E7D32" }}>●</span> Shield
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px", background: "#111" }}>
          {activeTab === "drops" && <DropsScreen drops={drops} setDrops={setDrops} />}
          {activeTab === "spark" && <SparkScreen />}
          {activeTab === "crew" && <CrewScreen />}
          {activeTab === "gather" && <GatherScreen />}
          {activeTab === "hustle" && <HustleScreen />}
          {activeTab === "games" && <GamesScreen />}
        </div>

        {/* Bottom nav */}
        <div style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a", display: "flex", flexShrink: 0, paddingBottom: "8px" }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ flex: 1, background: "none", border: "none", cursor: "pointer", padding: "10px 4px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", transition: "all 0.15s" }}>
              <span style={{ fontSize: "18px", filter: activeTab === tab.id ? "none" : "grayscale(0.7)", opacity: activeTab === tab.id ? 1 : 0.5 }}>{tab.icon}</span>
              <span style={{ fontSize: "9px", fontWeight: "700", color: activeTab === tab.id ? tab.color : "#555", letterSpacing: "0.3px" }}>{tab.label.toUpperCase()}</span>
              {activeTab === tab.id && <div style={{ width: "20px", height: "3px", background: tab.color, borderRadius: "2px" }} />}
            </button>
          ))}
        </div>
      </div>

      {showShield && <ShieldPanel onClose={() => setShowShield(false)} />}
    </div>
  );
}
