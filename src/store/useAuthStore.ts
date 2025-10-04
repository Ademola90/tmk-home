import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role?: "super_admin" | "admin" | "agent" | "user"; // Make role optional
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  verifyOTP: (otp: string) => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,

      signup: async (userData) => {
        set({ isLoading: true });
        try {
          await new Promise((resolve) => setTimeout(resolve, 1500));
          localStorage.setItem("tempSignupData", JSON.stringify(userData));
          set({ isLoading: false });
        } catch (error) {
          console.error("Signup error:", error);
          set({ isLoading: false });
          throw error;
        }
      },

      login: async (email: string) => {
        // Added password parameter
        set({ isLoading: true });
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Remove role-based email checking for now
          // All users will have access to all dashboard areas temporarily
          const mockUser: User = {
            id: "1",
            name: "John Doe",
            email: email,
            phone: "+234 813 439 2733",
            // role: "user", // Remove role assignment for now
          };

          set({
            user: mockUser,
            isAuthenticated: true,
            token: "mock-token-123",
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      verifyOTP: async (otp: string) => {
        set({ isLoading: true });
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          if (otp.length === 6) {
            const tempData = localStorage.getItem("tempSignupData");
            if (tempData) {
              const userData = JSON.parse(tempData);
              const mockUser: User = {
                id: Date.now().toString(),
                ...userData,
                // role: "user", // Remove role assignment
              };
              set({
                user: mockUser,
                isAuthenticated: true,
                token: "mock-token-123",
                isLoading: false,
              });
              localStorage.removeItem("tempSignupData");
            }
          }
          set({ isLoading: false });
        } catch (error) {
          console.error("OTP verification error:", error);
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          token: null,
        });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
      }),
    }
  )
);

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role?: string;
//   avatar?: string;
// }

// interface AuthState {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (email: string) => Promise<boolean>; // Remove password parameter
//   signup: (name: string, email: string) => Promise<boolean>; // Remove password parameter
//   verifyOTP: (otp: string) => Promise<boolean>;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       user: null,
//       isAuthenticated: false,
//       isLoading: false,

//       // Mock signup function - no password
//       signup: async (name: string, email: string) => {
//         set({ isLoading: true });
//         try {
//           // Simulate API call delay
//           await new Promise((resolve) => setTimeout(resolve, 1500));

//           // Store temporary signup data for OTP verification
//           localStorage.setItem(
//             "tempSignupData",
//             JSON.stringify({ name, email })
//           );

//           set({ isLoading: false });
//           return true; // Always return success for demo
//         } catch (error: unknown) {
//           console.error("Signup error:", error);
//           set({ isLoading: false });
//           return false;
//         }
//       },

//       // Mock login function - no password
//       login: async (email: string) => {
//         set({ isLoading: true });
//         try {
//           // Simulate API call delay
//           await new Promise((resolve) => setTimeout(resolve, 1000));

//           // Mock authentication - for demo purposes, accept any email
//           const user: User = {
//             id: "1",
//             name: "Demo User",
//             email: email,
//             role: "user",
//           };

//           set({ user, isAuthenticated: true, isLoading: false });
//           return true;
//         } catch (error: unknown) {
//           console.error("Login error:", error);
//           set({ isLoading: false });
//           return false;
//         }
//       },

//       // Mock OTP verification
//       verifyOTP: async (otp: string) => {
//         set({ isLoading: true });
//         try {
//           await new Promise((resolve) => setTimeout(resolve, 1000));

//           // For demo, accept any OTP that is 6 digits
//           if (otp.length === 6) {
//             const tempData = localStorage.getItem("tempSignupData");
//             if (tempData) {
//               const { name, email } = JSON.parse(tempData);
//               const user: User = {
//                 id: Date.now().toString(),
//                 name,
//                 email,
//                 role: "user",
//               };
//               set({ user, isAuthenticated: true, isLoading: false });
//               localStorage.removeItem("tempSignupData");
//               return true;
//             }
//           }
//           set({ isLoading: false });
//           return false;
//         } catch (error: unknown) {
//           console.error("OTP verification error:", error);
//           set({ isLoading: false });
//           return false;
//         }
//       },

//       logout: () => {
//         set({ user: null, isAuthenticated: false });
//       },
//     }),
//     {
//       name: "auth-storage",
//       // Only persist these fields to avoid storing isLoading
//       partialize: (state) => ({
//         user: state.user,
//         isAuthenticated: state.isAuthenticated,
//       }),
//     }
//   )
// );
