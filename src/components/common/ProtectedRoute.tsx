import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useToastStore } from "../../store/useToastStore";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const { addToast } = useToastStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    addToast("Please login to access this page", "warning");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

// import type React from "react";
// import { useAuthGuard } from "../../hooks/useAuthGuard";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   redirectTo?: string;
//   showToast?: boolean;
//   toastMessage?: string;
//   fallback?: React.ReactNode;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
//   children,
//   redirectTo = "/login",
//   showToast = true,
//   toastMessage = "Please login to access this page",
//   fallback = null,
// }) => {
//   const { isAuthenticated, isLoading } = useAuthGuard({
//     redirectTo,
//     showToast,
//     toastMessage,
//   });

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <>{fallback}</>;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;
