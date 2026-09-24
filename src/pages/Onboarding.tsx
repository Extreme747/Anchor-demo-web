import { useState } from 'react'
import { useRouter } from '../router'
import {
  AnchorIcon, CheckIcon, BoltIcon, ArrowRightIcon,
  LockIcon, FlowIcon, AnalyticsIcon, IndiaFlagBlock,
} from '../components/Icons'

const STEPS = [
  { n: 1, label: 'Business Info' },
  { n: 2, label: 'Connect WhatsApp' },
  { n: 3, label: 'First Template' },
]

function StepBar({ step }: { step: number }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#080808] border-b border-white/8">
      <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
        <div className="text-[#C8953A]">
          <AnchorIcon size={18} strokeWidth={1.5} />
        </div>
        <div className="flex-1 flex items-center gap-0">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex items-center flex-1">
              <div className="flex items-center gap-2 flex-shrink-0">
                <div
                  className="w-6 h-6 flex items-center justify-center font-mono text-[10px] border transition-colors"
                  style={{
                    borderRadius: 2,
                    borderColor: step > s.n ? '#C8953A' : step === s.n ? '#C8953A' : 'rgba(255,255,255,0.1)',
                    background: step > s.n ? 'rgba(200,149,58,0.15)' : step === s.n ? 'rgba(200,149,58,0.08)' : 'transparent',
                    color: step >= s.n ? '#C8953A' : '#6B6B6B',
                  }}
                >
                  {step > s.n ? <CheckIcon size={10} strokeWidth={2.5} /> : s.n}
                </div>
                <span className={`font-mono text-[9px] tracking-wide hidden sm:block ${step === s.n ? 'text-[#F0EDE8]' : 'text-[#3A3A3A]'}`}>
                  {s.label.toUpperCase()}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px mx-3" style={{ background: step > s.n + 1 ? '#C8953A' : 'rgba(255,255,255,0.08)' }} />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="h-0.5 bg-white/5">
        <div
          className="h-full bg-[#C8953A] transition-all duration-500"
          style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  )
}

// ── G05 Business Info
function Step1({ onNext }: { onNext: () => void }) {
  const industries = ['Real Estate', 'Healthcare', 'D2C / E-commerce', 'EdTech', 'Financial Services', 'Other']
  const sizes = ['Solo (1)', '2–10', '11–50', '51–200', '200+']
  const [industry, setIndustry] = useState('')
  const [size, setSize] = useState('')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl text-[#F0EDE8] mb-2">Tell us about your business.</h2>
        <p className="text-sm text-[#6B6B6B]">This helps us personalize your Anchor experience from day one.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="font-mono text-[10px] text-[#6B6B6B] tracking-widest block mb-2">BUSINESS NAME</label>
          <input
            className="w-full bg-[#111] border border-white/10 text-[#F0EDE8] text-sm px-4 py-3 placeholder-[#444] focus:outline-none focus:border-[#C8953A] transition-colors"
            style={{ borderRadius: 2 }}
            placeholder="e.g. Khanna Properties Pvt. Ltd."
          />
        </div>

        <div>
          <label className="font-mono text-[10px] text-[#6B6B6B] tracking-widest block mb-2">INDUSTRY</label>
          <div className="grid grid-cols-2 gap-2">
            {industries.map(ind => (
              <button
                key={ind}
                onClick={() => setIndustry(ind)}
                className="px-3 py-2.5 border text-left text-sm transition-colors"
                style={{
                  borderRadius: 2,
                  borderColor: industry === ind ? '#C8953A' : 'rgba(255,255,255,0.08)',
                  background: industry === ind ? 'rgba(200,149,58,0.08)' : 'transparent',
                  color: industry === ind ? '#C8953A' : '#6B6B6B',
                }}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="font-mono text-[10px] text-[#6B6B6B] tracking-widest block mb-2">TEAM SIZE</label>
          <div className="flex gap-2">
            {sizes.map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className="flex-1 py-2.5 border font-mono text-[10px] transition-colors"
                style={{
                  borderRadius: 2,
                  borderColor: size === s ? '#C8953A' : 'rgba(255,255,255,0.08)',
                  background: size === s ? 'rgba(200,149,58,0.08)' : 'transparent',
                  color: size === s ? '#C8953A' : '#6B6B6B',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="font-mono text-[10px] text-[#6B6B6B] tracking-widest block mb-2">GSTIN (Optional)</label>
          <input
            className="w-full bg-[#111] border border-white/10 text-[#F0EDE8] text-sm px-4 py-3 placeholder-[#444] focus:outline-none focus:border-[#C8953A] transition-colors"
            style={{ borderRadius: 2 }}
            placeholder="22AAAAA0000A1Z5"
          />
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-3.5 bg-[#C8953A] text-[#080808] font-semibold text-sm tracking-wide hover:bg-[#E8B04A] transition-colors flex items-center justify-center gap-2"
        style={{ borderRadius: 2 }}
      >
        Continue to WhatsApp Setup <ArrowRightIcon size={14} strokeWidth={2} />
      </button>
    </div>
  )
}

// ── G06 Meta API Connect
function Step2({ onNext }: { onNext: () => void }) {
  const [fbConnected, setFbConnected] = useState(false)
  const [wabaSelected, setWabaSelected] = useState(false)
  const [phoneVerified, setPhoneVerified] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl text-[#F0EDE8] mb-2">Connect WhatsApp Business.</h2>
        <p className="text-sm text-[#6B6B6B]">We use Meta's official Cloud API — no third-party servers, direct connection.</p>
      </div>

      <div className="space-y-3">
        {/* Step 1: FB Connect */}
        <div
          className="border p-4 transition-colors"
          style={{
            borderRadius: 2,
            borderColor: fbConnected ? 'rgba(200,149,58,0.3)' : 'rgba(255,255,255,0.08)',
            background: fbConnected ? 'rgba(200,149,58,0.04)' : 'transparent',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center" style={{ background: '#1877F2', borderRadius: 2 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z"/></svg>
              </div>
              <div>
                <div className="text-sm font-medium text-[#F0EDE8]">Facebook Business Manager</div>
                <div className="font-mono text-[9px] text-[#6B6B6B]">{fbConnected ? 'Khanna Properties · verified' : 'Connect your business account'}</div>
              </div>
            </div>
            {fbConnected ? (
              <div className="text-[#C8953A]"><CheckIcon size={16} strokeWidth={2} /></div>
            ) : (
              <button
                onClick={() => setFbConnected(true)}
                className="px-3 py-1.5 bg-[#1877F2] text-white font-mono text-[10px] tracking-wide hover:bg-[#0f6ce4] transition-colors"
                style={{ borderRadius: 2 }}
              >
                Connect
              </button>
            )}
          </div>
        </div>

        {/* Step 2: WABA Select */}
        <div
          className="border p-4 transition-all"
          style={{
            borderRadius: 2,
            borderColor: wabaSelected ? 'rgba(200,149,58,0.3)' : fbConnected ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
            opacity: fbConnected ? 1 : 0.4,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center" style={{ background: '#25D366', borderRadius: 2 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.47 14.38c-.27-.14-1.6-.79-1.85-.88-.25-.1-.43-.14-.61.14-.18.28-.69.88-.85 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.4-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.52-.45-.45-.61-.46-.16 0-.34-.02-.52-.02s-.48.07-.73.34c-.25.27-.96.94-.96 2.28 0 1.34.98 2.64 1.12 2.82.14.18 1.93 2.95 4.67 4.14.65.28 1.16.45 1.55.58.65.2 1.24.17 1.71.1.52-.08 1.6-.65 1.83-1.29.22-.63.22-1.17.16-1.29-.07-.11-.25-.18-.52-.32z"/><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.09-1.34A9.95 9.95 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>
              </div>
              <div>
                <div className="text-sm font-medium text-[#F0EDE8]">WhatsApp Business Account (WABA)</div>
                <div className="font-mono text-[9px] text-[#6B6B6B]">{wabaSelected ? 'WABA ID: 1234567890123456' : 'Select from your Meta account'}</div>
              </div>
            </div>
            {wabaSelected ? (
              <div className="text-[#C8953A]"><CheckIcon size={16} strokeWidth={2} /></div>
            ) : (
              <button
                onClick={() => fbConnected && setWabaSelected(true)}
                className="px-3 py-1.5 font-mono text-[10px] tracking-wide transition-colors border"
                style={{ borderRadius: 2, borderColor: 'rgba(255,255,255,0.1)', color: '#6B6B6B' }}
                disabled={!fbConnected}
              >
                Select WABA
              </button>
            )}
          </div>
          {wabaSelected && (
            <div className="mt-3 pt-3 border-t border-white/8 grid grid-cols-2 gap-2 font-mono text-[9px] text-[#6B6B6B]">
              <div>Phone: <span className="text-[#F0EDE8]">+91 98765 43210</span></div>
              <div>Display: <span className="text-[#F0EDE8]">Khanna Properties</span></div>
            </div>
          )}
        </div>

        {/* Step 3: Phone Verify */}
        <div
          className="border p-4 transition-all"
          style={{
            borderRadius: 2,
            borderColor: phoneVerified ? 'rgba(200,149,58,0.3)' : wabaSelected ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
            opacity: wabaSelected ? 1 : 0.4,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-white/10 flex items-center justify-center text-[#6B6B6B]" style={{ borderRadius: 2 }}>
                <LockIcon size={14} strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-sm font-medium text-[#F0EDE8]">Webhook Auto-Configuration</div>
                <div className="font-mono text-[9px] text-[#6B6B6B]">{phoneVerified ? 'Connected · Anchor endpoint active' : 'Auto-configure webhook to Anchor'}</div>
              </div>
            </div>
            {phoneVerified ? (
              <div className="text-[#C8953A]"><CheckIcon size={16} strokeWidth={2} /></div>
            ) : (
              <button
                onClick={() => wabaSelected && setPhoneVerified(true)}
                className="px-3 py-1.5 font-mono text-[10px] tracking-wide transition-colors border"
                style={{ borderRadius: 2, borderColor: 'rgba(255,255,255,0.1)', color: '#6B6B6B' }}
                disabled={!wabaSelected}
              >
                Auto-Configure
              </button>
            )}
          </div>
        </div>
      </div>

      {phoneVerified && (
        <div className="p-3 border border-[#C8953A]/20 bg-[#C8953A]/5 font-mono text-[10px] text-[#C8953A]" style={{ borderRadius: 2 }}>
          Webhook URL: https://api.anchor.in/webhook/v2/khanna-properties
        </div>
      )}

      <button
        onClick={onNext}
        disabled={!phoneVerified}
        className="w-full py-3.5 font-semibold text-sm tracking-wide transition-colors flex items-center justify-center gap-2"
        style={{
          borderRadius: 2,
          background: phoneVerified ? '#C8953A' : 'rgba(200,149,58,0.2)',
          color: phoneVerified ? '#080808' : '#6B6B6B',
          cursor: phoneVerified ? 'pointer' : 'not-allowed',
        }}
      >
        Continue to Template Setup <ArrowRightIcon size={14} strokeWidth={2} />
      </button>
    </div>
  )
}

// ── G07 First Template
function Step3({ onFinish }: { onFinish: () => void }) {
  const [reply, setReply] = useState(
    "Hi {{name}}! Thanks for reaching out. I'm connecting you with our team right now.\n\nMeanwhile, here's our project brochure: {{link}}\n\nWould you like a site visit this weekend?"
  )
  const [workingHours, setWorkingHours] = useState(true)
  const [keyword, setKeyword] = useState('hi, hello, interested, info')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl text-[#F0EDE8] mb-2">Set your first auto-reply.</h2>
        <p className="text-sm text-[#6B6B6B]">This fires automatically within 2 seconds of every new WhatsApp message.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="font-mono text-[10px] text-[#6B6B6B] tracking-widest block mb-2">TRIGGER KEYWORDS</label>
          <input
            className="w-full bg-[#111] border border-white/10 text-[#F0EDE8] text-sm px-4 py-3 placeholder-[#444] focus:outline-none focus:border-[#C8953A] transition-colors"
            style={{ borderRadius: 2 }}
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
          <p className="font-mono text-[9px] text-[#3A3A3A] mt-1">Comma-separated. Leave blank to match all incoming messages.</p>
        </div>

        <div>
          <label className="font-mono text-[10px] text-[#6B6B6B] tracking-widest block mb-2">REPLY MESSAGE</label>
          <div className="relative">
            <textarea
              className="w-full bg-[#111] border border-white/10 text-[#F0EDE8] text-sm px-4 py-3 placeholder-[#444] focus:outline-none focus:border-[#C8953A] transition-colors resize-none"
              style={{ borderRadius: 2 }}
              rows={5}
              value={reply}
              onChange={e => setReply(e.target.value)}
            />
            <div className="absolute bottom-2 right-2 flex gap-1">
              {['{{name}}', '{{link}}', '{{business}}'].map(v => (
                <button
                  key={v}
                  onClick={() => setReply(r => r + v)}
                  className="font-mono text-[9px] px-1.5 py-0.5 border border-white/10 text-[#C8953A] hover:bg-white/5 transition-colors"
                  style={{ borderRadius: 2 }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border border-white/8 p-4" style={{ borderRadius: 2 }}>
          <div>
            <div className="text-sm font-medium text-[#F0EDE8]">Respect working hours</div>
            <div className="font-mono text-[9px] text-[#6B6B6B] mt-0.5">Mon–Sat 9:00 AM – 7:00 PM IST</div>
          </div>
          <button
            onClick={() => setWorkingHours(!workingHours)}
            className="w-10 h-6 relative transition-colors"
            style={{ borderRadius: 12, background: workingHours ? '#C8953A' : 'rgba(255,255,255,0.1)' }}
          >
            <div
              className="absolute top-1 w-4 h-4 bg-white transition-all"
              style={{ borderRadius: '50%', left: workingHours ? 22 : 4 }}
            />
          </button>
        </div>

        {/* Live preview */}
        <div>
          <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest mb-2">LIVE PREVIEW</div>
          <div className="bg-[#0D0D0D] border border-white/8 p-4" style={{ borderRadius: 2 }}>
            <div className="flex flex-col gap-2">
              <div className="self-start max-w-[80%] bg-[#1A1A1A] border border-white/5 px-3 py-2 text-xs text-[#F0EDE8]" style={{ borderRadius: 2 }}>
                Hi, I'm interested in your properties
              </div>
              <div className="self-end max-w-[80%] bg-[#C8953A]/15 border border-[#C8953A]/20 px-3 py-2" style={{ borderRadius: 2 }}>
                <div className="flex items-center gap-1 font-mono text-[9px] text-[#C8953A] mb-1">
                  <BoltIcon size={9} strokeWidth={2} />
                  AUTO · 1.4s
                </div>
                <p className="text-xs text-[#F0EDE8] whitespace-pre-wrap leading-relaxed">
                  {reply.replace('{{name}}', 'Arjun').replace('{{link}}', 'anchor.io/brochure').replace('{{business}}', 'Khanna Properties')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onFinish}
        className="w-full py-3.5 bg-[#C8953A] text-[#080808] font-semibold text-sm tracking-wide hover:bg-[#E8B04A] transition-colors flex items-center justify-center gap-2"
        style={{ borderRadius: 2 }}
      >
        Go Live <BoltIcon size={14} strokeWidth={2} />
      </button>
    </div>
  )
}

// ── Success Screen
function SuccessScreen() {
  const { navigate } = useRouter()

  const stats = [
    { label: 'Auto-replies', value: 'Active', Icon: BoltIcon },
    { label: 'Intent Scoring', value: 'Running', Icon: AnalyticsIcon },
    { label: 'Drip Engine', value: 'Ready', Icon: FlowIcon },
  ]

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 border border-[#C8953A]/30 bg-[#C8953A]/5 flex items-center justify-center mx-auto mb-8 text-[#C8953A]" style={{ borderRadius: 2 }}>
        <AnchorIcon size={36} strokeWidth={1} />
      </div>

      <span className="font-mono text-xs text-[#C8953A] tracking-[0.2em] uppercase mb-4">Setup Complete</span>
      <h1 className="font-display text-5xl text-[#F0EDE8] mb-4">You're live.</h1>
      <p className="text-[#6B6B6B] text-sm max-w-sm mx-auto mb-10 leading-relaxed">
        Your first WhatsApp lead will be replied to in under 2 seconds. The revenue recovery machine is on.
      </p>

      <div className="grid grid-cols-3 gap-3 mb-10 w-full max-w-sm">
        {stats.map(s => (
          <div key={s.label} className="border border-[#C8953A]/20 bg-[#C8953A]/5 p-3 flex flex-col items-center gap-1.5" style={{ borderRadius: 2 }}>
            <s.Icon size={16} strokeWidth={1.5} className="text-[#C8953A]" />
            <div className="font-mono text-[9px] text-[#C8953A]">{s.value}</div>
            <div className="font-mono text-[8px] text-[#6B6B6B]">{s.label}</div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('dashboard')}
        className="px-10 py-3.5 bg-[#C8953A] text-[#080808] font-semibold text-sm tracking-wide hover:bg-[#E8B04A] transition-colors flex items-center gap-2"
        style={{ borderRadius: 2 }}
      >
        Open Dashboard <ArrowRightIcon size={14} strokeWidth={2} />
      </button>
    </div>
  )
}

// ── Main Export
export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)

  if (done) return <SuccessScreen />

  return (
    <div className="min-h-screen bg-[#080808] text-[#F0EDE8]">
      <StepBar step={step} />
      <div className="max-w-xl mx-auto px-6 pt-28 pb-20">
        {step === 1 && <Step1 onNext={() => setStep(2)} />}
        {step === 2 && <Step2 onNext={() => setStep(3)} />}
        {step === 3 && <Step3 onFinish={() => setDone(true)} />}
      </div>
    </div>
  )
}
