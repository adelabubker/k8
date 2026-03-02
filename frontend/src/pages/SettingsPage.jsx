// src/pages/SettingsPage.jsx — Full admin system settings
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { Shield, Info, Zap, User } from 'lucide-react';

const SettingsPage = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div style={{ animation: 'fadeIn 0.4s ease', maxWidth: '700px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px' }}>Settings</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>System configuration (Full Admin only)</p>
        </div>

        {/* Account Info */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '28px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <User size={18} style={{ color: 'var(--accent-primary)' }} />
            <h2 style={{ fontSize: '1rem', fontWeight: '700' }}>Your Account</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { label: 'Name', value: user?.name },
              { label: 'Email', value: user?.email },
              { label: 'Role', value: user?.role },
              { label: 'User ID', value: user?._id?.slice(-8) + '...' },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: 'var(--bg-elevated)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
                <div style={{ fontSize: '0.92rem', fontWeight: '500' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* System Info */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '28px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Info size={18} style={{ color: '#60a5fa' }} />
            <h2 style={{ fontSize: '1rem', fontWeight: '700' }}>System Information</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Platform', value: 'K8 Automation v1.0.0' },
              { label: 'Backend', value: 'Node.js + Express.js' },
              { label: 'Database', value: 'MongoDB + Mongoose' },
              { label: 'Auth', value: 'JWT + bcrypt' },
              { label: 'Frontend', value: 'React + Vite' },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{label}</span>
                <span style={{ fontSize: '0.88rem', fontWeight: '500', fontFamily: 'monospace', color: 'var(--accent-primary)' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Permissions Overview */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Shield size={18} style={{ color: 'var(--accent-primary)' }} />
            <h2 style={{ fontSize: '1rem', fontWeight: '700' }}>Role Permissions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { role: 'fullAdmin', label: 'Full Admin', perms: 'All access: users, services, delete, role change, settings', color: 'var(--accent-primary)' },
              { role: 'admin', label: 'Admin', perms: 'Add/edit services. Cannot delete or manage users.', color: '#f59e0b' },
              { role: 'user', label: 'User', perms: 'View public site only. No dashboard access.', color: '#a78bfa' },
            ].map(({ role, label, perms, color }) => (
              <div key={role} style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', border: `1px solid ${color}20` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <span className={`badge badge-${role}`}>{label}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{perms}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
