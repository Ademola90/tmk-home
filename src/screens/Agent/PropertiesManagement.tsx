"use client";

import { useState } from "react";
import { Plus, Search, Eye, Edit, Trash2, Check, X } from "lucide-react";
import { usePropertyStore } from "../../store/usePropertyStore";
import { useToastStore } from "../../store/useToastStore";
import AddEditPropertyModal from "../../components/dashboard/AddEditPropertyModal";
import type { Property } from "../../types/property";

export default function AdminPropertiesManagement() {
  const { properties, deleteProperty, approveProperty, rejectProperty } =
    usePropertyStore();
  const { addToast } = useToastStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || property.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      deleteProperty(id);
      addToast("Property deleted successfully", "success");
    }
  };

  const handleApprove = (id: string) => {
    approveProperty(id);
    addToast("Property approved successfully", "success");
  };

  const handleReject = (id: string) => {
    rejectProperty(id);
    addToast("Property rejected", "info");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Properties Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and approve properties
          </p>
        </div>
        <button
          onClick={() => {
            setEditingProperty(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Property
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex gap-4">
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
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div
            key={property.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <img
              src={property.images[0] || "/placeholder.svg"}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {property.title}
                </h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    property.status === "available"
                      ? "bg-green-100 text-green-800"
                      : property.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {property.status}
                </span>
              </div>
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
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => {
                    setEditingProperty(property);
                    setIsModalOpen(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                {property.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(property.id)}
                      className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      title="Approve"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleReject(property.id)}
                      className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      title="Reject"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDelete(property.id)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
