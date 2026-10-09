import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { TaskDetails } from '../components/tasks/TaskDetails';
import { Loading } from '../components/common/Loading';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { taskApi } from '../api/taskApi';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export const TaskDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toastMsg, setToastMsg] = useState(location.state?.message || null);

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

  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => setToastMsg(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await taskApi.deleteTask(id);
      navigate('/', { state: { message: `Task "${task?.title}" deleted successfully.` } });
    } catch (err) {
      setError(err.message || 'Failed to delete task');
      setShowConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <Loading message="Loading task details..." />;
  }

  if (error || !task) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 pt-6">
        <ErrorMessage message={error || 'The requested task could not be found.'} />
        <div className="text-center pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {toastMsg && (
        <div className="p-4 rounded-xl text-sm font-semibold flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 shadow-xs">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            {toastMsg}
          </span>
          <button onClick={() => setToastMsg(null)} className="text-xs opacity-75 hover:opacity-100">
            Dismiss
          </button>
        </div>
      )}

      <TaskDetails task={task} onDelete={() => setShowConfirm(true)} />

      <ConfirmDialog
        isOpen={showConfirm}
        title="Delete Task"
        message={`Are you sure you want to permanently delete task "${task.title}"?`}
        confirmText="Delete"
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};
