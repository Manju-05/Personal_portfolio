import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion';
import { GraduationCap, Award, MapPin, Sparkles } from 'lucide-react';

interface JourneyItem {
  id: number;
  title: string;
  institution: string;
  period: string;
  grade: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const journeyData: JourneyItem[] = [
  {
    id: 1,
    title: "Diploma in Computer Science",
    institution: "AVR & SVR Engineering College",
    period: "2021 - 2024",
    grade: "93%",
    description: "Achieved outstanding academic performance with a focus on core computer science principles.",
    icon: <Award className="w-5 h-5" />,
    color: "from-amber-400 to-orange-500"
  },
  {
    id: 2,
    title: "B.Tech in CSE (AI & ML)",
    institution: "RGM Group of Institutions",
    period: "2024 - Present",
    grade: "85% (Pursuing)",
    description: "Specializing in Artificial Intelligence and Machine Learning, exploring advanced algorithms.",
    icon: <GraduationCap className="w-5 h-5" />,
    color: "from-cyan-400 to-blue-500"
  }
];

// --- 3D Card with Glassmorphism ---
const Card3D: React.FC<{ children: React.ReactNode; className?: string; color: string }> = ({ children, className, color }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  // Simplified tilt effect
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left - width / 2;
    const y = clientY - top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      animate={{ scale: isHovered ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="relative h-full transition-all duration-200"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
      >
        {/* Glow behind the card */}
        <div className={`absolute -inset-1 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

        {/* Main Card */}
        <div className="relative h-full backdrop-blur-xl bg-white/70 dark:bg-zinc-900/60 border border-white/20 dark:border-white/10 rounded-2xl p-6 overflow-hidden shadow-xl dark:shadow-2xl dark:shadow-purple-900/10">

          {/* Spotlight Effect */}
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  500px circle at ${mouseX.get() + 250}px ${mouseY.get() + 150}px,
                  rgba(255, 255, 255, 0.1),
                  transparent 80%
                )
              `,
            }}
          />

          <div className="relative z-10">{children}</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Floating Particles Background ---
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-purple-500/10 dark:bg-purple-400/10 rounded-full blur-md"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -100 + "%"],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: Math.random() * 100 + 50 + "px",
            height: Math.random() * 100 + 50 + "px",
          }}
        />
      ))}
    </div>
  );
};

export const JourneySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

  return (
    <section ref={containerRef} id="journey" className="py-10 bg-gray-50/50 dark:bg-black relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent opacity-40 dark:opacity-60" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <FloatingParticles />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              Academic Path
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 pb-2">
            Education Journey
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Central Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-transparent via-purple-300 dark:via-purple-700 to-transparent opacity-30" />

          {/* Animated Path (Optional addition to standard straight line) */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <motion.path
                d="M 50 0 L 50 100"
                stroke="url(#education-gradient)"
                strokeWidth="0.5"
                fill="none"
                style={{ pathLength }}
              />
              <defs>
                <linearGradient id="education-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9333ea" stopOpacity="0" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#9333ea" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="space-y-8 relative z-10">
            {journeyData.map((item, index) => (
              <div key={item.id} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                {/* Content Card */}
                <div className="flex-1 w-full group perspective-1000">
                  <Card3D className="w-full" color={item.color}>
                    <div className="flex flex-col gap-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-10 dark:bg-opacity-20 text-white shadow-lg`}>
                          {item.icon}
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/50 dark:bg-white/5 border border-white/20 text-gray-600 dark:text-gray-300 backdrop-blur-sm">
                          {item.period}
                        </span>
                      </div>

                      {/* Body */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-sm text-purple-600 dark:text-purple-400 mb-2">
                          <MapPin className="w-3.5 h-3.5" />
                          {item.institution}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between mt-auto">
                        <span className="text-xs text-gray-500 dark:text-gray-500 font-medium">Percentage</span>
                        <div className="flex items-center gap-2">
                          <div className={`h-1.5 w-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden`}>
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: "100%" }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className={`h-full bg-gradient-to-r ${item.color}`}
                            />
                          </div>
                          <span className={`text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r ${item.color}`}>
                            {item.grade}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card3D>
                </div>

                {/* Timeline Node */}
                <div className="relative z-10 flex items-center justify-center -my-4 md:my-0">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} blur-lg opacity-40`} />
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className={`w-4 h-4 rounded-full border-2 border-white dark:border-zinc-900 bg-gradient-to-r ${item.color} shadow-lg relative z-10`}
                    />
                  </div>
                </div>

                {/* Empty Space for layout */}
                <div className="flex-1 w-full hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
