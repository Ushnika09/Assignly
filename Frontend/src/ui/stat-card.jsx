import React from "react";
import { Card } from "./card";

export const StatCard = ({ label, value, icon }) => {
  return (
    <Card className="flex items-center justify-between p-4 hover:shadow-md transition">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
      <div className="text-indigo-500">{icon}</div>
    </Card>
  );
};
