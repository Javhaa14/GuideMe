'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type AvailabilityStatus = 'available' | 'busy' | 'booked';

interface DateStatus {
  [key: string]: AvailabilityStatus;
}

export default function Component() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 2));
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 5, 2));
  const [selectedStatus, setSelectedStatus] =
    useState<AvailabilityStatus>('available');
  const [dateStatuses, setDateStatuses] = useState<DateStatus>({});
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const statusConfig = {
    available: {
      label: 'Available',
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    busy: {
      label: 'Busy',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-700',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
    },
    booked: {
      label: 'Booked',
      color: 'bg-red-500',
      textColor: 'text-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
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

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getDateKey = (year: number, month: number, day: number) => {
    return `${year}-${month}-${day}`;
  };

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

  const getSelectedDateStatus = (): AvailabilityStatus | null => {
    const dateKey = getDateKey(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );
    return dateStatuses[dateKey] || null;
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-8 flex items-center justify-center gap-8">
      {/* Calendar and Controls */}
      <div className="flex flex-col gap-6">
        {/* Status Switcher */}
        <Card className="bg-white border border-gray-200 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Set Availability Status
            </h3>
            <div className="flex gap-2">
              {(Object.keys(statusConfig) as AvailabilityStatus[]).map(
                (status) => (
                  <Button
                    key={status}
                    variant={selectedStatus === status ? 'default' : 'outline'}
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
            <p className="text-sm text-gray-500 mt-3">
              Select a status above, then click on calendar dates to set your
              availability.
            </p>
          </CardContent>
        </Card>

        {/* Calendar Grid */}
        <Card className="w-96 bg-white border border-gray-200 shadow-xl rounded-2xl">
          <CardContent className="p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-600 hover:bg-gray-100"
                onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <h3 className="text-xl font-semibold text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-600 hover:bg-gray-100"
                onClick={() => navigateMonth('next')}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                if (!day) {
                  return <div key={index} className="h-10" />;
                }

                const status = getDateStatus(day);
                const config = status ? statusConfig[status] : null;

                return (
                  <button
                    key={index}
                    className={`h-10 flex items-center justify-center text-sm font-medium rounded cursor-pointer transition-all relative ${
                      config
                        ? `${config.bgColor} ${config.textColor} ${config.borderColor} border`
                        : 'text-gray-900 hover:bg-gray-100'
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
              <h4 className="text-sm font-medium text-gray-700 mb-2">Legend</h4>
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
    </div>
  );
}
