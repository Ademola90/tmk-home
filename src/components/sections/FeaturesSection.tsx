import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../property/PropertyCard";
import Button from "../common/Button";
import { usePropertyStore } from "../../store/usePropertyStore";
import type { Property } from "../../types/property"; // Add this import

const FeaturedProperties = () => {
  const navigate = useNavigate();
  const { properties, fetchProperties, setSelectedProperty } =
    usePropertyStore();

  useEffect(() => {
    if (properties.length === 0) {
      fetchProperties();
    }
  }, [properties.length, fetchProperties]);

  const featuredProperties = properties.slice(0, 6);

  // Fix: Replace 'any' with the proper Property type
  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    navigate(`/property/${property.id}`);
  };

  return (
    <section className="py-20 bg-[#141414]  px-5 md:px-10 lg:px-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#fff] mb-6">
            Featured Properties
          </h2>
          <p className="text-xl text-[#fff] max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <PropertyCard
                property={property}
                onClick={() => handlePropertyClick(property)}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            onClick={() => navigate("/properties")}
            variant="outline"
            size="lg"
            className="bg-[#fff] text-black hover:text-white hover:bg-transparent hover:border-white hover:border  "
          >
            View All Properties
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProperties;

// "use client";

// import { motion } from "framer-motion";
// import {
//   FiShield,
//   FiSearch,
//   FiDollarSign,
//   FiUsers,
//   FiHome,
//   FiTrendingUp,
//   FiMapPin,
//   FiClock,
// } from "react-icons/fi";

// const FeaturesSection = () => {
//   const features = [
//     {
//       icon: FiShield,
//       title: "Secure Escrow System",
//       description:
//         "Your money is protected with our advanced escrow system until you're completely satisfied with your property purchase.",
//       color: "text-accent",
//     },
//     {
//       icon: FiSearch,
//       title: "Advanced Property Search",
//       description:
//         "Find your perfect property with our intelligent search filters and AI-powered recommendations.",
//       color: "text-blue-500",
//     },
//     {
//       icon: FiDollarSign,
//       title: "Transparent Pricing",
//       description:
//         "No hidden fees or surprises. See all costs upfront with our transparent pricing structure.",
//       color: "text-green-500",
//     },
//     {
//       icon: FiUsers,
//       title: "Expert Agents",
//       description:
//         "Work with certified real estate professionals who know the market inside and out.",
//       color: "text-purple-500",
//     },
//     {
//       icon: FiHome,
//       title: "Virtual Tours",
//       description:
//         "Explore properties from anywhere with our immersive 3D virtual tours and high-quality imagery.",
//       color: "text-orange-500",
//     },
//     {
//       icon: FiTrendingUp,
//       title: "Market Analytics",
//       description:
//         "Make informed decisions with real-time market data and property value insights.",
//       color: "text-red-500",
//     },
//     {
//       icon: FiMapPin,
//       title: "Neighborhood Insights",
//       description:
//         "Discover everything about your future neighborhood including schools, amenities, and local attractions.",
//       color: "text-indigo-500",
//     },
//     {
//       icon: FiClock,
//       title: "24/7 Support",
//       description:
//         "Get help whenever you need it with our round-the-clock customer support team.",
//       color: "text-pink-500",
//     },
//   ];

//   return (
//     <section className="py-20 bg-secondary/30">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
//             Why Choose Our Platform?
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
//             We've built the most comprehensive real estate platform with
//             cutting-edge features to make your property journey smooth, secure,
//             and successful.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {features.map((feature, index) => {
//             const Icon = feature.icon;
//             return (
//               <motion.div
//                 key={feature.title}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1, duration: 0.6 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -5 }}
//                 className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300"
//               >
//                 <div
//                   className={`w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center mb-4 ${feature.color}`}
//                 >
//                   <Icon className="w-6 h-6" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-foreground mb-3">
//                   {feature.title}
//                 </h3>
//                 <p className="text-muted-foreground leading-relaxed">
//                   {feature.description}
//                 </p>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* CTA Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.8, duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mt-16"
//         >
//           <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
//             <h3 className="text-3xl font-bold text-foreground mb-4">
//               Ready to Find Your Dream Property?
//             </h3>
//             <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
//               Join thousands of satisfied customers who found their perfect home
//               through our platform.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
//                 Browse Properties
//               </button>
//               <button className="border border-border text-foreground px-8 py-4 rounded-xl font-semibold hover:bg-secondary/50 transition-colors">
//                 Learn More
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;
