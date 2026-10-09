import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TaskForm } from '../components/tasks/TaskForm';
import { taskApi } from '../api/taskApi';
import { ArrowLeft, PlusCircle } from 'lucide-react';

export const CreateTask = () => {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    await taskApi.createTask(formData);
    // Navigate back to dashboard on success
    navigate('/', { state: { message: 'New task created successfully!' } });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors"
          aria-label="Back to tasks"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <PlusCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Create New Task
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Fill in the details below to add a new task to the system.
          </p>
        </div>
      </div>

      <TaskForm onSubmit={handleCreate} isEditing={false} />
    </div>
  );
};
