import { useLocation } from 'react-router-dom';

export default function StudentPlaceholder() {
  const title = useLocation().pathname.split('/').pop();
  return (
    <div className="max-w-2xl mx-auto rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center">
      <h2 className="text-lg font-bold capitalize text-gray-900 dark:text-white">{title}</h2>
      <p className="text-sm text-gray-500 mt-2">Student module ready — wire to API when backend is live.</p>
    </div>
  );
}