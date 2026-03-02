// src/main.jsx — React app entry point
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0f0f1a',
              color: '#e2e8f0',
              border: '1px solid rgba(99, 179, 237, 0.2)',
              fontFamily: 'Inter, sans-serif',
            },
            success: { iconTheme: { primary: '#00ffcc', secondary: '#0f0f1a' } },
            error: { iconTheme: { primary: '#ff4d6d', secondary: '#0f0f1a' } },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
