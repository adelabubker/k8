// src/pages/ContactPage.jsx — Connects contact form to n8n webhook
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { toast } from 'react-hot-toast';
import { Mail, Phone, MapPin, Clock, Linkedin, Twitter, Github, Instagram, Send, User, Building, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';

const FAQS = [
  {
    q: 'How long does a typical automation project take?',
    a: 'Project timelines vary based on complexity. Simple workflow automation can be completed in 1-2 weeks, while enterprise-level integrations may take 4-8 weeks. We provide detailed timelines during our initial consultation.',
  },
  {
    q: 'What platforms and tools do you work with?',
    a: 'We specialize in n8n but also work with Zapier, Make (Integromat), and custom-built automation solutions. We integrate with 500+ platforms including Salesforce, HubSpot, Slack, Google Workspace, Microsoft 365, and many more.',
  },
  {
    q: 'Do you provide ongoing support after project completion?',
    a: 'Yes! We offer flexible support packages including monitoring, maintenance, updates, and optimization. Our team is available to ensure your automation continues to perform at peak efficiency.',
  },
  {
    q: 'What is your pricing structure?',
    a: 'We offer project-based pricing and monthly retainer options. Pricing depends on complexity, number of integrations, and support requirements. Contact us for a free consultation and custom quote.',
  },
];

const ContactPage = () => {
  // Form State
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const [sending, setSending] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const heroBg = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=80';

  const validateForm = () => {
    if (!form.name.trim()) return 'Name is required';
    if (!form.email.trim()) return 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'Please enter a valid email address';
    if (!form.service) return 'Please select a service';
    if (!form.message.trim()) return 'Message is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Inline Validation
    const error = validateForm();
    if (error) return toast.error(error);

    setSending(true);

    try {
      const response = await fetch('https://adelhikosa.app.n8n.cloud/webhook/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          subject: "New Contact Request"
        }),
      });

      const result = await response.json();

      if (result.success === true) {
        toast.success('Message sent! We\'ll respond within 24 hours.');
        // Reset form after success
        setForm({ name: '', email: '', phone: '', company: '', service: '', message: '' });
      } else {
        toast.error(result.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '14px 16px',
    background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px', color: '#ffffff',
    fontFamily: 'var(--font-body)', fontSize: '0.95rem',
    outline: 'none', transition: 'border-color 0.2s',
  };

  return (
    <div style={{ background: 'var(--bg-void)', minHeight: '100vh' }}>
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '420px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center top' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.78)' }} />
        <div style={{ position: 'relative', padding: '120px 5% 80px', maxWidth: '1280px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: '700', marginBottom: '18px' }}>
            Let's Build Something Amazing
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.05rem', maxWidth: '580px', margin: '0 auto', lineHeight: '1.7' }}>
            Have a project in mind? We're here to help you automate, optimize, and scale your business workflows.
          </p>
        </div>
      </section>

      {/* ══ CONTACT FORM + SIDEBAR ════════════════════════════════════ */}
      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '32px' }}>

          {/* Left: Form */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 'var(--radius-lg)', padding: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: '700', marginBottom: '32px' }}>
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit}>
  {/* Row 1: Name + Email */}
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
    <div>
      <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>
        Your Name *
      </label>
      <input
        style={inputStyle}
        placeholder="your name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        onFocus={e => {
          e.target.style.borderColor = 'rgba(201,168,76,0.6)';
          e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.15)';
        }}
        onBlur={e => {
          e.target.style.borderColor = 'rgba(255,255,255,0.1)';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>

    <div>
      <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>
        Email Address *
      </label>
      <input
        type="email"
        style={inputStyle}
        placeholder="youemail@example.com"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        onFocus={e => {
          e.target.style.borderColor = 'rgba(201,168,76,0.6)';
          e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.15)';
        }}
        onBlur={e => {
          e.target.style.borderColor = 'rgba(255,255,255,0.1)';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  </div>

  {/* Row 2: Phone + Company */}
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
    <div>
      <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>
        Phone Number
      </label>
      <input
        style={inputStyle}
        placeholder="+962 78 0000000"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
    </div>

    <div>
      <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>
        Company Name
      </label>
      <input
        style={inputStyle}
        placeholder="your company"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
      />
    </div>
  </div>

  {/* Service */}
  <div style={{ marginBottom: '16px' }}>
    <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>
      Service Interested In *
    </label>
    <select
      style={{
        ...inputStyle,
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23a0a0a0' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 14px center',
        backgroundSize: '20px',
        cursor: 'pointer',
      }}
      value={form.service}
      onChange={(e) => setForm({ ...form, service: e.target.value })}
    >
      <option value="">Select a service...</option>
      <option value="workflow">Workflow Automation</option>
      <option value="integration">System Integration</option>
      <option value="ai">AI Automation</option>
      <option value="consulting">Automation Consulting</option>
      <option value="analytics">AI-Powered Analytics</option>
      <option value="optimization">Process Optimization</option>
    </select>
  </div>

  {/* Message */}
  <div style={{ marginBottom: '28px' }}>
    <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>
      Project Details *
    </label>
    <textarea
      rows={5}
      style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
      placeholder="Tell us about your automation needs, goals, and any specific requirements..."
      value={form.message}
      onChange={(e) => setForm({ ...form, message: e.target.value })}
    />
  </div>

  {/* Submit */}
  <button
    type="submit"
    disabled={sending}
    style={{
      width: '100%',
      padding: '16px',
      background: 'var(--gold)',
      color: '#0a0a0a',
      border: 'none',
      borderRadius: '50px',
      fontWeight: '700',
      fontSize: '0.9rem',
      letterSpacing: '0.1em',
      cursor: sending ? 'not-allowed' : 'pointer',
      opacity: sending ? 0.7 : 1,
      textTransform: 'uppercase',
    }}
  >
    {sending ? 'Sending...' : 'SEND MESSAGE'}
  </button>
</form>
          </div>

          {/* Right: Contact Info Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>Get in Touch</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6' }}>We typically respond within 24 hours. For urgent matters, please call us directly.</p>
            </div>

            {[
              { icon: Mail, label: 'EMAIL US', value: 'k8automation@gmail.com', color: 'var(--gold)' },
              { icon: Phone, label: 'CALL US', value: '+962 78 123 4567', color: 'var(--gold)' },
              { icon: MapPin, label: 'VISIT US', value: 'Mecca Street, Building No. 2208, Amman', color: 'var(--gold)' },
              { icon: Clock, label: 'BUSINESS HOURS', value: 'Sunday to Thursday: 9:00 AM to 6:00 PM Friday and Saturday: Closed', color: 'var(--gold)' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} style={{
                background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 'var(--radius-lg)', padding: '20px 24px',
                display: 'flex', alignItems: 'flex-start', gap: '16px',
                transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold-border)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
              >
                <div style={{
                  width: '44px', height: '44px', borderRadius: '10px',
                  background: 'rgba(201,168,76,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '6px' }}>{label}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', whiteSpace: 'pre-line', lineHeight: '1.5' }}>{value}</div>
                </div>
              </div>
            ))}

            {/* Social links */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 'var(--radius-lg)', padding: '20px 24px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '14px' }}>Follow Us</div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[Linkedin, Twitter, Github, Instagram].map((Icon, i) => (
                  <button key={i} style={{
                    width: '40px', height: '40px', borderRadius: '8px',
                    background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.2s ease',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-border)'; e.currentTarget.style.color = 'var(--gold)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 5%', background: 'var(--bg-deep)' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: '700', textAlign: 'center', marginBottom: '48px' }}>
            Frequently Asked Questions
          </h2>

          {FAQS.map((faq, i) => (
            <div key={i} style={{
              background: openFaq === i ? 'linear-gradient(145deg, #141005, #111)' : 'var(--bg-card)',
              border: `1px solid ${openFaq === i ? 'var(--gold-border)' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: 'var(--radius-md)', marginBottom: '12px',
              overflow: 'hidden', transition: 'all 0.2s ease',
            }}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 24px', cursor: 'pointer', color: openFaq === i ? 'var(--gold)' : 'var(--text-primary)', fontWeight: openFaq === i ? '600' : '400', fontSize: '1rem' }}
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              >
                <span>{faq.q}</span>
                <div style={{ color: openFaq === i ? 'var(--gold)' : 'var(--text-muted)', flexShrink: 0, marginLeft: '16px' }}>
                  {openFaq === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              {openFaq === i && (
                <div style={{ padding: '0 24px 22px', color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem', animation: 'fadeInUp 0.2s ease' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '48px 5%', background: 'var(--bg-void)', textAlign: 'center' }}>
        <div style={{ marginBottom: '8px' }}><span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--gold)' }}>K8</span></div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>Automation Solutions Developer | n8n Specialist</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>© 2026 K8 Automation Solutions. All rights reserved. | Developed with ❤️ by K8</p>
      </footer>
    </div>
  );
};

export default ContactPage;
