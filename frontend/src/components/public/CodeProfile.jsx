import React from 'react';
import { Terminal, Code2, Globe, FileText, ArrowUpRight } from 'lucide-react';
import { Reveal } from '../Reveal';

const links = [
  {
    name: 'GitHub',
    desc: 'Personal repositories, backend development practice, and full stack development projects.',
    url: 'https://github.com/AdiB1619',
    icon: Terminal,
    stat: 'Active Development',
    color: '#E4E4E7'
  },

  {
    name: 'LinkedIn',
    desc: 'Professional profile showcasing technical background, projects, and career development.',
    url: 'https://www.linkedin.com/in/aditya-bachute-680570302',
    icon: Globe,
    stat: 'Professional Profile',
    color: '#3B82F6'
  },
  {
    name: 'Resume',
    desc: 'Complete resume containing education, technical skills, internship experience, and software projects.',
    url: 'https://drive.google.com/file/d/1paswmSHBoq9vPdHk8F-6zomZwI1b9U55/view',
    icon: FileText,
    stat: 'Updated Resume',
    color: '#8B5CF6'
  }
];

export function CodeProfile() {
  return (
    <section className="section-padding relative border-t border-white/5 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <Reveal>
          <div className="mb-14">
            <p className="section-label mb-4">Verification</p>
            <h2 className="text-white mb-5" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 0.95 }}>
              Code & Engineering Work
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {links.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.1} className="h-full">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="premium-card p-6 rounded-2xl flex flex-col h-full group relative overflow-hidden block"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight size={20} color={item.color} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
                
                <div className="w-12 h-12 rounded-xl border border-white/10 bg-[#121212] flex items-center justify-center mb-6 group-hover:bg-[#1A1A1A] transition-colors shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
                  <item.icon size={22} color={item.color} />
                </div>
                
                <h3 className="font-extrabold text-[18px] text-white mb-2">{item.name}</h3>
                <p className="text-[14px] text-[#A1A1AA] mb-6 flex-1 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
                
                <div className="pt-4 border-t border-white/5 mt-auto">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest" style={{ color: item.color }}>
                    {item.stat}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
