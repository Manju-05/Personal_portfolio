import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-900 transition-all duration-500 scroll-animate">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-on-scroll" data-animation="fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-purple-600 dark:text-purple-400">About</span>{' '}
              <span className="text-gray-800 dark:text-white">Me</span>
            </h2>
            <div className="w-24 h-1 bg-purple-600 dark:bg-purple-400 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 lg:p-10 transition-all duration-500 hover:shadow-2xl animate-on-scroll" data-animation="zoom-in">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1">
                <div className="w-48 h-48 mx-auto bg-gradient-to-b from-white to-white dark:from-gray-800 dark:to-gray-800 rounded-full flex items-center justify-center shadow-2xl overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="/assets/images/logo.png"
                      alt="Sai Manjunath"
                      className="w-full h-full object-cover transform translate-y-4"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                  <p className="text-lg">
                    Hi, I'm <span className="text-purple-600 dark:text-purple-400 font-semibold">Sai Manjunath</span>, a curious and driven 
                    <span className="text-purple-600 dark:text-purple-400 font-semibold"> Computer Science Engineering student</span> specializing in 
                    <span className="text-purple-600 dark:text-purple-400 font-semibold"> Artificial Intelligence and Machine Learning</span>. 
                    I'm currently exploring the exciting world of <span className="text-purple-600 dark:text-purple-400 font-semibold">Machine Learning</span>, 
                    with a strong enthusiasm for building intelligent models and applying them to real-world problems through hands-on projects.
                  </p>
                  
                  <p className="text-lg">
                    My journey into tech began with a <span className="font-semibold">Diploma in Computer Science</span>, where I developed a solid 
                    foundation in programming and logical thinking. This was further strengthened during a 
                    <span className="font-semibold"> six-month internship</span> in <span className="font-semibold">Java development</span> at 
                    <span className="font-semibold"> MNP Software Solutions Pvt. Ltd.</span>, where I gained practical experience by contributing 
                    to real-time applications.
                  </p>
                  
                  <p className="text-lg">
                    As a <span className="text-purple-600 dark:text-purple-400 font-semibold">B.Tech student at RGM Group of Institutions</span>, 
                    I'm diving deeper into <span className="text-purple-600 dark:text-purple-400 font-semibold">AI, ML, and web development</span>, 
                    continuously expanding my knowledge and skill set. I'm particularly passionate about designing 
                    <span className="text-purple-600 dark:text-purple-400 font-semibold"> clean, user-centric web interfaces</span> and developing 
                    <span className="text-purple-600 dark:text-purple-400 font-semibold"> smart systems</span> that have meaningful impact.
                  </p>

                  <p className="text-lg">
                    With a growth mindset and a passion for innovation, I'm always eager to 
                    <span className="text-purple-600 dark:text-purple-400 font-semibold"> learn</span>, 
                    <span className="text-purple-600 dark:text-purple-400 font-semibold"> collaborate</span>, and 
                    <span className="text-purple-600 dark:text-purple-400 font-semibold"> build</span> — turning ideas into tangible solutions.
                    Let's connect and create something impactful together!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};