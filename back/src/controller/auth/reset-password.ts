import { Request, Response } from "express";
import { UserModel } from "../../model/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { sender } from "../../../utils/sendmail";

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

  // Store token in DB or Redis (optional, for tracking)

  // Send email with HTML form instead of URL
  const form = `
    <form method="POST" action="${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset">
      <input type="hidden" name="token" value="${token}" />
      <button type="submit">Approve Reset</button>
    </form>
  `;

  await sender(
    email,
    "Reset Your Password",
    `You requested a password reset. Click the button below:<br>${form}`
  );

  res.send({ success: true });
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
