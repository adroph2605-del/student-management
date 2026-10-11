import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Activity, Users, Quote, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function AuthLayout({ children }) {
  const { darkMode, toggleDarkMode, lang, toggleLang } = useTheme();
  const t = (eng, sw) => (lang === 'SW' ? sw : eng);

  return (
    <div className="min-h-screen flex">
      {/* LEFT BRAND PANEL */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#064E3B] text-white flex-col justify-between p-10 xl:p-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#064E3B] via-[#04382B] to-[#022c22] opacity-90" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#F8E7C9] flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-[#064E3B]" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight leading-none">Kijani</h1>
              <p className="text-[11px] text-emerald-300/80 font-medium tracking-wide uppercase mt-0.5">
                EduTrack Enterprise
              </p>
            </div>
          </div>

          {/* Hero */}
          <div className="mt-16 xl:mt-24 max-w-md">
            <h2 className="text-3xl xl:text-4xl font-bold leading-tight tracking-tight">
              {t(
                'Sovereign Student Data, Engineered for Global Campuses.',
                'Data ya Wanafunzi Salama, Iliyoundwa kwa Kampasi za Kimataifa.'
              )}
            </h2>
            <p className="mt-4 text-emerald-100/70 text-sm leading-relaxed">
              {t(
                'Automate enrollment, attendance, gradebooks and fee collection under one secure institutional platform.',
                'Fanya otomatiki usajili, mahudhurio, vitabu vya alama na ukusanyaji wa ada chini ya jukwaa moja salama.'
              )}
            </p>
          </div>

          {/* Glass Preview Card */}
          <div className="mt-10 max-w-sm">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-5 shadow-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                  <Users className="w-4.5 h-4.5 text-[#F8E7C9]" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">1,248</p>
                  <p className="text-[11px] text-emerald-200/70">{t('Active Students', 'Wanafunzi Hai')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-100/80">
                <Activity className="w-3.5 h-3.5 text-emerald-300" />
                <span>{t('System Operational', 'Mfumo Unafanya Kazi')} · 99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F8E7C9]" />
                <span className="text-[#F8E7C9] font-medium">SOC-2 Type II Certified</span>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-auto pt-10">
            <div className="flex gap-3">
              <Quote className="w-5 h-5 text-emerald-400/50 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-emerald-100/80 italic leading-relaxed">
                  {t(
                    '"EduTrack transformed our campus administrative workflows overnight."',
                    '"EduTrack ilibadilisha mtiririko wa kazi za utawala wa kampasi yetu mara moja."'
                  )}
                </p>
                <p className="mt-2 text-xs text-emerald-300/60 font-medium">
                  — Dr. Elizabeth M., {t('Academic Registrar', 'Msajili wa Kitaaluma')}
                </p>
              </div>
            </div>
            <p className="mt-6 text-[10px] text-emerald-400/40 font-medium tracking-wider">
              v1.0.0 Enterprise Edition
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="flex-1 flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A]">
        <div className="flex items-center justify-between px-6 sm:px-10 py-4">
          <Link
            to="/"
            className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-[#064E3B] dark:hover:text-emerald-400 transition-colors"
          >
            ← {t('Back to Dashboard', 'Rudi Dashboard')}
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

        <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-8">
          <div className="w-full max-w-[420px]">{children}</div>
        </div>
      </div>
    </div>
  );
}