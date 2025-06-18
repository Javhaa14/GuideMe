import { UserModel } from "../model/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

interface DecodedUser extends JwtPayload {
  id: string;
}
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    username,
    email,
    password,
    role,
    status,
    isOnline,
    bookings,
    rating,
    location,
    lastActive,
    provider,
  } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      res.status(409).json({
        success: false,
        message: "User already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role,
      status,
      isOnline,
      bookings,
      rating,
      location,
      lastActive,
      provider,
    });

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
        isOnline: user.isOnline,
        bookings: user.bookings,
        rating: user.rating,
        location: user.location,
        lastActive: user.lastActive,
        provider: user.provider,
      },
    });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.find().select("-password");
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const checkOrCreateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, name, provider, provider_id } = req.body;

  try {
    let user = await UserModel.findOne({ provider_id });

    if (!user) {
      user = await UserModel.findOne({ email });
    }

    if (!user) {
      user = new UserModel({
        username: name,
        email,
        provider,
        provider_id,
        role: "Tourist", // default role
      });

      await user.save();
    }

    res.status(200).json({
      success: true,
      id: user._id,
      role: user.role,
    });
  } catch (error: unknown) {
    console.error("Error in checkOrCreateUser:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      success: false,
      message: "Invalid user ID",
    });
    return;
  }
  try {
    const user = await UserModel.findById(id).select("-password");
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      success: false,
      message: "Invalid user ID",
    });
    return;
  }
  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const updateUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { username, email, password, role } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      success: false,
      message: "Invalid user ID",
    });
    return;
  }

  try {
    const updates: { [key: string]: any } = {};

    if (username) updates.username = username;
    if (email) updates.email = email;
    if (password) updates.password = await bcrypt.hash(password, 10);
    if (role) updates.role = role; 

    const user = await UserModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};
export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userData = req.userData as JwtPayload | undefined;

    if (!userData || !userData.id) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: No user data found",
      });
      return;
    }

    const user = await UserModel.findById(userData.id).select("-password");
    if (!mongoose.Types.ObjectId.isValid(userData.id)) {
      res.status(400).json({
        success: false,
        message: "Invalid user ID in token",
      });
      return;
    }

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error: unknown) {
    console.error(error);

    const message =
      error instanceof Error ? error.message : "Internal server error";

    res.status(500).json({
      success: false,
      message,
    });
  }
};
