import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';
import { taskService } from '../src/services/task.service.js';

describe('Task Management REST API Tests', () => {
  beforeEach(() => {
    // Reset memory before each test
    taskService.resetMemory(false);
  });

  describe('GET /api/health', () => {
    it('should return 200 OK and healthy status', async () => {
      const res = await request(app).get('/api/health');
      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.status, 'healthy');
    });
  });

  describe('GET /api/tasks', () => {
    it('should return an empty array when no tasks exist', async () => {
      const res = await request(app).get('/api/tasks');
      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.deepEqual(res.body.data, []);
      assert.equal(res.body.summary.total, 0);
    });

    it('should return populated tasks when tasks exist', async () => {
      taskService.createTask({
        title: 'Test Task 1',
        description: 'Test description',
        status: 'pending',
        priority: 'high',
        dueDate: '2026-12-31'
      });

      const res = await request(app).get('/api/tasks');
      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.length, 1);
      assert.equal(res.body.data[0].title, 'Test Task 1');
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task successfully with valid data', async () => {
      const payload = {
        title: 'Build UI Component',
        description: 'Create responsive React header and sidebar.',
        status: 'in_progress',
        priority: 'high',
        dueDate: '2026-11-01'
      };

      const res = await request(app).post('/api/tasks').send(payload);

      assert.equal(res.status, 201);
      assert.equal(res.body.success, true);
      assert.ok(res.body.data.id);
      assert.equal(res.body.data.title, 'Build UI Component');
      assert.equal(res.body.data.status, 'in_progress');
      assert.equal(res.body.data.priority, 'high');
      assert.ok(res.body.data.createdAt);
      assert.ok(res.body.data.updatedAt);
    });

    it('should reject creation when title or description are empty/whitespace', async () => {
      const payload = {
        title: '   ',
        description: '   ',
        status: 'pending'
      };

      const res = await request(app).post('/api/tasks').send(payload);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
      assert.equal(res.body.message, 'Validation failed');
      assert.ok(Array.isArray(res.body.errors));
      assert.equal(res.body.errors.length, 2);
    });

    it('should reject invalid status or priority values', async () => {
      const payload = {
        title: 'Valid title',
        description: 'Valid description',
        status: 'invalid_status',
        priority: 'extreme'
      };

      const res = await request(app).post('/api/tasks').send(payload);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
      assert.ok(res.body.errors.some((e) => e.field === 'status'));
      assert.ok(res.body.errors.some((e) => e.field === 'priority'));
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should return a specific task by ID', async () => {
      const created = taskService.createTask({
        title: 'Specific Task',
        description: 'Details check',
        status: 'pending',
        priority: 'low',
        dueDate: null
      });

      const res = await request(app).get(`/api/tasks/${created.id}`);

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.id, created.id);
      assert.equal(res.body.data.title, 'Specific Task');
    });

    it('should return 404 when task ID does not exist', async () => {
      const res = await request(app).get('/api/tasks/non-existent-uuid');

      assert.equal(res.status, 404);
      assert.equal(res.body.success, false);
      assert.match(res.body.message, /not found/i);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update an existing task and update updatedAt timestamp', async () => {
      const created = taskService.createTask({
        title: 'Initial Title',
        description: 'Initial Description',
        status: 'pending',
        priority: 'low',
        dueDate: '2026-10-10'
      });

      const updatePayload = {
        title: 'Updated Title',
        description: 'Updated Description',
        status: 'completed',
        priority: 'high',
        dueDate: '2026-12-01'
      };

      const res = await request(app).put(`/api/tasks/${created.id}`).send(updatePayload);

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.title, 'Updated Title');
      assert.equal(res.body.data.status, 'completed');
      assert.equal(res.body.data.priority, 'high');
      assert.ok(new Date(res.body.data.updatedAt) >= new Date(created.createdAt));
    });

    it('should return 404 when updating a non-existent task', async () => {
      const res = await request(app).put('/api/tasks/non-existent-uuid').send({
        title: 'New Title',
        description: 'New Description'
      });

      assert.equal(res.status, 404);
      assert.equal(res.body.success, false);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete an existing task', async () => {
      const created = taskService.createTask({
        title: 'Task To Delete',
        description: 'Will be deleted',
        status: 'pending',
        priority: 'medium',
        dueDate: null
      });

      const res = await request(app).delete(`/api/tasks/${created.id}`);

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.id, created.id);

      // Verify deletion
      const fetchRes = await request(app).get(`/api/tasks/${created.id}`);
      assert.equal(fetchRes.status, 404);
    });

    it('should return 404 when deleting a non-existent task', async () => {
      const res = await request(app).delete('/api/tasks/non-existent-uuid');

      assert.equal(res.status, 404);
      assert.equal(res.body.success, false);
    });
  });
});
