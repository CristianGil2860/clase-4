import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* AuthProvider envuelve toda la app: cualquier componente puede
        preguntar si hay sesión con el hook useAuth(). */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
