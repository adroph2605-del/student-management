import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail, Lock, Eye, EyeOff, Building2, Hash,
  Shield, GraduationCap, BookOpen, Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import AuthLayout from '../../components/auth/AuthLayout';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
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
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [orgEmail, setOrgEmail] = useState('');
  const [facultyPass, setFacultyPass] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentPass, setStudentPass] = useState('');

  const inputCls =
    'w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-colors';
  const labelCls = 'block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5';

  const validate = () => {
    const e = {};
    if (role === 'admin') {
      if (!adminEmail.trim()) e.adminEmail = t('errEmailRequired');
      if (!adminPass) e.adminPass = t('errPassRequired');
    }
    if (role === 'faculty') {
      if (!orgEmail.trim()) e.orgEmail = t('errOrgEmail');
      if (!facultyPass) e.facultyPass = t('errPassRequired');
    }
    if (role === 'student') {
      if (!studentId.trim()) e.studentId = t('errStudentId');
      if (!studentPass) e.studentPass = t('errPassRequired');
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const navigateByRole = (r) => {
    if (r === 'admin') navigate('/admin');
    else if (r === 'student') navigate('/student');
    else navigate('/app');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      let payload = { role };
      if (role === 'admin') {
        payload = { role: 'admin', email: adminEmail.trim(), password: adminPass };
      } else if (role === 'faculty') {
        payload = { role: 'faculty', orgEmail: orgEmail.trim(), password: facultyPass };
      } else {
        payload = { role: 'student', studentId: studentId.trim(), password: studentPass };
      }
      await login(payload);
      toast.success('Welcome back');
      navigateByRole(role);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const ssoLogin = () => {
    toast.error('SSO not configured yet — use email / password');
  };

  return (
    <AuthLayout>
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            {t('welcomeBack')}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('loginSubtitle')}</p>
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
                  <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} placeholder="admin@institution.edu" className={inputCls} />
                </div>
                {errors.adminEmail && <p className="mt-1 text-xs text-red-500">{errors.adminEmail}</p>}
              </div>
              <div>
                <label className={labelCls}>{t('password')}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type={showPass ? 'text' : 'password'} value={adminPass} onChange={(e) => setAdminPass(e.target.value)} placeholder="••••••••" className={`${inputCls} pr-10`} />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.adminPass && <p className="mt-1 text-xs text-red-500">{errors.adminPass}</p>}
              </div>
            </>
          )}

          {role === 'faculty' && (
            <>
              <div>
                <label className={labelCls}>{t('orgEmail') || 'Organisation email'}</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" value={orgEmail} onChange={(e) => setOrgEmail(e.target.value)} placeholder="registrar@school.edu" className={inputCls} />
                </div>
                {errors.orgEmail && <p className="mt-1 text-xs text-red-500">{errors.orgEmail}</p>}
              </div>
              <div>
                <label className={labelCls}>{t('password')}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type={showPass ? 'text' : 'password'} value={facultyPass} onChange={(e) => setFacultyPass(e.target.value)} placeholder="••••••••" className={`${inputCls} pr-10`} />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.facultyPass && <p className="mt-1 text-xs text-red-500">{errors.facultyPass}</p>}
              </div>
            </>
          )}

          {role === 'student' && (
            <>
              <div>
                <label className={labelCls}>{t('studentId') || 'Student ID'}</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="STU-2024-0001" className={inputCls} />
                </div>
                {errors.studentId && <p className="mt-1 text-xs text-red-500">{errors.studentId}</p>}
              </div>
              <div>
                <label className={labelCls}>{t('password')}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type={showPass ? 'text' : 'password'} value={studentPass} onChange={(e) => setStudentPass(e.target.value)} placeholder="••••••••" className={`${inputCls} pr-10`} />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.studentPass && <p className="mt-1 text-xs text-red-500">{errors.studentPass}</p>}
              </div>
            </>
          )}

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300 cursor-pointer">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
              {t('rememberDevice') || 'Remember this device'}
            </label>
            <Link to="/forgot-password" className="font-medium text-emerald-700 dark:text-emerald-400 hover:underline">
              {t('forgotPassword') || 'Forgot password?'}
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-[#064E3B] text-[#F8E7C9] hover:bg-[#04382B] disabled:opacity-60 transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {t('accessDashboard') || 'Access Dashboard'}
          </button>
        </form>

        <div className="mt-5">
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-slate-700" /></div>
            <div className="relative flex justify-center text-xs"><span className="px-2 bg-white dark:bg-slate-900 text-gray-400">or</span></div>
          </div>
          <button type="button" onClick={ssoLogin} className="w-full py-2.5 rounded-xl text-xs font-semibold border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800">
            {t('continueSso') || 'Continue with University SSO / Google Workspace'}
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          {t('noAccount') || "Don't have an account?"}{' '}
          <Link to="/register" className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
            {t('signUp') || 'Sign up'}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}