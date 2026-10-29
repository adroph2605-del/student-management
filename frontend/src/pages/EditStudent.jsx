import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { studentAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    course: '',
    age: '',
    phone: '',
    status: 'Active',
    className: '',
    studentCode: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const res = await studentAPI.getById(id);
      const data = res.data || res;
      setForm({
        name: data.name || '',
        email: data.email || '',
        course: data.course || '',
        age: data.age ?? '',
        phone: data.phone || '',
        status: data.status || 'Active',
        className: data.className || '',
        studentCode: data.studentCode || '',
      });
    } catch {
      toast.error('Failed to load student');
      navigate('/app/students');
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email';
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
      setSaving(true);
      await studentAPI.update(id, {
        ...form,
        age: form.age ? Number(form.age) : undefined,
      });
      toast.success('Student updated successfully');
      navigate(`/app/students/${id}`);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update student';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link to={`/app/students/${id}`} className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Student</h1>
          <p className="text-sm text-gray-500">Update student information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
        <div className="p-6 space-y-5">
          {['name', 'email', 'studentCode', 'className', 'course', 'phone'].map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 capitalize">
                {key === 'className' ? 'Class' : key === 'studentCode' ? 'Student Code' : key}
              </label>
              <input
                name={key}
                type={key === 'email' ? 'email' : 'text'}
                value={form[key]}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white"
              />
              {errors[key] && <p className="mt-1 text-xs text-red-600">{errors[key]}</p>}
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium mb-1.5">Age</label>
            <input name="age" type="number" value={form.age} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
              <option value="Graduated">Graduated</option>
            </select>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 dark:border-slate-800 flex justify-end gap-3">
          <Link to={`/app/students/${id}`} className="px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100">Cancel</Link>
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#064E3B] rounded-lg disabled:opacity-60">
            <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}