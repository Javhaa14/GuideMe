"use client";

import type React from "react";
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
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(calendar);

export type ChatMessage = {
  id: string;
  user: string;
  text: string;
  profileimage: string | null;
  roomId?: string;
  createdAt?: string;
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
  onlineUsers: OnlineUsers;
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
  const roomId = [profileId, user.id].sort().join("-");

  if (!user) {
    return <p>Loading user...</p>;
  }
  console.log(onlineUsers, "onlineusers");
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const tpro = await fetchTProfile(user.id);
        console.log("Fetched profile image:", tpro.profileimage);

        setUsername(user.name);
        setProfileImage(tpro.profileimage);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, [user]);

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
      if (!senderId || !receiverId || !message) {
        console.warn("Missing notification fields", {
          senderId,
          receiverId,
          message,
        });
        return;
      }

      const res = await axiosInstance.post("/notif/send", {
        sender: senderId,
        receiver: receiverId,
        message,
      });

      if (!res.data.success) {
        console.warn("Notification sending failed:", res.data);
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || !socket || !isConnected) return;

    const tempId = uuidv4();

    const messagePayload = {
      id: tempId,
      tempId,
      user: username,
      text: input,
      profileimage,
      roomId,
      createdAt: new Date().toISOString(),
      userId: user.id,
    };

    console.log("Sending message payload:", messagePayload);
    fetchNotifications({
      senderId: user.id,
      receiverId: profileId,
      message: messagePayload.text,
    });

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
          const isCurrentUser = msg.user === username;
          const prevMsg = messages[i - 1];
          const currentTime = dayjs(msg.createdAt);
          const prevTime = prevMsg ? dayjs(prevMsg.createdAt) : null;

          const showTimestamp =
            i === 0 || !prevTime || currentTime.diff(prevTime, "minute") >= 5;

          return (
            <div key={msg.id || i}>
              {showTimestamp && (
                <div className="text-center text-gray-400 text-xs py-2">
                  {dayjs(msg.createdAt).format("MMM D, h:mm A")}
                </div>
              )}

              <div
                className={`flex ${
                  isCurrentUser ? "justify-end" : "justify-start"
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
                          {msg.user[0]?.toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`px-4 py-2 rounded-2xl shadow-sm ${
                        isCurrentUser
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                          : "bg-white text-gray-800 border border-gray-200"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>

                  {/* Username Tooltip */}
                  {hoveredIndex === i && (
                    <div
                      className={`absolute -top-8 px-2 py-1 bg-gray-800 text-white text-xs rounded-md shadow-lg z-50 whitespace-nowrap ${
                        isCurrentUser ? "right-0" : "left-0"
                      }`}
                    >
                      {msg.user}
                      <div
                        className={`absolute top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 ${
                          isCurrentUser ? "right-2" : "left-2"
                        }`}
                      ></div>
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
      <div className="absolute px-4 bottom-3 border-t border-gray-200 bg-white">
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
            className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
