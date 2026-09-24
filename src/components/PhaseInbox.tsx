import { useInView } from '../hooks/useInView'
import { BoltIcon, SlashIcon, TagIcon, RulerIcon } from './Icons'

const features = [
  {
    Icon: BoltIcon,
    title: 'Sub-2s Auto-Reply Engine',
    body: 'Keyword rules trigger deterministic replies before any human sees the message. Deduplication lock prevents spam loops.',
  },
  {
    Icon: RulerIcon,
    title: 'Intent Dial (0–100)',
    body: 'Budget, timeline, and action triggers auto-score each lead. "Carpet area" +25 pts. "Ready to move" +30 pts. Decays 5 pts/12h.',
  },
  {
    Icon: SlashIcon,
    title: 'Quick Reply Shortcuts',
    body: 'Type / to instantly surface /visit, /brochure, /pricing with auto variable replacement — {{name}}, {{property}}, {{price}}.',
  },
  {
    Icon: TagIcon,
    title: 'Smart Tags & Filters',
    body: 'Custom colored tags. Filter by Hot, Penthouse, Commercial. Bulk assign to agents. Export to CSV for CRM backup.',
  },
]

export default function PhaseInbox() {
  const { ref, inView } = useInView(0.1)

  return (
    <section id="phases" ref={ref} className="py-24 px-6 border-b border-white/8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className={`reveal-left ${inView ? 'visible' : ''}`}>
            <span className="font-mono text-xs text-[#C8953A] tracking-[0.2em] uppercase">Phase 1 — Weeks 3–4</span>
            <h2 className="font-display text-4xl text-[#F0EDE8] mt-4 mb-6 leading-tight">
              Zero-Leak Inbound<br />Machine.
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-8">
              Every inbound WhatsApp lead gets a response in under 2 seconds — before your competitor even opens their phone.
              The intent engine scores buying signals in real time so your best reps focus on the hottest deals.
            </p>
            <div className="flex items-center gap-4">
              <div className="font-mono text-xs text-[#6B6B6B]">Response time improvement</div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="font-display text-3xl text-[#C8953A]">2s</div>
              <div className="font-mono text-xs text-[#6B6B6B]">vs industry avg of 3–6 hours</div>
            </div>
          </div>

          <div className={`grid grid-cols-2 gap-3 reveal-right ${inView ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
            {features.map((f, i) => (
              <div
                key={i}
                className="p-4 border border-white/8 hover:border-white/15 transition-colors duration-300"
                style={{ borderRadius: 2 }}
              >
                <div className="text-[#C8953A] mb-3">
                  <f.Icon size={18} strokeWidth={1.5} />
                </div>
                <div className="text-sm font-medium text-[#F0EDE8] mb-2">{f.title}</div>
                <div className="text-xs text-[#6B6B6B] leading-relaxed">{f.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
