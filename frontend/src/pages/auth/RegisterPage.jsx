import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail, Lock, Eye, EyeOff, Building2, User, Hash,
  Shield, GraduationCap, BookOpen, Loader2, CheckCircle2,
} from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
  const { t } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

  const ROLES = [
    { id: 'admin', label: t('roleAdmin'), icon: Shield },
    { id: 'faculty', label: t('roleFaculty'), icon: BookOpen },
    { id: 'student', label: t('roleStudent'), icon: GraduationCap },
  ];

  const [role, setRole] = useState('admin');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [adminEmail, setAdminEmail] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [adminConfirm, setAdminConfirm] = useState('');
  const [orgName, setOrgName] = useState('');
  const [orgEmail, setOrgEmail] = useState('');
  const [facultyPass, setFacultyPass] = useState('');
  const [facultyConfirm, setFacultyConfirm] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentPass, setStudentPass] = useState('');
  const [studentConfirm, setStudentConfirm] = useState('');

  const inputCls =
    'w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-colors';
  const labelCls = 'block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5';
  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const passValue =
    role === 'admin' ? adminPass : role === 'faculty' ? facultyPass : studentPass;
  const strength =
    passValue.length === 0 ? 0 : passValue.length < 6 ? 1 : passValue.length < 10 ? 2 : 3;

  const validate = () => {
    const e = {};
    if (role === 'admin') {
      if (!adminEmail.trim()) e.adminEmail = t('errEmailRequired');
      else if (!validateEmail(adminEmail)) e.adminEmail = t('errValidEmail');
      if (!adminPass || adminPass.length < 6) e.adminPass = t('errPassMin');
      if (adminPass !== adminConfirm) e.adminConfirm = t('errPassMismatch');
    }
    if (role === 'faculty') {
      if (!orgName.trim()) e.orgName = t('errOrgName');
      if (!orgEmail.trim()) e.orgEmail = t('errOrgEmail');
      else if (!validateEmail(orgEmail)) e.orgEmail = t('errValidEmail');
      if (!facultyPass || facultyPass.length < 6) e.facultyPass = t('errPassMin');
      if (facultyPass !== facultyConfirm) e.facultyConfirm = t('errPassMismatch');
    }
    if (role === 'student') {
      if (!studentName.trim()) e.studentName = t('errStudentName');
      if (studentEmail.trim() && !validateEmail(studentEmail)) e.studentEmail = t('errValidEmail');
      if (!studentId.trim()) e.studentId = t('errStudentId');
      if (!studentPass || studentPass.length < 6) e.studentPass = t('errPassMin');
      if (studentPass !== studentConfirm) e.studentConfirm = t('errPassMismatch');
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goByRole = (r) => {
    login({
      role: r,
      name:
        r === 'student'
          ? studentName || 'Student'
          : r === 'faculty'
          ? orgName || 'Faculty'
          : 'System Admin',
      email: adminEmail || orgEmail || studentEmail || '',
      studentId: studentId || '',
      orgName: orgName || '',
    });
    if (r === 'admin') navigate('/admin');
    else if (r === 'student') navigate('/student');
    else navigate('/app');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      goByRole(role);
    }, 800);
  };

  const ssoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      goByRole(role);
    }, 600);
  };

  const PasswordFields = ({ value, onChange, confirm, onConfirm, errPass, errConfirm }) => (
    <>
      <div>
        <label className={labelCls}>{t('password')}</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type={showPass ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            placeholder="••••••••"
            className={`${inputCls} pr-11`}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errPass && <p className="text-[11px] text-red-500 mt-1">{errPass}</p>}
      </div>
      <div>
        <label className={labelCls}>{t('confirmPassword')}</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type={showConfirm ? 'text' : 'password'}
            value={confirm}
            onChange={onConfirm}
            placeholder="••••••••"
            className={`${inputCls} pr-11`}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errConfirm && <p className="text-[11px] text-red-500 mt-1">{errConfirm}</p>}
      </div>
    </>
  );

  return (
    <AuthLayout>
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            {t('createAccount')}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t('registerSubtitle')}
          </p>
        </div>

        <div className="flex gap-2 mb-6">
          {ROLES.map((r) => {
            const Icon = r.icon;
            const active = role === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  setRole(r.id);
                  setErrors({});
                }}
                className={`flex-1 flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl text-xs font-semibold border transition-all ${
                  active
                    ? 'bg-[#064E3B] text-[#F8E7C9] border-[#064E3B] shadow-md'
                    : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:border-emerald-500/40'
                }`}
              >
                <Icon className="w-4 h-4" />
                {r.label}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {role === 'admin' && (
            <>
              <div>
                <label className={labelCls}>{t('email')}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="admin@institution.edu"
                    className={inputCls}
                  />
                </div>
                {errors.adminEmail && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.adminEmail}</p>
                )}
              </div>
              <PasswordFields
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                confirm={adminConfirm}
                onConfirm={(e) => setAdminConfirm(e.target.value)}
                errPass={errors.adminPass}
                errConfirm={errors.adminConfirm}
              />
            </>
          )}

          {role === 'faculty' && (
            <>
              <div>
                <label className={labelCls}>{t('orgName')}</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. University of Dar es Salaam"
                    className={inputCls}
                  />
                </div>
                {errors.orgName && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.orgName}</p>
                )}
              </div>
              <div>
                <label className={labelCls}>{t('orgEmail')}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={orgEmail}
                    onChange={(e) => setOrgEmail(e.target.value)}
                    placeholder="registrar@university.edu"
                    className={inputCls}
                  />
                </div>
                {errors.orgEmail && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.orgEmail}</p>
                )}
              </div>
              <PasswordFields
                value={facultyPass}
                onChange={(e) => setFacultyPass(e.target.value)}
                confirm={facultyConfirm}
                onConfirm={(e) => setFacultyConfirm(e.target.value)}
                errPass={errors.facultyPass}
                errConfirm={errors.facultyConfirm}
              />
            </>
          )}

          {role === 'student' && (
            <>
              <div>
                <label className={labelCls}>{t('studentName')}</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Amina Yusuf"
                    className={inputCls}
                  />
                </div>
                {errors.studentName && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.studentName}</p>
                )}
              </div>
              <div>
                <label className={labelCls}>
                  {t('studentEmail')}{' '}
                  <span className="font-normal text-gray-400">{t('optional')}</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="student@email.com"
                    className={inputCls}
                  />
                </div>
                {errors.studentEmail && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.studentEmail}</p>
                )}
              </div>
              <div>
                <label className={labelCls}>{t('studentId')}</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="e.g. STU-2026-0142"
                    className={inputCls}
                  />
                </div>
                {errors.studentId && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.studentId}</p>
                )}
              </div>
              <PasswordFields
                value={studentPass}
                onChange={(e) => setStudentPass(e.target.value)}
                confirm={studentConfirm}
                onConfirm={(e) => setStudentConfirm(e.target.value)}
                errPass={errors.studentPass}
                errConfirm={errors.studentConfirm}
              />
            </>
          )}

          {passValue.length > 0 && (
            <div className="space-y-1">
              <div className="flex gap-1">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className={`h-1 flex-1 rounded-full ${
                      strength >= n
                        ? n === 1
                          ? 'bg-red-400'
                          : n === 2
                          ? 'bg-amber-400'
                          : 'bg-emerald-500'
                        : 'bg-gray-200 dark:bg-slate-700'
                    }`}
                  />
                ))}
              </div>
              <p className="text-[10px] text-gray-400">
                {strength === 1 && t('passWeak')}
                {strength === 2 && t('passMedium')}
                {strength === 3 && t('passStrong')}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-[#064E3B] text-[#F8E7C9] hover:bg-[#04382B] transition-all hover:scale-[1.01] disabled:opacity-60 shadow-lg shadow-emerald-900/20"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> {t('creatingAccount')}
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" /> {t('createEnterpriseAccount')}
              </>
            )}
          </button>
        </form>

        <div className="mt-5">
          <div className="relative flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700" />
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
              {t('orContinueWith')}
            </span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={ssoLogin}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {t('googleWorkspace')}
            </button>
            <button
              type="button"
              onClick={ssoLogin}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              <GraduationCap className="w-4 h-4 text-[#064E3B]" />
              {t('universitySso')}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          {t('alreadyHaveAccount')}{' '}
          <Link
            to="/login"
            className="font-semibold text-[#064E3B] dark:text-emerald-400 hover:underline"
          >
            {t('signInLink')}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}