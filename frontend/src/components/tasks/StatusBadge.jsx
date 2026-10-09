import React from 'react';

export const StatusBadge = ({ status }) => {
  const config = {
    pending: {
      label: 'Pending',
      dotColor: 'bg-amber-500',
      textColor: 'text-amber-700 dark:text-amber-300',
      bgColor: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60'
    },
    in_progress: {
      label: 'In Progress',
      dotColor: 'bg-blue-500',
      textColor: 'text-blue-700 dark:text-blue-300',
      bgColor: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/60'
    },
    completed: {
      label: 'Completed',
      dotColor: 'bg-emerald-500',
      textColor: 'text-emerald-700 dark:text-emerald-300',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60'
    }
  };

  const current = config[status] || config.pending;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full border ${current.bgColor} ${current.textColor}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${current.dotColor}`}></span>
      {current.label}
    </span>
  );
};
