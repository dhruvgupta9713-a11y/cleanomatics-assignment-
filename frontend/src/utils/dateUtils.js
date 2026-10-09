export const formatDate = (dateString) => {
  if (!dateString) return 'No due date';
  
  // Handle date-only strings like YYYY-MM-DD without UTC offset shift
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (isoString) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return 'N/A';

  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const isPastDue = (dueDate, status) => {
  if (!dueDate || status === 'completed') return false;
  const [year, month, day] = dueDate.split('-').map(Number);
  const due = new Date(year, month - 1, day, 23, 59, 59);
  return due < new Date();
};
