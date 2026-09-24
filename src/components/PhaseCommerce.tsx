import { useInView } from '../hooks/useInView'
import { CardIcon, CheckIcon } from './Icons'

export default function PhaseCommerce() {
  const { ref, inView } = useInView(0.1)

  return (
    <section ref={ref} className="py-24 px-6 border-b border-white/8">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 reveal ${inView ? 'visible' : ''}`}>
          <span className="font-mono text-xs text-[#C8953A] tracking-[0.2em] uppercase">Phase 3 — Weeks 7–9</span>
          <h2 className="font-display text-4xl md:text-5xl text-[#F0EDE8] mt-4 leading-tight">
            High-Ticket Commerce<br />inside WhatsApp.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* WhatsApp Flow */}
          <div className={`col-span-1 border border-white/8 p-0 overflow-hidden reveal-left ${inView ? 'visible' : ''}`} style={{ borderRadius: 2, transitionDelay: '100ms' }}>
            <div className="bg-[#1A1A1A] px-4 py-3 border-b border-white/8">
              <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest">WHATSAPP FLOW · REAL ESTATE</div>
            </div>
            <div className="p-4 space-y-3">
              {[
                { step: '01', q: 'Budget Range?', options: ['₹50L–1Cr', '₹1Cr–2Cr', '₹2Cr+'] },
                { step: '02', q: 'Configuration?', options: ['2BHK', '3BHK', 'Villa/Penthouse'] },
                { step: '03', q: 'Site Visit Date?', options: ['This Weekend', 'Next Week', 'Call Me'] },
              ].map((item) => (
                <div key={item.step} className="border border-white/8 p-3" style={{ borderRadius: 2 }}>
                  <div className="font-mono text-[9px] text-[#C8953A] mb-2">STEP {item.step}</div>
                  <div className="text-xs font-medium text-[#F0EDE8] mb-2">{item.q}</div>
                  <div className="flex flex-wrap gap-1">
                    {item.options.map(o => (
                      <span key={o} className="font-mono text-[9px] px-2 py-1 border border-white/10 text-[#6B6B6B]" style={{ borderRadius: 2 }}>
                        {o}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <div className="mt-2 p-3 bg-[#C8953A]/10 border border-[#C8953A]/30 flex items-center gap-2" style={{ borderRadius: 2 }}>
                <CheckIcon size={12} strokeWidth={2} className="text-[#C8953A] flex-shrink-0" />
                <div className="font-mono text-[9px] text-[#C8953A]">FLOW COMPLETE — Lead scored 100/100</div>
              </div>
            </div>
          </div>

          {/* CTWA Attribution */}
          <div className={`border border-white/8 p-6 reveal ${inView ? 'visible' : ''}`} style={{ borderRadius: 2, transitionDelay: '200ms' }}>
            <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest mb-6">AD ATTRIBUTION</div>
            <h3 className="font-display text-xl text-[#F0EDE8] mb-4">Click-to-WhatsApp<br />Ad Tracking</h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed mb-6">
              Every WhatsApp lead traced back to its exact Meta ad — campaign, ad set, creative. See which ₹ spent is returning the most pipeline.
            </p>
            <div className="space-y-3">
              {[
                { ad: 'Sector 62 Launch · Reel', leads: 34, qualified: 12, value: '₹14.4 Cr' },
                { ad: 'Golf Course Rd · Carousel', leads: 28, qualified: 9, value: '₹10.8 Cr' },
                { ad: 'Penthouse · Story', leads: 19, qualified: 7, value: '₹16.1 Cr' },
              ].map((row, i) => (
                <div key={i} className="border border-white/8 p-3 flex justify-between items-center" style={{ borderRadius: 2 }}>
                  <div>
                    <div className="text-xs font-medium text-[#F0EDE8]">{row.ad}</div>
                    <div className="font-mono text-[9px] text-[#6B6B6B] mt-0.5">{row.leads} leads · {row.qualified} qualified</div>
                  </div>
                  <div className="font-mono text-sm text-[#C8953A]">{row.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div className={`border border-white/8 p-6 reveal-right ${inView ? 'visible' : ''}`} style={{ borderRadius: 2, transitionDelay: '300ms' }}>
            <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest mb-6">IN-CHAT PAYMENTS</div>
            <h3 className="font-display text-xl text-[#F0EDE8] mb-4">Booking Token<br />Inside WhatsApp</h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed mb-6">
              Send a Razorpay payment link inside the chat. Collect booking amount without the buyer ever leaving WhatsApp.
            </p>

            {/* Simulated payment link message */}
            <div className="bg-[#1A1A1A] p-3 border border-white/8" style={{ borderRadius: 2 }}>
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-[#C8953A]/15 border border-[#C8953A]/20 flex items-center justify-center flex-shrink-0" style={{ borderRadius: 2 }}>
                  <CardIcon size={14} strokeWidth={1.5} className="text-[#C8953A]" />
                </div>
                <div>
                  <div className="text-xs font-medium text-[#F0EDE8]">Anchor Payment Request</div>
                  <div className="font-mono text-[10px] text-[#6B6B6B] mt-0.5">Token Booking — Sector 62, 3BHK</div>
                  <div className="font-display text-lg text-[#C8953A] mt-1">₹1,00,000</div>
                  <button className="mt-2 w-full py-1.5 bg-[#C8953A] text-[#080808] font-mono text-[10px] tracking-wide font-medium" style={{ borderRadius: 2 }}>
                    PAY SECURELY
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 border border-white/8 flex items-center gap-2 font-mono text-[10px] text-[#6B6B6B]" style={{ borderRadius: 2 }}>
              <CheckIcon size={12} strokeWidth={2} className="text-[#C8953A] flex-shrink-0" />
              Payment confirmed — Lead status auto-updates to WON
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
