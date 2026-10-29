import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Plus, MoreHorizontal, Eye, Pencil, Trash2,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { studentAPI } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Students() {
  const { t } = useTheme();
  const [students, setStudents] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(null);
  const perPage = 10;

  const load = async () => {
    try {
      setLoading(true);
      const res = await studentAPI.getAll({
        search: search || undefined,
        status: statusFilter !== 'All' ? statusFilter : undefined,
        yearGroup: yearFilter !== 'All' ? yearFilter : undefined,
        page,
        limit: perPage,
      });
      setStudents(res.data || []);
      setTotal(res.total || 0);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load students');
      setStudents([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [search, statusFilter, yearFilter, page]);

  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    try {
      await studentAPI.delete(id);
      toast.success('Student deleted');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  const formatFee = (n) =>
    !n || n === 0 ? t('cleared') : `TZS ${Number(n).toLocaleString()}`;

  return (
    <div className="space-y-4 sm:space-y-5 max-w-7xl mx-auto">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            {t('studentsDirectory')}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {total} {t('students')}
          </p>
        </div>
        <Link
          to="/app/students/enroll"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#064E3B] hover:bg-[#04382B] text-white text-sm font-medium rounded-lg transition-colors shadow-sm w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" /> {t('enrollStudent')}
        </Link>
      </div>

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
              placeholder={t('searchStudents') || 'Search name, email, ID...'}
              className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="text-sm rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2"
          >
            <option value="All">All status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Graduated">Graduated</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : students.length === 0 ? (
          <div className="text-center py-16 text-sm text-gray-500">
            No students found. Enroll the first student.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-800">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Class</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Fees</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {students.map((s) => (
                  <tr key={s._id} className="hover:bg-gray-50/80 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 dark:text-white">{s.name}</p>
                      <p className="text-xs text-gray-500">{s.email}</p>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">
                      {s.studentCode || '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {s.className || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                      {formatFee(s.feeBalance)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1 relative">
                        <Link
                          to={`/app/students/${s._id}`}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                        >
                          <Eye className="w-4 h-4 text-gray-500" />
                        </Link>
                        <Link
                          to={`/app/students/${s._id}/edit`}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                        >
                          <Pencil className="w-4 h-4 text-gray-500" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(s._id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-slate-800 text-xs text-gray-500">
          <span>
            {t('showing') || 'Showing'} {students.length} {t('of') || 'of'} {total}
          </span>
          <div className="flex items-center gap-1">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2">{page}</span>
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