import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/index.js";
import HRMainPage from "./pages/hr/mainPage/index.js";
import EmployeeMainPage from "./pages/employee/mainPage/index.js";
import ProtectedRoute from "./components/routing/ProtectedRoute.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/hr-mainpage"
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <HRMainPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee-mainpage"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeMainPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
