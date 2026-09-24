import { useInView } from '../hooks/useInView'

const rows = [
  { dim: 'Primary Focus', anchor: 'Lead Recovery & Speed', wati: 'No-code bot builder', interakt: 'E-commerce catalog', aisensy: 'Broadcast marketing', dt: 'Field sales CRM' },
  { dim: 'Starting Price', anchor: '₹999 flat', wati: '$49 (~₹4,100)', interakt: '₹999 + markups', aisensy: '₹999 + markups', dt: '₹2,500 annual' },
  { dim: 'Meta Fee Markup', anchor: '0% — zero', wati: '15–25% hidden', interakt: 'Hidden', aisensy: 'Extra charges', dt: 'Bundled' },
  { dim: 'Lead Intent Dial', anchor: 'Built-in 0–100', wati: '❌ None', interakt: '❌ None', aisensy: '❌ Basic status', dt: '❌ Manual' },
  { dim: 'Revenue Leakage Calc', anchor: '₹ Value Tracker', wati: '❌ None', interakt: '❌ None', aisensy: '❌ None', dt: '❌ None' },
  { dim: '24h Meta Gate', anchor: 'Auto Hour 23 switch', wati: 'Manual warning', interakt: 'Manual blast', aisensy: 'Campaign only', dt: 'Basic reminder' },
  { dim: 'A/B Testing', anchor: '50/50 + 1-click winner', wati: '❌ None', interakt: '❌ None', aisensy: 'Basic', dt: '❌ None' },
]

const cols = ['Anchor.', 'Wati.io', 'Interakt', 'AiSensy', 'DoubleTick']

export default function CompetitorTable() {
  const { ref, inView } = useInView(0.05)

  return (
    <section ref={ref} className="py-24 px-6 border-b border-white/8 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 reveal ${inView ? 'visible' : ''}`}>
          <span className="font-mono text-xs text-[#C8953A] tracking-[0.2em] uppercase">Competitive Landscape</span>
          <h2 className="font-display text-4xl md:text-5xl text-[#F0EDE8] mt-4 leading-tight">
            How Anchor compares.
          </h2>
        </div>

        <div className={`overflow-x-auto reveal ${inView ? 'visible' : ''}`} style={{ transitionDelay: '100ms' }}>
          <table className="w-full border-collapse" style={{ minWidth: 700 }}>
            <thead>
              <tr className="border-b border-white/8">
                <th className="text-left py-4 pr-6 font-mono text-[10px] text-[#6B6B6B] tracking-widest w-36">DIMENSION</th>
                {cols.map((col, i) => (
                  <th
                    key={col}
                    className="py-4 px-4 font-mono text-[10px] tracking-widest text-center"
                    style={{ color: i === 0 ? '#C8953A' : '#6B6B6B', borderBottom: i === 0 ? '1px solid rgba(200,149,58,0.4)' : undefined }}
                  >
                    {col}
                    {i === 0 && <span className="block text-[8px] mt-0.5 text-[#C8953A]/60">YOU ARE HERE</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr
                  key={ri}
                  className={`border-b border-white/5 transition-all duration-500 ${inView ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transitionDelay: `${150 + ri * 80}ms` }}
                >
                  <td className="py-4 pr-6 font-mono text-[10px] text-[#6B6B6B] tracking-wide">{row.dim}</td>
                  {[row.anchor, row.wati, row.interakt, row.aisensy, row.dt].map((val, ci) => (
                    <td
                      key={ci}
                      className="py-4 px-4 text-xs text-center"
                      style={{
                        color: ci === 0 ? '#F0EDE8' : '#6B6B6B',
                        background: ci === 0 ? 'rgba(200,149,58,0.04)' : 'transparent',
                        fontFamily: ci === 0 ? 'inherit' : 'inherit',
                        borderLeft: ci === 0 ? '1px solid rgba(200,149,58,0.1)' : undefined,
                        borderRight: ci === 0 ? '1px solid rgba(200,149,58,0.1)' : undefined,
                      }}
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
