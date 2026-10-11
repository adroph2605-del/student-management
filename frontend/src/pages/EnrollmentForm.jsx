import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, User, Users, BookOpen, ClipboardCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';

const steps = [
  { id: 1, label: 'Student details', labelSw: 'Taarifa za Mwanafunzi', icon: User },
  { id: 2, label: 'Guardian & contacts', labelSw: 'Mlezi & Mawasiliano', icon: Users },
  { id: 3, label: 'Academic placement', labelSw: 'Uwekaji wa Kitaaluma', icon: BookOpen },
  { id: 4, label: 'Review & enroll', labelSw: 'Kagua & Sajili', icon: ClipboardCheck },
];

const initial = {
  firstName: '', lastName: '', email: '', phone: '', gender: '', dob: '',
  guardianName: '', guardianPhone: '', guardianEmail: '', relation: '',
  yearGroup: '', className: '', course: '',
};

export default function EnrollmentForm() {
  const { lang } = useTheme();
  const t = (eng, sw) => (lang === 'SW' ? sw : eng);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  const set = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const validateStep = () => {
    const e = {};
    if (step === 1) {
      if (!form.firstName.trim()) e.firstName = t('Required', 'Inahitajika');
      if (!form.lastName.trim()) e.lastName = t('Required', 'Inahitajika');
      if (!form.email.trim()) e.email = t('Required', 'Inahitajika');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = t('Enter a valid email, e.g. anna@example.com', 'Ingiza barua pepe sahihi, mf. anna@example.com');
      if (!form.gender) e.gender = t('Required', 'Inahitajika');
    }
    if (step === 2) {
      if (!form.guardianName.trim()) e.guardianName = t('Required', 'Inahitajika');
      if (!form.guardianPhone.trim()) e.guardianPhone = t('Required', 'Inahitajika');
    }
    if (step === 3) {
      if (!form.yearGroup) e.yearGroup = t('Required', 'Inahitajika');
      if (!form.className) e.className = t('Required', 'Inahitajika');
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep()) setStep((s) => Math.min(4, s + 1)); };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const submit = () => {
    toast.success(t('Student enrolled successfully!', 'Mwanafunzi amesajiliwa!'));
    navigate('/students');
  };

  const inputCls = (err) =>
    `w-full px-3.5 py-2.5 text-sm border rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white
     focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500
     ${err ? 'border-red-300 bg-red-50 dark:bg-red-900/20' : 'border-gray-200 dark:border-slate-700'}`;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/students" className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{t('Enroll a new student', 'Sajili mwanafunzi mpya')}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{t('Complete all steps to register the student', 'Kamilisha hatua zote kusajili mwanafunzi')}</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const done = step > s.id;
          const active = step === s.id;
          return (
            <div key={s.id} className="flex items-center gap-2 shrink-0">
              {i > 0 && <div className={`w-8 h-px ${done ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-slate-700'}`} />}
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold
                ${active ? 'bg-[#064E3B] text-white' : done ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-gray-400'}`}>
                {done ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                {t(s.label, s.labelSw)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm p-6 space-y-5">
          {step === 1 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('First Name', 'Jina la Kwanza')} *</label>
                  <input value={form.firstName} onChange={(e) => set('firstName', e.target.value)} className={inputCls(errors.firstName)} placeholder="Amina" />
                  {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('Last Name', 'Jina la Familia')} *</label>
                  <input value={form.lastName} onChange={(e) => set('lastName', e.target.value)} className={inputCls(errors.lastName)} placeholder="Yusuf" />
                  {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email *</label>
                <input value={form.email} onChange={(e) => set('email', e.target.value)} className={inputCls(errors.email)} placeholder="amina.yusuf@student.kijani.edu" />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('Phone', 'Simu')}</label>
                  <input value={form.phone} onChange={(e) => set('phone', e.target.value)} className={inputCls()} placeholder="+255 712 345 678" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('Gender', 'Jinsia')} *</label>
                  <select value={form.gender} onChange={(e) => set('gender', e.target.value)} className={inputCls(errors.gender)}>
                    <option value="">{t('Select', 'Chagua')}</option>
                    <option value="Female">{t('Female', 'Mke')}</option>
                    <option value="Male">{t('Male', 'Mme')}</option>
                  </select>
                  {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender}</p>}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('Date of Birth', 'Tarehe ya Kuzaliwa')}</label>
                <input type="date" value={form.dob} onChange={(e) => set('dob', e.target.value)} className={inputCls()} />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('Guardian Full Name', 'Jina Kamili la Mlezi')} *</label>
                <input value={form.guardianName} onChange={(e) => set('guardianName', e.target.value)} className={inputCls(errors.guardianName)} placeholder="Hassan Yusuf" />
                {errors.guardianName && <p className="mt-1 text-xs text-red-600">{errors.guardianName}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('Guardian Phone', 'Simu ya Mlezi')} *</label>
                  <input value={form.guardianPhone} onChange={(e) => set('guardianPhone', e.target.value)} className={inputCls(errors.guardianPhone)} placeholder="+255 712 111 222" />
                  {errors.guardianPhone && <p className="mt-1 text-xs text-red-600">{errors.guardianPhone}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('Relation', 'Uhusiano')}</label>
                  <select value={form.relation} onChange={(e) => set('relation', e.target.value)} className={inputCls()}>
                    <option value="">{t('Select', 'Chagua')}</option>
                    <option value="Father">{t('Father', 'Baba')}</option>
                    <option value="Mother">{t('Mother', 'Mama')}</option>
                    <option value="Guardian">{t('Guardian', 'Mlezi')}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('Guardian Email', 'Barua pepe ya Mlezi')}</label>
                <input value={form.guardianEmail} onChange={(e) => set('guardianEmail', e.target.value)} className={inputCls()} placeholder="hassan.y@email.com" />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('Year Group', 'Kundi la Mwaka')} *</label>
                  <select value={form.yearGroup} onChange={(e) => set('yearGroup', e.target.value)} className={inputCls(errors.yearGroup)}>
                    <option value="">{t('Select', 'Chagua')}</option>
                    <option value="Year 9">Year 9</option>
                    <option value="Year 10">Year 10</option>
                    <option value="Year 11">Year 11</option>
                    <option value="Year 12">Year 12</option>
                  </select>
                  {errors.yearGroup && <p className="mt-1 text-xs text-red-600">{errors.yearGroup}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('Class', 'Darasa')} *</label>
                  <select value={form.className} onChange={(e) => set('className', e.target.value)} className={inputCls(errors.className)}>
                    <option value="">{t('Select', 'Chagua')}</option>
                    <option value="Form 1A">Form 1A</option>
                    <option value="Form 1B">Form 1B</option>
                    <option value="Form 2A">Form 2A</option>
                    <option value="Form 2C">Form 2C</option>
                    <option value="Form 3A">Form 3A</option>
                    <option value="Form 3B">Form 3B</option>
                    <option value="Form 4A">Form 4A</option>
                    <option value="Form 4B">Form 4B</option>
                  </select>
                  {errors.className && <p className="mt-1 text-xs text-red-600">{errors.className}</p>}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('Course Track', 'Kozi')}</label>
                <select value={form.course} onChange={(e) => set('course', e.target.value)} className={inputCls()}>
                  <option value="">{t('Select', 'Chagua')}</option>
                  <option value="Sciences">{t('Sciences', 'Sayansi')}</option>
                  <option value="Arts">{t('Arts', 'Sanaa')}</option>
                  <option value="Business">{t('Business', 'Biashara')}</option>
                </select>
              </div>
            </>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{t('Review enrollment details', 'Kagua taarifa za usajili')}</h3>
              {[
                [t('Student', 'Mwanafunzi'), `${form.firstName} ${form.lastName}`],
                ['Email', form.email],
                [t('Gender', 'Jinsia'), form.gender],
                [t('Guardian', 'Mlezi'), form.guardianName],
                [t('Guardian Phone', 'Simu ya Mlezi'), form.guardianPhone],
                [t('Year Group', 'Kundi'), form.yearGroup],
                [t('Class', 'Darasa'), form.className],
                [t('Course', 'Kozi'), form.course || '—'],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-800 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">{label}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{val || '—'}</span>
                </div>
              ))}
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-800">
            <button onClick={back} disabled={step === 1}
              className="px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg disabled:opacity-40">
              {t('Back', 'Rudi')}
            </button>
            {step < 4 ? (
              <button onClick={next}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#064E3B] hover:bg-[#04382B] text-white text-sm font-medium rounded-lg">
                {t('Continue', 'Endelea')} <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={submit}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#064E3B] hover:bg-[#04382B] text-white text-sm font-medium rounded-lg">
                <Check className="w-4 h-4" /> {t('Confirm Enrollment', 'Thibitisha Usajili')}
              </button>
            )}
          </div>
        </div>

        {/* Side panel */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm p-5 h-fit sticky top-20">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">{t('Draft Summary', 'Muhtasari wa Rasimu')}</h3>
          <div className="space-y-2 text-sm">
            <p className="font-medium text-gray-900 dark:text-white">{form.firstName || form.lastName ? `${form.firstName} ${form.lastName}` : '—'}</p>
            <p className="text-gray-500 dark:text-gray-400">{form.email || '—'}</p>
            <p className="text-gray-500 dark:text-gray-400">{form.yearGroup || '—'} · {form.className || '—'}</p>
            <p className="text-gray-500 dark:text-gray-400">{form.guardianName || '—'}</p>
          </div>
          <div className="mt-5 pt-4 border-t border-gray-100 dark:border-slate-800">
            <p className="text-[11px] text-gray-400">{t('Step', 'Hatua')} {step} {t('of', 'ya')} 4</p>
            <div className="mt-2 h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#064E3B] rounded-full transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
