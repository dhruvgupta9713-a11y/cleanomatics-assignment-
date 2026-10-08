import { taskService } from '../services/task.service.js';
import { validateTaskPayload } from '../validators/task.validator.js';

export const getTasks = async (req, res, next) => {
  try {
    const result = taskService.getTasks(req.query);
    return res.status(200).json({
      success: true,
      message: 'Tasks retrieved successfully',
      data: result.tasks,
      summary: result.summary,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = taskService.getTaskById(id);
    return res.status(200).json({
      success: true,
      message: 'Task details retrieved successfully',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const validatedData = validateTaskPayload(req.body, false);
    const newTask = taskService.createTask(validatedData);
    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validatedData = validateTaskPayload(req.body, true);
    const updatedTask = taskService.updateTask(id, validatedData);
    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTask = taskService.deleteTask(id);
    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: deletedTask
    });
  } catch (error) {
    next(error);
  }
};

export const getHealth = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Backend server is healthy',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
};
