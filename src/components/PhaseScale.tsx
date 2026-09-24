import { useInView } from '../hooks/useInView'

const patterns = [
  { input: '"Kab visit kar sakte hain?"', action: '→ Site Visit Flow', lang: 'हिंदी' },
  { input: '"Price kya hai?"', action: '→ Price Breakdown', lang: 'हिंदी' },
  { input: '"Location kahan hai?"', action: '→ Google Maps Pin', lang: 'हिंदी' },
  { input: '"Rate kitna padega?"', action: '→ Price Breakdown', lang: 'हिंदी' },
  { input: '"Veedu enga irukku?"', action: '→ Google Maps Pin', lang: 'தமிழ்' },
  { input: '"Kimat kya che?"', action: '→ Price Breakdown', lang: 'ગુજરાતી' },
]

const integrations = ['Google Sheets', 'Zapier', 'Make.com', 'Zoho CRM', 'LeadSquared', 'WhatsApp Flows']

export default function PhaseScale() {
  const { ref, inView } = useInView(0.1)

  return (
    <section ref={ref} className="py-24 px-6 border-b border-white/8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className={`reveal-left ${inView ? 'visible' : ''}`}>
            <span className="font-mono text-xs text-[#C8953A] tracking-[0.2em] uppercase">Phase 5 — Month 4+</span>
            <h2 className="font-display text-4xl text-[#F0EDE8] mt-4 mb-6 leading-tight">
              Vernacular Engine<br />&amp; Nationwide Scale.
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-8">
              India speaks 22+ languages. Anchor matches Hinglish, Marathi, Gujarati, Tamil, and Telugu patterns — routing each phrase to the right
              flow without AI, without hallucinations.
            </p>

            <div className="border border-white/8 overflow-hidden" style={{ borderRadius: 2 }}>
              <div className="px-4 py-3 border-b border-white/8 font-mono text-[10px] text-[#6B6B6B] tracking-widest">
                HINGLISH PATTERN MATCHER
              </div>
              <div className="divide-y divide-white/5">
                {patterns.map((p, i) => (
                  <div
                    key={i}
                    className={`px-4 py-2.5 flex items-center justify-between gap-4 transition-all duration-500 ${inView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: `${200 + i * 80}ms` }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono text-[9px] text-[#6B6B6B] flex-shrink-0">{p.lang}</span>
                      <span className="text-xs text-[#F0EDE8] truncate">{p.input}</span>
                    </div>
                    <span className="font-mono text-[9px] text-[#C8953A] flex-shrink-0">{p.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`reveal-right ${inView ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
            <div className="mb-8">
              <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest mb-4">INTEGRATION HUB</div>
              <div className="flex flex-wrap gap-2">
                {integrations.map(i => (
                  <span
                    key={i}
                    className="font-mono text-xs px-3 py-2 border border-white/8 text-[#6B6B6B] hover:border-white/15 hover:text-[#F0EDE8] transition-colors"
                    style={{ borderRadius: 2 }}
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Cities Targeted', value: '24', sub: 'Tier 1, 2 & 3' },
                { label: 'Official Green Tick', value: '60s', sub: 'Onboarding time' },
                { label: 'Languages', value: '5+', sub: 'Hinglish, Marathi, Gujrati, Tamil, Telugu' },
                { label: 'Target MRR', value: '₹25L+', sub: 'Month 12' },
              ].map((card, i) => (
                <div key={i} className="border border-white/8 p-4" style={{ borderRadius: 2 }}>
                  <div className="font-display text-2xl text-[#C8953A]">{card.value}</div>
                  <div className="text-xs font-medium text-[#F0EDE8] mt-1">{card.label}</div>
                  <div className="font-mono text-[9px] text-[#6B6B6B] mt-0.5">{card.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
