import React, { useState } from 'react';
import { useTranslation } from './LanguageContext';
import { 
  AIUpdate, 
  PromptItem, 
  VisualItem, 
  VideoItem, 
  SocialPost, 
  MohamedKhaledLink, 
  ContactDetails 
} from '../types';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit2, 
  Key, 
  Info, 
  Check, 
  Save, 
  Eye, 
  EyeOff, 
  Laptop, 
  MessageSquare, 
  Phone, 
  Mail, 
  Link2, 
  Globe, 
  Video, 
  Image, 
  FileText,
  Compass,
  ArrowLeft,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminPanelProps {
  onClose: () => void;
  updates: AIUpdate[];
  setUpdates: React.Dispatch<React.SetStateAction<AIUpdate[]>>;
  prompts: PromptItem[];
  setPrompts: React.Dispatch<React.SetStateAction<PromptItem[]>>;
  visuals: VisualItem[];
  setVisuals: React.Dispatch<React.SetStateAction<VisualItem[]>>;
  videos: VideoItem[];
  setVideos: React.Dispatch<React.SetStateAction<VideoItem[]>>;
  posts: SocialPost[];
  setPosts: React.Dispatch<React.SetStateAction<SocialPost[]>>;
  links: MohamedKhaledLink[];
  setLinks: React.Dispatch<React.SetStateAction<MohamedKhaledLink[]>>;
  contactDetails: ContactDetails;
  setContactDetails: React.Dispatch<React.SetStateAction<ContactDetails>>;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onClose,
  updates,
  setUpdates,
  prompts,
  setPrompts,
  visuals,
  setVisuals,
  videos,
  setVideos,
  posts,
  setPosts,
  links,
  setLinks,
  contactDetails,
  setContactDetails,
}) => {
  const { t, lang, dir } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('bta3_admin_authenticated') === 'true';
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'updates' | 'prompts' | 'visuals' | 'videos' | 'posts' | 'links' | 'contact'>('updates');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [updateForm, setUpdateForm] = useState<Partial<AIUpdate>>({});
  const [promptForm, setPromptForm] = useState<Partial<PromptItem>>({});
  const [visualForm, setVisualForm] = useState<Partial<VisualItem>>({});
  const [videoForm, setVideoForm] = useState<Partial<VideoItem>>({});
  const [postForm, setPostForm] = useState<Partial<SocialPost>>({});
  const [linkForm, setLinkForm] = useState<Partial<MohamedKhaledLink>>({});
  const [contactForm, setContactForm] = useState<ContactDetails>({ ...contactDetails });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Mk@9271Bta3') {
      setIsAuthenticated(true);
      sessionStorage.setItem('bta3_admin_authenticated', 'true');
      setErrorMsg('');
    } else {
      setErrorMsg(lang === 'ar' ? 'كلمة المرور غير صحيحة!' : 'Incorrect credentials password!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('bta3_admin_authenticated');
    setPassword('');
  };

  // Create items
  const handleCreateNewUpdate = () => {
    const newItem: AIUpdate = {
      id: `upd-${Date.now()}`,
      titleEn: 'New Generation Leap in Web Automation',
      titleAr: 'قفرة تكنولوجية جديدة في برمجة الأتمتة',
      contentEn: 'Brand-new structural frameworks utilizing autonomous browser clusters to scrape datasets, automatically styling packaging grids for designers.',
      contentAr: 'أنظمة وهياكل ذكاء تفاعلية سحابية جديدة تستثمر في تحليل ومعالجة البيانات مع أتمتة تنسيق القوالب لحفظ هويات المصممين.',
      categoryEn: 'Workflows',
      categoryAr: 'سير العمل',
      date: new Date().toISOString().split('T')[0],
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      sourceUrl: 'https://google.com'
    };
    setUpdates([newItem, ...updates]);
    setUpdateForm(newItem);
    setEditingId(newItem.id);
  };

  const handleCreateNewPrompt = () => {
    const newItem: PromptItem = {
      id: `prm-${Date.now()}`,
      titleEn: 'Synthetic Holographic Packaging Layout',
      titleAr: 'تصميم فني هولوجرافي لتغليف المنتجات',
      categoryEn: 'Midjourney',
      categoryAr: 'ميدجورني',
      promptText: 'futuristic glass packaging cylinder bottle with luminous bioluminescent algae, volumetric smoke render, sleek typography neon --v 6.1 --style raw',
      descriptionEn: 'Generates premium dynamic materials with reflections.',
      descriptionAr: 'يصنع نماذج أولية فاخرة وخلفيات ذات ارتداد ضوئي مائي مميز.',
      tags: ['Midjourney', 'Packaging', 'Creative']
    };
    setPrompts([newItem, ...prompts]);
    setPromptForm(newItem);
    setEditingId(newItem.id);
  };

  const handleCreateNewVisual = () => {
    const newItem: VisualItem = {
      id: `vis-${Date.now()}`,
      titleEn: 'Abstract Kinetic Sculpture Render',
      titleAr: 'رندر النحت الحركي التوليدي الملون',
      categoryEn: '3D Art',
      categoryAr: 'فن ثلاثي الأبعاد',
      imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
      descriptionEn: 'Experimental metallic refraction styles tailored for modern album cover themes.',
      descriptionAr: 'تجربة ارتداد الضوء البصرية المعدنية لتصميم أغلفة الكتالوجات والكتب الإبداعية.',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setVisuals([newItem, ...visuals]);
    setVisualForm(newItem);
    setEditingId(newItem.id);
  };

  const handleCreateNewVideo = () => {
    const newItem: VideoItem = {
      id: `vid-${Date.now()}`,
      titleEn: 'Automated Captions Script in Premiere Pro',
      titleAr: 'شرح كود أتمتة كتابة وتلوين النصوص في بريمير برو',
      categoryEn: 'Workflows',
      categoryAr: 'طرق الأتمتة',
      youtubeId: 'dQw4w9WgXcQ',
      descriptionEn: 'A masterclass explaining setup of text styling scripts inside Adobe ecosystem.',
      descriptionAr: 'في هذا الدرس، نشرح طريقة تشغيل وضبط سكربت مخصص لكتابة وترجمة النصوص للفيديو تلقائياً.',
      duration: '08:45'
    };
    setVideos([newItem, ...videos]);
    setVideoForm(newItem);
    setEditingId(newItem.id);
  };

  const handleCreateNewPost = () => {
    const newItem: SocialPost = {
      id: `pst-${Date.now()}`,
      platform: 'facebook',
      titleEn: 'Why Modern Content Creators Need AI Rules',
      titleAr: 'لماذا يحتاج صناع المحتوى لخطوط دفاع ذكية؟',
      descriptionEn: 'Important post analysis exploring direct content pipelines.',
      descriptionAr: 'منشور يوضح سياق أتمتة صناعة وتعديل الفيديوهات ومستقبل وظائف التصميم.',
      date: new Date().toISOString().split('T')[0],
      url: 'https://facebook.com',
      categoryEn: 'Strategy',
      categoryAr: 'توجيهات'
    };
    setPosts([newItem, ...posts]);
    setPostForm(newItem);
    setEditingId(newItem.id);
  };

  const handleCreateNewLink = () => {
    const newItem: MohamedKhaledLink = {
      id: `lnk-${Date.now()}`,
      nameEn: 'Bta3 Academy Link',
      nameAr: 'أكاديمية بتاع ديزاين الرقمية',
      platform: 'portfolio',
      url: 'https://bta3-design.rf.gd/',
      accent: 'bg-gradient-to-r from-cyan-500 to-blue-600',
      shadowColor: 'rgba(59, 130, 246, 0.4)',
      descriptionEn: 'Learn automated workflow design directly from case studies.',
      descriptionAr: 'تعلم أساليب أتمتة الإعلانات وتطبيقات الذكاء الاصطناعي.'
    };
    setLinks([...links, newItem]);
    setLinkForm(newItem);
    setEditingId(newItem.id);
  };

  const handleDeleteItem = (id: string) => {
    const msg = lang === 'ar' ? 'هل أنت متأكد من رغبتك في حذف هذا العنصر؟' : 'Are you sure you want to delete this item?';
    if (!window.confirm(msg)) return;
    
    if (activeTab === 'updates') {
      setUpdates(updates.filter(x => x.id !== id));
    } else if (activeTab === 'prompts') {
      setPrompts(prompts.filter(x => x.id !== id));
    } else if (activeTab === 'visuals') {
      setVisuals(visuals.filter(x => x.id !== id));
    } else if (activeTab === 'videos') {
      setVideos(videos.filter(x => x.id !== id));
    } else if (activeTab === 'posts') {
      setPosts(posts.filter(x => x.id !== id));
    } else if (activeTab === 'links') {
      setLinks(links.filter(x => x.id !== id));
    }
    
    if (editingId === id) setEditingId(null);
  };

  const handleEditItem = (item: any) => {
    setEditingId(item.id);
    if (activeTab === 'updates') setUpdateForm(item);
    else if (activeTab === 'prompts') setPromptForm(item);
    else if (activeTab === 'visuals') setVisualForm(item);
    else if (activeTab === 'videos') setVideoForm(item);
    else if (activeTab === 'posts') setPostForm(item);
    else if (activeTab === 'links') setLinkForm(item);
  };

  const handleSaveItem = () => {
    if (activeTab === 'updates' && editingId) {
      setUpdates(updates.map(x => x.id === editingId ? { ...x, ...updateForm } as AIUpdate : x));
    } else if (activeTab === 'prompts' && editingId) {
      setPrompts(prompts.map(x => x.id === editingId ? { ...x, ...promptForm } as PromptItem : x));
    } else if (activeTab === 'visuals' && editingId) {
      setVisuals(visuals.map(x => x.id === editingId ? { ...x, ...visualForm } as VisualItem : x));
    } else if (activeTab === 'videos' && editingId) {
      setVideos(videos.map(x => x.id === editingId ? { ...x, ...videoForm } as VideoItem : x));
    } else if (activeTab === 'posts' && editingId) {
      setPosts(posts.map(x => x.id === editingId ? { ...x, ...postForm } as SocialPost : x));
    } else if (activeTab === 'links' && editingId) {
      setLinks(links.map(x => x.id === editingId ? { ...x, ...linkForm } as MohamedKhaledLink : x));
    }
    setEditingId(null);
  };

  const handleSaveContactDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setContactDetails(contactForm);
    const successMsg = lang === 'ar' ? 'تم حفظ بيانات الاتصال بنجاح!' : 'Contact details saved successfully!';
    alert(successMsg);
  };

  return (
    <div className="bg-[#050B1C] min-h-screen text-slate-100 font-sans relative flex flex-col" style={{ direction: dir }}>
      {/* Abstract Grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3c8a_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

      {/* Auth Screen */}
      {!isAuthenticated ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-[90vh] relative z-10">
          <div className="absolute top-1/4 w-96 h-96 bg-[#2D6CDF]/10 blur-[120px] rounded-full pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-[#0D1B3D]/80 border border-[#1A3C8A] rounded-3xl p-8 shadow-2xl backdrop-blur-md relative"
          >
            {/* Back button */}
            <button 
              onClick={onClose}
              className="absolute top-5 left-5 text-[#66A9FF] hover:text-[#B7D6FF] flex items-center gap-1.5 text-xs font-semibold bg-[#1A3C8A]/35 px-2.5 py-1.5 rounded-lg transition"
              style={{ direction: 'ltr' }}
            >
              <ArrowLeft size={13} />
              <span>Back</span>
            </button>

            <div className="text-center mt-6 mb-8">
              <div className="w-16 h-16 bg-gradient-to-tr from-[#2D6CDF] to-[#66A9FF] rounded-2.5xl flex items-center justify-center text-white mx-auto shadow-lg shadow-[#2D6CDF]/20 mb-4">
                <Laptop size={32} />
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight uppercase">Bta3 AI Lab</h1>
              <p className="text-xs text-[#B7D6FF] font-mono mt-1 opacity-75">Admin Control Center</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-mono text-[#66A9FF] uppercase tracking-wider mb-2" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                  {lang === 'ar' ? 'كلمة مرور النظام' : 'Enter System Password'}
                </label>
                <div className="relative">
                  <input
                    id="admin-pwd-input"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-5 py-3.5 bg-[#050B1C]/80 border border-[#1A3C8A] rounded-xl text-white font-mono placeholder-zinc-600 focus:outline-none focus:border-[#2D6CDF] focus:ring-1 focus:ring-[#2D6CDF] text-center"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-[#66A9FF] hover:text-[#B7D6FF] transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {errorMsg && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-mono text-center"
                >
                  {errorMsg}
                </motion.div>
              )}

              <button
                id="admin-submit-btn"
                type="submit"
                className="w-full py-4 bg-[#2D6CDF] hover:bg-[#66A9FF] text-white font-bold rounded-xl transition shadow-lg shadow-[#2D6CDF]/20 hover:text-slate-900 active:scale-98"
              >
                {lang === 'ar' ? 'ولوج الغرفة الآمنة ←' : 'Access Dashboard Panel →'}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-[#1A3C8A]/40 text-center">
              <p className="text-[10px] font-mono text-zinc-500 uppercase">Authorized Personnel Only</p>
            </div>
          </motion.div>
        </div>
      ) : (
        /* Full Dashboard view */
        <div className="flex-1 flex flex-col min-h-screen relative z-10 overflow-hidden">
          {/* Dashboard Header Bar */}
          <header className="bg-[#0D1B3D] border-b border-[#1A3C8A] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2D6CDF] to-[#66A9FF] flex items-center justify-center text-white font-bold shadow-md shadow-[#2D6CDF]/15">
                <Laptop size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-black text-white tracking-widest uppercase">Bta3 AI Studio</h1>
                  <span className="text-[9px] font-mono font-bold bg-[#1A3C8A] text-[#B7D6FF] px-1.5 py-0.5 rounded">V1.5</span>
                </div>
                <p className="text-[10px] text-[#66A9FF] font-mono uppercase">Creative Content Editor Portal</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-xs font-mono border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition"
              >
                {lang === 'ar' ? 'خروج' : 'LOGOUT'}
              </button>
              <button
                onClick={onClose}
                className="p-2 bg-[#1A3C8A] border border-[#2D6CDF]/40 text-white rounded-lg hover:bg-[#2D6CDF] transition hover:shadow-cyan-500/20"
                title="Go to website homepage"
              >
                <X size={16} />
              </button>
            </div>
          </header>

          {/* Main layout context */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden max-h-[calc(100vh-73px)]">
            
            {/* Sidebar with Navigation Tabs */}
            <aside className="w-full lg:w-64 bg-[#0D1B3D]/50 border-r border-[#1A3C8A] p-4 flex flex-col justify-between overflow-y-auto shrink-0 md:max-h-[30vh] lg:max-h-full">
              <div className="space-y-1.5">
                <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-3" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                  {lang === 'ar' ? 'تعديل المحتوى والمواقع' : 'MANAGE WEBSITE SECTIONS'}
                </p>

                {([
                  { id: 'updates', label: 'AI Updates', labelAr: 'تحديثات الـ AI', icon: <FileText size={16} /> },
                  { id: 'prompts', label: 'AI Prompts', labelAr: 'البرومبتات', icon: <Key size={16} /> },
                  { id: 'visuals', label: 'Visual Gallery', labelAr: 'معرض الصور', icon: <Image size={16} /> },
                  { id: 'videos', label: 'Tutorial Videos', labelAr: 'شروحات الفيديو', icon: <Video size={16} /> },
                  { id: 'posts', label: 'Social Posts', labelAr: 'روابط البوستات', icon: <Share2 size={16} /> },
                  { id: 'links', label: 'Portfolio Links', labelAr: 'روابط الأعمال', icon: <Link2 size={16} /> },
                  { id: 'contact', label: 'Contact Info', labelAr: 'بيانات الاتصال', icon: <Phone size={16} /> },
                ] as const).map((tab) => (
                  <button
                    id={`admin-tab-btn-${tab.id}`}
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setEditingId(null);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition duration-150 ${
                      activeTab === tab.id
                        ? 'bg-[#1A3C8A] border border-[#2D6CDF] text-white shadow-[0_0_15px_rgba(45,108,223,0.15)]'
                        : 'text-[#B7D6FF]/70 hover:text-white hover:bg-[#1A3C8A]/30 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[#66A9FF]">{tab.icon}</span>
                      <span>{lang === 'ar' ? tab.labelAr : tab.label}</span>
                    </div>
                    <span className="text-[9px] font-mono bg-black/40 px-2 py-0.5 rounded-full text-[#66A9FF] border border-[#1A3C8A]/50">
                      {tab.id === 'updates' && updates.length}
                      {tab.id === 'prompts' && prompts.length}
                      {tab.id === 'visuals' && visuals.length}
                      {tab.id === 'videos' && videos.length}
                      {tab.id === 'posts' && posts.length}
                      {tab.id === 'links' && links.length}
                      {tab.id === 'contact' && 'Static'}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-8 p-4 bg-[#0D1B3D] border border-[#1A3C8A] rounded-xl flex items-center gap-2.5">
                <Info size={16} className="text-[#66A9FF]" />
                <p className="text-[10px] text-zinc-400 font-mono leading-relaxed">
                  Every saved item updates are stored locally. Sync changes in real time.
                </p>
              </div>
            </aside>

            {/* Editing and Listing screen area */}
            <main className="flex-1 flex flex-col md:flex-row overflow-hidden bg-black/40">
              
              {/* Left inner side: Item List (Hidden for contact info tab since it is static form card) */}
              {activeTab !== 'contact' && (
                <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-[#1A3C8A] flex flex-col overflow-hidden max-h-[35vh] md:max-h-full">
                  <div className="p-3 bg-[#0D1B3D]/30 border-b border-[#1A3C8A] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#66A9FF] uppercase tracking-wider">
                      {lang === 'ar' ? 'العناصر الحالية' : 'EXISTS RECORDS'}
                    </span>
                    <button
                      id="admin-add-new-btn"
                      onClick={() => {
                        if (activeTab === 'updates') handleCreateNewUpdate();
                        if (activeTab === 'prompts') handleCreateNewPrompt();
                        if (activeTab === 'visuals') handleCreateNewVisual();
                        if (activeTab === 'videos') handleCreateNewVideo();
                        if (activeTab === 'posts') handleCreateNewPost();
                        if (activeTab === 'links') handleCreateNewLink();
                      }}
                      className="px-3 py-1.5 bg-[#2D6CDF] hover:bg-[#66A9FF] text-white text-[10px] font-bold rounded-lg flex items-center gap-1 transition select-none"
                    >
                      <Plus size={12} />
                      <span>{t('ui.add_new')}</span>
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-[#050B1C]/30">
                    
                    {activeTab === 'updates' && updates.map((item) => (
                      <div
                        key={item.id}
                        className={`p-3 rounded-xl border flex flex-col transition cursor-pointer relative ${
                          editingId === item.id
                            ? 'bg-[#1A3C8A]/40 border-[#2D6CDF]'
                            : 'bg-[#0D1B3D]/20 border-[#1A3C8A] hover:bg-[#1A3C8A]/20'
                        }`}
                        onClick={() => handleEditItem(item)}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[9px] font-mono bg-[#1A3C8A] text-[#B7D6FF] px-1.5 py-0.5 rounded uppercase">
                            {item.categoryEn}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteItem(item.id);
                            }}
                            className="p-1 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded transition"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <h4 className="text-xs font-bold text-white truncate">
                          {lang === 'ar' ? item.titleAr : item.titleEn}
                        </h4>
                        <p className="text-[9px] text-zinc-500 font-mono mt-1 text-right">{item.date}</p>
                      </div>
                    ))}

                    {activeTab === 'prompts' && prompts.map((item) => (
                      <div
                        key={item.id}
                        className={`p-3 rounded-xl border flex flex-col transition cursor-pointer relative ${
                          editingId === item.id
                            ? 'bg-[#1A3C8A]/40 border-[#2D6CDF]'
                            : 'bg-[#0D1B3D]/20 border-[#1A3C8A] hover:bg-[#1A3C8A]/20'
                        }`}
                        onClick={() => handleEditItem(item)}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[9px] font-mono bg-[#1A3C8A] text-[#B7D6FF] px-1.5 py-0.5 rounded uppercase">
                            {item.categoryEn}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteItem(item.id);
                            }}
                            className="p-1 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded transition"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <h4 className="text-xs font-bold text-white truncate">
                          {lang === 'ar' ? item.titleAr : item.titleEn}
                        </h4>
                        <p className="text-[9px] font-mono text-[#66A9FF]/80 truncate mt-1 bg-black/35 p-1 rounded font-mono">
                          {item.promptText}
                        </p>
                      </div>
                    ))}

                    {activeTab === 'visuals' && visuals.map((item) => (
                      <div
                        key={item.id}
                        className={`p-3 rounded-xl border flex flex-col transition cursor-pointer relative ${
                          editingId === item.id
                            ? 'bg-[#1A3C8A]/40 border-[#2D6CDF]'
                            : 'bg-[#0D1B3D]/20 border-[#1A3C8A] hover:bg-[#1A3C8A]/20'
                        }`}
                        onClick={() => handleEditItem(item)}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[9px] font-mono bg-[#1A3C8A] text-[#B7D6FF] px-1.5 py-0.5 rounded uppercase">
                            IMAGE
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteItem(item.id);
                            }}
                            className="p-1 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded transition"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <div className="flex gap-2 items-center">
                          <img src={item.imageUrl} alt="" className="w-8 h-8 rounded bg-zinc-900 object-cover shrink-0" referrerPolicy="no-referrer" />
                          <h4 className="text-xs font-bold text-white truncate">
                            {lang === 'ar' ? item.titleAr : item.titleEn}
                          </h4>
                        </div>
                      </div>
                    ))}

                    {activeTab === 'videos' && videos.map((item) => (
                      <div
                        key={item.id}
                        className={`p-3 rounded-xl border flex flex-col transition cursor-pointer relative ${
                          editingId === item.id
                            ? 'bg-[#1A3C8A]/40 border-[#2D6CDF]'
                            : 'bg-[#0D1B3D]/20 border-[#1A3C8A] hover:bg-[#1A3C8A]/20'
                        }`}
                        onClick={() => handleEditItem(item)}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[9px] font-mono bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded uppercase">
                            VIDEO
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteItem(item.id);
                            }}
                            className="p-1 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded transition"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <h4 className="text-xs font-bold text-white truncate">
                          {lang === 'ar' ? item.titleAr : item.titleEn}
                        </h4>
                        <p className="text-[9px] text-[#66A9FF] font-mono mt-1">ID: {item.youtubeId}</p>
                      </div>
                    ))}

                    {activeTab === 'posts' && posts.map((item) => (
                      <div
                        key={item.id}
                        className={`p-3 rounded-xl border flex flex-col transition cursor-pointer relative ${
                          editingId === item.id
                            ? 'bg-[#1A3C8A]/40 border-[#2D6CDF]'
                            : 'bg-[#0D1B3D]/20 border-[#1A3C8A] hover:bg-[#1A3C8A]/20'
                        }`}
                        onClick={() => handleEditItem(item)}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[9px] font-mono bg-[#2D6CDF]/15 text-[#66A9FF] px-1.5 py-0.5 rounded uppercase">
                            {item.platform}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteItem(item.id);
                            }}
                            className="p-1 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded transition"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <h4 className="text-xs font-bold text-white truncate">
                          {lang === 'ar' ? item.titleAr : item.titleEn}
                        </h4>
                      </div>
                    ))}

                    {activeTab === 'links' && links.map((item) => (
                      <div
                        key={item.id}
                        className={`p-3 rounded-xl border flex flex-col transition cursor-pointer relative ${
                          editingId === item.id
                            ? 'bg-[#1A3C8A]/40 border-[#2D6CDF]'
                            : 'bg-[#0D1B3D]/20 border-[#1A3C8A] hover:bg-[#1A3C8A]/20'
                        }`}
                        onClick={() => handleEditItem(item)}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded uppercase font-bold">
                            {item.platform}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteItem(item.id);
                            }}
                            className="p-1 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded transition"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <h4 className="text-xs font-bold text-white truncate">
                          {lang === 'ar' ? item.nameAr : item.nameEn}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Right inner side: Complete form editor */}
              <div className="flex-1 p-6 overflow-y-auto">
                {activeTab === 'contact' ? (
                  /* Form: Contact Info (Direct Settings Page) */
                  <form onSubmit={handleSaveContactDetails} className="space-y-6 max-w-4xl">
                    <div className="p-4 bg-[#1A3C8A]/20 border border-[#1A3C8A] rounded-2xl">
                      <h3 className="text-sm font-black text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                        <Phone size={16} className="text-[#66A9FF]" />
                        <span>Direct Channel Line 01 (e.g. Vodafone)</span>
                      </h3>
                      <p className="text-xs text-[#B7D6FF] mb-4">Edit direct WhatsApp connect and displays</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Phone Number (Keep with country code)</label>
                          <input 
                            type="text" 
                            className="w-full bg-[#050B1C] border border-[#1A3C8A] p-2.5 rounded-lg text-white font-mono text-xs"
                            value={contactForm.phone1}
                            onChange={(e) => setContactForm({ ...contactForm, phone1: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Label English</label>
                          <input 
                            type="text" 
                            className="w-full bg-[#050B1C] border border-[#1A3C8A] p-2.5 rounded-lg text-white font-mono text-xs"
                            value={contactForm.phone1LabelEn}
                            onChange={(e) => setContactForm({ ...contactForm, phone1LabelEn: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Label Arabic</label>
                          <input 
                            type="text" 
                            className="w-full bg-[#050B1C] border border-[#1A3C8A] p-2.5 rounded-lg text-white font-bold text-xs"
                            value={contactForm.phone1LabelAr}
                            onChange={(e) => setContactForm({ ...contactForm, phone1LabelAr: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-[#1A3C8A]/20 border border-[#1A3C8A] rounded-2xl">
                      <h3 className="text-sm font-black text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                        <Phone size={16} className="text-[#66A9FF]" />
                        <span>Direct Channel Line 02 (e.g. Orange / Alternative)</span>
                      </h3>
                      <p className="text-xs text-[#B7D6FF] mb-4">Edit alternative direct connect line</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Phone Number (Keep with country code)</label>
                          <input 
                            type="text" 
                            className="w-full bg-[#050B1C] border border-[#1A3C8A] p-2.5 rounded-lg text-white font-mono text-xs"
                            value={contactForm.phone2}
                            onChange={(e) => setContactForm({ ...contactForm, phone2: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Label English</label>
                          <input 
                            type="text" 
                            className="w-full bg-[#050B1C] border border-[#1A3C8A] p-2.5 rounded-lg text-white font-mono text-xs"
                            value={contactForm.phone2LabelEn}
                            onChange={(e) => setContactForm({ ...contactForm, phone2LabelEn: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Label Arabic</label>
                          <input 
                            type="text" 
                            className="w-full bg-[#050B1C] border border-[#1A3C8A] p-2.5 rounded-lg text-white font-bold text-xs"
                            value={contactForm.phone2LabelAr}
                            onChange={(e) => setContactForm({ ...contactForm, phone2LabelAr: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-[#1A3C8A]/20 border border-[#1A3C8A] rounded-2xl">
                      <h3 className="text-sm font-black text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                        <Mail size={16} className="text-[#66A9FF]" />
                        <span>Electronic Inquiries Email Account 01</span>
                      </h3>
                      <p className="text-xs text-[#B7D6FF] mb-4">Edit priority email address displays and mail links</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Email Address</label>
                          <input 
                            type="email" 
                            className="w-full bg-[#050B1C] border border-[#1A3C8A] p-2.5 rounded-lg text-white font-mono text-xs"
                            value={contactForm.email1}
                            onChange={(e) => setContactForm({ ...contactForm, email1: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Label English</label>
                          <input 
                            type="text" 
                            className="w-full bg-[#050B1C] border border-[#1A3C8A] p-2.5 rounded-lg text-white font-mono text-xs"
                            value={contactForm.email1LabelEn}
                            onChange={(e) => setContactForm({ ...contactForm, email1LabelEn: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Label Arabic</label>
                          <input 
                            type="text" 
                            className="w-full bg-[#050B1C] border border-[#1A3C8A] p-2.5 rounded-lg text-white font-bold text-xs"
                            value={contactForm.email1LabelAr}
                            onChange={(e) => setContactForm({ ...contactForm, email1LabelAr: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-[#1A3C8A]/20 border border-[#1A3C8A] rounded-2xl">
                      <h3 className="text-sm font-black text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                        <Mail size={16} className="text-[#66A9FF]" />
                        <span>Electronic Inquiries Email Account 02</span>
                      </h3>
                      <p className="text-xs text-[#B7D6FF] mb-4">Edit secondary email address displays</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Email Address</label>
                          <input 
                            type="email" 
                            className="w-full bg-[#050B1C] border border-[#1A3C8A] p-2.5 rounded-lg text-white font-mono text-xs"
                            value={contactForm.email2}
                            onChange={(e) => setContactForm({ ...contactForm, email2: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Label English</label>
                          <input 
                            type="text" 
                            className="w-full bg-[#050B1C] border border-[#1A3C8A] p-2.5 rounded-lg text-white font-mono text-xs"
                            value={contactForm.email2LabelEn}
                            onChange={(e) => setContactForm({ ...contactForm, email2LabelEn: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Label Arabic</label>
                          <input 
                            type="text" 
                            className="w-full bg-[#050B1C] border border-[#1A3C8A] p-2.5 rounded-lg text-white font-bold text-xs"
                            value={contactForm.email2LabelAr}
                            onChange={(e) => setContactForm({ ...contactForm, email2LabelAr: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#2D6CDF] hover:bg-[#66A9FF] text-white hover:text-slate-900 font-bold rounded-xl transition shadow-lg shadow-[#2D6CDF]/15 flex items-center gap-2"
                    >
                      <Save size={16} />
                      <span>{lang === 'ar' ? 'حفظ إعدادات الاتصال' : 'Save Contact Channels'}</span>
                    </button>
                  </form>
                ) : editingId ? (
                  /* Standard dynamic forms (stacked bilingual fields for best translation experience) */
                  <div className="space-y-6 max-w-4xl bg-[#0D1B3D]/30 border border-[#1A3C8A] p-6 rounded-3xl relative">
                    
                    <div className="flex justify-between items-center pb-4 border-b border-[#1A3C8A]/40 mb-4">
                      <div className="flex items-center gap-2 font-mono text-[#66A9FF] text-xs">
                        <Check size={14} />
                        <span>Active Item Editing: {editingId}</span>
                      </div>
                      <button
                        onClick={handleSaveItem}
                        className="px-4 py-2 bg-[#2D6CDF] hover:bg-[#66A9FF] text-white hover:text-slate-900 font-bold text-xs rounded-xl flex items-center gap-1.5 transition uppercase"
                      >
                        <Save size={14} />
                        <span>Save This Item</span>
                      </button>
                    </div>

                    {/* tab=Updates Form */}
                    {activeTab === 'updates' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Update Title (English)</label>
                            <input
                              type="text"
                              value={updateForm.titleEn || ''}
                              onChange={(e) => setUpdateForm({ ...updateForm, titleEn: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1 text-right">عنوان التحديث (عربي)</label>
                            <input
                              type="text"
                              value={updateForm.titleAr || ''}
                              onChange={(e) => setUpdateForm({ ...updateForm, titleAr: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white text-right font-bold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Content Body (English)</label>
                            <textarea
                              rows={4}
                              value={updateForm.contentEn || ''}
                              onChange={(e) => setUpdateForm({ ...updateForm, contentEn: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1 text-right">تفاصيل التحديث باللغة العربية</label>
                            <textarea
                              rows={4}
                              value={updateForm.contentAr || ''}
                              onChange={(e) => setUpdateForm({ ...updateForm, contentAr: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white text-right font-bold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Category (English)</label>
                            <input
                              type="text"
                              value={updateForm.categoryEn || ''}
                              onChange={(e) => setUpdateForm({ ...updateForm, categoryEn: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">الفئة بالعربية</label>
                            <input
                              type="text"
                              value={updateForm.categoryAr || ''}
                              onChange={(e) => setUpdateForm({ ...updateForm, categoryAr: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Date</label>
                            <input
                              type="text"
                              value={updateForm.date || ''}
                              onChange={(e) => setUpdateForm({ ...updateForm, date: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white font-mono"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Image URL</label>
                            <input
                              type="text"
                              value={updateForm.imageUrl || ''}
                              onChange={(e) => setUpdateForm({ ...updateForm, imageUrl: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Source Target URL</label>
                            <input
                              type="text"
                              value={updateForm.sourceUrl || ''}
                              onChange={(e) => setUpdateForm({ ...updateForm, sourceUrl: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* tab=Prompts Form */}
                    {activeTab === 'prompts' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Prompt Name (English)</label>
                            <input
                              type="text"
                              value={promptForm.titleEn || ''}
                              onChange={(e) => setPromptForm({ ...promptForm, titleEn: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1 text-right">اسم الأمر - البرومبت (عربي)</label>
                            <input
                              type="text"
                              value={promptForm.titleAr || ''}
                              onChange={(e) => setPromptForm({ ...promptForm, titleAr: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white text-right font-bold"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">RAW Prompt Command Text (Copy Button Target)</label>
                          <textarea
                            rows={3}
                            value={promptForm.promptText || ''}
                            onChange={(e) => setPromptForm({ ...promptForm, promptText: e.target.value })}
                            className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-emerald-400 font-mono"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Short Context (English)</label>
                            <input
                              type="text"
                              value={promptForm.descriptionEn || ''}
                              onChange={(e) => setPromptForm({ ...promptForm, descriptionEn: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1 text-right">الوصف الموجز بالعربية</label>
                            <input
                              type="text"
                              value={promptForm.descriptionAr || ''}
                              onChange={(e) => setPromptForm({ ...promptForm, descriptionAr: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white text-right font-bold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Category (e.g. Midjourney)</label>
                            <input
                              type="text"
                              value={promptForm.categoryEn || ''}
                              onChange={(e) => setPromptForm({ ...promptForm, categoryEn: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">الفئة بالعربية</label>
                            <input
                              type="text"
                              value={promptForm.categoryAr || ''}
                              onChange={(e) => setPromptForm({ ...promptForm, categoryAr: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white font-bold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">AI Tool Platform (e.g. Midjourney v6.1)</label>
                            <input
                              type="text"
                              value={promptForm.aiTool || ''}
                              placeholder="Midjourney, ChatGPT, Stable Diffusion"
                              onChange={(e) => setPromptForm({ ...promptForm, aiTool: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Multiple Design Previews (separated by comma)</label>
                            <input
                              type="text"
                              value={promptForm.previewImages ? promptForm.previewImages.join(', ') : ''}
                              placeholder="https://img1.png, https://img2.png"
                              onChange={(e) => setPromptForm({ ...promptForm, previewImages: e.target.value.split(',').map(s => s.trim()) })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white font-mono"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Before Comparison Image (Optional)</label>
                            <input
                              type="text"
                              value={promptForm.beforeImage || ''}
                              placeholder="https://images.unsplash.com/before-image..."
                              onChange={(e) => setPromptForm({ ...promptForm, beforeImage: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">After Comparison Image (Optional)</label>
                            <input
                              type="text"
                              value={promptForm.afterImage || ''}
                              placeholder="https://images.unsplash.com/after-image..."
                              onChange={(e) => setPromptForm({ ...promptForm, afterImage: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* tab=Visuals Form */}
                    {activeTab === 'visuals' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Visual Art Title (English)</label>
                            <input
                              type="text"
                              value={visualForm.titleEn || ''}
                              onChange={(e) => setVisualForm({ ...visualForm, titleEn: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1 text-right">اسم اللوحة الفنية (عربي)</label>
                            <input
                              type="text"
                              value={visualForm.titleAr || ''}
                              onChange={(e) => setVisualForm({ ...visualForm, titleAr: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white text-right font-bold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Description (English)</label>
                            <textarea
                              rows={3}
                              value={visualForm.descriptionEn || ''}
                              onChange={(e) => setVisualForm({ ...visualForm, descriptionEn: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1 text-right">الوصف الفني التفصيلي بالعربية</label>
                            <textarea
                              rows={3}
                              value={visualForm.descriptionAr || ''}
                              onChange={(e) => setVisualForm({ ...visualForm, descriptionAr: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white text-right font-bold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Image URL</label>
                            <input
                              type="text"
                              value={visualForm.imageUrl || ''}
                              onChange={(e) => setVisualForm({ ...visualForm, imageUrl: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Creation Date</label>
                            <input
                              type="text"
                              value={visualForm.createdAt || ''}
                              onChange={(e) => setVisualForm({ ...visualForm, createdAt: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* tab=Videos Form */}
                    {activeTab === 'videos' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Tutorial Title (English)</label>
                            <input
                              type="text"
                              value={videoForm.titleEn || ''}
                              onChange={(e) => setVideoForm({ ...videoForm, titleEn: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1 text-right">عنوان الشرح بالفيديو (عربي)</label>
                            <input
                              type="text"
                              value={videoForm.titleAr || ''}
                              onChange={(e) => setVideoForm({ ...videoForm, titleAr: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white text-right font-bold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Description (English)</label>
                            <textarea
                              rows={3}
                              value={videoForm.descriptionEn || ''}
                              onChange={(e) => setVideoForm({ ...videoForm, descriptionEn: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1 text-right">الوصف بالعربية</label>
                            <textarea
                              rows={3}
                              value={videoForm.descriptionAr || ''}
                              onChange={(e) => setVideoForm({ ...videoForm, descriptionAr: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white text-right font-bold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">YouTube Video ID (e.g. dQw4w9WgXcQ)</label>
                            <input
                              type="text"
                              value={videoForm.youtubeId || ''}
                              onChange={(e) => setVideoForm({ ...videoForm, youtubeId: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Video Duration (e.g. 12:40)</label>
                            <input
                              type="text"
                              value={videoForm.duration || ''}
                              onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Category (English)</label>
                            <input
                              type="text"
                              value={videoForm.categoryEn || ''}
                              onChange={(e) => setVideoForm({ ...videoForm, categoryEn: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* tab=Posts Form */}
                    {activeTab === 'posts' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Post / Link Title (English)</label>
                            <input
                              type="text"
                              value={postForm.titleEn || ''}
                              onChange={(e) => setPostForm({ ...postForm, titleEn: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1 text-right">عنوان المنشور البوست (عربي)</label>
                            <input
                              type="text"
                              value={postForm.titleAr || ''}
                              onChange={(e) => setPostForm({ ...postForm, titleAr: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white text-right font-bold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Description (English)</label>
                            <textarea
                              rows={3}
                              value={postForm.descriptionEn || ''}
                              onChange={(e) => setPostForm({ ...postForm, descriptionEn: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1 text-right">وصف المنشور البوست باللغة العربية</label>
                            <textarea
                              rows={3}
                              value={postForm.descriptionAr || ''}
                              onChange={(e) => setPostForm({ ...postForm, descriptionAr: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white text-right font-bold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Platform</label>
                            <select
                              value={postForm.platform || 'facebook'}
                              onChange={(e) => setPostForm({ ...postForm, platform: e.target.value as any })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white font-mono"
                            >
                              <option value="facebook">Facebook</option>
                              <option value="instagram">Instagram</option>
                              <option value="linkedin">LinkedIn</option>
                              <option value="behance">Behance</option>
                              <option value="youtube">YouTube</option>
                              <option value="tiktok">TikTok</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1 font-bold">Target URL</label>
                            <input
                              type="text"
                              value={postForm.url || ''}
                              onChange={(e) => setPostForm({ ...postForm, url: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Category (English)</label>
                            <input
                              type="text"
                              value={postForm.categoryEn || ''}
                              onChange={(e) => setPostForm({ ...postForm, categoryEn: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1 text-right">الفئة بالعربية</label>
                            <input
                              type="text"
                              value={postForm.categoryAr || ''}
                              onChange={(e) => setPostForm({ ...postForm, categoryAr: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white text-right font-bold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Cover Image URL</label>
                            <input
                              type="text"
                              value={postForm.coverImage || ''}
                              placeholder="https://images.unsplash.com/..."
                              onChange={(e) => setPostForm({ ...postForm, coverImage: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Publish Date</label>
                            <input
                              type="text"
                              value={postForm.date || ''}
                              onChange={(e) => setPostForm({ ...postForm, date: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* tab=Links Form */}
                    {activeTab === 'links' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Link Label (English)</label>
                            <input
                              type="text"
                              value={linkForm.nameEn || ''}
                              onChange={(e) => setLinkForm({ ...linkForm, nameEn: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1 text-right">عنوان الرابط البارز (عربي)</label>
                            <input
                              type="text"
                              value={linkForm.nameAr || ''}
                              onChange={(e) => setLinkForm({ ...linkForm, nameAr: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white text-right font-bold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Description (English)</label>
                            <textarea
                              rows={3}
                              value={linkForm.descriptionEn || ''}
                              onChange={(e) => setLinkForm({ ...linkForm, descriptionEn: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1 text-right">الوصف الموجز لهوية الرابط بالعربية</label>
                            <textarea
                              rows={3}
                              value={linkForm.descriptionAr || ''}
                              onChange={(e) => setLinkForm({ ...linkForm, descriptionAr: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white text-right font-bold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Platform / Format</label>
                            <select
                              value={linkForm.platform || 'portfolio'}
                              onChange={(e) => setLinkForm({ ...linkForm, platform: e.target.value as any })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white font-mono"
                            >
                              <option value="portfolio">Portfolio Hub</option>
                              <option value="facebook">Facebook</option>
                              <option value="instagram">Instagram</option>
                              <option value="linkedin">LinkedIn</option>
                              <option value="behance">Behance</option>
                              <option value="youtube">YouTube</option>
                            </select>
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Target Link URL</label>
                            <input
                              type="text"
                              value={linkForm.url || ''}
                              onChange={(e) => setLinkForm({ ...linkForm, url: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white font-mono"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[#1A3C8A]/10 border border-[#1A3C8A]/30 rounded-xl">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Tailwind Accent CSS (e.g. bg-gradient-to-r ...)</label>
                            <input
                              type="text"
                              value={linkForm.accent || ''}
                              onChange={(e) => setLinkForm({ ...linkForm, accent: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white font-mono text-[#66A9FF]"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Glow Shadow RGBA CSS (e.g. rgba(59,130,246,0.4))</label>
                            <input
                              type="text"
                              value={linkForm.shadowColor || ''}
                              onChange={(e) => setLinkForm({ ...linkForm, shadowColor: e.target.value })}
                              className="w-full bg-[#050B1C] border border-[#1A3C8A] rounded-lg p-2.5 text-xs text-white font-mono text-[#66A9FF]"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                ) : (
                  /* No item selected state */
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-[#0D1B3D]/10 border border-[#1A3C8A]/25 rounded-3xl">
                    <Laptop size={44} className="text-[#66A9FF] mb-3 opacity-60 animate-pulse" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1"> {lang === 'ar' ? 'قم بتحديد عنصر لتعديله' : 'CHOOSE AN ITEM'}</h3>
                    <p className="text-xs text-[#B7D6FF] max-w-xs leading-relaxed">
                      Select any existing updates, prompts, or links on the left side menu to edit values, or tap the green "Add New" button to create an item.
                    </p>
                  </div>
                )}
              </div>

            </main>

          </div>
        </div>
      )}
    </div>
  );
};
