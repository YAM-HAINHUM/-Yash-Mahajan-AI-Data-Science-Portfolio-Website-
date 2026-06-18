import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const { location, email, phone, whatsapp, github, linkedin } = portfolioData.personalInfo;
  
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: null, message: '' }); // 'success', 'error', 'loading'
  const [showToast, setShowToast] = useState(false);

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email address is invalid';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name] : '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus({ type: 'loading', message: 'Sending message...' });
    setShowToast(false);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Verify .env loading and log values to console
    console.log('EmailJS Service ID:', serviceId);
    console.log('EmailJS Template ID:', templateId);
    console.log('EmailJS Public Key:', publicKey);

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS credentials are not configured in environment variables.');
      setStatus({ 
        type: 'error', 
        message: 'Configuration error: EmailJS environment variables are missing. Please setup your .env file.' 
      });
      setShowToast(true);
      return;
    }

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'N/A',
      subject: formData.subject,
      message: formData.message,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
        setShowToast(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        // Auto-close toast after 5 seconds
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      })
      .catch((error) => {
        console.error(
          'EmailJS Full Error:',
          error,
          error.status,
          error.text
        );
        setStatus({ 
          type: 'error', 
          message: `Failed to send message: ${error.text || error.message || 'Please check your network connection or try again later.'}` 
        });
        setShowToast(true);
        // Auto-close toast after 5 seconds
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      });
  };

  return (
    <section id="contact" className="py-24 bg-theme-bg relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-brand-purple/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-brand-purple dark:text-brand-cyan font-bold font-mono mb-2">
            10 / Connection
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-theme-text">
            Get In Touch
          </h3>
          <div className="mt-2 w-16 h-1 bg-gradient-to-r from-brand-cyan to-brand-purple mx-auto rounded-full" />
        </div>

        {/* Form & Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-stretch">
          
          {/* Left Column: Details Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-6 flex-grow">
              <h4 className="text-2xl font-bold text-theme-text">
                Let's discuss <br />
                your next <span className="text-gradient">Intelligent System</span>
              </h4>
              <p className="text-sm text-theme-muted leading-relaxed font-normal">
                I am actively seeking internship opportunities and entry-level positions in Artificial Intelligence, Machine Learning, and Python Development. Drop a message to connect!
              </p>

              {/* Contact info list */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-theme-bg dark:bg-theme-card border border-theme-border">
                  <div className="p-3 bg-brand-cyan/10 text-brand-cyan rounded-lg">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono tracking-widest text-theme-muted">Location</span>
                    <span className="text-sm font-semibold text-theme-text">{location}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-xl bg-theme-bg dark:bg-theme-card border border-theme-border">
                  <div className="p-3 bg-brand-purple/10 text-brand-purple rounded-lg">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono tracking-widest text-theme-muted">Email</span>
                    <a href={`mailto:${email}`} className="text-sm font-semibold text-theme-text hover:text-brand-cyan transition-colors">{email}</a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-xl bg-theme-bg dark:bg-theme-card border border-theme-border">
                  <div className="p-3 bg-brand-pink/10 text-brand-pink rounded-lg">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono tracking-widest text-theme-muted">Call / Phone</span>
                    <span className="text-sm font-semibold text-theme-text">{phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions / Direct Connect links */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-theme-border">
              {whatsapp && (
                <a 
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-100 transition-all text-center"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Chat</span>
                </a>
              )}

              <div className="flex items-center space-x-2 justify-center sm:justify-start">
                <a 
                  href={github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-theme-bg hover:bg-theme-sec dark:bg-theme-bg dark:hover:bg-theme-sec border border-theme-border rounded-xl hover:text-brand-cyan hover:scale-105 active:scale-95 transition-all text-theme-muted"
                >
                  <FaGithub size={18} />
                </a>
                <a 
                  href={linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-theme-bg hover:bg-theme-sec dark:bg-theme-bg dark:hover:bg-theme-sec border border-theme-border rounded-xl hover:text-brand-purple hover:scale-105 active:scale-95 transition-all text-theme-muted"
                >
                  <FaLinkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 md:p-8 rounded-3xl border border-theme-border shadow-xl text-left h-full flex flex-col justify-between">
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-[10px] uppercase font-mono tracking-widest text-theme-muted font-bold">Your Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      disabled={status.type === 'loading'}
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-xl bg-theme-bg dark:bg-theme-card border text-theme-text text-sm focus:outline-none transition-all ${
                        errors.name ? 'border-red-500/70 focus:border-red-500' : 'border-theme-border focus:border-brand-purple'
                      }`}
                    />
                    {errors.name && <p className="text-[10px] text-red-500 font-semibold flex items-center space-x-0.5"><AlertCircle size={10} /><span>{errors.name}</span></p>}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-[10px] uppercase font-mono tracking-widest text-theme-muted font-bold">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      disabled={status.type === 'loading'}
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-theme-bg dark:bg-theme-card border text-theme-text text-sm focus:outline-none transition-all ${
                        errors.email ? 'border-red-500/70 focus:border-red-500' : 'border-theme-border focus:border-brand-purple'
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-red-500 font-semibold flex items-center space-x-0.5"><AlertCircle size={10} /><span>{errors.email}</span></p>}
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-[10px] uppercase font-mono tracking-widest text-theme-muted font-bold">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      disabled={status.type === 'loading'}
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className={`w-full px-4 py-3 rounded-xl bg-theme-bg dark:bg-theme-card border text-theme-text text-sm focus:outline-none transition-all ${
                        errors.phone ? 'border-red-500/70 focus:border-red-500' : 'border-theme-border focus:border-brand-purple'
                      }`}
                    />
                    {errors.phone && <p className="text-[10px] text-red-500 font-semibold flex items-center space-x-0.5"><AlertCircle size={10} /><span>{errors.phone}</span></p>}
                  </div>

                  {/* Subject field */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-[10px] uppercase font-mono tracking-widest text-theme-muted font-bold">Subject</label>
                    <input 
                      type="text" 
                      id="subject"
                      name="subject"
                      disabled={status.type === 'loading'}
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Project inquiry / Opportunity"
                      className={`w-full px-4 py-3 rounded-xl bg-theme-bg dark:bg-theme-card border text-theme-text text-sm focus:outline-none transition-all ${
                        errors.subject ? 'border-red-500/70 focus:border-red-500' : 'border-theme-border focus:border-brand-purple'
                      }`}
                    />
                    {errors.subject && <p className="text-[10px] text-red-500 font-semibold flex items-center space-x-0.5"><AlertCircle size={10} /><span>{errors.subject}</span></p>}
                  </div>

                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-[10px] uppercase font-mono tracking-widest text-theme-muted font-bold">Your Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    rows="4"
                    disabled={status.type === 'loading'}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your project, timeline, or open role here..."
                    className={`w-full px-4 py-3 rounded-xl bg-theme-bg dark:bg-theme-card border text-theme-text text-sm focus:outline-none transition-all resize-none ${
                      errors.message ? 'border-red-500/70 focus:border-red-500' : 'border-theme-border focus:border-brand-purple'
                    }`}
                  />
                  {errors.message && <p className="text-[10px] text-red-500 font-semibold flex items-center space-x-0.5"><AlertCircle size={10} /><span>{errors.message}</span></p>}
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={status.type === 'loading'}
                  className="flex items-center justify-center space-x-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-white text-xs font-bold uppercase tracking-wider shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  {status.type === 'loading' ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Send size={14} />
                  )}
                  <span>{status.type === 'loading' ? 'Sending Message...' : 'Send Message'}</span>
                </button>

              </form>

              {/* Status Banner */}
              <AnimatePresence>
                {status.type && status.type !== 'loading' && (
                  <motion.div
                    className={`mt-4 p-4 rounded-xl flex items-center space-x-3 text-xs ${
                      status.type === 'success' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    <span>{status.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Toast Notification */}
              <AnimatePresence>
                {showToast && status.type && status.type !== 'loading' && (
                  <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    className={`fixed bottom-6 right-6 z-50 max-w-sm p-4 rounded-2xl shadow-2xl flex items-start space-x-3 text-sm border font-medium bg-theme-sec/95 dark:bg-theme-card/95 backdrop-blur-md ${
                      status.type === 'success'
                        ? 'text-emerald-600 border-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30'
                        : 'text-red-500 border-red-500/20 dark:text-red-400 dark:border-red-500/30'
                    }`}
                  >
                    <div className="mt-0.5">
                      {status.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-theme-text">
                        {status.type === 'success' ? 'Success' : 'Error'}
                      </p>
                      <p className="text-xs text-theme-muted">{status.message}</p>
                    </div>
                    <button
                      onClick={() => setShowToast(false)}
                      className="text-theme-muted hover:text-theme-text transition-colors px-1 cursor-pointer text-lg leading-none"
                    >
                      &times;
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
