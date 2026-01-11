import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Download } from 'lucide-react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';

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

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);


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

  const floatingVariants: Variants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 flex items-center transition-all duration-500 overflow-hidden relative">
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-2">
              <motion.p variants={itemVariants} className="text-3xl lg:text-4xl text-gray-500 dark:text-gray-400 font-light mt-10 md:mt-0">
                Hello,
              </motion.p>
              <motion.h1 variants={itemVariants} className="text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white">
                I'm Manjunath
              </motion.h1>
              <motion.div variants={itemVariants} className="text-lg md:text-2xl lg:text-3xl text-purple-600 dark:text-purple-400 font-medium italic h-12 flex items-center whitespace-nowrap">
                And I'm a <span className="ml-2">{displayedText}<span className="animate-pulse">|</span></span>
              </motion.div>
            </div>

            <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Aspiring AI & ML engineer pursuing B.Tech in CSE, passionate about merging technology with design to create intelligent, visually immersive, and meaningful web experiences
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="https://drive.google.com/file/d/1IaTowhh0Crxq1mr3o-Wbri6Vos5y1d7r/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-800 dark:bg-white text-white dark:text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors duration-300 shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Download size={20} />
                GET MY CV
              </motion.a>

              <div className="flex gap-4">
                <motion.a
                  href="https://www.linkedin.com/in/sai-manjunath-764845344/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white dark:bg-gray-700 rounded-full shadow-md transition-colors duration-300 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  <Linkedin size={24} />
                </motion.a>
                <motion.a
                  href="https://github.com/Manju-05"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white dark:bg-gray-700 rounded-full shadow-md transition-colors duration-300 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  <Github size={24} />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative w-[70%]">
              <motion.img
                src="./assets/images/snap.jpeg"
                alt="Sai Manjunath Pathapadu"
                style={{ y: y1 }}
                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl relative z-10"
                loading="lazy"
              />

              {/* Floating Elements */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full z-0 opacity-80"
              ></motion.div>
              <motion.div
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 1, duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-400 rounded-full z-20 opacity-80"
              ></motion.div>
              <motion.div
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 0.5, duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 -left-8 w-8 h-8 bg-pink-400 rounded-full z-20 opacity-80"
              ></motion.div>

              {/* Decorative Blur */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-500/20 blur-3xl -z-10 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};