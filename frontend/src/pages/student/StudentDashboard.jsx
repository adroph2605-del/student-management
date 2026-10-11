import { Link } from 'react-router-dom';
import {
  BookOpen, ClipboardCheck, Wallet, Calendar, Download,
  FileText, Bell, ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { academicRecord, attendanceGrid } from '../../data/mockData';

export default function StudentDashboard() {
  const { user } = useAuth();
  const name = user?.name || 'Amina Yusuf';
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const attColor = (s) =>
    s === 'P'
      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
      : s === 'L'
      ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
      : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300';

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Welcome */}
      <div className="rounded-2xl bg-gradient-to-r from-[#064E3B] to-[#047857] p-5 sm:p-6 text-white">
        <p className="text-emerald-100 text-sm">{greet},</p>
        <h1 className="text-xl sm:text-2xl font-bold mt-0.5">{name}</h1>
        <p className="text-sm text-emerald-100/90 mt-1">Form 3A · Class Teacher: Mrs. J. Mwangi</p>
      </div>

      {/* Personal stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: 'Academic Average', value: '78.6%', icon: BookOpen, color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-900/30' },
          { label: 'Attendance', value: '94%', icon: ClipboardCheck, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
          { label: 'Fee Balance', value: 'TZS 120,000', icon: Wallet, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/30' },
        ].map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${c.bg} ${c.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-gray-500">{c.label}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{c.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-2">
        {[
          { to: '/student/grades', label: 'Download Results', icon: Download },
          { to: '/student/timetable', label: 'Exam Timetable', icon: Calendar },
          { to: '/student/fees', label: 'Payment Invoice', icon: FileText },
        ].map((a) => (
          <Link
            key={a.label}
            to={a.to}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-[#064E3B] text-[#F8E7C9] hover:bg-[#04382B]"
          >
            <a.icon className="w-3.5 h-3.5" /> {a.label}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Today schedule */}
        <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Today&apos;s Classes</h3>
          <div className="space-y-2">
            {[
              { time: '08:00', subject: 'Mathematics', room: 'B12' },
              { time: '10:00', subject: 'English', room: 'A04' },
              { time: '13:00', subject: 'Biology', room: 'Lab 2' },
            ].map((s) => (
              <div key={s.time} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50 dark:bg-slate-800/50">
                <span className="text-xs font-mono text-gray-400 w-12">{s.time}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{s.subject}</p>
                  <p className="text-[11px] text-gray-500">Room {s.room}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/student/timetable" className="inline-flex items-center gap-1 text-xs font-semibold text-[#064E3B] dark:text-emerald-400 mt-3">
            Full timetable <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Attendance snapshot */}
        <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Attendance (10 days)</h3>
          <div className="grid grid-cols-5 gap-1.5">
            {(attendanceGrid || []).slice(0, 10).map((d) => (
              <div key={d.date} className="text-center">
                <div className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold ${attColor(d.status)}`}>
                  {d.status}
                </div>
                <p className="text-[9px] text-gray-400 mt-0.5 truncate">{d.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grades preview */}
      <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 overflow-x-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Recent Grades</h3>
          <Link to="/student/grades" className="text-xs font-semibold text-[#064E3B] dark:text-emerald-400">View all</Link>
        </div>
        <table className="w-full text-sm min-w-[400px]">
          <thead>
            <tr className="border-b border-gray-100 dark:border-slate-800 text-left text-xs text-gray-500">
              <th className="py-2 pr-3">Subject</th>
              <th className="py-2 pr-3">Score</th>
              <th className="py-2 pr-3">Grade</th>
              <th className="py-2">Comment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
            {(academicRecord || []).slice(0, 4).map((r) => (
              <tr key={r.subject}>
                <td className="py-2 pr-3 font-medium text-gray-900 dark:text-white">{r.subject}</td>
                <td className="py-2 pr-3">{r.score}%</td>
                <td className="py-2 pr-3 font-bold text-emerald-600">{r.grade}</td>
                <td className="py-2 text-xs text-gray-500">{r.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notices */}
      <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Bell className="w-4 h-4 text-[#064E3B]" />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Campus Notices</h3>
        </div>
        <ul className="space-y-2">
          {[
            'Mid-term exams start 20 Oct — check timetable.',
            'Fee payment deadline: 30 Oct 2026.',
            'Sports day registration open until Friday.',
          ].map((n) => (
            <li key={n} className="text-xs text-gray-600 dark:text-gray-300 pl-3 border-l-2 border-emerald-500/50">
              {n}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}