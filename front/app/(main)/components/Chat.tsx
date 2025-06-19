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
  sender: string;
  text: string;
  profileimage: string;
  roomId: string;
  receiver: string;
  createdAt: Date;
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
  }, [socket, user.id, roomId]); // Now all primitive + stable

  // Fetch chat history for the room
  useEffect(() => {
    if (!roomId) return;

    const fetchChatHistory = async () => {
      try {
        const res = await axiosInstance.get(`/chat/history/${roomId}`);
        if (res.data.success) {
          const msgs = res.data.messages.map((msg: any) => ({
            id: msg._id || msg.id,
            user: msg.user,
            text: msg.text,
            profileimage: msg.profileimage || null,
            roomId: msg.roomId,
            createdAt: msg.createdAt,
          }));
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
      setMessages((prev) => {
        if (prev.some((msg) => msg.sender === newMessage.sender)) return prev;
        return [...prev, newMessage];
      });
    };

    socket.on("chat message", handleIncomingMessage);

    return () => {
      socket.off("chat message", handleIncomingMessage);
    };
  }, [socket]);

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

    const messagePayload = {
      sender: user.id, // backend expects user ID
      receiver: profileId, // recipient ID
      text: input,
      profileimage: profileimage,
      roomId,
    };

    try {
      // Save message to DB
      await axiosInstance.post(`/chat`, messagePayload);

      // Emit real-time socket event
      socket.emit("chat message", {
        ...messagePayload,
        user: username, // for frontend rendering
        createdAt: new Date().toISOString(), // show timestamp immediately
        id: uuidv4(), // temp ID for local use
      });

      // Optimistic UI update
      setMessages((prev) => [
        ...prev,
        {
          ...messagePayload,
          user: username,
          createdAt: new Date().toISOString(),
          id: uuidv4(),
        },
      ]);

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

  return (
    <div className="flex flex-col w-full bg-white relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white">
        <div className="flex flex-col items-start justify-between">
          {onlineUsers[profileId]?.isOnline ? (
            <div className="flex gap-2 items-center">
              <span>Online</span>
              <div className="flex w-3 h-3 rounded-full bg-white animate-pulse"></div>
            </div>
          ) : (
            <div className="flex justify-between items-center w-full ">
              <p className="text-gray-800">Offline</p>
              <span className="text-sm">
                Last seen {dayjs(onlineUsers[profileId]?.lastSeen).fromNow()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col w-full h-[300px] scrollbar-hide overflow-scroll p-4 space-y-3 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={24} className="text-gray-800" />
            </div>
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}

        {messages.map((msg, i) => {
          const isCurrentUser = msg.sender === username;
          const prevMsg = messages[i - 1];
          const currentTime = dayjs(msg.createdAt);
          const prevTime = prevMsg ? dayjs(prevMsg.createdAt) : null;

          const showTimestamp =
            i === 0 || !prevTime || currentTime.diff(prevTime, "minute") >= 5;

          return (
            <div key={msg.sender || i}>
              {showTimestamp && (
                <div className="text-center text-gray-400 text-xs py-2">
                  {dayjs(msg.createdAt).format("MMM D, h:mm A")}
                </div>
              )}

              <div
                className={`flex ${
                  isCurrentUser ? "justify-end" : "justify-start"
                }`}>
                <div
                  className="relative max-w-xs group"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}>
                  <div
                    className={`flex items-end gap-2 ${
                      isCurrentUser ? "flex-row-reverse" : "flex-row"
                    }`}>
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      {msg.profileimage ? (
                        <img
                          src={msg.profileimage}
                          alt="profile"
                          className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                          {msg.sender[0]?.toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`px-4 py-2 rounded-2xl shadow-sm ${
                        isCurrentUser
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                          : "bg-white text-gray-800 border border-gray-200"
                      }`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>

                  {/* Username Tooltip */}
                  {hoveredIndex === i && (
                    <div
                      className={`absolute -top-8 px-2 py-1 bg-gray-800 text-white text-xs rounded-md shadow-lg z-50 whitespace-nowrap ${
                        isCurrentUser ? "right-0" : "left-0"
                      }`}>
                      {msg.sender}
                      <div
                        className={`absolute top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 ${
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
      <div className="absolute px-4 bottom-3 border-t border-gray-200 bg-white w-full">
        <form onSubmit={sendMessage} className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Мессеж бичих..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg">
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
