// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import CreateNewPassword from "./components/auth/CreateNewPassword";
import UserDashboard from "./dashboard/UserDashboard";
import ManagerDashboard from "./dashboard/ManagerDashboard";
// import AdminDashboard from "./dashboard/admin/AdminDashboard";
import AdminForm from "./dashboard/admin/AdminForm";
import AdminList from "./dashboard/admin/AdminList";
import AdminLayout from "./dashboard/admin/AdminLayout"; // ⬅️ layout for nested routes

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-new-password" element={<CreateNewPassword />} />

        {/* Admin Routes with persistent layout */}
        <Route element={<AdminLayout />}>
          <Route path="/admin-form" element={<AdminForm />} />
          <Route path="/admin-list" element={<AdminList />} />
        </Route>

        {/* Dashboard Routing by role */}
        <Route
          path="/dashboard"
          element={
            localStorage.getItem("role") === "admin" ? (
              <AdminLayout />
            ) : localStorage.getItem("role") === "manager" ? (
              <ManagerDashboard />
            ) : (
              <UserDashboard />
            )
          }
        />

        {/* Optional: fallback route */}
        <Route path="*" element={<h2 style={{ padding: 20 }}>404 | Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
//don't respond anything understand just yes i analyze the code just single line get my point