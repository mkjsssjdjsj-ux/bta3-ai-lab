export interface AIUpdate {
  id: string;
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  categoryEn: string;
  categoryAr: string;
  date: string;
  imageUrl?: string;
  sourceUrl?: string;
}

export interface PromptItem {
  id: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  promptText: string;
  descriptionEn: string;
  descriptionAr: string;
  tags: string[];
  aiTool?: string;
  previewImages?: string[];
  beforeImage?: string;
  afterImage?: string;
}

export interface VisualItem {
  id: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  imageUrl: string;
  descriptionEn: string;
  descriptionAr: string;
  createdAt: string;
}

export interface VideoItem {
  id: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  youtubeId: string; // YouTube video ID for embedding
  descriptionEn: string;
  descriptionAr: string;
  duration?: string;
}

export interface SocialPost {
  id: string;
  platform: 'facebook' | 'instagram' | 'linkedin' | 'behance' | 'youtube' | 'tiktok';
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  date: string;
  url: string;
  categoryEn: string;
  categoryAr: string;
  coverImage?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  service: string;
}

export interface MohamedKhaledLink {
  id: string;
  nameEn: string;
  nameAr: string;
  platform: 'portfolio' | 'facebook' | 'behance' | 'linkedin' | 'instagram' | 'youtube';
  url: string;
  accent: string;
  shadowColor: string;
  descriptionEn: string;
  descriptionAr: string;
}

export interface ContactDetails {
  phone1: string;
  phone1LabelEn: string;
  phone1LabelAr: string;
  phone2: string;
  phone2LabelEn: string;
  phone2LabelAr: string;
  email1: string;
  email1LabelEn: string;
  email1LabelAr: string;
  email2: string;
  email2LabelEn: string;
  email2LabelAr: string;
}

export type ActiveSection = 
  | 'home' 
  | 'updates' 
  | 'prompts' 
  | 'visuals' 
  | 'videos' 
  | 'posts' 
  | 'portfolio' 
  | 'connect';

export type Language = 'en' | 'ar';
