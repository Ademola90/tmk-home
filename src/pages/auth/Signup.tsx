import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail } from "react-icons/fi"; // Remove FiLock, FiEye, FiEyeOff
import Button from "../../components/common/Button";
import Logo from "../../components/common/Logo";
import { useAuthStore } from "../../store/useAuthStore";
import { useToastStore } from "../../store/useToastStore";
import { useThemeStore } from "../../store/useThemeStore";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { signup, isLoading } = useAuthStore();
  const { addToast } = useToastStore();
  const { isDarkMode } = useThemeStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      addToast("Please fill in all fields", "error");
      return;
    }

    const success = await signup(name, email); // Remove password parameter
    if (success) {
      addToast("Account created! Please verify your email", "success");
      navigate("/verify-otp");
    } else {
      addToast("Failed to create account", "error");
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
            Create Account
          </motion.h2>
          <p
            className={`mt-2 text-sm ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Join TMK today
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
                htmlFor="name"
                className={`block text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Full Name
              </label>
              <div className="mt-1 relative">
                <FiUser
                  className={`absolute left-3 top-3 ${
                    isDarkMode ? "text-gray-400" : "text-gray-400"
                  }`}
                  size={20}
                />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`appearance-none relative block w-full pl-10 pr-3 py-2 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
            </div>

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
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="terms"
              className={`ml-2 block text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:text-blue-500">
                Terms and Conditions
              </a>
            </label>
          </div>

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Create Account
          </Button>

          <div className="text-center">
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Signup;

// import type React from "react";

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
// // import { useToastStore } from "../../store/toastStore";
// // import { useThemeStore } from "../../store/themeStore";
// import Button from "../../components/common/Button";
// import Logo from "../../components/common/Logo";
// import { useAuthStore } from "../../store/useAuthStore";
// import { useToastStore } from "../../store/useToastStore";
// import { useThemeStore } from "../../store/useThemeStore";

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const { signup, isLoading } = useAuthStore();
//   const { addToast } = useToastStore();
//   const { isDarkMode } = useThemeStore();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!name || !email || !password || !confirmPassword) {
//       addToast("Please fill in all fields", "error");
//       return;
//     }

//     if (password !== confirmPassword) {
//       addToast("Passwords do not match", "error");
//       return;
//     }

//     if (password.length < 6) {
//       addToast("Password must be at least 6 characters", "error");
//       return;
//     }

//     const success = await signup(name, email, password);
//     if (success) {
//       addToast("Account created! Please verify your email", "success");
//       navigate("/verify-otp");
//     } else {
//       addToast("Failed to create account", "error");
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
//             Create Account
//           </motion.h2>
//           <p
//             className={`mt-2 text-sm ${
//               isDarkMode ? "text-gray-300" : "text-gray-600"
//             }`}
//           >
//             Join TMK today
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
//                 htmlFor="name"
//                 className={`block text-sm font-medium ${
//                   isDarkMode ? "text-gray-300" : "text-gray-700"
//                 }`}
//               >
//                 Full Name
//               </label>
//               <div className="mt-1 relative">
//                 <FiUser
//                   className={`absolute left-3 top-3 ${
//                     isDarkMode ? "text-gray-400" : "text-gray-400"
//                   }`}
//                   size={20}
//                 />
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className={`appearance-none relative block w-full pl-10 pr-3 py-2 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
//                     isDarkMode
//                       ? "bg-gray-800 border-gray-600 text-white"
//                       : "bg-white border-gray-300 text-gray-900"
//                   }`}
//                   placeholder="Enter your full name"
//                 />
//               </div>
//             </div>

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

//             <div>
//               <label
//                 htmlFor="confirmPassword"
//                 className={`block text-sm font-medium ${
//                   isDarkMode ? "text-gray-300" : "text-gray-700"
//                 }`}
//               >
//                 Confirm Password
//               </label>
//               <div className="mt-1 relative">
//                 <FiLock
//                   className={`absolute left-3 top-3 ${
//                     isDarkMode ? "text-gray-400" : "text-gray-400"
//                   }`}
//                   size={20}
//                 />
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type={showConfirmPassword ? "text" : "password"}
//                   required
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className={`appearance-none relative block w-full pl-10 pr-10 py-2 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
//                     isDarkMode
//                       ? "bg-gray-800 border-gray-600 text-white"
//                       : "bg-white border-gray-300 text-gray-900"
//                   }`}
//                   placeholder="Confirm your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className={`absolute right-3 top-3 ${
//                     isDarkMode ? "text-gray-400" : "text-gray-400"
//                   }`}
//                 >
//                   {showConfirmPassword ? (
//                     <FiEyeOff size={20} />
//                   ) : (
//                     <FiEye size={20} />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center">
//             <input
//               id="terms"
//               name="terms"
//               type="checkbox"
//               required
//               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//             />
//             <label
//               htmlFor="terms"
//               className={`ml-2 block text-sm ${
//                 isDarkMode ? "text-gray-300" : "text-gray-700"
//               }`}
//             >
//               I agree to the{" "}
//               <a href="#" className="text-blue-600 hover:text-blue-500">
//                 Terms and Conditions
//               </a>
//             </label>
//           </div>

//           <Button type="submit" className="w-full" isLoading={isLoading}>
//             Create Account
//           </Button>

//           <div className="text-center">
//             <p
//               className={`text-sm ${
//                 isDarkMode ? "text-gray-300" : "text-gray-600"
//               }`}
//             >
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="font-medium text-blue-600 hover:text-blue-500"
//               >
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </motion.form>
//       </motion.div>
//     </div>
//   );
// };

// export default Signup;

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
// import { useAuthStore } from "../../store/authStore";
// import { useToastStore } from "../../store/toastStore";
// import { useThemeStore } from "../../store/themeStore";
// import Button from "../../components/common/Button";
// import Logo from "../../components/common/Logo";

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const { signup, isLoading } = useAuthStore();
//   const { addToast } = useToastStore();
//   const { isDarkMode } = useThemeStore();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!name || !email || !password || !confirmPassword) {
//       addToast("Please fill in all fields", "error");
//       return;
//     }

//     if (password !== confirmPassword) {
//       addToast("Passwords do not match", "error");
//       return;
//     }

//     if (password.length < 6) {
//       addToast("Password must be at least 6 characters", "error");
//       return;
//     }

//     const success = await signup(name, email, password);
//     if (success) {
//       addToast("Account created! Please verify your email", "success");
//       navigate("/verify-otp");
//     } else {
//       addToast("Failed to create account", "error");
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
//             Create Account
//           </motion.h2>
//           <p
//             className={`mt-2 text-sm ${
//               isDarkMode ? "text-gray-300" : "text-gray-600"
//             }`}
//           >
//             Join Tarmac Autos today
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
//                 htmlFor="name"
//                 className={`block text-sm font-medium ${
//                   isDarkMode ? "text-gray-300" : "text-gray-700"
//                 }`}
//               >
//                 Full Name
//               </label>
//               <div className="mt-1 relative">
//                 <FiUser
//                   className={`absolute left-3 top-3 ${
//                     isDarkMode ? "text-gray-400" : "text-gray-400"
//                   }`}
//                   size={20}
//                 />
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className={`appearance-none relative block w-full pl-10 pr-3 py-2 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
//                     isDarkMode
//                       ? "bg-gray-800 border-gray-600 text-white"
//                       : "bg-white border-gray-300 text-gray-900"
//                   }`}
//                   placeholder="Enter your full name"
//                 />
//               </div>
//             </div>

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

//             <div>
//               <label
//                 htmlFor="confirmPassword"
//                 className={`block text-sm font-medium ${
//                   isDarkMode ? "text-gray-300" : "text-gray-700"
//                 }`}
//               >
//                 Confirm Password
//               </label>
//               <div className="mt-1 relative">
//                 <FiLock
//                   className={`absolute left-3 top-3 ${
//                     isDarkMode ? "text-gray-400" : "text-gray-400"
//                   }`}
//                   size={20}
//                 />
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type={showConfirmPassword ? "text" : "password"}
//                   required
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className={`appearance-none relative block w-full pl-10 pr-10 py-2 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
//                     isDarkMode
//                       ? "bg-gray-800 border-gray-600 text-white"
//                       : "bg-white border-gray-300 text-gray-900"
//                   }`}
//                   placeholder="Confirm your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className={`absolute right-3 top-3 ${
//                     isDarkMode ? "text-gray-400" : "text-gray-400"
//                   }`}
//                 >
//                   {showConfirmPassword ? (
//                     <FiEyeOff size={20} />
//                   ) : (
//                     <FiEye size={20} />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center">
//             <input
//               id="terms"
//               name="terms"
//               type="checkbox"
//               required
//               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//             />
//             <label
//               htmlFor="terms"
//               className={`ml-2 block text-sm ${
//                 isDarkMode ? "text-gray-300" : "text-gray-700"
//               }`}
//             >
//               I agree to the{" "}
//               <a href="#" className="text-blue-600 hover:text-blue-500">
//                 Terms and Conditions
//               </a>
//             </label>
//           </div>

//           <Button type="submit" className="w-full" isLoading={isLoading}>
//             Create Account
//           </Button>

//           <div className="text-center">
//             <p
//               className={`text-sm ${
//                 isDarkMode ? "text-gray-300" : "text-gray-600"
//               }`}
//             >
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="font-medium text-blue-600 hover:text-blue-500"
//               >
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </motion.form>
//       </motion.div>
//     </div>
//   );
// };

// export default Signup;
