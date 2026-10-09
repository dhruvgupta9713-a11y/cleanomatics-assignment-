import React from 'react';
import { TaskCard } from './TaskCard';
import { EmptyState } from '../common/EmptyState';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const TaskList = ({ tasks, pagination, actions, onDeleteTask, isFiltered }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <EmptyState
        title={isFiltered ? 'No matching tasks' : 'No tasks created yet'}
        description={
          isFiltered
            ? 'Try adjusting your search keyword or changing status/priority filters.'
            : 'Get started by creating your first task using the Create Task button above.'
        }
        showCreateButton={!isFiltered}
        onReset={isFiltered ? actions.resetFilters : undefined}
      />
    );
  }

  const { page, totalPages, total } = pagination;

  return (
    <div className="space-y-6">
      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDeleteTask} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-700/80">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Showing <span className="font-semibold text-slate-800 dark:text-slate-200">{tasks.length}</span> of{' '}
            <span className="font-semibold text-slate-800 dark:text-slate-200">{total}</span> total tasks (Page{' '}
            <span className="font-semibold text-slate-800 dark:text-slate-200">{page}</span> of {totalPages})
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => actions.setPage(page - 1)}
              disabled={page <= 1}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {/* Page number buttons */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
                <button
                  key={pNum}
                  onClick={() => actions.setPage(pNum)}
                  className={`w-7 h-7 text-xs font-semibold rounded-lg transition-colors ${
                    pNum === page
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {pNum}
                </button>
              ))}
            </div>

            <button
              onClick={() => actions.setPage(page + 1)}
              disabled={page >= totalPages}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
