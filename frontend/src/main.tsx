import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import Header from "./components/Header/index.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/index.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Header />
      <AppRoutes />
    </Router>
    <ToastContainer
      position="top-right"
      autoClose={1800}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </StrictMode>
);
