import React from 'react';
import { useTranslation } from './LanguageContext';
import { MohamedKhaledLink } from '../types';
import { ExternalLink, Compass, Laptop, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface PortfolioProps {
  links: MohamedKhaledLink[];
}

export const Portfolio: React.FC<PortfolioProps> = ({ links }) => {
  const { t, lang, dir } = useTranslation();

  const renderLinkIcon = (platform: string) => {
    switch (platform) {
      case 'portfolio':
        return <Laptop className="w-6 h-6 text-emerald-400" />;
      case 'behance':
        return (
          <svg className="w-6 h-6 text-blue-500 fill-current" viewBox="0 0 24 24">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" className="text-blue-500 fill-current" />
          </svg>
        );
      case 'facebook':
        return (
          <svg className="w-6 h-6 text-indigo-500 fill-current" viewBox="0 0 24 24">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-6 h-6 text-cyan-400 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-6 h-6 text-pink-500 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.555A3.002 3.002 0 0 0 .503 6.163C0 8.038 0 12 0 12s0 3.962.503 5.837a3.002 3.002 0 0 0 2.11 2.108c1.868.555 9.388.555 9.388.555s7.52 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.962 24 12 24 12s0-3.963-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      default:
        return <Compass className="w-6 h-6 text-zinc-450" />;
    }
  };

  return (
    <div 
      id="portfolio-links-page"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white min-h-[70vh]"
      style={{ direction: dir }}
    >
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {t('section.portfolio.title')}
        </h2>
        <p className="text-sm sm:text-base text-zinc-400">
          {t('section.portfolio.sub')}
        </p>
      </div>

      {/* Grid items of links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {links.map((link) => {
          const name = lang === 'ar' ? link.nameAr : link.nameEn;
          const description = lang === 'ar' ? link.descriptionAr : link.descriptionEn;

          return (
            <motion.a
              id={`portfolio-link-${link.id}`}
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative group bg-zinc-950/70 border border-zinc-900 rounded-3xl p-6 flex flex-col justify-between overflow-hidden shadow-xl"
              style={{
                boxShadow: `0 4px 30px rgba(0, 0, 0, 0.4)`
              }}
            >
              {/* Dynamic glowing circular ambient hover background */}
              <div 
                className="absolute -top-10 -right-10 w-32 h-32 blur-[60px] opacity-10 group-hover:opacity-30 rounded-full transition duration-300"
                style={{ backgroundColor: link.shadowColor }}
              />

              {/* Top metadata */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900/90 border border-zinc-850 flex items-center justify-center shadow-inner group-hover:border-zinc-750 transition duration-300">
                    {renderLinkIcon(link.platform)}
                  </div>
                  
                  {/* Subtle platform pill */}
                  <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase flex items-center gap-1">
                    {link.platform === 'portfolio' ? (
                      <>
                        <Star size={10} className="text-emerald-400 fill-emerald-400" />
                        <span>MAIN PORTAL</span>
                      </>
                    ) : (
                      <span>OFFICIAL</span>
                    )}
                  </span>
                </div>

                {/* Information */}
                <div className="space-y-20-px space-y-2.5" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                  <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-emerald-400 transition-colors duration-200">
                    {name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                    {description}
                  </p>
                </div>
              </div>

              {/* Bottom pointer visual layer */}
              <div className="pt-6 border-t border-zinc-900/60 mt-6 flex items-center justify-between text-[11px] font-mono text-zinc-500 group-hover:text-white transition duration-205">
                <span className="text-[9px] uppercase tracking-widest">{link.url.replace('https://', '').replace('/', '')}</span>
                <span className="flex items-center gap-1 bg-zinc-900 group-hover:bg-emerald-500 group-hover:text-black p-1.5 px-3 rounded-xl border border-zinc-800 transition duration-300">
                  <span className="text-[10px] font-bold">OPEN</span>
                  <ExternalLink size={10} />
                </span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};
