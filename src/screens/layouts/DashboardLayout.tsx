import { Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

const DashboardLayout = () => {
  const { user } = useAuthStore();

  // Use a default role or handle missing role
  const userRole = user?.role || "agent";

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar role={userRole} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
