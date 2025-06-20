"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Calendar, Star, UserCheck } from "lucide-react";

type ActiveUser = {
  _id: number;
  username: string;
  avatar: string;
  location: string;
  lastActive: string;
  isOnline: "online" | "offline" | "busy";
  activity: string;
  rating?: number;
  joinDate?: string;
};

type ActiveUsersProps = {
  user: ActiveUser;
};

export function ActiveUsers({ user }: ActiveUsersProps) {
  const statusConfig = {
    online: {
      color: "bg-green-500",
      text: "Online",
      variant: "default" as const,
    },
    offline: {
      color: "bg-gray-500",
      text: "Offline",
      variant: "secondary" as const,
    },
    busy: {
      color: "bg-yellow-500",
      text: "Busy",
      variant: "secondary" as const,
    },
  };

  const status = statusConfig[user.isOnline];

  return (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="relative">
        <Avatar className="w-12 h-12">
          <AvatarImage src={user.avatar || "/placeholder-user.jpg"} />
          <AvatarFallback>
            {user.username
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${status.color}`}
          title={status.text}
        />
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900 dark:text-white">
            {user.username}
          </h4>
          {user.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{user.rating}</span>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          {user.activity}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>{user.location}</span>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{user.lastActive}</span>
          </div>

          {user.joinDate && (
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{user.joinDate}</span>
            </div>
          )}

          <Badge variant={status.variant} className="ml-auto">
            <UserCheck className="w-3 h-3 mr-1" />
            {status.text}
          </Badge>
        </div>
      </div>
    </div>
  );
}
