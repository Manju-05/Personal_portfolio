import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Download } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Cursor follow logic for desktop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#050505]">
      
      {/* Subtle Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] z-0" />

      {/* Cursor Follow Glow (Desktop only via css hidden on small screens) */}
      <motion.div 
        className="hidden lg:block absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0 mix-blend-screen"
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5
        }}
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, rgba(59, 130, 246, 0.05) 40%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-4 py-20 relative z-10 flex flex-col items-center text-center mt-10">
        <motion.div
          className="space-y-8 max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-4">
            <motion.p variants={itemVariants} className="text-2xl md:text-3xl text-gray-400 font-light tracking-wide uppercase">
              Hello,
            </motion.p>
            <motion.h1 variants={itemVariants} className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight">
              I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">Manjunath</span>
            </motion.h1>
            <motion.div variants={itemVariants} className="text-xl md:text-3xl lg:text-4xl text-gray-300 font-medium italic h-12 flex items-center justify-center whitespace-nowrap mt-4">
              And I'm an <span className="ml-3 text-purple-400">Aspiring AI & Automation Engineer</span>
            </motion.div>
          </div>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Aspiring AI & ML engineer pursuing B.Tech in CSE, passionate about merging technology with design to create intelligent, visually immersive, and meaningful web experiences.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <motion.a
              href="https://drive.google.com/file/d/1IaTowhh0Crxq1mr3o-Wbri6Vos5y1d7r/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-3 cursor-pointer"
            >
              <Download size={22} />
              GET MY CV
            </motion.a>

            <div className="flex gap-4">
              <motion.a
                href="https://www.linkedin.com/in/sai-manjunath-764845344/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-4 bg-white/5 border border-white/10 rounded-full shadow-md transition-colors duration-300 text-gray-400 hover:text-[#0077b5] hover:bg-[#0077b5]/10 hover:border-[#0077b5]/50"
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a
                href="https://github.com/Manju-05"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-4 bg-white/5 border border-white/10 rounded-full shadow-md transition-colors duration-300 text-gray-400 hover:text-black hover:bg-white hover:border-white"
              >
                <Github size={24} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};