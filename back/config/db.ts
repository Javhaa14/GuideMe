import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URL орчны хувьсагч тодорхойлогдоогүй байна.");
    }

    await mongoose.connect(mongoUrl);
    console.log("MongoDB-д амжилттай холбогдлоо!");
  } catch (error) {
    console.error("MongoDB холболтын алдаа:", error);
    process.exit(1);
  }
};

export default connectDB;
