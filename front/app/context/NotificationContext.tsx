import { socket } from "@/lib/socket";
import { axiosInstance } from "@/lib/utils";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface NotificationContextType {
  unreadCount: number;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
  markAsRead: () => Promise<void>;
}
interface NotificationProviderProps {
  userId?: string;
  children: ReactNode; // children-ийг ReactNode гэж тодорхойлно
}
const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({
  userId,
  children,
}: NotificationProviderProps) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!userId) return;

    // Socket room-д join хийх функц
    const joinRoom = () => {
      console.log("➡️ Emitting joinNotificationRoom", userId);
      socket.emit("joinNotificationRoom", userId);
    };

    // Socket холболт болсон үед room-д орох
    socket.on("connect", joinRoom);
    joinRoom();

    // Socket-с realtime мэдэгдэл хүлээн авах
    socket.on("notify", (data) => {
      // console.log('✅ Realtime notification:', data);
      setUnreadCount((prev) => prev + 1);
    });

    // Серверээс анхдагч unread тоог авах
    axiosInstance
      .get(`/notification/unread-count/${userId}`)
      .then((res) => {
        console.log("📥 Initial unread:", res.data.count);
        setUnreadCount(res.data.count || 0);
      })
      .catch((err) => console.error("🔴 Failed to fetch unread:", err));

    // Цэвэрлэх
    return () => {
      socket.off("connect", joinRoom);
      socket.off("notify");
    };
  }, [userId]);

  // Сервер рүү unread-ийг уншсан гэж тэмдэглэх функц
  const markAsRead = async () => {
    if (!userId) return;
    try {
      await axiosInstance.put(`/notification/mark-seen/${userId}`);
      setUnreadCount(0);
    } catch (error) {
      console.error("🔴 Failed to mark notifications as read:", error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{ unreadCount, setUnreadCount, markAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Hook хэлбэрээр ашиглахад хялбар болгох
export const useLikeNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error("useNotification must be used within NotificationProvider");
  return context;
};
