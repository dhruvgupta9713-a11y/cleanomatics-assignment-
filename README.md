# TaskFlow — Full-Stack Task Management System

A production-quality, responsive Task Management System built for the Full-Stack Developer Internship Assignment. This application features a modern SaaS dashboard UI, clean Express.js REST API architecture, thorough client & server validation, and automated supertest coverage.

![TaskFlow Header](https://img.shields.io/badge/Stack-React%20%7C%20Express%20%7C%20TailwindCSS-blue)
![API Status](https://img.shields.io/badge/REST%20API-v1.0.0-emerald)
![Build Status](https://img.shields.io/badge/Tests-12%2F12%20Passing-brightgreen)

---

## 🚀 Features Summary

### Frontend (React + Vite + Tailwind CSS)
- **SaaS-Style Modern Interface:** Clean dashboard layout with gradient badges, dark/light theme switcher, responsive sidebar, and interactive state feedback.
- **Complete Task CRUD:** Create, view details, edit, and delete tasks with instant feedback.
- **Search & Filtering:** Real-time search across titles & descriptions, combined status (`pending`, `in_progress`, `completed`) and priority filters (`high`, `medium`, `low`).
- **Sorting & Pagination:** Sort by created date, priority (High > Med > Low), due date, or title in ascending/descending order. Includes paginated list view.
- **Confirmation Dialogs:** Modal confirmation dialog before task deletion to prevent accidental data loss.
- **Form & API Validation:** Inline validation messages for required fields, whitespace trimming, and backend error toasts.
- **Dark Mode Support:** Smooth dark/light mode toggle persisting user preference in `localStorage`.

### Backend (Node.js + Express.js)
- **Modular Architecture:** Clear separation of concerns (`routes`, `controllers`, `services`, `validators`, `middleware`, `utils`).
- **In-Memory Storage:** Fast JS memory array storage initialized with 4 realistic sample tasks (can be toggled or disabled).
- **RESTful Endpoints:** Standard JSON response structures (`success`, `data`, `message`, `errors`, `pagination`).
- **Robust Error Handling:** Centralized error handler and JSON 404 middleware with stack traces hidden in production.
- **Automated Tests:** 12 unit and API endpoint tests using Node.js test runner + `supertest`.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS v3, React Router v6, Axios, Lucide React Icons |
| **Backend** | Node.js (v25+), Express.js v4, CORS, Dotenv, In-Memory Data Store |
| **Testing** | Node Test Runner (`node --test`), Supertest |
| **API Tools** | Postman Collection (v2.1.0), Markdown API Documentation |

---

## 📁 Project Architecture & Folder Structure

```text
task-management-system/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── task.controller.js      # HTTP request handling
│   │   ├── middleware/
│   │   │   ├── errorHandler.js         # Centralized error handler
│   │   │   └── notFound.js             # 404 handler
│   │   ├── routes/
│   │   │   └── task.routes.js          # REST API endpoint definitions
│   │   ├── services/
│   │   │   └── task.service.js         # In-memory storage & business logic
│   │   ├── utils/
│   │   │   └── ApiError.js             # Custom operational error class
│   │   ├── validators/
│   │   │   └── task.validator.js       # Payload validation & sanitization
│   │   ├── app.js                      # Express app setup & CORS
│   │   └── server.js                   # Server initialization
│   ├── tests/
│   │   └── task.test.js                # Supertest API test suite
│   ├── .env.example
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── taskApi.js              # Axios REST client
│   │   ├── components/
│   │   │   ├── common/                 # Loading, ErrorMessage, EmptyState, ConfirmDialog
│   │   │   ├── layout/                 # Sidebar, Header, MainLayout
│   │   │   └── tasks/                  # TaskCard, TaskList, TaskForm, TaskDetails, TaskFilters
│   │   ├── context/
│   │   │   └── ThemeContext.jsx        # Dark/Light mode theme state
│   │   ├── hooks/
│   │   │   └── useTasks.js             # Custom task management hook
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx           # Main summary dashboard & list
│   │   │   ├── CreateTask.jsx          # Create task page
│   │   │   ├── EditTask.jsx            # Edit task page
│   │   │   ├── TaskDetailsPage.jsx     # Detailed task view
│   │   │   └── NotFound.jsx            # 404 page
│   │   ├── utils/
│   │   │   └── dateUtils.js            # Date formatting helpers
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── .env.example
│   ├── .env
│   └── package.json
├── docs/
│   └── api-documentation.md            # Detailed REST API specification
├── postman/
│   └── task-management.postman_collection.json # Ready-to-import Postman collection
├── .gitignore
├── README.md
└── package.json                        # Root package with multi-script runners
```

---

## ⚙️ Prerequisites & Environment Setup

- **Node.js**: v18.0.0 or higher (Tested on Node v25.2.1)
- **npm**: v9.0.0 or higher

### Environment Configuration

1. **Backend `.env` file (`backend/.env`):**
   ```env
   PORT=5000
   FRONTEND_ORIGIN=http://localhost:5173
   NODE_ENV=development
   SEED_SAMPLE_DATA=true
   ```
   *(Set `SEED_SAMPLE_DATA=false` if you want to start with a clean empty database state)*

2. **Frontend `.env` file (`frontend/.env`):**
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

---

## 🏃 Installation & Running locally

### Quick Start (Install & Run All Together)

From the root directory:

```bash
# Install all dependencies (Root, Backend, and Frontend)
npm run install:all

# Run backend (Port 5000) and frontend (Port 5173) concurrently
npm run dev
```

### Running Components Independently

**Backend Server:**
```bash
cd backend
npm install
npm run dev     # Runs backend on http://localhost:5000
```

**Frontend React Application:**
```bash
cd frontend
npm install
npm run dev     # Runs Vite server on http://localhost:5173
```

---

## 🧪 Running Automated Tests

Run backend REST API tests using Node's native runner and `supertest`:

```bash
# Run tests from root
npm run test:backend

# Or directly in backend directory
cd backend
npm test
```

### Test Coverage Highlights
- `GET /api/health` — Verifies healthy server status code 200.
- `GET /api/tasks` — Verifies fetching empty and populated task arrays.
- `POST /api/tasks` — Validates successful task creation & rejection of empty titles/invalid status values.
- `GET /api/tasks/:id` — Checks task retrieval by ID & 404 handler for invalid IDs.
- `PUT /api/tasks/:id` — Verifies field updates & `updatedAt` ISO timestamp refresh.
- `DELETE /api/tasks/:id` — Verifies item removal and 404 responses.

---

## 📡 REST API Endpoint Quick Reference

| Method | Endpoint | Description | Status Codes |
|---|---|---|---|
| `GET` | `/api/health` | Server status check | `200` |
| `GET` | `/api/tasks` | Get all tasks (supports `search`, `status`, `priority`, `page`, `limit`) | `200` |
| `GET` | `/api/tasks/:id` | Get task by ID | `200`, `404` |
| `POST` | `/api/tasks` | Create task | `201`, `400` |
| `PUT` | `/api/tasks/:id` | Update task | `200`, `400`, `404` |
| `DELETE` | `/api/tasks/:id` | Delete task | `200`, `404` |

*For complete payload examples and error responses, see [`docs/api-documentation.md`](file:///c:/Users/CommL/Desktop/task%20managemnt%20system/docs/api-documentation.md).*

---

## 💾 In-Memory Data Storage Limitation

As per assignment constraints:
- Task data is stored strictly in backend server memory arrays (`TaskService.tasks`).
- No database engine (MongoDB, MySQL, PostgreSQL, SQLite, Firebase) is used.
- Data resets when the backend Node.js process is restarted.
- Initial seed data (4 realistic tasks) is loaded on startup for evaluation convenience. To test empty states, set `SEED_SAMPLE_DATA=false` in `backend/.env`.

---

## 📮 Postman Collection & Testing Guide

A complete, production-ready Postman collection is located at [`postman/task-management.postman_collection.json`](file:///c:/Users/CommL/Desktop/task%20managemnt%20system/postman/task-management.postman_collection.json).

### How to Import & Test in Postman:

1. **Open Postman** and click **Import** (or press `Ctrl+O` / `Cmd+O`).
2. Select or drag-and-drop the file [`postman/task-management.postman_collection.json`](file:///c:/Users/CommL/Desktop/task%20managemnt%20system/postman/task-management.postman_collection.json).
3. Ensure your local server is running at `http://localhost:5000` (`npm start --prefix backend`).
4. The collection uses a pre-configured variable `baseUrl` set to `http://localhost:5000/api`.

### Requests & Automated Tests Included:
- `GET {{baseUrl}}/health` — Server health check (`200 OK`)
- `GET {{baseUrl}}/tasks` — Fetch all tasks (`200 OK`)
- `GET {{baseUrl}}/tasks?status=in_progress&priority=high` — Filtered & paginated query (`200 OK`)
- `GET {{baseUrl}}/tasks/task-001-sample` — Fetch single task by ID (`200 OK`)
- `POST {{baseUrl}}/tasks` — Create task with valid JSON payload (`201 Created`)
- `POST {{baseUrl}}/tasks` — Submit invalid empty title/description to verify validation (`400 Bad Request`)
- `PUT {{baseUrl}}/tasks/task-001-sample` — Update task fields & timestamp (`200 OK`)
- `DELETE {{baseUrl}}/tasks/task-001-sample` — Delete task (`200 OK`)
- `DELETE {{baseUrl}}/tasks/non-existent-id` — Attempt delete of invalid ID (`404 Not Found`)

*All 9 endpoints include embedded Postman JavaScript test scripts asserting HTTP status codes and JSON response signatures.*

---

## 📸 Suggested Screenshots for Internship Submission

1. **Dashboard Overview (Light Mode):** Showing stat summary cards, status badges, and search filter controls.
2. **Dashboard Overview (Dark Mode):** Demonstrating the seamless dark mode toggle.
3. **Create Task Form:** Showing field validation messages when submitting empty inputs.
4. **Task Details View:** Full view of task description, metadata timestamps, and action buttons.
5. **Delete Confirmation Modal:** Showing safety confirmation dialog before deletion.
6. **Backend Test Suite Execution:** Terminal screenshot showing `12/12 passing` tests.

---

## 💡 Troubleshooting

- **CORS Issues:** Verify `FRONTEND_ORIGIN` in `backend/.env` matches `http://localhost:5173`.
- **API Connection Error:** Ensure the backend server is running on port 5000 before opening the frontend.
- **Port Conflict:** If port 5000 is occupied, update `PORT` in `backend/.env` and `VITE_API_BASE_URL` in `frontend/.env`.
