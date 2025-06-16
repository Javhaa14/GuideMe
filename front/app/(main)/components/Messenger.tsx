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
import axios from "axios";
import { ChatList } from "./Chatlist";

export default function MessengerButton() {
  const [open, setOpen] = useState(false);
  const [unreadTotal, setUnreadTotal] = useState(0);
  const [loading, setLoading] = useState(false); // <-- added
  const [conversations, setConversations] = useState([]); // <-- added
  const [error, setError] = useState<string | null>(null); // <-- added

  const { data: session } = useSession();
  const userId = session?.user?.id;

  // Fetch conversations and unread counts
  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    axios
      .get(`/api/chat/conversations/${userId}`)
      .then((res) => {
        if (res.data.success) {
          console.log("Conversations", res.data.conversations);
          setConversations(res.data.conversations);
          // Calculate total unread count from conversations
          const totalUnread = res.data.conversations.reduce(
            (sum: number, conv: any) => sum + (conv.unreadCount || 0),
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
  }, [userId]);

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
          userId={userId}
          conversations={conversations}
          loading={loading}
          error={error}
        />
      </SheetContent>
    </Sheet>
  );
}
