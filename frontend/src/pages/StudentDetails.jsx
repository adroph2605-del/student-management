import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Download, Pencil, Mail, Phone, BookOpen, Calendar, User,
} from 'lucide-react';
import {
  students, academicRecord, attendanceGrid, guardians,
} from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export default function StudentDetails() {
  const { id } = useParams();
  const { t } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  const student = students.find((s) => s._id === id) || students[0];

  const tabs = [
    { id: 'overview', label: t('overview') },
    { id: 'academic', label: t('academicRecord') },
    { id: 'attendance', label: t('attendance') },
    { id: 'guardians', label: t('guardians') },
    { id: 'documents', label: t('documents') },
    { id: 'fees', label: t('fees') },
  ];

  const attColor = (s) => {
    if (s === 'P') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300';
    if (s === 'L') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300';
    return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300';
  };

  const gradeColor = (g) => {
    if (g.startsWith('A')) return 'text-emerald-600 dark:text-emerald-400';
    if (g.startsWith('B')) return 'text-blue-600 dark:text-blue-400';
    return 'text-amber-600 dark:text-amber-400';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to="/app/students"
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-slate-800 shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight truncate">
              {t('studentProfile')}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">
              {student.id}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
            <Download className="w-4 h-4 shrink-0" />
            <span className="truncate">{t('downloadRecord')}</span>
          </button>
          <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#064E3B] hover:bg-[#04382B] rounded-lg">
            <Pencil className="w-4 h-4 shrink-0" />
            <span className="truncate">{t('editProfile')}</span>
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="h-20 sm:h-24 bg-gradient-to-r from-[#064E3B] to-[#047857]" />
        <div className="px-4 sm:px-6 pb-4 sm:pb-5">
          <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4 -mt-8 sm:-mt-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-800 border-4 border-white dark:border-slate-900 shadow-md flex items-center justify-center text-xl sm:text-2xl font-bold text-[#064E3B] dark:text-emerald-400 shrink-0">
              {student.avatar}
            </div>
            <div className="flex-1 sm:pb-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                  {student.name}
                </h2>
                <span
                  className={`inline-flex items-center rounded-full px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-medium ring-1 ring-inset ${
                    student.status === 'Active' ? 'badge-active' : 'badge-pending'
                  }`}
                >
                  {student.status === 'Active' ? t('active') : t('pending')}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                {student.email} · {student.class}
              </p>
            </div>
          </div>

          {/* Tabs - horizontal scroll on mobile */}
          <div className="mt-5 sm:mt-6 flex gap-0.5 sm:gap-1 overflow-x-auto border-b border-gray-200 dark:border-slate-800 -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2.5 sm:px-3 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#064E3B] text-[#064E3B] dark:border-emerald-400 dark:text-emerald-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-4 sm:mt-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { icon: Mail, label: 'Email', value: student.email },
                  { icon: Phone, label: t('institutionalEmail'), value: student.phone },
                  { icon: BookOpen, label: t('class'), value: student.course },
                  { icon: User, label: t('gender'), value: `${student.age} yrs · ${student.gender}` },
                  { icon: Calendar, label: t('date'), value: student.enrollmentDate },
                  { icon: BookOpen, label: t('class'), value: student.yearGroup },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label + item.value}
                      className="flex items-start gap-3 p-3 sm:p-3.5 rounded-lg bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800"
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          {item.label}
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white mt-0.5 break-all">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'academic' && (
              <div className="overflow-x-auto -mx-1">
                <table className="w-full text-sm min-w-[480px]">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-slate-800">
                      <th className="text-left text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 py-2 pr-3 sm:pr-4">
                        {t('subject')}
                      </th>
                      <th className="text-left text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 py-2 pr-3 sm:pr-4">
                        {t('score')}
                      </th>
                      <th className="text-left text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 py-2 pr-3 sm:pr-4">
                        {t('grade')}
                      </th>
                      <th className="text-left text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 py-2 pr-3 sm:pr-4 hidden sm:table-cell">
                        {t('teacher')}
                      </th>
                      <th className="text-left text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 py-2 hidden md:table-cell">
                        {t('comment')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                    {academicRecord.map((r) => (
                      <tr key={r.subject}>
                        <td className="py-2.5 sm:py-3 pr-3 sm:pr-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm">
                          {r.subject}
                        </td>
                        <td className="py-2.5 sm:py-3 pr-3 sm:pr-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                          {r.score}%
                        </td>
                        <td className={`py-2.5 sm:py-3 pr-3 sm:pr-4 font-bold text-xs sm:text-sm ${gradeColor(r.grade)}`}>
                          {r.grade}
                        </td>
                        <td className="py-2.5 sm:py-3 pr-3 sm:pr-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm hidden sm:table-cell">
                          {r.teacher}
                        </td>
                        <td className="py-2.5 sm:py-3 text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs hidden md:table-cell">
                          {r.comment}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'attendance' && (
              <div>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mb-3">
                  P = Present · L = Late · A = Absent
                </p>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
                  {attendanceGrid.map((d) => (
                    <div key={d.date} className="text-center">
                      <div
                        className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold ${attColor(
                          d.status
                        )}`}
                      >
                        {d.status}
                      </div>
                      <p className="text-[9px] sm:text-[10px] text-gray-400 mt-1 truncate">
                        {d.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'guardians' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {guardians.map((g) => (
                  <div
                    key={g.name}
                    className="p-3.5 sm:p-4 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50"
                  >
                    <div className="flex items-center gap-2 mb-1.5 sm:mb-2 flex-wrap">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {g.name}
                      </p>
                      {g.primary && (
                        <span className="text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded">
                          {t('primary')}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {g.relation}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                      {g.phone}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 break-all">
                      {g.email}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="text-center py-8 sm:py-10 text-sm text-gray-400">
                {t('noDocuments')}
              </div>
            )}

            {activeTab === 'fees' && (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3.5 sm:p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-800">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {t('currentBalance')}
                  </span>
                  <span
                    className={`text-base sm:text-lg font-bold ${
                      student.feeBalance > 0 ? 'text-red-600' : 'text-emerald-600'
                    }`}
                  >
                    {student.feeBalance === 0
                      ? t('cleared')
                      : `TZS ${student.feeBalance.toLocaleString()}`}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}