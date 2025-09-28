import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useToastStore } from "../store/useToastStore";

interface UseAuthGuardOptions {
  redirectTo?: string;
  showToast?: boolean;
  toastMessage?: string;
}

export const useAuthGuard = (options: UseAuthGuardOptions = {}) => {
  const {
    redirectTo = "/login",
    showToast = true,
    toastMessage = "Please login to access this page",
  } = options;

  const { isAuthenticated, isLoading } = useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      if (showToast) {
        addToast(toastMessage, "warning");
      }
      navigate(redirectTo);
    }
  }, [
    isAuthenticated,
    isLoading,
    navigate,
    redirectTo,
    showToast,
    toastMessage,
    addToast,
  ]);

  return { isAuthenticated, isLoading };
};

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../store/authStore";
// import { useToastStore } from "../store/toastStore";

// interface UseAuthGuardOptions {
//   redirectTo?: string;
//   showToast?: boolean;
//   toastMessage?: string;
// }

// export const useAuthGuard = (options: UseAuthGuardOptions = {}) => {
//   const {
//     redirectTo = "/login",
//     showToast = true,
//     toastMessage = "Please login to access this page",
//   } = options;

//   const { isAuthenticated, isLoading } = useAuthStore();
//   const { addToast } = useToastStore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isLoading && !isAuthenticated) {
//       if (showToast) {
//         addToast(toastMessage, "warning");
//       }
//       navigate(redirectTo);
//     }
//   }, [
//     isAuthenticated,
//     isLoading,
//     navigate,
//     redirectTo,
//     showToast,
//     toastMessage,
//     addToast,
//   ]);

//   return { isAuthenticated, isLoading };
// };
