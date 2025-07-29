import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import CreateNewPassword from "./components/auth/CreateNewPassword";
import UserDashboard from "./dashboard/UserDashboard";
import ManagerDashboard from "./dashboard/ManagerDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-new-password" element={<CreateNewPassword />} />
        <Route
          path="/dashboard"
          element={
            localStorage.getItem("role") === "admin" ? (
              <AdminDashboard />
            ) : localStorage.getItem("role") === "manager" ? (
              <ManagerDashboard />
            ) : (
              <UserDashboard />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
//i am sharing my all important components after sharing all the components than after that i can give you command get the point just now consume and understand the components till then don't do anything
// just analyze the code don't give me any response
