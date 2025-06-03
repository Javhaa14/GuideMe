import { Router } from 'express';
import {
  createTouristProfile,
  getTouristProfile,
} from '../controller/TouristProfile';

export const TouristProfileRouter = Router();

TouristProfileRouter.post('/', createTouristProfile as any).get(
  '/',
  getTouristProfile as any
);
