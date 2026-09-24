import { useState, useEffect } from 'react'
import { useInView } from '../hooks/useInView'
import { BoltIcon, DoubleCheck, HotIcon } from './Icons'

const leads = [
  { name: 'Arjun Sharma', preview: 'Bhai site visit kab kar sakte...', time: '2m', score: 87, tag: 'Hot', status: 'NEW' },
  { name: 'Priya Mehta', preview: 'Interested in 3BHK, budget 1.2Cr', time: '8m', score: 72, tag: 'Qualified', status: 'CONTACTED' },
  { name: 'Rohit Gupta', preview: 'Send me brochure please', time: '15m', score: 45, tag: 'Warm', status: 'NEW' },
  { name: 'Sunita Bose', preview: 'Urgent — need carpet area details', time: '1h', score: 91, tag: 'Hot', status: 'QUALIFIED' },
  { name: 'Vikram Joshi', preview: 'Kya immediate possession hai?', time: '2h', score: 38, tag: 'Cold', status: 'NEW' },
]

const chatMessages = [
  { from: 'lead', text: 'Hi, saw your ad on Instagram. Interested in 3BHK at Sector 62.', time: '10:02' },
  { from: 'anchor', text: 'Hi Arjun! Thanks for reaching out. I\'m connecting you with our team right now. Meanwhile, here\'s our latest project brochure: anchor.io/brochure/sec62', time: '10:02', auto: true },
  { from: 'lead', text: 'What\'s the price range? And kab tak possession?', time: '10:04' },
  { from: 'lead', text: 'Also site visit kab kar sakte hain?', time: '10:05' },
]

function IntentDial({ score, running }: { score: number; running: boolean }) {
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const fraction = score / 100
  const dashOffset = circumference * (1 - fraction * 0.75)

  const color = score >= 80 ? '#C8953A' : score >= 50 ? '#E8B04A' : '#6B6B6B'

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-[135deg]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`} strokeLinecap="round" />
          <circle
            cx="50" cy="50" r={radius} fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            strokeDashoffset={running ? dashOffset : circumference}
            strokeLinecap="round"
            style={{ transition: running ? 'stroke-dashoffset 1.5s cubic-bezier(0.16,1,0.3,1)' : 'none' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-xl font-medium" style={{ color }}>{running ? score : 0}</span>
          <span className="font-mono text-[9px] text-[#6B6B6B]">INTENT</span>
        </div>
      </div>
    </div>
  )
}

export default function InboxPreview() {
  const { ref, inView } = useInView(0.1)
  const [selected, setSelected] = useState(0)
  const [showTyping, setShowTyping] = useState(false)

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setShowTyping(true), 1200)
    return () => clearTimeout(t)
  }, [inView])

  return (
    <section id="inbox" ref={ref} className="py-24 px-6 border-b border-white/8">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 reveal ${inView ? 'visible' : ''}`}>
          <span className="font-mono text-xs text-[#C8953A] tracking-[0.2em] uppercase">The Product</span>
          <h2 className="font-display text-4xl md:text-5xl text-[#F0EDE8] mt-4 leading-tight">
            Your entire sales pipeline,<br />in one inbox.
          </h2>
          <p className="mt-4 text-[#6B6B6B] max-w-xl leading-relaxed">
            Reply in under 2 seconds. Score every lead 0–100. Know which ₹ crore deal is about to expire.
          </p>
        </div>

        {/* Inbox mockup */}
        <div
          className={`border border-white/8 overflow-hidden reveal ${inView ? 'visible' : ''}`}
          style={{ borderRadius: 2, transitionDelay: '150ms' }}
        >
          <div className="grid md:grid-cols-[280px_1fr_240px] h-[520px]">
            {/* Left: Lead list */}
            <div className="border-r border-white/8 flex flex-col bg-[#0D0D0D]">
              <div className="px-4 py-3 border-b border-white/8 flex items-center gap-2">
                <div className="flex-1 bg-[#1A1A1A] rounded-sm px-3 py-1.5 flex items-center gap-2">
                  <svg className="w-3 h-3 text-[#6B6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  <span className="font-mono text-xs text-[#6B6B6B]">Search leads...</span>
                </div>
              </div>
              <div className="px-3 py-2 flex gap-1 border-b border-white/8">
                {['ALL', 'NEW', 'HOT'].map((f, i) => (
                  <button key={f} className={`font-mono text-[10px] px-2 py-1 tracking-wide ${i === 0 ? 'bg-[#C8953A] text-[#080808]' : 'text-[#6B6B6B] hover:text-[#F0EDE8]'}`} style={{ borderRadius: 2 }}>
                    {f}
                  </button>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto">
                {leads.map((lead, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`w-full text-left px-4 py-3 border-b border-white/5 flex gap-3 items-start transition-colors ${selected === i ? 'bg-[#1A1A1A]' : 'hover:bg-[#141414]'}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center font-mono text-xs text-[#C8953A] flex-shrink-0 mt-0.5">
                      {lead.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-medium text-[#F0EDE8] truncate">{lead.name}</span>
                        <span className="font-mono text-[9px] text-[#6B6B6B] flex-shrink-0">{lead.time}</span>
                      </div>
                      <div className="text-[11px] text-[#6B6B6B] truncate mt-0.5">{lead.preview}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono text-[9px] px-1.5 py-0.5 border border-white/10 text-[#C8953A]">{lead.score}</span>
                        <span className="font-mono text-[9px] text-[#6B6B6B]">{lead.tag}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Center: Chat */}
            <div className="flex flex-col bg-[#0A0A0A]">
              <div className="px-4 py-3 border-b border-white/8 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center font-mono text-xs text-[#C8953A]">
                  {leads[selected].name[0]}
                </div>
                <div>
                  <div className="text-sm font-medium text-[#F0EDE8]">{leads[selected].name}</div>
                  <div className="font-mono text-[10px] text-[#6B6B6B]">+91 98765 43210 · {leads[selected].status}</div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: '0 0 6px rgba(74,222,128,0.6)' }} />
                  <span className="font-mono text-[10px] text-[#6B6B6B]">LIVE</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === 'lead' ? 'justify-start' : 'justify-end'}`}>
                    <div
                      className="max-w-[75%] px-3 py-2 text-xs leading-relaxed"
                      style={{
                        borderRadius: 2,
                        background: msg.from === 'lead' ? '#1A1A1A' : 'rgba(200,149,58,0.15)',
                        border: msg.from === 'anchor' ? '1px solid rgba(200,149,58,0.2)' : '1px solid rgba(255,255,255,0.05)',
                        color: '#F0EDE8',
                      }}
                    >
                      {msg.auto && (
                        <div className="font-mono text-[9px] text-[#C8953A] mb-1 tracking-wide flex items-center gap-1"><BoltIcon size={9} strokeWidth={2} />ANCHOR AUTO-REPLY · 1.4s</div>
                      )}
                      {msg.text}
                      <div className="font-mono text-[9px] text-[#6B6B6B] mt-1 text-right flex items-center justify-end gap-1">{msg.time} {msg.from === 'anchor' && <DoubleCheck className="text-[#6B6B6B]" />}</div>
                    </div>
                  </div>
                ))}

                {showTyping && (
                  <div className="flex justify-end">
                    <div className="px-4 py-3 bg-[#1A1A1A] border border-white/5 flex gap-1.5 items-center" style={{ borderRadius: 2 }}>
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                  </div>
                )}
              </div>

              <div className="px-4 py-3 border-t border-white/8 flex items-center gap-2">
                <div className="flex-1 bg-[#141414] border border-white/8 px-3 py-2 flex items-center gap-2" style={{ borderRadius: 2 }}>
                  <span className="font-mono text-xs text-[#C8953A]">/</span>
                  <span className="text-xs text-[#6B6B6B]">Type / for quick replies...</span>
                </div>
                <button className="w-8 h-8 bg-[#C8953A] flex items-center justify-center flex-shrink-0" style={{ borderRadius: 2 }}>
                  <svg className="w-4 h-4 text-[#080808]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
              </div>
            </div>

            {/* Right: Lead Intel */}
            <div className="hidden md:flex flex-col border-l border-white/8 bg-[#0D0D0D] p-4 gap-4">
              <div className="text-[10px] font-mono text-[#6B6B6B] tracking-widest uppercase">Lead Intelligence</div>

              <div className="flex flex-col items-center py-4 border border-white/8" style={{ borderRadius: 2 }}>
                <IntentDial score={leads[selected].score} running={inView} />
                <div className="mt-2 font-mono text-[10px] text-[#6B6B6B] tracking-wide">
                  {leads[selected].score >= 80 ? 'High Intent' : leads[selected].score >= 50 ? 'Medium Intent' : 'Low Intent'}
                </div>
              </div>

              <div className="border border-white/8 p-3 space-y-2" style={{ borderRadius: 2 }}>
                <div className="font-mono text-[9px] text-[#6B6B6B] tracking-widest">PIPELINE VALUE</div>
                <div className="font-display text-2xl text-[#C8953A]">₹1.2 Cr</div>
                <div className="font-mono text-[9px] text-[#6B6B6B]">3BHK · Sec 62 · Gurugram</div>
              </div>

              <div className="border border-white/8 p-3 space-y-2" style={{ borderRadius: 2 }}>
                <div className="font-mono text-[9px] text-[#6B6B6B] tracking-widest">META WINDOW</div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                    <div className="h-full bg-[#C8953A] rounded-full" style={{ width: '78%' }} />
                  </div>
                  <span className="font-mono text-[10px] text-[#C8953A]">18h left</span>
                </div>
                <div className="font-mono text-[9px] text-[#6B6B6B]">Free session open</div>
              </div>

              <div className="border border-white/8 p-3 space-y-1.5" style={{ borderRadius: 2 }}>
                <div className="font-mono text-[9px] text-[#6B6B6B] tracking-widest mb-2">TAGS</div>
                {['Hot', 'Penthouse', 'Ready-to-move'].map(tag => (
                  <span key={tag} className="inline-block font-mono text-[9px] px-2 py-1 border border-white/10 text-[#F0EDE8] mr-1 mb-1">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
