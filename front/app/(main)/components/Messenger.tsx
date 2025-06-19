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
import { ChatList } from "./Chatlist";
import { axiosInstance } from "@/lib/utils";
import { useSocket } from "@/app/context/SocketContext";

export const MessengerButton = () => {
  const { data: session } = useSession();
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

  const fetchNotificationCount = async () => {
    if (!userId) return;
    try {
      // Use the correct API endpoint here
      const res = await axiosInstance.get(`/notif/unseen/${userId}`);
      const notificationsArray = res.data || [];

      const counts: Record<string, number> = {};
      notificationsArray.forEach((notif: any) => {
        const sender = notif.sender;
        if (!counts[sender]) counts[sender] = 0;
        counts[sender]++;
      });

      setNotificationCounts(counts);
    } catch (error) {
      console.error("❌ Failed to fetch notifications:", error);
    }
  };

  const fetchConversations = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/api/chat/conversations/${userId}`);
      if (res.data.success) {
        setConversations(res.data.conversations);
        setError(null);
      } else {
        setError("Failed to load conversations");
      }
    } catch {
      setError("Failed to load conversations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchNotificationCount();
      fetchConversations();
    }
  }, [userId]);

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
      fetchNotificationCount();
    };

    socket.on("notify", handleNotify);
    socket.on("notificationsSeen", handleNotificationsSeen);

    return () => {
      socket.off("notify", handleNotify);
      socket.off("notificationsSeen", handleNotificationsSeen);
      socket.emit("leaveNotificationRoom", userId);
    };
  }, [socket, isConnected, userId]);

  const onSendMessage = async () => {
    await fetchNotificationCount();
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
          className="relative rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Open Messenger">
          <MessageCircleMore className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {notificationCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[300px] top-15 [&>button]:hidden">
        <SheetHeader>
          <SheetTitle>Chat</SheetTitle>
        </SheetHeader>
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
          }}>
          Debug Socket
        </Button>
      </SheetContent>
    </Sheet>
  );
};
