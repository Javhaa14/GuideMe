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
<<<<<<< HEAD
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
=======
import { axiosInstance } from "@/lib/utils";
import { useSocket } from "@/app/context/SocketContext";
import { useProfile } from "@/app/context/ProfileContext";

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

  // Fetch chat rooms when sheet is opened
  useEffect(() => {
    const fetchChatRooms = async () => {
      if (open && userId) {
        setLoading(true);
        try {
          const res = await axiosInstance.get(`/chat/rooms/${userId}`);
          if (res.data.success && res.data.rooms) {
            setConversations(res.data.rooms);
          } else {
            setConversations([]);
          }
        } catch (err) {
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
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
<<<<<<< HEAD
          className="relative rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Open Messenger"
        >
          <MessageCircleMore className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          {unreadTotal > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {unreadTotal}
=======
          className="relative rounded-full p-2 hover:bg-white/10 transition-all duration-200 hover:scale-105"
          aria-label="Open Messenger"
          onClick={handleMessengerClick}>
          <MessageCircleMore className="h-6 w-6 text-white" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce shadow-lg">
              {notificationCount}
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
            </span>
          )}
        </Button>
      </SheetTrigger>

<<<<<<< HEAD
      <SheetContent side="right" className="w-[300px] top-15 [&>button]:hidden">
=======
      <SheetContent
        side="right"
        className="w-[300px] top-15 [&>button]:hidden bg-black/30 backdrop-blur-xl border-white/10">
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
        <SheetHeader>
          <SheetTitle>Chat</SheetTitle>
        </SheetHeader>
        <ChatList
<<<<<<< HEAD
          conversations={conversations}
          loading={loading}
          error={error}
        />
=======
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
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
      </SheetContent>
    </Sheet>
  );
};
