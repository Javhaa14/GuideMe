import express from "express";

import {
  getNotificationsById,
  getUnseenNotifications,
  markAllFromSenderAsSeen,
  sendNotification,
} from "../controller/notificationSMS";

export const Notifrouter = express.Router();

Notifrouter.post("/send", sendNotification as any)
  .get("/getall/:currentUser", getNotificationsById)
  .get("/unseen/:userId", getUnseenNotifications)
  .put("/seen", markAllFromSenderAsSeen);
