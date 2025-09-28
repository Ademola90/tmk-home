import { FiX, FiCheck, FiAlertCircle, FiInfo } from "react-icons/fi";
import { useToastStore } from "../../store/useToastStore";

const Toast = () => {
  const { toasts, removeToast } = useToastStore();

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <FiCheck className="text-green-500" size={20} />;
      case "error":
        return <FiAlertCircle className="text-red-500" size={20} />;
      default:
        return <FiInfo className="text-blue-500" size={20} />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center p-4 rounded-lg border shadow-lg max-w-sm animate-slide-in ${getBackgroundColor(
            toast.type
          )}`}
        >
          {getIcon(toast.type)}
          <span className="ml-3 text-sm font-medium text-gray-900 flex-1">
            {toast.message}
          </span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-3 text-gray-400 hover:text-gray-600"
          >
            <FiX size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;

// import { FiX, FiCheck, FiAlertCircle, FiInfo } from "react-icons/fi";
// import { useToastStore } from "../../store/toastStore";

// const Toast = () => {
//   const { toasts, removeToast } = useToastStore();

//   const getIcon = (type: string) => {
//     switch (type) {
//       case "success":
//         return <FiCheck className="text-green-500" size={20} />;
//       case "error":
//         return <FiAlertCircle className="text-red-500" size={20} />;
//       default:
//         return <FiInfo className="text-blue-500" size={20} />;
//     }
//   };

//   const getBackgroundColor = (type: string) => {
//     switch (type) {
//       case "success":
//         return "bg-green-50 border-green-200";
//       case "error":
//         return "bg-red-50 border-red-200";
//       default:
//         return "bg-blue-50 border-blue-200";
//     }
//   };

//   return (
//     <div className="fixed top-4 right-4 z-50 space-y-2">
//       {toasts.map((toast) => (
//         <div
//           key={toast.id}
//           className={`flex items-center p-4 rounded-lg border shadow-lg max-w-sm animate-slide-in ${getBackgroundColor(
//             toast.type
//           )}`}
//         >
//           {getIcon(toast.type)}
//           <span className="ml-3 text-sm font-medium text-gray-900 flex-1">
//             {toast.message}
//           </span>
//           <button
//             onClick={() => removeToast(toast.id)}
//             className="ml-3 text-gray-400 hover:text-gray-600"
//           >
//             <FiX size={16} />
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Toast;
