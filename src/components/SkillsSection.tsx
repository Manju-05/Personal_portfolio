import React, { useState, useEffect, useRef } from 'react';
import { Code, Database, GitBranch, Brain, MessageCircle } from 'lucide-react';
import { Skill } from '../types';

const skillsData: Skill[] = [
  { name: 'Frontend Development', percentage: 90, icon: 'Code' },
  { name: 'Python', percentage: 85, icon: 'Database' },
  { name: 'GitHub', percentage: 85, icon: 'GitBranch' },
  { name: 'Machine Learning', percentage: 75, icon: 'Brain' },
  { name: 'Communication', percentage: 70, icon: 'MessageCircle' }
];

const IconComponent = ({ iconName, className }: { iconName: string; className: string }) => {
  const icons = {
    Code: <Code className={className} />,
    Database: <Database className={className} />,
    GitBranch: <GitBranch className={className} />,
    Brain: <Brain className={className} />,
    MessageCircle: <MessageCircle className={className} />
  };
  return icons[iconName as keyof typeof icons] || <Code className={className} />;
};

export const SkillsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-800 transition-all duration-500 scroll-animate">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll" data-animation="fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-purple-600 dark:text-purple-400">My</span>{' '}
              <span className="text-gray-800 dark:text-white">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-purple-600 dark:bg-purple-400 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 lg:p-12 transition-all duration-500 animate-on-scroll" data-animation="zoom-in">
            <div className="space-y-8">
              {skillsData.map((skill, index) => (
                <div key={skill.name} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        <IconComponent 
                          iconName={skill.icon} 
                          className="w-5 h-5 text-purple-600 dark:text-purple-400" 
                        />
                      </div>
                      <span className="text-lg font-semibold text-gray-800 dark:text-white">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {skill.percentage}%
                    </span>
                  </div>
                  
                  <div className="relative">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.percentage}%` : '0%',
                          transitionDelay: `${index * 200}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};