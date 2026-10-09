import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
      <div className="w-20 h-20 bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
        <FileQuestion className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">404 — Page Not Found</h1>
      <p className="text-base text-slate-500 dark:text-slate-400 max-w-md mt-2 mb-8">
        The page or resource you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Dashboard
      </Link>
    </div>
  );
};
