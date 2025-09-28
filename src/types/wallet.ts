export interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "escrow_hold" | "escrow_release" | "refund";
  amount: number;
  description: string;
  propertyId?: string;
  propertyTitle?: string;
  status: "pending" | "completed" | "failed" | "cancelled";
  createdAt: string;
  completedAt?: string;
}

export interface EscrowTransaction {
  id: string;
  propertyId: string;
  propertyTitle: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  status: "pending" | "approved" | "released" | "refunded";
  createdAt: string;
  approvedAt?: string;
  releasedAt?: string;
}

export interface WalletState {
  balance: number;
  escrowBalance: number;
  transactions: Transaction[];
  escrowTransactions: EscrowTransaction[];
  isLoading: boolean;
}

export interface PaymentMethod {
  id: string;
  type: "card" | "bank_transfer";
  last4?: string;
  brand?: string;
  bankName?: string;
  accountNumber?: string;
  isDefault: boolean;
}
