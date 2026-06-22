import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Reveal } from '../Reveal';

const experienceData = [
  {
    role: 'Software Development Intern',
    company: 'Fourise Software Solutions Pvt. Ltd.',
    date: 'May 2024 – Jul 2024',
    points: [
      'Worked on software development tasks, debugging modules, testing application functionality, and understanding real world software development workflow.'
    ]
  },
  {
    role: 'Training & Placement Coordinator',
    company: 'JSPM RSCOE',
    date: 'Jan 2026 – Present',
    points: [
      'Driving placement communication across students, faculty, and placement cell for 100+ engineering students.',
      'Organizing 5+ placement drives and industry interaction events to strengthen the student employability pipeline.',
      'Streamlining placement updates and reducing communication gaps across 4 academic departments.'
    ]
  },
  {
    role: 'Design Team Member',
    company: 'RSCOE ACM Student Chapter',
    date: 'Sep 2025 – Present',
    points: [
      'Delivering 15+ visual assets and promotional materials across 5+ technical events and chapter initiatives.',
      'Grew chapter campaign reach to 200+ student members through consistent branded content creation.',
      'Collaborating within a 10-member team to maintain unified branding standards across all chapter communications.'
    ]
  },
  {
    role: 'President',
    company: 'ICSA Student Chapter',
    date: 'Jun 2024 – Jun 2025',
    points: [
      'Led a 12-member committee to plan and execute 8+ technical and cultural events over a 1-year term.',
      'Drove 40+ student participations in inter-college competitions, workshops, and engagement programs.',
      'Managed team delegation, event budgets, and scheduling, delivering all events on time and within scope.'
    ]
  }
];

export function ExperienceSection() {
  const containerRef = useRef(null);
  
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
    <section id="experience" className="section-padding relative border-t border-white/5 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(139,92,246,0.03),transparent)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <Reveal>
          <div className="text-center mb-16">
            <p className="section-label mb-4">Journey</p>
            <h2 className="text-white mb-5" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 0.95 }}>
              Experience & Leadership
            </h2>
          </div>
        </Reveal>

        <div className="relative pl-8 md:pl-0" ref={containerRef}>
          {/* Vertical Timeline Track */}
          <div className="absolute left-[15px] md:left-1/2 md:-ml-[1px] top-4 bottom-4 w-[2px] bg-white/5">
            <motion.div
              className="absolute top-0 w-full bg-gradient-to-b from-[#8B5CF6] via-[#A855F7] to-transparent origin-top"
              style={{ scaleY, boxShadow: '0 0 20px #8B5CF6' }}
            />
          </div>

          <div className="flex flex-col space-y-12">
            {experienceData.map((exp, i) => {
              const isEven = i % 2 === 0;
              return (
                <Reveal key={i} delay={0.1}>
                  <div className={`relative flex items-start md:justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Timeline Node */}
                    <div className="absolute left-[-23px] md:left-1/2 md:-ml-2 w-4 h-4 rounded-full bg-[#0A0A0A] border-[3px] border-[#8B5CF6] z-10 mt-1.5 shadow-[0_0_15px_rgba(139,92,246,0.6)]">
                      <div className="absolute inset-0 bg-[#8B5CF6] rounded-full animate-ping opacity-50" />
                    </div>

                    <div className="w-full md:w-[45%]">
                      <div className="premium-card p-8 rounded-3xl group">
                        <div className="flex flex-col mb-4">
                          <span className="text-[12px] font-bold text-[#8B5CF6] tracking-widest uppercase mb-2">
                            {exp.date}
                          </span>
                          <h3 className="font-extrabold text-[20px] text-white mb-1 tracking-tight">
                            {exp.role}
                          </h3>
                          <h4 className="text-[14px] font-semibold text-[#A1A1AA]">
                            {exp.company}
                          </h4>
                        </div>
                        
                        <ul className="space-y-3 mt-6">
                          {exp.points.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-[#8B5CF6] mt-1.5 text-[10px]">▶</span>
                              <span className="text-[14px] text-[#A1A1AA] leading-relaxed">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block md:w-[45%]" />
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
