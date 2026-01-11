import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle, Linkedin, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { LampContainer } from "./ui/lamp";
import { AnimatedProfileCard } from './AboutMeAnimation';

// Helper component for Contact Card Content
const ContactCardContent = ({ variant = 'default' }: { variant?: 'default' | 'on-accent' }) => {
  const isAccent = variant === 'on-accent';
  const textColor = isAccent ? 'text-white' : 'text-gray-400';
  const titleColor = 'text-white';
  const iconBg = isAccent ? 'bg-white/20 text-white' : 'bg-white/5 text-purple-400';
  const iconBgHover = isAccent ? 'group-hover/item:bg-white/30' : 'group-hover/item:bg-purple-600 group-hover/item:text-white';

  return (
    <div className="h-full flex flex-col p-6">
      <h3 className={`text-2xl font-bold ${titleColor} mb-6 bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent`}>Get in Touch</h3>

      <div className="space-y-4 flex-1">
        <a href="mailto:manjupathapadu@gmail.com" className="flex items-center gap-4 group/item">
          <div className={`p-3 rounded-xl transition-all duration-300 ${iconBg} ${iconBgHover}`}>
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <p className={`text-xs ${textColor} font-medium uppercase tracking-wider mb-0.5`}>Email</p>
            <p className={`text-sm font-medium ${isAccent ? 'text-white' : 'text-white'} truncate`}>manjupathapadu@gmail.com</p>
          </div>
        </a>

        <a href="https://wa.me/916302348787" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group/item">
          <div className={`p-3 rounded-xl transition-all duration-300 ${isAccent ? 'bg-white/20 text-white' : 'bg-white/5 text-green-400'} ${isAccent ? 'group-hover/item:bg-white/30' : 'group-hover/item:bg-green-600 group-hover/item:text-white'}`}>
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <p className={`text-xs ${textColor} font-medium uppercase tracking-wider mb-0.5`}>WhatsApp</p>
            <p className={`text-sm font-medium ${isAccent ? 'text-white' : 'text-white'}`}>+91 6302348787</p>
          </div>
        </a>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <p className={`text-xs ${textColor} mb-3 font-medium uppercase tracking-wider`}>Follow me on</p>
        <div className="flex gap-3">
          <a href="https://www.linkedin.com/in/sai-manjunath-764845344/" target="_blank" rel="noopener noreferrer"
            className={`p-2.5 rounded-lg transition-all duration-300 ${isAccent ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-[#0077b5]'}`}>
            <Linkedin size={18} />
          </a>
          <a href="https://github.com/Manju-05" target="_blank" rel="noopener noreferrer"
            className={`p-2.5 rounded-lg transition-all duration-300 ${isAccent ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-[#333]'}`}>
            <Github size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // EmailJS Configuration
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Create a new object that matches the template variables
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: "Manjunath", // Optional, if your template uses this
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Variant for input field focus animation
  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  };

  return (
    <section id="contact" className="pt-2 pb-12 bg-[#050505] relative overflow-hidden">
      {/* ... keep background elements ... */}

      <div className="container mx-auto px-4 relative z-10">
        <LampContainer className="">
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            Let's Connect
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-4 text-slate-400 max-w-lg mx-auto text-center"
          >
            Have a project in mind or just want to say hi? I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </motion.p>
        </LampContainer>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Contact Info Card - UPDATED */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatedProfileCard
              className="w-full h-auto bg-[#0a0a0a] border-white/10"
              accentColor="#9333ea"
              baseCard={<ContactCardContent variant="default" />}
              overlayCard={<ContactCardContent variant="on-accent" />}
            />
          </motion.div>

          {/* Contact Form */}
          {/* ... */}



          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3 h-[600px]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl relative h-full flex flex-col justify-center">

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-20 flex flex-col items-center justify-center h-full"
                  >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">Message Sent!</h3>
                    <p className="text-gray-400">Thanks for reaching out. I'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <label className="w-24 text-sm font-medium text-gray-300">Name</label>
                        <motion.input
                          whileFocus="focus"
                          variants={inputVariants}
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your Name"
                          className="flex-1 px-5 py-4 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 text-white placeholder-gray-600 transition-all font-medium"
                        />
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <label className="w-24 text-sm font-medium text-gray-300">Email</label>
                        <motion.input
                          whileFocus="focus"
                          variants={inputVariants}
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className="flex-1 px-5 py-4 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 text-white placeholder-gray-600 transition-all font-medium"
                        />
                      </div>

                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <label className="w-24 text-sm font-medium text-gray-300 pt-4">Message</label>
                        <motion.textarea
                          whileFocus="focus"
                          variants={inputVariants}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          placeholder="Tell me about your project..."
                          className="flex-1 px-5 py-4 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 text-white placeholder-gray-600 transition-all font-medium resize-none"
                        />
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-300" />
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Send size={20} />
                          <span>Send Message</span>
                        </div>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};