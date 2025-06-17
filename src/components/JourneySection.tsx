import React from 'react';
import { GraduationCap, Award } from 'lucide-react';
import { TimelineItem } from '../types';

const journeyData: TimelineItem[] = [
  {
    id: 1,
    title: "Diploma in Computer Science Engineering",
    institution: "AVR & SVR Engineering College",
    period: "2020 - 2023",
    grade: "93%",
    description: "Achieved outstanding academic performance with 93 percentile. Built strong foundation in computer science principles and programming fundamentals."
  },
  {
    id: 2,
    title: "B.Tech in CSE (AI & ML)",
    institution: "RGM Group of Institutions",
    period: "2023 - Present",
    grade: "85% (Pursuing)",
    description: "Currently pursuing Baachelors in Computer Science and Engineering with Artificial Intelligence and Machine Learning, focusing on advanced algorithms and modern development practices."
  }
];

export const JourneySection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-all duration-500 scroll-animate">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll" data-animation="fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-purple-600 dark:text-purple-400">My</span>{' '}
              <span className="text-gray-800 dark:text-white">Journey</span>
            </h2>
            <div className="w-24 h-1 bg-purple-600 dark:bg-purple-400 mx-auto rounded-full"></div>
          </div>

          <div className="relative">
            {/* Creative Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full">
              <div className="w-full h-full bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600 dark:from-purple-500 dark:via-purple-600 dark:to-purple-700 rounded-full">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-purple-400 dark:bg-purple-500 rounded-full animate-ping"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-purple-600 dark:bg-purple-700 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>

            {journeyData.map((item, index) => (
              <div
                key={item.id}
                className={`relative flex items-center mb-16 animate-on-scroll ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
                data-animation={index % 2 === 0 ? 'slide-left' : 'slide-right'}
              >
                {/* Creative Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700 rounded-full border-4 border-white dark:border-gray-800 shadow-lg flex items-center justify-center">
                      {index === 0 ? (
                        <Award className="w-4 h-4 text-white" />
                      ) : (
                        <GraduationCap className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="absolute -inset-1 bg-purple-400 dark:bg-purple-600 rounded-full blur-sm opacity-50 animate-pulse"></div>
                  </div>
                </div>

                {/* Content Card */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 transition-all duration-500 hover:shadow-2xl transform hover:scale-105">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl mr-4">
                        {index === 0 ? (
                          <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        ) : (
                          <GraduationCap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{item.title}</h3>
                        <p className="text-purple-600 dark:text-purple-400 font-semibold">{item.period}</p>
                      </div>
                    </div>
                    
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {item.institution}
                    </p>

                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-2">
                      Grade: {item.grade}
                    </p>
                    
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Spacer for larger screens */}
                <div className="hidden lg:block w-2/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};