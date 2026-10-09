import { createBrowserRouter, Navigate } from "react-router-dom";
import { DashboardPage } from "@/Pages/DashboardPage";
import App from "./App";
import { CategoryPage } from "@/Pages/CategoryPage";
import { SupplierPage } from "@/Pages/SupplierPage";
import { ProductPage } from "@/Pages/ProductPage";
import { StockMovementPage } from "@/Pages/StockMovementPage";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "categories", element: <CategoryPage /> },
      { path: "supplires", element: <SupplierPage /> },
      { path: "products", element: <ProductPage /> },
      { path: "stock-movements", element: <StockMovementPage /> },
    ],
  },
]);
