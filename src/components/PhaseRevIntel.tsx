import { useInView } from '../hooks/useInView'

const agents = [
  { name: 'Rahul Verma', frt: '1m 12s', rate: '34%', leads: 28, status: 'online' },
  { name: 'Sneha Kapoor', frt: '0m 58s', rate: '41%', leads: 31, status: 'online' },
  { name: 'Amit Singh', frt: '4m 03s', rate: '22%', leads: 19, status: 'away' },
  { name: 'Divya Nair', frt: '1m 45s', rate: '38%', leads: 25, status: 'online' },
]

export default function PhaseRevIntel() {
  const { ref, inView } = useInView(0.1)

  return (
    <section ref={ref} className="py-24 px-6 border-b border-white/8 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 reveal ${inView ? 'visible' : ''}`}>
          <span className="font-mono text-xs text-[#C8953A] tracking-[0.2em] uppercase">Phase 4 — Weeks 10–12</span>
          <h2 className="font-display text-4xl md:text-5xl text-[#F0EDE8] mt-4 leading-tight">
            Revenue Intelligence<br />&amp; Multi-Agent Routing.
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          {/* Revenue Leakage Report */}
          <div className={`md:col-span-2 border border-white/8 overflow-hidden reveal-left ${inView ? 'visible' : ''}`} style={{ borderRadius: 2, transitionDelay: '100ms' }}>
            <div className="border-b border-white/8 px-4 py-3 flex items-center justify-between">
              <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest">DAILY EXECUTIVE REPORT</div>
              <div className="font-mono text-[9px] text-[#6B6B6B]">Today, 8:00 AM</div>
            </div>
            <div className="p-5 space-y-4">
              {[
                { label: 'Leads Received', value: '84', sub: 'Today' },
                { label: 'Responded < 2 min', value: '76', sub: '90.4% rate', good: true },
                { label: 'Leads Leaked', value: '8', sub: 'No reply in 24h', bad: true },
              ].map((item, i) => (
                <div key={i} className={`flex items-center justify-between py-3 border-b border-white/5 ${i === 2 ? 'border-b-0' : ''}`}>
                  <div>
                    <div className="text-sm text-[#F0EDE8]">{item.label}</div>
                    <div className="font-mono text-[9px] text-[#6B6B6B] mt-0.5">{item.sub}</div>
                  </div>
                  <div
                    className="font-display text-2xl"
                    style={{ color: item.good ? '#C8953A' : item.bad ? '#EF4444' : '#F0EDE8' }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}

              <div className="border border-[#EF4444]/30 bg-[#EF4444]/5 p-4" style={{ borderRadius: 2 }}>
                <div className="font-mono text-[9px] text-[#EF4444] tracking-widest mb-1">REVENUE AT RISK</div>
                <div className="font-display text-3xl text-[#F0EDE8]">₹12,00,000</div>
                <div className="font-mono text-[10px] text-[#6B6B6B] mt-1">8 leads · Avg ₹1.5 Cr pipeline each</div>
                <div className="font-mono text-[9px] text-[#EF4444] mt-2">⚠ 3 sessions expiring in 2 hours</div>
              </div>
            </div>
          </div>

          {/* Agent Leaderboard */}
          <div className={`md:col-span-3 border border-white/8 overflow-hidden reveal-right ${inView ? 'visible' : ''}`} style={{ borderRadius: 2, transitionDelay: '200ms' }}>
            <div className="border-b border-white/8 px-4 py-3 flex items-center justify-between">
              <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest">AGENT LEADERBOARD</div>
              <select className="bg-transparent font-mono text-[10px] text-[#6B6B6B] border border-white/8 px-2 py-1" style={{ borderRadius: 2 }}>
                <option>This Week</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/8">
                    {['Agent', 'First Reply', 'Conv Rate', 'Active Leads', 'Status'].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-mono text-[9px] text-[#6B6B6B] tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {agents.map((a, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#1A1A1A] flex items-center justify-center font-mono text-[9px] text-[#C8953A]">
                            {a.name[0]}
                          </div>
                          <span className="text-xs text-[#F0EDE8]">{a.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-[#F0EDE8]">{a.frt}</td>
                      <td className="px-4 py-3 font-mono text-xs text-[#C8953A]">{a.rate}</td>
                      <td className="px-4 py-3 font-mono text-xs text-[#F0EDE8]">{a.leads}</td>
                      <td className="px-4 py-3">
                        <span
                          className="font-mono text-[9px] px-2 py-1"
                          style={{
                            borderRadius: 2,
                            background: a.status === 'online' ? 'rgba(74,222,128,0.1)' : 'rgba(107,107,107,0.1)',
                            color: a.status === 'online' ? '#4ADE80' : '#6B6B6B',
                            border: `1px solid ${a.status === 'online' ? 'rgba(74,222,128,0.2)' : 'rgba(107,107,107,0.2)'}`,
                          }}
                        >
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-white/8 grid grid-cols-3 gap-4">
              {[
                { label: 'Round-Robin', desc: 'Even distribution among active agents' },
                { label: 'Skill-Based', desc: 'Luxury leads → Senior brokers only' },
                { label: 'Claim & Transfer', desc: 'With internal handover notes' },
              ].map((r, i) => (
                <div key={i} className="border border-white/8 p-3" style={{ borderRadius: 2 }}>
                  <div className="font-mono text-[9px] text-[#C8953A] mb-1">{r.label}</div>
                  <div className="font-mono text-[9px] text-[#6B6B6B]">{r.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
