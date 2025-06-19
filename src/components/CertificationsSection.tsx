import React, { useState, useEffect } from 'react';
import { ExternalLink, Award } from 'lucide-react';
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
  const getInitialCount = () => {
    if (window.innerWidth < 640) return 3; // mobile: always 3
    if (columns === 3) return 3;
    if (columns === 2) return 4;
    return 3;
  };
  const [visibleCount, setVisibleCount] = useState(getInitialCount());
  const [isLoading, setIsLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Update visibleCount when columns change (e.g., on resize)
  useEffect(() => {
    setVisibleCount(getInitialCount());
  }, [columns]);

  useEffect(() => {
    console.log('Current visible count:', visibleCount);
    console.log('Total certifications:', certificationsData.length);
  }, [visibleCount]);

  // Only allow loading full rows (3 at a time for mobile and desktop, 4 for md)
  const loadMore = () => {
    setIsLoading(true);
    let increment = 3;
    if (columns === 2 && window.innerWidth >= 640) increment = 4;
    let nextCount = visibleCount + increment;
    if (nextCount > certificationsData.length) {
      nextCount = certificationsData.length;
    }
    setVisibleCount(nextCount);
    setIsLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [visibleCount]);

  const handleImageError = (certId: number) => {
    console.log('Image failed to load for cert:', certId);
    setImageErrors(prev => ({ ...prev, [certId]: true }));
  };

  const visibleCertifications = certificationsData.slice(0, visibleCount);
  console.log('Rendering certifications:', visibleCertifications.length);

  return (
    <section id="certifications" className="py-20 bg-white dark:bg-gray-900 transition-all duration-500 scroll-animate">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll" data-animation="fade-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-purple-600 dark:text-purple-400">My</span>{' '}
            <span className="text-gray-800 dark:text-white">Certifications</span>
          </h2>
          <div className="w-24 h-1 bg-purple-600 dark:bg-purple-400 mx-auto rounded-full"></div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[200px] relative`}>
          {visibleCertifications.map((cert, index) => (
            <div
              key={cert.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl transform hover:scale-105 animate-on-scroll"
              data-animation="fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                {!imageErrors[cert.id] ? (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                    onError={() => handleImageError(cert.id)}
                    onLoad={() => console.log('Image loaded successfully:', cert.id)}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <Award className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <Award className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {cert.title}
                </h3>
                
                <p className="text-purple-600 dark:text-purple-400 font-semibold mb-4">
                  Issued by: {cert.issuer}
                </p>
                
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-purple-600 dark:bg-purple-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-700 dark:hover:bg-purple-600 transition-all duration-300 transform hover:scale-105"
                >
                  <ExternalLink size={18} />
                  Verify Credentials
                </a>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < certificationsData.length && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="bg-gray-800 dark:bg-white text-white dark:text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-700 dark:hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};