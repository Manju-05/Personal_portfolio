import React from 'react';
import { motion } from 'framer-motion';
import { Database, BrainCircuit, Server, Code, Layers } from 'lucide-react';

const pipelineSteps = [
  {
    id: 1,
    title: 'Data Gathering',
    description: 'Ingesting and preprocessing raw data from diverse sources into structured formats.',
    icon: <Database size={24} />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    title: 'Model Training',
    description: 'Designing and fine-tuning neural networks and machine learning models for high accuracy.',
    icon: <BrainCircuit size={24} />,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    title: 'Backend Integration',
    description: 'Connecting AI models with robust APIs and microservices for scalable access.',
    icon: <Server size={24} />,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 4,
    title: 'Frontend Experience',
    description: 'Building immersive, intelligent web interfaces to interact seamlessly with AI features.',
    icon: <Layers size={24} />,
    color: 'from-emerald-500 to-teal-500'
  }
];

export const ArchitectureSection: React.FC = () => {
  return (
    <section id="architecture" className="py-20 bg-gray-50 dark:bg-[#080b12] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-white/5 border border-blue-200 dark:border-white/10 text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide uppercase mb-4">
            Development Pipeline
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Data to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Intelligence</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg mb-12">
            A structured, holistic approach to building end-to-end AI applications, from raw data ingestion to immersive user interfaces.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Desktop/Tablet Horizontal Pipeline */}
          <div className="hidden md:flex relative justify-between items-start pt-10">
            {/* Connecting Line */}
            <div className="absolute top-20 left-10 right-10 h-1 bg-gray-200 dark:bg-gray-800 rounded-full z-0">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                viewport={{ once: true }}
              />
            </div>

            {pipelineSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative z-10 flex flex-col items-center w-1/4 px-4 group"
              >
                <div className={`w-20 h-20 rounded-2xl bg-white dark:bg-gray-900 shadow-xl border border-gray-100 dark:border-gray-800 flex items-center justify-center mb-6 relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-2`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                  <div className="text-gray-700 dark:text-gray-200 group-hover:scale-110 transition-transform duration-300 z-10">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mobile Vertical Pipeline */}
          <div className="md:hidden flex flex-col gap-8 relative pl-8">
            {/* Vertical Line */}
            <div className="absolute top-0 bottom-0 left-[31px] w-1 bg-gray-200 dark:bg-gray-800 rounded-full z-0">
               <motion.div 
                className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 rounded-full"
                initial={{ height: "0%" }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                viewport={{ once: true }}
              />
            </div>

            {pipelineSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative z-10 flex items-start gap-6 group"
              >
                <div className={`w-14 h-14 shrink-0 rounded-2xl bg-white dark:bg-gray-900 shadow-xl border border-gray-100 dark:border-gray-800 flex items-center justify-center relative overflow-hidden -ml-[27px]`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                  <div className="text-gray-700 dark:text-gray-200 group-hover:scale-110 transition-transform duration-300 z-10">
                    {React.cloneElement(step.icon as React.ReactElement, { size: 20 })}
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
