import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, ArrowDown, RefreshCw } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Vocabulary helper for spellcheck
const vocabulary = [
  'yash', 'python', 'java', 'javascript', 'react', 'machine', 'learning', 'deep', 'generative', 'nlp',
  'vision', 'skills', 'experience', 'work', 'job', 'internship', 'internships', 'projects', 'build', 'education',
  'college', 'certifications', 'certificates', 'achievements', 'awards', 'hackathon', 'blog',
  'contact', 'email', 'phone', 'location', 'resume', 'cgpa', 'gpa', 'grades', 'scores', 'percentile', 'percentage', 'marks'
];

const abbreviations = {
  'ml': 'machine learning',
  'ai': 'artificial intelligence',
  'dl': 'deep learning',
  'ds': 'data science',
  'cv': 'computer vision',
  'js': 'javascript',
  'gpa': 'cgpa'
};

function getEditDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  return matrix[b.length][a.length];
}

function spellcheckWord(word) {
  if (abbreviations[word]) return abbreviations[word];
  if (word.length < 3) return word;

  let bestMatch = word;
  let minDistance = Infinity;

  for (const vocab of vocabulary) {
    const dist = getEditDistance(word, vocab);
    if (dist < minDistance) {
      minDistance = dist;
      bestMatch = vocab;
    }
  }

  const threshold = word.length <= 4 ? 1 : 2;
  if (minDistance <= threshold) {
    return bestMatch;
  }
  return word;
}

function normalizeAndSpellcheck(inputText) {
  const words = inputText.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, ' ')
    .split(/\s+/);
  
  const correctedWords = words.map(spellcheckWord);
  return correctedWords.join(' ');
}

const intents = {
  greeting: {
    keywords: ['hi', 'hello', 'hey', 'greetings', 'sup', 'morning', 'evening', 'hola', 'yo'],
    response: () => {
      const greetings = [
        "Hello! How can I help you learn more about Yash today? Feel free to ask about his education, skills, projects, or work experience.",
        "Hi there! I'm Yash's AI assistant. Ask me anything about his technical background, projects, or achievements!",
        "Hey! Welcome to Yash's portfolio. How can I assist you in exploring his skills and experience?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
  },
  goodbye: {
    keywords: ['bye', 'goodbye', 'see ya', 'thank you', 'thanks', 'thank', 'awesome', 'great'],
    response: () => {
      const goodbyes = [
        "You're welcome! Let me know if you need anything else. Have a great day!",
        "Glad I could help! Feel free to ask if you have more questions later. Bye!",
        "Thanks for chatting! Have fun exploring the rest of Yash's portfolio."
      ];
      return goodbyes[Math.floor(Math.random() * goodbyes.length)];
    }
  },
  about_yash: {
    keywords: ['yash', 'who are you', 'summary', 'about', 'intro', 'profile', 'biography', 'himself', 'who is', 'tell me about'],
    response: () => {
      const name = portfolioData.personalInfo.name;
      const title = portfolioData.personalInfo.title;
      const summary = portfolioData.personalInfo.summary;
      const location = portfolioData.personalInfo.location;
      return `${name} is an ${title} based in ${location}. ${summary}\n\nHe is currently pursuing a Bachelor of Engineering in Artificial Intelligence & Data Science at Datta Meghe College of Engineering (graduating in 2027) with a CGPA of 8.93.`;
    }
  },
  education: {
    keywords: ['education', 'college', 'school', 'study', 'university', 'degree', 'dmce', 'datta', 'academic', 'academics', 'cgpa', 'gpa', 'grades', 'scores', 'percentile', 'percentage', 'marks', 'hsc', 'ssc'],
    response: (query) => {
      if (query.includes('cgpa') || query.includes('gpa') || query.includes('grade') || query.includes('score') || query.includes('mark')) {
        const eng = portfolioData.education.timeline.find(edu => edu.id === 'eng');
        const semDetails = eng.semesters.map(s => `${s.sem}: ${s.gpa}`).join(', ');
        return `Yash has an impressive academic record! His current B.E. CGPA is **${eng.cgpa} / 10** at Datta Meghe College of Engineering. \nHere is his semester-wise breakdown:\n• ${semDetails}\n\nAdditionally, he scored 76.00% in his 12th Standard (HSC) with a 90.99 percentile in MHT-CET, and 85.40% in his 10th Standard (SSC).`;
      }
      if (query.includes('college') || query.includes('university') || query.includes('engineering') || query.includes('degree')) {
        const eng = portfolioData.education.timeline.find(edu => edu.id === 'eng');
        return `Yash is pursuing a **${eng.degree}** at **${eng.institution}** (affiliated with the ${eng.university}). He is in the 2023 - 2027 batch (currently starting Semester 7).`;
      }
      
      const eduItems = portfolioData.education.timeline.map(edu => {
        const score = edu.cgpa ? `CGPA: ${edu.cgpa}` : edu.percentage ? `Percentage: ${edu.percentage}` : '';
        return `• **${edu.level}** at *${edu.institution}* (${edu.duration || edu.year}) - ${score}`;
      }).join('\n');
      return `Here is Yash's education history:\n${eduItems}`;
    }
  },
  experience: {
    keywords: ['experience', 'work', 'job', 'internship', 'internships', 'intern', 'springboard', 'infosys', 'codec', 'codsoft', 'istudio', 'oasis', 'prodigy'],
    response: (query) => {
      for (const exp of portfolioData.experience) {
        const comp = exp.company.toLowerCase();
        if (query.includes(comp)) {
          return `**${exp.role}** at **${exp.company}** (${exp.duration}, ${exp.mode}):\n${exp.description || ''}${exp.project ? `\nProject: ${exp.project}` : ''}`;
        }
      }
      
      const expItems = portfolioData.experience.map((exp, idx) => {
        return `${idx + 1}. **${exp.role}** at *${exp.company}* (${exp.duration}): ${exp.project || exp.description.slice(0, 100) + '...'}`;
      }).join('\n');
      return `Yash has completed **6 professional internships** to build real-world AI and programming expertise:\n\n${expItems}\n\nFeel free to ask about any specific internship (e.g., "Tell me about his Infosys internship")!`;
    }
  },
  skills: {
    keywords: ['skills', 'skils', 'skill', 'tech', 'technology', 'technologies', 'know', 'stack', 'languages', 'programming', 'python', 'java', 'javascript', 'sql', 'c', 'database', 'tools'],
    response: (query) => {
      const allSkills = [];
      portfolioData.skills.categories.forEach(cat => {
        cat.items.forEach(item => {
          allSkills.push(item);
        });
      });

      for (const skill of allSkills) {
        if (query.includes(skill.name.toLowerCase())) {
          return `Yes, Yash is proficient in **${skill.name}** (Proficiency Level: ${skill.level}%). He has applied it extensively across various projects and internships listed on the website.`;
        }
      }

      const skillCategories = portfolioData.skills.categories.map(cat => {
        const itemsList = cat.items.map(item => item.name).join(', ');
        return `• **${cat.title}**: ${itemsList}`;
      }).join('\n');
      return `Yash's core technical skills cover AI/ML, full-stack web development, and cloud databases:\n\n${skillCategories}`;
    }
  },
  projects: {
    keywords: ['projects', 'project', 'build', 'built', 'make', 'made', 'code', 'coding', 'github', 'repository', 'repos', 'develop'],
    response: (query) => {
      for (let i = 0; i < portfolioData.projects.length; i++) {
        const proj = portfolioData.projects[i];
        if (query.includes(proj.title.toLowerCase()) || query.includes(proj.id.toLowerCase())) {
          return `**${proj.title}** (${proj.category}):\n${proj.description}\n\n• **Tech Stack**: ${proj.tech.join(', ')}\n• **GitHub**: ${proj.githubUrl || 'Private'}${proj.liveUrl ? `\n• **Live Demo**: [Link](${proj.liveUrl})` : ''}`;
        }
      }

      const featured = portfolioData.projects.filter(p => p.featured);
      const projItems = featured.map((proj, idx) => {
        return `${idx + 1}. **${proj.title}** (${proj.category}): ${proj.description.slice(0, 100)}...`;
      }).join('\n\n');
      return `Yash has worked on multiple projects in AI, Python, and Full Stack development. Here are his featured projects:\n\n${projItems}\n\nWould you like more details about any of these? You can say e.g., "Tell me about the first project" or ask about specific projects like "AI Support Engine" or "QuickServe".`;
    }
  },
  certifications: {
    keywords: ['certifications', 'certifcates', 'certificate', 'certificates', 'certified', 'courses', 'course', 'credentials', 'aws', 'ibm', 'cisco', 'google'],
    response: (query) => {
      const providers = ['aws', 'ibm', 'cisco', 'google', 'infosys', 'nvidia', 'microsoft'];
      let matchedProvider = null;
      for (const prov of providers) {
        if (query.includes(prov)) {
          matchedProvider = prov;
          break;
        }
      }

      if (matchedProvider) {
        const filtered = portfolioData.certifications.filter(c => c.issuer.toLowerCase().includes(matchedProvider) || c.title.toLowerCase().includes(matchedProvider));
        if (filtered.length > 0) {
          const list = filtered.slice(0, 5).map(c => `• **${c.title}** issued by ${c.issuer} (${c.date})`).join('\n');
          return `Yash has earned several credentials from ${matchedProvider.toUpperCase()}:\n\n${list}\n\nHe has a total of 40+ professional certifications.`;
        }
      }

      const sample = portfolioData.certifications.slice(0, 4).map(c => `• **${c.title}** by *${c.issuer}* (${c.date})`).join('\n');
      return `Yash holds over **40+ professional certifications** in AI, Cloud, and Cybersecurity from top organizations like AWS, Cisco, IBM, Google, and Nvidia. Some notable ones include:\n\n${sample}\n\nFeel free to ask if he has a specific certificate!`;
    }
  },
  achievements: {
    keywords: ['achievements', 'achievement', 'award', 'awards', 'hackathon', 'hackastra', 'competition', 'percentile', 'success'],
    response: () => {
      const list = portfolioData.achievements.slice(0, 5).map(a => `• **${a.title}**: ${a.description}`).join('\n\n');
      return `Here are some of Yash's top achievements:\n\n${list}`;
    }
  },
  blog: {
    keywords: ['blog', 'blogs', 'articles', 'article', 'writing', 'write'],
    response: (query) => {
      for (const blog of portfolioData.blogs) {
        if (query.includes(blog.title.toLowerCase())) {
          return `**${blog.title}** (${blog.category} - ${blog.date}):\n\n${blog.content}`;
        }
      }

      const list = portfolioData.blogs.map((b, idx) => `**${idx + 1}. ${b.title}** (${b.category}): *${b.summary}*`).join('\n\n');
      return `Yash writes articles sharing tech insights. Here are his recent blog posts:\n\n${list}\n\nType the title or index of a blog to read it!`;
    }
  },
  contact: {
    keywords: ['contact', 'email', 'phone', 'location', 'reach', 'address', 'linkedin', 'github', 'mail', 'whatsapp', 'call', 'write', 'message'],
    response: () => {
      const { email, phone, location, linkedin, github } = portfolioData.personalInfo;
      return `You can contact Yash Anil Mahajan directly:\n\n• **Email**: [${email}](mailto:${email})\n• **Phone**: [${phone}](tel:${phone.replace(/\s+/g, '')})\n• **LinkedIn**: [LinkedIn Profile](${linkedin})\n• **GitHub**: [GitHub Profile](${github})\n• **Location**: ${location}\n\nYou can also send a direct message using the **Contact Form** on the website!`;
    }
  },
  resume: {
    keywords: ['resume', 'cv', 'download', 'pdf', 'portfolio', 'credentials'],
    response: () => {
      return `You can download or view Yash's professional resume by clicking the **Resume** button in the navigation bar header or the footer. Alternatively, it's available directly via the resume modal!`;
    }
  },
  help: {
    keywords: ['help', 'what can you do', 'capabilities', 'questions', 'ask', 'commands'],
    response: () => {
      return `I can help you explore Yash's qualifications and portfolio! Ask me about:\n\n• **Education & CGPA** ("Where does he study?", "What is his GPA?")\n• **Internships** ("Tell me about his work experience", "Infosys internship details")\n• **Projects** ("What has he built?", "Tell me about his AI support engine")\n• **Skills** ("What programming languages does he know?", "Does he know Python?")\n• **Certifications** ("AWS certifications", "How many certificates does he have?")\n• **Contact & Links** ("What is his email?", "Can I have his LinkedIn link?")`;
    }
  }
};

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

  const [sessionState, setSessionState] = useState({
    lastIntent: null,
    lastCategory: null,
    selectedItemIndex: -1,
    chatCount: 0
  });

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

  const getBotResponse = (input) => {
    const query = normalizeAndSpellcheck(input);
    const rawQuery = input.toLowerCase();

    // 1. Calculate intent matching scores
    let bestIntent = null;
    let maxScore = 0;

    Object.keys(intents).forEach((intentKey) => {
      let score = 0;
      intents[intentKey].keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        if (regex.test(query) || regex.test(rawQuery)) {
          score += 1;
          if (query.startsWith(keyword) || rawQuery.startsWith(keyword)) {
            score += 0.5;
          }
        }
      });
      if (score > maxScore) {
        maxScore = score;
        bestIntent = intentKey;
      }
    });

    // 2. Handle ordinal indicators / references to previous context
    const ordinals = [
      { words: ['first', '1st', 'one'], index: 0 },
      { words: ['second', '2nd', 'two'], index: 1 },
      { words: ['third', '3rd', 'three'], index: 2 },
      { words: ['fourth', '4th', 'four'], index: 3 },
      { words: ['fifth', '5th', 'five'], index: 4 },
      { words: ['sixth', '6th', 'six'], index: 5 },
      { words: ['last'], index: -2 }
    ];

    let matchedIndex = -1;
    for (const ord of ordinals) {
      if (ord.words.some(w => query.includes(w) || rawQuery.includes(w))) {
        matchedIndex = ord.index;
        break;
      }
    }

    const isLinkQuery = ['link', 'code', 'github', 'website', 'url', 'repo', 'repository'].some(w => query.includes(w) || rawQuery.includes(w));
    const isTechQuery = ['tech', 'technology', 'technologies', 'stack', 'language', 'framework', 'library'].some(w => query.includes(w) || rawQuery.includes(w));
    const isDetailQuery = ['detail', 'details', 'tell me more', 'describe', 'explain', 'more about', 'what is'].some(w => query.includes(w) || rawQuery.includes(w));
    const isCertificateQuery = ['certificate', 'certification', 'proof', 'credential'].some(w => query.includes(w) || rawQuery.includes(w));

    // 3. Contextual routing
    if (sessionState.lastCategory && (matchedIndex >= 0 || matchedIndex === -2 || isLinkQuery || isTechQuery || isDetailQuery || isCertificateQuery) && maxScore < 1.5) {
      const category = sessionState.lastCategory;
      
      if (category === 'projects') {
        const items = portfolioData.projects.filter(p => p.featured);
        let itemIdx = sessionState.selectedItemIndex;
        
        if (matchedIndex >= 0) {
          itemIdx = matchedIndex;
        } else if (matchedIndex === -2) {
          itemIdx = items.length - 1;
        }

        if (itemIdx >= 0 && itemIdx < items.length) {
          const proj = items[itemIdx];
          
          setSessionState(prev => ({
            ...prev,
            selectedItemIndex: itemIdx,
            lastIntent: 'project_details'
          }));

          if (isLinkQuery) {
            return `The GitHub repository link for **${proj.title}** is: ${proj.githubUrl || 'Private/Not available'}.${proj.liveUrl ? `\nLive Demo: [Link](${proj.liveUrl})` : ''}`;
          }
          if (isTechQuery) {
            return `**${proj.title}** was built using: ${proj.tech.join(', ')}.`;
          }
          if (isDetailQuery || matchedIndex >= 0) {
            return `**${proj.title}** (${proj.category}):\n${proj.description}\n\n• **Tech Stack**: ${proj.tech.join(', ')}\n• **GitHub**: ${proj.githubUrl || 'Private'}${proj.liveUrl ? `\n• **Live Demo**: [Link](${proj.liveUrl})` : ''}`;
          }
        }
      }

      if (category === 'experience') {
        const items = portfolioData.experience;
        let itemIdx = sessionState.selectedItemIndex;

        if (matchedIndex >= 0) {
          itemIdx = matchedIndex;
        } else if (matchedIndex === -2) {
          itemIdx = items.length - 1;
        }

        if (itemIdx >= 0 && itemIdx < items.length) {
          const exp = items[itemIdx];

          setSessionState(prev => ({
            ...prev,
            selectedItemIndex: itemIdx,
            lastIntent: 'experience_details'
          }));

          if (isCertificateQuery) {
            return `Yes, the certificate for Yash's internship as a **${exp.role}** at **${exp.company}** is **${exp.certificate || 'Available'}**.`;
          }

          if (isDetailQuery || matchedIndex >= 0) {
            return `During his internship as **${exp.role}** at **${exp.company}** (${exp.duration}, ${exp.mode}):\n\n${exp.description || ''}${exp.project ? `\n\n• **Project**: ${exp.project}` : ''}`;
          }
        }
      }

      if (category === 'blog') {
        const items = portfolioData.blogs;
        let itemIdx = sessionState.selectedItemIndex;

        if (matchedIndex >= 0) {
          itemIdx = matchedIndex;
        } else if (matchedIndex === -2) {
          itemIdx = items.length - 1;
        }

        if (itemIdx >= 0 && itemIdx < items.length) {
          const blog = items[itemIdx];

          setSessionState(prev => ({
            ...prev,
            selectedItemIndex: itemIdx,
            lastIntent: 'blog_details'
          }));

          return `Here is the full content of the blog post **"${blog.title}"**:\n\n${blog.content}`;
        }
      }
    }

    // 4. Default intent logic
    if (bestIntent && maxScore >= 0.8) {
      let newCategory = sessionState.lastCategory;
      if (['projects', 'experience', 'education', 'blog'].includes(bestIntent)) {
        newCategory = bestIntent;
      }

      setSessionState(prev => ({
        ...prev,
        lastIntent: bestIntent,
        lastCategory: newCategory,
        selectedItemIndex: -1
      }));

      return intents[bestIntent].response(rawQuery);
    }

    // 5. Fallback logic: check for simple matches on raw keywords if NLP scoring fails
    if (rawQuery.includes('infosys') || rawQuery.includes('springboard')) {
      const exp = portfolioData.experience.find(e => e.company.includes('Infosys'));
      return `**${exp.role}** at **${exp.company}** (${exp.duration}):\n${exp.description}\n\nProject: ${exp.project}`;
    }
    if (rawQuery.includes('hackastra') || rawQuery.includes('hackathon')) {
      const ach = portfolioData.achievements.find(a => a.id === 'ach5');
      return `Yash was a **${ach.title}**. ${ach.description}`;
    }
    if (rawQuery.includes('aws') || rawQuery.includes('amazon')) {
      const awsCerts = portfolioData.certifications.filter(c => c.issuer.toLowerCase().includes('aws'));
      const list = awsCerts.map(c => `• **${c.title}** (${c.date})`).join('\n');
      return `Yash has earned multiple AWS credentials:\n\n${list}`;
    }

    // Friendly default responses (avoiding repetition)
    const defaults = [
      `I'm not sure I fully got that. Could you clarify if you're asking about Yash's projects, technical skills, education, or internships?`,
      `Interesting question! While I don't have a specific answer for that, you can check his full details in the sections above, download his resume, or message him directly using the Contact form.`,
      `I couldn't find a direct match for that. Try asking something like: "What projects has he built?", "Tell me about his CGPA", or "What tools does he know?"`
    ];

    const responseIndex = sessionState.chatCount % defaults.length;
    setSessionState(prev => ({
      ...prev,
      chatCount: prev.chatCount + 1
    }));
    return defaults[responseIndex];
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const newMsg = {
      id: `user-${Math.random().toString(36).substring(2, 9)}-${Date.now()}`,
      sender: 'user',
      text: text
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    const botReplyText = getBotResponse(text);

    setTimeout(() => {
      setIsTyping(false);
      const reply = {
        id: `bot-${Math.random().toString(36).substring(2, 9)}-${Date.now()}`,
        sender: 'bot',
        text: botReplyText
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
