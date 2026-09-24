import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { useRouter } from '../router'
import { CheckIcon } from './Icons'

export default function CTAStrip() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { ref, inView } = useInView(0.2)
  const { navigate } = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section id="cta" ref={ref} className="py-32 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(200,149,58,0.06) 0%, transparent 70%)' }}
      />
      <div className="grain-overlay" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className={`reveal ${inView ? 'visible' : ''}`}>
          <span className="font-mono text-xs text-[#C8953A] tracking-[0.2em] uppercase">Get Early Access</span>
          <h2 className="font-display text-5xl md:text-6xl text-[#F0EDE8] mt-6 mb-4 leading-tight">
            ₹999 to recover<br />your first crore.
          </h2>
          <p className="text-[#6B6B6B] mb-10 leading-relaxed">
            7-day free pilot. White-glove setup by the founding team in under 30 minutes.<br />
            If Anchor doesn't save you at least one ₹1 Cr+ inquiry, you pay nothing.
          </p>
        </div>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className={`flex flex-col sm:flex-row gap-3 max-w-md mx-auto reveal ${inView ? 'visible' : ''}`}
            style={{ transitionDelay: '150ms' }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-[#141414] border border-white/12 px-4 py-3 text-sm text-[#F0EDE8] placeholder-[#6B6B6B] focus:outline-none focus:border-[#C8953A] transition-colors"
              style={{ borderRadius: 2 }}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#C8953A] text-[#080808] font-semibold text-sm tracking-wide hover:bg-[#E8B04A] transition-colors flex-shrink-0"
              style={{ borderRadius: 2 }}
            >
              Start Free Trial
            </button>
          </form>
        ) : (
          <div
            className={`border border-[#C8953A]/30 bg-[#C8953A]/5 px-8 py-5 max-w-md mx-auto reveal ${inView ? 'visible' : ''}`}
            style={{ borderRadius: 2 }}
          >
            <div className="text-[#C8953A] mb-3 flex justify-center"><CheckIcon size={24} strokeWidth={2} /></div>
            <div className="text-sm text-[#F0EDE8]">You're on the list. We'll reach out within 24 hours.</div>
            <div className="font-mono text-xs text-[#6B6B6B] mt-1">{email}</div>
            <button
              onClick={() => navigate('onboarding')}
              className="mt-4 font-mono text-xs text-[#C8953A] hover:text-[#E8B04A] transition-colors"
            >
              Set up your account now →
            </button>
          </div>
        )}

        <div className={`mt-10 flex flex-wrap justify-center gap-6 font-mono text-xs text-[#6B6B6B] reveal ${inView ? 'visible' : ''}`} style={{ transitionDelay: '250ms' }}>
          <span>No credit card required</span>
          <span className="w-px h-4 bg-white/10 self-center" />
          <span>Setup in 30 minutes</span>
          <span className="w-px h-4 bg-white/10 self-center" />
          <span>Cancel anytime</span>
        </div>
      </div>
    </section>
  )
}
