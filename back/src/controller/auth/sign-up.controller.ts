import { Request, Response } from "express";
import { UserModel } from "../../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const checkUsername = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (user) {
      res.status(409).json({ message: "Username already taken" });
    }

    res.status(200).json({ message: "Username available" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: 3600 }
    );

    res
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
          username: user.username,
          email: user.email,
        },
        token,
      });
  } catch (error: any) {
    if (error.code === 11000 && error.keyPattern?.email) {
      res.status(400).json({ message: "email already registered" });
    }

    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};
