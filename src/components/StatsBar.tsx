import { useInView, useCountUp } from '../hooks/useInView'

function StatItem({ inView, value, suffix, label, delay }: { inView: boolean; value: number; suffix: string; label: string; delay: number }) {
  const count = useCountUp(value, 1600, inView)
  return (
    <div
      className={`flex flex-col items-center gap-2 md:px-8 reveal ${inView ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="font-display text-4xl md:text-5xl text-[#F0EDE8]">
        {count}{suffix}
      </div>
      <div className="font-mono text-xs text-[#6B6B6B] tracking-widest uppercase text-center leading-relaxed">{label}</div>
    </div>
  )
}

export default function StatsBar() {
  const { ref, inView } = useInView(0.2)

  return (
    <section
      ref={ref}
      className="border-y border-white/8 py-16 px-6"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 md:divide-x divide-white/8">
        <StatItem inView={inView} value={70} suffix="%" label="Leads leak without reply" delay={0} />
        <StatItem inView={inView} value={391} suffix="%" label="Conversion drop after 5 min" delay={100} />
        <StatItem inView={inView} value={0} suffix="%" label="Meta fee markup" delay={200} />
        <StatItem inView={inView} value={2} suffix="s" label="Max auto-reply latency" delay={300} />
      </div>
    </section>
  )
}
