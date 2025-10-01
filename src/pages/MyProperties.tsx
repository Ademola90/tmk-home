import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/sections/Footer";
import PropertyCard from "../components/property/PropertyCard";

// Define the property type with all possible status values
type PropertyStatus = "available" | "pending" | "sold";

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  state: string;
  lga: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: "apartment";
  category: "apartments";
  status: PropertyStatus;
  images: string[];
  features: string[];
  agent: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
}

const mockUserProperties: Property[] = [
  {
    id: "user-1",
    title: "Downtown Loft",
    description: "Modern loft in the heart of downtown",
    price: 350000,
    location: "Downtown District",
    state: "California",
    lga: "Downtown",
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
    type: "apartment",
    category: "apartments",
    status: "available",
    images: ["/modern-apartment-living-room.png"],
    features: ["City View", "Parking"],
    agent: {
      id: "user",
      name: "You",
      email: "you@example.com",
      phone: "+1 (555) 123-4567",
    },
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  // Add example properties with different statuses for testing
  {
    id: "user-2",
    title: "Pending Property",
    description: "This property is pending sale",
    price: 250000,
    location: "Test District",
    state: "California",
    lga: "Test Area",
    bedrooms: 2,
    bathrooms: 2,
    area: 1000,
    type: "apartment",
    category: "apartments",
    status: "pending",
    images: ["/modern-apartment-living-room.png"],
    features: ["Garden", "Parking"],
    agent: {
      id: "user",
      name: "You",
      email: "you@example.com",
      phone: "+1 (555) 123-4567",
    },
    createdAt: "2024-01-16",
    updatedAt: "2024-01-16",
  },
  {
    id: "user-3",
    title: "Sold Property",
    description: "This property has been sold",
    price: 450000,
    location: "Sold District",
    state: "California",
    lga: "Sold Area",
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    type: "apartment",
    category: "apartments",
    status: "sold",
    images: ["/modern-apartment-living-room.png"],
    features: ["Pool", "Garage"],
    agent: {
      id: "user",
      name: "You",
      email: "you@example.com",
      phone: "+1 (555) 123-4567",
    },
    createdAt: "2024-01-14",
    updatedAt: "2024-01-17",
  },
];

const MyProperties = () => {
  const navigate = useNavigate();
  const [properties] = useState<Property[]>(mockUserProperties);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('/property-management-dashboard.jpg')",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center"
          >
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                My Properties
              </h1>
              <p className="text-xl text-gray-200">
                Manage your listed properties
              </p>
            </div>
            <button className="flex items-center space-x-2 bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-lg transition-colors font-semibold">
              <FiPlus className="w-4 h-4" />
              <span>Add Property</span>
            </button>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="text-2xl font-bold text-foreground mb-1">
                {properties.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Properties
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {properties.filter((p) => p.status === "available").length}
              </div>
              <div className="text-sm text-muted-foreground">Available</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {properties.filter((p) => p.status === "pending").length}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="text-2xl font-bold text-red-600 mb-1">
                {properties.filter((p) => p.status === "sold").length}
              </div>
              <div className="text-sm text-muted-foreground">Sold</div>
            </div>
          </div>

          {/* Properties List */}
          {properties.length === 0 ? (
            <div className="text-center py-16 bg-card border border-border rounded-xl relative overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-5"
                style={{
                  backgroundImage: "url('/empty-property-list.jpg')",
                }}
              />
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No Properties Yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start by adding your first property listing
                </p>
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg transition-colors">
                  Add Your First Property
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="relative group"
                >
                  <PropertyCard
                    property={property}
                    onClick={() => navigate(`/property/${property.id}`)}
                  />
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white/90 hover:bg-white p-2 rounded-lg shadow-lg transition-colors">
                      <FiEye className="w-4 h-4 text-gray-700" />
                    </button>
                    <button className="bg-white/90 hover:bg-white p-2 rounded-lg shadow-lg transition-colors">
                      <FiEdit2 className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="bg-white/90 hover:bg-white p-2 rounded-lg shadow-lg transition-colors">
                      <FiTrash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default MyProperties;
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FiPlus, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/nav/Navbar";
// import Footer from "../components/sections/Footer";
// import PropertyCard from "../components/property/PropertyCard";

// const mockUserProperties = [
//   {
//     id: "user-1",
//     title: "Downtown Loft",
//     description: "Modern loft in the heart of downtown",
//     price: 350000,
//     location: "Downtown District",
//     state: "California",
//     lga: "Downtown",
//     bedrooms: 1,
//     bathrooms: 1,
//     area: 800,
//     type: "apartment" as const,
//     status: "available" as const,
//     images: ["/modern-apartment-living-room.png"],
//     features: ["City View", "Parking"],
//     agent: {
//       id: "user",
//       name: "You",
//       email: "you@example.com",
//       phone: "+1 (555) 123-4567",
//     },
//     createdAt: "2024-01-15",
//     updatedAt: "2024-01-15",
//   },
// ];

// const MyProperties = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//   const navigate = useNavigate();
//   const [properties] = useState(mockUserProperties);

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-16 overflow-hidden">
//         <div
//           className="absolute inset-0 bg-cover bg-center opacity-20"
//           style={{
//             backgroundImage: "url('/property-management-dashboard.jpg')",
//           }}
//         />
//         <div className="container mx-auto px-4 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="flex justify-between items-center"
//           >
//             <div className="text-white">
//               <h1 className="text-4xl md:text-5xl font-bold mb-2">
//                 My Properties
//               </h1>
//               <p className="text-xl text-gray-200">
//                 Manage your listed properties
//               </p>
//             </div>
//             <button className="flex items-center space-x-2 bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-lg transition-colors font-semibold">
//               <FiPlus className="w-4 h-4" />
//               <span>Add Property</span>
//             </button>
//           </motion.div>
//         </div>
//       </section>

//       <div className="container mx-auto px-4 py-12">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           {/* Stats */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//             <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
//               <div className="text-2xl font-bold text-foreground mb-1">
//                 {properties.length}
//               </div>
//               <div className="text-sm text-muted-foreground">
//                 Total Properties
//               </div>
//             </div>
//             <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
//               <div className="text-2xl font-bold text-green-600 mb-1">
//                 {properties.filter((p) => p.status === "available").length}
//               </div>
//               <div className="text-sm text-muted-foreground">Available</div>
//             </div>
//             <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
//               <div className="text-2xl font-bold text-yellow-600 mb-1">
//                 {/* {properties.filter((p) => p.status === "pending").length} */}
//               </div>
//               <div className="text-sm text-muted-foreground">Pending</div>
//             </div>
//             <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
//               <div className="text-2xl font-bold text-red-600 mb-1">
//                 {/* {properties.filter((p) => p.status === "sold").length} */}
//               </div>
//               <div className="text-sm text-muted-foreground">Sold</div>
//             </div>
//           </div>

//           {/* Properties List */}
//           {properties.length === 0 ? (
//             <div className="text-center py-16 bg-card border border-border rounded-xl relative overflow-hidden">
//               <div
//                 className="absolute inset-0 bg-cover bg-center opacity-5"
//                 style={{
//                   backgroundImage: "url('/empty-property-list.jpg')",
//                 }}
//               />
//               <div className="relative z-10">
//                 <h3 className="text-xl font-semibold text-foreground mb-2">
//                   No Properties Yet
//                 </h3>
//                 <p className="text-muted-foreground mb-6">
//                   Start by adding your first property listing
//                 </p>
//                 <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg transition-colors">
//                   Add Your First Property
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {properties.map((property, index) => (
//                 <motion.div
//                   key={property.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1, duration: 0.6 }}
//                   className="relative group"
//                 >
//                   <PropertyCard
//                     property={property}
//                     onClick={() => navigate(`/property/${property.id}`)}
//                   />
//                   <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <button className="bg-white/90 hover:bg-white p-2 rounded-lg shadow-lg transition-colors">
//                       <FiEye className="w-4 h-4 text-gray-700" />
//                     </button>
//                     <button className="bg-white/90 hover:bg-white p-2 rounded-lg shadow-lg transition-colors">
//                       <FiEdit2 className="w-4 h-4 text-blue-600" />
//                     </button>
//                     <button className="bg-white/90 hover:bg-white p-2 rounded-lg shadow-lg transition-colors">
//                       <FiTrash2 className="w-4 h-4 text-red-600" />
//                     </button>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </motion.div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default MyProperties;
