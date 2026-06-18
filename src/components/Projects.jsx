import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const allProjects = portfolioData.projects;
  const [filter, setFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  // Filter Categories
  const categories = ['All', 'Featured', 'AI/ML', 'Data Science', 'Python', 'Web Development', 'Full Stack'];

  const handleFilterChange = (cat) => {
    setFilter(cat);
    setShowAll(false);
  };

  const filteredProjects = allProjects.filter((project) => {
    if (filter === 'All') return true;
    if (filter === 'Featured') return project.featured;
    return project.category === filter;
  });

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section id="projects" className="py-24 bg-theme-bg/50 dark:bg-theme-bg/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-brand-purple dark:text-brand-cyan font-bold font-mono mb-2">
            05 / Projects
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-theme-text">
            Technical Showroom
          </h3>
          <div className="mt-2 w-16 h-1 bg-gradient-to-r from-brand-cyan to-brand-purple mx-auto rounded-full" />
        </div>

        {/* Filters Panel */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                filter === cat
                  ? 'bg-gradient-to-r from-brand-cyan to-brand-purple text-white border-transparent shadow-[0_4px_12px_rgba(6,182,212,0.2)]'
                  : 'bg-theme-sec dark:bg-theme-bg text-theme-muted border-theme-border hover:bg-theme-bg dark:hover:bg-theme-sec'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Card Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="glass-card flex flex-col justify-between h-full rounded-2xl border border-theme-border overflow-hidden shadow-lg group relative"
              >
                {/* Project Image Panel */}
                <div className="h-48 w-full overflow-hidden bg-slate-900 relative">
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold font-mono tracking-wider bg-slate-900/80 text-brand-cyan border border-brand-cyan/20 backdrop-blur-sm">
                    {project.category}
                  </span>

                  {/* Featured Badge */}
                  {project.featured && (
                    <span className="absolute top-4 right-4 z-10 p-1.5 rounded-md bg-amber-500/85 text-white flex items-center justify-center backdrop-blur-sm shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                      <Star size={12} fill="white" />
                    </span>
                  )}

                  {/* Cover Photo */}
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  
                  {/* Dark mask on hover */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-theme-sec dark:bg-theme-card text-theme-text rounded-full hover:scale-110 transition-transform hover:text-brand-cyan shadow-lg"
                      title="GitHub Repository"
                    >
                      <FaGithub size={20} />
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        className="p-3 bg-theme-sec dark:bg-theme-card text-theme-text rounded-full hover:scale-110 transition-transform hover:text-brand-purple shadow-lg"
                        title="Live Demo"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Details Container */}
                <div className="p-6 flex flex-col justify-between flex-grow text-left space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-theme-text leading-tight group-hover:text-brand-purple dark:group-hover:text-brand-cyan transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-xs text-theme-muted font-normal leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Pill list */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((t, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-theme-bg dark:bg-theme-sec/60 border border-theme-border text-theme-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Bottom social details for fallback */}
                    <div className="flex items-center justify-between pt-2 border-t border-theme-border text-theme-muted">
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-theme-muted">
                        Task Source
                      </span>
                      <div className="flex items-center space-x-3 text-theme-muted">
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-brand-cyan transition-colors flex items-center space-x-1"
                        >
                          <FaGithub size={14} />
                          <span className="text-[10px] font-mono">Code</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length > 6 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-brand-cyan to-brand-purple text-white shadow-md hover:shadow-brand-purple/20 hover:scale-105 active:scale-100 transition-all cursor-pointer"
            >
              {showAll ? 'Show Less' : `Show More (${filteredProjects.length - 6} more)`}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
