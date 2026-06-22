import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { X, ExternalLink, Code2 } from 'lucide-react';
import { Reveal } from '../Reveal';

// Reusable 3D Tilt Wrapper
function TiltCard({ children, className }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

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
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 1. AgriXport Dashboard UI
const AgriXportUI = () => (
  <div className="absolute inset-0 bg-[#09090B] flex flex-col p-4 pointer-events-none overflow-hidden">
    <div className="h-10 w-full mb-4 flex items-center justify-between border-b border-white/5 pb-2">
      <div className="flex gap-2 items-center">
        <div className="w-6 h-6 rounded bg-green-500/20 border border-green-500/50 flex items-center justify-center">
          <div className="w-2 h-2 bg-green-500 rounded-sm" />
        </div>
        <div className="h-3 w-20 bg-white/10 rounded" />
      </div>
      <div className="h-4 w-16 rounded-full bg-white/5" />
    </div>
    
    <div className="flex h-full gap-4">
      {/* Sidebar Navigation */}
      <div className="w-1/4 h-full rounded-xl bg-[#121212] border border-white/5 p-3 flex flex-col gap-3">
        <div className="h-6 w-full bg-green-500/10 border border-green-500/20 rounded flex items-center px-2">
          <div className="h-2 w-1/2 bg-green-500/50 rounded" />
        </div>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-6 w-full bg-transparent flex items-center px-2">
            <div className="h-2 w-[40%] bg-white/10 rounded" />
          </div>
        ))}
      </div>
      
      {/* Main Trade Dashboard */}
      <div className="flex-1 flex flex-col gap-3 h-[calc(100%+20px)]">
        {/* RFQ Status Cards */}
        <div className="flex gap-3 h-16">
          {['#10B981', '#3B82F6', '#F59E0B'].map((color, idx) => (
            <div key={idx} className="flex-1 rounded-xl bg-[#121212] border border-white/5 p-3 flex flex-col justify-between">
              <div className="h-2 w-1/2 bg-white/20 rounded" />
              <div className="flex justify-between items-end">
                <div className="h-4 w-1/3 bg-white/40 rounded" />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              </div>
            </div>
          ))}
        </div>
        {/* Trade Workflow Table */}
        <div className="flex-1 rounded-xl bg-[#121212] border border-white/5 p-3 flex flex-col gap-3">
          <div className="h-3 w-1/4 bg-white/20 rounded mb-2" />
          {/* Table Header */}
          <div className="flex gap-2 mb-1">
            <div className="h-2 w-[20%] bg-white/10 rounded" />
            <div className="h-2 w-[30%] bg-white/10 rounded" />
            <div className="h-2 w-[20%] bg-white/10 rounded" />
            <div className="h-2 w-[30%] bg-white/10 rounded" />
          </div>
          {/* Table Rows */}
          {[1, 2, 3, 4].map(row => (
            <div key={row} className="flex gap-2 items-center bg-[#1A1A1A] p-2 rounded-lg border border-white/5">
              <div className="h-2 w-[20%] bg-white/20 rounded" />
              <div className="h-2 w-[30%] bg-white/10 rounded" />
              <div className="h-4 w-[20%] bg-green-500/20 rounded-full" />
              <div className="h-2 w-[30%] bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// 2. KisanSuraksha Analytics UI
const KisanSurakshaUI = () => (
  <div className="absolute inset-0 bg-[#09090B] flex flex-col p-4 pointer-events-none gap-4 overflow-hidden">
    <div className="flex justify-between items-center h-8 border-b border-white/5 pb-2">
      <div className="h-4 w-32 bg-white/20 rounded" />
      <div className="w-24 h-5 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center">
        <div className="h-1.5 w-16 bg-red-500/50 rounded" />
      </div>
    </div>
    
    {/* Map/Heatmap + Graph Layout */}
    <div className="flex-1 flex gap-4">
      {/* Risk Heatmap Fake */}
      <div className="flex-[1.5] rounded-xl bg-[#121212] border border-white/5 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-600 via-[#121212] to-transparent" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9zdmc+')] opacity-50" />
        {/* Animated radar sweep */}
        <div className="absolute w-[200%] h-[200%] origin-center animate-[spin_4s_linear_infinite]" style={{ background: 'conic-gradient(from 0deg, transparent 0deg, rgba(239,68,68,0.2) 60deg, transparent 60deg)' }} />
        {/* Risk nodes */}
        <div className="absolute top-[40%] left-[30%] w-3 h-3 bg-red-500 rounded-full animate-ping" />
        <div className="absolute top-[60%] left-[60%] w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_10px_#F97316]" />
      </div>
      
      {/* Forecasting Charts */}
      <div className="flex-[1] flex flex-col gap-3">
        <div className="flex-1 rounded-xl bg-[#121212] border border-white/5 p-3 flex flex-col">
          <div className="h-2 w-1/2 bg-white/20 rounded mb-4" />
          <div className="flex-1 flex items-end gap-1">
             {[...Array(12)].map((_, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-orange-500/20 to-orange-500/60 rounded-t-sm animate-bar" style={{ animationDelay: `${i * 0.15}s`, height: `${20 + Math.random() * 60}%` }} />
             ))}
          </div>
        </div>
        <div className="flex-[0.5] rounded-xl bg-red-500/10 border border-red-500/20 p-3 flex flex-col justify-center">
          <div className="h-2 w-2/3 bg-red-500/50 rounded mb-2" />
          <div className="h-4 w-1/3 bg-red-500 rounded" />
        </div>
      </div>
    </div>
  </div>
);

// 3. AgriPulse IoT UI
const AgriPulseUI = () => (
  <div className="absolute inset-0 bg-[#09090B] flex flex-col p-4 pointer-events-none gap-4 overflow-hidden">
    <div className="flex justify-between items-center h-8">
      <div className="flex gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
           <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <div className="h-2 w-24 bg-white/20 rounded" />
          <div className="h-1.5 w-16 bg-white/10 rounded" />
        </div>
      </div>
      <div className="h-8 w-24 rounded-lg bg-[#121212] border border-white/5 flex items-center justify-center gap-2">
         <div className="w-2 h-2 rounded-full bg-green-500" />
         <div className="h-1.5 w-8 bg-white/20 rounded" />
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-3 mb-2">
      <div className="h-20 rounded-xl bg-[#121212] border border-white/5 p-3 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-3"><div className="w-4 h-4 rounded-full border-2 border-blue-500/30" /></div>
         <div className="h-2 w-1/2 bg-white/20 rounded mb-4" />
         <div className="h-5 w-1/3 bg-blue-400 rounded" />
      </div>
      <div className="h-20 rounded-xl bg-[#121212] border border-white/5 p-3 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-3"><div className="w-4 h-4 rounded-full border-2 border-emerald-500/30" /></div>
         <div className="h-2 w-1/2 bg-white/20 rounded mb-4" />
         <div className="h-5 w-1/3 bg-emerald-400 rounded" />
      </div>
    </div>
    
    <div className="flex-1 rounded-xl bg-[#121212] border border-white/5 p-4 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-2">
        <div className="h-2 w-1/3 bg-white/20 rounded" />
        <div className="h-1.5 w-12 bg-[#8B5CF6]/50 rounded" />
      </div>
      {/* Fake Line Chart */}
      <div className="relative w-full h-full mt-2">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
          <path d="M0,30 Q10,20 20,25 T40,10 T60,20 T80,5 T100,15" fill="none" stroke="#8B5CF6" strokeWidth="1.5" />
          <path d="M0,30 Q10,20 20,25 T40,10 T60,20 T80,5 T100,15 L100,40 L0,40 Z" fill="url(#purpleGrad)" />
          <defs>
            <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(139,92,246,0.3)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  </div>
);

// 4. Voice Email UI
const VoiceEmailUI = () => (
  <div className="absolute inset-0 bg-[#09090B] flex items-center justify-center pointer-events-none overflow-hidden relative">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#8B5CF6]/20 rounded-full blur-[40px] animate-pulse" />
    
    <div className="w-[80%] h-[70%] bg-[#121212] border border-white/10 rounded-[24px] shadow-2xl flex flex-col p-5 relative z-10">
      <div className="flex justify-center mb-6">
        <div className="h-1 w-12 bg-white/10 rounded-full" />
      </div>
      
      {/* Audio Waveform Fake */}
      <div className="flex justify-center items-center gap-1 h-16 mb-6">
        {[1, 2, 3, 4, 5, 6, 7].map(i => (
          <div key={i} className="w-1.5 bg-[#8B5CF6] rounded-full animate-bar" style={{ animationDelay: `${i * 0.1}s`, height: `${20 + Math.random() * 80}%` }} />
        ))}
      </div>
      
      <div className="flex flex-col items-center gap-3 mt-auto">
        <div className="h-3 w-1/2 bg-white/30 rounded" />
        <div className="h-2 w-1/3 bg-white/10 rounded" />
      </div>
      
      <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#8B5CF6] shadow-[0_0_20px_#8B5CF6] flex items-center justify-center">
        <div className="w-4 h-4 rounded bg-white" />
      </div>
    </div>
  </div>
);

// Portfolio UI Mockup
const PortfolioUI = () => (
  <div className="absolute inset-0 bg-[#09090B] flex flex-col p-4 pointer-events-none gap-4 overflow-hidden">
    {/* Fake Nav */}
    <div className="flex justify-between items-center h-8 border-b border-white/5 pb-2">
      <div className="h-3 w-16 bg-white/20 rounded" />
      <div className="flex gap-2">
        <div className="h-2 w-8 bg-white/10 rounded" />
        <div className="h-2 w-8 bg-white/10 rounded" />
      </div>
    </div>
    
    {/* Fake Hero */}
    <div className="flex-1 flex flex-col items-center justify-center gap-3">
      <div className="h-4 w-3/4 bg-white/30 rounded" />
      <div className="h-3 w-1/2 bg-white/10 rounded" />
      <div className="flex gap-2 mt-2">
        <div className="h-6 w-20 bg-[#8B5CF6]/80 rounded" />
        <div className="h-6 w-20 bg-white/10 rounded" />
      </div>
    </div>
  </div>
);

// Real Resume Projects
const resumeProjects = [
  {
    id: 'proj-1',
    title: 'AgriXport',
    subtitle: 'B2B Agriculture Export Platform',
    stack: ['Next.js 15', 'TypeScript', 'Java', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'NextAuth'],
    UIComponent: AgriXportUI,
    badge: 'B2B PLATFORM',
    bullets: [
      'Engineered a full-stack B2B agriculture export platform covering 6 user roles and 10+ core trade workflows.',
      'Designed role-based dashboards for farmers, exporters, inspectors, and logistics partners in 1 unified system.',
      'Implemented RFQ and counter-offer flows, document management, and analytics using REST APIs across 3 transaction stages.'
    ]
  },
  {
    id: 'proj-2',
    title: 'KisanSuraksha',
    subtitle: 'AI Climate Risk Forecasting Platform',
    stack: ['Python', 'ML', 'Random Forest', 'LSTM', 'REST APIs'],
    UIComponent: KisanSurakshaUI,
    badge: 'AI / ML',
    bullets: [
      'Built a district-level climate risk forecasting system predicting 3 hazard types: drought, flood, and heatwave.',
      'Integrated 4 data sources (DiCRA, IMD, NASA POWER API, CMIP6) to model risks across 500+ districts via cloud-connected APIs.',
      'Built a REST API and 4 role-specific dashboards delivering risk intelligence to farmers, insurers, and lenders.'
    ]
  },
  {
    id: 'proj-3',
    title: 'AgriPulse',
    subtitle: 'AI Soil Health Advisory Platform',
    stack: ['IoT', 'Python', 'AI/ML', 'Voice Recognition', 'REST APIs'],
    UIComponent: AgriPulseUI,
    badge: 'IoT & AI',
    bullets: [
      'Built an IoT + AI advisory system monitoring 4 soil parameters (moisture, EC, temperature, NPK/pH) with real-time cloud data ingestion.',
      'Developed voice-first advisory in 2 regional languages (Marathi, Hindi) for low-connectivity rural environments.',
      'Delivered AI-based irrigation prediction, nutrient deficiency alerts, and crop recommendations in 1 scalable platform.'
    ]
  },
  {
    id: 'proj-4',
    title: 'Voice Assisted Email Platform',
    subtitle: 'Accessibility-first Email Client',
    stack: ['Python', 'Speech Recognition', 'Text-to-Speech', 'SMTP', 'OOP'],
    UIComponent: VoiceEmailUI,
    badge: 'ACCESSIBILITY',
    bullets: [
      'Developed an email platform that enables visually impaired users to send and receive emails using voice commands with speech recognition integration.',
      'Enabled hands-free management across core functions: compose, send, and inbox navigation using object-oriented design.'
    ]
  },
  {
    id: 'proj-5',
    title: 'Portfolio Website',
    subtitle: 'Premium Developer Portfolio',
    stack: ['React', 'Tailwind CSS', 'Framer Motion', 'JavaScript', 'Vite'],
    UIComponent: PortfolioUI,
    badge: 'FRONTEND',
    bullets: [
      'Designed and developed a premium portfolio website using modern frontend technologies with animations, responsive design, and component structure.'
    ]
  }
];

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  React.useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  return (
    <section id="projects" className="section-padding relative bg-[#050505]">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <Reveal>
          <div className="mb-16">
            <p className="section-label mb-4">Work</p>
            <h2 className="text-white mb-5" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 0.95 }}>
              Systems I've Built
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resumeProjects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.1}>
              <TiltCard className="group premium-card flex flex-col rounded-3xl overflow-hidden cursor-pointer h-full">
                <div 
                  onClick={() => setSelectedProject(project)}
                  className="flex flex-col h-full"
                >
                  {/* CSS Mockup Preview */}
                  <div className="relative h-[260px] overflow-hidden border-b border-white/5 bg-[#030303] flex items-center justify-center p-4" style={{ transform: 'translateZ(20px)' }}>
                    <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-[1.05]">
                      <project.UIComponent />
                    </div>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 pointer-events-none" />
                    <div className="absolute top-4 left-4 z-20 pointer-events-none">
                      <span className="px-3 py-1.5 text-[10px] font-extrabold tracking-[0.2em] uppercase rounded-md border border-[#8B5CF6]/30 bg-black/60 backdrop-blur-md text-[#8B5CF6]">
                        {project.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 flex flex-col flex-1" style={{ transform: 'translateZ(30px)' }}>
                    <h3 className="font-extrabold text-[22px] text-white mb-1 tracking-tight">{project.title}</h3>
                    <h4 className="text-[13px] font-bold uppercase tracking-widest text-[#8B5CF6] mb-4">{project.subtitle}</h4>
                    <p className="text-[15px] text-[#A1A1AA] mb-8 flex-1 line-clamp-3 leading-[1.8]">
                      {project.bullets[0]}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.stack.slice(0, 4).map(tech => (
                        <span key={tech} className="px-3 py-1 rounded-md text-[11px] font-bold border border-white/5 bg-[#121212] text-[#71717A]">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="pt-5 border-t border-white/5 flex items-center justify-between text-[12px] font-bold tracking-widest uppercase text-[#A1A1AA] group-hover:text-[#8B5CF6] transition-colors">
                      View Project Details & Stack
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Deep Architecture Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 bg-[#030303]/90 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[32px] premium-card flex flex-col"
            >
              <div className="h-[220px] relative border-b border-white/5 shrink-0 bg-[#030303] overflow-hidden">
                <selectedProject.UIComponent />
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-white hover:bg-[#8B5CF6] hover:border-[#8B5CF6] transition-all duration-300 pointer-events-auto z-50"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 md:p-12 flex-1">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">{selectedProject.title}</h2>
                    <h3 className="text-[14px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-6">{selectedProject.subtitle}</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stack.map(t => (
                        <span key={t} className="px-3 py-1.5 rounded-lg text-[12px] font-bold border border-white/10 bg-white/5 text-white">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B5CF6]/10 hover:bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 text-[13px] font-bold text-[#8B5CF6] transition-colors shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                      <ExternalLink size={16} /> Case Study
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[13px] font-bold text-white transition-colors">
                      <Code2 size={16} /> GitHub
                    </button>
                  </div>
                </div>

                <div className="pt-10 border-t border-white/5">
                  <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-[#8B5CF6] mb-6">Technical Implementation</h4>
                  <ul className="space-y-4">
                    {selectedProject.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <span className="text-[#8B5CF6] mt-1.5 text-[10px]">▶</span>
                        <span className="text-[15px] leading-[1.8] text-[#A1A1AA]">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
