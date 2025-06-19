"use client";
import { axiosInstance } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface GuideProfile {
  profileImage?: string;
  rating?: number;
  activeStatus?: string; // e.g., "Online", "Offline", "Last active 5 mins ago"
}

interface User {
  _id: string;
  username: string;
  email: string;
  guideProfile?: GuideProfile;
}

export const LikedUsersByMyPosts = ({
  currentUserId,
}: {
  currentUserId: string;
}) => {
  const [likedUsers, setLikedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUserId) return;

    setLoading(true);
    axiosInstance
      .get(`/post/liked/${currentUserId}`)
      .then((response) => {
        setLikedUsers(response.data.likedUsers || []);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || "Failed to fetch liked users");
        setLoading(false);
      });
  }, [currentUserId]);

  if (loading) return <div>Loading liked users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      className="liked-users-container"
      style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        Users Who Liked My Posts
      </h2>

      {likedUsers.length === 0 && <p>No users have liked your posts yet.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {likedUsers.map((user) => {
          const { guideProfile } = user;

          return (
            <li
              key={user._id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 15,
                padding: 10,
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
              }}>
              {/* Profile image */}
              <img
                src={
                  guideProfile?.profileImage ||
                  "/default-profile.png" /* fallback image */
                }
                alt={`${user.username} profile`}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: 15,
                  border: "2px solid #4A90E2",
                }}
              />

              {/* User info */}
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    margin: 0,
                    color: "#333",
                  }}>
                  {user.username}
                </p>
                <p style={{ margin: "4px 0", color: "#555" }}>{user.email}</p>

                {/* Guide profile extra */}
                {guideProfile && (
                  <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                    <div
                      style={{
                        backgroundColor: "#f0f4ff",
                        padding: "2px 6px",
                        borderRadius: 4,
                        fontSize: 14,
                        color: "#4A90E2",
                        fontWeight: "600",
                      }}>
                      ⭐ {guideProfile.rating?.toFixed(1) ?? "N/A"}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color:
                          guideProfile.activeStatus === "Online"
                            ? "green"
                            : "#999",
                      }}>
                      {guideProfile.activeStatus || "Offline"}
                    </div>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
