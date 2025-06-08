import express from "express";
import { logout } from "../controller/auth/sign-in.controller";

export const Logoutrouter = express.Router();

Logoutrouter.post("/user/offline", logout);
