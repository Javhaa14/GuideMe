import { Router } from 'express';
import {
  createGuideProfile,
  getGuideProfile,
} from '../controller/GuideProfile';

export const GuideProfileRouter = Router();

GuideProfileRouter.post('/', createGuideProfile as any).get(
  '/',
  getGuideProfile as any
);
