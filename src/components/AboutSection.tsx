import React from 'react';
import { motion } from 'framer-motion';
import { Target, Code2, Cpu, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#0a0a0a] transition-all duration-500 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-purple-400 text-sm font-medium tracking-wide uppercase mb-4">
              Behind the Code
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-white">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Me</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden"
          >
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-10">
              
              <div className="space-y-4 text-gray-300 leading-relaxed text-lg lg:text-xl text-center">
                <p>
                  I am a passionate <span className="text-white font-semibold">AI & Automation Engineer</span> dedicated to streamlining complex workflows and building intelligent systems. 
                </p>
                <p>
                  My goal is simple: to leverage tools like <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-bold">UiPath, n8n, and Python</span> to eliminate repetitive tasks and create scalable, AI-driven architectures that solve real-world problems.
                </p>
              </div>

              {/* Highlights Grid */}
              <div className="grid sm:grid-cols-2 gap-6 pt-8 border-t border-white/10">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl">
                    <Target size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Intelligent Automation</h4>
                    <p className="text-sm text-gray-400">RPA, UiPath & n8n workflows</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
                    <Code2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Python Development</h4>
                    <p className="text-sm text-gray-400">Scripting, API integration & data</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="p-3 bg-pink-500/20 text-pink-400 rounded-xl">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">AI & Machine Learning</h4>
                    <p className="text-sm text-gray-400">Predictive models & data analysis</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Certifications</h4>
                    <p className="text-sm text-gray-400">UiPath Certified Professional</p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};