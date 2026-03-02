// src/pages/DashboardPage.jsx — Admin dashboard overview
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import { Zap, Users, PlusCircle, TrendingUp, Activity, Clock, ArrowRight } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color, trend }) => (
  <div style={{
    background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-lg)', padding: '24px',
    transition: 'all 0.3s ease', cursor: 'default',
  }}
    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-mid)'}
    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
      <div style={{
        width: '40px', height: '40px', borderRadius: '10px',
        background: `${color}15`, border: `1px solid ${color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={18} style={{ color }} />
      </div>
      {trend && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          fontSize: '0.75rem', color: '#34d399', fontWeight: '600',
        }}>
          <TrendingUp size={12} /> {trend}
        </div>
      )}
    </div>
    <div style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: '700', marginBottom: '4px', color }}>
      {value}
    </div>
    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{label}</div>
  </div>
);

const DashboardPage = () => {
  const { user, isFullAdmin } = useAuth();
  const [stats, setStats] = useState({ services: 0, users: 0 });
  const [recentServices, setRecentServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes] = await Promise.all([api.get('/services')]);
        setStats(prev => ({ ...prev, services: servicesRes.data.count }));
        setRecentServices(servicesRes.data.data.slice(0, 5));

        if (isFullAdmin) {
          const usersRes = await api.get('/users');
          setStats(prev => ({ ...prev, users: usersRes.data.count }));
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isFullAdmin]);

  return (
    <DashboardLayout>
      <div style={{ animation: 'fadeIn 0.4s ease' }}>
        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px' }}>
            Welcome back, <span style={{ color: 'var(--accent-primary)' }}>{user?.name?.split(' ')[0]}</span> 👋
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Here's what's happening in your automation platform.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '36px' }}>
          <StatCard icon={Zap} label="Total Services" value={stats.services} color="var(--accent-primary)"  />
          {isFullAdmin && <StatCard icon={Users} label="Total Users" value={stats.users} color="#a78bfa"  />}
          <StatCard icon={Activity} label="Active Workflows" value="24" color="#60a5fa" />
          <StatCard icon={Clock} label="Hours Saved (mo.)" value="480h" color="#f59e0b" />
        </div>

        {/* Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Recent Services */}
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)', padding: '24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '700' }}>Recent Services</h2>
              <Link to="/dashboard/services" style={{
                fontSize: '0.8rem', color: 'var(--accent-primary)', display: 'flex',
                alignItems: 'center', gap: '4px', textDecoration: 'none',
              }}>
                View all <ArrowRight size={12} />
              </Link>
            </div>

            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                <div className="spinner" />
              </div>
            ) : recentServices.length === 0 ? (
              <div className="empty-state">
                <Zap size={32} style={{ opacity: 0.3 }} />
                <p style={{ fontSize: '0.9rem' }}>No services yet</p>
                <Link to="/dashboard/services/add">
                  <button className="btn btn-primary btn-sm">Add First Service</button>
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recentServices.map((service) => (
                  <div key={service._id} style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '12px', background: 'var(--bg-elevated)',
                    borderRadius: 'var(--radius-md)',
                  }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px',
                      background: 'rgba(0,255,204,0.1)', border: '1px solid rgba(0,255,204,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <Zap size={14} style={{ color: 'var(--accent-primary)' }} />
                    </div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {service.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {service.location}
                      </div>
                    </div>
                    <span className={`badge badge-${service.location}`}>{service.location}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)', padding: '24px',
          }}>
            <h2 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '20px' }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { to: '/dashboard/services/add', icon: PlusCircle, label: 'Add New Service', desc: 'Create and publish a service', color: 'var(--accent-primary)' },
                { to: '/dashboard/services', icon: Zap, label: 'Manage Services', desc: 'Edit or delete existing services', color: '#a78bfa' },
                ...(isFullAdmin ? [{ to: '/dashboard/users', icon: Users, label: 'Manage Users', desc: 'View and manage all users', color: '#60a5fa' }] : []),
              ].map(({ to, icon: Icon, label, desc, color }) => (
                <Link key={to} to={to} style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '16px', background: 'var(--bg-elevated)',
                    borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)',
                    cursor: 'pointer', transition: 'all 0.2s ease',
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-mid)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                  >
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '10px',
                      background: `${color}15`, border: `1px solid ${color}25`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <Icon size={16} style={{ color }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{label}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>{desc}</div>
                    </div>
                    <ArrowRight size={14} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
