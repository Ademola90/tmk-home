import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiHeart, FiShare2, FiDollarSign } from "react-icons/fi";
import PropertyImageGallery from "../components/property/PropertyImageGallery";
import PropertyDetails from "../components/property/PropertyDetails";
// import AgentCard from "../components/property/AgentCard";
import RelatedProperties from "../components/property/RelatedProperties";
import Button from "../components/common/Button";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/sections/Footer";
import { usePropertyStore } from "../store/usePropertyStore";
import { useAuthStore } from "../store/useAuthStore";
import { useWalletStore } from "../store/useWalletStore";
import { useToastStore } from "../store/useToastStore";

const PropertyDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { properties, selectedProperty, setSelectedProperty } =
    usePropertyStore();
  const { isAuthenticated } = useAuthStore();
  const { createEscrow, balance } = useWalletStore();
  const { addToast } = useToastStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const property = selectedProperty || properties.find((p) => p.id === id);

  useEffect(() => {
    if (!property && id) {
      const foundProperty = properties.find((p) => p.id === id);
      if (foundProperty) {
        setSelectedProperty(foundProperty);
      }
    }
  }, [id, properties, property, setSelectedProperty]);

  const handlePurchase = async () => {
    if (!property) return;

    if (!isAuthenticated) {
      addToast("Please login to make a purchase", "error");
      navigate("/login");
      return;
    }

    if (balance < property.price) {
      addToast("Insufficient funds. Please add money to your wallet.", "error");
      navigate("/wallet");
      return;
    }

    setIsProcessing(true);
    const success = await createEscrow(
      property.id,
      property.title,
      property.price,
      property.agent.id
    );

    if (success) {
      addToast("Purchase initiated! Funds moved to escrow.", "success");
      navigate("/wallet");
    } else {
      addToast("Failed to initiate purchase. Please try again.", "error");
    }
    setIsProcessing(false);
  };

  const handleFavorite = () => {
    if (!isAuthenticated) {
      addToast("Please login to save favorites", "error");
      return;
    }
    addToast("Added to favorites", "success");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title,
        text: property?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast("Link copied to clipboard", "success");
    }
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Property Not Found
            </h2>
            <p className="text-muted-foreground mb-6">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/properties")}>
              Browse Properties
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div className="bg-card  sticky top-0 z-40 px-5 md:px-10 lg:px-16">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleFavorite}
                className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
              >
                <FiHeart className="w-5 h-5 text-muted-foreground hover:text-red-500" />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
              >
                <FiShare2 className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <PropertyImageGallery
                images={property.images}
                title={property.title}
              />
            </motion.div>

            {/* Property Details */}
            <PropertyDetails property={property} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-card border border-border rounded-xl p-6 sticky top-24"
            >
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {formatCurrency(property.price)}
                </div>
                <div className="text-muted-foreground">
                  ${Math.round(property.price / property.area)}/sqft
                </div>
              </div>

              {property.status === "available" ? (
                <div className="space-y-4">
                  <Button
                    onClick={handlePurchase}
                    className="w-full"
                    size="lg"
                    isLoading={isProcessing}
                  >
                    <FiDollarSign className="w-5 h-5 mr-2" />
                    Purchase Property
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="lg"
                  >
                    Schedule Viewing
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="lg"
                  >
                    Make Offer
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <div
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                      property.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {property.status === "pending" ? "Sale Pending" : "Sold"}
                  </div>
                  <p className="text-muted-foreground mt-2">
                    This property is no longer available
                  </p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-sm text-muted-foreground">
                  Secure transaction with escrow protection
                </p>
              </div>
            </motion.div>

            {/* Agent Card */}
            {/* <AgentCard agent={property.agent} /> */}
          </div>
        </div>

        {/* Related Properties */}
        <RelatedProperties currentProperty={property} />
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FiArrowLeft, FiHeart, FiShare2, FiDollarSign } from "react-icons/fi";
// import PropertyImageGallery from "../components/property/PropertyImageGallery";
// import PropertyDetails from "../components/property/PropertyDetails";
// import AgentCard from "../components/property/AgentCard";
// import RelatedProperties from "../components/property/RelatedProperties";
// import Button from "../components/common/Button";
// import { usePropertyStore } from "../store/usePropertyStore";
// import { useAuthStore } from "../store/useAuthStore";
// import { useWalletStore } from "../store/useWalletStore";
// import { useToastStore } from "../store/useToastStore";

// const PropertyDetail = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const { properties, selectedProperty, setSelectedProperty } =
//     usePropertyStore();
//   const { isAuthenticated } = useAuthStore();
//   const { createEscrow, balance } = useWalletStore();
//   const { addToast } = useToastStore();
//   const [isProcessing, setIsProcessing] = useState(false);

//   const property = selectedProperty || properties.find((p) => p.id === id);

//   useEffect(() => {
//     if (!property && id) {
//       const foundProperty = properties.find((p) => p.id === id);
//       if (foundProperty) {
//         setSelectedProperty(foundProperty);
//       }
//     }
//   }, [id, properties, property, setSelectedProperty]);

//   const handlePurchase = async () => {
//     if (!property) return;

//     if (!isAuthenticated) {
//       addToast("Please login to make a purchase", "error");
//       navigate("/login");
//       return;
//     }

//     if (balance < property.price) {
//       addToast("Insufficient funds. Please add money to your wallet.", "error");
//       navigate("/wallet");
//       return;
//     }

//     setIsProcessing(true);
//     const success = await createEscrow(
//       property.id,
//       property.title,
//       property.price,
//       property.agent.id
//     );

//     if (success) {
//       addToast("Purchase initiated! Funds moved to escrow.", "success");
//       navigate("/wallet");
//     } else {
//       addToast("Failed to initiate purchase. Please try again.", "error");
//     }
//     setIsProcessing(false);
//   };

//   const handleFavorite = () => {
//     if (!isAuthenticated) {
//       addToast("Please login to save favorites", "error");
//       return;
//     }
//     addToast("Added to favorites", "success");
//   };

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: property?.title,
//         text: property?.description,
//         url: window.location.href,
//       });
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       addToast("Link copied to clipboard", "success");
//     }
//   };

//   if (!property) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-semibold text-foreground mb-4">
//             Property Not Found
//           </h2>
//           <p className="text-muted-foreground mb-6">
//             The property you're looking for doesn't exist or has been removed.
//           </p>
//           <Button onClick={() => navigate("/properties")}>
//             Browse Properties
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 0,
//     }).format(amount);
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <div className="bg-card border-b border-border sticky top-0 z-40">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <button
//               onClick={() => navigate(-1)}
//               className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
//             >
//               <FiArrowLeft className="w-5 h-5" />
//               <span>Back</span>
//             </button>

//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={handleFavorite}
//                 className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
//               >
//                 <FiHeart className="w-5 h-5 text-muted-foreground hover:text-red-500" />
//               </button>
//               <button
//                 onClick={handleShare}
//                 className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
//               >
//                 <FiShare2 className="w-5 h-5 text-muted-foreground" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Image Gallery */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <PropertyImageGallery
//                 images={property.images}
//                 title={property.title}
//               />
//             </motion.div>

//             {/* Property Details */}
//             <PropertyDetails property={property} />
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Purchase Card */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.6 }}
//               className="bg-card border border-border rounded-xl p-6 sticky top-24"
//             >
//               <div className="text-center mb-6">
//                 <div className="text-3xl font-bold text-primary mb-2">
//                   {formatCurrency(property.price)}
//                 </div>
//                 <div className="text-muted-foreground">
//                   ${Math.round(property.price / property.area)}/sqft
//                 </div>
//               </div>

//               {property.status === "available" ? (
//                 <div className="space-y-4">
//                   <Button
//                     onClick={handlePurchase}
//                     className="w-full"
//                     size="lg"
//                     isLoading={isProcessing}
//                   >
//                     <FiDollarSign className="w-5 h-5 mr-2" />
//                     Purchase Property
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="w-full bg-transparent"
//                     size="lg"
//                   >
//                     Schedule Viewing
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="w-full bg-transparent"
//                     size="lg"
//                   >
//                     Make Offer
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="text-center">
//                   <div
//                     className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
//                       property.status === "pending"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {property.status === "pending" ? "Sale Pending" : "Sold"}
//                   </div>
//                   <p className="text-muted-foreground mt-2">
//                     This property is no longer available
//                   </p>
//                 </div>
//               )}

//               <div className="mt-6 pt-6 border-t border-border text-center">
//                 <p className="text-sm text-muted-foreground">
//                   Secure transaction with escrow protection
//                 </p>
//               </div>
//             </motion.div>

//             {/* Agent Card */}
//             <AgentCard agent={property.agent} />
//           </div>
//         </div>

//         {/* Related Properties */}
//         <RelatedProperties currentProperty={property} />
//       </div>
//     </div>
//   );
// };

// export default PropertyDetail;
