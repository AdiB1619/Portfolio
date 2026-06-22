import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from './ui/Modal';
import { useAuth } from '../context/AuthContext';
import { Search, LayoutDashboard, FolderKanban, MessageSquare, LogOut } from 'lucide-react';
import { cn } from '../utils/cn';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const actions = [
    { id: 'dashboard', label: 'Go to Dashboard', icon: LayoutDashboard, shortcut: '⌘D', onSelect: () => navigate('/admin') },
    { id: 'projects', label: 'Go to Projects', icon: FolderKanban, shortcut: '⌘P', onSelect: () => navigate('/admin/projects') },
    { id: 'messages', label: 'Go to Messages', icon: MessageSquare, shortcut: '⌘M', onSelect: () => navigate('/admin/messages') },
    { id: 'logout', label: 'Logout', icon: LogOut, shortcut: 'Esc', onSelect: logout },
  ];

  const filteredActions = query === '' 
    ? actions 
    : actions.filter((action) => action.label.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (action) => {
    setIsOpen(false);
    setQuery('');
    action.onSelect();
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="max-w-2xl p-0 overflow-hidden bg-background/90 backdrop-blur-2xl border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
      <div className="flex items-center border-b border-white/5 px-5 bg-white/5">
        <Search className="h-5 w-5 text-muted mr-3 shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a command or search..."
          className="flex h-16 w-full bg-transparent text-white placeholder:text-muted focus:outline-none text-base"
          autoFocus
        />
      </div>
      <div className="max-h-[60vh] overflow-y-auto p-3 custom-scrollbar">
        {filteredActions.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted">No results found for "{query}".</p>
        ) : (
          <div className="flex flex-col gap-1">
            {filteredActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleSelect(action)}
                className="group flex items-center justify-between w-full rounded-lg px-4 py-3 text-sm font-medium text-text-main transition-all duration-200 hover:bg-hover-surface focus:bg-hover-surface focus:outline-none"
              >
                <div className="flex items-center">
                  <action.icon className="h-[18px] w-[18px] mr-3 text-muted group-hover:text-white transition-colors" />
                  {action.label}
                </div>
                {action.shortcut && (
                  <kbd className="hidden sm:inline-flex items-center justify-center rounded border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-medium text-muted group-hover:text-white transition-colors">
                    {action.shortcut}
                  </kbd>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
