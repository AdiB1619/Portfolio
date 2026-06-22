import React from 'react';

export function Footer() {
  const links = [
    { name: 'GitHub', url: 'https://github.com/AdiB1619' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/aditya-bachute-680570302' },
    { name: 'Resume', url: 'https://drive.google.com/file/d/1paswmSHBoq9vPdHk8F-6zomZwI1b9U55/view' },
    { name: 'Email', url: 'mailto:adityabachute@gmail.com' }
  ];

  return (
    <footer className="pt-16 pb-12 bg-[#030303] relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-12">
          
          {/* LEFT: Brand */}
          <div className="text-center md:text-left">
            <h3 className="font-extrabold text-[24px] text-white mb-2 tracking-tighter">Aditya Bachute</h3>
            <p className="text-[14px] text-[#A1A1AA] max-w-[200px]">
              Backend Development Focus
            </p>
          </div>

          {/* CENTER: Tech Stack (Premium Pills) */}
          <div className="flex flex-wrap justify-center gap-2">
            {['Java', 'Spring Boot', 'MySQL', 'React', 'MongoDB'].map(tech => (
              <div key={tech} className="px-4 py-1.5 rounded-full border border-white/5 bg-[#111] text-[11px] font-extrabold text-white uppercase tracking-widest shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:border-white/20 transition-colors">
                {tech}
              </div>
            ))}
          </div>

          {/* RIGHT: Links */}
          <div className="flex justify-center gap-6">
            {links.map(link => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-bold text-[#A1A1AA] transition-all duration-300 inline-block relative overflow-hidden group"
              >
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full group-hover:opacity-0">{link.name}</span>
                <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-white">{link.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* BOTTOM: Copyright & Status */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] font-bold text-[#71717A]">
            &copy; 2026 Aditya Bachute
          </p>
          <div className="flex items-center gap-2 text-[13px] font-bold text-[#71717A]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
            </span>
            <span className="text-[#10B981]">Available for Software Engineering Opportunities</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
