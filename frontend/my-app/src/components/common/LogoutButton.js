import React from "react";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout"; // Material UI logout ikonu
import Tooltip from "@mui/material/Tooltip";
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
    <Tooltip title="Çıkış Yap">
      <IconButton
        onClick={handleLogout}
        color="error" // kırmızı renk
        aria-label="Çıkış Yap"
        size="small"
      >
        <LogoutIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default LogoutButton;
