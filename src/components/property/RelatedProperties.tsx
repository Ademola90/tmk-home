import { motion } from "framer-motion";
// import { usePropertyStore } from "../../store/usePropertyStore";
// import type { Property } from "../../types/property";
import PropertyCard from "./PropertyCard";
import { useNavigate } from "react-router-dom";
import type { Property } from "../../types/property";
import { usePropertyStore } from "../../store/usePropertyStore";

interface RelatedPropertiesProps {
  currentProperty: Property;
}

const RelatedProperties = ({ currentProperty }: RelatedPropertiesProps) => {
  const { properties, setSelectedProperty } = usePropertyStore();
  const navigate = useNavigate();

  // Filter related properties based on type and location
  const relatedProperties = properties
    .filter(
      (property) =>
        property.id !== currentProperty.id &&
        (property.type === currentProperty.type ||
          property.location.includes(currentProperty.location.split(",")[0]))
    )
    .slice(0, 3);

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    navigate(`/property/${property.id}`);
    window.scrollTo(0, 0);
  };

  if (relatedProperties.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Similar Properties
        </h2>
        <p className="text-muted-foreground">
          Discover other properties that might interest you
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedProperties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <PropertyCard
              property={property}
              onClick={() => handlePropertyClick(property)}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProperties;
