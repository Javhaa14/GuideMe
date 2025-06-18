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
  const [notificationCount, setNotificationCount] = useState(0);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch notification count function
  const fetchNotificationCount = async () => {
    if (!userId) return;
    try {
      const res = await axiosInstance.get(`/notif/getall/${userId}`);
      if (Array.isArray(res.data)) {
        setNotificationCount(res.data.length);
      }
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

  // Fetch notifications **once when page loads**
  useEffect(() => {
    if (userId) {
      fetchNotificationCount();
      fetchConversations();
    }
  }, [userId]);

  // Socket join notification room etc. if you want, but NOT for notification count updates
  useEffect(() => {
    if (!socket || !isConnected) return;

    // Join notification room for this user
    socket.emit("joinNotificationRoom", userId);

    // Listen for notification event to update count live
    const handleNotify = (data: any) => {
      console.log("🔔 Received notification via socket:", data);
      setNotificationCount((prev) => prev + 1);
    };

    socket.on("notify", handleNotify);

    return () => {
      socket.off("notify", handleNotify);
      socket.emit("leaveNotificationRoom", userId);
    };
  }, [socket, isConnected, userId]);
  // Function to call after sending a message to update notifications count live
  const onSendMessage = async () => {
    // Your send message logic here
    // ...

    // Then fetch updated notification count immediately
    await fetchNotificationCount();
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
              {notificationCount / 2}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[300px] top-15 [&>button]:hidden">
        <SheetHeader>
          <SheetTitle>Chat</SheetTitle>
        </SheetHeader>
        <ChatList
          conversations={conversations}
          loading={loading}
          error={error}
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
