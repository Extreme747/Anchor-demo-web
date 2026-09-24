# ⚓ ANCHOR — Master Screen List (All Phases)

> **Total Screens:** 87  
> **Status Legend:** ⬜ Not Started | 🟡 In Progress | ✅ Done  
> **Type Legend:** 📄 Page | 💬 Modal | 📌 Panel | 🧩 Widget/Component | 🔀 Flow (Multi-step)

---

## 🌐 GLOBAL SCREENS (Auth, Onboarding, Settings) — 14 Screens

### Authentication — 4 Screens

| # | Screen Name | Type | Description | Status |
|---|-------------|------|-------------|--------|
| G01 | Login | 📄 Page | Email/Phone + Password login, Google SSO button, OTP login option, "Forgot Password" link | ⬜ |
| G02 | Sign Up / Register | 📄 Page | Name, Email, Phone, Business Name, Password, T&C checkbox | ⬜ |
| G03 | Forgot Password | 📄 Page | Email/Phone input → OTP verify → New password set | ⬜ |
| G04 | OTP Verification | 📄 Page | 6-digit OTP input field, resend timer (30s), verify button | ⬜ |

### Onboarding — 3 Screens

| # | Screen Name | Type | Description | Status |
|---|-------------|------|-------------|--------|
| G05 | Onboarding — Business Info | 🔀 Flow | Business name, industry dropdown (Real Estate / Healthcare / D2C / EdTech / Other), team size selector | ⬜ |
| G06 | Onboarding — Meta API Connect | 🔀 Flow | Facebook Business Manager OAuth login, WABA selection, phone number verification, webhook auto-config | ⬜ |
| G07 | Onboarding — First Template | 🔀 Flow | Pick/create welcome auto-reply template, set working hours, success confetti → redirect to Inbox | ⬜ |

### Global Navigation & Settings — 7 Screens

| # | Screen Name | Type | Description | Status |
|---|-------------|------|-------------|--------|
| G08 | Main Sidebar Navigation | 🧩 Component | Persistent left nav: Inbox, Leads, Automations, Templates, Analytics, Settings. Active state, collapse toggle | ⬜ |
| G09 | Profile Settings | 📄 Page | Avatar upload, name, email, phone, password change, notification preferences (WhatsApp/Email/Push toggles) | ⬜ |
| G10 | Organization Settings | 📄 Page | Org name, logo, timezone, working hours (Mon-Sat picker), default auto-reply toggle, number masking toggle | ⬜ |
| G11 | Billing & Subscription | 📄 Page | Current plan card, plan comparison, upgrade/downgrade CTA, Meta wallet balance, payment history table, invoice download | ⬜ |
| G12 | Team Management | 📄 Page | Team members table: name, email, role (Owner/Manager/Agent) dropdown, status (Active/Invited/Disabled), invite button | ⬜ |
| G13 | Notification Center | 📌 Panel | Bell icon dropdown: real-time alerts — new lead, SLA breach, low wallet, template approved/rejected, payment received | ⬜ |
| G14 | 404 / Error Page | 📄 Page | Friendly illustration, "Page not found" message, "Go to Inbox" button | ⬜ |

---

## 🔹 PHASE 0 — Protocol Foundation & Admin — 6 Screens

### Webhook & API Config — 3 Screens

| # | Screen Name | Type | Description | Status |
|---|-------------|------|-------------|--------|
| P0-01 | Meta API Configuration | 📄 Page | Webhook URL (copy button), Verify Token, App Secret (masked), Phone Number ID, WABA ID, connection status badge ✅/❌, "Test Connection" button | ⬜ |
| P0-02 | Webhook Event Log | 📄 Page | Real-time scrolling table: timestamp, event type (message/status/template), payload preview (expandable), status (Processed/Failed/Queued), retry button | ⬜ |
| P0-03 | API Health Dashboard | 📄 Page | Uptime %, avg response time gauge, queue depth chart, messages processed today counter, error rate %, last 24h timeline graph | ⬜ |

### Cost Tracking — 3 Screens

| # | Screen Name | Type | Description | Status |
|---|-------------|------|-------------|--------|
| P0-04 | Meta Wallet & Balance | 📄 Page | Current balance (big number), auto-recharge toggle + threshold, recharge history table, low balance alert config (₹ amount) | ⬜ |
| P0-05 | Per-Message Cost Dashboard | 📄 Page | Today's spend: Marketing msgs (count × ₹0.86), Utility (count × ₹0.115), Auth (count × ₹0.115), Service (free/count). Total ₹ spent. "Anchor markup: ₹0" highlight | ⬜ |
| P0-06 | CTWA Lead Tracker | 🧩 Widget | CTWA leads today count, 72h free window active count, estimated ₹ savings badge, "vs competitor cost" comparison | ⬜ |

---

## 🔹 PHASE 1 — Zero-Leak Inbox & Lead Machine — 19 Screens

### Main Inbox — 5 Screens

| # | Screen Name | Type | Description | Status |
|---|-------------|------|-------------|--------|
| P1-01 | Inbox — Full 3-Panel Layout | 📄 Page | THE core screen. Left: lead list. Center: chat. Right: lead intel. Responsive for desktop. Real-time via WebSocket | ⬜ |
| P1-02 | Lead List Panel (Left) | 📌 Panel | Search bar, status tabs (All/New/Contacted/Qualified/Won/Lost), tag filter pills, sort dropdown (Newest/Intent Score/Unread), CTWA 📢 badge per lead, unread count bubble | ⬜ |
| P1-03 | Chat Thread Panel (Center) | 📌 Panel | Chat bubbles (sent=right/blue, received=left/gray), read receipts ✓✓, timestamps, media thumbnails (image/video/audio/PDF), message cost micro-tag (₹0.86), typing indicator | ⬜ |
| P1-04 | Lead Intelligence Panel (Right) | 📌 Panel | 0-100 Intent Dial (circular gauge), lead value ₹ input, colored tags, phone (masked: +91 98XXX XXX23), source badge, activity timeline, internal notes section, CTWA 72h countdown timer | ⬜ |
| P1-05 | Empty Inbox State | 🧩 Component | Illustration + "No conversations yet" + CTAs: "Import Leads CSV", "Connect Meta API", "Send Test Message" | ⬜ |

### Chat Interactions — 4 Screens

| # | Screen Name | Type | Description | Status |
|---|-------------|------|-------------|--------|
| P1-06 | Message Composer Bar | 🧩 Component | Text input (multi-line), attach 📎 (image/video/doc), emoji picker 😀, `/` slash trigger, template selector 📋, send button ➤, 24h lock indicator | ⬜ |
| P1-07 | Quick Reply Popup (`/`) | 💬 Modal | Triggered by `/` keystroke. Searchable list: `/visit`, `/brochure`, `/pricing`, `/location`, `/followup`. Preview with {{variable}} replacement. Click to insert | ⬜ |
| P1-08 | Media Preview & Gallery | 💬 Modal | Full-screen lightbox: image zoom/pan, video player, PDF viewer, audio waveform player, download button, forward button | ⬜ |
| P1-09 | 24h Session Status Bar | 🧩 Component | Inline bar above composer: 🟢 "Free chat: 18h 23m remaining" → 🟡 "⚠️ 58m left — switch to template" → 🔴 "🔒 Session expired — Templates only" | ⬜ |

### Lead Management — 6 Screens

| # | Screen Name | Type | Description | Status |
|---|-------------|------|-------------|--------|
| P1-10 | Lead Detail Full Page | 📄 Page | Complete profile: photo placeholder, all fields (name/phone/email/company/source/city), full conversation history, intent score graph (7-day trend), all tags, all notes, assigned agent, created date | ⬜ |
| P1-11 | Lead Create / Edit | 💬 Modal | Form: Name*, Phone*, Email, Company, Source dropdown, Tags multi-select, Lead Value ₹, Assign Agent dropdown, Notes textarea | ⬜ |
| P1-12 | Tag Manager | 💬 Modal | Tag list with color dots, create new (name + color picker), edit, delete with confirmation, usage count per tag | ⬜ |
| P1-13 | CSV Import Wizard | 💬 Modal | Step 1: Upload file (drag-drop). Step 2: Column mapping (Name→Name, Phone→Phone). Step 3: Preview 5 rows. Step 4: Import progress bar + dedup report | ⬜ |
| P1-14 | CSV Export | 💬 Modal | Checkboxes: select fields to export. Date range picker. Status filter. Format: CSV/XLSX. Download button | ⬜ |
| P1-15 | Lead Bulk Actions Bar | 🧩 Component | Appears on multi-select: "23 leads selected" → buttons: Assign Agent, Add Tag, Change Status, Enroll in Sequence, Delete | ⬜ |

### Configuration — 4 Screens

| # | Screen Name | Type | Description | Status |
|---|-------------|------|-------------|--------|
| P1-16 | Auto-Reply Rules List | 📄 Page | Table: Rule name, Trigger type (Keyword/Regex/Default/Working Hours), Response preview, Enabled/Disabled toggle, Priority order (drag to reorder) | ⬜ |
| P1-17 | Auto-Reply Rule Create/Edit | 💬 Modal | Trigger type dropdown, keyword/regex input, response template editor with {{name}}, {{business}}, {{phone}}, {{time}} chips, dedup lock (minutes), test preview | ⬜ |
| P1-18 | Intent Scoring Config | 📄 Page | Three sections: Budget Triggers (+25 pts each), Timeline Triggers (+30 pts), Action Triggers (+35 pts). Each: keyword input + points slider. Hinglish toggle section. Decay config (pts per X hours) | ⬜ |
| P1-19 | Number Masking Settings | 📄 Page | Master toggle On/Off, role visibility matrix (Owner: Full / Manager: Full / Agent: Masked), masking format preview, export restriction toggle | ⬜ |

---

## 🔹 PHASE 2 — Automated Follow-Up Engine — 14 Screens

### Drip Sequences — 5 Screens

| # | Screen Name | Type | Description | Status |
|---|-------------|------|-------------|--------|
| P2-01 | Sequences List | 📄 Page | Cards/table: Sequence name, status pill (Active 🟢 / Paused 🟡 / Draft ⚪), leads enrolled count, reply rate %, steps count, created date, duplicate/edit/delete actions | ⬜ |
| P2-02 | Sequence Builder (Visual) | 📄 Page | Visual timeline/flowchart builder: Add step nodes → set delay (1h/23h/72h) → connect branches. Adaptive logic: IF replied → stop, IF clicked → branch, IF ignored → escalate. Drag-drop reorder | ⬜ |
| P2-03 | Sequence Step Editor | 💬 Modal | Step type (Send Message / Send Template / Wait / Condition). Message editor with {{vars}}. Template picker. Delay input (hours/days). Branch condition: Replied / Clicked / Ignored / Score > X | ⬜ |
| P2-04 | Sequence Analytics | 📄 Page | Visual funnel: Enrolled (500) → Step 1 Sent (498) → Replied (89) → Step 2 Sent (409) → Replied (34) → Converted (12). Per-step open/reply rates. Drop-off analysis | ⬜ |
| P2-05 | Sequence Enrollment | 💬 Modal | Lead filter: by status, tag, intent score range, date range, agent. Preview matching leads count. Confirm enroll button. Schedule start option | ⬜ |

### Template Management — 4 Screens

| # | Screen Name | Type | Description | Status |
|---|-------------|------|-------------|--------|
| P2-06 | Template Library | 📄 Page | Grid/list view toggle. Columns: Name, Category badge (Marketing 🟣 / Utility 🔵 / Auth 🟠), Language, Status (Approved ✅ / Pending ⏳ / Rejected ❌), Last Used date, Usage count. Filter + search | ⬜ |
| P2-07 | Template Create / Edit | 📄 Page | Header section (None/Text/Image/Video/Document upload). Body textarea with {{1}}, {{2}} variable buttons. Footer text. Buttons section (Quick Reply / CTA URL / CTA Phone). Category selector. Language picker. Submit for approval button | ⬜ |
| P2-08 | Template Preview | 💬 Modal | iPhone/Android mockup frame showing exact WhatsApp render: header media, body text with filled variables, footer, buttons. Dark/light mode toggle | ⬜ |
| P2-09 | Template Approval Status | 🧩 Component | Pipeline tracker: Draft → Submitted → Meta Reviewing → Approved/Rejected. Rejection reason display. "Edit & Resubmit" button. Estimated review time | ⬜ |

### A/B Testing & Optimization — 5 Screens

| # | Screen Name | Type | Description | Status |
|---|-------------|------|-------------|--------|
| P2-10 | A/B Test List | 📄 Page | Table: Test name, Template A vs B names, Status (Running/Completed), Sample size, Duration, Winner badge 🏆 | ⬜ |
| P2-11 | A/B Test Create | 💬 Modal | Select Template A (dropdown), Select Template B (dropdown), Audience split slider (50/50 default), Test duration, Success metric (Reply Rate / Click Rate / Conversion), Start test button | ⬜ |
| P2-12 | A/B Test Results | 📄 Page | Side-by-side cards: Template A vs B. Metrics: Sent, Delivered, Read, Replied, Conversion %. Statistical significance indicator. "🏆 Promote Winner" button. Chart comparison | ⬜ |
| P2-13 | Frequency Cap Dashboard | 🧩 Widget | "Meta frequency status: 23 msgs deferred today | Next retry: 4h 12m | Success rate: 94.2%" Progress bar. Deferred message queue list | ⬜ |
| P2-14 | Service Cost Optimizer | 🧩 Widget | "Service msgs today: 47 | Free window resolved: 39 (83%) | Est. cost under Oct'26 pricing: ₹94 | Saved: ₹368" Tips to improve | ⬜ |

---

## 🔹 PHASE 3 — Conversational Commerce & Flows — 10 Screens

### WhatsApp Flows — 3 Screens

| # | Screen Name | Type | Description | Status |
|---|-------------|------|-------------|--------|
| P3-01 | Flows Library | 📄 Page | Pre-built templates grid: "Real Estate Site Visit" / "Doctor Appointment" / "D2C Order Form" / "EdTech Enrollment". Custom flows list. Create new button. Usage stats per flow | ⬜ |
| P3-02 | Flow Builder | 📄 Page | Multi-screen form editor: Screen 1 → Screen 2 → Screen 3. Per screen: add fields (Text Input / Dropdown / Date Picker / Radio / Checkbox). Set field labels in Hindi/English. Conditional skip logic. Submit action → auto-create lead config | ⬜ |
| P3-03 | Flow Responses Dashboard | 📄 Page | Table: Lead name, phone, submission date, per-field responses (Budget: ₹1.5 Cr / Config: 3BHK / Visit Date: 28 Sept). Auto-created lead link. Export button | ⬜ |

### Payments — 3 Screens

| # | Screen Name | Type | Description | Status |
|---|-------------|------|-------------|--------|
| P3-04 | Payment Links Manager | 📄 Page | Table: Amount ₹, Description, Lead linked, Payment method (Razorpay/UPI/WhatsApp Pay), Status (Created 🔵 / Sent 🟡 / Paid ✅ / Expired ⚫), Created date, "Send in Chat" action | ⬜ |
| P3-05 | Payment Link Create | 💬 Modal | Amount input ₹, Description, Expiry (hours/days), Payment methods checkboxes (Razorpay / UPI Deep Link / WhatsApp Pay), Link to lead dropdown, Auto-update lead status on payment toggle | ⬜ |
| P3-06 | Transaction History | 📄 Page | All payments: Date, Amount ₹, Lead name + phone, Payment method, Transaction ID, Status badge, Receipt download PDF. Filters: date range, status, min/max amount | ⬜ |

### Attribution — 4 Screens

| # | Screen Name | Type | Description | Status |
|---|-------------|------|-------------|--------|
| P3-07 | CTWA Ad Attribution Dashboard | 📄 Page | Per-ad breakdown: Ad name → Campaign → Leads generated → Avg intent score → Conversions → Revenue ₹ → CPA ₹ → ROAS. Date range filter. Chart: leads over time per campaign | ⬜ |
| P3-08 | Campaign-wise ROAS | 📄 Page | Per-template funnel: Template name → Sent count → Delivered → Read → Replied → Site Visits → Bookings → Revenue ₹ → ROAS multiplier. Sort by best/worst ROAS | ⬜ |
| P3-09 | Source Attribution Table | 📄 Page | Sources breakdown: CTWA Ads / Organic WhatsApp / CSV Import / 99acres / MagicBricks / Website Widget / Manual. Per source: lead count, conversion %, avg intent, revenue ₹ | ⬜ |
| P3-10 | Ad Account Connect Setup | 📄 Page | Connect Facebook Ads account (OAuth), Select Meta Pixel, Map conversion events (Lead / Site Visit / Payment) to Anchor lead statuses, Test event button | ⬜ |

---

## 🔹 PHASE 4 — Multi-Agent Routing & Revenue Intelligence — 14 Screens

### Agent Routing — 4 Screens

| # | Screen Name | Type | Description | Status |
|---|-------------|------|-------------|--------|
| P4-01 | Routing Rules Config | 📄 Page | Sections: Round-Robin (toggle + agent pool), Skill-Based Rules list, Territory/Geo Rules list, Budget-Tier Rules. Each rule: condition → assigned team/agent. Priority order drag | ⬜ |
| P4-02 | Routing Rule Create/Edit | 💬 Modal | Condition builder: IF [Tag / City / Budget / Language / Source] [equals / contains / greater than] [value] THEN assign to [Agent / Team] dropdown. Test with sample lead button | ⬜ |
| P4-03 | SLA Configuration | 📄 Page | SLA tiers: Hot leads (7 min) / Warm (15 min) / Cold (1 hr). Escalation chain builder: Agent (7m) → Team Lead (15m) → Manager (30m) → Owner. Auto-revoke toggle. Alert channels (WhatsApp/Email/Push) | ⬜ |
| P4-04 | Agent Availability Board | 📄 Page | Agent cards: Avatar, Name, Status pill (🟢 Online / 🟡 Break / 🔴 Offline), Active chats count, Today's leads handled, Avg FRT today. Manual status override for managers | ⬜ |

### Analytics & Dashboards — 6 Screens

| # | Screen Name | Type | Description | Status |
|---|-------------|------|-------------|--------|
| P4-05 | Main Analytics Dashboard | 📄 Page | Top KPI cards row: Total Leads / Response Rate % / Avg FRT / Conversion Rate / Revenue Tracked ₹ / Pipeline Value ₹. Below: lead trend chart, conversion funnel, hourly activity heatmap | ⬜ |
| P4-06 | Agent Leaderboard | 📄 Page | Ranked table with medals 🥇🥈🥉: Agent name, Leads handled, Avg FRT, Reply rate %, SLA compliance %, Deals closed, Revenue generated ₹. Date range filter. Export | ⬜ |
| P4-07 | Revenue Leakage Report | 📄 Page | THE KILLER SCREEN. Hero number: "₹18,50,000 at risk this week". Leaked leads table: Lead name, Value ₹, Reason (No Reply / SLA Breach / Session Expired / Agent Offline), Recoverable? badge, "Recover Now" action button | ⬜ |
| P4-08 | Agent Performance Detail | 📄 Page | Individual agent view: FRT trend line (7/30 day), Response time heatmap (hour × day), SLA compliance donut chart, Conversations resolved, CSAT score, Revenue attributed ₹ | ⬜ |
| P4-09 | Executive Daily Report (Web) | 📄 Page | Interactive version of the 8AM WhatsApp summary: Leads Received / Responded < 2 min / Leaked / Revenue at Risk ₹ / Total WhatsApp Spend ₹ / Cost per Lead ₹ / ROAS. Print/Share button | ⬜ |
| P4-10 | Trend Analytics | 📄 Page | Multi-chart page: Weekly lead volume (bar), Conversion funnel (funnel chart), Revenue trend (line), Cost trend (line), Agent performance comparison (grouped bar). Date range selector | ⬜ |

### Enterprise Features — 4 Screens

| # | Screen Name | Type | Description | Status |
|---|-------------|------|-------------|--------|
| P4-11 | Number Masking Audit | 📄 Page | Security dashboard: Which agents accessed full numbers (logs), Export attempt logs (blocked/allowed), Data access summary per role, Compliance report download | ⬜ |
| P4-12 | Tally / Zoho Books Integration | 📄 Page | Connect button (OAuth/API key), Field mapping: Lead Status WON → Create Invoice. Payment received → Update ledger. Sync status (Last sync, errors). Test sync button | ⬜ |
| P4-13 | Audit Log | 📄 Page | Searchable activity log: Timestamp, User, Action (Login / Message Sent / Lead Reassigned / Template Created / Settings Changed / Export Attempted), IP address. Filters: user, action type, date | ⬜ |
| P4-14 | Custom Report Builder | 📄 Page | Step 1: Select metrics (checkboxes). Step 2: Apply filters (date, agent, tag, status). Step 3: Choose grouping (by agent / by day / by source). Step 4: Preview table. Download PDF/CSV | ⬜ |

---

## 🔹 PHASE 5 — Vernacular Engine & Nationwide Scale — 10 Screens

### Vernacular & Integrations — 5 Screens

| # | Screen Name | Type | Description | Status |
|---|-------------|------|-------------|--------|
| P5-01 | Hinglish / Regional Keyword Config | 📄 Page | Language tabs: Hindi / Marathi / Gujarati / Telugu / Tamil. Per language: Phrase → Trigger Action mapping table. Test input: type phrase → see matched trigger. Bulk import from CSV | ⬜ |
| P5-02 | Integration Marketplace | 📄 Page | Grid of integration cards: Google Sheets, Zapier, Make.com, LeadSquared, Zoho CRM, 99acres, MagicBricks, Housing.com, IndiaMART, JustDial, Tally ERP. Status badge (Connected ✅ / Available / Coming Soon) | ⬜ |
| P5-03 | Integration Setup Wizard | 🔀 Flow | Per integration: Step 1: Connect (OAuth/API key) → Step 2: Authorize permissions → Step 3: Field mapping → Step 4: Test sync → Step 5: Activate. Progress stepper | ⬜ |
| P5-04 | Google Sheets Sync | 📄 Page | Select Google account → Pick spreadsheet → Pick sheet tab → Map columns (Sheet Column A → Lead Name, Column B → Phone). Sync direction: 1-way push / 2-way. Frequency: Real-time / Hourly / Daily | ⬜ |
| P5-05 | 99acres / MagicBricks Sync | 📄 Page | Connect portal account (credentials/API), Auto-import toggle, Source attribution tag auto-assign, Dedup rules (phone match), Assigned agent/team for portal leads, Test import button | ⬜ |

### Agency & Scale — 5 Screens

| # | Screen Name | Type | Description | Status |
|---|-------------|------|-------------|--------|
| P5-06 | Agency Partner Dashboard | 📄 Page | Multi-client overview: Client list table (Name, Plan, Leads This Month, Revenue Share Earned ₹, Status Active/Churned). Total earnings card. Payout history. "Add New Client" button | ⬜ |
| P5-07 | Agency Client Switcher | 🧩 Component | Top-bar dropdown: Switch between client accounts instantly. Search filter. Star favorites. Last active timestamp per client | ⬜ |
| P5-08 | White-Label Settings | 📄 Page | Upload custom logo, Brand color picker (primary/secondary), Custom domain input (crm.agencyname.com), Email sender name, "Preview" live mockup | ⬜ |
| P5-09 | Meta Embedded Signup | 🔀 Flow | Client self-onboarding wizard: Facebook Login → Select Business Manager → Create WABA → Verify Phone Number → Auto-configure Webhook → Done! 60-second target flow | ⬜ |
| P5-10 | Green Tick Application | 🔀 Flow | Prerequisites checklist (✅ Business verified / ✅ 2FA enabled / ✅ Display name set). Document upload (GST cert, utility bill). Submit application. Status tracker: Submitted → Under Review → Approved/Rejected | ⬜ |

---

## 📊 SUMMARY TABLE

| Phase | Pages | Modals | Panels | Widgets | Flows | Total |
|-------|-------|--------|--------|---------|-------|-------|
| Global | 7 | — | 1 | 1 | 3 | **14** |  
| Phase 0 | 5 | — | — | 1 | — | **6** |
| Phase 1 | 4 | 6 | 3 | 4 | — | **19** |  
| Phase 2 | 7 | 3 | — | 2 | — | **14** |
| Phase 3 | 7 | 1 | — | — | — | **10** |
| Phase 4 | 12 | 1 | — | — | — | **14** |
| Phase 5 | 4 | — | — | 1 | 3 | **10** |
| **TOTAL** | **46** | **11** | **4** | **9** | **6** | **87** |
