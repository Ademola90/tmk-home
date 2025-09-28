import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  EscrowTransaction,
  PaymentMethod,
  Transaction,
  WalletState,
} from "../types/wallet";

interface WalletStore extends WalletState {
  paymentMethods: PaymentMethod[];
  addFunds: (amount: number, paymentMethodId: string) => Promise<boolean>;
  withdrawFunds: (amount: number, paymentMethodId: string) => Promise<boolean>;
  createEscrow: (
    propertyId: string,
    propertyTitle: string,
    amount: number,
    sellerId: string
  ) => Promise<boolean>;
  approveEscrow: (escrowId: string) => Promise<boolean>;
  releaseEscrow: (escrowId: string) => Promise<boolean>;
  refundEscrow: (escrowId: string) => Promise<boolean>;
  addPaymentMethod: (method: Omit<PaymentMethod, "id">) => void;
  removePaymentMethod: (methodId: string) => void;
  setDefaultPaymentMethod: (methodId: string) => void;
  fetchWalletData: () => Promise<void>;
}

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "deposit",
    amount: 5000,
    description: "Wallet funding via Credit Card",
    status: "completed",
    createdAt: "2024-01-20T10:00:00Z",
    completedAt: "2024-01-20T10:01:00Z",
  },
  {
    id: "2",
    type: "escrow_hold",
    amount: 450000,
    description: "Escrow hold for Modern Downtown Apartment",
    propertyId: "1",
    propertyTitle: "Modern Downtown Apartment",
    status: "completed",
    createdAt: "2024-01-21T14:30:00Z",
    completedAt: "2024-01-21T14:31:00Z",
  },
];

const mockEscrowTransactions: EscrowTransaction[] = [
  {
    id: "1",
    propertyId: "1",
    propertyTitle: "Modern Downtown Apartment",
    buyerId: "user1",
    sellerId: "seller1",
    amount: 450000,
    status: "pending",
    createdAt: "2024-01-21T14:30:00Z",
  },
];

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "card",
    last4: "4242",
    brand: "Visa",
    isDefault: true,
  },
  {
    id: "2",
    type: "bank_transfer",
    bankName: "Chase Bank",
    accountNumber: "****1234",
    isDefault: false,
  },
];

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      balance: 5000,
      escrowBalance: 450000,
      transactions: mockTransactions,
      escrowTransactions: mockEscrowTransactions,
      paymentMethods: mockPaymentMethods,
      isLoading: false,

      fetchWalletData: async () => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          // Data is already set in initial state
          set({ isLoading: false });
        } catch (error: unknown) {
          // Add proper error typing
          console.error("Failed to fetch wallet data:", error);
          set({ isLoading: false });
        }
      },

      addFunds: async (amount: number, paymentMethodId: string) => {
        set({ isLoading: true });
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000));

          const newTransaction: Transaction = {
            id: Date.now().toString(),
            type: "deposit",
            amount,
            description: `Wallet funding via ${
              get().paymentMethods.find((m) => m.id === paymentMethodId)
                ?.type === "card"
                ? "Credit Card"
                : "Bank Transfer"
            }`,
            status: "completed",
            createdAt: new Date().toISOString(),
            completedAt: new Date().toISOString(),
          };

          set((state) => ({
            balance: state.balance + amount,
            transactions: [newTransaction, ...state.transactions],
            isLoading: false,
          }));

          return true;
        } catch (error: unknown) {
          // Add proper error typing
          console.error("Failed to add funds:", error);
          set({ isLoading: false });
          return false;
        }
      },

      withdrawFunds: async (amount: number, paymentMethodId: string) => {
        const { balance } = get();
        if (balance < amount) return false;

        set({ isLoading: true });
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000));

          const newTransaction: Transaction = {
            id: Date.now().toString(),
            type: "withdrawal",
            amount,
            description: `Withdrawal to ${
              get().paymentMethods.find((m) => m.id === paymentMethodId)
                ?.type === "card"
                ? "Credit Card"
                : "Bank Account"
            }`,
            status: "completed",
            createdAt: new Date().toISOString(),
            completedAt: new Date().toISOString(),
          };

          set((state) => ({
            balance: state.balance - amount,
            transactions: [newTransaction, ...state.transactions],
            isLoading: false,
          }));

          return true;
        } catch (error: unknown) {
          // Add proper error typing
          console.error("Failed to withdraw funds:", error);
          set({ isLoading: false });
          return false;
        }
      },

      createEscrow: async (
        propertyId: string,
        propertyTitle: string,
        amount: number,
        sellerId: string
      ) => {
        const { balance } = get();
        if (balance < amount) return false;

        set({ isLoading: true });
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000));

          const newEscrow: EscrowTransaction = {
            id: Date.now().toString(),
            propertyId,
            propertyTitle,
            buyerId: "current-user",
            sellerId,
            amount,
            status: "pending",
            createdAt: new Date().toISOString(),
          };

          const newTransaction: Transaction = {
            id: (Date.now() + 1).toString(),
            type: "escrow_hold",
            amount,
            description: `Escrow hold for ${propertyTitle}`,
            propertyId,
            propertyTitle,
            status: "completed",
            createdAt: new Date().toISOString(),
            completedAt: new Date().toISOString(),
          };

          set((state) => ({
            balance: state.balance - amount,
            escrowBalance: state.escrowBalance + amount,
            escrowTransactions: [newEscrow, ...state.escrowTransactions],
            transactions: [newTransaction, ...state.transactions],
            isLoading: false,
          }));

          return true;
        } catch (error: unknown) {
          // Add proper error typing
          console.error("Failed to create escrow:", error);
          set({ isLoading: false });
          return false;
        }
      },

      approveEscrow: async (escrowId: string) => {
        set({ isLoading: true });
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          set((state) => ({
            escrowTransactions: state.escrowTransactions.map((escrow) =>
              escrow.id === escrowId
                ? {
                    ...escrow,
                    status: "approved",
                    approvedAt: new Date().toISOString(),
                  }
                : escrow
            ),
            isLoading: false,
          }));

          return true;
        } catch (error: unknown) {
          // Add proper error typing
          console.error("Failed to approve escrow:", error);
          set({ isLoading: false });
          return false;
        }
      },

      releaseEscrow: async (escrowId: string) => {
        set({ isLoading: true });
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const escrow = get().escrowTransactions.find(
            (e) => e.id === escrowId
          );
          if (!escrow) return false;

          const newTransaction: Transaction = {
            id: Date.now().toString(),
            type: "escrow_release",
            amount: escrow.amount,
            description: `Escrow released for ${escrow.propertyTitle}`,
            propertyId: escrow.propertyId,
            propertyTitle: escrow.propertyTitle,
            status: "completed",
            createdAt: new Date().toISOString(),
            completedAt: new Date().toISOString(),
          };

          set((state) => ({
            escrowBalance: state.escrowBalance - escrow.amount,
            escrowTransactions: state.escrowTransactions.map((e) =>
              e.id === escrowId
                ? {
                    ...e,
                    status: "released",
                    releasedAt: new Date().toISOString(),
                  }
                : e
            ),
            transactions: [newTransaction, ...state.transactions],
            isLoading: false,
          }));

          return true;
        } catch (error: unknown) {
          // Add proper error typing
          console.error("Failed to release escrow:", error);
          set({ isLoading: false });
          return false;
        }
      },

      refundEscrow: async (escrowId: string) => {
        set({ isLoading: true });
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const escrow = get().escrowTransactions.find(
            (e) => e.id === escrowId
          );
          if (!escrow) return false;

          const newTransaction: Transaction = {
            id: Date.now().toString(),
            type: "refund",
            amount: escrow.amount,
            description: `Refund for ${escrow.propertyTitle}`,
            propertyId: escrow.propertyId,
            propertyTitle: escrow.propertyTitle,
            status: "completed",
            createdAt: new Date().toISOString(),
            completedAt: new Date().toISOString(),
          };

          set((state) => ({
            balance: state.balance + escrow.amount,
            escrowBalance: state.escrowBalance - escrow.amount,
            escrowTransactions: state.escrowTransactions.map((e) =>
              e.id === escrowId ? { ...e, status: "refunded" } : e
            ),
            transactions: [newTransaction, ...state.transactions],
            isLoading: false,
          }));

          return true;
        } catch (error: unknown) {
          // Add proper error typing
          console.error("Failed to refund escrow:", error);
          set({ isLoading: false });
          return false;
        }
      },

      addPaymentMethod: (method: Omit<PaymentMethod, "id">) => {
        const newMethod: PaymentMethod = {
          ...method,
          id: Date.now().toString(),
        };

        set((state) => ({
          paymentMethods: [...state.paymentMethods, newMethod],
        }));
      },

      removePaymentMethod: (methodId: string) => {
        set((state) => ({
          paymentMethods: state.paymentMethods.filter((m) => m.id !== methodId),
        }));
      },

      setDefaultPaymentMethod: (methodId: string) => {
        set((state) => ({
          paymentMethods: state.paymentMethods.map((m) => ({
            ...m,
            isDefault: m.id === methodId,
          })),
        }));
      },
    }),
    { name: "wallet-storage" }
  )
);

// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import type {
//   EscrowTransaction,
//   PaymentMethod,
//   Transaction,
//   WalletState,
// } from "../types/wallet";

// interface WalletStore extends WalletState {
//   paymentMethods: PaymentMethod[];
//   addFunds: (amount: number, paymentMethodId: string) => Promise<boolean>;
//   withdrawFunds: (amount: number, paymentMethodId: string) => Promise<boolean>;
//   createEscrow: (
//     propertyId: string,
//     propertyTitle: string,
//     amount: number,
//     sellerId: string
//   ) => Promise<boolean>;
//   approveEscrow: (escrowId: string) => Promise<boolean>;
//   releaseEscrow: (escrowId: string) => Promise<boolean>;
//   refundEscrow: (escrowId: string) => Promise<boolean>;
//   addPaymentMethod: (method: Omit<PaymentMethod, "id">) => void;
//   removePaymentMethod: (methodId: string) => void;
//   setDefaultPaymentMethod: (methodId: string) => void;
//   fetchWalletData: () => Promise<void>;
// }

// // Mock data
// const mockTransactions: Transaction[] = [
//   {
//     id: "1",
//     type: "deposit",
//     amount: 5000,
//     description: "Wallet funding via Credit Card",
//     status: "completed",
//     createdAt: "2024-01-20T10:00:00Z",
//     completedAt: "2024-01-20T10:01:00Z",
//   },
//   {
//     id: "2",
//     type: "escrow_hold",
//     amount: 450000,
//     description: "Escrow hold for Modern Downtown Apartment",
//     propertyId: "1",
//     propertyTitle: "Modern Downtown Apartment",
//     status: "completed",
//     createdAt: "2024-01-21T14:30:00Z",
//     completedAt: "2024-01-21T14:31:00Z",
//   },
// ];

// const mockEscrowTransactions: EscrowTransaction[] = [
//   {
//     id: "1",
//     propertyId: "1",
//     propertyTitle: "Modern Downtown Apartment",
//     buyerId: "user1",
//     sellerId: "seller1",
//     amount: 450000,
//     status: "pending",
//     createdAt: "2024-01-21T14:30:00Z",
//   },
// ];

// const mockPaymentMethods: PaymentMethod[] = [
//   {
//     id: "1",
//     type: "card",
//     last4: "4242",
//     brand: "Visa",
//     isDefault: true,
//   },
//   {
//     id: "2",
//     type: "bank_transfer",
//     bankName: "Chase Bank",
//     accountNumber: "****1234",
//     isDefault: false,
//   },
// ];

// export const useWalletStore = create<WalletStore>()(
//   persist(
//     (set, get) => ({
//       balance: 5000,
//       escrowBalance: 450000,
//       transactions: mockTransactions,
//       escrowTransactions: mockEscrowTransactions,
//       paymentMethods: mockPaymentMethods,
//       isLoading: false,

//       fetchWalletData: async () => {
//         set({ isLoading: true });
//         try {
//           // Simulate API call
//           await new Promise((resolve) => setTimeout(resolve, 1000));
//           // Data is already set in initial state
//           set({ isLoading: false });
//         } catch (error) {
//           console.error("Failed to fetch wallet data:", error);
//           set({ isLoading: false });
//         }
//       },

//       addFunds: async (amount: number, paymentMethodId: string) => {
//         set({ isLoading: true });
//         try {
//           await new Promise((resolve) => setTimeout(resolve, 2000));

//           const newTransaction: Transaction = {
//             id: Date.now().toString(),
//             type: "deposit",
//             amount,
//             description: `Wallet funding via ${
//               get().paymentMethods.find((m) => m.id === paymentMethodId)
//                 ?.type === "card"
//                 ? "Credit Card"
//                 : "Bank Transfer"
//             }`,
//             status: "completed",
//             createdAt: new Date().toISOString(),
//             completedAt: new Date().toISOString(),
//           };

//           set((state) => ({
//             balance: state.balance + amount,
//             transactions: [newTransaction, ...state.transactions],
//             isLoading: false,
//           }));

//           return true;
//         } catch (error) {
//           set({ isLoading: false });
//           return false;
//         }
//       },

//       withdrawFunds: async (amount: number, paymentMethodId: string) => {
//         const { balance } = get();
//         if (balance < amount) return false;

//         set({ isLoading: true });
//         try {
//           await new Promise((resolve) => setTimeout(resolve, 2000));

//           const newTransaction: Transaction = {
//             id: Date.now().toString(),
//             type: "withdrawal",
//             amount,
//             description: `Withdrawal to ${
//               get().paymentMethods.find((m) => m.id === paymentMethodId)
//                 ?.type === "card"
//                 ? "Credit Card"
//                 : "Bank Account"
//             }`,
//             status: "completed",
//             createdAt: new Date().toISOString(),
//             completedAt: new Date().toISOString(),
//           };

//           set((state) => ({
//             balance: state.balance - amount,
//             transactions: [newTransaction, ...state.transactions],
//             isLoading: false,
//           }));

//           return true;
//         } catch (error) {
//           set({ isLoading: false });
//           return false;
//         }
//       },

//       createEscrow: async (
//         propertyId: string,
//         propertyTitle: string,
//         amount: number,
//         sellerId: string
//       ) => {
//         const { balance } = get();
//         if (balance < amount) return false;

//         set({ isLoading: true });
//         try {
//           await new Promise((resolve) => setTimeout(resolve, 2000));

//           const newEscrow: EscrowTransaction = {
//             id: Date.now().toString(),
//             propertyId,
//             propertyTitle,
//             buyerId: "current-user",
//             sellerId,
//             amount,
//             status: "pending",
//             createdAt: new Date().toISOString(),
//           };

//           const newTransaction: Transaction = {
//             id: (Date.now() + 1).toString(),
//             type: "escrow_hold",
//             amount,
//             description: `Escrow hold for ${propertyTitle}`,
//             propertyId,
//             propertyTitle,
//             status: "completed",
//             createdAt: new Date().toISOString(),
//             completedAt: new Date().toISOString(),
//           };

//           set((state) => ({
//             balance: state.balance - amount,
//             escrowBalance: state.escrowBalance + amount,
//             escrowTransactions: [newEscrow, ...state.escrowTransactions],
//             transactions: [newTransaction, ...state.transactions],
//             isLoading: false,
//           }));

//           return true;
//         } catch (error) {
//           set({ isLoading: false });
//           return false;
//         }
//       },

//       approveEscrow: async (escrowId: string) => {
//         set({ isLoading: true });
//         try {
//           await new Promise((resolve) => setTimeout(resolve, 1000));

//           set((state) => ({
//             escrowTransactions: state.escrowTransactions.map((escrow) =>
//               escrow.id === escrowId
//                 ? {
//                     ...escrow,
//                     status: "approved" as const,
//                     approvedAt: new Date().toISOString(),
//                   }
//                 : escrow
//             ),
//             isLoading: false,
//           }));

//           return true;
//         } catch (error) {
//           set({ isLoading: false });
//           return false;
//         }
//       },

//       releaseEscrow: async (escrowId: string) => {
//         set({ isLoading: true });
//         try {
//           await new Promise((resolve) => setTimeout(resolve, 1000));

//           const escrow = get().escrowTransactions.find(
//             (e) => e.id === escrowId
//           );
//           if (!escrow) return false;

//           const newTransaction: Transaction = {
//             id: Date.now().toString(),
//             type: "escrow_release",
//             amount: escrow.amount,
//             description: `Escrow released for ${escrow.propertyTitle}`,
//             propertyId: escrow.propertyId,
//             propertyTitle: escrow.propertyTitle,
//             status: "completed",
//             createdAt: new Date().toISOString(),
//             completedAt: new Date().toISOString(),
//           };

//           set((state) => ({
//             escrowBalance: state.escrowBalance - escrow.amount,
//             escrowTransactions: state.escrowTransactions.map((e) =>
//               e.id === escrowId
//                 ? {
//                     ...e,
//                     status: "released" as const,
//                     releasedAt: new Date().toISOString(),
//                   }
//                 : e
//             ),
//             transactions: [newTransaction, ...state.transactions],
//             isLoading: false,
//           }));

//           return true;
//         } catch (error) {
//           set({ isLoading: false });
//           return false;
//         }
//       },

//       refundEscrow: async (escrowId: string) => {
//         set({ isLoading: true });
//         try {
//           await new Promise((resolve) => setTimeout(resolve, 1000));

//           const escrow = get().escrowTransactions.find(
//             (e) => e.id === escrowId
//           );
//           if (!escrow) return false;

//           const newTransaction: Transaction = {
//             id: Date.now().toString(),
//             type: "refund",
//             amount: escrow.amount,
//             description: `Refund for ${escrow.propertyTitle}`,
//             propertyId: escrow.propertyId,
//             propertyTitle: escrow.propertyTitle,
//             status: "completed",
//             createdAt: new Date().toISOString(),
//             completedAt: new Date().toISOString(),
//           };

//           set((state) => ({
//             balance: state.balance + escrow.amount,
//             escrowBalance: state.escrowBalance - escrow.amount,
//             escrowTransactions: state.escrowTransactions.map((e) =>
//               e.id === escrowId ? { ...e, status: "refunded" as const } : e
//             ),
//             transactions: [newTransaction, ...state.transactions],
//             isLoading: false,
//           }));

//           return true;
//         } catch (error) {
//           set({ isLoading: false });
//           return false;
//         }
//       },

//       addPaymentMethod: (method: Omit<PaymentMethod, "id">) => {
//         const newMethod: PaymentMethod = {
//           ...method,
//           id: Date.now().toString(),
//         };

//         set((state) => ({
//           paymentMethods: [...state.paymentMethods, newMethod],
//         }));
//       },

//       removePaymentMethod: (methodId: string) => {
//         set((state) => ({
//           paymentMethods: state.paymentMethods.filter((m) => m.id !== methodId),
//         }));
//       },

//       setDefaultPaymentMethod: (methodId: string) => {
//         set((state) => ({
//           paymentMethods: state.paymentMethods.map((m) => ({
//             ...m,
//             isDefault: m.id === methodId,
//           })),
//         }));
//       },
//     }),
//     { name: "wallet-storage" }
//   )
// );
