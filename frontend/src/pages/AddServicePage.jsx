// src/pages/AddServicePage.jsx — Create new service form
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { toast } from 'react-hot-toast';
import api from '../utils/api';
import { Save, ArrowLeft, Zap, Code2, Globe, Cpu, Shield, Star, TrendingUp } from 'lucide-react';

const ICON_OPTIONS = ['zap', 'code2', 'globe', 'bot', 'workflow', 'shield', 'star', 'trending'];

const AddServicePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Workflow',
    location: 'services',
    icon: 'zap',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      return toast.error('Title and description are required');
    }

    setLoading(true);
    try {
      await api.post('/services', form);
      toast.success('Service created successfully!');
      navigate('/dashboard/services');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div style={{ animation: 'fadeIn 0.4s ease', maxWidth: '680px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigate('/dashboard/services')}
            style={{ marginBottom: '20px' }}
          >
            <ArrowLeft size={14} /> Back to Services
          </button>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px' }}>Add New Service</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Create a new service to display on the public website.
          </p>
        </div>

        {/* Form Card */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)', padding: '36px',
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Title */}
            <div className="form-group">
              <label className="form-label">Service Title *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Workflow Automation"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                maxLength={100}
              />
              <small style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{form.title.length}/100 characters</small>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                className="form-textarea"
                placeholder="Describe what this service offers..."
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                maxLength={1000}
                rows={5}
              />
              <small style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{form.description.length}/1000 characters</small>
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
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setForm({ ...form, icon })}
                    style={{
                      padding: '8px 14px', borderRadius: 'var(--radius-md)',
                      border: `1px solid ${form.icon === icon ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                      background: form.icon === icon ? 'rgba(0,255,204,0.1)' : 'var(--bg-elevated)',
                      color: form.icon === icon ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      cursor: 'pointer', fontSize: '0.82rem', fontFamily: 'var(--font-body)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div style={{
              background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)',
              padding: '20px', border: '1px solid var(--border-subtle)',
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '600' }}>
                Preview
              </div>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                  background: 'rgba(0,255,204,0.1)', border: '1px solid rgba(0,255,204,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
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
                  <div style={{ fontWeight: '600', marginBottom: '4px', fontSize: '0.95rem' }}>
                    {form.title || 'Service Title'}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                    {form.description || 'Service description will appear here...'}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '8px' }}>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard/services')}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <div className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }} />
                ) : (
                  <><Save size={15} /> Create Service</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddServicePage;