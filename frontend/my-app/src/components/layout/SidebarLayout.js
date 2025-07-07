import React from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const SidebarLayout = ({ menuItems, title }) => {
  return (
    <Box
      component="aside"
      sx={{
        width: 260,
        height: "100vh",
        bgcolor: "primary.main",
        color: "common.white",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, #42a5f5 0%, #1e88e5 100%)",
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        boxShadow: "3px 0 12px rgba(0, 0, 0, 0.35)",
        overflow: "hidden", // dışarı taşanları kes
      }}
    >
      {/* Üst kısım: Logo ve başlık */}
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "start" }}>
          <img
            src="/assets/images/ikon-high-resolution-logo.png"
            alt="Proje Logosu"
            style={{ height: 40, objectFit: "contain" }}
          />
        </Box>

        <Typography
          variant="h6"
          component="h2"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          {title}
        </Typography>
      </Box>

      {/* Scroll edilebilir liste alanı */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              component={Link}
              to={item.path}
              key={item.path}
              sx={{
                color: "common.white",
                mb: 1,
                borderRadius: 1,
                transition:
                  "background-color 0.3s, color 0.3s, box-shadow 0.3s",
                "&:hover": {
                  bgcolor: "#90caf9",
                  color: "#0d47a1",
                  boxShadow: "0 6px 16px rgba(144, 202, 249, 0.6)",
                },
              }}
            >
              {item.icon && (
                <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
                  {item.icon}
                </ListItemIcon>
              )}
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Alt çizgi (sabit) */}
      <Divider sx={{ borderColor: "rgba(255,255,255,0.4)", mx: 2, mb: 2 }} />
    </Box>
  );
};

export default SidebarLayout;
