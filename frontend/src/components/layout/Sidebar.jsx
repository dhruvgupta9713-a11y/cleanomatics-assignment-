import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  Clock,
  Loader2,
  CheckCircle2,
  Plus,
  X
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentStatusFilter = searchParams.get('status');

  const navItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: LayoutDashboard,
      isActive: location.pathname === '/' && !currentStatusFilter
    },
    {
      name: 'All Tasks',
      path: '/tasks',
      icon: CheckSquare,
      isActive: location.pathname === '/tasks' && (!currentStatusFilter || currentStatusFilter === 'all')
    },
    {
      name: 'Pending',
      path: '/tasks?status=pending',
      icon: Clock,
      isActive: location.pathname === '/tasks' && currentStatusFilter === 'pending'
    },
    {
      name: 'In Progress',
      path: '/tasks?status=in_progress',
      icon: Loader2,
      isActive: location.pathname === '/tasks' && currentStatusFilter === 'in_progress'
    },
    {
      name: 'Completed',
      path: '/tasks?status=completed',
      icon: CheckCircle2,
      isActive: location.pathname === '/tasks' && currentStatusFilter === 'completed'
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 z-40 h-full w-60 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header Logo */}
        <div className="h-14 px-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <NavLink to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <CheckSquare className="w-4 h-4" />
            </div>
            <span className="text-base font-semibold text-slate-900 dark:text-white tracking-tight">
              TaskFlow
            </span>
          </NavLink>

          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Action Button */}
        <div className="p-3">
          <NavLink
            to="/tasks/new"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Create Task
          </NavLink>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
          <div className="px-3 py-1.5 text-[11px] font-medium tracking-wider text-slate-400 uppercase">
            Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.isActive
                    ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    item.isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Workspace indicator footer */}
        <div className="p-3.5 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="font-medium text-slate-700 dark:text-slate-300">System Ready</span>
          </div>
        </div>
      </aside>
    </>
  );
};
