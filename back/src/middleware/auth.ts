import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const secret_key = process.env.JWT_SECRET || "default_secret";

declare module "express-serve-static-core" {
  interface Request {
    userData?: string | JwtPayload;
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ message: "Forbidden: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, secret_key);
    req.userData = decoded;
    next();
  } catch (error: any) {
    console.error("JWT error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// export const resetToken = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(403).json({ message: "Forbidden: No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, secret_key);
//     req.user = decoded;
//     next();
//   } catch (error: any) {
//     console.error("JWT error:", error.message);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };
