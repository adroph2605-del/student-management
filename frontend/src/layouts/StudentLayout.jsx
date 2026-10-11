import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, BookOpen, ClipboardCheck, Wallet,
  FolderOpen, User, Megaphone, LogOut, Menu, X, Sun, Moon, Globe, Bell,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const nav = [
  { to: '/student', end: true, icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/student/timetable', icon: Calendar, label: 'Timetable' },
  { to: '/student/grades', icon: BookOpen, label: 'Grades' },
  { to: '/student/attendance', icon: ClipboardCheck, label: 'Attendance' },
  { to: '/student/fees', icon: Wallet, label: 'Fees' },
  { to: '/student/courses', icon: FolderOpen, label: 'Courses' },
  { to: '/student/profile', icon: User, label: 'Profile' },
  { to: '/student/notices', icon: Megaphone, label: 'Notices' },
];

export default function StudentLayout() {
  const { darkMode, toggleDarkMode, lang, toggleLang } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] flex">
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-60 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col transition-transform ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-14 flex items-center gap-2 px-4 border-b border-gray-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-[#064E3B] text-[#F8E7C9] flex items-center justify-center font-bold text-sm">E</div>
          <span className="text-sm font-bold text-gray-900 dark:text-white">Student Portal</span>
          <button className="lg:hidden ml-auto" onClick={() => setOpen(false)}><X className="w-5 h-5" /></button>
        </div>
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium ${
                  isActive
                    ? 'bg-[#064E3B] text-[#F8E7C9]'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={() => { logout(); navigate('/login'); }}
          className="m-2 flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </aside>

      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 sticky top-0 z-20 flex items-center gap-2 px-4 border-b border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
          <button className="lg:hidden p-2" onClick={() => setOpen(true)}><Menu className="w-5 h-5" /></button>
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {user?.name || 'Student'}
          </p>
          <div className="ml-auto flex items-center gap-1">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
            </button>
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