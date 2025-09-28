import { create } from "zustand";
import { persist } from "zustand/middleware";
import woman from "../assets/woman.png";

export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: Date;
  agentName?: string;
  agentAvatar?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  isActive: boolean;
  lastMessage?: Date;
  agentId?: string;
}

interface ChatState {
  sessions: ChatSession[];
  activeSessionId: string | null;
  isOnline: boolean;
  unreadMessages: number;
  createSession: (title?: string) => string;
  addMessage: (
    sessionId: string,
    content: string,
    sender: "user" | "agent",
    agentName?: string
  ) => void;
  setActiveSession: (sessionId: string) => void;
  closeSession: (sessionId: string) => void;
  markMessagesAsRead: (sessionId: string) => void;
  setOnlineStatus: (status: boolean) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      sessions: [],
      activeSessionId: null,
      isOnline: true,
      unreadMessages: 0,
      createSession: (title = "New Chat") => {
        const sessionId = Date.now().toString();
        const newSession: ChatSession = {
          id: sessionId,
          title,
          messages: [
            {
              id: "1",
              content: "Hello! Welcome to Estatein. How can I help you today?",
              sender: "agent",
              timestamp: new Date(),
              agentName: "Sarah Johnson",
              agentAvatar: woman,
            },
          ],
          isActive: true,
          lastMessage: new Date(),
          agentId: "agent-1",
        };

        set((state) => ({
          sessions: [newSession, ...state.sessions],
          activeSessionId: sessionId,
        }));

        return sessionId;
      },
      addMessage: (sessionId, content, sender, agentName) => {
        const messageId = Date.now().toString();
        const newMessage: ChatMessage = {
          id: messageId,
          content,
          sender,
          timestamp: new Date(),
          agentName: sender === "agent" ? agentName : undefined,
          agentAvatar:
            sender === "agent" ? "/professional-woman-agent.png" : undefined,
        };

        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === sessionId
              ? {
                  ...session,
                  messages: [...session.messages, newMessage],
                  lastMessage: new Date(),
                }
              : session
          ),
          unreadMessages:
            sender === "agent"
              ? state.unreadMessages + 1
              : state.unreadMessages,
        }));

        // Simulate agent response for demo
        if (sender === "user") {
          setTimeout(() => {
            const responses = [
              "Thank you for your message. Let me help you with that.",
              "I understand your inquiry. Our team will get back to you shortly.",
              "That's a great question! Let me provide you with more information.",
              "I'd be happy to assist you with your property search.",
              "Let me connect you with one of our property specialists.",
            ];
            const randomResponse =
              responses[Math.floor(Math.random() * responses.length)];

            get().addMessage(
              sessionId,
              randomResponse,
              "agent",
              "Sarah Johnson"
            );
          }, 1000 + Math.random() * 2000);
        }
      },
      setActiveSession: (sessionId) => {
        set({ activeSessionId: sessionId });
      },
      closeSession: (sessionId) => {
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === sessionId ? { ...session, isActive: false } : session
          ),
          activeSessionId:
            state.activeSessionId === sessionId ? null : state.activeSessionId,
        }));
      },
      markMessagesAsRead: (sessionId) => {
        set((state) => {
          const session = state.sessions.find((s) => s.id === sessionId);
          const agentMessagesCount = session
            ? session.messages.filter((m) => m.sender === "agent").length
            : 0;

          return {
            unreadMessages: Math.max(
              0,
              state.unreadMessages - agentMessagesCount
            ),
          };
        });
      },
      setOnlineStatus: (status) => {
        set({ isOnline: status });
      },
    }),
    {
      name: "chat-storage",
    }
  )
);

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export interface ChatMessage {
//   id: string;
//   content: string;
//   sender: "user" | "agent";
//   timestamp: Date;
//   agentName?: string;
//   agentAvatar?: string;
// }

// export interface ChatSession {
//   id: string;
//   title: string;
//   messages: ChatMessage[];
//   isActive: boolean;
//   lastMessage?: Date;
//   agentId?: string;
// }

// interface ChatState {
//   sessions: ChatSession[];
//   activeSessionId: string | null;
//   isOnline: boolean;
//   unreadMessages: number;
//   createSession: (title?: string) => string;
//   addMessage: (
//     sessionId: string,
//     content: string,
//     sender: "user" | "agent",
//     agentName?: string
//   ) => void;
//   setActiveSession: (sessionId: string) => void;
//   closeSession: (sessionId: string) => void;
//   markMessagesAsRead: (sessionId: string) => void;
//   setOnlineStatus: (status: boolean) => void;
// }

// export const useChatStore = create<ChatState>()(
//   persist(
//     (set, get) => ({
//       sessions: [],
//       activeSessionId: null,
//       isOnline: true,
//       unreadMessages: 0,
//       createSession: (title = "New Chat") => {
//         const sessionId = Date.now().toString();
//         const newSession: ChatSession = {
//           id: sessionId,
//           title,
//           messages: [
//             {
//               id: "1",
//               content: "Hello! Welcome to Estatein. How can I help you today?",
//               sender: "agent",
//               timestamp: new Date(),
//               agentName: "Sarah Johnson",
//               agentAvatar: "/professional-woman-agent.png",
//             },
//           ],
//           isActive: true,
//           lastMessage: new Date(),
//           agentId: "agent-1",
//         };

//         set((state) => ({
//           sessions: [newSession, ...state.sessions],
//           activeSessionId: sessionId,
//         }));

//         return sessionId;
//       },
//       addMessage: (sessionId, content, sender, agentName) => {
//         const messageId = Date.now().toString();
//         const newMessage: ChatMessage = {
//           id: messageId,
//           content,
//           sender,
//           timestamp: new Date(),
//           agentName: sender === "agent" ? agentName : undefined,
//           agentAvatar:
//             sender === "agent" ? "/professional-woman-agent.png" : undefined,
//         };

//         set((state) => ({
//           sessions: state.sessions.map((session) =>
//             session.id === sessionId
//               ? {
//                   ...session,
//                   messages: [...session.messages, newMessage],
//                   lastMessage: new Date(),
//                 }
//               : session
//           ),
//           unreadMessages:
//             sender === "agent"
//               ? state.unreadMessages + 1
//               : state.unreadMessages,
//         }));

//         // Simulate agent response for demo
//         if (sender === "user") {
//           setTimeout(() => {
//             const responses = [
//               "Thank you for your message. Let me help you with that.",
//               "I understand your inquiry. Our team will get back to you shortly.",
//               "That's a great question! Let me provide you with more information.",
//               "I'd be happy to assist you with your property search.",
//               "Let me connect you with one of our property specialists.",
//             ];
//             const randomResponse =
//               responses[Math.floor(Math.random() * responses.length)];

//             get().addMessage(
//               sessionId,
//               randomResponse,
//               "agent",
//               "Sarah Johnson"
//             );
//           }, 1000 + Math.random() * 2000);
//         }
//       },
//       setActiveSession: (sessionId) => {
//         set({ activeSessionId: sessionId });
//       },
//       closeSession: (sessionId) => {
//         set((state) => ({
//           sessions: state.sessions.map((session) =>
//             session.id === sessionId ? { ...session, isActive: false } : session
//           ),
//           activeSessionId:
//             state.activeSessionId === sessionId ? null : state.activeSessionId,
//         }));
//       },
//       markMessagesAsRead: (sessionId) => {
//         set((state) => ({
//           unreadMessages: Math.max(
//             0,
//             state.unreadMessages -
//               state.sessions
//                 .find((s) => s.id === sessionId)
//                 ?.messages.filter((m) => m.sender === "agent").length || 0
//           ),
//         }));
//       },
//       setOnlineStatus: (status) => {
//         set({ isOnline: status });
//       },
//     }),
//     {
//       name: "chat-storage",
//     }
//   )
// );
