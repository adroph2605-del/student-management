import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, Github, Linkedin, Instagram } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { t } = useTheme();

  const quickLinks = [
    { label: t('footerRoster'), to: '/app/students' },
    { label: t('footerFees'), to: '/app/fees' },
    { label: t('footerPilot'), to: '/register' },
    { label: t('signIn'), to: '/login' },
  ];

  return (
    <footer className="bg-[#0B0F19] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-lg bg-[#064E3B] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-[#F8E7C9]" />
              </div>
              <div>
                <p className="font-bold text-white text-sm leading-none">EduTrack SMS</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{t('footerTagline')}</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-3 max-w-xs">
              {t('footerDesc')}
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400/90">{t('footerOperational')}</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              {t('footerModules')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-slate-400 hover:text-[#F8E7C9] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              {t('footerContact')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="mailto:adroph2605@gmail.com"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-[#F8E7C9] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  adroph2605@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+255774082430"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-[#F8E7C9] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  0774 082 430
                </a>
              </li>
            </ul>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://github.com/adroph2605-del"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/adroph-audiphance-andrea-207555429"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-xs text-slate-500">{t('footerCopyright')}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">{t('footerPrivacy')}</a>
            <a href="#" className="hover:text-slate-300 transition-colors">{t('footerTerms')}</a>
            <span className="text-slate-600">{t('footerVersion')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}