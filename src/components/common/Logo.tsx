// import type React from "react";

// interface LogoProps {
//   variant?: "white" | "dark";
//   size?: "sm" | "md" | "lg";
//   className?: string;
// }

// const Logo: React.FC<LogoProps> = ({
//   variant = "dark",
//   size = "md",
//   className = "",
// }) => {
//   const sizeClasses = {
//     sm: "text-xl",
//     md: "text-2xl",
//     lg: "text-3xl",
//   };

//   const colorClasses = {
//     white: "text-white",
//     dark: "text-gray-900",
//   };

//   return (
//     <div
//       className={`font-bold ${sizeClasses[size]} ${colorClasses[variant]} ${className}`}
//     >
//       <span className="text-blue-600">Real</span>Estate
//     </div>
//   );
// };

// export default Logo;

import logo from "../../assets/logo.png";
import whitelogo from "../../assets/whitelogo.png";

interface LogoProps {
  variant?: "main" | "black" | "white";
  size?: "sm" | "md" | "lg";
}

const Logo = ({ variant = "main", size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-10",
    lg: "h-12",
  };

  const getLogoContent = () => {
    const baseClasses = `font-bold ${sizeClasses[size]} flex items-center`;

    switch (variant) {
      case "black":
        return (
          <div className={`${baseClasses} `}>
            <img className="  w-40 h-7" src={logo} alt="" />
          </div>
        );
      case "white":
        return (
          <div className={`${baseClasses} text-white`}>
            <img className="w-40 h-28" src={whitelogo} alt="" />
          </div>
        );
      default:
        // 'main' variant adjusts based on dark mode
        return (
          <div className={`${baseClasses} text-gray-900 dark:text-white`}>
            <img className="w-40 h-7" src={logo} alt="" />
          </div>
        );
    }
  };

  return getLogoContent();
};

export default Logo;
