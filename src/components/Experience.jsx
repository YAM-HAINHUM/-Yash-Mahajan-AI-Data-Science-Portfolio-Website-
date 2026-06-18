import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Award, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Experience() {
  const experiences = portfolioData.experience;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="experience" className="py-24 bg-theme-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-brand-purple dark:text-brand-cyan font-bold font-mono mb-2">
            04 / Career
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-theme-text">
            Professional Experience
          </h3>
          <div className="mt-2 w-16 h-1 bg-gradient-to-r from-brand-cyan to-brand-purple mx-auto rounded-full" />
        </div>

        {/* Timeline Layout */}
        <motion.div 
          className="max-w-4xl mx-auto relative border-l border-theme-border pl-6 md:pl-10 text-left space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {experiences.map((exp, idx) => (
            <motion.div 
              key={exp.id} 
              className="relative"
              variants={itemVariants}
            >
              {/* Timeline dot */}
              <div className="absolute -left-12 md:-left-16 top-1 w-10 h-10 rounded-xl bg-theme-bg border border-theme-border flex items-center justify-center shadow-lg group-hover:border-brand-cyan transition-colors">
                <Briefcase size={16} className="text-brand-purple dark:text-brand-cyan" />
              </div>

              {/* Card Container */}
              <div className="glass-card p-6 rounded-2xl border border-theme-border shadow-md relative overflow-hidden">
                {/* Glow highlight */}
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-brand-cyan to-brand-purple" />

                {/* Header info */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-theme-muted flex items-center space-x-1 mb-1">
                      <Calendar size={12} />
                      <span>{exp.duration}</span>
                    </span>
                    <h4 className="text-xl font-bold text-theme-text">
                      {exp.role}
                    </h4>
                    <p className="text-sm font-semibold text-brand-purple dark:text-brand-cyan">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-theme-bg border border-theme-border text-[10px] font-bold font-mono text-theme-muted">
                      <MapPin size={10} />
                      <span>{exp.mode}</span>
                    </span>
                    {exp.certificate === 'Available' && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold font-mono text-emerald-500">
                        <Award size={10} />
                        <span>Certified</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-theme-muted leading-relaxed font-normal mb-4">
                  {exp.description}
                </p>

                {/* Internship Project detail */}
                {exp.project && (
                  <div className="p-4 rounded-xl bg-theme-bg dark:bg-theme-card border border-theme-border space-y-2">
                    <div className="flex items-center space-x-1.5">
                      <ArrowRight size={14} className="text-brand-cyan" />
                      <span className="text-xs uppercase tracking-wider font-mono font-bold text-theme-muted">
                        Assigned Project Task
                      </span>
                    </div>
                    <p className="text-sm font-bold text-theme-text">
                      {exp.project}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
