import { useState, useRef, useEffect } from 'react'
import { useRouter } from '../router'
import {
  SearchIcon, BoltIcon, TagIcon, CheckIcon, DoubleCheck,
  ClockIcon, WarningIcon, ArrowRightIcon, SendIcon,
  TransferIcon, MapPinIcon, FlowIcon,
} from '../components/Icons'
import { leadsApi, messagesApi, simulatorApi } from '../api/client'

// ── Default Mock Fallback Data
const DEFAULT_LEADS = [
  { id: '1', name: 'Arjun Sharma', phone: '+91 98XXX XX210', preview: 'Bhai site visit kab kar sakte...', time: '1m', score: 91, tag: 'Hot', status: 'NEW', value: '₹1.4 Cr', source: 'Meta Ad', city: 'Gurugram', unread: 3, ctwa: true },
  { id: '2', name: 'Priya Mehta', phone: '+91 87XXX XX345', preview: 'Interested in 3BHK, budget 1.2Cr', time: '8m', score: 72, tag: 'Qualified', status: 'CONTACTED', value: '₹1.2 Cr', source: 'Organic', city: 'Delhi', unread: 0, ctwa: false },
  { id: '3', name: 'Rohit Gupta', phone: '+91 76XXX XX901', preview: 'Send me brochure please', time: '15m', score: 45, tag: 'Warm', status: 'NEW', value: '₹80L', source: '99acres', city: 'Noida', unread: 1, ctwa: false },
  { id: '4', name: 'Sunita Bose', phone: '+91 98XXX XX034', preview: 'Urgent — need carpet area details', time: '1h', score: 88, tag: 'Hot', status: 'QUALIFIED', value: '₹95L', source: 'Meta Ad', city: 'Gurugram', unread: 0, ctwa: true },
  { id: '5', name: 'Vikram Joshi', phone: '+91 91XXX XX567', preview: 'Kya immediate possession hai?', time: '2h', score: 38, tag: 'Cold', status: 'NEW', value: '₹60L', source: 'MagicBricks', city: 'Ghaziabad', unread: 0, ctwa: false },
  { id: '6', name: 'Kavita Reddy', phone: '+91 88XXX XX221', preview: 'Penthouse availability batao', time: '3h', score: 95, tag: 'Hot', status: 'QUALIFIED', value: '₹3.2 Cr', source: 'Meta Ad', city: 'Gurugram', unread: 2, ctwa: true },
  { id: '7', name: 'Rajesh Nair', phone: '+91 77XXX XX889', preview: 'Site visit this Saturday?', time: '5h', score: 68, tag: 'Warm', status: 'CONTACTED', value: '₹1.1 Cr', source: 'Housing.com', city: 'Bengaluru', unread: 0, ctwa: false },
  { id: '8', name: 'Neha Khanna', phone: '+91 99XXX XX112', preview: 'EMI options kya hain?', time: '1d', score: 29, tag: 'Cold', status: 'NEW', value: '₹55L', source: 'JustDial', city: 'Pune', unread: 0, ctwa: false },
]

const DEFAULT_MESSAGES: Record<string, Array<{ from: string; text: string; time: string; auto?: boolean; status?: string }>> = {
  '1': [
    { from: 'lead', text: 'Hi, saw your ad on Instagram. Interested in 3BHK at Sector 62.', time: '10:02' },
    { from: 'anchor', text: 'Hi Arjun! Thanks for reaching out. Connecting you with our team right now. Meanwhile here\'s our latest brochure: anchor.io/brochure/sec62\n\nWe have 3BHK units from ₹1.2–1.6 Cr. Would you like a site visit this weekend?', time: '10:02', auto: true, status: 'read' },
    { from: 'lead', text: 'What\'s the price range? Aur possession kab tak?', time: '10:04' },
    { from: 'lead', text: 'Site visit kab kar sakte hain?', time: '10:05' },
  ],
  '4': [
    { from: 'lead', text: 'Hello, urgent — carpet area of the 2BHK unit?', time: '08:30' },
    { from: 'anchor', text: 'Hi Sunita! Carpet area is 985 sq ft (built-up: 1,280 sq ft). Available in 3 ready-to-move units.\n\nWould you like to schedule a site visit today?', time: '08:30', auto: true, status: 'delivered' },
  ],
  '6': [
    { from: 'lead', text: 'Is penthouse still available? Budget around 3Cr.', time: '07:15' },
    { from: 'anchor', text: 'Hi Kavita! Yes, we have 2 penthouse units available — 38th floor and 40th floor, ₹3.1–3.4 Cr. Stunning golf course views.\n\nOur senior advisor is available for a private tour — any time this week?', time: '07:15', auto: true, status: 'read' },
    { from: 'lead', text: 'Interested. Can you share floor plans?', time: '07:18' },
    { from: 'lead', text: 'Also what amenities?', time: '07:19' },
  ],
}

const TAG_COLORS: Record<string, string> = {
  Hot: '#C8953A',
  'Hot 🔥': '#C8953A',
  Qualified: '#4A9EBA',
  Warm: '#8B6BA8',
  Cold: '#4A4A4A',
  Penthouse: '#E8B04A',
  Commercial: '#7C3AED',
}

const STATUS_COLORS: Record<string, string> = {
  NEW: 'rgba(200,149,58,0.15)',
  CONTACTED: 'rgba(74,158,186,0.12)',
  QUALIFIED: 'rgba(74,222,128,0.1)',
  WON: 'rgba(74,222,128,0.2)',
  LOST: 'rgba(239,68,68,0.1)',
}

// ── Intent dial
function Dial({ score }: { score: number }) {
  const r = 36; const c = 2 * Math.PI * r
  const color = score >= 80 ? '#C8953A' : score >= 50 ? '#E8B04A' : '#6B6B6B'
  return (
    <div className="relative w-20 h-20">
      <svg className="w-full h-full -rotate-[135deg]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8"
          strokeDasharray={`${c * 0.75} ${c * 0.25}`} strokeLinecap="round" />
        <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${c * 0.75} ${c * 0.25}`}
          strokeDashoffset={c * 0.75 * (1 - score / 100)}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16,1,0.3,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-base font-medium" style={{ color }}>{score}</span>
        <span className="font-mono text-[8px] text-[#6B6B6B]">INTENT</span>
      </div>
    </div>
  )
}

// ── Session bar
function SessionBar({ hours }: { hours: number }) {
  const pct = Math.min(100, Math.max(0, (hours / 24) * 100))
  const critical = hours < 2
  const warning = hours < 4
  return (
    <div className={`px-3 py-2 border-b flex items-center gap-3 ${critical ? 'border-red-500/20 bg-red-500/5' : warning ? 'border-yellow-500/20 bg-yellow-500/5' : 'border-white/8 bg-[#0D0D0D]'}`}>
      <ClockIcon size={11} strokeWidth={1.5} className={critical ? 'text-red-400' : warning ? 'text-yellow-400' : 'text-[#6B6B6B]'} />
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: critical ? '#EF4444' : warning ? '#EAB308' : '#C8953A' }} />
      </div>
      <span className={`font-mono text-[9px] ${critical ? 'text-red-400' : warning ? 'text-yellow-400' : 'text-[#6B6B6B]'}`}>
        {critical ? `${hours}h left — Templates only soon` : warning ? `${hours}h — Send nudge now` : `${hours}h free Meta session`}
      </span>
    </div>
  )
}

// ── Quick reply popup
function QuickReplyPopup({ onSelect, onClose }: { onSelect: (t: string) => void; onClose: () => void }) {
  const shortcuts = [
    { cmd: '/visit', text: 'Would you like to schedule a site visit this weekend?' },
    { cmd: '/brochure', text: 'Here\'s our latest project brochure: anchor.io/brochure/sec62' },
    { cmd: '/pricing', text: 'Our 3BHK units are priced from ₹1.2–1.6 Cr (all-inclusive).' },
    { cmd: '/location', text: 'Location: Sector 62, Gurugram. 5 min from NH-48. Google Maps: maps.anchor.io/sec62' },
    { cmd: '/followup', text: 'Hi! Just following up on our earlier conversation. Still interested in the property?' },
  ]
  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 border border-white/10 bg-[#111] shadow-2xl z-30" style={{ borderRadius: 2 }}>
      <div className="px-3 py-2 border-b border-white/8 font-mono text-[9px] text-[#6B6B6B] tracking-widest">QUICK REPLIES</div>
      {shortcuts.map(s => (
        <button key={s.cmd} onClick={() => { onSelect(s.text); onClose() }}
          className="w-full text-left px-3 py-2.5 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
          <span className="font-mono text-[10px] text-[#C8953A] mr-2">{s.cmd}</span>
          <span className="text-xs text-[#6B6B6B]">{s.text.slice(0, 50)}…</span>
        </button>
      ))}
    </div>
  )
}

// ── Lead list panel (P1-02)
function LeadList({ leads, selected, onSelect, filter, setFilter, onOpenSim }: {
  leads: any[];
  selected: string;
  onSelect: (id: string) => void;
  filter: string;
  setFilter: (f: string) => void;
  onOpenSim: () => void;
}) {
  const tabs = ['All', 'New', 'Hot', 'Qualified']
  const filtered = leads.filter(l => {
    if (filter === 'New') return l.status === 'NEW'
    if (filter === 'Hot') return l.score >= 80 || (l.tags && l.tags.some((t: string) => t.includes('Hot'))) || l.tag === 'Hot'
    if (filter === 'Qualified') return l.status === 'QUALIFIED'
    return true
  })

  return (
    <div className="flex flex-col h-full border-r border-white/8 bg-[#0C0C0C]">
      <div className="px-3 py-3 border-b border-white/8 space-y-2">
        <div className="flex items-center gap-2 bg-[#1A1A1A] border border-white/8 px-3 py-2" style={{ borderRadius: 2 }}>
          <SearchIcon size={12} strokeWidth={1.5} className="text-[#6B6B6B] flex-shrink-0" />
          <input
            className="bg-transparent font-mono text-xs text-[#F0EDE8] placeholder-[#444] focus:outline-none w-full"
            placeholder="Search leads, phone..."
          />
        </div>
        <button
          onClick={onOpenSim}
          className="w-full py-1.5 px-2 bg-[#C8953A]/15 border border-[#C8953A]/40 text-[#C8953A] hover:bg-[#C8953A] hover:text-[#080808] transition-all font-mono text-[10px] flex items-center justify-center gap-1.5"
          style={{ borderRadius: 2 }}
        >
          <BoltIcon size={11} strokeWidth={2} /> ⚡ Simulate Inbound Lead
        </button>
      </div>
      <div className="px-2 py-2 flex gap-1 border-b border-white/8 overflow-x-auto">
        {tabs.map((t) => (
          <button key={t} onClick={() => setFilter(t)}
            className="font-mono text-[10px] px-2 py-1 tracking-wide flex-shrink-0 transition-colors"
            style={{
              borderRadius: 2,
              background: filter === t ? '#C8953A' : 'transparent',
              color: filter === t ? '#080808' : '#6B6B6B',
            }}>
            {t}
            {t === 'New' && <span className="ml-1 font-mono text-[8px]">({leads.filter(l => l.status === 'NEW').length})</span>}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto">
        {filtered.map(lead => {
          const leadTag = Array.isArray(lead.tags) && lead.tags.length > 0 ? lead.tags[0] : (lead.tag || 'New')
          const isSelected = selected === String(lead.id)
          return (
            <button key={lead.id} onClick={() => onSelect(String(lead.id))}
              className={`w-full text-left px-3 py-3 border-b border-white/5 flex gap-2.5 items-start transition-colors ${isSelected ? 'bg-[#1A1A1A]' : 'hover:bg-[#141414]'}`}>
              <div className="relative flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 bg-[#2A2A2A] flex items-center justify-center font-mono text-xs text-[#C8953A]" style={{ borderRadius: '50%' }}>
                  {lead.name ? lead.name[0] : 'L'}
                </div>
                {lead.unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C8953A] text-[#080808] font-mono text-[9px] font-bold flex items-center justify-center rounded-full">
                    {lead.unread}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#F0EDE8] truncate">{lead.name}</span>
                  <span className="font-mono text-[9px] text-[#6B6B6B]">{lead.time || 'now'}</span>
                </div>
                <div className="font-mono text-[10px] text-[#6B6B6B] truncate mt-0.5">{lead.preview}</div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="font-mono text-[8px] px-1.5 py-0.5 border" style={{ borderRadius: 2, borderColor: 'rgba(200,149,58,0.3)', color: '#C8953A' }}>
                    {lead.score}
                  </span>
                  <span className="font-mono text-[8px] px-1.5 py-0.5" style={{ borderRadius: 2, background: (TAG_COLORS[leadTag] || '#4A9EBA') + '25', color: TAG_COLORS[leadTag] || '#4A9EBA' }}>
                    {leadTag}
                  </span>
                  {(lead.ctwa || lead.isCtwa) && <span className="font-mono text-[8px] text-[#4A9EBA] border border-[#4A9EBA]/30 px-1 py-0.2">📢 CTWA</span>}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Chat panel (P1-03)
function ChatPanel({ lead }: { lead: any }) {
  const [message, setMessage] = useState('')
  const [showQuickReply, setShowQuickReply] = useState(false)
  const [msgs, setMsgs] = useState<any[]>(DEFAULT_MESSAGES[String(lead.id)] || [{ from: 'lead', text: lead.preview || 'Inquiry received', time: '10:00' }])
  const [sendError, setSendError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  // Fetch live messages from backend if lead is loaded
  useEffect(() => {
    let isMounted = true
    if (lead?.id) {
      messagesApi.getMessages(String(lead.id))
        .then((res: any) => {
          if (isMounted && res.messages && res.messages.length > 0) {
            setMsgs(res.messages)
          }
        })
        .catch(() => {
          // fallback to default mock messages
          if (DEFAULT_MESSAGES[String(lead.id)]) {
            setMsgs(DEFAULT_MESSAGES[String(lead.id)])
          }
        })
    }
    return () => { isMounted = false }
  }, [lead?.id])

  const sessionHours = lead.session?.hoursRemaining !== undefined
    ? lead.session.hoursRemaining
    : (lead.score >= 80 ? 18 : lead.score >= 50 ? 5 : 2)

  const handleSend = async () => {
    if (!message.trim() || sending) return
    const textToSend = message.trim()
    setMessage('')
    setSendError(null)
    setSending(true)

    const optimisticMsg = {
      from: 'anchor',
      text: textToSend,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      status: 'sending',
    }
    setMsgs(prev => [...prev, optimisticMsg])

    try {
      await messagesApi.sendMessage(String(lead.id), textToSend)
      setMsgs(prev =>
        prev.map(m => (m === optimisticMsg ? { ...m, status: 'delivered' } : m))
      )
    } catch (err: any) {
      setSendError(err.message || 'Failed to send message')
      setMsgs(prev => prev.filter(m => m !== optimisticMsg))
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#090909]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/8 flex items-center gap-3">
        <div className="w-8 h-8 bg-[#2A2A2A] flex items-center justify-center font-mono text-xs text-[#C8953A]" style={{ borderRadius: '50%' }}>
          {lead.name ? lead.name[0] : 'L'}
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-[#F0EDE8]">{lead.name}</div>
          <div className="font-mono text-[9px] text-[#6B6B6B]">
            {lead.phone} · {lead.status} {lead.value ? `· ${lead.value}` : ''}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="font-mono text-[9px] px-2 py-1 border border-white/8 text-[#6B6B6B] hover:text-[#F0EDE8] hover:border-white/20 transition-colors flex items-center gap-1" style={{ borderRadius: 2 }}>
            <TransferIcon size={10} strokeWidth={1.5} /> Assign
          </button>
          <div className="w-2 h-2 bg-green-400 rounded-full" style={{ boxShadow: '0 0 6px rgba(74,222,128,0.6)' }} />
          <span className="font-mono text-[9px] text-[#6B6B6B]">LIVE</span>
        </div>
      </div>

      {/* Session bar */}
      <SessionBar hours={sessionHours} />

      {/* Error alert (e.g. 24h Meta gate notice) */}
      {sendError && (
        <div className="px-4 py-2 bg-red-500/10 border-b border-red-500/20 text-red-400 font-mono text-[10px] flex items-center justify-between">
          <span>⚠️ {sendError}</span>
          <button onClick={() => setSendError(null)} className="text-white/40 hover:text-white">✕</button>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {msgs.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === 'lead' ? 'justify-start' : 'justify-end'}`}>
            <div
              className="max-w-[75%] px-3 py-2 text-xs leading-relaxed"
              style={{
                borderRadius: 2,
                background: msg.from === 'lead' ? '#1A1A1A' : 'rgba(200,149,58,0.12)',
                border: msg.from === 'anchor' ? '1px solid rgba(200,149,58,0.2)' : '1px solid rgba(255,255,255,0.05)',
                color: '#F0EDE8',
              }}
            >
              {msg.auto && (
                <div className="flex items-center gap-1 font-mono text-[9px] text-[#C8953A] mb-1.5">
                  <BoltIcon size={9} strokeWidth={2} />
                  ANCHOR AUTO-REPLY · 1.4s
                </div>
              )}
              <p className="whitespace-pre-wrap">{msg.text}</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="font-mono text-[8px] text-[#6B6B6B]">{msg.time}</span>
                {msg.from === 'anchor' && <DoubleCheck className="text-[#C8953A]" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Composer (P1-06) */}
      <div className="px-3 py-3 border-t border-white/8">
        <div className="relative">
          {showQuickReply && (
            <QuickReplyPopup
              onSelect={t => setMessage(t)}
              onClose={() => setShowQuickReply(false)}
            />
          )}
          <div className="flex items-end gap-2">
            <div className="flex-1 bg-[#141414] border border-white/8 px-3 py-2.5 flex items-center gap-2" style={{ borderRadius: 2 }}>
              <button
                onClick={() => setShowQuickReply(!showQuickReply)}
                className="font-mono text-sm text-[#C8953A] hover:text-[#E8B04A] transition-colors flex-shrink-0"
                title="Quick Replies"
              >
                /
              </button>
              <input
                className="flex-1 bg-transparent text-xs text-[#F0EDE8] placeholder-[#3A3A3A] focus:outline-none"
                placeholder="Type a message or '/' for shortcuts..."
                value={message}
                onChange={e => {
                  setMessage(e.target.value)
                  if (e.target.value === '/') setShowQuickReply(true)
                  else if (!e.target.value.startsWith('/')) setShowQuickReply(false)
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSend()
                }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={sending || !message.trim()}
              className="w-9 h-9 bg-[#C8953A] disabled:opacity-40 flex items-center justify-center flex-shrink-0 hover:bg-[#E8B04A] transition-colors"
              style={{ borderRadius: 2 }}
            >
              <SendIcon size={14} strokeWidth={2} className="text-[#080808]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Lead intel panel (P1-04)
function IntelPanel({ lead }: { lead: any }) {
  const leadTag = Array.isArray(lead.tags) && lead.tags.length > 0 ? lead.tags[0] : (lead.tag || 'New')
  const tags = [leadTag, lead.source, lead.city].filter(Boolean)

  const activity = [
    { time: '10:02', text: 'Lead created via ' + (lead.source || 'WhatsApp'), type: 'create' },
    { time: '10:02', text: 'Auto-reply sent · 1.4s', type: 'auto' },
    { time: '10:04', text: 'Inbound customer inquiry', type: 'reply' },
    { time: '10:06', text: 'Intent score computed: ' + lead.score + '/100', type: 'score' },
  ]

  return (
    <div className="flex flex-col h-full border-l border-white/8 bg-[#0C0C0C] overflow-y-auto">
      <div className="p-4 border-b border-white/8 flex flex-col items-center text-center">
        <Dial score={lead.score || 85} />
        <div className="mt-2 text-xs font-medium text-[#F0EDE8]">{lead.name}</div>
        <div className="font-mono text-[10px] text-[#C8953A] mt-0.5">{lead.value || '₹1.2 Cr'} pipeline</div>
        <div className="flex flex-wrap gap-1 justify-center mt-2">
          {tags.map((t: string) => (
            <span key={t} className="font-mono text-[8px] px-1.5 py-0.5 bg-white/5 border border-white/8 text-[#6B6B6B]" style={{ borderRadius: 2 }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="p-3 border-b border-white/8 space-y-2">
        <div className="font-mono text-[9px] text-[#6B6B6B] tracking-widest">METADATA</div>
        <div className="space-y-1 font-mono text-[10px]">
          <div className="flex justify-between text-[#6B6B6B]"><span>City:</span><span className="text-[#F0EDE8]">{lead.city || 'Gurugram'}</span></div>
          <div className="flex justify-between text-[#6B6B6B]"><span>Source:</span><span className="text-[#F0EDE8]">{lead.source || 'Meta Ad'}</span></div>
          <div className="flex justify-between text-[#6B6B6B]"><span>CTWA Ad:</span><span className="text-[#4A9EBA]">{(lead.ctwa || lead.isCtwa) ? 'Yes (72h Free)' : 'No'}</span></div>
          <div className="flex justify-between text-[#6B6B6B]"><span>Status:</span><span className="text-[#C8953A]">{lead.status}</span></div>
        </div>
      </div>

      <div className="p-3 flex-1 space-y-2">
        <div className="font-mono text-[9px] text-[#6B6B6B] tracking-widest">ACTIVITY LOG</div>
        <div className="space-y-2">
          {activity.map((a, i) => (
            <div key={i} className="flex gap-2 items-start font-mono text-[9px]">
              <span className="text-[#3A3A3A] flex-shrink-0">{a.time}</span>
              <span className="text-[#6B6B6B]">{a.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Simulator Modal
function SimulatorModal({ isOpen, onClose, onCreated }: { isOpen: boolean; onClose: () => void; onCreated: () => void }) {
  const [name, setName] = useState('Vikrant Malhotra')
  const [phone, setPhone] = useState('+91 99887 77665')
  const [message, setMessage] = useState('Hi, saw your ad. Budget 2.5 Cr for 3BHK penthouse. Site visit kab kar sakte hain?')
  const [isCtwa, setIsCtwa] = useState(true)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  if (!isOpen) return null

  const handleSimulate = async () => {
    setLoading(true)
    setResult(null)
    try {
      const res = await simulatorApi.sendInbound({
        name,
        phone,
        message,
        isCtwa,
        adHeadline: 'Luxury 3BHK Sector 62',
      })
      setResult(res)
      setTimeout(() => {
        onCreated()
        onClose()
      }, 1200)
    } catch (err: any) {
      alert('Error simulating lead: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#111] border border-white/10 w-full max-w-lg p-6 space-y-4 shadow-2xl" style={{ borderRadius: 2 }}>
        <div className="flex items-center justify-between border-b border-white/8 pb-3">
          <div className="flex items-center gap-2">
            <BoltIcon size={16} strokeWidth={2} className="text-[#C8953A]" />
            <h3 className="font-display text-lg text-[#F0EDE8]">Meta WhatsApp Inbound Simulator</h3>
          </div>
          <button onClick={onClose} className="text-[#6B6B6B] hover:text-white font-mono text-sm">✕</button>
        </div>

        <p className="text-xs text-[#6B6B6B]">
          Simulate a real prospective buyer messaging your WhatsApp number. Test the deterministic <strong>0-100 Intent Scoring</strong> and <strong>&lt;1.4s Auto-Reply Engine</strong> live!
        </p>

        <div className="space-y-3 font-mono text-xs">
          <div>
            <label className="text-[10px] text-[#6B6B6B] block mb-1">PROSPECT NAME</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/8 px-3 py-2 text-[#F0EDE8] focus:outline-none"
              style={{ borderRadius: 2 }}
            />
          </div>
          <div>
            <label className="text-[10px] text-[#6B6B6B] block mb-1">PHONE NUMBER</label>
            <input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/8 px-3 py-2 text-[#F0EDE8] focus:outline-none"
              style={{ borderRadius: 2 }}
            />
          </div>
          <div>
            <label className="text-[10px] text-[#6B6B6B] block mb-1">INBOUND WHATSAPP MESSAGE</label>
            <textarea
              rows={3}
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/8 px-3 py-2 text-[#F0EDE8] focus:outline-none"
              style={{ borderRadius: 2 }}
            />
          </div>

          {/* Quick presets */}
          <div className="space-y-1">
            <span className="text-[9px] text-[#6B6B6B]">QUICK PRESETS:</span>
            <div className="flex flex-wrap gap-1">
              {[
                { label: '🔥 High-Ticket Site Visit (2.5 Cr)', text: 'Hi, saw your ad. Budget 2.5 Cr for 3BHK penthouse. Site visit kab kar sakte hain?' },
                { label: '⚡ Urgent Hinglish Inquiry', text: 'Rate kitna padega? Urgent possession chahiye iss weekend.' },
                { label: '📄 Brochure Request', text: 'Please send latest brochure and payment breakdown.' },
              ].map(p => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setMessage(p.text)}
                  className="px-2 py-1 bg-white/5 hover:bg-white/10 text-[9px] text-[#C8953A] border border-white/5"
                  style={{ borderRadius: 2 }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 text-[11px] text-[#F0EDE8] pt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isCtwa}
              onChange={e => setIsCtwa(e.target.checked)}
              className="accent-[#C8953A]"
            />
            <span>Simulate as Click-to-WhatsApp (CTWA) Ad Lead (72h Free Messaging Window)</span>
          </label>
        </div>

        {result && (
          <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 font-mono text-[10px]">
            ✅ Lead Ingested! Intent Score: {result.lead?.intentScore}/100 · Auto-reply triggered!
          </div>
        )}

        <div className="flex justify-end gap-2 pt-3 border-t border-white/8">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-white/8 text-[#6B6B6B] hover:text-white font-mono text-xs"
            style={{ borderRadius: 2 }}
          >
            Cancel
          </button>
          <button
            onClick={handleSimulate}
            disabled={loading}
            className="px-4 py-2 bg-[#C8953A] hover:bg-[#E8B04A] text-[#080808] font-mono font-medium text-xs flex items-center gap-1.5"
            style={{ borderRadius: 2 }}
          >
            {loading ? 'Processing...' : '🚀 Dispatch Inbound Lead'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Inbox export (P1-01)
export default function Inbox() {
  const [leads, setLeads] = useState<any[]>(DEFAULT_LEADS)
  const [selected, setSelected] = useState<string>(DEFAULT_LEADS[0].id)
  const [filter, setFilter] = useState('All')
  const [showSimModal, setShowSimModal] = useState(false)

  // Fetch leads from backend
  const loadLeads = () => {
    leadsApi.getLeads()
      .then((data: any[]) => {
        if (data && data.length > 0) {
          setLeads(data)
          if (!data.some(l => String(l.id) === selected)) {
            setSelected(String(data[0].id))
          }
        }
      })
      .catch(() => {
        // keep fallback
      })
  }

  useEffect(() => {
    loadLeads()
  }, [])

  const lead = leads.find(l => String(l.id) === selected) || leads[0] || DEFAULT_LEADS[0]

  return (
    <div className="flex flex-col h-full relative">
      {/* Top Banner with Simulator Trigger & Status */}
      <div className="px-4 py-2 bg-[#C8953A]/8 border-b border-[#C8953A]/15 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <WarningIcon size={12} strokeWidth={1.5} className="text-[#C8953A] flex-shrink-0" />
          <span className="text-xs text-[#C8953A]">
            <strong>Live Engine:</strong> Deterministic Intent Scoring & Auto-Reply Gateway Active.
          </span>
        </div>
        <button
          onClick={() => setShowSimModal(true)}
          className="font-mono text-[10px] bg-[#C8953A] text-[#080808] hover:bg-[#E8B04A] px-2.5 py-1 flex items-center gap-1.5 font-medium transition-all"
          style={{ borderRadius: 2 }}
        >
          <BoltIcon size={10} strokeWidth={2} /> Simulate Lead Inbound
        </button>
      </div>

      <div className="flex-1 grid grid-cols-[270px_1fr_240px] min-h-0">
        <LeadList
          leads={leads}
          selected={selected}
          onSelect={id => setSelected(id)}
          filter={filter}
          setFilter={setFilter}
          onOpenSim={() => setShowSimModal(true)}
        />
        <ChatPanel lead={lead} />
        <IntelPanel lead={lead} />
      </div>

      {/* Simulator Modal */}
      <SimulatorModal
        isOpen={showSimModal}
        onClose={() => setShowSimModal(false)}
        onCreated={loadLeads}
      />
    </div>
  )
}
