import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-all duration-500 hover:scale-110 hover:shadow-lg"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <Sun
          className={`absolute inset-0 text-yellow-500 transition-all duration-500 ${
            isDarkMode ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
          size={24}
        />
        <Moon
          className={`absolute inset-0 text-blue-400 transition-all duration-500 ${
            isDarkMode ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
          size={24}
        />
      </div>
    </button>
  );
};