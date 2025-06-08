// context/OnlineStatusContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance } from "@/lib/utils";

type OnlineStatusContextType = {
  onlineUsers: Record<string, boolean>;
  setOnlineStatus: (userId: string, isOnline: boolean) => void;
  fetchOnlineStatus: (userId: string) => Promise<boolean>;
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

  const fetchOnlineStatus = async (userId: string) => {
    try {
      const res = await axiosInstance.get(`/api/user/${userId}/status`);
      setOnlineStatus(userId, res.data.isOnline);
      return res.data.isOnline;
    } catch (error) {
      console.error("Failed to fetch online status", error);
      return false;
    }
  };

  return (
    <Onlinestatus.Provider
      value={{ onlineUsers, setOnlineStatus, fetchOnlineStatus }}>
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
