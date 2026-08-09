import React from 'react';

import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { JourneySection } from './components/JourneySection';
import { CertificationsSection } from './components/CertificationsSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ChatbotWidget } from './components/chatbot/ChatbotWidget';
import { CinematicFooter } from './components/ui/motion-footer';

function App() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Header />
      
      {/* 
        MAIN CONTENT AREA 
        We use a high z-index here and a bottom margin equal to the footer height (or just 
        let the CinematicFooter handle it via relative positioning underneath).
        By wrapping this in relative z-10, it scrolls over the fixed footer.
      */}
      <main className="relative z-10 w-full bg-[#050505] shadow-2xl rounded-b-[40px] border-b border-white/10">
        <HeroSection />
        <AboutSection />
        <JourneySection />
        <CertificationsSection />
        <SkillsSection />
        <ProjectsSection />
      </main>

      {/* The Cinematic Footer (includes Contact Form) */}
      <CinematicFooter />
      
      <ChatbotWidget />
    </div>
  );
}

export default App;