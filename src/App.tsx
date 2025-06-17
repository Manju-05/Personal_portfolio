import React from 'react';
import { useTheme } from './hooks/useTheme';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { JourneySection } from './components/JourneySection';
import { CertificationsSection } from './components/CertificationsSection';
import { SkillsSection } from './components/SkillsSection';
import { TechStackSection } from './components/TechStackSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  useScrollAnimation();

  return (
    <div className="min-h-screen">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main>
        <HeroSection />
        <AboutSection />
        <JourneySection />
        <CertificationsSection />
        <SkillsSection />
        <TechStackSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;