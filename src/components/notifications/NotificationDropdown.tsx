import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  FaBell,
  FaTimes,
  FaEye,
  FaTrash,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useNotificationStore } from "../../store/useNotificationStore";
import { formatDistanceToNow } from "date-fns";

// Define the Notification interface
interface Notification {
  id: string;
  isRead: boolean;
  type: "success" | "warning" | "error" | "info";
  title: string;
  message: string;
  createdAt: string | Date;
  actionUrl?: string;
}

const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  } = useNotificationStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      default:
        return "ℹ️";
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white hover:text-gray-300 transition-colors"
      >
        <FaBell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 className="text-white font-semibold">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1"
                >
                  <FaEye className="w-3 h-3" />
                  Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <FaTrash className="w-3 h-3" />
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                <FaBell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-700 last:border-b-0 cursor-pointer hover:bg-gray-700 transition-colors ${
                    !notification.isRead ? "bg-gray-750" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          className={`font-medium text-sm ${
                            !notification.isRead
                              ? "text-white"
                              : "text-gray-300"
                          }`}
                        >
                          {notification.title}
                        </h4>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="text-gray-500 hover:text-red-400 transition-colors"
                          >
                            <FaTimes className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(
                            new Date(notification.createdAt),
                            { addSuffix: true }
                          )}
                        </span>
                        {notification.actionUrl && (
                          <FaExternalLinkAlt className="w-3 h-3 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;

// import type React from "react";
// import { useState, useRef, useEffect } from "react";
// import {
//   FaBell,
//   FaTimes,
//   FaEye,
//   FaTrash,
//   FaExternalLinkAlt,
// } from "react-icons/fa";
// import { useNotificationStore } from "../../store/useNotificationStore";
// import { formatDistanceToNow } from "date-fns";

// const NotificationDropdown: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const {
//     notifications,
//     unreadCount,
//     markAsRead,
//     markAllAsRead,
//     deleteNotification,
//     clearAll,
//   } = useNotificationStore();

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const getNotificationIcon = (type: string) => {
//     switch (type) {
//       case "success":
//         return "✅";
//       case "warning":
//         return "⚠️";
//       case "error":
//         return "❌";
//       default:
//         return "ℹ️";
//     }
//   };

//   const handleNotificationClick = (notification: any) => {
//     if (!notification.isRead) {
//       markAsRead(notification.id);
//     }
//     if (notification.actionUrl) {
//       window.location.href = notification.actionUrl;
//     }
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="relative p-2 text-white hover:text-gray-300 transition-colors"
//       >
//         <FaBell className="w-5 h-5" />
//         {unreadCount > 0 && (
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
//             {unreadCount > 9 ? "9+" : unreadCount}
//           </span>
//         )}
//       </button>

//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 border-b border-gray-700">
//             <h3 className="text-white font-semibold">Notifications</h3>
//             <div className="flex items-center gap-2">
//               {unreadCount > 0 && (
//                 <button
//                   onClick={markAllAsRead}
//                   className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1"
//                 >
//                   <FaEye className="w-3 h-3" />
//                   Mark all read
//                 </button>
//               )}
//               {notifications.length > 0 && (
//                 <button
//                   onClick={clearAll}
//                   className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
//                 >
//                   <FaTrash className="w-3 h-3" />
//                   Clear all
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Notifications List */}
//           <div className="max-h-96 overflow-y-auto">
//             {notifications.length === 0 ? (
//               <div className="p-4 text-center text-gray-400">
//                 <FaBell className="w-8 h-8 mx-auto mb-2 opacity-50" />
//                 <p>No notifications yet</p>
//               </div>
//             ) : (
//               notifications.map((notification) => (
//                 <div
//                   key={notification.id}
//                   className={`p-4 border-b border-gray-700 last:border-b-0 cursor-pointer hover:bg-gray-700 transition-colors ${
//                     !notification.isRead ? "bg-gray-750" : ""
//                   }`}
//                   onClick={() => handleNotificationClick(notification)}
//                 >
//                   <div className="flex items-start gap-3">
//                     <span className="text-lg flex-shrink-0 mt-1">
//                       {getNotificationIcon(notification.type)}
//                     </span>
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-start justify-between gap-2">
//                         <h4
//                           className={`font-medium text-sm ${
//                             !notification.isRead
//                               ? "text-white"
//                               : "text-gray-300"
//                           }`}
//                         >
//                           {notification.title}
//                         </h4>
//                         <div className="flex items-center gap-1 flex-shrink-0">
//                           {!notification.isRead && (
//                             <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                           )}
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               deleteNotification(notification.id);
//                             }}
//                             className="text-gray-500 hover:text-red-400 transition-colors"
//                           >
//                             <FaTimes className="w-3 h-3" />
//                           </button>
//                         </div>
//                       </div>
//                       <p className="text-gray-400 text-xs mt-1 line-clamp-2">
//                         {notification.message}
//                       </p>
//                       <div className="flex items-center justify-between mt-2">
//                         <span className="text-xs text-gray-500">
//                           {formatDistanceToNow(
//                             new Date(notification.createdAt),
//                             { addSuffix: true }
//                           )}
//                         </span>
//                         {notification.actionUrl && (
//                           <FaExternalLinkAlt className="w-3 h-3 text-gray-500" />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotificationDropdown;
