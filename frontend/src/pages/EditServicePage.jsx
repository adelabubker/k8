// src/pages/EditServicePage.jsx — Edit existing service
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { toast } from 'react-hot-toast';
import api from '../utils/api';
import { Save, ArrowLeft, Zap, ToggleLeft, ToggleRight, Code2, Globe, Cpu, Shield, Star, TrendingUp } from 'lucide-react';

const ICON_OPTIONS = ['zap', 'code2', 'globe', 'bot', 'workflow', 'shield', 'star', 'trending'];

const EditServicePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', description: '', location: 'services', icon: 'zap', isActive: true });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Load existing service
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${id}`);
        const s = res.data.data;
        setForm({
          title: s.title,
          description: s.description,
          category: s.category || 'Workflow',
          location: s.location,
          icon: s.icon || 'zap',
          isActive: s.isActive
        });
      } catch {
        toast.error('Failed to load service');
        navigate('/dashboard/services');
      } finally {
        setFetching(false);
      }
    };
    fetchService();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return toast.error('Title and description are required');

    setLoading(true);
    try {
      await api.put(`/services/${id}`, form);
      toast.success('Service updated!');
      navigate('/dashboard/services');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <DashboardLayout>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '80px' }}>
          <div className="spinner" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div style={{ animation: 'fadeIn 0.4s ease', maxWidth: '680px' }}>
        <div style={{ marginBottom: '32px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/dashboard/services')} style={{ marginBottom: '20px' }}>
            <ArrowLeft size={14} /> Back to Services
          </button>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px' }}>Edit Service</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Update service details below.</p>
        </div>

        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)', padding: '36px',
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Title */}
            <div className="form-group">
              <label className="form-label">Service Title *</label>
              <input
                type="text" className="form-input" placeholder="e.g. Workflow Automation"
                value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} maxLength={100}
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                className="form-textarea" placeholder="Describe the service..."
                value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={5} maxLength={1000}
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                className="form-select"
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
              >
                <option value="Workflow">Workflow</option>
                <option value="AI Services">AI Services</option>
              </select>
            </div>

            {/* Location */}
            <div className="form-group">
              <label className="form-label">Display Location *</label>
              <select
                className="form-select"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
              >
                <option value="services">Services Page</option>
                <option value="home">Home Page</option>
                <option value="hero">Hero Section</option>
                <option value="featured">Featured Section</option>
              </select>
            </div>

            {/* Icon */}
            <div className="form-group">
              <label className="form-label">Icon</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {ICON_OPTIONS.map(icon => (
                  <button key={icon} type="button" onClick={() => setForm({ ...form, icon })} style={{
                    padding: '8px 14px', borderRadius: 'var(--radius-md)',
                    border: `1px solid ${form.icon === icon ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                    background: form.icon === icon ? 'rgba(0,255,204,0.1)' : 'var(--bg-elevated)',
                    color: form.icon === icon ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    cursor: 'pointer', fontSize: '0.82rem', fontFamily: 'var(--font-body)', transition: 'all 0.2s ease',
                  }}>
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontWeight: '500', marginBottom: '2px' }}>Service Active</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Controls visibility on the public site</div>
              </div>
              <button type="button" onClick={() => setForm({ ...form, isActive: !form.isActive })} style={{ background: 'none', border: 'none', cursor: 'pointer', color: form.isActive ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
                {form.isActive ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
              </button>
            </div>

            {/* Preview */}
            <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '600' }}>Preview</div>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0, background: 'rgba(0,255,204,0.1)', border: '1px solid rgba(0,255,204,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {(() => {
                    const ICON_MAP = {
                      zap: Zap,
                      code2: Code2,
                      globe: Globe,
                      bot: Cpu,
                      workflow: Zap,
                      shield: Shield,
                      star: Star,
                      trending: TrendingUp,
                    };
                    const I = ICON_MAP[form.icon] || Zap;
                    return <I size={18} style={{ color: 'var(--accent-primary)' }} />;
                  })()}
                </div>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>{form.title}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>{form.description}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard/services')}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <div className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }} /> : <><Save size={15} /> Save Changes</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditServicePage;