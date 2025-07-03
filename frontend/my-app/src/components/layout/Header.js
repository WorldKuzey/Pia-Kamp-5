import React from "react";
import { useAuth } from "../../context/AuthContext.js";
import LogoutButton from "../common/LogoutButton.js"; // yoluna göre değiştir

const Header = () => {
  const { email } = useAuth();

  return (
    <header className="bg-white border-b p-4 shadow-sm flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-700">İK Portalı</h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600 text-sm">
          Merhaba, <strong>{email || "Kullanıcı"}</strong>
        </span>
        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
