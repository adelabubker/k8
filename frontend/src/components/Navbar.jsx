// src/components/Navbar.jsx — Matches screenshot design: K8 left, nav center, Login right
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { LayoutDashboard, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services-page' },
    { label: 'Success', href: '/success-page' },
    { label: 'Contact', href: '/contact-page' },
  ];

  const isActive = (href) => location.pathname === href;

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
    navigate('/');
    setMobileOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled || mobileOpen ? 'rgba(10,10,10,0.98)' : 'rgba(10,10,10,0.5)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled || mobileOpen ? '1px solid rgba(201,168,76,0.1)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        padding: '0 5%',
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '68px',
        }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: '700', fontSize: '1.6rem',
              color: 'var(--text-primary)',
              letterSpacing: '0.02em',
            }}>K8</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                to={href}
                style={{
                  color: isActive(href) ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontSize: '0.92rem',
                  fontWeight: isActive(href) ? '600' : '400',
                  transition: 'color 0.2s',
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right Section: Desktop */}
          <div className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigate('/dashboard')}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '6px' }}
                  >
                    <LayoutDashboard size={14} /> Dashboard
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary btn-sm"
                  style={{ borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <LogOut size={14} /> Logout
                </button>
              </>
            ) : (
              <button
                className="btn btn-outline-gold btn-sm"
                onClick={() => navigate('/login')}
                style={{ borderRadius: '50px', padding: '8px 24px' }}
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="show-mobile"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0, top: '68px', zIndex: 999,
          background: 'var(--bg-void)',
          display: 'flex', flexDirection: 'column', padding: '40px 5%', gap: '24px',
          animation: 'fadeInUp 0.3s ease forwards',
        }}>
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: '1.5rem', fontWeight: '600',
                color: isActive(href) ? 'var(--gold)' : 'var(--text-primary)',
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '40px' }}>
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <button className="btn btn-primary" onClick={() => { navigate('/dashboard'); setMobileOpen(false); }}>
                    Go to Dashboard
                  </button>
                )}
                <button className="btn btn-secondary" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <button className="btn btn-gold" onClick={() => { navigate('/login'); setMobileOpen(false); }}>
                Login / Register
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;