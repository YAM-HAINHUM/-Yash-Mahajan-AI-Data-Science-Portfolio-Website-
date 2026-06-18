import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import ParticleBg from './components/ParticleBg';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import GithubShowcase from './components/GithubShowcase';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import './App.css';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <>
      {/* Loading Screen Overlay */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative min-h-screen bg-theme-bg text-theme-text transition-colors duration-300">
          {/* Animated Background Canvas */}
          <ParticleBg />

          {/* Floating Cursor Pointer */}
          <CustomCursor />

          {/* Sticky Navigation Bar */}
          <Navbar onOpenResume={() => setIsResumeOpen(true)} />

          {/* Main Layout Sections */}
          <main className="relative z-10">
            <Hero onOpenResume={() => setIsResumeOpen(true)} />
            <About />
            <Education />
            <Skills />
            <Experience />
            <Projects />
            <GithubShowcase />
            <Certifications />
            <Achievements />
            <Blog />
            <Contact />
          </main>

          {/* Footer details */}
          <Footer onOpenResume={() => setIsResumeOpen(true)} />

          {/* AI Chatbot Assistant terminal */}
          <Chatbot />

          {/* Recruiter PDF Resume Preview Modal */}
          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
