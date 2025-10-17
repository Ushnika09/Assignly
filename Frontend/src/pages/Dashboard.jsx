// Layout.jsx
import React, { useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import Nav from "../components/Nav";
import { UserContext } from "../context/UserContext";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useContext(UserContext);

  return (
    <div className="flex h-screen">

        {/* Nav */}
        <Nav  collapsed={collapsed}  toggleCollapse={() => setCollapsed(!collapsed)}  user={user}  logout={logout}
        />

      {/* Sidebar */}
      <Sidebar collapsed={collapsed} />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all  mt-18  p-5 duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        } flex flex-col`}
      >
        <Outlet/>
      </div>
      
    </div>
    
  );
};

export default Layout;
