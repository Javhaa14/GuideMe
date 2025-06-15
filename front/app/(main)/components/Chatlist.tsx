// components/chat-list.tsx
import React from "react";

// Mock data for demo (replace with actual data source)
const mockUsers = [
  {
    username: "Jane Doe",
    last: "Hey, how are you?",
    profileimage: "https://i.pravatar.cc/150?img=1",
    active: "yes",
  },
  {
    username: "John Smith",
    last: "Let’s meet tomorrow.",
    profileimage: "https://i.pravatar.cc/150?img=2",
    active: "no",
  },
];

export const ChatList = () => {
  return (
    <div className="mt-4 max-h-[80vh] overflow-y-auto pr-2 space-y-4">
      {mockUsers.map((user, index) => (
        <div
          key={index}
          className="cursor-pointer  flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {/* Avatar */}
          <div className="relative">
            <img
              src={user.profileimage}
              alt={user.username}
              className="w-12 h-12 rounded-full object-cover"
            />
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                user.active === "yes" ? "bg-green-500" : "bg-gray-400"
              }`}
            />
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <h2 className="font-medium text-sm truncate">{user.username}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user.last}
            </p>
          </div>

          {/* Time or Unread (optional) */}
          {/* <span className="text-xs text-gray-400">2m ago</span> */}
        </div>
      ))}
    </div>
  );
};
