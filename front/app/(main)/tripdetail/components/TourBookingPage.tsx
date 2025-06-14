"use client";

import React, { useState } from "react";
import { Booking } from "./Booking";
import { Checking } from "./Checking";

export default function TourBookingPage() {
  const [showChecking, setShowChecking] = useState(false);
  const [bookingData, setBookingData] = useState<any | null>(null);

  const handleCheck = (data: any) => {
    setBookingData(data);
    setShowChecking(true);
  };

  return (
    <div>
      <Booking onCheck={handleCheck} />
      {showChecking && bookingData && <Checking data={bookingData} />}
    </div>
  );
}
