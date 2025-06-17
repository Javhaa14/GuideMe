import express from "express";

import {
  getNotificationsById,
  markAsSeen,
  sendNotification,
} from "../controller/notificationSMS";

export const Notifrouter = express.Router();

Notifrouter.post("/send", sendNotification)
  .put("/seen/:notificationId", markAsSeen)
  .get("/", getNotificationsById);
