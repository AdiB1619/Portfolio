import React from 'react';
import { Reveal } from '../Reveal';

export function EducationSection() {
  return (
    <section id="education" className="section-padding relative border-t border-white/5 bg-[#090909] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_0%_0%,rgba(139,92,246,0.03),transparent)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <Reveal>
          <div className="text-center mb-16">
            <p className="section-label mb-4">Academic Background</p>
            <h2 className="text-white mb-5" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 0.95 }}>
              Education
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-col gap-8">
          <Reveal delay={0.1}>
            <div className="premium-card p-8 md:p-10 rounded-[32px] group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B5CF6]/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6 relative z-10">
                <div>
                  <h3 className="font-extrabold text-[24px] text-white tracking-tight mb-2">Bachelor of Technology</h3>
                  <h4 className="text-[16px] font-bold text-[#8B5CF6] mb-1">Computer Engineering</h4>
                  <p className="text-[15px] font-semibold text-[#A1A1AA]">JSPM's Rajarshi Shahu College of Engineering</p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-2">
                  <span className="px-4 py-1.5 rounded-full border border-[#10B981]/20 bg-[#10B981]/10 text-[12px] font-bold text-[#10B981] tracking-widest uppercase shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    Expected May 2028
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 relative z-10">
                <h5 className="text-[12px] font-extrabold text-[#71717A] tracking-widest uppercase mb-4">Relevant Coursework</h5>
                <div className="flex flex-wrap gap-2.5">
                  {['Data Structures', 'DBMS', 'Operating Systems', 'Computer Networks', 'OOP', 'Software Engineering', 'Java Programming'].map(course => (
                    <span 
                      key={course}
                      className="px-3 py-1.5 rounded-lg text-[13px] font-semibold border border-white/5 bg-[#121212] text-[#A1A1AA] hover:bg-white/5 hover:text-white transition-colors"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="premium-card p-8 md:p-10 rounded-[32px] group relative overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 relative z-10">
                <div>
                  <h3 className="font-extrabold text-[20px] text-white tracking-tight mb-2">Diploma of Education</h3>
                  <h4 className="text-[15px] font-bold text-[#A1A1AA] mb-1">Computer Engineering</h4>
                  <p className="text-[14px] text-[#71717A]">Sahakar Maharshi Shankarrao Mohite-Patil Institute of Technology & Research</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
