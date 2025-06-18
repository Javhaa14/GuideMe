import { Request, Response } from "express";
import { StatsModel } from "../model/Stats";

export const createStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, value, change, icon, color } = req.body;
  try {
    const stats = await StatsModel.create({
      title: title,
      value: value,
      change: change,
      icon: icon,
      color: color,
    });
    res.status(200).send({ success: true, stats: stats }).end();
  } catch (error) {
    res.status(500).send({ success: false, message: "Server error" }).end();
  }
};

export const getStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await StatsModel.find();
    res.status(200).send({ stats: stats });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
