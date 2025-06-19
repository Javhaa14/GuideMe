// import { Request, Response } from "express";
// import { UserModel } from "../../model/User";
// import jwt, { JwtPayload } from "jsonwebtoken";

// import dotenv from "dotenv";
// dotenv.config();
// import { sender } from "../../../utils/sendmail";
// import { io } from "../../index";

// export const requestReset = async (req: Request, res: Response) => {
//   const { email } = req.body;
//   console.log("📩 Reset request for email:", email);

//   const user = await UserModel.findOne({ email });
//   if (!user) {
//     console.log("❌ User not found:", email);
//     return res.status(404).send({ error: "User not found" });
//   }

//   const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET!, {
//     expiresIn: "15m",
//   });

//   const resetUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset/approve?token=${token}`;
//   console.log("🔗 Sending reset URL:", resetUrl);

//   const emailBody = `<a href="${resetUrl}">Approve Reset</a>`;
//   await sender(email, "Reset", emailBody);
//   console.log("📧 Email sent to:", email);

//   res.send({ success: true, message: "Email sent" });
// };

// export const verifyResetToken = (req: Request, res: Response) => {
//   const { token } = req.body;

//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET!);
//     // Optionally check if token is already used
//     res.send({
//       success: true,
//       message: "Token approved, show reset form",
//       payload,
//     });
//   } catch (err) {
//     res
//       .status(400)
//       .send({ success: false, message: "Invalid or expired token" });
//   }
// };
// export const approveReset = async (req: Request, res: Response) => {
//   const { token } = req.body;
//   console.log("✅ Approve request received with token:", token);

//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
//       id: string;
//     };
//     console.log("🧠 Decoded payload:", payload);

//     io.to(`reset_${payload.id}`).emit("resetApproved", {
//       message: "Password reset approved!",
//       userId: payload.id,
//     });
//     console.log("📢 Emitted resetApproved to room:", `reset_${payload.id}`);

//     res.send({ success: true, message: "Reset approved" });
//   } catch (err) {
//     console.error("❌ Token verification failed:", err);
//     res
//       .status(400)
//       .send({ success: false, message: "Invalid or expired token" });
//   }
// };
