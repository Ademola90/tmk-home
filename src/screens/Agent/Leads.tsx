"use client";

import { useState } from "react";
import { Mail, Phone, MessageSquare, Calendar } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyInterest: string;
  message: string;
  status: "new" | "contacted" | "qualified" | "converted";
  createdAt: string;
}

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+234 813 439 2733",
    propertyInterest: "Modern Downtown Apartment",
    message: "I'm interested in viewing this property. Is it still available?",
    status: "new",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+234 813 439 2744",
    propertyInterest: "Luxury 3 Bedroom Flat",
    message: "Can we schedule a viewing for this weekend?",
    status: "contacted",
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+234 813 439 2755",
    propertyInterest: "Family House with Garden",
    message: "What are the payment terms for this property?",
    status: "qualified",
    createdAt: "2024-01-13",
  },
];

export default function AgentLeads() {
  const [leads] = useState<Lead[]>(mockLeads);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.propertyInterest.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "contacted":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "qualified":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "converted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    qualified: leads.filter((l) => l.status === "qualified").length,
    converted: leads.filter((l) => l.status === "converted").length,
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Leads Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track and manage your property inquiries
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Leads
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {stats.total}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            New
          </h3>
          <p className="text-2xl font-bold text-blue-600 mt-1">{stats.new}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Contacted
          </h3>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {stats.contacted}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Qualified
          </h3>
          <p className="text-2xl font-bold text-purple-600 mt-1">
            {stats.qualified}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Converted
          </h3>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {stats.converted}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
          </select>
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {lead.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Interested in:{" "}
                  <span className="font-medium">{lead.propertyInterest}</span>
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  lead.status
                )}`}
              >
                {lead.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                {lead.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4" />
                {lead.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                {new Date(lead.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-gray-600 dark:text-gray-400 mt-1" />
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {lead.message}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Contact Lead
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                Mark as Qualified
              </button>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                View Property
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">No leads found</p>
        </div>
      )}
    </div>
  );
}

// import { Mail, Phone, MapPin, Calendar } from "lucide-react";

// export default function AgentLeads() {
//   // Mock leads data
//   const leads = [
//     {
//       id: "1",
//       name: "John Doe",
//       email: "john@example.com",
//       phone: "+234 812 345 6789",
//       interest: "3 Bedroom Apartment",
//       location: "Lekki, Lagos",
//       date: "2024-02-20",
//       status: "new",
//     },
//     {
//       id: "2",
//       name: "Jane Smith",
//       email: "jane@example.com",
//       phone: "+234 813 456 7890",
//       interest: "Commercial Space",
//       location: "Victoria Island, Lagos",
//       date: "2024-02-19",
//       status: "contacted",
//     },
//     {
//       id: "3",
//       name: "Michael Brown",
//       email: "michael@example.com",
//       phone: "+234 814 567 8901",
//       interest: "Land",
//       location: "Ogun State",
//       date: "2024-02-18",
//       status: "qualified",
//     },
//   ];

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "new":
//         return "bg-blue-100 text-blue-800";
//       case "contacted":
//         return "bg-yellow-100 text-yellow-800";
//       case "qualified":
//         return "bg-green-100 text-green-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//           Leads
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400">
//           Manage your property inquiries and leads
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
//           <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
//             Total Leads
//           </h3>
//           <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
//             {leads.length}
//           </p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
//           <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
//             New Leads
//           </h3>
//           <p className="text-2xl font-bold text-blue-600 mt-1">
//             {leads.filter((l) => l.status === "new").length}
//           </p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
//           <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
//             Qualified
//           </h3>
//           <p className="text-2xl font-bold text-green-600 mt-1">
//             {leads.filter((l) => l.status === "qualified").length}
//           </p>
//         </div>
//       </div>

//       {/* Leads List */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
//         <div className="p-4 border-b border-gray-200 dark:border-gray-700">
//           <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//             Recent Leads
//           </h2>
//         </div>
//         <div className="divide-y divide-gray-200 dark:divide-gray-700">
//           {leads.map((lead) => (
//             <div
//               key={lead.id}
//               className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//             >
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
//                     {lead.name}
//                   </h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     Interested in: {lead.interest}
//                   </p>
//                 </div>
//                 <span
//                   className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
//                     lead.status
//                   )}`}
//                 >
//                   {lead.status}
//                 </span>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
//                   <Mail className="w-4 h-4" />
//                   {lead.email}
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
//                   <Phone className="w-4 h-4" />
//                   {lead.phone}
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
//                   <MapPin className="w-4 h-4" />
//                   {lead.location}
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
//                   <Calendar className="w-4 h-4" />
//                   {new Date(lead.date).toLocaleDateString()}
//                 </div>
//               </div>
//               <div className="mt-4 flex gap-2">
//                 <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
//                   Contact
//                 </button>
//                 <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
//                   Mark as Qualified
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
