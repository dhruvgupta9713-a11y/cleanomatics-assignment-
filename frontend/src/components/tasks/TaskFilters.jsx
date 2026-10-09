import React, { useState, useEffect } from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';

export const TaskFilters = ({ params, actions }) => {
  const [searchInput, setSearchInput] = useState(params.search || '');

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchInput !== params.search) {
        actions.setSearch(searchInput);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [searchInput, params.search, actions]);

  useEffect(() => {
    setSearchInput(params.search || '');
  }, [params.search]);

  const hasActiveFilters =
    params.search ||
    (params.status && params.status !== 'all') ||
    (params.priority && params.priority !== 'all') ||
    params.sortBy !== 'createdAt' ||
    params.sortOrder !== 'desc';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-3.5 border border-slate-200 dark:border-slate-800 space-y-3">
      <div className="flex flex-col sm:flex-row items-center gap-2.5">
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-400"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Status Filter */}
          <select
            value={params.status || 'all'}
            onChange={(e) => actions.setStatus(e.target.value)}
            className="px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          {/* Priority Filter */}
          <select
            value={params.priority || 'all'}
            onChange={(e) => actions.setPriority(e.target.value)}
            className="px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Sort By */}
          <select
            value={params.sortBy || 'createdAt'}
            onChange={(e) => actions.setSortBy(e.target.value)}
            className="px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="createdAt">Created Date</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
            <option value="title">Title</option>
          </select>

          {/* Sort Order Toggle */}
          <button
            type="button"
            onClick={() => actions.setSortOrder(params.sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            {params.sortOrder === 'asc' ? 'Asc ↑' : 'Desc ↓'}
          </button>

          {hasActiveFilters && (
            <button
              onClick={() => {
                setSearchInput('');
                actions.resetFilters();
              }}
              className="px-2.5 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
