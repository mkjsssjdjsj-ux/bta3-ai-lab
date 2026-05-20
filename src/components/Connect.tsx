import React, { useState } from 'react';
import { useTranslation } from './LanguageContext';
import { ContactFormData, ContactDetails } from '../types';
import { Mail, Phone, MessageSquare, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConnectProps {
  contactDetails: ContactDetails;
}

export const Connect: React.FC<ConnectProps> = ({ contactDetails }) => {
  const { t, lang, dir } = useTranslation();
  const getWhatsAppUrl = (phone: string) => `https://wa.me/${phone.replace(/[^0-9]/g, '')}`;
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    service: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate API request to server/database
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', service: '' });
      // Clear status message after 6 seconds
      setTimeout(() => setSubmitStatus('idle'), 6000);
    }, 1200);
  };

  return (
    <div 
      id="connect-page"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white min-h-[70vh]"
      style={{ direction: dir }}
    >
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {t('section.connect.title')}
        </h2>
        <p className="text-sm sm:text-base text-zinc-400">
          {t('section.connect.sub')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Handy direct Contacts & Buttons */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Card: Phone numbers with instant click-to-WhatsApp redirects */}
          <div className="bg-zinc-950/70 border border-zinc-900 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-10 w-20 h-[1px] bg-gradient-to-l from-emerald-500/20 to-transparent" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Phone size={20} />
              </div>
              <div style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                <h4 className="font-bold text-white text-base">Direct Channels</h4>
                <p className="text-[10px] font-mono text-zinc-500 uppercase">Phone & WhatsApp</p>
              </div>
            </div>

            <div className="space-y-4" style={{ direction: 'ltr' }}>
              <div className="p-4 bg-black border border-zinc-900 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-mono text-zinc-500">
                    {lang === 'ar' ? contactDetails.phone1LabelAr : contactDetails.phone1LabelEn}
                  </span>
                  <span className="block text-sm font-mono text-white tracking-wider font-extrabold">{contactDetails.phone1}</span>
                </div>
                <a
                  id="whatsapp-line-1"
                  href={getWhatsAppUrl(contactDetails.phone1)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-black rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                >
                  <MessageSquare size={13} />
                  <span className="text-[10px] font-bold uppercase">Chat</span>
                </a>
              </div>

              <div className="p-4 bg-black border border-zinc-900 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-mono text-zinc-500">
                    {lang === 'ar' ? contactDetails.phone2LabelAr : contactDetails.phone2LabelEn}
                  </span>
                  <span className="block text-sm font-mono text-white tracking-wider font-extrabold">{contactDetails.phone2}</span>
                </div>
                <a
                  id="whatsapp-line-2"
                  href={getWhatsAppUrl(contactDetails.phone2)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-black rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                >
                  <MessageSquare size={13} />
                  <span className="text-[10px] font-bold uppercase">Chat</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card: Emails with direct links */}
          <div className="bg-zinc-950/70 border border-zinc-900 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-10 w-20 h-[1px] bg-gradient-to-l from-cyan-500/20 to-transparent" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Mail size={20} />
              </div>
              <div style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                <h4 className="font-bold text-white text-base">Electronic Mail</h4>
                <p className="text-[10px] font-mono text-zinc-500 uppercase">Consultations & Work</p>
              </div>
            </div>

            <div className="space-y-4" style={{ direction: 'ltr' }}>
              <div className="p-4 bg-black border border-zinc-900 rounded-2xl flex items-center justify-between">
                <div className="overflow-hidden mr-2">
                  <span className="block text-[10px] font-mono text-zinc-500 font-bold uppercase">
                    {lang === 'ar' ? contactDetails.email1LabelAr : contactDetails.email1LabelEn}
                  </span>
                  <span className="block text-sm font-mono text-white truncate font-extrabold">{contactDetails.email1}</span>
                </div>
                <a
                  id="email-contact-1"
                  href={`mailto:${contactDetails.email1}`}
                  className="p-2 bg-cyan-500/15 text-cyan-400 hover:bg-cyan-500 hover:text-black rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0"
                >
                  <Mail size={13} />
                </a>
              </div>

              <div className="p-4 bg-black border border-zinc-900 rounded-2xl flex items-center justify-between">
                <div className="overflow-hidden mr-2">
                  <span className="block text-[10px] font-mono text-zinc-500 font-bold uppercase">
                    {lang === 'ar' ? contactDetails.email2LabelAr : contactDetails.email2LabelEn}
                  </span>
                  <span className="block text-sm font-mono text-white truncate font-extrabold">{contactDetails.email2}</span>
                </div>
                <a
                  id="email-contact-2"
                  href={`mailto:${contactDetails.email2}`}
                  className="p-2 bg-cyan-500/15 text-cyan-400 hover:bg-cyan-500 hover:text-black rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0"
                >
                  <Mail size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Message Submission Form */}
        <div className="lg:col-span-7">
          <div className="bg-zinc-950/70 border border-zinc-900 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-32 h-[1px] bg-gradient-to-l from-emerald-500/30 to-transparent" />

            <form onSubmit={handleSubmit} className="space-y-5" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
              <h3 className="text-xl font-extrabold text-white mb-6">
                {lang === 'ar' ? 'ارسل رسالة مباشرة' : 'Write Direct Inquiry'}
              </h3>

              {/* Input: Name */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">{t('form.name')} *</label>
                <input
                  id="conn-form-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={lang === 'ar' ? 'مثال: محمد أحمد' : 'e.g. John Doe'}
                  className="w-full px-4 py-3 bg-black border border-zinc-900 focus:border-emerald-500 rounded-xl text-sm focus:outline-none transition"
                  style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}
                />
              </div>

              {/* Input: Email */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">{t('form.email')} *</label>
                <input
                  id="conn-form-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 bg-black border border-zinc-900 focus:border-emerald-500 rounded-xl text-sm focus:outline-none transition font-mono"
                  style={{ direction: 'ltr', textAlign: 'left' }}
                />
              </div>

              {/* Option: Services Select list */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">{t('form.service')}</label>
                <select
                  id="conn-form-service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 bg-black border border-zinc-900 focus:border-emerald-500 rounded-xl text-sm focus:outline-none transition text-zinc-300"
                >
                  <option value="">{t('form.service.default')}</option>
                  <option value="ui">{t('form.service.ui')}</option>
                  <option value="ai">{t('form.service.ai')}</option>
                  <option value="video">{t('form.service.video')}</option>
                  <option value="automation">{t('form.service.automation')}</option>
                  <option value="other">{t('form.service.other')}</option>
                </select>
              </div>

              {/* Area: Message text */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">{t('form.message')} *</label>
                <textarea
                  id="conn-form-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={lang === 'ar' ? 'اكتب تفاصيل مشروعك هنا...' : 'Write specifics or collaboration targets here...'}
                  className="w-full px-4 py-3 bg-black border border-zinc-900 focus:border-emerald-500 rounded-xl text-sm focus:outline-none transition resize-none"
                  style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}
                />
              </div>

              {/* Notifications triggers */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs sm:text-sm flex items-start gap-2.5"
                  >
                    <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                    <span>{t('form.success')}</span>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs sm:text-sm flex items-start gap-2.5"
                  >
                    <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                    <span>{t('form.error')}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit CTA */}
              <button
                id="conn-form-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-extrabold text-sm rounded-xl transition duration-300 transform hover:scale-[1.015] shadow-lg disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <span>{t('form.send')}</span>
                    <ExternalLink size={14} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
