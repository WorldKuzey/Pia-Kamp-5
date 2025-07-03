import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/index.js";
import HRMainPage from "./pages/hr/mainPage/index.js";
import EmployeeMainPage from "./pages/employee/mainPage/index.js";
import EmployeePage from "./pages/hr/employee";
import ProfilePage from "./pages/hr/profile"; // profile sayfası
import ProtectedRoute from "./components/routing/ProtectedRoute.js";

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
          path="/employee/mainpage"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeMainPage />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
