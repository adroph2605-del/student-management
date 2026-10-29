import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, ClipboardCheck, Wallet, Calendar, Download, FileText, Bell, ArrowRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { studentAPI, gradesAPI, attendanceAPI } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { t } = useTheme();
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const hour = new Date().getHours();
  const greet =
    hour < 12 ? t('goodMorning') : hour < 17 ? t('goodAfternoon') : t('goodEvening');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const sid = user?.studentRef;
        if (!sid) {
          setStudent(null);
          setLoading(false);
          return;
        }
        const res = await studentAPI.getById(sid);
        setStudent(res.data);
        try {
          const g = await gradesAPI.getAll({ studentId: sid });
          setGrades(g.data || []);
        } catch {
          setGrades([]);
        }
        try {
          const a = await attendanceAPI.summary(sid);
          setAttendance(a.data || []);
        } catch {
          setAttendance([]);
        }
      } catch {
        toast.error('Failed to load student data');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?.studentRef]);

  const attColor = (s) =>
    s === 'P' || s === 'Present'
      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
      : s === 'L' || s === 'Late'
      ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
      : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300';

  const letter = (status) => {
    if (status === 'Present') return 'P';
    if (status === 'Late') return 'L';
    if (status === 'Excused') return 'E';
    if (status === 'Absent') return 'A';
    return status || '—';
  };

  const avg =
    grades.length > 0
      ? (grades.reduce((s, g) => s + (g.score || 0), 0) / grades.length).toFixed(1)
      : student?.academicAverage != null
      ? student.academicAverage
      : '—';

  const attPct =
    attendance.length > 0
      ? Math.round(
          (attendance.filter((a) => a.status === 'Present' || a.status === 'Late').length /
            attendance.length) *
            1000
        ) / 10
      : student?.attendancePercent != null
      ? student.attendancePercent
      : '—';

  const feeBal = student?.feeBalance ?? 0;

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const name = user?.name || student?.name || 'Student';

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="rounded-2xl bg-gradient-to-r from-[#064E3B] to-[#047857] p-5 sm:p-6 text-white">
        <p className="text-emerald-100 text-sm">{greet},</p>
        <h1 className="text-xl sm:text-2xl font-bold mt-0.5">{name}</h1>
        <p className="text-sm text-emerald-100/90 mt-1">
          {student?.className || student?.course || '—'}
          {student?.studentCode ? ` · ${student.studentCode}` : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          {
            label: t('academicAverage'),
            value: avg === '—' ? '—' : `${avg}%`,
            icon: BookOpen,
            color: 'text-violet-600',
            bg: 'bg-violet-50 dark:bg-violet-900/30',
          },
          {
            label: t('attendanceLabel'),
            value: attPct === '—' ? '—' : `${attPct}%`,
            icon: ClipboardCheck,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50 dark:bg-emerald-900/30',
          },
          {
            label: t('feeBalance'),
            value: feeBal === 0 ? t('cleared') : `TZS ${Number(feeBal).toLocaleString()}`,
            icon: Wallet,
            color: 'text-amber-600',
            bg: 'bg-amber-50 dark:bg-amber-900/30',
          },
        ].map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center gap-3"
            >
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

      <div className="flex flex-wrap gap-2">
        {[
          { to: '/student/grades', label: t('downloadResults'), icon: Download },
          { to: '/student/timetable', label: t('examTimetable'), icon: Calendar },
          { to: '/student/fees', label: t('paymentInvoice'), icon: FileText },
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
        <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{t('todaysClasses')}</h3>
          <p className="text-xs text-gray-400 py-6 text-center">No timetable data yet</p>
          <Link
            to="/student/timetable"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#064E3B] dark:text-emerald-400 mt-1"
          >
            {t('fullTimetable')} <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            {t('attendance10Days')}
          </h3>
          {attendance.length === 0 ? (
            <p className="text-xs text-gray-400 py-6 text-center">No attendance records</p>
          ) : (
            <div className="grid grid-cols-5 gap-1.5">
              {attendance.slice(0, 10).map((d) => {
                const L = letter(d.status);
                return (
                  <div key={d._id} className="text-center">
                    <div
                      className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold ${attColor(
                        L
                      )}`}
                    >
                      {L}
                    </div>
                    <p className="text-[9px] text-gray-400 mt-0.5 truncate">
                      {d.date ? String(d.date).slice(5, 10) : ''}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 overflow-x-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{t('recentGrades')}</h3>
          <Link to="/student/grades" className="text-xs font-semibold text-[#064E3B] dark:text-emerald-400">
            {t('viewAll')}
          </Link>
        </div>
        {grades.length === 0 ? (
          <p className="text-xs text-gray-400 py-6 text-center">No grades yet</p>
        ) : (
          <table className="w-full text-sm min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100 dark:border-slate-800 text-left text-xs text-gray-500">
                <th className="py-2 pr-3">{t('subject')}</th>
                <th className="py-2 pr-3">{t('score')}</th>
                <th className="py-2 pr-3">{t('grade')}</th>
                <th className="py-2">{t('comment')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {grades.slice(0, 4).map((r) => (
                <tr key={r._id}>
                  <td className="py-2 pr-3 font-medium text-gray-900 dark:text-white">{r.subject}</td>
                  <td className="py-2 pr-3">{r.score}%</td>
                  <td className="py-2 pr-3 font-bold text-emerald-600">{r.grade}</td>
                  <td className="py-2 text-xs text-gray-500">{r.comment || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Bell className="w-4 h-4 text-[#064E3B]" />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{t('campusNotices')}</h3>
        </div>
        <p className="text-xs text-gray-400">No notices yet</p>
      </div>
    </div>
  );
}