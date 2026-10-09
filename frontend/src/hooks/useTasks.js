import { useState, useCallback, useEffect } from 'react';
import { taskApi } from '../api/taskApi';

export const useTasks = (initialParams = {}) => {
  const [tasks, setTasks] = useState([]);
  const [summary, setSummary] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0 });
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 6, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Params state
  const [search, setSearch] = useState(initialParams.search || '');
  const [status, setStatus] = useState(initialParams.status || 'all');
  const [priority, setPriority] = useState(initialParams.priority || 'all');
  const [sortBy, setSortBy] = useState(initialParams.sortBy || 'createdAt');
  const [sortOrder, setSortOrder] = useState(initialParams.sortOrder || 'desc');
  const [page, setPage] = useState(initialParams.page || 1);
  const [limit] = useState(initialParams.limit || 6);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await taskApi.getTasks({
        search,
        status,
        priority,
        sortBy,
        sortOrder,
        page,
        limit
      });
      setTasks(response.data || []);
      if (response.summary) setSummary(response.summary);
      if (response.pagination) setPagination(response.pagination);
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [search, status, priority, sortBy, sortOrder, page, limit]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Reset pagination to page 1 whenever filters or search change
  const handleSearchChange = (val) => {
    setSearch(val);
    setPage(1);
  };

  const handleStatusChange = (val) => {
    setStatus(val);
    setPage(1);
  };

  const handlePriorityChange = (val) => {
    setPriority(val);
    setPage(1);
  };

  const resetFilters = () => {
    setSearch('');
    setStatus('all');
    setPriority('all');
    setSortBy('createdAt');
    setSortOrder('desc');
    setPage(1);
  };

  return {
    tasks,
    summary,
    pagination,
    loading,
    error,
    params: { search, status, priority, sortBy, sortOrder, page, limit },
    actions: {
      setSearch: handleSearchChange,
      setStatus: handleStatusChange,
      setPriority: handlePriorityChange,
      setSortBy,
      setSortOrder,
      setPage,
      resetFilters,
      refresh: fetchTasks
    }
  };
};
