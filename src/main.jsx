import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import UserMessage from "./components/UserMeassage.jsx";
import DashBoard from "./components/DashBoard.jsx";
import Admission from "./components/Admission.jsx";

// 🔐 Auth components
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import PrivateRoute from "./components/utils/PrivateRoute.jsx";

const router = createBrowserRouter([
  // ✅ Public routes (login/register)
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  // ✅ Protected routes (require login)
  {
    element: <PrivateRoute />, // Wrap all below with auth check
    children: [
      { path: "/", element: <App /> },
      { path: "/userMessage", element: <UserMessage /> },
      { path: "/dashboard", element: <DashBoard /> },
      { path: "/admission", element: <Admission /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
