import { useState } from 'react';
import { Check, X, Clock, ShieldCheck } from 'lucide-react';
import { attendanceRegister } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';

export default function Attendance() {
  const { t } = useTheme();
  const [rows, setRows] = useState(attendanceRegister);

  const statusOptions = [
    { key: 'Present', label: t('present'), icon: Check, cls: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700' },
    { key: 'Absent', label: t('absent'), icon: X, cls: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700' },
    { key: 'Late', label: t('late'), icon: Clock, cls: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700' },
    { key: 'Excused', label: t('excused'), icon: ShieldCheck, cls: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700' },
  ];

  const setStatus = (id, status) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const save = () => toast.success(t('saveAttendance'));

  const counts = {
    Present: rows.filter((r) => r.status === 'Present').length,
    Absent: rows.filter((r) => r.status === 'Absent').length,
    Late: rows.filter((r) => r.status === 'Late').length,
    Excused: rows.filter((r) => r.status === 'Excused').length,
  };

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{t('attendanceRegister')}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('markToday')}</p>
        </div>
        <button onClick={save}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#064E3B] hover:bg-[#04382B] text-white text-sm font-medium rounded-lg shadow-sm">
          {t('saveAttendance')}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.entries(counts).map(([k, v]) => (
          <span key={k} className="text-xs font-medium px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-gray-300">
            {statusOptions.find((o) => o.key === k)?.label}: <strong>{v}</strong>
          </span>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100 dark:divide-slate-800">
          {rows.map((row) => (
            <div key={row.id} className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-3.5">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{row.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{row.class}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {statusOptions.map((opt) => {
                  const Icon = opt.icon;
                  const active = row.status === opt.key;
                  return (
                    <button key={opt.key} onClick={() => setStatus(row.id, opt.key)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-all
                        ${active ? opt.cls : 'bg-gray-50 text-gray-400 border-gray-200 dark:bg-slate-800 dark:text-gray-500 dark:border-slate-700 hover:border-gray-300'}`}>
                      <Icon className="w-3 h-3" /> {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}