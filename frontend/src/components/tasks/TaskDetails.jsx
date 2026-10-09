import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Edit3,
  Trash2,
  ArrowLeft,
  Hash,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { formatDate, formatDateTime, isPastDue } from '../../utils/dateUtils';

export const TaskDetails = ({ task, onDelete }) => {
  const overdue = isPastDue(task.dueDate, task.status);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs overflow-hidden">
      {/* Top Header Card */}
      <div className="p-6 sm:p-8 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200/80 dark:border-slate-700/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <Link
            to="/tasks"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tasks
          </Link>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Link
              to={`/tasks/${task.id}/edit`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 rounded-xl border border-amber-200 dark:border-amber-800 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Edit Task
            </Link>

            <button
              onClick={() => onDelete(task)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 rounded-xl border border-rose-200 dark:border-rose-800 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete Task
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-3">
          <StatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
          {overdue && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2.5 py-1 rounded-full border border-rose-200 dark:border-rose-800">
              <AlertTriangle className="w-3.5 h-3.5" /> Overdue
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
          {task.title}
        </h1>
      </div>

      {/* Detail Content */}
      <div className="p-6 sm:p-8 space-y-8">
        {/* Description */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Description
          </h3>
          <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 text-base leading-relaxed whitespace-pre-wrap">
            {task.description}
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-slate-100 dark:border-slate-700/60">
          <div className="bg-slate-50/50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Due Date
            </span>
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-500" />
              {formatDate(task.dueDate)}
            </span>
          </div>

          <div className="bg-slate-50/50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Created At
            </span>
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              {formatDateTime(task.createdAt)}
            </span>
          </div>

          <div className="bg-slate-50/50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Last Updated
            </span>
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              {formatDateTime(task.updatedAt)}
            </span>
          </div>

          <div className="bg-slate-50/50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/60 overflow-hidden">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Task Unique ID
            </span>
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 flex items-center gap-1 truncate" title={task.id}>
              <Hash className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{task.id}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
