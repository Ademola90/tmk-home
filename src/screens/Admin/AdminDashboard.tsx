import { Home, Users, TrendingUp, DollarSign } from "lucide-react";
import { usePropertyStore } from "../../store/usePropertyStore";
import { useDashboardStore } from "../../store/useDashboardStore";
import StatCard from "../../components/dashboard/StatCard";

export default function AdminDashboard() {
  const { properties } = usePropertyStore();
  const { users } = useDashboardStore();

  const approvedProperties = properties.filter((p) => p.status === "available");
  const pendingProperties = properties.filter((p) => p.status === "pending");
  const agents = users.filter((u) => u.role === "agent");
  const totalValue = properties.reduce((sum, p) => sum + p.price, 0);

  const recentProperties = [...properties]
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 5);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Properties"
          value={properties.length}
          icon={Home}
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        <StatCard
          title="Approved"
          value={approvedProperties.length}
          icon={TrendingUp}
          trend={{ value: 8, isPositive: true }}
          color="green"
        />
        <StatCard
          title="Pending Review"
          value={pendingProperties.length}
          icon={Users}
          trend={{ value: 3, isPositive: false }}
          color="yellow"
        />
        <StatCard
          title="Total Value"
          value={`₦${(totalValue / 1000000000).toFixed(1)}B`}
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Properties */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Properties
          </h2>
          <div className="space-y-4">
            {recentProperties.map((property) => (
              <div
                key={property.id}
                className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
              >
                <img
                  src={property.images[0] || "/placeholder.svg"}
                  alt={property.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {property.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {property.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    ₦{(property.price / 1000000).toFixed(1)}M
                  </p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      property.status === "available"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {property.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Agents */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Active Agents
          </h2>
          <div className="space-y-4">
            {agents.slice(0, 5).map((agent) => (
              <div
                key={agent.id}
                className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                  {agent.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {agent.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {agent.email}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {properties.filter((p) => p.agent.id === agent.id).length}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    properties
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// import { usePropertyStore } from "../../store/usePropertyStore";
// import { useDashboardStore } from "../../store/useDashboardStore";
// import StatCard from "../../components/dashboard/StatCard";
// import { FaDollarSign, FaHome, FaUsers } from "react-icons/fa";
// import { FiTrendingUp } from "react-icons/fi";

// export default function AdminDashboard() {
//   const { properties } = usePropertyStore();
//   const { users } = useDashboardStore();

//   const approvedProperties = properties.filter((p) => p.status === "available");
//   const pendingProperties = properties.filter((p) => p.status === "pending");
//   const agents = users.filter((u) => u.role === "agent");
//   const totalValue = properties.reduce((sum, p) => sum + p.price, 0);

//   const recentProperties = [...properties]
//     .sort(
//       (a, b) =>
//         new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//     )
//     .slice(0, 5);

//   return (
//     <div className="p-6">
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//           Admin Dashboard
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400">
//           Welcome back! Here's what's happening today.
//         </p>
//       </div>

//       {/* ✅ Fixed Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//         <StatCard
//           title="Total Properties"
//           value={properties.length}
//           icon={FaHome}
//           trend={{ value: 12, isPositive: true }}
//           color="blue"
//         />
//         <StatCard
//           title="Approved"
//           value={approvedProperties.length}
//           icon={FiTrendingUp}
//           trend={{ value: 8, isPositive: true }}
//           color="green"
//         />
//         <StatCard
//           title="Pending Review"
//           value={pendingProperties.length}
//           icon={FaUsers}
//           trend={{ value: 3, isPositive: false }}
//           color="yellow"
//         />
//         <StatCard
//           title="Total Value"
//           value={`₦${(totalValue / 1000000000).toFixed(1)}B`}
//           icon={FaDollarSign}
//           trend={{ value: 15, isPositive: true }}
//           color="purple"
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Properties */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
//           <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             Recent Properties
//           </h2>
//           <div className="space-y-4">
//             {recentProperties.map((property) => (
//               <div
//                 key={property.id}
//                 className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
//               >
//                 <img
//                   src={property.images[0] || "/placeholder.svg"}
//                   alt={property.title}
//                   className="w-16 h-16 rounded-lg object-cover"
//                 />
//                 <div className="flex-1 min-w-0">
//                   <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
//                     {property.title}
//                   </h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     {property.location}
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm font-semibold text-gray-900 dark:text-white">
//                     ₦{(property.price / 1000000).toFixed(1)}M
//                   </p>
//                   <span
//                     className={`inline-flex px-2 py-1 text-xs rounded-full ${
//                       property.status === "available"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-yellow-100 text-yellow-800"
//                     }`}
//                   >
//                     {property.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Active Agents */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
//           <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             Active Agents
//           </h2>
//           <div className="space-y-4">
//             {agents.slice(0, 5).map((agent) => (
//               <div
//                 key={agent.id}
//                 className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
//               >
//                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
//                   {agent.name.charAt(0)}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h3 className="text-sm font-medium text-gray-900 dark:text-white">
//                     {agent.name}
//                   </h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     {agent.email}
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm font-semibold text-gray-900 dark:text-white">
//                     {properties.filter((p) => p.agent.id === agent.id).length}
//                   </p>
//                   <p className="text-xs text-gray-600 dark:text-gray-400">
//                     properties
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
