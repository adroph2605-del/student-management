import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { gradesAPI } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Gradebook() {
  const { t } = useTheme();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    gradesAPI
      .getAll()
      .then((res) => setRows(res.data || []))
      .catch(() => toast.error('Failed to load grades'))
      .finally(() => setLoading(false));
  }, []);

  const gradeColor = (g = '') => {
    if (String(g).startsWith('A')) return 'text-emerald-600 dark:text-emerald-400';
    if (String(g).startsWith('B')) return 'text-blue-600 dark:text-blue-400';
    return 'text-amber-600 dark:text-amber-400';
  };

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
          {t('gradebook')}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('academicRecord')}</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-800">
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 uppercase">
                  {t('subject')}
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 uppercase">
                  Student
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 uppercase">
                  {t('score')}
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 uppercase">
                  {t('grade')}
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 uppercase">
                  {t('teacher')}
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 uppercase">
                  {t('comment')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-400">
                    No grades in database yet
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r._id} className="hover:bg-gray-50/80 dark:hover:bg-slate-800/40">
                    <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-white">
                      {r.subject}
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 dark:text-gray-300">
                      {r.student?.name || '—'}
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 dark:text-gray-300">{r.score}%</td>
                    <td className={`px-5 py-3.5 font-bold ${gradeColor(r.grade)}`}>{r.grade}</td>
                    <td className="px-5 py-3.5 text-gray-600 dark:text-gray-300">
                      {r.teacher || '—'}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-500">{r.comment || '—'}</td>
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