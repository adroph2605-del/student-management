import { useEffect, useState } from 'react';
import { Wallet, TrendingUp, AlertCircle, ArrowDownLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { feesAPI } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Fees() {
  const { t } = useTheme();
  const [summary, setSummary] = useState({
    totalInvoiced: 0,
    collected: 0,
    outstanding: 0,
    collectionRate: 0,
  });
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [s, f] = await Promise.all([feesAPI.summary(), feesAPI.getAll()]);
        if (s.data) setSummary(s.data);
        setFees(f.data || []);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load fees');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formatTZS = (n) =>
    n >= 1000000 ? `TZS ${(n / 1000000).toFixed(1)}M` : `TZS ${Number(n || 0).toLocaleString()}`;

  const transactions = fees.flatMap((fee) =>
    (fee.payments || []).map((p, i) => ({
      id: p._id || `${fee._id}-${i}`,
      date: (p.paidAt || p.createdAt || '').toString().slice(0, 10),
      student: fee.student?.name || '—',
      method: p.method,
      amount: p.amount,
      status: p.status,
      reference: p.reference || '—',
    }))
  );

  const cards = [
    { label: t('totalInvoiced'), value: formatTZS(summary.totalInvoiced), icon: Wallet, color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-900/30' },
    { label: t('collected'), value: formatTZS(summary.collected), icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
    { label: t('outstanding'), value: formatTZS(summary.outstanding), icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/30' },
    { label: t('collectionRate'), value: `${summary.collectionRate}%`, icon: ArrowDownLeft, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/30' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('feesPaymentsTitle')}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('financialOverview')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">{c.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{c.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${c.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-slate-800">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">{t('recentTransactions')}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-800">
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">ID</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">{t('date')}</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">{t('student')}</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">{t('method')}</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">{t('amount')}</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">{t('status')}</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">{t('reference')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-gray-400 text-sm">
                    No payments yet
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/80 dark:hover:bg-slate-800/40">
                    <td className="px-5 py-3 text-xs font-mono text-gray-500">{String(tx.id).slice(0, 8)}</td>
                    <td className="px-5 py-3 text-gray-600 dark:text-gray-300">{tx.date}</td>
                    <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">{tx.student}</td>
                    <td className="px-5 py-3">{tx.method}</td>
                    <td className="px-5 py-3 font-semibold">TZS {Number(tx.amount).toLocaleString()}</td>
                    <td className="px-5 py-3">{tx.status}</td>
                    <td className="px-5 py-3 text-xs text-gray-500">{tx.reference}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}