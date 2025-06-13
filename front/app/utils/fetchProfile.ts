
import { axiosInstance } from "@/lib/utils";

export const fetchTProfile = async (userId: string) => {
  try {
    const res = await axiosInstance.get(`/tprofile/${userId}`);
    console.log("✅ TProfile fetched:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ TProfile fetch failed:", err);
        return null;

  }
};
export const fetchGProfile = async (userId: string) => {
  try {
    const res = await axiosInstance.get(`/gprofile/${userId}`);
    console.log("✅ GProfile fetched:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ GProfile fetch failed:", err);
        return null;

  }
};
