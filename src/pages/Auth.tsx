import { useState, useEffect, useRef } from 'react'
import { useRouter } from '../router'
import { AnchorIcon, LockIcon, BoltIcon, CheckIcon, ArrowRightIcon } from '../components/Icons'

// ── Shared input style
const inp = 'w-full bg-[#111] border border-white/10 text-[#F0EDE8] text-sm px-4 py-3 placeholder-[#444] focus:outline-none focus:border-[#C8953A] transition-colors'

function AuthShell({ children, title, sub }: { children: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <div className="w-10 h-10 border border-white/10 flex items-center justify-center mb-6 text-[#C8953A]" style={{ borderRadius: 2 }}>
            <AnchorIcon size={20} strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-3xl text-[#F0EDE8] text-center">{title}</h1>
          <p className="font-mono text-xs text-[#6B6B6B] mt-2 text-center tracking-wide">{sub}</p>
        </div>
        {children}
      </div>
    </div>
  )
}

// ── G01 Login
function Login() {
  const { navigate } = useRouter()
  const [mode, setMode] = useState<'password' | 'otp'>('password')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <AuthShell title="Welcome back." sub="SIGN IN TO ANCHOR">
      <div className="flex border border-white/8 mb-6" style={{ borderRadius: 2 }}>
        {(['password', 'otp'] as const).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="flex-1 py-2.5 font-mono text-[10px] tracking-widest transition-colors"
            style={{
              background: mode === m ? 'rgba(200,149,58,0.08)' : 'transparent',
              color: mode === m ? '#C8953A' : '#6B6B6B',
              borderRight: m === 'password' ? '1px solid rgba(255,255,255,0.08)' : undefined,
            }}
          >
            {m === 'password' ? 'PASSWORD' : 'OTP LOGIN'}
          </button>
        ))}
      </div>

      <form onSubmit={e => { e.preventDefault(); navigate('dashboard') }} className="space-y-3">
        <input
          style={{ borderRadius: 2 }}
          className={inp}
          type="email"
          placeholder="Email or phone number"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        {mode === 'password' ? (
          <input
            style={{ borderRadius: 2 }}
            className={inp}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        ) : (
          <div className="font-mono text-[10px] text-[#6B6B6B] px-1">
            OTP will be sent to your WhatsApp number
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-[#C8953A] text-[#080808] font-semibold text-sm tracking-wide hover:bg-[#E8B04A] transition-colors flex items-center justify-center gap-2"
          style={{ borderRadius: 2 }}
        >
          {mode === 'password' ? 'Sign In' : 'Send OTP'}
          <ArrowRightIcon size={14} strokeWidth={2} />
        </button>
      </form>

      <div className="mt-4 flex justify-between font-mono text-[10px] text-[#6B6B6B]">
        <button onClick={() => navigate('forgot-password')} className="hover:text-[#F0EDE8] transition-colors">
          Forgot password?
        </button>
        <button onClick={() => navigate('signup')} className="hover:text-[#C8953A] transition-colors">
          Create account
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-white/8">
        <button
          onClick={() => navigate('dashboard')}
          className="w-full py-3 border border-white/10 text-[#6B6B6B] font-mono text-[10px] tracking-widest hover:border-white/20 hover:text-[#F0EDE8] transition-colors flex items-center justify-center gap-3"
          style={{ borderRadius: 2 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 font-mono text-[9px] text-[#3A3A3A]">
        <LockIcon size={10} strokeWidth={1.5} />
        <span>256-bit encryption · Meta Official Partner</span>
      </div>
    </AuthShell>
  )
}

// ── G02 Signup
function Signup() {
  const { navigate } = useRouter()

  return (
    <AuthShell title="Get started." sub="CREATE YOUR ANCHOR ACCOUNT">
      <form onSubmit={e => { e.preventDefault(); navigate('onboarding') }} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input style={{ borderRadius: 2 }} className={inp} placeholder="First name" required />
          <input style={{ borderRadius: 2 }} className={inp} placeholder="Last name" required />
        </div>
        <input style={{ borderRadius: 2 }} className={inp} type="email" placeholder="Work email" required />
        <div className="flex" style={{ borderRadius: 2, overflow: 'hidden' }}>
          <div className="bg-[#111] border border-white/10 border-r-0 px-3 flex items-center font-mono text-sm text-[#6B6B6B] flex-shrink-0">
            <span className="inline-flex w-4 h-3 mr-1.5 overflow-hidden flex-shrink-0" style={{ borderRadius: 1 }}>
              <span className="flex-1 bg-[#FF9933]" />
              <span className="flex-1 bg-white" />
              <span className="flex-1 bg-[#138808]" />
            </span>
            +91
          </div>
          <input
            className={inp + ' flex-1 border-l-0'}
            style={{ borderRadius: 0 }}
            placeholder="WhatsApp number"
            type="tel"
            required
          />
        </div>
        <input style={{ borderRadius: 2 }} className={inp} placeholder="Business name" required />
        <input style={{ borderRadius: 2 }} className={inp} type="password" placeholder="Password (min 8 chars)" required minLength={8} />

        <div className="flex items-start gap-2 pt-1">
          <input type="checkbox" required className="mt-0.5 accent-[#C8953A]" id="tos" />
          <label htmlFor="tos" className="font-mono text-[10px] text-[#6B6B6B] leading-relaxed">
            I agree to the <span className="text-[#C8953A]">Terms of Service</span> and <span className="text-[#C8953A]">Privacy Policy</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#C8953A] text-[#080808] font-semibold text-sm tracking-wide hover:bg-[#E8B04A] transition-colors flex items-center justify-center gap-2 mt-2"
          style={{ borderRadius: 2 }}
        >
          Create Account <ArrowRightIcon size={14} strokeWidth={2} />
        </button>
      </form>

      <p className="mt-4 text-center font-mono text-[10px] text-[#6B6B6B]">
        Already have an account?{' '}
        <button onClick={() => navigate('login')} className="text-[#C8953A] hover:text-[#E8B04A]">Sign in</button>
      </p>
    </AuthShell>
  )
}

// ── G03 Forgot Password
function ForgotPassword() {
  const { navigate } = useRouter()
  const [step, setStep] = useState<'email' | 'otp' | 'reset' | 'done'>('email')
  const [email, setEmail] = useState('')

  return (
    <AuthShell
      title={step === 'done' ? 'Password reset.' : 'Reset password.'}
      sub={step === 'email' ? 'ENTER YOUR EMAIL' : step === 'otp' ? 'VERIFY OTP' : step === 'reset' ? 'SET NEW PASSWORD' : 'ALL DONE'}
    >
      {step === 'email' && (
        <form onSubmit={e => { e.preventDefault(); setStep('otp') }} className="space-y-4">
          <input
            style={{ borderRadius: 2 }} className={inp}
            type="email" placeholder="Your registered email / phone"
            value={email} onChange={e => setEmail(e.target.value)} required
          />
          <button type="submit" className="w-full py-3 bg-[#C8953A] text-[#080808] font-semibold text-sm tracking-wide hover:bg-[#E8B04A] transition-colors" style={{ borderRadius: 2 }}>
            Send OTP
          </button>
          <button type="button" onClick={() => navigate('login')} className="w-full font-mono text-[10px] text-[#6B6B6B] hover:text-[#F0EDE8] transition-colors">
            Back to login
          </button>
        </form>
      )}

      {step === 'otp' && (
        <div>
          <p className="font-mono text-[10px] text-[#6B6B6B] mb-6 text-center">
            OTP sent to {email || '+91 98765 43210'} via WhatsApp
          </p>
          <OTPInputGrid onComplete={() => setStep('reset')} />
          <div className="mt-4 text-center font-mono text-[10px] text-[#6B6B6B]">
            Didn't receive? <button className="text-[#C8953A]">Resend in 30s</button>
          </div>
        </div>
      )}

      {step === 'reset' && (
        <form onSubmit={e => { e.preventDefault(); setStep('done') }} className="space-y-3">
          <input style={{ borderRadius: 2 }} className={inp} type="password" placeholder="New password" required minLength={8} />
          <input style={{ borderRadius: 2 }} className={inp} type="password" placeholder="Confirm new password" required />
          <button type="submit" className="w-full py-3 bg-[#C8953A] text-[#080808] font-semibold text-sm tracking-wide hover:bg-[#E8B04A] transition-colors" style={{ borderRadius: 2 }}>
            Set New Password
          </button>
        </form>
      )}

      {step === 'done' && (
        <div className="text-center space-y-4">
          <div className="w-14 h-14 border border-[#C8953A]/30 bg-[#C8953A]/5 flex items-center justify-center mx-auto text-[#C8953A]" style={{ borderRadius: 2 }}>
            <CheckIcon size={24} strokeWidth={2} />
          </div>
          <p className="text-sm text-[#6B6B6B]">Your password has been reset successfully.</p>
          <button
            onClick={() => navigate('login')}
            className="w-full py-3 bg-[#C8953A] text-[#080808] font-semibold text-sm hover:bg-[#E8B04A] transition-colors"
            style={{ borderRadius: 2 }}
          >
            Go to Login
          </button>
        </div>
      )}
    </AuthShell>
  )
}

// ── G04 OTP Input (reusable)
function OTPInputGrid({ onComplete }: { onComplete: () => void }) {
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const refs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null))

  const handleKey = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const next = [...digits]
    next[i] = val.slice(-1)
    setDigits(next)
    if (val && i < 5) refs[i + 1].current?.focus()
    if (next.every(d => d !== '')) onComplete()
  }

  const handleBackspace = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs[i - 1].current?.focus()
    }
  }

  return (
    <div className="flex gap-2 justify-center">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={refs[i]}
          value={d}
          maxLength={1}
          onChange={e => handleKey(i, e.target.value)}
          onKeyDown={e => handleBackspace(i, e)}
          className="w-11 h-13 bg-[#111] border border-white/10 text-[#F0EDE8] text-xl text-center font-mono focus:outline-none focus:border-[#C8953A] transition-colors"
          style={{ borderRadius: 2, height: 52 }}
          inputMode="numeric"
          autoFocus={i === 0}
        />
      ))}
    </div>
  )
}

function OTPPage() {
  const { navigate } = useRouter()

  return (
    <AuthShell title="Verify OTP." sub="ENTER THE 6-DIGIT CODE">
      <p className="font-mono text-[10px] text-[#6B6B6B] text-center mb-6">
        Sent to your WhatsApp · expires in 10 minutes
      </p>
      <OTPInputGrid onComplete={() => navigate('dashboard')} />
      <div className="mt-6 text-center space-y-3">
        <div className="font-mono text-[10px] text-[#6B6B6B]">
          Didn't receive? <button className="text-[#C8953A]">Resend OTP</button>
        </div>
        <button onClick={() => navigate('login')} className="font-mono text-[10px] text-[#6B6B6B] hover:text-[#F0EDE8] transition-colors block mx-auto">
          Back to login
        </button>
      </div>
      <div className="mt-8 p-3 border border-white/5 flex items-center gap-2" style={{ borderRadius: 2 }}>
        <BoltIcon size={12} strokeWidth={1.5} className="text-[#C8953A] flex-shrink-0" />
        <span className="font-mono text-[10px] text-[#6B6B6B]">OTP delivered via Meta Cloud API · end-to-end encrypted</span>
      </div>
    </AuthShell>
  )
}

export default function Auth({ screen }: { screen: 'login' | 'signup' | 'forgot-password' | 'otp' }) {
  if (screen === 'signup') return <Signup />
  if (screen === 'forgot-password') return <ForgotPassword />
  if (screen === 'otp') return <OTPPage />
  return <Login />
}
