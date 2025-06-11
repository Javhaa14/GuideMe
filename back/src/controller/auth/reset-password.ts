import { Request, Response } from "express";
import { UserModel } from "../../model/User";
import jwt, { JwtPayload } from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();
import { sender } from "../../../utils/sendmail";
import { io } from "../..";

export const requestReset = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) return res.status(404).send({ error: "User not found" });

  const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset?token=${token}`;

  const emailBody = `
    <p>You requested a password reset. Click the button below to approve:</p>
    <a href="${resetUrl}" target="_blank" style="padding:10px 20px; background:#1a73e8; color:#fff; text-decoration:none; border-radius:5px;">Approve Reset</a>
  `;

  await sender(email, "Password Reset Approval", emailBody);

  res.send({ success: true, message: "Email sent" });
};
export const verifyResetToken = (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    // Optionally check if token is already used
    res.send({
      success: true,
      message: "Token approved, show reset form",
      payload,
    });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, message: "Invalid or expired token" });
  }
};
export const approveReset = async (req: Request, res: Response) => {
  const { token } = req.body;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
      id: string;
    };

    // Now you can safely access payload.id
    io.to(`reset_${payload.id}`).emit("resetApproved", {
      message: "Password reset approved!",
      userId: payload.id,
    });

    res.send({ success: true, message: "Reset approved" });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, message: "Invalid or expired token" });
  }
};
