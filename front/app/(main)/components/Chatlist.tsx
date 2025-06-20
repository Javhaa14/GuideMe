"use client";
<<<<<<< HEAD
import { fetchTProfile } from "@/app/utils/fetchProfile";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useUser } from "@/app/context/Usercontext";

interface ChatListProps {
  userId?: string;
  conversations: any[];
  loading: boolean;
  error: string | null;
=======

import { useState } from "react";
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
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
}

export const ChatList: React.FC<ChatListProps> = ({
  conversations,
  loading,
  error,
<<<<<<< HEAD
}) => {
  const { data: session } = useSession();
  // const currentUserId = session?.user?.id;
  const { user } = useUser();
  const currentUser = user;
  const [profileImages, setProfileImages] = useState<
    Record<string, string | null>
  >({});

  useEffect(() => {
    async function loadProfiles() {
      const missingIds = conversations
        .map((conv) => conv.user.id)
        .filter((id) => !profileImages[id]);

      if (missingIds.length === 0) return;

      const newProfileImages: Record<string, string | null> = {};

      await Promise.all(
        missingIds.map(async (userId) => {
          const profileData = await fetchTProfile(userId);
          newProfileImages[userId] = profileData?.profileimage || null;
        })
      );

      setProfileImages((prev) => ({ ...prev, ...newProfileImages }));
    }

    if (conversations.length > 0) {
      loadProfiles();
    }
  }, [conversations, profileImages]);
=======
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
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a

  if (loading) return <p>Loading chats...</p>;
  if (error) return <p>{error}</p>;
  if (!currentUser) return <p>Loading user info...</p>;
  if (conversations.length === 0) return <p>No chats found.</p>;
<<<<<<< HEAD
  console.log(currentUser);

  return (
    <div className="mt-4 max-h-[80vh] overflow-y-auto pr-2 space-y-4">
      {conversations.map((conv) => {
        const lastMsg = conv.lastMessage;

        // Check if current user sent the last message
        const isCurrentUserSender = lastMsg.userId === currentUser.name;

        // Format date nicely
=======

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
    <div className="mt-4 max-h-[80vh] overflow-y-auto pr-2 space-y-4 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 rounded-2xl p-2 shadow-xl">
      {conversations.map((conv) => {
        if (!conv.user) return null;
        const senderId = conv.user.id;
        const count = notificationCounts[senderId] || 0;
        const lastMsg = conv.lastMessage || {
          text: "No messages yet",
          createdAt: new Date(),
          userId: "",
        };
        const isCurrentUserSender = lastMsg.userId === currentUser.name;
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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
<<<<<<< HEAD
=======
        const isOnline = onlineUsers[senderId]?.isOnline;
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a

        return (
          <div
            key={conv.roomId}
<<<<<<< HEAD
            className="cursor-pointer flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <div className="relative">
              <img
                src={
                  profileImages[conv.user.id] ||
                  conv.user.profileImage ||
                  "/user.jpg"
                }
                alt={conv.user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="font-medium text-sm truncate">{conv.user.name}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
=======
            className="cursor-pointer flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-900 to-blue-800 shadow-md hover:scale-[1.03] hover:shadow-xl transition-all border border-blue-800 relative group"
            onClick={() => handleChatOpen(conv)}>
            <div className="relative">
              <img
                src={conv.user.profileImage || "/user.jpg"}
                alt={conv.user.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-700 shadow-lg"
              />
              {isOnline && (
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 border-2 border-blue-900 rounded-full"></span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-base text-blue-100 truncate flex items-center gap-2">
                {conv.user.name}
                {isOnline && (
                  <span className="ml-1 text-xs text-green-400">●</span>
                )}
              </h2>
              <p className="text-xs text-blue-300 truncate mt-1">
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
                {isCurrentUserSender ? "You: " : ""}
                {lastMsg.text}
              </p>
            </div>

            <div className="flex flex-col items-end min-w-[70px]">
<<<<<<< HEAD
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {dateString}
              </span>
              {conv.unreadCount > 0 && (
                <span className="text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center mt-1">
                  {conv.unreadCount}
=======
              <span className="text-xs text-blue-400">{dateString}</span>
              {count > 0 && (
                <span className="text-xs bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center mt-2 font-bold shadow-lg">
                  {count}
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
                </span>
              )}
            </div>
          </div>
        );
      })}
<<<<<<< HEAD
=======

      {selectedChat && (
        <div className="fixed z-50 overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 border border-blue-800 shadow-2xl bottom-6 right-6 w-[420px] h-[600px] rounded-3xl animate-in slide-in-from-bottom-4">
          <div className="flex flex-col w-full h-full">
            <div className="p-6 pb-0 text-white bg-gradient-to-r from-blue-800 to-blue-700 rounded-t-3xl shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">
                  Chat with {selectedChat.user.name}
                </h3>
                <button
                  onClick={() => setSelectedChat(null)}
                  className="text-white text-2xl transition-colors hover:text-blue-300 font-bold">
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
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
    </div>
  );
};
