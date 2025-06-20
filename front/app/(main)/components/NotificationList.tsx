"use client";

import { useEffect, useState } from "react";
import { axiosInstance, cn } from "@/lib/utils";
import { useLikeNotification } from "@/app/context/NotificationContext";

interface NotificationItem {
  _id: string;
  fromUser?: {
    name: string;
    avatar: string;
  };
  message: string;
  createdAt: string;
  read: boolean;
}

export default function NotificationList({ userId }: { userId: string }) {
  const { markAsRead } = useLikeNotification();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  useEffect(() => {
    if (!userId) return;

    axiosInstance.get(`/notification/${userId}`).then((res) => {
      setNotifications(res.data.notifications || []);
    });
  }, [userId]);

  const filtered =
    activeTab === "all" ? notifications : notifications.filter((n) => !n.read);

  return (
    <div className="w-[360px] bg-white dark:bg-neutral-900 rounded-xl shadow-xl border">
      <div className="flex justify-between items-center px-4 pt-4 pb-2 border-b dark:border-neutral-700">
        <h2 className="text-lg font-semibold">Мэдэгдэл</h2>
        <button
          onClick={markAsRead}
          className="text-sm text-blue-600 hover:underline"
        >
          Бүгдийг уншсан болгох
        </button>
      </div>

      <div className="flex space-x-4 px-4 py-2 border-b dark:border-neutral-700 text-sm">
        <button
          className={cn(
            activeTab === "all"
              ? "font-bold border-b-2 border-blue-600"
              : "text-gray-500",
            "pb-1"
          )}
          onClick={() => setActiveTab("all")}
        >
          Бүгд
        </button>
        <button
          className={cn(
            activeTab === "unread"
              ? "font-bold border-b-2 border-blue-600"
              : "text-gray-500",
            "pb-1"
          )}
          onClick={() => setActiveTab("unread")}
        >
          Уншаагүй
        </button>
      </div>

      <div className="max-h-[450px] overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="text-sm text-center text-gray-500 py-10">
            Мэдэгдэл алга
          </div>
        ) : (
          filtered.map((notif) => (
            <div
              key={notif._id}
              className="flex items-start space-x-3 px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <img
                src={notif.fromUser?.avatar || "/avatar.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">
                    {notif.fromUser?.name || "Хэрэглэгч"}
                  </span>{" "}
                  {notif.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatTime(notif.createdAt)}
                </p>
              </div>
              {!notif.read && (
                <span className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function formatTime(date: string) {
  const diff = (Date.now() - new Date(date).getTime()) / 1000;
  if (diff < 60) return "саяхан";
  if (diff < 3600) return `${Math.floor(diff / 60)} мин`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} цаг`;
  return `${Math.floor(diff / 86400)} өдөр`;
}
