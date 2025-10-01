"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { FiSearch, FiGrid, FiList } from "react-icons/fi"
import PropertyCard from "../components/property/PropertyCard"
import PropertyFilters from "../components/property/PropertyFilters"
import Button from "../components/common/Button"
import Navbar from "../components/nav/Navbar"
import Footer from "../components/sections/Footer"
import { usePropertyStore } from "../store/usePropertyStore"
import { PROPERTY_CATEGORIES, type PropertyCategory as PropertyCategoryType } from "../types/property"
import type { Property } from "../types/property"

const PropertyCategory = () => {
  const { category } = useParams<{ category: string }>()
  const navigate = useNavigate()
  const { properties, filters, isLoading, fetchProperties, setFilters, searchProperties, setSelectedProperty } =
    usePropertyStore()

  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const categoryInfo = category ? PROPERTY_CATEGORIES[category as keyof typeof PROPERTY_CATEGORIES] : null

  useEffect(() => {
    if (properties.length === 0) {
      fetchProperties()
    }
  }, [properties.length, fetchProperties])

  useEffect(() => {
    // Set category filter when page loads
    if (category) {
      setFilters({ ...filters, category: category as PropertyCategoryType })
    }
  }, [category])

  // Filter properties by category
  const categoryProperties = properties.filter((property) => property.category === category)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    searchProperties(searchQuery)
  }

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property)
    navigate(`/property/${property.id}`)
  }

  const handleClearFilters = () => {
    setFilters({ category: category as PropertyCategoryType })
    setSearchQuery("")
    searchProperties("")
  }

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Category Not Found</h2>
            <p className="text-muted-foreground mb-6">The property category you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/properties")}>Browse All Properties</Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('/modern-luxury-real-estate-properties-skyline.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">{categoryInfo.title}</h1>
            <p className="text-xl text-gray-100 max-w-2xl mx-auto drop-shadow-md">{categoryInfo.description}</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder={`Search ${categoryInfo.title.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white/95 backdrop-blur-sm"
              />
              <Button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <PropertyFilters filters={filters} onFiltersChange={setFilters} onClearFilters={handleClearFilters} />
              <div className="text-sm text-muted-foreground">{categoryProperties.length} properties found</div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md ${
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md ${
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : categoryProperties.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <h3 className="text-xl font-semibold text-foreground mb-2">No properties found</h3>
              <p className="text-muted-foreground mb-4">
                We don't have any {categoryInfo.title.toLowerCase()} available at the moment
              </p>
              <Button onClick={() => navigate("/properties")} variant="outline">
                Browse All Properties
              </Button>
            </motion.div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {categoryProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <PropertyCard property={property} onClick={() => handlePropertyClick(property)} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PropertyCategory
