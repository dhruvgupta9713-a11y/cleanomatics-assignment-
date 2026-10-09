import React from 'react';
import { ClipboardList, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmptyState = ({
  title = 'No tasks found',
  description = 'Get started by creating a new task or resetting your filters.',
  showCreateButton = true,
  onReset
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 text-center shadow-sm">
      <div className="w-16 h-16 bg-blue-50 dark:bg-slate-700/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
        <ClipboardList className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">{description}</p>
      
      <div className="flex flex-wrap gap-3 justify-center">
        {onReset && (
          <button
            onClick={onReset}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
          >
            Clear Filters
          </button>
        )}
        {showCreateButton && (
          <Link
            to="/tasks/new"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Task
          </Link>
        )}
      </div>
    </div>
  );
};
