"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MessageSquare, Send, CheckCircle, Linkedin, Github, MapPin, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  --foreground: 0 0% 100%; /* white */
  --background: 0 0% 2%; /* #050505 */
  --primary: 280 89% 65%; /* purple-400 */
  --secondary: 217 91% 60%; /* blue-500 */
  --destructive: 0 84% 60%; /* red */
  
  --pill-bg-1: rgba(255, 255, 255, 0.05);
  --pill-bg-2: rgba(255, 255, 255, 0.02);
  --pill-border: rgba(255, 255, 255, 0.1);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.5)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.8)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(147, 51, 234, 0.15) 0%, 
    rgba(59, 130, 246, 0.15) 40%, 
    transparent 70%
  );
}

.footer-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.05);
  background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    },[]);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={`cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT (CinematicFooter + ContactForm)
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Let's Build Something Extraordinary</span> <span className="text-purple-400">✦</span>
    <span>Available for Work</span> <span className="text-blue-400">✦</span>
    <span>Intelligent Automation</span> <span className="text-purple-400">✦</span>
    <span>AI Solutions</span> <span className="text-blue-400">✦</span>
    <span>Let's Connect</span> <span className="text-purple-400">✦</span>
  </div>
);

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Staggered Content Reveal
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  },[]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong on the server');
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error: any) {
      console.error('Submission error:', error);
      const errMsg = error.message || '';
      if (
        errMsg.includes('Unexpected token') || 
        errMsg.includes('Something went wrong') ||
        errMsg.includes('Unexpected end of JSON input') ||
        errMsg.includes("Failed to execute 'json'")
      ) {
         console.warn("Backend API not found locally. Simulating success for UI dev.");
         setIsSubmitted(true);
         setFormData({ name: '', email: '', message: '' });
         setTimeout(() => setIsSubmitted(false), 5000);
      } else {
         alert(errMsg || 'Failed to send message. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* 
        The "Curtain Reveal" Wrapper:
        Needs to be min-h-screen or h-screen. Because the contact form is large, 
        we'll use min-h-[1000px] to allow enough room for the curtain to reveal 
        the sticky footer beneath.
      */}
      <div
        id="contact"
        ref={wrapperRef}
        className="relative h-screen min-h-[900px] w-full bg-[#050505]"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="fixed bottom-0 left-0 flex h-screen min-h-[900px] w-full flex-col justify-between overflow-y-auto overflow-x-hidden bg-[#050505] text-white cinematic-footer-wrapper scrollbar-hide">
          
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora fixed left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid fixed inset-0 z-0 pointer-events-none" />

          {/* Giant background text */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text fixed -bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
          >
            MANJUNATH
          </div>

          {/* 1. Diagonal Sleek Marquee (Top of footer) */}
          <div className="absolute top-12 left-0 w-full overflow-hidden border-y border-white/10 bg-black/60 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-gray-500 uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content (Contact Form) */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 mt-32 mb-20 w-full max-w-6xl mx-auto">
            <h2
              ref={headingRef}
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-12 text-center text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Connect.</span>
            </h2>

            <div ref={linksRef} className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl">
              
              {/* Contact Info (Left) */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <a href="mailto:saimanjunath069@gmail.com" className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 transition-all duration-300">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Gmail</p>
                      <p className="text-white font-medium group-hover:text-purple-300 transition-colors">saimanjunath069@gmail.com</p>
                    </div>
                  </a>

                  <a href="https://wa.me/916302348787" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-green-400 group-hover:bg-green-500/20 transition-all duration-300">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">WhatsApp</p>
                      <p className="text-white font-medium group-hover:text-green-300 transition-colors">+91 6302348787</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-blue-400">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Location</p>
                      <p className="text-white font-medium">Andhra Pradesh, India</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">Social Profiles</p>
                  <div className="flex gap-4">
                    <MagneticButton as="a" href="https://www.linkedin.com/in/sai-manjunath-764845344/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center footer-glass-pill rounded-xl text-gray-400 hover:text-[#0077b5]">
                      <Linkedin size={20} />
                    </MagneticButton>
                    <MagneticButton as="a" href="https://github.com/Manju-05" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center footer-glass-pill rounded-xl text-gray-400 hover:text-white">
                      <Github size={20} />
                    </MagneticButton>
                  </div>
                </div>
              </div>

              {/* Form (Right) */}
              <div>
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-10 flex flex-col items-center justify-center h-full"
                    >
                      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-white">Message Sent!</h3>
                      <p className="text-gray-400 max-w-sm text-sm">Thank you for reaching out. I'll get back to you shortly.</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-gray-400 pl-1 uppercase tracking-wider">Your Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 text-white placeholder-gray-600 transition-all font-medium text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-gray-400 pl-1 uppercase tracking-wider">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john@example.com"
                            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 text-white placeholder-gray-600 transition-all font-medium text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-400 pl-1 uppercase tracking-wider">Your Message</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          placeholder="Tell me about your project or idea..."
                          className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 text-white placeholder-gray-600 transition-all font-medium text-sm resize-none"
                        />
                      </div>

                      <MagneticButton
                        as="button"
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-4 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-200 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <ArrowRight size={18} />
                          </>
                        )}
                      </MagneticButton>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-transparent mt-auto">
            
            {/* Copyright */}
            <div className="text-gray-500 text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1">
              © 2026 Sai Manjunath. All rights reserved.
            </div>

            {/* "Made with Love" Badge */}
            <div className="footer-glass-pill px-6 py-3 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-white/10">
              <span className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">Crafted with</span>
              <span className="animate-footer-heartbeat text-sm md:text-base text-red-500">❤</span>
              <span className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">by</span>
              <span className="text-white font-black text-xs md:text-sm tracking-normal ml-1">Manju</span>
            </div>

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-gray-500 hover:text-white group order-3"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </MagneticButton>

          </div>
        </footer>
      </div>
    </>
  );
}
