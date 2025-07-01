import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t p-4 text-sm text-gray-500 text-center">
      © {new Date().getFullYear()} HR Takip Sistemi
    </footer>
  );
};

export default Footer;
