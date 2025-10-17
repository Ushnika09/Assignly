// Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiUsers, FiUpload, FiBarChart2, FiHome } from "react-icons/fi";

const Sidebar = ({ collapsed }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { name: "Agents", icon: <FiUsers />, path: "/dashboard/agent" },
    { name: "Upload", icon: <FiUpload />, path: "/dashboard/upload" },
  ];

  return (
    <div
      className={`bg-white shadow h-screen fixed top-17 left-0 transition-all duration-300 z-50 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <nav className="mt-5 flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg mx-2 hover:bg-indigo-100 transition-colors ${
              location.pathname === item.path
                ? "bg-indigo-200 font-semibold"
                : "text-gray-700"
            }`}
          >
            <div className="text-lg">{item.icon}</div>
            {!collapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
