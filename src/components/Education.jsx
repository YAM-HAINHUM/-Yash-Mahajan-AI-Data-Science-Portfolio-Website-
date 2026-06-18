import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GraduationCap, Calendar, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export default function Education() {
  const { timeline } = portfolioData.education;
  const { theme } = useTheme();

  // Recharts theme colors
  const gridColor = theme === 'dark' ? '#1e293b' : '#e2e8f0';
  const labelColor = theme === 'dark' ? '#94a3b8' : '#64748b';
  const tooltipBg = theme === 'dark' ? '#0f172a' : '#ffffff';
  const tooltipBorder = theme === 'dark' ? '#334155' : '#cbd5e1';

  // Format data for Recharts (Engineering semesters)
  const chartData = timeline.find(item => item.id === 'eng')?.semesters || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
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
    <section id="education" className="py-24 bg-theme-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-brand-purple dark:text-brand-cyan font-bold font-mono mb-2">
            02 / Academia
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-theme-text">
            Education Timeline
          </h3>
          <div className="mt-2 w-16 h-1 bg-gradient-to-r from-brand-cyan to-brand-purple mx-auto rounded-full" />
        </div>

        {/* Timeline Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          {/* Left: Timeline Milestones */}
          <div className="lg:col-span-6 relative border-l border-theme-border ml-4 pl-8 space-y-12 text-left">
            {timeline.map((item, index) => (
              <motion.div 
                key={item.id} 
                className="relative"
                variants={itemVariants}
              >
                {/* Timeline node marker */}
                <div className="absolute -left-12 top-1 w-8 h-8 rounded-full bg-theme-bg border-2 border-brand-purple dark:border-brand-cyan flex items-center justify-center shadow-md">
                  <GraduationCap size={14} className="text-brand-purple dark:text-brand-cyan" />
                </div>

                {/* Content */}
                <span className="text-xs font-mono uppercase tracking-wider text-theme-muted flex items-center space-x-1.5 mb-1">
                  <Calendar size={12} />
                  <span>{item.duration || item.year}</span>
                </span>
                
                <h4 className="text-xl font-bold text-theme-text mb-1">
                  {item.institution}
                </h4>
                
                <p className="text-sm font-semibold text-brand-purple dark:text-brand-cyan mb-2">
                  {item.degree || item.level}
                </p>

                {item.university && (
                  <p className="text-xs text-theme-muted font-mono mb-3">
                    {item.university}
                  </p>
                )}

                {item.percentage && (
                  <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 mb-3">
                    <span>Performance: {item.percentage}</span>
                  </div>
                )}

                {item.cgpa && (
                  <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-brand-purple/10 text-brand-purple border border-brand-purple/20 mb-3">
                    <span>Cumulative CGPA: {item.cgpa} / 10</span>
                  </div>
                )}

                {/* Score Pills (12th Standard) */}
                {item.scores && (
                  <div className="flex flex-wrap gap-2 mt-2 mb-3">
                    {item.scores.map((score, sIdx) => (
                      <span 
                        key={sIdx}
                        className="px-2 py-1 rounded bg-theme-bg border border-theme-border text-[10px] font-semibold text-theme-muted"
                      >
                        {score.label}: <span className="font-bold text-brand-purple dark:text-brand-cyan">{score.value}</span>
                      </span>
                    ))}
                  </div>
                )}

                {item.details && (
                  <p className="text-sm text-theme-muted leading-relaxed max-w-lg">
                    {item.details}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right: Interactive Chart Card */}
          <motion.div 
            className="lg:col-span-6 space-y-6"
            variants={itemVariants}
          >
            <div className="glass-card p-6 rounded-2xl border border-theme-border shadow-xl text-left">
              <div className="mb-6">
                <h4 className="text-lg font-bold text-theme-text">
                  Academic Performance Chart
                </h4>
                <p className="text-xs text-theme-muted">
                  Semester GPA tracking across Bachelor of Engineering (AI & DS)
                </p>
              </div>

              {/* Responsive Chart Container */}
              <div className="h-64 sm:h-72 w-full" style={{ minHeight: '256px', height: '100%', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%" minHeight={256}>
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.5} />
                    <XAxis 
                      dataKey="sem" 
                      stroke={labelColor} 
                      fontSize={11} 
                      fontFamily="monospace"
                      tickLine={false}
                    />
                    <YAxis 
                      domain={[7.5, 10]} 
                      stroke={labelColor} 
                      fontSize={11} 
                      fontFamily="monospace"
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: tooltipBg,
                        borderColor: tooltipBorder,
                        borderRadius: '12px',
                        fontSize: '12px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
                      }}
                      itemStyle={{ color: theme === 'dark' ? '#fff' : '#000', fontWeight: 'bold' }}
                      labelStyle={{ color: '#888', marginBottom: '4px' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="gpa" 
                      stroke="url(#colorGpa)" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorGpa)" 
                      dot={{ r: 5, strokeWidth: 2, stroke: '#06b6d4', fill: '#030712' }}
                      activeDot={{ r: 7, strokeWidth: 1 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Semesters list display grid */}
              <div className="grid grid-cols-5 gap-2 mt-6 pt-4 border-t border-theme-border">
                {chartData.map((sem, idx) => (
                  <div key={idx} className="text-center">
                    <span className="block text-[10px] text-theme-muted font-mono font-bold uppercase">
                      {sem.sem}
                    </span>
                    <span className="text-sm font-bold text-theme-text">
                      {sem.gpa.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Note Card */}
            <div className="glass-card p-5 rounded-2xl flex items-start space-x-4 text-left">
              <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h5 className="text-sm font-bold text-theme-text">
                  Engineering Distinction
                </h5>
                <p className="text-xs text-theme-muted leading-relaxed mt-1">
                  Maintained academic excellence with a semester peak GPA of 9.35 in Sem 3. Consistently ranking within the top tier of students in Datta Meghe College of Engineering.
                </p>
              </div>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
