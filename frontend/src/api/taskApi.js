import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor to normalize data extraction & error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'An unexpected error occurred. Please try again.';
    let validationErrors = [];

    if (error.response) {
      // Server responded with error status code (4xx, 5xx)
      errorMessage = error.response.data?.message || errorMessage;
      validationErrors = error.response.data?.errors || [];
    } else if (error.request) {
      // Request made but no response received (Network error / server down)
      errorMessage = 'Backend API server is unreachable. Please ensure the server is running on port 5000.';
    }

    return Promise.reject({
      message: errorMessage,
      errors: validationErrors,
      status: error.response?.status
    });
  }
);

export const taskApi = {
  getTasks: async (params = {}) => {
    const res = await apiClient.get('/tasks', { params });
    return res.data;
  },

  getTaskById: async (id) => {
    const res = await apiClient.get(`/tasks/${id}`);
    return res.data;
  },

  createTask: async (taskData) => {
    const res = await apiClient.post('/tasks', taskData);
    return res.data;
  },

  updateTask: async (id, taskData) => {
    const res = await apiClient.put(`/tasks/${id}`, taskData);
    return res.data;
  },

  deleteTask: async (id) => {
    const res = await apiClient.delete(`/tasks/${id}`);
    return res.data;
  },

  checkHealth: async () => {
    const res = await apiClient.get('/health');
    return res.data;
  }
};
