import { useState } from "react";
import { motion } from "framer-motion";
import { FiFilter, FiX } from "react-icons/fi";
import type { PropertyFilter } from "../../types/property";
import Button from "../common/Button";
import LocationSelector from "../location/LocationSelector";

interface PropertyFiltersProps {
  filters: PropertyFilter;
  onFiltersChange: (filters: PropertyFilter) => void;
  onClearFilters: () => void;
}

const PropertyFilters = ({
  filters,
  onFiltersChange,
  onClearFilters,
}: PropertyFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<PropertyFilter>(filters);

  const propertyTypes = [
    { value: "house", label: "House" },
    { value: "apartment", label: "Apartment" },
    { value: "condo", label: "Condo" },
    { value: "townhouse", label: "Townhouse" },
  ];

  const bedroomOptions = [1, 2, 3, 4, 5];
  const bathroomOptions = [1, 2, 3, 4];

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    onClearFilters();
    setIsOpen(false);
  };

  const handleStateChange = (state: string) => {
    setLocalFilters({
      ...localFilters,
      state,
      lga: undefined, // Clear LGA when state changes
    });
  };

  const handleLGAChange = (lga: string) => {
    setLocalFilters({
      ...localFilters,
      lga,
    });
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 font-normal text-white ${
          hasActiveFilters ? "border-primary text-primary" : ""
        }`}
      >
        <FiFilter className="w-4 h-4" />
        <span>Filters</span>
        {hasActiveFilters && (
          <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
            {Object.keys(filters).length}
          </span>
        )}
      </Button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-full left-0 mt-2 w-96 bg-card border border-border rounded-lg shadow-lg p-6 z-50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Filters</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Price Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={localFilters.minPrice || ""}
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      minPrice: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    })
                  }
                  className="px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={localFilters.maxPrice || ""}
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      maxPrice: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    })
                  }
                  className="px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Property Type
              </label>
              <select
                value={localFilters.type || ""}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    type:
                      (e.target.value as PropertyFilter["type"]) || undefined,
                  })
                }
                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Types</option>
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Minimum Bedrooms
              </label>
              <select
                value={localFilters.bedrooms || ""}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    bedrooms: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Any</option>
                {bedroomOptions.map((num) => (
                  <option key={num} value={num}>
                    {num}+ bedroom{num > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Minimum Bathrooms
              </label>
              <select
                value={localFilters.bathrooms || ""}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    bathrooms: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Any</option>
                {bathroomOptions.map((num) => (
                  <option key={num} value={num}>
                    {num}+ bathroom{num > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Location (Nigeria)
              </label>
              <LocationSelector
                selectedState={localFilters.state}
                selectedLGA={localFilters.lga}
                onStateChange={handleStateChange}
                onLGAChange={handleLGAChange}
                className="space-y-2"
              />
            </div>
          </div>

          <div className="flex space-x-2 mt-6">
            <Button onClick={handleApplyFilters} className="flex-1">
              Apply Filters
            </Button>
            <Button variant="outline" onClick={handleClearFilters}>
              Clear
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PropertyFilters;
