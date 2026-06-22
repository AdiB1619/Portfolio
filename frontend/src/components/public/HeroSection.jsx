import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

// Reusable Magnetic Button Wrapper
function Magnetic({ children }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

// Reusable 3D Tilt Wrapper
function TiltCard({ children, className, style }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroSection() {
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });
  const { scrollY } = useScroll();
  
  // Parallax effects
  const yText = useTransform(scrollY, [0, 1000], [0, 200]);
  const yBg = useTransform(scrollY, [0, 1000], [0, 400]);
  const yCards = useTransform(scrollY, [0, 1000], [0, 100]);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let animationFrameId;
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden bg-[#050505] perspective-1000"
    >
      {/* --- LAYER 1: Animated Grid --- */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 bg-grid-pattern opacity-20 animate-grid z-0" />
      
      {/* --- LAYER 2: Subtle Moving Particles --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjIiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuNSIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjMwMCIgcj0iMSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC4zIi8+PGNpcmNsZSBjeD0iMzUwIiBjeT0iMTUwIiByPSIxLjUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==')] animate-particles opacity-30 mix-blend-screen" />
      </div>

      {/* --- LAYER 3: Huge Blurred Radial Glow --- */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8B5CF6]/15 blur-[180px] rounded-full pointer-events-none z-0" />

      {/* --- LAYER 4: Dark Vignette Edges --- */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ boxShadow: 'inset 0 0 200px 100px #050505' }} />

      {/* --- LAYER 5: Noise Texture --- */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

      {/* --- LAYER 6: Animated Horizontal Gradient Movement --- */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent animate-gradient-x z-0" />

      {/* Cursor Following Glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
        style={{ background: `radial-gradient(800px circle at ${mouse.x}px ${mouse.y}px, rgba(139,92,246,0.08), transparent 40%)` }}
      />

      {/* LEFT: Floating Code Snippet (3D Tilt) */}
      <motion.div style={{ y: yCards }} className="hidden xl:block absolute left-[8%] top-[30%] animate-float-slow z-10 w-[280px]">
        <TiltCard className="premium-card p-5 rounded-2xl">
          <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3" style={{ transform: 'translateZ(20px)' }}>
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <pre className="text-[12px] font-mono leading-relaxed text-[#A1A1AA]" style={{ transform: 'translateZ(30px)' }}>
            <span className="text-[#8B5CF6]">const</span> api = <span className="text-[#8B5CF6]">await</span> <span className="text-white">fetch</span>();<br/>
            <span className="text-[#10B981]">// 200 OK</span><br/>
            <span className="text-white">console</span>.log(<span className="text-[#FBBF24]">'Connected'</span>);
          </pre>
        </TiltCard>
      </motion.div>

      {/* RIGHT: Floating Deployment Card (3D Tilt) */}
      <motion.div style={{ y: yCards }} className="hidden xl:block absolute right-[8%] top-[45%] animate-float-delayed z-10 w-[280px]">
        <TiltCard className="premium-card p-5 rounded-2xl">
          <div className="flex items-center gap-3 mb-3" style={{ transform: 'translateZ(20px)' }}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
            </span>
            <span className="text-[12px] font-semibold tracking-wide font-mono text-white">Deployment</span>
          </div>
          <div className="text-[12px] font-mono mt-2 text-[#A1A1AA] leading-relaxed" style={{ transform: 'translateZ(30px)' }}>
            Status: <span className="text-[#10B981]">Successful</span><br/>
            Latency: <span className="text-white">32ms</span><br/>
            Region: <span className="text-white">us-east-1</span>
          </div>
        </TiltCard>
      </motion.div>

      {/* Main Content (Parallaxed) */}
      <motion.div style={{ y: yText }} className="relative z-20 w-full max-w-[1000px] mx-auto px-6 flex flex-col items-center text-center mt-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#8B5CF6]/20 bg-[#8B5CF6]/10 backdrop-blur-xl text-[11px] font-bold text-[#8B5CF6] uppercase tracking-widest shadow-[0_0_20px_rgba(139,92,246,0.15)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
            Computer Engineering Student | Java Backend Developer
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-hero text-white mb-6"
          style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
        >
          Building scalable applications
          <br />with focus on <span className="text-gradient">backend development.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[18px] md:text-[20px] max-w-3xl mb-12"
        >
          Computer engineering student passionate about backend development, API design, databases, and building efficient full stack applications using modern technologies.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-5"
        >
          {/* Primary Button */}
          <Magnetic>
            <button
              onClick={() => scrollTo('projects')}
              className="h-[56px] px-8 rounded-xl text-[15px] font-bold text-white transition-all duration-500 overflow-hidden group relative"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                boxShadow: '0 0 40px rgba(139,92,246,0.35)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 60px rgba(139,92,246,0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 0 40px rgba(139,92,246,0.35)';
              }}
            >
              <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
              <span className="relative z-10">Explore Projects</span>
            </button>
          </Magnetic>

          {/* Secondary Button */}
          <Magnetic>
            <button
              onClick={() => scrollTo('contact')}
              className="h-[56px] px-8 rounded-xl text-[15px] font-bold text-white transition-all duration-500 border border-white/10 bg-[rgba(10,10,10,0.85)] backdrop-blur-xl hover:border-[#8B5CF6]/40 hover:bg-[#1A1A1A]"
              style={{
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              }}
            >
              Start a Conversation
            </button>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}
