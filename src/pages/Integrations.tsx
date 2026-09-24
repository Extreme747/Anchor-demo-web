import { useState } from 'react'
import {
  BoltIcon, CheckIcon, ArrowRightIcon, WarningIcon,
  SearchIcon, TeamIcon, IndiaFlagBlock, RupeeSymbol
} from '../components/Icons'

// ── Types for Phase 5
export interface IntegrationItem {
  id: string
  name: string
  category: 'Property Portal' | 'CRM' | 'Spreadsheet' | 'Automation'
  description: string
  icon: string
  status: 'CONNECTED' | 'AVAILABLE' | 'PRO'
  lastSync?: string
  recordsSynced?: number
}

const INTEGRATIONS_CATALOG: IntegrationItem[] = [
  { id: 'int_99acres', name: '99acres Lead Ingestion', category: 'Property Portal', description: 'Zero-latency webhook ingestion for buyer inquiries. Auto-replies in <2 seconds.', icon: '🏢', status: 'CONNECTED', lastSync: '3 min ago', recordsSynced: 142 },
  { id: 'int_magicbricks', name: 'MagicBricks Direct API', category: 'Property Portal', description: 'Instant sync for property lead forms with automatic project brochure delivery.', icon: '🏗️', status: 'CONNECTED', lastSync: '12 min ago', recordsSynced: 89 },
  { id: 'int_housing', name: 'Housing.com Partner Bridge', category: 'Property Portal', description: 'Auto-ingest verified buyer profiles & match against active sales inventory.', icon: '🏠', status: 'AVAILABLE' },
  { id: 'int_sheets', name: 'Google Sheets (2-Way Sync)', category: 'Spreadsheet', description: 'Continuous bidirectional sync with Indian SMBs primary operational database.', icon: '📊', status: 'CONNECTED', lastSync: 'Just now', recordsSynced: 1204 },
  { id: 'int_leadsquared', name: 'LeadSquared CRM', category: 'CRM', description: 'Push WhatsApp conversation history, call attempts, and intent scores into LMS.', icon: '📈', status: 'AVAILABLE' },
  { id: 'int_indiamart', name: 'IndiaMART B2B Gateway', category: 'Property Portal', description: 'Auto-reply to B2B commercial catalog inquiries within 2 seconds.', icon: '🇮🇳', status: 'PRO' },
  { id: 'int_zapier', name: 'Zapier & Make.com Webhooks', category: 'Automation', description: 'Trigger arbitrary webhook events on lead WON, site visit booked, or SLA breach.', icon: '⚡', status: 'CONNECTED', lastSync: '1 hour ago', recordsSynced: 312 },
]

// ─────────────────────────────────────────────────────────────────────────────
// P5-01: HINGLISH & REGIONAL VERNACULAR ENGINE
// ─────────────────────────────────────────────────────────────────────────────
function VernacularEngineView() {
  const [lang, setLang] = useState<'hinglish' | 'marathi' | 'gujarati' | 'telugu'>('hinglish')
  const [testPhrase, setTestPhrase] = useState('bhai 3bhk ka price kya hai aur visit kab kar sakte hain')
  const [detectedIntent, setDetectedIntent] = useState<{ budget: boolean; visit: boolean; score: number }>({
    budget: true,
    visit: true,
    score: 60,
  })

  const handleTest = (phrase: string) => {
    setTestPhrase(phrase)
    const lower = phrase.toLowerCase()
    const budget = lower.includes('price') || lower.includes('rate') || lower.includes('kitna') || lower.includes('budget') || lower.includes('cost')
    const visit = lower.includes('visit') || lower.includes('dekhna') || lower.includes('kab') || lower.includes('tour')
    setDetectedIntent({
      budget,
      visit,
      score: (budget ? 25 : 0) + (visit ? 35 : 0),
    })
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <div className="font-mono text-[9px] text-[#C8953A] tracking-widest">P5-01 · DETERMINISTIC VERNACULAR PARSER</div>
        <div className="text-sm font-medium text-[#F0EDE8]">Hinglish, Marathi, Gujarati & South Indian Rule Engine</div>
      </div>

      {/* Language Selector */}
      <div className="flex gap-2">
        {[
          { id: 'hinglish', label: 'Hinglish (Hindi + English)' },
          { id: 'marathi', label: 'Marathi' },
          { id: 'gujarati', label: 'Gujarati' },
          { id: 'telugu', label: 'Telugu' },
        ].map(l => (
          <button
            key={l.id}
            onClick={() => setLang(l.id as any)}
            className="px-3 py-1.5 font-mono text-[10px] border transition-colors"
            style={{
              borderRadius: 2,
              borderColor: lang === l.id ? '#C8953A' : 'rgba(255,255,255,0.08)',
              background: lang === l.id ? 'rgba(200,149,58,0.08)' : 'transparent',
              color: lang === l.id ? '#C8953A' : '#6B6B6B',
            }}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Interactive Sandbox Simulator */}
      <div className="border border-white/8 p-5 bg-[#0D0D0D] space-y-4" style={{ borderRadius: 2 }}>
        <div className="font-mono text-[9px] text-[#6B6B6B] tracking-widest">LIVE INBOUND PARSER SANDBOX</div>

        <div>
          <label className="font-mono text-[9px] text-[#6B6B6B] block mb-1">TYPE INCOMING CUSTOMER QUERY</label>
          <input
            type="text"
            value={testPhrase}
            onChange={e => handleTest(e.target.value)}
            className="w-full bg-[#111] border border-white/10 text-xs text-[#F0EDE8] px-3 py-2.5 focus:border-[#C8953A] outline-none"
            style={{ borderRadius: 2 }}
          />
        </div>

        {/* Live Detected Signals */}
        <div className="border border-white/5 p-4 bg-[#111] space-y-3" style={{ borderRadius: 2 }}>
          <div className="flex justify-between items-center">
            <span className="font-mono text-[10px] text-[#6B6B6B]">DETERMINISTIC HEURISTIC SIGNALS</span>
            <span className="font-mono text-xs text-[#C8953A] font-bold">+{detectedIntent.score} Intent Points</span>
          </div>

          <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
            <div className={`p-2 border ${detectedIntent.budget ? 'border-[#C8953A]/40 bg-[#C8953A]/10 text-[#C8953A]' : 'border-white/5 text-[#444]'}`}>
              {detectedIntent.budget ? '✓ Budget Trigger Detected ("price / rate / kitna")' : '○ No Budget Signal'}
            </div>
            <div className={`p-2 border ${detectedIntent.visit ? 'border-green-500/40 bg-green-500/10 text-green-400' : 'border-white/5 text-[#444]'}`}>
              {detectedIntent.visit ? '✓ Site Visit Trigger ("visit / dekhna")' : '○ No Visit Signal'}
            </div>
          </div>

          <div className="pt-2 border-t border-white/5 font-mono text-[10px] text-[#6B6B6B]">
            Automated Next Action: <strong className="text-[#F0EDE8]">Dispatch Sector 62 Pricing Card & Trigger Site Visit Booking Flow</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// P5-06, P5-07, P5-08: AGENCY PARTNER & WHITE-LABEL DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
function AgencyPartnerView() {
  const clients = [
    { name: 'Apex Realty Gurugram', plan: 'Business Scale', leads: 412, revShare: '₹999/mo', status: 'ACTIVE' },
    { name: 'Solis Healthcare Clinic', plan: 'Growth', leads: 184, revShare: '₹499/mo', status: 'ACTIVE' },
    { name: 'Skyline Luxury Residences', plan: 'Business Scale', leads: 642, revShare: '₹999/mo', status: 'ACTIVE' },
  ]

  return (
    <div className="space-y-6">
      {/* Top Agency Revenue Share Hero */}
      <div className="border border-[#C8953A]/25 bg-[#C8953A]/5 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ borderRadius: 2 }}>
        <div>
          <div className="font-mono text-[9px] text-[#C8953A] tracking-widest">P5-06 · AGENCY PARTNER FLYWHEEL</div>
          <div className="font-display text-3xl text-[#F0EDE8] mt-1">20% Lifetime Recurring Rev-Share</div>
          <div className="font-mono text-[10px] text-[#6B6B6B] mt-1">
            Active Managed Client Accounts: 3 | Accumulated Monthly Payout: ₹2,497
          </div>
        </div>
        <button className="px-4 py-2 bg-[#C8953A] text-[#080808] font-mono text-[10px] font-semibold tracking-wide hover:bg-[#E8B04A]" style={{ borderRadius: 2 }}>
          + Add Managed Client WABA
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Managed Clients List */}
        <div className="border border-white/8 p-5 bg-[#0D0D0D] space-y-3" style={{ borderRadius: 2 }}>
          <div className="font-mono text-[9px] text-[#6B6B6B] tracking-widest">MANAGED CLIENT ACCOUNTS</div>
          <div className="space-y-2">
            {clients.map(c => (
              <div key={c.name} className="p-3 bg-[#111] border border-white/5 flex justify-between items-center" style={{ borderRadius: 2 }}>
                <div>
                  <div className="text-xs font-semibold text-[#F0EDE8]">{c.name}</div>
                  <div className="font-mono text-[9px] text-[#6B6B6B]">{c.plan} · {c.leads} leads this month</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs text-[#C8953A] font-bold">{c.revShare}</div>
                  <button className="font-mono text-[9px] text-[#6B6B6B] hover:text-[#F0EDE8]">Switch To Account →</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* P5-08: White-label Domain & Branding */}
        <div className="border border-white/8 p-5 bg-[#0D0D0D] space-y-3" style={{ borderRadius: 2 }}>
          <div className="font-mono text-[9px] text-[#C8953A] tracking-widest">P5-08 · WHITE-LABEL PORTAL BRANDING</div>
          <div>
            <label className="font-mono text-[9px] text-[#6B6B6B] block mb-1">CUSTOM SUBDOMAIN (CNAME)</label>
            <input
              type="text"
              defaultValue="crm.apexmarketing.in"
              className="w-full bg-[#111] border border-white/10 text-xs text-[#F0EDE8] px-3 py-2 font-mono outline-none"
              style={{ borderRadius: 2 }}
            />
          </div>
          <div>
            <label className="font-mono text-[9px] text-[#6B6B6B] block mb-1">AGENCY BRAND NAME & LOGO</label>
            <input
              type="text"
              defaultValue="Apex Growth Agency"
              className="w-full bg-[#111] border border-white/10 text-xs text-[#F0EDE8] px-3 py-2 outline-none"
              style={{ borderRadius: 2 }}
            />
          </div>
          <button className="w-full py-2 bg-[#C8953A] text-[#080808] font-mono text-[10px] font-semibold tracking-wide hover:bg-[#E8B04A]" style={{ borderRadius: 2 }}>
            Save White-Label Portal Config
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// P5-09 & P5-10: META EMBEDDED SIGNUP & GREEN TICK VERIFICATION
// ─────────────────────────────────────────────────────────────────────────────
function MetaVerificationWizard() {
  const steps = [
    { num: '01', title: 'Facebook Business Manager', desc: 'Verified Legal Business entity with matching address', done: true },
    { num: '02', title: 'GSTIN & Tax Invoice Match', desc: 'Valid 15-digit Indian GSTIN matching official trade name', done: true },
    { num: '03', title: 'Meta Two-Factor & Domain', desc: 'DNS TXT verification for registered business domain', done: true },
    { num: '04', title: 'Official WhatsApp Green Badge', desc: 'Meta Tier-1 direct BSP submission for Official Business Account (OBA)', done: false },
  ]

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <div className="font-mono text-[9px] text-[#C8953A] tracking-widest">P5-09 & P5-10 · META EMBEDDED SIGNUP & GREEN TICK</div>
        <div className="text-sm font-medium text-[#F0EDE8]">Official Business Account (OBA) Verification Tracker</div>
      </div>

      <div className="border border-white/8 p-5 bg-[#0D0D0D] space-y-4" style={{ borderRadius: 2 }}>
        {steps.map(s => (
          <div key={s.num} className="flex items-start gap-4 p-3.5 border border-white/5 bg-[#111]" style={{ borderRadius: 2 }}>
            <span className={`font-mono text-sm font-bold ${s.done ? 'text-green-400' : 'text-[#C8953A]'}`}>{s.num}</span>
            <div className="flex-1">
              <div className="text-xs font-semibold text-[#F0EDE8] flex items-center gap-2">
                {s.title}
                {s.done ? <span className="text-green-400 font-mono text-[9px]">✓ COMPLETE</span> : <span className="text-[#C8953A] font-mono text-[9px]">IN PROGRESS</span>}
              </div>
              <div className="font-mono text-[9px] text-[#6B6B6B] mt-0.5">{s.desc}</div>
            </div>
          </div>
        ))}

        <div className="pt-2">
          <button className="w-full py-2.5 bg-[#C8953A] text-[#080808] font-mono text-[10px] font-semibold tracking-wide hover:bg-[#E8B04A] transition-colors" style={{ borderRadius: 2 }}>
            Submit Official Meta Green Tick Request via Anchor BSP →
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN INTEGRATIONS EXPORT (PHASE 5)
// ─────────────────────────────────────────────────────────────────────────────
export default function Integrations() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'vernacular' | 'agency' | 'greentick'>('catalog')

  return (
    <div>
      {/* Sub-tab Navigation */}
      <div className="flex gap-1 border-b border-white/8 mb-6 -mt-1 overflow-x-auto">
        {[
          { id: 'catalog', label: 'Integration Hub & Portals' },
          { id: 'vernacular', label: 'Vernacular Hinglish Engine' },
          { id: 'agency', label: 'Agency Partner & White-Label' },
          { id: 'greentick', label: 'Meta Green Tick Wizard' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as typeof activeTab)}
            className="px-4 py-2.5 font-mono text-[10px] tracking-wide transition-colors border-b-2 -mb-px flex-shrink-0"
            style={{
              borderColor: activeTab === t.id ? '#C8953A' : 'transparent',
              color: activeTab === t.id ? '#C8953A' : '#6B6B6B',
            }}
          >
            {t.label.toUpperCase()}
          </button>
        ))}
      </div>

      {activeTab === 'vernacular' && <VernacularEngineView />}
      {activeTab === 'agency' && <AgencyPartnerView />}
      {activeTab === 'greentick' && <MetaVerificationWizard />}

      {activeTab === 'catalog' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-[9px] text-[#6B6B6B]">
                {INTEGRATIONS_CATALOG.filter(i => i.status === 'CONNECTED').length} active connectors · High-speed property portals & spreadsheet sync
              </div>
            </div>
            <div className="font-mono text-[10px] text-[#C8953A]">
              99acres + MagicBricks Real-time Webhooks Active
            </div>
          </div>

          {/* P5-02 & P5-05: Integrations Catalog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {INTEGRATIONS_CATALOG.map(item => (
              <div key={item.id} className="border border-white/8 p-5 bg-[#0D0D0D] hover:border-white/15 transition-colors space-y-3 flex flex-col justify-between" style={{ borderRadius: 2 }}>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <span
                      className="font-mono text-[9px] px-2 py-0.5"
                      style={{
                        borderRadius: 2,
                        background: item.status === 'CONNECTED' ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.05)',
                        color: item.status === 'CONNECTED' ? '#4ADE80' : '#6B6B6B',
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#F0EDE8]">{item.name}</h3>
                  <div className="font-mono text-[9px] text-[#4A9EBA] mt-0.5">{item.category}</div>
                  <p className="text-xs text-[#6B6B6B] mt-2 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-white/5 flex justify-between items-center font-mono text-[9px]">
                  <span className="text-[#3A3A3A]">{item.lastSync ? `Synced: ${item.lastSync}` : 'Ready to setup'}</span>
                  <button className="text-[#C8953A] hover:underline">
                    {item.status === 'CONNECTED' ? 'Configure →' : 'Connect +'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
