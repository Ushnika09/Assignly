import React from "react";

const Demo = () => {
  return (
    <div className="bg-gray-50 rounded-xl w-full shadow-xl">
      {/* Header Gradient */}
      <div className="h-12 w-full bg-gradient-to-r from-indigo-500 to-teal-400 rounded-t-xl "></div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-5.5 py-1.5 pb-4.5">
        <h2 className="text-lg font-medium text-gray-700 mb-3">
          Dashboard Snapshot
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            <div className="rounded-xl border border-gray-200 bg-white p-2 flex justify-center flex-col items-center shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Total Agents</div>
              <div className="text-2xl font-semibold text-gray-800">12</div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-2 flex justify-center flex-col items-center shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Total Tasks</div>
              <div className="text-2xl font-semibold text-gray-800">124</div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-2 flex justify-center flex-col items-center shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Last Upload</div>
              <div className="text-lg font-semibold text-gray-800">
                tasks.csv
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-2 flex justify-center flex-col items-center shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Distribution</div>
              <div className="text-lg font-semibold text-gray-800">Even</div>
            </div>
          </div>

          {/* Graph Section */}
          <div className="flex-1 rounded-2xl bg-gradient-to-br from-indigo-100 to-teal-100 p-4 flex items-center justify-center shadow-sm">
            <img
              src="graph.png"
              alt="Dashboard Graph"
              className="w-full h-auto rounded-lg object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
