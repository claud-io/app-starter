import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./provider";
import Router from "./routes";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>
);
