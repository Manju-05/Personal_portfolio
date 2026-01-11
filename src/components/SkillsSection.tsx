import React from 'react';
import { motion } from 'framer-motion';

// --- Custom 3D Gem SVG Container ---
const TechGemShape = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={`relative flex items-center justify-center ${className} preserve-3d`}>
    {/* The Faceted 3D Shape SVG */}
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full drop-shadow-2xl"
      style={{ filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.5))" }}
    >
      {/* Main Body - Dark Facets */}
      <path d="M50 5 L95 25 L95 75 L50 95 L5 75 L5 25 Z" fill="#1a1a1a" stroke="#333" strokeWidth="1" />

      {/* Highlights / Facets for 3D effect */}
      <path d="M50 5 L95 25 L50 50 Z" fill="#2a2a2a" opacity="0.6" />
      <path d="M5 25 L50 5 L50 50 Z" fill="#222" opacity="0.5" />
      <path d="M5 25 L50 50 L5 75 Z" fill="#151515" opacity="0.8" />
      <path d="M95 25 L50 50 L95 75 Z" fill="#151515" opacity="0.8" />
      <path d="M5 75 L50 50 L50 95 Z" fill="#0a0a0a" opacity="0.9" />
      <path d="M95 75 L50 50 L50 95 Z" fill="#0a0a0a" opacity="0.9" />

      {/* Glow Rim */}
      <path d="M50 5 L95 25 L95 75 L50 95 L5 75 L5 25 Z" fill="none" stroke="url(#gemGradient)" strokeWidth="0.5" opacity="0.3" />

      <defs>
        <linearGradient id="gemGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>

    {/* Content (Logo) */}
    <div className="relative z-10 w-[50%] h-[50%] flex items-center justify-center transform translate-z-10">
      {children}
    </div>
  </div>
);

// --- Data with Official CDN URLs ---
const techStack = [
  {
    name: 'React',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    color: '#61DAFB'
  },
  {
    name: 'Python',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    color: '#3776AB'
  },
  {
    name: 'JavaScript',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    color: '#F7DF1E'
  },
  {
    name: 'HTML',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    color: '#E34F26'
  },
  {
    name: 'CSS',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    color: '#1572B6'
  },
  {
    name: 'GitHub',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    isDark: true,
    filter: 'invert(1) brightness(100%)',
    color: '#ffffff'
  },
  {
    name: 'SQL',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    color: '#4479A1'
  },
  {
    name: 'AWS',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    color: '#FF9900',
    scale: 1.2
  },
  {
    name: 'ROS',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ros/ros-original.svg',
    color: '#22314E',
    isDark: true,
    filter: 'invert(1) brightness(100%)'
  },
];

// --- Main Component ---
export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-10 bg-[#050505] overflow-hidden relative perspective-1000">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[20%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >

          <h3 className="text-3xl lg:text-4xl font-extrabold text-white">
            Tech Stack
          </h3>
          <div className="w-20 h-1 mt-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto" />
        </motion.div>

        {/* 3D Floating Grid */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-10 max-w-5xl mx-auto items-center" style={{ perspective: '1000px' }}>
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0, rotateY: 90 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                type: "spring",
                bounce: 0.4
              }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Continuous 3D Rotation Container */}
              <motion.div
                animate={{
                  rotateY: [0, 10, 0, -10, 0],
                  y: [0, -15, 0]
                }}
                transition={{
                  rotateY: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2
                  }
                }}
                className="w-28 h-28 lg:w-32 lg:h-32 relative preserve-3d"
              >
                {/* The Gem Container */}
                <TechGemShape className="w-full h-full transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  <img
                    src={tech.image}
                    alt={tech.name}
                    className="w-full h-full object-contain drop-shadow-md transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                    style={{
                      filter: tech.filter || 'none',
                      transform: tech.scale ? `scale(${tech.scale})` : undefined
                    }}
                  />
                </TechGemShape>
              </motion.div>

              {/* Hover Glow Reflection (Floor) */}
              <div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-4 rounded-[100%] blur-md opacity-20 group-hover:opacity-60 transition-opacity duration-300"
                style={{ backgroundColor: tech.color }}
              />

              {/* Name Tag */}
              <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-20">
                <span className="text-white text-sm font-bold tracking-wide whitespace-nowrap bg-gray-900/90 px-3 py-1.5 rounded-full border border-gray-700 backdrop-blur-md shadow-xl">
                  {tech.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};