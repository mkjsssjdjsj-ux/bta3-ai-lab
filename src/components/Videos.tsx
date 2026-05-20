import React, { useState, useMemo } from 'react';
import { useTranslation } from './LanguageContext';
import { VideoItem } from '../types';
import { Play, Calendar, Tag, Layers, X, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VideosProps {
  videos: VideoItem[];
}

export const Videos: React.FC<VideosProps> = ({ videos }) => {
  const { t, lang, dir } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePlayId, setActivePlayId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const list = new Set<string>();
    videos.forEach((item) => {
      const cat = lang === 'ar' ? item.categoryAr : item.categoryEn;
      if (cat) list.add(cat);
    });
    return ['all', ...Array.from(list)];
  }, [videos, lang]);

  const filteredVideos = useMemo(() => {
    return videos.filter((item) => {
      const cat = lang === 'ar' ? item.categoryAr : item.categoryEn;
      return selectedCategory === 'all' || cat === selectedCategory;
    });
  }, [videos, selectedCategory, lang]);

  const activeVideo = useMemo(() => {
    return videos.find((item) => item.id === activePlayId);
  }, [videos, activePlayId]);

  return (
    <div 
      id="videos-page"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white min-h-[70vh]"
      style={{ direction: dir }}
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {t('section.videos.title')}
        </h2>
        <p className="text-sm sm:text-base text-zinc-400">
          {t('section.videos.sub')}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-10 flex flex-wrap justify-center md:justify-start gap-2 overflow-x-auto pb-1">
        {categories.map((category) => (
          <button
            id={`video-cat-tab-${category.replace(/\s+/g, '-').toLowerCase()}`}
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-white/10 border-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.08)]'
                : 'bg-transparent border-white/5 text-zinc-400 hover:text-white hover:border-white/10'
            }`}
          >
            {category === 'all' ? t('ui.all_categories') : category}
          </button>
        ))}
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((item) => {
            const currentTitle = lang === 'ar' ? item.titleAr : item.titleEn;
            const currentDesc = lang === 'ar' ? item.descriptionAr : item.descriptionEn;
            const currentCat = lang === 'ar' ? item.categoryAr : item.categoryEn;

            // Generate Unsplash thumbnails dynamically using video properties for rich aesthetic
            const thumbUrl = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80`;

            return (
              <motion.div
                id={`video-card-${item.id}`}
                key={item.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActivePlayId(item.id)}
                className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden cursor-pointer shadow-xl flex flex-col shrink-0 backdrop-blur-md hover:border-cyan-400/50 transition duration-300"
              >
                {/* Simulated YouTube Video Thumbnail Canvas inside Frame */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                  <img
                    src={thumbUrl}
                    alt={currentTitle}
                    className="w-full h-full object-cover group-hover:scale-105 duration-700 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                  {/* Cyan Glowing Play Trigger button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-cyan-500 border border-cyan-400 flex items-center justify-center text-black scale-100 group-hover:scale-110 transition duration-300 shadow-[0_0_20px_rgba(34,211,238,0.6)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.9)] animate-pulse">
                    <Play size={20} className="ml-1 fill-black text-black" />
                  </div>

                  {/* Tags & Durations metadata block */}
                  <div className="absolute bottom-3 left-3 flex gap-1.5 items-center">
                    <span className="px-2 py-0.5 bg-black/85 backdrop-blur-sm rounded border border-white/5 text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                      {currentCat}
                    </span>
                  </div>

                  {item.duration && (
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/85 backdrop-blur-sm rounded border border-white/5 text-[9px] font-mono text-zinc-300 flex items-center gap-1">
                      <Clock size={10} className="text-cyan-400" />
                      <span>{item.duration}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Card Identity content details */}
                <div className="p-6 flex-1 flex flex-col justify-between" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-black text-white group-hover:text-cyan-400 transition-colors">
                      {currentTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                      {currentDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Layers size={11} className="text-cyan-400" />
                      <span>YOUTUBE WORKFLOWS</span>
                    </span>
                    <span className="text-cyan-400 font-bold uppercase tracking-widest">WATCH COMPANION</span>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-1 md:col-span-2 text-center py-16 bg-white/5 rounded-2xl border border-white/10 p-6">
            <p className="text-zinc-500 text-sm font-sans">{t('ui.placeholder_no_data')}</p>
          </div>
        )}
      </div>

      {/* FULL SCREEN LIGHTBOX YOUTUBE EMBED PLAYER MODAL */}
      <AnimatePresence>
        {activePlayId && activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-[#050505] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Escape */}
              <button
                id="video-player-close-btn"
                onClick={() => setActivePlayId(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5 rounded-full transition"
              >
                <X size={15} />
              </button>

              {/* HD Embedded Video Iframe sandbox */}
              <div className="w-full aspect-video bg-black relative">
                <iframe
                  title={activeVideo.titleEn}
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Video Specs Footer banner */}
              <div className="p-6 bg-[#050505] border-t border-white/10 text-right md:text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                    {lang === 'ar' ? activeVideo.titleAr : activeVideo.titleEn}
                  </h3>
                  <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
                    {lang === 'ar' ? activeVideo.descriptionAr : activeVideo.descriptionEn}
                  </p>
                </div>
                <div className="shrink-0">
                  <a
                    id="youtube-direct-link"
                    href={`https://youtube.com/watch?v=${activeVideo.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex py-3 px-5 bg-red-650 hover:opacity-90 text-white text-xs font-bold rounded-xl shadow-[0_4px_15px_rgba(239,68,68,0.25)] transition"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
