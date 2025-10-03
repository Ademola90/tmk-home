"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiGrid,
  FiList,
  FiHome,
  FiMapPin,
  FiDollarSign,
} from "react-icons/fi";
import PropertyCard from "../components/property/PropertyCard";
import PropertyFilters from "../components/property/PropertyFilters";
import Button from "../components/common/Button";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/sections/Footer";
import { usePropertyStore } from "../store/usePropertyStore";
import {
  PROPERTY_CATEGORIES,
  type PropertyCategory as PropertyCategoryType,
} from "../types/property";
import type { Property } from "../types/property";

// Category-specific hero configurations
const categoryHeroConfig = {
  apartments: {
    gradient: "from-blue-600 via-blue-700 to-purple-800",
    icon: "🏢",
    stats: [
      { label: "Available Units", value: "150+" },
      { label: "Avg. Price", value: "₦45M" },
      { label: "Locations", value: "25+" },
    ],
  },
  houses: {
    gradient: "from-green-600 via-emerald-700 to-teal-800",
    icon: "🏠",
    stats: [
      { label: "Family Homes", value: "85+" },
      { label: "Avg. Price", value: "₦75M" },
      { label: "Neighborhoods", value: "18+" },
    ],
  },
  hostels: {
    gradient: "from-orange-600 via-red-600 to-pink-700",
    icon: "🎓",
    stats: [
      { label: "Student Rooms", value: "200+" },
      { label: "Avg. Rent", value: "₦350K/yr" },
      { label: "Campuses", value: "12+" },
    ],
  },
  commercial: {
    gradient: "from-indigo-600 via-purple-700 to-pink-800",
    icon: "🏢",
    stats: [
      { label: "Office Spaces", value: "45+" },
      { label: "Avg. Price", value: "₦120M" },
      { label: "Districts", value: "8+" },
    ],
  },
  industrial: {
    gradient: "from-gray-700 via-slate-800 to-zinc-900",
    icon: "🏭",
    stats: [
      { label: "Warehouses", value: "30+" },
      { label: "Avg. Size", value: "5000 sqft" },
      { label: "Zones", value: "6+" },
    ],
  },
  land: {
    gradient: "from-amber-600 via-orange-700 to-red-800",
    icon: "🌍",
    stats: [
      { label: "Plots", value: "120+" },
      { label: "Avg. Price", value: "₦25M" },
      { label: "Estates", value: "15+" },
    ],
  },
  luxury: {
    gradient: "from-yellow-500 via-amber-600 to-orange-700",
    icon: "💎",
    stats: [
      { label: "Elite Properties", value: "35+" },
      { label: "Starting From", value: "₦200M" },
      { label: "Prime Areas", value: "10+" },
    ],
  },
  shortlet: {
    gradient: "from-cyan-600 via-blue-700 to-indigo-800",
    icon: "🏖️",
    stats: [
      { label: "Apartments", value: "60+" },
      { label: "Daily Rate", value: "From ₦50K" },
      { label: "Locations", value: "20+" },
    ],
  },
  events: {
    gradient: "from-pink-600 via-rose-700 to-red-800",
    icon: "🎉",
    stats: [
      { label: "Venues", value: "25+" },
      { label: "Capacity", value: "50-1000" },
      { label: "Areas", value: "12+" },
    ],
  },
};

const PropertyCategory = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const {
    properties,
    filters,
    isLoading,
    fetchProperties,
    setFilters,
    searchProperties,
    setSelectedProperty,
  } = usePropertyStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categoryInfo = category
    ? PROPERTY_CATEGORIES[category as keyof typeof PROPERTY_CATEGORIES]
    : null;
  const heroConfig = category
    ? categoryHeroConfig[category as keyof typeof categoryHeroConfig]
    : null;

  useEffect(() => {
    if (properties.length === 0) {
      fetchProperties();
    }
  }, [properties.length, fetchProperties]);

  useEffect(() => {
    if (category) {
      setFilters({ ...filters, category: category as PropertyCategoryType });
    }
  }, [category]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  const categoryProperties = properties.filter(
    (property) => property.category === category
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchProperties(searchQuery);
  };

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    navigate(`/property/${property.id}`);
  };

  const handleClearFilters = () => {
    setFilters({ category: category as PropertyCategoryType });
    setSearchQuery("");
    searchProperties("");
  };

  if (!categoryInfo || !heroConfig) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Category Not Found
            </h2>
            <p className="text-muted-foreground mb-6">
              The property category you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate("/properties")}>
              Browse All Properties
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Enhanced Hero Section */}
      <section
        className={`relative bg-gradient-to-br  ${heroConfig.gradient} py-24 overflow-hidden`}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white mb-12"
          >
            {/* Category Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-8xl mb-6"
            >
              {heroConfig.icon}
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
              {categoryInfo.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg mb-8">
              {categoryInfo.description}
            </p>

            {/* Category Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
              {heroConfig.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
                >
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Search Bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            onSubmit={handleSearch}
            className="max-w-3xl mx-auto"
          >
            <div className="relative">
              <FiSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder={`Search ${categoryInfo.title.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-4 py-5 text-lg border-none rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/30 bg-white/95 backdrop-blur-sm shadow-2xl"
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-8 py-3"
              >
                Search
              </Button>
            </div>
          </motion.form>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-16 fill-current text-background"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <PropertyFilters
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={handleClearFilters}
              />
              <div className="flex items-center text-muted-foreground text-white">
                <FiMapPin className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">
                  {categoryProperties.length} properties
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Properties Grid */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mb-4"></div>
              <p className="text-muted-foreground">Loading properties...</p>
            </div>
          ) : categoryProperties.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-card border-2 border-dashed border-border rounded-2xl"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                No Properties Found
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We don't have any {categoryInfo.title.toLowerCase()} available
                at the moment. Check back soon!
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => navigate("/properties")}
                  variant="outline"
                >
                  Browse All Properties
                </Button>
                <Button onClick={handleClearFilters}>Clear Filters</Button>
              </div>
            </motion.div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {categoryProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                >
                  <PropertyCard
                    property={property}
                    onClick={() => handlePropertyClick(property)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Category-Specific Features Section */}
      <section
        className={`py-16 bg-gradient-to-br  ${heroConfig.gradient} text-white`}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose {categoryInfo.title}?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover the benefits and features of{" "}
              {categoryInfo.title.toLowerCase()}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <FiHome className="w-12 h-12" />,
                title: "Premium Selection",
                description:
                  "Carefully curated properties that meet our quality standards",
              },
              {
                icon: <FiMapPin className="w-12 h-12" />,
                title: "Prime Locations",
                description:
                  "Properties in the most sought-after areas across Nigeria",
              },
              {
                icon: <FiDollarSign className="w-12 h-12" />,
                title: "Best Prices",
                description:
                  "Competitive pricing with transparent transaction processes",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center hover:bg-white/20 transition-all"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropertyCategory;
