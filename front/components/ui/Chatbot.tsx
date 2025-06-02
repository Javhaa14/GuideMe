"use client";
import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import ReactMarkdown from "react-markdown";

const socket = io("http://localhost:4000");

type Message = {
  sender: "user" | "ai";
  text: string;
};

function ChatBot() {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    socket.on("ai chatbot", (response: string) => {
      setResponses((prev) => [...prev, { sender: "ai", text: response }]);
      setLoading(false);
    });

    return () => {
      socket.off("ai chatbot");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [responses]);

  const sendMessage = () => {
    if (!message.trim() || loading) return;
    setResponses((prev) => [...prev, { sender: "user", text: message }]);
    setLoading(true);
    socket.emit("ai chatbot", message);
    setMessage("");
  };

  return (
    <div className={` max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200`}>
      <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">
        🌍 GuideMe Travel Assistant
      </h2>

      <div className="h-96 overflow-y-auto flex flex-col gap-4 p-4 bg-gray-50 rounded-md border border-gray-100">
        {responses.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-3 text-sm rounded-xl shadow whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.sender === "ai" ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-500 italic self-start">
            Typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 flex gap-2 items-center">
        <input
          type="text"
          value={message}
          disabled={loading}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask about destinations, hotels, travel tips..."
          className="flex-1 border border-gray-300 px-4 py-2 rounded-full text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 disabled:opacity-50 transition text-sm"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
