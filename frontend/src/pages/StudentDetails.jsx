import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Pencil, Mail, Phone, BookOpen, Calendar, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { studentAPI, gradesAPI, attendanceAPI } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function StudentDetails() {
  const { id } = useParams();
  const { t } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await studentAPI.getById(id);
        setStudent(res.data);
        try {
          const g = await gradesAPI.getAll({ studentId: id });
          setGrades(g.data || []);
        } catch {
          setGrades([]);
        }
        try {
          const a = await attendanceAPI.summary(id);
          setAttendance(a.data || []);
        } catch {
          setAttendance([]);
        }
      } catch {
        toast.error('Student not found');
        setStudent(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const tabs = [
    { id: 'overview', label: t('overview') },
    { id: 'academic', label: t('academicRecord') },
    { id: 'attendance', label: t('attendance') },
    { id: 'guardians', label: t('guardians') },
    { id: 'documents', label: t('documents') },
    { id: 'fees', label: t('fees') },
  ];

  const attLetter = (status) => {
    if (status === 'Present') return 'P';
    if (status === 'Late') return 'L';
    if (status === 'Excused') return 'E';
    return 'A';
  };

  const attColor = (s) => {
    if (s === 'P') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300';
    if (s === 'L') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300';
    if (s === 'E') return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300';
    return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300';
  };

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

  if (!student) {
    return <div className="text-center py-20 text-gray-500">Student not found</div>;
  }

  const initials = (student.name || '?')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const guardians = student.guardians || [];

  return (
    <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to="/app/students"
            className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
              {t('studentProfile')}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 truncate">
              {student.studentCode || student._id}
            </p>
          </div>
        </div>
        <Link
          to={`/app/students/${student._id}/edit`}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#064E3B] hover:bg-[#04382B] rounded-lg"
        >
          <Pencil className="w-4 h-4" /> {t('editProfile')}
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="h-20 sm:h-24 bg-gradient-to-r from-[#064E3B] to-[#047857]" />
        <div className="px-4 sm:px-6 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4 -mt-8 sm:-mt-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white dark:bg-slate-800 border-4 border-white dark:border-slate-900 shadow-md flex items-center justify-center text-xl font-bold text-[#064E3B]">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {student.name}
                </h2>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                  {student.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">
                {student.email} · {student.className || '—'}
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-1 overflow-x-auto border-b border-gray-200 dark:border-slate-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#064E3B] text-[#064E3B] dark:text-emerald-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-5">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {student.email || '—'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {student.phone || '—'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Course</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {student.course || '—'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Class</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {student.className || '—'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'academic' && (
              <div className="overflow-x-auto">
                {grades.length === 0 ? (
                  <p className="text-sm text-gray-400 py-8 text-center">No grades yet</p>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-gray-500 border-b border-gray-100 dark:border-slate-800">
                        <th className="py-2">Subject</th>
                        <th className="py-2">Score</th>
                        <th className="py-2">Grade</th>
                        <th className="py-2">Teacher</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grades.map((g) => (
                        <tr key={g._id} className="border-b border-gray-50 dark:border-slate-800">
                          <td className="py-2.5 font-medium text-gray-900 dark:text-white">
                            {g.subject}
                          </td>
                          <td className="py-2.5">{g.score}</td>
                          <td className={`py-2.5 font-semibold ${gradeColor(g.grade)}`}>
                            {g.grade}
                          </td>
                          <td className="py-2.5 text-gray-500">{g.teacher || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {activeTab === 'attendance' && (
              <div className="flex flex-wrap gap-2">
                {attendance.length === 0 ? (
                  <p className="text-sm text-gray-400 py-8 w-full text-center">
                    No attendance records
                  </p>
                ) : (
                  attendance.slice(0, 14).map((a) => {
                    const letter = attLetter(a.status);
                    return (
                      <div
                        key={a._id}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${attColor(letter)}`}
                        title={a.status}
                      >
                        {letter}
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {activeTab === 'guardians' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {guardians.length === 0 ? (
                  <p className="text-sm text-gray-400 py-8">No guardians on file</p>
                ) : (
                  guardians.map((g, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-gray-200 dark:border-slate-800"
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <p className="font-medium text-gray-900 dark:text-white">{g.name}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{g.relation}</p>
                      <p className="text-sm mt-2">{g.phone}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{g.email}</p>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'documents' && (
              <p className="text-center py-10 text-sm text-gray-400">{t('noDocuments')}</p>
            )}

            {activeTab === 'fees' && (
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-800">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {t('currentBalance')}
                </span>
                <span
                  className={`text-lg font-bold ${
                    (student.feeBalance || 0) > 0 ? 'text-red-600' : 'text-emerald-600'
                  }`}
                >
                  {(student.feeBalance || 0) === 0
                    ? t('cleared')
                    : `TZS ${Number(student.feeBalance).toLocaleString()}`}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}