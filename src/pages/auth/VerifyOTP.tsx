import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/common/Button";
import Logo from "../../components/common/Logo";
import { useAuthStore } from "../../store/useAuthStore";
import { useToastStore } from "../../store/useToastStore";
import { useThemeStore } from "../../store/useThemeStore";

const VerifyOTP = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const { verifyOTP, isLoading } = useAuthStore();
  const { addToast } = useToastStore();
  const { isDarkMode } = useThemeStore();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      addToast("Please enter complete OTP", "error");
      return;
    }

    const success = await verifyOTP(otpString);
    if (success) {
      addToast("Account verified successfully!", "success");
      navigate("/");
    } else {
      addToast("Invalid OTP. Please try again.", "error");
    }
  };

  const handleResendOTP = () => {
    setTimer(60);
    addToast("OTP resent to your email", "info");
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
          <Logo size="sm" variant="white" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`mt-6 text-3xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Verify Your Email
          </motion.h2>
          <p
            className={`mt-2 text-sm ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            We've sent a 6-digit code to your email address
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              className={`block text-sm font-medium mb-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Enter OTP Code
            </label>
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-12 text-center text-xl font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-center">
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Didn't receive the code?{" "}
              {timer > 0 ? (
                <span>Resend in {timer}s</span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Resend OTP
                </button>
              )}
            </p>
          </div>

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Verify Account
          </Button>

          <div className="text-center">
            <p
              className={`text-xs ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              For testing purposes, use OTP: 123456
            </p>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useAuthStore } from "../../store/authStore";
// import { useToastStore } from "../../store/toastStore";
// import { useThemeStore } from "../../store/themeStore";
// import Button from "../../components/common/Button";
// import Logo from "../../components/common/Logo";

// const VerifyOTP = () => {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [timer, setTimer] = useState(60);
//   const { verifyOTP, isLoading } = useAuthStore();
//   const { addToast } = useToastStore();
//   const { isDarkMode } = useThemeStore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const handleOtpChange = (index: number, value: string) => {
//     if (value.length > 1) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Auto-focus next input
//     if (value && index < 5) {
//       const nextInput = document.getElementById(`otp-${index + 1}`);
//       nextInput?.focus();
//     }
//   };

//   const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       const prevInput = document.getElementById(`otp-${index - 1}`);
//       prevInput?.focus();
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const otpString = otp.join("");
//     if (otpString.length !== 6) {
//       addToast("Please enter complete OTP", "error");
//       return;
//     }

//     const success = await verifyOTP(otpString);
//     if (success) {
//       addToast("Account verified successfully!", "success");
//       navigate("/");
//     } else {
//       addToast("Invalid OTP. Please try again.", "error");
//     }
//   };

//   const handleResendOTP = () => {
//     setTimer(60);
//     addToast("OTP resent to your email", "info");
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
//             Verify Your Email
//           </motion.h2>
//           <p
//             className={`mt-2 text-sm ${
//               isDarkMode ? "text-gray-300" : "text-gray-600"
//             }`}
//           >
//             We've sent a 6-digit code to your email address
//           </p>
//         </div>

//         <motion.form
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//           className="mt-8 space-y-6"
//           onSubmit={handleSubmit}
//         >
//           <div>
//             <label
//               className={`block text-sm font-medium mb-4 ${
//                 isDarkMode ? "text-gray-300" : "text-gray-700"
//               }`}
//             >
//               Enter OTP Code
//             </label>
//             <div className="flex justify-center space-x-3">
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   id={`otp-${index}`}
//                   type="text"
//                   maxLength={1}
//                   value={digit}
//                   onChange={(e) => handleOtpChange(index, e.target.value)}
//                   onKeyDown={(e) => handleKeyDown(index, e)}
//                   className={`w-12 h-12 text-center text-xl font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                     isDarkMode
//                       ? "bg-gray-800 border-gray-600 text-white"
//                       : "bg-white border-gray-300 text-gray-900"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

//           <div className="text-center">
//             <p
//               className={`text-sm ${
//                 isDarkMode ? "text-gray-300" : "text-gray-600"
//               }`}
//             >
//               Didn't receive the code?{" "}
//               {timer > 0 ? (
//                 <span>Resend in {timer}s</span>
//               ) : (
//                 <button
//                   type="button"
//                   onClick={handleResendOTP}
//                   className="font-medium text-blue-600 hover:text-blue-500"
//                 >
//                   Resend OTP
//                 </button>
//               )}
//             </p>
//           </div>

//           <Button type="submit" className="w-full" isLoading={isLoading}>
//             Verify Account
//           </Button>

//           <div className="text-center">
//             <p
//               className={`text-xs ${
//                 isDarkMode ? "text-gray-400" : "text-gray-500"
//               }`}
//             >
//               For testing purposes, use OTP: 123456
//             </p>
//           </div>
//         </motion.form>
//       </motion.div>
//     </div>
//   );
// };

// export default VerifyOTP;
