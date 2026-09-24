# Anchor. — SaaS Marketing Website Plan (v2 — Finished Product Extension)

## Context
The user wants a full multi-screen SaaS website for **Anchor** — a WhatsApp lead-recovery and revenue-intelligence platform for Indian high-ticket SMBs. The product document covers 6 build phases (inbox, auto-reply, drip sequences, WhatsApp flows, multi-agent routing, vernacular engine) and a pricing model. The aesthetic should be like Zara/editorial fashion brands: dark, minimal, typographically sharp, cinematic.

## Aesthetic Stance
- **Dark minimalist kinetic** — #080808 ground, near-white foreground, single warm amber accent (#C8953A) for revenue/CTA
- **Fonts (Google Fonts):** DM Serif Display (display headings) + Inter (body/UI) + JetBrains Mono (numbers/labels/data)
- **Motion:** Scroll-triggered section reveals, count-up stat animations, staggered text entrance, animated inbox mockup, intent dial animation
- **Borders:** Hairline 1px rules at ~10% white opacity — Zara-level restraint
- **Radius:** Sharp corners (radius-0 or 2px max)

## Screens / Sections (all in one scrollable page, no router needed)

1. **Sticky Nav** — `Anchor.` wordmark left, links right (Product / Phases / Pricing), CTA button "Get Early Access"
2. **Hero** — Full-viewport dark. Staggered load-in: overline `"WhatsApp Revenue Recovery"`, massive serif headline `"Stop watching ₹ crore leads go cold."`, subhead, dual CTA buttons. Background: subtle grain texture + floating number particles
3. **Stats Bar** — Horizontal strip: `60–70%` leads leak / `391%` drop after 5 mins / `₹ 0` Meta markup / `< 2s` auto-reply — count-up animation on scroll
4. **Problem Section** — Three editorial columns: Response Latency / Meta 24h Cliff / Zero Visibility. Serif headings, mono stats, hairline separators
5. **Product Spotlight (Inbox Preview)** — Animated split: left = inbox list with intent scores, right = chat panel with typing indicator and intent dial animating 0→87. Shows real estate lead data
6. **Phase 1 — Inbox** — Feature grid: Auto-reply engine, Intent dial (0-100), Quick reply `/` shortcuts, Lead tags. Scroll-in from left/right
7. **Phase 2 — Follow-Up Engine** — Timeline visualization: Hour 0 → Hour 1 → Hour 23 → Hour 24+ showing the Meta gate. Animated progress bar
8. **Phase 3 — Commerce & Flows** — WhatsApp flow mockup (multi-screen form), CTWA ad attribution card, Razorpay payment link preview
9. **Phase 4 — Revenue Intelligence** — Dashboard preview: Leaderboard, Revenue Leakage report card (`₹12,00,000 at risk`), Agent SLA table
10. **Phase 5 — Scale** — Hinglish pattern matcher visualization, Integration logos, Map of Indian cities
11. **Competitor Table** — Full-width dark table: Anchor vs Wati vs Interakt vs AiSensy vs DoubleTick across 7 dimensions. Anchor column highlighted in amber
12. **Pricing** — Monthly/Annual toggle (useState), 4 tier cards (Starter/Growth/Business/Enterprise). Growth card is "Hero" — prominently featured. Annual saves 20%
13. **Pipeline Leakage Calculator** — Interactive: slider for ad spend + leads/month → calculates ₹ revenue at risk. Animated number output
14. **Testimonials / Social Proof strip** — 3 quote cards, real estate / healthcare / D2C verticals
15. **CTA Strip** — Full-width: "₹999 to recover your first crore." + email input + button
16. **Footer** — Anchor. logo, nav links, `Made for India's fastest sales teams`

## File Structure
- `src/App.tsx` — main assembly, section imports
- `src/index.css` — Google Font imports + Tailwind + custom tokens + keyframe animations
- `src/components/Nav.tsx`
- `src/components/Hero.tsx`
- `src/components/StatsBar.tsx`
- `src/components/ProblemSection.tsx`
- `src/components/InboxPreview.tsx`
- `src/components/PhaseInbox.tsx`
- `src/components/PhaseFollowUp.tsx`
- `src/components/PhaseCommerce.tsx`
- `src/components/PhaseRevIntel.tsx`
- `src/components/PhaseScale.tsx`
- `src/components/CompetitorTable.tsx`
- `src/components/Pricing.tsx`
- `src/components/LeakageCalculator.tsx`
- `src/components/Testimonials.tsx`
- `src/components/CTAStrip.tsx`
- `src/components/Footer.tsx`
- `src/hooks/useInView.ts` — IntersectionObserver hook for scroll animations

## Key Animations
- **Hero:** CSS keyframe stagger — overline fades in t=0, headline slides up t=200ms, subhead t=400ms, buttons t=600ms
- **Count-up:** useInView triggers requestAnimationFrame counter from 0 to target value
- **Section reveals:** `opacity-0 translate-y-8` → `opacity-100 translate-y-0` with 600ms ease-out, triggered by useInView
- **Intent dial:** SVG arc animates from 0° to target angle when section enters view
- **Pricing toggle:** height/opacity transition on monthly↔annual price swap
- **Inbox typing:** CSS animation on a `...` typing indicator with 3 bouncing dots

## Design Tokens (in src/index.css via @theme)
```
--background: #080808
--foreground: #F0EDE8
--muted: #1A1A1A
--muted-foreground: #6B6B6B
--accent: #C8953A  (amber, revenue/CTA only)
--border: rgba(255,255,255,0.08)
--radius: 2px
--font-display: 'DM Serif Display'
--font-body: 'Inter'
--font-mono: 'JetBrains Mono'
```

## Fonts (CSS @import in src/index.css, before everything)
```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
```

---

## v2 Extension — Finished Product Screens

### Context
The existing 16 sections cover the core marketing narrative. For a market-ready finished product, we need: (1) a dedicated multi-page app with React Router so each screen has its own URL, (2) missing product-quality screens that real buyers expect to see before paying, and (3) a live app dashboard preview (not just mockup screenshots) to build credibility.

### New Pages (React Router — dedicated routes)

We'll convert the current single-scroll to a **multi-page SPA** with React Router v6. Existing scroll sections become the `/` landing page. New routes:

| Route | Screen | Purpose |
|---|---|---|
| `/` | Landing (existing 16 sections) | Marketing homepage |
| `/product` | Product Deep-Dive | Interactive demo with tabs for each feature |
| `/dashboard` | Live Dashboard Preview | Functional demo of the Anchor dashboard UI |
| `/onboarding` | Onboarding Flow | 3-step wizard — Connect WhatsApp, Set Auto-Reply, Go Live |
| `/blog` | Blog / Resources | 3 article cards + featured post |
| `/changelog` | Changelog | Product version history — builds trust |
| `/about` | About / Team | Founder story + mission for Indian SMBs |

### New Landing Page Sections (inserted into `/` before Footer)

1. **`GTMStrip.tsx`** — Horizontal marquee strip showing the 3 GTM phases (0→25 customers / 25→100 / 100→500) with animated progress fills. Sits between Testimonials and CTAStrip.
2. **`MilestoneTimeline.tsx`** — 6 milestone cards (M1 Alpha → M6 Nationwide) in a horizontal scroll rail on desktop, vertical stack on mobile. Shows Target Horizon, Metric, Expected MRR.
3. **`SecurityStrip.tsx`** — Trust bar: HMAC-SHA256 · GDPR Ready · JWT Auth · Meta Official Partner · 99.9% Uptime SLA · ISO 27001. Thin monospace strip between pricing and calculator.
4. **`LiveDemoBar.tsx`** — Sticky bottom bar (appears after scrolling 30% of page): "See Anchor live — try the demo →" with button linking to `/dashboard`. Slides up from bottom.

### `/dashboard` — Full Interactive Dashboard
This is the most important new screen. A real working Anchor dashboard demo:

**Layout:** Fixed sidebar + main content area  
**Sidebar:** Logo, nav items (Inbox / Drip Engine / Templates / Analytics / Team / Settings), agent avatar, online indicator  
**Tabs/Views:**
- **Inbox tab (default):** Exact InboxPreview but full-page — lead list left, chat center, lead intel right. Add keyboard shortcut hints (`⌘K` search, `/` quick reply)
- **Analytics tab:** 4 KPI cards (Leads Today / Response Rate / Revenue Recovered / Active Sessions) + a Recharts line chart (7-day trend) + bar chart (leads by channel)
- **Drip Engine tab:** Table of active drip sequences with on/off toggles, send counts, reply rates, A/B variant badges
- **Templates tab:** Grid of approved Meta templates with status badges (APPROVED/PENDING), variable preview, copy button

**Header:** Search bar, notification bell (3 unread), agent name, `LIVE` badge with pulse dot

### `/onboarding` — 3-Step Wizard
Step 1: "Connect your WhatsApp Business Number" — phone input + OTA code entry mock  
Step 2: "Set your first auto-reply" — keyword input, response text editor, working hours toggle, preview panel showing how it looks on WhatsApp  
Step 3: "Go Live" — success animation, confetti, "Your first lead will be replied to in under 2 seconds" + link to dashboard

### `/product` — Feature Deep-Dive with Tabs
Tab 1: **Speed** — animated benchmark comparison (Anchor 1.4s vs Human avg 3.6 hrs)  
Tab 2: **Intelligence** — Intent dial interactive demo (user clicks "budget", "site visit" keywords and dial animates up)  
Tab 3: **Compliance** — Meta policy explainer with Hour 23 state machine visualization  
Tab 4: **Scale** — Multi-agent routing diagram, round-robin animation  

### `/changelog` — Builds Trust
Version cards: v1.0 → v1.1 → v1.2 → v1.3, each with date, tag (NEW / IMPROVED / FIXED), and 3–5 bullet items

### `/about` — Founder Story
"Built by founders who lost deals." Editorial two-column: left = large serif text story, right = team card(s). India map background subtle. Mission statement.

### `/blog` — Resources Hub
Featured post hero + 6 article cards: "How Wati.io is secretly marking up your Meta fees 25%", "The 5-minute rule that killed your WhatsApp lead", "Hinglish keyword strategies for real estate", etc.

### Updated Nav Links
Existing: Product / Phases / Pricing / Calculator  
New: **Product** (→ `/product`) / **Dashboard** (→ `/dashboard`) / **Pricing** (→ `/#pricing`) / **Blog** (→ `/blog`) / CTA button unchanged

### Router Setup
- Install `react-router-dom` v6 
- Wrap App in `<BrowserRouter>` in `main.tsx`
- `src/App.tsx` becomes a router shell with `<Routes>` + `<Route>` for each page
- Each page is in `src/pages/` folder: `Home.tsx`, `Dashboard.tsx`, `Onboarding.tsx`, `Product.tsx`, `Changelog.tsx`, `About.tsx`, `Blog.tsx`
- `Home.tsx` contains the 16 existing section imports in order
- Shared layout (Nav + Footer) wraps all pages via a `Layout.tsx` component, except Dashboard (which has its own full-screen layout)

### Chart Library
Install `recharts` for the Analytics tab in Dashboard — Line chart + Bar chart for 7-day lead trend and channel breakdown.

### Files to Create/Modify
- `src/main.tsx` — add BrowserRouter
- `src/App.tsx` — convert to router shell
- `src/pages/Home.tsx` — extract existing 16 sections
- `src/pages/Dashboard.tsx` — full interactive dashboard
- `src/pages/Onboarding.tsx` — 3-step wizard
- `src/pages/Product.tsx` — tabbed feature deep-dive
- `src/pages/Changelog.tsx`
- `src/pages/About.tsx`
- `src/pages/Blog.tsx`
- `src/components/Layout.tsx` — shared nav + footer wrapper
- `src/components/GTMStrip.tsx` — new landing section
- `src/components/MilestoneTimeline.tsx` — new landing section
- `src/components/SecurityStrip.tsx` — new landing section
- `src/components/LiveDemoBar.tsx` — sticky bottom bar

### Verification
- Open `/` — all 16 existing sections render, 4 new sections appear (GTMStrip before Testimonials, MilestoneTimeline before CTAStrip, SecurityStrip between Pricing and Calculator, LiveDemoBar slides up on scroll)
- Navigate to `/dashboard` — sidebar renders, all 4 tabs switch content, Recharts charts render in Analytics tab, drip toggles work
- Navigate to `/onboarding` — step 1→2→3 progress works, step 3 shows success state
- Navigate to `/product` — all 4 tabs switch, intent dial interactive
- Navigate to `/changelog`, `/about`, `/blog` — content renders correctly
- Nav links route to correct pages
- Mobile: hamburger opens menu, dashboard sidebar collapses to bottom tab bar

## Verification
- Dev server is already running on $PORT — open preview and scroll through all sections
- Check Hero animation plays on load
- Check count-up stats trigger on scroll into view
- Check pricing toggle switches between monthly/annual prices
- Check leakage calculator updates output when sliders move
- Check intent dial animates when InboxPreview section scrolls into view
- Verify responsive: collapse nav to hamburger at <768px, stack columns to single column
