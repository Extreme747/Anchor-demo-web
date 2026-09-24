import { useState } from 'react'

export default function Legal({ section = 'terms' }: { section?: 'terms' | 'privacy' | 'refunds' | 'contact' }) {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'refunds' | 'contact'>(section)

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-10 text-center">
        <div className="font-mono text-xs text-[#C8953A] tracking-widest uppercase mb-2">Legal & Compliance</div>
        <h1 className="font-display text-4xl text-[#F0EDE8]">Terms, Privacy & Policies</h1>
        <p className="font-mono text-xs text-[#6B6B6B] mt-2">Anchor Technologies Pvt Ltd · Last updated: September 2026</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/8 mb-10 overflow-x-auto">
        {[
          { id: 'terms', label: 'Terms of Service' },
          { id: 'privacy', label: 'Privacy Policy' },
          { id: 'refunds', label: 'Refund & Cancellation' },
          { id: 'contact', label: 'Contact Us & Delivery' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className="px-6 py-3 font-mono text-xs tracking-wide transition-colors border-b-2 -mb-px flex-shrink-0"
            style={{
              borderColor: activeTab === t.id ? '#C8953A' : 'transparent',
              color: activeTab === t.id ? '#C8953A' : '#6B6B6B',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-[#A0A0A0]">
        {activeTab === 'terms' && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl text-[#F0EDE8]">1. Terms of Service</h2>
            <p>
              Welcome to Anchor. By accessing our platform, dashboard, or WhatsApp integration services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>
            <h3 className="font-medium text-[#F0EDE8] text-base">1.1 SaaS Subscription & Services</h3>
            <p>
              Anchor provides a WhatsApp conversational recovery and follow-up engine for business entities. Customers are responsible for complying with Meta's official WhatsApp Business Messaging policies and anti-spam regulations.
            </p>
            <h3 className="font-medium text-[#F0EDE8] text-base">1.2 Zero-Markup Pass-Through Fees</h3>
            <p>
              Anchor charges flat monthly software subscription fees (Starter ₹999, Growth ₹2,499, Business ₹4,999). Official Meta conversation fees are passed through directly at cost (0% platform markup) as billed by Meta Platforms Ireland Ltd / Meta India.
            </p>
            <h3 className="font-medium text-[#F0EDE8] text-base">1.3 Governing Law</h3>
            <p>
              These terms are governed by and construed in accordance with the laws of India, under the jurisdiction of the courts of Gurugram, Haryana.
            </p>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl text-[#F0EDE8]">2. Privacy Policy</h2>
            <p>
              Anchor Technologies Pvt Ltd is committed to protecting the privacy of our clients and their end-consumers in accordance with the Digital Personal Data Protection (DPDP) Act, 2023.
            </p>
            <h3 className="font-medium text-[#F0EDE8] text-base">2.1 Information We Collect</h3>
            <p>
              We collect user account details (name, business email, phone number, billing address) and process customer lead messages strictly to provide deterministic scoring, auto-replies, and team inbox collaboration.
            </p>
            <h3 className="font-medium text-[#F0EDE8] text-base">2.2 Data Security & Masking</h3>
            <p>
              All data transmitted through our webhooks and APIs is encrypted using industry-standard TLS 1.3 and stored with AES-256 encryption. We provide built-in phone number masking to prevent unauthorized data exfiltration.
            </p>
            <h3 className="font-medium text-[#F0EDE8] text-base">2.3 Data Retention & Rights</h3>
            <p>
              Clients retain full ownership of their lead databases and conversation logs. Clients may request data export or account deletion at any time via support@anchor.io.
            </p>
          </div>
        )}

        {activeTab === 'refunds' && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl text-[#F0EDE8]">3. Cancellation & Refund Policy</h2>
            <p>
              At Anchor, we strive to ensure 100% customer satisfaction with our revenue recovery software.
            </p>
            <h3 className="font-medium text-[#F0EDE8] text-base">3.1 7-Day Money-Back Guarantee</h3>
            <p>
              We offer a <strong>7-day no-questions-asked refund policy</strong> for first-time subscribers on all monthly and annual SaaS software plans. If Anchor does not meet your expectations within 7 days of initial subscription, email billing@anchor.io for a full refund of your SaaS subscription fee.
            </p>
            <h3 className="font-medium text-[#F0EDE8] text-base">3.2 Subscription Cancellation</h3>
            <p>
              You can cancel your subscription at any time directly from the <em>Settings &gt; Billing</em> page in your dashboard. Upon cancellation, your account will remain active until the end of the current paid billing cycle, and no further recurring charges will be incurred.
            </p>
            <h3 className="font-medium text-[#F0EDE8] text-base">3.3 Meta Direct Messaging Charges</h3>
            <p>
              Please note that official conversation fees paid directly to Meta for WhatsApp utility/marketing messages are consumed in real-time by Meta's network and are non-refundable once delivered.
            </p>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl text-[#F0EDE8]">4. Contact Us & Service Delivery Policy</h2>
            <p>
              For customer support, billing inquiries, or compliance queries, please reach out to our team:
            </p>
            <div className="border border-white/8 bg-[#0D0D0D] p-5 space-y-3 font-mono text-xs" style={{ borderRadius: 2 }}>
              <div><strong>Company Name:</strong> Anchor Technologies Private Limited</div>
              <div><strong>Operating Address:</strong> Golf Course Road, Sector 54, Gurugram, Haryana 122002, India</div>
              <div><strong>Support Email:</strong> support@anchor.io / billing@anchor.io</div>
              <div><strong>Support Phone:</strong> +91 98100 12345 (Mon–Sat, 09:00 AM – 07:00 PM IST)</div>
            </div>
            <h3 className="font-medium text-[#F0EDE8] text-base">4.1 Digital Service Delivery</h3>
            <p>
              Anchor is a cloud-based Software-as-a-Service (SaaS) application. Upon successful payment through Razorpay, your account is activated instantly and digital access credentials are provided immediately on-screen and via email. No physical goods are shipped.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
