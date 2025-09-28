import type React from "react";
import { useState } from "react";
import { FaPlus, FaTimes, FaCheck, FaTimes as FaX } from "react-icons/fa";
import type { Property } from "../../types/property";

interface PropertyComparisonProps {
  properties: Property[];
  onAddProperty: () => void;
  onRemoveProperty: (propertyId: string) => void;
  className?: string;
}

const PropertyComparison: React.FC<PropertyComparisonProps> = ({
  properties,
  onAddProperty,
  onRemoveProperty,
  className = "",
}) => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "Price",
    "Bedrooms",
    "Bathrooms",
    "Area (sqft)",
    "Property Type",
    "Location",
  ]);

  const allFeatures = [
    "Price",
    "Bedrooms",
    "Bathrooms",
    "Area (sqft)",
    "Property Type",
    "Location",
    "Garden",
    "Garage",
    "Pool",
    "Gym",
    "Security System",
    "Air Conditioning",
    "Balcony",
    "Elevator",
  ];

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const getFeatureValue = (property: Property, feature: string) => {
    switch (feature) {
      case "Price":
        return `₦${property.price.toLocaleString()}`;
      case "Bedrooms":
        return property.bedrooms.toString();
      case "Bathrooms":
        return property.bathrooms.toString();
      case "Area (sqft)":
        return property.area.toString();
      case "Property Type":
        return property.type.charAt(0).toUpperCase() + property.type.slice(1);
      case "Location":
        return property.location;
      default:
        return property.features.includes(feature);
    }
  };

  const renderFeatureValue = (property: Property, feature: string) => {
    const value = getFeatureValue(property, feature);

    if (typeof value === "boolean") {
      return value ? (
        <FaCheck className="w-4 h-4 text-green-500 mx-auto" />
      ) : (
        <FaX className="w-4 h-4 text-red-500 mx-auto" />
      );
    }

    return <span className="text-sm">{value}</span>;
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}
    >
      <div className="bg-gray-50 px-6 py-4 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Property Comparison
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Compare up to 3 properties side by side
            </p>
          </div>

          {/* Feature Selection Dropdown */}
          <div className="relative">
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Customize Features
            </button>
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-10 hidden">
              <div className="p-3">
                <h4 className="font-medium mb-2">Select Features to Compare</h4>
                {allFeatures.map((feature) => (
                  <label
                    key={feature}
                    className="flex items-center space-x-2 py-1"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(feature)}
                      onChange={() => toggleFeature(feature)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{feature}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-medium text-gray-900 w-48">
                Features
              </th>
              {properties.map((property) => (
                <th key={property.id} className="p-4 min-w-64">
                  <div className="relative">
                    <button
                      onClick={() => onRemoveProperty(property.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <FaTimes className="w-3 h-3" />
                    </button>
                    <img
                      src={property.images[0] || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      {property.title}
                    </h3>
                    <p className="text-xs text-gray-600">{property.location}</p>
                  </div>
                </th>
              ))}
              {properties.length < 3 && (
                <th className="p-4 min-w-64">
                  <button
                    onClick={onAddProperty}
                    className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaPlus className="w-6 h-6 mb-2" />
                    <span className="text-sm">Add Property</span>
                  </button>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {selectedFeatures.map((feature, index) => (
              <tr
                key={feature}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-4 font-medium text-gray-900">{feature}</td>
                {properties.map((property) => (
                  <td key={property.id} className="p-4 text-center">
                    {renderFeatureValue(property, feature)}
                  </td>
                ))}
                {properties.length < 3 && (
                  <td className="p-4 text-center text-gray-400">-</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Comparing {properties.length} of 3 properties •{" "}
            {selectedFeatures.length} features
          </span>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Export Comparison
            </button>
            <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              Save Comparison
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyComparison;

// import type React from "react";
// import { useState } from "react";
// import { FaPlus, FaTimes, FaCheck, FaTimes as FaX } from "react-icons/fa";
// import type { Property } from "../../types/property";
// // import type { Property } from "../../types/property";

// interface PropertyComparisonProps {
//   properties: Property[];
//   onAddProperty: () => void;
//   onRemoveProperty: (propertyId: string) => void;
//   className?: string;
// }

// const PropertyComparison: React.FC<PropertyComparisonProps> = ({
//   properties,
//   onAddProperty,
//   onRemoveProperty,
//   className = "",
// }) => {
//   const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

//   const comparisonFeatures = [
//     "Price",
//     "Bedrooms",
//     "Bathrooms",
//     "Area (sqft)",
//     "Property Type",
//     "Location",
//     "Garden",
//     "Garage",
//     "Pool",
//     "Gym",
//     "Security System",
//     "Air Conditioning",
//     "Balcony",
//     "Elevator",
//   ];

//   const getFeatureValue = (property: Property, feature: string) => {
//     switch (feature) {
//       case "Price":
//         return `₦${property.price.toLocaleString()}`;
//       case "Bedrooms":
//         return property.bedrooms.toString();
//       case "Bathrooms":
//         return property.bathrooms.toString();
//       case "Area (sqft)":
//         return property.area.toString();
//       case "Property Type":
//         return property.type.charAt(0).toUpperCase() + property.type.slice(1);
//       case "Location":
//         return property.location;
//       default:
//         return property.features.includes(feature);
//     }
//   };

//   const renderFeatureValue = (property: Property, feature: string) => {
//     const value = getFeatureValue(property, feature);

//     if (typeof value === "boolean") {
//       return value ? (
//         <FaCheck className="w-4 h-4 text-green-500 mx-auto" />
//       ) : (
//         <FaX className="w-4 h-4 text-red-500 mx-auto" />
//       );
//     }

//     return <span className="text-sm">{value}</span>;
//   };

//   return (
//     <div
//       className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}
//     >
//       <div className="bg-gray-50 px-6 py-4 border-b">
//         <h2 className="text-xl font-semibold text-gray-900">
//           Property Comparison
//         </h2>
//         <p className="text-sm text-gray-600 mt-1">
//           Compare up to 3 properties side by side
//         </p>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="border-b">
//               <th className="text-left p-4 font-medium text-gray-900 w-48">
//                 Features
//               </th>
//               {properties.map((property) => (
//                 <th key={property.id} className="p-4 min-w-64">
//                   <div className="relative">
//                     <button
//                       onClick={() => onRemoveProperty(property.id)}
//                       className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
//                     >
//                       <FaTimes className="w-3 h-3" />
//                     </button>
//                     <img
//                       src={property.images[0] || "/placeholder.svg"}
//                       alt={property.title}
//                       className="w-full h-32 object-cover rounded-lg mb-3"
//                     />
//                     <h3 className="font-semibold text-gray-900 text-sm mb-1">
//                       {property.title}
//                     </h3>
//                     <p className="text-xs text-gray-600">{property.location}</p>
//                   </div>
//                 </th>
//               ))}
//               {properties.length < 3 && (
//                 <th className="p-4 min-w-64">
//                   <button
//                     onClick={onAddProperty}
//                     className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <FaPlus className="w-6 h-6 mb-2" />
//                     <span className="text-sm">Add Property</span>
//                   </button>
//                 </th>
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {comparisonFeatures.map((feature, index) => (
//               <tr
//                 key={feature}
//                 className={`border-b ${
//                   index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                 }`}
//               >
//                 <td className="p-4 font-medium text-gray-900">{feature}</td>
//                 {properties.map((property) => (
//                   <td key={property.id} className="p-4 text-center">
//                     {renderFeatureValue(property, feature)}
//                   </td>
//                 ))}
//                 {properties.length < 3 && (
//                   <td className="p-4 text-center text-gray-400">-</td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="bg-gray-50 px-6 py-4 border-t">
//         <div className="flex justify-between items-center">
//           <span className="text-sm text-gray-600">
//             Comparing {properties.length} of 3 properties
//           </span>
//           <div className="flex gap-2">
//             <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
//               Export Comparison
//             </button>
//             <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
//               Save Comparison
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyComparison;
