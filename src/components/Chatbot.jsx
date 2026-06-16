import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, ArrowDown, RefreshCw } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi, I am Yash's Portfolio AI Assistant! 🤖 Ask me anything about his education, skills, projects, or internships."
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestions = [
    "Tell me about Yash.",
    "What internships has Yash done?",
    "What technologies does Yash know?",
    "Tell me about his CGPA.",
    "What projects has Yash built?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const timer = setTimeout(scrollToBottom, 50);
    return () => clearTimeout(timer);
  }, [messages, isTyping]);

  // NLP matching logic
  const getBotResponse = (input) => {
    const text = input.toLowerCase();
    
    // Who is Yash
    if (text.includes('yash') || text.includes('who are you') || text.includes('about') || text.includes('summary')) {
      const name = portfolioData.personalInfo.name;
      const title = portfolioData.personalInfo.title;
      const gradYear = portfolioData.about.quickFacts.find(f => f.label.includes('Graduation'))?.value || '2027';
      const cgpa = portfolioData.about.quickFacts.find(f => f.label.includes('CGPA'))?.value || '8.93 / 10';
      return `${name} is an ${title}. He is currently pursuing a Bachelor of Engineering in Artificial Intelligence & Data Science at Datta Meghe College of Engineering (graduating in ${gradYear}). He has a current CGPA of ${cgpa.split(' ')[0]} and is passionate about building intelligent systems.`;
    }
    
    // Internships / Experience
    if (text.includes('intern') || text.includes('experience') || text.includes('work') || text.includes('job')) {
      const expItems = portfolioData.experience.slice(0, 4).map((exp, idx) => {
        return `${idx + 1}. ${exp.role} at ${exp.company} (${exp.duration}): ${exp.description || exp.project || ''}`;
      }).join('\n');
      return `Yash has completed several internships, including:\n${expItems}`;
    }

    // Skills
    if (text.includes('skill') || text.includes('technology') || text.includes('languages') || text.includes('tech') || text.includes('know')) {
      const skillCategories = portfolioData.skills.categories.map(cat => {
        const itemsList = cat.items.map(item => item.name).join(', ');
        return `• ${cat.title}: ${itemsList}`;
      }).join('\n');
      return `Yash's tech stack includes:\n${skillCategories}`;
    }

    // Projects
    if (text.includes('project') || text.includes('build') || text.includes('make') || text.includes('code')) {
      const projItems = portfolioData.projects.slice(0, 4).map(proj => {
        return `• ${proj.title}: ${proj.description.slice(0, 120)}...`;
      }).join('\n');
      return `Yash has built several notable projects:\n${projItems}`;
    }

    // CGPA / Education
    if (text.includes('cgpa') || text.includes('education') || text.includes('percentage') || text.includes('gpa') || text.includes('college') || text.includes('grade')) {
      const eduItems = portfolioData.education.timeline.map(edu => {
        const score = edu.cgpa ? `CGPA: ${edu.cgpa}` : edu.percentage ? `Percentage: ${edu.percentage}` : '';
        return `• ${edu.level} at ${edu.institution}: ${edu.duration || edu.year} (${score})`;
      }).join('\n');
      return `Education Profile:\n${eduItems}`;
    }

    // Contact / Email / Phone
    if (text.includes('contact') || text.includes('email') || text.includes('phone') || text.includes('number') || text.includes('call')) {
      const email = portfolioData.personalInfo.email;
      const phone = portfolioData.personalInfo.phone;
      const loc = portfolioData.personalInfo.location;
      const linkedin = portfolioData.personalInfo.linkedin;
      return `You can reach Yash directly:\n• Email: ${email}\n• Phone: ${phone}\n• Location: ${loc}\n• LinkedIn: ${linkedin}`;
    }

    // Greetings
    if (text.includes('hi') || text.includes('hello') || text.includes('hey') || text.includes('greet')) {
      return `Hello! How can I help you learn more about Yash today? Feel free to ask about his internships, education, or tech projects.`;
    }

    // Default response
    return `Interesting question! While I am currently loading matching parameters, you can review his full credentials in the sections above. You can also view/download his resume by clicking "Resume" in the header or write directly via the Contact form!`;
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // Add user message with absolute unique ID
    const newMsg = {
      id: `user-${Math.random().toString(36).substring(2, 9)}-${Date.now()}`,
      sender: 'user',
      text: text
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Trigger typing state
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const reply = {
        id: `bot-${Math.random().toString(36).substring(2, 9)}-${Date.now()}`,
        sender: 'bot',
        text: getBotResponse(text)
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  const lastMessage = messages[messages.length - 1];
  const showSuggestions = lastMessage && lastMessage.sender === 'bot' && !isTyping;

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-purple text-white flex items-center justify-center shadow-[0_4px_20px_rgba(6,182,212,0.35)] hover:shadow-[0_4px_25px_rgba(168,85,247,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer relative"
          animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-pink rounded-full border border-white animate-pulse" />
          )}
        </motion.button>
      </div>

      {/* Chatbox Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[480px] z-40 glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col justify-between"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-brand-cyan to-brand-purple text-white flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold font-mono tracking-wider">YASH_ASSISTANT.EXE</h4>
                  <span className="text-[9px] uppercase text-brand-cyan font-semibold flex items-center space-x-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1" />
                    Online
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages scroll area */}
            <div className="p-4 flex-grow overflow-y-auto space-y-4 bg-slate-50/20 dark:bg-slate-950/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold ${
                      msg.sender === 'user' ? 'bg-brand-purple text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                    </div>

                    <div className={`p-3 rounded-2xl text-xs text-left leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-brand-purple text-white rounded-tr-none'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 rounded-tl-none whitespace-pre-line'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing simulation */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                      <Bot size={12} className="text-slate-500" />
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl rounded-tl-none border border-slate-200 dark:border-white/5 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 animate-bounce [animation-delay:0.1s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 animate-bounce [animation-delay:0.3s]" />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions drawer */}
            {showSuggestions && (
              <div className="p-3 bg-slate-100/50 dark:bg-slate-900/30 border-t border-slate-200/50 dark:border-white/5">
                <span className="block text-[9px] uppercase tracking-wider text-slate-400 text-left font-mono font-bold mb-2">
                  Quick suggestions:
                </span>
                <div className="flex flex-wrap gap-1">
                  {suggestions.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(sug)}
                      className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/5 text-[10px] text-slate-600 dark:text-slate-400 hover:border-brand-cyan hover:text-brand-cyan transition-colors text-left font-semibold cursor-pointer"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Input Bar */}
            <div className="p-3 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 flex items-center space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                placeholder="Ask a question..."
                className="flex-grow px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:border-brand-purple"
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                className="p-2.5 rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-purple text-white shadow hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Send size={12} />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
