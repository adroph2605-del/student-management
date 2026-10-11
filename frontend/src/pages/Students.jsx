import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Plus, MoreHorizontal, Eye, Pencil, Trash2,
  MessageSquare, Download, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { students as mockStudents } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export default function Students() {
  const { t } = useTheme();

  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(null);
  const perPage = 10;

  const filtered = mockStudents.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch =
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q);
    const matchYear = yearFilter === 'All' || s.yearGroup === yearFilter;
    const matchStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchSearch && matchYear && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selected.length === paged.length) setSelected([]);
    else setSelected(paged.map((s) => s._id));
  };

  const formatFee = (n) =>
    n === 0 ? t('cleared') : `TZS ${n.toLocaleString()}`;

  return (
    <div className="space-y-4 sm:space-y-5 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            {t('studentsDirectory')}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {filtered.length} {t('students')}
          </p>
        </div>
        <Link
          to="/app/students/enroll"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#064E3B] hover:bg-[#04382B] text-white text-sm font-medium rounded-lg transition-colors shadow-sm w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" /> {t('enrollStudent')}
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-3 sm:p-4 shadow-sm">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder={t('searchStudents')}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
          </div>
          <div className="flex gap-2 sm:gap-3">
            <select
              value={yearFilter}
              onChange={(e) => {
                setYearFilter(e.target.value);
                setPage(1);
              }}
              className="flex-1 sm:flex-none px-3 py-2.5 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 cursor-pointer min-w-0"
            >
              <option value="All">{t('allYearGroups')}</option>
              <option value="Year 9">Year 9</option>
              <option value="Year 10">Year 10</option>
              <option value="Year 11">Year 11</option>
              <option value="Year 12">Year 12</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="flex-1 sm:flex-none px-3 py-2.5 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 cursor-pointer min-w-0"
            >
              <option value="All">{t('allStatus')}</option>
              <option value="Active">{t('active')}</option>
              <option value="Pending">{t('pending')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk toolbar */}
      {selected.length > 0 && (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 px-3 sm:px-4 py-2.5 rounded-xl bg-[#064E3B] text-white text-sm">
          <span className="font-medium">
            {selected.length} {t('selected')}
          </span>
          <div className="flex gap-2 sm:ml-auto">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('messageGuardians')}</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium">
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('exportSelected')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-800">
                <th className="w-10 px-3 sm:px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selected.length === paged.length && paged.length > 0}
                    onChange={toggleAll}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </th>
                <th className="text-left font-semibold text-gray-600 dark:text-gray-400 px-3 sm:px-4 py-3 text-[10px] sm:text-xs uppercase tracking-wider">
                  ID
                </th>
                <th className="text-left font-semibold text-gray-600 dark:text-gray-400 px-3 sm:px-4 py-3 text-[10px] sm:text-xs uppercase tracking-wider">
                  {t('student')}
                </th>
                <th className="text-left font-semibold text-gray-600 dark:text-gray-400 px-3 sm:px-4 py-3 text-[10px] sm:text-xs uppercase tracking-wider hidden md:table-cell">
                  {t('class')}
                </th>
                <th className="text-left font-semibold text-gray-600 dark:text-gray-400 px-3 sm:px-4 py-3 text-[10px] sm:text-xs uppercase tracking-wider hidden lg:table-cell">
                  {t('gender')}
                </th>
                <th className="text-left font-semibold text-gray-600 dark:text-gray-400 px-3 sm:px-4 py-3 text-[10px] sm:text-xs uppercase tracking-wider hidden lg:table-cell">
                  {t('attendance')}
                </th>
                <th className="text-left font-semibold text-gray-600 dark:text-gray-400 px-3 sm:px-4 py-3 text-[10px] sm:text-xs uppercase tracking-wider">
                  {t('status')}
                </th>
                <th className="text-left font-semibold text-gray-600 dark:text-gray-400 px-3 sm:px-4 py-3 text-[10px] sm:text-xs uppercase tracking-wider hidden md:table-cell">
                  {t('feeBalance')}
                </th>
                <th className="w-10 px-3 sm:px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {paged.map((s) => (
                <tr
                  key={s._id}
                  className="hover:bg-gray-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-3 sm:px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(s._id)}
                      onChange={() => toggleSelect(s._id)}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-[10px] sm:text-xs font-mono text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {s.id}
                  </td>
                  <td className="px-3 sm:px-4 py-3">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0">
                        {s.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white truncate text-sm">
                          {s.name}
                        </p>
                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">
                          {s.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-gray-600 dark:text-gray-300 hidden md:table-cell whitespace-nowrap">
                    {s.class}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-gray-600 dark:text-gray-300 hidden lg:table-cell">
                    {s.gender}
                  </td>
                  <td className="px-3 sm:px-4 py-3 hidden lg:table-cell">
                    <span
                      className={`text-xs font-semibold ${
                        s.attendance >= 95
                          ? 'text-emerald-600'
                          : s.attendance >= 90
                          ? 'text-amber-600'
                          : 'text-red-600'
                      }`}
                    >
                      {s.attendance}%
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-medium ring-1 ring-inset ${
                        s.status === 'Active' ? 'badge-active' : 'badge-pending'
                      }`}
                    >
                      {s.status === 'Active' ? t('active') : t('pending')}
                    </span>
                  </td>
                  <td
                    className={`px-3 sm:px-4 py-3 text-xs font-medium hidden md:table-cell whitespace-nowrap ${
                      s.feeBalance > 0
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {formatFee(s.feeBalance)}
                  </td>
                  <td className="px-3 sm:px-4 py-3 relative">
                    <button
                      onClick={() =>
                        setMenuOpen(menuOpen === s._id ? null : s._id)
                      }
                      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-slate-800"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    {menuOpen === s._id && (
                      <>
                        {/* Backdrop to close menu on mobile */}
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setMenuOpen(null)}
                        />
                        <div className="absolute right-2 sm:right-4 top-10 z-20 w-40 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 py-1">
                          <Link
                            to={`/app/students/${s._id}`}
                            onClick={() => setMenuOpen(null)}
                            className="flex items-center gap-2 px-3 py-2.5 text-xs text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700"
                          >
                            <Eye className="w-3.5 h-3.5" /> {t('viewProfile')}
                          </Link>
                          <button className="flex items-center gap-2 w-full px-3 py-2.5 text-xs text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700">
                            <Pencil className="w-3.5 h-3.5" /> {t('edit')}
                          </button>
                          <button className="flex items-center gap-2 w-full px-3 py-2.5 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                            <Trash2 className="w-3.5 h-3.5" /> {t('delete')}
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between px-3 sm:px-4 py-3 border-t border-gray-100 dark:border-slate-800 text-xs text-gray-500 dark:text-gray-400">
          <span className="text-center sm:text-left">
            {t('showing')}{' '}
            {Math.min((page - 1) * perPage + 1, filtered.length)}–
            {Math.min(page * perPage, filtered.length)} {t('of')}{' '}
            {filtered.length}
          </span>
          <div className="flex items-center justify-center gap-1">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-7 h-7 rounded-lg text-xs font-medium ${
                  p === page
                    ? 'bg-[#064E3B] text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-slate-800'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}