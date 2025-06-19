import { Notification } from "../model/notification";
import { Request, Response } from "express";

export const getnotif = async (_: Request, res: Response): Promise<void> => {
  try {
    const notif = Notification.find();
    if (!notif) {
      console.log("uuseegui baina");
    }
    res.status(200).send({
      succes: true,
      notif: notif,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("ERROR getnotif", {
        message: error.message,
        stack: error.stack,
      });

      res.status(500).send({
        error: "Internal Server Error",
        succes: false,
      });
    } else {
      res.status(500).send({ error: "Unexpected error occurred" });
    }
  }
};
