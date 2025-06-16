"use client";
import { fetchTProfile } from "@/app/utils/fetchProfile";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useUser } from "@/app/context/Usercontext";

interface ChatListProps {
  userId?: string;
  conversations: any[];
  loading: boolean;
  error: string | null;
}

export const ChatList: React.FC<ChatListProps> = ({
  conversations,
  loading,
  error,
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

  if (loading) return <p>Loading chats...</p>;
  if (error) return <p>{error}</p>;
  if (!currentUser) return <p>Loading user info...</p>;
  if (conversations.length === 0) return <p>No chats found.</p>;
  console.log(currentUser);

  return (
    <div className="mt-4 max-h-[80vh] overflow-y-auto pr-2 space-y-4">
      {conversations.map((conv) => {
        const lastMsg = conv.lastMessage;

        // Check if current user sent the last message
        const isCurrentUserSender = lastMsg.userId === currentUser.name;

        // Format date nicely
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
                {isCurrentUserSender ? "You: " : ""}
                {lastMsg.text}
              </p>
            </div>

            <div className="flex flex-col items-end min-w-[70px]">
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {dateString}
              </span>
              {conv.unreadCount > 0 && (
                <span className="text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center mt-1">
                  {conv.unreadCount}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
