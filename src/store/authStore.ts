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

// // import { create } from "zustand";
// // import { persist } from "zustand/middleware";

// // interface User {
// //   id: string;
// //   name: string;
// //   email: string;
// //   role?: string;
// //   avatar?: string;
// // }

// // interface AuthState {
// //   user: User | null;
// //   isAuthenticated: boolean;
// //   isLoading: boolean;
// //   login: (email: string, password: string) => Promise<boolean>;
// //   signup: (name: string, email: string, password: string) => Promise<boolean>;
// //   verifyOTP: (otp: string) => Promise<boolean>;
// //   logout: () => void;
// //   checkAuthStatus: () => void;
// // }

// // export const useAuthStore = create<AuthState>()(
// //   persist(
// //     (set) => ({
// //       user: null,
// //       isAuthenticated: false,
// //       isLoading: false,

// //       login: async (email: string, password: string) => {
// //         set({ isLoading: true });
// //         try {
// //           const response = await fetch("/api/login", {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify({ email, password }),
// //           });

// //           if (!response.ok) throw new Error("Login failed");

// //           const user: User = await response.json();
// //           set({ user, isAuthenticated: true, isLoading: false });
// //           return true;
// //         } catch (err: unknown) {
// //           console.error("Login error:", err);
// //           set({ isLoading: false });
// //           return false;
// //         }
// //       },

// //       signup: async (name: string, email: string, password: string) => {
// //         set({ isLoading: true });
// //         try {
// //           const response = await fetch("/api/signup", {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify({ name, email, password }),
// //           });

// //           if (!response.ok) throw new Error("Signup failed");

// //           const user: User = await response.json();
// //           set({ user, isAuthenticated: true, isLoading: false });
// //           return true;
// //         } catch (err: unknown) {
// //           console.error("Signup error:", err);
// //           set({ isLoading: false });
// //           return false;
// //         }
// //       },
// //       // login: async (email: string, _password: string) => {
// //       //   set({ isLoading: true });
// //       //   try {
// //       //     // Simulate API call
// //       //     await new Promise((resolve) => setTimeout(resolve, 1000));

// //       //     // Mock successful login
// //       //     const user: User = {
// //       //       id: "1",
// //       //       name: "Admin User",
// //       //       email,
// //       //       role: "admin",
// //       //     };
// //       //     set({ user, isAuthenticated: true, isLoading: false });
// //       //     return true;
// //       //   } catch (err: unknown) {
// //       //     console.error("Login error:", err);
// //       //     set({ isLoading: false });
// //       //     return false;
// //       //   }
// //       // },

// //       // signup: async (name: string, email: string, _password: string) => {
// //       //   set({ isLoading: true });
// //       //   try {
// //       //     await new Promise((resolve) => setTimeout(resolve, 1000));

// //       //     // Temporarily store signup data
// //       //     localStorage.setItem(
// //       //       "tempSignupData",
// //       //       JSON.stringify({ name, email })
// //       //     );
// //       //     set({ isLoading: false });
// //       //     return true;
// //       //   } catch (err: unknown) {
// //       //     console.error("Signup error:", err);
// //       //     set({ isLoading: false });
// //       //     return false;
// //       //   }
// //       // },

// //       verifyOTP: async (otp: string) => {
// //         set({ isLoading: true });
// //         try {
// //           await new Promise((resolve) => setTimeout(resolve, 1000));

// //           if (otp === "123456") {
// //             const tempData = localStorage.getItem("tempSignupData");
// //             if (tempData) {
// //               const { name, email } = JSON.parse(tempData);
// //               const user: User = {
// //                 id: Date.now().toString(),
// //                 name,
// //                 email,
// //                 role: "user",
// //               };
// //               set({ user, isAuthenticated: true, isLoading: false });
// //               localStorage.removeItem("tempSignupData");
// //               return true;
// //             }
// //           }
// //           set({ isLoading: false });
// //           return false;
// //         } catch (err: unknown) {
// //           console.error("OTP verification error:", err);
// //           set({ isLoading: false });
// //           return false;
// //         }
// //       },

// //       logout: () => {
// //         set({ user: null, isAuthenticated: false });
// //         localStorage.removeItem("auth-storage");
// //       },

// //       checkAuthStatus: () => {
// //         const stored = localStorage.getItem("auth-storage");
// //         if (stored) {
// //           const { state } = JSON.parse(stored);
// //           if (state.user) {
// //             set({ user: state.user, isAuthenticated: true });
// //           }
// //         }
// //       },
// //     }),
// //     { name: "auth-storage" }
// //   )
// // );

// // // import { create } from "zustand";
// // // import { persist } from "zustand/middleware";

// // // interface User {
// // //   id: string;
// // //   name: string;
// // //   email: string;
// // //   role?: string;
// // //   avatar?: string;
// // // }

// // // interface AuthState {
// // //   user: User | null;
// // //   isAuthenticated: boolean;
// // //   isLoading: boolean;
// // //   login: (email: string, password: string) => Promise<boolean>;
// // //   signup: (name: string, email: string, password: string) => Promise<boolean>;
// // //   verifyOTP: (otp: string) => Promise<boolean>;
// // //   logout: () => void;
// // //   checkAuthStatus: () => void;
// // // }

// // // export const useAuthStore = create<AuthState>()(
// // //   persist(
// // //     (set) => ({
// // //       user: null,
// // //       isAuthenticated: false,
// // //       isLoading: false,

// // //       login: async (email: string, password: string) => {
// // //         set({ isLoading: true });
// // //         try {
// // //           const response = await fetch("/api/login", {
// // //             method: "POST",
// // //             headers: { "Content-Type": "application/json" },
// // //             body: JSON.stringify({ email, password }),
// // //           });

// // //           if (!response.ok) throw new Error("Login failed");

// // //           const user: User = await response.json();
// // //           set({ user, isAuthenticated: true, isLoading: false });
// // //           return true;
// // //         } catch (err: unknown) {
// // //           console.error("Login error:", err);
// // //           set({ isLoading: false });
// // //           return false;
// // //         }
// // //       },

// // //       signup: async (name: string, email: string, password: string) => {
// // //         set({ isLoading: true });
// // //         try {
// // //           const response = await fetch("/api/signup", {
// // //             method: "POST",
// // //             headers: { "Content-Type": "application/json" },
// // //             body: JSON.stringify({ name, email, password }),
// // //           });

// // //           if (!response.ok) throw new Error("Signup failed");

// // //           const user: User = await response.json();
// // //           set({ user, isAuthenticated: true, isLoading: false });
// // //           return true;
// // //         } catch (err: unknown) {
// // //           console.error("Signup error:", err);
// // //           set({ isLoading: false });
// // //           return false;
// // //         }
// // //       },
// // //       // login: async (email: string, _password: string) => {
// // //       //   set({ isLoading: true });
// // //       //   try {
// // //       //     // Simulate API call
// // //       //     await new Promise((resolve) => setTimeout(resolve, 1000));

// // //       //     // Mock successful login
// // //       //     const user: User = {
// // //       //       id: "1",
// // //       //       name: "Admin User",
// // //       //       email,
// // //       //       role: "admin",
// // //       //     };
// // //       //     set({ user, isAuthenticated: true, isLoading: false });
// // //       //     return true;
// // //       //   } catch (err: unknown) {
// // //       //     console.error("Login error:", err);
// // //       //     set({ isLoading: false });
// // //       //     return false;
// // //       //   }
// // //       // },

// // //       // signup: async (name: string, email: string, _password: string) => {
// // //       //   set({ isLoading: true });
// // //       //   try {
// // //       //     await new Promise((resolve) => setTimeout(resolve, 1000));

// // //       //     // Temporarily store signup data
// // //       //     localStorage.setItem(
// // //       //       "tempSignupData",
// // //       //       JSON.stringify({ name, email })
// // //       //     );
// // //       //     set({ isLoading: false });
// // //       //     return true;
// // //       //   } catch (err: unknown) {
// // //       //     console.error("Signup error:", err);
// // //       //     set({ isLoading: false });
// // //       //     return false;
// // //       //   }
// // //       // },

// // //       verifyOTP: async (otp: string) => {
// // //         set({ isLoading: true });
// // //         try {
// // //           await new Promise((resolve) => setTimeout(resolve, 1000));

// // //           if (otp === "123456") {
// // //             const tempData = localStorage.getItem("tempSignupData");
// // //             if (tempData) {
// // //               const { name, email } = JSON.parse(tempData);
// // //               const user: User = {
// // //                 id: Date.now().toString(),
// // //                 name,
// // //                 email,
// // //                 role: "user",
// // //               };
// // //               set({ user, isAuthenticated: true, isLoading: false });
// // //               localStorage.removeItem("tempSignupData");
// // //               return true;
// // //             }
// // //           }
// // //           set({ isLoading: false });
// // //           return false;
// // //         } catch (err: unknown) {
// // //           console.error("OTP verification error:", err);
// // //           set({ isLoading: false });
// // //           return false;
// // //         }
// // //       },

// // //       logout: () => {
// // //         set({ user: null, isAuthenticated: false });
// // //         localStorage.removeItem("auth-storage");
// // //       },

// // //       checkAuthStatus: () => {
// // //         const stored = localStorage.getItem("auth-storage");
// // //         if (stored) {
// // //           const { state } = JSON.parse(stored);
// // //           if (state.user) {
// // //             set({ user: state.user, isAuthenticated: true });
// // //           }
// // //         }
// // //       },
// // //     }),
// // //     { name: "auth-storage" }
// // //   )
// // // );
