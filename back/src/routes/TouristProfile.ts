import { Router } from 'express';
import { createTouristProfile } from '../controller/TouristProfile';

export const TouristProfileRouter = Router();

TouristProfileRouter.post('/', createTouristProfile as any);
