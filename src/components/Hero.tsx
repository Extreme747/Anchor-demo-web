import { useRouter } from '../router'

export default function Hero() {
  const { navigate } = useRouter()

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      <div className="grain-overlay" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,149,58,0.07) 0%, transparent 70%)' }}
      />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,149,58,0.04) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="hero-overline inline-flex items-center gap-3 mb-8">
          <span className="w-8 h-px bg-[#C8953A]" />
          <span className="font-mono text-xs text-[#C8953A] tracking-[0.2em] uppercase">WhatsApp Revenue Recovery</span>
          <span className="w-8 h-px bg-[#C8953A]" />
        </div>

        <h1 className="hero-h1 font-display text-5xl md:text-7xl lg:text-8xl text-[#F0EDE8] leading-[0.95] tracking-tight mb-8">
          Stop watching
          <br />
          <em className="text-[#C8953A] not-italic">₹ crore leads</em>
          <br />
          go cold.
        </h1>

        <p className="hero-sub max-w-xl mx-auto text-base md:text-lg text-[#6B6B6B] leading-relaxed mb-10">
          Indian high-ticket businesses lose 60–70% of inbound WhatsApp leads to response lag and Meta's 24-hour policy cliff.
          Anchor recovers them — in under 2 seconds, deterministically, with zero AI hallucinations.
        </p>

        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('onboarding')}
            className="px-8 py-3.5 bg-[#C8953A] text-[#080808] font-semibold text-sm tracking-wide hover:bg-[#E8B04A] transition-colors duration-200"
            style={{ borderRadius: 2 }}
          >
            Get Early Access — ₹999/mo
          </button>
          <a
            href="#calculator"
            className="px-8 py-3.5 border border-white/15 text-[#F0EDE8] text-sm tracking-wide hover:border-white/30 transition-colors duration-200"
            style={{ borderRadius: 2 }}
          >
            Calculate Your Leakage →
          </a>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#6B6B6B]">
          <span>Meta Cloud API Partner</span>
          <span className="w-px h-3 bg-white/10" />
          <span>0% Markup on Meta Fees</span>
          <span className="w-px h-3 bg-white/10" />
          <span>Real Estate · Healthcare · D2C</span>
          <span className="w-px h-3 bg-white/10" />
          <span>&lt; 2s Auto-Reply</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="font-mono text-xs tracking-widest text-[#F0EDE8]">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#F0EDE8] to-transparent" />
      </div>
    </section>
  )
}
