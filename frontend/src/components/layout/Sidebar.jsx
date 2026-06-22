import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, FolderKanban, MessageSquare, LogOut, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
  { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
];

export function Sidebar({ isCollapsed }) {
  const { logout } = useAuth();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="hidden md:flex h-screen flex-col border-r border-border bg-[#09090B] z-20 flex-shrink-0"
    >
      <div className="flex h-16 items-center px-6 border-b border-border border-opacity-50">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap pl-1">
          <div className="h-7 w-7 rounded-[6px] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] ring-1 ring-black/20">
            <div className="h-2 w-2 rounded-full bg-white shadow-sm"></div>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-semibold text-white tracking-tight leading-tight">Theranix</span>
              <span className="text-[10px] text-muted tracking-widest uppercase font-medium">Workspace</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 group relative",
                  isActive 
                    ? "bg-elevated-surface text-white font-medium shadow-sm border border-border" 
                    : "text-muted hover:bg-hover-surface hover:text-white border border-transparent"
                )
              }
              title={isCollapsed ? item.name : undefined}
            >
              <Icon size={20} className="shrink-0" />
              {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
            </NavLink>
          );
        })}
      </div>

      <div className="p-3 border-t border-border border-opacity-50 flex flex-col gap-1">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-muted transition-colors hover:bg-white/5 hover:text-white"
          title={isCollapsed ? "Logout" : undefined}
        >
          <LogOut size={20} className="shrink-0" />
          {!isCollapsed && <span className="whitespace-nowrap">Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}
