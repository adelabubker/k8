// src/components/Sidebar.jsx — Gold-themed admin sidebar
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { LayoutDashboard, Zap, PlusCircle, Users, Settings, LogOut, ChevronRight, X, Shield } from 'lucide-react';

const Sidebar = () => {
  const { user, logout, isFullAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { to: '/dashboard/services', icon: Zap, label: 'Services' },
    { to: '/dashboard/services/add', icon: PlusCircle, label: 'Add Service' },
    ...(isFullAdmin ? [
      { to: '/dashboard/users', icon: Users, label: 'Users' },
      { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
    ] : []),
  ];

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="hidden-mobile" style={{
      width: collapsed ? '68px' : '232px',
      background: '#0d0d0d',
      borderRight: '1px solid rgba(201,168,76,0.1)',
      height: '100vh', position: 'sticky', top: 0,
      transition: 'width 0.3s ease', flexShrink: 0,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: 'absolute', right: '-12px', top: '22px',
          background: '#1a1a1a', border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: '50%', width: '24px', height: '24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--gold)', zIndex: 10,
        }}
      >
        {collapsed ? <ChevronRight size={11} /> : <X size={11} />}
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px 14px' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', padding: '0 4px' }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '8px', flexShrink: 0,
            background: 'var(--gold)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Rajdhani, sans-serif', fontWeight: '700', fontSize: '1rem', color: '#0a0a0a',
          }}>
            K8
          </div>
          {!collapsed && (
            <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: '700', fontSize: '1.1rem', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
              Admin Panel
            </span>
          )}
        </div>

        {/* Role badge */}
        {!collapsed && (
          <div style={{ marginBottom: '20px', padding: '0 4px' }}>
            <span className={`badge badge-${user?.role}`} style={{ display: 'inline-flex', gap: '5px', alignItems: 'center' }}>
              <Shield size={9} />
              {isFullAdmin ? 'Full Admin' : user?.role === 'admin' ? 'Admin' : 'User'}
            </span>
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = isActive(to);
            return (
              <Link key={to} to={to} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: collapsed ? '12px' : '11px 14px',
                borderRadius: '9px',
                color: active ? 'var(--gold)' : 'var(--text-secondary)',
                background: active ? 'rgba(201,168,76,0.1)' : 'transparent',
                border: `1px solid ${active ? 'rgba(201,168,76,0.2)' : 'transparent'}`,
                transition: 'all 0.2s ease',
                textDecoration: 'none', fontSize: '0.88rem', fontWeight: active ? '600' : '400',
                justifyContent: collapsed ? 'center' : 'flex-start',
              }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text-primary)'; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; } }}
              >
                <Icon size={17} style={{ flexShrink: 0 }} />
                {!collapsed && <span>{label}</span>}
                {!collapsed && active && <ChevronRight size={13} style={{ marginLeft: 'auto' }} />}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
          {!collapsed && (
            <div style={{ padding: '8px 14px', marginBottom: '6px' }}>
              <div style={{ fontSize: '0.87rem', fontWeight: '500' }}>{user?.name}</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>{user?.email}</div>
            </div>
          )}
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: collapsed ? '11px' : '11px 14px',
            width: '100%', borderRadius: '9px',
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: '#f87171', fontSize: '0.88rem',
            justifyContent: collapsed ? 'center' : 'flex-start',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,38,38,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <LogOut size={17} />
            {!collapsed && 'Logout'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;