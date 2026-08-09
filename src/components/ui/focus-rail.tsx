"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, Github } from "lucide-react";

export interface FocusRailItem {
  id: number | string;
  title: string;
  description: string;
  meta: string;
  imageSrc: string;
  href: string;
  githubUrl?: string;
}

interface FocusRailProps {
  items: FocusRailItem[];
}

export const FocusRail: React.FC<FocusRailProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = items.length - 1;
      if (nextIndex >= items.length) nextIndex = 0;
      return nextIndex;
    });
  }, [items.length]);

  const activeItem = items[currentIndex];
  const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 10 : -10,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 10 : -10,
    }),
  };

  return (
    <div className="relative w-full max-w-[1200px] mx-auto h-[450px] md:h-[500px] flex flex-col justify-end overflow-hidden rounded-[24px] bg-[#0a0a0a] border border-white/5">
      {/* Background Glow from Active Image */}
      <AnimatePresence initial={false}>
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <img src={activeItem.imageSrc} alt="" className="w-full h-full object-cover blur-3xl opacity-20 saturate-150" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Image Gallery Track */}
      <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden" style={{ perspective: 1000 }}>
        
        {/* Left Item */}
        <div className="absolute left-[-10%] md:left-[10%] w-[50%] md:w-[25%] h-[60%] md:h-[65%] opacity-40 blur-[2px] transform scale-90 -rotate-3 transition-all duration-700 pointer-events-none">
           <img src={items[prevIndex].imageSrc} className="w-full h-full object-cover rounded-2xl" />
           <div className="absolute inset-0 bg-black/50 rounded-2xl" />
        </div>

        {/* Center Item */}
        <div className="relative w-[70%] md:w-[35%] lg:w-[30%] h-[70%] z-20">
           <AnimatePresence initial={false} custom={direction}>
             <motion.img
               key={activeItem.id}
               src={activeItem.imageSrc}
               custom={direction}
               variants={variants}
               initial="enter"
               animate="center"
               exit="exit"
               transition={{ 
                 x: { type: "spring", stiffness: 300, damping: 30 }, 
                 opacity: { duration: 0.3 },
                 rotateY: { duration: 0.4 }
               }}
               className="absolute w-full h-full object-cover rounded-2xl shadow-xl border border-white/10 bg-black/50"
             />
           </AnimatePresence>
        </div>

        {/* Right Item */}
        <div className="absolute right-[-10%] md:right-[10%] w-[50%] md:w-[25%] h-[60%] md:h-[65%] opacity-40 blur-[2px] transform scale-90 rotate-3 transition-all duration-700 pointer-events-none">
           <img src={items[nextIndex].imageSrc} className="w-full h-full object-cover rounded-2xl" />
           <div className="absolute inset-0 bg-black/50 rounded-2xl" />
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="relative z-30 p-5 md:p-8 flex flex-col md:flex-row items-end md:items-end justify-between gap-6 w-full">
        {/* Text Content */}
        <div className="flex-1 max-w-xl w-full">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeItem.id}
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -15 }}
               transition={{ duration: 0.3 }}
             >
               <p className="text-emerald-400 text-[10px] md:text-xs font-semibold tracking-wider uppercase mb-2">
                 {activeItem.meta}
               </p>
               <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight line-clamp-1">
                 {activeItem.title}
               </h3>
               <p className="text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none max-w-md">
                 {activeItem.description}
               </p>
             </motion.div>
           </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex flex-row items-center gap-3 shrink-0 w-full md:w-auto justify-between md:justify-end">
          {/* Pagination Controls */}
          <div className="flex items-center gap-3 bg-[#111111]/80 border border-white/10 rounded-full px-4 py-2 backdrop-blur-xl shrink-0">
            <button 
              onClick={() => paginate(-1)} 
              className="text-gray-500 hover:text-white transition-colors p-1"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-gray-300 text-xs font-medium w-8 text-center tracking-wide">
              <span className="text-white">{currentIndex + 1}</span> / {items.length}
            </span>
            <button 
              onClick={() => paginate(1)} 
              className="text-gray-500 hover:text-white transition-colors p-1"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {activeItem.githubUrl && (
              <a
                href={activeItem.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/20 transition-colors"
              >
                <Github size={16} />
              </a>
            )}
            {/* CTA */}
            <a
              href={activeItem.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-black px-4 md:px-5 py-2 md:py-2.5 rounded-full font-semibold text-xs md:text-sm hover:bg-gray-100 transition-colors"
            >
              Explore <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
