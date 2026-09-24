import { useState, useEffect } from 'react'
import { useInView } from '../hooks/useInView'

export default function LeakageCalculator() {
  const { ref, inView } = useInView(0.1)
  const [adSpend, setAdSpend] = useState(200000)
  const [leadsPerMonth, setLeadsPerMonth] = useState(150)
  const [avgTicket, setAvgTicket] = useState(8000000)
  const [leakageRate, setLeakageRate] = useState(65)

  const leakedLeads = Math.round(leadsPerMonth * (leakageRate / 100))
  const conversionRate = 0.08
  const leakedRevenue = Math.round(leakedLeads * conversionRate * avgTicket)
  const annualLeak = leakedRevenue * 12

  function fmt(n: number) {
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)} Cr`
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`
    return `₹${n.toLocaleString('en-IN')}`
  }

  return (
    <section id="calculator" ref={ref} className="py-24 px-6 border-b border-white/8 bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto">
        <div className={`mb-12 text-center reveal ${inView ? 'visible' : ''}`}>
          <span className="font-mono text-xs text-[#C8953A] tracking-[0.2em] uppercase">Pipeline Leakage Calculator</span>
          <h2 className="font-display text-4xl md:text-5xl text-[#F0EDE8] mt-4 leading-tight">
            How much are you<br />losing every month?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className={`border border-white/8 p-6 space-y-8 reveal-left ${inView ? 'visible' : ''}`} style={{ borderRadius: 2, transitionDelay: '100ms' }}>
            {[
              {
                label: 'Monthly Ad Spend',
                value: adSpend,
                min: 10000,
                max: 2500000,
                step: 10000,
                set: setAdSpend,
                display: fmt(adSpend),
              },
              {
                label: 'Inbound Leads / Month',
                value: leadsPerMonth,
                min: 10,
                max: 1000,
                step: 5,
                set: setLeadsPerMonth,
                display: `${leadsPerMonth} leads`,
              },
              {
                label: 'Avg Deal Value',
                value: avgTicket,
                min: 500000,
                max: 50000000,
                step: 500000,
                set: setAvgTicket,
                display: fmt(avgTicket),
              },
              {
                label: 'Estimated Leak Rate',
                value: leakageRate,
                min: 20,
                max: 90,
                step: 1,
                set: setLeakageRate,
                display: `${leakageRate}%`,
              },
            ].map(input => (
              <div key={input.label}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-[#6B6B6B]">{input.label}</span>
                  <span className="font-mono text-sm text-[#F0EDE8]">{input.display}</span>
                </div>
                <input
                  type="range"
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  value={input.value}
                  onChange={e => input.set(Number(e.target.value))}
                  className="w-full h-px bg-white/10 appearance-none cursor-pointer"
                  style={{
                    accentColor: '#C8953A',
                  }}
                />
                <div className="flex justify-between font-mono text-[9px] text-[#6B6B6B] mt-1">
                  <span>{input.label.includes('Lead') || input.label.includes('Rate') ? input.min : fmt(input.min as number)}</span>
                  <span>{input.label.includes('Lead') || input.label.includes('Rate') ? input.max : fmt(input.max as number)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Output */}
          <div className={`flex flex-col gap-4 reveal-right ${inView ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
            <div className="border border-[#EF4444]/20 bg-[#EF4444]/5 p-6 flex-1" style={{ borderRadius: 2 }}>
              <div className="font-mono text-[10px] text-[#EF4444] tracking-widest mb-3">MONTHLY REVENUE LEAKAGE</div>
              <div className="font-display text-5xl md:text-6xl text-[#F0EDE8]">{fmt(leakedRevenue)}</div>
              <div className="font-mono text-xs text-[#6B6B6B] mt-3">
                {leakedLeads} leads leaked × {Math.round(conversionRate * 100)}% conv rate × {fmt(avgTicket)} avg deal
              </div>
            </div>

            <div className="border border-white/8 p-6" style={{ borderRadius: 2 }}>
              <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest mb-3">ANNUALIZED PIPELINE AT RISK</div>
              <div className="font-display text-3xl text-[#C8953A]">{fmt(annualLeak)}</div>
            </div>

            <div className="border border-[#C8953A]/20 bg-[#C8953A]/5 p-5" style={{ borderRadius: 2 }}>
              <div className="font-mono text-[10px] text-[#C8953A] tracking-widest mb-2">ANCHOR ROI</div>
              <div className="text-sm text-[#F0EDE8] leading-relaxed">
                Anchor costs <span className="text-[#C8953A] font-medium">₹999–₹4,999/mo</span>. If we recover even 15% of your leakage, that's{' '}
                <span className="text-[#C8953A] font-medium">{fmt(Math.round(leakedRevenue * 0.15))}/mo</span> recovered revenue.
              </div>
              <div className="mt-3">
                <div className="font-mono text-[10px] text-[#6B6B6B] mb-1">Recovery potential vs Anchor cost</div>
                <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C8953A] rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(95, Math.round((leakedRevenue * 0.15 / 4999) * 100 / 10))}%` }}
                  />
                </div>
              </div>
            </div>

            <a
              href="#cta"
              className="block text-center py-4 bg-[#C8953A] text-[#080808] font-semibold text-sm tracking-wide hover:bg-[#E8B04A] transition-colors"
              style={{ borderRadius: 2 }}
            >
              Stop the Leak — Start Free →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
