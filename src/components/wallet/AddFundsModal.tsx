import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCreditCard, FiDollarSign } from "react-icons/fi";
// import { useWalletStore } from "../../store/useWalletStore";
// import { useToastStore } from "../../store/useToastStore";
import Button from "../common/Button";
import { useWalletStore } from "../../store/useWalletStore";
import { useToastStore } from "../../store/useToastStore";

interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddFundsModal = ({ isOpen, onClose }: AddFundsModalProps) => {
  const [amount, setAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { addFunds, paymentMethods, isLoading } = useWalletStore();
  const { addToast } = useToastStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const amountNum = Number.parseFloat(amount);
    if (!amountNum || amountNum <= 0) {
      addToast("Please enter a valid amount", "error");
      return;
    }

    if (!selectedPaymentMethod) {
      addToast("Please select a payment method", "error");
      return;
    }

    const success = await addFunds(amountNum, selectedPaymentMethod);
    if (success) {
      addToast("Funds added successfully!", "success");
      setAmount("");
      setSelectedPaymentMethod("");
      onClose();
    } else {
      addToast("Failed to add funds. Please try again.", "error");
    }
  };

  const quickAmounts = [100, 500, 1000, 5000];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-card rounded-xl p-6 w-full max-w-md mx-4 border border-border"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Add Funds
              </h2>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Amount
                </label>
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                    min="1"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Quick Select
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {quickAmounts.map((quickAmount) => (
                    <button
                      key={quickAmount}
                      type="button"
                      onClick={() => setAmount(quickAmount.toString())}
                      className="px-3 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors"
                    >
                      ${quickAmount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Payment Method
                </label>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedPaymentMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-secondary/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedPaymentMethod === method.id}
                        onChange={(e) =>
                          setSelectedPaymentMethod(e.target.value)
                        }
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FiCreditCard className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {method.type === "card"
                              ? `${method.brand} •••• ${method.last4}`
                              : `${method.bankName} •••• ${method.accountNumber}`}
                          </p>
                          {method.isDefault && (
                            <p className="text-xs text-primary">Default</p>
                          )}
                        </div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          selectedPaymentMethod === method.id
                            ? "border-primary bg-primary"
                            : "border-border"
                        }`}
                      >
                        {selectedPaymentMethod === method.id && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
                disabled={!amount || !selectedPaymentMethod}
              >
                Add ${amount || "0"} to Wallet
              </Button>
            </form>

            <div className="mt-4 p-3 bg-secondary/30 rounded-lg">
              <p className="text-xs text-muted-foreground">
                Funds will be available immediately after processing. Processing
                fees may apply depending on your payment method.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddFundsModal;
