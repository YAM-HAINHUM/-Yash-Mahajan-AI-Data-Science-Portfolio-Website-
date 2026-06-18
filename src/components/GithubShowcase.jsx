import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Folder, Users, Star, Calendar, Code, BarChart2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import githubGraphImg from '../assets/githun.png';

export default function GithubShowcase() {
  const username = 'YAM-HAINHUM';
  const profileUrl = `https://github.com/YAM-HAINHUM`;
  const [profileData, setProfileData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        setLoading(true);
        const cachedTime = localStorage.getItem('github_data_fetched_time');
        const now = Date.now();

        // 1 hour cache validation (3600000 ms)
        if (cachedTime && (now - parseInt(cachedTime, 10) < 3600000)) {
          const cachedProfile = localStorage.getItem('github_profile_data');
          const cachedRepos = localStorage.getItem('github_repos_data');
          const cachedContr = localStorage.getItem('github_contributions_data');
          const cachedEvents = localStorage.getItem('github_events_data');

          if (cachedProfile && cachedRepos && cachedContr && cachedEvents) {
            setProfileData(JSON.parse(cachedProfile));
            setRepos(JSON.parse(cachedRepos));
            setContributions(JSON.parse(cachedContr));
            setEvents(JSON.parse(cachedEvents));
            setLoading(false);
            setError(false);
            return;
          }
        }

        // Fetch profile
        const profilePromise = fetch(`https://api.github.com/users/${username}`).then(res => {
          if (!res.ok) throw new Error('Profile fetch failed');
          return res.json();
        });

        // Fetch user repos
        const reposPromise = fetch(`https://api.github.com/users/${username}/repos?per_page=100`).then(res => {
          if (!res.ok) throw new Error('Repos fetch failed');
          return res.json();
        });

        // Fetch prioritized influencer platform repo under owner Urmila1945
        const influencerRepoPromise = fetch(`https://api.github.com/repos/Urmila1945/AI-powered-influencer-intelligence-platform`).then(res => {
          if (!res.ok) return null;
          return res.json();
        });

        // Fetch user public events
        const eventsPromise = fetch(`https://api.github.com/users/${username}/events/public`).then(res => {
          if (!res.ok) return [];
          return res.json();
        });

        // Fetch contributions calendar JSON
        const contrPromise = fetch(`https://github-contributions-api.jogruber.de/v4/${username}`).then(res => {
          if (!res.ok) return null;
          return res.json();
        });

        const [profileJson, reposJson, influencerRepoJson, eventsJson, contrJson] = await Promise.all([
          profilePromise.catch(() => null),
          reposPromise.catch(() => []),
          influencerRepoPromise.catch(() => null),
          eventsPromise.catch(() => []),
          contrPromise.catch(() => null)
        ]);

        if (!profileJson) {
          throw new Error('Failed to fetch profile data');
        }

        // Merge influencer platform repo if resolved successfully and not already present
        let mergedRepos = Array.isArray(reposJson) ? reposJson : [];
        if (influencerRepoJson && influencerRepoJson.id && !mergedRepos.some(r => r.id === influencerRepoJson.id)) {
          mergedRepos.push(influencerRepoJson);
        }

        const contrArray = contrJson && contrJson.contributions ? contrJson.contributions : [];

        setProfileData(profileJson);
        setRepos(mergedRepos);
        setContributions(contrArray);
        setEvents(Array.isArray(eventsJson) ? eventsJson : []);
        setError(false);

        // Store in cache
        localStorage.setItem('github_profile_data', JSON.stringify(profileJson));
        localStorage.setItem('github_repos_data', JSON.stringify(mergedRepos));
        localStorage.setItem('github_contributions_data', JSON.stringify(contrArray));
        localStorage.setItem('github_events_data', JSON.stringify(Array.isArray(eventsJson) ? eventsJson : []));
        localStorage.setItem('github_data_fetched_time', now.toString());

      } catch (err) {
        console.error('GitHub API error:', err);
        setError(true);
        // Fallback mock data
        setProfileData({
          public_repos: 12,
          followers: 45,
          following: 38,
          created_at: '2023-08-15T00:00:00Z',
          bio: 'AI & Data Science Student | Python Developer',
          avatar_url: null
        });
        setRepos([
          { name: 'AI_Powered_Knowledge_Engine_for_Smart_Support_and_Ticket_Resolution', stargazers_count: 5, language: 'Python' },
          { name: 'AI-powered-influencer-intelligence-platform', stargazers_count: 4, language: 'JavaScript' },
          { name: 'QuickServe-AI-Powered-Local-Service-Discovery-Booking-Platform', stargazers_count: 3, language: 'JavaScript' },
          { name: 'Mood_based_music_recommendation_system', stargazers_count: 4, language: 'Python' }
        ]);
        setContributions([]);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  // Calculate stats
  const totalRepos = profileData?.public_repos || repos.length;
  const totalStars = repos.reduce((acc, curr) => acc + (curr.stargazers_count || 0), 0);

  // Calculate language stats
  const languages = repos.reduce((acc, curr) => {
    if (curr.language) {
      acc[curr.language] = (acc[curr.language] || 0) + 1;
    }
    return acc;
  }, {});

  const totalLangCount = Object.values(languages).reduce((a, b) => a + b, 0) || 1;
  const languageList = Object.entries(languages)
    .map(([name, count]) => ({
      name,
      percentage: Math.round((count / totalLangCount) * 100)
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 4);

  // Fallback language list if empty
  const finalLanguageList = languageList.length > 0 
    ? languageList 
    : [
        { name: 'Python', percentage: 65 },
        { name: 'JavaScript', percentage: 20 },
        { name: 'Java', percentage: 10 },
        { name: 'SQL', percentage: 5 }
      ];

  const getLanguageColor = (name) => {
    const colors = {
      'Python': '#3b82f6',
      'JavaScript': '#eab308',
      'TypeScript': '#3178c6',
      'HTML': '#e34c26',
      'CSS': '#563d7c',
      'Java': '#b07219',
      'SQL': '#00758f'
    };
    return colors[name] || '#a855f7';
  };

  // Generate Contribution Heatmap cells
  const contributionGrid = useMemo(() => {
    if (contributions && contributions.length > 0) {
      // Filter contributions for the current calendar year dynamically
      const currentYear = new Date().getFullYear().toString();
      const filtered = contributions.filter(day => day.date.startsWith(currentYear));
      
      // Fallback to first 365 days (the current year group in the API response)
      const targetList = filtered.length > 0 ? filtered : contributions.slice(0, 365);
      
      return targetList.map((day, idx) => ({
        id: idx,
        val: day.level,
        date: day.date,
        count: day.count
      }));
    }

    const cells = [];
    const seed = 3719; // Stable visual representation
    for (let i = 0; i < 52 * 7; i++) {
      const rand = (Math.sin(i * seed) + 1) / 2; // 0 to 1
      let intensity = 0;
      if (rand > 0.85) intensity = 4;
      else if (rand > 0.65) intensity = 3;
      else if (rand > 0.45) intensity = 2;
      else if (rand > 0.25) intensity = 1;
      
      cells.push({ id: i, val: intensity });
    }
    return cells;
  }, [contributions]);

  // Helper for heatmap colors
  const getHeatmapColorClass = (val) => {
    switch (val) {
      case 0: return 'bg-slate-100 dark:bg-slate-900 border-transparent';
      case 1: return 'bg-emerald-500/20 dark:bg-emerald-950/40 border-transparent';
      case 2: return 'bg-emerald-500/40 dark:bg-emerald-800/50 border-transparent';
      case 3: return 'bg-emerald-500/70 dark:bg-emerald-600/70 border-transparent';
      case 4: return 'bg-emerald-500 dark:bg-emerald-500 border-transparent';
      default: return 'bg-slate-100 dark:bg-slate-900';
    }
  };

  // Extract recent public activity metrics
  const activityStats = useMemo(() => {
    let commits = 0;
    let pushes = 0;
    let prs = 0;
    
    if (events && events.length > 0) {
      events.forEach(e => {
        if (e.type === 'PushEvent') {
          pushes++;
          if (e.payload) {
            commits += (e.payload.size || e.payload.distinct_size || 0);
          }
        } else if (e.type === 'PullRequestEvent') {
          prs++;
        }
      });
    }
    
    return { commits, pushes, prs, totalEvents: events?.length || 0 };
  }, [events]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Aug 15, 2023';
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatYearMonth = (dateStr) => {
    if (!dateStr) return 'August 2023';
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <section id="github" className="py-24 bg-theme-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-brand-purple dark:text-brand-cyan font-bold font-mono mb-2">
            06 / Version Control
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-theme-text">
            GitHub Showcase
          </h3>
          <div className="mt-2 w-16 h-1 bg-gradient-to-r from-brand-cyan to-brand-purple mx-auto rounded-full" />
        </div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Column 1: Live Profile summary */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
            <div className="glass-card p-6 rounded-2xl border border-theme-border flex flex-col justify-between h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-cyan/5 rounded-full filter blur-xl" />
              
              <div>
                {/* Profile Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-purple p-0.5 shadow-md flex items-center justify-center overflow-hidden">
                    {profileData?.avatar_url ? (
                      <img 
                        src={profileData.avatar_url} 
                        alt={username} 
                        className="w-full h-full object-cover rounded-full"
                        onContextMenu={(e) => e.preventDefault()}
                        draggable="false"
                      />
                    ) : (
                      <FaGithub size={28} className="text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-theme-text flex items-center space-x-2">
                      <span>{profileData?.name || username}</span>
                    </h4>
                    <a 
                      href={profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-brand-cyan hover:underline font-mono"
                    >
                      github.com/{username}
                    </a>
                  </div>
                </div>

                {/* Profile Bio */}
                <p className="text-sm text-theme-muted leading-relaxed mb-6">
                  {profileData?.bio || 'Artificial Intelligence & Data Science engineering undergraduate student. Actively contributing, programming, and learning.'}
                </p>

                {/* Profile Stats Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-theme-bg dark:bg-theme-card border border-theme-border text-center">
                    <Folder size={16} className="text-brand-cyan mx-auto mb-2" />
                    <span className="block text-xl font-black text-theme-text font-mono">
                      50+
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-theme-muted font-bold font-mono">
                      Repos
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-theme-bg dark:bg-theme-card border border-theme-border text-center">
                    <Users size={16} className="text-brand-purple mx-auto mb-2" />
                    <span className="block text-xl font-black text-theme-text font-mono">
                      3+
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-theme-muted font-bold font-mono">
                      Collaborators
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-theme-bg dark:bg-theme-card border border-theme-border text-center">
                    <Star size={16} className="text-amber-500 mx-auto mb-2" />
                    <span className="block text-xl font-black text-theme-text font-mono">
                      {loading ? '..' : totalStars}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-theme-muted font-bold font-mono">
                      Stars
                    </span>
                  </div>
                </div>
              </div>

              {/* Language breakdown */}
              <div className="mt-6 pt-6 border-t border-theme-border">
                <h5 className="text-xs uppercase tracking-widest font-mono font-bold text-theme-muted mb-4 flex items-center space-x-1.5">
                  <Code size={12} className="text-brand-purple" />
                  <span>Primary Languages</span>
                </h5>
                <div className="space-y-3">
                  {finalLanguageList.map((lang, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-theme-text">{lang.name}</span>
                        <span className="text-theme-muted font-mono">{lang.percentage}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-theme-bg dark:bg-theme-sec rounded-full overflow-hidden">
                        <div 
                          className="h-full" 
                          style={{ 
                            width: `${lang.percentage}%`,
                            backgroundColor: getLanguageColor(lang.name)
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Heatmap & Activity */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Heatmap calendar */}
            <div className="glass-card p-6 rounded-2xl border border-theme-border text-left flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-base font-bold text-theme-text">
                      Contribution Heatmap
                    </h4>
                    <p className="text-xs text-theme-muted">
                      Commit contributions mapped across GitHub projects
                    </p>
                  </div>
                  <FaGithub size={16} className="text-theme-muted" />
                </div>

                {/* Heatmap Image */}
                <div className="py-2 flex justify-center">
                  <img 
                    src={githubGraphImg} 
                    alt="GitHub Contribution Heatmap" 
                    className="w-full rounded-xl border border-theme-border shadow-inner dark:opacity-90 dark:brightness-95"
                    onContextMenu={(e) => e.preventDefault()}
                    draggable="false"
                  />
                </div>
              </div>

              {/* GitHub Readme Stats Embed (Stunning visual addition) */}
              <div className="mt-6 pt-6 border-t border-theme-border grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-theme-bg dark:bg-theme-card border border-theme-border flex items-start space-x-3">
                  <BarChart2 className="text-brand-cyan" size={18} />
                  <div>
                    <h5 className="text-xs font-bold text-theme-text">
                      Profile Activity Graph
                    </h5>
                    <p className="text-[10px] text-theme-muted mt-0.5">
                      {loading ? 'Fetching activity...' : 
                       activityStats.totalEvents > 0 ? 
                       `Recent activity: ${activityStats.commits} commits, ${activityStats.pushes} pushes, ${activityStats.prs} pull requests across public repositories.` : 
                       'Visualizing daily commits, forks, and branch updates dynamically.'}
                    </p>
                    <a 
                      href={profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] uppercase font-bold text-brand-purple hover:underline mt-2 inline-block font-mono"
                    >
                      View GitHub Activity
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-theme-bg dark:bg-theme-card border border-theme-border flex items-start space-x-3">
                  <Calendar className="text-brand-purple" size={18} />
                  <div>
                    <h5 className="text-xs font-bold text-theme-text">
                      User Member Since
                    </h5>
                    <p className="text-[10px] text-theme-muted mt-0.5">
                      Actively building on public and private projects since {formatYearMonth(profileData?.created_at)}.
                    </p>
                    <span className="text-[9px] font-mono text-theme-muted mt-2 block font-bold">
                      Joined: {formatDate(profileData?.created_at)}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
