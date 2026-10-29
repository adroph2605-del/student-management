import { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, ClipboardCheck, BookOpen, Wallet, BarChart3,
  Menu, X, Search, Bell, Sun, Moon, GraduationCap, ChevronDown, Command, LogOut,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode, lang, toggleLang, t } = useTheme();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onDoc = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const displayName = user?.name || user?.orgName || 'User';
  const displayRole =
    user?.role === 'faculty' ? 'Faculty' : user?.role === 'admin' ? 'Admin' : user?.role || 'Staff';
  const avatar = displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const navItems = [
    { to: '/app', label: t('overview'), icon: LayoutDashboard },
    { to: '/app/students', label: t('students'), icon: Users },
    { to: '/app/attendance', label: t('attendance'), icon: ClipboardCheck },
    { to: '/app/gradebook', label: t('gradebook'), icon: BookOpen },
    { to: '/app/fees', label: t('feesPayments'), icon: Wallet },
    { to: '/app/reports', label: t('reports'), icon: BarChart3 },
  ];

  const notifications = []; // real list later from API; empty = no fake dots content

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-100 via-white to-emerald-50 dark:from-[#0b0f19] dark:via-[#0f172a] dark:to-[#064e3b]/30">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#064E3B] text-white flex flex-col transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-emerald-300" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-[15px] tracking-tight leading-none">{t('appName')}</h1>
            <p className="text-[10px] text-emerald-300/80 font-medium mt-0.5 tracking-wide uppercase">
              {t('appTagline')}
            </p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.to === '/app'
                ? location.pathname === '/app' || location.pathname === '/app/'
                : location.pathname.startsWith(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-[#04382B] text-white shadow-sm'
                    : 'text-emerald-100/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" strokeWidth={isActive ? 2.2 : 1.8} />
                <span className="flex-1">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-200/80">{t('allSystemsOperational')}</span>
          </div>
          <div className="bg-white/5 rounded-lg px-3 py-2">
            <p className="text-[10px] text-emerald-300/60 font-medium uppercase tracking-wider">
              {t('currentTerm')}
            </p>
            <p className="text-xs text-white font-semibold mt-0.5">Term II, 2026</p>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 glass-strong">
          <div className="flex items-center gap-3 px-4 sm:px-6 h-14">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              onClick={() => setSearchOpen(true)}
              className="flex-1 max-w-md flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/10 text-sm text-gray-400 hover:bg-white/60 dark:hover:bg-white/10 transition-all min-w-0"
            >
              <Search className="w-4 h-4" />
              <span className="flex-1 text-left truncate">{t('search')}</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/50 dark:bg-white/10 border border-white/40 dark:border-white/10 text-[10px] font-medium text-gray-400">
                <Command className="w-2.5 h-2.5" />K
              </kbd>
            </button>

            <div className="flex items-center gap-1.5 ml-auto">
              <button
                type="button"
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5"
              >
                Term II, 2026 <ChevronDown className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={toggleLang}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5"
              >
                {lang === 'ENG' ? 'SW' : 'ENG'}
              </button>

              <button
                type="button"
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Notifications — real button + panel */}
              <div className="relative" ref={notifRef}>
                <button
                  type="button"
                  onClick={() => setNotifOpen((v) => !v)}
                  className="relative p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {notifications.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
                  )}
                </button>
                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-800">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</p>
                    </div>
                    {notifications.length === 0 ? (
                      <p className="px-4 py-8 text-center text-xs text-gray-400">No new notifications</p>
                    ) : (
                      <ul className="max-h-64 overflow-y-auto">
                        {notifications.map((n) => (
                          <li key={n.id} className="px-4 py-3 text-xs border-b border-gray-50 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800">
                            {n.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Real logged-in user */}
              <div className="flex items-center gap-2 pl-2 ml-1 border-l border-black/10 dark:border-white/10">
                <div className="w-7 h-7 rounded-full bg-[#064E3B] text-white flex items-center justify-center text-[11px] font-bold">
                  {avatar}
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 leading-none">
                    {displayName}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{displayRole}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  title="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-3 sm:p-5 lg:p-8 overflow-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] px-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-md" onClick={() => setSearchOpen(false)} />
          <div className="relative w-full max-w-lg glass-strong rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-black/5 dark:border-white/10">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                autoFocus
                placeholder={t('search')}
                className="flex-1 bg-transparent text-sm outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
              />
              <kbd className="text-[10px] text-gray-400 bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">ESC</kbd>
            </div>
            <div className="px-4 py-6 text-center text-sm text-gray-400">{t('search')}</div>
          </div>
        </div>
      )}
    </div>
  );
}