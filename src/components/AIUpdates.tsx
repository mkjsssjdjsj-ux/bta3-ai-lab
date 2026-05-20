import React, { useState, useMemo } from 'react';
import { useTranslation } from './LanguageContext';
import { AIUpdate } from '../types';
import { Search, Calendar, Tag, ArrowUpRight, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AIUpdatesProps {
  updates: AIUpdate[];
}

export const AIUpdates: React.FC<AIUpdatesProps> = ({ updates }) => {
  const { t, lang, dir } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalUpdate, setActiveModalUpdate] = useState<AIUpdate | null>(null);

  // Dynamically obtain category list based on translation
  const categories = useMemo(() => {
    const list = new Set<string>();
    updates.forEach((item) => {
      const cat = lang === 'ar' ? item.categoryAr : item.categoryEn;
      if (cat) list.add(cat);
    });
    return ['all', ...Array.from(list)];
  }, [updates, lang]);

  // Filter & Search logic
  const filteredUpdates = useMemo(() => {
    return updates.filter((item) => {
      const title = lang === 'ar' ? item.titleAr : item.titleEn;
      const content = lang === 'ar' ? item.contentAr : item.contentEn;
      const cat = lang === 'ar' ? item.categoryAr : item.categoryEn;

      const matchesSearch = 
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || cat === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [updates, searchTerm, selectedCategory, lang]);

  return (
    <div 
      id="ai-updates-page"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white min-h-[70vh]"
      style={{ direction: dir }}
    >
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {t('section.updates.title')}
        </h2>
        <p className="text-sm sm:text-base text-zinc-400">
          {t('section.updates.sub')}
        </p>
      </div>

      {/* Filter and Search Actions */}
      <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500">
            <Search size={16} />
          </div>
          <input
            id="update-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('ui.search_placeholder')}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-400 rounded-xl text-sm focus:outline-none transition font-sans"
            style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}
          />
          {searchTerm && (
            <button
               id="update-search-clear-btn"
               onClick={() => setSearchTerm('')}
               className="absolute inset-y-0 right-3 flex items-center text-zinc-500 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Categories Tabs pills scrollable */}
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 md:pb-0">
          {categories.map((category) => (
            <button
              id={`cat-tab-bin-${category.replace(/\s+/g, '-').toLowerCase()}`}
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-white/10 border-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                  : 'bg-transparent border-white/5 text-zinc-400 hover:text-white hover:border-white/10'
              }`}
            >
              {category === 'all' ? t('ui.all_categories') : category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Updates Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUpdates.length > 0 ? (
          filteredUpdates.map((item) => {
            const currentTitle = lang === 'ar' ? item.titleAr : item.titleEn;
            const currentDesc = lang === 'ar' ? item.contentAr : item.contentEn;
            const currentCat = lang === 'ar' ? item.categoryAr : item.categoryEn;

            return (
              <motion.div
                id={`update-card-${item.id}`}
                key={item.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveModalUpdate(item)}
                className="group relative bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between overflow-hidden cursor-pointer hover:border-cyan-400/50 transition shadow-lg backdrop-blur-md shrink-0"
              >
                {/* Image (if exists) */}
                {item.imageUrl && (
                  <div className="relative w-full h-48 overflow-hidden bg-zinc-900">
                    <img
                      src={item.imageUrl}
                      alt={currentTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                )}

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Tags */}
                    <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-cyan-400" />
                        <span>{item.date}</span>
                      </span>
                      <span className="flex items-center gap-1 text-cyan-400 font-bold bg-cyan-500/15 px-2 py-0.5 rounded border border-cyan-500/10">
                        <Tag size={10} />
                        <span>{currentCat}</span>
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-200 line-clamp-2">
                      {currentTitle}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                      {currentDesc}
                    </p>
                  </div>

                  {/* Open modal visual clue */}
                  <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-end text-[11px] font-mono text-zinc-500 group-hover:text-cyan-400 transition-colors">
                    <span className="flex items-center gap-1">
                      <span>READ MORE</span>
                      <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16 bg-white/5 rounded-2xl border border-white/10 p-6">
            <p className="text-zinc-500 text-sm font-sans">{t('ui.placeholder_no_data')}</p>
          </div>
        )}
      </div>

      {/* Pop-out detailed text reading Modal */}
      <AnimatePresence>
        {activeModalUpdate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#050505] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Close pin */}
              <button
                id="update-modal-close-btn"
                onClick={() => setActiveModalUpdate(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5 rounded-full transition"
              >
                <X size={15} />
              </button>

              {/* Modal Cover Image if available */}
              {activeModalUpdate.imageUrl && (
                <div className="w-full h-64 bg-zinc-900 relative">
                  <img
                    src={activeModalUpdate.imageUrl}
                    alt={lang === 'ar' ? activeModalUpdate.titleAr : activeModalUpdate.titleEn}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                </div>
              )}

              {/* Modal Content Details */}
              <div className="p-6 overflow-y-auto space-y-4" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-cyan-400" />
                    <span>{activeModalUpdate.date}</span>
                  </span>
                  <span className="text-zinc-700">|</span>
                  <span className="text-cyan-400 font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/10">
                    {lang === 'ar' ? activeModalUpdate.categoryAr : activeModalUpdate.categoryEn}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {lang === 'ar' ? activeModalUpdate.titleAr : activeModalUpdate.titleEn}
                </h3>

                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans">
                  {lang === 'ar' ? activeModalUpdate.contentAr : activeModalUpdate.contentEn}
                </p>

                {/* External link back */}
                {activeModalUpdate.sourceUrl && (
                  <div className="pt-4 border-t border-white/10 flex justify-end">
                    <a
                      id="update-source-btn"
                      href={activeModalUpdate.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-95 text-white text-xs font-extrabold rounded-lg flex items-center gap-1.5 transition shadow-[0_4px_15px_rgba(34,211,238,0.2)]"
                    >
                      <span>{t('ui.external_link')}</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
