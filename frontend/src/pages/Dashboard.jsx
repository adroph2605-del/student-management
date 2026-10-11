import { Link } from 'react-router-dom';
import {
  Users, UserCheck, TrendingUp, Wallet, AlertTriangle,
  ClipboardCheck, CreditCard, MessageSquare,
} from 'lucide-react';
import { stats, attendanceTrend, priorityInterventions, todaySchedule } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export default function Dashboard() {
  const { t } = useTheme();

  const statCards = [
    {
      label: t('totalStudents'),
      value: stats.totalStudents.toLocaleString(),
      icon: Users,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-900/30',
    },
    {
      label: t('attendanceToday'),
      value: `${stats.attendanceToday}%`,
      icon: UserCheck,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/30',
    },
    {
      label: t('academicAverage'),
      value: `${stats.academicAverage}%`,
      icon: TrendingUp,
      color: 'text-violet-600 dark:text-violet-400',
      bg: 'bg-violet-50 dark:bg-violet-900/30',
    },
    {
      label: t('feeCollection'),
      value: `${stats.feeCollection}%`,
      icon: Wallet,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/30',
      sub: `${t('unpaid')}: TZS ${(stats.unpaidBalance / 1000).toFixed(0)}k`,
    },
  ];

  const statusBadge = (status) => {
    const map = {
      'in-progress': {
        label: `${t('inMin')} ${todaySchedule[0]?.minsLeft || 18} ${t('min')}`,
        cls: 'bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
      },
      upcoming: {
        label: t('upcoming'),
        cls: 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
      },
      confirmed: {
        label: t('confirmed'),
        cls: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
      },
    };
    const s = map[status] || map.confirmed;
    return (
      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${s.cls}`}>
        {s.label}
      </span>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto pb-28 sm:pb-24">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          {t('goodMorning')}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {t('dashboardSubtitle')}
        </p>
      </div>

      {/* Priority Alert */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl bg-[#F8E7C9] dark:bg-amber-900/30 border border-[#E2CE9F] dark:border-amber-700/40">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              {stats.studentsNeedingAttention} {t('studentsNeedAttention')}
            </p>
            <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-0.5">
              {t('followUp')}
            </p>
          </div>
        </div>
        <Link
          to="/app/students"
          className="text-xs font-semibold text-amber-800 dark:text-amber-300 hover:underline whitespace-nowrap self-end sm:self-start sm:mt-0.5"
        >
          {t('reviewNow')} →
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-3 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start sm:items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 truncate">
                    {card.label}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1 tracking-tight">
                    {card.value}
                  </p>
                  {card.sub && (
                    <p className="text-[10px] sm:text-[11px] text-gray-400 mt-1 truncate">
                      {card.sub}
                    </p>
                  )}
                </div>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${card.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${card.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3-column section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Attendance Trends */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            {t('attendanceTrends')}
          </h2>
          <div className="flex items-end gap-2 sm:gap-3 h-32 sm:h-36">
            {attendanceTrend.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[9px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400">
                  {d.value}%
                </span>
                <div
                  className="w-full rounded-t-md bg-emerald-500/80 dark:bg-emerald-600 min-h-[4px]"
                  style={{ height: `${(d.value / 100) * 100}%` }}
                />
                <span className="text-[9px] sm:text-[10px] font-medium text-gray-400">
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Interventions */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100 dark:border-slate-800">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              {t('priorityInterventions')}
            </h2>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-slate-800">
            {priorityInterventions.map((item) => (
              <div key={item.id} className="px-4 sm:px-5 py-3 flex items-start gap-3">
                <span
                  className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                    item.priority === 'high' ? 'bg-red-500' : 'bg-amber-400'
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {item.student}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                    {item.issue}
                  </p>
                </div>
                <span className="text-[10px] text-gray-400 shrink-0 hidden sm:inline">
                  {item.class}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100 dark:border-slate-800">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              {t('todaysSchedule')}
            </h2>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-slate-800">
            {todaySchedule.map((item) => (
              <div key={item.id} className="px-4 sm:px-5 py-3 flex items-center gap-2 sm:gap-3">
                <div className="text-[11px] sm:text-xs font-mono font-medium text-gray-400 w-9 sm:w-10 shrink-0">
                  {item.time}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {item.subject}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {item.class} · {item.teacher}
                  </p>
                </div>
                {statusBadge(item.status)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Quick Actions - responsive */}
      <div className="fixed bottom-3 sm:bottom-6 left-3 right-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-40 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 rounded-2xl glass-float">
        <Link
          to="/app/attendance"
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-semibold bg-[#064E3B] text-white hover:bg-[#04382B] transition-colors whitespace-nowrap"
        >
          <ClipboardCheck className="w-3.5 h-3.5 shrink-0" />
          <span>{t('takeAttendance')}</span>
        </Link>
        <Link
          to="/app/fees"
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
        >
          <CreditCard className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden xs:inline sm:inline">{t('recordPayment')}</span>
        </Link>
        <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap">
          <MessageSquare className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">{t('messageGuardians')}</span>
        </button>
      </div>
    </div>
  );
}