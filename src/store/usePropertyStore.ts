import { create } from "zustand";
import type { Property, PropertyFilter } from "../types/property";

interface PropertyState {
  properties: Property[];
  filteredProperties: Property[];
  filters: PropertyFilter;
  isLoading: boolean;
  selectedProperty: Property | null;
  fetchProperties: () => Promise<void>;
  setFilters: (filters: PropertyFilter) => void;
  setSelectedProperty: (property: Property | null) => void;
  searchProperties: (query: string) => void;
}

// Enhanced mock property data with all categories
const mockProperties: Property[] = [
  // Apartments
  {
    id: "1",
    title: "Modern Downtown Apartment",
    description:
      "Luxurious 2-bedroom apartment in the heart of downtown with stunning city views and premium amenities.",
    price: 675000000,
    location: "Downtown, City Center",
    state: "Lagos",
    lga: "Lagos Island",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: "apartment",
    category: "apartments",
    status: "available",
    images: [
      "/modern-apartment-living-room.png",
      "/modern-apartment-bedroom.png",
      "/modern-apartment-kitchen.png",
    ],
    features: ["City View", "Balcony", "Gym", "Parking", "24/7 Security"],
    agent: {
      id: "agent1",
      name: "Sarah Johnson",
      email: "sarah@realestate.com",
      phone: "+234 813 439 2733",
    },
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Luxury 3 Bedroom Flat",
    description:
      "Spacious 3-bedroom flat with modern finishes in a serene environment.",
    price: 850000000,
    location: "Lekki Phase 1",
    state: "Lagos",
    lga: "Eti-Osa",
    bedrooms: 3,
    bathrooms: 3,
    area: 1500,
    type: "apartment",
    category: "apartments",
    status: "available",
    images: ["/modern-apartment-living-room.png"],
    features: ["Pool", "Generator", "Parking", "Security"],
    agent: {
      id: "agent1",
      name: "Sarah Johnson",
      email: "sarah@realestate.com",
      phone: "+234 813 439 2733",
    },
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
  },
  // Houses
  {
    id: "3",
    title: "Family House with Garden",
    description:
      "Spacious 4-bedroom family home with beautiful garden, perfect for growing families.",
    price: 975000000,
    location: "Suburban Heights",
    state: "Ogun",
    lga: "Ijebu Ode",
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    type: "house",
    category: "houses",
    status: "available",
    images: [
      "/modern-family-house.png",
      "/cozy-family-living-room.png",
      "/family-house-garden.png",
    ],
    features: [
      "Garden",
      "Garage",
      "Fireplace",
      "Walk-in Closet",
      "Laundry Room",
    ],
    agent: {
      id: "agent2",
      name: "Michael Chen",
      email: "michael@realestate.com",
      phone: "+234 813 439 2733",
    },
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
  },
  {
    id: "4",
    title: "5 Bedroom Detached Duplex",
    description: "Luxury detached duplex with all rooms ensuite in an estate.",
    price: 1250000000,
    location: "Banana Island",
    state: "Lagos",
    lga: "Lagos Island",
    bedrooms: 5,
    bathrooms: 5,
    area: 3000,
    type: "house",
    category: "houses",
    status: "available",
    images: ["/modern-family-house.png"],
    features: ["Pool", "Garden", "BQ", "Smart Home", "CCTV"],
    agent: {
      id: "agent2",
      name: "Michael Chen",
      email: "michael@realestate.com",
      phone: "+234 813 439 2733",
    },
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12",
  },
  // Hostels
  {
    id: "5",
    title: "Student Self-Contained Hostel",
    description:
      "Modern self-contained room near university campus with WiFi and 24/7 power.",
    price: 3500000,
    location: "Near University of Lagos",
    state: "Lagos",
    lga: "Yaba",
    bedrooms: 1,
    bathrooms: 1,
    area: 350,
    type: "apartment",
    category: "hostels",
    status: "available",
    images: ["/modern-apartment-bedroom.png"],
    features: ["WiFi", "24/7 Power", "Water", "Security", "Study Desk"],
    agent: {
      id: "agent1",
      name: "Sarah Johnson",
      email: "sarah@realestate.com",
      phone: "+234 813 439 2733",
    },
    createdAt: "2024-01-18",
    updatedAt: "2024-01-18",
  },
  // Commercial
  {
    id: "6",
    title: "Prime Commercial Plaza",
    description:
      "3-storey commercial plaza in busy business district, perfect for offices or retail.",
    price: 2500000000,
    location: "VI Business District",
    state: "Lagos",
    lga: "Lagos Island",
    bedrooms: 0,
    bathrooms: 10,
    area: 5000,
    type: "condo",
    category: "commercial",
    status: "available",
    images: ["/modern-luxury-real-estate-properties-skyline.jpg"],
    features: ["Elevator", "Parking", "Generator", "Security", "Central AC"],
    agent: {
      id: "agent2",
      name: "Michael Chen",
      email: "michael@realestate.com",
      phone: "+234 813 439 2733",
    },
    createdAt: "2024-01-08",
    updatedAt: "2024-01-08",
  },
  // Land
  {
    id: "7",
    title: "Residential Land in Lekki",
    description:
      "1000sqm of land in a gated estate with C of O, perfect for building your dream home.",
    price: 450000000,
    location: "Lekki Phase 2",
    state: "Lagos",
    lga: "Eti-Osa",
    bedrooms: 0,
    bathrooms: 0,
    area: 1000,
    type: "house",
    category: "land",
    status: "available",
    images: ["/family-house-garden.png"],
    features: ["C of O", "Gated Estate", "Good Road", "Electricity", "Water"],
    agent: {
      id: "agent1",
      name: "Sarah Johnson",
      email: "sarah@realestate.com",
      phone: "+234 813 439 2733",
    },
    createdAt: "2024-01-22",
    updatedAt: "2024-01-22",
  },
  // Luxury
  {
    id: "8",
    title: "Luxury Penthouse Suite",
    description:
      "Exclusive penthouse with panoramic views, private elevator, and premium finishes throughout.",
    price: 1800000000,
    location: "Uptown District",
    state: "Lagos",
    lga: "Ikoyi",
    bedrooms: 3,
    bathrooms: 3,
    area: 2000,
    type: "apartment",
    category: "luxury",
    status: "available",
    images: [
      "/luxury-penthouse-living-room.png",
      "/luxury-penthouse-terrace.png",
      "/luxury-penthouse-bedroom.png",
    ],
    features: [
      "Panoramic View",
      "Private Elevator",
      "Terrace",
      "Wine Cellar",
      "Smart Home",
    ],
    agent: {
      id: "agent1",
      name: "Sarah Johnson",
      email: "sarah@realestate.com",
      phone: "+234 813 439 2733",
    },
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
  },
  // Short Let
  {
    id: "9",
    title: "Luxury Short Let Apartment",
    description:
      "Fully furnished 2-bedroom apartment available for daily/weekly rentals.",
    price: 150000,
    location: "Lekki Phase 1",
    state: "Lagos",
    lga: "Eti-Osa",
    bedrooms: 2,
    bathrooms: 2,
    area: 1000,
    type: "apartment",
    category: "shortlet",
    status: "available",
    images: ["/modern-apartment-living-room.png"],
    features: ["WiFi", "DSTV", "Generator", "Pool", "Gym"],
    agent: {
      id: "agent2",
      name: "Michael Chen",
      email: "michael@realestate.com",
      phone: "+234 813 439 2733",
    },
    createdAt: "2024-01-25",
    updatedAt: "2024-01-25",
  },
  // Events
  {
    id: "10",
    title: "Luxury Event Hall",
    description:
      "Spacious event hall with 500 guest capacity, perfect for weddings and corporate events.",
    price: 500000,
    location: "Ikeja GRA",
    state: "Lagos",
    lga: "Ikeja",
    bedrooms: 0,
    bathrooms: 4,
    area: 3000,
    type: "condo",
    category: "events",
    status: "available",
    images: ["/modern-office-consultation.jpg"],
    features: ["Parking", "AC", "Chairs", "Tables", "Sound System"],
    agent: {
      id: "agent1",
      name: "Sarah Johnson",
      email: "sarah@realestate.com",
      phone: "+234 813 439 2733",
    },
    createdAt: "2024-01-28",
    updatedAt: "2024-01-28",
  },
];

export const usePropertyStore = create<PropertyState>((set, get) => ({
  properties: [],
  filteredProperties: [],
  filters: {},
  isLoading: false,
  selectedProperty: null,

  fetchProperties: async () => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({
        properties: mockProperties,
        filteredProperties: mockProperties,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      set({ isLoading: false });
    }
  },

  setFilters: (filters: PropertyFilter) => {
    set({ filters });
    const { properties } = get();

    const filtered = properties.filter((property) => {
      if (filters.minPrice && property.price < filters.minPrice) return false;
      if (filters.maxPrice && property.price > filters.maxPrice) return false;
      if (filters.bedrooms && property.bedrooms < filters.bedrooms)
        return false;
      if (filters.bathrooms && property.bathrooms < filters.bathrooms)
        return false;
      if (filters.type && property.type !== filters.type) return false;
      // Only filter by category if explicitly set
      if (filters.category && property.category !== filters.category)
        return false;
      if (
        filters.location &&
        !property.location
          .toLowerCase()
          .includes(filters.location.toLowerCase())
      )
        return false;
      return true;
    });

    set({ filteredProperties: filtered });
  },

  setSelectedProperty: (property: Property | null) => {
    set({ selectedProperty: property });
  },

  searchProperties: (query: string) => {
    const { properties, filters } = get();

    let filtered = properties;

    // Only apply category filter if it exists
    if (filters.category) {
      filtered = filtered.filter(
        (property) => property.category === filters.category
      );
    }

    // Apply search query
    if (query.trim()) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(query.toLowerCase()) ||
          property.description.toLowerCase().includes(query.toLowerCase()) ||
          property.location.toLowerCase().includes(query.toLowerCase())
      );
    }

    set({ filteredProperties: filtered });
  },
}));

// import { create } from "zustand";
// import type { Property, PropertyFilter } from "../types/property";
// import pone from "../assets/Pone.png";
// import ptwo from "../assets/ptwo.png";
// import pthree from "../assets/pthree.png";
// import pfour from "../assets/pfour.png";
// import pfive from "../assets/pfive.png";
// import psix from "../assets/psix.png";
// import pseven from "../assets/pseven.png";

// interface PropertyState {
//   properties: Property[];
//   filteredProperties: Property[];
//   filters: PropertyFilter;
//   isLoading: boolean;
//   selectedProperty: Property | null;
//   fetchProperties: () => Promise<void>;
//   setFilters: (filters: PropertyFilter) => void;
//   setSelectedProperty: (property: Property | null) => void;
//   searchProperties: (query: string) => void;
// }

// // Mock property data - Add missing required fields
// const mockProperties: Property[] = [
//   {
//     id: "1",
//     title: "Modern Downtown Apartment",
//     description:
//       "Luxurious 2-bedroom apartment in the heart of downtown with stunning city views and premium amenities.",
//     price: 450000,
//     location: "Downtown, City Center",
//     state: "Oyo State", // Added missing field
//     lga: "Oyo", // Added missing field
//     bedrooms: 2,
//     bathrooms: 2,
//     area: 1200,
//     type: "apartment",
//     status: "available",
//     images: [pone, ptwo, pthree, pfour],
//     features: ["City View", "Balcony", "Gym", "Parking", "24/7 Security"],
//     agent: {
//       id: "agent1",
//       name: "Sarah Johnson",
//       email: "sarah@realestate.com",
//       phone: "+1 (555) 123-4567",
//     },
//     createdAt: "2024-01-15",
//     updatedAt: "2024-01-15",
//   },
//   {
//     id: "2",
//     title: "Family House with Garden",
//     description:
//       "Spacious 4-bedroom family home with beautiful garden, perfect for growing families.",
//     price: 650000,
//     location: "Suburban Heights",
//     state: "Osun",
//     lga: "Irewole",
//     bedrooms: 4,
//     bathrooms: 3,
//     area: 2500,
//     type: "house",
//     status: "available",
//     images: [pfive, psix, pseven],
//     features: [
//       "Garden",
//       "Garage",
//       "Fireplace",
//       "Walk-in Closet",
//       "Laundry Room",
//     ],
//     agent: {
//       id: "agent2",
//       name: "Michael Chen",
//       email: "michael@realestate.com",
//       phone: "+1 (555) 987-6543",
//     },
//     createdAt: "2024-01-10",
//     updatedAt: "2024-01-10",
//   },
//   {
//     id: "3",
//     title: "Luxury Penthouse Suite",
//     description:
//       "Exclusive penthouse with panoramic views, private elevator, and premium finishes throughout.",
//     price: 1200000,
//     location: "Uptown District",
//     state: "Osun State",
//     lga: "Iwo",
//     bedrooms: 3,
//     bathrooms: 3,
//     area: 2000,
//     type: "apartment",
//     status: "available",
//     images: [pone, ptwo, pthree, pfour],
//     features: [
//       "Panoramic View",
//       "Private Elevator",
//       "Terrace",
//       "Wine Cellar",
//       "Smart Home",
//     ],
//     agent: {
//       id: "agent1",
//       name: "Sarah Johnson",
//       email: "sarah@realestate.com",
//       phone: "+1 (555) 123-4567",
//     },
//     createdAt: "2024-01-20",
//     updatedAt: "2024-01-20",
//   },
// ];

// export const usePropertyStore = create<PropertyState>((set, get) => ({
//   properties: [],
//   filteredProperties: [],
//   filters: {},
//   isLoading: false,
//   selectedProperty: null,

//   fetchProperties: async () => {
//     set({ isLoading: true });
//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       set({
//         properties: mockProperties,
//         filteredProperties: mockProperties,
//         isLoading: false,
//       });
//     } catch (error) {
//       console.error("Failed to fetch properties:", error);
//       set({ isLoading: false });
//     }
//   },

//   setFilters: (filters: PropertyFilter) => {
//     set({ filters });
//     const { properties } = get();

//     const filtered = properties.filter((property) => {
//       if (filters.minPrice && property.price < filters.minPrice) return false;
//       if (filters.maxPrice && property.price > filters.maxPrice) return false;
//       if (filters.bedrooms && property.bedrooms < filters.bedrooms)
//         return false;
//       if (filters.bathrooms && property.bathrooms < filters.bathrooms)
//         return false;
//       if (filters.type && property.type !== filters.type) return false;
//       if (
//         filters.location &&
//         !property.location
//           .toLowerCase()
//           .includes(filters.location.toLowerCase())
//       )
//         return false;
//       return true;
//     });

//     set({ filteredProperties: filtered });
//   },

//   setSelectedProperty: (property: Property | null) => {
//     set({ selectedProperty: property });
//   },

//   searchProperties: (query: string) => {
//     const { properties } = get();
//     if (!query.trim()) {
//       set({ filteredProperties: properties });
//       return;
//     }

//     const filtered = properties.filter(
//       (property) =>
//         property.title.toLowerCase().includes(query.toLowerCase()) ||
//         property.description.toLowerCase().includes(query.toLowerCase()) ||
//         property.location.toLowerCase().includes(query.toLowerCase())
//     );

//     set({ filteredProperties: filtered });
//   },
// }));
