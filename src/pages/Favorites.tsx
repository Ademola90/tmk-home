"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiHeart, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/sections/Footer";
import PropertyCard from "../components/property/PropertyCard";
import { usePropertyStore } from "../store/usePropertyStore";

const Favorites = () => {
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  const navigate = useNavigate();
  const { properties } = usePropertyStore();
  const [favorites, setFavorites] = useState(properties.slice(0, 3));

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex items-center space-x-3 mb-8">
            <FiHeart className="w-8 h-8 text-red-500" />
            <div>
              <h1 className="text-4xl font-bold text-foreground">
                My Favorites
              </h1>
              <p className="text-muted-foreground">
                Properties you've saved for later
              </p>
            </div>
          </div>

          {/* Favorites List */}
          {favorites.length === 0 ? (
            <div className="text-center py-16 bg-card border border-border rounded-xl">
              <FiHeart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Favorites Yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Start exploring properties and save your favorites
              </p>
              <button
                onClick={() => navigate("/properties")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg transition-colors"
              >
                Browse Properties
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 text-muted-foreground">
                {favorites.length} saved properties
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="relative"
                  >
                    <PropertyCard
                      property={property}
                      onClick={() => navigate(`/property/${property.id}`)}
                    />
                    <button
                      onClick={() => removeFavorite(property.id)}
                      className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-lg shadow-lg transition-colors group"
                    >
                      <FiTrash2 className="w-4 h-4 text-red-600 group-hover:text-red-700" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Favorites;
