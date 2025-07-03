import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SidebarLayout from "./SidebarLayout";
import { HR_MENU, EMPLOYEE_MENU } from "../../data/sidebarMenu.js";

import Box from "@mui/material/Box";

const AppLayout = ({ children }) => {
  const role = localStorage.getItem("role");
  const menu = role === "HR" ? HR_MENU : EMPLOYEE_MENU;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "#f5f5f5", // açık gri
      }}
    >
      {/* Header’a alt margin ekleyelim */}
      <Box sx={{ mb: 2 }}>
        <Header />
      </Box>

      {/* Sidebar ve Main içerik kısmı */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
          pt: 1, // üst boşluk sidebar için
          px: 2, // yan boşluklar
          gap: 2, // sidebar ile main arası boşluk
        }}
      >
        <SidebarLayout
          menuItems={menu}
          title={role === "HR" ? "İK Yönetimi" : "Çalışan"}
          sx={{ mt: 1 }} // opsiyonel ekstra üst boşluk
        />

        <Box
          component="main"
          sx={{
            flex: 1,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            overflowY: "auto",
            p: 3,
          }}
        >
          {children}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default AppLayout;
