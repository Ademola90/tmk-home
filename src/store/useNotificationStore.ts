import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (
    notification: Omit<Notification, "id" | "isRead" | "createdAt">
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      // Remove unused 'get' parameter
      notifications: [
        {
          id: "1",
          title: "Welcome to Estatein!",
          message:
            "Thank you for joining our platform. Explore our premium properties.",
          type: "info",
          isRead: false,
          createdAt: new Date(),
          actionUrl: "/properties",
        },
        {
          id: "2",
          title: "Property Inquiry Update",
          message:
            "Your inquiry for Seaside Serenity Villa has been received. Our agent will contact you soon.",
          type: "success",
          isRead: false,
          createdAt: new Date(Date.now() - 86400000), // 1 day ago
        },
        {
          id: "3",
          title: "Payment Reminder",
          message:
            "Your escrow payment for Ocean View Apartment is pending. Please complete the transaction.",
          type: "warning",
          isRead: false,
          createdAt: new Date(Date.now() - 172800000), // 2 days ago
          actionUrl: "/wallet",
        },
      ],
      unreadCount: 3,
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: Date.now().toString(),
          isRead: false,
          createdAt: new Date(),
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        }));
      },
      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((notif) =>
            notif.id === id ? { ...notif, isRead: true } : notif
          ),
          unreadCount: Math.max(0, state.unreadCount - 1),
        }));
      },
      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((notif) => ({
            ...notif,
            isRead: true,
          })),
          unreadCount: 0,
        }));
      },
      deleteNotification: (id) => {
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id);
          const wasUnread = notification && !notification.isRead;
          return {
            notifications: state.notifications.filter(
              (notif) => notif.id !== id
            ),
            unreadCount: wasUnread
              ? Math.max(0, state.unreadCount - 1)
              : state.unreadCount,
          };
        });
      },
      clearAll: () => {
        set({ notifications: [], unreadCount: 0 });
      },
    }),
    {
      name: "notification-storage",
    }
  )
);

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export interface Notification {
//   id: string;
//   title: string;
//   message: string;
//   type: "info" | "success" | "warning" | "error";
//   isRead: boolean;
//   createdAt: Date;
//   actionUrl?: string;
// }

// interface NotificationState {
//   notifications: Notification[];
//   unreadCount: number;
//   addNotification: (
//     notification: Omit<Notification, "id" | "isRead" | "createdAt">
//   ) => void;
//   markAsRead: (id: string) => void;
//   markAllAsRead: () => void;
//   deleteNotification: (id: string) => void;
//   clearAll: () => void;
// }

// export const useNotificationStore = create<NotificationState>()(
//   persist(
//     (set, get) => ({
//       notifications: [
//         {
//           id: "1",
//           title: "Welcome to Estatein!",
//           message:
//             "Thank you for joining our platform. Explore our premium properties.",
//           type: "info",
//           isRead: false,
//           createdAt: new Date(),
//           actionUrl: "/properties",
//         },
//         {
//           id: "2",
//           title: "Property Inquiry Update",
//           message:
//             "Your inquiry for Seaside Serenity Villa has been received. Our agent will contact you soon.",
//           type: "success",
//           isRead: false,
//           createdAt: new Date(Date.now() - 86400000), // 1 day ago
//         },
//         {
//           id: "3",
//           title: "Payment Reminder",
//           message:
//             "Your escrow payment for Ocean View Apartment is pending. Please complete the transaction.",
//           type: "warning",
//           isRead: false,
//           createdAt: new Date(Date.now() - 172800000), // 2 days ago
//           actionUrl: "/wallet",
//         },
//       ],
//       unreadCount: 3,
//       addNotification: (notification) => {
//         const newNotification: Notification = {
//           ...notification,
//           id: Date.now().toString(),
//           isRead: false,
//           createdAt: new Date(),
//         };
//         set((state) => ({
//           notifications: [newNotification, ...state.notifications],
//           unreadCount: state.unreadCount + 1,
//         }));
//       },
//       markAsRead: (id) => {
//         set((state) => ({
//           notifications: state.notifications.map((notif) =>
//             notif.id === id ? { ...notif, isRead: true } : notif
//           ),
//           unreadCount: Math.max(0, state.unreadCount - 1),
//         }));
//       },
//       markAllAsRead: () => {
//         set((state) => ({
//           notifications: state.notifications.map((notif) => ({
//             ...notif,
//             isRead: true,
//           })),
//           unreadCount: 0,
//         }));
//       },
//       deleteNotification: (id) => {
//         set((state) => {
//           const notification = state.notifications.find((n) => n.id === id);
//           const wasUnread = notification && !notification.isRead;
//           return {
//             notifications: state.notifications.filter(
//               (notif) => notif.id !== id
//             ),
//             unreadCount: wasUnread
//               ? Math.max(0, state.unreadCount - 1)
//               : state.unreadCount,
//           };
//         });
//       },
//       clearAll: () => {
//         set({ notifications: [], unreadCount: 0 });
//       },
//     }),
//     {
//       name: "notification-storage",
//     }
//   )
// );
