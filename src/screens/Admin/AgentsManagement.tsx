import { useState } from "react";
import { Home } from "lucide-react";
import { useDashboardStore } from "../../store/useDashboardStore";
import { usePropertyStore } from "../../store/usePropertyStore";

import { FaMailBulk, FaMapPin, FaPhone } from "react-icons/fa";

export default function AdminAgentsManagement() {
  const { users } = useDashboardStore();
  const { properties } = usePropertyStore();
  const [searchTerm, setSearchTerm] = useState("");

  const agents = users.filter((u) => u.role === "agent");

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAgentStats = (agentId: string) => {
    const agentProperties = properties.filter((p) => p.agent.id === agentId);
    return {
      total: agentProperties.length,
      available: agentProperties.filter((p) => p.status === "available").length,
      pending: agentProperties.filter((p) => p.status === "pending").length,
    };
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Agents Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage real estate agents and their performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Agents
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {agents.length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Active Listings
          </h3>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {properties.filter((p) => p.status === "available").length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Pending Approvals
          </h3>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {properties.filter((p) => p.status === "pending").length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
        <input
          type="text"
          placeholder="Search agents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => {
          const stats = getAgentStats(agent.id);
          return (
            <div
              key={agent.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">
                  {agent.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {agent.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {agent.role}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <FaMailBulk className="w-4 h-4" />
                  {agent.email}
                </div>
                {agent.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FaPhone className="w-4 h-4" />
                    {agent.phone}
                  </div>
                )}
                {agent.address && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FaMapPin className="w-4 h-4" />
                    {agent.address}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Home className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.total}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Total
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {stats.available}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Active
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">
                    {stats.pending}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Pending
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
