import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Message, Chat } from "@/types/chat";

interface ChatStore {
  chats: Chat[];
  messages: Record<string, Message[]>;
  activeChat: string | null;
  addChat: () => string;
  setActiveChat: (chatId: string) => void;
  addMessage: (chatId: string, content: string, sender: "user" | "bot") => void;
  updateChatTitle: (chatId: string, title: string) => void;
  deleteChat: (chatId: string) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      chats: [],
      messages: {},
      activeChat: null,

      addChat: () => {
        const newChat: Chat = {
          id: Date.now().toString(),
          title: "Chat Baru",
          lastMessage: "",
          timestamp: new Date(),
        };

        set((state) => ({
          chats: [newChat, ...state.chats],
          activeChat: newChat.id,
          messages: {
            ...state.messages,
            [newChat.id]: [],
          },
        }));

        return newChat.id;
      },

      setActiveChat: (chatId) => {
        set({ activeChat: chatId });
      },

      addMessage: (chatId, content, sender) => {
        const newMessage: Message = {
          id: Date.now().toString(),
          content,
          sender,
          timestamp: new Date(),
        };

        set((state) => {
          const chatMessages = state.messages[chatId] || [];
          const isFirstMessage = chatMessages.length === 0 && sender === "user";

          const updatedChats = state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  lastMessage: content,
                  timestamp: new Date(),
                  title: isFirstMessage ? content : chat.title,
                }
              : chat
          );

          return {
            messages: {
              ...state.messages,
              [chatId]: [...chatMessages, newMessage],
            },
            chats: updatedChats,
          };
        });
      },

      updateChatTitle: (chatId, title) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId ? { ...chat, title } : chat
          ),
        }));
      },

      deleteChat: (chatId) => {
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== chatId),
          messages: Object.fromEntries(
            Object.entries(state.messages).filter(([key]) => key !== chatId)
          ),
          activeChat: state.activeChat === chatId ? null : state.activeChat,
        }));
      },
    }),
    {
      name: "chat-storage",
    }
  )
);
