import { motion } from "framer-motion";
import { FiMapPin, FiHome, FiCheck, FiWifi, FiShield } from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import { FaBath, FaBed } from "react-icons/fa";
import type { Property } from "../../types/property";
import type { IconType } from "react-icons";

interface PropertyDetailsProps {
  property: Property;
}

const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Define proper type for amenity icons
  const amenityIcons: Record<string, IconType> = {
    "City View": FiHome,
    Balcony: FiHome,
    Gym: FiHome,
    Parking: FaCar,
    "24/7 Security": FiShield,
    Garden: FiHome,
    Garage: FaCar,
    Fireplace: FiHome,
    "Walk-in Closet": FiHome,
    "Laundry Room": FiHome,
    "Panoramic View": FiHome,
    "Private Elevator": FiHome,
    Terrace: FiHome,
    "Wine Cellar": FiHome,
    "Smart Home": FiWifi,
  };

  return (
    <div className="space-y-8">
      {/* Property Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-border pb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  property.status === "available"
                    ? "bg-accent/10 text-accent"
                    : property.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {property.status.charAt(0).toUpperCase() +
                  property.status.slice(1)}
              </span>
              <span className="text-sm text-muted-foreground capitalize">
                {property.type}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {property.title}
            </h1>

            <div className="flex items-center text-muted-foreground mb-6">
              <FiMapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">{property.location}</span>
            </div>

            <div className="flex items-center space-x-8 text-lg">
              <div className="flex items-center">
                <FaBed className="w-5 h-5 mr-2 text-primary" />
                <span className="font-medium">{property.bedrooms}</span>
                <span className="text-muted-foreground ml-1">bed</span>
              </div>
              <div className="flex items-center">
                <FaBath className="w-5 h-5 mr-2 text-primary" />
                <span className="font-medium">{property.bathrooms}</span>
                <span className="text-muted-foreground ml-1">bath</span>
              </div>
              {/* <div className="flex items-center">
                <FiMaximize2 className="w-5 h-5 mr-2 text-primary" />
                <span className="font-medium">
                  {property.area.toLocaleString()}
                </span>
                <span className="text-muted-foreground ml-1">sqft</span>
              </div> */}
            </div>
          </div>

          <div className="text-right">
            <div className="text-4xl font-bold text-primary mb-2">
              {formatCurrency(property.price)}
            </div>
            {/* <div className="text-muted-foreground">
              ${Math.round(property.price / property.area)}/sqft
            </div> */}
          </div>
        </div>
      </motion.div>

      {/* Property Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="space-y-6"
      >
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Description
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {property.description}
          </p>
        </div>

        {/* Property Features */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Features & Amenities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {property.features.map((feature, index) => {
              const IconComponent = amenityIcons[feature] || FiCheck;
              return (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05, duration: 0.6 }}
                  className="flex items-center space-x-3 p-3 bg-secondary/30 rounded-lg"
                >
                  <IconComponent className="w-5 h-5 text-primary" />
                  <span className="text-foreground">{feature}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Property Details Grid */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Property Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Property Type</span>
                <span className="font-medium text-foreground capitalize">
                  {property.type}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Bedrooms</span>
                <span className="font-medium text-foreground">
                  {property.bedrooms}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Bathrooms</span>
                <span className="font-medium text-foreground">
                  {property.bathrooms}
                </span>
              </div>
              {/* <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Area</span>
                <span className="font-medium text-foreground">
                  {property.area.toLocaleString()} sqft
                </span>
              </div> */}
            </div>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium text-foreground capitalize">
                  {property.status}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Listed Date</span>
                <span className="font-medium text-foreground">
                  {formatDate(property.createdAt)}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-medium text-foreground">
                  {formatDate(property.updatedAt)}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Property ID</span>
                <span className="font-medium text-foreground">
                  #{property.id}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PropertyDetails;

// import { motion } from "framer-motion";
// import {
//   FiMaximize2,
//   FiMapPin,
//   FiHome,
//   FiCheck,
//   FiWifi,
//   FiShield,
// } from "react-icons/fi";
// // import type { Property } from "../../types/property";
// import { FaCar } from "react-icons/fa";
// import { FaBath, FaBed } from "react-icons/fa";
// import type { Property } from "../../types/property";

// interface PropertyDetailsProps {
//   property: Property;
// }

// const PropertyDetails = ({ property }: PropertyDetailsProps) => {
//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 0,
//     }).format(amount);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const amenityIcons: { [key: string]: any } = {
//     "City View": FiHome,
//     Balcony: FiHome,
//     Gym: FiHome,
//     Parking: FaCar,
//     "24/7 Security": FiShield,
//     Garden: FiHome,
//     Garage: FaCar,
//     Fireplace: FiHome,
//     "Walk-in Closet": FiHome,
//     "Laundry Room": FiHome,
//     "Panoramic View": FiHome,
//     "Private Elevator": FiHome,
//     Terrace: FiHome,
//     "Wine Cellar": FiHome,
//     "Smart Home": FiWifi,
//   };

//   return (
//     <div className="space-y-8">
//       {/* Property Header */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="border-b border-border pb-8"
//       >
//         <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
//           <div className="flex-1">
//             <div className="flex items-center gap-3 mb-4">
//               <span
//                 className={`px-3 py-1 rounded-full text-sm font-medium ${
//                   property.status === "available"
//                     ? "bg-accent/10 text-accent"
//                     : property.status === "pending"
//                     ? "bg-yellow-100 text-yellow-800"
//                     : "bg-red-100 text-red-800"
//                 }`}
//               >
//                 {property.status.charAt(0).toUpperCase() +
//                   property.status.slice(1)}
//               </span>
//               <span className="text-sm text-muted-foreground capitalize">
//                 {property.type}
//               </span>
//             </div>

//             <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
//               {property.title}
//             </h1>

//             <div className="flex items-center text-muted-foreground mb-6">
//               <FiMapPin className="w-5 h-5 mr-2" />
//               <span className="text-lg">{property.location}</span>
//             </div>

//             <div className="flex items-center space-x-8 text-lg">
//               <div className="flex items-center">
//                 <FaBed className="w-5 h-5 mr-2 text-primary" />
//                 <span className="font-medium">{property.bedrooms}</span>
//                 <span className="text-muted-foreground ml-1">bed</span>
//               </div>
//               <div className="flex items-center">
//                 <FaBath className="w-5 h-5 mr-2 text-primary" />
//                 <span className="font-medium">{property.bathrooms}</span>
//                 <span className="text-muted-foreground ml-1">bath</span>
//               </div>
//               <div className="flex items-center">
//                 <FiMaximize2 className="w-5 h-5 mr-2 text-primary" />
//                 <span className="font-medium">
//                   {property.area.toLocaleString()}
//                 </span>
//                 <span className="text-muted-foreground ml-1">sqft</span>
//               </div>
//             </div>
//           </div>

//           <div className="text-right">
//             <div className="text-4xl font-bold text-primary mb-2">
//               {formatCurrency(property.price)}
//             </div>
//             <div className="text-muted-foreground">
//               ${Math.round(property.price / property.area)}/sqft
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* Property Description */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1, duration: 0.6 }}
//         className="space-y-6"
//       >
//         <div>
//           <h2 className="text-2xl font-semibold text-foreground mb-4">
//             Description
//           </h2>
//           <p className="text-muted-foreground leading-relaxed text-lg">
//             {property.description}
//           </p>
//         </div>

//         {/* Property Features */}
//         <div>
//           <h3 className="text-xl font-semibold text-foreground mb-4">
//             Features & Amenities
//           </h3>
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             {property.features.map((feature, index) => {
//               const IconComponent = amenityIcons[feature] || FiCheck;
//               return (
//                 <motion.div
//                   key={feature}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.2 + index * 0.05, duration: 0.6 }}
//                   className="flex items-center space-x-3 p-3 bg-secondary/30 rounded-lg"
//                 >
//                   <IconComponent className="w-5 h-5 text-primary" />
//                   <span className="text-foreground">{feature}</span>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Property Details Grid */}
//         <div>
//           <h3 className="text-xl font-semibold text-foreground mb-4">
//             Property Details
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <div className="flex justify-between py-3 border-b border-border">
//                 <span className="text-muted-foreground">Property Type</span>
//                 <span className="font-medium text-foreground capitalize">
//                   {property.type}
//                 </span>
//               </div>
//               <div className="flex justify-between py-3 border-b border-border">
//                 <span className="text-muted-foreground">Bedrooms</span>
//                 <span className="font-medium text-foreground">
//                   {property.bedrooms}
//                 </span>
//               </div>
//               <div className="flex justify-between py-3 border-b border-border">
//                 <span className="text-muted-foreground">Bathrooms</span>
//                 <span className="font-medium text-foreground">
//                   {property.bathrooms}
//                 </span>
//               </div>
//               <div className="flex justify-between py-3 border-b border-border">
//                 <span className="text-muted-foreground">Area</span>
//                 <span className="font-medium text-foreground">
//                   {property.area.toLocaleString()} sqft
//                 </span>
//               </div>
//             </div>
//             <div className="space-y-4">
//               <div className="flex justify-between py-3 border-b border-border">
//                 <span className="text-muted-foreground">Status</span>
//                 <span className="font-medium text-foreground capitalize">
//                   {property.status}
//                 </span>
//               </div>
//               <div className="flex justify-between py-3 border-b border-border">
//                 <span className="text-muted-foreground">Listed Date</span>
//                 <span className="font-medium text-foreground">
//                   {formatDate(property.createdAt)}
//                 </span>
//               </div>
//               <div className="flex justify-between py-3 border-b border-border">
//                 <span className="text-muted-foreground">Last Updated</span>
//                 <span className="font-medium text-foreground">
//                   {formatDate(property.updatedAt)}
//                 </span>
//               </div>
//               <div className="flex justify-between py-3 border-b border-border">
//                 <span className="text-muted-foreground">Property ID</span>
//                 <span className="font-medium text-foreground">
//                   #{property.id}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default PropertyDetails;
