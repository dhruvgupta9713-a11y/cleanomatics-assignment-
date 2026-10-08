import crypto from 'crypto';
import { ApiError } from '../utils/ApiError.js';

// Initial sample data for demonstration
const initialSampleTasks = [
  {
    id: 'task-001-sample',
    title: 'Design Full-Stack Architecture Diagram',
    description: 'Create clean module diagrams and system specs for frontend, backend REST API, and data structures.',
    status: 'completed',
    priority: 'high',
    dueDate: '2026-10-12',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: 'task-002-sample',
    title: 'Implement Express REST API Endpoints',
    description: 'Develop GET, POST, PUT, DELETE routes with strict body validation and clear HTTP status responses.',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2026-10-14',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: 'task-003-sample',
    title: 'Build React SaaS Dashboard UI',
    description: 'Construct responsive Tailwind CSS sidebar, summary stat cards, filters, and dark mode toggle.',
    status: 'in_progress',
    priority: 'medium',
    dueDate: '2026-10-16',
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: 'task-004-sample',
    title: 'Write Automated Supertest Suites',
    description: 'Add tests verifying task creation, validation rejections, pagination, updates, and 404 handlers.',
    status: 'pending',
    priority: 'low',
    dueDate: '2026-10-18',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

class TaskService {
  constructor() {
    this.tasks = [];
    const shouldSeed = process.env.SEED_SAMPLE_DATA !== 'false';
    if (shouldSeed) {
      this.tasks = JSON.parse(JSON.stringify(initialSampleTasks));
    }
  }

  // Reset in-memory array (useful for testing or clean setup)
  resetMemory(seed = false) {
    if (seed) {
      this.tasks = JSON.parse(JSON.stringify(initialSampleTasks));
    } else {
      this.tasks = [];
    }
  }

  getTasks(query = {}) {
    let result = [...this.tasks];

    const { search, status, priority, sortBy = 'createdAt', sortOrder = 'desc', page, limit } = query;

    // Search filter (case-insensitive in title or description)
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (status && status !== 'all') {
      result = result.filter((t) => t.status === status);
    }

    // Priority filter
    if (priority && priority !== 'all') {
      result = result.filter((t) => t.priority === priority);
    }

    // Sorting
    const priorityWeight = { high: 3, medium: 2, low: 1 };

    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'priority') {
        comparison = (priorityWeight[a.priority] || 0) - (priorityWeight[b.priority] || 0);
      } else if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else {
        // default: createdAt
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    // Pagination
    const totalCount = result.length;
    let paginatedTasks = result;
    let paginationInfo = null;

    if (page && limit) {
      const p = Math.max(1, parseInt(page, 10) || 1);
      const l = Math.max(1, parseInt(limit, 10) || 10);
      const totalPages = Math.ceil(totalCount / l) || 1;
      const startIndex = (p - 1) * l;

      paginatedTasks = result.slice(startIndex, startIndex + l);
      paginationInfo = {
        total: totalCount,
        page: p,
        limit: l,
        totalPages
      };
    }

    // Summary statistics across all stored tasks (unfiltered)
    const summary = {
      total: this.tasks.length,
      pending: this.tasks.filter((t) => t.status === 'pending').length,
      inProgress: this.tasks.filter((t) => t.status === 'in_progress').length,
      completed: this.tasks.filter((t) => t.status === 'completed').length
    };

    return {
      tasks: paginatedTasks,
      summary,
      pagination: paginationInfo
    };
  }

  getTaskById(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new ApiError(404, `Task with ID "${id}" was not found.`);
    }
    return task;
  }

  createTask(validatedData) {
    const now = new Date().toISOString();
    const newTask = {
      id: crypto.randomUUID(),
      title: validatedData.title,
      description: validatedData.description,
      status: validatedData.status,
      priority: validatedData.priority,
      dueDate: validatedData.dueDate,
      createdAt: now,
      updatedAt: now
    };

    this.tasks.unshift(newTask);
    return newTask;
  }

  updateTask(id, validatedData) {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new ApiError(404, `Task with ID "${id}" was not found.`);
    }

    const existing = this.tasks[index];
    const updatedTask = {
      ...existing,
      title: validatedData.title !== undefined ? validatedData.title : existing.title,
      description: validatedData.description !== undefined ? validatedData.description : existing.description,
      status: validatedData.status !== undefined ? validatedData.status : existing.status,
      priority: validatedData.priority !== undefined ? validatedData.priority : existing.priority,
      dueDate: validatedData.dueDate !== undefined ? validatedData.dueDate : existing.dueDate,
      updatedAt: new Date().toISOString()
    };

    this.tasks[index] = updatedTask;
    return updatedTask;
  }

  deleteTask(id) {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new ApiError(404, `Task with ID "${id}" was not found.`);
    }

    const deleted = this.tasks.splice(index, 1)[0];
    return deleted;
  }
}

export const taskService = new TaskService();
