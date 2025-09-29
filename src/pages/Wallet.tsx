import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiMinus, FiShield, FiCreditCard } from "react-icons/fi";
import WalletOverview from "../components/wallet/WalletOverview";
import EscrowManager from "../components/wallet/EscrowManager";
import AddFundsModal from "../components/wallet/AddFundsModal";
import Button from "../components/common/Button";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/sections/Footer";
import type { IconType } from "react-icons";

type TabId = "overview" | "escrow" | "payments";

interface Tab {
  id: TabId;
  label: string;
  icon: IconType;
}

const Wallet = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [showAddFunds, setShowAddFunds] = useState(false);

  const tabs: Tab[] = [
    { id: "overview", label: "Overview", icon: FiCreditCard },
    { id: "escrow", label: "Escrow", icon: FiShield },
    { id: "payments", label: "Payment Methods", icon: FiCreditCard },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-primary/5 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Your Wallet
              </h1>
              <p className="text-xl text-muted-foreground">
                Manage your funds and secure transactions
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-6 md:mt-0">
              <Button
                onClick={() => setShowAddFunds(true)}
                className="flex items-center space-x-2"
              >
                <FiPlus className="w-4 h-4" />
                <span>Add Funds</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center space-x-2 bg-transparent"
              >
                <FiMinus className="w-4 h-4" />
                <span>Withdraw</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {activeTab === "overview" && <WalletOverview />}
          {activeTab === "escrow" && <EscrowManager />}
          {activeTab === "payments" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Payment Methods
              </h3>
              <p className="text-muted-foreground">
                Payment method management coming soon...
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Add Funds Modal */}
      <AddFundsModal
        isOpen={showAddFunds}
        onClose={() => setShowAddFunds(false)}
      />

      <Footer />
    </div>
  );
};

export default Wallet;

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { FiPlus, FiMinus, FiShield, FiCreditCard } from "react-icons/fi";
// import WalletOverview from "../components/wallet/WalletOverview";
// import EscrowManager from "../components/wallet/EscrowManager";
// import AddFundsModal from "../components/wallet/AddFundsModal";
// import Button from "../components/common/Button";
// import type { IconType } from "react-icons";

// // Define the tab type
// type TabId = "overview" | "escrow" | "payments";

// interface Tab {
//   id: TabId;
//   label: string;
//   icon: IconType;
// }

// const Wallet = () => {
//   const [activeTab, setActiveTab] = useState<TabId>("overview");
//   const [showAddFunds, setShowAddFunds] = useState(false);

//   // Fix: Use proper typing for tabs array
//   const tabs: Tab[] = [
//     { id: "overview", label: "Overview", icon: FiCreditCard },
//     { id: "escrow", label: "Escrow", icon: FiShield },
//     { id: "payments", label: "Payment Methods", icon: FiCreditCard },
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <section className="bg-primary/5 py-12">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="flex flex-col md:flex-row md:items-center justify-between"
//           >
//             <div>
//               <h1 className="text-4xl font-bold text-foreground mb-2">
//                 Your Wallet
//               </h1>
//               <p className="text-xl text-muted-foreground">
//                 Manage your funds and secure transactions
//               </p>
//             </div>
//             <div className="flex items-center space-x-4 mt-6 md:mt-0">
//               <Button
//                 onClick={() => setShowAddFunds(true)}
//                 className="flex items-center space-x-2"
//               >
//                 <FiPlus className="w-4 h-4" />
//                 <span>Add Funds</span>
//               </Button>
//               <Button
//                 variant="outline"
//                 className="flex items-center space-x-2 bg-transparent"
//               >
//                 <FiMinus className="w-4 h-4" />
//                 <span>Withdraw</span>
//               </Button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Navigation Tabs */}
//       <section className="py-6 border-b border-border">
//         <div className="container mx-auto px-4">
//           <nav className="flex space-x-8">
//             {tabs.map((tab) => {
//               const Icon = tab.icon;
//               return (
//                 <button
//                   key={tab.id}
//                   // Fix: Remove 'as any' - tab.id is already properly typed
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors ${
//                     activeTab === tab.id
//                       ? "border-primary text-primary"
//                       : "border-transparent text-muted-foreground hover:text-foreground"
//                   }`}
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span className="font-medium">{tab.label}</span>
//                 </button>
//               );
//             })}
//           </nav>
//         </div>
//       </section>

//       {/* Content */}
//       <section className="py-8">
//         <div className="container mx-auto px-4">
//           {activeTab === "overview" && <WalletOverview />}
//           {activeTab === "escrow" && <EscrowManager />}
//           {activeTab === "payments" && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-center py-16"
//             >
//               <h3 className="text-xl font-semibold text-foreground mb-2">
//                 Payment Methods
//               </h3>
//               <p className="text-muted-foreground">
//                 Payment method management coming soon...
//               </p>
//             </motion.div>
//           )}
//         </div>
//       </section>

//       {/* Add Funds Modal */}
//       <AddFundsModal
//         isOpen={showAddFunds}
//         onClose={() => setShowAddFunds(false)}
//       />
//     </div>
//   );
// };

// export default Wallet;
