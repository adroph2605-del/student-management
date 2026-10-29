import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { studentAPI } from '../services/api';

const initialForm = {
  name: '',
  email: '',
  course: '',
  age: '',
  phone: '',
  status: 'Active',
  className: '',
  studentCode: '',
};

export default function AddStudent() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email';
    if (form.age && (isNaN(form.age) || Number(form.age) < 1 || Number(form.age) > 120)) {
      newErrors.age = 'Enter a valid age (1-120)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      const payload = {
        ...form,
        age: form.age ? Number(form.age) : undefined,
      };
      await studentAPI.create(payload);
      toast.success('Student added successfully');
      navigate('/app/students');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to add student';
      toast.error(message);
      if (message.toLowerCase().includes('email')) {
        setErrors((prev) => ({ ...prev, email: message }));
      }
    } finally {
      setLoading(false);
    }
  };

  const field = (id, label, type = 'text', required = false) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={form[id]}
        onChange={handleChange}
        className={`w-full px-3.5 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white ${
          errors[id] ? 'border-red-300 bg-red-50' : 'border-gray-200'
        }`}
      />
      {errors[id] && <p className="mt-1 text-xs text-red-600">{errors[id]}</p>}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/app/students" className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Add Student</h1>
          <p className="text-sm text-gray-500 mt-0.5">Register a new student in the system</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
        <div className="p-6 space-y-5">
          {field('name', 'Full Name', 'text', true)}
          {field('email', 'Email Address', 'email', true)}
          {field('studentCode', 'Student Code')}
          {field('className', 'Class (e.g. Form 3A)')}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {field('course', 'Course')}
            {field('age', 'Age', 'number')}
          </div>
          {field('phone', 'Phone')}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm border border-gray-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
              <option value="Graduated">Graduated</option>
            </select>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 dark:border-slate-800 flex justify-end gap-3">
          <Link to="/app/students" className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#064E3B] hover:bg-[#04382B] rounded-lg disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Student'}
          </button>
        </div>
      </form>
    </div>
  );
}