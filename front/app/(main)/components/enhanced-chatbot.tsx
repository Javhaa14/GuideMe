"use client";

import type React from "react";
import { useEffect, useState, useRef } from "react";
import { io, type Socket } from "socket.io-client";
import ReactMarkdown from "react-markdown";
import {
  Send,
  User,
  Bot,
  Sparkles,
  Plane,
  MapPin,
  X,
  Minimize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
};

interface EnhancedChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
}

let socket: Socket | null = null;

export default function EnhancedChatBot({
  isOpen,
  onClose,
  onMinimize,
}: EnhancedChatBotProps) {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && !socket) {
      // Initialize socket connection
      socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);

      socket.on("connect", () => {
        setIsConnected(true);
        // Add welcome message
        const welcomeMessage: Message = {
          id: Date.now().toString(),
          sender: "ai",
          text: "🌍 Hello! I'm your AI travel assistant. I can help you with destinations, hotels, travel tips, and more! Where would you like to explore?",
          timestamp: new Date(),
        };
        setResponses([welcomeMessage]);
      });

      socket.on("disconnect", () => {
        setIsConnected(false);
      });

      socket.on("ai chatbot", (response: string) => {
        const aiMessage: Message = {
          id: Date.now().toString(),
          sender: "ai",
          text: response,
          timestamp: new Date(),
        };
        setResponses((prev) => [...prev, aiMessage]);
        setLoading(false);
      });
    }

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("ai chatbot");
      }
    };
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [responses]);

  const sendMessage = () => {
    if (!message.trim() || loading || !socket) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: message,
      timestamp: new Date(),
    };

    setResponses((prev) => [...prev, userMessage]);
    setLoading(true);
    socket.emit("ai chatbot", message);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    onMinimize();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}>
            {i % 3 === 0 ? (
              <Plane className="w-3 h-3 text-blue-400" />
            ) : i % 3 === 1 ? (
              <MapPin className="w-3 h-3 text-cyan-400" />
            ) : (
              <Sparkles className="w-3 h-3 text-purple-400" />
            )}
          </div>
        ))}
      </div>

      <Card
        className={`transition-all duration-500 py-0 ease-in-out bg-white/95 backdrop-blur-lg border-0 shadow-2xl ${
          isMinimized ? "w-80 h-16" : "w-[450px] h-[600px]"
        }`}
        style={{ borderRadius: "24px" }}>
        <CardContent className="p-0 h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg">
                    🌍
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      isConnected ? "bg-green-400 animate-pulse" : "bg-red-400"
                    }`}
                  />
                </div>
                <div>
                  <h2 className="text-lg font-bold">
                    GuideMe Travel Assistant
                  </h2>
                  {!isMinimized && (
                    <p className="text-blue-100 text-xs">
                      {isConnected
                        ? "Connected • AI-powered travel companion"
                        : "Connecting..."}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 h-8 w-8"
                  onClick={handleMinimize}>
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 h-8 w-8"
                  onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
                {responses.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 animate-slide-up ${
                      msg.sender === "user" ? "flex-row-reverse" : ""
                    }`}>
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback
                        className={`text-xs ${
                          msg.sender === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-green-500 text-white"
                        }`}>
                        {msg.sender === "user" ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>

                    <div
                      className={`max-w-[80%] ${
                        msg.sender === "user" ? "text-right" : ""
                      }`}>
                      <div
                        className={`p-3 rounded-2xl text-sm shadow-sm ${
                          msg.sender === "user"
                            ? "bg-blue-500 text-white rounded-br-md"
                            : "bg-white text-gray-800 rounded-bl-md border border-gray-100"
                        }`}>
                        {msg.sender === "ai" ? (
                          <div> {msg.text}</div>
                        ) : (
                          <span className="whitespace-pre-wrap">
                            {msg.text}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {formatTime(msg.timestamp)}
                        </span>
                        {msg.sender === "ai" && (
                          <Badge variant="outline" className="text-xs">
                            AI
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-start gap-3 animate-slide-up">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs bg-green-500 text-white">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-white p-3 rounded-2xl rounded-bl-md border border-gray-100 shadow-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-100 bg-white/80 backdrop-blur-sm rounded-b-3xl">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Ask about destinations, hotels, travel tips..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 border-gray-200 focus-visible:ring-blue-500 rounded-full"
                    disabled={loading || !isConnected}
                  />
                  <Button
                    size="icon"
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all hover:scale-105 shadow-lg"
                    onClick={sendMessage}
                    disabled={loading || !message.trim() || !isConnected}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                {!isConnected && (
                  <p className="text-xs text-red-500 mt-2 text-center">
                    Connecting to server... Please make sure the backend is
                    running on ${process.env.NEXT_PUBLIC_NACKEND_URL}
                  </p>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
