import React, { useState, useEffect, useCallback } from 'react';
import { ExternalLink, Award, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Certificate } from '../types';

const certificationsData: Certificate[] = [
  {
    id: 1,
    title: "Certified Cloud Practitioner",
    image: "/assets/images/cert1.jpg",
    verifyUrl: "https://www.credly.com/badges/633d0eb4-3382-405b-b8c9-d284f88a5ca3/linked_in_profile",
    issuer: "AWS"
  },
  {
    id: 2,
    title: "Generative Ai Fundamentals",
    image: "/assets/images/cert2.jpg",
    verifyUrl: "https://credentials.databricks.com/17a9727f-6aea-44fc-970f-8495b36f08d6#acc.l8ZIN0Ve",
    issuer: "Databricks"
  },
  {
    id: 3,
    title: "Machine Learning with Python",
    image: "/assets/images/cert4.jpg",
    verifyUrl: "https://courses.cognitiveclass.ai/certificates/ca0a8f49a61b428492696b07c8a26f5e",
    issuer: "Cognitive Class"
  },
  {
    id: 4,
    title: "Python Certification",
    image: "/assets/images/cert3.jpg",
    verifyUrl: "https://www.udemy.com/certificate/UC-24f7f421-dd99-40c4-8c95-cbb2a9a71c78/",
    issuer: "Udemy"
  },
  {
    id: 5,
    title: "Prompt Engineering",
    image: "/assets/images/cert5.jpg",
    verifyUrl: "https://courses.cognitiveclass.ai/certificates/cc7663f388b94ef9b1ab03a46ff67fe9",
    issuer: "Cognitive Class"
  },
  {
    id: 6,
    title: "AWS Cloud Foundations",
    image: "/assets/images/cert23.jpg",
    verifyUrl: "https://www.credly.com/badges/2fcd7a0e-52b1-4654-9561-7524b3e3c210/print",
    issuer: "AWS Academy"
  },
  {
    id: 7,
    title: "Code innovators 2k24",
    image: "/assets/images/cert7.jpg",
    verifyUrl: "https://unstop.com/certificate-preview/cb2b38d6-f32f-4370-bde7-fe327795bfad",
    issuer: "Unstop"
  },
  {
    id: 8,
    title: "GfG 160",
    image: "/assets/images/cert8.jpg",
    verifyUrl: "https://media.geeksforgeeks.org/courses/certificates/492a3f5020eabd5c9955f90d9388ee26.pdf",
    issuer: "GeeksforGeeks"
  },
  {
    id: 9,
    title: "Google Cloud Badges",
    image: "/assets/images/cert9.jpg",
    verifyUrl: "https://www.cloudskillsboost.google/public_profiles/fb3def52-1411-4867-873e-af7fc5adb69d",
    issuer: "Google Cloud Skills Boost"
  }
];

// Custom hook to get current columns based on window width
function useCertGridColumns() {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    function updateColumns() {
      const width = window.innerWidth;
      if (width >= 1280) setColumns(3); // xl and up
      else if (width >= 1024) setColumns(3); // lg
      else if (width >= 768) setColumns(2); // md
      else setColumns(1); // sm and below
    }
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  return columns;
}

export const CertificationsSection: React.FC = () => {
  const columns = useCertGridColumns();
  // Always show 3 on mobile, 4 on md, 3 on lg+
  const getInitialCount = useCallback(() => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 640) return 3; // mobile: always 3
    if (window.innerWidth >= 1280) return 3; // xl
    if (window.innerWidth >= 1024) return 3; // lg
    if (window.innerWidth >= 768) return 4; // md
    return 3;
  }, []); // Remove dependency on columns for initial calculation to avoid flicker

  const [visibleCount, setVisibleCount] = useState(getInitialCount());
  const [isLoading, setIsLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Update visibleCount when columns change (e.g., on resize)
  useEffect(() => {
    // Only reset if we are not showing all, or logic could be refined
    // keeping it simple: reset on drastic resize might be jarring, but ensures layout integrity
    // For now, let's just respect the manual load state unless it breaks layout
  }, [columns]);

  const loadMore = () => {
    setIsLoading(true);

    // Check if we are showing all items
    if (visibleCount >= certificationsData.length) {
      // Reset to initial count
      setVisibleCount(getInitialCount());
      setIsLoading(false);

      // Scroll back to top of section smoothly
      const section = document.getElementById('certifications');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Load more logic
    let increment = 3;
    if (window.innerWidth >= 768 && window.innerWidth < 1024) increment = 4; // md loads 4

    let nextCount = visibleCount + increment;
    if (nextCount > certificationsData.length) {
      nextCount = certificationsData.length;
    }

    // Simulate slight delay for effect
    setTimeout(() => {
      setVisibleCount(nextCount);
      setIsLoading(false);
    }, 500);
  };

  const handleImageError = (certId: number) => {
    console.log('Image failed to load for cert:', certId);
    setImageErrors(prev => ({ ...prev, [certId]: true }));
  };

  const visibleCertifications = certificationsData.slice(0, visibleCount);
  const isAllVisible = visibleCount >= certificationsData.length;

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="certifications" className="py-10 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-500">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">My</span>{' '}
            <span className="text-gray-900 dark:text-white">Certifications</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-1.5 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 mx-auto rounded-full"
          />
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {visibleCertifications.map((cert) => (
            <motion.div
              key={cert.id}
              layout
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-900 cursor-pointer"
            >
              {/* Full Background Image */}
              <div className="absolute inset-0 w-full h-full">
                {!imageErrors[cert.id] ? (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-[2px] group-hover:opacity-40"
                    loading="lazy"
                    onError={() => handleImageError(cert.id)}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center group-hover:opacity-40 transition-opacity duration-300">
                    <Award className="w-16 h-16 text-gray-600" />
                  </div>
                )}
              </div>

              {/* Dark Overlay on Hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content Overlay - Hidden initially, Slides up on hover */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">

                {/* Badge */}
                <div className="absolute top-4 right-4 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-xl shadow-lg">
                    <Award className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md line-clamp-2">
                  {cert.title}
                </h3>

                <div className="flex items-center gap-2 mb-4 text-gray-200 text-sm">
                  <CheckCircle size={14} className="text-purple-400" />
                  <span className="font-medium">Issued by: {cert.issuer}</span>
                </div>

                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full relative inline-flex items-center justify-center gap-2 px-6 py-2.5 overflow-hidden font-medium text-white transition-all duration-300 bg-white/10 border border-white/20 rounded-xl hover:bg-purple-600 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/30"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>View Credential</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        {certificationsData.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white transition-all duration-200 bg-gray-900 dark:bg-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <span className="relative flex items-center gap-2">
                {isLoading ? (
                  <>Processing...</>
                ) : (
                  <>
                    {isAllVisible ? 'Show Less' : 'Load More Achievements'}
                    {isAllVisible ? (
                      <ChevronUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1" />
                    ) : (
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
                    )}
                  </>
                )}
              </span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};