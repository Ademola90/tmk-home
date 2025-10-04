export type UserRole = "super_admin" | "admin" | "agent" | "user";

export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  address?: string;
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  lastLogin?: string;
}

export interface DashboardStats {
  totalProperties: number;
  activeListings: number;
  totalUsers: number;
  totalRevenue: number;
  pendingApprovals: number;
  totalViews: number;
}

export interface PropertyListing {
  id: string;
  title: string;
  price: number;
  status: "pending" | "approved" | "rejected" | "available";
  views: number;
  inquiries: number;
  agent: {
    id: string;
    name: string;
  };
  createdAt: string;
}

// export type UserRole = "super_admin" | "admin" | "agent" | "user";

// export interface DashboardUser {
//   id: string;
//   name: string;
//   email: string;
//   role: UserRole;
//   avatar?: string;
//   phone?: string;
//   status: "active" | "inactive" | "suspended";
//   createdAt: string;
//   lastLogin?: string;
// }

// export interface DashboardStats {
//   totalProperties: number;
//   activeListings: number;
//   totalUsers: number;
//   totalRevenue: number;
//   pendingApprovals: number;
//   totalViews: number;
// }

// export interface PropertyListing {
//   id: string;
//   title: string;
//   price: number;
//   status: "pending" | "approved" | "rejected";
//   views: number;
//   inquiries: number;
//   agent: {
//     id: string;
//     name: string;
//   };
//   createdAt: string;
// }
