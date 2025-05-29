'use client';
 
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
 
const socket = io('http://localhost:4000');
 
type ChatMessage = {
  user: string;
  text: string;
};
 
export default function Chat() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    const user =
      prompt('🧑 Таны нэр:') || `User-${Math.floor(Math.random() * 1000)}`;
    setName(user);
    setUsername(user);
 
    socket.on('chat message', (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });
 
    return () => {
      socket.off('chat message');
    };
  }, []);
 
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
 
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      socket.emit('chat message', { user: name, text: input });
      setInput('');
    }
  };
 
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 ">
      <h1 className="text-2xl font-bold mb-4 text-center">💬 Real-time Chat</h1>
      <div className="border rounded-lg h-80 overflow-y-auto p-4 bg-gray-100 shadow-inner mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex w-full mb-2 ${
              msg.user === username ? 'justify-end' : 'justify-start'
            }`}>
            <span
              className={`flex  items-center px-3 py-2 w-fit h-[20px] rounded-4xl ${
                msg.user === username
                  ? 'bg-amber-500  text-end '
                  : 'bg-green-500  text-start '
              } `}>
              {msg.text}
            </span>
          </div>
        ))}
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
 