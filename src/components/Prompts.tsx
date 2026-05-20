import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useTranslation } from './LanguageContext';
import { PromptItem } from '../types';
import { Search, Copy, Check, Terminal, Tag, RefreshCw, Heart, Share2, Maximize2, Sparkles, Sliders, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Reusable 3D Tilt Wrapper with Glass Reflection Shine
const TiltCard: React.FC<{ children: React.ReactNode; id?: string; className?: string }> = ({ children, id, className }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Smooth 3D tilt calculation (max 6 degrees)
    const rX = -(mouseY / (height / 2)) * 6;
    const rY = (mouseX / (width / 2)) * 6;
    
    setCoords({ x: rY, y: rX });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  return (
    <motion.div
      id={id}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`${className} relative overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-[0_0_30px_rgba(34,211,238,0.15)] border-cyan-400/30' : 'border-white/10'
      }`}
      style={{
        transformStyle: 'preserve-3d',
        transform: isHovered 
          ? `perspective(1000px) rotateX(${coords.y}deg) rotateY(${coords.x}deg) scale3d(1.01, 1.01, 1.01)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
    >
      {/* Reflection shine swipe effect */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-tr from-transparent via-white/5 to-transparent transition-transform duration-1000"
        style={{
          transform: isHovered ? 'translateX(100%) translateY(100%)' : 'translateX(-100%) translateY(-100%)',
          transition: 'transform 1s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      />
      {children}
    </motion.div>
  );
};

// Canvas-Based Glowing Particle Network
const DynamicAIParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    // Sparkly micro nodes
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;

        ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Connect micro nodes
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.04)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none -z-10 opacity-70" />;
};

// Interactive Before/After Visual Splicer with Cursor Tracking
const BeforeAfterSlider: React.FC<{ before: string; after: string }> = ({ before, after }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1) { // Click and drag
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden select-none cursor-ew-resize border border-white/10 group bg-zinc-950"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Before Canvas */}
      <img 
        src={before} 
        alt="Before Art" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-90 group-hover:scale-102 transition-transform duration-500"
        referrerPolicy="no-referrer"
      />
      <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono font-bold text-zinc-400 border border-white/5 z-10">
        BEFORE REFERENCE
      </div>

      {/* After Slider overlay with custom clip-path */}
      <div 
        className="absolute inset-y-0 left-0 right-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img 
          src={after} 
          alt="After Art" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-110 group-hover:scale-102 transition-transform duration-500"
          style={{ width: '100%', height: '100%' }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-2 right-2 bg-cyan-500/80 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono font-bold text-white border border-cyan-400/10 z-10">
          FINISHED AI VISUAL
        </div>
      </div>

      {/* Control handle pin */}
      <div 
        className="absolute inset-y-0 w-0.5 bg-gradient-to-b from-cyan-400 via-cyan-500 to-blue-500 shadow-[0_0_15px_#22d3ee] pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-cyan-400 border border-white flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.8)]">
          <Sliders size={12} className="text-zinc-950 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

interface PromptsProps {
  prompts: PromptItem[];
}

export const Prompts: React.FC<PromptsProps> = ({ prompts }) => {
  const { t, lang, dir } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTool, setSelectedTool] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedPromptIds, setSavedPromptIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('bta3_saved_prompts');
    return saved ? JSON.parse(saved) : [];
  });
  const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false);
  
  // Custom expandable modal state
  const [activePromptModal, setActivePromptModal] = useState<PromptItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Gallery active index state per prompt id
  const [galleryIndexes, setGalleryIndexes] = useState<Record<string, number>>({});

  // Sync favorites
  useEffect(() => {
    localStorage.setItem('bta3_saved_prompts', JSON.stringify(savedPromptIds));
  }, [savedPromptIds]);

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedPromptIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast(lang === 'ar' ? 'تمت إزالة الأمر من المفضلات' : 'Removed from favorites!');
        return prev.filter((item) => item !== id);
      } else {
        showToast(lang === 'ar' ? 'تم حفظ الأمر في المفضلات!' : 'Added to favorites!');
        return [...prev, id];
      }
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleCopyPrompt = (id: string, text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast(lang === 'ar' ? 'تم نسخ الأمر البرمجي!' : 'Copied prompt successfully!');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSharePrompt = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const deepLink = `${window.location.origin}/#prompt-${id}`;
    navigator.clipboard.writeText(deepLink);
    showToast(lang === 'ar' ? 'تم نسخ رابط المشاركة المباشر!' : 'Direct share link copied!');
  };

  // Get unique categories for filtering
  const categories = useMemo(() => {
    const list = new Set<string>();
    prompts.forEach((item) => {
      const cat = lang === 'ar' ? item.categoryAr : item.categoryEn;
      if (cat) list.add(cat);
    });
    return ['all', ...Array.from(list)];
  }, [prompts, lang]);

  // Get unique AI Tools for filtering
  const aiTools = useMemo(() => {
    const list = new Set<string>();
    prompts.forEach((item) => {
      if (item.aiTool) list.add(item.aiTool);
    });
    return ['all', ...Array.from(list)];
  }, [prompts]);

  const filteredPrompts = useMemo(() => {
    return prompts.filter((item) => {
      const title = lang === 'ar' ? item.titleAr : item.titleEn;
      const desc = lang === 'ar' ? item.descriptionAr : item.descriptionEn;
      const cat = lang === 'ar' ? item.categoryAr : item.categoryEn;
      const text = item.promptText;
      const tool = item.aiTool || 'Other';

      const matchesSearch = 
        title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || cat === selectedCategory;
      const matchesTool = selectedTool === 'all' || tool === selectedTool;
      const matchesFavorites = !favoritesOnly || savedPromptIds.includes(item.id);

      return matchesSearch && matchesCategory && matchesTool && matchesFavorites;
    });
  }, [prompts, searchTerm, selectedCategory, selectedTool, favoritesOnly, savedPromptIds, lang]);

  return (
    <div 
      id="prompts-page"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white min-h-[85vh] relative"
      style={{ direction: dir }}
    >
      <DynamicAIParticles />

      {/* Floating Alert System */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#050505]/95 border border-cyan-400/40 px-6 py-3 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.25)] backdrop-blur-lg select-none"
          >
            <Sparkles className="text-cyan-400 w-4 h-4 animate-spin-slow" />
            <span className="text-xs font-mono font-bold tracking-wide text-white">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono tracking-widest uppercase mb-1">
          <Sparkles size={11} className="animate-pulse" />
          <span>PROMPT LAB ENGINEERING</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans">
          {t('section.prompts.title')}
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans max-w-2xl mx-auto">
          {lang === 'ar' 
            ? 'مكتبة ذكية تجمع تفاصيل إضاءة، أطياف نيون، وأكواد هندسية للحصول على مخرجات وتصميمات فائقة التميز.'
            : 'Explore Battle-tested direct visual prompts, creative parameters, and compound blueprints designed to maximize digital graphics rendering.'}
        </p>
      </div>

      {/* Search & Tool Filtering Panel */}
      <div className="bg-white/5 border border-white/5 rounded-2xl p-6 mb-10 backdrop-blur-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search bar */}
          <div className="relative md:col-span-6">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500">
              <Search size={16} />
            </div>
            <input
              id="prompt-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('ui.search_placeholder')}
              className="w-full pl-10 pr-4 py-3 bg-zinc-950/40 border border-white/10 focus:border-cyan-400 rounded-xl text-sm focus:outline-none transition font-sans text-white focus:shadow-[0_0_15px_rgba(34,211,238,0.1)]"
              style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}
            />
            {searchTerm && (
              <button
                id="prompt-search-clear-btn"
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-3 flex items-center text-zinc-500 hover:text-white"
              >
                <RefreshCw size={13} className="animate-spin-once" />
              </button>
            )}
          </div>

          {/* Quick Filters category/tool selectors */}
          <div className="flex flex-wrap items-center gap-2 md:col-span-6 md:justify-end">
            <button
              onClick={() => setFavoritesOnly((p) => !p)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                favoritesOnly 
                  ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' 
                  : 'bg-zinc-950/40 border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-900/50'
              }`}
            >
              <Heart size={14} className={favoritesOnly ? 'fill-current' : ''} />
              <span>{lang === 'ar' ? 'المفضلات فقط' : 'Favorites Only'}</span>
              {savedPromptIds.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-cyan-400 text-zinc-950 flex items-center justify-center text-[9px] font-black font-mono">
                  {savedPromptIds.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Categories Tab Deck */}
        <div className="space-y-4 pt-4 border-t border-white/5 font-sans">
          {/* Categories Row */}
          <div className="flex flex-col sm:flex-row gap-2.5 items-start sm:items-center">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">{lang === 'ar' ? 'التصنيفات:' : 'CATEGORIES:'}</span>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((category) => (
                <button
                  id={`prompt-cat-tab-${category.replace(/\s+/g, '-').toLowerCase()}`}
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                    selectedCategory === category
                      ? 'bg-cyan-500/10 border-cyan-400/40 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.1)]'
                      : 'bg-zinc-950/20 border-white/5 text-zinc-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  {category === 'all' ? t('ui.all_categories') : category}
                </button>
              ))}
            </div>
          </div>

          {/* AI Tools Filter Row */}
          <div className="flex flex-col sm:flex-row gap-2.5 items-start sm:items-center">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">{lang === 'ar' ? 'الأدوات المقترحة:' : 'AI PLATFORMS:'}</span>
            <div className="flex flex-wrap gap-1.5">
              {aiTools.map((tool) => (
                <button
                  key={tool}
                  onClick={() => setSelectedTool(tool)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                    selectedTool === tool
                      ? 'bg-purple-500/10 border-purple-400/40 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.1)]'
                      : 'bg-zinc-950/20 border-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  {tool === 'all' ? (lang === 'ar' ? 'جميع الأدوات' : 'All Artificial Tools') : tool}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Prompts Layout Stack */}
      <div className="grid grid-cols-1 gap-8">
        {filteredPrompts.length > 0 ? (
          filteredPrompts.map((item) => {
            const currentTitle = lang === 'ar' ? item.titleAr : item.titleEn;
            const currentDesc = lang === 'ar' ? item.descriptionAr : item.descriptionEn;
            const currentCat = lang === 'ar' ? item.categoryAr : item.categoryEn;
            const hasVisualSlider = item.beforeImage && item.afterImage;
            const hasImagesArray = item.previewImages && item.previewImages.length > 0;
            const activeGalleryIndex = galleryIndexes[item.id] || 0;

            return (
              <TiltCard
                id={`prompt-card-${item.id}`}
                key={item.id}
                className="bg-zinc-900/40 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative p-6 sm:p-8"
              >
                {/* Visual grid layout */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Left Column - Previews/Slider (5 Cols) */}
                  <div className="xl:col-span-5 flex flex-col justify-between space-y-4">
                    {/* Before/After comparison active slider */}
                    {hasVisualSlider ? (
                      <BeforeAfterSlider 
                        before={item.beforeImage!} 
                        after={item.afterImage!} 
                      />
                    ) : hasImagesArray ? (
                      // Multi-image dynamic layout with thumbnails
                      <div className="relative space-y-3">
                        <div className="relative h-56 sm:h-64 rounded-xl overflow-hidden bg-zinc-950/90 border border-white/5">
                          <img 
                            src={item.previewImages![activeGalleryIndex]} 
                            alt={currentTitle} 
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 pointer-events-none"
                            referrerPolicy="no-referrer"
                          />
                          {/* Glare Glass layer */}
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none" />
                        </div>
                        
                        {/* Thumbnail bar */}
                        {item.previewImages!.length > 1 && (
                          <div className="flex gap-2 justify-start items-center overflow-x-auto pb-1">
                            {item.previewImages!.map((imgUrl, thumbIdx) => (
                              <button
                                key={thumbIdx}
                                onClick={() => setGalleryIndexes(prev => ({ ...prev, [item.id]: thumbIdx }))}
                                className={`w-12 h-12 rounded-lg overflow-hidden border transition-all ${
                                  activeGalleryIndex === thumbIdx 
                                    ? 'border-cyan-400 scale-102 shadow-[0_0_8px_rgba(34,211,238,0.3)]' 
                                    : 'border-white/10 filter brightness-70 hover:brightness-100 hover:border-white/20'
                                }`}
                              >
                                <img src={imgUrl} alt="gallery thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      // Abstract Digital Artwork Placeholder fallback
                      <div className="w-full h-56 sm:h-64 rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-cyan-950/20 border border-white/5 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                        <Terminal size={32} className="text-zinc-600 mb-2 animate-pulse" />
                        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">NO DESIGN REF ATTACHED</span>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-500/5 blur-3xl rounded-full" />
                      </div>
                    )}
                  </div>

                  {/* Right Column - Prompt Information (7 Cols) */}
                  <div className="xl:col-span-7 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      {/* Platform Tags Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1.5 text-cyan-400 font-mono font-bold text-[10px] px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                            <Terminal size={10} />
                            <span>{currentCat}</span>
                          </span>

                          {item.aiTool && (
                            <span className="flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
                              <Sparkles size={10} />
                              <span>{item.aiTool}</span>
                            </span>
                          )}
                        </div>

                        {/* Top action row */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => handleToggleFavorite(item.id, e)}
                            className={`p-2 rounded-xl border transition ${
                              savedPromptIds.includes(item.id) 
                                ? 'bg-rose-500/10 border-rose-500/20 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.1)]' 
                                : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                            }`}
                            title="Save Prompt"
                          >
                            <Heart size={14} className={savedPromptIds.includes(item.id) ? 'fill-current' : ''} />
                          </button>

                          <button
                            onClick={(e) => handleSharePrompt(item.id, e)}
                            className="p-2 rounded-xl bg-white/5 border border-white/5 text-zinc-400 hover:text-cyan-400 transition"
                            title="Copy Direct URL"
                          >
                            <Share2 size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Display Text block */}
                      <div className="space-y-2" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                        <h3 className="text-xl sm:text-2xl font-black text-white hover:text-cyan-300 transition duration-300">
                          {currentTitle}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans font-medium">
                          {currentDesc}
                        </p>
                      </div>

                      {/* Code Area */}
                      <div className="relative group/code block mt-4">
                        <pre 
                          className="text-xs bg-zinc-950/80 border border-white/5 text-cyan-300 font-mono p-4 rounded-xl overflow-x-auto max-h-32 whitespace-pre-wrap leading-relaxed select-all scrollbar-thin scrollbar-thumb-zinc-800"
                          style={{ direction: 'ltr', textAlign: 'left' }}
                        >
                          {item.promptText}
                        </pre>

                        {/* Copy overlay */}
                        <div className="absolute top-2 right-2 opacity-90 group-hover/code:opacity-100 transition">
                          <button
                            id={`copy-btn-${item.id}`}
                            onClick={(e) => handleCopyPrompt(item.id, item.promptText, e)}
                            className={`p-1.5 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 shadow transition ${
                              copiedId === item.id
                                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white'
                                : 'bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300'
                            }`}
                          >
                            {copiedId === item.id ? <Check size={11} /> : <Copy size={11} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Tags row & action keys */}
                    <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 text-[9.5px] font-mono text-zinc-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded-md"
                          >
                            <Tag size={8} className="text-cyan-400" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>

                      {/* Modal Expand / Copy trigger */}
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => setActivePromptModal(item)}
                          className="flex-1 sm:flex-none justify-center py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-mono font-bold border border-white/10 hover:border-white/20 transition flex items-center gap-1.5"
                        >
                          <Maximize2 size={12} className="text-cyan-400" />
                          <span>{lang === 'ar' ? 'التفاصيل والبرومبت كامل' : 'Expand Full Prompt'}</span>
                        </button>

                        <button
                          onClick={(e) => handleCopyPrompt(item.id, item.promptText, e)}
                          className="flex-1 sm:flex-none justify-center py-2 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-zinc-950 text-xs font-mono font-extrabold transition duration-300 flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                        >
                          <Copy size={12} />
                          <span>{lang === 'ar' ? 'انسخ الأمر' : 'Copy Prompt'}</span>
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              </TiltCard>
            );
          })
        ) : (
          <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10 p-6 font-sans">
            <p className="text-zinc-500 text-sm">{t('ui.placeholder_no_data')}</p>
          </div>
        )}
      </div>

      {/* Expand Full Prompt immersive detail Modal Dialog */}
      <AnimatePresence>
        {activePromptModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl bg-black/85"
            onClick={() => setActivePromptModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-zinc-950 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative scrollbar-thin scrollbar-thumb-zinc-800"
              onClick={(e) => e.stopPropagation()}
              style={{ direction: dir }}
            >
              {/* Close Pin */}
              <button
                onClick={() => setActivePromptModal(null)}
                className="absolute top-4 right-4 p-2 bg-white/5 rounded-full hover:bg-white/10 border border-white/10 text-white transition-all text-xs"
              >
                ✕
              </button>

              <div className="space-y-6 pt-2">
                {/* Visual Header */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-cyan-400 px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/20">
                    {lang === 'ar' ? activePromptModal.categoryAr : activePromptModal.categoryEn}
                  </span>
                  {activePromptModal.aiTool && (
                    <span className="text-[10px] font-mono tracking-widest text-purple-400 px-2 py-0.5 rounded bg-purple-400/10 border border-purple-400/20">
                      {activePromptModal.aiTool}
                    </span>
                  )}
                </div>

                <div style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {lang === 'ar' ? activePromptModal.titleAr : activePromptModal.titleEn}
                  </h3>
                  <p className="text-zinc-400 text-sm mt-2 font-sans">
                    {lang === 'ar' ? activePromptModal.descriptionAr : activePromptModal.descriptionEn}
                  </p>
                </div>

                {/* Main Image comparison / static preview if present */}
                {activePromptModal.beforeImage && activePromptModal.afterImage ? (
                  <BeforeAfterSlider 
                    before={activePromptModal.beforeImage} 
                    after={activePromptModal.afterImage} 
                  />
                ) : activePromptModal.previewImages && activePromptModal.previewImages.length > 0 ? (
                  <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-zinc-900 border border-white/5">
                    <img 
                      src={activePromptModal.previewImages[0]} 
                      alt="Modal Preview" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : null}

                {/* Absolute Full Prompts code area */}
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest block">
                    {lang === 'ar' ? 'الأمر البرمجي الكامل (معد للنسخ والتشغيل مباشرة):' : 'FULL PROMPT SYSTEM (READY TO SYNTHESIZE):'}
                  </span>
                  <div className="relative">
                    <textarea
                      readOnly
                      value={activePromptModal.promptText}
                      className="w-full h-48 bg-zinc-900 border border-white/15 rounded-xl p-4 font-mono text-xs sm:text-sm text-cyan-300 focus:outline-none overflow-y-auto leading-relaxed"
                      style={{ direction: 'ltr', textAlign: 'left' }}
                    />
                    
                    <button
                      onClick={() => handleCopyPrompt(activePromptModal.id, activePromptModal.promptText)}
                      className="absolute bottom-3 right-3 py-2 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-zinc-950 font-mono text-xs font-black transition flex items-center gap-1 shadow-md"
                    >
                      <Copy size={12} />
                      <span>{lang === 'ar' ? 'نسخ الكود' : 'Copy Full Command'}</span>
                    </button>
                  </div>
                </div>

                {/* Additional metadata specs */}
                <div className="flex flex-wrap gap-2.5 pt-4 border-t border-white/5 items-center justify-between">
                  {/* Tag capsules */}
                  <div className="flex flex-wrap gap-1.5">
                    {activePromptModal.tags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-zinc-400">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActivePromptModal(null)}
                    className="py-1.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono font-bold text-white transition-all"
                  >
                    {t('ui.close')}
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

