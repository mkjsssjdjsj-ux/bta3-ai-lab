import React, { useState } from 'react';
import { useTranslation } from './LanguageContext';
import { ActiveSection } from '../types';
import { Menu, X, Globe, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  onOpenAdmin
}) => {
  const { t, lang, toggleLanguage, dir } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems: { id: ActiveSection; labelKey: string }[] = [
    { id: 'home', labelKey: 'nav.home' },
    { id: 'updates', labelKey: 'nav.updates' },
    { id: 'prompts', labelKey: 'nav.prompts' },
    { id: 'visuals', labelKey: 'nav.visuals' },
    { id: 'videos', labelKey: 'nav.videos' },
    { id: 'posts', labelKey: 'nav.posts' },
    { id: 'portfolio', labelKey: 'nav.portfolio' },
    { id: 'connect', labelKey: 'nav.connect' },
  ];

  return (
    <>
      <nav 
        id="main-navbar"
        className="fixed top-0 inset-x-0 z-40 bg-black/40 backdrop-blur-xl border-b border-white/10 transition-all duration-300"
        style={{ direction: dir }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3 gap-2">
              <div 
                onClick={() => setActiveSection('home')}
                className="cursor-pointer group flex items-center gap-2.5"
              >
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 p-[1px] shadow-[0_0_20px_rgba(34,211,238,0.3)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition duration-300 flex items-center justify-center">
                  <div className="w-full h-full bg-black rounded-[9px] flex items-center justify-center font-black text-white text-sm font-mono tracking-wider">
                    B3
                  </div>
                </div>
                <div style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                  <span className="text-white font-black tracking-wider text-sm block group-hover:text-cyan-400 transition-colors duration-200 uppercase font-sans">
                    {t('hero.title')}
                  </span>
                  <span className="text-[10px] text-cyan-400 uppercase tracking-widest leading-none block font-semibold mt-0.5">
                    MOHAMED KHALED
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1.5 xl:space-x-3 gap-0.5 xl:gap-1">
              {menuItems.map((item) => (
                <button
                  id={`nav-link-${item.id}`}
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all duration-300 pointer-events-auto relative uppercase tracking-wider ${
                    activeSection === item.id
                      ? 'text-white'
                      : 'text-gray-400 hover:text-cyan-400'
                  }`}
                >
                  {/* Active background bottom bar indicator */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-x-1 bottom-0 h-[2.5px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.6)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {t(item.labelKey)}
                </button>
              ))}
            </div>

            {/* Tools Actions: Lang Switcher & Admin Button & Hamburger */}
            <div className="flex items-center space-x-2 sm:space-x-3 gap-1">
              {/* Language Switch */}
              <button
                id="language-switcher-btn"
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 hover:text-white rounded-full text-xs font-mono transition"
                title="Switch Language / تغيير اللغة"
              >
                <Globe size={13} className="text-cyan-400" />
                <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
              </button>

              {/* Admin Panel Access */}
              <button
                id="control-center-toggle-btn"
                onClick={onOpenAdmin}
                className="p-1.5 sm:px-4 sm:py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-cyan-400 hover:text-white rounded-full text-xs font-medium transition flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                title={t('ui.admin_panel')}
              >
                <Sliders size={13} />
                <span className="hidden sm:inline font-mono text-[10px] tracking-wider uppercase">{t('ui.admin_button')}</span>
              </button>

              {/* Hamburger Toggle */}
              <button
                id="mobile-menu-hamburger-btn"
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 bg-white/5 border border-white/10 text-zinc-400 hover:text-white rounded-lg transition"
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel dropdown list */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-dropdown-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-20 inset-x-0 bg-black/95 backdrop-blur-xl border-b border-white/10 py-4 px-6 space-y-1.5 shadow-2xl z-50 flex flex-col"
            >
              {menuItems.map((item) => (
                <button
                  id={`mobile-nav-link-${item.id}`}
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-right font-medium p-3 rounded-xl block text-sm transition ${
                    activeSection === item.id
                      ? 'bg-white/10 border border-white/10 text-cyan-400 font-bold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                  style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}
                >
                  {t(item.labelKey)}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Visual spacer beneath the fixed navbar */}
      <div className="h-20" />
    </>
  );
};
