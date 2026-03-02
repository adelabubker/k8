// src/components/ProtectedRoute.jsx — Role-based route protection
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading, isAuthenticated, isAdmin, isFullAdmin } = useAuth();
  const location = useLocation();

  // Show spinner while restoring session
  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg-void)' }}>
        <div className="spinner" />
      </div>
    );
  }

  // Not authenticated → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role check: fullAdmin required
  if (requiredRole === 'fullAdmin' && !isFullAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Role check: admin or above required
  if (requiredRole === 'admin' && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
