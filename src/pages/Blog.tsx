import { Link } from '../router'
import { useInView } from '../hooks/useInView'

const featured = {
  tag: 'Deep Dive',
  title: 'How Wati.io is secretly marking up your Meta fees by 25%',
  excerpt: 'We analyzed 3 years of invoices from 40 Indian WhatsApp Business API users across Wati, Interakt, and AiSensy. The findings are damning — and completely avoidable.',
  date: 'Sep 20, 2026',
  readTime: '8 min read',
  author: 'Vikrant Malhotra',
}

const articles = [
  {
    tag: 'Sales Strategy',
    title: 'The 5-minute rule that killed your ₹2 Cr WhatsApp lead',
    excerpt: 'Lead conversion drops 391% after the first 5 minutes. Here\'s the science, the data, and exactly what to do about it.',
    date: 'Sep 14, 2026',
    readTime: '5 min',
  },
  {
    tag: 'Product',
    title: 'Why we built "Zero AI" into Anchor — and why it\'s our biggest competitive advantage',
    excerpt: 'Every startup is slapping GPT onto WhatsApp. We deliberately didn\'t. Here\'s why determinism beats intelligence in Indian high-ticket sales.',
    date: 'Sep 08, 2026',
    readTime: '6 min',
  },
  {
    tag: 'Guide',
    title: 'Hinglish keyword strategies for real estate WhatsApp bots',
    excerpt: '"Kab visit kar sakte hain?" → Site Visit Flow. Complete pattern library for Mumbai, Delhi, Bangalore real estate teams.',
    date: 'Aug 30, 2026',
    readTime: '9 min',
  },
  {
    tag: 'Analysis',
    title: 'Meta\'s 24-hour policy: the complete guide for Indian sales teams',
    excerpt: 'What is it, why does it exist, and how to never get your WhatsApp Business number banned again. Step-by-step playbook.',
    date: 'Aug 22, 2026',
    readTime: '12 min',
  },
  {
    tag: 'Case Study',
    title: 'How Khanna Properties recovered ₹2.4 Cr in month 1 with Anchor',
    excerpt: 'From 3-hour average response time to 1.4 seconds. A complete breakdown of the setup, the A/B tests, and the results.',
    date: 'Aug 15, 2026',
    readTime: '7 min',
  },
  {
    tag: 'Guide',
    title: 'WhatsApp Business API vs WhatsApp Business App — what Indian SMBs must know',
    excerpt: 'The app is for individuals. The API is for growth. Here\'s exactly when and how to make the switch without losing your chat history.',
    date: 'Aug 05, 2026',
    readTime: '6 min',
  },
]

const tagColors: Record<string, string> = {
  'Deep Dive': '#C8953A',
  'Sales Strategy': '#60A5FA',
  'Product': '#A78BFA',
  'Guide': '#4ADE80',
  'Analysis': '#F87171',
  'Case Study': '#34D399',
}

export default function Blog() {
  const { ref, inView } = useInView(0.05)

  return (
    <div className="min-h-screen bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-24">
        <Link to="home" className="font-mono text-[10px] text-[#6B6B6B] hover:text-[#F0EDE8] transition-colors tracking-widest">
          ← BACK TO HOME
        </Link>

        <div className="mt-8 mb-16">
          <h1 className="font-display text-5xl text-[#F0EDE8] leading-tight">Resources.</h1>
          <p className="text-[#6B6B6B] mt-4 max-w-lg">
            Sales playbooks, product deep-dives, and the honest truth about WhatsApp Business in India.
          </p>
        </div>

        {/* Featured article */}
        <div ref={ref} className={`border border-white/8 p-8 md:p-12 mb-12 hover:border-white/15 transition-colors cursor-pointer reveal ${inView ? 'visible' : ''}`} style={{ borderRadius: 2 }}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[9px] px-2 py-1" style={{ borderRadius: 2, background: `${tagColors[featured.tag]}15`, color: tagColors[featured.tag], border: `1px solid ${tagColors[featured.tag]}30` }}>
                  {featured.tag}
                </span>
                <span className="font-mono text-[9px] text-[#6B6B6B]">FEATURED</span>
              </div>
              <h2 className="font-display text-3xl text-[#F0EDE8] mb-4 leading-tight">{featured.title}</h2>
              <p className="text-sm text-[#6B6B6B] leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-4 font-mono text-[10px] text-[#6B6B6B]">
                <span>{featured.author}</span>
                <span className="w-px h-3 bg-white/10" />
                <span>{featured.date}</span>
                <span className="w-px h-3 bg-white/10" />
                <span>{featured.readTime}</span>
              </div>
            </div>
            <div className="border border-white/8 p-6 bg-[#0D0D0D]" style={{ borderRadius: 2 }}>
              {/* Inline data viz */}
              <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest mb-4">META FEE MARKUP — COMPARISON</div>
              {[
                { name: 'Anchor', markup: 0, color: '#C8953A' },
                { name: 'Wati.io', markup: 25, color: '#EF4444' },
                { name: 'Interakt', markup: 18, color: '#EF4444' },
                { name: 'AiSensy', markup: 20, color: '#EF4444' },
              ].map(r => (
                <div key={r.name} className="mb-2">
                  <div className="flex justify-between font-mono text-[10px] mb-1">
                    <span className="text-[#6B6B6B]">{r.name}</span>
                    <span style={{ color: r.color }}>{r.markup === 0 ? 'Zero ✓' : `+${r.markup}%`}</span>
                  </div>
                  <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(r.markup / 25) * 100 + (r.markup === 0 ? 0 : 0)}%`, background: r.color, minWidth: r.markup === 0 ? '2px' : undefined }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Article grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {articles.map((a, i) => (
            <div
              key={i}
              className={`border border-white/8 p-6 hover:border-white/15 transition-colors cursor-pointer reveal ${inView ? 'visible' : ''}`}
              style={{ borderRadius: 2, transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[9px] px-2 py-1" style={{ borderRadius: 2, background: `${tagColors[a.tag] || '#6B6B6B'}15`, color: tagColors[a.tag] || '#6B6B6B', border: `1px solid ${tagColors[a.tag] || '#6B6B6B'}30` }}>
                  {a.tag}
                </span>
                <span className="font-mono text-[9px] text-[#6B6B6B]">{a.readTime}</span>
              </div>
              <h3 className="font-display text-lg text-[#F0EDE8] mb-3 leading-tight">{a.title}</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed mb-4 line-clamp-3">{a.excerpt}</p>
              <div className="font-mono text-[9px] text-[#6B6B6B] border-t border-white/5 pt-3">{a.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
