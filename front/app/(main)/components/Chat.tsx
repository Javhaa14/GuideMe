"use client";

import type React from "react";
<<<<<<< HEAD
import { useEffect, useState, useRef } from "react";
import { Send, User } from "lucide-react";
import io from "socket.io-client";
import { axiosInstance } from "@/lib/utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useParams } from "next/navigation";
import { OnlineUsers } from "../Touristdetail/components/TouristMainProfile";
import { v4 as uuidv4 } from "uuid";
import calendar from "dayjs/plugin/calendar";

import localizedFormat from "dayjs/plugin/localizedFormat";
import { fetchTProfile } from "@/app/utils/fetchProfile";
import { useSocket } from "@/app/context/SocketContext";
=======
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

>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(calendar);

<<<<<<< HEAD
export type ChatMessage = {
  id: string;
  user: string;
  text: string;
  profileimage: string | null;
  roomId?: string;
  createdAt?: string;
=======
type ChatMessage = {
  id?: string;
  _id?: string;
  sender: string;
  text: string;
  profileimage: string | null;
  roomId: string;
  receiver: string;
  createdAt: Date | string;
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
};

export type UserPayload = {
  id: string;
  name: string;
  role: string;
  email: string;
};
<<<<<<< HEAD
export default function Chat({
  user,
  onlineUsers,
}: {
  user: UserPayload;
  onlineUsers: OnlineUsers;
}) {
  const params = useParams();
  const profileId = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!profileId) {
    return <p>User ID not found in URL params.</p>;
  }
=======

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

>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  const { socket, isConnected } = useSocket();

  const [username, setUsername] = useState("");
  const [profileimage, setProfileImage] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
<<<<<<< HEAD
  const roomId = [profileId, user.id].sort().join("-");

  if (!user) {
    return <p>Loading user...</p>;
  }
  console.log(onlineUsers, "onlineusers");
=======
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Create a consistent roomId from sorted user IDs
  // Memoize roomId to ensure it doesn't change identity unless inputs change
  const roomId = [user.id, profileId].sort().join("-");

  useEffect(() => {
    if (!socket || !user?.id || !roomId) return;

    socket.emit("identify", user.id);
    socket.emit("joinRoom", roomId);
    // Emit markNotificationsSeen to clear notifications for this chat
    socket.emit("markNotificationsSeen", {
      senderId: profileId,
      receiverId: user.id,
    });

    return () => {
      socket.emit("leaveRoom", roomId);
    };
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
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const tpro = await fetchTProfile(user.id);
<<<<<<< HEAD
        console.log("Fetched profile image:", tpro.profileimage);

=======
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
        setUsername(user.name);
        setProfileImage(tpro.profileimage);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, [user]);

<<<<<<< HEAD
  const listenerAttached = useRef(false);

  useEffect(() => {
    if (!socket || !isConnected || !roomId) return;
    console.log("Connecting to backend:", process.env.NEXT_PUBLIC_BACKEND_URL);

    socket.emit("joinRoom", roomId);

    socket.on("chat message", (msg) => {
      if (msg.roomId !== roomId) return;

      const normalizedMsg = {
        ...msg,
        id: msg.id || msg._id, // fallback
      };

      setMessages((prev) => {
        // If this is a response to an optimistic message (matches tempId), replace it
        if (msg.tempId) {
          const exists = prev.find((m) => m.id === msg.tempId);
          if (exists) {
            return prev.map((m) => (m.id === msg.tempId ? normalizedMsg : m));
          }
        }

        // If already exists by ID, skip
        if (prev.some((m) => m.id === normalizedMsg.id)) return prev;

        // Otherwise, add normally
        return [...prev, normalizedMsg];
      });
    });

    return () => {
      socket.emit("leaveRoom", roomId);
      socket.off("chat message");
    };
  }, [socket, isConnected, roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
=======
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
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
    e.preventDefault();

    if (!input.trim() || !socket || !isConnected) return;

<<<<<<< HEAD
    const tempId = uuidv4();

    const messagePayload = {
      id: tempId, // temporary ID for frontend rendering
      tempId, // used to match with server response
      user: username,
      text: input,
      profileimage,
      roomId,
      createdAt: new Date().toISOString(),
      userId: user.id,
    };

    // Optimistic message
    setMessages((prev) => [...prev, messagePayload]);

    // Send to server
    socket.emit("chat message", messagePayload);
    setInput("");
  };

  console.log("🔌 isConnected:", isConnected);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const res = await axiosInstance.get(`/api/chat/${roomId}`);
        if (res.data.success) {
          setMessages((prev) => {
            const existingIds = new Set(prev.map((m) => m.id));
            const newMessages = res.data.messages.filter(
              (m: ChatMessage) => !existingIds.has(m.id)
            );
            return [...prev, ...newMessages];
          });
        }
      } catch (err) {
        console.error("Failed to fetch chat history", err);
      }
    };

    fetchChatHistory();
  }, [roomId]);

  return (
    <div className="flex flex-col w-full bg-white">
=======
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

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", roomId);
    }
  }, [socket, roomId]);

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto bg-white relative">
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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
<<<<<<< HEAD
          const isCurrentUser = msg.user === username;
=======
          const isCurrentUser = msg.sender === user.id;
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
          const prevMsg = messages[i - 1];
          const currentTime = dayjs(msg.createdAt);
          const prevTime = prevMsg ? dayjs(prevMsg.createdAt) : null;

          const showTimestamp =
            i === 0 || !prevTime || currentTime.diff(prevTime, "minute") >= 5;

          return (
<<<<<<< HEAD
            <div key={msg.id || i}>
=======
            <div key={msg.id || msg._id || i}>
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
              {showTimestamp && (
                <div className="text-center text-gray-400 text-xs py-2">
                  {dayjs(msg.createdAt).format("MMM D, h:mm A")}
                </div>
              )}

              <div
                className={`flex ${
                  isCurrentUser ? "justify-end" : "justify-start"
<<<<<<< HEAD
                }`}
              >
                <div
                  className="relative max-w-xs group"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className={`flex items-end gap-2 ${
                      isCurrentUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
=======
                }`}>
                <div className="relative max-w-xs group">
                  <div
                    className={`flex items-end gap-2 ${
                      isCurrentUser ? "flex-row-reverse" : "flex-row"
                    }`}>
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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
<<<<<<< HEAD
                          {msg.user[0]?.toUpperCase()}
=======
                          {msg.sender}
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
                        </div>
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`px-4 py-2 rounded-2xl shadow-sm ${
                        isCurrentUser
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                          : "bg-white text-gray-800 border border-gray-200"
<<<<<<< HEAD
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
=======
                      }`}>
                      <p className="leading-relaxed break-words">{msg.text}</p>
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
                    </div>
                  </div>

                  {/* Username Tooltip */}
                  {hoveredIndex === i && (
                    <div
                      className={`absolute -top-8 px-2 py-1 bg-gray-800 text-white text-xs rounded-md shadow-lg z-50 whitespace-nowrap ${
                        isCurrentUser ? "right-0" : "left-0"
<<<<<<< HEAD
                      }`}
                    >
                      {msg.user}
                      <div
                        className={`absolute top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 ${
                          isCurrentUser ? "right-2" : "left-2"
                        }`}
                      ></div>
=======
                      }`}>
                      {msg.sender}
                      <div
                        className={`absolute top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 ${
                          isCurrentUser ? "right-2" : "left-2"
                        }`}></div>
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
<<<<<<< HEAD

=======
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
<<<<<<< HEAD
      <div className="absolute px-4 bottom-3 border-t border-gray-200 bg-white">
=======
      <div className="absolute px-4 bottom-3 border-t border-gray-200 bg-white w-full">
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
        <form onSubmit={sendMessage} className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
<<<<<<< HEAD
              onChange={(e) => setInput(e.target.value)}
=======
              onChange={handleInputChange}
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
              placeholder="Мессеж бичих..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim()}
<<<<<<< HEAD
            className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
          >
            <Send size={18} />
          </button>
        </form>
=======
            className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg">
            <Send size={18} />
          </button>
        </form>
        {isOtherTyping && (
          <div className="text-green-600 text-sm mt-2 mb-1 animate-pulse">
            The other user is typing...
          </div>
        )}
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
      </div>
    </div>
  );
}
