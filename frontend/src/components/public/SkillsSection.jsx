import React from 'react';
import { Server, Database, Layout, Terminal, BrainCircuit } from 'lucide-react';
import { Reveal } from '../Reveal';

const bentoCategories = [
  {
    id: 'backend',
    title: 'Backend Engineering',
    icon: Server,
    color: '#8B5CF6',
    colorName: 'purple',
    spanClass: 'md:col-span-2 lg:col-span-2 row-span-2',
    items: ['Java', 'Spring Boot', 'Hibernate', 'Node.js', 'Express', 'REST APIs', 'GraphQL', 'JWT', 'WebSockets'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: Layout,
    color: '#3B82F6',
    colorName: 'blue',
    spanClass: 'md:col-span-1 lg:col-span-1 row-span-1',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
  },
  {
    id: 'database',
    title: 'Databases',
    icon: Database,
    color: '#10B981',
    colorName: 'green',
    spanClass: 'md:col-span-1 lg:col-span-1 row-span-1',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  },
  {
    id: 'devops',
    title: 'DevOps',
    icon: Terminal,
    color: '#F97316', // Orange
    colorName: 'orange',
    spanClass: 'md:col-span-1 lg:col-span-1 row-span-1',
    items: ['Docker', 'Linux', 'GitHub Actions', 'CI/CD', 'Azure'],
  },
  {
    id: 'ai',
    title: 'AI / ML',
    icon: BrainCircuit,
    color: '#EC4899', // Pink
    colorName: 'pink',
    spanClass: 'md:col-span-2 lg:col-span-1 row-span-1',
    items: ['Python', 'Machine Learning', 'NLP', 'Predictive Analytics'],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding relative border-t border-white/5 bg-[#111111] overflow-hidden">
      {/* Mesh Gradient Overlay specific to Skills */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(255,255,255,0.02),transparent)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <Reveal>
          <div className="mb-14">
            <p className="section-label mb-4">Capabilities</p>
            <h2
              className="text-white mb-5"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 0.95 }}
            >
              Stack I Build With
            </h2>
          </div>
        </Reveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)] md:auto-rows-[170px]">
          {bentoCategories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 0.1} className={cat.spanClass}>
              <div className="premium-card rounded-3xl p-6 md:p-8 relative overflow-hidden group h-full flex flex-col justify-between">
                
                {/* Background ambient glow matching category color */}
                <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-all duration-700 pointer-events-none" style={{ backgroundColor: cat.color }} />
                
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <cat.icon size={20} color={cat.color} />
                  <h3 className="text-[13px] font-bold uppercase tracking-widest text-white">{cat.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2.5 relative z-10 mt-auto">
                  {cat.items.map(skill => (
                    <span 
                      key={skill} 
                      className="px-3 py-1.5 rounded-xl text-[13px] font-semibold transition-all duration-300 border border-white/5 bg-[#1A1A1A] text-[#A1A1AA] cursor-default inline-block relative overflow-hidden group/pill"
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'scale(1.08)';
                        e.currentTarget.style.borderColor = cat.color;
                        e.currentTarget.style.background = `${cat.color}15`; // 15 hex alpha = ~8%
                        e.currentTarget.style.color = '#FFFFFF';
                        e.currentTarget.style.boxShadow = `0 0 15px ${cat.color}33`; // 33 hex alpha = ~20%
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.background = '#1A1A1A';
                        e.currentTarget.style.color = '#A1A1AA';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {/* Pill Shine Sweep */}
                      <div className="absolute inset-0 -translate-x-full group-hover/pill:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 pointer-events-none" />
                      <span className="relative z-10">{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
