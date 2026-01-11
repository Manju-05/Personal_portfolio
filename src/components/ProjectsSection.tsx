import React, { useRef, useState } from 'react';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Project } from '../types';

const projectsData: Project[] = [
  {
    id: 1,
    title: "Automated Railway Gate",
    description: "Automatic Railway Gate Control System using Arduino, ultrasonic sensors, and servo motors to improve railway crossing safety. Real-time sensor-based automation.",
    image: "./assets/images/project1.png",
    tags: ["Arduino", "Sensors", "IoT", "C++"],
    githubUrl: "https://github.com/Manju-05/Automated_railway_Gate_Control",
    liveUrl: "https://github.com/Manju-05/Automated_railway_Gate_Control/blob/main/railway/images/railway_circuit.png"
  },
  {
    id: 2,
    title: "Store Management System",
    description: "Efficiently manage product inventory, sales records, and customer data using a database-driven backend. Includes data visualization and reporting.",
    image: "./assets/images/project3.jpeg",
    tags: ["PHP", "MySQL", "JavaScript", "HTML/CSS"],
    githubUrl: "https://github.com/Manju-05/Store-Management-System",
    liveUrl: "https://github.com/Manju-05/Store-Management-System/blob/main/images/Screenshot%20(31).png"
  },
  {
    id: 3,
    title: "E-Mart Platform",
    description: "A comprehensive online shopping platform with product browsing, user management, payment integration, and order tracking modules.",
    image: "./assets/images/project4.jpeg",
    tags: ["Java", "HTML/CSS", "JavaScript", "SQL"],
    githubUrl: "https://github.com/Manju-05",
    liveUrl: "https://github.com/Manju-05"
  },
  {
    id: 4,
    title: "Netflix Clone",
    description: "A pixel-perfect recreation of the Netflix UI. Demonstrates advanced front-end skills, responsive design, and dynamic content handling.",
    image: "./assets/images/project2.png",
    tags: ["React", "CSS", "API Integration"],
    githubUrl: "https://github.com/Manju-05/Netflix_Clone",
    liveUrl: "https://manju-05.github.io/Netflix_Clone/"
  },
  {
    id: 5,
    title: "Agentroom AI",
    description: "An advanced AI interaction platform showcasing dynamic agent capabilities and real-time responses. Built with modern AI frameworks.",
    image: "/assets/images/agentroom_ai.png",
    tags: ["React", "HTML/CSS", "js", "Node.js"],
    githubUrl: "https://github.com/Manju-05/",
    liveUrl: "https://agentroomai.com/"
  },
  {
    id: 6,
    title: "Smiley Foundations",
    description: "A dedicated website for a non-profit organization, featuring event management, donation processing, and community outreach modules.",
    image: "/assets/images/smiley_foundation.png",
    tags: ["HTML/CSS", "js", "Typescript"],
    githubUrl: "https://github.com/Manju-05/smiley_foundation",
    liveUrl: "https://smileyfoundation.netlify.app/"
  }
];

const BrowserFrame = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-xl overflow-hidden border border-white/10 bg-[#1a1a1a] shadow-2xl ${className}`}>
    {/* Browser Header */}
    <div className="h-6 bg-[#2a2a2a] border-b border-white/5 flex items-center px-4 gap-2">
      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
      {/* Fake URL Bar */}
      <div className="ml-4 flex-1 h-3.5 bg-[#1a1a1a] rounded-full border border-white/5 opacity-50" />
    </div>
    {/* Content */}
    <div className="relative group">
      {children}
    </div>
  </div>
);

const SpotlightCard = ({ project, index }: { project: Project; index: number }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gray-900/50 backdrop-blur-md group"
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(147, 51, 234, 0.4), transparent 40%)`,
          maskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
          WebkitMaskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px' // Width of the border
        }}
      />

      <div className="p-5 md:p-6 h-full flex flex-col relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-4 gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors truncate">
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-1 bg-white/5 rounded-md text-gray-400 border border-white/5 whitespace-nowrap">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-purple-600 transition-all duration-300 shrink-0"
          >
            <ExternalLink size={20} />
          </a>
        </div>

        {/* Browser Window Image */}
        <div className="mb-4 relative transform group-hover:-translate-y-1 transition-transform duration-500">
          <BrowserFrame>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-40 md:h-48 object-cover object-top filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </BrowserFrame>
        </div>

        {/* Description & Link */}
        <div className="mt-auto">
          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          <div className="flex items-center gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              <Github size={16} /> <span>Code</span>
            </a>
            <div className="h-4 w-[1px] bg-white/10" />
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors group/link"
            >
              <span>Live Demo</span> <ArrowRight size={16} className="transform group-hover/link:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-16 bg-[#0a0a0a] relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-purple-400 text-sm font-medium mb-6">
            Portfolio
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">Work</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A collection of projects where design meets functionality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10 max-w-7xl mx-auto">
          {projectsData.map((project, index) => (
            <SpotlightCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};