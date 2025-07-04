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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/hr/mainpage"
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <HRMainPage />
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

        <Route
          path="/employee/mainpage"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeMainPage />
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

        <Route
          path="/hr/employees"
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <EmployeePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hr/profile"
          element={
            <ProtectedRoute allowedRoles={["HR", "employee"]}>
              <ProfilePage />
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
          path="/employee/leave-request" // izin talebi oluşturma sayfası
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <LeaveRequestPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
