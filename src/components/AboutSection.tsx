import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedProfileCard, ProfileCardContent } from './AboutMeAnimation';
import { Github, Linkedin, Mail } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-10 bg-white dark:bg-gray-900 transition-all duration-500 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="text-purple-600 dark:text-purple-400">About</span>{' '}
              <span className="text-zinc-800 dark:text-white">Me</span>
            </h2>
            <div className="w-24 h-1 bg-purple-600 dark:bg-purple-400 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 lg:p-10 transition-all duration-500 hover:shadow-2xl"
          >
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1">
                <div className="w-full flex justify-center">
                  <AnimatedProfileCard
                    accentColor="#9333ea"
                    baseCard={
                      <ProfileCardContent
                        name="Sai Manjunath"
                        location="Andhra Pradesh, India"
                        bio="UnderGraduate Student specializing in AI & ML. Passionate about Robotics Operating System (ROS) and Web Development"
                        avatarSrc="/assets/images/snap.jpeg"
                        avatarFallback="SM"
                        socials={[
                          {
                            id: 'github',
                            url: 'https://github.com/Manju-05',
                            icon: <Github size={20} />,
                            label: 'Github',
                          },
                          {
                            id: 'linkedin',
                            url: 'https://www.linkedin.com/in/sai-manjunath-764845344/',
                            icon: <Linkedin size={20} />,
                            label: 'LinkedIn',
                          },
                          {
                            id: 'mail',
                            url: 'mailto:saimanjunathpathapadu2005@gmail.com',
                            icon: <Mail size={20} />,
                            label: 'Email',
                          },
                        ]}
                      />
                    }
                    overlayCard={
                      <ProfileCardContent
                        name="Sai Manjunath"
                        location="Andhra Pradesh, India"
                        bio="Building the future with code. Always learning, always exploring. Let's create something amazing together."
                        avatarSrc="/assets/images/snap.jpeg"
                        avatarFallback="SM"
                        variant="on-accent"
                        socials={[
                          {
                            id: 'github',
                            url: 'https://github.com/Manju-05',
                            icon: <Github size={20} />,
                            label: 'Github',
                          },
                          {
                            id: 'linkedin',
                            url: 'https://www.linkedin.com/in/sai-manjunath-764845344/',
                            icon: <Linkedin size={20} />,
                            label: 'LinkedIn',
                          },
                          {
                            id: 'mail',
                            url: 'mailto:saimanjunathpathapadu2005@gmail.com',
                            icon: <Mail size={20} />,
                            label: 'Email',
                          },
                        ]}
                      />
                    }
                  />
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-6 text-zinc-600 dark:text-zinc-300 leading-relaxed tracking-wide text-left lg:text-justify">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};