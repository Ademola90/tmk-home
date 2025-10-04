// src/components/dashboard/StatCard.tsx
import { motion } from "framer-motion";
import type { IconType } from "react-icons";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: IconType; // ✅ Expects component, not JSX
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "blue" | "green" | "purple" | "orange" | "yellow"; // ✅ Added yellow
}

const StatCard = ({
  title,
  value,
  icon: Icon, // ✅ Destructured as component
  trend,
  color = "blue",
}: StatCardProps) => {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
    yellow: "bg-yellow-500", // ✅ Added yellow
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          {trend && (
            <div className="mt-2 flex items-center">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.isPositive ? "+" : "-"}
                {trend.value}%
              </span>
              <span className="text-xs text-gray-500 ml-2">vs last month</span>
            </div>
          )}
        </div>
        <div
          className={`${colorClasses[color]} w-14 h-14 rounded-xl flex items-center justify-center`}
        >
          <Icon className="w-7 h-7 text-white" /> {/* ✅ Used as component */}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
