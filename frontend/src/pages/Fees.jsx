import { Wallet, TrendingUp, AlertCircle, ArrowDownLeft } from 'lucide-react';
import { feeSummary, feeTransactions } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export default function Fees() {
  const { t } = useTheme();
  const formatTZS = (n) => `TZS ${(n / 1000000).toFixed(1)}M`;

  const cards = [
    { label: t('totalInvoiced'), value: formatTZS(feeSummary.totalInvoiced), icon: Wallet, color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-900/30' },
    { label: t('collected'), value: formatTZS(feeSummary.collected), icon: TrendingUp, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
    { label: t('outstanding'), value: formatTZS(feeSummary.outstanding), icon: AlertCircle, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/30' },
    { label: t('collectionRate'), value: `${feeSummary.collectionRate}%`, icon: ArrowDownLeft, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/30' },
  ];

  const statusCls = {
    Completed: 'badge-active',
    Pending: 'badge-pending',
    Failed: 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-900/40 dark:text-red-300',
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{t('feesPaymentsTitle')}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('financialOverview')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{c.label}</p>
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
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3 uppercase tracking-wider">ID</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3 uppercase tracking-wider">{t('date')}</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3 uppercase tracking-wider">{t('student')}</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3 uppercase tracking-wider">{t('method')}</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3 uppercase tracking-wider">{t('amount')}</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3 uppercase tracking-wider">{t('status')}</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3 uppercase tracking-wider">{t('reference')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {feeTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/80 dark:hover:bg-slate-800/40">
                  <td className="px-5 py-3 text-xs font-mono text-gray-500">{tx.id}</td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-300">{tx.date}</td>
                  <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">{tx.student}</td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-300">{tx.method}</td>
                  <td className="px-5 py-3 font-semibold text-gray-900 dark:text-white">TZS {tx.amount.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusCls[tx.status]}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs font-mono text-gray-400">{tx.ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}