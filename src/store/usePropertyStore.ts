import { create } from "zustand";
import type { Property, PropertyFilter } from "../types/property";
import pone from "../assets/Pone.png";
import ptwo from "../assets/Ptwo.png";
import pthree from "../assets/Pthree.png";
import pfour from "../assets/Pfour.png";
import pfive from "../assets/pfive.png";
import psix from "../assets/psix.png";
import pseven from "../assets/pseven.png";

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

// Mock property data - Add missing required fields
const mockProperties: Property[] = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    description:
      "Luxurious 2-bedroom apartment in the heart of downtown with stunning city views and premium amenities.",
    price: 450000,
    location: "Downtown, City Center",
    state: "Oyo State", // Added missing field
    lga: "Oyo", // Added missing field
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: "apartment",
    status: "available",
    images: [pone, ptwo, pthree, pfour],
    features: ["City View", "Balcony", "Gym", "Parking", "24/7 Security"],
    agent: {
      id: "agent1",
      name: "Sarah Johnson",
      email: "sarah@realestate.com",
      phone: "+1 (555) 123-4567",
    },
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Family House with Garden",
    description:
      "Spacious 4-bedroom family home with beautiful garden, perfect for growing families.",
    price: 650000,
    location: "Suburban Heights",
    state: "Osun",
    lga: "Irewole", // Added missing field
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    type: "house",
    status: "available",
    images: [pfive, psix, pseven],
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
      phone: "+1 (555) 987-6543",
    },
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
  },
  {
    id: "3",
    title: "Luxury Penthouse Suite",
    description:
      "Exclusive penthouse with panoramic views, private elevator, and premium finishes throughout.",
    price: 1200000,
    location: "Uptown District",
    state: "Osun State",
    lga: "Iwo",
    bedrooms: 3,
    bathrooms: 3,
    area: 2000,
    type: "apartment",
    status: "available",
    images: [pone, ptwo, pthree, pfour],
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
      phone: "+1 (555) 123-4567",
    },
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
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
      // Simulate API call
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
    const { properties } = get();
    if (!query.trim()) {
      set({ filteredProperties: properties });
      return;
    }

    const filtered = properties.filter(
      (property) =>
        property.title.toLowerCase().includes(query.toLowerCase()) ||
        property.description.toLowerCase().includes(query.toLowerCase()) ||
        property.location.toLowerCase().includes(query.toLowerCase())
    );

    set({ filteredProperties: filtered });
  },
}));

// import { create } from "zustand";
// import type { Property, PropertyFilter } from "../types/property";
// // import type { Property, PropertyFilter } from "../types/property";

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

// // Mock property data
// const mockProperties: Property[] = [
//   {
//     id: "1",
//     title: "Modern Downtown Apartment",
//     description:
//       "Luxurious 2-bedroom apartment in the heart of downtown with stunning city views and premium amenities.",
//     price: 450000,
//     location: "Downtown, City Center",
//     bedrooms: 2,
//     bathrooms: 2,
//     area: 1200,
//     type: "apartment",
//     status: "available",
//     images: [
//       "/modern-apartment-living-room.png",
//       "/modern-apartment-bedroom.png",
//       "/modern-apartment-kitchen.png",
//     ],
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
//     bedrooms: 4,
//     bathrooms: 3,
//     area: 2500,
//     type: "house",
//     status: "available",
//     images: [
//       "/modern-family-house.png",
//       "/cozy-family-living-room.png",
//       "/family-house-garden.png",
//     ],
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
//     bedrooms: 3,
//     bathrooms: 3,
//     area: 2000,
//     type: "apartment",
//     status: "available",
//     images: [
//       "/luxury-penthouse-living-room.png",
//       "/luxury-penthouse-terrace.png",
//       "/luxury-penthouse-bedroom.png",
//     ],
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
