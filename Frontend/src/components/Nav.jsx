import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiLogIn, FiLogOut, FiMenu } from "react-icons/fi";

function Nav({ collapsed, toggleCollapse, user, logout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Check if current route is home page
  const isHomePage = location.pathname === "/";

  return (
    <main className="flex justify-between px-7 py-3 shadow bg-white/90 fixed w-full z-50">
      <div className="flex items-center gap-7">
        {/* Collapse Button - Hidden on home page */}
        {!isHomePage && (
          <div className="flex justify-end p-3">
            <button
              onClick={toggleCollapse}
              className="text-gray-700 hover:text-gray-900"
            >
              <FiMenu size={20} />
            </button>
          </div>
        )}

        {/* Logo  */}
        <div className="flex gap-2 items-center">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-emerald-500 shadow-sm flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          <div className="leading-tight">
            <div className="text-lg font-bold tracking-tight text-accent">
              Assignly
            </div>
            <div className="text-[11px] text-gray-800/60">
              Manage agents. Assign tasks.
            </div>
          </div>
        </div>
      </div>

      {/* Conditional CTA */}
      {!user ? (
        <Link
          to="/login"
          className="px-5 py-2 bg-blue-700 text-white font-medium rounded-xl flex gap-2 shrink-0 items-center hover:bg-blue-800/90 cursor-pointer"
        >
          Login
          <FiLogIn />
        </Link>
      ) : (
        <div className="flex gap-4 items-center">
          <span className="font-medium text-gray-700">Hello, {user.name}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-xl flex items-center gap-1 hover:bg-red-700/90"
          >
            Logout <FiLogOut />
          </button>
        </div>
      )}
    </main>
  );
}

export default Nav;