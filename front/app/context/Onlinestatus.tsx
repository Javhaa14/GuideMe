import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance } from "@/lib/utils";

type OnlineUserData = {
  isOnline: boolean;
  lastSeen: string; // ISO timestamp
};

// ✅ Context type now uses OnlineUserData, not just boolean
type OnlineStatusContextType = {
  onlineUsers: Record<string, OnlineUserData>;
  setOnlineStatus: (
    userId: string,
    isOnline: boolean,
    lastSeen: string
  ) => void;
  fetchOnlineUsers: () => Promise<void>;
};

const Onlinestatus = createContext<OnlineStatusContextType | undefined>(
  undefined
);

export const OnlineStatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // ✅ Fix: state now correctly stores OnlineUserData objects
  const [onlineUsers, setOnlineUsers] = useState<
    Record<string, OnlineUserData>
  >({});

  // ✅ Updates status with full data (online & lastSeen)
  const setOnlineStatus = (
    userId: string,
    isOnline: boolean,
    lastSeen: string
  ) => {
    setOnlineUsers((prev) => ({
      ...prev,
      [userId]: { isOnline, lastSeen },
    }));
  };

  // ✅ Fetch online users from API
  const fetchOnlineUsers = async () => {
    try {
      const res = await axiosInstance.get(`/api/online`);
      const onlineUsersArray = res.data.onlineUsers;

      const onlineUsersMap: Record<string, OnlineUserData> = {};
      onlineUsersArray.forEach((user: any) => {
        onlineUsersMap[user._id] = {
          isOnline: user.isOnline,
          lastSeen: user.lastSeen,
        };
      });

      setOnlineUsers(onlineUsersMap);
    } catch (error) {
      console.error("❌ Failed to fetch online users:", error);
    }
  };

  return (
    <Onlinestatus.Provider
      value={{ onlineUsers, setOnlineStatus, fetchOnlineUsers }}>
      {children}
    </Onlinestatus.Provider>
  );
};

export const useOnlineStatus = () => {
  const context = useContext(Onlinestatus);
  if (!context) {
    throw new Error("useOnlineStatus must be used within OnlineStatusProvider");
  }
  return context;
};
