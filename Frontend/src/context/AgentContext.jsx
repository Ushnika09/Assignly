import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AgentsContext = createContext();

export const AgentsProvider = ({ children }) => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => JSON.parse(localStorage.getItem("userInfo"))?.token;

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const { data } = await axios.get("/api/agents/user-agents", { 
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success && Array.isArray(data.data)) {
        setAgents(data.data);
      } else {
        setAgents([]);
        console.warn("Unexpected agents data:", data);
      }
    } catch (err) {
      console.error("Error fetching agents:", err);
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

  const addAgent = async (agentData) => {
    try {
      const token = getToken();
      await axios.post("/api/agents/add", agentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAgents(); 
    } catch (err) {
      throw err;
    }
  };

  const deleteAgent = async (id) => {
    try {
      const token = getToken();
      await axios.delete(`/api/agents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAgents(); 
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <AgentsContext.Provider value={{ agents, loading, addAgent, deleteAgent, refetchAgents: fetchAgents }}>
      {children}
    </AgentsContext.Provider>
  );
};