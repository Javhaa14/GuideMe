import { UserModel } from "../model/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

interface DecodedUser extends JwtPayload {
  id: string;
}
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, email, password, role } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      res.status(409).json({
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

    res.status(201).json({
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
    // Find by provider_id first (best for OAuth users)
    let user = await UserModel.findOne({ provider_id });

    // If not found by provider_id, try email (could be old user with credentials)
    if (!user) {
      user = await UserModel.findOne({ email });
    }

    if (!user) {
      // Create new user
      user = new UserModel({
        username: name,
        email,
        provider,
        provider_id,
        role: "Tourist", // or whatever default role
      });

      await user.save();
    }

    res.status(200).json({ success: true, user });
  } catch (error: unknown) {
    console.error("Error in checkOrCreateUser:", error);
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: "Unknown error occurred" });
    }
  }
};
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
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
  const { username, email, password } = req.body;

  try {
    const updates: { [key: string]: string } = {};

    if (username) updates.username = username;
    if (email) updates.email = email;
    if (password) updates.password = await bcrypt.hash(password, 10);

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
