//activity items//
"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type ActivityItemProps = {
  user: string;
  action: string;
  time: string;
};

export default function ActivityItem({
  user,
  action,
  time,
}: ActivityItemProps) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
      <Avatar className="w-8 h-8">
        <AvatarImage src="/placeholder.svg?height=32&width=32" />
        <AvatarFallback>
          {user
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="text-sm">
          <span className="font-medium">{user}</span> {action}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
      </div>
    </div>
  );
}
