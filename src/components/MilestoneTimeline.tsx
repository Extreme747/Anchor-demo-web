import { useInView } from '../hooks/useInView'

const milestones = [
  { id: 'M1', name: 'Alpha Launch', horizon: 'Month 1', metric: '10 Live Pilots', mrr: '₹0', phase: 'Feedback', done: true },
  { id: 'M2', name: 'Paid Beta', horizon: 'Month 2', metric: '25 Paid Customers', mrr: '₹50,000', phase: 'Revenue', done: true },
  { id: 'M3', name: 'Product-Market Fit', horizon: 'Month 3–4', metric: '75 Paid Customers', mrr: '₹1,75,000', phase: 'PMF', done: false },
  { id: 'M4', name: 'Agency Scale', horizon: 'Month 5–6', metric: '200 Paid Customers', mrr: '₹5,00,000', phase: 'Scale', done: false },
  { id: 'M5', name: 'Flows & Commerce', horizon: 'Month 7–9', metric: '450 Paid Customers', mrr: '₹11,25,000', phase: 'Expansion', done: false },
  { id: 'M6', name: 'Nationwide Scale', horizon: 'Month 10–12', metric: '1,000 Paid Customers', mrr: '₹25,00,000+', phase: 'Series A', done: false },
]

export default function MilestoneTimeline() {
  const { ref, inView } = useInView(0.05)

  return (
    <section ref={ref} className="py-24 px-6 border-b border-white/8 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 reveal ${inView ? 'visible' : ''}`}>
          <span className="font-mono text-xs text-[#C8953A] tracking-[0.2em] uppercase">Execution Milestones</span>
          <h2 className="font-display text-4xl text-[#F0EDE8] mt-4 leading-tight">
            Zero to ₹25L MRR.<br />Twelve months.
          </h2>
        </div>

        {/* Timeline rail */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-white/8" />

          <div className="grid md:grid-cols-6 gap-4">
            {milestones.map((m, i) => (
              <div
                key={m.id}
                className={`relative reveal ${inView ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Dot */}
                <div className="hidden md:flex mb-4 justify-start">
                  <div
                    className="w-3 h-3 border-2 flex-shrink-0"
                    style={{
                      borderRadius: 2,
                      borderColor: m.done ? '#C8953A' : 'rgba(255,255,255,0.15)',
                      background: m.done ? '#C8953A' : '#080808',
                    }}
                  />
                </div>

                <div
                  className="border p-4 hover:border-white/15 transition-colors"
                  style={{
                    borderRadius: 2,
                    borderColor: m.done ? 'rgba(200,149,58,0.3)' : 'rgba(255,255,255,0.08)',
                    background: m.done ? 'rgba(200,149,58,0.04)' : 'transparent',
                  }}
                >
                  <div className="font-mono text-[9px] text-[#C8953A] tracking-widest mb-1">{m.id} · {m.phase}</div>
                  <div className="text-xs font-medium text-[#F0EDE8] mb-2 leading-tight">{m.name}</div>
                  <div className="font-mono text-[9px] text-[#6B6B6B] mb-3">{m.horizon}</div>
                  <div className="border-t border-white/5 pt-3">
                    <div className="font-mono text-[9px] text-[#6B6B6B]">{m.metric}</div>
                    <div className="font-display text-lg mt-1" style={{ color: m.done ? '#C8953A' : '#F0EDE8' }}>{m.mrr}</div>
                    <div className="font-mono text-[8px] text-[#6B6B6B]">target MRR</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
