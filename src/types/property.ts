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
  location?: string;
  state?: string;
  lga?: string;
}
