import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleGuard } from './RoleGuard';

// Pages (we will create these soon)
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { CalendarPage } from '@/pages/CalendarPage';
import { RequestsPage } from '@/pages/RequestsPage';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { AdminReportsPage } from '@/pages/admin/AdminReportsPage';
import { AdminApprovalsPage } from '@/pages/admin/AdminApprovalsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

/** Global application router using React Router v6 */
export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path: 'calendar',
            element: <CalendarPage />,
          },
          {
            path: 'requests',
            element: <RequestsPage />,
          },
          {
            path: 'admin',
            element: <RoleGuard allowedRoles={['admin']} />,
            children: [
              {
                index: true,
                element: <AdminDashboardPage />,
              },
              {
                path: 'reports',
                element: <AdminReportsPage />,
              },
              {
                path: 'approvals',
                element: <AdminApprovalsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
