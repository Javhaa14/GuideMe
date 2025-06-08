import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { axiosInstance } from "@/lib/utils";

type OnlineUserData = {
  isOnline: boolean;
  lastSeen: string; // ISO timestamp string
};

type OnlineStatusContextType = {
  onlineUsers: Record<string, OnlineUserData>;
  setOnlineStatus: (
    userId: string,
    isOnline: boolean,
    lastSeen: string
  ) => void;
  fetchOnlineUsers: () => Promise<Record<string, OnlineUserData>>;
};

// ✅ Create the context properly
const OnlineStatusContext = createContext<OnlineStatusContextType | undefined>(
  undefined
);

// ✅ Provider component
export const OnlineStatusProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [onlineUsers, setOnlineUsers] = useState<
    Record<string, OnlineUserData>
  >({});

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

  const fetchOnlineUsers = async (): Promise<
    Record<string, OnlineUserData>
  > => {
    try {
      const res = await axiosInstance.get(`/api/online`);
      const onlineUsersArray = res.data.onlineUsers as Array<{
        _id: string;
        lastSeen: string;
      }>;

      const onlineUsersMap: Record<string, OnlineUserData> = {};
      onlineUsersArray.forEach((user) => {
        onlineUsersMap[user._id] = {
          isOnline: true,
          lastSeen: user.lastSeen,
        };
      });

      setOnlineUsers(onlineUsersMap);
      return onlineUsersMap;
    } catch (error) {
      console.error("❌ Failed to fetch online users", error);
      return {};
    }
  };

  useEffect(() => {
    fetchOnlineUsers(); // run immediately

    const interval = setInterval(() => {
      fetchOnlineUsers();
    }, 1000); // every 10s

    return () => clearInterval(interval);
  }, []);

  return (
    <OnlineStatusContext.Provider
      value={{ onlineUsers, setOnlineStatus, fetchOnlineUsers }}>
      {children}
    </OnlineStatusContext.Provider>
  );
};

// ✅ Custom hook to use the context
export const useOnlineStatus = (): OnlineStatusContextType => {
  const context = useContext(OnlineStatusContext);
  if (!context) {
    throw new Error("useOnlineStatus must be used within OnlineStatusProvider");
  }
  return context;
};
