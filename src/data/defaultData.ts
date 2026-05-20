import { AIUpdate, PromptItem, VisualItem, VideoItem, SocialPost, MohamedKhaledLink, ContactDetails } from '../types';

export const defaultAIUpdates: AIUpdate[] = [
  {
    id: 'upd-1',
    titleEn: 'Midjourney v6.5 Release: High-Fidelity Design Textures and Layout Controls',
    titleAr: 'إطلاق ميدجورني v6.5: جودة تفاصيل فائقة للديكور وعناصر تصميم متقدمة',
    contentEn: 'The new Midjourney update brings incredible realism to textures, textiles, and typographic alignment. Creative directors are utilizing it to draft high-fidelity packaging mockups and visual grids instantly. Our new workflows combine Midjourney assets with Photoshop Generative Fill for perfect social media creatives.',
    contentAr: 'يقدم تحديث ميدجورني الجديد مستويات واقعية غير مسبوقة للأنسجة، وتنسيق النصوص البرمجية داخل الصور. يستثمر مصممو الهويات البصرية هذا التحديث لبناء نماذج تغليف للمنتجات بدقة مذهلة. نقدم لكم طرق دمج هذه الصور مع Photoshop Generative Fill لابتكار تصميمات سوشل ميديا إبداعية.',
    categoryEn: 'Generative Art',
    categoryAr: 'الفنون التوليدية',
    date: '2026-05-18',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    sourceUrl: 'https://midjourney.com'
  },
  {
    id: 'upd-2',
    titleEn: 'Next-Gen AI Video Pipelines: Transitioning from Runway Gen-3 to Sora for Production',
    titleAr: 'الجيل القادم من إنتاج الفيديو بالذكاء الاصطناعي: الانتقال من Runway إلى Sora',
    contentEn: 'In our latest tutorials under the Bta3 Design brand, we demonstrate how to stitch scene dynamics from Runway Gen-3 Alpha with precise speed ramps. OpenAI Sora APIs now deliver perfect spatial temporal coherence, making automated short-form reels incredibly easy to produce.',
    contentAr: 'في أحدث شروحاتنا تحت اسم بتاع ديزاين، نوضح كيفية دمج حركات المشاهد من Runway Gen-3 Alpha مع تسريع وتأطير الحركات بالتوقيت المثالي. توفر واجهات Sora الترابط الحركي والمنظور الخالي من العيوب لتسهيل أتمتة صناعة الفيديوهات الرأسية والقصيرة.',
    categoryEn: 'Video Automation',
    categoryAr: 'أتمتة الفيديو',
    date: '2026-05-10',
    imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'upd-3',
    titleEn: 'Claude 4 Autopilot for Graphic Design Scripting & Illustrator Automation',
    titleAr: 'توظيف كلود 4 لأتمتة ورش عمل أدوبي إليستريتور وتوليد الأكواد الفنية',
    contentEn: 'We built an automated script utilizing Claude 4 to export multi-format vector assets with single prompt requests. This reduces manual resizing on social campaigns by up to 90%, allowing designers to focus strictly on prompt engineering and brand aesthetics.',
    contentAr: 'قمنا ببناء كود برمجي ذكي باستخدام Claude 4 لتصدير ملفات فيكتور بصيغ متعددة بطلب واحد فقط. هذه الطريقة توفر أكثر من 90٪ من الوقت المبذول في التصميم اليدوي لإعلانات ومقاسات حملات السوشل ميديا المختلفة، مما يساعد المصممين على التركيز الكلي على هندسة الأوامر وذكاء الهويات.',
    categoryEn: 'Workflows & Automation',
    categoryAr: 'أتمتة العمل',
    date: '2026-05-02',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80'
  }
];

export const defaultPrompts: PromptItem[] = [
  {
    id: 'prm-1',
    titleEn: 'Photoreal Studio Product Mockup (Midjourney)',
    titleAr: 'نموذج منتج استوديو واقعي (ميدجورني)',
    categoryEn: 'Midjourney',
    categoryAr: 'ميدجورني',
    promptText: '/imagine prompt: Premium sleek cosmetic bottle, standing on wet black obsidian stone, dynamic water splashes, volumetric cinematic studio neon cyan and deep magenta lighting, raytracing, shot on Hasselblad 85mm, extremely detailed packaging textures, unreal engine 5 render, award winning product design --ar 4:5 --v 6.0',
    descriptionEn: 'Generates extremely crisp, high-end packaging designs and cosmetic renders suitable for premium visual advertisements.',
    descriptionAr: 'يولد تصميمات تغليف للمنتجات عالية الجودة، عبوة مستحضرات تجميل فخمة مع إضاءة نيون وسوائل ديناميكية مناسبة للحملات الإعلانية الفاخرة.',
    tags: ['Product', '3D Style', 'Neon', 'Midjourney'],
    aiTool: 'Midjourney v6.1',
    previewImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prm-2',
    titleEn: 'High-Impact Bold Typographic Poster Layout',
    titleAr: 'تخطيط بوستر تيبوجرافي جريء ذو تأثير بصري قوي',
    categoryEn: 'Graphic Design Layouts',
    categoryAr: 'تخطيط وتنسيق',
    promptText: 'A high-contrast avant-garde graphic design poster, bold Swiss typography reading "CREATIVE AUTOMATION", stark neon green and charcoal color scheme, half-tone grids, technical architectural design markings, glitch overlay, raw brutalist aesthetics, vector graphics style --ar 3:4',
    descriptionEn: 'Generates brutalist, modern Swiss design templates for digital art posters and creative social headers.',
    descriptionAr: 'تصميم بوستر سويسري حديث وعنيف تيبوجرافي جريء بتباين عالي، مخطط نصف نغمة وشبكات بصرية رائعة للوحات الفنية الحديثة وأغلفة السوشل ميديا.',
    tags: ['Brutalist', 'Swiss Design', 'Typography', 'Poster'],
    aiTool: 'Stable Diffusion XL',
    previewImages: [
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=800&q=80'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prm-3',
    titleEn: 'Automated Viral Shorts Title & Script Hook Generator',
    titleAr: 'صانع خطافات النصوص الذكية للفيديوهات القصيرة (ChatGPT)',
    categoryEn: 'ChatGPT / Claude',
    categoryAr: 'شات جي بي تي / كلود',
    promptText: 'Acting as an expert viral designer and video editor under the brand Bta3 Design: Create 5 alternative psychological hooks for a 30-second Short video about [TOPIC]. The hooks must use visual design metaphors (e.g. "Photoshop secrets nobody tells you"). Also structure a fast-paced script layout with specific suggestions for sound effects (SFX) and B-roll transitions.',
    descriptionEn: 'Used to structure high-retention scripts for YouTube Shorts, Reels, and TikTok visual storytelling videos.',
    descriptionAr: 'مستند ذكي لصناعة سيناريو لافت للانتباه ومقاطع فيديو سريعة الانتشار على يوتيوب و تيك توك وتسهيل التعديل الصوتي والبصري والمؤثرات.',
    tags: ['Copywriting', 'Shorts', 'Workflows'],
    aiTool: 'ChatGPT-4o',
    previewImages: [
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export const defaultVisuals: VisualItem[] = [
  {
    id: 'vis-1',
    titleEn: 'Cybernetic Pharaoh - Conceptual AI Art',
    titleAr: 'الفرعون السيبراني - فن مفاهيمي بالذكاء الاصطناعي',
    categoryEn: 'AI Concept Art',
    categoryAr: 'مفاهيم الذكاء الاصطناعي',
    imageUrl: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=800&q=80',
    descriptionEn: 'Merging ancient Egyptian pharaonic majesty with high-tech futuristic cybernetics, detailed gold conduits and holographic crowns.',
    descriptionAr: 'صهر ملامح الملوك الفراعنة القدماء مع تفاصيل المستقبل السيبراني، أسلاك من الذهب اللامع وتيجان هولوغرافية لافتة.',
    createdAt: '2026-05-15'
  },
  {
    id: 'vis-2',
    titleEn: 'Brutalist Social Media Campaign Template',
    titleAr: 'تصميم حملة جرافيك ذات طابع بروكسل العنيف (Brutalist)',
    categoryEn: 'Social Media Design',
    categoryAr: 'تصاميم السوشل ميديا',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
    descriptionEn: 'A dark, ultra-modern poster grid pairing high-contrast typography with experimental glitch layouts under the Bta3 Design style.',
    descriptionAr: 'نموذج بوستر جرافيك بلون الفحم الغنائي مع تباين ألوان النيون والتيبوجرافي المبتكر ضمن أسلوب بتاع ديزاين المميز.',
    createdAt: '2026-05-09'
  },
  {
    id: 'vis-3',
    titleEn: 'Interactive Metallic Liquid Textures',
    titleAr: 'تصميم الأنسجة المعدنية السائلة المتفاعلة',
    categoryEn: '3D Textural Experiments',
    categoryAr: 'تجارب ثلاثية الأبعاد',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    descriptionEn: 'Procedural 3D liquid chrome designs with neon ambient lighting bounces, formulated dynamically using AI synthesis tools.',
    descriptionAr: 'تصميم الكروم السائل اللامع العاكس للضوء مع انعكاسات نيون أرجوانية تم تركيبها عبر دمج محركات التوليد بالذكاء الاصطناعي.',
    createdAt: '2026-04-28'
  }
];

export const defaultVideos: VideoItem[] = [
  {
    id: 'vid-1',
    titleEn: 'How to automate consistent AI Video Avatars for tutorials',
    titleAr: 'طريقة أتمتة وبناء أفاتار فيديو ذكاء اصطناعي متكامل للشروحات',
    categoryEn: 'AI Tutorials',
    categoryAr: 'دروس ذكاء اصطناعي',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder YouTube ID, can be replaced by Mohamed
    descriptionEn: 'Step-by-step masterclass on matching AI voice clones with fully animated realistic video avatars using free platforms.',
    descriptionAr: 'شرح عملي خطوة بخطوة لمطابقة بصمة صوتك المنتجة بالذكاء الاصطناعي مع صور تفاعلية تتحدث بطلاقة لشرح الدروس والمحتوى.',
    duration: '12:45'
  },
  {
    id: 'vid-2',
    titleEn: 'Create Viral Typography Effects in Adobe Premiere Pro',
    titleAr: 'خدع وأسرار تصميم نصوص متحركة وسريعة الانتشار في بريمير برو',
    categoryEn: 'Video Editing',
    categoryAr: 'مونتاج وفيديو',
    youtubeId: 'dQw4w9WgXcQ',
    descriptionEn: 'Secrets of editing keyframes, sound design accents, and kinetic subtitle presets for ultra-high audience engagement.',
    descriptionAr: 'أسرار تصميم علامات كينتيك كيبورد، وإضافة مؤثرات صوتية تضفي حيوية وجاذبية على ظهور الكلمات بمقاطعك الرأسية.',
    duration: '08:30'
  }
];

export const defaultSocialPosts: SocialPost[] = [
  {
    id: 'pst-1',
    platform: 'facebook',
    titleEn: 'Graphic Design is changing – Are you ready for AI Agents?',
    titleAr: 'عصر جديد لتصميم الجرافيك – هل أنت مستعد لعملاء الذكاء الاصطناعي؟',
    descriptionEn: 'Shared my complete workflow explaining how design prompts are transitioning from direct synthesis to compound design actions handled by AI bots.',
    descriptionAr: 'نشرت دليلي المتكامل الذي يوضح كيف تندمج أوامر التصميم العادية لتصبح عمليات مركبة وأوتوماتيكية بالكامل بواسطة الروبوتات الذكية الجديدة.',
    date: '2026-05-19',
    url: 'https://www.facebook.com/share/1Doag8yPZz/',
    categoryEn: 'Industry Insights',
    categoryAr: 'رؤى تكنولوجية',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80'
  }  ,
  {
    id: 'pst-2',
    platform: 'instagram',
    titleEn: 'Bta3 Design Brand Logo Evolution Showcase',
    titleAr: 'استوديو التطور البصري لشعار "بتاع ديزاين"',
    descriptionEn: 'In-depth carousel explaining the color psychology and geometric layouts of the futuristic neon-monovibe branding.',
    descriptionAr: 'منشور تفاعلي من نوع كاروسيل يستعرض سيكولوجية الألوان والأبعاد الهندسية لهويتنا البصرية المستقبلية الفاخرة.',
    date: '2026-05-14',
    url: 'https://www.instagram.com/mhmdkhldbdllh710',
    categoryEn: 'Brand Evolution',
    categoryAr: 'استوديو الهوية',
    coverImage: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pst-3',
    platform: 'behance',
    titleEn: 'Automated Cyberpunk UI - Brand Case Study',
    titleAr: 'دراسة حالة تصميم واجهة مستخدم سايبربانك مؤتمتة',
    descriptionEn: 'Full portfolo presentation on Behance visualizing the interactive assets, customized fonts, and high-tech Egyptian motifs.',
    descriptionAr: 'عرض متكامل وحصري على بيهانس يعرض عناصر التصاميم المتحركة، الخطوط المخصصة، والخطوط المعمارية التاريخية بلمسة حديثة.',
    date: '2026-05-01',
    url: 'https://www.behance.net/mohamedkhalid144',
    categoryEn: 'Full Case Study',
    categoryAr: 'دراسة حالة',
    coverImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pst-4',
    platform: 'youtube',
    titleEn: 'Automating Social Media Content: Reels & Shorts Workflow',
    titleAr: 'أتمتة الفيديوهات الرأسية وتصديرها بـ 10 مقاسات منبثقة',
    descriptionEn: 'My official video guide addressing bulk production mechanisms, auto-subtitling strategies, and scheduling pipelines.',
    descriptionAr: 'دليلي المرئي الذي يغطي كيفية الإنتاج الضخم للمقاطع، تقنيات الكتابة الآلية السريعة، وجدولة النشر لتوفير الجهد.',
    date: '2026-04-20',
    url: 'https://youtube.com/@mohamed_mka',
    categoryEn: 'Bulk Production',
    categoryAr: 'الإنتاج الكمي',
    coverImage: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pst-5',
    platform: 'tiktok',
    titleEn: 'Next-Gen Video Automation Hacks on TikTok',
    titleAr: 'أسرار أتمتة الفيديوهات القصيرة وانتشارها على تيك توك',
    descriptionEn: 'A cinematic fast-explainer on how to programmatically align text animations with synthetic audio files.',
    descriptionAr: 'منشور تفاعلي يشرح بالتفصيل كيفية برمجة المحتوى المرئي ليتزامن النص مع طبقات الصوت الآلية بسرعة فائقة.',
    date: '2026-05-15',
    url: 'https://www.tiktok.com/@mohamed_mka',
    categoryEn: 'Social Growth',
    categoryAr: 'النمو الاجتماعي',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'
  }
];

export const mohamedKhaledLinks: MohamedKhaledLink[] = [
  {
    id: 'lnk-portfolio',
    nameEn: 'Bta3 Design Portfolio',
    nameAr: 'موقع أعمالي الرئيسي - بتاع ديزاين',
    platform: 'portfolio',
    url: 'https://bta3-design.rf.gd/',
    accent: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    shadowColor: 'rgba(16, 185, 129, 0.4)',
    descriptionEn: 'Official agency portal, detailed case studies, freebies and customizable assets.',
    descriptionAr: 'بوابة الأعمال الرئيسية لبتاع ديزاين، دراسات حالة متكاملة وملفات مجانية معدلة.'
  },
  {
    id: 'lnk-behance',
    nameEn: 'Behance Profile',
    nameAr: 'معرض أعمال بيهانس',
    platform: 'behance',
    url: 'https://www.behance.net/mohamedkhalid144',
    accent: 'bg-gradient-to-r from-blue-600 to-cyan-500',
    shadowColor: 'rgba(37, 99, 235, 0.4)',
    descriptionEn: 'High-resolution showcases of visual branding, packaging prototypes, and AI art.',
    descriptionAr: 'لوحات بجودة استثنائية تستعرض تصميم الهويات التجارية، النماذج ثلاثية الأبعاد، وتوليد الفنون.'
  },
  {
    id: 'lnk-linkedin',
    nameEn: 'LinkedIn Account',
    nameAr: 'حساب لينكد إن المهني',
    platform: 'linkedin',
    url: 'https://www.linkedin.com/in/mohamed-khalid-b9b4a03b8',
    accent: 'bg-gradient-to-r from-cyan-600 to-blue-500',
    shadowColor: 'rgba(6, 182, 212, 0.4)',
    descriptionEn: 'Professional networking, technology collaboration, and corporate automation consultations.',
    descriptionAr: 'التواصل المهني، استشارات ربط الأعمال، وتبادل الأبحاث والأفكار في أتمتة التصميم.'
  },
  {
    id: 'lnk-youtube',
    nameEn: 'YouTube Channel',
    nameAr: 'قناة اليوتيوب التعليمية',
    platform: 'youtube',
    url: 'https://youtube.com/@mohamed_mka',
    accent: 'bg-gradient-to-r from-red-600 to-rose-500',
    shadowColor: 'rgba(239, 68, 68, 0.4)',
    descriptionEn: 'Free tutorials, software workflows, graphic design templates, and AI demonstrations.',
    descriptionAr: 'فيديوهات شرح مجانية، تطبيقات عملية، هدايا للمصممين، واستكشاف إمكانيات الذكاء الاصطناعي.'
  },
  {
    id: 'lnk-instagram',
    nameEn: 'Instagram Portfolio',
    nameAr: 'حساب انستجرام البصري',
    platform: 'instagram',
    url: 'https://www.instagram.com/mhmdkhldbdllh710',
    accent: 'bg-gradient-to-r from-fuchsia-600 to-pink-500',
    shadowColor: 'rgba(217, 70, 239, 0.4)',
    descriptionEn: 'Micro tutorials, design carousels, aesthetic reels, behind-the-scenes content.',
    descriptionAr: 'شروحات دقيقة سريعة، شرائح صور تعليمية، مقاطع ممتازة يومية، وتفاصيل خلف الكواليس.'
  },
  {
    id: 'lnk-facebook',
    nameEn: 'Facebook Page',
    nameAr: 'صفحة فيسبوك التفاعلية',
    platform: 'facebook',
    url: 'https://www.facebook.com/share/1Doag8yPZz/',
    accent: 'bg-gradient-to-r from-indigo-600 to-blue-500',
    shadowColor: 'rgba(79, 70, 229, 0.4)',
    descriptionEn: 'Arabic design discussions, community polls, quick tutorials, and workflow updates.',
    descriptionAr: 'مجتمعنا التفاعلي باللغة العربية، استطلاعات الرأي للمصممين، منشورات يومية وتواصل مباشر.'
  }
];

export const defaultContactDetails: ContactDetails = {
  phone1: '+20 112 625 5354',
  phone1LabelEn: 'LINE 01 (VODAFONE)',
  phone1LabelAr: 'الخط الأول (فودافون)',
  phone2: '+20 107 084 7356',
  phone2LabelEn: 'LINE 02 (ORANGE)',
  phone2LabelAr: 'الخط الثاني (أورنج)',
  email1: 'mkjsssjdjsj@gmail.com',
  email1LabelEn: 'Primary Inquiries',
  email1LabelAr: 'الاستفسارات الدورية والمشاريع',
  email2: 'mk1622965@gmail.com',
  email2LabelEn: 'Alternative Secondary',
  email2LabelAr: 'البريد الإلكتروني البديل الثاني'
};
