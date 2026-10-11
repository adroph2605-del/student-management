import { Link } from 'react-router-dom';
import {
  GraduationCap, ShieldCheck, Activity, Users, Quote,
  Sun, Moon, Globe,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function AuthLayout({ children }) {
  const { darkMode, toggleDarkMode, lang, toggleLang, t } = useTheme();

  return (
    <div className="min-h-screen flex">
      {/* ========== LEFT CINEMATIC PANEL ========== */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden text-white">
        {/* Animated Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/auth.jpg"
            alt="Campus"
            className="absolute inset-0 w-full h-full object-cover animate-kenburns"
          />
        </div>

        {/* Multi-layer Emerald Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#064E3B]/90 via-[#04382B]/80 to-[#022c22]/50" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-10 xl:p-14">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#F8E7C9] flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-[#064E3B]" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight leading-none drop-shadow-md">
                {t('appName') || 'Kijani'}
              </h1>
              <p className="text-[11px] text-emerald-200/90 font-medium tracking-wide uppercase mt-0.5">
                {t('appTagline') || 'EduTrack Enterprise'}
              </p>
            </div>
          </div>

          {/* Floating Badge */}
          <div className="mt-10 inline-flex self-start">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F8E7C9] text-xs font-medium shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
              🎓 Sovereign Campus Platform · SOC-2 Certified
            </div>
          </div>

          {/* Hero Copy */}
          <div className="mt-8 max-w-md">
            <h2 className="text-3xl xl:text-4xl font-bold leading-tight tracking-tight drop-shadow-lg">
              {t('sovereignTitle') || 'Sovereign Student Data, Engineered for Global Campuses.'}
            </h2>
            <p className="mt-4 text-emerald-100/80 text-sm leading-relaxed drop-shadow">
              {t('sovereignSubtitle') ||
                'Automate enrollment, attendance, gradebooks and fee collection under one secure institutional platform.'}
            </p>
          </div>

          {/* Floating Metric Glass Card */}
          <div className="mt-10 max-w-sm animate-float-soft">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl hover:-translate-y-1 transition-transform duration-300 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#F8E7C9]" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">1,248</p>
                  <p className="text-[11px] text-emerald-200/80">
                    {t('activeRecords') || 'Active Records'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-100/90">
                <Activity className="w-3.5 h-3.5 text-emerald-300" />
                <span>99.9% Uptime · Latency &lt; 50ms</span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F8E7C9]" />
                <span className="text-[#F8E7C9] font-medium">SOC-2 Type II Certified</span>
              </div>

              <div className="pt-3 border-t border-white/10 flex gap-2">
                <Quote className="w-4 h-4 text-emerald-300/50 shrink-0 mt-0.5" />
                <p className="text-[11px] text-emerald-100/70 italic leading-relaxed">
                  "EduTrack transformed our campus workflows overnight."
                  <span className="block mt-1 not-italic text-emerald-200/50 font-medium">
                    — Dr. Elizabeth M., Academic Registrar
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Version */}
          <p className="mt-auto pt-8 text-[10px] text-emerald-300/40 font-medium tracking-wider">
            v1.0.0 Enterprise Edition
          </p>
        </div>
      </div>

      {/* ========== RIGHT FORM PANEL ========== */}
      <div className="flex-1 flex flex-col min-h-screen bg-[#F8FAFC]/95 dark:bg-[#0F172A]/95 backdrop-blur-xl">
        {/* Mobile top banner (image collapsed) */}
        <div className="lg:hidden relative h-36 overflow-hidden">
          <img
            src="/auth.jpg"
            alt="Campus"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#064E3B]/80 to-[#064E3B]/95" />
          <div className="relative z-10 flex items-center gap-3 p-5 h-full">
            <div className="w-10 h-10 rounded-xl bg-[#F8E7C9] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-[#064E3B]" />
            </div>
            <div>
              <h1 className="font-bold text-white text-base">{t('appName') || 'Kijani'}</h1>
              <p className="text-[10px] text-emerald-200/80 uppercase tracking-wide">
                {t('appTagline') || 'EduTrack Enterprise'}
              </p>
            </div>
          </div>
        </div>

        {/* Top controls */}
        <div className="flex items-center justify-between px-5 sm:px-10 py-4">
          <Link
            to="/app"
            className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-[#064E3B] dark:hover:text-emerald-400 transition-colors"
          >
            ← {t('backToDashboard') || 'Back to Dashboard'}
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'ENG' ? 'SW' : 'ENG'}
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center px-5 sm:px-10 py-6 sm:py-8">
          <div className="w-full max-w-[420px]">{children}</div>
        </div>
      </div>
    </div>
  );
}