// src/pages/SuccessPage.jsx — Matches screenshots 4-8: hero, stats, client stories, testimonials, CTA
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { TrendingUp, Users, Clock, Trophy, CheckCircle, Building, Activity, Megaphone, ShoppingBag, Pill } from 'lucide-react';
// Animated counter component
const CountUp = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const num = parseInt(target.replace(/\D/g, ''));
        const duration = 1800;
        const step = Math.ceil(num / (duration / 16));
        const timer = setInterval(() => {
          start += step;
          if (start >= num) { setCount(num); clearInterval(timer); }
          else setCount(start);
        }, 16);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const formatted = count >= 1000 ? count.toLocaleString() : count;
  return <span ref={ref}>{formatted}{suffix}</span>;
};

const CLIENT_STORIES = [

  {
    company: 'PharmaCare Pharmacy',
    industry: 'Healthcare & Retail',
    badge: '75% Time Saved',
    icon: Pill,
    title: 'Integrated Pharmaceutical Storage System',
    description: 'Implemented a fully integrated medication storage management system with real-time stock monitoring and automated Telegram alerts for low or out-of-stock medications. Reduced manual workload by 75% and ensured accurate inventory control.',
    bullets: [
      'Real-time stock tracking',
      'Zero inventory discrepancies',
      'Automated Telegram alerts for low stock'
    ],
  },
  {
    company: 'Smart Workflow Suite',
industry: 'Workflow Automation',
badge: 'Fully Automated & AI-Powered',
icon: Activity,
title: 'PDF & Order Management System',
description: 'Automates PDF processing, restaurant order management, AI-driven responses, Telegram notifications, and Google Sheets updates for seamless workflow handling.',
bullets: [
  'Automatic processing of new PDF files with semantic search capabilities',
  'AI-powered handling of customer orders and inquiries',
  'Real-time notifications via Telegram and updates in Google Sheets',
  'Generation of unique Order IDs and intelligent data routing',
  'Integration with vector databases and workflow automation tools'
],
  },
 
  {
    company: 'MarketPro Agency',
    industry: 'Marketing',
    badge: '3x Campaign Output',
    icon: Megaphone,
    title: 'Marketing Campaign Automation',
    description: 'Built multi-channel marketing automation system that tripled campaign output. Automated lead nurturing, follow-ups, and campaign performance reporting.',
    bullets: ['300% more campaigns launched', 'Automated A/B testing', 'CRM-synced lead scoring'],
  },
];


const SuccessPage = () => {
  const navigate = useNavigate();
  const heroBg = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1800&q=80';

  return (
    <div style={{ background: 'var(--bg-void)', minHeight: '100vh' }}>
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '480px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.72)' }} />
        <div style={{ position: 'relative', padding: '120px 5% 80px', maxWidth: '1280px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: '700', marginBottom: '20px' }}>
            Proven Results That Speak
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto', lineHeight: '1.7' }}>
            Real automation success stories from businesses like yours. See how we've transformed workflows and delivered measurable impact.
          </p>
        </div>
      </section>

      {/* ══ STATS ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 5%', background: 'var(--bg-void)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {[
            { icon: TrendingUp, number: '16', suffix: '', label: 'Projects Completed' },
            { icon: Users, number: '5', suffix: '', label: 'Happy Clients' },
            { icon: Clock, number: '400', suffix: '', label: 'Hours Saved' },
            { icon: Trophy, number: '98', suffix: '', label: 'Success Rate %' },
          ].map(({ icon: Icon, number, suffix, label }) => (
            <div key={label} className="stat-card" style={{ animation: 'fadeInUp 0.6s ease both' }}>
              <div className="stat-icon">
                <Icon size={26} style={{ color: 'var(--gold)' }} />
              </div>
              <div className="stat-number">
                <CountUp target={number} suffix={suffix} />
              </div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CLIENT STORIES ═══════════════════════════════════════════ */}
      <section style={{ padding: '80px 5%', background: 'var(--bg-deep)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: '700', textAlign: 'center', marginBottom: '56px' }}>
            Client Success Stories
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {CLIENT_STORIES.map((story, i) => {
              const Icon = story.icon;
              return (
                <div key={story.company} style={{
                  background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 'var(--radius-lg)', padding: '32px',
                  animation: `fadeInUp 0.5s ease ${i * 0.1}s both`,
                  transition: 'border-color 0.3s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold-border)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '48px', height: '48px', borderRadius: '10px',
                        background: 'rgba(201,168,76,0.12)', border: '1px solid var(--gold-border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <Icon size={22} style={{ color: 'var(--gold)' }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '1rem' }}>{story.company}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{story.industry}</div>
                      </div>
                    </div>
                    <span className="badge badge-gold">{story.badge}</span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: '700', color: 'var(--gold)', marginBottom: '12px' }}>
                    {story.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.65', marginBottom: '20px' }}>
                    {story.description}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {story.bullets.map(b => (
                      <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CheckCircle size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* ══ CTA ════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{
            background: 'linear-gradient(145deg, #1a1404, #141414)',
            border: '1px solid var(--gold-border)',
            borderRadius: 'var(--radius-xl)', padding: '60px 48px', textAlign: 'center',
            boxShadow: '0 0 60px rgba(201,168,76,0.06)',
          }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: '700', marginBottom: '14px' }}>
              Ready to Transform Your Workflow?
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '36px' }}>
              Join hundreds of successful businesses automating their processes with K8
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-gold btn-lg" onClick={() => navigate('/contact-page')}>Get Started Today</button>
              <button className="btn btn-outline btn-lg" onClick={() => navigate('/services-page')}>Explore Services</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '48px 5%', background: 'var(--bg-deep)', textAlign: 'center' }}>
        <div style={{ marginBottom: '8px' }}><span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--gold)' }}>K8</span></div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>Automation Solutions Developer | n8n Specialist</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>© 2026 K8 Automation Solutions. All rights reserved. | Developed with ❤️ by K8</p>
      </footer>
    </div>
  );
};

export default SuccessPage;
