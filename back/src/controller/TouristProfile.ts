import { Request, Response } from 'express';
import { TouristModel } from '../model/TouristProfile';

export const createTouristProfile = async (req: Request, res: Response) => {
  try {
    const guideProfile = await TouristModel.create(req.body);
    return res.status(201).json({
      success: true,
      guideProfile,
    });
  } catch (error) {
    console.error('Create Tourist Profile Error:', error);
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};
