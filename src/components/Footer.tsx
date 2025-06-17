import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2 text-center text-gray-600 dark:text-gray-400 text-sm">
        <span>© 2025 Sai Manjunath Pathapadu. All rights reserved.</span>
        <span>Developed with <span className="text-red-500">❤️</span> by manjupathapadu</span>
      </div>
    </footer>
  );
};