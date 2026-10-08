import { ApiError } from '../utils/ApiError.js';

const ALLOWED_STATUSES = ['pending', 'in_progress', 'completed'];
const ALLOWED_PRIORITIES = ['low', 'medium', 'high'];

export const validateTaskPayload = (data, isUpdate = false) => {
  const errors = [];
  const trimmedTitle = typeof data.title === 'string' ? data.title.trim() : '';
  const trimmedDescription = typeof data.description === 'string' ? data.description.trim() : '';

  if (!isUpdate || data.title !== undefined) {
    if (!trimmedTitle) {
      errors.push({ field: 'title', message: 'Title is required and cannot be empty or only whitespace.' });
    } else if (trimmedTitle.length > 150) {
      errors.push({ field: 'title', message: 'Title cannot exceed 150 characters.' });
    }
  }

  if (!isUpdate || data.description !== undefined) {
    if (!trimmedDescription) {
      errors.push({ field: 'description', message: 'Description is required and cannot be empty or only whitespace.' });
    }
  }

  if (data.status !== undefined && data.status !== null && data.status !== '') {
    if (!ALLOWED_STATUSES.includes(data.status)) {
      errors.push({ field: 'status', message: `Status must be one of: ${ALLOWED_STATUSES.join(', ')}` });
    }
  }

  if (data.priority !== undefined && data.priority !== null && data.priority !== '') {
    if (!ALLOWED_PRIORITIES.includes(data.priority)) {
      errors.push({ field: 'priority', message: `Priority must be one of: ${ALLOWED_PRIORITIES.join(', ')}` });
    }
  }

  if (data.dueDate !== undefined && data.dueDate !== null && data.dueDate !== '') {
    const parsedDate = Date.parse(data.dueDate);
    if (isNaN(parsedDate)) {
      errors.push({ field: 'dueDate', message: 'Due date must be a valid date format (e.g. YYYY-MM-DD).' });
    }
  }

  if (errors.length > 0) {
    throw new ApiError(400, 'Validation failed', errors);
  }

  return {
    title: trimmedTitle,
    description: trimmedDescription,
    status: data.status || 'pending',
    priority: data.priority || 'medium',
    dueDate: data.dueDate ? new Date(data.dueDate).toISOString().split('T')[0] : null
  };
};
