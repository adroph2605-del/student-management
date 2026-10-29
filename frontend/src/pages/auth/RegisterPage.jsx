import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail, Lock, Eye, EyeOff, Building2, User, Hash,
  Shield, GraduationCap, BookOpen, Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import AuthLayout from '../../components/auth/AuthLayout';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
  const { t } = useTheme();
  const { register } = useAuth();
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

  const passValue = role === 'admin' ? adminPass : role === 'faculty' ? facultyPass : studentPass;
  const strength = passValue.length === 0 ? 0 : passValue.length < 6 ? 1 : passValue.length < 10 ? 2 : 3;

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
        payload = { role: 'admin', email: adminEmail.trim(), password: adminPass, name: 'System Admin' };
      } else if (role === 'faculty') {
        payload = { role: 'faculty', orgName: orgName.trim(), email: orgEmail.trim(), password: facultyPass };
      } else {
        payload = {
          role: 'student',
          studentName: studentName.trim(),
          studentId: studentId.trim(),
          email: studentEmail.trim() || undefined,
          password: studentPass,
        };
      }
      await register(payload);
      toast.success('Account created');
      navigateByRole(role);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const ssoLogin = () => toast.error('SSO not configured yet');

  const strengthColor = ['', 'bg-red-500', 'bg-amber-500', 'bg-emerald-500'][strength];

  return (
    <AuthLayout>
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            {t('createAccount') || 'Create Enterprise Account'}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('registerSubtitle')}</p>
        </div>

        <div className="flex gap-2 mb-6">
          {ROLES.map((r) => {
            const Icon = r.icon;
            const active = role === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => { setRole(r.id); setErrors({}); }}
                className={`flex-1 flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl text-xs font-semibold border transition-all ${
                  active
                    ? 'bg-[#064E3B] text-[#F8E7C9] border-[#064E3B] shadow-md'
                    : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700'
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
                  <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className={inputCls} placeholder="admin@institution.edu" />
                </div>
                {errors.adminEmail && <p className="mt-1 text-xs text-red-500">{errors.adminEmail}</p>}
              </div>
              <div>
                <label className={labelCls}>{t('password')}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type={showPass ? 'text' : 'password'} value={adminPass} onChange={(e) => setAdminPass(e.target.value)} className={`${inputCls} pr-10`} />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passValue && (
                  <div className="mt-2 h-1.5 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">
                    <div className={`h-full ${strengthColor} transition-all`} style={{ width: `${strength * 33.33}%` }} />
                  </div>
                )}
                {errors.adminPass && <p className="mt-1 text-xs text-red-500">{errors.adminPass}</p>}
              </div>
              <div>
                <label className={labelCls}>{t('confirmPassword') || 'Confirm password'}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type={showConfirm ? 'text' : 'password'} value={adminConfirm} onChange={(e) => setAdminConfirm(e.target.value)} className={`${inputCls} pr-10`} />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.adminConfirm && <p className="mt-1 text-xs text-red-500">{errors.adminConfirm}</p>}
              </div>
            </>
          )}

          {role === 'faculty' && (
            <>
              <div>
                <label className={labelCls}>{t('orgName') || 'Organisation name'}</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} className={inputCls} placeholder="Kijani Academy" />
                </div>
                {errors.orgName && <p className="mt-1 text-xs text-red-500">{errors.orgName}</p>}
              </div>
              <div>
                <label className={labelCls}>{t('orgEmail') || 'Organisation email'}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" value={orgEmail} onChange={(e) => setOrgEmail(e.target.value)} className={inputCls} />
                </div>
                {errors.orgEmail && <p className="mt-1 text-xs text-red-500">{errors.orgEmail}</p>}
              </div>
              <div>
                <label className={labelCls}>{t('password')}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type={showPass ? 'text' : 'password'} value={facultyPass} onChange={(e) => setFacultyPass(e.target.value)} className={`${inputCls} pr-10`} />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.facultyPass && <p className="mt-1 text-xs text-red-500">{errors.facultyPass}</p>}
              </div>
              <div>
                <label className={labelCls}>{t('confirmPassword') || 'Confirm password'}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type={showConfirm ? 'text' : 'password'} value={facultyConfirm} onChange={(e) => setFacultyConfirm(e.target.value)} className={inputCls} />
                </div>
                {errors.facultyConfirm && <p className="mt-1 text-xs text-red-500">{errors.facultyConfirm}</p>}
              </div>
            </>
          )}

          {role === 'student' && (
            <>
              <div>
                <label className={labelCls}>{t('studentName') || 'Student name'}</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} className={inputCls} />
                </div>
                {errors.studentName && <p className="mt-1 text-xs text-red-500">{errors.studentName}</p>}
              </div>
              <div>
                <label className={labelCls}>{t('email')} (optional)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} className={inputCls} />
                </div>
                {errors.studentEmail && <p className="mt-1 text-xs text-red-500">{errors.studentEmail}</p>}
              </div>
              <div>
                <label className={labelCls}>{t('studentId') || 'Student ID'}</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} className={inputCls} />
                </div>
                {errors.studentId && <p className="mt-1 text-xs text-red-500">{errors.studentId}</p>}
              </div>
              <div>
                <label className={labelCls}>{t('password')}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text dual-gray-400" />
                  <input type={showPass ? 'text' : 'password'} value={studentPass} onChange={(e) => setStudentPass(e.target.value)} className={`${inputCls} pr-10`} />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.studentPass && <p className="mt-1 text-xs text-red-500">{errors.studentPass}</p>}
              </div>
              <div>
                <label className={labelCls}>{t('confirmPassword') || 'Confirm password'}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type={showConfirm ? 'text' : 'password'} value={studentConfirm} onChange={(e) => setStudentConfirm(e.target.value)} className={inputCls} />
                </div>
                {errors.studentConfirm && <p className="mt-1 text-xs text-red-500">{errors.studentConfirm}</p>}
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-[#064E3B] text-[#F8E7C9] hover:bg-[#04382B] disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {t('createEnterpriseAccount') || 'Create Enterprise Account'}
          </button>
        </form>

        <div className="mt-5">
          <button type="button" onClick={ssoLogin} className="w-full py-2.5 rounded-xl text-xs font-semibold border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200">
            {t('continueSso') || 'Continue with University SSO / Google Workspace'}
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          {t('haveAccount') || 'Already have an account?'}{' '}
          <Link to="/login" className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
            {t('signIn') || 'Sign In'}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}