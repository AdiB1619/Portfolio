import React from 'react';
import { SEO } from '../../components/SEO';
import { PageLoader } from '../../components/public/PageLoader';
import { ScrollProgress } from '../../components/public/ScrollProgress';
import { CustomCursor } from '../../components/CustomCursor';

import { HeroSection } from '../../components/public/HeroSection';
import { AboutSection } from '../../components/public/AboutSection';
import { EngineeringMetrics } from '../../components/public/EngineeringMetrics';
import { SkillsSection } from '../../components/public/SkillsSection';
import { EducationSection } from '../../components/public/EducationSection';
import { ExperienceSection } from '../../components/public/ExperienceSection';
import { ProjectsSection } from '../../components/public/ProjectsSection';
import { EngineeringProcess } from '../../components/public/EngineeringProcess';
import { CodeProfile } from '../../components/public/CodeProfile';
import { ContactSection } from '../../components/public/ContactSection';

export function Portfolio() {
  return (
    <>
      <div className="global-grain" />
      <CustomCursor />
      <SEO />
      <PageLoader />
      <ScrollProgress />
      
      <div className="flex-1 w-full bg-[#050505]">
        <HeroSection />
        <AboutSection />
        <EngineeringMetrics />
        <SkillsSection />
        <EducationSection />
        <ExperienceSection />
        <ProjectsSection />
        <EngineeringProcess />
        <CodeProfile />
        <ContactSection />
      </div>
    </>
  );
}
