import { useState, useEffect } from 'react'
import { useRouter, Link } from '../router'

export default function Nav() {
  const { page, navigate } = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = page === 'home'

  const links = [
    { label: 'Product', page: 'product' as const },
    { label: 'Dashboard', page: 'dashboard' as const },
    { label: 'Blog', page: 'blog' as const },
    { label: 'About', page: 'about' as const },
    { label: 'Changelog', page: 'changelog' as const },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="home" className="font-display text-xl text-[#F0EDE8] tracking-tight">
          Anchor<span className="text-[#C8953A]">.</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <button
              key={l.label}
              onClick={() => navigate(l.page)}
              className={`text-sm transition-colors duration-200 tracking-wide ${page === l.page ? 'text-[#F0EDE8]' : 'text-[#6B6B6B] hover:text-[#F0EDE8]'}`}
            >
              {l.label}
            </button>
          ))}
          {isHome && (
            <>
              <span className="w-px h-4 bg-white/10" />
              <a href="#pricing" className="text-sm text-[#6B6B6B] hover:text-[#F0EDE8] transition-colors">Pricing</a>
            </>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button onClick={() => navigate('onboarding')} className="text-sm text-[#6B6B6B] hover:text-[#F0EDE8] transition-colors">
            Sign in
          </button>
          <button
            onClick={() => navigate('onboarding')}
            className="text-sm px-4 py-2 border border-[#C8953A] text-[#C8953A] hover:bg-[#C8953A] hover:text-[#080808] transition-all duration-200 font-medium tracking-wide"
            style={{ borderRadius: 2 }}
          >
            Get Early Access
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(v => !v)}
        >
          <span className={`block w-5 h-px bg-[#F0EDE8] transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-px bg-[#F0EDE8] transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-[#F0EDE8] transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/8 bg-[#080808] px-6 py-4 flex flex-col gap-3">
          {links.map(l => (
            <button key={l.label} onClick={() => { navigate(l.page); setMenuOpen(false) }}
              className="text-sm text-[#6B6B6B] hover:text-[#F0EDE8] transition-colors py-1 text-left">
              {l.label}
            </button>
          ))}
          <button
            onClick={() => { navigate('onboarding'); setMenuOpen(false) }}
            className="text-sm px-4 py-2 border border-[#C8953A] text-[#C8953A] text-center font-medium mt-2"
            style={{ borderRadius: 2 }}
          >
            Get Early Access
          </button>
        </div>
      )}
    </nav>
  )
}
