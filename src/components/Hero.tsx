import React from 'react';
import { useTranslation } from './LanguageContext';
import { ActiveSection } from '../types';
import { Sparkles, Terminal, Compass, Link2 } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onNavigate: (section: ActiveSection) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { t, lang, dir } = useTranslation();

  return (
    <div 
      id="hero-section"
      className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center py-12 overflow-hidden select-none"
      style={{ direction: dir }}
    >
      {/* Immersive Cyberpunk Grid & Background Glows */}
      <div className="absolute inset-0 -z-10 bg-[#050505] overflow-hidden">
        {/* Animated Radial Pulse glow */}
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[130px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 blur-[130px] rounded-full animate-pulse" />
        
        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Text and Identity */}
        <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left space-y-6" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
          
          {/* Futuristic Mini Label Tag */}
          <div className="flex items-center justify-center lg:justify-start">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-[11px] font-semibold tracking-wider text-cyan-400 uppercase">
              <Sparkles size={11} className="animate-spin duration-3000 text-cyan-400" />
              <span>{t('hero.sub')}</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-sans font-black tracking-tight text-white leading-none">
            {lang === 'ar' ? (
              <>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                  {t('hero.title')}
                </span>
              </>
            ) : (
              <>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                  {t('hero.title')}
                </span>
              </>
            )}
          </h1>

          <h2 className="text-xl sm:text-2xl font-mono font-medium text-zinc-300 tracking-wide">
            {t('hero.greeting')}
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl font-sans">
            {t('hero.desc')}
          </p>

          {/* Call to action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              id="hero-cta-portfolio"
              onClick={() => onNavigate('portfolio')}
              className="px-6 py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-90 text-white font-extrabold text-sm rounded-xl transition duration-300 transform hover:scale-[1.02] shadow-[0_4px_25px_rgba(34,211,238,0.3)] hover:shadow-[0_4px_30px_rgba(34,211,238,0.5)] cursor-pointer flex items-center gap-2"
            >
              <Compass size={16} />
              <span>{t('hero.cta_portfolio')}</span>
            </button>
            <button
              id="hero-cta-connect"
              onClick={() => onNavigate('connect')}
              className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-bold text-sm rounded-xl transition duration-300 cursor-pointer flex items-center gap-2"
            >
              <Terminal size={16} className="text-cyan-400" />
              <span>{t('hero.cta_connect')}</span>
            </button>
          </div>

          {/* Sleek Statistics Cards */}
          <div className="grid grid-cols-3 gap-3 pt-6 max-w-lg mx-auto lg:mx-0">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center shadow-lg backdrop-blur-md">
              <span className="block text-xl sm:text-2xl font-mono font-black text-white">6+</span>
              <span className="block text-[10px] text-zinc-500 font-sans tracking-wide mt-1">{t('hero.stats.studios')}</span>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center shadow-lg backdrop-blur-md">
              <span className="block text-xl sm:text-2xl font-mono font-black text-cyan-400">150+</span>
              <span className="block text-[10px] text-zinc-500 font-sans tracking-wide mt-1">{t('hero.stats.prompts')}</span>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center shadow-lg backdrop-blur-md">
              <span className="block text-xl sm:text-2xl font-mono font-black text-purple-400">1200+</span>
              <span className="block text-[10px] text-zinc-500 font-sans tracking-wide mt-1">{t('hero.stats.projects')}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Futuristic Floating 3D Object & Particles */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[350px]">
          {/* Floating object wrapper */}
          <div className="relative w-72 h-72 flex items-center justify-center animate-bounce duration-5000">
            
            {/* Background glowing rings */}
            <div className="absolute inset-0 border border-transparent border-t-cyan-500/30 border-b-purple-500/30 rounded-full animate-spin duration-10000" />
            <div className="absolute inset-4 border border-transparent border-l-cyan-400/20 border-r-purple-400/20 rounded-full animate-spin duration-15000" style={{ animationDirection: 'reverse' }} />
            <div className="absolute inset-8 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/5 rounded-full blur-xl" />

            {/* Core 3D Glassmorphic Cube/Prism with CSS layout */}
            <div className="absolute w-36 h-36 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(34,211,238,0.15)] flex flex-col items-center justify-center group overflow-hidden">
              {/* Inner animated core mesh */}
              <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-500 animate-pulse flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                <Compass size={28} className="text-white animate-spin duration-8000" />
              </div>

              {/* Decorative laser wire lines */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
              <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" />
            </div>

            {/* Orbiting particles */}
            <div className="absolute top-[20%] left-0 w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
            <div className="absolute bottom-[20%] right-0 w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping duration-1500" />
            <div className="absolute top-1/2 left-[90%] w-2 h-2 rounded-full bg-amber-400 animate-pulse duration-500" />
          </div>

          {/* Small technology grid overlay decoration */}
          <div className="absolute bottom-2 text-[10px] font-mono text-zinc-500 border border-white/5 bg-white/5 px-3 py-1 rounded-full text-[9px] font-bold">
            COORDS_BTA3_SYS_OK
          </div>
        </div>
      </div>

      {/* SECTION 8: ABOUT MOHAMED KHALED */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-24">
        <motion.div 
          id="about-card"
          whileHover={{ y: -3 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 overflow-hidden shadow-2xl backdrop-blur-md"
        >
          {/* Subtle decoration lines */}
          <div className="absolute top-0 right-0 w-36 h-[1px] bg-gradient-to-l from-cyan-500 to-transparent" />
          <div className="absolute bottom-0 left-0 w-36 h-[1px] bg-gradient-to-r from-purple-500 to-transparent" />

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-cyan-400 to-purple-500 p-[1px] shadow-[0_0_30px_rgba(34,211,238,0.25)]">
                <div className="w-full h-full bg-black rounded-[15px] flex items-center justify-center">
                  {/* Decorative AI visual element */}
                  <Compass size={36} className="text-cyan-400 animate-pulse" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[9px] font-mono px-1.5 py-0.5 rounded uppercase">
                CREATOR
              </div>
            </div>

            <div className="space-y-4 flex-1" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-2.5">
                  <Terminal size={18} className="text-cyan-400" />
                  <span>{t('section.about.title')}</span>
                </h3>
                <span className="text-xs text-zinc-500 font-mono">EST_EGYPT_2026</span>
              </div>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                {t('about.bio')}
              </p>
              
              <div className="pt-4 border-t border-white/10 flex flex-wrap justify-center md:justify-start items-center gap-3 text-xs text-zinc-500 font-mono">
                <span className="flex items-center gap-1.5"><Link2 size={13} className="text-cyan-400" /> GRAPHIC DESIGN</span>
                <span className="text-zinc-800">|</span>
                <span className="flex items-center gap-1.5"><Link2 size={13} className="text-purple-400" /> PROMPT ENGINEERING</span>
                <span className="text-zinc-800">|</span>
                <span className="flex items-center gap-1.5"><Link2 size={13} className="text-cyan-500" /> VIDEO AUTOMATION</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
};
