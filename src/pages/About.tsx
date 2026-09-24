import { Link } from '../router'
import { useInView } from '../hooks/useInView'

export default function About() {
  const { ref, inView } = useInView(0.1)

  return (
    <div className="min-h-screen bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-24">
        <Link to="home" className="font-mono text-[10px] text-[#6B6B6B] hover:text-[#F0EDE8] transition-colors tracking-widest">
          ← BACK TO HOME
        </Link>

        {/* Hero */}
        <div className="mt-8 mb-24 grid md:grid-cols-2 gap-16 items-center">
          <div ref={ref} className={`reveal ${inView ? 'visible' : ''}`}>
            <span className="font-mono text-xs text-[#C8953A] tracking-[0.2em] uppercase">Our Story</span>
            <h1 className="font-display text-5xl md:text-6xl text-[#F0EDE8] mt-6 leading-tight">
              Built by founders<br />who lost deals.
            </h1>
          </div>
          <div className={`reveal ${inView ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
            <p className="text-lg text-[#6B6B6B] leading-relaxed mb-6">
              In 2024, we ran a real estate marketing agency in Gurugram. We spent ₹8L/month on Meta ads for our clients.
              Then we pulled the data: 64% of inbound WhatsApp leads were dying in under 6 hours — not because the leads were bad,
              but because no one replied fast enough.
            </p>
            <p className="text-lg text-[#6B6B6B] leading-relaxed">
              We built Anchor to solve our own problem. Then we gave it to 5 broker friends. Then 25.
              Now we're opening it to every Indian high-ticket SMB.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="border-y border-white/8 py-16 mb-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-mono text-xs text-[#C8953A] tracking-[0.2em] uppercase">Mission</span>
            <h2 className="font-display text-4xl md:text-5xl text-[#F0EDE8] mt-6 leading-tight">
              Every Indian sales team deserves<br />
              <em className="text-[#C8953A] not-italic">enterprise-grade</em> speed.
            </h2>
          </div>
        </div>

        {/* Team */}
        <div className="mb-24">
          <span className="font-mono text-xs text-[#C8953A] tracking-[0.2em] uppercase">The Team</span>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[
              { name: 'Vikrant Malhotra', role: 'CEO & Co-founder', bg: 'IIT Delhi · Ex-Sequoia' },
              { name: 'Riya Sharma', role: 'CTO & Co-founder', bg: 'BITS Pilani · Ex-Razorpay' },
              { name: 'Aryan Gupta', role: 'Head of Growth', bg: 'ISB · Ex-Wati, Interakt' },
            ].map((person, i) => (
              <div key={i} className="border border-white/8 p-6 hover:border-white/15 transition-colors" style={{ borderRadius: 2 }}>
                <div className="w-12 h-12 bg-[#1A1A1A] border border-white/8 flex items-center justify-center font-display text-xl text-[#C8953A] mb-4" style={{ borderRadius: 2 }}>
                  {person.name[0]}
                </div>
                <div className="text-base font-medium text-[#F0EDE8]">{person.name}</div>
                <div className="font-mono text-xs text-[#C8953A] mt-1">{person.role}</div>
                <div className="font-mono text-[10px] text-[#6B6B6B] mt-1">{person.bg}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div>
          <span className="font-mono text-xs text-[#C8953A] tracking-[0.2em] uppercase">What We Believe</span>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {[
              { title: 'Zero AI Hallucinations', body: 'Indian high-ticket commerce cannot afford AI quoting wrong prices or inventing inventory. Determinism over cleverness, always.' },
              { title: 'Transparent Economics', body: '0% markup on Meta fees. We make money when you make money — not by skimming your messaging costs.' },
              { title: 'Speed is the Product', body: 'A reply in 1.4 seconds isn\'t a feature — it\'s the entire value proposition. Every engineering decision traces back to latency.' },
              { title: 'Built for Bharat', body: 'Hinglish, Gujarati, Tamil, Telugu, Marathi. Indian high-ticket commerce speaks many languages. Anchor understands all of them.' },
            ].map((v, i) => (
              <div key={i} className="border border-white/8 p-6 hover:border-white/15 transition-colors" style={{ borderRadius: 2 }}>
                <div className="text-sm font-medium text-[#F0EDE8] mb-2">{v.title}</div>
                <div className="text-sm text-[#6B6B6B] leading-relaxed">{v.body}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            to="home"
            className="inline-block px-8 py-4 border border-[#C8953A] text-[#C8953A] font-medium text-sm tracking-wide hover:bg-[#C8953A] hover:text-[#080808] transition-all duration-200"
            style={{ borderRadius: 2 }}
          >
            Get Early Access →
          </Link>
        </div>
      </div>
    </div>
  )
}
