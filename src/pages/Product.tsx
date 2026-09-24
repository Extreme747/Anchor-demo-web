import { useState } from 'react'
import { Link } from '../router'
import { useInView } from '../hooks/useInView'
import { RupeeIcon, PinIcon, RulerIcon, BoltIcon, HomeIcon, ChequeIcon, CheckIcon, HotIcon } from '../components/Icons'

const tabs = [
  { id: 'speed', label: 'Speed' },
  { id: 'intelligence', label: 'Intelligence' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'scale', label: 'Scale' },
]

// ── Speed tab
function SpeedTab() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h3 className="font-display text-3xl text-[#F0EDE8] mb-4 leading-tight">Deterministic speed.<br />Under 2 seconds, every time.</h3>
        <p className="text-sm text-[#6B6B6B] leading-relaxed mb-6">
          No AI roundtrips. No language model latency. Anchor evaluates keyword rules directly in the webhook pipeline and fires the reply before the competitor's chatbot even warms up.
        </p>
        <div className="space-y-3">
          {[
            { label: 'Anchor auto-reply', value: 1.4, max: 360, unit: 's', color: '#C8953A' },
            { label: 'AI chatbot (GPT-4)', value: 5.2, max: 360, unit: 's', color: '#6B6B6B' },
            { label: 'Average human rep', value: 216, max: 360, unit: 'min', color: '#3A3A3A' },
          ].map(item => (
            <div key={item.label}>
              <div className="flex justify-between font-mono text-xs mb-1">
                <span className="text-[#6B6B6B]">{item.label}</span>
                <span style={{ color: item.color }}>{item.value}{item.unit}</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(100, (item.value / item.max) * 100 + (item.value < 10 ? 1 : 0))}%`, background: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 border border-[#C8953A]/20 bg-[#C8953A]/5" style={{ borderRadius: 2 }}>
          <div className="font-mono text-[10px] text-[#C8953A] mb-1">CONVERSION IMPACT</div>
          <div className="text-sm text-[#F0EDE8]">Replying within 5 minutes increases conversion by <span className="text-[#C8953A] font-semibold">391%</span> vs replying after 30 minutes.</div>
        </div>
      </div>
      <div className="border border-white/8 p-6" style={{ borderRadius: 2 }}>
        <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest mb-4">PIPELINE — RESPONSE TIME</div>
        {[
          { step: 'Meta webhook received', time: '0ms' },
          { step: 'HMAC-SHA256 verified', time: '+2ms' },
          { step: 'Payload parsed & queued', time: '+4ms' },
          { step: 'Keyword rules evaluated', time: '+8ms' },
          { step: 'Variables interpolated', time: '+12ms' },
          { step: '200 OK to Meta', time: '+16ms' },
          { step: 'Reply delivered to WhatsApp', time: '≈1.4s total' },
        ].map((s, i) => (
          <div key={i} className={`flex items-center justify-between py-2.5 ${i < 6 ? 'border-b border-white/5' : ''}`}>
            <div className="flex items-center gap-3">
              <div className="w-px h-5 bg-white/10" />
              <span className="text-xs text-[#F0EDE8]">{s.step}</span>
            </div>
            <span className={`font-mono text-[10px] ${i === 6 ? 'text-[#C8953A] font-medium' : 'text-[#6B6B6B]'}`}>{s.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Intelligence tab
function IntelligenceTab() {
  const [score, setScore] = useState(0)
  const [triggered, setTriggered] = useState<string[]>([])

  const signals = [
    { label: 'budget', points: 25, Icon: RupeeIcon },
    { label: 'site visit', points: 35, Icon: PinIcon },
    { label: 'carpet area', points: 25, Icon: RulerIcon },
    { label: 'immediate', points: 30, Icon: BoltIcon },
    { label: 'ready to move', points: 30, Icon: HomeIcon },
    { label: 'cheque', points: 40, Icon: ChequeIcon },
  ]

  const trigger = (label: string, pts: number) => {
    if (triggered.includes(label)) return
    setTriggered(prev => [...prev, label])
    setScore(prev => Math.min(100, prev + pts))
  }

  const reset = () => { setScore(0); setTriggered([]) }

  const scoreColor = score >= 80 ? '#C8953A' : score >= 50 ? '#E8B04A' : '#6B6B6B'

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div>
        <h3 className="font-display text-3xl text-[#F0EDE8] mb-4 leading-tight">Intent Scoring Engine.<br />0 to 100 dial.</h3>
        <p className="text-sm text-[#6B6B6B] leading-relaxed mb-6">
          Click the buying signals below to see how the Intent Dial updates in real time. In production, these are detected from the lead's WhatsApp messages automatically.
        </p>
        <div className="space-y-2">
          {signals.map(s => (
            <button
              key={s.label}
              onClick={() => trigger(s.label, s.points)}
              className={`w-full text-left px-4 py-3 border transition-all duration-200 flex items-center justify-between ${triggered.includes(s.label) ? 'border-[#C8953A]/40 bg-[#C8953A]/5' : 'border-white/8 hover:border-white/15'}`}
              style={{ borderRadius: 2 }}
            >
              <div className="flex items-center gap-3">
                <s.Icon size={14} strokeWidth={1.5} className="text-[#6B6B6B] flex-shrink-0" />
                <span className="text-sm text-[#F0EDE8]">"{s.label}"</span>
              </div>
              <span className={`font-mono text-xs font-medium ${triggered.includes(s.label) ? 'text-[#C8953A]' : 'text-[#6B6B6B]'}`}>
                <span className="flex items-center gap-1">{triggered.includes(s.label) && <CheckIcon size={10} strokeWidth={2.5} className="text-[#C8953A]" />}+{s.points} pts</span>
              </span>
            </button>
          ))}
        </div>
        <button onClick={reset} className="mt-4 font-mono text-xs text-[#6B6B6B] hover:text-[#F0EDE8] transition-colors">
          ↺ Reset
        </button>
      </div>

      <div className="border border-white/8 p-6 sticky top-4" style={{ borderRadius: 2 }}>
        <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest mb-6">LIVE INTENT DIAL</div>

        {/* SVG Dial */}
        <div className="flex justify-center mb-6">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-[135deg]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 40 * 0.75} ${2 * Math.PI * 40 * 0.25}`} strokeLinecap="round" />
              <circle cx="50" cy="50" r="40" fill="none" stroke={scoreColor} strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 40 * 0.75} ${2 * Math.PI * 40 * 0.25}`}
                strokeDashoffset={2 * Math.PI * 40 * 0.75 * (1 - score / 100)}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.5s cubic-bezier(0.16,1,0.3,1), stroke 0.5s' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-3xl font-medium" style={{ color: scoreColor }}>{score}</span>
              <span className="font-mono text-[9px] text-[#6B6B6B]">/ 100</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="font-mono text-xs" style={{ color: scoreColor }}>
            {score >= 80 ? <span className="flex items-center justify-center gap-1"><HotIcon size={10} className="text-[#C8953A]" />High Intent — Assign to senior agent immediately</span> :
              score >= 50 ? <span className="flex items-center justify-center gap-1"><BoltIcon size={10} strokeWidth={2} />Medium Intent — Follow up within 30 minutes</span> :
                score === 0 ? 'Click signals to test the dial' :
                  '→ Low Intent — Add to drip sequence'}
          </div>
        </div>

        <div className="space-y-2">
          {triggered.map(t => (
            <div key={t} className="flex items-center gap-2 font-mono text-[10px] text-[#C8953A]">
              <CheckIcon size={10} strokeWidth={2.5} className="text-[#C8953A] flex-shrink-0" /><span>"{t}" detected</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Compliance tab
function ComplianceTab() {
  const states = [
    { time: '0h', label: 'Lead sends message', desc: 'Free-form session opens', status: 'open', detail: 'You can send any type of message — text, media, buttons, lists' },
    { time: '1h', label: 'Auto drip fires', desc: 'Conversational follow-up', status: 'open', detail: '"Did you get a chance to check the brochure, {{name}}?"' },
    { time: '23h', label: 'Session Warning', desc: 'Anchor auto-nudges lead', status: 'warning', detail: '"{{name}}, our direct chat closes in 1 hour. Reply now to continue!"' },
    { time: '24h', label: 'Meta Gate', desc: 'Free session expires', status: 'locked', detail: 'Anchor automatically switches to approved Utility/Marketing templates only' },
    { time: '72h', label: 'Re-engagement', desc: 'Approved template sent', status: 'template', detail: 'Quick-reply buttons: [Yes, Still Interested] [Book Site Visit] [Stop Contact]' },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="font-display text-3xl text-[#F0EDE8] mb-4 leading-tight">Meta 24h Policy.<br />Automated, bulletproof.</h3>
        <p className="text-sm text-[#6B6B6B] leading-relaxed mb-8">
          Every WhatsApp Business account faces the 24-hour policy. Amateur setups get permanently banned.
          Anchor tracks the clock to the second and handles every transition automatically.
        </p>
        <div className="p-4 border border-red-500/20 bg-red-500/5 mb-6" style={{ borderRadius: 2 }}>
          <div className="font-mono text-[10px] text-red-400 tracking-widest mb-2">WITHOUT ANCHOR</div>
          <div className="text-sm text-[#6B6B6B] leading-relaxed">Agents send free text after 24h → Meta flags account → Warning → Permanent ban. You lose your WhatsApp Business number.</div>
        </div>
        <div className="p-4 border border-[#C8953A]/20 bg-[#C8953A]/5" style={{ borderRadius: 2 }}>
          <div className="font-mono text-[10px] text-[#C8953A] tracking-widest mb-2">WITH ANCHOR</div>
          <div className="text-sm text-[#6B6B6B] leading-relaxed">Hour 23 nudge fires. Session extends or Anchor switches to templates. Zero bans. Zero risk. Automated.</div>
        </div>
      </div>

      <div className="border border-white/8 overflow-hidden" style={{ borderRadius: 2 }}>
        <div className="px-4 py-3 border-b border-white/8 font-mono text-[10px] text-[#6B6B6B] tracking-widest">STATE MACHINE</div>
        <div className="p-4 space-y-0">
          {states.map((s, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 flex items-center justify-center font-mono text-[9px] border z-10 flex-shrink-0"
                  style={{
                    borderRadius: 2,
                    borderColor: s.status === 'open' ? 'rgba(200,149,58,0.4)' : s.status === 'warning' ? 'rgba(234,179,8,0.4)' : s.status === 'locked' ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.1)',
                    background: s.status === 'open' ? 'rgba(200,149,58,0.08)' : s.status === 'warning' ? 'rgba(234,179,8,0.08)' : s.status === 'locked' ? 'rgba(239,68,68,0.08)' : 'transparent',
                    color: s.status === 'open' ? '#C8953A' : s.status === 'warning' ? '#EAB308' : s.status === 'locked' ? '#EF4444' : '#6B6B6B',
                  }}
                >
                  {s.time}
                </div>
                {i < states.length - 1 && <div className="w-px flex-1 bg-white/8 my-1" style={{ minHeight: 20 }} />}
              </div>
              <div className="pb-5">
                <div className="text-xs font-medium text-[#F0EDE8]">{s.label}</div>
                <div className="font-mono text-[9px] text-[#6B6B6B] mt-0.5">{s.desc}</div>
                <div className="font-mono text-[9px] mt-1 italic" style={{ color: s.status === 'locked' ? '#EF4444' : '#6B6B6B' }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Scale tab
function ScaleTab() {
  const [routing, setRouting] = useState(0)
  const routingModes = [
    { name: 'Round-Robin', desc: 'Evenly distributes leads across all active agents. Default mode for fair workload.', agents: ['Rahul ●', 'Sneha ●', 'Amit ●', 'Divya ●'] },
    { name: 'Skill-Based', desc: 'Commercial leads → Commercial team. Luxury leads → Senior brokers. Tags drive routing.', agents: ['Commercial: Amit ●', 'Luxury: Rahul ●', 'Residential: Sneha ●'] },
    { name: 'Load-Balanced', desc: 'Assigns new lead to agent with fewest active conversations.', agents: ['Rahul (12) ●', 'Sneha (18) ●', 'Amit (8) ←', 'Divya (15) ●'] },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="font-display text-3xl text-[#F0EDE8] mb-4 leading-tight">Multi-Agent Routing.<br />5 to 50 reps, one number.</h3>
        <p className="text-sm text-[#6B6B6B] leading-relaxed mb-6">
          Multiple sales reps work from a single WhatsApp Business number simultaneously. No SIM sharing, no conflicts, no missed leads.
        </p>

        <div className="flex gap-2 mb-4">
          {routingModes.map((m, i) => (
            <button key={m.name} onClick={() => setRouting(i)}
              className="flex-1 py-2 font-mono text-[9px] border transition-colors"
              style={{ borderRadius: 2, borderColor: routing === i ? '#C8953A' : 'rgba(255,255,255,0.08)', color: routing === i ? '#C8953A' : '#6B6B6B', background: routing === i ? 'rgba(200,149,58,0.08)' : 'transparent' }}>
              {m.name}
            </button>
          ))}
        </div>

        <div className="border border-white/8 p-4 mb-4" style={{ borderRadius: 2 }}>
          <div className="font-mono text-[9px] text-[#6B6B6B] mb-3">{routingModes[routing].desc}</div>
          <div className="space-y-2">
            {routingModes[routing].agents.map((a, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2 bg-[#141414] border border-white/5" style={{ borderRadius: 2 }}>
                <div className="w-6 h-6 rounded-full bg-[#2A2A2A] flex items-center justify-center font-mono text-[9px] text-[#C8953A]">{a[0]}</div>
                <span className="text-xs text-[#F0EDE8]">{a}</span>
                {a.includes('←') && <span className="ml-auto font-mono text-[9px] text-[#C8953A]">← NEXT</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { title: 'Claim & Transfer', desc: 'Any agent can claim an unassigned lead or transfer with an internal note. Full audit trail.' },
          { title: 'SLA Monitoring', desc: 'Manager sees first response time (FRT) per agent. Red flag if FRT > 5 min.' },
          { title: 'Simultaneous Conversations', desc: 'Up to 50 agents on one WhatsApp number. Enterprise-grade concurrency.' },
          { title: 'Role Hierarchy', desc: 'OWNER → MANAGER → AGENT. Managers see all conversations. Agents see only theirs.' },
        ].map((f, i) => (
          <div key={i} className="border border-white/8 p-4 hover:border-white/15 transition-colors" style={{ borderRadius: 2 }}>
            <div className="text-sm font-medium text-[#F0EDE8] mb-1.5">{f.title}</div>
            <div className="text-xs text-[#6B6B6B] leading-relaxed">{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Product() {
  const [activeTab, setActiveTab] = useState('speed')
  const { ref, inView } = useInView(0.05)

  return (
    <div className="min-h-screen bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-24">
        <div className={`mb-16 reveal ${inView ? 'visible' : ''}`} ref={ref}>
          <Link to="home" className="font-mono text-[10px] text-[#6B6B6B] hover:text-[#F0EDE8] transition-colors tracking-widest">
            ← BACK TO HOME
          </Link>
          <h1 className="font-display text-5xl md:text-6xl text-[#F0EDE8] mt-6 mb-4 leading-tight">
            Product Deep-Dive.
          </h1>
          <p className="text-[#6B6B6B] max-w-xl leading-relaxed">
            Every feature in Anchor is built for one purpose — recovering Indian high-ticket revenue from WhatsApp leads that would otherwise go cold.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 border-b border-white/8 mb-10">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 font-mono text-xs tracking-wide transition-colors border-b-2 -mb-px ${activeTab === tab.id ? 'text-[#C8953A] border-[#C8953A]' : 'text-[#6B6B6B] border-transparent hover:text-[#F0EDE8]'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'speed' && <SpeedTab />}
        {activeTab === 'intelligence' && <IntelligenceTab />}
        {activeTab === 'compliance' && <ComplianceTab />}
        {activeTab === 'scale' && <ScaleTab />}
      </div>
    </div>
  )
}
