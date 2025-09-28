// // src/store/toastStore.ts
// // src/store/toastStore.ts

// import { create } from "zustand";

// interface Toast {
//   id: string;
//   message: string;
//   type: "success" | "error" | "info" | "warning";
// }

// interface ToastState {
//   toasts: Toast[];
//   addToast: (
//     message: string,
//     type: "success" | "error" | "info" | "warning"
//   ) => void;
//   removeToast: (id: string) => void;
// }

// export const useToastStore = create<ToastState>((set) => ({
//   toasts: [],
//   addToast: (message, type) => {
//     const id = Date.now().toString();
//     set((state) => ({
//       toasts: [...state.toasts, { id, message, type }],
//     }));
//     setTimeout(() => {
//       set((state) => ({
//         toasts: state.toasts.filter((toast) => toast.id !== id),
//       }));
//     }, 5000);
//   },
//   removeToast: (id) => {
//     set((state) => ({
//       toasts: state.toasts.filter((toast) => toast.id !== id),
//     }));
//   },
// }));

// // import { create } from "zustand";

// // interface Toast {
// //   id: string;
// //   message: string;
// //   type: "success" | "error" | "info" | "warning";
// // }

// // interface ToastState {
// //   toasts: Toast[];
// //   addToast: (
// //     message: string,
// //     type: "success" | "error" | "info" | "warning"
// //   ) => void;
// //   removeToast: (id: string) => void;
// // }

// // export const useToastStore = create<ToastState>((set) => ({
// //   toasts: [],
// //   addToast: (message, type) => {
// //     const id = Date.now().toString();
// //     set((state) => ({
// //       toasts: [...state.toasts, { id, message, type }],
// //     }));
// //     setTimeout(() => {
// //       set((state) => ({
// //         toasts: state.toasts.filter((toast) => toast.id !== id),
// //       }));
// //     }, 5000);
// //   },
// //   removeToast: (id) => {
// //     set((state) => ({
// //       toasts: state.toasts.filter((toast) => toast.id !== id),
// //     }));
// //   },
// // }));

// // import { create } from "zustand";

// // interface Toast {
// //   id: string;
// //   message: string;
// //   type: "success" | "error" | "info" | "warning";
// // }

// // interface ToastState {
// //   toasts: Toast[];
// //   addToast: (
// //     message: string,
// //     type: "success" | "error" | "info" | "warning"
// //   ) => void;
// //   removeToast: (id: string) => void;
// // }

// // export const useToastStore = create<ToastState>((set) => ({
// //   toasts: [],
// //   addToast: (message, type) => {
// //     const id = Date.now().toString();
// //     set((state) => ({
// //       toasts: [...state.toasts, { id, message, type }],
// //     }));
// //     setTimeout(() => {
// //       set((state) => ({
// //         toasts: state.toasts.filter((toast) => toast.id !== id),
// //       }));
// //     }, 5000);
// //   },
// //   removeToast: (id) => {
// //     set((state) => ({
// //       toasts: state.toasts.filter((toast) => toast.id !== id),
// //     }));
// //   },
// // }));
