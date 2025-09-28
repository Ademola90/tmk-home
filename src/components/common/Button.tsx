import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
    ghost:
      "text-gray-700 hover:bg-gray-100 focus:ring-blue-500 dark:text-gray-300 dark:hover:bg-gray-800",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${
        sizeClasses[size]
      } ${className} ${
        disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
      ) : null}
      {children}
    </button>
  );
};

export default Button;

// import type { ButtonHTMLAttributes, ReactNode } from "react";

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   children: ReactNode;
//   variant?: "primary" | "secondary" | "outline" | "ghost";
//   size?: "sm" | "md" | "lg";
//   isLoading?: boolean;
// }

// const Button = ({
//   children,
//   variant = "primary",
//   size = "md",
//   isLoading = false,
//   className = "",
//   disabled,
//   ...props
// }: ButtonProps) => {
//   const baseClasses =
//     "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

//   const variantClasses = {
//     primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
//     secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
//     outline:
//       "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
//     ghost:
//       "text-gray-700 hover:bg-gray-100 focus:ring-blue-500 dark:text-gray-300 dark:hover:bg-gray-800",
//   };

//   const sizeClasses = {
//     sm: "px-4 py-2 text-sm",
//     md: "px-6 py-3 text-sm",
//     lg: "px-8 py-4 text-base",
//   };

//   return (
//     <button
//       className={`${baseClasses} ${variantClasses[variant]} ${
//         sizeClasses[size]
//       } ${className} ${
//         disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""
//       }`}
//       disabled={disabled || isLoading}
//       {...props}
//     >
//       {isLoading ? (
//         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
//       ) : null}
//       {children}
//     </button>
//   );
// };

// export default Button;
