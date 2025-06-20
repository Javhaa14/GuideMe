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
<<<<<<< HEAD
  .post("/request-reset", requestReset)
=======
  .post("/request-reset", requestReset as any)
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  .post("/verify-reset-token", verifyResetToken);
