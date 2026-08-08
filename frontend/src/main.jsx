import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles/adminTheme.css";
import "./styles/global.css";
import "./styles/admin.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>

    <ThemeProvider>

      <AuthProvider>

        <App />

      </AuthProvider>

    </ThemeProvider>

  </BrowserRouter>
);
