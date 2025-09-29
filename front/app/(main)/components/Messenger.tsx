"use client";

import { useState, useEffect } from "react";
import { MessageCircleMore } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { axiosInstance } from "@/lib/utils";
import { useSocket } from "@/app/context/SocketContext";
import { useProfile } from "@/app/context/ProfileContext";
import { ChatList } from "./Chatlist";

export const MessengerButton = () => {
  const { data: session } = useSession();
  const { requireAuth } = useProfile();
  const userId = session?.user?.id;

  const { socket, isConnected } = useSocket();

  const [open, setOpen] = useState(false);
  const [notificationCounts, setNotificationCounts] = useState<
    Record<string, number>
  >({});
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const notificationCount = Object.values(notificationCounts).reduce(
    (acc, val) => acc + val,
    0
  );

  const handleMessengerClick = () => {
    if (requireAuth("access messenger")) {
      setOpen(true);
    }
  };

  useEffect(() => {
    if (!socket || !isConnected || !userId) return;

    console.log("Joining notify room:", `notify_${userId}`);
    socket.emit("joinNotificationRoom", userId);

    const handleNotify = (data: { senderId: string }) => {
      console.log("🔔 Received notification via socket:", data);
      const senderId = data.senderId;

      // If messenger tab is open, don't increment notifications
      if (open) {
        console.log("Messenger is open, skipping notification increment.");
        return;
      }

      setNotificationCounts((prev) => ({
        ...prev,
        [senderId]: (prev[senderId] || 0) + 1,
      }));
    };

    const handleNotificationsSeen = (data: { senderId: string }) => {
      console.log("✅ Notifications seen from sender:", data.senderId);
      setNotificationCounts((prev) => ({ ...prev, [data.senderId]: 0 }));
    };

    socket.on("notify", handleNotify);
    socket.on("notificationsSeen", handleNotificationsSeen);

    return () => {
      socket.off("notify", handleNotify);
      socket.off("notificationsSeen", handleNotificationsSeen);
      socket.emit("leaveNotificationRoom", userId);
    };
  }, [socket, isConnected, userId]);

  // When sheet is opened, clear all notifications
  useEffect(() => {
    if (open && userId && socket) {
      // Clear all notification counts
      setNotificationCounts({});
      // Emit notificationsSeen for all senders
      Object.keys(notificationCounts).forEach((senderId) => {
        socket.emit("markNotificationsSeen", { senderId, receiverId: userId });
      });
    }
  }, [open, userId, socket]);
  useEffect(() => {
    const fetchChatRooms = async () => {
      if (open && userId) {
        setLoading(true);
        setError(null);
        try {
          // Fix 1: Use correct endpoint
          const res = await axiosInstance.get(`/chat/user/${userId}/rooms`);

          // Fix 2: Check for rooms directly (no success field)
          if (res.data.rooms) {
            setConversations(res.data.rooms);
            console.log("Fetched conversations:", res.data.rooms);
          } else {
            setConversations([]);
            console.log("No rooms found");
          }
        } catch (err) {
          console.error("Error fetching chat rooms:", err);
          setError("Failed to fetch chat list");
          setConversations([]);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchChatRooms();
  }, [open, userId]);

  const onSendMessage = async () => {
    // No-op or you can refresh conversations if needed
  };

  const onConversationOpen = async (otherUserId: string) => {
    if (!userId) return;

    try {
      await axiosInstance.put("/notif/seen", {
        senderId: otherUserId,
        receiverId: userId,
      });

      setNotificationCounts((prev) => ({
        ...prev,
        [otherUserId]: 0,
      }));
    } catch (error) {
      console.error("Failed to mark notifications as seen:", error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="relative rounded-full p-2 hover:bg-white/10 transition-all duration-200 hover:scale-105"
          aria-label="Open Messenger"
          onClick={handleMessengerClick}
        >
          <MessageCircleMore className="h-6 w-6 text-white" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce shadow-lg">
              {notificationCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[300px] top-15 [&>button]:hidden bg-white rounded-2xl"
      >
        <SheetHeader>
          <SheetTitle>Chat</SheetTitle>
        </SheetHeader>

        {error && <div className="text-red-400 text-sm mb-2">{error}</div>}

        <ChatList
          onConversationOpen={onConversationOpen}
          conversations={conversations}
          loading={loading}
          error={error}
          receiverId={userId}
          notificationCounts={notificationCounts}
          setNotificationCounts={setNotificationCounts}
        />

        <Button onClick={onSendMessage}>Send Message (simulate)</Button>
        <Button
          onClick={() => {
            console.log("Current socket:", socket);
            console.log("Socket connected?", isConnected);
            console.log("Socket ID:", socket?.id);
            console.log("User ID:", userId);
            console.log("Conversations:", conversations);
          }}
        >
          Debug Info
        </Button>
      </SheetContent>
    </Sheet>
  );
};
