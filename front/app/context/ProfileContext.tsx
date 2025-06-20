"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useSession } from "next-auth/react";
import { axiosInstance } from "@/lib/utils";
import { toast } from "sonner";

interface ProfileData {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  location: string;
  languages: string[];
  about: string;
  profileimage: string;
  backgroundimage?: string;
  socialAddress?: string;
  // Guide specific fields
  price?: string;
  experience?: string;
  slogan?: string;
  activities?: string[];
  car?: boolean;
  // Tourist specific fields
  interests?: string[];
  travelStyle?: string;
}

interface ProfileContextType {
  currentRole: "Guide" | "Tourist";
  setCurrentRole: (role: "Guide" | "Tourist") => void;
  profileData: ProfileData | null;
  guideProfile: ProfileData | null;
  touristProfile: ProfileData | null;
  hasGuideProfile: boolean;
  hasTouristProfile: boolean;
  isLoading: boolean;
  updateProfile: (
    data: Partial<ProfileData>,
    role: "Guide" | "Tourist"
  ) => Promise<void>;
  refreshProfiles: () => Promise<void>;
  requireAuth: (action: string) => boolean;
}

const ProfileContext = createContext<ProfileContextType>({
  currentRole: "Tourist",
  setCurrentRole: () => {},
  profileData: null,
  guideProfile: null,
  touristProfile: null,
  hasGuideProfile: false,
  hasTouristProfile: false,
  isLoading: true,
  updateProfile: async () => {},
  refreshProfiles: async () => {},
  requireAuth: () => false,
});

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [currentRole, setCurrentRole] = useState<"Guide" | "Tourist">(
    "Tourist"
  );
  const [guideProfile, setGuideProfile] = useState<ProfileData | null>(null);
  const [touristProfile, setTouristProfile] = useState<ProfileData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  // Authentication check function
  const requireAuth = (action: string): boolean => {
    if (!session) {
      toast.error(`Please login first to ${action}`, {
        description: "You need to be logged in to access this feature.",
        action: {
          label: "Login",
          onClick: () => (window.location.href = "/log-in"),
        },
      });
      return false;
    }
    return true;
  };

  // Fetch both profiles when user session is available
  const fetchProfiles = async () => {
    if (!session?.user?.id) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      // Fetch guide profile
      try {
        const guideResponse = await axiosInstance.get(
          `/gprofile/${session.user.id}`
        );
        if (guideResponse.data) {
          setGuideProfile(guideResponse.data);
        }
      } catch (error) {
        // Guide profile doesn't exist yet
        console.log("No guide profile found");
      }

      // Fetch tourist profile
      try {
        const touristResponse = await axiosInstance.get(
          `/tprofile/${session.user.id}`
        );
        if (touristResponse.data) {
          setTouristProfile(touristResponse.data);
        }
      } catch (error) {
        // Tourist profile doesn't exist yet
        console.log("No tourist profile found");
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [session?.user?.id]);

  // Update profile data
  const updateProfile = async (
    data: Partial<ProfileData>,
    role: "Guide" | "Tourist"
  ) => {
    if (!session?.user?.id) return;

    try {
      const endpoint = role === "Guide" ? "/gprofile" : "/tprofile";
      const response = await axiosInstance.post(endpoint, {
        _id: session.user.id,
        ...data,
      });

      // Update the specific profile
      if (role === "Guide") {
        setGuideProfile(response.data);
      } else {
        setTouristProfile(response.data);
      }

      // Sync common fields between profiles
      const commonFields = {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        gender: data.gender,
        location: data.location,
        languages: data.languages,
        about: data.about,
        profileimage: data.profileimage,
        backgroundimage: data.backgroundimage,
        socialAddress: data.socialAddress,
      };

      // Update the other profile with common fields
      const otherRole = role === "Guide" ? "Tourist" : "Guide";
      const otherEndpoint = otherRole === "Guide" ? "/gprofile" : "/tprofile";

      try {
        const otherProfile = role === "Guide" ? touristProfile : guideProfile;
        if (otherProfile) {
          await axiosInstance.put(otherEndpoint, {
            _id: session.user.id,
            ...commonFields,
          });
        }
      } catch (error) {
        console.log("Could not sync with other profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  // Refresh profiles
  const refreshProfiles = async () => {
    await fetchProfiles();
  };

  // Get current profile data based on role
  const profileData = currentRole === "Guide" ? guideProfile : touristProfile;
  const hasGuideProfile = !!guideProfile;
  const hasTouristProfile = !!touristProfile;

  return (
    <ProfileContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        profileData,
        guideProfile,
        touristProfile,
        hasGuideProfile,
        hasTouristProfile,
        isLoading,
        updateProfile,
        refreshProfiles,
        requireAuth,
      }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
