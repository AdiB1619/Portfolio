import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Reveal } from '../Reveal';

const steps = [
  { number: '01', title: 'Discovery', desc: 'Deep dive into requirements and system constraints.' },
  { number: '02', title: 'System Design', desc: 'Data modeling, API contracts, and infrastructure planning.' },
  { number: '03', title: 'Backend Development', desc: 'Writing robust, tested server logic and microservices.' },
  { number: '04', title: 'Database Engineering', desc: 'Schema optimization, indexing, and query performance.' },
  { number: '05', title: 'API Integration', desc: 'Connecting frontend clients with secure endpoints.' },
  { number: '06', title: 'Deployment', desc: 'Containerization, CI/CD pipelines, and observability.' },
];

export function EngineeringProcess() {
  const containerRef = useRef(null);
  
  // Connect scroll progress to timeline beam
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="process" className="section-padding relative border-t border-white/5 bg-[#0A0A0A] overflow-hidden">
      {/* Glass Blur Background Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(255,255,255,0.01),transparent)] pointer-events-none" />
      <div className="absolute inset-0 backdrop-blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <Reveal>
          <div className="text-center mb-16">
            <p className="section-label mb-4">Workflow</p>
            <h2 className="text-white mb-5" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 0.95 }}>
              Development Process
            </h2>
          </div>
        </Reveal>

        <div className="relative pl-8 md:pl-0" ref={containerRef}>
          {/* Vertical Timeline Track */}
          <div className="absolute left-[15px] md:left-1/2 md:-ml-[1px] top-4 bottom-4 w-[2px] bg-white/5">
            {/* Animated Scroll Beam */}
            <motion.div
              className="absolute top-0 w-full bg-gradient-to-b from-[#8B5CF6] via-[#A855F7] to-transparent origin-top"
              style={{ scaleY, boxShadow: '0 0 20px #8B5CF6' }}
            />
          </div>

          <div className="flex flex-col space-y-[20px]">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <Reveal key={step.number} delay={i * 0.05}>
                  <div className={`relative flex items-center md:justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Timeline Node - Pulse effect */}
                    <div className="absolute left-[-23px] md:left-1/2 md:-ml-2 w-4 h-4 rounded-full bg-[#0A0A0A] border-[3px] border-[#8B5CF6] z-10 shadow-[0_0_15px_rgba(139,92,246,0.6)]">
                      <div className="absolute inset-0 bg-[#8B5CF6] rounded-full animate-ping opacity-50" />
                    </div>

                    <div className="w-full md:w-[46%]">
                      <div className="premium-card p-6 rounded-2xl group min-h-[140px] flex flex-col justify-center">
                        <p className="text-[11px] font-extrabold text-[#8B5CF6] mb-2 tracking-[0.2em]">{step.number}</p>
                        <h3 className="font-extrabold text-[18px] text-white mb-2 tracking-tight">{step.title}</h3>
                        <p className="text-[14px] leading-relaxed text-[#A1A1AA]">{step.desc}</p>
                      </div>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block md:w-[46%]" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
