"use client";

import type React from "react";
import { useEffect, useState, useRef } from "react";
import { Send, User } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import calendar from "dayjs/plugin/calendar";
import { useParams } from "next/navigation";
import { useSocket } from "@/app/context/SocketContext";
import { axiosInstance } from "@/lib/utils";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(calendar);

type ChatMessage = {
  _id: string;
  sender: string;
  receiver: string;
  content: string;
  profileimage?: string | null;
  roomId: string;
  created_at: string;
  isSeen: boolean;
  user?: string;
};

export type UserPayload = {
  id: string;
  name: string;
  role: string;
  email: string;
};

interface HybridChatProps {
  user: UserPayload;
  onlineUsers: Record<string, { isOnline: boolean; lastSeen: string }>;
  profileId?: string; // Optional prop for direct profileId
}

export default function HybridChat({
  user,
  onlineUsers,
  profileId: propProfileId,
}: HybridChatProps) {
  const params = useParams();

  // Use prop profileId if provided, otherwise fall back to params
  const profileId = propProfileId || (params?.id as string);

  if (!profileId) {
    return <p>User ID not found.</p>;
  }

  const { socket, isConnected } = useSocket();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [chatRoomId, setChatRoomId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Create string room ID for socket rooms
  const socketRoomId = [user.id, profileId].sort().join("-");

  // Join socket room for real-time updates
  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.emit("identify", user.id);
    socket.emit("joinRoom", socketRoomId);

    return () => {
      socket.emit("leaveRoom", socketRoomId);
    };
  }, [socket, isConnected, socketRoomId]);

  // Listen for real-time messages from socket
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage: ChatMessage) => {
      console.log("Received real-time message:", newMessage);

      // Only add if it's not from current user (avoid duplicates)
      if (newMessage.sender !== user.id) {
        setMessages((prev) => {
          // Check if message already exists
          const exists = prev.some((msg) => msg._id === newMessage._id);
          return exists ? prev : [...prev, newMessage];
        });
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, user.id]);

  // Fetch messages
  const fetchMessages = async () => {
    try {
      setIsLoading(true);

      // Just get existing room, don't create
      const roomResponse = await axiosInstance.post("/chat/room/get", {
        participants: [user.id, profileId],
      });

      if (roomResponse.data.room) {
        setChatRoomId(roomResponse.data.room._id);

        // Get chat history
        const historyResponse = await axiosInstance.get(
          `/chat/room/${roomResponse.data.room._id}/history`
        );

        if (historyResponse.data.messages) {
          const transformedMessages = historyResponse.data.messages.map(
            (msg: any) => ({
              ...msg,
              content: msg.content || msg.text,
              user: msg.sender?.username || msg.user,
              profileimage: msg.sender?.profileimage || null,
            })
          );
          setMessages(transformedMessages);
        }
      } else {
        // No room exists yet, that's fine
        setMessages([]);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      setMessages([]); // Start with empty messages if no room exists
    } finally {
      setIsLoading(false);
    }
  };

  // Send message via REST, socket handles real-time delivery
  const sendMessage = async () => {
    if (!input.trim() || isSending) return;

    const messageText = input.trim();
    setInput("");
    setIsSending(true);

    try {
      // Send via REST API for reliability
      const response = await axiosInstance.post("/chat/message", {
        senderId: user.id,
        receiverId: profileId,
        content: messageText,
      });

      if (response.data.data) {
        const newMessage = {
          ...response.data.data,
          user: user.name,
        };
        setMessages((prev) => [...prev, newMessage]);
        if (socket && isConnected) {
          socket.emit("broadcastMessage", {
            ...newMessage,
            roomId: socketRoomId,
          });
        }
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setInput(messageText);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [user.id, profileId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto bg-white relative h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white">
        <div className="flex flex-col items-start justify-between">
          <div className="flex items-center gap-2">
            {/* Socket connection indicator */}
            <div
              className={`w-2 h-2 rounded-full ${
                isConnected ? "bg-green-300" : "bg-red-300"
              }`}
            ></div>

            {onlineUsers[profileId]?.isOnline ? (
              <div className="flex gap-2 items-center">
                <span>Online</span>
                <div className="flex w-3 h-3 rounded-full bg-white animate-pulse"></div>
              </div>
            ) : (
              <div className="flex justify-between items-center w-full ">
                <p className="text-gray-200">Offline</p>
                <span className="text-sm">
                  Last seen {dayjs(onlineUsers[profileId]?.lastSeen).fromNow()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col w-full h-[300px] overflow-y-auto p-4 space-y-3 bg-gray-50">
        {isLoading && (
          <div className="text-center text-gray-500 py-8">
            <div className="animate-spin w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p>Loading messages...</p>
          </div>
        )}

        {!isLoading && messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={24} className="text-gray-800" />
            </div>
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}

        {!isLoading &&
          messages.map((msg, i) => {
            // Fix the sender identification - use string comparison
            const isCurrentUser =
              (typeof msg.sender === "object"
                ? String((msg.sender as { _id?: string })._id)
                : String(msg.sender)) === String(user.id);
            const prevMsg = messages[i - 1];
            const currentTime = dayjs(msg.created_at);
            const prevTime = prevMsg ? dayjs(prevMsg.created_at) : null;

            const showTimestamp =
              i === 0 || !prevTime || currentTime.diff(prevTime, "minute") >= 5;

            return (
              <div key={msg._id || i}>
                {showTimestamp && (
                  <div className="text-center text-gray-400 text-xs py-2">
                    {dayjs(msg.created_at).format("MMM D, h:mm A")}
                  </div>
                )}

                <div
                  className={`flex ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative max-w-xs group">
                    <div
                      className={`flex items-end gap-2 ${
                        isCurrentUser ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      {/* Profile Image */}
                      <div className="flex-shrink-0">
                        {msg.profileimage ||
                        (typeof msg.sender === "object" &&
                          "profileimage" in msg.sender &&
                          (msg.sender as { profileimage?: string })
                            .profileimage) ? (
                          <img
                            src={
                              msg.profileimage
                                ? msg.profileimage
                                : typeof msg.sender === "object" &&
                                  "profileimage" in msg.sender &&
                                  (msg.sender as { profileimage?: string })
                                    .profileimage
                                ? (msg.sender as { profileimage?: string })
                                    .profileimage
                                : undefined
                            }
                            alt="profile"
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                            {(
                              msg.user ||
                              (typeof msg.sender === "object" &&
                                "username" in msg.sender &&
                                (msg.sender as { username?: string })
                                  .username) ||
                              user.name
                            )
                              ?.charAt(0)
                              ?.toUpperCase() || "U"}
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
                        <p className="leading-relaxed break-words">
                          {msg.content}
                        </p>
                      </div>
                    </div>

                    {/* Username Tooltip */}
                    {hoveredIndex === i && (
                      <div
                        className={`absolute -top-8 px-2 py-1 bg-gray-800 text-white text-xs rounded-md shadow-lg z-50 whitespace-nowrap ${
                          isCurrentUser ? "right-0" : "left-0"
                        }`}
                      >
                        {isCurrentUser
                          ? "You"
                          : msg.user ||
                            (typeof msg.sender === "object" &&
                            "username" in msg.sender
                              ? (msg.sender as { username?: string }).username
                              : undefined) ||
                            "User"}
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
      <div className="px-4 py-3 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              disabled={isSending}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 transition-all disabled:opacity-50"
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isSending}
            className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
          >
            {isSending ? (
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
