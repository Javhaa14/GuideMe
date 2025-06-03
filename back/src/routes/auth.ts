import { Router } from "express";
import { signin } from "../controller/auth/sign-in.controller";
import { checkUser, signup } from "../controller/auth/sign-up.controller";

export const authRouter = Router();

authRouter
  .post("/", signin as any)
  .post("/signup", signup as any)
  .post("/check-user", checkUser as any);
