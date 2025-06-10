"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useUser } from "@/app/context/Usercontext";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/lib/utils";

// Date статус төрөл тодорхойлох
// (available, busy, booked гэсэн 3 төлөвтэй)
type AvailabilityStatus = "available" | "busy" | "booked";

// Обьектоор хадгалж буй статусуудын интерфэйс
type DateStatus = {
  [key: string]: AvailabilityStatus;
};

export default function Ebooking() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedStatus, setSelectedStatus] =
    useState<AvailabilityStatus>("available");
  const [dateStatuses, setDateStatuses] = useState<DateStatus>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [data, setData] = useState([]);
  const { user } = useUser();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const statusConfig = {
    available: {
      label: "Available",
      color: "bg-green-500",
      textColor: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    busy: {
      label: "Busy",
      color: "bg-yellow-500",
      textColor: "text-yellow-700",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    booked: {
      label: "Booked",
      color: "bg-red-500",
      textColor: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      direction === "prev"
        ? newDate.setMonth(prev.getMonth() - 1)
        : newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const getDateKey = (year: number, month: number, day: number) =>
    `${year}-${month}-${day}`;

  const handleDateClick = (day: number) => {
    const dateKey = getDateKey(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setDateStatuses((prev) => ({
      ...prev,
      [dateKey]: selectedStatus,
    }));
  };

  const getDateStatus = (day: number): AvailabilityStatus | null => {
    const dateKey = getDateKey(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return dateStatuses[dateKey] || null;
  };
  const params = useParams();
  const transformStatusesForDB = () => {
    return Object.entries(dateStatuses).map(([dateKey, status]) => {
      const [year, month, day] = dateKey.split("-").map(Number);
      const isoDate = new Date(year, month, day + 1)
        .toISOString()
        .split("T")[0];
      return { date: isoDate, status };
    });
  };

  const handleSave = async () => {
    const transformedData = transformStatusesForDB();
    console.log("days", transformedData);

    try {
      const res = await axiosInstance.put(`gprofile/availability`, {
        userId: params.id,
        availability: transformedData,
      });

      console.log("Availability saved successfully", res.data);
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Error saving availability", err);
      alert("Error saving availability");
    }
  };

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await axiosInstance.get(
          `/gprofile/availability/${params.id}`
        );
        const data = res.data;
        setData(res.data.availability);
        const restored: DateStatus = {};
        data.availability.forEach(
          (entry: { date: string; status: AvailabilityStatus }) => {
            const date = new Date(entry.date);
            const key = getDateKey(
              date.getFullYear(),
              date.getMonth(),
              date.getDate()
            );
            restored[key] = entry.status;
          }
        );
        setDateStatuses(restored);
      } catch (err) {
        console.error("Error fetching availability", err);
      }
    };

    fetchAvailability();
  }, []);

  const days = getDaysInMonth(currentDate);

  return (
    <div className="flex flex-col gap-6">
      {/* Edit Button */}
      <div className="text-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
              <Edit className="mr-2 h-5 w-5" />
              Edit Availability
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                Edit Your Availability
              </DialogTitle>
            </DialogHeader>

            <div className="p-4">
              {/* Status Selector in Dialog */}
              <Card className="bg-white border border-gray-200 shadow-lg rounded-2xl mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Select Status
                  </h3>

                  <div className="flex gap-2 mb-4">
                    {(Object.keys(statusConfig) as AvailabilityStatus[]).map(
                      (status) => (
                        <Button
                          key={status}
                          variant={
                            selectedStatus === status ? "default" : "outline"
                          }
                          size="sm"
                          className={`flex items-center gap-2 ${
                            selectedStatus === status
                              ? `${statusConfig[status].color} hover:${statusConfig[status].color}/90 text-white`
                              : `${statusConfig[status].textColor} ${statusConfig[status].borderColor} hover:${statusConfig[status].bgColor}`
                          }`}
                          onClick={() => setSelectedStatus(status)}>
                          <div
                            className={`w-3 h-3 rounded-full ${statusConfig[status].color}`}
                          />
                          {statusConfig[status].label}
                        </Button>
                      )
                    )}
                  </div>

                  <p className="text-sm text-gray-500">
                    Select a status above, then click on calendar dates to apply
                    it.
                  </p>
                </CardContent>
              </Card>

              {/* Calendar in Dialog */}
              <Card className="bg-white border border-gray-200 shadow-xl rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-600 hover:bg-gray-100"
                      onClick={() => navigateMonth("prev")}>
                      <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <h3 className="text-xl font-semibold text-gray-900">
                      {monthNames[currentDate.getMonth()]}{" "}
                      {currentDate.getFullYear()}
                    </h3>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-600 hover:bg-gray-100"
                      onClick={() => navigateMonth("next")}>
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map((day) => (
                      <div
                        key={day}
                        className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {days.map((day, index) => {
                      if (!day) return <div key={index} className="h-10" />;

                      const status = getDateStatus(day);
                      const config = status ? statusConfig[status] : null;

                      return (
                        <button
                          key={index}
                          className={`h-10 flex items-center justify-center text-sm font-medium rounded cursor-pointer transition-all relative hover:scale-105 ${
                            config
                              ? `${config.bgColor} ${config.textColor} ${config.borderColor} border`
                              : "text-gray-900 hover:bg-gray-100 hover:border-gray-300 border border-transparent"
                          }`}
                          onClick={() => handleDateClick(day)}>
                          {day}
                          {status && (
                            <div
                              className={`absolute bottom-1 right-1 w-2 h-2 rounded-full ${
                                config!.color
                              }`}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Legend
                    </h4>
                    <div className="flex gap-4 text-xs">
                      {(Object.keys(statusConfig) as AvailabilityStatus[]).map(
                        (status) => (
                          <div key={status} className="flex items-center gap-1">
                            <div
                              className={`w-2 h-2 rounded-full ${statusConfig[status].color}`}
                            />
                            <span className="text-gray-600">
                              {statusConfig[status].label}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end gap-3 p-4 border-t">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-purple-600 hover:bg-purple-700">
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Always Visible Calendar (Read-only) */}
      <Card className="w-[265px] bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden">
        <CardContent className="p-2">
          {/* Header: Month Navigation */}
          <div className="flex items-center justify-between mb-2 px-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-gray-600 hover:bg-gray-100"
              onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="text-center">
              <h3 className="text-sm font-semibold text-gray-900 leading-none">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <p className="text-[10px] text-gray-500">View Only</p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-gray-600 hover:bg-gray-100"
              onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="h-[150px] w-full overflow-hidden">
            <div className="grid grid-cols-7 gap-[1px] mb-1">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="h-4 flex items-center justify-center text-[10px] text-gray-500 font-medium">
                  {day[0]}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-[1px]">
              {days.map((day, index) => {
                if (!day) return <div key={index} className="h-5" />;

                const status = getDateStatus(day);
                const config = status ? statusConfig[status] : null;

                return (
                  <div
                    key={index}
                    className={`h-5 flex items-center justify-center text-[10px] font-medium rounded relative ${
                      config
                        ? `${config.bgColor} ${config.textColor} ${config.borderColor} border`
                        : "text-gray-900"
                    }`}>
                    {day}
                    {status && (
                      <div
                        className={`absolute bottom-[1px] right-[1px] w-1 h-1 rounded-full ${
                          config!.color
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
