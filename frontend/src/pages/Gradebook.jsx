import { academicRecord } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export default function Gradebook() {
  const { t } = useTheme();

  const gradeColor = (g) => {
    if (g.startsWith('A')) return 'text-emerald-600 dark:text-emerald-400';
    if (g.startsWith('B')) return 'text-blue-600 dark:text-blue-400';
    return 'text-amber-600 dark:text-amber-400';
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{t('gradebook')}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('academicRecord')}</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-800">
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3 uppercase tracking-wider">{t('subject')}</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3 uppercase tracking-wider">{t('score')}</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3 uppercase tracking-wider">{t('grade')}</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3 uppercase tracking-wider">{t('teacher')}</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3 uppercase tracking-wider">{t('comment')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {academicRecord.map((r) => (
                <tr key={r.subject} className="hover:bg-gray-50/80 dark:hover:bg-slate-800/40">
                  <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-white">{r.subject}</td>
                  <td className="px-5 py-3.5 text-gray-600 dark:text-gray-300">{r.score}%</td>
                  <td className={`px-5 py-3.5 font-bold ${gradeColor(r.grade)}`}>{r.grade}</td>
                  <td className="px-5 py-3.5 text-gray-600 dark:text-gray-300">{r.teacher}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-500 dark:text-gray-400">{r.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
