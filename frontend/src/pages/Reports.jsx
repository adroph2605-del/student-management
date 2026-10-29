import { useEffect, useState } from 'react';
import { BarChart3, FileText, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { dashboardAPI } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Reports() {
  const { t } = useTheme();
  const [stats, setStats] = useState({
    totalStudents: 0,
    attendanceToday: 0,
    academicAverage: 0,
    feeCollection: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardAPI
      .stats()
      .then((res) => {
        if (res.data) setStats(res.data);
      })
      .catch(() => toast.error('Failed to load reports'))
      .finally(() => setLoading(false));
  }, []);

  const reports = [
    { title: t('attendance'), desc: t('weeklyAttendance'), icon: BarChart3 },
    { title: t('academicRecord'), desc: t('academicAverage'), icon: FileText },
    { title: t('feesPayments'), desc: t('financialOverview'), icon: Download },
    { title: t('students'), desc: t('studentsDirectory'), icon: BarChart3 },
  ];

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          {t('reportsInsights')}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('generateReports')}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('students'), value: Number(stats.totalStudents || 0).toLocaleString() },
          { label: t('attendance'), value: `${stats.attendanceToday || 0}%` },
          { label: t('academicAverage'), value: `${stats.academicAverage || 0}%` },
          { label: t('feeCollection'), value: `${stats.feeCollection || 0}%` },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-4 text-center shadow-sm"
          >
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reports.map((r) => {
          const Icon = r.icon;
          return (
            <div
              key={r.title}
              className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{r.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{r.desc}</p>
                <button
                  type="button"
                  className="mt-3 text-xs font-semibold text-[#064E3B] dark:text-emerald-400 hover:underline"
                >
                  {t('generateReport')} →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}