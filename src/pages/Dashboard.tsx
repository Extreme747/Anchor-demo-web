import { useState } from 'react'
import { Link } from '../router'
import { InboxIcon, AnalyticsIcon, FlowIcon, TemplateIcon, TeamIcon, SettingsIcon, BellIcon, AnchorIcon, BoltIcon, DoubleCheck, HotIcon, CmdIcon, CardIcon } from '../components/Icons'
import Inbox from './Inbox'
import Settings from './Settings'
import Templates from './Templates'
import DripSequences from './Drip'
import Analytics from './Analytics'
import LeadsPage from './Leads'
import AutoReply from './AutoReply'
import Commerce from './Commerce'
import Routing from './Routing'
import Integrations from './Integrations'
import Protocol from './Protocol'

// ── Sidebar nav items
const sidebarItems = [
  { id: 'inbox', icon: <InboxIcon size={16} strokeWidth={1.5} />, label: 'Inbox', badge: '12' },
  { id: 'leads', icon: <TeamIcon size={16} strokeWidth={1.5} />, label: 'Leads', badge: '4' },
  { id: 'analytics', icon: <AnalyticsIcon size={16} strokeWidth={1.5} />, label: 'Analytics' },
  { id: 'drip', icon: <FlowIcon size={16} strokeWidth={1.5} />, label: 'Drip Engine', badge: '3' },
  { id: 'templates', icon: <TemplateIcon size={16} strokeWidth={1.5} />, label: 'Templates' },
  { id: 'auto-reply', icon: <BoltIcon size={16} strokeWidth={1.5} />, label: 'Auto-Reply' },
  { id: 'commerce', icon: <CardIcon size={16} strokeWidth={1.5} />, label: 'Flows & Commerce', badge: 'P3' },
  { id: 'routing', icon: <TeamIcon size={16} strokeWidth={1.5} />, label: 'Routing & SLA', badge: 'P4' },
  { id: 'integrations', icon: <BoltIcon size={16} strokeWidth={1.5} />, label: 'Integrations Hub', badge: 'P5' },
  { id: 'protocol', icon: <AnchorIcon size={16} strokeWidth={1.5} />, label: 'Meta Protocol', badge: 'P0' },
  { id: 'team', icon: <TeamIcon size={16} strokeWidth={1.5} />, label: 'Team' },
  { id: 'settings', icon: <SettingsIcon size={16} strokeWidth={1.5} />, label: 'Settings' },
]

// ── Leads for inbox
const leads = [
  { name: 'Arjun Sharma', preview: 'Site visit kab? Budget ready hai', time: '1m', score: 91, tag: 'Hot', status: 'NEW', value: '₹1.4 Cr' },
  { name: 'Priya Mehta', preview: '3BHK interested, 1.2Cr budget', time: '4m', score: 74, tag: 'Qualified', status: 'CONTACTED', value: '₹1.2 Cr' },
  { name: 'Sunita Bose', preview: 'Urgent carpet area details chahiye', time: '9m', score: 88, tag: 'Hot', status: 'QUALIFIED', value: '₹95L' },
  { name: 'Rohit Gupta', preview: 'Send brochure please', time: '22m', score: 42, tag: 'Warm', status: 'NEW', value: '₹60L' },
  { name: 'Kavya Nair', preview: 'Location kahan hai project ka?', time: '1h', score: 35, tag: 'Cold', status: 'NEW', value: '₹45L' },
  { name: 'Deepak Verma', preview: 'Immediate possession hai kya?', time: '2h', score: 68, tag: 'Warm', status: 'CONTACTED', value: '₹80L' },
]

const chatMessages = [
  { from: 'lead', text: 'Hi bhai, saw Instagram ad. 3BHK ke bare mein baat karni thi. Budget 1.4 Cr hai.', time: '09:41' },
  { from: 'anchor', text: 'Hi Arjun! Connecting you with our property advisor right now. Meanwhile — here\'s the project brochure: anchor.io/brochure/sec62\n\nWe have 3BHK units from ₹1.2–1.6 Cr. Would you like a site visit this weekend?', time: '09:41', auto: true },
  { from: 'lead', text: 'Haan, weekend chalega. Saturday ko free hoon.', time: '09:43' },
  { from: 'lead', text: 'Carpet area kitna hai 3BHK mein?', time: '09:44' },
  { from: 'anchor', text: 'Carpet area 1,450 sq ft (Super Built-up: 1,890 sq ft). Saturday 11 AM confirmed — our advisor will call you 30 minutes before. Location: maps.anchor.io/sec62', time: '09:44', auto: true },
]

// ── SVG Line chart
function LineChart() {
  const data = [42, 58, 71, 65, 84, 91, 78]
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const w = 400; const h = 120; const pad = 20
  const maxV = 100; const minV = 0
  const pts = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (w - pad * 2),
    y: h - pad - ((v - minV) / (maxV - minV)) * (h - pad * 2),
  }))
  const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaD = `${pathD} L ${pts[pts.length-1].x} ${h - pad} L ${pts[0].x} ${h - pad} Z`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 120 }}>
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8953A" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#C8953A" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[25, 50, 75].map(v => {
        const y = h - pad - ((v - minV) / (maxV - minV)) * (h - pad * 2)
        return <line key={v} x1={pad} x2={w - pad} y1={y} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      })}
      {/* Area */}
      <path d={areaD} fill="url(#lineGrad)" />
      {/* Line */}
      <path d={pathD} fill="none" stroke="#C8953A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dots */}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="#C8953A" stroke="#080808" strokeWidth="2" />
      ))}
      {/* Day labels */}
      {days.map((d, i) => (
        <text key={d} x={pts[i].x} y={h - 2} textAnchor="middle" fill="#6B6B6B" fontSize="9" fontFamily="JetBrains Mono, monospace">{d}</text>
      ))}
    </svg>
  )
}

// ── SVG Bar chart
function BarChart() {
  const data = [
    { label: 'Instagram', value: 45, color: '#C8953A' },
    { label: 'Facebook', value: 28, color: '#A07830' },
    { label: 'Google', value: 16, color: '#6B6B6B' },
    { label: 'Organic', value: 11, color: '#4A4A4A' },
  ]
  const max = 45
  return (
    <div className="space-y-3">
      {data.map((d) => (
        <div key={d.label}>
          <div className="flex justify-between font-mono text-[10px] mb-1">
            <span className="text-[#6B6B6B]">{d.label}</span>
            <span className="text-[#F0EDE8]">{d.value}%</span>
          </div>
          <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${(d.value / max) * 100}%`, background: d.color }} />
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Drip sequences
const sequences = [
  { name: '1h Follow-Up', trigger: 'After inbound lead', template: 'Did you see the brochure?', sent: 284, replies: 97, rate: '34%', active: true, variant: 'A/B' },
  { name: 'Hour 23 Warning', trigger: 'Meta session expiry', template: 'Chat window closing in 1hr...', sent: 156, replies: 71, rate: '46%', active: true, variant: 'B ✓' },
  { name: '72h Re-engage', trigger: 'After session expires', template: 'Still looking for 3BHK?', sent: 98, replies: 22, rate: '22%', active: false, variant: 'A' },
  { name: 'Site Visit Reminder', trigger: '2h before visit', template: 'Your visit is in 2 hours!', sent: 61, replies: 58, rate: '95%', active: true, variant: '—' },
]

// ── Templates
const templates = [
  { name: 'Property Brochure', category: 'UTILITY', status: 'APPROVED', vars: ['{{name}}', '{{property}}', '{{link}}'], uses: 412 },
  { name: '72h Re-engagement', category: 'MARKETING', status: 'APPROVED', vars: ['{{name}}', '{{city}}'], uses: 98 },
  { name: 'Site Visit Confirm', category: 'UTILITY', status: 'APPROVED', vars: ['{{name}}', '{{date}}', '{{time}}'], uses: 61 },
  { name: 'Payment Link', category: 'UTILITY', status: 'APPROVED', vars: ['{{name}}', '{{amount}}', '{{link}}'], uses: 34 },
  { name: 'Diwali Offer', category: 'MARKETING', status: 'PENDING', vars: ['{{name}}', '{{discount}}'], uses: 0 },
  { name: 'New Project Launch', category: 'MARKETING', status: 'PENDING', vars: ['{{name}}', '{{project}}', '{{link}}'], uses: 0 },
]

// ── Inbox tab
function InboxTab() {
  const [selected, setSelected] = useState(0)
  const [showTyping, setShowTyping] = useState(true)

  return (
    <div className="flex h-full border border-white/8" style={{ borderRadius: 2 }}>
      {/* Lead list */}
      <div className="w-72 flex-shrink-0 border-r border-white/8 flex flex-col">
        <div className="p-3 border-b border-white/8">
          <div className="flex items-center gap-2 bg-[#141414] px-3 py-2 border border-white/8" style={{ borderRadius: 2 }}>
            <CmdIcon size={12} />
            <span className="font-mono text-xs text-[#6B6B6B]">Search leads...</span>
            <span className="font-mono text-[9px] text-[#6B6B6B] ml-auto">K</span>
          </div>
        </div>
        <div className="flex gap-1 px-3 py-2 border-b border-white/8">
          {['ALL', 'NEW', 'HOT', 'WON'].map((f, i) => (
            <button key={f} className={`font-mono text-[9px] px-2 py-1 transition-colors ${i === 0 ? 'bg-[#C8953A] text-[#080808]' : 'text-[#6B6B6B] hover:text-[#F0EDE8]'}`} style={{ borderRadius: 2 }}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          {leads.map((lead, i) => (
            <button key={i} onClick={() => setSelected(i)}
              className={`w-full text-left px-3 py-3 border-b border-white/5 flex gap-2.5 items-start transition-colors ${selected === i ? 'bg-[#1A1A1A]' : 'hover:bg-[#111]'}`}>
              <div className="w-7 h-7 rounded-full bg-[#2A2A2A] flex items-center justify-center font-mono text-[9px] text-[#C8953A] flex-shrink-0">{lead.name[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-1">
                  <span className="text-xs font-medium text-[#F0EDE8] truncate">{lead.name}</span>
                  <span className="font-mono text-[9px] text-[#6B6B6B] flex-shrink-0">{lead.time}</span>
                </div>
                <div className="text-[11px] text-[#6B6B6B] truncate mt-0.5">{lead.preview}</div>
                <div className="flex gap-1.5 mt-1 items-center">
                  <span className="font-mono text-[9px] text-[#C8953A] border border-[#C8953A]/30 px-1">{lead.score}</span>
                  <span className="font-mono text-[9px] text-[#6B6B6B]">{lead.tag}</span>
                  <span className="font-mono text-[9px] text-[#C8953A] ml-auto">{lead.value}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="px-4 py-3 border-b border-white/8 flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-[#2A2A2A] flex items-center justify-center font-mono text-[9px] text-[#C8953A]">{leads[selected].name[0]}</div>
          <div>
            <div className="text-sm font-medium text-[#F0EDE8]">{leads[selected].name}</div>
            <div className="font-mono text-[9px] text-[#6B6B6B]">+91 98765 43210 · {leads[selected].status}</div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="font-mono text-xs text-[#C8953A]">{leads[selected].value}</span>
            <span className="font-mono text-[9px] px-2 py-1 border border-white/10 text-[#6B6B6B]" style={{ borderRadius: 2 }}>Score: {leads[selected].score}</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: '0 0 5px rgba(74,222,128,0.6)' }} />
              <span className="font-mono text-[9px] text-[#6B6B6B]">LIVE</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {chatMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'lead' ? 'justify-start' : 'justify-end'}`}>
              <div className="max-w-[70%] px-3 py-2 text-xs leading-relaxed" style={{
                borderRadius: 2,
                background: msg.from === 'lead' ? '#1A1A1A' : 'rgba(200,149,58,0.12)',
                border: msg.from === 'anchor' ? '1px solid rgba(200,149,58,0.2)' : '1px solid rgba(255,255,255,0.05)',
                color: '#F0EDE8',
                whiteSpace: 'pre-line',
              }}>
                {msg.auto && <div className="font-mono text-[9px] text-[#C8953A] mb-1 flex items-center gap-1"><BoltIcon size={9} strokeWidth={2} />ANCHOR AUTO · 1.4s</div>}
                {msg.text}
                <div className="font-mono text-[9px] text-[#6B6B6B] mt-1 text-right flex items-center justify-end gap-1">{msg.time} {msg.from === 'anchor' && <DoubleCheck className="text-[#6B6B6B]" />}</div>
              </div>
            </div>
          ))}
          {showTyping && (
            <div className="flex justify-end">
              <div className="px-4 py-3 bg-[#1A1A1A] border border-white/5 flex gap-1.5 items-center" style={{ borderRadius: 2 }}>
                <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
              </div>
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-t border-white/8 flex gap-2">
          <div className="flex-1 bg-[#141414] border border-white/8 px-3 py-2 flex items-center gap-2 cursor-text" style={{ borderRadius: 2 }}>
            <span className="font-mono text-xs text-[#C8953A]">/</span>
            <span className="text-xs text-[#6B6B6B]">Quick reply... (/ for templates)</span>
          </div>
          <button className="px-3 py-2 font-mono text-[10px] border border-white/8 text-[#6B6B6B] hover:text-[#F0EDE8]" style={{ borderRadius: 2 }}>Tag</button>
          <button className="px-3 py-2 font-mono text-[10px] border border-white/8 text-[#6B6B6B] hover:text-[#F0EDE8]" style={{ borderRadius: 2 }}>Transfer</button>
          <button className="w-8 h-8 bg-[#C8953A] flex items-center justify-center" style={{ borderRadius: 2 }}>
            <svg className="w-4 h-4 text-[#080808]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </div>

      {/* Lead Intel panel */}
      <div className="w-52 flex-shrink-0 border-l border-white/8 flex flex-col p-3 gap-3 hidden lg:flex">
        <div className="font-mono text-[9px] text-[#6B6B6B] tracking-widest">LEAD INTEL</div>
        <div className="border border-white/8 p-3 text-center" style={{ borderRadius: 2 }}>
          <div className="font-display text-3xl text-[#C8953A]">{leads[selected].score}</div>
          <div className="font-mono text-[9px] text-[#6B6B6B] mt-1">Intent Score</div>
          <div className="mt-2 h-1 bg-white/8 rounded-full overflow-hidden">
            <div className="h-full bg-[#C8953A] rounded-full" style={{ width: `${leads[selected].score}%` }} />
          </div>
        </div>
        <div className="border border-white/8 p-3" style={{ borderRadius: 2 }}>
          <div className="font-mono text-[9px] text-[#6B6B6B]">PIPELINE VALUE</div>
          <div className="font-display text-xl text-[#C8953A] mt-1">{leads[selected].value}</div>
        </div>
        <div className="border border-white/8 p-3" style={{ borderRadius: 2 }}>
          <div className="font-mono text-[9px] text-[#6B6B6B] mb-2">META WINDOW</div>
          <div className="h-1 bg-white/8 rounded-full overflow-hidden mb-1">
            <div className="h-full bg-[#C8953A] rounded-full" style={{ width: '72%' }} />
          </div>
          <div className="font-mono text-[9px] text-[#C8953A]">17h 22m left</div>
        </div>
        <div className="border border-white/8 p-3" style={{ borderRadius: 2 }}>
          <div className="font-mono text-[9px] text-[#6B6B6B] mb-2">TAGS</div>
          {['Hot', 'Penthouse', '3BHK'].map(t => (
            <span key={t} className="inline-block font-mono text-[9px] border border-white/10 px-1.5 py-0.5 text-[#F0EDE8] mr-1 mb-1">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Analytics tab
function AnalyticsTab() {
  const kpis = [
    { label: 'Leads Today', value: '84', sub: '+12 vs yesterday', up: true },
    { label: 'Response Rate', value: '90.4%', sub: '76 of 84 < 2 min', up: true },
    { label: 'Revenue Recovered', value: '₹34.8L', sub: 'This month', up: true },
    { label: 'Active Sessions', value: '23', sub: '5 expiring < 3h', up: false },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpis.map((k) => (
          <div key={k.label} className="border border-white/8 p-4" style={{ borderRadius: 2 }}>
            <div className="font-mono text-[9px] text-[#6B6B6B] tracking-widest mb-2">{k.label.toUpperCase()}</div>
            <div className="font-display text-2xl text-[#F0EDE8]">{k.value}</div>
            <div className={`font-mono text-[9px] mt-1 ${k.up ? 'text-green-400' : 'text-red-400'}`}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <div className="md:col-span-2 border border-white/8 p-4" style={{ borderRadius: 2 }}>
          <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest mb-4">7-DAY LEAD TREND</div>
          <LineChart />
        </div>
        <div className="border border-white/8 p-4" style={{ borderRadius: 2 }}>
          <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest mb-4">LEADS BY CHANNEL</div>
          <BarChart />
        </div>
      </div>

      <div className="border border-[#EF4444]/20 bg-[#EF4444]/5 p-4" style={{ borderRadius: 2 }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-mono text-[9px] text-[#EF4444] tracking-widest mb-1">REVENUE AT RISK TODAY</div>
            <div className="font-display text-3xl text-[#F0EDE8]">₹12,00,000</div>
            <div className="font-mono text-xs text-[#6B6B6B] mt-1">8 leads with no reply in 24h · 3 sessions expire in 2 hours</div>
          </div>
          <button className="font-mono text-xs px-4 py-2 border border-[#EF4444]/40 text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors" style={{ borderRadius: 2 }}>
            Recover Now →
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Drip Engine tab
function DripTab() {
  const [active, setActive] = useState(sequences.map(s => s.active))
  return (
    <div className="border border-white/8 overflow-hidden" style={{ borderRadius: 2 }}>
      <div className="border-b border-white/8 px-4 py-3 flex items-center justify-between">
        <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest">ACTIVE SEQUENCES</div>
        <button className="font-mono text-[10px] px-3 py-1.5 border border-[#C8953A]/40 text-[#C8953A] hover:bg-[#C8953A]/10 transition-colors" style={{ borderRadius: 2 }}>
          + New Sequence
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/8">
            {['Sequence', 'Trigger', 'Sent', 'Replies', 'Rate', 'Variant', 'Active'].map(h => (
              <th key={h} className="px-4 py-3 text-left font-mono text-[9px] text-[#6B6B6B] tracking-widest">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sequences.map((s, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2 transition-colors">
              <td className="px-4 py-3">
                <div className="text-xs font-medium text-[#F0EDE8]">{s.name}</div>
                <div className="font-mono text-[9px] text-[#6B6B6B] mt-0.5 truncate max-w-[180px]">"{s.template}"</div>
              </td>
              <td className="px-4 py-3 font-mono text-[10px] text-[#6B6B6B]">{s.trigger}</td>
              <td className="px-4 py-3 font-mono text-xs text-[#F0EDE8]">{s.sent}</td>
              <td className="px-4 py-3 font-mono text-xs text-[#F0EDE8]">{s.replies}</td>
              <td className="px-4 py-3 font-mono text-xs text-[#C8953A] font-medium">{s.rate}</td>
              <td className="px-4 py-3">
                <span className="font-mono text-[9px] px-2 py-1 border border-white/10 text-[#6B6B6B]" style={{ borderRadius: 2 }}>{s.variant}</span>
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => setActive(a => a.map((v, idx) => idx === i ? !v : v))}
                  className="relative w-8 h-4 transition-colors duration-300"
                  style={{ borderRadius: 2, background: active[i] ? 'rgba(200,149,58,0.3)' : 'rgba(255,255,255,0.1)', border: `1px solid ${active[i] ? 'rgba(200,149,58,0.5)' : 'rgba(255,255,255,0.15)'}` }}
                >
                  <span className="absolute top-0.5 w-3 h-3 bg-[#C8953A] transition-all duration-300" style={{ borderRadius: 2, left: active[i] ? 13 : 1, background: active[i] ? '#C8953A' : '#6B6B6B' }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Templates tab
function TemplatesTab() {
  return (
    <div className="grid md:grid-cols-3 gap-3">
      {templates.map((t, i) => (
        <div key={i} className="border border-white/8 p-4 hover:border-white/15 transition-colors" style={{ borderRadius: 2 }}>
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <div className="text-sm font-medium text-[#F0EDE8]">{t.name}</div>
              <div className="font-mono text-[9px] text-[#6B6B6B] mt-0.5">{t.category}</div>
            </div>
            <span
              className="font-mono text-[9px] px-2 py-1 flex-shrink-0"
              style={{
                borderRadius: 2,
                background: t.status === 'APPROVED' ? 'rgba(74,222,128,0.1)' : 'rgba(234,179,8,0.1)',
                color: t.status === 'APPROVED' ? '#4ADE80' : '#EAB308',
                border: `1px solid ${t.status === 'APPROVED' ? 'rgba(74,222,128,0.2)' : 'rgba(234,179,8,0.2)'}`,
              }}
            >
              {t.status}
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mb-4">
            {t.vars.map(v => (
              <span key={v} className="font-mono text-[9px] px-1.5 py-0.5 bg-[#1A1A1A] text-[#C8953A] border border-white/5" style={{ borderRadius: 2 }}>{v}</span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] text-[#6B6B6B]">{t.uses} sends</span>
            <button className="font-mono text-[9px] px-2 py-1 border border-white/10 text-[#6B6B6B] hover:text-[#F0EDE8] hover:border-white/20 transition-colors" style={{ borderRadius: 2 }}>
              Copy →
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Team tab
function TeamTab() {
  const agents = [
    { name: 'Rahul Verma', role: 'Senior Agent', leads: 28, frt: '58s', rate: '41%', status: 'online' },
    { name: 'Sneha Kapoor', role: 'Agent', leads: 31, frt: '1m 12s', rate: '34%', status: 'online' },
    { name: 'Amit Singh', role: 'Agent', leads: 19, frt: '4m 03s', rate: '22%', status: 'away' },
    { name: 'Divya Nair', role: 'Manager', leads: 25, frt: '1m 45s', rate: '38%', status: 'online' },
  ]
  return (
    <div className="border border-white/8 overflow-hidden" style={{ borderRadius: 2 }}>
      <div className="border-b border-white/8 px-4 py-3 flex items-center justify-between">
        <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest">TEAM PERFORMANCE</div>
        <button className="font-mono text-[10px] px-3 py-1.5 border border-[#C8953A]/40 text-[#C8953A] hover:bg-[#C8953A]/10 transition-colors" style={{ borderRadius: 2 }}>
          + Invite Agent
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/8">
            {['Agent', 'Role', 'Active Leads', 'First Reply', 'Conv Rate', 'Status'].map(h => (
              <th key={h} className="px-4 py-3 text-left font-mono text-[9px] text-[#6B6B6B] tracking-widest">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {agents.map((a, i) => (
            <tr key={i} className="border-b border-white/5">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#1A1A1A] flex items-center justify-center font-mono text-[9px] text-[#C8953A]">{a.name[0]}</div>
                  <span className="text-xs text-[#F0EDE8]">{a.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 font-mono text-[10px] text-[#6B6B6B]">{a.role}</td>
              <td className="px-4 py-3 font-mono text-xs text-[#F0EDE8]">{a.leads}</td>
              <td className="px-4 py-3 font-mono text-xs text-[#F0EDE8]">{a.frt}</td>
              <td className="px-4 py-3 font-mono text-xs text-[#C8953A] font-medium">{a.rate}</td>
              <td className="px-4 py-3">
                <span className="font-mono text-[9px] px-2 py-1" style={{ borderRadius: 2, background: a.status === 'online' ? 'rgba(74,222,128,0.1)' : 'rgba(107,107,107,0.1)', color: a.status === 'online' ? '#4ADE80' : '#6B6B6B', border: `1px solid ${a.status === 'online' ? 'rgba(74,222,128,0.2)' : 'rgba(107,107,107,0.2)'}` }}>
                  {a.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Main Dashboard
export default function Dashboard() {
  const [activeNav, setActiveNav] = useState('inbox')

  const tabContent: Record<string, React.ReactNode> = {
    inbox: null,
    leads: <LeadsPage />,
    analytics: <Analytics />,
    drip: <DripSequences />,
    templates: <Templates />,
    'auto-reply': <AutoReply />,
    commerce: <Commerce />,
    routing: <Routing />,
    integrations: <Integrations />,
    protocol: <Protocol />,
    team: <TeamTab />,
    settings: <Settings />,
  }

  return (
    <div className="flex h-screen bg-[#080808] overflow-hidden">
      {/* Sidebar */}
      <div className="w-14 md:w-52 flex-shrink-0 border-r border-white/8 flex flex-col">
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-white/8">
          <Link to="home" className="font-display text-lg text-[#F0EDE8] hidden md:block">
            Anchor<span className="text-[#C8953A]">.</span>
          </Link>
          <span className="font-display text-xl text-[#C8953A] md:hidden"><AnchorIcon size={20} strokeWidth={1.5} /></span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-2 py-2.5 transition-colors text-left ${activeNav === item.id ? 'bg-[#1A1A1A] text-[#F0EDE8]' : 'text-[#6B6B6B] hover:text-[#F0EDE8] hover:bg-[#111]'}`}
              style={{ borderRadius: 2 }}
            >
              <span className="text-base w-5 flex-shrink-0 text-center">{item.icon}</span>
              <span className="hidden md:block text-xs font-medium">{item.label}</span>
              {item.badge && (
                <span className="hidden md:flex ml-auto font-mono text-[9px] w-4 h-4 items-center justify-center bg-[#C8953A] text-[#080808] font-bold" style={{ borderRadius: 2 }}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Agent avatar */}
        <div className="p-3 border-t border-white/8 flex items-center gap-2">
          <div className="relative w-7 h-7 rounded-full bg-[#2A2A2A] flex items-center justify-center font-mono text-[9px] text-[#C8953A] flex-shrink-0">
            R
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border border-[#080808]" />
          </div>
          <div className="hidden md:block min-w-0">
            <div className="text-xs text-[#F0EDE8] truncate">Rahul Verma</div>
            <div className="font-mono text-[9px] text-[#6B6B6B]">Agent · Online</div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top header */}
        <div className="h-14 border-b border-white/8 flex items-center justify-between px-4 flex-shrink-0">
          <div>
            <div className="text-sm font-medium text-[#F0EDE8] capitalize">{activeNav}</div>
            <div className="font-mono text-[9px] text-[#6B6B6B]">Anchor Dashboard · Beta</div>
          </div>
          <div className="flex items-center gap-3">
            {/* Back link */}
            <Link to="home" className="font-mono text-[10px] text-[#6B6B6B] hover:text-[#F0EDE8] transition-colors">
              ← Back to site
            </Link>
            {/* Notification */}
            <button className="relative w-8 h-8 flex items-center justify-center border border-white/8 text-[#6B6B6B] hover:text-[#F0EDE8] transition-colors" style={{ borderRadius: 2 }}>
              <BellIcon size={16} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C8953A] font-mono text-[8px] text-[#080808] flex items-center justify-center font-bold" style={{ borderRadius: 2 }}>3</span>
            </button>
            {/* Live indicator */}
            <div className="flex items-center gap-1.5 border border-white/8 px-2 py-1" style={{ borderRadius: 2 }}>
              <div className="relative w-2 h-2">
                <div className="absolute inset-0 rounded-full bg-green-400 opacity-60 animate-ping" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>
              <span className="font-mono text-[9px] text-[#F0EDE8]">LIVE</span>
            </div>
          </div>
        </div>

        {/* Content area */}
        {activeNav === 'inbox' ? (
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <Inbox />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4">
            {tabContent[activeNav]}
          </div>
        )}
      </div>
    </div>
  )
}
