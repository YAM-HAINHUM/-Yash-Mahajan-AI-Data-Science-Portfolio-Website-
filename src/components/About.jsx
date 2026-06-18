import React from 'react';
import { motion } from 'framer-motion';
import { User, Award, MapPin, GraduationCap, Calendar, Compass, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  const { intro, description, quickFacts, strengths } = portfolioData.about;
  const { motto } = portfolioData.personalInfo;

  // Map icons to labels
  const getIcon = (label) => {
    switch (label) {
      case 'Degree': return <GraduationCap className="text-brand-cyan" size={20} />;
      case 'College': return <Compass className="text-brand-purple" size={20} />;
      case 'Location': return <MapPin className="text-brand-pink" size={20} />;
      case 'Graduation Year': return <Calendar className="text-blue-500" size={20} />;
      case 'Current CGPA': return <Award className="text-amber-500" size={20} />;
      default: return <User className="text-brand-cyan" size={20} />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="about" className="py-24 bg-theme-bg/50 dark:bg-theme-bg/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-brand-purple dark:text-brand-cyan font-bold font-mono mb-2">
            01 / Background
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-theme-text">
            About Me
          </h3>
          <div className="mt-2 w-16 h-1 bg-gradient-to-r from-brand-cyan to-brand-purple mx-auto rounded-full" />
        </div>

        {/* Content Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          {/* Left Text Column */}
          <motion.div className="lg:col-span-7 space-y-6 text-left" variants={itemVariants}>
            <h4 className="text-xl sm:text-2xl font-bold text-theme-text">
              Designing the future of <span className="text-gradient">Artificial Intelligence</span>
            </h4>
            <p className="text-base text-theme-muted leading-relaxed font-normal">
              {intro}
            </p>
            <p className="text-base text-theme-muted leading-relaxed font-normal">
              {description}
            </p>

            <div className="space-y-3 pt-2">
              <h5 className="text-sm uppercase tracking-wider font-semibold text-theme-text font-mono">
                Core Strengths
              </h5>
              <div className="flex flex-wrap gap-2">
                {strengths.map((strength, index) => (
                  <span 
                    key={index} 
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-theme-sec dark:bg-theme-card border border-theme-border text-theme-text shadow-sm"
                  >
                    <ShieldCheck size={14} className="text-brand-cyan" />
                    <span>{strength}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Quick Facts Column */}
          <motion.div className="lg:col-span-5 space-y-6" variants={itemVariants}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickFacts.map((fact, idx) => (
                <div 
                  key={idx} 
                  className="glass-card p-5 rounded-2xl flex flex-col items-start text-left"
                >
                  <div className="p-2.5 rounded-xl bg-theme-bg dark:bg-theme-sec border border-theme-border mb-4 shadow-inner">
                    {getIcon(fact.label)}
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-theme-muted mb-1">
                    {fact.label}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-theme-text leading-tight">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Quote / Motto container */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-r from-brand-cyan/10 to-brand-purple/10 border border-brand-cyan/20 dark:border-brand-purple/20 text-left overflow-hidden shadow-inner">
              {/* Giant background double quote */}
              <span className="absolute right-4 bottom-2 text-8xl font-serif text-brand-purple/10 pointer-events-none select-none">
                "
              </span>
              <p className="text-xs uppercase tracking-widest font-mono text-theme-muted mb-2 font-bold">
                Personal Motto
              </p>
              <blockquote className="text-sm sm:text-base font-bold text-gradient leading-relaxed italic">
                "{motto}"
              </blockquote>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
