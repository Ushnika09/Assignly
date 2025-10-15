import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Form Card */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
          
          {/* Logo */}
          <div className="flex gap-2 items-center justify-center mb-3">
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

          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Welcome Back 👋
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-teal-400 text-white font-medium py-2.5 rounded-lg hover:opacity-90 transition-all"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-500 hover:text-indigo-600 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
