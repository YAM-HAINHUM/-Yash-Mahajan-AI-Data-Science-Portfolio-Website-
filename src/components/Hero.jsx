import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { FileText, ArrowRight, Mail, Cpu, Database, Binary, Code, Flame } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import heroImg from '../assets/yash_anil_mahajan_image.jpg';
import { portfolioData } from '../data/portfolioData';

export default function Hero({ onOpenResume }) {
  const { name, title, titles, summary, github, linkedin } = portfolioData.personalInfo;
  const el = useRef(null);


  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: titles,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });

    return () => {
      typed.destroy();
    };
  }, [titles]);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-mesh"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Content Column */}
        <motion.div
          className="lg:col-span-7 space-y-6 text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Subtitle Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full glass-panel text-xs font-semibold uppercase tracking-wider text-brand-purple dark:text-brand-cyan">
            <Cpu size={14} className="animate-spin [animation-duration:4s]" />
            <span>Portfolio Ecosystem Active</span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-800 dark:text-white leading-none">
              Hi, I'm <br />
              <span className="text-gradient font-black">{name}</span>
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-700 dark:text-slate-200 flex items-center min-h-[40px] font-mono">
              <span ref={el} />
            </h2>
          </div>

          {/* Summary */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl font-normal leading-relaxed">
            {summary}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onOpenResume}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-brand-cyan to-brand-purple text-white shadow-[0_4px_20px_rgba(6,182,212,0.3)] hover:shadow-[0_4px_25px_rgba(168,85,247,0.5)] hover:scale-105 active:scale-100 transition-all cursor-pointer"
            >
              <FileText size={16} />
              <span>Resume Preview</span>
            </button>
            
            <button
              onClick={() => handleScrollTo('projects')}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider glass-panel text-slate-800 dark:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:scale-105 active:scale-100 transition-all cursor-pointer border-slate-200 dark:border-white/10"
            >
              <span>View Projects</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Social icons */}
          <div className="flex items-center space-x-4 pt-4 border-t border-slate-200 dark:border-slate-800 max-w-sm">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">Connect:</span>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-full glass-panel hover:text-brand-cyan hover:scale-110 active:scale-95 transition-all text-slate-600 dark:text-slate-400"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-full glass-panel hover:text-brand-purple hover:scale-110 active:scale-95 transition-all text-slate-600 dark:text-slate-400"
            >
              <FaLinkedin size={18} />
            </a>
            <button
              onClick={() => handleScrollTo('contact')}
              aria-label="Email Me"
              className="p-2.5 rounded-full glass-panel hover:text-brand-pink hover:scale-110 active:scale-95 transition-all text-slate-600 dark:text-slate-400 cursor-pointer"
            >
              <Mail size={18} />
            </button>
          </div>
        </motion.div>

        {/* Right Avatar Column */}
        <motion.div
          className="lg:col-span-5 flex justify-center relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          {/* Main Avatar Glow Orbit */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
            {/* Background glowing rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-cyan/20 to-brand-purple/20 blur-2xl animate-pulse-slow" />
            <div className="absolute w-[95%] h-[95%] rounded-full border border-dashed border-brand-cyan/30 animate-spin [animation-duration:20s]" />
            <div className="absolute w-[85%] h-[85%] rounded-full border border-dashed border-brand-purple/35 animate-spin [animation-duration:15s] [animation-direction:reverse]" />

            {/* Avatar Frame Container */}
            <motion.div
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-slate-200 dark:border-white/10 p-2 glass-panel shadow-2xl cursor-pointer"
              animate={{
                y: [0, -10, 0]
              }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 25px rgba(6, 182, 212, 0.4)"
              }}
              transition={{
                y: {
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                },
                scale: {
                  duration: 0.3,
                  ease: 'easeOut'
                },
                boxShadow: {
                  duration: 0.3,
                  ease: 'easeOut'
                }
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-900/10 dark:bg-slate-900/50 flex items-center justify-center relative">
                <img
                  src={heroImg}
                  alt={name}
                  className="w-full h-full object-cover rounded-full"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                />

                {/* Overlay Text badge */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-md glass-panel text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-300 font-bold border-slate-200 dark:border-white/5">
                  AI_ENG.SH
                </div>
              </div>
            </motion.div>

            {/* Floating Tech Badges (Animated with Framer Motion) */}
            <motion.div
              className="absolute top-4 left-8 p-3 rounded-xl glass-panel shadow-lg flex items-center justify-center text-brand-cyan border-slate-200 dark:border-white/10"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Binary size={22} className="drop-shadow-[0_0_8px_#06b6d4]" />
            </motion.div>

            <motion.div
              className="absolute bottom-6 left-2 p-3 rounded-xl glass-panel shadow-lg flex items-center justify-center text-brand-purple border-slate-200 dark:border-white/10"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <Cpu size={22} className="drop-shadow-[0_0_8px_#a855f7]" />
            </motion.div>

            <motion.div
              className="absolute top-12 right-2 p-3 rounded-xl glass-panel shadow-lg flex items-center justify-center text-blue-500 border-slate-200 dark:border-white/10"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <Code size={22} className="drop-shadow-[0_0_8px_#3b82f6]" />
            </motion.div>

            <motion.div
              className="absolute bottom-10 right-6 p-3 rounded-xl glass-panel shadow-lg flex items-center justify-center text-brand-pink border-slate-200 dark:border-white/10"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            >
              <Database size={22} className="drop-shadow-[0_0_8px_#ec4899]" />
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Mouse scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center space-y-1">
        <span className="text-[10px] tracking-widest text-slate-400 font-mono uppercase">Scroll</span>
        <div className="w-5 h-9 rounded-full border-2 border-slate-300 dark:border-slate-700 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-purple dark:bg-brand-cyan animate-scroll" />
        </div>
      </div>
    </section>
  );
}
