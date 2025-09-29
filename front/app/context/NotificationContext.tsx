// // context/NotificationContext.tsx
// "use client";

// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useSocket } from "@/app/context/SocketContext"; // your socket context
// import { axiosInstance } from "@/lib/utils";
// import { useSession } from "next-auth/react";

// type NotificationContextType = {
//   notificationCount: number;
//   setNotificationCount: React.Dispatch<React.SetStateAction<number>>;
//   fetchNotificationCount: () => Promise<void>;
// };

// const NotificationContext = createContext<NotificationContextType | undefined>(
//   undefined
// );

// export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { data: session } = useSession();
//   const userId = session?.user?.id;
//   const { socket, isConnected } = useSocket();

//   const [notificationCount, setNotificationCount] = useState(0);

//   const fetchNotificationCount = async () => {
//     if (!userId) return;
//     try {
//       const res = await axiosInstance.get(`/notif/getall/${userId}`);
//       if (Array.isArray(res.data)) {
//         setNotificationCount(res.data.length);
//       }
//     } catch (error) {
//       console.error("❌ Failed to fetch notifications:", error);
//     }
//   };

//   // Fetch on mount or user change
//   useEffect(() => {
//     fetchNotificationCount();
//   }, [userId]);

//   // Listen for socket notification updates
//   useEffect(() => {
//     if (!socket || !isConnected || !userId) return;

//     socket.emit("joinNotificationRoom", userId);

//     const handleNotify = (data: any) => {
//       console.log("🔔 Notification update received:", data);
//       setNotificationCount((prev) => prev + 1);
//     };

//     socket.on("notify", handleNotify);

//     return () => {
//       socket.off("notify", handleNotify);
//       socket.emit("leaveNotificationRoom", userId);
//     };
//   }, [socket, isConnected, userId]);

//   return (
//     <NotificationContext.Provider
//       value={{
//         notificationCount,
//         setNotificationCount,
//         fetchNotificationCount,
//       }}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export const useNotification = () => {
//   const context = useContext(NotificationContext);
//   if (context === undefined) {
//     throw new Error("useNotification must be used within NotificationProvider");
//   }
//   return context;
// };
