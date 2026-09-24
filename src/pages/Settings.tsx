import { useState } from 'react'
import { CheckIcon, LockIcon, BellIcon, TeamIcon, ArrowRightIcon } from '../components/Icons'

const inp = 'w-full bg-[#111] border border-white/10 text-[#F0EDE8] text-sm px-4 py-3 placeholder-[#444] focus:outline-none focus:border-[#C8953A] transition-colors'
const lbl = 'font-mono text-[10px] text-[#6B6B6B] tracking-widest block mb-1.5'

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle}
      className="w-10 h-6 relative flex-shrink-0 transition-colors"
      style={{ borderRadius: 12, background: on ? '#C8953A' : 'rgba(255,255,255,0.1)' }}>
      <div className="absolute top-1 w-4 h-4 bg-white transition-all" style={{ borderRadius: '50%', left: on ? 22 : 4 }} />
    </button>
  )
}

// ── G09 Profile Settings
function ProfileSettings() {
  const [notifs, setNotifs] = useState({ whatsapp: true, email: true, push: false })
  return (
    <div className="max-w-xl space-y-6">
      <div>
        <div className={lbl}>AVATAR</div>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#2A2A2A] flex items-center justify-center font-display text-2xl text-[#C8953A]" style={{ borderRadius: 2 }}>
            R
          </div>
          <button className="font-mono text-[10px] text-[#6B6B6B] hover:text-[#F0EDE8] border border-white/10 px-3 py-1.5 transition-colors" style={{ borderRadius: 2 }}>
            Upload Photo
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>FIRST NAME</label>
          <input style={{ borderRadius: 2 }} className={inp} defaultValue="Rahul" />
        </div>
        <div>
          <label className={lbl}>LAST NAME</label>
          <input style={{ borderRadius: 2 }} className={inp} defaultValue="Verma" />
        </div>
      </div>
      <div>
        <label className={lbl}>WORK EMAIL</label>
        <input style={{ borderRadius: 2 }} className={inp} type="email" defaultValue="rahul@khanna-properties.com" />
      </div>
      <div>
        <label className={lbl}>PHONE (WHATSAPP)</label>
        <input style={{ borderRadius: 2 }} className={inp} type="tel" defaultValue="+91 98765 43210" />
      </div>
      <div>
        <label className={lbl}>CURRENT PASSWORD</label>
        <input style={{ borderRadius: 2 }} className={inp} type="password" placeholder="Enter to change password" />
      </div>
      <div className="border border-white/8 p-4 space-y-3" style={{ borderRadius: 2 }}>
        <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest mb-3">NOTIFICATION PREFERENCES</div>
        {Object.entries(notifs).map(([key, val]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[#F0EDE8] capitalize">{key === 'whatsapp' ? 'WhatsApp' : key} notifications</div>
              <div className="font-mono text-[9px] text-[#6B6B6B]">
                {key === 'whatsapp' ? 'New leads, SLA breaches' : key === 'email' ? 'Daily summary, reports' : 'Browser push alerts'}
              </div>
            </div>
            <Toggle on={val} onToggle={() => setNotifs(n => ({ ...n, [key]: !val }))} />
          </div>
        ))}
      </div>
      <button className="px-6 py-2.5 bg-[#C8953A] text-[#080808] font-semibold text-sm hover:bg-[#E8B04A] transition-colors" style={{ borderRadius: 2 }}>
        Save Changes
      </button>
    </div>
  )
}

// ── G10 Organization Settings
function OrgSettings() {
  const [autoReply, setAutoReply] = useState(true)
  const [masking, setMasking] = useState(true)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const [workDays, setWorkDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <label className={lbl}>ORGANIZATION NAME</label>
        <input style={{ borderRadius: 2 }} className={inp} defaultValue="Khanna Properties Pvt. Ltd." />
      </div>
      <div>
        <label className={lbl}>LOGO</label>
        <div className="border border-dashed border-white/10 p-6 text-center" style={{ borderRadius: 2 }}>
          <div className="font-mono text-[10px] text-[#6B6B6B]">Drop logo here or <span className="text-[#C8953A] cursor-pointer">browse</span></div>
          <div className="font-mono text-[9px] text-[#3A3A3A] mt-1">PNG/SVG · Max 1MB</div>
        </div>
      </div>
      <div>
        <label className={lbl}>TIMEZONE</label>
        <select style={{ borderRadius: 2 }} className={inp + ' cursor-pointer'}>
          <option>Asia/Kolkata (IST, UTC+5:30)</option>
          <option>Asia/Dubai (GST, UTC+4:00)</option>
        </select>
      </div>
      <div>
        <label className={lbl}>WORKING DAYS</label>
        <div className="flex gap-2">
          {days.map(d => (
            <button key={d} onClick={() => setWorkDays(wd => wd.includes(d) ? wd.filter(x => x !== d) : [...wd, d])}
              className="w-10 h-10 font-mono text-[10px] border transition-colors"
              style={{ borderRadius: 2, borderColor: workDays.includes(d) ? '#C8953A' : 'rgba(255,255,255,0.08)', color: workDays.includes(d) ? '#C8953A' : '#6B6B6B', background: workDays.includes(d) ? 'rgba(200,149,58,0.08)' : 'transparent' }}>
              {d.slice(0, 2)}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className={lbl}>WORKING HOURS START</label>
          <input style={{ borderRadius: 2 }} className={inp} type="time" defaultValue="09:00" />
        </div>
        <div className="flex-1">
          <label className={lbl}>WORKING HOURS END</label>
          <input style={{ borderRadius: 2 }} className={inp} type="time" defaultValue="19:00" />
        </div>
      </div>
      <div className="space-y-3 border border-white/8 p-4" style={{ borderRadius: 2 }}>
        {[
          { label: 'Default auto-reply', sub: 'Fire auto-reply on every new conversation', state: autoReply, set: setAutoReply },
          { label: 'Phone number masking', sub: 'Agents see +91 98XXX XX210 instead of full number', state: masking, set: setMasking },
        ].map(item => (
          <div key={item.label} className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[#F0EDE8]">{item.label}</div>
              <div className="font-mono text-[9px] text-[#6B6B6B]">{item.sub}</div>
            </div>
            <Toggle on={item.state} onToggle={() => item.set(!item.state)} />
          </div>
        ))}
      </div>
      <button className="px-6 py-2.5 bg-[#C8953A] text-[#080808] font-semibold text-sm hover:bg-[#E8B04A] transition-colors" style={{ borderRadius: 2 }}>
        Save Organization Settings
      </button>
    </div>
  )
}

// ── G11 Billing
function Billing() {
  const plans = [
    { name: 'Starter', price: 999, leads: 500, agents: 2 },
    { name: 'Growth', price: 2499, leads: 2000, agents: 10, current: true },
    { name: 'Business', price: 5999, leads: 10000, agents: 50 },
    { name: 'Enterprise', price: null, leads: null, agents: null },
  ]

  return (
    <div className="max-w-2xl space-y-6">
      <div className="border border-[#C8953A]/20 bg-[#C8953A]/5 p-4 flex items-center justify-between" style={{ borderRadius: 2 }}>
        <div>
          <div className="font-mono text-[10px] text-[#C8953A] tracking-widest mb-1">CURRENT PLAN</div>
          <div className="font-display text-2xl text-[#F0EDE8]">Growth</div>
          <div className="font-mono text-[9px] text-[#6B6B6B]">Renews on 1 Nov 2026 · ₹2,499/month</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[9px] text-[#6B6B6B] mb-1">META WALLET</div>
          <div className="font-display text-xl text-[#C8953A]">₹4,820</div>
          <button className="font-mono text-[9px] text-[#C8953A] hover:text-[#E8B04A]">Recharge →</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {plans.map(p => (
          <div key={p.name}
            className="border p-4 flex flex-col"
            style={{ borderRadius: 2, borderColor: p.current ? '#C8953A' : 'rgba(255,255,255,0.08)', background: p.current ? 'rgba(200,149,58,0.04)' : 'transparent' }}>
            <div className="font-mono text-[9px] text-[#6B6B6B] tracking-widest mb-1">{p.name.toUpperCase()}</div>
            <div className="font-display text-xl text-[#F0EDE8] mb-1">
              {p.price ? `₹${p.price.toLocaleString()}` : 'Custom'}
            </div>
            {p.price && <div className="font-mono text-[9px] text-[#6B6B6B] mb-3">/month</div>}
            <div className="space-y-1 text-[10px] text-[#6B6B6B] flex-1">
              <div>{p.leads ? `${p.leads.toLocaleString()} leads` : 'Unlimited leads'}</div>
              <div>{p.agents ? `${p.agents} agents` : 'Unlimited agents'}</div>
            </div>
            {!p.current && (
              <button className="mt-3 w-full py-1.5 border border-white/10 font-mono text-[9px] text-[#6B6B6B] hover:border-[#C8953A] hover:text-[#C8953A] transition-colors" style={{ borderRadius: 2 }}>
                {p.price ? 'Upgrade' : 'Contact Sales'}
              </button>
            )}
            {p.current && (
              <div className="mt-3 flex items-center gap-1 font-mono text-[9px] text-[#C8953A]">
                <CheckIcon size={10} strokeWidth={2.5} /> Current
              </div>
            )}
          </div>
        ))}
      </div>

      <div>
        <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest mb-3">PAYMENT HISTORY</div>
        <div className="border border-white/8 overflow-hidden" style={{ borderRadius: 2 }}>
          {[
            { date: '1 Oct 2026', amount: '₹2,499', desc: 'Growth Plan — Monthly', status: 'Paid' },
            { date: '1 Sep 2026', amount: '₹2,499', desc: 'Growth Plan — Monthly', status: 'Paid' },
            { date: '5 Sep 2026', amount: '₹5,000', desc: 'Meta Wallet Recharge', status: 'Paid' },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-white/5 last:border-0">
              <div>
                <div className="text-sm text-[#F0EDE8]">{row.desc}</div>
                <div className="font-mono text-[9px] text-[#6B6B6B]">{row.date}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-[#C8953A]">{row.amount}</span>
                <span className="font-mono text-[9px] px-2 py-0.5 text-green-400 border border-green-400/20 bg-green-400/5" style={{ borderRadius: 2 }}>
                  {row.status}
                </span>
                <button className="font-mono text-[9px] text-[#6B6B6B] hover:text-[#F0EDE8]">PDF</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── G12 Team Management
function TeamManagement() {
  const members = [
    { name: 'Aditya Khanna', email: 'aditya@khanna-properties.com', role: 'Owner', status: 'Active', leads: 142 },
    { name: 'Rahul Verma', email: 'rahul@khanna-properties.com', role: 'Manager', status: 'Active', leads: 89 },
    { name: 'Sneha Patel', email: 'sneha@khanna-properties.com', role: 'Agent', status: 'Active', leads: 67 },
    { name: 'Amit Sharma', email: 'amit@khanna-properties.com', role: 'Agent', status: 'Active', leads: 54 },
    { name: 'Divya Nair', email: 'divya@khanna-properties.com', role: 'Agent', status: 'Invited', leads: 0 },
  ]

  const roleColors: Record<string, string> = {
    Owner: '#C8953A', Manager: '#4A9EBA', Agent: '#6B6B6B',
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="font-mono text-[9px] text-[#6B6B6B]">{members.length} members · 2 seats remaining</div>
        <button className="px-4 py-2 bg-[#C8953A] text-[#080808] font-mono text-[10px] tracking-wide hover:bg-[#E8B04A] transition-colors flex items-center gap-1.5" style={{ borderRadius: 2 }}>
          <TeamIcon size={12} strokeWidth={2} /> Invite Member
        </button>
      </div>

      <div className="border border-white/8 overflow-hidden" style={{ borderRadius: 2 }}>
        <div className="grid grid-cols-[1fr_auto_auto_auto] px-4 py-2 border-b border-white/8 font-mono text-[9px] text-[#6B6B6B] tracking-widest gap-4">
          <span>MEMBER</span><span>ROLE</span><span>LEADS</span><span>STATUS</span>
        </div>
        {members.map((m, i) => (
          <div key={i} className="grid grid-cols-[1fr_auto_auto_auto] px-4 py-3 border-b border-white/5 last:border-0 items-center gap-4">
            <div>
              <div className="text-sm text-[#F0EDE8]">{m.name}</div>
              <div className="font-mono text-[9px] text-[#6B6B6B]">{m.email}</div>
            </div>
            <select
              className="bg-transparent border border-white/10 font-mono text-[10px] px-2 py-1 focus:outline-none focus:border-[#C8953A] cursor-pointer"
              style={{ borderRadius: 2, color: roleColors[m.role] }}
              defaultValue={m.role}
            >
              <option value="Owner">Owner</option>
              <option value="Manager">Manager</option>
              <option value="Agent">Agent</option>
            </select>
            <span className="font-mono text-xs text-[#F0EDE8]">{m.leads}</span>
            <span className="font-mono text-[9px] px-2 py-0.5"
              style={{ borderRadius: 2, color: m.status === 'Active' ? '#4ADE80' : '#EAB308', background: m.status === 'Active' ? 'rgba(74,222,128,0.08)' : 'rgba(234,179,8,0.08)' }}>
              {m.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main Settings export
type SettingsTab = 'profile' | 'organization' | 'billing' | 'team' | 'notifications'

export default function Settings({ tab = 'profile' }: { tab?: SettingsTab }) {
  const [activeTab, setActiveTab] = useState<SettingsTab>(tab)

  const tabs: Array<{ id: SettingsTab; label: string }> = [
    { id: 'profile', label: 'Profile' },
    { id: 'organization', label: 'Organization' },
    { id: 'billing', label: 'Billing' },
    { id: 'team', label: 'Team' },
  ]

  return (
    <div>
      <div className="flex gap-1 border-b border-white/8 mb-6 -mt-1">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className="px-4 py-2.5 font-mono text-[10px] tracking-wide transition-colors border-b-2 -mb-px"
            style={{ borderColor: activeTab === t.id ? '#C8953A' : 'transparent', color: activeTab === t.id ? '#C8953A' : '#6B6B6B' }}>
            {t.label.toUpperCase()}
          </button>
        ))}
      </div>
      {activeTab === 'profile' && <ProfileSettings />}
      {activeTab === 'organization' && <OrgSettings />}
      {activeTab === 'billing' && <Billing />}
      {activeTab === 'team' && <TeamManagement />}
    </div>
  )
}
