import { BarChart3, FileText, Download } from 'lucide-react';
import { stats, attendanceTrend } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export default function Reports() {
  const { t } = useTheme();

  const reports = [
    { title: t('attendance'), desc: t('weeklyAttendance'), icon: BarChart3 },
    { title: t('academicRecord'), desc: t('academicAverage'), icon: FileText },
    { title: t('feesPayments'), desc: t('financialOverview'), icon: Download },
    { title: t('students'), desc: t('studentsDirectory'), icon: BarChart3 },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{t('reportsInsights')}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('generateReports')}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('students'), value: stats.totalStudents.toLocaleString() },
          { label: t('attendance'), value: `${stats.attendanceToday}%` },
          { label: t('academicAverage'), value: `${stats.academicAverage}%` },
          { label: t('feeCollection'), value: `${stats.feeCollection}%` },
        ].map((s) => (
          <div key={s.label} className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reports.map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.title} className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{r.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{r.desc}</p>
                <button className="mt-3 text-xs font-semibold text-[#064E3B] dark:text-emerald-400 hover:underline">
                  {t('generateReport')} →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">{t('weeklyAttendance')}</h2>
        <div className="flex items-end gap-4 h-40">
          {attendanceTrend.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-medium text-gray-500">{d.value}%</span>
              <div className="w-full rounded-t-md bg-emerald-500/80 dark:bg-emerald-600" style={{ height: `${(d.value / 100) * 100}%` }} />
              <span className="text-[10px] font-medium text-gray-400">{d.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}