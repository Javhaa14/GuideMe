"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Booking, TripItem } from "./Booking";
import { Checking } from "./Checking";

interface TourBookingPageProps {
  trip: TripItem;
}

export default function TourBookingPage({ trip }: TourBookingPageProps) {
  const [bookingData, setBookingData] = useState<any | null>(null);
  const [bookingStatus, setBookingStatus] = useState("");
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [checkingOpen, setCheckingOpen] = useState(false);

  // ✅ Called only when participants/language change
  const handleCheck = (data: any) => {
    setBookingData(data);
  };

  // ✅ Toggle visibility separately
  const toggleChecking = () => {
    setCheckingOpen((prev) => !prev);
  };

  // ✅ Refresh logic
  const refreshBooking = useCallback(() => {
    if (bookingStatus === "no booking") {
      setAlreadyBooked(false);
    }
  }, [bookingStatus]);

  // ✅ Update alreadyBooked when bookingStatus changes
  useEffect(() => {
    const newStatus =
      bookingStatus === "booked" || bookingStatus === "payment success";
    if (alreadyBooked !== newStatus) {
      setAlreadyBooked(newStatus);
    }
  }, [bookingStatus, alreadyBooked]);

  // ✅ Handle Booking Confirm
  const handleBookingConfirmed = useCallback(() => {
    setBookingStatus("payment success");
    setCheckingOpen(false);
    refreshBooking();
  }, [refreshBooking]);

  // ✅ Handle Cancel/Edit
  const handleCancel = () => setCheckingOpen(false);
  const handleEdit = () => setCheckingOpen(true);

  return (
    <div>
      <Booking
        onCheck={handleCheck}
        trip={trip}
        alreadyBooked={alreadyBooked}
        checkingOpen={checkingOpen}
        setCheckingOpen={toggleChecking} // ✅ Fix toggle behavior
        bookingStatus={bookingStatus}
        refreshBooking={refreshBooking}
      />

      {checkingOpen && bookingData && (
        <Checking
          trip={trip}
          data={bookingData}
          onBookingConfirmed={handleBookingConfirmed}
          onCancel={handleCancel}
          onEdit={handleEdit}
          bookingStatus={bookingStatus}
          setBookingStatus={setBookingStatus}
        />
      )}
    </div>
  );
}
