import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Binary, BrainCircuit, Code2, Database, Wrench, CheckCircle,
  Brain, Cpu, Layers, MessageSquare, Eye, Sparkles, Terminal, Network, LineChart
} from 'lucide-react';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython, FaJava, FaGitAlt, FaGithub, FaDocker
} from 'react-icons/fa';
import {
  SiTypescript, SiMongodb, SiMysql, SiTensorflow, SiPytorch, SiScikitlearn, SiPandas, SiNumpy, SiOpencv, SiStreamlit, SiFlask, SiFastapi
} from 'react-icons/si';
import { portfolioData } from '../data/portfolioData';

export default function Skills() {
  const { categories } = portfolioData.skills;
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const tickerSkills = [
    { name: 'HTML5', icon: FaHtml5, color: '#e34c26' },
    { name: 'CSS3', icon: FaCss3Alt, color: '#1572b6' },
    { name: 'JavaScript', icon: FaJs, color: '#f7df1e' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
    { name: 'React.js', icon: FaReact, color: '#61dafb' },
    { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
    { name: 'Python', icon: FaPython, color: '#3776ab' },
    { name: 'Java', icon: FaJava, color: '#007396' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
    { name: 'MySQL', icon: SiMysql, color: '#4479a1' },
    { name: 'Git', icon: FaGitAlt, color: '#f05032' },
    { name: 'GitHub', icon: FaGithub, color: '#181717' },
    { name: 'Docker', icon: FaDocker, color: '#2496ed' },
    { name: 'TensorFlow', icon: SiTensorflow, color: '#ff6f00' },
    { name: 'PyTorch', icon: SiPytorch, color: '#ee4c2c' },
    { name: 'Scikit-Learn', icon: SiScikitlearn, color: '#f7931e' },
    { name: 'Pandas', icon: SiPandas, color: '#150458' },
    { name: 'NumPy', icon: SiNumpy, color: '#013243' },
    { name: 'OpenCV', icon: SiOpencv, color: '#5c3ee8' },
    { name: 'Streamlit', icon: SiStreamlit, color: '#ff4b4b' },
    { name: 'Flask', icon: SiFlask, color: '#000000' },
    { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
    { name: 'Machine Learning', icon: Cpu, color: '#3b82f6' },
    { name: 'Deep Learning', icon: Layers, color: '#a855f7' },
    { name: 'Artificial Intelligence', icon: Brain, color: '#ec4899' },
    { name: 'NLP', icon: MessageSquare, color: '#06b6d4' },
    { name: 'Computer Vision', icon: Eye, color: '#10b981' },
    { name: 'Generative AI', icon: Sparkles, color: '#f59e0b' },
    { name: 'LLMs', icon: Terminal, color: '#6366f1' },
    { name: 'RAG', icon: Network, color: '#14b8a6' },
    { name: 'Data Science', icon: LineChart, color: '#8b5cf6' },
    { name: 'Prompt Engineering', icon: Cpu, color: '#f43f5e' }
  ];

  // Map category IDs to icons
  const getCategoryIcon = (id) => {
    switch (id) {
      case 'languages': return <Binary className="w-5 h-5" />;
      case 'ai_ds': return <BrainCircuit className="w-5 h-5" />;
      case 'webdev': return <Code2 className="w-5 h-5" />;
      case 'databases': return <Database className="w-5 h-5" />;
      case 'tools': return <Wrench className="w-5 h-5" />;
      default: return <Binary className="w-5 h-5" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="skills" className="py-24 bg-theme-bg/50 dark:bg-theme-bg/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-xs uppercase tracking-widest text-brand-purple dark:text-brand-cyan font-bold font-mono mb-2">
            03 / Expertise
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-theme-text">
            Skills & Technologies
          </h3>
          <div className="mt-2 w-16 h-1 bg-gradient-to-r from-brand-cyan to-brand-purple mx-auto rounded-full" />
        </div>

        {/* Scrolling Ticker */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] mb-12 py-2">
          <div className="flex gap-4 animate-marquee whitespace-nowrap hover:[animation-play-state:paused] cursor-pointer">
            {[...tickerSkills, ...tickerSkills].map((skill, idx) => {
              const IconComponent = skill.icon;
              return (
                <div
                  key={idx}
                  className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-theme-sec/45 dark:bg-theme-card/45 border border-theme-border shadow-sm hover:border-brand-cyan/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300"
                >
                  <IconComponent
                    size={14}
                    style={{ color: skill.color }}
                    className="drop-shadow-[0_0_4px_rgba(6,182,212,0.15)]"
                  />
                  <span className="text-xs font-semibold text-theme-text">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center space-x-2 px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-brand-cyan to-brand-purple text-white border-transparent shadow-[0_4px_15px_rgba(168,85,247,0.3)]'
                  : 'bg-theme-sec dark:bg-theme-bg text-theme-muted border-theme-border hover:bg-theme-bg dark:hover:bg-theme-sec'
              }`}
            >
              {getCategoryIcon(cat.id)}
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Skill Card Grid */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {categories.map((cat) => {
              if (cat.id !== activeCategory) return null;
              
              return (
                <motion.div
                  key={cat.id}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {cat.items.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      className="glass-card p-5 rounded-2xl border border-theme-border text-left"
                    >
                      {/* Name & Percentage */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="p-1 rounded-md bg-brand-cyan/10 text-brand-cyan">
                            <CheckCircle size={14} />
                          </div>
                          <span className="font-bold text-theme-text">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-brand-purple dark:text-brand-cyan">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Animated Skill Bar */}
                      <div className="w-full h-2 bg-theme-bg dark:bg-theme-sec/80 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Quick Tech Grid Showcase (Recruiter scanning panel) */}
        <div className="mt-16 pt-12 border-t border-theme-border max-w-5xl mx-auto">
          <h4 className="text-sm uppercase tracking-widest font-mono font-bold text-theme-muted mb-6">
            All Technologies (Keywords for Recruiter ATS)
          </h4>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.flatMap(c => c.items).map((skill, index) => (
              <div 
                key={index} 
                className="px-3 py-1.5 rounded-md text-xs font-semibold bg-theme-sec dark:bg-theme-card border border-theme-border text-theme-muted hover:border-brand-cyan hover:text-brand-cyan transition-colors"
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
