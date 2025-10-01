export type PropertyCategory =
  | "apartments"
  | "houses"
  | "hostels"
  | "commercial"
  | "industrial"
  | "land"
  | "luxury"
  | "shortlet"
  | "events";

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  state: string;
  lga: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: "house" | "apartment" | "condo" | "townhouse";
  category: PropertyCategory;
  status: "available" | "sold" | "pending";
  images: string[];
  features: string[];
  agent: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilter {
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  type?: Property["type"];
  category?: PropertyCategory;
  location?: string;
  state?: string;
  lga?: string;
}

export const PROPERTY_CATEGORIES = {
  apartments: {
    title: "Apartments & Flats",
    description: "Self-contained, mini-flats, 2-4 bedroom flats",
    slug: "apartments",
  },
  houses: {
    title: "Houses",
    description: "Duplexes, bungalows, terraced houses, mansions",
    slug: "houses",
  },
  hostels: {
    title: "Hostels / Student Accommodation",
    description: "Single rooms, shared apartments, purpose-built hostels",
    slug: "hostels",
  },
  commercial: {
    title: "Commercial Properties",
    description: "Shops, plazas, malls, offices, co-working spaces",
    slug: "commercial",
  },
  industrial: {
    title: "Industrial Properties",
    description: "Warehouses, factories, workshops",
    slug: "industrial",
  },
  land: {
    title: "Land & Plots",
    description: "Residential land, commercial land, agricultural land",
    slug: "land",
  },
  luxury: {
    title: "Luxury Properties",
    description: "Villas, penthouses, waterfront homes, smart homes",
    slug: "luxury",
  },
  shortlet: {
    title: "Short Let / Airbnb",
    description: "Daily/weekly rentals, serviced apartments",
    slug: "shortlet",
  },
  events: {
    title: "Event Spaces",
    description: "Halls, gardens, conference centers",
    slug: "events",
  },
} as const;

// export interface Property {
//   id: string;
//   title: string;
//   description: string;
//   price: number;
//   location: string;
//   state: string;
//   lga: string;
//   bedrooms: number;
//   bathrooms: number;
//   area: number;
//   type: "house" | "apartment" | "condo" | "townhouse";
//   status: "available" | "sold" | "pending";
//   images: string[];
//   features: string[];
//   agent: {
//     id: string;
//     name: string;
//     email: string;
//     phone: string;
//     avatar?: string;
//   };
//   createdAt: string;
//   updatedAt: string;
// }

// export interface PropertyFilter {
//   minPrice?: number;
//   maxPrice?: number;
//   bedrooms?: number;
//   bathrooms?: number;
//   type?: Property["type"];
//   location?: string;
//   state?: string;
//   lga?: string;
// }
