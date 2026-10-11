import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({
  title = 'No students found',
  description = 'Get started by adding your first student to the system.',
  actionLabel = 'Add Student',
  actionTo = '/students/new',
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
        <Users className="w-8 h-8 text-emerald-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-6">{description}</p>
      {actionTo && (
        <Link
          to={actionTo}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
