import React from "react";

export const HomeLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-indigo-600">📊 Assignly Dashboard</h1>
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );
};
