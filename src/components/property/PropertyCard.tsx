import type React from "react";

import { motion } from "framer-motion";
import { FiMaximize2, FiMapPin, FiHeart } from "react-icons/fi";
// import type { Property } from "../../types/property";
// import { useAuthStore } from "../../store/useAuthStore";
// import { useToastStore } from "../../store/useToastStore";
import { FaBath, FaBed } from "react-icons/fa";
import type { Property } from "../../types/property";
import { useAuthStore } from "../../store/useAuthStore";
import { useToastStore } from "../../store/useToastStore";

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
}

const PropertyCard = ({ property, onClick }: PropertyCardProps) => {
  const { isAuthenticated } = useAuthStore();
  const { addToast } = useToastStore();

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      addToast("Please login to save favorites", "error");
      return;
    }
    addToast("Added to favorites", "success");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-xl shadow-lg overflow-hidden cursor-pointer group text-[#fff] border border-gray-500"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={property.images[0] || "/placeholder.svg"}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <FiHeart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>
        <div className="absolute bottom-3 left-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              property.status === "available"
                ? "bg-accent text-accent-foreground"
                : property.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg truncate font-normal text-foreground group-hover:text-primary transition-colors">
            {property.title}
          </h3>
        </div>
        <div>
          <p className="text-xl font-semibold text-primary mb-2">
            {formatPrice(property.price)}
          </p>
        </div>

        <div className="flex items-center font-normal text-muted-foreground mb-3">
          <FiMapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        <p className="text-sm text-muted-foreground font-normal mb-4 line-clamp-2">
          {property.description}
        </p>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <FaBed className="w-4 h-4 mr-1" />
              <span>{property.bedrooms} bed</span>
            </div>
            <div className="flex items-center">
              <FaBath className="w-4 h-4 mr-1" />
              <span>{property.bathrooms} bath</span>
            </div>
            <div className="flex items-center">
              <FiMaximize2 className="w-4 h-4 mr-1" />
              <span>{property.area} sqft</span>
            </div>
          </div>
        </div>

        {/* <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
              <span className="text-sm font-medium text-primary">
                {property.agent.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {property.agent.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {property.agent.phone}
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </motion.div>
  );
};

export default PropertyCard;
