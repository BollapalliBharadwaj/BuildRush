require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static prototype directory
app.use(express.static(path.join(__dirname, "../prototype")));

const GOAL = Number(process.env.GOAL) || 500;
const PORT = process.env.PORT || 5000;

// Helper to generate a unique code
function makeCode(name) {
  const base = (name.replace(/[^a-zA-Z]/gi, "").toUpperCase().slice(0, 4)) || "USER";
  const checkStmt = db.prepare("SELECT id FROM users WHERE code = ?");

  for (let i = 0; i < 20; i++) {
    const code = base + Math.floor(100 + Math.random() * 900);
    const existing = checkStmt.get(code);
    if (!existing) return code;
  }
  throw new Error("Could not generate a unique referral code");
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "BuildRush API",
    database: "SQLite (buildrush.db)",
    goal: GOAL
  });
});

// Register a student (with deduplication by 10-digit Indian mobile)
app.post("/api/register", (req, res) => {
  try {
    const { name, college, branch, phone, ref } = req.body || {};

    if (!name || !college || !/^[6-9]\d{9}$/.test(phone || "")) {
      return res.status(400).json({
        error: "Name, college, and a valid 10-digit Indian mobile number are required"
      });
    }

    // Check duplicate phone
    const existingPhone = db.prepare("SELECT id FROM users WHERE phone = ?").get(phone);
    if (existingPhone) {
      return res.status(409).json({
        error: "This mobile number is already registered for the workshop!"
      });
    }

    // Check if referrer code exists
    let referredBy = (ref || "").trim().toUpperCase();
    if (referredBy) {
      const validReferrer = db.prepare("SELECT id FROM users WHERE code = ?").get(referredBy);
      if (!validReferrer) referredBy = "";
    }

    const code = makeCode(name);
    const userBranch = branch || "CSE";

    db.prepare(`
      INSERT INTO users (name, college, branch, phone, code, referredBy)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(name.trim(), college.trim(), userBranch, phone.trim(), code, referredBy);

    res.status(201).json({
      name,
      college,
      branch: userBranch,
      code,
      referredBy
    });
  } catch (e) {
    res.status(500).json({ error: "Server error: " + e.message });
  }
});

// Student personal dashboard stats
app.get("/api/me/:code", (req, res) => {
  try {
    const code = req.params.code.toUpperCase();
    const user = db.prepare("SELECT name, college, branch, code FROM users WHERE code = ?").get(code);
    if (!user) return res.status(404).json({ error: "Student not found" });

    const { referrals } = db.prepare("SELECT COUNT(*) AS referrals FROM users WHERE referredBy = ?").get(code);
    res.json({ ...user, referrals });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

// Total progress toward 500
app.get("/api/stats", (_req, res) => {
  try {
    const { total } = db.prepare("SELECT COUNT(*) AS total FROM users").get();
    res.json({ total, goal: GOAL, remaining: Math.max(0, GOAL - total) });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

// Top 5 referrers leaderboard
app.get("/api/leaderboard", (_req, res) => {
  try {
    const rows = db.prepare(`
      SELECT u.name, u.code, COUNT(r.id) AS referrals
      FROM users u
      JOIN users r ON r.referredBy = u.code
      GROUP BY u.code
      ORDER BY referrals DESC
      LIMIT 5
    `).all();
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

// College battle tally
app.get("/api/colleges", (_req, res) => {
  try {
    const rows = db.prepare(`
      SELECT college, COUNT(*) AS count
      FROM users
      GROUP BY college
      ORDER BY count DESC
    `).all();
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

// Start Express server
app.listen(PORT, () => {
  console.log(`🚀 BuildRush SQLite API running on http://localhost:${PORT}`);
  console.log(`📁 Database: SQLite (server/buildrush.db)`);
});
