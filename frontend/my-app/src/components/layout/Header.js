import React from "react";
import { useAuth } from "../../context/AuthContext.js";
import LogoutButton from "../common/LogoutButton.js";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Header = () => {
  const { email } = useAuth();

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{ borderBottom: "1px solid #e0e0e0" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 1, sm: 1.5 },
        }}
      >
        <Typography
          variant="h6"
          component="h1"
          color="textPrimary"
          fontWeight="bold"
          sx={{ userSelect: "none" }}
        >
          İK Portalı
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            color: "text.secondary",
            userSelect: "none",
          }}
          aria-label="Kullanıcı bilgisi ve çıkış butonu"
        >
          <Typography variant="body2" color="textSecondary">
            Merhaba, <strong>{email || "Kullanıcı"}</strong>
          </Typography>
          <LogoutButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
