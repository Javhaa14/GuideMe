"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useUser } from "@/app/context/Usercontext";
import Chat from "./Chat";
import { useOnlineStatus } from "@/app/context/Onlinestatus";
import { axiosInstance } from "@/lib/utils";

interface ChatListProps {
  receiverId?: string;
  conversations: any[];
  loading: boolean;
  error: string | null;
  onConversationOpen: (otherUserId: string) => void;
  notificationCounts: Record<string, number>;
  setNotificationCounts: React.Dispatch<
    React.SetStateAction<Record<string, number>>
  >;
}

export const ChatList: React.FC<ChatListProps> = ({
  conversations,
  loading,
  error,
  receiverId,
  onConversationOpen,
  notificationCounts,
  setNotificationCounts,
}) => {
  const { data: session } = useSession();
  const [selectedChat, setSelectedChat] = useState<any | null>(null);
  const { user } = useUser();
  const { onlineUsers } = useOnlineStatus();
  const currentUser = user;

  if (loading) return <p>Loading chats...</p>;
  if (error) return <p>{error}</p>;
  if (!currentUser) return <p>Loading user info...</p>;
  if (conversations.length === 0) return <p>No chats found.</p>;

  const handleChatOpen = async (conv: any) => {
    setSelectedChat(conv);
    onConversationOpen(conv.user.id);

    try {
      await axiosInstance.put("/notif/seen", {
        senderId: conv.user.id,
        receiverId: currentUser.id,
      });

      setNotificationCounts((prev) => ({
        ...prev,
        [conv.user.id]: 0,
      }));
    } catch (error) {
      console.error("❌ Failed to mark as seen:", error);
    }
  };

  return (
    <div className="mt-4 max-h-[80vh] overflow-y-auto pr-2 space-y-4">
      {conversations.map((conv) => {
        const senderId = conv.user.id;
        const count = notificationCounts[senderId] || 0;
        const lastMsg = conv.lastMessage;
        const isCurrentUserSender = lastMsg.userId === currentUser.name;
        const dateString = new Date(lastMsg.createdAt).toLocaleString(
          undefined,
          {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }
        );

        return (
          <div
            key={conv.roomId}
            className="cursor-pointer flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            onClick={() => handleChatOpen(conv)}>
            <img
              src={conv.user.profileImage || "/user.jpg"}
              alt={conv.user.name}
              className="w-12 h-12 rounded-full object-cover"
            />

            <div className="flex-1 min-w-0">
              <h2 className="font-medium text-sm truncate">{conv.user.name}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {isCurrentUserSender ? "You: " : ""}
                {lastMsg.text}
              </p>
            </div>

            <div className="flex flex-col items-end min-w-[70px]">
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {dateString}
              </span>
              {count > 0 && (
                <span className="text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center mt-1">
                  {count}
                </span>
              )}
            </div>
          </div>
        );
      })}

      {selectedChat && (
        <div className="fixed z-50 overflow-hidden bg-white border border-gray-200 shadow-2xl bottom-6 right-6 w-80 h-110 rounded-2xl animate-in slide-in-from-bottom-4">
          <div className="flex flex-col w-full h-full">
            <div className="p-4 pb-0 text-white bg-gradient-to-r from-green-500 to-emerald-600">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">
                  Chat with {selectedChat.user.name}
                </h3>
                <button
                  onClick={() => setSelectedChat(null)}
                  className="text-white transition-colors hover:text-gray-200">
                  ×
                </button>
              </div>
            </div>
            <div className="flex w-full h-full">
              <Chat
                profileId={selectedChat.user.id}
                onlineUsers={onlineUsers}
                user={user}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
