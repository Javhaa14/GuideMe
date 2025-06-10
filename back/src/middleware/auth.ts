import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const secret_key = process.env.JWT_SECRET || "default_secret";

// Extend Express's Request interface
declare module "express-serve-static-core" {
  interface Request {
    userData?: JwtPayload;
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(403).json({ message: "Forbidden: No token provided" });
    return; // Exit without continuing
  }

  try {
    const decoded = jwt.verify(token, secret_key) as JwtPayload;
    req.userData = decoded;
    next();
  } catch (error: any) {
    console.error("JWT error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
