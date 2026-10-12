import { Link } from 'react-router-dom';
import { GraduationCap, Sun, Moon, Globe, ShieldCheck, Activity, Quote } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Typewriter from '../Typewriter';
import CountUp from '../CountUp';

export default function AuthLayout({ children }) {
  const { t, darkMode, toggleDarkMode, lang, toggleLang } = useTheme();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F8FAFC] dark:bg-[#0B0F19]">
      {/* ========== LEFT BRAND PANEL ========== */}
      <div className="relative hidden lg:flex lg:w-1/2 xl:w-[52%] flex-col justify-between overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="/auth.jpg"
            alt=""
            className="w-full h-full object-cover scale-105 animate-[kenburns_22s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#064E3B]/90 via-[#04382B]/85 to-[#064E3B]/60" />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        <div className="relative z-10 flex flex-col h-full p-8 xl:p-12">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-xl bg-[#F8E7C9] flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-[#064E3B]" />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight text-white leading-none">EduTrack</p>
              <p className="text-[10px] font-semibold tracking-[0.18em] text-[#F8E7C9]/90 uppercase mt-0.5">
                Enterprise
              </p>
            </div>
          </Link>

          <div className="mt-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-white/95">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Sovereign Campus Platform · SOC-2 Certified
            </span>
          </div>

          <div className="mt-8 max-w-lg">
            <h1 className="text-3xl xl:text-4xl font-bold leading-[1.15] tracking-tight text-white drop-shadow-lg min-h-[3.2em]">
              <Typewriter
                key={`auth-title-${lang}`}
                text={t('authHeroTitle')}
                speed={32}
                startDelay={300}
                showCursor={true}
              />
            </h1>
            <p className="mt-4 text-sm xl:text-base text-white/80 leading-relaxed max-w-md min-h-[3em]">
              <Typewriter
                key={`auth-sub-${lang}`}
                text={t('authHeroSubtitle')}
                speed={16}
                startDelay={2800}
                showCursor={false}
              />
            </p>
          </div>

          <div className="mt-auto max-w-sm rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-[#F8E7C9]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white tabular-nums">
                  <CountUp end={1248} duration={2000} />
                </p>
                <p className="text-[11px] text-white/70">{t('authActiveRecords')}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>
                  <CountUp end={99.9} decimals={1} suffix="%" duration={1800} /> Uptime · Latency &lt;{' '}
                  <CountUp end={50} suffix="ms" duration={1600} />
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>SOC-2 Type II Certified</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/15">
              <div className="flex gap-2">
                <Quote className="w-3.5 h-3.5 text-[#F8E7C9] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] text-white/85 italic leading-relaxed">
                    &ldquo;EduTrack transformed our campus workflows overnight.&rdquo;
                  </p>
                  <p className="text-[10px] text-white/55 mt-1">
                    — Dr. Elizabeth M., Academic Registrar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== RIGHT FORM PANEL (hakuna frame) ========== */}
      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0 bg-white dark:bg-[#0B0F19]">
        {/* Mobile top brand */}
        <div className="lg:hidden relative h-28 overflow-hidden">
          <img src="/auth.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#064E3B]/85 flex items-center px-5 gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#F8E7C9] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-[#064E3B]" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">EduTrack</p>
              <p className="text-[10px] text-[#F8E7C9]/90 uppercase tracking-wider">Enterprise</p>
            </div>
          </div>
        </div>

        {/* Lang / theme */}
        <div className="flex items-center justify-end gap-1.5 px-4 sm:px-8 pt-4">
          <button
            type="button"
            onClick={toggleLang}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === 'ENG' ? 'SW' : 'ENG'}
          </button>
          <button
            type="button"
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Form — bila card/frame */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-6 sm:py-10">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}