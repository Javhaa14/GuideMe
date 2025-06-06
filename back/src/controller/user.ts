import { UserModel } from "../model/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

interface DecodedUser extends JwtPayload {
  id: string;
}
export const createUser = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find().select("-password");
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = { ...req.body };

  try {
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const user = await UserModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userData = req.userData;

    let userId: string;

    if (!userData) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No user data found",
      });
    }

    // If userData is a string, try to parse
    if (typeof userData === "string") {
      const parsed = JSON.parse(userData) as DecodedUser;
      userId = parsed.id;
    } else if (typeof userData === "object" && "id" in userData) {
      userId = (userData as DecodedUser).id;
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid user data format",
      });
    }

    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};
