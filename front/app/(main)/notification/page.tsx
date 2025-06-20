<<<<<<< HEAD
const TravelersPost = () => {
  return <div>Stage</div>;
};

export default TravelersPost;
=======
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
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
