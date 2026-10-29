import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, UserCheck, TrendingUp, Wallet, AlertTriangle,
  ClipboardCheck, CreditCard, MessageSquare,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { dashboardAPI } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Dashboard() {
  const { t } = useTheme();
  const [stats, setStats] = useState({
    totalStudents: 0,
    attendanceToday: 0,
    academicAverage: 0,
    feeCollection: 0,
    unpaidBalance: 0,
    studentsNeedingAttention: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardAPI
      .stats()
      .then((res) => {
        if (res.data) setStats(res.data);
      })
      .catch(() => toast.error('Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    {
      label: t('totalStudents'),
      value: Number(stats.totalStudents || 0).toLocaleString(),
      icon: Users,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-900/30',
    },
    {
      label: t('attendanceToday'),
      value: `${stats.attendanceToday || 0}%`,
      icon: UserCheck,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/30',
    },
    {
      label: t('academicAverage'),
      value: `${stats.academicAverage || 0}%`,
      icon: TrendingUp,
      color: 'text-violet-600 dark:text-violet-400',
      bg: 'bg-violet-50 dark:bg-violet-900/30',
    },
    {
      label: t('feeCollection'),
      value: `${stats.feeCollection || 0}%`,
      icon: Wallet,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/30',
      sub: `${t('unpaid')}: TZS ${Math.round((stats.unpaidBalance || 0) / 1000)}k`,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto pb-28 sm:pb-24">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          {t('goodMorning')}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('dashboardSubtitle')}</p>
      </div>

      {(stats.studentsNeedingAttention || 0) > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 px-3 sm:px-4 py-3 rounded-xl bg-[#F8E7C9] dark:bg-amber-900/30 border border-[#E2CE9F] dark:border-amber-700/40">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                {stats.studentsNeedingAttention} {t('studentsNeedAttention')}
              </p>
              <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-0.5">{t('followUp')}</p>
            </div>
          </div>
          <Link to="/app/students" className="text-xs font-semibold text-amber-800 dark:text-amber-300 hover:underline">
            {t('reviewNow')} →
          </Link>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-3 sm:p-5 shadow-sm">
              <div className="flex items-start sm:items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs font-medium text-gray-500 truncate">{card.label}</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{card.value}</p>
                  {card.sub && <p className="text-[10px] text-gray-400 mt-1 truncate">{card.sub}</p>}
                </div>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${card.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${card.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-3 py-2.5 rounded-2xl glass-float">
        <Link to="/app/attendance" className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#064E3B] text-white hover:bg-[#04382B]">
          <ClipboardCheck className="w-3.5 h-3.5" /> {t('takeAttendance')}
        </Link>
        <Link to="/app/fees" className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800">
          <CreditCard className="w-3.5 h-3.5" /> {t('recordPayment')}
        </Link>
        <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800">
          <MessageSquare className="w-3.5 h-3.5" /> {t('messageGuardians')}
        </button>
      </div>
    </div>
  );
}