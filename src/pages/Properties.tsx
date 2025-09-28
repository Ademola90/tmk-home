"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiGrid, FiList } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../components/property/PropertyCard";
import PropertyFilters from "../components/property/PropertyFilters";
import Button from "../components/common/Button";
import { usePropertyStore } from "../store/usePropertyStore";
import type { Property } from "../types/property";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/sections/Footer";

const Properties = () => {
  const navigate = useNavigate();
  const {
    filteredProperties,
    filters,
    isLoading,
    fetchProperties,
    setFilters,
    searchProperties,
    setSelectedProperty,
  } = usePropertyStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchProperties(searchQuery);
  };

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    navigate(`/property/${property.id}`);
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery("");
    searchProperties("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Find Your Dream Property
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the perfect home from our curated collection of premium
              properties
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search by location, property type, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-card"
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                Search
              </Button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <PropertyFilters
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={handleClearFilters}
              />
              <div className="text-sm text-muted-foreground">
                {filteredProperties.length} properties found
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md ${
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md ${
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Properties Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredProperties.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No properties found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={handleClearFilters} variant="outline">
                Clear All Filters
              </Button>
            </motion.div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <PropertyCard
                    property={property}
                    onClick={() => handlePropertyClick(property)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Properties;

// import type React from "react";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FiSearch, FiGrid, FiList } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import PropertyCard from "../components/property/PropertyCard";
// import PropertyFilters from "../components/property/PropertyFilters";
// import Button from "../components/common/Button";
// import { usePropertyStore } from "../store/usePropertyStore";
// import type { Property } from "../types/property";
// import Navbar from "../components/nav/Navbar";

// const Properties = () => {
//   const navigate = useNavigate();
//   const {
//     filteredProperties,
//     filters,
//     isLoading,
//     fetchProperties,
//     setFilters,
//     searchProperties,
//     setSelectedProperty,
//   } = usePropertyStore();

//   const [searchQuery, setSearchQuery] = useState("");
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

//   useEffect(() => {
//     fetchProperties();
//   }, [fetchProperties]);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     searchProperties(searchQuery);
//   };

//   const handlePropertyClick = (property: Property) => {
//     setSelectedProperty(property);
//     navigate(`/property/${property.id}`);
//   };

//   const handleClearFilters = () => {
//     setFilters({});
//     setSearchQuery("");
//     searchProperties("");
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <nav>
//         <Navbar />
//       </nav>
//       {/* Hero Section */}
//       <section className="bg-primary/5 py-16">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-8"
//           >
//             <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
//               Find Your Dream Property
//             </h1>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Discover the perfect home from our curated collection of premium
//               properties
//             </p>
//           </motion.div>

//           {/* Search Bar */}
//           <motion.form
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.6 }}
//             onSubmit={handleSearch}
//             className="max-w-2xl mx-auto"
//           >
//             <div className="relative">
//               <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search by location, property type, or keywords..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-12 pr-4 py-4 text-lg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-card"
//               />
//               <Button
//                 type="submit"
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2"
//               >
//                 Search
//               </Button>
//             </div>
//           </motion.form>
//         </div>
//       </section>

//       {/* Filters and Results */}
//       <section className="py-8">
//         <div className="container mx-auto px-4">
//           {/* Filter Bar */}
//           <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
//             <div className="flex items-center space-x-4">
//               <PropertyFilters
//                 filters={filters}
//                 onFiltersChange={setFilters}
//                 onClearFilters={handleClearFilters}
//               />
//               <div className="text-sm text-muted-foreground">
//                 {filteredProperties.length} properties found
//               </div>
//             </div>

//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => setViewMode("grid")}
//                 className={`p-2 rounded-md ${
//                   viewMode === "grid"
//                     ? "bg-primary text-primary-foreground"
//                     : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
//                 }`}
//               >
//                 <FiGrid className="w-4 h-4" />
//               </button>
//               <button
//                 onClick={() => setViewMode("list")}
//                 className={`p-2 rounded-md ${
//                   viewMode === "list"
//                     ? "bg-primary text-primary-foreground"
//                     : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
//                 }`}
//               >
//                 <FiList className="w-4 h-4" />
//               </button>
//             </div>
//           </div>

//           {/* Properties Grid */}
//           {isLoading ? (
//             <div className="flex items-center justify-center py-16">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//             </div>
//           ) : filteredProperties.length === 0 ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-center py-16"
//             >
//               <h3 className="text-xl font-semibold text-foreground mb-2">
//                 No properties found
//               </h3>
//               <p className="text-muted-foreground mb-4">
//                 Try adjusting your search criteria or filters
//               </p>
//               <Button onClick={handleClearFilters} variant="outline">
//                 Clear All Filters
//               </Button>
//             </motion.div>
//           ) : (
//             <div
//               className={`grid gap-6 ${
//                 viewMode === "grid"
//                   ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
//                   : "grid-cols-1"
//               }`}
//             >
//               {filteredProperties.map((property, index) => (
//                 <motion.div
//                   key={property.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1, duration: 0.6 }}
//                 >
//                   <PropertyCard
//                     property={property}
//                     onClick={() => handlePropertyClick(property)}
//                   />
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Properties;
