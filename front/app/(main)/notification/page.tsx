"use client";
import { useUser } from "@/app/context/Usercontext";
import { LikedUsersByMyPosts } from "./components/likedUsers";

export default function Home() {
  const { user } = useUser();

  if (!user) return <div>No user found</div>;

  return (
    <div>
      <LikedUsersByMyPosts currentUserId={user.id} />
    </div>
  );
}
