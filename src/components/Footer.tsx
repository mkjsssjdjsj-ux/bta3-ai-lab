import React from 'react';
import { useTranslation } from './LanguageContext';
import { Compass, Mail, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, lang, dir } = useTranslation();

  return (
    <footer 
      id="main-footer"
      className="bg-zinc-950 border-t border-zinc-900 py-12 text-zinc-400 font-sans"
      style={{ direction: dir }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center md:items-start text-center md:text-left">
          
          {/* Brand block column */}
          <div className="md:col-span-6 space-y-3.5" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-cyan-500 p-[1px]">
                <div className="w-full h-full bg-zinc-950 rounded-[7px] flex items-center justify-center font-black text-emerald-400 text-xs font-mono">
                  B3
                </div>
              </div>
              <span className="text-white font-extrabold text-base tracking-wide uppercase">
                Mohamed Khaled – Bta3 Design
              </span>
            </div>

            <p className="text-sm text-zinc-500 max-w-sm">
              AI + Design workflows, prompts, tutorials, and creative experiments. Bringing automation to graphic artists.
            </p>
          </div>

          {/* Quick contact hook */}
          <div className="md:col-span-6 flex flex-col items-center md:items-end space-y-3.5">
            <div style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
              <span className="block text-[10px] font-mono text-zinc-650 text-zinc-600 uppercase tracking-widest">Inquiries & Correspondence</span>
              <a 
                id="footer-email-link"
                href="mailto:mkjsssjdjsj@gmail.com" 
                className="text-white hover:text-emerald-400 font-mono text-sm font-bold flex items-center justify-center md:justify-start gap-1.5 transition mt-1"
              >
                <Mail size={13} className="text-emerald-500" />
                <span>mkjsssjdjsj@gmail.com</span>
              </a>
            </div>

            {/* Quick Micro platform indicators */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://www.behance.net/mohamedkhalid144" target="_blank" rel="noopener" 
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-850 hover:border-blue-500 hover:text-white flex items-center justify-center text-zinc-500 transition"
                title="Behance"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8.228 15.01c-.571 0-1.042-.148-1.416-.445-.373-.297-.56-.732-.56-1.307 0-.547.195-.972.587-1.275.391-.303.951-.454 1.681-.454h1.417v1.8c0 .546-.145.96-.437 1.24-.291.282-.716.422-1.272.422zm-.965-6.035c0-.465.151-.815.454-1.052.304-.236.721-.354 1.252-.354.516 0 .918.118 1.205.354.288.237.432.587.432 1.052 0 .438-.148.775-.445 1.01-.297.237-.714.354-1.253.354-.51 0-.916-.117-1.218-.354-.303-.235-.453-.584-.453-1.011zm11.397 3.551c0-.453-.105-.83-.314-1.13-.21-.303-.544-.454-1.003-.454-.424 0-.756.143-.996.428-.24.285-.37.662-.39 1.131h2.703zm4.34-1.526c-.347-1.115-1.026-1.996-2.037-2.641-1.01-.646-2.193-.97-3.548-.97-1.416 0-2.637.337-3.663 1.011-1.027.674-1.815 1.604-2.366 2.79-.55 1.186-.826 2.536-.826 4.05 0 1.488.271 2.812.813 3.974.542 1.162 1.327 2.072 2.353 2.73 1.027.659 2.247.989 3.663.989 1.625 0 2.973-.4 4.043-1.201 1.07-.801 1.73-1.901 1.982-3.3h-3.328c-.183.473-.509.843-.979 1.11-.47.265-1.011.398-1.625.398-.797 0-1.434-.236-1.91-.707-.477-.471-.741-1.11-.79-1.916h8.865c.04-.326.06-.689.06-1.089 0-1.7-.308-3.111-.926-4.234zm-14.717.382c.98-.671 1.47-1.637 1.47-2.898 0-.964-.242-1.767-.726-2.41a4.233 4.233 0 0 0-1.956-1.458c-.822-.315-1.95-.472-3.387-.472H0v19.438h7.952c1.43 0 2.576-.176 3.443-.526a4.57 4.57 0 0 0 2.155-1.745c.49-.785.736-1.714.736-2.79a5.138 5.138 0 0 0-1.424-3.639z"/></svg>
              </a>
              <a 
                href="https://youtube.com/@mohamed_mka" target="_blank" rel="noopener" 
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-850 hover:border-red-500 hover:text-white flex items-center justify-center text-zinc-500 transition"
                title="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.555A3.002 3.002 0 0 0 .503 6.163C0 8.038 0 12 0 12s0 3.962.503 5.837a3.002 3.002 0 0 0 2.11 2.108c1.868.555 9.388.555 9.388.555s7.52 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.962 24 12 24 12s0-3.963-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a 
                href="https://www.facebook.com/share/1Doag8yPZz/" target="_blank" rel="noopener" 
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-850 hover:border-blue-600 hover:text-white flex items-center justify-center text-zinc-500 transition"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Separator and copyright bottom line */}
        <div className="mt-12 pt-8 border-t border-zinc-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-650 text-zinc-600 font-mono">
          <span>&copy; {new Date().getFullYear()} Mohamed Khaled. All Rights Reserved.</span>
          <span>CRAFTED IN BTA3 DESIGN WORKSPACE</span>
        </div>
      </div>
    </footer>
  );
};
