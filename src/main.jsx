import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Routes.jsx";
import AuthProvider from "./contexts/Provider/AuthProvider.jsx";
import ProductProvider from "./contexts/Provider/ProductProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <RouterProvider router={router}></RouterProvider>
      </ProductProvider>
    </AuthProvider>
  </StrictMode>
);
