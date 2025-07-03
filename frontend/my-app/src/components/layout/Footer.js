import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        borderTop: "1px solid #e0e0e0",
        p: 2,
        mt: 2, // üst boşluk eklendi
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 1,
        fontSize: "0.875rem",
        userSelect: "none",
      }}
    >
      {/* Sol kısım - küçük açıklama */}
      <Typography variant="body2" color="text.secondary">
        HR Takip Sistemi v1.0.0
      </Typography>

      {/* Ortadaki copyright */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: "center", flexGrow: 1 }}
      >
        © {new Date().getFullYear()} HR Takip Sistemi
      </Typography>

      {/* Sağ kısım boş bırakıldı */}
      <Box sx={{ width: 32 }} />
    </Box>
  );
};

export default Footer;
