import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { UserModel } from "../../model/User";

dotenv.config();

const secret_key = process.env.SECRET_KEY!;

export const checkUser = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (user) {
      return res.send({ message: "Username already taken" });
    }

    return res.send({ message: "Username available" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      secret_key,
      { expiresIn: "1h" }
    );

    return res
      .cookie("token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .status(201)
      .json({
        success: true,
        message: "User created successfully",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
        token,
      });
  } catch (error: any) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
