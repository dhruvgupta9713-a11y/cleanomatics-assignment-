# Task Management System — REST API Documentation

This document describes the RESTful API endpoints for the Task Management System built with Express.js.

Base URL: `http://localhost:5000/api`

---

## Response Format Guidelines

All API endpoints return JSON with standard wrapper signatures.

### Success Response Format (`200 OK`, `201 Created`)
```json
{
  "success": true,
  "message": "Human readable success message",
  "data": { ... },
  "summary": { ... },      // Included on GET /tasks
  "pagination": { ... }   // Included on GET /tasks when paginated
}
```

### Error Response Format (`400 Bad Request`, `404 Not Found`, `500 Internal Error`)
```json
{
  "success": false,
  "message": "Human readable error message",
  "errors": [
    {
      "field": "title",
      "message": "Title is required and cannot be empty or only whitespace."
    }
  ]
}
```

---

## Endpoints Summary

| Method | Endpoint | Description | Expected Status Codes |
|---|---|---|---|
| `GET` | `/api/health` | Backend server health check | `200` |
| `GET` | `/api/tasks` | Get list of tasks (with search, filter, sort, pagination) | `200` |
| `GET` | `/api/tasks/:id` | Get details of a single task by ID | `200`, `404` |
| `POST` | `/api/tasks` | Create a new task | `201`, `400` |
| `PUT` | `/api/tasks/:id` | Update an existing task | `200`, `400`, `404` |
| `DELETE` | `/api/tasks/:id` | Delete a task by ID | `200`, `404` |

---

## 1. Health Check Endpoint

### `GET /api/health`

Returns health status of the Express server.

**Response Example (`200 OK`):**
```json
{
  "success": true,
  "message": "Backend server is healthy",
  "status": "healthy",
  "timestamp": "2026-10-09T14:15:00.000Z"
}
```

---

## 2. Get All Tasks

### `GET /api/tasks`

Retrieves a list of tasks stored in backend memory. Supports optional query parameters.

**Query Parameters:**
- `search` (string): Case-insensitive keyword matching `title` or `description`.
- `status` (string): Filter by `pending`, `in_progress`, or `completed`.
- `priority` (string): Filter by `low`, `medium`, or `high`.
- `sortBy` (string): Sort field: `createdAt` (default), `priority`, `dueDate`, or `title`.
- `sortOrder` (string): `desc` (default) or `asc`.
- `page` (number): Page number (e.g. `1`).
- `limit` (number): Page size limit (e.g. `6`).

**Example Request:**
`GET /api/tasks?status=in_progress&sortBy=priority&sortOrder=desc&page=1&limit=6`

**Response Example (`200 OK`):**
```json
{
  "success": true,
  "message": "Tasks retrieved successfully",
  "data": [
    {
      "id": "task-002-sample",
      "title": "Implement Express REST API Endpoints",
      "description": "Develop GET, POST, PUT, DELETE routes with strict body validation.",
      "status": "in_progress",
      "priority": "high",
      "dueDate": "2026-10-14",
      "createdAt": "2026-10-07T14:00:00.000Z",
      "updatedAt": "2026-10-08T14:00:00.000Z"
    }
  ],
  "summary": {
    "total": 4,
    "pending": 1,
    "inProgress": 2,
    "completed": 1
  },
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 6,
    "totalPages": 1
  }
}
```

---

## 3. Get Task By ID

### `GET /api/tasks/:id`

Retrieves a single task by its unique ID string.

**Response Example (`200 OK`):**
```json
{
  "success": true,
  "message": "Task details retrieved successfully",
  "data": {
    "id": "task-002-sample",
    "title": "Implement Express REST API Endpoints",
    "description": "Develop GET, POST, PUT, DELETE routes with strict body validation.",
    "status": "in_progress",
    "priority": "high",
    "dueDate": "2026-10-14",
    "createdAt": "2026-10-07T14:00:00.000Z",
    "updatedAt": "2026-10-08T14:00:00.000Z"
  }
}
```

**Error Response (`404 Not Found`):**
```json
{
  "success": false,
  "message": "Task with ID \"invalid-id\" was not found."
}
```

---

## 4. Create Task

### `POST /api/tasks`

Creates a new task in backend memory. Generates `id`, `createdAt`, and `updatedAt`.

**Request Body (`application/json`):**
```json
{
  "title": "Setup PostgreSQL database indexes",
  "description": "Add index on user_id and status columns for optimal query execution.",
  "status": "pending",
  "priority": "high",
  "dueDate": "2026-10-25"
}
```

**Validation Rules:**
- `title`: Required, string, non-whitespace, max 150 chars.
- `description`: Required, string, non-whitespace.
- `status`: Optional (defaults to `pending`), allowed: `pending`, `in_progress`, `completed`.
- `priority`: Optional (defaults to `medium`), allowed: `low`, `medium`, `high`.
- `dueDate`: Optional, valid date string (`YYYY-MM-DD`).

**Success Response (`201 Created`):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Setup PostgreSQL database indexes",
    "description": "Add index on user_id and status columns for optimal query execution.",
    "status": "pending",
    "priority": "high",
    "dueDate": "2026-10-25",
    "createdAt": "2026-10-09T14:15:00.000Z",
    "updatedAt": "2026-10-09T14:15:00.000Z"
  }
}
```

**Error Response (`400 Bad Request`):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "title",
      "message": "Title is required and cannot be empty or only whitespace."
    }
  ]
}
```

---

## 5. Update Task

### `PUT /api/tasks/:id`

Modifies an existing task and updates the `updatedAt` ISO timestamp.

**Request Body (`application/json`):**
```json
{
  "title": "Setup PostgreSQL database indexes (Updated)",
  "status": "in_progress",
  "priority": "high"
}
```

**Success Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Setup PostgreSQL database indexes (Updated)",
    "description": "Add index on user_id and status columns for optimal query execution.",
    "status": "in_progress",
    "priority": "high",
    "dueDate": "2026-10-25",
    "createdAt": "2026-10-09T14:15:00.000Z",
    "updatedAt": "2026-10-09T14:20:00.000Z"
  }
}
```

**Error Response (`404 Not Found`):**
```json
{
  "success": false,
  "message": "Task with ID \"550e8400-e29b-41d4-a716-446655440000\" was not found."
}
```

---

## 6. Delete Task

### `DELETE /api/tasks/:id`

Deletes a task from backend memory.

**Success Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Setup PostgreSQL database indexes (Updated)",
    "status": "in_progress"
  }
}
```

**Error Response (`404 Not Found`):**
```json
{
  "success": false,
  "message": "Task with ID \"550e8400-e29b-41d4-a716-446655440000\" was not found."
}
```
