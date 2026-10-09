import React from 'react';

export const PriorityBadge = ({ priority }) => {
  const config = {
    high: {
      label: 'High',
      textColor: 'text-rose-700 dark:text-rose-300',
      bgColor: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60'
    },
    medium: {
      label: 'Medium',
      textColor: 'text-slate-700 dark:text-slate-300',
      bgColor: 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
    },
    low: {
      label: 'Low',
      textColor: 'text-slate-600 dark:text-slate-400',
      bgColor: 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800'
    }
  };

  const current = config[priority] || config.low;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded border ${current.bgColor} ${current.textColor}`}>
      {current.label}
    </span>
  );
};
