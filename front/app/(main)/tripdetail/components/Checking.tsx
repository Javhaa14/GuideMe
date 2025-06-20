"use client";

<<<<<<< HEAD
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, MapPin, Users, Calendar } from "lucide-react";

interface CheckingProps {
  data: {
    participants: {
      adult: number;
      youth: number;
      child: number;
    };
=======
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, MapPin, Users, Calendar } from "lucide-react";
import { io, Socket } from "socket.io-client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { axiosInstance } from "@/lib/utils";
import { useUser } from "@/app/context/Usercontext";

interface Participants {
  adult: number;
  child: number;
}

interface CheckingProps {
  data: {
    participants: Participants;
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
    totalParticipants: number;
    language: string;
    totalPrice: number;
  };
<<<<<<< HEAD
}

export const Checking: React.FC<CheckingProps> = ({ data }) => {
  const { participants, totalParticipants, language, totalPrice } = data;

  return (
    <Card className="max-w-5xl p-8 mt-6 space-y-8 border shadow-lg md:p-10 rounded-2xl">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          From Ulaanbaatar: Khuvsgul Lake Tour
        </h2>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#453C67]" />
            <span>Ulaanbaatar, Mongolia</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#453C67]" />
            <span>{language}-speaking guide</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 pt-6 border-t md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-[#F0F7FF]">
              <Calendar className="w-5 h-5 text-[#453C67]" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Available time
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-[#EFF6FF] text-[#453C67]">
                  2025/07/25 8:00 AM
                </span>
=======
  trip: any; // Ideally, replace with proper type like TripItem
  onBookingConfirmed: () => void;
  onCancel: () => void;
  onEdit: () => void;
  bookingStatus: string;
  setBookingStatus: React.Dispatch<React.SetStateAction<string>>;
}

export const Checking: React.FC<CheckingProps> = ({
  data,
  trip,
  onBookingConfirmed,
  onCancel,
  onEdit,
  bookingStatus,
  setBookingStatus,
}) => {
  const { participants, totalParticipants, language, totalPrice } = data;
  const { user } = useUser();

  const [qr, setQr] = useState<string>("");
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [loadingQr, setLoadingQr] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [userPeopleCount, setUserPeopleCount] = useState<number>(1); // default 1

  // Fetch QR code on demand
  const fetchQr = async () => {
    setLoadingQr(true);
    try {
      const res = await fetch("https://guideme-8o9f.onrender.com/");
      const data = await res.json();
      setQr(data.qr);
      setPaymentId(data.id);
    } catch (error) {
      console.error("Failed to fetch QR:", error);
    }
    setLoadingQr(false);
  };

  // Initialize socket once
  useEffect(() => {
    const newSocket = io("https://guideme-8o9f.onrender.com", {
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Listen to paymentStatus events for the current paymentId
  useEffect(() => {
    if (!socket || !paymentId) return;

    socket.emit("watchPayment", paymentId);

    const handler = async (message: { status: boolean }) => {
      if (message.status === true) {
        setBookingStatus("payment success");

        try {
          // Check for existing booking or create/update it
          const checkRes = await axiosInstance.get("/bookings", {
            params: {
              tripPlanId: trip._id,
              paymentId: paymentId,
            },
          });

          if (checkRes.data?.bookings && checkRes.data.bookings.length > 0) {
            const existingBooking = checkRes.data.bookings[0];
            await axiosInstance.put(`/bookings/${existingBooking._id}`, {
              numberOfPeople: totalParticipants,
              touristId: user.id,
              selectedDate: trip.date,
              paymentId,
              paymentStatus: "paid",
            });
          } else {
            await axiosInstance.post("/bookings", {
              tripPlanId: trip._id,
              touristId: user.id,
              numberOfPeople: totalParticipants,
              selectedDate: trip.date,
              paymentId,
              paymentStatus: "paid",
            });
          }

          onBookingConfirmed();

          setTimeout(() => {
            setIsDialogOpen(false);
            setQr("");
            setPaymentId(null);
          }, 3000);
        } catch (err) {
          console.error("Booking create/update error:", err);
        }
      }
    };

    socket.on("paymentStatus", handler);

    return () => {
      socket.off("paymentStatus", handler);
    };
  }, [
    socket,
    paymentId,
    trip,
    totalParticipants,
    user,
    setBookingStatus,
    onBookingConfirmed,
  ]);

  // Check existing booking on mount or when user/trip changes
  const checkExistingBooking = async () => {
    if (!user?.id) {
      setBookingStatus("no booking");
      setBookingId(null);
      return;
    }
    try {
      const res = await axiosInstance.get(`/bookings/tourist/${user.id}`);
      const bookings = res.data?.bookings || [];
      const paidBooking = bookings.find((b: any) => b.paymentStatus === "paid");

      if (paidBooking) {
        setBookingStatus("payment success");
        setBookingId(paidBooking._id);
        setUserPeopleCount(paidBooking.numberOfPeople); // ✅ Save number of people
      } else {
        setBookingStatus("no booking");
        setBookingId(null);
        setUserPeopleCount(1);
      }
    } catch (err) {
      console.error("Failed to check booking:", err);
      setBookingStatus("no booking");
      setBookingId(null);
      setUserPeopleCount(1);
    }
  };

  useEffect(() => {
    if (!user?.id) {
      setBookingStatus("no booking");
      setBookingId(null);
      return;
    }
    if (trip) {
      checkExistingBooking();
    }
  }, [user, trip, setBookingStatus]);

  // Cancel Booking
  const handleCancelBooking = async (bookingId: string) => {
    try {
      await axiosInstance.put(`/bookings/${bookingId}`, {
        cancelTouristId: user.id,
        numberOfPeople: userPeopleCount, // ✅ Use dynamic count
      });
      alert("Your booking has been cancelled successfully.");
      await checkExistingBooking();
    } catch (error) {
      alert("Failed to cancel booking. Please try again.");
      console.error(error);
    }
  };

  if (!trip) {
    return (
      <Card className="max-w-5xl p-8 mt-6 text-center border shadow-lg md:p-10 rounded-2xl">
        <p className="text-gray-500">Loading trip data...</p>
      </Card>
    );
  }

  const unitPrice = trip.price || 100;

  return (
    <>
      <Card className="max-w-5xl p-8 mt-6 space-y-8 border shadow-lg md:p-10 rounded-2xl">
        {/* Trip info */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">{trip.title}</h2>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#453C67]" />
              <span>Ulaanbaatar, Mongolia</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#453C67]" />
              <span>{language}-speaking guide</span>
            </div>
          </div>
        </div>

        {/* People and Date info */}
        <div className="grid gap-6 pt-6 border-t md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-[#F0F7FF]">
                <Calendar className="w-5 h-5 text-[#453C67]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Available time
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-[#EFF6FF] text-[#453C67]">
                    {new Date(trip.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-[#F0F7FF]">
                <Users className="w-5 h-5 text-[#453C67]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  People count
                </p>
                <p className="font-medium text-gray-800">
                  {totalParticipants} person(s)
                </p>
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
              </div>
            </div>
          </div>
        </div>

<<<<<<< HEAD
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-[#F0F7FF]">
              <Users className="w-5 h-5 text-[#453C67]" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">People count</p>
              <p className="font-medium text-gray-800">
                {totalParticipants} person(s)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 space-y-4 border-t">
        <h3 className="text-xl font-semibold text-gray-900">Price breakdown</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-800">
                Adult × {participants.adult}
              </p>
              <p className="text-sm text-gray-500">Age 18–99</p>
            </div>
            <span className="font-medium text-gray-800">
              ${participants.adult * 100}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-800">
                Youth × {participants.youth}
              </p>
              <p className="text-sm text-gray-500">Age 13–17</p>
            </div>
            <span className="font-medium text-gray-800">
              ${participants.youth * 100}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-800">
                Child × {participants.child}
              </p>
              <p className="text-sm text-gray-500">Age 0–12</p>
            </div>
            <span className="font-medium text-gray-800">
              ${participants.child * 100}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-900">${totalPrice}.00</p>
            <p className="text-sm text-gray-500">Includes all taxes and fees</p>
          </div>
          <Button className="px-8 py-6 text-lg font-semibold bg-[#453C67] hover:bg-[#5a4f8a] transition">
            Book Now
          </Button>
        </div>
      </div>
    </Card>
=======
        {/* Price breakdown */}
        <div className="pt-6 space-y-4 border-t">
          <h3 className="text-xl font-semibold text-gray-900">
            Price breakdown
          </h3>

          <div className="space-y-3">
            {["adult", "child"].map((type) => {
              const count = participants[type as keyof Participants] || 0;
              return (
                <div
                  key={type}
                  className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-800">
                      {type.charAt(0).toUpperCase() + type.slice(1)} × {count}
                    </p>
                    <p className="text-sm text-gray-500">
                      {type === "adult" ? "Age 18–99" : "Age 0–12"}
                    </p>
                  </div>
                  <span className="font-medium text-gray-800">
                    ${count * unitPrice}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                ${totalPrice}.00
              </p>
              <p className="text-sm text-gray-500">
                Includes all taxes and fees
              </p>
            </div>

            {bookingStatus === "payment success" ? (
              <div className="flex gap-4">
                <Button
                  variant="destructive"
                  className="px-6 py-3 font-medium"
                  onClick={() => {
                    if (bookingId) {
                      handleCancelBooking(bookingId);
                    } else {
                      alert("Booking ID not found.");
                    }
                  }}>
                  Cancel Booking
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => {
                  setIsDialogOpen(true);
                  fetchQr();
                }}
                className="px-8 py-6 text-lg font-semibold bg-[#453C67] hover:bg-[#5a4f8a] transition"
                disabled={loadingQr}>
                {loadingQr ? "Loading QR..." : "Pay Now"}
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Payment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md rounded-xl p-6">
          <DialogHeader className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              {trip.title} - Payment
            </DialogTitle>
            <DialogClose />
          </DialogHeader>

          <div className="flex flex-col items-center gap-6 mt-4">
            {qr ? (
              <img
                src={qr}
                alt="Payment QR Code"
                className="w-64 h-64 object-contain"
              />
            ) : (
              <p>Loading QR code...</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  );
};
