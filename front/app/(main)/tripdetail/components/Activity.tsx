import { CalendarDays, Globe, TimerReset, Users } from "lucide-react";
import React from "react";

const ActivityItem = ({
  icon: Icon,
  title,
  value,
  iconColor = "text-gray-800",
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  iconColor?: string;
}) => (
  <div className="flex items-start space-x-4">
    <div className="mt-1">
      <Icon className={`w-6 h-6 ${iconColor}`} />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{value}</p>
    </div>
  </div>
);

export const Activity = () => {
  return (
    <div className="max-w-5xl p-6 mx-auto space-y-6 bg-white border border-gray-100 shadow-lg rounded-2xl">
      <h2 className="text-3xl font-bold text-gray-900">About this activity</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <ActivityItem
            icon={CalendarDays}
            title="Start date"
            value="2025/7/25"
          />
          <ActivityItem
            icon={Users}
            title="Group size"
            value="Small (2-6 people)"
            iconColor="text-emerald-500"
          />
        </div>

        <div className="space-y-4">
          <ActivityItem icon={TimerReset} title="Duration" value="5 days" />
          <ActivityItem
            icon={Globe}
            title="Live tour guide"
            value="English, Mongolian"
            iconColor="text-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
