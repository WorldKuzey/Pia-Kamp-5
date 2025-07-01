import React from "react";
import { Link } from "react-router-dom";

const SidebarLayout = ({ menuItems, title }) => {
  return (
    <aside className="w-64 bg-blue-800 text-white h-full p-4">
      <h2 className="text-xl font-bold mb-6">{title}</h2>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link to={item.path} className="hover:underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarLayout;
