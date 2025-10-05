import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";

// Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyOTP from "./pages/auth/VerifyOTP";

// Main Pages
import Home from "./pages/home";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import PropertyCategory from "./pages/PropertyCategory";
import Chat from "./pages/Chat";
import Wallet from "./pages/Wallet";
import AboutUs from "./pages/About-Us";
import Services from "./pages/Services";
import Profile from "./pages/Profile";
import MyProperties from "./pages/MyProperties";
import Favorites from "./pages/Favorites";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";

// Dashboard Layout
import DashboardLayout from "./screens/layouts/DashboardLayout";

// Super Admin Screens
import SuperAdminDashboard from "./screens/SuperAdmin/SuperAdminDashboard";
import UsersManagement from "./screens/SuperAdmin/UsersManagement";
import SuperAdminProperties from "./screens/SuperAdmin/PropertiesManagement";
import SuperAdminAnalytics from "./screens/SuperAdmin/Analytics";

// Admin Screens
import AdminDashboard from "./screens/Admin/AdminDashboard";
import AdminProperties from "./screens/Admin/PropertiesManagement";
import AdminAgents from "./screens/Admin/AgentsManagement";

// Agent Screens
import AgentDashboard from "./screens/Agent/AgentDashboard";
import AgentProperties from "./screens/Agent/PropertiesManagement";
import AgentLeads from "./screens/Agent/Leads";

// Components
import Toast from "./components/common/Toast";
import WhatsAppButton from "./components/common/WhatsAppButton";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Stores
import { useThemeStore } from "./store/useThemeStore";
import { useToastStore } from "./store/useToastStore";
// import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { isDarkMode } = useThemeStore();
  const { toasts } = useToastStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "dark bg-gray-900" : "bg-white"}`}
    >
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:category" element={<PropertyCategory />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-properties" element={<MyProperties />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/settings" element={<Settings />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />

          {/* Protected Routes */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wallet"
            element={
              <ProtectedRoute>
                <Wallet />
              </ProtectedRoute>
            }
          />

          {/* Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Add dashboard index route */}
            <Route index element={<Navigate to="/dashboard/agent" replace />} />

            {/* Super Admin Routes - accessible to all authenticated users */}
            <Route path="super-admin" element={<SuperAdminDashboard />} />
            <Route path="super-admin/users" element={<UsersManagement />} />
            <Route
              path="super-admin/properties"
              element={<SuperAdminProperties />}
            />
            <Route
              path="super-admin/analytics"
              element={<SuperAdminAnalytics />}
            />

            {/* Admin Routes - accessible to all authenticated users */}
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/properties" element={<AdminProperties />} />
            <Route path="admin/agents" element={<AdminAgents />} />

            {/* Agent Routes - accessible to all authenticated users */}
            <Route path="agent" element={<AgentDashboard />} />
            <Route path="agent/properties" element={<AgentProperties />} />
            <Route path="agent/leads" element={<AgentLeads />} />
          </Route>

          {/* Catch all route - 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Global Components */}
        <WhatsAppButton phoneNumber="+2348134392733" />

        {/* Toast Notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </div>
      </Router>
    </div>
  );
}

// 404 Not Found Component
const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useEffect } from "react";

// // Auth Pages
// import Login from "./pages/auth/Login";
// import Signup from "./pages/auth/Signup";
// import VerifyOTP from "./pages/auth/VerifyOTP";

// // Main Pages
// import Home from "./pages/home";
// import Properties from "./pages/Properties";
// import PropertyDetail from "./pages/PropertyDetail";
// import Chat from "./pages/Chat";
// import Wallet from "./pages/Wallet";

// // Components
// import Toast from "./components/common/Toast";
// import WhatsAppButton from "./components/common/WhatsAppButton";

// // Stores
// import { useThemeStore } from "./store/useThemeStore";
// import { useToastStore } from "./store/useToastStore";
// // import { useAuthStore } from "./store/useAuthStore";

// // Protected Route Component
// import ProtectedRoute from "./components/common/ProtectedRoute";
// import AboutUs from "./pages/About-Us";
// import Services from "./pages/Services";
// import Profile from "./pages/Profile";
// import MyProperties from "./pages/MyProperties";
// import Favorites from "./pages/Favorites";
// import Documents from "./pages/Documents";
// import Settings from "./pages/Settings";
// import PropertyCategory from "./pages/PropertyCategory";

// function App() {
//   const { isDarkMode } = useThemeStore();
//   const { toasts } = useToastStore();
//   // const { isAuthenticated } = useAuthStore();

//   // Apply theme to document
//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [isDarkMode]);

//   return (
//     <div
//       className={`min-h-screen ${isDarkMode ? "dark bg-gray-900" : "bg-white"}`}
//     >
//       <Router>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/about-us" element={<AboutUs />} />
//           <Route path="/properties" element={<Properties />} />
//           <Route path="/properties/:category" element={<PropertyCategory />} />
//           <Route path="/property/:id" element={<PropertyDetail />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/my-properties" element={<MyProperties />} />
//           <Route path="/favorites" element={<Favorites />} />
//           <Route path="/documents" element={<Documents />} />
//           <Route path="/settings" element={<Settings />} />

//           {/* Auth Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/verify-otp" element={<VerifyOTP />} />

//           {/* Protected Routes */}
//           <Route
//             path="/chat"
//             element={
//               <ProtectedRoute>
//                 <Chat />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/wallet"
//             element={
//               <ProtectedRoute>
//                 <Wallet />
//               </ProtectedRoute>
//             }
//           />

//           {/* Catch all route - 404 */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>

//         {/* Global Components */}
//         <WhatsAppButton phoneNumber="+2348134392733" />

//         {/* Toast Notifications */}
//         <div className="fixed top-4 right-4 z-50 space-y-2">
//           {toasts.map((toast) => (
//             <Toast key={toast.id} {...toast} />
//           ))}
//         </div>
//       </Router>
//     </div>
//   );
// }

// // 404 Not Found Component
// const NotFound = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="text-center">
//         <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
//         <h2 className="text-2xl font-semibold text-gray-700 mb-4">
//           Page Not Found
//         </h2>
//         <p className="text-gray-600 mb-8">
//           The page you're looking for doesn't exist.
//         </p>
//         <a
//           href="/"
//           className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Go Home
//         </a>
//       </div>
//     </div>
//   );
// };

// export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Login from "./pages/auth/Login";
// import Signup from "./pages/auth/Signup";
// import VerifyOTP from "./pages/auth/VerifyOTP";
// // import WhatsAppButton from "./components/common/WhatsAppButton";
// import Toast from "./components/common/Toast";
// import Home from "./pages/home";
// import { useThemeStore } from "./store/useThemeStore";
// import { useToastStore } from "./store/useToastStore";
// import Properties from "./pages/Properties";

// // Dashboard Screens

// function App() {
//   const { isDarkMode } = useThemeStore();
//   const { toasts } = useToastStore();

//   return (
//     <div
//       className={`min-h-screen ${isDarkMode ? "dark bg-gray-900" : "bg-white"}`}
//     >
//       <Router>
//         <Routes>
//           {/* Dashboard Routes */}
//           {/* <Route path="/dashboard" element={<DashboardLayout />}>
//             <Route index element={<DashboardHome />} />
//             <Route path="cars" element={<ManageCars />} />
//             <Route path="cars/add" element={<AddCar />} />
//             <Route path="cars/edit/:id" element={<EditCar />} />
//             <Route path="cars/preview/:id" element={<PreviewCar />} />
//             <Route path="accessories" element={<ManageAccessories />} />
//             <Route path="accessories/add" element={<AddAccessory />} />
//             <Route path="accessories/edit/:id" element={<EditAccessory />} />
//             <Route
//               path="accessories/preview/:id"
//               element={<PreviewAccessory />}
//             />
//             <Route path="users" element={<ManageUsers />} />
//             <Route path="orders" element={<ManageOrders />} />
//             <Route path="car-hire" element={<ManageCarHire />} />
//             <Route path="reviews" element={<ManageReviews />} />
//             <Route path="analytics" element={<Analytics />} />
//             <Route path="reports" element={<Reports />} />
//             <Route path="settings" element={<Settings />} /> */}

//           {/* </Route> */}

//           {/* Public Routes */}
//           <Route
//             path="/*"
//             element={
//               <>
//                 {/* <Navbar /> */}
//                 <main className="min-h-screen">
//                   <Routes>
//                     <Route path="/" element={<Home />} />
//                     {/* <Route path="/about" element={<About />} />
//                     <Route path="/services" element={<Services />} />
//                     <Route path="/cars" element={<Cars />} />
//                     <Route
//                       path="/services/services/cars/:id"
//                       element={<CarDetail />}
//                     />
//                     <Route
//                       path="/services/accessories"
//                       element={<Accessories />}
//                     />
//                     <Route
//                       path="/services/accessories/:id"
//                       element={<AccessoryDetail />}
//                     /> */}
//                     {/* <Route path="/car-hire" element={<CarHire />} />
//                     <Route path="/contact" element={<Contact />} /> */}
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/signup" element={<Signup />} />
//                     <Route path="/verify-otp" element={<VerifyOTP />} />
//                     <Route path="/properties" element={<Properties />} />
//                   </Routes>
//                 </main>
//                 {/* <Footer /> */}
//                 {/* <WhatsAppButton /> */}
//               </>
//             }
//           />
//         </Routes>

//         {/* Toast Notifications */}
//         <div className="fixed top-4 right-4 z-50 space-y-2">
//           {toasts.map((toast) => (
//             <Toast key={toast.id} {...toast} />
//           ))}
//         </div>
//       </Router>
//     </div>
//   );
// }

// export default App;
