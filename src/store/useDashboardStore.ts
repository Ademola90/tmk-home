import { create } from "zustand";
import type {
  DashboardUser,
  DashboardStats,
  PropertyListing,
} from "../types/dashboard";

interface DashboardState {
  users: DashboardUser[];
  stats: DashboardStats;
  listings: PropertyListing[];
  isLoading: boolean;
  fetchDashboardData: () => Promise<void>;
  addUser: (user: Omit<DashboardUser, "id" | "createdAt">) => Promise<boolean>;
  updateUser: (id: string, updates: Partial<DashboardUser>) => Promise<boolean>;
  deleteUser: (id: string) => Promise<boolean>;
  approveProperty: (id: string) => Promise<boolean>;
  rejectProperty: (id: string) => Promise<boolean>;
}

// Mock data
const mockUsers: DashboardUser[] = [
  {
    id: "1",
    name: "John Admin",
    email: "admin@tmk.com",
    role: "admin",
    phone: "+234 813 439 2733",
    status: "active",
    createdAt: "2024-01-01",
    lastLogin: "2024-01-30",
  },
  {
    id: "2",
    name: "Sarah Agent",
    email: "sarah@tmk.com",
    role: "agent",
    phone: "+234 813 439 2734",
    status: "active",
    createdAt: "2024-01-05",
    lastLogin: "2024-01-29",
  },
];

const mockStats: DashboardStats = {
  totalProperties: 150,
  activeListings: 120,
  totalUsers: 1250,
  totalRevenue: 450000000,
  pendingApprovals: 15,
  totalViews: 45600,
};

const mockListings: PropertyListing[] = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    price: 45000000,
    status: "pending",
    views: 234,
    inquiries: 12,
    agent: {
      id: "2",
      name: "Sarah Agent",
    },
    createdAt: "2024-01-25",
  },
];

export const useDashboardStore = create<DashboardState>((set) => ({
  users: mockUsers,
  stats: mockStats,
  listings: mockListings,
  isLoading: false,

  fetchDashboardData: async () => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({ isLoading: false });
  },

  addUser: async (user) => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newUser: DashboardUser = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      users: [...state.users, newUser],
      isLoading: false,
    }));
    return true;
  },

  updateUser: async (id, updates) => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updates } : user
      ),
      isLoading: false,
    }));
    return true;
  },

  deleteUser: async (id) => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
      isLoading: false,
    }));
    return true;
  },

  approveProperty: async (id) => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({
      listings: state.listings.map((listing) =>
        listing.id === id ? { ...listing, status: "approved" } : listing
      ),
      isLoading: false,
    }));
    return true;
  },

  rejectProperty: async (id) => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({
      listings: state.listings.map((listing) =>
        listing.id === id ? { ...listing, status: "rejected" } : listing
      ),
      isLoading: false,
    }));
    return true;
  },
}));
