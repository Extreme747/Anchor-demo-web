import { useInView } from '../hooks/useInView'
import { QuoteIcon } from './Icons'

const testimonials = [
  {
    quote: 'We were spending ₹3L/month on Meta ads and losing 70% of leads to slow replies. Anchor cut our response time to under 2 seconds. First month, we recovered two deals worth ₹2.4 crore.',
    name: 'Aditya Khanna',
    title: 'Director, Khanna Properties · Gurugram',
    metric: '₹2.4 Cr',
    metricLabel: 'Recovered Month 1',
  },
  {
    quote: 'Our WhatsApp number got banned twice with Wati because agents were sending free text after 24 hours. Anchor\'s automated Hour 23 switch solved it completely. Zero bans since.',
    name: 'Dr. Preethi Narayanan',
    title: 'Co-founder, HealthFirst Clinics · Bangalore',
    metric: '0 bans',
    metricLabel: 'Since switching to Anchor',
  },
  {
    quote: 'The intent dial changed how our team works. Reps now instantly know which leads have budget and timeline. We went from 22% to 41% conversion in 6 weeks.',
    name: 'Rohan Desai',
    title: 'Growth Head, FitFuel D2C · Mumbai',
    metric: '+87%',
    metricLabel: 'Conversion improvement',
  },
]

export default function Testimonials() {
  const { ref, inView } = useInView(0.1)

  return (
    <section ref={ref} className="py-24 px-6 border-b border-white/8">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 reveal ${inView ? 'visible' : ''}`}>
          <span className="font-mono text-xs text-[#C8953A] tracking-[0.2em] uppercase">From Early Pilots</span>
          <h2 className="font-display text-4xl text-[#F0EDE8] mt-4 leading-tight">
            Results from the field.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`border border-white/8 p-6 flex flex-col gap-6 hover:border-white/15 transition-colors duration-300 reveal ${inView ? 'visible' : ''}`}
              style={{ borderRadius: 2, transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-[#C8953A] opacity-60">
                <QuoteIcon size={20} />
              </div>
              <p className="text-sm text-[#6B6B6B] leading-relaxed flex-1 italic">{t.quote}</p>
              <div className="border-t border-white/8 pt-4 flex items-end justify-between">
                <div>
                  <div className="text-sm font-medium text-[#F0EDE8]">{t.name}</div>
                  <div className="font-mono text-[9px] text-[#6B6B6B] mt-0.5">{t.title}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-xl text-[#C8953A]">{t.metric}</div>
                  <div className="font-mono text-[9px] text-[#6B6B6B]">{t.metricLabel}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
