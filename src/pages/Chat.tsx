import type React from "react";
import { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaUser, FaPhone, FaVideo, FaFile } from "react-icons/fa";
import { useChatStore } from "../store/useChatStore";
import { formatDistanceToNow } from "date-fns";
import { useAuthStore } from "../store/useAuthStore";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/sections/Footer";

const Chat: React.FC = () => {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    sessions,
    activeSessionId,
    isOnline,
    createSession,
    addMessage,
    setActiveSession,
    markMessagesAsRead,
  } = useChatStore();

  const { isAuthenticated } = useAuthStore();
  const activeSession = sessions.find((s) => s.id === activeSessionId);

  useEffect(() => {
    if (!activeSessionId && isAuthenticated) {
      const sessionId = createSession("General Inquiry");
      setActiveSession(sessionId);
    }
  }, [activeSessionId, isAuthenticated, createSession, setActiveSession]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeSession?.messages]);

  useEffect(() => {
    if (activeSessionId) {
      markMessagesAsRead(activeSessionId);
    }
  }, [activeSessionId, markMessagesAsRead]);

  const handleSendMessage = () => {
    if (!message.trim() || !activeSessionId) return;

    addMessage(activeSessionId, message, "user");
    setMessage("");

    if (selectedFile) {
      setSelectedFile(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Please Login
            </h1>
            <p className="text-gray-600">
              You need to be logged in to access the chat feature.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Chat Header */}
          <div className="bg-green-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/professional-woman-agent.png"
                alt="Agent"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h1 className="font-semibold">TMK Support</h1>
                <p className="text-sm text-green-100">
                  {isOnline ? "Online now" : "Offline"} • Typically replies in
                  minutes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-green-700 rounded-full transition-colors">
                <FaPhone className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-green-700 rounded-full transition-colors">
                <FaVideo className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {activeSession?.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "agent" && (
                  <img
                    src={msg.agentAvatar}
                    alt="Agent"
                    className="w-8 h-8 rounded-full flex-shrink-0"
                  />
                )}
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === "user" ? "text-green-100" : "text-gray-500"
                    }`}
                  >
                    {formatDistanceToNow(new Date(msg.timestamp), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                {msg.sender === "user" && (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaUser className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* File Preview */}
          {selectedFile && (
            <div className="px-4 py-2 bg-gray-50 border-t flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaFile className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                  {selectedFile.name}
                </span>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaFile className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                <FaPaperPlane className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Chat;

// import type React from "react";
// import { useState, useRef, useEffect } from "react";
// import { FaPaperPlane, FaUser, FaPhone, FaVideo, FaFile } from "react-icons/fa";
// import { useChatStore } from "../store/useChatStore";
// import { formatDistanceToNow } from "date-fns";
// import { useAuthStore } from "../store/useAuthStore";

// const Chat: React.FC = () => {
//   const [message, setMessage] = useState("");
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const {
//     sessions,
//     activeSessionId,
//     isOnline,
//     createSession,
//     addMessage,
//     setActiveSession,
//     markMessagesAsRead,
//   } = useChatStore();

//   // Remove unused 'user' variable if you're not using it
//   const { isAuthenticated } = useAuthStore();
//   const activeSession = sessions.find((s) => s.id === activeSessionId);

//   useEffect(() => {
//     if (!activeSessionId && isAuthenticated) {
//       const sessionId = createSession("General Inquiry");
//       setActiveSession(sessionId);
//     }
//   }, [activeSessionId, isAuthenticated, createSession, setActiveSession]);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [activeSession?.messages]);

//   useEffect(() => {
//     if (activeSessionId) {
//       markMessagesAsRead(activeSessionId);
//     }
//   }, [activeSessionId, markMessagesAsRead]);

//   const handleSendMessage = () => {
//     if (!message.trim() || !activeSessionId) return;

//     addMessage(activeSessionId, message, "user");
//     setMessage("");

//     if (selectedFile) {
//       // Handle file upload logic here
//       setSelectedFile(null);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//     }
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900 mb-4">
//             Please Login
//           </h1>
//           <p className="text-gray-600">
//             You need to be logged in to access the chat feature.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg">
//         {/* Chat Header */}
//         <div className="bg-green-600 text-white p-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <img
//               src="/professional-woman-agent.png"
//               alt="Agent"
//               className="w-10 h-10 rounded-full"
//             />
//             <div>
//               <h1 className="font-semibold">Estatein Support</h1>
//               <p className="text-sm text-green-100">
//                 {isOnline ? "Online now" : "Offline"} • Typically replies in
//                 minutes
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <button className="p-2 hover:bg-green-700 rounded-full transition-colors">
//               <FaPhone className="w-4 h-4" />
//             </button>
//             <button className="p-2 hover:bg-green-700 rounded-full transition-colors">
//               <FaVideo className="w-4 h-4" />
//             </button>
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="h-96 overflow-y-auto p-4 space-y-4">
//           {activeSession?.messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`flex gap-3 ${
//                 msg.sender === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               {msg.sender === "agent" && (
//                 <img
//                   src={
//                     msg.agentAvatar ||
//                     "/placeholder.svg?height=32&width=32&query=professional woman agent"
//                   }
//                   alt="Agent"
//                   className="w-8 h-8 rounded-full flex-shrink-0"
//                 />
//               )}
//               <div
//                 className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
//                   msg.sender === "user"
//                     ? "bg-green-600 text-white"
//                     : "bg-gray-100 text-gray-900"
//                 }`}
//               >
//                 <p className="text-sm">{msg.content}</p>
//                 <p
//                   className={`text-xs mt-1 ${
//                     msg.sender === "user" ? "text-green-100" : "text-gray-500"
//                   }`}
//                 >
//                   {formatDistanceToNow(new Date(msg.timestamp), {
//                     addSuffix: true,
//                   })}
//                 </p>
//               </div>
//               {msg.sender === "user" && (
//                 <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
//                   <FaUser className="w-4 h-4 text-white" />
//                 </div>
//               )}
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* File Preview */}
//         {selectedFile && (
//           <div className="px-4 py-2 bg-gray-50 border-t flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaFile className="w-4 h-4 text-gray-500" />
//               <span className="text-sm text-gray-700">{selectedFile.name}</span>
//             </div>
//             <button
//               onClick={() => setSelectedFile(null)}
//               className="text-red-500 hover:text-red-700"
//             >
//               Remove
//             </button>
//           </div>
//         )}

//         {/* Input */}
//         <div className="p-4 border-t bg-gray-50">
//           <div className="flex gap-2">
//             <input
//               ref={fileInputRef}
//               type="file"
//               onChange={handleFileSelect}
//               className="hidden"
//               accept="image/*,.pdf,.doc,.docx"
//             />
//             <button
//               onClick={() => fileInputRef.current?.click()}
//               className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
//             >
//               <FaFile className="w-4 h-4" />
//             </button>
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Type your message..."
//               className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
//             />
//             <button
//               onClick={handleSendMessage}
//               disabled={!message.trim()}
//               className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
//             >
//               <FaPaperPlane className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;
