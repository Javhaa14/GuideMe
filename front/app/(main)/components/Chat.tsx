"use client";

import type React from "react";
import { useEffect, useState, useRef, useMemo } from "react";
import { Send, User } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import calendar from "dayjs/plugin/calendar";
import { axiosInstance } from "@/lib/utils";
import { useSocket } from "@/app/context/SocketContext";
import { fetchTProfile } from "@/app/utils/fetchProfile";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(calendar);

type ChatMessage = {
  id?: string;
  _id?: string;
  sender: string;
  text: string;
  profileimage: string | null;
  roomId: string;
  receiver: string;
  createdAt: Date | string;
};

export type UserPayload = {
  id: string;
  name: string;
  role: string;
  email: string;
};

export default function Chat({
  user,
  onlineUsers,
  profileId,
}: {
  user: UserPayload;
  onlineUsers: Record<string, { isOnline: boolean; lastSeen: string }>;
  profileId: string;
}) {
  if (!profileId) {
    return <p>User ID not found in URL params.</p>;
  }

  const { socket, isConnected } = useSocket();

  const [username, setUsername] = useState("");
  const [profileimage, setProfileImage] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Create a consistent roomId from sorted user IDs
  // Memoize roomId to ensure it doesn't change identity unless inputs change
  const roomId = useMemo(
    () => [profileId, user.id].sort().join("-"),
    [profileId, user.id]
  );

  useEffect(() => {
    if (!socket || !user?.id || !roomId) return;

    socket.emit("identify", user.id);
    socket.emit("joinRoom", roomId);
    // Emit markNotificationsSeen to clear notifications for this chat
    socket.emit("markNotificationsSeen", {
      senderId: profileId,
      receiverId: user.id,
    });
  }, [socket, user.id, roomId, profileId]);

  // Fetch chat history for the room
  useEffect(() => {
    if (!roomId) return;

    const fetchChatHistory = async () => {
      try {
        const res = await axiosInstance.get(`/chat/history/${roomId}`);
        if (res.data.success) {
          const msgs = res.data.messages.map(
            (msg: any) =>
              ({
                id: msg._id || msg.id,
                sender: msg.sender,
                receiver: msg.receiver,
                text: msg.text,
                profileimage: msg.profileimage || null,
                roomId: msg.roomId,
                createdAt: msg.createdAt,
              } as ChatMessage)
          );
          setMessages(msgs);
          scrollToBottom();
        }
      } catch (err) {
        console.error("Failed to fetch chat history", err);
      }
    };

    fetchChatHistory();
  }, [roomId]);

  // Fetch user profile info (name + profile image)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const tpro = await fetchTProfile(user.id);
        setUsername(user.name);
        setProfileImage(tpro.profileimage);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, [user]);

  // Scroll chat to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen for new incoming chat messages
  useEffect(() => {
    if (!socket) return;

    const handleIncomingMessage = (newMessage: ChatMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("chat message", handleIncomingMessage);

    return () => {
      socket.off("chat message", handleIncomingMessage);
    };
  }, [socket]);

  // Listen for typing events
  useEffect(() => {
    if (!socket) return;

    const handleTyping = ({ user: typingUser }: { user: string }) => {
      if (typingUser !== user.id) {
        setIsOtherTyping(true);
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(
          () => setIsOtherTyping(false),
          2000
        );
      }
    };
    socket.on("typing", handleTyping);
    return () => {
      socket.off("typing", handleTyping);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [socket, user.id]);

  // Send notification through REST API
  const fetchNotifications = async ({
    senderId,
    receiverId,
    message,
  }: {
    senderId: string;
    receiverId: string;
    message: string;
  }) => {
    try {
      if (!senderId || !receiverId || !message) return;

      const res = await axiosInstance.post("/notif/send", {
        senderId,
        receiverId,
        message,
      });

      if (!res.data.success) {
        console.warn("Notification sending failed:", res.data);
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  // Handle send message submit
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || !socket || !isConnected) return;

    const messagePayload: ChatMessage = {
      sender: user.id, // backend expects user ID
      receiver: profileId, // recipient ID
      text: input,
      profileimage: profileimage || null,
      roomId,
      createdAt: new Date().toISOString(),
      id: uuidv4(),
    };

    try {
      // Save message to DB
      await axiosInstance.post(`/chat`, messagePayload);

      // Emit real-time socket event
      socket.emit("chat message", {
        ...messagePayload,
        user: username, // for frontend rendering
      });

      // Optimistic UI update
      setMessages((prev) => [...prev, messagePayload]);

      // Send notification
      fetchNotifications({
        senderId: user.id,
        receiverId: profileId,
        message: input,
      });

      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Emit typing event when user types
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (socket && isConnected) {
      socket.emit("typing", { roomId, user: user.id });
    }
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 rounded-3xl shadow-2xl relative min-h-[500px] h-[500px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-700 p-6 text-white rounded-t-3xl shadow-md">
        <div className="flex flex-col items-start justify-between">
          {onlineUsers[profileId]?.isOnline ? (
            <div className="flex gap-2 items-center">
              <span className="font-semibold text-lg">Online</span>
              <div className="flex w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
            </div>
          ) : (
            <div className="flex justify-between items-center w-full ">
              <p className="text-gray-300 font-semibold">Offline</p>
              <span className="text-sm text-gray-400">
                Last seen {dayjs(onlineUsers[profileId]?.lastSeen).fromNow()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col w-full flex-1 h-[380px] scrollbar-hide overflow-y-auto p-6 space-y-5 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 rounded-b-3xl">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 py-16">
            <div className="w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <User size={32} className="text-blue-300" />
            </div>
            <p className="text-lg">No messages yet. Start the conversation!</p>
          </div>
        )}

        {messages.map((msg, i) => {
          const isCurrentUser = msg.sender === user.id;
          const prevMsg = messages[i - 1];
          const currentTime = dayjs(msg.createdAt);
          const prevTime = prevMsg ? dayjs(prevMsg.createdAt) : null;

          const showTimestamp =
            i === 0 || !prevTime || currentTime.diff(prevTime, "minute") >= 5;

          return (
            <div key={msg.id || msg._id || i}>
              {showTimestamp && (
                <div className="text-center text-blue-400 text-xs py-2">
                  {dayjs(msg.createdAt).format("MMM D, h:mm A")}
                </div>
              )}

              <div
                className={`flex ${
                  isCurrentUser ? "justify-end" : "justify-start"
                }`}>
                <div className="relative max-w-lg group">
                  <div
                    className={`flex items-end gap-3 ${
                      isCurrentUser ? "flex-row-reverse" : "flex-row"
                    }`}>
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      {msg.profileimage ? (
                        <img
                          src={msg.profileimage}
                          alt="profile"
                          className="w-10 h-10 rounded-full border-2 border-blue-700 shadow-md"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center text-white font-semibold text-lg shadow-md">
                          {msg.sender?.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`px-6 py-3 rounded-2xl shadow-lg text-base font-medium ${
                        isCurrentUser
                          ? "bg-gradient-to-r from-blue-700 to-blue-600 text-white"
                          : "bg-blue-950 text-blue-100 border border-blue-800"
                      }`}>
                      <p className="leading-relaxed break-words">{msg.text}</p>
                    </div>
                  </div>

                  {/* Username Tooltip */}
                  {hoveredIndex === i && (
                    <div
                      className={`absolute -top-10 px-3 py-1 bg-blue-800 text-white text-xs rounded-md shadow-lg z-50 whitespace-nowrap ${
                        isCurrentUser ? "right-0" : "left-0"
                      }`}>
                      {msg.sender}
                      <div
                        className={`absolute top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-800 ${
                          isCurrentUser ? "right-2" : "left-2"
                        }`}></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="absolute px-8 bottom-5 border-t border-blue-800 bg-gradient-to-r from-blue-900 to-blue-950 w-full rounded-b-3xl">
        <form onSubmit={sendMessage} className="flex items-center gap-4 py-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="w-full px-6 py-4 pr-16 border border-blue-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-950 text-blue-100 placeholder-blue-400 text-lg shadow-md transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-14 h-14 bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-full flex items-center justify-center hover:from-blue-800 hover:to-blue-700 transition-all duration-200 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg text-xl">
            <Send size={22} />
          </button>
        </form>
        {isOtherTyping && (
          <div className="text-blue-300 text-sm mt-2 mb-1 animate-pulse">
            The other user is typing...
          </div>
        )}
      </div>
    </div>
  );
}
