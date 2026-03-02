// src/pages/HomePage.jsx — Matches screenshot: full-bleed hero + gold design
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ArrowRight, Zap, Code2, Globe, Bot, Workflow, Shield, Star, TrendingUp, CheckCircle, ChevronRight } from 'lucide-react';

const iconMap = { zap: Zap, code2: Code2, globe: Globe, bot: Bot, workflow: Workflow, shield: Shield, star: Star, trending: TrendingUp };

// Fallback services matching screenshot cards
const FALLBACK_SERVICES = [
  { _id: '1', title: 'Workflow Automation', description: 'Design and execution of automated workflows using triggers, webhooks, and resilient pipelines.', icon: 'workflow', featured: true },
  { _id: '2', title: 'System Integration', description: 'Connect your tools and platforms seamlessly with custom integrations and API orchestration.', icon: 'code2' },
  { _id: '3', title: 'AI Automation', description: 'Leverage AI to automate complex decision-making processes and intelligent data flows.', icon: 'bot' },
  { _id: '4', title: 'Automation Consulting', description: 'Strategic guidance to identify automation opportunities and optimize workflows.', icon: 'zap' },
  { _id: '5', title: 'AI-Powered Analytics', description: 'Transform data into actionable insights with AI-driven analytics and reporting.', icon: 'trending' },
  { _id: '6', title: 'Process Optimization', description: 'Streamline your business processes with intelligent automation strategies.', icon: 'shield' },
];

const HomePage = () => {
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const navigate = useNavigate();

  // Unsplash-style robot/tech image for hero
  const heroImg = 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1800&q=80';

  return (
    <div style={{ background: 'var(--bg-void)', minHeight: '100vh' }}>
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        overflow: 'hidden',
      }}>
        {/* Background image with dark overlay — exactly like screenshot */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        {/* Dark overlay gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(10,10,10,0.92) 45%, rgba(10,10,10,0.5) 100%)',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', padding: '120px 5% 80px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
          <div style={{ maxWidth: '620px', animation: 'fadeInUp 0.8s ease forwards' }}>
            {/* Headline — "Automate. Orchestrate. Scale." like screenshot */}
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: '700', lineHeight: '1.05',
              marginBottom: '24px',
              color: 'var(--text-primary)',
            }}>
              Automate.<br />Orchestrate.<br />Scale.
            </h1>

            <p style={{
              fontSize: '1.1rem', color: 'rgba(255,255,255,0.75)',
              lineHeight: '1.7', marginBottom: '40px', maxWidth: '480px',
            }}>
              Enterprise-grade workflow automation powered by n8n and AI.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button className="btn btn-gold btn-lg" onClick={() => navigate('/services-page')}>
                View Services
              </button>
              <button className="btn btn-outline btn-lg" onClick={() => navigate('/success-page')}>
                See Success Stories
              </button>
            </div>
          </div>
        </div>
      </section>

     

      {/* ══ ABOUT STRIP ══════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 5%', background: 'var(--bg-deep)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px', alignItems: 'center' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: '700', marginBottom: '14px' }}>
              Why Choose <span style={{ color: 'var(--gold)' }}>K8 Automation</span>?
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '500px' }}>
              We combine deep technical expertise with practical automation strategy. 
              Every workflow we build is designed for reliability, security, and scale.
            </p>
          </div>
          {[
            'Expert n8n implementation',
            '500+ integrations supported',
            'AI-powered decision trees',
            '99.9% uptime guarantee',
            'GDPR compliant by design',
            'Dedicated support team',
          ].map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '100px 5%' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: '700', marginBottom: '16px' }}>
            Ready to Transform Your Workflow?
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.05rem' }}>
            Join hundreds of successful businesses automating with K8 Automation.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-gold btn-lg" onClick={() => navigate('/contact-page')}>Get Started Today</button>
            <button className="btn btn-outline btn-lg" onClick={() => navigate('/services-page')}>Explore Services</button>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════ */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)', padding: '48px 5%',
        background: 'var(--bg-deep)', textAlign: 'center',
      }}>
        <div style={{ marginBottom: '8px' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--gold)' }}>K8</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
          Automation Solutions Developer | n8n Specialist
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
          © 2026 K8 Automation Solutions. All rights reserved. | Developed with ❤️ by K8
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
