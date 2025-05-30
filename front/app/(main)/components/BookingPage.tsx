"use client";
import { useState } from "react";
import {
  format,
  addDays,
  isBefore,
  isAfter,
  isSameDay,
  eachDayOfInterval,
} from "date-fns";
import { Pencil } from "lucide-react";
export default function CalendarBooking() {
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [tempSelectedDates, setTempSelectedDates] = useState<string[]>([]);
  const [edit, setEdit] = useState(false);

  const today = new Date();
  const endDate = addDays(today, 30);

  const availableDates = eachDayOfInterval({ start: today, end: endDate });

  const toggleSelectDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");

    if (bookedDates.includes(dateStr)) return;

    if (tempSelectedDates.includes(dateStr)) {
      setTempSelectedDates(tempSelectedDates.filter((d) => d !== dateStr));
    } else {
      setTempSelectedDates([...tempSelectedDates, dateStr]);
    }
  };

  const handleSubmit = () => {
    setBookedDates([...bookedDates, ...tempSelectedDates]);
    setTempSelectedDates([]);
  };

  const isPast = (date: Date) => isBefore(date, today);
  console.log(edit);

  return (
    <div className="max-w-2xl mx-auto p-4 mt-10">
      <div className="grid grid-cols-7 gap-2 border rounded-lg p-4 bg-white shadow">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
          <div
            key={i}
            className="text-center font-semibold text-sm text-gray-600"
          >
            {day}
          </div>
        ))}

        {availableDates.map((date) => {
          const dateStr = format(date, "yyyy-MM-dd");
          const isBooked = bookedDates.includes(dateStr);
          const isSelected = tempSelectedDates.includes(dateStr);

          const isBeforeToday = isBefore(date, today);
          const isToday = isSameDay(date, today);

          const isDisabled = isBooked || isBeforeToday;

          let bgClass = "bg-green-100 hover:bg-green-300";
          if (isBooked || isBeforeToday)
            bgClass = "bg-gray-400 text-white cursor-not-allowed";
          else if (isSelected) bgClass = "bg-blue-500 text-white";
          else if (edit === false) bgClass = "cursor-not-allowed bg-green-100 ";

          return (
            <button
              key={dateStr}
              onClick={() => toggleSelectDate(date)}
              disabled={isDisabled}
              className={`h-14 flex items-center justify-center rounded-lg border text-sm ${bgClass}`}
            >
              {format(date, "d")}
            </button>
          );
        })}
        <div
          onClick={() => {
            setEdit(!edit);
          }}
          className="h-14 flex items-center justify-center rounded-lg border text-sm"
        >
          <Pencil />
        </div>

        {edit === true && (
          <button
            onClick={() => {
              handleSubmit();
              setEdit(false);
            }}
            disabled={tempSelectedDates.length === 0}
            className="h-14 flex items-center justify-center rounded-lg border text-sm"
          >
            Захиалга илгээх
          </button>
        )}
      </div>
      <div className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"></div>

      {/* {bookedDates.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Баталгаажсан өдрүүд:</h2>
          <ul className="list-disc list-inside">
            {bookedDates.map((d, i) => (
              <li key={i}>{format(new Date(d), 'yyyy-MM-dd (EEE)')}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}
