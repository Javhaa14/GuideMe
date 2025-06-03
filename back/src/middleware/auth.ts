import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const secret_key = process.env.SECRET_KEY!;

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

declare module "express" {
  export interface Request {
    user?: JwtPayload;
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  try {
    const decoded = jwt.verify(token, secret_key) as JwtPayload;

    req.user = decoded;

    req.body = { ...req.body, user: decoded };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
