"use client";

import { useState, useEffect, useRef } from "react";
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

  const socketRef = useRef<Socket | null>(null);

  const fetchConversations = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/api/chat/conversations/${userId}`);
      if (res.data.success) {
        const convs = res.data.conversations;
        setConversations(convs);
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
  // const markAllRead = async () => {

  //   try {

  //     await fetchConversations();
  //   } catch {
  //     // ignore errors for now
  //   }
  // };

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
