import React from "react";
import { Link } from "react-router-dom";

const SidebarLayout = ({ menuItems, title }) => {
  return (
    <aside className="w-64 bg-blue-800 text-white h-full p-4">
      {/* Logo */}
      <div className="mb-6 flex justify-start">
        <img
          src="/assets/images/ikon-high-resolution-logo.png"
          alt="Proje Logosu"
          className="h-10 object-contain"
        />
      </div>

      {/* Başlık */}
      <h2 className="text-xl font-bold mb-6 text-center">{title}</h2>

      {/* Menü */}
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className="flex items-center space-x-2 hover:underline"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarLayout;
