import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AdminLayout } from './layouts/AdminLayout';
import { PublicLayout } from './layouts/PublicLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { Messages } from './pages/Messages';
import { Portfolio } from './pages/public/Portfolio';
import ProtectedRoute from './routes/ProtectedRoute';

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* ── Public portfolio — zero auth calls ─────────────────── */}
            <Route
              path="/"
              element={
                <PublicLayout>
                  <Portfolio />
                </PublicLayout>
              }
            />

            {/* ── Admin area — AuthProvider scoped here only ──────────── */}
            <Route
              path="/admin/login"
              element={
                <AuthProvider>
                  <Login />
                </AuthProvider>
              }
            />

            <Route
              path="/admin"
              element={
                <AuthProvider>
                  <ProtectedRoute />
                </AuthProvider>
              }
            >
              <Route element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="projects" element={<Projects />} />
                <Route path="messages" element={<Messages />} />
              </Route>
            </Route>

            {/* ── Fallback ────────────────────────────────────────────── */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)'
              }
            }}
          />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}


