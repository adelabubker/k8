// src/pages/RegisterPage.jsx — Gold design register page
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import api from '../utils/api';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const RegisterPage = () => {
  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const confirmRef = useRef('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nameRef.current.value || !emailRef.current.value || !passwordRef.current.value) return toast.error('Please fill all fields');
    if (passwordRef.current.value.length < 6) return toast.error('Password must be at least 6 characters');
    if (passwordRef.current.value !== confirmRef.current.value) return toast.error('Passwords do not match');

    setLoading(true);
    try {
      const res = await api.post('/auth/register', { name: nameRef.current.value, email: emailRef.current.value, password: passwordRef.current.value });
      login(res.data.data);
      toast.success('Welcome to K8 Automation!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const baseInputStyle = {
    width: '100%', padding: '14px 16px 14px 44px',
    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '10px', color: '#ffffff',
    fontFamily: 'Inter, sans-serif', fontSize: '0.95rem',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
    caretColor: '#ffeb3b',
  };

  const Field = ({ icon: Icon, label, inputRef, name, type, placeholder, suffix }) => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div style={{ position: 'relative' }}>
        <Icon size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
        <input
          ref={inputRef}
          type={(name === 'password' || name === 'confirm') && showPass ? 'text' : type}
          style={{ ...baseInputStyle, paddingRight: suffix ? '44px' : '16px' }}
          placeholder={placeholder}
          defaultValue=""
          onFocus={e => {
            e.target.style.borderColor = 'rgba(201,168,76,0.6)';
            e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.15)';
          }}
          onBlur={e => {
            e.target.style.borderColor = 'rgba(255,255,255,0.15)';
            e.target.style.boxShadow = 'none';
          }}
        />
        {suffix && (
          <button type="button" onClick={() => setShowPass(!showPass)}
            style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-void)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.025,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      <div style={{ position: 'absolute', bottom: '-100px', right: '30%', width: '500px', height: '400px',
        background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '480px', position: 'relative', animation: 'fadeInUp 0.5s ease' }}>
        <div style={{
          background: '#111111', border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: '20px', padding: '48px 40px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Link to="/"><div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2.4rem', fontWeight: '700', color: 'var(--gold)', marginBottom: '14px' }}>K8</div></Link>
            <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.7rem', fontWeight: '700', marginBottom: '6px' }}>Create Account</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Start automating your workflows today</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <Field icon={User} label="Full Name" inputRef={nameRef} name="name" type="text" placeholder="Your Name" />
            <Field icon={Mail} label="Email Address" inputRef={emailRef} name="email" type="email" placeholder="you@company.com" />
            <Field icon={Lock} label="Password" inputRef={passwordRef} name="password" type="password" placeholder="Min. 6 characters" suffix={true} />
            <Field icon={Lock} label="Confirm Password" inputRef={confirmRef} name="confirm" type="password" placeholder="Repeat password" suffix={true} />

            <button type="submit" disabled={loading}
              style={{
                width: '100%', padding: '15px',
                background: loading ? 'var(--gold-dark)' : 'var(--gold)',
                color: '#0a0a0a', border: 'none', borderRadius: '50px',
                fontFamily: 'Inter, sans-serif', fontWeight: '700',
                fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s ease', marginTop: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'var(--gold-light)'; }}
              onMouseLeave={e => e.currentTarget.style.background = loading ? 'var(--gold-dark)' : 'var(--gold)'}
            >
              {loading ? <div className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }} /> : <><ArrowRight size={16} /> Create Account</>}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--gold)', fontWeight: '600' }}>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
