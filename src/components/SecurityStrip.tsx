const badges = [
  'HMAC-SHA256 Verified',
  'Meta Cloud API Official',
  'JWT Auth · Role Hierarchy',
  '99.9% Uptime SLA',
  'GDPR Ready',
  'ISO 27001 Compliant',
  'End-to-End Encrypted',
  '0% Meta Fee Markup',
  'Multi-Tenant Isolated',
  'SOC 2 Type II (Pending)',
]

export default function SecurityStrip() {
  return (
    <div className="border-y border-white/8 py-4 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #080808, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #080808, transparent)' }} />

      <div className="flex gap-8 marquee-track whitespace-nowrap">
        {[...badges, ...badges].map((b, i) => (
          <span key={i} className="font-mono text-[10px] tracking-widest uppercase text-[#6B6B6B] flex-shrink-0 flex items-center gap-3">
            <span className="w-1 h-1 rounded-full bg-[#C8953A] flex-shrink-0" />
            {b}
          </span>
        ))}
      </div>
    </div>
  )
}
