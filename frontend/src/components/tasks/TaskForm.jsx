import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, Loader2, AlertCircle } from 'lucide-react';

export const TaskForm = ({ initialValues = {}, onSubmit, isEditing = false }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: initialValues.title || '',
    description: initialValues.description || '',
    status: initialValues.status || 'pending',
    priority: initialValues.priority || 'medium',
    dueDate: initialValues.dueDate || ''
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialValues.title) {
      setFormData({
        title: initialValues.title || '',
        description: initialValues.description || '',
        status: initialValues.status || 'pending',
        priority: initialValues.priority || 'medium',
        dueDate: initialValues.dueDate || ''
      });
    }
  }, [initialValues]);

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required.';
    } else if (formData.title.trim().length > 150) {
      newErrors.title = 'Task title cannot exceed 150 characters.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Task description is required.';
    }

    if (formData.dueDate) {
      const parsedDate = Date.parse(formData.dueDate);
      if (isNaN(parsedDate)) {
        newErrors.dueDate = 'Please select a valid date.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on field edit
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (apiError) setApiError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await onSubmit({
        title: formData.title.trim(),
        description: formData.description.trim(),
        status: formData.status,
        priority: formData.priority,
        dueDate: formData.dueDate || null
      });
    } catch (err) {
      if (err.errors && Array.isArray(err.errors)) {
        const backendFieldErrors = {};
        err.errors.forEach((eItem) => {
          if (eItem.field) backendFieldErrors[eItem.field] = eItem.message;
        });
        setErrors(backendFieldErrors);
      }
      setApiError(err.message || 'Failed to save task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-6">
      {apiError && (
        <div className="p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl text-red-800 dark:text-red-200 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Submission Error</p>
            <p className="text-xs mt-0.5">{apiError}</p>
          </div>
        </div>
      )}

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
          Task Title <span className="text-rose-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Implement Express REST API authentication"
          className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border ${
            errors.title ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
          } rounded-xl text-sm focus:outline-none focus:ring-2 text-slate-800 dark:text-slate-100 placeholder-slate-400 transition-colors`}
        />
        {errors.title && <p className="text-xs text-red-500 font-medium mt-1.5">{errors.title}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
          Description <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          placeholder="Provide detailed instructions or objective notes for this task..."
          className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border ${
            errors.description ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
          } rounded-xl text-sm focus:outline-none focus:ring-2 text-slate-800 dark:text-slate-100 placeholder-slate-400 transition-colors resize-y`}
        />
        {errors.description && <p className="text-xs text-red-500 font-medium mt-1.5">{errors.description}</p>}
      </div>

      {/* Grid row: Status, Priority, Due Date */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 cursor-pointer"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label htmlFor="priority" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 cursor-pointer"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label htmlFor="dueDate" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Due Date
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border ${
              errors.dueDate ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
            } rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 cursor-pointer`}
          />
          {errors.dueDate && <p className="text-xs text-red-500 font-medium mt-1.5">{errors.dueDate}</p>}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700/80">
        <button
          type="button"
          onClick={() => navigate(-1)}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl transition-colors disabled:opacity-50"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving Task...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {isEditing ? 'Update Task' : 'Save Task'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};
