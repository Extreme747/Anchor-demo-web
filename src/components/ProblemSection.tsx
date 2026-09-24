import { useInView } from '../hooks/useInView'

const problems = [
  {
    number: '01',
    title: 'Response Latency',
    stat: '3–6 hrs',
    statLabel: 'Avg human response time',
    body: 'Your sales rep replies hours later. The lead has already spoken to three competitors. Conversion drops 391% after the first 5 minutes of inquiry.',
  },
  {
    number: '02',
    title: 'The Meta 24-Hour Cliff',
    stat: '24 hrs',
    statLabel: 'Before free session closes',
    body: 'After 24 hours of silence, Meta locks the conversation. Amateur teams blast unapproved messages and get their WhatsApp number permanently banned.',
  },
  {
    number: '03',
    title: 'Zero Revenue Visibility',
    stat: '₹0',
    statLabel: 'Leakage quantified today',
    body: 'You see "14 unread messages." You should see "₹18,50,000 in pipeline expiring in 3 hours." That\'s the gap Anchor closes.',
  },
]

export default function ProblemSection() {
  const { ref, inView } = useInView(0.1)

  return (
    <section ref={ref} className="py-24 px-6 border-b border-white/8">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 reveal ${inView ? 'visible' : ''}`}>
          <span className="font-mono text-xs text-[#C8953A] tracking-[0.2em] uppercase">The Problem</span>
          <h2 className="font-display text-4xl md:text-5xl text-[#F0EDE8] mt-4 leading-tight">
            Three flaws killing<br />your WhatsApp pipeline.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/8">
          {problems.map((p, i) => (
            <div
              key={p.number}
              className={`py-10 md:px-10 first:md:pl-0 last:md:pr-0 reveal ${inView ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className="font-mono text-xs text-[#6B6B6B] tracking-widest">{p.number}</span>
              <h3 className="font-display text-2xl text-[#F0EDE8] mt-3 mb-4">{p.title}</h3>
              <div className="mb-6">
                <div className="font-mono text-3xl text-[#C8953A]">{p.stat}</div>
                <div className="font-mono text-xs text-[#6B6B6B] mt-1">{p.statLabel}</div>
              </div>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
