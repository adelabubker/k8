// src/components/DashboardLayout.jsx — Dashboard shell with sidebar
import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg-void)' }}>
      <Sidebar />
      <main style={{
        flex: 1, overflow: 'auto',
        padding: 'clamp(20px, 5vw, 36px)',
        background: 'var(--bg-void)',
      }}>
        {/* Mobile Dashboard Header */}
        <div className="show-mobile" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '8px',
            background: 'var(--gold)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Rajdhani, sans-serif', fontWeight: '700', fontSize: '1rem', color: '#0a0a0a',
          }}>
            K8
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => window.location.href = '/'}
            style={{ borderRadius: '6px' }}
          >
            Exit
          </button>
        </div>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;