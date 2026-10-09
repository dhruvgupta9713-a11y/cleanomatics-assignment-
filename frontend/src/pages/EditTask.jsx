import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { TaskForm } from '../components/tasks/TaskForm';
import { Loading } from '../components/common/Loading';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { taskApi } from '../api/taskApi';
import { ArrowLeft, Edit3 } from 'lucide-react';

export const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await taskApi.getTaskById(id);
        setTask(response.data);
      } catch (err) {
        setError(err.message || 'Task not found');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleUpdate = async (formData) => {
    await taskApi.updateTask(id, formData);
    navigate(`/tasks/${id}`, { state: { message: 'Task updated successfully!' } });
  };

  if (loading) {
    return <Loading message="Loading task details for edit..." />;
  }

  if (error || !task) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <ErrorMessage message={error || 'Task not found'} />
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Task Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-3">
        <Link
          to={`/tasks/${id}`}
          className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors"
          aria-label="Back to task details"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Edit3 className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            Edit Task
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Modify task details and update status or priority.
          </p>
        </div>
      </div>

      <TaskForm initialValues={task} onSubmit={handleUpdate} isEditing={true} />
    </div>
  );
};
