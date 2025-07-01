import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import HRDashboard from "./pages/hr/dashboard.js";
import EmployeeDashboard from "./pages/employee/dashboard.js";
import ProtectedRoute from "./components/routing/ProtectedRoute.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/hr/dashboard"
          element={
            <ProtectedRoute allowedRoles={["hr"]}>
              <HRDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
