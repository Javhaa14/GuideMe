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

dayjs.extend(relativeTime);
const socket = io("https://guideme-8o9f.onrender.com");

type ChatMessage = {
  user: string;
  text: string;
  profileImage: string;
  roomId?: string; // add optional roomId if needed
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
}: {
  user: UserPayload;
  onlineUsers: OnlineUsers;
}) {
  const params = useParams();
  const profileId = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!profileId) {
    return <p>User ID not found in URL params.</p>;
  }

  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Define roomId (you can customize this)
  const roomId = [profileId, user.id].sort().join("-");

  if (!user) {
    return <p>Loading user...</p>;
  }
  console.log(onlineUsers, "onlineusers");

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get(`/tprofile/${user.id}`);
      console.log("✅ Posts fetched:", res.data);
      setProfileImage(res.data.profileimage);
    } catch (err) {
      console.error("❌ Post fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
    setUsername(user.name);
  }, [user]);

  useEffect(() => {
    if (!roomId) return;

    // Join the chat room on the socket server
    socket.emit("joinRoom", roomId);
    console.log(`Joined room: ${roomId}`);

    // Listen for room-specific chat messages
    socket.on("chat message", (msg: ChatMessage) => {
      // Only add messages from the current room
      if (msg.roomId === roomId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("chat message");
    };
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      try {
        const messagePayload = {
          user: username,
          text: input,
          profileImage: profileImage,
          roomId, // send the roomId with message
        };

        // Save message to DB
        const res = await axiosInstance.post("/api/chat", messagePayload);
        if (res.data.success) {
          // Emit socket message for realtime update with roomId
          socket.emit("chat message", res.data.message);
          setInput("");
        } else {
          console.error("Failed to save message:", res.data.error);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const res = await axiosInstance.get(`/api/chat/${roomId}`);
        if (res.data.success) {
          setMessages(res.data.messages);
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

          return (
            <div
              key={i}
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
                    {msg.profileImage ? (
                      <img
                        src={msg.profileImage || "/placeholder.svg"}
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
                    {msg.user}
                    <div
                      className={`absolute top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 ${
                        isCurrentUser ? "right-2" : "left-2"
                      }`}></div>
                  </div>
                )}
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
            className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg">
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
