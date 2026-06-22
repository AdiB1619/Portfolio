import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Reveal } from '../Reveal';

function AnimatedCounter({ from, to, duration = 2, isString = false, textValue = '' }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView || isString) return;
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      setCount(Math.floor(progress * (to - from) + from));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isInView, from, to, duration, isString]);

  if (isString) {
    return <span ref={ref}>{textValue}</span>;
  }
  return <span ref={ref}>{count}</span>;
}

const metrics = [
  { id: 'm1', value: 4, suffix: '+', label: 'Completed Engineering Projects', tag: 'ACADEMIC PROJECTS' },
  { id: 'm2', value: 1, suffix: '', label: 'Software Internship Completed', tag: 'INTERNSHIP EXPERIENCE' },
  { id: 'm3', isString: true, textValue: 'Java', suffix: '', label: 'Spring Boot Backend Development', tag: 'PRIMARY STACK' },
  { id: 'm4', isString: true, textValue: 'AZ-900', suffix: '', label: 'Microsoft Azure Certified', tag: 'CERTIFICATION' }
];

// SVG subtle chart line for background
const ChartLine = () => (
  <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="none" className="absolute bottom-0 left-0 right-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-700">
    <path d="M0 100 C 40 80, 60 90, 100 50 C 140 10, 160 30, 200 0 L 200 100 L 0 100 Z" fill="url(#gradient)" />
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
    </defs>
  </svg>
);

export function EngineeringMetrics() {
  return (
    <section id="metrics" className="section-padding relative bg-[#0D0D0D] border-t border-white/5 overflow-hidden">
      {/* Radial Purple Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(139,92,246,0.06),transparent)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <Reveal key={metric.id} delay={i * 0.1} className="h-full">
              <div 
                className="premium-card rounded-3xl p-6 text-left flex flex-col justify-between relative overflow-hidden group min-h-[200px]"
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.03)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <ChartLine />
                
                {/* Top left tiny label */}
                <div className="text-[10px] font-bold text-[#8B5CF6] uppercase tracking-widest relative z-10 mb-6">
                  {metric.tag}
                </div>
                
                <div className="relative z-10 mt-auto">
                  <h3 className="font-extrabold text-4xl md:text-5xl text-white mb-2 tracking-tighter" style={{ textShadow: '0 0 20px rgba(139,92,246,0.2)' }}>
                    <AnimatedCounter from={0} to={metric.value} isString={metric.isString} textValue={metric.textValue} />{metric.suffix}
                  </h3>
                  <p className="text-[13px] font-bold text-[#A1A1AA]">
                    {metric.label}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
