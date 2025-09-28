import type React from "react";
import { useState, useRef, useEffect } from "react";
import { FaComments, FaTimes, FaPaperPlane, FaUser } from "react-icons/fa";
import { useChatStore } from "../../store/useChatStore";
import { formatDistanceToNow } from "date-fns";

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    sessions,
    activeSessionId,
    isOnline,
    unreadMessages,
    createSession,
    addMessage,
    setActiveSession,
    markMessagesAsRead,
  } = useChatStore();

  const activeSession = sessions.find((s) => s.id === activeSessionId);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeSession?.messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleOpenChat = () => {
    setIsOpen(true);
    if (!activeSessionId) {
      const sessionId = createSession("Property Inquiry");
      setActiveSession(sessionId);
    }
    if (activeSessionId) {
      markMessagesAsRead(activeSessionId);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim() || !activeSessionId) return;

    addMessage(activeSessionId, message, "user");
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleOpenChat}
          className="relative bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <FaComments className="w-6 h-6" />
          {unreadMessages > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
              {unreadMessages > 9 ? "9+" : unreadMessages}
            </span>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-green-600 rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="relative">
                <img
                  src="/professional-woman-agent.png"
                  alt="Agent"
                  className="w-8 h-8 rounded-full"
                />
                <div
                  className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    isOnline ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></div>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">
                  Estatein Support
                </h3>
                <p className="text-green-100 text-xs">
                  {isOnline ? "Online now" : "Offline"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {activeSession?.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "agent" && (
                  <img
                    src={
                      msg.agentAvatar ||
                      "/placeholder.svg?height=24&width=24&query=professional woman agent"
                    }
                    alt="Agent"
                    className="w-6 h-6 rounded-full flex-shrink-0 mt-1"
                  />
                )}
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    msg.sender === "user"
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 text-gray-100"
                  }`}
                >
                  <p>{msg.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === "user" ? "text-green-100" : "text-gray-400"
                    }`}
                  >
                    {formatDistanceToNow(new Date(msg.timestamp), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                {msg.sender === "user" && (
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FaUser className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                <FaPaperPlane className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
