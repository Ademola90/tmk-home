import { useState, useRef, useEffect } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import {
  FiUser,
  FiSettings,
  FiHeart,
  FiFileText,
  FiLogOut,
  FiLogIn,
  FiUserPlus,
  FiHome,
  FiMapPin,
  FiTool,
} from "react-icons/fi";
import { FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../common/Logo";
import ChatWidget from "../chat/ChatWidget";
import { useAuthStore } from "../../store/useAuthStore";
import { useToastStore } from "../../store/useToastStore";
import NotificationDropdown from "../notifications/NotificationDropdown";
import { PROPERTY_CATEGORIES } from "../../types/property";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isPropertiesDropdownOpen, setIsPropertiesDropdownOpen] =
    useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const propertiesDropdownRef = useRef<HTMLLIElement>(null); // Change from HTMLDivElement to HTMLLIElement

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
      if (
        propertiesDropdownRef.current &&
        !propertiesDropdownRef.current.contains(event.target as Node)
      ) {
        setIsPropertiesDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
    addToast("Logged out successfully", "success");
    navigate("/");
  };

  const handleNavigation = (path: string, requiresAuth = false) => {
    if (requiresAuth && !isAuthenticated) {
      addToast("Please login to access this feature", "warning");
      navigate("/login");
      return;
    }
    navigate(path);
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/", icon: FiHome, requiresAuth: false },
    { name: "About Us", path: "/about-us", icon: FiUser, requiresAuth: false },
    { name: "Services", path: "/services", icon: FiTool, requiresAuth: false },
  ];

  const authenticatedMenuItems = [
    { name: "Profile", path: "/profile", icon: FiUser },
    { name: "My Properties", path: "/my-properties", icon: FiMapPin },
    { name: "Favorites", path: "/favorites", icon: FiHeart },
    { name: "Wallet", path: "/wallet", icon: FaWallet },
    { name: "Documents", path: "/documents", icon: FiFileText },
    { name: "Settings", path: "/settings", icon: FiSettings },
  ];

  const unauthenticatedMenuItems = [
    { name: "Login", path: "/login", icon: FiLogIn },
    { name: "Sign Up", path: "/signup", icon: FiUserPlus },
  ];

  return (
    <>
      <nav className="bg-[#000] shadow-lg relative z-50">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo variant="white" size="md" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <ul className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() =>
                        handleNavigation(item.path, item.requiresAuth)
                      }
                      className="text-white cursor-pointer hover:text-gray-200 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}

                {/* Properties Dropdown - Desktop */}
                <li className="relative" ref={propertiesDropdownRef}>
                  <button
                    onClick={() =>
                      setIsPropertiesDropdownOpen(!isPropertiesDropdownOpen)
                    }
                    className="text-white cursor-pointer hover:text-gray-200 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                  >
                    Properties
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        isPropertiesDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isPropertiesDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
                      <button
                        onClick={() => {
                          handleNavigation("/properties");
                          setIsPropertiesDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
                      >
                        <div className="font-semibold text-gray-900">
                          All Properties
                        </div>
                        <div className="text-xs text-gray-500">
                          Browse all available properties
                        </div>
                      </button>

                      {Object.entries(PROPERTY_CATEGORIES).map(
                        ([key, category]) => (
                          <button
                            key={key}
                            onClick={() => {
                              handleNavigation(`/properties/${category.slug}`);
                              setIsPropertiesDropdownOpen(false);
                            }}
                            className="block w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors"
                          >
                            <div className="font-medium text-gray-900">
                              {category.title}
                            </div>
                            <div className="text-xs text-gray-500">
                              {category.description}
                            </div>
                          </button>
                        )
                      )}
                    </div>
                  )}
                </li>
              </ul>
            </div>

            {/* Desktop User Menu */}
            <div className="hidden md:block">
              <div className="flex items-center gap-4">
                {isAuthenticated && <NotificationDropdown />}

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 rounded-full p-2 transition-colors duration-200"
                  >
                    <FaUser className="w-6 h-6" />
                    {isAuthenticated && user && (
                      <span className="ml-2 text-sm font-medium hidden lg:block">
                        {user.name}
                      </span>
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="py-1">
                        {isAuthenticated ? (
                          <>
                            {/* User Info */}
                            <div className="px-4 py-3 border-b border-gray-100">
                              <p className="text-sm font-medium text-gray-900">
                                {user?.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {user?.email}
                              </p>
                            </div>

                            {/* Authenticated Menu Items */}
                            {authenticatedMenuItems.map((item) => (
                              <button
                                key={item.name}
                                onClick={() => {
                                  handleNavigation(item.path);
                                  setIsUserDropdownOpen(false);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                              >
                                <item.icon className="w-4 h-4 mr-3" />
                                {item.name}
                              </button>
                            ))}

                            <div className="border-t border-gray-100">
                              <button
                                onClick={handleLogout}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 hover:text-red-900 transition-colors duration-200"
                              >
                                <FiLogOut className="w-4 h-4 mr-3" />
                                Logout
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Unauthenticated Menu Items */}
                            {unauthenticatedMenuItems.map((item) => (
                              <button
                                key={item.name}
                                onClick={() => {
                                  handleNavigation(item.path);
                                  setIsUserDropdownOpen(false);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                              >
                                <item.icon className="w-4 h-4 mr-3" />
                                {item.name}
                              </button>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 p-2 rounded-md"
              >
                {isMenuOpen ? (
                  <FaTimes className="w-6 h-6" />
                ) : (
                  <FaBars className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-[#1A1A1A] border-t border-gray-700">
                {/* Navigation Items */}
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() =>
                      handleNavigation(item.path, item.requiresAuth)
                    }
                    className="flex items-center w-full text-left text-white hover:text-gray-200 hover:bg-gray-700 px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </button>
                ))}

                {/* Properties Dropdown - Mobile */}
                <div className="border-t border-gray-700 pt-3 mt-3">
                  <button
                    onClick={() =>
                      setIsPropertiesDropdownOpen(!isPropertiesDropdownOpen)
                    }
                    className="flex items-center justify-between w-full text-left text-white hover:text-gray-200 hover:bg-gray-700 px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
                  >
                    <span className="flex items-center">
                      <FiMapPin className="w-5 h-5 mr-3" />
                      Properties
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        isPropertiesDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isPropertiesDropdownOpen && (
                    <div className="pl-8 mt-2 space-y-1">
                      <button
                        onClick={() => {
                          handleNavigation("/properties");
                          setIsMenuOpen(false);
                          setIsPropertiesDropdownOpen(false);
                        }}
                        className="block w-full text-left text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 text-sm rounded-md transition-colors duration-200"
                      >
                        All Properties
                      </button>
                      {Object.entries(PROPERTY_CATEGORIES).map(
                        ([key, category]) => (
                          <button
                            key={key}
                            onClick={() => {
                              handleNavigation(`/properties/${category.slug}`);
                              setIsMenuOpen(false);
                              setIsPropertiesDropdownOpen(false);
                            }}
                            className="block w-full text-left text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 text-sm rounded-md transition-colors duration-200"
                          >
                            {category.title}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* User Section */}
                <div className="border-t border-gray-700 pt-3 mt-3">
                  {isAuthenticated ? (
                    <>
                      <div className="px-3 py-2 text-white">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-gray-300">{user?.email}</p>
                      </div>

                      {authenticatedMenuItems.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => {
                            handleNavigation(item.path);
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center w-full text-left text-white hover:text-gray-200 hover:bg-gray-700 px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
                        >
                          <item.icon className="w-5 h-5 mr-3" />
                          {item.name}
                        </button>
                      ))}

                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left text-red-400 hover:text-red-300 hover:bg-gray-700 px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
                      >
                        <FiLogOut className="w-5 h-5 mr-3" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      {unauthenticatedMenuItems.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => {
                            handleNavigation(item.path);
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center w-full text-left text-white hover:text-gray-200 hover:bg-gray-700 px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
                        >
                          <item.icon className="w-5 h-5 mr-3" />
                          {item.name}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <ChatWidget />
    </>
  );
};

export default Navbar;

// import { useState, useRef, useEffect } from "react";
// import { FaUser, FaBars, FaTimes } from "react-icons/fa";
// import {
//   FiUser,
//   FiSettings,
//   FiHeart,
//   FiFileText,
//   FiLogOut,
//   FiLogIn,
//   FiUserPlus,
//   FiHome,
//   FiMapPin,
//   FiTool,
// } from "react-icons/fi";
// import { FaWallet } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import Logo from "../common/Logo";
// import ChatWidget from "../chat/ChatWidget";
// import { useAuthStore } from "../../store/useAuthStore";
// import { useToastStore } from "../../store/useToastStore";
// import NotificationDropdown from "../notifications/NotificationDropdown";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
//   const { user, isAuthenticated, logout } = useAuthStore();
//   const { addToast } = useToastStore();
//   const navigate = useNavigate();
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsUserDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Close mobile menu when screen size changes
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setIsMenuOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     setIsUserDropdownOpen(false);
//     addToast("Logged out successfully", "success");
//     navigate("/");
//   };

//   const handleNavigation = (path: string, requiresAuth = false) => {
//     if (requiresAuth && !isAuthenticated) {
//       addToast("Please login to access this feature", "warning");
//       navigate("/login");
//       return;
//     }
//     navigate(path);
//     setIsMenuOpen(false);
//   };

//   const navItems = [
//     { name: "Home", path: "/", icon: FiHome, requiresAuth: false },
//     { name: "About Us", path: "/about-us", icon: FiUser, requiresAuth: false },
//     {
//       name: "Properties",
//       path: "/properties",
//       icon: FiMapPin,
//       requiresAuth: false,
//     },
//     { name: "Services", path: "/services", icon: FiTool, requiresAuth: false },
//   ];

//   const authenticatedMenuItems = [
//     { name: "Profile", path: "/profile", icon: FiUser },
//     { name: "My Properties", path: "/my-properties", icon: FiMapPin },
//     { name: "Favorites", path: "/favorites", icon: FiHeart },
//     { name: "Wallet", path: "/wallet", icon: FaWallet },
//     { name: "Documents", path: "/documents", icon: FiFileText },
//     { name: "Settings", path: "/settings", icon: FiSettings },
//   ];

//   const unauthenticatedMenuItems = [
//     { name: "Login", path: "/login", icon: FiLogIn },
//     { name: "Sign Up", path: "/signup", icon: FiUserPlus },
//   ];

//   return (
//     <>
//       <nav className="bg-[#000] shadow-lg relative z-50">
//         <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
//           <div className="flex justify-between items-center py-4">
//             {/* Logo */}
//             <div className="flex-shrink-0">
//               <Logo variant="white" size="md" />
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:block">
//               <ul className="flex items-center space-x-8">
//                 {navItems.map((item) => (
//                   <li key={item.name}>
//                     <button
//                       onClick={() =>
//                         handleNavigation(item.path, item.requiresAuth)
//                       }
//                       className="text-white cursor-pointer hover:text-gray-200 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-2"
//                     >
//                       {/* <item.icon className="w-4 h-4" /> */}
//                       {item.name}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Desktop User Menu */}
//             <div className="hidden md:block">
//               <div className="flex items-center gap-4">
//                 {isAuthenticated && <NotificationDropdown />}

//                 <div className="relative" ref={dropdownRef}>
//                   <button
//                     onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
//                     className="flex items-center text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 rounded-full p-2 transition-colors duration-200"
//                   >
//                     <FaUser className="w-6 h-6" />
//                     {isAuthenticated && user && (
//                       <span className="ml-2 text-sm font-medium hidden lg:block">
//                         {user.name}
//                       </span>
//                     )}
//                   </button>

//                   {/* Dropdown Menu */}
//                   {isUserDropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
//                       <div className="py-1">
//                         {isAuthenticated ? (
//                           <>
//                             {/* User Info */}
//                             <div className="px-4 py-3 border-b border-gray-100">
//                               <p className="text-sm font-medium text-gray-900">
//                                 {user?.name}
//                               </p>
//                               <p className="text-sm text-gray-500">
//                                 {user?.email}
//                               </p>
//                             </div>

//                             {/* Authenticated Menu Items */}
//                             {authenticatedMenuItems.map((item) => (
//                               <button
//                                 key={item.name}
//                                 onClick={() => {
//                                   handleNavigation(item.path);
//                                   setIsUserDropdownOpen(false);
//                                 }}
//                                 className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
//                               >
//                                 <item.icon className="w-4 h-4 mr-3" />
//                                 {item.name}
//                               </button>
//                             ))}

//                             <div className="border-t border-gray-100">
//                               <button
//                                 onClick={handleLogout}
//                                 className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 hover:text-red-900 transition-colors duration-200"
//                               >
//                                 <FiLogOut className="w-4 h-4 mr-3" />
//                                 Logout
//                               </button>
//                             </div>
//                           </>
//                         ) : (
//                           <>
//                             {/* Unauthenticated Menu Items */}
//                             {unauthenticatedMenuItems.map((item) => (
//                               <button
//                                 key={item.name}
//                                 onClick={() => {
//                                   handleNavigation(item.path);
//                                   setIsUserDropdownOpen(false);
//                                 }}
//                                 className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
//                               >
//                                 <item.icon className="w-4 h-4 mr-3" />
//                                 {item.name}
//                               </button>
//                             ))}
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Mobile menu button */}
//             <div className="md:hidden">
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 p-2 rounded-md"
//               >
//                 {isMenuOpen ? (
//                   <FaTimes className="w-6 h-6" />
//                 ) : (
//                   <FaBars className="w-6 h-6" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Navigation Menu */}
//           {isMenuOpen && (
//             <div className="md:hidden">
//               <div className="px-2 pt-2 pb-3 space-y-1 bg-[#1A1A1A] border-t border-gray-700">
//                 {/* Navigation Items */}
//                 {navItems.map((item) => (
//                   <button
//                     key={item.name}
//                     onClick={() =>
//                       handleNavigation(item.path, item.requiresAuth)
//                     }
//                     className="flex items-center w-full text-left text-white hover:text-gray-200 hover:bg-gray-700 px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
//                   >
//                     <item.icon className="w-5 h-5 mr-3" />
//                     {item.name}
//                   </button>
//                 ))}

//                 {/* User Section */}
//                 <div className="border-t border-gray-700 pt-3 mt-3">
//                   {isAuthenticated ? (
//                     <>
//                       <div className="px-3 py-2 text-white">
//                         <p className="text-sm font-medium">{user?.name}</p>
//                         <p className="text-xs text-gray-300">{user?.email}</p>
//                       </div>

//                       {authenticatedMenuItems.map((item) => (
//                         <button
//                           key={item.name}
//                           onClick={() => {
//                             handleNavigation(item.path);
//                             setIsMenuOpen(false);
//                           }}
//                           className="flex items-center w-full text-left text-white hover:text-gray-200 hover:bg-gray-700 px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
//                         >
//                           <item.icon className="w-5 h-5 mr-3" />
//                           {item.name}
//                         </button>
//                       ))}

//                       <button
//                         onClick={handleLogout}
//                         className="flex items-center w-full text-left text-red-400 hover:text-red-300 hover:bg-gray-700 px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
//                       >
//                         <FiLogOut className="w-5 h-5 mr-3" />
//                         Logout
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       {unauthenticatedMenuItems.map((item) => (
//                         <button
//                           key={item.name}
//                           onClick={() => {
//                             handleNavigation(item.path);
//                             setIsMenuOpen(false);
//                           }}
//                           className="flex items-center w-full text-left text-white hover:text-gray-200 hover:bg-gray-700 px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
//                         >
//                           <item.icon className="w-5 h-5 mr-3" />
//                           {item.name}
//                         </button>
//                       ))}
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>

//       <ChatWidget />
//     </>
//   );
// };

// export default Navbar;

// import { useState, useRef, useEffect } from "react";
// import { FaUser, FaBars, FaTimes } from "react-icons/fa";
// import {
//   FiUser,
//   FiSettings,
//   FiHeart,
//   FiFileText,
//   FiLogOut,
//   FiLogIn,
//   FiUserPlus,
//   FiHome,
//   FiMapPin,
//   FiTool,
// } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../../store/authStore";
// import { useToastStore } from "../../store/toastStore";
// import Logo from "../common/Logo";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
//   const { user, isAuthenticated, logout } = useAuthStore();
//   const { addToast } = useToastStore();
//   const navigate = useNavigate();
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsUserDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Close mobile menu when screen size changes
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setIsMenuOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     setIsUserDropdownOpen(false);
//     addToast("Logged out successfully", "success");
//     navigate("/");
//   };

//   const handleNavigation = (path: string, requiresAuth = false) => {
//     if (requiresAuth && !isAuthenticated) {
//       addToast("Please login to access this feature", "warning");
//       navigate("/login");
//       return;
//     }
//     navigate(path);
//     setIsMenuOpen(false);
//   };

//   const navItems = [
//     { name: "Home", path: "/", icon: FiHome, requiresAuth: false },
//     { name: "About Us", path: "/about", icon: FiUser, requiresAuth: false },
//     {
//       name: "Properties",
//       path: "/properties",
//       icon: FiMapPin,
//       requiresAuth: false,
//     },
//     { name: "Services", path: "/services", icon: FiTool, requiresAuth: false },
//   ];

//   const authenticatedMenuItems = [
//     { name: "Profile", path: "/profile", icon: FiUser },
//     { name: "My Properties", path: "/my-properties", icon: FiMapPin },
//     { name: "Favorites", path: "/favorites", icon: FiHeart },
//     { name: "Documents", path: "/documents", icon: FiFileText },
//     { name: "Settings", path: "/settings", icon: FiSettings },
//   ];

//   const unauthenticatedMenuItems = [
//     { name: "Login", path: "/login", icon: FiLogIn },
//     { name: "Sign Up", path: "/signup", icon: FiUserPlus },
//   ];

//   return (
//     <nav className="bg-[#1A1A1A] shadow-lg relative z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Logo variant="white" size="sm" />
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:block">
//             <ul className="flex items-center space-x-8">
//               {navItems.map((item) => (
//                 <li key={item.name}>
//                   <button
//                     onClick={() =>
//                       handleNavigation(item.path, item.requiresAuth)
//                     }
//                     className="text-white hover:text-gray-200 cursor-pointer px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-2"
//                   >
//                     {/* <item.icon className="w-4 h-4" /> */}
//                     {item.name}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Desktop User Menu */}
//           <div className="hidden md:block">
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
//                 className="flex items-center text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 rounded-full p-2 transition-colors duration-200"
//               >
//                 <FaUser className="w-6 h-6" />
//                 {isAuthenticated && user && (
//                   <span className="ml-2 text-sm font-medium hidden lg:block">
//                     {user.name}
//                   </span>
//                 )}
//               </button>

//               {/* Dropdown Menu */}
//               {isUserDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
//                   <div className="py-1">
//                     {isAuthenticated ? (
//                       <>
//                         {/* User Info */}
//                         <div className="px-4 py-3 border-b border-gray-100">
//                           <p className="text-sm font-medium text-gray-900">
//                             {user?.name}
//                           </p>
//                           <p className="text-sm text-gray-500">{user?.email}</p>
//                         </div>

//                         {/* Authenticated Menu Items */}
//                         {authenticatedMenuItems.map((item) => (
//                           <button
//                             key={item.name}
//                             onClick={() => {
//                               handleNavigation(item.path);
//                               setIsUserDropdownOpen(false);
//                             }}
//                             className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
//                           >
//                             <item.icon className="w-4 h-4 mr-3" />
//                             {item.name}
//                           </button>
//                         ))}

//                         <div className="border-t border-gray-100">
//                           <button
//                             onClick={handleLogout}
//                             className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 hover:text-red-900 transition-colors duration-200"
//                           >
//                             <FiLogOut className="w-4 h-4 mr-3" />
//                             Logout
//                           </button>
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         {/* Unauthenticated Menu Items */}
//                         {unauthenticatedMenuItems.map((item) => (
//                           <button
//                             key={item.name}
//                             onClick={() => {
//                               handleNavigation(item.path);
//                               setIsUserDropdownOpen(false);
//                             }}
//                             className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
//                           >
//                             <item.icon className="w-4 h-4 mr-3" />
//                             {item.name}
//                           </button>
//                         ))}
//                       </>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 p-2 rounded-md"
//             >
//               {isMenuOpen ? (
//                 <FaTimes className="w-6 h-6" />
//               ) : (
//                 <FaBars className="w-6 h-6" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1 bg-[#1A1A1A] border-t border-gray-700">
//               {/* Navigation Items */}
//               {navItems.map((item) => (
//                 <button
//                   key={item.name}
//                   onClick={() => handleNavigation(item.path, item.requiresAuth)}
//                   className="flex items-center w-full text-left text-white hover:text-gray-200 hover:bg-gray-700 px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
//                 >
//                   <item.icon className="w-5 h-5 mr-3" />
//                   {item.name}
//                 </button>
//               ))}

//               {/* User Section */}
//               <div className="border-t border-gray-700 pt-3 mt-3">
//                 {isAuthenticated ? (
//                   <>
//                     <div className="px-3 py-2 text-white">
//                       <p className="text-sm font-medium">{user?.name}</p>
//                       <p className="text-xs text-gray-300">{user?.email}</p>
//                     </div>

//                     {authenticatedMenuItems.map((item) => (
//                       <button
//                         key={item.name}
//                         onClick={() => {
//                           handleNavigation(item.path);
//                           setIsMenuOpen(false);
//                         }}
//                         className="flex items-center w-full text-left text-white hover:text-gray-200 hover:bg-gray-700 px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
//                       >
//                         <item.icon className="w-5 h-5 mr-3" />
//                         {item.name}
//                       </button>
//                     ))}

//                     <button
//                       onClick={handleLogout}
//                       className="flex items-center w-full text-left text-red-400 hover:text-red-300 hover:bg-gray-700 px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
//                     >
//                       <FiLogOut className="w-5 h-5 mr-3" />
//                       Logout
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     {unauthenticatedMenuItems.map((item) => (
//                       <button
//                         key={item.name}
//                         onClick={() => {
//                           handleNavigation(item.path);
//                           setIsMenuOpen(false);
//                         }}
//                         className="flex items-center w-full text-left text-white hover:text-gray-200 hover:bg-gray-700 px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
//                       >
//                         <item.icon className="w-5 h-5 mr-3" />
//                         {item.name}
//                       </button>
//                     ))}
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
