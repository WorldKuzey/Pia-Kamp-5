import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login";
import HRMainPage from "./pages/hr/mainPage";
import EmployeeMainPage from "./pages/employee/mainPage";
import EmployeePage from "./pages/hr/employee";
import ProfilePage from "./pages/hr/profile";
import LeavePage from "./pages/employee/leaves";
import LeaveRequestPage from "./pages/employee/leaveRequest";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import HRAddEmp from "./pages/hr/add-employee/index.js";
import HRSeeLeaves from "./pages/hr/see-leaves/index.js";

// 🆕 İtiraf sayfaları
import AddConfession from "./pages/addConfession";
import ViewConfessions from "./pages/viewConfession";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Giriş */}
        <Route path="/" element={<LoginPage />} />

        {/* HR Sayfaları */}
        <Route
          path="/hr/mainpage"
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <HRMainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/employees"
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <EmployeePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/add-employee"
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <HRAddEmp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/employees-leaves"
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <HRSeeLeaves />
            </ProtectedRoute>
          }
        />

        {/* Employee Sayfaları */}
        <Route
          path="/employee/mainpage"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeMainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/leaves"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <LeavePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/leave-request"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <LeaveRequestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/profile"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Ortak Sayfa (HR & Employee) */}
        <Route
          path="/hr/profile"
          element={
            <ProtectedRoute allowedRoles={["HR", "employee"]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/confession/add"
          element={
            <ProtectedRoute allowedRoles={["HR", "employee"]}>
              <AddConfession />
            </ProtectedRoute>
          }
        />
        <Route
          path="/confession/view"
          element={
            <ProtectedRoute allowedRoles={["HR", "employee"]}>
              <ViewConfessions />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
