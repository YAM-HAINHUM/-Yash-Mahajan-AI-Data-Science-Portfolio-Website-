import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Award, ExternalLink, X, ShieldAlert, 
  CheckCircle, AwardIcon, Briefcase, Code, Terminal, Download
} from 'lucide-react';
import certificationsData from '../data/certificationsData';

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [filter, setFilter] = useState('Featured Credentials ⭐');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);

  const categories = [
    'Featured Credentials ⭐', 'All', 'Internships', 'Hackathons', 'AWS', 'Cisco', 'IBM', 
    'Infosys Springboard', 'AI & ML', 'Data Analytics', 
    'Job Simulations', 'Professional Development'
  ];

  // Stats calculation
  const stats = useMemo(() => {
    return {
      total: certificationsData.length,
      internships: certificationsData.filter(c => c.categories && c.categories.includes('Internships')).length,
      hackathons: certificationsData.filter(c => c.categories && c.categories.includes('Hackathons')).length
    };
  }, []);

  // Filtering and Sorting logic
  const filteredAndSortedCerts = useMemo(() => {
    let filtered = certificationsData.filter(cert => {
      // Check if filter matches any category in the array
      const matchesFilter = filter === 'All' || (cert.categories && cert.categories.includes(filter));
      
      const q = searchQuery.toLowerCase();
      const matchesSearch = cert.title.toLowerCase().includes(q) ||
                          cert.organization.toLowerCase().includes(q) ||
                          (cert.skills && cert.skills.some(s => s.toLowerCase().includes(q)));
      return matchesFilter && matchesSearch;
    });

    // Special sorting for "All" and "Featured" categories: Priority first, then Date
    if ((filter === 'All' || filter === 'Featured Credentials ⭐') && !searchQuery) {
      return [...filtered].sort((a, b) => {
        if (a.priority && b.priority) return a.priority - b.priority;
        if (a.priority) return -1;
        if (b.priority) return 1;
        return new Date(b.issueDate) - new Date(a.issueDate);
      });
    }

    return [...filtered].sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate));
  }, [filter, searchQuery]);

  const visibleCerts = filteredAndSortedCerts.slice(0, visibleCount);

  return (
    <section id="certifications" className="py-24 bg-slate-50/50 dark:bg-slate-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-xs uppercase tracking-widest text-brand-purple dark:text-brand-cyan font-bold font-mono mb-2">
            07 / Credentials
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white">
            Certifications
          </h3>
          <div className="mt-2 w-16 h-1 bg-gradient-to-r from-brand-cyan to-brand-purple mx-auto rounded-full" />
          
          {/* Stats Bar */}
          <div className="flex justify-center gap-6 mt-8">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-slate-800 dark:text-white">{stats.total}</span>
              <span className="text-[10px] uppercase tracking-tighter text-slate-500 dark:text-slate-400 font-mono">Total</span>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 self-center" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-slate-800 dark:text-white">{stats.internships}</span>
              <span className="text-[10px] uppercase tracking-tighter text-slate-500 dark:text-slate-400 font-mono">Internships</span>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 self-center" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-slate-800 dark:text-white">{stats.hackathons}</span>
              <span className="text-[10px] uppercase tracking-tighter text-slate-500 dark:text-slate-400 font-mono">Hackathons</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400 group-focus-within:text-brand-cyan transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search by certificate name, organization, or skill..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(8);
              }}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-2xl text-sm focus:ring-2 focus:ring-brand-cyan/20 focus:border-brand-cyan/50 outline-none transition-all dark:text-white"
            />
          </div>
        </div>

        {/* Categories Tab selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                setVisibleCount(8);
              }}
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

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {visibleCerts.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-white/5 flex flex-col justify-between text-left h-full group"
              >
                <div>
                  <div className="p-3 bg-brand-cyan/10 text-brand-cyan rounded-xl w-fit mb-4">
                    {cert.categories && cert.categories.includes('Internships') ? <Briefcase size={20} /> : 
                     cert.categories && cert.categories.includes('Hackathons') ? <Code size={20} /> : <Award size={20} />}
                  </div>
                  <h4 className="text-base font-bold text-slate-800 dark:text-white mb-1 group-hover:text-brand-purple dark:group-hover:text-brand-cyan transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-xs font-semibold text-brand-purple dark:text-brand-cyan mb-2">
                    {cert.organization}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mb-2 uppercase tracking-tighter">
                    {cert.categories && cert.categories.join(' • ')}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-4">
                    Issued: {cert.displayDate}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedCert(cert)}
                  className="w-full mt-2 py-2 px-4 rounded-lg bg-slate-100 hover:bg-brand-cyan hover:text-white dark:bg-slate-850 dark:hover:bg-brand-cyan text-xs font-semibold uppercase tracking-wider text-center text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                >
                  Verify Credentials
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {visibleCount < filteredAndSortedCerts.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount(prev => prev + 8)}
              className="px-6 py-2.5 rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:text-brand-cyan hover:border-brand-cyan transition-all cursor-pointer"
            >
              Load More Certificates
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredAndSortedCerts.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-slate-100 dark:bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-200 dark:border-white/5">
              <Search className="text-slate-400" />
            </div>
            <h4 className="text-lg font-bold text-slate-800 dark:text-white">No Matching Certificates</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">Try adjusting your search or filter</p>
          </div>
        )}

        {/* Certificate Modal */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                className="w-full max-w-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl relative text-left"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <X size={20} className="text-slate-600 dark:text-slate-400" />
                </button>

                {/* Certificate Details */}
                <div className="mb-6">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold">
                    {selectedCert.categories && selectedCert.categories[0]} Certificate
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white leading-snug">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs font-semibold text-brand-purple dark:text-brand-cyan">
                    {selectedCert.organization}
                  </p>
                </div>

                {/* Certificate Secure Viewer Wrapper */}
                <div className="relative w-full h-[300px] md:h-[400px] bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 select-none">
                  {/* Shield Overlay to block all mouse interaction and show Watermark */}
                  <div 
                    className="absolute inset-0 z-20 bg-transparent cursor-default select-none flex items-center justify-center"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {/* Watermark Overlay */}
                    <div className="text-slate-900/10 dark:text-white/10 font-bold text-xs md:text-lg uppercase tracking-widest rotate-[-25deg] select-none text-center pointer-events-none font-mono">
                      Yash Mahajan Portfolio Preview<br />
                      Yash Mahajan Portfolio Preview<br />
                      Yash Mahajan Portfolio Preview
                    </div>
                  </div>

                  {/* PDF or Image Viewer */}
                  {selectedCert.certificateUrl && selectedCert.certificateUrl.toLowerCase().endsWith('.pdf') ? (
                    <iframe
                      src={`${selectedCert.certificateUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                      className="w-full h-full border-none select-none pointer-events-none"
                      title={selectedCert.title}
                    />
                  ) : (
                    <img
                      src={selectedCert.certificateUrl}
                      alt={selectedCert.title}
                      className="w-full h-full object-contain select-none pointer-events-none"
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  )}
                </div>

                {/* Seals & Metadata */}
                <div className="mt-6 flex items-center justify-between font-mono text-left">
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider text-slate-400">
                      Credential ID
                    </span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {selectedCert.credentialId || `SEC-${selectedCert.id.toUpperCase()}-2026`}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 text-emerald-500">
                    <CheckCircle size={14} />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                      Verified Valid
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap justify-end gap-3">
                  {selectedCert.originalCredentialUrl && selectedCert.originalCredentialUrl !== '#' && (
                    <a
                      href={selectedCert.originalCredentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/5 text-[10px] font-bold uppercase tracking-wider hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 flex items-center gap-2"
                    >
                      <ExternalLink size={14} />
                      Verify Online
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-white text-[10px] font-bold uppercase tracking-wider shadow-md cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
