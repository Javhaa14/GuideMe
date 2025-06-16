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

  // Fetch conversations & unread count
  const fetchConversations = () => {
    if (!userId) return;
    setLoading(true);

    axiosInstance
      .get(`/api/chat/conversations/${userId}`)
      .then((res) => {
        if (res.data.success) {
          const convs = res.data.conversations;
          setConversations(convs);
          const totalUnread = convs.reduce(
            (sum: any, conv: any) => sum + (conv.unreadCount || 0),
            0
          );
          setUnreadTotal(totalUnread);
          setError(null);
        } else {
          setError("Failed to load conversations");
        }
      })
      .catch(() => setError("Failed to load conversations"))
      .finally(() => setLoading(false));
  };

  // Connect socket and listen
  useEffect(() => {
    if (!userId) return;

    if (!socket) {
      socket = io("https://guideme-8o9f.onrender.com", {
        transports: ["websocket"],
        withCredentials: true,
      });

      socket.on("connect", () => {
        socket?.emit("identify", userId);
        socket?.emit("joinNotificationRoom", userId);
        console.log(`🟢 Socket connected as ${userId}`);
      });

      socket.on("notify", (data) => {
        if (!open) {
          fetchConversations(); // ✅ Keep this accurate
          if (
            "Notification" in window &&
            Notification.permission === "granted"
          ) {
            new Notification(data.title, {
              body: data.message,
            });
          }
        }
      });
    }

    return () => {
      socket?.off("notify");
    };
  }, [userId, open]);

  // Ask for browser notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Initial + whenever messenger opens
  useEffect(() => {
    if (userId) {
      fetchConversations();
    }
  }, [userId, open]);

  // Mark messages as read when opening messenger
  useEffect(() => {
    if (open && userId && conversations.length > 0) {
      Promise.all(
        conversations.map((conv) =>
          axiosInstance.post("/api/chat/mark-read", {
            roomId: conv.roomId,
            userId,
          })
        )
      ).then(() => fetchConversations());
    }
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="relative rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Open Messenger"
        >
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
