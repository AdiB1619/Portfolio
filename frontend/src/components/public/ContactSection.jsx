import React from 'react';
import { ArrowRight, Terminal, Globe, Mail } from 'lucide-react';
import { Reveal } from '../Reveal';

export function ContactSection() {
  const inputClass = "w-full bg-[#0A0A0A]/50 border border-white/10 rounded-xl px-5 py-4 text-[15px] font-medium text-white outline-none transition-all duration-300 placeholder:text-[#52525B] focus:border-[#8B5CF6]/60 focus:bg-[#0A0A0A] focus:shadow-[0_0_20px_rgba(139,92,246,0.15)]";

  return (
    <section id="contact" className="section-padding relative border-t border-white/5 bg-[#030303] overflow-hidden">
      {/* Dark gradient specific to Contact */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_100%_100%,rgba(139,92,246,0.05),transparent)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* LEFT: Copy & Links */}
          <div className="flex flex-col pt-4">
            <Reveal>
              <p className="section-label mb-5">Connect</p>
              <h2 className="text-white mb-6" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 0.95 }}>
                Let's discuss how I can contribute to your engineering team and build
                <br />scalable applications.
              </h2>
              <p className="text-[18px] text-[#A1A1AA] max-w-md mb-10">
                Interested in backend engineering, scalable APIs, system design, and solving difficult engineering problems.
              </p>

              {/* Status Indicator */}
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full border border-[#10B981]/20 bg-[#10B981]/5 w-fit mb-12">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                </span>
                <span className="text-[12px] font-bold text-[#10B981] uppercase tracking-widest">Available for Software Engineering Opportunities</span>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-5">
                <a
                  href="mailto:adityabachute@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-[15px] font-bold text-[#A1A1AA] hover:text-white transition-colors group w-fit"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/10 transition-all">
                    <Mail size={18} />
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform">adityabachute@gmail.com</span>
                </a>
                
                <a
                  href="https://github.com/AdiB1619"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-[15px] font-bold text-[#A1A1AA] hover:text-white transition-colors group w-fit"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/10 transition-all">
                    <Terminal size={18} />
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform">github.com/AdiB1619</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/aditya-bachute-680570302"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-[15px] font-bold text-[#A1A1AA] hover:text-white transition-colors group w-fit"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/10 transition-all">
                    <Globe size={18} />
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform">LinkedIn Profile</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Deep Glass Form */}
          <Reveal delay={0.2}>
            <div className="relative">
              {/* Floating glow behind form */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#8B5CF6]/10 blur-[100px] pointer-events-none rounded-full" />
              
              <div className="premium-card p-8 md:p-10 rounded-[32px] relative z-10">
                <form className="flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#8B5CF6] mb-2 block">Name</label>
                      <input placeholder="Your Name" className={inputClass} />
                    </div>
                    <div>
                      <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#8B5CF6] mb-2 block">Email</label>
                      <input placeholder="your.email@domain.com" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold text-[#A1A1AA] mb-3 uppercase tracking-widest">Message</label>
                    <textarea
                      placeholder="Hi Aditya, we are looking for a backend engineer..."
                      className={`${inputClass} resize-none min-h-[160px]`}
                    />
                  </div>

                  <button
                    className="mt-4 h-[56px] rounded-xl flex items-center justify-center gap-3 text-[15px] font-bold text-white transition-all duration-500 relative overflow-hidden group"
                    style={{
                      background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                      boxShadow: '0 10px 30px rgba(139,92,246,0.2)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 15px 40px rgba(139,92,246,0.35)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(139,92,246,0.2)';
                    }}
                  >
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                    <span className="relative z-10 flex items-center gap-2">
                      Connect With Me <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
