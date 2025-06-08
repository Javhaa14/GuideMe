import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance } from "@/lib/utils";

type OnlineStatusContextType = {
  onlineUsers: Record<string, boolean>;
  setOnlineStatus: (userId: string, isOnline: boolean) => void;
  fetchOnlineUsers: () => Promise<Record<string, boolean>>;
};

const Onlinestatus = createContext<OnlineStatusContextType | undefined>(
  undefined
);

export const OnlineStatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [onlineUsers, setOnlineUsers] = useState<Record<string, boolean>>({});

  const setOnlineStatus = (userId: string, isOnline: boolean) => {
    setOnlineUsers((prev) => ({ ...prev, [userId]: isOnline }));
  };

  const fetchOnlineUsers = async () => {
    try {
      const res = await axiosInstance.get(`/api/online`);
      const onlineUsersArray = res.data.onlineUsers; // Array of user objects

      const onlineUsersMap: Record<string, boolean> = {};
      onlineUsersArray.forEach((user: any) => {
        onlineUsersMap[user._id] = true;
      });

      setOnlineUsers(onlineUsersMap);
      return onlineUsersMap;
    } catch (error) {
      console.error("Failed to fetch online users", error);
      return {};
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
  if (!context)
    throw new Error("useOnlineStatus must be used within OnlineStatusProvider");
  return context;
};
