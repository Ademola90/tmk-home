import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";

import Button from "../../components/common/Button";
import Logo from "../../components/common/Logo";
import { useAuthStore } from "../../store/useAuthStore";
import { useThemeStore } from "../../store/useThemeStore";
import { useToastStore } from "../../store/useToastStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const { login, isLoading } = useAuthStore();
  const { addToast } = useToastStore();
  const { isDarkMode } = useThemeStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      addToast("Please enter your email", "error");
      return;
    }

    const success = await login(email); // Remove password parameter
    if (success) {
      addToast("Login successful!", "success");
      navigate("/");
    } else {
      addToast("Invalid email", "error");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <Logo size="lg" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`mt-6 text-3xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Welcome Back
          </motion.h2>
          <p
            className={`mt-2 text-sm ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Sign in to your account to continue
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email Address
              </label>
              <div className="mt-1 relative">
                <FiMail
                  className={`absolute left-3 top-3 ${
                    isDarkMode ? "text-gray-400" : "text-gray-400"
                  }`}
                  size={20}
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`appearance-none relative block w-full pl-10 pr-3 py-2 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* REMOVED PASSWORD FIELD */}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className={`ml-2 block text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Remember me
              </label>
            </div>

            {/* Remove forgot password link or keep for future use */}
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Sign In
          </Button>

          <div className="text-center">
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;

// import type React from "react";

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

// import Button from "../../components/common/Button";
// import Logo from "../../components/common/Logo";
// import { useAuthStore } from "../../store/useAuthStore";
// import { useThemeStore } from "../../store/useThemeStore";
// import { useToastStore } from "../../store/useToastStore";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const { login, isLoading } = useAuthStore();
//   const { addToast } = useToastStore();
//   const { isDarkMode } = useThemeStore();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!email || !password) {
//       addToast("Please fill in all fields", "error");
//       return;
//     }

//     const success = await login(email, password);
//     if (success) {
//       addToast("Login successful!", "success");
//       navigate("/");
//     } else {
//       addToast("Invalid credentials", "error");
//     }
//   };

//   return (
//     <div
//       className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
//         isDarkMode ? "bg-gray-900" : "bg-gray-50"
//       }`}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-md w-full space-y-8"
//       >
//         <div className="text-center">
//           <Logo size="lg" />
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.6 }}
//             className={`mt-6 text-3xl font-bold ${
//               isDarkMode ? "text-white" : "text-gray-900"
//             }`}
//           >
//             Welcome Back
//           </motion.h2>
//           <p
//             className={`mt-2 text-sm ${
//               isDarkMode ? "text-gray-300" : "text-gray-600"
//             }`}
//           >
//             Sign in to your account to continue
//           </p>
//         </div>

//         <motion.form
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//           className="mt-8 space-y-6"
//           onSubmit={handleSubmit}
//         >
//           <div className="space-y-4">
//             <div>
//               <label
//                 htmlFor="email"
//                 className={`block text-sm font-medium ${
//                   isDarkMode ? "text-gray-300" : "text-gray-700"
//                 }`}
//               >
//                 Email Address
//               </label>
//               <div className="mt-1 relative">
//                 <FiMail
//                   className={`absolute left-3 top-3 ${
//                     isDarkMode ? "text-gray-400" : "text-gray-400"
//                   }`}
//                   size={20}
//                 />
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className={`appearance-none relative block w-full pl-10 pr-3 py-2 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
//                     isDarkMode
//                       ? "bg-gray-800 border-gray-600 text-white"
//                       : "bg-white border-gray-300 text-gray-900"
//                   }`}
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className={`block text-sm font-medium ${
//                   isDarkMode ? "text-gray-300" : "text-gray-700"
//                 }`}
//               >
//                 Password
//               </label>
//               <div className="mt-1 relative">
//                 <FiLock
//                   className={`absolute left-3 top-3 ${
//                     isDarkMode ? "text-gray-400" : "text-gray-400"
//                   }`}
//                   size={20}
//                 />
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className={`appearance-none relative block w-full pl-10 pr-10 py-2 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
//                     isDarkMode
//                       ? "bg-gray-800 border-gray-600 text-white"
//                       : "bg-white border-gray-300 text-gray-900"
//                   }`}
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className={`absolute right-3 top-3 ${
//                     isDarkMode ? "text-gray-400" : "text-gray-400"
//                   }`}
//                 >
//                   {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 id="remember-me"
//                 name="remember-me"
//                 type="checkbox"
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label
//                 htmlFor="remember-me"
//                 className={`ml-2 block text-sm ${
//                   isDarkMode ? "text-gray-300" : "text-gray-700"
//                 }`}
//               >
//                 Remember me
//               </label>
//             </div>

//             <div className="text-sm">
//               <a
//                 href="#"
//                 className="font-medium text-blue-600 hover:text-blue-500"
//               >
//                 Forgot your password?
//               </a>
//             </div>
//           </div>

//           <Button type="submit" className="w-full" isLoading={isLoading}>
//             Sign In
//           </Button>

//           <div className="text-center">
//             <p
//               className={`text-sm ${
//                 isDarkMode ? "text-gray-300" : "text-gray-600"
//               }`}
//             >
//               Don't have an account?{" "}
//               <Link
//                 to="/signup"
//                 className="font-medium text-blue-600 hover:text-blue-500"
//               >
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </motion.form>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
// import { useAuthStore } from "../../store/authStore";
// import { useToastStore } from "../../store/toastStore";
// import { useThemeStore } from "../../store/themeStore";
// import Button from "../../components/common/Button";
// import Logo from "../../components/common/Logo";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const { login, isLoading } = useAuthStore();
//   const { addToast } = useToastStore();
//   const { isDarkMode } = useThemeStore();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!email || !password) {
//       addToast("Please fill in all fields", "error");
//       return;
//     }

//     const success = await login(email, password);
//     if (success) {
//       addToast("Login successful!", "success");
//       navigate("/");
//     } else {
//       addToast("Invalid credentials", "error");
//     }
//   };

//   return (
//     <div
//       className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
//         isDarkMode ? "bg-gray-900" : "bg-gray-50"
//       }`}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-md w-full space-y-8"
//       >
//         <div className="text-center">
//           <Logo size="lg" />
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.6 }}
//             className={`mt-6 text-3xl font-bold ${
//               isDarkMode ? "text-white" : "text-gray-900"
//             }`}
//           >
//             Welcome Back
//           </motion.h2>
//           <p
//             className={`mt-2 text-sm ${
//               isDarkMode ? "text-gray-300" : "text-gray-600"
//             }`}
//           >
//             Sign in to your account to continue
//           </p>
//         </div>

//         <motion.form
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//           className="mt-8 space-y-6"
//           onSubmit={handleSubmit}
//         >
//           <div className="space-y-4">
//             <div>
//               <label
//                 htmlFor="email"
//                 className={`block text-sm font-medium ${
//                   isDarkMode ? "text-gray-300" : "text-gray-700"
//                 }`}
//               >
//                 Email Address
//               </label>
//               <div className="mt-1 relative">
//                 <FiMail
//                   className={`absolute left-3 top-3 ${
//                     isDarkMode ? "text-gray-400" : "text-gray-400"
//                   }`}
//                   size={20}
//                 />
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className={`appearance-none relative block w-full pl-10 pr-3 py-2 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
//                     isDarkMode
//                       ? "bg-gray-800 border-gray-600 text-white"
//                       : "bg-white border-gray-300 text-gray-900"
//                   }`}
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className={`block text-sm font-medium ${
//                   isDarkMode ? "text-gray-300" : "text-gray-700"
//                 }`}
//               >
//                 Password
//               </label>
//               <div className="mt-1 relative">
//                 <FiLock
//                   className={`absolute left-3 top-3 ${
//                     isDarkMode ? "text-gray-400" : "text-gray-400"
//                   }`}
//                   size={20}
//                 />
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className={`appearance-none relative block w-full pl-10 pr-10 py-2 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
//                     isDarkMode
//                       ? "bg-gray-800 border-gray-600 text-white"
//                       : "bg-white border-gray-300 text-gray-900"
//                   }`}
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className={`absolute right-3 top-3 ${
//                     isDarkMode ? "text-gray-400" : "text-gray-400"
//                   }`}
//                 >
//                   {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 id="remember-me"
//                 name="remember-me"
//                 type="checkbox"
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label
//                 htmlFor="remember-me"
//                 className={`ml-2 block text-sm ${
//                   isDarkMode ? "text-gray-300" : "text-gray-700"
//                 }`}
//               >
//                 Remember me
//               </label>
//             </div>

//             <div className="text-sm">
//               <a
//                 href="#"
//                 className="font-medium text-blue-600 hover:text-blue-500"
//               >
//                 Forgot your password?
//               </a>
//             </div>
//           </div>

//           <Button type="submit" className="w-full" isLoading={isLoading}>
//             Sign In
//           </Button>

//           <div className="text-center">
//             <p
//               className={`text-sm ${
//                 isDarkMode ? "text-gray-300" : "text-gray-600"
//               }`}
//             >
//               Don't have an account?{" "}
//               <Link
//                 to="/signup"
//                 className="font-medium text-blue-600 hover:text-blue-500"
//               >
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </motion.form>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;
