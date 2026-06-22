import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { CommandPalette } from '../components/CommandPalette';
import { useAuth } from '../context/AuthContext';
import { Menu, Search, Bell } from 'lucide-react';

export function AdminLayout() {
  const { user, loading } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  if (loading) return null; // Or a full screen loader

  // Protected route check
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/30">
      <CommandPalette />
      
      <Sidebar isCollapsed={isSidebarCollapsed} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex-shrink-0 border-b border-border bg-background/80 backdrop-blur-md px-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="text-muted hover:text-white transition-colors hidden md:block"
              >
                <Menu size={20} />
              </button>
              
              <div className="hidden lg:flex items-center gap-2 text-sm text-muted">
                <span className="text-white font-medium">Admin</span>
                <span className="text-border">/</span>
                <span className="capitalize">{location.pathname.split('/').pop() || 'Dashboard'}</span>
              </div>
            </div>
            
            <button 
              className="hidden sm:flex items-center justify-between w-[350px] min-h-[46px] text-sm text-muted bg-surface/40 border border-border rounded-xl px-4 py-2 hover:bg-surface/80 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(79,70,229,0.15)] focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-300 backdrop-blur-lg"
              onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
            >
              <div className="flex items-center gap-3">
                <Search size={16} className="text-muted group-hover:text-primary transition-colors" />
                <span className="font-medium tracking-wide">Search anywhere...</span>
              </div>
              <kbd className="bg-background px-2 py-1 rounded-md text-[11px] font-semibold border border-border/50 text-muted shadow-sm">⌘K</kbd>
            </button>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-emerald-500">System Operational</span>
            </div>

            <button className="h-10 w-10 flex items-center justify-center rounded-full bg-surface border border-border text-muted hover:text-white hover:border-primary/50 transition-all relative shadow-sm">
              <Bell size={18} />
              <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-primary border border-surface shadow-[0_0_8px_rgba(79,70,229,0.8)]"></span>
            </button>

            <div className="h-5 w-px bg-border hidden sm:block"></div>

            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold text-white leading-none mb-1">Aditya</div>
                <div className="text-xs font-medium text-muted leading-none">Admin</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-surface border-2 border-border flex items-center justify-center group-hover:border-primary/50 transition-colors shadow-sm">
                <span className="text-sm font-bold text-white">{user.email?.charAt(0).toUpperCase()}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-background p-6 lg:p-10 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
