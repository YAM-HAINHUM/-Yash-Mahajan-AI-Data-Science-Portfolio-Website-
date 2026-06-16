import React, { useState, useEffect } from 'react';
import { Mail, MapPin, GraduationCap, ChevronUp, FileText, Eye, Heart } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

export default function Footer({ onOpenResume }) {
  const { name, github, linkedin, email } = portfolioData.personalInfo;
  const [visitorCount, setVisitorCount] = useState(1084);

  useEffect(() => {
    // Visitor counter logic using localStorage
    const savedCount = localStorage.getItem('visitor_count');
    if (savedCount) {
      const parsed = parseInt(savedCount, 10);
      setVisitorCount(parsed + 1);
      localStorage.setItem('visitor_count', (parsed + 1).toString());
    } else {
      const initialCount = 1084 + Math.floor(Math.random() * 50);
      setVisitorCount(initialCount);
      localStorage.setItem('visitor_count', initialCount.toString());
    }
  }, []);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

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

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 pt-16 pb-12 transition-colors duration-300 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Multi-Column Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          
          {/* Column 1: Brand Section */}
          <div className="space-y-4 text-left">
            <div 
              onClick={() => handleScrollTo('home')} 
              className="flex items-center space-x-2.5 cursor-pointer group w-fit"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-purple flex items-center justify-center font-extrabold text-white text-base shadow-[0_0_15px_rgba(6,182,212,0.2)] group-hover:scale-105 transition-transform duration-300">
                Y
              </div>
              <span className="font-extrabold text-lg text-slate-800 dark:text-white tracking-wider font-mono bg-gradient-to-r from-brand-cyan to-brand-purple bg-clip-text text-transparent group-hover:opacity-85 transition-opacity">
                YAM
              </span>
            </div>
            
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">{name}</h4>
              <p className="text-xs font-semibold text-brand-purple dark:text-brand-cyan font-mono tracking-wide uppercase">
                AI & Data Science Engineer
              </p>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              "Building AI-Powered Solutions with Data Science, Machine Learning, Generative AI, and Innovation."
            </p>

            {/* Status Opportunity Badge */}
            <div className="pt-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Open to AI/ML Opportunities</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className="text-[13px] text-left text-slate-500 dark:text-slate-400 hover:text-brand-purple dark:hover:text-brand-cyan hover:translate-x-1 transition-all duration-250 cursor-pointer font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
              Contact Information
            </h4>
            <div className="space-y-4 text-[13px] text-slate-600 dark:text-slate-400">
              <a 
                href={`mailto:${email}`} 
                className="flex items-center space-x-3 hover:text-brand-cyan transition-colors w-fit group"
              >
                <Mail size={16} className="text-brand-cyan shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span className="truncate font-semibold underline decoration-transparent group-hover:decoration-brand-cyan transition-all">{email}</span>
              </a>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-brand-purple shrink-0" />
                <span className="font-semibold">Navi Mumbai, Maharashtra, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <GraduationCap size={16} className="text-brand-pink shrink-0" />
                <span className="font-semibold">BE Artificial Intelligence & Data Science</span>
              </div>
            </div>
          </div>

          {/* Column 4: Resume & Socials */}
          <div className="space-y-4 text-left flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
                Resume Access
              </h4>
              <button 
                onClick={onOpenResume}
                title="Download Resume (PDF)"
                className="inline-flex items-center space-x-2 px-4.5 py-2.5 rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-purple text-white text-[11px] font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-[0_4px_15px_rgba(6,182,212,0.25)] cursor-pointer hover:shadow-[0_4px_20px_rgba(168,85,247,0.35)]"
              >
                <FileText size={14} />
                <span>Download Resume</span>
              </button>
            </div>

            <div className="space-y-4 pt-4 md:pt-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
                Connect & Navigate
              </h4>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                {/* Social icons */}
                <div className="flex items-center space-x-2">
                  <a 
                    href={github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-250 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 hover:text-brand-cyan hover:shadow-[0_0_10px_rgba(6,182,212,0.25)] transition-all"
                    aria-label="GitHub"
                  >
                    <FaGithub size={16} />
                  </a>
                  <a 
                    href={linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-250 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 hover:text-brand-purple hover:shadow-[0_0_10px_rgba(168,85,247,0.25)] transition-all"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin size={16} />
                  </a>
                  <a 
                    href={`mailto:${email}`}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-250 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 hover:text-brand-pink hover:shadow-[0_0_10px_rgba(236,72,153,0.25)] transition-all"
                    aria-label="Email"
                  >
                    <Mail size={16} />
                  </a>
                </div>

                {/* Back to Top */}
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center space-x-1 px-3 py-2 rounded-xl bg-slate-100/80 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 hover:text-brand-cyan hover:scale-105 transition-all duration-200 border border-slate-200/50 dark:border-white/5 cursor-pointer text-xs font-semibold"
                >
                  <ChevronUp size={14} />
                  <span>Top</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Tech Stack Mini Display Banner */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-900">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] text-slate-400 dark:text-slate-550 font-mono font-medium">
            {['Python', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Generative AI', 'React', 'FastAPI', 'MongoDB'].map((tech, idx) => (
              <span key={idx} className="flex items-center">
                {idx > 0 && <span className="mr-6 text-slate-300 dark:text-slate-800">•</span>}
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom copyright details & visitor count */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-6">
          <p className="font-semibold font-mono text-center md:text-left">
            © 2026 Yash Anil Mahajan. All Rights Reserved.
          </p>

          {/* Visitor Counter badge */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 font-mono">
            <Eye size={12} className="text-brand-cyan" />
            <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">Visitor:</span>
            <span className="text-brand-purple dark:text-brand-cyan font-bold">{visitorCount}</span>
          </div>

          <p className="flex items-center justify-center space-x-1 font-semibold">
            <span>Built with React, TypeScript, Tailwind CSS & AI.</span>
            <Heart size={11} className="text-brand-pink fill-brand-pink animate-pulse ml-1" />
          </p>
        </div>

      </div>
    </footer>
  );
}
