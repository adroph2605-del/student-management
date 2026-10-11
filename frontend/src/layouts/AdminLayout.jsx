import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Users, Wallet, Shield, ScrollText,
  Link2, Megaphone, Palette, LogOut, Menu, X, Sun, Moon, Globe,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const nav = [
  { to: '/admin', end: true, icon: LayoutDashboard, label: 'Overview' },
  { to: '/admin/campuses', icon: Building2, label: 'Campuses' },
  { to: '/admin/users', icon: Users, label: 'Users & Staff' },
  { to: '/admin/revenue', icon: Wallet, label: 'Fees & Revenue' },
  { to: '/admin/rbac', icon: Shield, label: 'Roles (RBAC)' },
  { to: '/admin/audit', icon: ScrollText, label: 'Audit Logs' },
  { to: '/admin/integrations', icon: Link2, label: 'LMS & API' },
  { to: '/admin/comms', icon: Megaphone, label: 'Communications' },
  { to: '/admin/branding', icon: Palette, label: 'Branding & i18n' },
];

export default function AdminLayout() {
  const { t, darkMode, toggleDarkMode, lang, toggleLang } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const signOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#064E3B] text-white flex flex-col transition-transform ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-14 flex items-center gap-2 px-4 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-[#F8E7C9] flex items-center justify-center text-[#064E3B] font-bold text-sm">E</div>
          <div>
            <p className="text-sm font-bold leading-none">EduTrack</p>
            <p className="text-[10px] text-emerald-200/80">System Admin</p>
          </div>
          <button className="lg:hidden ml-auto p-1" onClick={() => setOpen(false)}><X className="w-5 h-5" /></button>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive ? 'bg-white/15 text-[#F8E7C9]' : 'text-emerald-100/80 hover:bg-white/10'
                }`
              }
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <p className="text-[10px] text-emerald-200/60 px-2 mb-1 truncate">{user?.name}</p>
          <button onClick={signOut} className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-emerald-100/80 hover:bg-white/10">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>

      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 sticky top-0 z-20 flex items-center gap-2 px-4 border-b border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
          <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800" onClick={() => setOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-sm font-semibold text-gray-900 dark:text-white">Admin Console</h1>
          <div className="ml-auto flex items-center gap-1">
            <button onClick={toggleLang} className="px-2 py-1.5 text-xs font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" /> {lang === 'ENG' ? 'SW' : 'ENG'}
            </button>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}