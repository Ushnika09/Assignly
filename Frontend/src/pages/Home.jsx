import { useState, useEffect, useMemo } from "react";
import { Card } from "../ui/card";
import { StatCard } from "../ui/stat-card";
import { Users, ClipboardList, UploadCloud, PieChart as PieIcon } from "lucide-react";
import { Pie, PieChart, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";
import { HomeLayout } from "../layout/HomeLayout";
import axios from "axios";

const COLORS = ["#06B6D4", "#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#14B8A6", "#84CC16", "#F97316", "#DC2626", "#6366F1", "#0EA5E9", "#22C55E"];

export default function Home() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalAgents: 0, agentsWithTasks: 0, tasks: 0, uploads: 0, lastUpload: null });
  const [lastUpload, setLastUpload] = useState("N/A");

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
        const { data } = await axios.get("/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          const fetchedAgents = data.data.agents || [];
          setAgents(fetchedAgents);
          setStats(data.data.stats);

          // Format last upload time
          if (data.data.stats.lastUpload) {
            const uploadTime = new Date(data.data.stats.lastUpload);
            setLastUpload(uploadTime.toLocaleString());
          } else {
            setLastUpload("N/A");
          }
        }
      } catch (err) {
        console.error("Failed to fetch dashboard:", err);
        setAgents([]);
        setStats({ totalAgents: 0, agentsWithTasks: 0, tasks: 0, uploads: 0, lastUpload: null });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // Pie chart data 
  const pieData = useMemo(
    () => agents.filter(agent => agent.tasksAssigned > 0).map((a) => ({ name: a.name, value: a.tasksAssigned })),
    [agents]
  );

  // Check if there are any tasks distributed
  const hasDistributedTasks = useMemo(() => {
    return stats.tasks > 0 && stats.agentsWithTasks > 0;
  }, [stats.tasks, stats.agentsWithTasks]);

  // Task distribution label
  const distributionLabel = useMemo(() => {
    if (!hasDistributedTasks) return "N/A";
    const minTasks = Math.floor(stats.tasks / stats.agentsWithTasks);
    const remainder = stats.tasks % stats.agentsWithTasks;
    return remainder > 0 ? `Equal w/ ${remainder} remainder` : "Equal";
  }, [hasDistributedTasks, stats.tasks, stats.agentsWithTasks]);

  return (
    <HomeLayout>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Agents"
            value={loading ? "Loading..." : stats.totalAgents}
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard
            label="Total Tasks"
            value={loading ? "Loading..." : stats.tasks}
            icon={<ClipboardList className="h-5 w-5" />}
          />
          <StatCard
            label="Files Uploaded"
            value={loading ? "Loading..." : stats.uploads}
            icon={<UploadCloud className="h-5 w-5" />}
          />
          <StatCard
            label="Distribution"
            value={loading ? "Loading..." : distributionLabel}
            icon={<PieIcon className="h-5 w-5" />}
          />
        </div>

        {/* Pie Chart  */}
        {hasDistributedTasks && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-indigo-600">Task Distribution</h3>
            <div className="relative h-[300px] overflow-y-auto scrollbar-thin">
              {loading ? (
                <p className="text-center text-gray-500">Loading chart...</p>
              ) : pieData.length === 0 ? (
                <p className="text-center text-gray-500">No tasks assigned</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={pieData}
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={4}
                    >
                      {pieData.map((_entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>
          </Card>
        )}

        {/* Agents Table  */}
        {/* Agents Table - Show ALL agents, not just ones with tasks */}
<Card className="p-6">
  <h3 className="text-lg font-semibold mb-4 text-indigo-600">Agents & Tasks</h3>
  <div className="overflow-x-auto">
    <table className="min-w-full border-collapse text-sm">
      <thead className="bg-gray-100 sticky top-0">
        <tr>
          <th className="border px-3 py-1 text-left">Name</th>
          <th className="border px-3 py-1 text-left">Email</th>
          <th className="border px-3 py-1 text-left">Mobile</th>
          <th className="border px-3 py-1 text-left">Current Tasks</th>
          <th className="border px-3 py-1 text-left">Would Get</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={5} className="text-center py-4">
              Loading...
            </td>
          </tr>
        ) : agents.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center py-4">
              No agents found
            </td>
          </tr>
        ) : (
          agents.map((agent) => {
            // Calculate how many tasks this agent would get in next distribution
            const tasksPerAgent = Math.floor(stats.tasks / stats.totalAgents);
            const remainder = stats.tasks % stats.totalAgents;
            const agentIndex = agents.findIndex(a => a._id === agent._id);
            const wouldGetTasks = agentIndex < remainder ? tasksPerAgent + 1 : tasksPerAgent;
            
            return (
              <tr key={agent._id} className="hover:bg-gray-50">
                <td className="border px-3 py-1">{agent.name}</td>
                <td className="border px-3 py-1">{agent.email}</td>
                <td className="border px-3 py-1">{agent.mobile}</td>
                <td className="border px-3 py-1 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    agent.tasksAssigned > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {agent.tasksAssigned || 0}
                  </span>
                </td>
                <td className="border px-3 py-1 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    wouldGetTasks > 0 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {wouldGetTasks}
                  </span>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  </div>
</Card>

        {/* Show message when no tasks are distributed */}
        {!loading && !hasDistributedTasks && stats.totalAgents > 0 && (
          <Card className="p-6">
            <div className="text-center py-8">
              <UploadCloud className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Tasks Distributed Yet</h3>
              <p className="text-gray-500">
                You have {stats.totalAgents} agents but no tasks have been distributed yet.
                Upload a file to start distributing tasks to your agents.
              </p>
            </div>
          </Card>
        )}

        {/* Show message when no agents exist */}
        {!loading && stats.totalAgents === 0 && (
          <Card className="p-6">
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Agents Found</h3>
              <p className="text-gray-500">
                Get started by adding agents to your account. Once you have agents, 
                you can upload files to distribute tasks to them.
              </p>
            </div>
          </Card>
        )}
      </div>
    </HomeLayout>
  );
}