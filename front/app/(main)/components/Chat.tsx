import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const socket = io("https://guideme-8o9f.onrender.com");

type ChatMessage = {
  user: string;
  text: string;
  profileImage: string;
};

export default function Chat() {
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "";
    const storedProfileImage = localStorage.getItem("profileImage") || null;

    if (!storedUsername) {
      const user =
        prompt("🧑 Таны нэр:") || `User-${Math.floor(Math.random() * 1000)}`;
      setUsername(user);
      localStorage.setItem("username", user);
    } else {
      setUsername(storedUsername);
    }

    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }

    socket.on("chat message", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      socket.emit("chat message", {
        user: username,
        text: input,
        profileImage: profileImage,
      });
      setInput("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 ">
      <h1 className="text-2xl font-bold mb-4 text-center">💬 Real-time Chat</h1>
      <div className="border rounded-lg h-80 overflow-y-auto p-4 bg-gray-100 shadow-inner mb-4">
        {messages.map((msg, i) => {
          const isCurrentUser = msg.user === username;

          return (
            <div
              key={i}
              className={`flex w-full mb-2 ${
                isCurrentUser ? "justify-end" : "justify-start"
              }`}>
              <div
                className="relative flex items-center gap-2 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}>
                {isCurrentUser ? (
                  <div className="flex">
                    <span
                      className={`flex items-center px-3 py-2 w-fit h-[20px] rounded-4xl ${
                        isCurrentUser
                          ? "bg-amber-500 text-end"
                          : "bg-green-500 text-start"
                      }`}>
                      {msg.text}
                    </span>
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="profile"
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <span className="font-bold rounded-full w-6 h-6 flex items-center justify-center bg-gray-400 text-white">
                        {msg.user[0]}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="profile"
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <span className="font-bold rounded-full w-6 h-6 flex items-center justify-center bg-gray-400 text-white">
                        {msg.user[0]}
                      </span>
                    )}
                    <span
                      className={`flex items-center px-3 py-2 w-fit h-[20px] rounded-4xl ${
                        isCurrentUser
                          ? "bg-amber-500 text-end"
                          : "bg-green-500 text-start"
                      }`}>
                      {msg.text}
                    </span>
                  </div>
                )}

                {hoveredIndex === i && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 bg-white px-2 py-1 rounded shadow">
                    {msg.user}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Мессеж бичих..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Илгээх
        </button>
      </form>
    </div>
  );
}
