"use client";

import type React from "react";
import heroimg from "../../assets/heroimg.png";
import { motion } from "framer-motion";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/properties?search=${searchQuery}&location=${location}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 ">
        <img
          src={heroimg}
          alt="Luxury Real Estate"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      <div className="container mt-10 mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold  mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#fff] via-gray-200 to-[#155DFC]"
          >
            Find Your Perfect Home
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-100 mb-12 leading-relaxed font-normal"
          >
            Discover premium properties with our advanced search and secure
            transaction platform
          </motion.p>

          {/* Search Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            onSubmit={handleSearch}
            className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <Button type="submit" className="py-4 text-lg font-semibold">
                Search Properties
              </Button>
            </div>
          </motion.form>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-[#fff] mb-2">500+</div>
              <div className="text-gray-100">Properties Listed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#fff] mb-2">1000+</div>
              <div className="text-gray-100">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#fff] mb-2">50+</div>
              <div className="text-gray-100">Expert Agents</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

// import type React from "react";

// import { motion } from "framer-motion";
// import { FiSearch, FiPlay } from "react-icons/fi";
// import { useState } from "react";
// import Button from "../common/Button";
// import heroimg from "../../assets/heroimg.png";
// import imgone from "../../assets/imgone.png";

// const HeroSection = () => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle search logic
//     console.log("Searching for:", searchQuery);
//   };

//   return (
//     <section className="relative min-h-screen flex items-center overflow-hidden ">
//       {/* Background Image */}
//       <div className="absolute inset-0 z-0">
//         <img
//           src={heroimg}
//           alt="Luxury Real Estate"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
//       </div>

//       <div className="container mx-auto mt-10 relative z-10 ">
//         <div className="grid lg:grid-cols-2 gap-12 items-center px-5 md:px-10 lg:px-16">
//           {/* Left Content */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-white"
//           >
//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.8 }}
//               className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-3"
//             >
//               Find Your
//               <span className="block text-accent">Perfect Home</span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.8 }}
//               className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed"
//             >
//               Discover exceptional properties with our trusted real estate
//               platform.
//             </motion.p>

//             {/* Search Form */}
//             <motion.form
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6, duration: 0.8 }}
//               onSubmit={handleSearch}
//               className="mb-8"
//             >
//               <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
//                 <div className="relative flex-1">
//                   <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="text"
//                     placeholder="Enter location or property type..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white/95 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
//                   />
//                 </div>
//                 <Button
//                   type="submit"
//                   size="lg"
//                   className="bg-accent hover:bg-accent/90"
//                 >
//                   Search Properties
//                 </Button>
//               </div>
//             </motion.form>

//             {/* Action Buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8, duration: 0.8 }}
//               className="flex flex-col sm:flex-row gap-4"
//             >
//               <Button size="lg" className="bg-primary hover:bg-primary/90">
//                 Browse Properties
//               </Button>
//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm bg-transparent"
//               >
//                 <FiPlay className="w-5 h-5 mr-2" />
//                 Watch Virtual Tour
//               </Button>
//             </motion.div>
//           </motion.div>

//           {/* Right Content - Property Showcase */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.4, duration: 0.8 }}
//             className="hidden lg:block"
//           >
//             <div className="relative">
//               {/* Featured Property Card */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: 0.8, duration: 0.6 }}
//                 className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl"
//               >
//                 <img
//                   src={imgone}
//                   alt="Featured Property"
//                   className="w-full h-48 object-cover rounded-xl mb-4"
//                 />
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   Luxury Downtown Penthouse
//                 </h3>
//                 <p className="text-gray-600 mb-4">
//                   3 bed • 2 bath • 2,100 sqft
//                 </p>
//                 <div className="flex items-center justify-between">
//                   <span className="text-2xl font-bold text-primary">
//                     $850,000
//                   </span>
//                   <Button size="sm">View Details</Button>
//                 </div>
//               </motion.div>

//               {/* Floating Elements */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 1.2, duration: 0.6 }}
//                 className="absolute -top-4 -right-4 bg-accent text-white px-4 py-2 rounded-full text-sm font-medium"
//               >
//                 New Listing
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 1.4, duration: 0.6 }}
//                 className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-900 shadow-lg"
//               >
//                 🔥 Hot Property
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//         {/* Stats */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1, duration: 0.8 }}
//           className="grid grid-cols-3 gap-8 mt-12 pt-8 px-5 md:px-10 lg:px-16 justify-between bg-[#000]"
//         >
//           <div>
//             <div className="lg:text-5xl md:text-5xl text-3xl font-bold text-accent text-[#fff] mb-1">
//               500+
//             </div>
//             <div className="text-gray-300 text-base">Properties Listed</div>
//           </div>
//           <div>
//             <div className="lg:text-5xl md:text-5xl text-3xl font-bold text-accent text-[#fff] mb-1">
//               1000+
//             </div>
//             <div className="text-gray-300 text-base">Happy Clients</div>
//           </div>
//           <div>
//             <div className="lg:text-5xl md:text-5xl text-3xl font-bold text-accent text-[#fff] mb-1">
//               50+
//             </div>
//             <div className="text-gray-300 text-base">Expert Agents</div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Scroll Indicator */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.5, duration: 0.8 }}
//         className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 text-white"
//       >
//         <div className="flex flex-col items-center">
//           <span className="text-sm mb-2">Scroll to explore</span>
//           <motion.div
//             animate={{ y: [0, 10, 0] }}
//             transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
//             className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
//           >
//             <motion.div
//               animate={{ y: [0, 12, 0] }}
//               transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
//               className="w-1 h-3 bg-white/60 rounded-full mt-2"
//             />
//           </motion.div>
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default HeroSection;
