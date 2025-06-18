"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, MapPin, Users, Calendar, X } from "lucide-react";
import { io, Socket } from "socket.io-client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { axiosInstance } from "@/lib/utils";
import { useUser } from "@/app/context/Usercontext";

interface CheckingProps {
  data: {
    participants: {
      adult: number;
      youth: number;
      child: number;
    };
    totalParticipants: number;
    language: string;
    totalPrice: number;
  };
  trip: any;
}

export const Checking: React.FC<CheckingProps> = ({ data, trip }) => {
  const { participants, totalParticipants, language, totalPrice } = data;
  const { user } = useUser();
  const [qr, setQr] = useState<string>("");
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [loadingQr, setLoadingQr] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch QR code when dialog opens
  const fetchQr = async () => {
    setLoadingQr(true);
    try {
      const res = await fetch("https://guideme-8o9f.onrender.com/");
      const data = await res.json();
      setQr(data.qr);
      setPaymentId(data.id);
      setStatus("");
    } catch (error) {
      console.error("Failed to fetch QR:", error);
    }
    setLoadingQr(false);
  };

  // Initialize socket once on mount
  useEffect(() => {
    const newSocket = io("https://guideme-8o9f.onrender.com", {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Watch payment status when paymentId & socket are ready
  useEffect(() => {
    if (!socket || !paymentId) return;

    socket.emit("watchPayment", paymentId);

    socket.on("paymentStatus", async (message: { status: boolean }) => {
      if (message.status === true) {
        setStatus("payment success");

        // Create or update booking in backend
        try {
          // Step 1: Check if booking exists by tripPlanId and paymentId
          const checkRes = await axiosInstance.get("/bookings", {
            params: {
              tripPlanId: trip._id,
              paymentId: paymentId,
            },
          });

          if (
            checkRes.data &&
            checkRes.data.bookings &&
            checkRes.data.bookings.length > 0
          ) {
            // Booking exists - update the first one found
            const existingBooking = checkRes.data.bookings[0];
            await axiosInstance.put(`/bookings/${existingBooking._id}`, {
              numberOfPeople: totalParticipants,
              selectedDate: trip.date,
              participants,
              language,
              totalPrice,
              paymentId,
            });
          } else {
            const touristId = user.id;

            await axiosInstance.post("/bookings", {
              tripPlanId: trip._id,
              touristId,
              numberOfPeople: totalParticipants,
              selectedDate: trip.date,
              participants,
              language,
              totalPrice,
              paymentId,
            });
          }
        } catch (err) {
          console.error("Booking creation/updation failed:", err);
        }

        // Auto-close dialog after 5 seconds
        setTimeout(() => {
          setIsDialogOpen(false);
          setQr("");
          setPaymentId(null);
          setStatus("");
        }, 5000);
      }
    });

    return () => {
      socket.off("paymentStatus");
    };
  }, [socket, paymentId]);

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
        {/* Trip info here */}
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
              </div>
            </div>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="pt-6 space-y-4 border-t">
          <h3 className="text-xl font-semibold text-gray-900">
            Price breakdown
          </h3>

          <div className="space-y-3">
            {["adult", "child"].map((type) => {
              const count = participants[type as keyof typeof participants];
              return (
                <div
                  key={type}
                  className="flex items-center justify-between py-2 border-b border-gray-100"
                >
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
            <Button
              onClick={() => {
                setIsDialogOpen(true);
                fetchQr();
              }}
              className="px-8 py-6 text-lg font-semibold bg-[#453C67] hover:bg-[#5a4f8a] transition"
              disabled={loadingQr}
            >
              {loadingQr ? "Loading QR..." : "Pay Now"}
            </Button>
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
            <DialogClose>
              <button
                aria-label="Close"
                className="text-gray-400 hover:text-gray-600"
                onClick={() => {
                  setQr("");
                  setPaymentId(null);
                  setStatus("");
                }}
              >
                <X className="w-6 h-6" />
              </button>
            </DialogClose>
          </DialogHeader>

          <div className="flex flex-col items-center gap-6 mt-4">
            {qr ? (
              <img
                src={qr}
                alt="Payment QR Code"
                className="w-48 h-48 rounded-lg shadow-lg"
              />
            ) : (
              <p>Loading QR code...</p>
            )}
            {status === "payment success" && (
              <p className="text-green-600 font-semibold text-lg">
                ✅ Payment Successful! Your booking is confirmed.
              </p>
            )}
            {status !== "payment success" && (
              <p className="text-center text-gray-700">
                Please scan the QR code above with your payment app to complete
                the booking.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
