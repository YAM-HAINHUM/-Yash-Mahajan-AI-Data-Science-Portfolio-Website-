import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing neural pathways...');

  useEffect(() => {
    // Disable scrolling during load
    document.body.style.overflow = 'hidden';

    const textSequence = [
      { threshold: 0, text: 'Initializing neural pathways...' },
      { threshold: 25, text: 'Analyzing database clusters...' },
      { threshold: 50, text: 'Synthesizing experience models...' },
      { threshold: 75, text: 'Configuring interactive UI tensors...' },
      { threshold: 95, text: 'Finalizing agent weights...' }
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        const currentProgress = next >= 100 ? 100 : next;
        
        // Update text based on current progress
        const currentText = textSequence
          .filter(t => currentProgress >= t.threshold)
          .pop();
        if (currentText) {
          setLoadingText(currentText.text);
        }

        if (currentProgress === 100) {
          clearInterval(timer);
          setTimeout(() => {
            // Restore scroll and signal completion
            document.body.style.overflow = 'auto';
            onComplete();
          }, 400);
        }
        return currentProgress;
      });
    }, 70);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Decorative Blur Backdrops */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/10 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>

      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Animated Floating Sphere Grid */}
        <div className="relative flex items-center justify-center w-24 h-24 mb-8">
          <div className="absolute inset-0 border border-white/10 rounded-full animate-spin [animation-duration:8s]"></div>
          <div className="absolute inset-2 border border-brand-cyan/20 border-t-brand-cyan rounded-full animate-spin [animation-duration:3s]"></div>
          <div className="absolute inset-4 border border-brand-purple/30 border-b-brand-purple rounded-full animate-spin [animation-duration:1.5s]"></div>
          
          <motion.div
            className="w-4 h-4 rounded-full bg-gradient-to-r from-brand-cyan to-brand-purple shadow-[0_0_15px_#a855f7]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold tracking-widest mb-1 bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
          YASH ANIL MAHAJAN
        </h1>
        <p className="text-xs uppercase tracking-widest text-slate-500 mb-6 font-mono">
          Portfolio OS v1.0
        </p>

        {/* Custom Progress Bar */}
        <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden mb-3 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-cyan to-brand-purple"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Text */}
        <div className="flex items-center justify-between w-64 mb-6 font-mono text-[10px] text-slate-400">
          <span className="animate-pulse">{loadingText}</span>
          <span className="font-bold text-brand-cyan">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
