// src/App.jsx — Application routing with all public + admin routes
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Public pages
import HomePage from './pages/HomePage';
import ServicesPublicPage from './pages/ServicesPublicPage';
import SuccessPage from './pages/SuccessPage';
import ContactPage from './pages/ContactPage';

// Auth pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Dashboard pages
import DashboardPage from './pages/DashboardPage';
import ServicesPage from './pages/ServicesPage';
import AddServicePage from './pages/AddServicePage';
import EditServicePage from './pages/EditServicePage';
import UsersPage from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage';

// Route guard
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a0a0a' }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <Routes>
      {/* ── Public ───────────────────────────────────────── */}
      <Route path="/" element={<HomePage />} />
      <Route path="/services-page" element={<ServicesPublicPage />} />
      <Route path="/success-page" element={<SuccessPage />} />
      <Route path="/contact-page" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* ── Admin (admin + fullAdmin) ─────────────────────── */}
      <Route path="/dashboard" element={<ProtectedRoute requiredRole="admin"><DashboardPage /></ProtectedRoute>} />
      <Route path="/dashboard/services" element={<ProtectedRoute requiredRole="admin"><ServicesPage /></ProtectedRoute>} />
      <Route path="/dashboard/services/add" element={<ProtectedRoute requiredRole="admin"><AddServicePage /></ProtectedRoute>} />
      <Route path="/dashboard/services/edit/:id" element={<ProtectedRoute requiredRole="admin"><EditServicePage /></ProtectedRoute>} />

      {/* ── Full Admin only ───────────────────────────────── */}
      <Route path="/dashboard/users" element={<ProtectedRoute requiredRole="fullAdmin"><UsersPage /></ProtectedRoute>} />
      <Route path="/dashboard/settings" element={<ProtectedRoute requiredRole="fullAdmin"><SettingsPage /></ProtectedRoute>} />

      {/* ── Fallback ──────────────────────────────────────── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
