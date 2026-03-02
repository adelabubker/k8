// src/context/AuthContext.jsx — Global authentication state
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // True while checking stored token

  // ── Auto-login: restore session from localStorage on app mount ────────────
  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem('k8_token');
      const storedUser = localStorage.getItem('k8_user');

      if (storedToken && storedUser) {
        try {
          // Verify token is still valid with backend
          const res = await api.get('/auth/me');
          setUser(res.data.data);
        } catch {
          // Token invalid or expired — clear storage
          localStorage.removeItem('k8_token');
          localStorage.removeItem('k8_user');
        }
      }
      setLoading(false);
    };

    restoreSession();
  }, []);

  // ── Login: store token + user in state and localStorage ──────────────────
  const login = useCallback((userData) => {
    const { token, ...userInfo } = userData;
    localStorage.setItem('k8_token', token);
    localStorage.setItem('k8_user', JSON.stringify(userInfo));
    setUser(userInfo);
  }, []);

  // ── Logout: clear token from backend + localStorage ───────────────────────
  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('k8_token');
      localStorage.removeItem('k8_user');
      setUser(null);
    }
  }, []);

  // ── Role helpers ──────────────────────────────────────────────────────────
  const isFullAdmin = user?.role === 'fullAdmin';
  const isAdmin = user?.role === 'admin' || isFullAdmin;
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isFullAdmin, isAdmin, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy consumption
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export default AuthContext;
