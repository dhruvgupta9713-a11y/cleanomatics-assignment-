import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Plus,
  ListTodo,
  Clock,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { TaskFilters } from '../components/tasks/TaskFilters';
import { TaskList } from '../components/tasks/TaskList';
import { Loading } from '../components/common/Loading';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { taskApi } from '../api/taskApi';

export const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlStatus = searchParams.get('status') || 'all';

  const { tasks, summary, pagination, loading, error, params, actions } = useTasks({
    status: urlStatus,
    limit: 6
  });

  useEffect(() => {
    if (urlStatus !== params.status) {
      actions.setStatus(urlStatus);
    }
  }, [urlStatus]);

  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  const handleDeleteConfirm = async () => {
    if (!taskToDelete) return;
    setIsDeleting(true);
    try {
      await taskApi.deleteTask(taskToDelete.id);
      setFeedbackMsg({ type: 'success', text: `Task "${taskToDelete.title}" deleted.` });
      setTaskToDelete(null);
      actions.refresh();
    } catch (err) {
      setFeedbackMsg({ type: 'error', text: err.message || 'Failed to delete task.' });
    } finally {
      setIsDeleting(false);
      setTimeout(() => setFeedbackMsg(null), 3000);
    }
  };

  const statCards = [
    {
      title: 'Total Tasks',
      count: summary.total,
      icon: ListTodo,
      statusVal: 'all',
      isActive: params.status === 'all'
    },
    {
      title: 'Pending',
      count: summary.pending,
      icon: Clock,
      statusVal: 'pending',
      isActive: params.status === 'pending'
    },
    {
      title: 'In Progress',
      count: summary.inProgress,
      icon: Loader2,
      statusVal: 'in_progress',
      isActive: params.status === 'in_progress'
    },
    {
      title: 'Completed',
      count: summary.completed,
      icon: CheckCircle2,
      statusVal: 'completed',
      isActive: params.status === 'completed'
    }
  ];

  const handleStatClick = (statusVal) => {
    if (statusVal === 'all') {
      searchParams.delete('status');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ status: statusVal });
    }
    actions.setStatus(statusVal);
  };

  const isFiltered =
    params.search ||
    (params.status && params.status !== 'all') ||
    (params.priority && params.priority !== 'all') ||
    params.sortBy !== 'createdAt' ||
    params.sortOrder !== 'desc';

  return (
    <div className="space-y-6 pb-12">
      {/* Header section */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Task Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Track and manage your tasks and project items.
          </p>
        </div>

        <Link
          to="/tasks/new"
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg font-medium text-xs text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          New Task
        </Link>
      </div>

      {/* Alert Banner */}
      {feedbackMsg && (
        <div
          className={`p-3 rounded-lg text-xs font-medium flex items-center justify-between transition-all ${
            feedbackMsg.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
          }`}
        >
          <span>{feedbackMsg.text}</span>
          <button onClick={() => setFeedbackMsg(null)} className="text-xs opacity-75 hover:opacity-100">
            Dismiss
          </button>
        </div>
      )}

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.title}
              onClick={() => handleStatClick(card.statusVal)}
              className={`p-4 rounded-xl bg-white dark:bg-slate-900 border text-left transition-colors shadow-xs ${
                card.isActive
                  ? 'border-blue-600 dark:border-blue-500 bg-blue-50/20 dark:bg-slate-800/80'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {card.title}
                </span>
                <Icon className={`w-4 h-4 ${card.isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {card.count}
              </div>
            </button>
          );
        })}
      </div>

      {/* Search & Filters */}
      <TaskFilters params={params} actions={actions} />

      {/* Task List */}
      {loading ? (
        <Loading message="Loading tasks..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={actions.refresh} />
      ) : (
        <TaskList
          tasks={tasks}
          pagination={pagination}
          actions={actions}
          onDeleteTask={(task) => setTaskToDelete(task)}
          isFiltered={isFiltered}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!taskToDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${taskToDelete?.title}"?`}
        confirmText="Delete"
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setTaskToDelete(null)}
      />
    </div>
  );
};
