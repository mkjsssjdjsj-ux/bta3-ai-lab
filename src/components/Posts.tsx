import React, { useState, useMemo } from 'react';
import { useTranslation } from './LanguageContext';
import { SocialPost } from '../types';
import { Search, Calendar, Tag, ExternalLink, Globe, Eye, Sparkles, BookOpen, Clock, Heart, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PostsProps {
  posts: SocialPost[];
}

export const Posts: React.FC<PostsProps> = ({ posts }) => {
  const { t, lang, dir } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  
  // Custom interactive preview modal state
  const [previewPost, setPreviewPost] = useState<SocialPost | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const platforms = ['all', 'facebook', 'instagram', 'linkedin', 'behance', 'youtube', 'tiktok'];

  const filteredPosts = useMemo(() => {
    return posts.filter((item) => {
      const title = lang === 'ar' ? item.titleAr : item.titleEn;
      const desc = lang === 'ar' ? item.descriptionAr : item.descriptionEn;
      const cat = lang === 'ar' ? item.categoryAr : item.categoryEn;

      const matchesSearch = 
        title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        desc.toLowerCase().includes(searchTerm.toLowerCase()) || 
        cat.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.platform.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPlatform = selectedPlatform === 'all' || item.platform === selectedPlatform;

      return matchesSearch && matchesPlatform;
    });
  }, [posts, searchTerm, selectedPlatform, lang]);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const shareSocialPost = (item: SocialPost, e: React.MouseEvent) => {
    e.stopPropagation();
    const mockLink = `${window.location.origin}/#post-${item.id}`;
    navigator.clipboard.writeText(mockLink);
    triggerToast(lang === 'ar' ? 'تم نسخ الرابط الرمزي للمنشور!' : 'Deep link copied to clipboard!');
  };

  // Platform brand colors and high precision inline SVG vectors
  const renderPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return (
          <svg className="w-4 h-4 text-[#1877F2] fill-current" viewBox="0 0 24 24">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-4 h-4 text-[#E4405F] fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-4 h-4 text-[#0077B5] fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        );
      case 'behance':
        return (
          <svg className="w-4 h-4 text-[#0057ff] fill-current" viewBox="0 0 24 24">
            <path d="M8.228 15.01c-.571 0-1.042-.148-1.416-.445-.373-.297-.56-.732-.56-1.307 0-.547.195-.972.587-1.275.391-.303.951-.454 1.681-.454h1.417v1.8c0 .546-.145.96-.437 1.24-.291.282-.716.422-1.272.422zm-.965-6.035c0-.465.151-.815.454-1.052.304-.236.721-.354 1.252-.354.516 0 .918.118 1.205.354.288.237.432.587.432 1.052 0 .438-.148.775-.445 1.01-.297.237-.714.354-1.253.354-.51 0-.916-.117-1.218-.354-.303-.235-.453-.584-.453-1.011zm11.397 3.551c0-.453-.105-.83-.314-1.13-.21-.303-.544-.454-1.003-.454-.424 0-.756.143-.996.428-.24.285-.37.662-.39 1.131h2.703zm4.34-1.526c-.347-1.115-1.026-1.996-2.037-2.641-1.01-.646-2.193-.97-3.548-.97-1.416 0-2.637.337-3.663 1.011-1.027.674-1.815 1.604-2.366 2.79-.55 1.186-.826 2.536-.826 4.05 0 1.488.271 2.812.813 3.974.542 1.162 1.327 2.072 2.353 2.73 1.027.659 2.247.989 3.663.989 1.625 0 2.973-.4 4.043-1.201 1.07-.801 1.73-1.901 1.982-3.3h-3.328c-.183.473-.509.843-.979 1.11-.47.265-1.011.398-1.625.398-.797 0-1.434-.236-1.91-.707-.477-.471-.741-1.11-.79-1.916h8.865c.04-.326.06-.689.06-1.089 0-1.7-.308-3.111-.926-4.234zm-14.717.382c.98-.671 1.47-1.637 1.47-2.898 0-.964-.242-1.767-.726-2.41a4.233 4.233 0 0 0-1.956-1.458c-.822-.315-1.95-.472-3.387-.472H0v19.438h7.952c1.43 0 2.576-.176 3.443-.526a4.57 4.57 0 0 0 2.155-1.745c.49-.785.736-1.714.736-2.79a5.138 5.138 0 0 0-1.424-3.639z"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-4 h-4 text-[#FF0000] fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.555A3.002 3.002 0 0 0 .503 6.163C0 8.038 0 12 0 12s0 3.962.503 5.837a3.002 3.002 0 0 0 2.11 2.108c1.868.555 9.388.555 9.388.555s7.52 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.962 24 12 24 12s0-3.963-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      case 'tiktok':
        return (
          <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
            <path d="M12.53.02C13.84 0 15.1.32 16.22.9V4.5c-1.1-.58-2.36-.9-3.69-.9v4.63c2.59.03 4.7 1.95 5.07 4.44.25 1.69-.23 3.5-1.31 4.71-1.07 1.2-2.6 1.92-4.29 1.92-3.1 0-5.61-2.44-5.61-5.46 0-2.48 1.69-4.58 3.97-5.23V6.03c-3.53.71-6.19 3.8-6.19 7.47 0 4.2 3.42 7.6 7.61 7.6 4.19 0 7.6-3.4 7.6-7.6v-9.1C21.1 5.56 22.8 6.5 24 7.5V3.9c-1.2-1-2.9-1.95-4.51-2.3-.96-.2-1.9-.22-2.81.02V.02h-4.15z"/>
          </svg>
        );
      default:
        return <Globe size={14} className="text-zinc-400" />;
    }
  };

  const getPlatformClass = (platform: string) => {
    switch (platform) {
      case 'facebook': return 'border-blue-500/10 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]';
      case 'instagram': return 'border-pink-500/10 hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]';
      case 'linkedin': return 'border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]';
      case 'behance': return 'border-indigo-600/10 hover:border-indigo-600/50 hover:shadow-[0_0_20px_rgba(79,70,229,0.15)]';
      case 'youtube': return 'border-red-500/10 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]';
      case 'tiktok': return 'border-zinc-500/10 hover:border-zinc-100/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]';
      default: return 'border-white/10 hover:border-cyan-400/50';
    }
  };

  return (
    <div 
      id="posts-page"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white min-h-[85vh]"
      style={{ direction: dir }}
    >
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-black/90 border border-cyan-400/30 px-5 py-2.5 rounded-full text-xs font-mono font-bold text-white shadow-lg backdrop-blur-md"
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4 font-sans">
        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[10px] font-mono tracking-widest uppercase">
          <BookOpen size={11} />
          <span>EDITORIAL CONTENT MAGAZINE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {t('section.posts.title')}
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
          {lang === 'ar'
            ? 'اكتشف منشوراتنا الرقمية ومقالاتنا الحصرية لمواكبة التغير المتسارع وبناء مهارات ريادية في التصميم والتكنولوجيا.'
            : 'Explore educational visual updates, automated design guides, and community insights formatted as a premium content publication.'}
        </p>
      </div>

      {/* Action Area: Search & Direct Platform filtering */}
      <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500">
            <Search size={16} />
          </div>
          <input
            id="post-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('ui.search_placeholder')}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-400 rounded-xl text-sm focus:outline-none transition font-sans text-white focus:shadow-[0_0_15px_rgba(34,211,238,0.05)]"
            style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}
          />
        </div>

        {/* Platform selection pills */}
        <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 max-w-full">
          {platforms.map((plat) => (
            <button
              id={`post-plat-tab-${plat}`}
              key={plat}
              onClick={() => setSelectedPlatform(plat)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl border transition-all uppercase font-mono ${
                selectedPlatform === plat
                  ? 'bg-cyan-500/10 border-cyan-400/40 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.1)]'
                  : 'bg-transparent border-white/5 text-zinc-400 hover:text-white hover:border-white/10'
              }`}
            >
              {plat === 'all' ? t('ui.all_categories') : plat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Magazine Social Feed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((item) => {
            const currentTitle = lang === 'ar' ? item.titleAr : item.titleEn;
            const currentDesc = lang === 'ar' ? item.descriptionAr : item.descriptionEn;
            const currentCat = lang === 'ar' ? item.categoryAr : item.categoryEn;
            const defaultCover = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
            const displayCover = item.coverImage || defaultCover;

            return (
              <motion.div
                id={`post-card-${item.id}`}
                key={item.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`bg-zinc-950/40 border rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group transition-all duration-300 relative ${getPlatformClass(item.platform)}`}
              >
                {/* Visual Thumbnail wrapper */}
                <div className="relative w-full h-48 overflow-hidden bg-zinc-900 border-b border-white/5">
                  <img 
                    src={displayCover} 
                    alt={currentTitle} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106 filter brightness-90 group-hover:brightness-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Glass platform absolute overlay pill */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-white shadow-lg pointer-events-none select-none z-10">
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                      {renderPlatformIcon(item.platform)}
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white">
                      {item.platform}
                    </span>
                  </div>

                  {/* Gradient shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Body Content information elements */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-3">
                    {/* Date reference & category block */}
                    <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-500 font-bold">
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        <span>{item.date}</span>
                      </span>

                      <span className="w-1.5 h-1.5 rounded-full bg-white/10" />

                      <span className="text-cyan-400 font-extrabold uppercase">
                        {currentCat}
                      </span>
                    </div>

                    {/* Headline titles */}
                    <div className="space-y-1.5" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                      <h3 className="text-md sm:text-lg font-extrabold text-white leading-snug group-hover:text-cyan-300 transition duration-350 line-clamp-2">
                        {currentTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 font-sans font-medium line-clamp-3 leading-relaxed">
                        {currentDesc}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Button row */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3 font-mono">
                    
                    {/* Magazine Preview Modal trigger */}
                    <button
                      onClick={() => setPreviewPost(item)}
                      className="py-2 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 hover:border-white/20 transition flex items-center gap-1.5 flex-1 justify-center whitespace-nowrap"
                    >
                      <Eye size={12} className="text-cyan-400" />
                      <span>{lang === 'ar' ? 'معاينة سريعة' : 'Preview'}</span>
                    </button>

                    {/* Live platform action button */}
                    <a
                      id={`post-live-link-${item.id}`}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3.5 bg-gradient-to-r from-cyan-400/90 to-blue-500/90 hover:from-cyan-400 hover:to-blue-500 text-zinc-950 rounded-xl text-xs font-extrabold flex items-center gap-1.5 flex-1 justify-center shadow-lg transition duration-300"
                    >
                      <span className="text-[10px] uppercase font-bold text-zinc-950">{lang === 'ar' ? 'قم بزيارة' : 'Visit'}</span>
                      <ExternalLink size={10} className="text-zinc-950" />
                    </a>

                  </div>

                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16 bg-[#050505]/40 rounded-3xl border border-white/5 p-6 font-sans">
            <p className="text-zinc-500 text-sm">{t('ui.placeholder_no_data')}</p>
          </div>
        )}
      </div>

      {/* Immersive Cinematic Magazine Preview Drawer Modal */}
      <AnimatePresence>
        {previewPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl bg-black/90"
            onClick={() => setPreviewPost(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-zinc-950 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative scrollbar-thin scrollbar-thumb-zinc-800"
              onClick={(e) => e.stopPropagation()}
              style={{ direction: dir }}
            >
              {/* Close pin button */}
              <button
                onClick={() => setPreviewPost(null)}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/5 text-white transition text-xs z-20"
              >
                ✕
              </button>

              <div className="space-y-6">
                {/* Large Cover Image with category on top */}
                <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/5">
                  <img 
                    src={previewPost.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'} 
                    alt="Cover" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />

                  {/* Absolute Platform badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur border border-white/5 text-white">
                    {renderPlatformIcon(previewPost.platform)}
                    <span className="text-[9.5px] font-mono uppercase font-bold text-white tracking-wider">{previewPost.platform}</span>
                  </div>
                </div>

                {/* Meta details header Row */}
                <div className="flex items-center justify-between text-xs font-mono font-bold text-zinc-500 border-b border-white/5 pb-4">
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    <span>PUBLISHED: {previewPost.date}</span>
                  </span>

                  <span className="text-cyan-400 uppercase">
                    {lang === 'ar' ? previewPost.categoryAr : previewPost.categoryEn}
                  </span>
                </div>

                {/* Content details description text */}
                <div className="space-y-3" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                    {lang === 'ar' ? previewPost.titleAr : previewPost.titleEn}
                  </h3>
                  
                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans font-medium whitespace-pre-wrap">
                    {lang === 'ar' ? previewPost.descriptionAr : previewPost.descriptionEn}
                  </p>
                </div>

                {/* Footer action keys */}
                <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2.5 items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => shareSocialPost(previewPost, e)}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-400 hover:text-cyan-400 transition"
                      title="Share Direct link"
                    >
                      <Share2 size={13} />
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setPreviewPost(null)}
                      className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-mono font-bold text-white transition-all"
                    >
                      {t('ui.close')}
                    </button>

                    <a
                      href={previewPost.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-zinc-950 text-xs font-mono font-extrabold shadow-[0_0_15px_rgba(34,211,238,0.2)] transition flex items-center gap-1"
                    >
                      <span>{lang === 'ar' ? 'شاهد المنشور المباشر الآن' : 'Visist Live Article'}</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

