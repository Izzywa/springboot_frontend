import { type RouteObject, Navigate } from "react-router-dom";
import Dashboard from "@/modules/Dashboard/Dashboard";
import { MainLayout } from "@/layouts/MainLayout";
import Login from "@/modules/Login/Login";
import { PrivateRoute } from "@/utils/router/PrivateRoute";
import Register from "@/modules/Login/Register";

export const routes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "dashboard",
            element: <MainLayout container />,
            children: [
              {
                index: true,
                element: <Dashboard />,
              },
            ],
          },
        ],
      },
      {
        path: "login",
        element: <MainLayout container />,
        children: [
          {
            index: true,
            element: <Login />,
          },
        ],
      },
      {
        path: "register",
        element: <MainLayout container />,
        children: [
          {
            index: true,
            element: <Register />,
          },
        ],
      }
    ],
  },
];
