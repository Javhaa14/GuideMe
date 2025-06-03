import { Request, Response } from 'express';
import { Gprofilemodel } from '../model/GuideProfile';

export const createGuideProfile = async (req: Request, res: Response) => {
  try {
    const guideProfile = await Gprofilemodel.create(req.body);
    return res.status(201).json({
      success: true,
      guideProfile,
    });
  } catch (error) {
    console.error('Create GuideProfile Error:', error);
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};
export const getGuideProfile = async (_req: Request, res: Response) => {
  try {
    const guideProfile = await Gprofilemodel.find();
    return res.status(200).json({
      success: true,
      guideProfile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};
