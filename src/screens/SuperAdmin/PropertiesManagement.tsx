import { useState } from "react";
import { Plus, Search, Eye, Edit, Trash2, Check, X } from "lucide-react";
import { usePropertyStore } from "../../store/usePropertyStore";
import AddEditPropertyModal from "../../components/dashboard/AddEditPropertyModal";
import type { Property } from "../../types/property";

export default function PropertiesManagement() {
  const { properties, deleteProperty, approveProperty, rejectProperty } =
    usePropertyStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [viewingProperty, setViewingProperty] = useState<Property | null>(null);

  const categories = [
    "all",
    "residential",
    "commercial",
    "land",
    "industrial",
    "shortlet",
  ];

  // ✅ Use actual status values from your Property type
  const statuses = ["all", "available", "pending", "sold"];

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || property.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" || property.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      deleteProperty(id);
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProperty(null);
    setIsModalOpen(true);
  };

  const handleApprove = (id: string) => {
    approveProperty(id);
  };

  const handleReject = (id: string) => {
    if (window.confirm("Are you sure you want to reject this property?")) {
      rejectProperty(id);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      available: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      sold: "bg-red-100 text-red-800",
    };
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Properties Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage all properties across the platform
        </p>
      </div>

      {/* Stats Cards - ✅ Fixed status values */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Properties
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {properties.length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Available
          </h3>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {properties.filter((p) => p.status === "available").length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Pending
          </h3>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {properties.filter((p) => p.status === "pending").length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Sold
          </h3>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {properties.filter((p) => p.status === "sold").length}
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Property
          </button>
        </div>
      </div>

      {/* Properties Table - ✅ Fixed agent and removed views */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                {/* Removed Views column since it doesn't exist in Property type */}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProperties.map((property) => (
                <tr
                  key={property.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={property.images[0] || "/placeholder.svg"}
                        alt={property.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {property.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {property.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {property.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ₦{property.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {/* ✅ Use agent.name instead of agentName */}
                    {property.agent.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                        property.status
                      )}`}
                    >
                      {property.status}
                    </span>
                  </td>
                  {/* Removed Views cell */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setViewingProperty(property)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                        title="View"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleEdit(property)}
                        className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      {property.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(property.id)}
                            className="text-green-600 hover:text-green-900 dark:text-green-400"
                            title="Approve"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleReject(property.id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400"
                            title="Reject"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(property.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Property Modal */}
      {isModalOpen && (
        <AddEditPropertyModal
          property={editingProperty}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProperty(null);
          }}
        />
      )}

      {/* View Property Modal */}
      {viewingProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {viewingProperty.title}
                </h2>
                <button
                  onClick={() => setViewingProperty(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <img
                src={viewingProperty.images[0] || "/placeholder.svg"}
                alt={viewingProperty.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {viewingProperty.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Price
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      ₦{viewingProperty.price.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Location
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {viewingProperty.location}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Category
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {viewingProperty.category}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Status
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {viewingProperty.status}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Agent
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {viewingProperty.agent.name}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Features
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {viewingProperty.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// import { useState } from "react";
// import { Plus, Search, Eye, Edit, Trash2, Check, X } from "lucide-react";
// import { usePropertyStore } from "../../store/usePropertyStore";
// import AddEditPropertyModal from "../../components/dashboard/AddEditPropertyModal";
// import type { Property } from "../../types/property";

// export default function PropertiesManagement() {
//   const { properties, deleteProperty, approveProperty, rejectProperty } =
//     usePropertyStore();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterCategory, setFilterCategory] = useState("all");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingProperty, setEditingProperty] = useState<Property | null>(null);
//   const [viewingProperty, setViewingProperty] = useState<Property | null>(null);

//   const categories = [
//     "all",
//     "residential",
//     "commercial",
//     "land",
//     "industrial",
//     "shortlet",
//   ];
//   const statuses = ["all", "approved", "pending", "rejected"];

//   const filteredProperties = properties.filter((property) => {
//     const matchesSearch =
//       property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       property.location.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory =
//       filterCategory === "all" || property.category === filterCategory;
//     const matchesStatus =
//       filterStatus === "all" || property.status === filterStatus;

//     return matchesSearch && matchesCategory && matchesStatus;
//   });

//   const handleDelete = (id: string) => {
//     if (window.confirm("Are you sure you want to delete this property?")) {
//       deleteProperty(id);
//     }
//   };

//   const handleEdit = (property: Property) => {
//     setEditingProperty(property);
//     setIsModalOpen(true);
//   };

//   const handleAddNew = () => {
//     setEditingProperty(null);
//     setIsModalOpen(true);
//   };

//   const handleApprove = (id: string) => {
//     approveProperty(id);
//   };

//   const handleReject = (id: string) => {
//     if (window.confirm("Are you sure you want to reject this property?")) {
//       rejectProperty(id);
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     const styles = {
//       approved: "bg-green-100 text-green-800",
//       pending: "bg-yellow-100 text-yellow-800",
//       rejected: "bg-red-100 text-red-800",
//     };
//     return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800";
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//           Properties Management
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400">
//           Manage all properties across the platform
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
//           <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
//             Total Properties
//           </h3>
//           <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
//             {properties.length}
//           </p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
//           <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
//             Approved
//           </h3>
//           <p className="text-2xl font-bold text-green-600 mt-1">
//             {properties.filter((p) => p.status === "approved").length}
//           </p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
//           <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
//             Pending
//           </h3>
//           <p className="text-2xl font-bold text-yellow-600 mt-1">
//             {properties.filter((p) => p.status === "pending").length}
//           </p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
//           <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
//             Rejected
//           </h3>
//           <p className="text-2xl font-bold text-red-600 mt-1">
//             {properties.filter((p) => p.status === "rejected").length}
//           </p>
//         </div>
//       </div>

//       {/* Filters and Search */}
//       <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search properties..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//             />
//           </div>
//           <select
//             value={filterCategory}
//             onChange={(e) => setFilterCategory(e.target.value)}
//             className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//           >
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat.charAt(0).toUpperCase() + cat.slice(1)}
//               </option>
//             ))}
//           </select>
//           <select
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//             className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//           >
//             {statuses.map((status) => (
//               <option key={status} value={status}>
//                 {status.charAt(0).toUpperCase() + status.slice(1)}
//               </option>
//             ))}
//           </select>
//           <button
//             onClick={handleAddNew}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
//           >
//             <Plus className="w-5 h-5" />
//             Add Property
//           </button>
//         </div>
//       </div>

//       {/* Properties Table */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 dark:bg-gray-700">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Property
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Category
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Price
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Agent
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Views
//                 </th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//               {filteredProperties.map((property) => (
//                 <tr
//                   key={property.id}
//                   className="hover:bg-gray-50 dark:hover:bg-gray-700"
//                 >
//                   <td className="px-6 py-4">
//                     <div className="flex items-center">
//                       <img
//                         src={property.images[0] || "/placeholder.svg"}
//                         alt={property.title}
//                         className="w-12 h-12 rounded object-cover"
//                       />
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900 dark:text-white">
//                           {property.title}
//                         </div>
//                         <div className="text-sm text-gray-500 dark:text-gray-400">
//                           {property.location}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
//                       {property.category}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
//                     ₦{property.price.toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
//                     {property.agentName}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
//                         property.status
//                       )}`}
//                     >
//                       {property.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
//                     {property.views}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex justify-end gap-2">
//                       <button
//                         onClick={() => setViewingProperty(property)}
//                         className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
//                         title="View"
//                       >
//                         <Eye className="w-5 h-5" />
//                       </button>
//                       <button
//                         onClick={() => handleEdit(property)}
//                         className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400"
//                         title="Edit"
//                       >
//                         <Edit className="w-5 h-5" />
//                       </button>
//                       {property.status === "pending" && (
//                         <>
//                           <button
//                             onClick={() => handleApprove(property.id)}
//                             className="text-green-600 hover:text-green-900 dark:text-green-400"
//                             title="Approve"
//                           >
//                             <Check className="w-5 h-5" />
//                           </button>
//                           <button
//                             onClick={() => handleReject(property.id)}
//                             className="text-red-600 hover:text-red-900 dark:text-red-400"
//                             title="Reject"
//                           >
//                             <X className="w-5 h-5" />
//                           </button>
//                         </>
//                       )}
//                       <button
//                         onClick={() => handleDelete(property.id)}
//                         className="text-red-600 hover:text-red-900 dark:text-red-400"
//                         title="Delete"
//                       >
//                         <Trash2 className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Add/Edit Property Modal */}
//       <AddEditPropertyModal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setEditingProperty(null);
//         }}
//         property={editingProperty}
//       />

//       {/* View Property Modal */}
//       {viewingProperty && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                   {viewingProperty.title}
//                 </h2>
//                 <button
//                   onClick={() => setViewingProperty(null)}
//                   className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>
//               <img
//                 src={viewingProperty.images[0] || "/placeholder.svg"}
//                 alt={viewingProperty.title}
//                 className="w-full h-64 object-cover rounded-lg mb-4"
//               />
//               <div className="space-y-4">
//                 <div>
//                   <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
//                     Description
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-400">
//                     {viewingProperty.description}
//                   </p>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <h4 className="font-semibold text-gray-900 dark:text-white">
//                       Price
//                     </h4>
//                     <p className="text-gray-600 dark:text-gray-400">
//                       ₦{viewingProperty.price.toLocaleString()}
//                     </p>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900 dark:text-white">
//                       Location
//                     </h4>
//                     <p className="text-gray-600 dark:text-gray-400">
//                       {viewingProperty.location}
//                     </p>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900 dark:text-white">
//                       Category
//                     </h4>
//                     <p className="text-gray-600 dark:text-gray-400">
//                       {viewingProperty.category}
//                     </p>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900 dark:text-white">
//                       Status
//                     </h4>
//                     <p className="text-gray-600 dark:text-gray-400">
//                       {viewingProperty.status}
//                     </p>
//                   </div>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
//                     Features
//                   </h4>
//                   <div className="flex flex-wrap gap-2">
//                     {viewingProperty.features.map((feature, index) => (
//                       <span
//                         key={index}
//                         className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
//                       >
//                         {feature}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
