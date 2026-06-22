import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Cinematic 1.2s duration before exit
    const t = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black overflow-hidden"
        >
          {/* Ambient purple background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center gap-8 relative z-10"
          >
            {/* AG Monogram */}
            <motion.div 
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="h-[64px] w-[64px] rounded-2xl flex items-center justify-center border border-white/10"
              style={{
                background: 'rgba(20,20,25,0.8)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 40px rgba(139,92,246,0.2), inset 0 0 20px rgba(139,92,246,0.1)'
              }}
            >
              <span className="font-extrabold text-2xl tracking-tight text-white" style={{ textShadow: '0 0 20px rgba(139,92,246,0.8)' }}>AG</span>
            </motion.div>

            {/* Status text */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex gap-1.5 mb-1">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </div>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-[11px] font-mono tracking-[0.3em] uppercase text-primary/80"
              >
                Initializing systems...
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
