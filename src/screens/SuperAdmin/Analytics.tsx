import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Home, Users, DollarSign } from "lucide-react";
import { usePropertyStore } from "../../store/usePropertyStore";
import { useDashboardStore } from "../../store/useDashboardStore";

export default function SuperAdminAnalytics() {
  const { properties } = usePropertyStore();
  const { users } = useDashboardStore();

  // Calculate stats
  const totalRevenue = properties.reduce(
    (sum, p) => sum + (p.status === "sold" ? p.price : 0),
    0
  );
  const averagePrice =
    properties.length > 0
      ? properties.reduce((sum, p) => sum + p.price, 0) / properties.length
      : 0;

  // Category distribution
  const categoryData = [
    {
      name: "Apartments",
      value: properties.filter((p) => p.category === "apartments").length,
      color: "#3B82F6",
    },
    {
      name: "Houses",
      value: properties.filter((p) => p.category === "houses").length,
      color: "#10B981",
    },
    {
      name: "Commercial",
      value: properties.filter((p) => p.category === "commercial").length,
      color: "#F59E0B",
    },
    {
      name: "Land",
      value: properties.filter((p) => p.category === "land").length,
      color: "#8B5CF6",
    },
    {
      name: "Luxury",
      value: properties.filter((p) => p.category === "luxury").length,
      color: "#EC4899",
    },
    {
      name: "Hostels",
      value: properties.filter((p) => p.category === "hostels").length,
      color: "#6366F1",
    },
    {
      name: "Short Let",
      value: properties.filter((p) => p.category === "shortlet").length,
      color: "#14B8A6",
    },
    {
      name: "Events",
      value: properties.filter((p) => p.category === "events").length,
      color: "#F97316",
    },
  ];

  // Price range distribution
  const priceRanges = [
    {
      name: "< 50M",
      count: properties.filter((p) => p.price < 50000000).length,
    },
    {
      name: "50M - 100M",
      count: properties.filter(
        (p) => p.price >= 50000000 && p.price < 100000000
      ).length,
    },
    {
      name: "100M - 500M",
      count: properties.filter(
        (p) => p.price >= 100000000 && p.price < 500000000
      ).length,
    },
    {
      name: "500M - 1B",
      count: properties.filter(
        (p) => p.price >= 500000000 && p.price < 1000000000
      ).length,
    },
    {
      name: "> 1B",
      count: properties.filter((p) => p.price >= 1000000000).length,
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Comprehensive insights and statistics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Properties
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {properties.length}
          </p>
          <p className="text-sm text-green-600 mt-1">+12% from last month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Users
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {users.length}
          </p>
          <p className="text-sm text-green-600 mt-1">+8% from last month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Average Price
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            ₦{(averagePrice / 1000000).toFixed(1)}M
          </p>
          <p className="text-sm text-green-600 mt-1">+5% from last month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Revenue
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            ₦{(totalRevenue / 1000000000).toFixed(2)}B
          </p>
          <p className="text-sm text-green-600 mt-1">+18% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Price Range Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priceRanges}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Property Categories
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Stats Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mt-6">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Category Statistics
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Available
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Pending
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Avg Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {categoryData.map((category) => {
                  const catProperties = properties.filter(
                    (p) => p.category === category.name.toLowerCase()
                  );
                  const avgPrice =
                    catProperties.length > 0
                      ? catProperties.reduce((sum, p) => sum + p.price, 0) /
                        catProperties.length
                      : 0;
                  return (
                    <tr key={category.name}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {category.value}
                      </td>
                      <td className="px-6 py-4 text-sm text-green-600">
                        {
                          catProperties.filter((p) => p.status === "available")
                            .length
                        }
                      </td>
                      <td className="px-6 py-4 text-sm text-yellow-600">
                        {
                          catProperties.filter((p) => p.status === "pending")
                            .length
                        }
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        ₦{(avgPrice / 1000000).toFixed(2)}M
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
