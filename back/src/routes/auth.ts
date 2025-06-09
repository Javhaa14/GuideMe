import { Router } from "express";
import { checkUsername, signup } from "../controller/auth/sign-up.controller";
import { signin } from "../controller/auth/sign-in.controller";
import { checkOrCreateUser } from "../controller/sda";

export const authRouter = Router();

authRouter
  .post("/check-user", checkUsername)
  .post("/signup", signup)
  .post("/signin", signin)
  .post("/check-or-create-user", checkOrCreateUser);
