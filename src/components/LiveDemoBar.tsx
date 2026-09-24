import { useState, useEffect } from 'react'
import { Link } from '../router'

export default function LiveDemoBar() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if (pct > 0.28 && !dismissed) setVisible(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dismissed])

  if (dismissed) return null

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateX(-50%) translateY(${visible ? '0' : '20px'})`,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div
        className="flex items-center gap-4 px-5 py-3 border border-white/15"
        style={{
          borderRadius: 2,
          background: 'rgba(8,8,8,0.92)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,149,58,0.1)',
        }}
      >
        <div className="flex items-center gap-2">
          <div className="relative w-2 h-2">
            <div className="absolute inset-0 rounded-full bg-[#C8953A] opacity-60 animate-ping" />
            <div className="w-2 h-2 rounded-full bg-[#C8953A]" />
          </div>
          <span className="text-xs text-[#F0EDE8]">See Anchor live — try the interactive demo</span>
        </div>
        <Link
          to="dashboard"
          className="font-mono text-xs px-3 py-1.5 bg-[#C8953A] text-[#080808] font-medium hover:bg-[#E8B04A] transition-colors flex-shrink-0"
          style={{ borderRadius: 2 }}
        >
          Open Dashboard →
        </Link>
        <button
          onClick={() => { setDismissed(true); setVisible(false) }}
          className="text-[#6B6B6B] hover:text-[#F0EDE8] transition-colors text-lg leading-none flex-shrink-0"
        >
          ×
        </button>
      </div>
    </div>
  )
}
