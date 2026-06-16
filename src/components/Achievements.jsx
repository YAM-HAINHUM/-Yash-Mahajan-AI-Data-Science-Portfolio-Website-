import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Star, ShieldCheck, Flame, Compass, Target } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Achievements() {
  const achievements = portfolioData.achievements;

  // Map icon index
  const getIcon = (idx) => {
    const icons = [
      <Trophy className="text-amber-500" size={24} />,
      <Target className="text-brand-purple" size={24} />,
      <Award className="text-brand-cyan" size={24} />,
      <ShieldCheck className="text-emerald-500" size={24} />,
      <Flame className="text-brand-pink" size={24} />,
      <Compass className="text-blue-500" size={24} />,
      <Star className="text-purple-500" size={24} />
    ];
    return icons[idx % icons.length];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section id="achievements" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-brand-purple dark:text-brand-cyan font-bold font-mono mb-2">
            08 / Milestones
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white">
            Key Achievements
          </h3>
          <div className="mt-2 w-16 h-1 bg-gradient-to-r from-brand-cyan to-brand-purple mx-auto rounded-full" />
        </div>

        {/* Grid Panels */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {achievements.map((ach, idx) => (
            <motion.div
              key={ach.id}
              variants={itemVariants}
              className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-white/5 flex flex-col items-start text-left h-full"
            >
              {/* Icon Circle */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 mb-4 shadow-sm flex items-center justify-center">
                {getIcon(idx)}
              </div>

              <h4 className="text-base font-bold text-slate-800 dark:text-white mb-2 leading-tight">
                {ach.title}
              </h4>
              
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {ach.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
