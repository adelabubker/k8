// src/pages/LoginPage.jsx — Gold design auth page
import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import api from '../utils/api';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailRef.current.value || !passwordRef.current.value) return toast.error('Please fill in all fields');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email: emailRef.current.value, password: passwordRef.current.value });
      login(res.data.data);
      toast.success(`Welcome back, ${res.data.data.name}!`);
      const role = res.data.data.role;
      navigate(role === 'user' ? (from !== '/login' ? from : '/') : '/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '14px 16px 14px 44px',
    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '10px', color: '#ffffff',
    fontFamily: 'Inter, sans-serif', fontSize: '0.95rem',
    outline: 'none', transition: 'border-color 0.2s',
    caretColor: '#ffeb3b', // Bright yellow cursor for maximum visibility
  };

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-void)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle background pattern */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.025,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      {/* Gold glow top */}
      <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px',
        background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '440px', position: 'relative', animation: 'fadeInUp 0.5s ease' }}>
        {/* Card */}
        <div style={{
          background: '#111111', border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: '20px', padding: '48px 40px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(201,168,76,0.04)',
        }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2.4rem', fontWeight: '700', color: 'var(--gold)', lineHeight: '1', marginBottom: '16px' }}>K8</div>
            </Link>
            <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.7rem', fontWeight: '700', marginBottom: '6px' }}>Welcome Back</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input ref={emailRef} type="email" style={inputStyle} placeholder="you@ex.com" defaultValue=""
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(201,168,76,0.6)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.15)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input ref={passwordRef} type={showPassword ? 'text' : 'password'} style={{ ...inputStyle, paddingRight: '44px' }}
                  placeholder="Enter your password" defaultValue=""
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(201,168,76,0.6)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.15)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              style={{
                width: '100%', padding: '15px',
                background: loading ? 'var(--gold-dark)' : 'var(--gold)',
                color: '#0a0a0a', border: 'none', borderRadius: '50px',
                fontFamily: 'Inter, sans-serif', fontWeight: '700',
                fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease', marginTop: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'var(--gold-light)'; }}
              onMouseLeave={e => e.currentTarget.style.background = loading ? 'var(--gold-dark)' : 'var(--gold)'}
            >
              {loading ? <div className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }} /> : <><ArrowRight size={16} /> Sign In</>}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '28px', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--gold)', fontWeight: '600' }}>Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
