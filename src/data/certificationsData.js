// This file is dynamically generated at compile time using Vite's glob import.
// It automatically loads all certificates from E:\Coding Area\YAM's Portfolio\Certificates.

const certificateModules = import.meta.glob('/Certificates/**/*.{pdf,png,jpg,jpeg,webp}', { eager: true });

// Dictionary to map filename-derived keys to their original/expected metadata
const metadataLookup = {
  "yash_anil_mahajan_chronomind": {
    id: "hackathon-chronomind",
    title: "Chronomind AI Challenge",
    organization: "AI Academia",
    issueDate: "2026-12-31",
    displayDate: "2026",
    description: "Participated in an AI-focused challenge to solve time-series related problems.",
    skills: ["AI Modeling", "Innovation"],
    featured: false
  },
  "yash_anil_mahajan_decision_arena": {
    id: "hackathon-decision-arena",
    title: "Decision Arena Hackathon",
    organization: "Hackathon Organizer",
    issueDate: "2026-12-31",
    displayDate: "2026",
    description: "Participated in the Decision Arena hackathon challenge.",
    skills: ["Problem Solving", "Rapid Prototyping"],
    featured: false
  },
  "yash_anil_mahajan_hackastra": {
    id: "hackathon-hackastra",
    title: "HackAstra – Innovision 3.0 Hackathon",
    organization: "K. V. Pendharkar College Department of IT",
    issueDate: "2026-02-07",
    displayDate: "Feb 2026",
    description: "Participated in a 24-hour hackathon, building an innovative software solution.",
    skills: ["Rapid Prototyping", "Teamwork", "Problem Solving"],
    featured: true,
    priority: 16
  },
  "yash_mahajan_-_tata_ata_data_visualisation": {
    id: "sim-tata-da-vis",
    title: "Data Visualisation: Empowering Business with Effective Insights",
    organization: "Tata Group (Forage)",
    issueDate: "2025-07-20",
    displayDate: "Jul 2025",
    description: "Learned to create impactful data visualizations for business decision making.",
    skills: ["Data Visualization", "Insights Generation"],
    featured: false
  },
  "yash_mahajan_-_tata_gen_ai_internship": {
    id: "sim-tata-genai",
    title: "GenAI Powered Data Analytics Job Simulation",
    organization: "Tata Group (Forage)",
    issueDate: "2025-07-21",
    displayDate: "Jul 2025",
    description: "Completed a job simulation focusing on using Generative AI for data analytics tasks.",
    skills: ["Generative AI", "Data Analytics", "Business Intelligence"],
    featured: true,
    priority: 11
  },
  "yash_anil_mahajan_deloitte_data_analytics": {
    id: "sim-deloitte-da",
    title: "Data Analytics Job Simulation",
    organization: "Deloitte (Forage)",
    issueDate: "2026-07-01",
    displayDate: "Jul 2026",
    description: "Gained experience in data analytics tasks as performed at Deloitte.",
    skills: ["Data Cleaning", "Data Interpretation", "Client Communication"],
    featured: true,
    priority: 12
  },
  "yash_anil_mahajan_infosys_deep_learning": {
    id: "cert-infosys-dl",
    title: "Deep Learning",
    organization: "Infosys Springboard",
    issueDate: "2025-06-08",
    displayDate: "Jun 2025",
    description: "Course covering deep learning principles and model architectures.",
    skills: ["Deep Learning"],
    featured: false
  },
  "yash_anil_mahajan_infosys_deep_learning_for_developers": {
    id: "cert-infosys-dl-dev",
    title: "Deep Learning for Developers",
    organization: "Infosys Springboard",
    issueDate: "2025-06-13",
    displayDate: "Jun 2025",
    description: "Deep learning frameworks, practical model development, and implementation guidelines.",
    skills: ["Deep Learning", "Development"],
    featured: false
  },
  "yash_anil_mahajan_infosys_gpt-3": {
    id: "cert-infosys-gpt3",
    title: "GPT-3",
    organization: "Infosys Springboard",
    issueDate: "2025-06-12",
    displayDate: "Jun 2025",
    description: "Learned the features, prompt design, and APIs of the GPT-3 models.",
    skills: ["GPT-3"],
    featured: false
  },
  "yash_anil_mahajan_infosys_ai": {
    id: "cert-infosys-ai-general",
    title: "AI",
    organization: "Infosys Springboard",
    issueDate: "2025-06-02",
    displayDate: "Jun 2025",
    description: "Fundamentals of AI technologies and overall overview of automated intelligence.",
    skills: ["AI"],
    featured: false
  },
  "yash_anil_mahajan_infosys_artificial_intelligence_primer_certification": {
    id: "cert-infosys-ai-primer",
    title: "Artificial Intelligence Primer",
    organization: "Infosys Springboard",
    issueDate: "2025-06-15",
    displayDate: "Jun 2025",
    description: "Introductory course outlining the landscape of artificial intelligence systems.",
    skills: ["AI Basics"],
    featured: false
  },
  "yash_anil_mahajan_infosys_computer_vision_101": {
    id: "cert-infosys-cv",
    title: "Computer Vision 101",
    organization: "Infosys Springboard",
    issueDate: "2025-06-09",
    displayDate: "Jun 2025",
    description: "Learned image processing basics, filters, and feature extraction techniques.",
    skills: ["Computer Vision"],
    featured: false
  },
  "yash_anil_mahajan_infosys_data_science": {
    id: "cert-infosys-ds",
    title: "Data Science",
    organization: "Infosys Springboard",
    issueDate: "2025-06-05",
    displayDate: "Jun 2025",
    description: "Key concepts in statistics, data cleaning, exploratory analysis, and data modeling.",
    skills: ["Data Science"],
    featured: false
  },
  "yash_anil_mahajan_infosys_gen_ai": {
    id: "cert-infosys-genai",
    title: "Generative AI",
    organization: "Infosys Springboard",
    issueDate: "2025-06-08",
    displayDate: "Jun 2025",
    description: "Explored neural text generation, image synthesis, and prompt optimization.",
    skills: ["Generative AI"],
    featured: false
  },
  "yash_anil_mahajan_infosys_generative_models_for_developers": {
    id: "cert-infosys-gen-models",
    title: "Generative Models for Developers",
    organization: "Infosys Springboard",
    issueDate: "2025-06-12",
    displayDate: "Jun 2025",
    description: "Integrating generative model endpoints and developing AI-powered helper tools.",
    skills: ["Generative Models"],
    featured: false
  },
  "yash_anil_mahajan_infosys_natural_language_processing": {
    id: "cert-infosys-nlp",
    title: "Natural Language Processing",
    organization: "Infosys Springboard",
    issueDate: "2025-06-09",
    displayDate: "Jun 2025",
    description: "Learned text pre-processing, tokenization, sentiment analysis, and basic language parsing.",
    skills: ["NLP"],
    featured: false
  },
  "yash_anil_mahajan_infosys_openai_gpt": {
    id: "cert-infosys-openai",
    title: "OpenAI GPT",
    organization: "Infosys Springboard",
    issueDate: "2025-06-11",
    displayDate: "Jun 2025",
    description: "Familiarized with OpenAI APIs, token metrics, and model tuning mechanisms.",
    skills: ["OpenAI", "GPT"],
    featured: false
  },
  "yash_anil_mahajan_infosys_prompt_engineering": {
    id: "cert-infosys-prompt",
    title: "Prompt Engineering",
    organization: "Infosys Springboard",
    issueDate: "2025-06-08",
    displayDate: "Jun 2025",
    description: "Techniques for formulating high-precision instructions for large language models.",
    skills: ["Prompt Engineering"],
    featured: false
  },
  "yash_mahajan_-_data_analytics_internship_-_internship": {
    id: "intern-istudio-da",
    title: "Data Analytics Internship",
    organization: "iStudio",
    issueDate: "2025-09-05",
    displayDate: "Sep 2025",
    duration: "1 Month",
    description: "Focused on data analysis and visualization tasks for client projects.",
    skills: ["Data Visualization", "Excel", "SQL"],
    featured: true,
    priority: 4
  },
  "yash_anil_mahajan_codsoft_internship_certificate": {
    id: "intern-codsoft-ai",
    title: "Artificial Intelligence Intern",
    organization: "CODSOFT",
    issueDate: "2026-01-10",
    displayDate: "Jan 2026",
    duration: "1 Month",
    description: "Completed AI-based projects during a month-long internship.",
    skills: ["AI Algorithms", "Python Programming"],
    featured: false
  },
  "yash_anil_mahajan_infosys_springboard_internship_compeletion_certificate_(1)": {
    id: "intern-infosys-ai",
    title: "Artificial Intelligence Intern",
    organization: "Infosys Springboard",
    issueDate: "2025-11-28",
    displayDate: "Nov 2025",
    duration: "2 Months",
    description: "Successfully completed a 2-month internship focused on AI technologies and practical implementations.",
    skills: ["Artificial Intelligence", "Python", "Problem Solving"],
    featured: true,
    priority: 1
  },
  "yash_anil_mahajan_internship_completeion_codec_ai": {
    id: "intern-codec-ai",
    title: "AI Internship",
    organization: "Codec Technologies",
    issueDate: "2026-05-25",
    displayDate: "May 2026",
    duration: "1 Month",
    description: "Gained hands-on experience in AI development and implementation of machine learning models.",
    skills: ["AI Development", "Machine Learning"],
    featured: true,
    priority: 2
  },
  "yash_anil_mahajan_oasis_python_programming_intern_certificate": {
    id: "intern-oasis-python",
    title: "Python Programming Intern",
    organization: "Oasis Infobyte",
    issueDate: "2025-07-15",
    displayDate: "Jun/Jul 2025",
    duration: "1 Month",
    description: "Developed several Python applications and scripts during the internship.",
    skills: ["Python", "Automation", "Scripting"],
    featured: false
  },
  "yash_anil_mahajan_prodigy_ml_intern_certificate": {
    id: "intern-prodigy-ml",
    title: "Machine Learning Intern",
    organization: "Prodigy InfoTech",
    issueDate: "2025-07-15",
    displayDate: "Jul 2025",
    duration: "1 Month",
    description: "Worked on various machine learning models and data processing pipelines.",
    skills: ["Machine Learning", "Scikit-Learn", "Pandas"],
    featured: true,
    priority: 3
  },
  "certificate_-_yash_mahajan_-_supercharge_your_productivity_with_ai_(1)": {
    id: "cert-iide-ai",
    title: "Supercharge Your Productivity Essentials with AI",
    organization: "IIDE",
    issueDate: "2026-01-31",
    displayDate: "Jan 2026",
    description: "Learned how to leverage AI tools to enhance daily productivity and workflow.",
    skills: ["AI Tools", "Productivity", "Workflow Optimization"],
    featured: false
  },
  "yash_mahajan_tcsion": {
    id: "cert-tcs-ion",
    title: "TCS iON Career Edge – Young Professional",
    organization: "TCS iON",
    issueDate: "2025-08-15",
    displayDate: "Jul/Aug 2025",
    description: "Comprehensive program covering soft skills, communication, and basic business concepts.",
    skills: ["Communication", "Soft Skills", "Business Ethics"],
    featured: true,
    priority: 14
  },
  "yash_ani_mahajan_artificial-intelligence-fundamentals": {
    id: "cert-ibm-ai",
    title: "Artificial Intelligence Fundamentals",
    organization: "IBM SkillsBuild",
    issueDate: "2025-06-29",
    displayDate: "Jun 2025",
    description: "Foundational knowledge in AI, covering its history, applications, and ethical considerations.",
    skills: ["AI Concepts", "Ethics in AI"],
    featured: true,
    priority: 9
  },
  "yash_anil_mahajan_ai_fundamentals_with_ibm_skillsbuild": {
    id: "cert-cisco-ai-ibm",
    title: "AI Fundamentals",
    organization: "Cisco Networking Academy & IBM SkillsBuild",
    issueDate: "2025-06-29",
    displayDate: "Jun 2025",
    description: "Comprehensive course covering the foundational principles of Artificial Intelligence.",
    skills: ["AI Ethics", "Machine Learning Basics", "Neural Networks"],
    featured: true,
    priority: 7
  },
  "yash_anil_mahajan_aws_cloud_computing": {
    id: "cert-aws-cloud",
    title: "AWS Cloud Practitioner Essentials",
    organization: "AWS Training & Certification",
    issueDate: "2025-12-31",
    displayDate: "2025",
    description: "Validation of overall understanding of the AWS Cloud platform, covering basic cloud concepts and security.",
    skills: ["Cloud Computing", "AWS Services", "Cloud Security"],
    featured: true,
    priority: 5
  },
  "yash_anil_mahajan_introduction_to_career_skills_in_data_analytics": {
    id: "cert-linkedin-da",
    title: "Introduction to Career Skills in Data Analytics",
    organization: "LinkedIn Learning",
    issueDate: "2025-06-20",
    displayDate: "Jun 2025",
    description: "Explored the essential skills needed for a career in data analytics.",
    skills: ["Data Analytics Skills", "Career Planning"],
    featured: false
  },
  "yash_anil_mahajan_introduction_to_data_science_certificate": {
    id: "cert-cisco-data-science",
    title: "Introduction to Data Science",
    organization: "Cisco Networking Academy",
    issueDate: "2026-01-01",
    displayDate: "Jan 2026",
    description: "Learned the basics of data science, data analysis, and how to communicate findings.",
    skills: ["Data Analysis", "Data Visualization", "Statistics"],
    featured: true,
    priority: 8
  },
  "yash_anil_mahajan_machine_learning_workshop_certificate": {
    id: "cert-csi-ml",
    title: "Machine Learning 101: An Introduction to the Future with Python",
    organization: "CSI-CATT DMCE",
    issueDate: "2025-12-31",
    displayDate: "2025",
    description: "Validated proficiency in the specified domain through rigorous evaluation.",
    skills: ["Machine Learning", "Python"],
    featured: true,
    priority: 15
  },
  "yash_anil_mahajan_python_essentials_1": {
    id: "cert-cisco-python",
    title: "Python Essentials 1",
    organization: "Cisco Networking Academy",
    issueDate: "2026-05-28",
    displayDate: "May 2026",
    description: "Foundational Python programming course focusing on core syntax and logic.",
    skills: ["Python", "Programming Logic"],
    featured: true,
    priority: 13
  }
};

const mapFolderNameToCategory = (folderName) => {
  const mapping = {
    'Hackethon': 'Hackathons',
    'Industry Job Simulations': 'Job Simulations',
    'Infosys Springboard Certifications': 'Infosys Springboard',
    'Internships': 'Internships',
    'Professional Certifications': 'Professional Development'
  };
  return mapping[folderName] || folderName;
};

// Process dynamic glob imports
const parsedCertifications = Object.keys(certificateModules).map((filePath) => {
  // Resolved URL for the file
  const fileUrl = certificateModules[filePath].default || certificateModules[filePath];
  
  // Extract details from path
  const parts = filePath.split('/');
  // E.g., /Certificates/Hackethon/yash_anil_mahajan_Chronomind.pdf
  const folderCategory = parts[2];
  const filenameWithExt = parts[3];
  
  const extIndex = filenameWithExt.lastIndexOf('.');
  const cleanName = filenameWithExt.substring(0, extIndex);
  
  // Check if we have predefined metadata for this file
  const lookupKey = cleanName.toLowerCase().replace(/\s+/g, '_');
  const metadata = metadataLookup[lookupKey] || {};
  
  // Clean dynamically generated title if not in lookup
  let title = metadata.title;
  if (!title) {
    title = cleanName
      .replace(/^(yash_anil_mahajan_|yash_ani_mahajan_|Yash Mahajan - |Yash_Mahajan_|Certificate - Yash Mahajan - )/i, '')
      .replace(/_/g, ' ')
      .replace(/-/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Capitalize Title Words
    title = title.split(' ').map(word => {
      const lower = word.toLowerCase();
      if (lower === 'ai') return 'AI';
      if (lower === 'ml') return 'ML';
      if (lower === 'ibm') return 'IBM';
      if (lower === 'aws') return 'AWS';
      if (lower === 'tcsion') return 'TCS iON';
      if (lower === 'gpt') return 'GPT';
      if (lower === 'nlp') return 'NLP';
      if (lower === 'svm') return 'SVM';
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  // Set category and categories list
  const categoryMapped = mapFolderNameToCategory(folderCategory);
  
  // Compile list of categories
  const categoriesList = [categoryMapped];
  if (metadata.featured) {
    categoriesList.push('Featured Credentials ⭐');
  }
  
  // Auto-categorize based on keywords for tabs
  const lowerTitle = title.toLowerCase();
  const lowerFile = filenameWithExt.toLowerCase();
  
  if (lowerFile.includes('aws') || lowerTitle.includes('aws')) {
    categoriesList.push('AWS');
  }
  if (lowerFile.includes('cisco') || lowerTitle.includes('cisco')) {
    categoriesList.push('Cisco');
  }
  if (lowerFile.includes('ibm') || lowerTitle.includes('ibm')) {
    categoriesList.push('IBM');
  }
  if (lowerFile.includes('infosys') || lowerTitle.includes('infosys')) {
    categoriesList.push('Infosys Springboard');
  }
  if (
    lowerFile.includes('deep_learning') || lowerFile.includes('ai') || lowerFile.includes('ml') ||
    lowerTitle.includes('deep learning') || lowerTitle.includes('ai') || lowerTitle.includes('ml') ||
    lowerTitle.includes('generative') || lowerTitle.includes('neural') || lowerTitle.includes('prompt')
  ) {
    categoriesList.push('AI & ML');
  }
  if (
    lowerFile.includes('data_science') || lowerFile.includes('data_analytics') || lowerFile.includes('visualisation') ||
    lowerTitle.includes('data science') || lowerTitle.includes('data analytics') || lowerTitle.includes('visualisation')
  ) {
    categoriesList.push('Data Analytics');
  }
  
  // Remove duplicate categories
  const uniqueCategories = [...new Set(categoriesList)];

  // Auto-deduce organization
  let organization = metadata.organization;
  if (!organization) {
    organization = "Professional Development";
    if (lowerFile.includes('infosys')) {
      organization = "Infosys Springboard";
    } else if (lowerFile.includes('deloitte')) {
      organization = "Deloitte";
    } else if (lowerFile.includes('tata')) {
      organization = "Tata Group";
    } else if (lowerFile.includes('codsoft')) {
      organization = "CODSOFT";
    } else if (lowerFile.includes('oasis')) {
      organization = "Oasis Infobyte";
    } else if (lowerFile.includes('prodigy')) {
      organization = "Prodigy InfoTech";
    } else if (lowerFile.includes('ibm')) {
      organization = "IBM SkillsBuild";
    } else if (lowerFile.includes('tcs')) {
      organization = "TCS iON";
    } else if (lowerFile.includes('aws')) {
      organization = "AWS Training & Certification";
    } else if (lowerFile.includes('hackastra')) {
      organization = "HackAstra";
    }
  }

  // Default dates
  const issueDate = metadata.issueDate || "2026-06-16";
  const displayDate = metadata.displayDate || "2026";
  
  return {
    id: metadata.id || `cert-${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    title,
    organization,
    categories: uniqueCategories,
    issueDate,
    displayDate,
    duration: metadata.duration,
    credentialId: metadata.credentialId,
    // Store the fileUrl as certificateUrl so it displays in our modal viewer
    certificateUrl: fileUrl,
    originalCredentialUrl: metadata.credentialUrl, // keep original credential URL just in case
    thumbnail: fileUrl, // use fileUrl as preview/thumbnail
    description: metadata.description || "Validated proficiency in the specified domain through rigorous evaluation.",
    skills: metadata.skills || ["Technology", "Problem Solving"],
    priority: metadata.priority || 99,
    featured: metadata.featured || false
  };
});

// Sort certifications: Featured/Priority first
export const certificationsData = parsedCertifications.sort((a, b) => {
  if (a.priority && b.priority) return a.priority - b.priority;
  if (a.priority) return -1;
  if (b.priority) return 1;
  return new Date(b.issueDate) - new Date(a.issueDate);
});

export default certificationsData;
