import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppButtonProps {
  phoneNumber: string;
}

const WhatsAppButton = ({ phoneNumber }: WhatsAppButtonProps) => {
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\+/g, "")}`;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-7 h-7" />
      </a>
    </div>
  );
};

export default WhatsAppButton;

// import { FiMessageCircle } from "react-icons/fi";

// const WhatsAppButton = () => {
//   const handleWhatsAppClick = () => {
//     const phoneNumber = "2348134392733";
//     const message = "Hello! I would like to inquire about your services.";
//     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
//       message
//     )}`;
//     window.open(whatsappUrl, "_blank");
//   };

//   return (
//     <button
//       onClick={handleWhatsAppClick}
//       className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
//       aria-label="Contact us on WhatsApp"
//     >
//       <FiMessageCircle size={24} />
//     </button>
//   );
// };

// export default WhatsAppButton;
