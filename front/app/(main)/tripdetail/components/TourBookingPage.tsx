"use client";

import React, { useState } from "react";
import { Booking, TripItem } from "./Booking";
import { Checking } from "./Checking";
interface TourBookingPageProps {
  trip: TripItem;
}
export default function TourBookingPage({ trip }: TourBookingPageProps) {
  const [showChecking, setShowChecking] = useState(false);
  const [bookingData, setBookingData] = useState<any | null>(null);

  const handleCheck = (data: any) => {
    setBookingData(data);
    setShowChecking(true);
  };

  return (
    <div>
      <Booking onCheck={handleCheck} trip={trip} />
      {showChecking && bookingData && (
        <Checking trip={trip} data={bookingData} />
      )}
    </div>
  );
}
