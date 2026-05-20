import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  lang: Language;
  dir: 'ltr' | 'rtl';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav translations
    'nav.home': 'Home',
    'nav.updates': 'AI Updates',
    'nav.prompts': 'Prompts',
    'nav.visuals': 'Visuals',
    'nav.videos': 'Videos',
    'nav.posts': 'Posts',
    'nav.portfolio': 'Portfolio',
    'nav.connect': 'Connect',

    // Hero translations
    'hero.title': 'The Future of AI Creativity Starts Here.',
    'hero.sub': 'Bta3 Design Laboratory',
    'hero.greeting': 'Hi, I am Mohamed Khaled',
    'hero.desc': 'Graphic Designer & AI Content Creator based in Egypt. I merge advanced AI models, creative visual direction, and design automation to build next-generation content pipeline tutorials.',
    'hero.cta_portfolio': 'View My Works',
    'hero.cta_connect': 'Reach Out Now',
    'hero.stats.studios': 'Active Channels',
    'hero.stats.prompts': 'Shared Prompts',
    'hero.stats.projects': 'Artworks Built',

    // Section headers
    'section.updates.title': 'AI Updates',
    'section.updates.sub': 'Latest developments in the world of generative AI, tools, and creative automation.',
    'section.prompts.title': 'AI Prompts Vault',
    'section.prompts.sub': 'Unlock highly optimized, battle-tested system prompts for visual design, video editing, and text generation.',
    'section.visuals.title': 'Visual Gallery',
    'section.visuals.sub': 'Curation of graphic designs, synthetic art, and automated creative experiments.',
    'section.videos.title': 'Tutorial Videos',
    'section.videos.sub': 'Deep dives, design tutorials, workflows, and automated pipeline video guides.',
    'section.posts.title': 'Social Posts',
    'section.posts.sub': 'Latest links and articles shared across Facebook, Instagram, LinkedIn, Behance, and YouTube.',
    'section.portfolio.title': 'Mohamed Khaled Links',
    'section.portfolio.sub': 'Connect with me directly and explore my works on professional design portals.',
    'section.about.title': 'About Mohamed Khaled',
    'section.connect.title': 'Connect With Me',
    'section.connect.sub': 'Looking to collaborate, set up automation workflows, or design custom assets? Let\'s talk!',

    // General UI
    'ui.search_placeholder': 'Search content, prompts, or updates...',
    'ui.all_categories': 'All Categories',
    'ui.copy_prompt': 'Copy Prompt',
    'ui.copied': 'Copied to Clipboard!',
    'ui.external_link': 'View Live Post',
    'ui.whatsapp_chat': 'Chat on WhatsApp',
    'ui.email_send': 'Send Email Address',
    'ui.admin_panel': 'Content Editor',
    'ui.admin_button': 'Control Center',
    'ui.close': 'Close',
    'ui.save': 'Save Changes',
    'ui.delete': 'Delete',
    'ui.add_new': 'Add New Item',
    'ui.edit': 'Edit',
    'ui.placeholder_no_data': 'No items matching criteria found. Enter Admin Control to populate custom entries!',

    // Contact Form
    'form.name': 'Your Name',
    'form.email': 'Your Email',
    'form.message': 'Your Message',
    'form.service': 'Interested Service',
    'form.service.default': 'Select service or project scope...',
    'form.service.ui': 'UI/UX & Branding',
    'form.service.ai': 'AI Workflows & Prompts Engineering',
    'form.service.video': 'Video Editing & VFX Production',
    'form.service.automation': 'Automated Content Creation',
    'form.service.other': 'Other Inquiries / Collaboration',
    'form.send': 'Send Message',
    'form.success': 'Your message has been sent successfully! Mohamed Khaled will respond shortly.',
    'form.error': 'Error submitting message. Please email directly or ping on WhatsApp.',

    // About box
    'about.bio': 'Mohamed Khaled is a Graphic Designer and AI Content Creator from Egypt, focused on combining design, AI tools, video editing, automation, and creative workflows to build high-quality digital content and tutorials under the Bta3 Design brand.',
    
    // Admin stuff
    'admin.password': 'Admin Password',
    'admin.login': 'Access Panel',
    'admin.logout': 'Exit Editor',
    'admin.incorrect': 'Incorrect credentials!',
    'admin.fields': 'Enter properties in English & Arabic.',
    'admin.confirm_delete': 'Are you sure you want to delete this item?'
  },
  ar: {
    // Nav translations
    'nav.home': 'الرئيسية',
    'nav.updates': 'تحديثات AI',
    'nav.prompts': 'البرومبتات',
    'nav.visuals': 'الصور',
    'nav.videos': 'الفيديوهات',
    'nav.posts': 'البوستات',
    'nav.portfolio': 'الأعمال',
    'nav.connect': 'تواصل',

    // Hero translations
    'hero.title': 'مستقبل الإبداع بالذكاء الاصطناعي يبدأ من هنا',
    'hero.sub': 'مختبر بتاع ديزاين الرقمي',
    'hero.greeting': 'أهلاً بك، أنا محمد خالد',
    'hero.desc': 'مصمم جرافيك وصانع محتوى ذكاء اصطناعي مصري. أدمج تقنيات الذكاء الاصطناعي المتقدمة مع التوجيه الفني البصري والأتمتة لابتكار وتطوير دروس ونظم متميزة للمحتوى الرقمي.',
    'hero.cta_portfolio': 'تصفح أعمالي',
    'hero.cta_connect': 'تواصل معي الآن',
    'hero.stats.studios': 'القنوات النشطة',
    'hero.stats.prompts': 'الأوامر المشتركة',
    'hero.stats.projects': 'الأعمال الإبداعية',

    // Section headers
    'section.updates.title': 'تحديثات الـ AI',
    'section.updates.sub': 'أحدث الأخبار التكنولوجية في عالم الذكاء الاصطناعي التوليدي، الأدوات الحديثة والأتمتة الإبداعية.',
    'section.prompts.title': 'خزانة البرومبتات (الأوامر)',
    'section.prompts.sub': 'اكتشف وانسخ أوامر ذكية واحترافية جاهزة ومجربة مخصصة لمنصات توليد الصور، النصوص، ومونتاج الفيديو.',
    'section.visuals.title': 'معرض الصور الإبداعية',
    'section.visuals.sub': 'ألبوم متميز يجمع بين التصاميم الجرافيكية والفنون المستوحاة والمنتجة بواسطة الذكاء الاصطناعي.',
    'section.videos.title': 'الفيديوهات التعليمية',
    'section.videos.sub': 'شروحات تفصيلية، دروس تصميم عملية، وطرق أتمتة صناعة المحتوى البصري.',
    'section.posts.title': 'البوستات والمقالات',
    'section.posts.sub': 'صفحة متكاملة تجمع روابط منشوراتي التعليمية والتفاعلية المنشورة على فيسبوك، انستجرام، لينكد إن، وبيهانس.',
    'section.portfolio.title': 'روابط محمد خالد - الأعمال',
    'section.portfolio.sub': 'يرحب بكم محمد خالد لتصفح أعماله وشبكات تواصله عبر المنصات الرسمية التالية.',
    'section.about.title': 'عن محمد خالد',
    'section.connect.title': 'تواصل معايا',
    'section.connect.sub': 'هل ترغب في بدء تعاون إبداعي، بناء تصميمات حصرية، أو أتمتة خطوط صناعة المحتوى الخاص بك؟ لنتحدث!',

    // General UI
    'ui.search_placeholder': 'ابحث عن أخبار، برومبتات أو صور...',
    'ui.all_categories': 'جميع الفئات',
    'ui.copy_prompt': 'نسخ الأمر',
    'ui.copied': 'تم النسخ إلى الحافظة بنجاح!',
    'ui.external_link': 'عرض المنشور الأصلي',
    'ui.whatsapp_chat': 'تواصل عبر واتساب',
    'ui.email_send': 'ارسل ايميل سريع',
    'ui.admin_panel': 'لوحة تعديل المحتوى',
    'ui.admin_button': 'مركز التحكم',
    'ui.close': 'إغلاق',
    'ui.save': 'حفظ التغييرات',
    'ui.delete': 'حذف',
    'ui.add_new': 'إضافة عنصر جديد',
    'ui.edit': 'تعديل',
    'ui.placeholder_no_data': 'لم نعثر على عناصر تطابق البحث. ادخل لوحة التحكم لإضافة عناصر خاصة بك!',

    // Contact Form
    'form.name': 'اسمك الكريم',
    'form.email': 'بريدك الإلكتروني',
    'form.message': 'محتوى رسالتك',
    'form.service': 'الخدمة المطلوبة',
    'form.service.default': 'اختر مجال المشروع المقترح...',
    'form.service.ui': 'تصميم واجهات المستخدم والهوية البصرية',
    'form.service.ai': 'هندسة البرومبت وابتكار أدوات ذكاء اصطناعي',
    'form.service.video': 'مونتاج وتعديل الفيديو وصناعة المؤثرات',
    'form.service.automation': 'أتمتة صناعة المحتوى بطرق ذكية',
    'form.service.other': 'استفسارات أخرى / تعاون إبداعي والتدريب',
    'form.send': 'إرسال الرسالة',
    'form.success': 'تم إرسال رسالتك بنجاح! سيقوم محمد خالد بالتواصل معك قريباً جداً.',
    'form.error': 'حدث خطأ أثناء الإرسال. من فضلك استخدم زر واتساب أو البريد مباشرة.',

    // About box
    'about.bio': 'محمد خالد مصمم جرافيك وصانع محتوى ذكاء اصطناعي من مصر، يركز على الدمج بين مجالات التصميم، أدوات الـ AI، المونتاج تدوين الفيديو، الأتمتة البرمجية، وصناعة الخطوط الإبداعية لبناء محتوى تعليمي ورقمي فاخر بمستوى عالي تحت العلامة التجارية "بتاع ديزاين - Bta3 Design".',
    
    // Admin stuff
    'admin.password': 'كلمة مرور الإدارة',
    'admin.login': 'دخول اللوحة',
    'admin.logout': 'تسجيل خروج الغرفة',
    'admin.incorrect': 'كلمة مرور خاطئة!',
    'admin.fields': 'برجاء ملء الحقول باللغة العربية والإنجليزية.',
    'admin.confirm_delete': 'هل أنت متأكد تماماً من حذف هذا العنصر؟'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('bta3_lang');
    if (saved === 'en' || saved === 'ar') return saved;
    // Default to 'ar' since Mohamed Khalid is Egyptian and the brand name "Bta3 Design" is Arabic,
    // but default-to-Arabic helps showcase bilingual support excellently.
    return 'ar';
  });

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    localStorage.setItem('bta3_lang', lang);
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang, dir]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key: string): string => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, dir, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
