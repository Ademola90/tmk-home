import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<boolean>; // Remove password parameter
  signup: (name: string, email: string) => Promise<boolean>; // Remove password parameter
  verifyOTP: (otp: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // Mock signup function - no password
      signup: async (name: string, email: string) => {
        set({ isLoading: true });
        try {
          // Simulate API call delay
          await new Promise((resolve) => setTimeout(resolve, 1500));

          // Store temporary signup data for OTP verification
          localStorage.setItem(
            "tempSignupData",
            JSON.stringify({ name, email })
          );

          set({ isLoading: false });
          return true; // Always return success for demo
        } catch (error: unknown) {
          console.error("Signup error:", error);
          set({ isLoading: false });
          return false;
        }
      },

      // Mock login function - no password
      login: async (email: string) => {
        set({ isLoading: true });
        try {
          // Simulate API call delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Mock authentication - for demo purposes, accept any email
          const user: User = {
            id: "1",
            name: "Demo User",
            email: email,
            role: "user",
          };

          set({ user, isAuthenticated: true, isLoading: false });
          return true;
        } catch (error: unknown) {
          console.error("Login error:", error);
          set({ isLoading: false });
          return false;
        }
      },

      // Mock OTP verification
      verifyOTP: async (otp: string) => {
        set({ isLoading: true });
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // For demo, accept any OTP that is 6 digits
          if (otp.length === 6) {
            const tempData = localStorage.getItem("tempSignupData");
            if (tempData) {
              const { name, email } = JSON.parse(tempData);
              const user: User = {
                id: Date.now().toString(),
                name,
                email,
                role: "user",
              };
              set({ user, isAuthenticated: true, isLoading: false });
              localStorage.removeItem("tempSignupData");
              return true;
            }
          }
          set({ isLoading: false });
          return false;
        } catch (error: unknown) {
          console.error("OTP verification error:", error);
          set({ isLoading: false });
          return false;
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      // Only persist these fields to avoid storing isLoading
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
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
//   login: (email: string, password: string) => Promise<boolean>;
//   signup: (name: string, email: string, password: string) => Promise<boolean>;
//   verifyOTP: (otp: string) => Promise<boolean>;
//   logout: () => void;
//   checkAuthStatus: () => void;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       user: null,
//       isAuthenticated: false,
//       isLoading: false,

//       login: async (email: string, password: string) => {
//         set({ isLoading: true });
//         try {
//           const response = await fetch("/api/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email, password }),
//           });

//           if (!response.ok) throw new Error("Login failed");

//           const user: User = await response.json();
//           set({ user, isAuthenticated: true, isLoading: false });
//           return true;
//         } catch (err: unknown) {
//           console.error("Login error:", err);
//           set({ isLoading: false });
//           return false;
//         }
//       },

//       signup: async (name: string, email: string, password: string) => {
//         set({ isLoading: true });
//         try {
//           const response = await fetch("/api/signup", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ name, email, password }),
//           });

//           if (!response.ok) throw new Error("Signup failed");

//           const user: User = await response.json();
//           set({ user, isAuthenticated: true, isLoading: false });
//           return true;
//         } catch (err: unknown) {
//           console.error("Signup error:", err);
//           set({ isLoading: false });
//           return false;
//         }
//       },
//       // login: async (email: string, _password: string) => {
//       //   set({ isLoading: true });
//       //   try {
//       //     // Simulate API call
//       //     await new Promise((resolve) => setTimeout(resolve, 1000));

//       //     // Mock successful login
//       //     const user: User = {
//       //       id: "1",
//       //       name: "Admin User",
//       //       email,
//       //       role: "admin",
//       //     };
//       //     set({ user, isAuthenticated: true, isLoading: false });
//       //     return true;
//       //   } catch (err: unknown) {
//       //     console.error("Login error:", err);
//       //     set({ isLoading: false });
//       //     return false;
//       //   }
//       // },

//       // signup: async (name: string, email: string, _password: string) => {
//       //   set({ isLoading: true });
//       //   try {
//       //     await new Promise((resolve) => setTimeout(resolve, 1000));

//       //     // Temporarily store signup data
//       //     localStorage.setItem(
//       //       "tempSignupData",
//       //       JSON.stringify({ name, email })
//       //     );
//       //     set({ isLoading: false });
//       //     return true;
//       //   } catch (err: unknown) {
//       //     console.error("Signup error:", err);
//       //     set({ isLoading: false });
//       //     return false;
//       //   }
//       // },

//       verifyOTP: async (otp: string) => {
//         set({ isLoading: true });
//         try {
//           await new Promise((resolve) => setTimeout(resolve, 1000));

//           if (otp === "123456") {
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
//         } catch (err: unknown) {
//           console.error("OTP verification error:", err);
//           set({ isLoading: false });
//           return false;
//         }
//       },

//       logout: () => {
//         set({ user: null, isAuthenticated: false });
//         localStorage.removeItem("auth-storage");
//       },

//       checkAuthStatus: () => {
//         const stored = localStorage.getItem("auth-storage");
//         if (stored) {
//           const { state } = JSON.parse(stored);
//           if (state.user) {
//             set({ user: state.user, isAuthenticated: true });
//           }
//         }
//       },
//     }),
//     { name: "auth-storage" }
//   )
// );

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// interface AuthState {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<boolean>;
//   signup: (name: string, email: string, password: string) => Promise<boolean>;
//   verifyOTP: (otp: string) => Promise<boolean>;
//   logout: () => void;
//   checkAuthStatus: () => void;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set, get) => ({
//       user: null,
//       isAuthenticated: false,
//       isLoading: false,

//       login: async (email: string, password: string) => {
//         set({ isLoading: true });
//         try {
//           // Simulate API call
//           await new Promise((resolve) => setTimeout(resolve, 1000));

//           // Mock successful login
//           const user = { id: "1", name: "John Doe", email };
//           set({ user, isAuthenticated: true, isLoading: false });
//           return true;
//         } catch (error) {
//           set({ isLoading: false });
//           return false;
//         }
//       },

//       signup: async (name: string, email: string, password: string) => {
//         set({ isLoading: true });
//         try {
//           // Simulate API call
//           await new Promise((resolve) => setTimeout(resolve, 1000));

//           // Store signup data temporarily
//           localStorage.setItem(
//             "tempSignupData",
//             JSON.stringify({ name, email })
//           );
//           set({ isLoading: false });
//           return true;
//         } catch (error) {
//           set({ isLoading: false });
//           return false;
//         }
//       },

//       verifyOTP: async (otp: string) => {
//         set({ isLoading: true });
//         try {
//           // Simulate OTP verification
//           await new Promise((resolve) => setTimeout(resolve, 1000));

//           if (otp === "123456") {
//             const tempData = localStorage.getItem("tempSignupData");
//             if (tempData) {
//               const { name, email } = JSON.parse(tempData);
//               const user = { id: Date.now().toString(), name, email };
//               set({ user, isAuthenticated: true, isLoading: false });
//               localStorage.removeItem("tempSignupData");
//               return true;
//             }
//           }
//           set({ isLoading: false });
//           return false;
//         } catch (error) {
//           set({ isLoading: false });
//           return false;
//         }
//       },

//       logout: () => {
//         set({ user: null, isAuthenticated: false });
//         localStorage.removeItem("auth-storage");
//       },

//       checkAuthStatus: () => {
//         const stored = localStorage.getItem("auth-storage");
//         if (stored) {
//           const { state } = JSON.parse(stored);
//           if (state.user) {
//             set({ user: state.user, isAuthenticated: true });
//           }
//         }
//       },
//     }),
//     {
//       name: "auth-storage",
//     }
//   )
// );
