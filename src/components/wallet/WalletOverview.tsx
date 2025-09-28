"use client";

import { motion } from "framer-motion";
import { FiDollarSign, FiShield, FiTrendingUp, FiClock } from "react-icons/fi";
// import { useWalletStore } from "../../store/useWalletStore";
import { useEffect } from "react";
import { useWalletStore } from "../../store/useWalletStore";

const WalletOverview = () => {
  const { balance, escrowBalance, transactions, fetchWalletData, isLoading } =
    useWalletStore();

  useEffect(() => {
    fetchWalletData();
  }, [fetchWalletData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const recentTransactions = transactions.slice(0, 3);
  const totalBalance = balance + escrowBalance;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <FiDollarSign className="w-6 h-6" />
            </div>
            <span className="text-sm opacity-90">Available Balance</span>
          </div>
          <div className="text-3xl font-bold mb-2">
            {formatCurrency(balance)}
          </div>
          <p className="text-sm opacity-90">Ready for transactions</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <FiShield className="w-6 h-6" />
            </div>
            <span className="text-sm opacity-90">Escrow Balance</span>
          </div>
          <div className="text-3xl font-bold mb-2">
            {formatCurrency(escrowBalance)}
          </div>
          <p className="text-sm opacity-90">Secured transactions</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <FiTrendingUp className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm">Total Portfolio</span>
          </div>
          <div className="text-3xl font-bold mb-2">
            {formatCurrency(totalBalance)}
          </div>
          <p className="text-sm opacity-75">Combined value</p>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-card rounded-xl p-6 border border-border"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground">
            Recent Transactions
          </h3>
          <button className="text-primary hover:text-primary/80 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {recentTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`p-2 rounded-lg ${
                    transaction.type === "deposit"
                      ? "bg-accent/20 text-accent"
                      : transaction.type === "escrow_hold"
                      ? "bg-primary/20 text-primary"
                      : "bg-muted/20 text-muted-foreground"
                  }`}
                >
                  {transaction.type === "deposit" ? (
                    <FiTrendingUp className="w-4 h-4" />
                  ) : transaction.type === "escrow_hold" ? (
                    <FiShield className="w-4 h-4" />
                  ) : (
                    <FiClock className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-semibold ${
                    transaction.type === "deposit"
                      ? "text-accent"
                      : transaction.type === "withdrawal"
                      ? "text-destructive"
                      : "text-foreground"
                  }`}
                >
                  {transaction.type === "withdrawal" ? "-" : ""}
                  {formatCurrency(transaction.amount)}
                </p>
                <p
                  className={`text-xs ${
                    transaction.status === "completed"
                      ? "text-accent"
                      : transaction.status === "pending"
                      ? "text-yellow-600"
                      : "text-destructive"
                  }`}
                >
                  {transaction.status.charAt(0).toUpperCase() +
                    transaction.status.slice(1)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WalletOverview;
