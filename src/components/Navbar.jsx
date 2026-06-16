import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Sun, Moon, FileText, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onOpenResume }) {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Education', id: 'education' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Certifications', id: 'certifications' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contact', id: 'contact' }
  ];

  // Scroll handler for background style and progress bar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial run
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll-spy active section tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -50% 0px', // measures intersection in the middle range of the viewport
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => {
      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'glass-panel shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        {/* Scroll Progress Bar */}
        <div
          className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Status Badge */}
          <div className="flex items-center space-x-3">
            <div
              onClick={() => scrollToSection('home')}
              className="flex items-center space-x-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-cyan focus:outline-none rounded-lg"
              tabIndex={0}
              role="button"
              aria-label="YAM - Scroll to top"
              onKeyDown={(e) => e.key === 'Enter' && scrollToSection('home')}
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-cyan to-brand-purple flex items-center justify-center font-bold text-white shadow-[0_4px_10px_rgba(168,85,247,0.3)]">
                Y
              </div>
              <span className="font-bold text-lg text-slate-800 dark:text-white tracking-wider font-mono">
                YAM
              </span>
            </div>

            {/* Glowing Status Badge */}
            <div className="hidden md:inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-[9px] font-bold tracking-wider text-brand-cyan uppercase shadow-[0_0_10px_rgba(6,182,212,0.1)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-cyan"></span>
              </span>
              <span>AI & Data Science Engineer</span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                aria-label={`Scroll to ${item.label}`}
                className={`relative px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-cyan focus:outline-none rounded-md cursor-pointer ${
                  activeSection === item.id
                    ? 'text-brand-purple dark:text-brand-cyan font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-brand-purple dark:hover:text-brand-cyan'
                } ${
                  activeSection === item.id
                    ? ''
                    : 'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-brand-cyan after:transition-transform after:duration-300 hover:after:scale-x-100'
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-cyan"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Action buttons + Hamburger */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800/50 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-cyan focus:outline-none"
            >
              {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
            </button>

            {/* Resume Button with Tooltip */}
            <div className="relative group">
              <button
                onClick={onOpenResume}
                aria-label="Download Resume"
                className="flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-brand-cyan to-brand-purple text-white shadow-[0_4px_15px_rgba(6,182,212,0.25)] hover:shadow-[0_4px_20px_rgba(168,85,247,0.4)] transition-all transform hover:-translate-y-[1px] active:translate-y-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-cyan focus:outline-none"
              >
                <FileText size={14} />
                <span className="hidden xs:inline">Resume</span>
              </button>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-100 text-[10px] font-bold rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 border border-slate-700/30">
                Download Resume (PDF)
                {/* Tooltip Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
              </div>
            </div>

            {/* Mobile Hamburger (visible on < xl) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
              className="xl:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800/50 transition-colors focus-visible:ring-2 focus-visible:ring-brand-cyan focus:outline-none cursor-pointer"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30 xl:hidden bg-slate-900/60 backdrop-blur-md flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="w-4/5 max-w-sm h-full bg-white dark:bg-slate-950 p-6 flex flex-col justify-between shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-cyan to-brand-purple flex items-center justify-center font-bold text-white text-sm">
                      Y
                    </div>
                    <span className="font-bold text-sm text-slate-800 dark:text-white tracking-wider font-mono">
                      YAM.OS
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-brand-cyan focus:outline-none cursor-pointer"
                  >
                    <X size={20} className="text-slate-600 dark:text-slate-400" />
                  </button>
                </div>

                {/* Navigation Menu */}
                <div className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      aria-label={`Scroll to ${item.label}`}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider text-left transition-all focus-visible:ring-2 focus-visible:ring-brand-cyan focus:outline-none cursor-pointer ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-brand-cyan/10 to-brand-purple/10 text-brand-purple dark:text-brand-cyan border-l-4 border-brand-cyan'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                      }`}
                    >
                      <span>{item.label}</span>
                      {activeSection === item.id && <ChevronRight size={16} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Actions Footer */}
              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenResume();
                  }}
                  aria-label="View Resume"
                  className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-white font-semibold text-sm uppercase tracking-wider shadow-lg hover:shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-cyan focus:outline-none"
                >
                  <FileText size={16} />
                  <span>View Resume</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
