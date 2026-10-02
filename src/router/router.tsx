import { Layout } from "@/components/Layout/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router-dom";
import { Dashboard, Projects, Kanban, Settings } from "./lazyPages";


export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/registro",
    element: <Register />
  },

  {
    element: <ProtectedRoute />,
    errorElement: <></>,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "/projects", element: <Projects /> },
          { path: "/projects/:id", element: <Kanban /> },
          { path: "/settings", element: <Settings /> },
        ]
      }
    ]
  },

  {path: '*', element: <NotFound />}
])
