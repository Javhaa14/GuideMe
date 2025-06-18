import express from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookingsByGuideId,
  getBookingsByTouristId,
  updateBooking,
} from "../controller/tripbook";

export const Bookingrouter = express.Router();

Bookingrouter.post("/", createBooking as any)
  .get("/", getAllBookings)
  .get("/guide/:guideId", getBookingsByGuideId)
  .get("/tourist/:touristId", getBookingsByTouristId)
  .put("/:bookingId", updateBooking as any)
  .delete("/:bookingId", deleteBooking as any);
