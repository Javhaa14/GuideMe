import { Router } from "express";
import { checkUsername, signup } from "../controller/auth/sign-up.controller";
import { signin } from "../controller/auth/sign-in.controller";

export const authRouter = Router();

authRouter
  .post("/check-user", checkUsername as any)
  .post("/signup", signup as any)
  .post("/signin", signin as any);
