// src/pages/ServicesPublicPage.jsx — Public services listing, matches screenshot design
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import { Search, Zap, Code2, Globe, Bot, Workflow, Shield, Star, TrendingUp } from 'lucide-react';

const iconMap = { zap: Zap, code2: Code2, globe: Globe, bot: Bot, workflow: Workflow, shield: Shield, star: Star, trending: TrendingUp };

const FALLBACK = [
  { _id: '1', title: 'Workflow Automation', description: 'Design and execution of automated workflows using triggers, webhooks, and resilient pipelines.', icon: 'workflow', category: 'Workflow', featured: true },
  { _id: '2', title: 'System Integration', description: 'Connect your tools and platforms seamlessly with custom integrations and API orchestration.', icon: 'code2', category: 'Workflow' },
  { _id: '3', title: 'AI Automation', description: 'Leverage AI to automate complex decision-making processes and intelligent data flows.', icon: 'bot', category: 'AI Services' },
  { _id: '4', title: 'Automation Consulting', description: 'Strategic guidance to identify automation opportunities and optimize workflows for your business.', icon: 'zap', category: 'Workflow' },
  { _id: '5', title: 'AI-Powered Analytics', description: 'Transform data into actionable insights with AI-driven analytics and automated reporting pipelines.', icon: 'trending', category: 'AI Services' },
  { _id: '6', title: 'Process Optimization', description: 'Streamline your business processes with intelligent automation strategies and continuous improvement.', icon: 'shield', category: 'Workflow' },
];

const CATEGORIES = ['All', 'AI Services', 'Workflow'];

const ServicesPublicPage = () => {
  const [services, setServices] = useState(FALLBACK);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const params = {
          page,
          limit: 6,
          active: true
        };
        if (category !== 'All') params.category = category;

        const res = await api.get('/services', { params });
        if (res.data.data.length || category !== 'All' || page > 1) {
          setServices(res.data.data);
          setPagination(res.data.pagination);
        }
      } catch (err) {
        console.error('Failed to fetch services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [category, page]);

  const filtered = services.filter(s => {
    if (!search) return true;
    return s.title.toLowerCase().includes(search.toLowerCase()) ||
           s.description.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div style={{ background: 'var(--bg-void)', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: '68px' }}>

        {/* Header */}
        <div style={{ padding: '80px 5% 60px', textAlign: 'center', background: 'var(--bg-void)' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: '700', marginBottom: '40px' }}>
            Our Automation Services
          </h1>

          {/* Search bar — exact match to screenshot */}
          <div style={{ position: 'relative', maxWidth: '560px', margin: '0 auto 28px' }}>
            <Search size={18} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search services by name or description..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '16px 18px 16px 50px',
                background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
                borderRadius: '50px', color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)', fontSize: '0.95rem', outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--gold-border-strong)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
            />
          </div>

          {/* Category filter pills — matches screenshot */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: '10px 22px',
                  borderRadius: '50px',
                  border: '2px solid',
                  borderColor: category === cat ? 'var(--gold)' : 'rgba(255,255,255,0.15)',
                  background: category === cat ? 'var(--gold)' : 'transparent',
                  color: category === cat ? '#0a0a0a' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: '600', fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div style={{ padding: '0 5% 100px', maxWidth: '1280px', margin: '0 auto' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
              <div className="spinner" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <Zap size={40} style={{ opacity: 0.2 }} />
              <p>No services match your search</p>
            </div>
          ) : (
            <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {filtered.map((s, i) => {
                const Icon = iconMap[s.icon] || Zap;
                return (
                  <div key={s._id}
                    style={{
                      background: s.featured ? 'linear-gradient(145deg, #161408, #111)' : 'var(--bg-card)',
                      border: `1px solid ${s.featured ? 'var(--gold-border-strong)' : 'rgba(255,255,255,0.07)'}`,
                      borderRadius: 'var(--radius-lg)', padding: '32px 28px',
                      position: 'relative', transition: 'all 0.3s ease',
                      animation: `fadeInUp 0.5s ease ${i * 0.07}s both`,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-border-strong)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(201,168,76,0.12)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = s.featured ? 'var(--gold-border-strong)' : 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    {s.featured && (
                      <div style={{
                        position: 'absolute', top: '16px', right: '16px',
                        background: 'var(--gold)', color: '#0a0a0a',
                        padding: '4px 14px', borderRadius: '50px',
                        fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.05em',
                      }}>
                        Most Popular
                      </div>
                    )}

                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px',
                      color: s.featured ? 'var(--gold)' : 'var(--text-primary)',
                    }}>
                      {s.title}
                    </h3>
                    <p style={{
                      color: s.featured ? 'rgba(201,168,76,0.75)' : 'var(--text-secondary)',
                      fontSize: '0.9rem', lineHeight: '1.65', marginBottom: '28px',
                    }}>
                      {s.description}
                    </p>

                    <button
                      className="btn btn-gold"
                      style={{ width: '100%', justifyContent: 'center', borderRadius: '50px', fontSize: '0.82rem', letterSpacing: '0.08em' }}
                      onClick={() => navigate('/contact-page')}
                    >
                      GET THE SERVICE
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {pagination.pages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '50px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  disabled={page === 1}
                  onClick={() => setPage(prev => prev - 1)}
                >
                  Previous
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Page {page} of {pagination.pages}
                </div>
                <button
                  className="btn btn-secondary btn-sm"
                  disabled={page === pagination.pages}
                  onClick={() => setPage(prev => prev + 1)}
                >
                  Next
                </button>
              </div>
            )}
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '48px 5%', background: 'var(--bg-deep)', textAlign: 'center' }}>
        <div style={{ marginBottom: '8px' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--gold)' }}>K8</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>Automation Solutions Developer | n8n Specialist</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>© 2026 K8 Automation Solutions. All rights reserved. | Developed with ❤️ by K8</p>
      </footer>
    </div>
  );
};

export default ServicesPublicPage;