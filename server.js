import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const DROPS = [
    { id: 1, brand: "Nike", offer: "Free Running Shoe Sample", distance: "0.1 mi", points: 500, color: "#E8341A", emoji: "👟", expires: "2h 14m", claimed: false },
    { id: 2, brand: "Chipotle", offer: "Free Burrito Bowl", distance: "0.3 mi", points: 300, color: "#D97706", emoji: "🌯", expires: "45m", claimed: false },
    { id: 3, brand: "Starbucks", offer: "Buy One Get One Coffee", distance: "0.4 mi", points: 200, color: "#2E7D32", emoji: "☕", expires: "1h 30m", claimed: false },
    { id: 4, brand: "Adidas", offer: "$25 Store Credit", distance: "0.6 mi", points: 750, color: "#1565C0", emoji: "🎽", expires: "3h", claimed: false },
    { id: 5, brand: "Whole Foods", offer: "Free Smoothie", distance: "0.8 mi", points: 150, color: "#5B21B6", emoji: "🥤", expires: "4h", claimed: false },
];

const SPARK_PROFILES = [
    { id: 1, name: "Jordan", age: 28, distance: "0.2 mi", interests: ["Running", "Photography", "Travel"], playing: "City Tag", emoji: "🏃", match: 94 },
    { id: 2, name: "Riley", age: 26, distance: "0.4 mi", interests: ["Music", "Coffee", "Gaming"], playing: "Ghost & Seek", emoji: "🎵", match: 87 },
    { id: 3, name: "Alex", age: 30, distance: "0.5 mi", interests: ["Hiking", "Art", "Food"], playing: "Scavenger Hunt", emoji: "🎨", match: 81 },
    { id: 4, name: "Morgan", age: 27, distance: "0.7 mi", interests: ["Fitness", "Books", "Dogs"], playing: "City Tag", emoji: "📚", match: 76 },
];

const CREW_INTERESTS = ["Running", "Photography", "Coffee", "Gaming", "Music", "Travel", "Hiking", "Art", "Food", "Fitness", "Books", "Dogs"];

const CREW_MEMBERS = [
    { id: 1, name: "The Midnight Runners", members: 8, activity: "City Assassin", level: "Elite", emoji: "🌙" },
    { id: 2, name: "Downtown Explorers", members: 12, activity: "Scavenger Hunt", level: "Veteran", emoji: "🗺️" },
    { id: 3, name: "Ghost Squad", members: 5, activity: "Ghost & Seek", level: "Pro", emoji: "👻" },
    { id: 4, name: "Sunday Hunters", members: 20, activity: "Brand Drops", level: "Rookie", emoji: "☀️" },
];

const EVENTS = [
    { id: 1, name: "Ghost City Night Tour", type: "Night Game", time: "Tonight 10PM", players: 847, entry: "$40", emoji: "👻", hot: true },
    { id: 2, name: "Downtown Scavenger Hunt", type: "City Hunt", time: "Sat 2PM", players: 234, entry: "Free", emoji: "🗺️", hot: false },
    { id: 3, name: "Brand Blitz: Nike City Sprint", type: "Brand Blitz", time: "Sun 12PM", players: 5200, entry: "Free", emoji: "👟", hot: true },
    { id: 4, name: "Midnight Assassin Run", type: "Night Game", time: "Fri 10PM", players: 412, entry: "$20", emoji: "🎯", hot: false },
    { id: 5, name: "City Championship Qualifier", type: "Championship", time: "Next Sat", players: 1500, entry: "$15", emoji: "🏆", hot: true },
];

const HUSTLERS = [
    { id: 1, name: "Sam K.", role: "Startup Founder", company: "TechCo", distance: "0.1 mi", mutual: 3, emoji: "🚀" },
    { id: 2, name: "Dana L.", role: "VC Analyst", company: "Sequoia", distance: "0.3 mi", mutual: 7, emoji: "💼" },
    { id: 3, name: "Chris M.", role: "Product Lead", company: "Google", distance: "0.4 mi", mutual: 2, emoji: "📱" },
    { id: 4, name: "Pat R.", role: "CMO", company: "Nike", distance: "0.6 mi", mutual: 5, emoji: "🎯" },
];

const GAMES = [
    { id: 1, name: "City Tag", desc: "GPS city-wide tag. Last one standing wins.", players: "2,341 active", entry: "$5", color: "#E8341A", emoji: "🏃", hot: true },
    { id: 2, name: "Ghost & Seek", desc: "Vanish for 90 seconds. Seekers use heat maps.", players: "876 active", entry: "$8", color: "#5B21B6", emoji: "👻", hot: false },
    { id: 3, name: "City Scavenger Hunt", desc: "AR clues hidden across the city. Solve them all.", players: "1,204 active", entry: "$10", color: "#1565C0", emoji: "🗺️", hot: false },
    { id: 4, name: "City Escape Room", desc: "Full narrative mystery spanning city blocks.", players: "432 active", entry: "$15/team", color: "#2E7D32", emoji: "🔐", hot: false },
    { id: 5, name: "City Assassin", desc: "Week-long elimination. Scan your target's QR code.", players: "5,882 active", entry: "$10", color: "#D97706", emoji: "🎯", hot: true },
    { id: 6, name: "Brand Blitz", desc: "Sponsor-activated flash games. Next: Nike.", players: "12,000 waiting", entry: "Free", color: "#C2185B", emoji: "⚡", hot: true },
    { id: 7, name: "Night Games", desc: "Blackout Tag. Shadow Hunt. Ghost City.", players: "Tonight: 847", entry: "$25", color: "#0D1B2A", emoji: "🌙", hot: true },
    { id: 8, name: "Championship", desc: "National Finals. 50K players. $250K prize.", players: "Season active", entry: "Qualified", color: "#B8860B", emoji: "🏆", hot: false },
];

const LEADERBOARD = [
    { rank: 1, name: "ShadowRunner_X", points: 48200, city: "NYC", emoji: "🥇" },
    { rank: 2, name: "NightHunter99", points: 45100, city: "LA", emoji: "🥈" },
    { rank: 3, name: "SlickRick_ATL", points: 43800, city: "ATL", emoji: "🥉" },
    { rank: 4, name: "GhostQueen22", points: 41200, city: "CHI", emoji: "4️⃣" },
    { rank: 5, name: "CityPredator", points: 38900, city: "MIA", emoji: "5️⃣" },
];

// ─── ENDPOINTS ──────────────────────────────────────────────────────────────

app.get('/api/game-data', (req, res) => {
    res.json({
        drops: DROPS,
        sparkProfiles: SPARK_PROFILES,
        crewMembers: CREW_MEMBERS,
        crewInterests: CREW_INTERESTS,
        events: EVENTS,
        hustlers: HUSTLERS,
        games: GAMES,
        leaderboard: LEADERBOARD
    });
});

app.post('/api/claim-drop', (req, res) => {
    const { dropId } = req.body;
    const drop = DROPS.find(d => d.id === dropId);
    if (drop) {
        // In a real app we would update a DB here
        res.json({ success: true, points: drop.points });
    } else {
        res.status(404).json({ error: 'Drop not found' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 LootDrop API Backend running on http://localhost:${PORT}`);
});
