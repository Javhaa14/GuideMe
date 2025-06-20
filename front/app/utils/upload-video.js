const cloudinary = require("cloudinary").v2;
const path = require("path");

cloudinary.config({
  cloud_name: "dgwpwmmle",
  api_key: "195549344295498",
  api_secret: "RbqCv8cvfLaQpNrS-0zu47peDg4",
});

const videoPath = path.join(__dirname, "../../public/videos/background.mp4");

async function uploadVideo() {
  console.log("📤 Starting upload...");
  try {
    const result = await cloudinary.uploader.upload(videoPath, {
      resource_type: "video",
      chunk_size: 6000000,
    });
    console.log("✅ Upload successful!");
    console.log("📽️ Public ID:", result.public_id);
    console.log("🔗 Secure URL:", result.secure_url);
  } catch (error) {
    console.error("❌ Upload failed:", error);
  }
}

uploadVideo();
