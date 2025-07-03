import { LogOut } from "lucide-react"; // ikonu buradan alıyoruz
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LogoutButton = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition text-sm font-medium"
    >
      <LogOut size={18} /> {/* ← ikon boyutu */}
      Çıkış Yap
    </button>
  );
};

export default LogoutButton;
