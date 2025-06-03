import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { UserModel } from "../../model/User";

dotenv.config();

const secret_key = process.env.SECRET_KEY!;

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "This account doesn't exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Email or password is wrong",
      });
    }

    const tokenPayload = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, secret_key, { expiresIn: 3600 });

    return res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user: tokenPayload,
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return res.status(500).send({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
