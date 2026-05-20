import React, { useState, useEffect } from 'react';
import { LanguageProvider, useTranslation } from './components/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AIUpdates } from './components/AIUpdates';
import { Prompts } from './components/Prompts';
import { Visuals } from './components/Visuals';
import { Videos } from './components/Videos';
import { Posts } from './components/Posts';
import { Portfolio } from './components/Portfolio';
import { Connect } from './components/Connect';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';

import { 
  defaultAIUpdates, 
  defaultPrompts, 
  defaultVisuals, 
  defaultVideos, 
  defaultSocialPosts,
  mohamedKhaledLinks,
  defaultContactDetails
} from './data/defaultData';

import { ActiveSection, AIUpdate, PromptItem, VisualItem, VideoItem, SocialPost, MohamedKhaledLink, ContactDetails } from './types';
import { motion, AnimatePresence } from 'motion/react';

const getRelativePath = (path: string): string => {
  if (path.startsWith('/bta3-ai-lab')) {
    const rel = path.substring('/bta3-ai-lab'.length);
    return rel === '' ? '/' : rel;
  }
  return path;
};

const getFullPath = (relPath: string): string => {
  if (window.location.pathname.startsWith('/bta3-ai-lab')) {
    return '/bta3-ai-lab' + (relPath === '/' ? '/' : relPath);
  }
  return relPath;
};

const pathToSection = (path: string): ActiveSection => {
  const rel = getRelativePath(path);
  if (rel === '/posts') return 'posts';
  if (rel === '/prompts') return 'prompts';
  if (rel === '/ai-updates') return 'updates';
  if (rel === '/connect') return 'connect';
  if (rel === '/visuals') return 'visuals';
  if (rel === '/videos') return 'videos';
  if (rel === '/portfolio') return 'portfolio';
  return 'home';
};

const sectionToPath = (section: ActiveSection): string => {
  if (section === 'home') return '/';
  if (section === 'updates') return '/ai-updates';
  return `/${section}`;
};

function Dashboard() {
  const { lang, dir } = useTranslation();
  const [currentPath, setCurrentPath] = useState(() => getRelativePath(window.location.pathname));
  const [activeSection, setActiveSection] = useState<ActiveSection>(() => pathToSection(window.location.pathname));

  // Monitor URL changes (history popstate / pushed state)
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      setCurrentPath(getRelativePath(path));
      setActiveSection(pathToSection(path));
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Sync URL bar when state is modified programmatically (Navbar, Hero buttons, etc.)
  useEffect(() => {
    const expectedRelPath = sectionToPath(activeSection);
    const expectedFullPath = getFullPath(expectedRelPath);
    if (window.location.pathname !== expectedFullPath && currentPath !== '/admin') {
      window.history.pushState(null, '', expectedFullPath);
      setCurrentPath(expectedRelPath);
    }
  }, [activeSection, currentPath]);

  const navigateTo = (relPath: string) => {
    const fullPath = getFullPath(relPath);
    window.history.pushState(null, '', fullPath);
    setCurrentPath(relPath);
    setActiveSection(pathToSection(relPath));
  };

  // Core content states, loaded from localStorage or falling back to default pre-populated records
  const [updates, setUpdates] = useState<AIUpdate[]>(() => {
    const saved = localStorage.getItem('bta3_updates');
    return saved ? JSON.parse(saved) : defaultAIUpdates;
  });

  const [prompts, setPrompts] = useState<PromptItem[]>(() => {
    const saved = localStorage.getItem('bta3_prompts');
    return saved ? JSON.parse(saved) : defaultPrompts;
  });

  const [visuals, setVisuals] = useState<VisualItem[]>(() => {
    const saved = localStorage.getItem('bta3_visuals');
    return saved ? JSON.parse(saved) : defaultVisuals;
  });

  const [videos, setVideos] = useState<VideoItem[]>(() => {
    const saved = localStorage.getItem('bta3_videos');
    return saved ? JSON.parse(saved) : defaultVideos;
  });

  const [posts, setPosts] = useState<SocialPost[]>(() => {
    const saved = localStorage.getItem('bta3_posts');
    return saved ? JSON.parse(saved) : defaultSocialPosts;
  });

  const [links, setLinks] = useState<MohamedKhaledLink[]>(() => {
    const saved = localStorage.getItem('bta3_portfolio_links');
    return saved ? JSON.parse(saved) : mohamedKhaledLinks;
  });

  const [contactDetails, setContactDetails] = useState<ContactDetails>(() => {
    const saved = localStorage.getItem('bta3_contact_details');
    return saved ? JSON.parse(saved) : defaultContactDetails;
  });

  // Automatically save state variations to localStorage on updates
  useEffect(() => {
    localStorage.setItem('bta3_updates', JSON.stringify(updates));
  }, [updates]);

  useEffect(() => {
    localStorage.setItem('bta3_prompts', JSON.stringify(prompts));
  }, [prompts]);

  useEffect(() => {
    localStorage.setItem('bta3_visuals', JSON.stringify(visuals));
  }, [visuals]);

  useEffect(() => {
    localStorage.setItem('bta3_videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('bta3_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('bta3_portfolio_links', JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    localStorage.setItem('bta3_contact_details', JSON.stringify(contactDetails));
  }, [contactDetails]);

  // Quick helper to scroll for better transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection, currentPath]);

  if (currentPath === '/admin') {
    return (
      <AdminPanel 
        onClose={() => navigateTo('/')}
        updates={updates}
        setUpdates={setUpdates}
        prompts={prompts}
        setPrompts={setPrompts}
        visuals={visuals}
        setVisuals={setVisuals}
        videos={videos}
        setVideos={setVideos}
        posts={posts}
        setPosts={setPosts}
        links={links}
        setLinks={setLinks}
        contactDetails={contactDetails}
        setContactDetails={setContactDetails}
      />
    );
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero onNavigate={setActiveSection} />;
      case 'updates':
        return <AIUpdates updates={updates} />;
      case 'prompts':
        return <Prompts prompts={prompts} />;
      case 'visuals':
        return <Visuals visuals={visuals} />;
      case 'videos':
        return <Videos videos={videos} />;
      case 'posts':
        return <Posts posts={posts} />;
      case 'portfolio':
        return <Portfolio links={links} />;
      case 'connect':
        return <Connect contactDetails={contactDetails} />;
      default:
        return <Hero onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-slate-100 font-sans relative flex flex-col justify-between">
      {/* Dynamic Background Animated Glow Dust */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/15 blur-[125px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/15 blur-[125px] rounded-full" />
      </div>

      <div>
        {/* Navigation bar Header container */}
        <Navbar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          onOpenAdmin={() => navigateTo('/admin')}
        />

        {/* Dynamic Route/View transition wrappers */}
        <div className="container-view">
          <AnimatePresence mode="wait">
            <motion.div
              id={`view-container-${activeSection}`}
              key={activeSection}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              {renderActiveSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Main Footer branding credits */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Dashboard />
    </LanguageProvider>
  );
}
