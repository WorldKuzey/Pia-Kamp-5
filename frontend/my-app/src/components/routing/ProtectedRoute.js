import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("role");

  if (!role || (allowedRoles && !allowedRoles.includes(role))) {
    // Giriş yapılmamış ya da yetkisiz rol varsa login'e gönder
    return <Navigate to="/" replace />;
  }

  // Giriş yapılmış ve izin verilen rol ise sayfayı göster
  return children;
};

export default ProtectedRoute;
