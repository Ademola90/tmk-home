import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiMapPin,
  FiSettings,
  FiBarChart2,
  FiMenu,
  FiX,
  FiFileText,
  FiDollarSign,
} from "react-icons/fi";
import Logo from "../common/Logo";
import type { UserRole } from "../../types/dashboard";

interface SidebarProps {
  role: UserRole;
}

const DashboardSidebar = ({ role }: SidebarProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const superAdminLinks = [
    { name: "Dashboard", path: "/dashboard/super-admin", icon: FiHome },
    {
      name: "Users Management",
      path: "/dashboard/super-admin/users",
      icon: FiUsers,
    },
    { name: "Admins", path: "/dashboard/super-admin/admins", icon: FiUsers },
    { name: "Agents", path: "/dashboard/super-admin/agents", icon: FiUsers },
    {
      name: "Properties",
      path: "/dashboard/super-admin/properties",
      icon: FiMapPin,
    },
    {
      name: "Analytics",
      path: "/dashboard/super-admin/analytics",
      icon: FiBarChart2,
    },
    {
      name: "Settings",
      path: "/dashboard/super-admin/settings",
      icon: FiSettings,
    },
  ];

  const adminLinks = [
    { name: "Dashboard", path: "/dashboard/admin", icon: FiHome },
    { name: "Properties", path: "/dashboard/admin/properties", icon: FiMapPin },
    { name: "Agents", path: "/dashboard/admin/agents", icon: FiUsers },
    { name: "Users", path: "/dashboard/admin/users", icon: FiUsers },
    {
      name: "Analytics",
      path: "/dashboard/admin/analytics",
      icon: FiBarChart2,
    },
    { name: "Reports", path: "/dashboard/admin/reports", icon: FiFileText },
  ];

  const agentLinks = [
    { name: "Dashboard", path: "/dashboard/agent", icon: FiHome },
    {
      name: "My Properties",
      path: "/dashboard/agent/properties",
      icon: FiMapPin,
    },
    { name: "Leads", path: "/dashboard/agent/leads", icon: FiUsers },
    { name: "Earnings", path: "/dashboard/agent/earnings", icon: FiDollarSign },
    { name: "Schedule", path: "/dashboard/agent/schedule", icon: FiFileText },
  ];

  const getLinks = () => {
    switch (role) {
      case "super_admin":
        return superAdminLinks;
      case "admin":
        return adminLinks;
      case "agent":
        return agentLinks;
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-800">
            <Logo variant="white" size="md" />
            <div className="mt-2 text-sm text-gray-400 capitalize">
              {role.replace("_", " ")} Panel
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <ul className="space-y-2">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{link.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">AD</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">Admin User</div>
                <div className="text-xs text-gray-400 truncate">
                  admin@tmk.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
