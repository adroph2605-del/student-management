import { useLocation } from 'react-router-dom';

export default function AdminPlaceholder() {
  const { pathname } = useLocation();
  const title = pathname.split('/').pop() || 'Section';
  return (
    <div className="max-w-3xl mx-auto rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white capitalize">{title.replace(/-/g, ' ')}</h2>
      <p className="text-sm text-gray-500 mt-2">
        Module shell ready — connect backend APIs for full data. Super-admin only.
      </p>
    </div>
  );
}