import { Router } from "express";
import { checkUsername, signup } from "../controller/auth/sign-up.controller";
import { signin } from "../controller/auth/sign-in.controller";
import { checkOrCreateUser } from "../controller/sda";
import {
  requestReset,
  verifyResetToken,
} from "../controller/auth/reset-password";

export const authRouter = Router();

authRouter
  .post("/check-user", checkUsername)
  .post("/signup", signup)
  .post("/signin", signin)
  .post("/check-or-create-user", checkOrCreateUser)
  .post("/request-reset", requestReset)
  .post("/verify-reset-token", verifyResetToken);
