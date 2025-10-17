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
  const [adding, setAdding] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      await addAgent(newAgent);
      setShowForm(false);
      setNewAgent({ name: "", email: "", mobile: "", password: "" });
    } catch (err) {
      alert("Error adding agent: " + (err.response?.data?.message || err.message));
    } finally {
      setAdding(false);
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
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "NA";

  // Show loading state
  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Agents</h2>
          <div className="flex gap-2">
            <div className="w-64 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Agents</h2>
          <p className="text-gray-600 text-sm mt-1">
            {agents.length} agent{agents.length !== 1 ? 's' : ''} in your account
          </p>
        </div>
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
        <form onSubmit={handleAdd} className="space-y-4 bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-lg font-semibold">Add New Agent</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter agent name"
                value={newAgent.name}
                onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter email address"
                value={newAgent.email}
                onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
              <input
                type="text"
                placeholder="Enter mobile number"
                value={newAgent.mobile}
                onChange={(e) => setNewAgent({ ...newAgent, mobile: e.target.value })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={newAgent.password}
                onChange={(e) => setNewAgent({ ...newAgent, password: e.target.value })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              type="submit" 
              disabled={adding}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              {adding ? "Adding..." : "Save Agent"}
            </button>
            <button 
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Agents Table */}
      {agents.length === 0 ? (
        <div className="text-center p-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Agents Yet</h3>
          <p className="text-gray-500 mb-6">
            Get started by adding your first agent to manage tasks.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Your First Agent
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center p-10 bg-gray-50 rounded-xl text-gray-500">
          No agents match your search criteria.
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-4 py-2 text-left">Agent</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Mobile</th>
                <th className="px-4 py-2 text-right">Tasks Assigned</th>
                <th className="px-4 py-2 text-right">Actions</th>
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
                  <td className="px-4 py-2 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      a.tasksAssigned > 0 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {a.tasksAssigned || 0}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button 
                      className="text-red-500 hover:text-red-700" 
                      onClick={() => handleDelete(a._id)}
                    >
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