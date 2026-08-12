import { createBrowserRouter, Navigate } from "react-router-dom";
import { DashboardPage } from "@/Pages/DashboardPage";
import App from "./App";
import { CategoryPage } from "@/Pages/CategoryPage";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "categories", element: <CategoryPage /> },
    ],
  },
]);
