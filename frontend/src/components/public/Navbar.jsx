import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Metrics', href: '#metrics' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Process', href: '#process' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    
    // Intersection Observer for active sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    
    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));
    
    return () => {
      window.removeEventListener('scroll', handler);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b border-transparent"
      style={{
        background: scrolled ? 'var(--glass-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderColor: scrolled ? 'rgba(255,255,255,0.06)' : 'transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center h-20 gap-8">
        {/* Logo Monogram */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 flex-shrink-0 group"
        >
          <div className="h-[42px] w-[42px] rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-[1.03] bg-[#111] border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="font-extrabold text-[15px] relative z-10 text-white tracking-tight">AG</span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1 ml-4">
          {navLinks.map(link => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="relative px-4 py-2 text-[14px] font-semibold transition-all duration-300"
                style={{
                  color: isActive ? 'var(--text-main)' : 'rgba(255,255,255,0.78)',
                  transform: 'translateY(0px)',
                  opacity: 1 // Text opacity managed by color
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = isActive ? 'var(--text-main)' : 'rgba(255,255,255,0.78)';
                  e.currentTarget.style.transform = 'translateY(0px)';
                }}
              >
                {link.name}
                {isActive && (
                  <span 
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-primary rounded-t-full"
                    style={{ boxShadow: '0 -2px 10px rgba(139,92,246,0.6)' }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right actions (Removed theme toggle) */}
        <div className="hidden md:flex items-center gap-5 ml-auto">
          <a
            href="https://drive.google.com/file/d/1paswmSHBoq9vPdHk8F-6zomZwI1b9U55/view"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-6 rounded-xl text-[14px] font-bold text-white transition-all duration-300 flex items-center justify-center bg-[#8B5CF6] overflow-hidden group relative"
            style={{
              boxShadow: '0 0 25px rgba(139,92,246,0.2)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 0 25px rgba(139,92,246,0.35)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 25px rgba(139,92,246,0.2)';
            }}
          >
            {/* Shine Sweep Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
            <span className="relative z-10">Resume</span>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden ml-auto p-2 rounded-lg transition-colors duration-200 text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
