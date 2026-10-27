const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "buildrush.db");
const db = new Database(dbPath);

// Enable WAL mode for better concurrency and fast writes
db.pragma("journal_mode = WAL");

// Initialize users table and indexes
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    college TEXT NOT NULL,
    branch TEXT NOT NULL DEFAULT 'CSE',
    phone TEXT NOT NULL UNIQUE,
    code TEXT NOT NULL UNIQUE,
    referredBy TEXT DEFAULT '',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_users_code ON users(code);
  CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
  CREATE INDEX IF NOT EXISTS idx_users_referredBy ON users(referredBy);
  CREATE INDEX IF NOT EXISTS idx_users_college ON users(college);
`);

// Pre-seed initial sample data if table is empty
const countStmt = db.prepare("SELECT COUNT(*) AS total FROM users");
const { total } = countStmt.get();

if (total === 0) {
  const insertStmt = db.prepare(`
    INSERT INTO users (name, college, branch, phone, code, referredBy)
    VALUES (@name, @college, @branch, @phone, @code, @referredBy)
  `);

  const initialUsers = [
    { name: "Asha K.", college: "SRM University AP", branch: "CSE", phone: "9848011223", code: "ASHA214", referredBy: "" },
    { name: "Ravi Teja", college: "VIT-AP", branch: "ECE", phone: "9848022334", code: "RAVI482", referredBy: "" },
    { name: "Meenakshi S.", college: "KL University", branch: "CSE", phone: "9848033445", code: "MEEN907", referredBy: "" },
    { name: "Kiran Kumar", college: "SRM University AP", branch: "MECH", phone: "9848044556", code: "KIRA311", referredBy: "ASHA214" },
    { name: "Sai Praneeth", college: "SRM University AP", branch: "CSE", phone: "9848055667", code: "SAIP056", referredBy: "ASHA214" },
    { name: "Divya V.", college: "VIT-AP", branch: "CSE", phone: "9848066778", code: "DIVY128", referredBy: "RAVI482" },
    { name: "Manoj P.", college: "Vignan's University", branch: "ECE", phone: "9848077889", code: "MANO654", referredBy: "ASHA214" }
  ];

  const seedTx = db.transaction((usersList) => {
    for (const u of usersList) insertStmt.run(u);
  });
  seedTx(initialUsers);
  console.log("Initialized SQLite database with seed records in buildrush.db");
}

module.exports = db;
