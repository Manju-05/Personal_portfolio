import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';


export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'skills', label: 'Skills & Projects' },
    { id: 'contact', label: 'Contact Me' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/70 dark:bg-[#050505]/80 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-2' 
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="container mx-auto px-4 flex items-center justify-between">
        <motion.div
          className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-500">
            Manjunath
          </div>
          <div className="hidden lg:flex items-center gap-2 border-l border-gray-300 dark:border-gray-700 pl-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 italic">"Engineering Intelligence"</span>
            <span className="text-[10px] md:text-xs text-purple-600 dark:text-purple-400 font-bold uppercase tracking-widest">— AI & ML</span>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`transition-all duration-300 hover:text-purple-600 dark:hover:text-purple-400 relative group ${activeSection === item.id
                ? 'text-purple-600 dark:text-purple-400 font-semibold'
                : 'text-gray-700 dark:text-gray-300'
                }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full ${activeSection === item.id ? 'w-full' : ''}`}></span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 w-full max-w-full bg-white dark:bg-gray-900 shadow-lg md:hidden transition-all duration-300 overflow-x-hidden"
          >
            <div className="flex flex-col space-y-2 py-2 px-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-base transition-all duration-300 hover:text-purple-600 dark:hover:text-purple-400 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${activeSection === item.id
                    ? 'text-purple-600 dark:text-purple-400 font-semibold bg-gray-50 dark:bg-gray-800'
                    : 'text-gray-700 dark:text-gray-300'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};