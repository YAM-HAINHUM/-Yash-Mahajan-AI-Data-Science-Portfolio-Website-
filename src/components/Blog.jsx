import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, BookOpen, X, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Blog() {
  const blogs = portfolioData.blogs;
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Artificial Intelligence', 'Machine Learning', 'Data Science', 'Python', 'Generative AI', 'Web Development'];

  const filteredBlogs = blogs.filter(blog => {
    if (filter === 'All') return true;
    return blog.category === filter;
  });

  return (
    <section id="blog" className="py-24 bg-slate-50/50 dark:bg-slate-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-brand-purple dark:text-brand-cyan font-bold font-mono mb-2">
            09 / Publications
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white">
            Tech Blog & Articles
          </h3>
          <div className="mt-2 w-16 h-1 bg-gradient-to-r from-brand-cyan to-brand-purple mx-auto rounded-full" />
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                filter === cat
                  ? 'bg-gradient-to-r from-brand-cyan to-brand-purple text-white border-transparent shadow-[0_4px_12px_rgba(168,85,247,0.2)]'
                  : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="glass-card flex flex-col justify-between h-full p-6 rounded-3xl border border-slate-200 dark:border-white/5 text-left shadow-lg group relative"
              >
                <div>
                  {/* Category and Date row */}
                  <div className="flex items-center justify-between text-xs font-mono mb-4 text-slate-400">
                    <span className="px-2.5 py-1 rounded bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan font-bold uppercase tracking-wider text-[10px]">
                      {blog.category}
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>{blog.date}</span>
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-brand-purple dark:group-hover:text-brand-cyan transition-colors">
                    {blog.title}
                  </h4>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal mb-6 line-clamp-3">
                    {blog.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-900">
                  <span className="flex items-center space-x-1 text-xs text-slate-400 font-mono">
                    <Clock size={12} />
                    <span>4 min read</span>
                  </span>

                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-brand-purple dark:text-brand-cyan hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Read Article Lightbox Modal */}
        <AnimatePresence>
          {selectedBlog && (
            <motion.div
              className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBlog(null)}
            >
              <motion.div
                className="w-full max-w-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl relative text-left max-h-[85vh] overflow-y-auto"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <X size={20} className="text-slate-600 dark:text-slate-400" />
                </button>

                {/* Article Header */}
                <div className="space-y-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-900">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="px-2.5 py-1 rounded bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan font-bold uppercase tracking-wider text-[10px]">
                      {selectedBlog.category}
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>{selectedBlog.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>4 min read</span>
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white leading-snug">
                    {selectedBlog.title}
                  </h3>
                </div>

                {/* Article Content */}
                <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4 font-normal text-sm md:text-base">
                  {selectedBlog.content.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>

                {/* Author Info */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-900 flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-purple flex items-center justify-center font-bold text-white text-xs">
                    YM
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">
                      Yash Anil Mahajan
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                      AI & DS Engineering Student | Author
                    </p>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
