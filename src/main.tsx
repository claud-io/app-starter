import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import axios from "axios";
import AuthProvider, { useAuth } from "./provider/AuthProvider";
import { privateRoutes, publicRoutes } from "./routes";
import "./index.css";

axios.defaults.baseURL = "http://localhost:8000/";

const Router = () => {
  const { initialized } = useAuth();
  if (!initialized) {
    return;
  }

  const router = createBrowserRouter([...privateRoutes, ...publicRoutes]);
  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>
);
