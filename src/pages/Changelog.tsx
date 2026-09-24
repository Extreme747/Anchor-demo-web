import { Link } from '../router'

const versions = [
  {
    version: 'v1.3',
    date: 'Sep 18, 2026',
    entries: [
      { type: 'NEW', text: 'WhatsApp Flows integration — multi-screen native forms inside WhatsApp' },
      { type: 'NEW', text: 'In-chat Razorpay payment links — collect booking deposits without leaving chat' },
      { type: 'NEW', text: 'Click-to-WhatsApp ad attribution — trace every lead to its exact Meta ad' },
      { type: 'IMPROVED', text: 'Intent Scoring now includes Hinglish signals (kab, kahan, budget, kitna)' },
      { type: 'IMPROVED', text: 'Drip Engine supports up to 10 sequences per number (up from 5)' },
    ],
  },
  {
    version: 'v1.2',
    date: 'Aug 28, 2026',
    entries: [
      { type: 'NEW', text: 'A/B testing engine with 50/50 split and 1-click winner promotion' },
      { type: 'NEW', text: 'Multi-agent routing — Round-Robin, Skill-Based, Load-Balanced modes' },
      { type: 'NEW', text: 'Daily 8 AM executive revenue leakage report via WhatsApp + Email' },
      { type: 'IMPROVED', text: 'Webhook throughput increased to 15,000 events/minute (up from 10k)' },
      { type: 'FIXED', text: 'Hour 23 warning now fires reliably even if lead replies between Hour 22–23' },
      { type: 'FIXED', text: 'CSV export now includes lead score, tags, and last message timestamp' },
    ],
  },
  {
    version: 'v1.1',
    date: 'Aug 05, 2026',
    entries: [
      { type: 'NEW', text: 'Automated drip sequences — 3-step cadence at 1h, 23h, 72h' },
      { type: 'NEW', text: 'Meta 24-hour Session State Machine with automated Hour 23 template switch' },
      { type: 'NEW', text: 'Quick Reply shortcuts — type / to surface template suggestions with variable replacement' },
      { type: 'IMPROVED', text: 'Auto-reply latency reduced from 2.1s avg to 1.4s avg' },
      { type: 'IMPROVED', text: 'Lead tagging now supports up to 10 custom tags per lead' },
    ],
  },
  {
    version: 'v1.0',
    date: 'Jul 14, 2026',
    entries: [
      { type: 'NEW', text: 'Initial release — Meta Cloud API webhook gateway with HMAC-SHA256 verification' },
      { type: 'NEW', text: 'Multi-tenant architecture with role hierarchy (OWNER / MANAGER / AGENT)' },
      { type: 'NEW', text: 'High-Velocity Shared Team Inbox with real-time lead list and chat panel' },
      { type: 'NEW', text: 'Deterministic Intent Scoring Engine (0–100) with budget, timeline, action triggers' },
      { type: 'NEW', text: 'CSV lead import/export, lead status filters, custom tags' },
    ],
  },
]

const typeStyles: Record<string, { bg: string; color: string; border: string }> = {
  NEW: { bg: 'rgba(200,149,58,0.1)', color: '#C8953A', border: 'rgba(200,149,58,0.2)' },
  IMPROVED: { bg: 'rgba(74,222,128,0.08)', color: '#4ADE80', border: 'rgba(74,222,128,0.15)' },
  FIXED: { bg: 'rgba(96,165,250,0.08)', color: '#60A5FA', border: 'rgba(96,165,250,0.15)' },
}

export default function Changelog() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-24">
        <Link to="home" className="font-mono text-[10px] text-[#6B6B6B] hover:text-[#F0EDE8] transition-colors tracking-widest">
          ← BACK TO HOME
        </Link>

        <h1 className="font-display text-5xl text-[#F0EDE8] mt-6 mb-3 leading-tight">Changelog.</h1>
        <p className="text-[#6B6B6B] mb-16">New features, improvements, and fixes — shipped fast.</p>

        <div className="space-y-12">
          {versions.map((v, vi) => (
            <div key={v.version} className="grid md:grid-cols-[120px_1fr] gap-6">
              <div className="flex-shrink-0">
                <div className="font-mono text-sm text-[#F0EDE8] font-medium">{v.version}</div>
                <div className="font-mono text-[10px] text-[#6B6B6B] mt-1">{v.date}</div>
                {vi === 0 && (
                  <span className="inline-block font-mono text-[9px] px-2 py-1 bg-[#C8953A]/10 text-[#C8953A] border border-[#C8953A]/20 mt-2" style={{ borderRadius: 2 }}>
                    LATEST
                  </span>
                )}
              </div>
              <div className="space-y-2 border-l border-white/8 pl-6">
                {v.entries.map((entry, ei) => (
                  <div key={ei} className="flex items-start gap-3">
                    <span
                      className="font-mono text-[9px] px-1.5 py-0.5 flex-shrink-0 mt-0.5"
                      style={{ borderRadius: 2, background: typeStyles[entry.type].bg, color: typeStyles[entry.type].color, border: `1px solid ${typeStyles[entry.type].border}` }}
                    >
                      {entry.type}
                    </span>
                    <span className="text-sm text-[#6B6B6B] leading-relaxed">{entry.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/8 text-center">
          <div className="font-mono text-xs text-[#6B6B6B]">Shipping every 2–3 weeks. Follow us for updates.</div>
          <Link to="home" className="inline-block mt-4 font-mono text-[10px] text-[#C8953A] hover:text-[#E8B04A] transition-colors">
            ← Back to homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
