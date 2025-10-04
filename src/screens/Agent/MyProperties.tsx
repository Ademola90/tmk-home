"use client";

import { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { usePropertyStore } from "../../store/usePropertyStore";
import { useAuthStore } from "../../store/useAuthStore";
import AddEditPropertyModal from "../../components/dashboard/AddEditPropertyModal";
import type { Property } from "../../types/property";

export default function AgentMyProperties() {
  const { user } = useAuthStore();
  const { properties, deleteProperty } = usePropertyStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const agentProperties = properties.filter((p) => p.agent.id === user?.id);

  const filteredProperties = agentProperties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || property.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || property.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      await deleteProperty(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const stats = {
    total: agentProperties.length,
    available: agentProperties.filter((p) => p.status === "available").length,
    pending: agentProperties.filter((p) => p.status === "pending").length,
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            My Properties
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your property listings
          </p>
        </div>
        <button
          onClick={() => {
            setEditingProperty(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Property
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Properties
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {stats.total}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Available
          </h3>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {stats.available}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Pending
          </h3>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {stats.pending}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="pending">Pending</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Categories</option>
            <option value="apartments">Apartments</option>
            <option value="houses">Houses</option>
            <option value="hostels">Hostels</option>
            <option value="commercial">Commercial</option>
            <option value="land">Land</option>
            <option value="luxury">Luxury</option>
            <option value="shortlet">Short Let</option>
            <option value="events">Events</option>
          </select>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div
            key={property.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={property.images[0] || "/placeholder.svg"}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    property.status
                  )}`}
                >
                  {property.status}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {property.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {property.location}
              </p>
              <p className="text-xl font-bold text-blue-600 mb-4">
                ₦{property.price.toLocaleString()}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    window.open(`/property/${property.id}`, "_blank")
                  }
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => handleEdit(property)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(property.id)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No properties found
          </p>
        </div>
      )}

      {isModalOpen && (
        <AddEditPropertyModal
          property={editingProperty}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProperty(null);
          }}
        />
      )}
    </div>
  );
}

// import { useState } from "react";
// import { Plus, Eye, Edit, Trash2, Home } from "lucide-react";
// import { usePropertyStore } from "../../store/usePropertyStore";
// import { useAuthStore } from "../../store/useAuthStore";
// import { useToastStore } from "../../store/useToastStore";
// import AddEditPropertyModal from "../../components/dashboard/AddEditPropertyModal";
// import type { Property } from "../../types/property";

// export default function AgentMyProperties() {
//   const { properties, deleteProperty } = usePropertyStore();
//   const { user } = useAuthStore();
//   const { addToast } = useToastStore();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingProperty, setEditingProperty] = useState<Property | null>(null);

//   const myProperties = properties.filter(
//     (p) => p.agent.id === user?.id || p.agent.name === user?.name
//   );

//   const handleDelete = (id: string) => {
//     if (window.confirm("Are you sure you want to delete this property?")) {
//       deleteProperty(id);
//       addToast("Property deleted successfully", "success");
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//             My Properties
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Manage your property listings
//           </p>
//         </div>
//         <button
//           onClick={() => {
//             setEditingProperty(null);
//             setIsModalOpen(true);
//           }}
//           className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           <Plus className="w-5 h-5" />
//           Add Property
//         </button>
//       </div>

//       {/* Properties Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {myProperties.map((property) => (
//           <div
//             key={property.id}
//             className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
//           >
//             <img
//               src={property.images[0] || "/placeholder.svg"}
//               alt={property.title}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <div className="flex items-start justify-between mb-2">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                   {property.title}
//                 </h3>
//                 <span
//                   className={`px-2 py-1 text-xs rounded-full ${
//                     property.status === "available"
//                       ? "bg-green-100 text-green-800"
//                       : property.status === "pending"
//                       ? "bg-yellow-100 text-yellow-800"
//                       : "bg-red-100 text-red-800"
//                   }`}
//                 >
//                   {property.status}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
//                 {property.location}
//               </p>
//               <p className="text-xl font-bold text-blue-600 mb-4">
//                 ₦{property.price.toLocaleString()}
//               </p>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() =>
//                     window.open(`/property/${property.id}`, "_blank")
//                   }
//                   className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                 >
//                   <Eye className="w-4 h-4" />
//                   View
//                 </button>
//                 <button
//                   onClick={() => {
//                     setEditingProperty(property);
//                     setIsModalOpen(true);
//                   }}
//                   className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                 >
//                   <Edit className="w-4 h-4" />
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(property.id)}
//                   className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                   title="Delete"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {myProperties.length === 0 && (
//         <div className="text-center py-12">
//           <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//             No properties yet
//           </h3>
//           <p className="text-gray-600 dark:text-gray-400 mb-4">
//             Start adding properties to your portfolio
//           </p>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <Plus className="w-5 h-5" />
//             Add Your First Property
//           </button>
//         </div>
//       )}

//       <AddEditPropertyModal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setEditingProperty(null);
//         }}
//         property={editingProperty}
//       />
//     </div>
//   );
// }
