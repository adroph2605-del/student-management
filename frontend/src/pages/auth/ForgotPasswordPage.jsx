import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, AlertCircle, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';
import { useTheme } from '../../context/ThemeContext';

export default function ForgotPasswordPage() {
  const { lang } = useTheme();
  const t = (eng, sw) => (lang === 'SW' ? sw : eng);

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError(t('Email is required', 'Barua pepe inahitajika'));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t('Enter a valid email address', 'Ingiza barua pepe sahihi'));
      return;
    }
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSent(true);
  };

  const inputBase =
    'w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-800/50 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200';

  return (
    <AuthLayout>
      <div>
        {!sent ? (
          <>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              {t('Reset Your Password', 'Weka Upya Nenosiri')}
            </h2>
            <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
              {t(
                "Enter your institutional email and we'll send you a recovery link.",
                'Ingiza barua pepe yako ya taasisi na tutakutumia kiungo cha kurejesha.'
              )}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  {t('Institutional Email', 'Barua Pepe ya Taasisi')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder="grace@university.edu"
                    className={`${inputBase} ${error ? 'border-red-300 dark:border-red-500' : 'border-gray-200 dark:border-slate-700'}`}
                  />
                </div>
                {error && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#064E3B] hover:bg-[#04382B] text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-900/20 hover:shadow-xl transition-all duration-200 disabled:opacity-60"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> {t('Sending...', 'Inatuma...')}</>
                ) : (
                  t('Send Recovery Link', 'Tuma Kiungo cha Kurejesha')
                )}
              </button>
            </form>

            <Link to="/login"
              className="mt-6 flex items-center justify-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-[#064E3B] dark:hover:text-emerald-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {t('Back to Sign In', 'Rudi Kuingia')}
            </Link>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mb-5">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              {t('Check Your Email', 'Angalia Barua Pepe Yako')}
            </h2>
            <div className="mt-4 p-4 rounded-xl backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('A recovery link has been sent to', 'Kiungo cha kurejesha kimetumwa kwa')}{' '}
                <strong className="text-gray-900 dark:text-white">{email}</strong>.{' '}
                {t('Follow the instructions in the email to reset your password.',
                  'Fuata maelekezo kwenye barua pepe kuweka upya nenosiri lako.')}
              </p>
            </div>
            <p className="mt-4 text-xs text-gray-400">
              {t("Didn't receive it?", 'Hujapokea?')}{' '}
              <button onClick={() => { setSent(false); setEmail(''); }}
                className="font-semibold text-[#064E3B] dark:text-emerald-400 hover:underline">
                {t('Try again', 'Jaribu tena')}
              </button>
            </p>
            <Link to="/login"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-[#064E3B] dark:hover:text-emerald-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {t('Back to Sign In', 'Rudi Kuingia')}
            </Link>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}