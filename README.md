# BuildRush – Viral Referral Engine & AI Personalizer
> **NxtWave Growth Challenge Submission** | Candidate: **Bharadwaj Bollapalli**  
> **Campaign Goal**: 500 final-year registrations in 7 days on a ₹2,000 budget for *“Build Your First AI Project in 60 Minutes”*.

---

## 📑 Challenge Submission Deliverables

| Deliverable | Required Specification | Candidate Asset / Submission Link |
| :--- | :--- | :---: |
| **1. Growth Plan** | Max 5 slides / 2 pages (Persona, 2 Prioritized Channels, 7-Day Sprint, Funnel Math) | [docs/GROWTH_PLAN.md](docs/GROWTH_PLAN.md) |
| **2. Working Asset** | Live working asset that drives registrations (Not just a passive landing page) | [🚀 Live GitHub Pages App](https://bollapallibharadwaj.github.io/BuildRush/) |
| **3. AI + Learning Notes** | 3 Core Questions + 3 Structured Prompt Iteration Examples + What was rejected | [docs/AI_LEARNING_NOTES.md](docs/AI_LEARNING_NOTES.md) |
| **4. 3-Minute Video** | Script & Breakdown: Approach, asset demo, funnel math, and AI judgment | [docs/VIDEO_SCRIPT.md](docs/VIDEO_SCRIPT.md) |

---

## 🌐 Live Prototype & Working Asset
- **Live URL:** [https://bollapallibharadwaj.github.io/BuildRush/](https://bollapallibharadwaj.github.io/BuildRush/)
- **Zero-Setup Local Prototype:** Simply open `prototype/index.html` or `index.html` in any browser.

---

## ⚡ What is BuildRush?
BuildRush is a viral student referral system designed to hit 500 registrations with **zero ad spend**, relying on campus WhatsApp networks, college rivalry, and branch-tailored AI personalization.

### Key Features Built:
1. **Real Lead Capture & Deduplication**:
   - Captures Full Name, WhatsApp Mobile Number (+91 format), College, and Engineering Branch.
   - Prevents duplicate registrations by mobile number.
2. **AI Project & Pitch Personalizer**:
   - Final years from non-CSE branches often drop off. BuildRush matches their branch to a relevant project (*e.g., Mechanical: Predictive Maintenance, ECE: Edge AI*) and generates tailored WhatsApp invites across 4 distinct tones (*Placement Focus, FOMO, Zero-Code, Friendly*).
3. **Frictionless WhatsApp Sharing**:
   - Pre-fills messages and launches WhatsApp with a single tap (`wa.me/?text=...`) with no third-party API costs.
4. **Campus Gamification & College Battle**:
   - Live progress meter tracking toward the 500-seat milestone.
   - Top 5 Referrers Leaderboard (incentivized with ₹200 recharge each = ₹1,000 from the ₹2,000 budget).
   - Inter-College War leaderboard (e.g., SRM vs. VIT vs. KL University).
5. **Evaluator Simulation Mode**:
   - Single-click *"Simulate a friend registering"* button to immediately test referral counting and leaderboard updates in 5 seconds.

---

## 🚀 How to Run & Test

### Option A: 1-Click Browser Prototype (Zero Setup)
Simply open `prototype/index.html` in any web browser:
- Test registration with a name and 10-digit mobile number.
- Append `#ASHA214` to the URL to simulate joining via an existing referral code.
- Click **"⚡ Evaluator Demo: Simulate a friend registering"** to see live referral count and leaderboard movement.

### Option B: Full-Stack Backend (Node.js + Express + SQLite)
```bash
cd server
npm start
```
- That's it! No MongoDB or database setup required.
- SQLite creates `server/buildrush.db` automatically and pre-seeds it with initial test data.
- API runs at `http://localhost:5000`
- Prototype automatically detects the live API and displays `🟢 Live Express API Connected`.

