import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Database, Network } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const HeroInteractive: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'system' | 'model' | 'neural'>('system');
  const [logs, setLogs] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const mockLogs = {
    system: [
      "> Initializing Manjunath's AI Portfolio...",
      "> Loading ML models from storage...",
      "> Optimizing frontend rendering...",
      "> System status: ALL SYSTEMS NOMINAL.",
      "> Ready for user interaction."
    ],
    model: [
      "> Loading Transformer architecture...",
      "> Parameters: 1.5B (Quantized)",
      "> Context window: 8192 tokens",
      "> Status: Awaiting inference requests...",
      "  Type your prompt or explore the portfolio."
    ],
    neural: [
      "> Initializing neural pathways...",
      "> Layer 1: Data Preprocessing (Active)",
      "> Layer 2: Feature Extraction (Active)",
      "> Layer 3: Predictive Analytics (Active)",
      "> Topology mapping complete."
    ]
  };

  useEffect(() => {
    let currentLogs = mockLogs[activeTab];
    setLogs([]);
    setIsTyping(true);
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < currentLogs.length) {
        setLogs(prev => [...prev, currentLogs[currentIndex]]);
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <div className="w-full max-w-md mx-auto rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-[#0d1220]/80 shadow-2xl backdrop-blur-xl transition-colors duration-500">
      {/* Window Header */}
      <div className="h-10 bg-gray-100 dark:bg-black/40 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-gray-400">
          <Terminal size={14} />
          <span>ai_engine_v2.1.sh</span>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="flex border-b border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
        <button 
          onClick={() => setActiveTab('system')}
          className={`flex-1 py-2 px-3 text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'system' ? 'text-purple-600 dark:text-purple-400 bg-white dark:bg-white/10 border-b-2 border-purple-500' : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          <Database size={14} /> SysLogs
        </button>
        <button 
          onClick={() => setActiveTab('model')}
          className={`flex-1 py-2 px-3 text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'model' ? 'text-blue-600 dark:text-blue-400 bg-white dark:bg-white/10 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          <Cpu size={14} /> Model
        </button>
        <button 
          onClick={() => setActiveTab('neural')}
          className={`flex-1 py-2 px-3 text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'neural' ? 'text-emerald-600 dark:text-emerald-400 bg-white dark:bg-white/10 border-b-2 border-emerald-500' : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          <Network size={14} /> Neural
        </button>
      </div>

      {/* Terminal Output */}
      <div className="p-4 h-[220px] font-mono text-xs md:text-sm overflow-y-auto custom-scrollbar flex flex-col gap-2">
        <AnimatePresence>
          {logs.map((log, index) => (
            <motion.div
              key={`${activeTab}-${index}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`
                ${log.includes('Status:') || log.includes('status:') ? 'text-green-600 dark:text-green-400 font-bold' : 'text-gray-700 dark:text-gray-300'}
                ${log.startsWith('  ') ? 'pl-4 text-gray-500 dark:text-gray-400' : ''}
              `}
            >
              {log}
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-2 h-4 bg-purple-500/80 inline-block mt-1"
          />
        )}
      </div>

      {/* Input Simulation */}
      <div className="p-3 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 flex items-center gap-3">
        <span className="text-purple-600 dark:text-purple-400 font-bold font-mono">~/$</span>
        <input 
          type="text" 
          disabled
          placeholder="Execute command or explore site..." 
          className="bg-transparent border-none outline-none text-xs md:text-sm w-full font-mono text-gray-600 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-600"
        />
      </div>
    </div>
  );
};
