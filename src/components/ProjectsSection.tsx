import React from 'react';
import { Github, ExternalLink, Eye } from 'lucide-react';
import { Project } from '../types';

const projectsData: Project[] = [
  {
    id: 1,
    title: "Automated Railway gate control system",
    description: "Automatic Railway Gate Control System using Arduino, ultrasonic sensors, andservo motors to improve railway crossing safety. Developed real-time sensor-based automation to detect train movement and control gate operation, reducing human error and enhancing efficiency",
    image: "./assets/images/project1.png",
    tags: ["Arduino",  "Sensors","Motors","proteus","Iot"],
    githubUrl: "https://github.com/Manju-05/Automated_railway_Gate_Control",
    liveUrl: "https://github.com/Manju-05/Automated_railway_Gate_Control/blob/main/railway/images/railway_circuit.png"
  },
  {
    id: 2,
    title: "Store Management System",
    description: "Store Management System to efficiently manage product inventory, sales records, and customer data using a database-driven backend. Implemented features for data visualization, retrieval, and reporting to improve store operations and decision-making",
    image: "./assets/images/project3.jpeg",
    tags: ["HTML", "CSS", "php" , "javascript","mysql","Xaamp"],
    githubUrl: "https://github.com/Manju-05/Store-Management-System",
    liveUrl: "https://github.com/Manju-05/Store-Management-System/blob/main/images/Screenshot%20(31).png"
  },
  {
    id: 3,
    title: "E-mart",
    description: "E-Mart is an online shopping platform developed to provide a convenient, user-friendly experience for purchasing products across various categories. The project includes modules for product browsing, user management, payment integration, and order tracking, aiming to simplify e-commerce operations",
    image: "./assets/images/project4.jpeg",
    tags: ["HTML", "CSS", "java" , "javascript"],
    githubUrl: "https://github.com/Manju-05",
    liveUrl: "https://github.com/Manju-05"
  },
  {
    id: 4,
    title: "Web development",
    description: "My hands-on front-end development skills through the recreation of popular websites like Netflix, and other basic websites.Built using HTML, CSS, and JavaScript, these clone projects demonstrate my ability to replicate real-world user interfaces.",
    image: "./assets/images/project2.png",
    tags: ["Python", "Bolt", "JavaScript","wordpress"],
    githubUrl: "https://github.com/Manju-05/Netflix_Clone",
    liveUrl: "https://manju-05.github.io/Netflix_Clone/"
  }
];

export const ProjectsSection: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800 transition-all duration-500 scroll-animate">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll" data-animation="fade-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-purple-600 dark:text-purple-400">My</span>{' '}
            <span className="text-gray-800 dark:text-white">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-purple-600 dark:bg-purple-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl transform hover:scale-105 animate-on-scroll"
              data-animation="fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                      >
                        <Github size={20} />
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                      >
                        <Eye size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                  >
                    <Github size={18} />
                    GitHub
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 dark:bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-700 dark:hover:bg-purple-600 transition-all duration-300 transform hover:scale-105"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};