import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap, Menu, X, Sun, Moon, Globe, ArrowRight,
  Users, Database, Lock, Link2, CheckCircle2, BookOpen,
  MessageCircle, Send, Shield, Server, FileText,
  Sparkles, LayoutGrid, ClipboardCheck, Award, UserPlus, Star, Wallet,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Footer from '../components/Footer';
import Typewriter from '../components/Typewriter';
import CountUp from '../components/CountUp';
import { students as mockStudents } from '../data/mockData';

export default function LandingPage() {
  const { darkMode, toggleDarkMode, lang, toggleLang, t } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [demoTab, setDemoTab] = useState('directory');
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState([
    { role: 'bot', text: 'Hi! I can help you explore EduTrack — ask about students, fees, or how to get started.' },
  ]);

  const navLinks = [
    { label: t('navFeatures'), href: '#features' },
    { label: t('navSolutions'), href: '#solutions' },
    { label: t('navArchitecture'), href: '#architecture' },
    { label: t('navTestimonials'), href: '#demo' },
    { label: t('navDocs'), href: '#docs' },
  ];

  const pillars = [
    { icon: Database, title: t('pillar1Title'), desc: t('pillar1Desc') },
    { icon: Lock, title: t('pillar2Title'), desc: t('pillar2Desc') },
    { icon: Link2, title: t('pillar3Title'), desc: t('pillar3Desc') },
  ];

  const demoTabs = [
    { id: 'directory', label: t('demoTabDirectory'), icon: Users },
    { id: 'gradebook', label: t('demoTabGradebook'), icon: BookOpen },
  ];

  const sendAi = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const q = aiInput.trim();
    setAiMessages((m) => [...m, { role: 'user', text: q }]);
    setAiInput('');
    setTimeout(() => {
      setAiMessages((m) => [
        ...m,
        {
          role: 'bot',
          text: 'Thanks for your question. In the full product, I connect to campus data. For now, try Sign In or Get Started to explore the dashboard.',
        },
      ]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-gray-900 dark:text-gray-100">
      {/* ========== FIXED TRANSPARENT NAVBAR ========== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/45 dark:bg-slate-900/45 backdrop-blur-xl border-b border-white/25 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#064E3B] flex items-center justify-center">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#F8E7C9]" />
              </div>
              <span className="font-bold text-sm sm:text-base tracking-tight text-gray-900 dark:text-white">
                EduTrack SMS
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#064E3B] dark:hover:text-emerald-400 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={toggleLang}
                className="hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5"
              >
                <Globe className="w-3.5 h-3.5" />
                {lang === 'ENG' ? 'SW' : 'ENG'}
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Link
                to="/login"
                className="hidden sm:inline-flex px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
              >
                {t('signIn')}
              </Link>
              <Link
                to="/register"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold bg-[#064E3B] text-[#F8E7C9] hover:bg-[#04382B] rounded-lg transition-colors"
              >
                {t('bookDemo')}
              </Link>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-black/5 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-2 pt-2 border-t border-black/5 dark:border-white/10 mt-2">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-slate-700"
                >
                  {t('signIn')}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center px-3 py-2 text-sm font-semibold bg-[#064E3B] text-[#F8E7C9] rounded-lg"
                >
                  {t('bookDemo')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ========== HERO ========== */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden pt-14 sm:pt-16">
        <div className="absolute inset-0">
          <img src="/Bg.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
          <div className="max-w-2xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-white/15 backdrop-blur-md border border-white/25 text-white/95">
                <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                {t('badgeSoc2')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-white/15 backdrop-blur-md border border-white/25 text-white/95">
                <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                <CountUp end={50} suffix="K+" duration={2000} /> Active Students
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-white/15 backdrop-blur-md border border-white/25 text-white/95">
                <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                <CountUp end={99.99} decimals={2} suffix="%" duration={2200} /> Uptime
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.12] drop-shadow-lg min-h-[1.3em]">
              <Typewriter
                key={`title-${lang}`}
                text={t('heroTitle')}
                speed={55}
                startDelay={400}
                showCursor={true}
              />
            </h1>

            <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-white/85 leading-relaxed max-w-xl drop-shadow min-h-[3.2em]">
              <Typewriter
                key={`sub-${lang}`}
                text={t('heroSubtitle')}
                speed={28}
                startDelay={3500}
                showCursor={false}
              />
            </p>
          </div>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section id="features" className="py-16 sm:py-20 bg-white dark:bg-slate-900/50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              {t('pillarsTitle')}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-500 dark:text-gray-400">
              {t('pillarsSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="group rounded-2xl p-5 sm:p-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#064E3B]/10 dark:bg-emerald-900/40 text-[#064E3B] dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== SOLUTIONS (PowerSchool hub) ========== */}
      <section id="solutions" className="py-16 sm:py-24 scroll-mt-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.45] dark:opacity-[0.2]"
          style={{
            backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              {t('solutionsTitle')}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-500 dark:text-gray-400">
              {t('pillarsSubtitle')}
            </p>
          </div>

          <div className="relative mx-auto max-w-4xl min-h-[420px] sm:min-h-[480px]">
            {/* Desktop orbit cards */}
            <div className="hidden sm:block">
              <div className="absolute left-[2%] top-[8%] w-[140px]">
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 shadow-md px-4 py-3.5 text-center hover:-translate-y-1 transition-transform">
                  <MessageCircle className="w-5 h-5 mx-auto text-[#064E3B] dark:text-emerald-400 mb-1.5" />
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">Communications</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Guardians & SMS</p>
                </div>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[140px]">
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 shadow-md px-4 py-3.5 text-center hover:-translate-y-1 transition-transform">
                  <Sparkles className="w-5 h-5 mx-auto text-[#064E3B] dark:text-emerald-400 mb-1.5" />
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">Contextual AI</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">EduTrack Assistant</p>
                </div>
              </div>

              <div className="absolute right-[2%] top-[8%] w-[140px]">
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 shadow-md px-4 py-3.5 text-center hover:-translate-y-1 transition-transform">
                  <BookOpen className="w-5 h-5 mx-auto text-[#064E3B] dark:text-emerald-400 mb-1.5" />
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">Learning Mgmt</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Canvas / LMS</p>
                </div>
              </div>

              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[140px]">
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 shadow-md px-4 py-3.5 text-center hover:-translate-y-1 transition-transform">
                  <LayoutGrid className="w-5 h-5 mx-auto text-[#064E3B] dark:text-emerald-400 mb-1.5" />
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">Unified Portal</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Staff & Parents</p>
                </div>
              </div>

              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[140px]">
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 shadow-md px-4 py-3.5 text-center hover:-translate-y-1 transition-transform">
                  <ClipboardCheck className="w-5 h-5 mx-auto text-[#064E3B] dark:text-emerald-400 mb-1.5" />
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">Attendance</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Real-time register</p>
                </div>
              </div>

              <div className="absolute right-[8%] bottom-[4%] w-[140px]">
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 shadow-md px-4 py-3.5 text-center hover:-translate-y-1 transition-transform">
                  <Award className="w-5 h-5 mx-auto text-[#064E3B] dark:text-emerald-400 mb-1.5" />
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">Assessment</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Gradebook</p>
                </div>
              </div>
            </div>

            {/* Center SIS hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,320px)] sm:w-[340px] z-10">
              <div className="rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-4 sm:p-5 shadow-xl">
                <div className="flex justify-center mb-4">
                  <span className="inline-flex px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#F8E7C9] text-[#064E3B]">
                    Student Information
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 items-center">
                  <div className="space-y-2.5">
                    <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 px-2 py-2.5 text-center">
                      <UserPlus className="w-4 h-4 mx-auto text-[#064E3B] dark:text-emerald-400 mb-1" />
                      <p className="text-[10px] font-semibold text-gray-800 dark:text-gray-100">Enrollment</p>
                    </div>
                    <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 px-2 py-2.5 text-center">
                      <Star className="w-4 h-4 mx-auto text-[#064E3B] dark:text-emerald-400 mb-1" />
                      <p className="text-[10px] font-semibold text-gray-800 dark:text-gray-100">Special</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border-2 border-[#E07A3D] bg-gradient-to-b from-orange-50 to-white dark:from-orange-950/40 dark:to-slate-900 px-2 py-5 text-center shadow-md">
                    <Users className="w-8 h-8 mx-auto text-[#E07A3D] mb-1.5" />
                    <p className="text-sm font-bold text-gray-900 dark:text-white">SIS</p>
                    <p className="text-[9px] text-gray-500 dark:text-gray-400 mt-0.5">EduTrack Core</p>
                  </div>

                  <div className="space-y-2.5">
                    <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 px-2 py-2.5 text-center">
                      <Wallet className="w-4 h-4 mx-auto text-[#064E3B] dark:text-emerald-400 mb-1" />
                      <p className="text-[10px] font-semibold text-gray-800 dark:text-gray-100">Fees</p>
                    </div>
                    <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 px-2 py-2.5 text-center">
                      <FileText className="w-4 h-4 mx-auto text-[#064E3B] dark:text-emerald-400 mb-1" />
                      <p className="text-[10px] font-semibold text-gray-800 dark:text-gray-100">Records</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile grid */}
            <div className="sm:hidden grid grid-cols-2 gap-3 pt-2">
              {[
                { icon: MessageCircle, label: 'Communications' },
                { icon: BookOpen, label: 'Learning Mgmt' },
                { icon: ClipboardCheck, label: 'Attendance' },
                { icon: Award, label: 'Assessment' },
                { icon: UserPlus, label: 'Enrollment' },
                { icon: Wallet, label: 'Fees' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm px-3 py-3 text-center"
                  >
                    <Icon className="w-4 h-4 mx-auto text-[#064E3B] dark:text-emerald-400 mb-1" />
                    <p className="text-[11px] font-semibold text-gray-900 dark:text-white">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========== ARCHITECTURE ========== */}
      <section id="architecture" className="py-16 sm:py-20 bg-white dark:bg-slate-900/50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              {t('architectureTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Shield, title: 'FERPA / GDPR', desc: t('pillar2Desc') },
              { icon: Server, title: 'SOC-2 Type II', desc: t('badgeSoc2') },
              { icon: Database, title: 'Real-time Roster', desc: t('pillar1Desc') },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex gap-4 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#064E3B]/10 dark:bg-emerald-900/30 text-[#064E3B] dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== LIVE DEMO ========== */}
      <section id="demo" className="py-16 sm:py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              {t('demoTitle')}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-500 dark:text-gray-400">
              {t('demoSubtitle')}
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="inline-flex p-1 rounded-xl bg-gray-100 dark:bg-slate-800 gap-1">
              {demoTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setDemoTab(tab.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                      demoTab === tab.id
                        ? 'bg-[#064E3B] text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
            {demoTab === 'directory' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[480px]">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-800">
                      <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">{t('student')}</th>
                      <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden sm:table-cell">{t('class')}</th>
                      <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">{t('status')}</th>
                      <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden md:table-cell">{t('attendance')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                    {(mockStudents || []).slice(0, 5).map((s) => (
                      <tr key={s._id} className="hover:bg-gray-50/80 dark:hover:bg-slate-800/40">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-[10px] font-bold">
                              {s.avatar}
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white text-sm">{s.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300 hidden sm:table-cell">{s.class}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${s.status === 'Active' ? 'badge-active' : 'badge-pending'}`}>
                            {s.status === 'Active' ? t('active') : t('pending')}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hidden md:table-cell">
                          {s.attendance}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {demoTab === 'gradebook' && (
              <div className="p-4 sm:p-6 overflow-x-auto">
                <table className="w-full text-sm min-w-[400px]">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-slate-800">
                      <th className="text-left text-xs font-semibold text-gray-500 py-2 pr-4">{t('subject')}</th>
                      <th className="text-left text-xs font-semibold text-gray-500 py-2 pr-4">{t('score')}</th>
                      <th className="text-left text-xs font-semibold text-gray-500 py-2">{t('grade')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                    {['Mathematics', 'English', 'Kiswahili', 'Biology'].map((sub, i) => (
                      <tr key={sub}>
                        <td className="py-2.5 pr-4 font-medium text-gray-900 dark:text-white">{sub}</td>
                        <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-300">{[92, 85, 88, 79][i]}%</td>
                        <td className="py-2.5 font-bold text-emerald-600 dark:text-emerald-400">{['A', 'B+', 'A-', 'B'][i]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========== DOCS ========== */}
      <section id="docs" className="py-16 sm:py-20 bg-white dark:bg-slate-900/50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              {t('docsTitle')}
            </h2>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{t('docsSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: FileText, title: t('footerGuide'), to: '#' },
              { icon: Server, title: t('footerApi'), to: '#' },
              { icon: Shield, title: t('footerSecurity'), to: '#' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.to}
                  className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 hover:border-[#064E3B]/40 transition-colors"
                >
                  <Icon className="w-5 h-5 text-[#064E3B] dark:text-emerald-400 shrink-0" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#064E3B] px-6 sm:px-10 py-10 sm:py-14 text-center shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{t('ctaTitle')}</h2>
              <p className="mt-3 text-sm sm:text-base text-emerald-100/80 max-w-xl mx-auto">{t('ctaSubtitle')}</p>
              <Link
                to="/register"
                className="mt-6 sm:mt-8 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-[#F8E7C9] text-[#064E3B] hover:bg-white rounded-xl transition-colors shadow-lg"
              >
                {t('bookDemo')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* ========== AI HELPER ========== */}
      <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
        {aiOpen && (
          <div className="w-[min(100vw-2rem,340px)] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-[#064E3B] text-white">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-semibold">{t('aiHelperTitle')}</span>
              </div>
              <button onClick={() => setAiOpen(false)} className="p-1 rounded hover:bg-white/10">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="h-56 overflow-y-auto p-3 space-y-2 bg-gray-50 dark:bg-slate-950">
              {aiMessages.map((m, i) => (
                <div
                  key={i}
                  className={`text-xs leading-relaxed px-3 py-2 rounded-xl max-w-[90%] ${
                    m.role === 'user'
                      ? 'ml-auto bg-[#064E3B] text-white'
                      : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>
            <form onSubmit={sendAi} className="p-2 border-t border-slate-200 dark:border-slate-700 flex gap-2">
              <input
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder={t('aiHelperPlaceholder')}
                className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button type="submit" className="p-2 rounded-lg bg-[#064E3B] text-white hover:bg-[#04382B]">
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-center text-gray-400 pb-2">{t('aiHelperHint')}</p>
          </div>
        )}
        <button
          onClick={() => setAiOpen(!aiOpen)}
          className="w-14 h-14 rounded-full bg-[#064E3B] text-[#F8E7C9] shadow-lg shadow-emerald-900/30 flex items-center justify-center hover:bg-[#04382B] transition-colors"
          aria-label="AI Helper"
        >
          {aiOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}