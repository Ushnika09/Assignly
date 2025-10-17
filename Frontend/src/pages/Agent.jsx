import { useState, useMemo, useContext } from "react";
import { AgentsContext } from "../context/AgentContext";

export default function Agents() {
  const { agents, loading, addAgent, deleteAgent } = useContext(AgentsContext);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addAgent(newAgent);
      setShowForm(false);
      setNewAgent({ name: "", email: "", mobile: "", password: "" });
    } catch (err) {
      alert("Error adding agent: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this agent?")) return;
    try {
      await deleteAgent(id);
    } catch (err) {
      alert("Error deleting agent: " + (err.response?.data?.message || err.message));
    }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return agents.filter(
      (a) =>
        a.name?.toLowerCase().includes(q) ||
        a.email?.toLowerCase().includes(q) ||
        a.mobile?.toLowerCase().includes(q)
    );
  }, [agents, search]);

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  if (loading) return <p className="p-6 text-center text-gray-500">Loading agents...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Agents</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search agents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-lg shadow-sm w-64 focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {showForm ? "Close" : "Add Agent"}
          </button>
        </div>
      </div>

      {/* Add Agent Form */}
      {showForm && (
        <form onSubmit={handleAdd} className="space-y-2 bg-gray-50 p-4 rounded-lg border">
          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              placeholder="Name"
              value={newAgent.name}
              onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
              className="flex-1 px-2 py-1 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newAgent.email}
              onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
              className="flex-1 px-2 py-1 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Mobile"
              value={newAgent.mobile}
              onChange={(e) => setNewAgent({ ...newAgent, mobile: e.target.value })}
              className="flex-1 px-2 py-1 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newAgent.password}
              onChange={(e) => setNewAgent({ ...newAgent, password: e.target.value })}
              className="flex-1 px-2 py-1 border rounded"
              required
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Save
          </button>
        </form>
      )}

      {/* Agents Table */}
      {filtered.length === 0 ? (
        <div className="text-center p-10 bg-gray-50 rounded-xl text-gray-500">No agents found.</div>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-4 py-2 text-left">Agent</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Mobile</th>
                <th className="px-4 py-2 text-right">Tasks Assigned</th>
                <th className="px-4 py-2 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((a) => (
                <tr key={a._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-sm">
                      {getInitials(a.name)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{a.name}</div>
                      <div className="text-xs text-gray-400">ID: {a._id.slice(0, 8)}</div>
                    </div>
                  </td>
                  <td className="px-4 py-2">{a.email}</td>
                  <td className="px-4 py-2">{a.mobile}</td>
                  <td className="px-4 py-2 text-right font-semibold">{a.tasksAssigned || 0}</td>
                  <td className="px-4 py-2 text-right">
                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(a._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
