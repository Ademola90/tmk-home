import { motion } from "framer-motion";
import { FiShield, FiCheck, FiX, FiClock } from "react-icons/fi";
// import { useWalletStore } from "../../store/useWalletStore";
// import { useToastStore } from "../../store/useToastStore";
import Button from "../common/Button";
import { useWalletStore } from "../../store/useWalletStore";
import { useToastStore } from "../../store/useToastStore";

const EscrowManager = () => {
  const {
    escrowTransactions,
    approveEscrow,
    releaseEscrow,
    refundEscrow,
    isLoading,
  } = useWalletStore();
  const { addToast } = useToastStore();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleApprove = async (escrowId: string) => {
    const success = await approveEscrow(escrowId);
    if (success) {
      addToast("Escrow approved successfully", "success");
    } else {
      addToast("Failed to approve escrow", "error");
    }
  };

  const handleRelease = async (escrowId: string) => {
    const success = await releaseEscrow(escrowId);
    if (success) {
      addToast("Escrow funds released to seller", "success");
    } else {
      addToast("Failed to release escrow", "error");
    }
  };

  const handleRefund = async (escrowId: string) => {
    const success = await refundEscrow(escrowId);
    if (success) {
      addToast("Escrow funds refunded to your wallet", "success");
    } else {
      addToast("Failed to refund escrow", "error");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <FiClock className="w-5 h-5 text-yellow-500" />;
      case "approved":
        return <FiCheck className="w-5 h-5 text-blue-500" />;
      case "released":
        return <FiCheck className="w-5 h-5 text-accent" />;
      case "refunded":
        return <FiX className="w-5 h-5 text-destructive" />;
      default:
        return <FiShield className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "approved":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "released":
        return "text-accent bg-accent/10 border-accent/20";
      case "refunded":
        return "text-destructive bg-destructive/10 border-destructive/20";
      default:
        return "text-muted-foreground bg-muted border-border";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">
          Escrow Transactions
        </h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <FiShield className="w-4 h-4" />
          <span>Secure transactions</span>
        </div>
      </div>

      {escrowTransactions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiShield className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            No Escrow Transactions
          </h3>
          <p className="text-muted-foreground">
            Your escrow transactions will appear here when you make property
            purchases.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {escrowTransactions.map((escrow, index) => (
            <motion.div
              key={escrow.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <FiShield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {escrow.propertyTitle}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Escrow ID: {escrow.id}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>
                        Created:{" "}
                        {new Date(escrow.createdAt).toLocaleDateString()}
                      </span>
                      {escrow.approvedAt && (
                        <span>
                          Approved:{" "}
                          {new Date(escrow.approvedAt).toLocaleDateString()}
                        </span>
                      )}
                      {escrow.releasedAt && (
                        <span>
                          Released:{" "}
                          {new Date(escrow.releasedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground mb-2">
                    {formatCurrency(escrow.amount)}
                  </div>
                  <div
                    className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      escrow.status
                    )}`}
                  >
                    {getStatusIcon(escrow.status)}
                    <span>
                      {escrow.status.charAt(0).toUpperCase() +
                        escrow.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  {escrow.status === "pending" && (
                    <p>Waiting for seller approval and property inspection</p>
                  )}
                  {escrow.status === "approved" && (
                    <p>
                      Ready for completion - funds can be released or refunded
                    </p>
                  )}
                  {escrow.status === "released" && (
                    <p>Transaction completed - funds released to seller</p>
                  )}
                  {escrow.status === "refunded" && (
                    <p>Transaction cancelled - funds returned to your wallet</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {escrow.status === "pending" && (
                    <Button
                      size="sm"
                      onClick={() => handleApprove(escrow.id)}
                      isLoading={isLoading}
                    >
                      Approve
                    </Button>
                  )}

                  {escrow.status === "approved" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRefund(escrow.id)}
                        isLoading={isLoading}
                      >
                        Request Refund
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleRelease(escrow.id)}
                        isLoading={isLoading}
                      >
                        Release Funds
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EscrowManager;
