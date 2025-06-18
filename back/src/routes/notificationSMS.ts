import express from "express";

import {
  getNotificationsById,
  getOneusersNotificationsById,
  markAsSeen,
  sendNotification,
} from "../controller/notificationSMS";

export const Notifrouter = express.Router();

Notifrouter.post("/send", sendNotification as any)
  .put("/seen/:notificationId", markAsSeen)
  .get("/getall/:currentUser", getNotificationsById)
  .get("/:receiverId", getOneusersNotificationsById);
