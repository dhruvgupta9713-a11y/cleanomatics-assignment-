import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loading = ({ message = 'Loading tasks...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-slate-500 dark:text-slate-400">
      <Loader2 className="w-10 h-10 animate-spin text-blue-600 dark:text-blue-400 mb-3" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};
