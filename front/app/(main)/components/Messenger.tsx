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
import { io, Socket } from "socket.io-client";
import { axiosInstance } from "@/lib/utils";

let socket: Socket | null = null;

export const MessengerButton = () => {
  const [open, setOpen] = useState(false);
  const [unreadTotal, setUnreadTotal] = useState(0);
  const [conversations, setConversations] = useState<
    {
      roomId: string;
      user: {
        id: string;
        name: string;
        profileimage?: string;
      };
      lastMessage: {
        text: string;
        createdAt: string;
        senderId?: string;
      };
      unreadCount: number;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: session } = useSession();
  const userId = session?.user?.id;

  // Fetch conversations & unread count from backend
  const fetchConversations = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/api/chat/conversations/${userId}`);
      if (res.data.success) {
        const convs = res.data.conversations;
        setConversations(convs);

        // Calculate total unread count
        const totalUnread = convs.reduce(
          (sum: any, conv: any) => sum + (conv.unreadCount || 0),
          0
        );
        setUnreadTotal(totalUnread);
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

  // Mark messages as read when messenger opens (reset unreadCount on server)
  const markAllRead = async () => {
    if (!userId) return;
    if (conversations.length === 0) return;

    try {
      await Promise.all(
        conversations.map((conv) =>
          axiosInstance.post("/api/chat/mark-read", {
            roomId: conv.roomId,
            userId,
          })
        )
      );
      await fetchConversations();
    } catch {
      // ignore errors for now
    }
  };

  // Setup socket connection & listeners once per userId
  useEffect(() => {
    if (!userId) return;

    if (!socket) {
      socket = io("https://guideme-8o9f.onrender.com", {
        transports: ["websocket"],
        withCredentials: true,
      });
    }

    const handleConnect = () => {
      socket?.emit("identify", userId);
      socket?.emit("joinNotificationRoom", userId);
      console.log("Socket connected:", userId);
    };

    // Handle incoming notifications about new messages
    const handleNotify = (data: {
      title: string;
      message: string;
      senderId?: string;
      roomId?: string;
    }) => {
      if (data.senderId === userId) {
        // IGNORE messages sent by yourself for unread count update
        // But you can optionally update last message if needed
        return;
      }

      // Fetch new conversations immediately on any incoming message from others
      fetchConversations();

      // Show native notification only if messenger is closed
      if (!open) {
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification(data.title, { body: data.message });
        }
      }
    };

    socket.on("connect", handleConnect);
    socket.on("notify", handleNotify);

    return () => {
      socket?.off("connect", handleConnect);
      socket?.off("notify", handleNotify);
    };
  }, [userId, open]);

  // Request notification permission once
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Fetch conversations on mount and whenever messenger opens
  useEffect(() => {
    if (userId) {
      fetchConversations();
    }
  }, [userId, open]);

  // Mark messages read when messenger opens
  useEffect(() => {
    if (open) {
      markAllRead();
    }
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="relative rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Open Messenger">
          <MessageCircleMore className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          {unreadTotal > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {unreadTotal}
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
      </SheetContent>
    </Sheet>
  );
};
