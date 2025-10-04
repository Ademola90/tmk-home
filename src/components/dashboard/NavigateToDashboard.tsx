// // components/dashboard/NavigateToDashboard.tsx
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../../store/useAuthStore";

// const NavigateToDashboard = () => {
//     const navigate = useNavigate();
//     const { user } = useAuthStore();

//     useEffect(() => {
//         const redirectToRoleDashboard = () => {
//             switch (user?.role) {
//                 case "super_admin":
//                     navigate("/dashboard/super-admin", { replace: true });
//                     break;
//                 case "admin":
//                     navigate("/dashboard/admin", { replace: true });
//                     break;
//                 case "agent":
//                     navigate("/dashboard/agent", { replace: true });
//                     break;
//                 default:
//                     navigate("/", { replace: true });
//                     break;
//             }
//         };

//         redirectToRoleDashboard();
//     }, [user, navigate]);

//     return (
//         <div className="flex items-center justify-center h-64">
//             <div className="text-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//                 <p className="mt-4 text-gray-600">Redirecting to your dashboard...</p>
//             </div>
//         </div>
//     );
// };

// export default NavigateToDashboard;
