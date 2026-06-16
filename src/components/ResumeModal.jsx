import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Download, MapPin, Mail, Phone, Link2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  const { name, title, summary, location, email, phone, github, linkedin } = portfolioData.personalInfo;
  const { timeline } = portfolioData.education;
  const { categories } = portfolioData.skills;
  const experiences = portfolioData.experience;
  const projects = portfolioData.projects.filter(p => p.featured);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Modal Pane */}
        <motion.div
          className="w-full max-w-4xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8 print:my-0 print:border-none print:shadow-none print:rounded-none flex flex-col h-[90vh] print:h-auto"
          initial={{ scale: 0.95, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 15 }}
        >
          {/* Header controls (Hidden during printing) */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-white/5 flex items-center justify-between print:hidden shrink-0">
            <div className="text-left">
              <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                Resume Preview
              </h4>
              <p className="text-[10px] text-slate-400 font-mono">
                recruiter-focused-ats-friendly.pdf
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href="/YASH_ANIL_MAHAJAN_RESUME.pdf"
                download="YASH_ANIL_MAHAJAN_RESUME.pdf"
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand-purple hover:bg-brand-purple/80 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
              >
                <Download size={14} />
                <span>Download PDF</span>
              </a>

              <button
                onClick={handlePrint}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand-cyan hover:bg-brand-cyan/80 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Printer size={14} />
                <span>Print / Save PDF</span>
              </button>
              
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Resume A4 Sheet (Scrollable container inside modal, print-styled) */}
          <div className="flex-grow overflow-y-auto p-6 md:p-12 bg-white text-slate-800 print:overflow-visible print:p-0 print:text-black">
            
            {/* Printable Area Wrapper */}
            <div id="printable-resume" className="max-w-3xl mx-auto space-y-8 text-left print:max-w-full">
              
              {/* Header block */}
              <div className="border-b-2 border-slate-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="text-left space-y-1">
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 print:text-black">
                    {name}
                  </h1>
                  <p className="text-sm font-bold text-brand-purple font-mono uppercase tracking-wider print:text-slate-600">
                    {title}
                  </p>
                </div>

                {/* Contacts block */}
                <div className="text-xs space-y-1 text-slate-500 font-mono">
                  <div className="flex items-center space-x-2 justify-start md:justify-end">
                    <MapPin size={12} />
                    <span>{location}</span>
                  </div>
                  <div className="flex items-center space-x-2 justify-start md:justify-end">
                    <Mail size={12} />
                    <a href={`mailto:${email}`} className="hover:underline">{email}</a>
                  </div>
                  <div className="flex items-center space-x-2 justify-start md:justify-end">
                    <Phone size={12} />
                    <span>{phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 justify-start md:justify-end">
                    <Link2 size={12} />
                    <a href={github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                    <span>|</span>
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h3 className="text-sm uppercase tracking-wider font-extrabold border-b border-slate-200 pb-1 text-slate-900 font-mono">
                  Professional Summary
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {summary}
                </p>
              </div>

              {/* Grid block for Education and Skills */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Left: Education Timeline */}
                <div className="md:col-span-7 space-y-4">
                  <h3 className="text-sm uppercase tracking-wider font-extrabold border-b border-slate-200 pb-1 text-slate-900 font-mono">
                    Education
                  </h3>
                  <div className="space-y-4">
                    {timeline.map((edu) => (
                      <div key={edu.id} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-800">
                          <span>{edu.institution}</span>
                          <span className="font-mono text-slate-400">{edu.duration || edu.year}</span>
                        </div>
                        <p className="text-[11px] font-semibold text-brand-purple print:text-slate-600">
                          {edu.degree || edu.level}
                        </p>
                        {edu.cgpa && <p className="text-[10px] text-slate-500 font-mono">GPA: {edu.cgpa} / 10</p>}
                        {edu.percentage && <p className="text-[10px] text-slate-500 font-mono">Performance: {edu.percentage}</p>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Technical Skills */}
                <div className="md:col-span-5 space-y-4">
                  <h3 className="text-sm uppercase tracking-wider font-extrabold border-b border-slate-200 pb-1 text-slate-900 font-mono">
                    Technical Stack
                  </h3>
                  <div className="space-y-3">
                    {categories.map((cat) => (
                      <div key={cat.id} className="space-y-0.5">
                        <span className="block text-[10px] uppercase font-mono font-bold text-slate-400">
                          {cat.title}
                        </span>
                        <p className="text-xs text-slate-700 leading-tight">
                          {cat.items.map(s => s.name).join(', ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Professional Experience */}
              <div className="space-y-4">
                <h3 className="text-sm uppercase tracking-wider font-extrabold border-b border-slate-200 pb-1 text-slate-900 font-mono">
                  Internships
                </h3>
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-800">
                        <span>{exp.role} — <span className="text-brand-purple print:text-slate-600">{exp.company}</span></span>
                        <span className="font-mono text-slate-400">{exp.duration} ({exp.mode})</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-4">
                <h3 className="text-sm uppercase tracking-wider font-extrabold border-b border-slate-200 pb-1 text-slate-900 font-mono">
                  Featured Projects
                </h3>
                <div className="space-y-4">
                  {projects.map((proj) => (
                    <div key={proj.id} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-800">
                        <span>{proj.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{proj.tech.slice(0,4).join(', ')}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </motion.div>
        
        {/* Style configurations for printing */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            body * {
              visibility: hidden;
            }
            #printable-resume, #printable-resume * {
              visibility: visible;
            }
            #printable-resume {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 0;
              margin: 0;
              color: black !important;
              background: white !important;
            }
            .print\\:hidden {
              display: none !important;
            }
          }
        `}} />
      </motion.div>
    </AnimatePresence>
  );
}
