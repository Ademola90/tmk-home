"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiMapPin,
  FiDollarSign,
  FiTrendingUp,
  FiUserPlus,
  FiFileText,
} from "react-icons/fi";
import StatCard from "../../components/dashboard/StatCard";
import { useDashboardStore } from "../../store/useDashboardStore";
import { Link } from "react-router-dom";

const SuperAdminDashboard = () => {
  const { stats, fetchDashboardData, isLoading } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Super Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your platform.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Properties"
          value={stats.totalProperties}
          icon={FiMapPin}
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon={FiUsers}
          trend={{ value: 8, isPositive: true }}
          color="green"
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={FiDollarSign}
          trend={{ value: 15, isPositive: true }}
          color="purple"
        />
        <StatCard
          title="Pending Approvals"
          value={stats.pendingApprovals}
          icon={FiFileText}
          trend={{ value: 5, isPositive: false }}
          color="orange"
        />
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/dashboard/super-admin/users"
            className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="bg-blue-100 p-3 rounded-lg">
              <FiUserPlus className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Add New User</h3>
              <p className="text-sm text-gray-600">Create admin or agent</p>
            </div>
          </Link>

          <Link
            to="/dashboard/super-admin/properties"
            className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all"
          >
            <div className="bg-green-100 p-3 rounded-lg">
              <FiMapPin className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Manage Properties</h3>
              <p className="text-sm text-gray-600">View all listings</p>
            </div>
          </Link>

          <Link
            to="/dashboard/super-admin/analytics"
            className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-md transition-all"
          >
            <div className="bg-purple-100 p-3 rounded-lg">
              <FiTrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">View Analytics</h3>
              <p className="text-sm text-gray-600">Platform insights</p>
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[
            {
              type: "user",
              message: "New admin registered - John Doe",
              time: "2 hours ago",
            },
            {
              type: "property",
              message: "Property approved - Luxury Villa",
              time: "3 hours ago",
            },
            {
              type: "system",
              message: "System backup completed",
              time: "5 hours ago",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-gray-900">{activity.message}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SuperAdminDashboard;
