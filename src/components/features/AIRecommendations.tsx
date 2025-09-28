import type React from "react";
import { useState, useEffect } from "react";
import {
  FaRobot,
  FaHeart,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
} from "react-icons/fa";
import { motion } from "framer-motion";
import type { Property } from "../../types/property";
// import type { Property } from "../../types/property";

interface AIRecommendationsProps {
  currentProperty?: Property;
  userPreferences?: {
    budget: number;
    bedrooms: number;
    location: string;
    propertyType: string;
  };
  className?: string;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  currentProperty,
  userPreferences,
  className = "",
}) => {
  const [recommendations, setRecommendations] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  // Mock AI recommendations based on user preferences and current property
  useEffect(() => {
    const generateRecommendations = () => {
      setIsLoading(true);

      // Simulate AI processing time
      setTimeout(() => {
        const mockRecommendations: Property[] = [
          {
            id: "ai-rec-1",
            title: "Modern Family Home",
            description:
              "Perfect for growing families with excellent schools nearby",
            price: 850000,
            location: "Victoria Island, Lagos",
            state: "Lagos",
            lga: "Lagos Island",
            bedrooms: 4,
            bathrooms: 3,
            area: 2800,
            type: "house",
            status: "available",
            images: ["/modern-family-home.png"],
            features: ["Garden", "Garage", "Security System", "Modern Kitchen"],
            agent: {
              id: "agent-1",
              name: "Sarah Johnson",
              email: "sarah@estatein.com",
              phone: "+234 801 234 5678",
              avatar: "/professional-woman-diverse.png",
            },
            createdAt: "2024-01-15",
            updatedAt: "2024-01-15",
          },
          {
            id: "ai-rec-2",
            title: "Luxury Apartment with City View",
            description: "High-end apartment with stunning city skyline views",
            price: 650000,
            location: "Ikoyi, Lagos",
            state: "Lagos",
            lga: "Eti Osa",
            bedrooms: 3,
            bathrooms: 2,
            area: 1800,
            type: "apartment",
            status: "available",
            images: ["/luxury-apartment-city-view.jpg"],
            features: ["City View", "Gym", "Pool", "Concierge"],
            agent: {
              id: "agent-2",
              name: "Michael Chen",
              email: "michael@estatein.com",
              phone: "+234 802 345 6789",
              avatar: "/professional-man.png",
            },
            createdAt: "2024-01-16",
            updatedAt: "2024-01-16",
          },
        ];

        setRecommendations(mockRecommendations);
        setIsLoading(false);
      }, 1500);
    };

    generateRecommendations();
  }, [currentProperty, userPreferences]);

  const reasons = [
    {
      id: "similar-price",
      title: "Similar Price Range",
      description: "Properties within your budget preferences",
      icon: "💰",
    },
    {
      id: "location-match",
      title: "Preferred Location",
      description: "Based on your location preferences",
      icon: "📍",
    },
    {
      id: "size-match",
      title: "Right Size",
      description: "Matches your space requirements",
      icon: "🏠",
    },
    {
      id: "trending",
      title: "Trending Properties",
      description: "Popular choices among similar buyers",
      icon: "📈",
    },
  ];

  if (isLoading) {
    return (
      <div className={`bg-gray-50 rounded-lg p-6 ${className}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <FaRobot className="w-4 h-4 text-white animate-pulse" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            AI Recommendations
          </h2>
        </div>

        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-50 rounded-lg p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <FaRobot className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">
          AI Recommendations
        </h2>
        <span className="text-sm text-gray-500">
          Powered by machine learning
        </span>
      </div>

      {/* Recommendation Reasons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {reasons.map((reason) => (
          <button
            key={reason.id}
            onClick={() =>
              setSelectedReason(selectedReason === reason.id ? null : reason.id)
            }
            className={`p-3 rounded-lg border text-left transition-all ${
              selectedReason === reason.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="text-lg mb-1">{reason.icon}</div>
            <div className="text-sm font-medium text-gray-900">
              {reason.title}
            </div>
            <div className="text-xs text-gray-500">{reason.description}</div>
          </button>
        ))}
      </div>

      {/* Recommended Properties */}
      <div className="space-y-4">
        {recommendations.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <div className="flex gap-4">
              <img
                src={property.images[0] || "/placeholder.svg"}
                alt={property.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-green-600">
                      ₦{property.price.toLocaleString()}
                    </span>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <FaHeart className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt className="w-3 h-3" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaBed className="w-3 h-3" />
                    <span>{property.bedrooms} beds</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaBath className="w-3 h-3" />
                    <span>{property.bathrooms} baths</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaRulerCombined className="w-3 h-3" />
                    <span>{property.area} sqft</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  {property.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={property.agent.avatar || "/placeholder.svg"}
                      alt={property.agent.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-gray-600">
                      {property.agent.name}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                      View Details
                    </button>
                    <button className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Contact Agent
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="text-blue-600 hover:text-blue-700 font-medium">
          View More AI Recommendations →
        </button>
      </div>
    </div>
  );
};

export default AIRecommendations;
