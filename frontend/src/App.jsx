import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { CreateTask } from './pages/CreateTask';
import { EditTask } from './pages/EditTask';
import { TaskDetailsPage } from './pages/TaskDetailsPage';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="tasks" element={<Dashboard />} />
            <Route path="tasks/new" element={<CreateTask />} />
            <Route path="tasks/:id" element={<TaskDetailsPage />} />
            <Route path="tasks/:id/edit" element={<EditTask />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
