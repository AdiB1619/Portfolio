import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Inbox, Trash2, CheckCircle2, ChevronRight, Mail, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { PageLoader } from '../components/ui/Loader';
import { cn } from '../utils/cn';
import { toast } from 'sonner';
import api from '../api/axios';

export function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [actioning, setActioning] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data } = await api.get('/messages');
      const fetchedMessages = data.data.messages || [];
      setMessages(fetchedMessages);
      if (selectedMsg) {
        const updated = fetchedMessages.find(m => m._id === selectedMsg._id);
        if (updated) setSelectedMsg(updated);
      }
    } catch (error) {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    setActioning(true);
    try {
      await api.patch(`/messages/${id}/read`);
      toast.success('Marked as read');
      fetchMessages();
    } catch (error) {
      toast.error('Failed to mark as read');
    } finally {
      setActioning(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedMsg) return;
    setActioning(true);
    try {
      await api.delete(`/messages/${selectedMsg._id}`);
      toast.success('Message deleted');
      setSelectedMsg(null);
      fetchMessages();
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error('Failed to delete message');
    } finally {
      setActioning(false);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-[calc(100vh-8rem)] max-w-7xl mx-auto flex flex-col sm:flex-row gap-6"
    >
      {/* Left Panel: Message List */}
      <div className="w-full sm:w-1/3 md:w-[400px] flex flex-col bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border bg-[#141416] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Inbox size={18} className="text-white" />
            <h2 className="font-semibold text-white">Inbox</h2>
          </div>
          <Badge variant="secondary">
            {messages.filter(m => m.status === 'unread' || m.read === false).length} unread
          </Badge>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-muted text-center">
              <Mail size={40} className="mb-4 opacity-20" />
              <p>Your inbox is empty.</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-border/50">
              {messages.map((msg) => {
                const isUnread = msg.status === 'unread' || msg.read === false;
                const isSelected = selectedMsg?._id === msg._id;
                
                return (
                  <button
                    key={msg._id}
                    onClick={() => setSelectedMsg(msg)}
                    className={cn(
                      "flex flex-col items-start p-4 text-left transition-all duration-200 hover:bg-hover-surface",
                      isSelected && "bg-elevated-surface border-l-2 border-l-primary shadow-sm",
                      !isSelected && "border-l-2 border-l-transparent"
                    )}
                  >
                    <div className="flex w-full items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 overflow-hidden">
                        {isUnread && <span className="h-2 w-2 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(79,70,229,0.8)]" />}
                        <span className={cn("text-[15px] truncate pr-2", isUnread ? "text-white font-bold" : "text-muted font-medium")}>
                          {msg.name}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-muted whitespace-nowrap">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className={cn("text-xs truncate w-full", isUnread ? "text-white/90 font-semibold" : "text-muted")}>
                      {msg.subject || 'No Subject'}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel: Message Detail */}
      <div className="flex-1 flex flex-col bg-surface border border-border rounded-xl overflow-hidden shadow-sm relative">
        <AnimatePresence mode="wait">
          {!selectedMsg ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center p-6 text-center"
            >
              <div className="h-24 w-24 mb-6 rounded-full bg-gradient-to-tr from-primary/20 to-rose-500/20 border border-white/5 flex items-center justify-center shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] ring-1 ring-white/5">
                <MessageSquare size={40} className="text-white/60" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Select a message to read</h3>
              <p className="text-sm text-muted max-w-sm">
                Messages from your portfolio contact form will appear here. Select an inquiry from the left sidebar to view details.
              </p>
            </motion.div>
          ) : (
            <motion.div 
              key="detail"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex-1 flex flex-col h-full"
            >
              <div className="p-6 border-b border-white/5 bg-[#141416] flex items-center justify-between sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-5">
                  <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xl border border-primary/30 shadow-inner">
                    {selectedMsg.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white mb-0.5">{selectedMsg.name}</h3>
                    <a href={`mailto:${selectedMsg.email}`} className="text-sm text-muted hover:text-primary transition-colors font-medium">
                      {selectedMsg.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {(selectedMsg.status === 'unread' || selectedMsg.read === false) && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleMarkRead(selectedMsg._id)}
                      isLoading={actioning}
                      className="border-primary/50 text-primary hover:bg-primary/10"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" /> Mark Read
                    </Button>
                  )}
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => setIsConfirmOpen(true)}
                    disabled={actioning}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-8 flex-1 overflow-y-auto custom-scrollbar bg-surface/30">
                <div className="mb-8 pb-6 border-b border-white/5">
                  <h4 className="text-2xl font-bold text-white mb-3">{selectedMsg.subject}</h4>
                  <p className="text-[11px] text-muted uppercase tracking-wider font-semibold">
                    Received on {new Date(selectedMsg.createdAt).toLocaleString()}
                  </p>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-white/90 leading-[1.8] text-[15px]">
                    {selectedMsg.message}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Message?"
        description="This will permanently delete this message."
        isLoading={actioning}
      />
    </motion.div>
  );
}
