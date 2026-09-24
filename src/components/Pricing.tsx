import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { useRouter } from '../router'

const tiers = [
  {
    name: 'Starter',
    monthly: 999,
    annual: 799,
    target: 'Solo brokers, clinics, boutique stores',
    leads: 'Up to 1,000',
    seats: '1 seat',
    features: ['Auto-reply engine', 'Intent scoring (0–100)', 'Lead tagging', 'CSV export', '0% Meta markup'],
    cta: 'Start Free Trial',
    hero: false,
  },
  {
    name: 'Growth',
    monthly: 2499,
    annual: 1999,
    target: 'Scaling sales teams, high-ticket agencies',
    leads: 'Up to 5,000',
    seats: '3 seats',
    features: ['Everything in Starter', 'A/B testing engine', 'Drip sequences', 'WhatsApp Flows', 'Ad attribution', '1-click winner'],
    cta: 'Get Early Access',
    hero: true,
  },
  {
    name: 'Business Scale',
    monthly: 4999,
    annual: 3999,
    target: 'Multi-project builders, coaching centers',
    leads: 'Unlimited',
    seats: '10 seats',
    features: ['Everything in Growth', 'Multi-agent routing', 'SLA monitoring', 'Revenue leakage report', 'In-chat payments', 'Priority support'],
    cta: 'Contact Sales',
    hero: false,
  },
  {
    name: 'Enterprise',
    monthly: null,
    annual: null,
    target: 'Large developers, DLF, Godrej channel partners',
    leads: 'Custom',
    seats: '25+ seats',
    features: ['Everything in Business Scale', 'Dedicated onboarding', 'White-label reporting', 'Custom integrations', 'SLA guarantee', 'Annual contract'],
    cta: 'Talk to Founders',
    hero: false,
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  const { ref, inView } = useInView(0.05)
  const { navigate } = useRouter()

  return (
    <section id="pricing" ref={ref} className="py-24 px-6 border-b border-white/8">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 reveal ${inView ? 'visible' : ''}`}>
          <span className="font-mono text-xs text-[#C8953A] tracking-[0.2em] uppercase">Pricing</span>
          <h2 className="font-display text-4xl md:text-5xl text-[#F0EDE8] mt-4 leading-tight">
            Transparent. Flat. Indian.
          </h2>
          <p className="mt-4 text-[#6B6B6B] max-w-lg">
            No hidden Meta fee markups. No per-message gotchas. The first 1,000 Meta conversations per month are free — most SMBs pay ₹0 in messaging fees.
          </p>

          {/* Toggle */}
          <div className="mt-8 flex items-center gap-4">
            <span className={`font-mono text-sm ${!annual ? 'text-[#F0EDE8]' : 'text-[#6B6B6B]'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(v => !v)}
              className="relative w-12 h-6 border border-white/15 transition-colors duration-300"
              style={{ borderRadius: 2, background: annual ? 'rgba(200,149,58,0.2)' : 'transparent' }}
            >
              <span
                className="absolute top-1 w-4 h-4 bg-[#C8953A] transition-all duration-300"
                style={{ borderRadius: 2, left: annual ? 26 : 2 }}
              />
            </button>
            <span className={`font-mono text-sm ${annual ? 'text-[#F0EDE8]' : 'text-[#6B6B6B]'}`}>
              Annual
              <span className="ml-2 font-mono text-[10px] text-[#C8953A] bg-[#C8953A]/10 px-1.5 py-0.5" style={{ borderRadius: 2 }}>
                SAVE 20%
              </span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-3">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`border flex flex-col reveal ${inView ? 'visible' : ''} ${tier.hero ? 'relative' : ''}`}
              style={{
                borderRadius: 2,
                transitionDelay: `${i * 80}ms`,
                borderColor: tier.hero ? 'rgba(200,149,58,0.5)' : 'rgba(255,255,255,0.08)',
                background: tier.hero ? 'rgba(200,149,58,0.05)' : 'transparent',
              }}
            >
              {tier.hero && (
                <div className="absolute -top-3 left-4 font-mono text-[9px] text-[#080808] bg-[#C8953A] px-2 py-1 tracking-widest" style={{ borderRadius: 2 }}>
                  MOST POPULAR
                </div>
              )}

              <div className="p-5 border-b border-white/8 flex-shrink-0">
                <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest mb-2">{tier.name.toUpperCase()}</div>
                {tier.monthly ? (
                  <div className="flex items-end gap-1">
                    <span className="font-display text-3xl text-[#F0EDE8]">
                      ₹{(annual ? tier.annual : tier.monthly)?.toLocaleString('en-IN')}
                    </span>
                    <span className="font-mono text-xs text-[#6B6B6B] mb-1">/mo</span>
                  </div>
                ) : (
                  <div className="font-display text-3xl text-[#F0EDE8]">Custom</div>
                )}
                <div className="font-mono text-[9px] text-[#6B6B6B] mt-2">{tier.target}</div>
                <div className="font-mono text-[9px] text-[#C8953A] mt-1">{tier.leads} · {tier.seats}</div>
              </div>

              <div className="p-5 flex-1">
                <div className="space-y-2">
                  {tier.features.map(f => (
                    <div key={f} className="flex items-start gap-2">
                      <span className="text-[#C8953A] text-xs mt-0.5 flex-shrink-0">—</span>
                      <span className="text-xs text-[#6B6B6B]">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 flex-shrink-0">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); navigate('onboarding') }}
                  className="block text-center text-sm font-medium py-2.5 transition-colors duration-200"
                  style={{
                    borderRadius: 2,
                    background: tier.hero ? '#C8953A' : 'transparent',
                    color: tier.hero ? '#080808' : '#F0EDE8',
                    border: tier.hero ? 'none' : '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  {tier.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-8 p-4 border border-white/8 flex flex-wrap gap-6 items-center reveal ${inView ? 'visible' : ''}`} style={{ borderRadius: 2, transitionDelay: '400ms' }}>
          <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest">ECONOMICS</div>
          {[
            { label: 'CAC', value: '₹2,000' },
            { label: 'ARPU', value: '₹2,200 /mo' },
            { label: 'LTV', value: '₹30,800' },
            { label: 'LTV:CAC', value: '15.4×' },
            { label: 'Gross Margin', value: '>88%' },
          ].map(e => (
            <div key={e.label}>
              <span className="font-mono text-[10px] text-[#6B6B6B]">{e.label} </span>
              <span className="font-mono text-sm text-[#C8953A]">{e.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
