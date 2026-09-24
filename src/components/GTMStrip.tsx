import { useInView } from '../hooks/useInView'

const phases = [
  {
    range: '0 → 25',
    label: 'Founder-Led Sales',
    desc: 'Hand-to-hand. White-glove onboarding. Real estate brokers in Gurugram & Bangalore.',
    target: 'Month 1–2',
    progress: 100,
    mrr: '₹50,000',
  },
  {
    range: '25 → 100',
    label: 'Agency Flywheel',
    desc: 'Partner with Meta ads agencies. 20% recurring revenue share. White-label reports.',
    target: 'Month 3–5',
    progress: 65,
    mrr: '₹1,75,000',
  },
  {
    range: '100 → 500+',
    label: 'Self-Serve Engine',
    desc: 'Pipeline Leakage Calculator as lead magnet. SEO: "Wati alternative India".',
    target: 'Month 6–9',
    progress: 30,
    mrr: '₹11,25,000',
  },
]

export default function GTMStrip() {
  const { ref, inView } = useInView(0.1)

  return (
    <section ref={ref} className="py-24 px-6 border-b border-white/8">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 reveal ${inView ? 'visible' : ''}`}>
          <span className="font-mono text-xs text-[#C8953A] tracking-[0.2em] uppercase">Go-To-Market</span>
          <h2 className="font-display text-4xl text-[#F0EDE8] mt-4 leading-tight">
            0 to 500 paying customers.<br />Three deliberate phases.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {phases.map((p, i) => (
            <div
              key={i}
              className={`border border-white/8 p-6 reveal ${inView ? 'visible' : ''}`}
              style={{ borderRadius: 2, transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-display text-3xl text-[#F0EDE8]">{p.range}</div>
                  <div className="font-mono text-xs text-[#C8953A] mt-1 tracking-wide">{p.label}</div>
                </div>
                <div className="font-mono text-[10px] text-[#6B6B6B] text-right">
                  <div>{p.target}</div>
                  <div className="text-[#F0EDE8] mt-0.5">{p.mrr} MRR</div>
                </div>
              </div>

              <p className="text-xs text-[#6B6B6B] leading-relaxed mb-5">{p.desc}</p>

              <div>
                <div className="flex justify-between font-mono text-[9px] text-[#6B6B6B] mb-1.5">
                  <span>Progress</span>
                  <span>{p.progress}%</span>
                </div>
                <div className="h-px bg-white/8 relative overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-[#C8953A] transition-all duration-1000"
                    style={{ width: inView ? `${p.progress}%` : '0%', transitionDelay: `${300 + i * 150}ms` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
