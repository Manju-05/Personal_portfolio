import React from 'react';

const techStack = [
  { 
    name: 'HTML5', 
    logo: './assets/images/tech/html-logo.svg',
    description: 'Markup language for web structure',
    color: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
    hoverColor: 'hover:shadow-orange-500/20 hover:border-orange-300 dark:hover:border-orange-700'
  },
  { 
    name: 'CSS3', 
    logo: './assets/images/tech/css-logo.svg',
    description: 'Styling and layout design',
    color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    hoverColor: 'hover:shadow-blue-500/20 hover:border-blue-300 dark:hover:border-blue-700'
  },
  { 
    name: 'JavaScript', 
    logo: './assets/images/tech/js-logo.svg',
    description: 'Interactive web functionality',
    color: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    hoverColor: 'hover:shadow-yellow-500/20 hover:border-yellow-300 dark:hover:border-yellow-700'
  },
  { 
    name: 'Wordpress', 
    logo: './assets/images/tech/wordpress-logo.svg',
    description: 'Open platform for creating websites and blogs',
    color: 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800',
    hoverColor: 'hover:shadow-cyan-500/20 hover:border-cyan-300 dark:hover:border-cyan-700'
  },
  { 
    name: 'Machine Learning', 
    logo: './assets/images/tech/ml-logo.svg',
    description: 'Basics concepts and libraries',
    color: 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800',
    hoverColor: 'hover:shadow-teal-500/20 hover:border-teal-300 dark:hover:border-teal-700'
  },
  { 
    name: 'Python', 
    logo: './assets/images/tech/python-logo.svg',
    description: 'Backend and ML development',
    color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    hoverColor: 'hover:shadow-green-500/20 hover:border-green-300 dark:hover:border-green-700'
  },
  { 
    name: 'GitHub', 
    logo: './assets/images/tech/github-logo.svg',
    description: 'Version control and collaboration',
    color: 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700',
    hoverColor: 'hover:shadow-gray-500/20 hover:border-gray-300 dark:hover:border-gray-600'
  },
  { 
    name: 'Arduino', 
    logo: './assets/images/tech/arduino-logo.svg',
    description: 'IoT and hardware projects',
    color: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800',
    hoverColor: 'hover:shadow-indigo-500/20 hover:border-indigo-300 dark:hover:border-indigo-700'
  }
];

export const TechStackSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-all duration-500 scroll-animate">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll" data-animation="fade-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-purple-600 dark:text-purple-400">Tech Stack</span>{' '}
            <span className="text-gray-800 dark:text-white">& Tools</span>
          </h2>
          <div className="w-24 h-1 bg-purple-600 dark:bg-purple-400 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-6 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Professional Grid Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className={`group relative ${tech.color} ${tech.hoverColor} border-2 rounded-2xl p-6 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl animate-on-scroll backdrop-blur-sm`}
                data-animation="fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Tech Logo */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                    <img
                      src={tech.logo}
                      alt={`${tech.name} logo`}
                      className="w-10 h-10 object-contain transition-all duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Tech Name */}
                <h3 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {tech.name}
                </h3>

                {/* Tech Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                  {tech.description}
                </p>

                {/* Subtle Glow Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br from-purple-400 to-purple-600 blur-xl -z-10"></div>

                {/* Corner Accent */}
                <div className="absolute top-3 right-3 w-2 h-2 bg-purple-400 dark:bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Decorative Elements */}
        <div className="relative mt-16">
          <div className="absolute inset-0 flex justify-center items-center opacity-5 dark:opacity-10">
            <div className="text-9xl font-bold text-gray-400 dark:text-gray-600 select-none">
              &lt;/&gt;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};