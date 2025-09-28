import type React from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import { useAuthStore } from "../../store/useAuthStore";
import { useToastStore } from "../../store/useToastStore";

interface AuthButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  requiresAuth?: boolean;
  redirectTo?: string;
  toastMessage?: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  children,
  onClick,
  requiresAuth = false,
  redirectTo = "/login",
  toastMessage = "Please login to continue",
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  ...props
}) => {
  const { isAuthenticated } = useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  const handleClick = () => {
    if (requiresAuth && !isAuthenticated) {
      addToast(toastMessage, "warning");
      navigate(redirectTo);
      return;
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={className}
      variant={variant}
      size={size}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AuthButton;

// import type React from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../../store/authStore";
// import { useToastStore } from "../../store/toastStore";
// import Button from "./Button";

// interface AuthButtonProps {
//   children: React.ReactNode;
//   onClick?: () => void;
//   requiresAuth?: boolean;
//   redirectTo?: string;
//   toastMessage?: string;
//   className?: string;
//   variant?: "primary" | "secondary" | "outline" | "ghost";
//   size?: "sm" | "md" | "lg";
//   disabled?: boolean;
// }

// const AuthButton: React.FC<AuthButtonProps> = ({
//   children,
//   onClick,
//   requiresAuth = false,
//   redirectTo = "/login",
//   toastMessage = "Please login to continue",
//   className = "",
//   variant = "primary",
//   size = "md",
//   disabled = false,
//   ...props
// }) => {
//   const { isAuthenticated } = useAuthStore();
//   const { addToast } = useToastStore();
//   const navigate = useNavigate();

//   const handleClick = () => {
//     if (requiresAuth && !isAuthenticated) {
//       addToast(toastMessage, "warning");
//       navigate(redirectTo);
//       return;
//     }

//     if (onClick) {
//       onClick();
//     }
//   };

//   return (
//     <Button
//       onClick={handleClick}
//       className={className}
//       variant={variant}
//       size={size}
//       disabled={disabled}
//       {...props}
//     >
//       {children}
//     </Button>
//   );
// };

// export default AuthButton;
