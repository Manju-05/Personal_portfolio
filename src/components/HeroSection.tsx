import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Download } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const roles = [
    "Python Enthusiast",
    "Web Developer",
    "AI&ML Enthusiast", 
    "Tech Explorer"
  ];

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    
    if (isTyping) {
      if (displayedText.length < currentRole.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }
  }, [displayedText, isTyping, currentRoleIndex, roles]);

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 flex items-center transition-all duration-500">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="space-y-2">
              <p className="text-3xl lg:text-4xl text-gray-500 dark:text-gray-400 font-light animate-fade-in-up animation-delay-200">
                Hello,
              </p>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white animate-fade-in-up animation-delay-400">
                I'm Manjunath
              </h1>
              <div className="text-2xl lg:text-3xl text-purple-600 dark:text-purple-400 font-medium italic animate-fade-in-up animation-delay-600 h-12 flex items-center">
                And I'm a <span className="ml-2">{displayedText}<span className="animate-pulse">|</span></span>
              </div>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed animate-fade-in-up animation-delay-800">
              Aspiring AI & ML engineer pursuing B.Tech in CSE, passionate about merging technology with design to create intelligent, visually immersive, and meaningful web experiences
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-1000">
              <a
                href="https://drive.google.com/file/d/1IaTowhh0Crxq1mr3o-Wbri6Vos5y1d7r/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 dark:bg-white text-white dark:text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-700 dark:hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
              >
                <Download size={20} />
                GET MY CV
              </a>
              
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/sai-manjunath-764845344/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white dark:bg-gray-700 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="https://github.com/Manju-05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white dark:bg-gray-700 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  <Github size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="relative animate-slide-in-right flex justify-center">
            <div className="relative w-[70%]">
              <img
                src="./assets/images/snap.jpeg"
                alt="Sai Manjunath Pathapadu"
                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl"
                loading="lazy"
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-400 rounded-full animate-float animation-delay-1000"></div>
              <div className="absolute top-1/2 -left-8 w-8 h-8 bg-pink-400 rounded-full animate-float animation-delay-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};