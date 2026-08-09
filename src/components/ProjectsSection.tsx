import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { FocusRail, type FocusRailItem } from './ui/focus-rail';

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

const DEMO_ITEMS: FocusRailItem[] = projectsData.map(p => ({
  id: p.id,
  title: p.title,
  description: p.description,
  meta: p.tags.slice(0, 2).join(' • ').toUpperCase(),
  imageSrc: p.image,
  href: p.liveUrl,
  githubUrl: p.githubUrl
}));

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-16 md:py-20 bg-[#050505] relative overflow-hidden">
      {/* Background Grids */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_50%,transparent_100%)] pointer-events-none z-0" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-purple-400 text-xs font-semibold mb-4 backdrop-blur-md">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">Work</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm md:text-base">
            Navigate the rail to explore a collection of projects where intelligent automation meets seamless design.
          </p>
        </motion.div>

        {/* The Component */}
        <div className="w-full">
          <FocusRail items={DEMO_ITEMS} />
        </div>
      </div>
    </section>
  );
};