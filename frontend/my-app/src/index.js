import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Tailwind CSS dahil ediliyor
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // buraya ekle

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
