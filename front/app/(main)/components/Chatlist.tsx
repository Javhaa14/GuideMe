"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useUser } from "@/app/context/Usercontext";
import { useOnlineStatus } from "@/app/context/Onlinestatus";
import { axiosInstance } from "@/lib/utils";
import HybridChat from "./Chat";

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

  if (loading)
    return (
      <div className="p-4 text-center text-gray-500">Loading chats...</div>
    );
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  if (!currentUser)
    return (
      <div className="p-4 text-center text-gray-500">Loading user info...</div>
    );
  if (conversations.length === 0)
    return <div className="p-4 text-center text-gray-500">No chats found.</div>;

  const handleChatOpen = async (conv: any) => {
    // Find the other user in the conversation (not the current user)
    const otherUser = conv.participants.find(
      (p: any) => p._id !== currentUser.id
    );

    if (!otherUser) {
      console.error("Could not find other user in conversation");
      return;
    }

    const conversationData = {
      ...conv,
      user: {
        id: otherUser._id,
        name: otherUser.username,
        profileImage: otherUser.profileimage,
      },
    };

    setSelectedChat(conversationData);
    onConversationOpen(otherUser._id);

    try {
      await axiosInstance.put("/notif/seen", {
        senderId: otherUser._id,
        receiverId: currentUser.id,
      });

      setNotificationCounts((prev) => ({
        ...prev,
        [otherUser._id]: 0,
      }));
    } catch (error) {
      console.error("❌ Failed to mark as seen:", error);
    }
  };

  return (
    <>
      <div className="max-h-[80vh] overflow-y-auto pr-2 space-y-3 bg-white border-t-[1px] p-3">
        {conversations.map((conv) => {
          // Find the other user (not the current user)
          const otherUser = conv.participants?.find(
            (p: any) => p._id !== currentUser.id
          );

          if (!otherUser) {
            console.warn("No other user found in conversation:", conv);
            return null;
          }

          const otherUserId = otherUser._id;
          const count = notificationCounts[otherUserId] || 0;

          // Handle last message display
          const lastMsg = conv.lastMessage || null;
          let lastMessageText = "No messages yet";
          let isCurrentUserSender = false;
          let dateString = "Just now";

          if (lastMsg) {
            // Check if lastMessage is populated or just an ID
            if (typeof lastMsg === "object" && lastMsg.content) {
              lastMessageText = lastMsg.content;
              isCurrentUserSender = lastMsg.sender === currentUser.id;
              dateString = new Date(
                lastMsg.created_at || lastMsg.createdAt
              ).toLocaleString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
            } else {
              // If lastMessage is just an ID, show generic message
              lastMessageText = "Message";
              dateString = new Date(conv.updatedAt).toLocaleString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
            }
          }

          const isOnline = onlineUsers[otherUserId]?.isOnline;

          return (
            <div
              key={conv._id}
              className="cursor-pointer flex items-center gap-4 p-4 rounded-xl bg-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all border border-gray-200 relative group"
              onClick={() => handleChatOpen(conv)}
            >
              <div className="relative">
                <img
                  src={otherUser.profileimage || "/user.jpg"}
                  alt={otherUser.username}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                />
                {isOnline && (
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-base text-gray-800 truncate flex items-center gap-2">
                  {otherUser.username}
                  {isOnline && (
                    <span className="ml-1 text-xs text-green-500">●</span>
                  )}
                </h2>
                <p className="text-sm text-gray-600 truncate mt-1">
                  {isCurrentUserSender ? "You: " : ""}
                  {lastMessageText}
                </p>
              </div>

              <div className="flex flex-col items-end min-w-[70px]">
                {/* <span className="text-xs text-gray-500">{dateString}</span>
                {count > 0 && (
                  <span className="text-xs bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center mt-2 font-bold shadow-md">
                    {count}
                  </span>
                )} */}
              </div>
            </div>
          );
        })}
      </div>

      {/* Chat Modal */}
      {selectedChat && (
        <div className="fixed z-50 bottom-22 right-6 w-80 h-120 rounded-2xl shadow-2xl bg-white border border-gray-200 overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="p-4 pb-0 text-white bg-gradient-to-r from-green-500 to-emerald-600 flex justify-between items-center">
              <h3 className="font-semibold">
                Chat with {selectedChat.user.name}
              </h3>
              <button
                onClick={() => setSelectedChat(null)}
                className="hover:text-gray-200 cursor-pointer"
              >
                x
              </button>
            </div>
            <HybridChat
              profileId={selectedChat.user.id}
              user={currentUser}
              onlineUsers={onlineUsers}
            />
          </div>
        </div>
      )}
    </>
  );
};
