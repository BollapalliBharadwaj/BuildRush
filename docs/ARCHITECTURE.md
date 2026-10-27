# Architecture & Design Decisions

```
Student (Mobile/Web) ──► Frontend (prototype/index.html)
                               │  - Standalone LocalStorage or Live Express API
                               │  - Branch-specific AI Project Matcher
                               │  - WhatsApp deep-link generation (wa.me)
                               ▼
                        Express API (server/server.js)
                        - Deduplication by 10-digit Indian mobile number
                        - Unique referral code generator (e.g. BHAR482)
                        - Atomic credit to referrer
                               ▼
                        SQLite Database (server/buildrush.db)
                        Table `users`:
                        { id, name, college, branch, phone, code, referredBy, createdAt }
                               ▼
                        Aggregations:
                        - Progress toward 500 milestone
                        - Top 5 Student Referrers (₹1,000 prize pool)
                        - Inter-College Campus Battle
```

## Growth Strategy & Decisions
1. **Referral Loop over Paid Ads (Budget Constraint)**:
   - At an average CPC of ₹35–₹50 on Meta/Google Ads, a ₹2,000 budget would yield at most 40–55 clicks (~15–20 registrations).
   - Instead, ₹1,000 is allocated to top 5 student referrers (₹200 recharge each), turning students into viral distribution channels in college WhatsApp groups.
   - The remaining ₹1,000 is reserved for Class Representatives (CRs) / Club Leads to kickstart seed groups.

2. **Branch-Tailored AI Personalizer**:
   - Non-CSE students (ECE, Mechanical, Civil) often ignore AI workshops assuming it is only for software engineers.
   - The app dynamically matches the student's branch with a real-world AI project (e.g., *Mechanical: Predictive Equipment Maintenance*, *ECE: Edge AI gesture detection*) and injects it into their pre-written WhatsApp invite.

3. **Zero Friction & Anti-Fraud**:
   - `wa.me/?text=...` deep-links require zero WhatsApp Business API costs and enable 1-click sharing.
   - 10-digit mobile number uniqueness prevents fake spam submissions.

4. **Zero-Dependency Resilience**:
   - Evaluators can open `prototype/index.html` directly in any browser with zero installation or setup.
   - If the Express server is running, it connects; if offline, it functions seamlessly with localStorage.

