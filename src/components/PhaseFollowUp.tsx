import { useInView } from '../hooks/useInView'

const timeline = [
  { hour: '0h', label: 'Lead Arrives', desc: 'Auto-reply fires in 1.4s', color: '#C8953A', active: true },
  { hour: '1h', label: 'Drip #1', desc: '"Did you get the brochure?"', color: '#C8953A', active: true },
  { hour: '23h', label: '⚠ Warning', desc: 'Session expiry nudge sent', color: '#E8B04A', active: true },
  { hour: '24h', label: 'Meta Gate', desc: 'Free text locked. Templates only.', color: '#6B6B6B', active: false },
  { hour: '72h', label: 'Re-engage', desc: 'Approved template + quick-reply buttons', color: '#6B6B6B', active: false },
]

export default function PhaseFollowUp() {
  const { ref, inView } = useInView(0.1)

  return (
    <section ref={ref} className="py-24 px-6 border-b border-white/8 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Timeline visual */}
          <div className={`reveal-left ${inView ? 'visible' : ''}`} style={{ transitionDelay: '100ms' }}>
            <div className="border border-white/8 p-6" style={{ borderRadius: 2 }}>
              <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest mb-6">FOLLOW-UP TIMELINE</div>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/8" />

                <div className="space-y-6">
                  {timeline.map((step, i) => (
                    <div
                      key={i}
                      className={`flex gap-4 items-start transition-all duration-500 ${inView ? 'opacity-100' : 'opacity-0'}`}
                      style={{ transitionDelay: `${300 + i * 150}ms` }}
                    >
                      <div
                        className="w-10 h-10 flex-shrink-0 border flex items-center justify-center font-mono text-[9px] relative z-10"
                        style={{
                          borderColor: step.color,
                          background: step.active ? `rgba(200,149,58,0.1)` : '#0A0A0A',
                          color: step.color,
                          borderRadius: 2,
                        }}
                      >
                        {step.hour}
                      </div>
                      <div className="pt-1">
                        <div className="text-sm font-medium text-[#F0EDE8]">{step.label}</div>
                        <div className="font-mono text-xs text-[#6B6B6B] mt-0.5">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* A/B test badge */}
              <div className="mt-6 pt-6 border-t border-white/8">
                <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest mb-3">A/B TEST RESULTS</div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Template A', rate: '34%', replies: 128 },
                    { label: 'Template B ✓', rate: '51%', replies: 194, winner: true },
                  ].map((v, i) => (
                    <div key={i} className={`p-3 border ${v.winner ? 'border-[#C8953A]/40 bg-[#C8953A]/5' : 'border-white/8'}`} style={{ borderRadius: 2 }}>
                      <div className="font-mono text-[9px] text-[#6B6B6B]">{v.label}</div>
                      <div className="font-display text-xl mt-1" style={{ color: v.winner ? '#C8953A' : '#F0EDE8' }}>{v.rate}</div>
                      <div className="font-mono text-[9px] text-[#6B6B6B]">{v.replies} replies</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={`reveal-right ${inView ? 'visible' : ''}`}>
            <span className="font-mono text-xs text-[#C8953A] tracking-[0.2em] uppercase">Phase 2 — Weeks 5–6</span>
            <h2 className="font-display text-4xl text-[#F0EDE8] mt-4 mb-6 leading-tight">
              Automated Follow-Up<br />& Meta Cron Engine.
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-6">
              The Meta 24-hour policy is the most dangerous cliff in WhatsApp sales. Anchor tracks it to the second, sends a
              session warning at Hour 23, and switches to approved templates at Hour 24 — automatically, without human
              intervention.
            </p>
            <div className="space-y-3">
              {[
                'Zero WhatsApp number bans — ever',
                'Automated 3-step drip cadence',
                '50/50 A/B testing with 1-click winner promotion',
                'Re-engagement templates with quick-reply buttons',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#C8953A] mt-0.5">—</span>
                  <span className="text-sm text-[#6B6B6B]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
