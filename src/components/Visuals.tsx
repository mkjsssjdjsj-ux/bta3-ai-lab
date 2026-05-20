import React, { useState, useMemo } from 'react';
import { useTranslation } from './LanguageContext';
import { VisualItem } from '../types';
import { Search, Sliders, Eye, Calendar, X, ZoomIn, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VisualsProps {
  visuals: VisualItem[];
}

export const Visuals: React.FC<VisualsProps> = ({ visuals }) => {
  const { t, lang, dir } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<VisualItem | null>(null);

  const categories = useMemo(() => {
    const list = new Set<string>();
    visuals.forEach((item) => {
      const cat = lang === 'ar' ? item.categoryAr : item.categoryEn;
      if (cat) list.add(cat);
    });
    return ['all', ...Array.from(list)];
  }, [visuals, lang]);

  const filteredVisuals = useMemo(() => {
    return visuals.filter((item) => {
      const title = lang === 'ar' ? item.titleAr : item.titleEn;
      const desc = lang === 'ar' ? item.descriptionAr : item.descriptionEn;
      const cat = lang === 'ar' ? item.categoryAr : item.categoryEn;

      const matchesSearch = 
        title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        desc.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || cat === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [visuals, searchTerm, selectedCategory, lang]);

  return (
    <div 
      id="visuals-page"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white min-h-[70vh]"
      style={{ direction: dir }}
    >
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {t('section.visuals.title')}
        </h2>
        <p className="text-sm sm:text-base text-zinc-400">
          {t('section.visuals.sub')}
        </p>
      </div>

      {/* Action panel */}
      <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500">
            <Search size={16} />
          </div>
          <input
            id="visual-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('ui.search_placeholder')}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-400 rounded-xl text-sm focus:outline-none transition font-sans"
            style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}
          />
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 md:pb-0">
          {categories.map((category) => (
            <button
              id={`visual-cat-tab-${category.replace(/\s+/g, '-').toLowerCase()}`}
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
      </div>

      {/* Masonry or Responsive bento columns list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVisuals.length > 0 ? (
          filteredVisuals.map((item) => {
            const currentTitle = lang === 'ar' ? item.titleAr : item.titleEn;
            const currentDesc = lang === 'ar' ? item.descriptionAr : item.descriptionEn;
            const currentCat = lang === 'ar' ? item.categoryAr : item.categoryEn;

            return (
              <motion.div
                id={`visual-card-${item.id}`}
                key={item.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightboxItem(item)}
                className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-cyan-400/50 transition shadow-lg flex flex-col shrink-0 backdrop-blur-md"
              >
                {/* Graphics slot with hover visual tag overlays */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                  <img
                    src={item.imageUrl}
                    alt={currentTitle}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Glass Card hovering state actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/12 flex items-center justify-center text-white shadow-lg transform translate-y-2 group-hover:translate-y-0 transition">
                      <Eye size={18} />
                    </div>
                  </div>

                  {/* Badget tags */}
                  <div className="absolute top-3 left-3 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono border border-white/5 font-bold uppercase tracking-wider text-cyan-400">
                    {currentCat}
                  </div>
                </div>

                {/* Info and title description */}
                <div className="p-5 flex-1 flex flex-col justify-between" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {currentTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                      {currentDesc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 mt-3 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} className="text-cyan-400" />
                      <span>{item.createdAt}</span>
                    </span>
                    <span className="text-zinc-600">BTA3 DESIGN</span>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-16 bg-white/5 rounded-2xl border border-white/10 p-6">
            <p className="text-zinc-500 text-sm font-sans">{t('ui.placeholder_no_data')}</p>
          </div>
        )}
      </div>

      {/* LIGHTBOX POPUP MODAL */}
      <AnimatePresence>
        {lightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-[#050505] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Escape Button */}
              <button
                id="lightbox-close-btn"
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5 rounded-full transition"
              >
                <X size={15} />
              </button>

              {/* Picture view (left/bottom on mobile, left on desktop) */}
              <div className="flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-full">
                <img
                  src={lightboxItem.imageUrl}
                  alt={lang === 'ar' ? lightboxItem.titleAr : lightboxItem.titleEn}
                  className="w-full h-full object-contain max-h-[50vh] md:max-h-[75vh]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Meta information sidebar desk */}
              <div className="w-full md:w-80 p-6 sm:p-8 bg-[#050505] border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-between" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/15 border border-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded animate-pulse">
                      {lang === 'ar' ? lightboxItem.categoryAr : lightboxItem.categoryEn}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1 whitespace-nowrap">
                      <Calendar size={11} className="text-cyan-400" />
                      <span>{lightboxItem.createdAt}</span>
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                    {lang === 'ar' ? lightboxItem.titleAr : lightboxItem.titleEn}
                  </h3>

                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans">
                    {lang === 'ar' ? lightboxItem.descriptionAr : lightboxItem.descriptionEn}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 mt-6 flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase">
                  <Info size={12} className="text-cyan-400 animate-bounce" />
                  <span>HIGH RESOLUTION 4K RENDER</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
