import { type RouteObject, Navigate } from 'react-router-dom';
import Dashboard from '@/modules/Dashboard/Dashboard';
import { MainLayout } from '@/layouts/MainLayout';

export const routes: RouteObject[] = [
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <MainLayout container />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          }
        ]

      }
    ],
  },
];
