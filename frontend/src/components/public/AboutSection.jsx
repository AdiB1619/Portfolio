import React from 'react';
import { Reveal } from '../Reveal';

const credibilityCards = [
  {
    title: 'Backend Development',
    items: ['REST APIs', 'Microservices', 'Authentication', 'API Security', 'Distributed Systems'],
  },
  {
    title: 'Database Engineering',
    items: ['PostgreSQL', 'MySQL', 'Query Optimization', 'Schema Design', 'Indexing'],
  },
  {
    title: 'Cloud & Deployment',
    items: ['Docker', 'CI/CD', 'Linux', 'Azure', 'Monitoring'],
  },
  {
    title: 'Engineering Principles',
    items: ['Scalability', 'Reliability', 'Performance', 'Clean Code', 'Testing'],
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding relative border-t border-white/5 bg-[#090909]">
      {/* Noise background specifically for About section */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center">
          {/* Left: Heading + Description */}
          <div className="flex flex-col justify-center">
            <Reveal delay={0}>
              <p className="section-label mb-6">Engineering</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="text-white mb-8"
                style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: 0.95 }}
              >
                Engineering systems
                <br />with performance in mind.
              </h2>
            </Reveal>
            <div className="space-y-6 max-w-lg">
              <Reveal delay={0.2}>
                <p className="text-[18px] md:text-[19px] leading-relaxed">
                  I enjoy building backend systems, working with APIs, understanding database structures, and continuously improving software engineering skills through projects and practical development.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-[18px] md:text-[19px] leading-relaxed">
                  Focused on writing clean code, learning scalable system design concepts, and developing applications that solve real world problems.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Right: Credibility cards with stagger */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {credibilityCards.map((card, i) => (
              <Reveal key={card.title} delay={0.1 * i} className="h-full">
                <div className="premium-card p-6 rounded-2xl h-full flex flex-col relative overflow-hidden group">
                  {/* Subtle hover glow inside card */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6]/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <p className="text-[11px] font-bold text-[#8B5CF6] uppercase tracking-widest mb-6 relative z-10">{card.title}</p>
                  <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                    {card.items.map(item => (
                      <span
                        key={item}
                        className="px-3 py-1.5 text-[12px] font-semibold rounded-lg bg-[#111] border border-white/5 text-[#A1A1AA] group-hover:border-white/10 group-hover:text-white transition-colors duration-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
