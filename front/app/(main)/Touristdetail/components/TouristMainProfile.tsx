"use client";
import Chat from "../../components/Chat";
import CreatePost from "./CreatePost";
import { useEffect, useState } from "react";
import Travelerpost from "../../components/Travelerpost";
import axios from "axios";
import { useParams } from "next/navigation";
import { MainProfile } from "./MainProfile";
import { useRouter } from "next/navigation";
export type TouristProfile = {
  _id: {
    _id: string;
    username: string;
    email: string;
    role: string;
  };
  gender: string;
  languages: string[];
  location: string;
  profileimage: string;
  backgroundimage: string;
  socialAddress: string;
  about: string;
  createdAt: string;
  updatedAt: string;
};
export type Post = {
  _id: string;
  city: string;
  content: string;
  country: string;
  createdAt: string;
  endDate: string;
  images: string[];
  likedBy: string[];
  likes: number;
  people: number;
  startDate: string;
  tprofileInfo: TouristProfile;
  userId: string;
  userInfo: {
    username: string;
    email: string;
    role: string;
  };
};
export type UserPayload = {
  _id: string;
  username: string;
  role: string;
};
export default function TravelerProfile() {
  const params = useParams();
  const [user, setUser] = useState<UserPayload | null>(null);
  const [tourist, setTourist] = useState<TouristProfile>();
  const [chat, setChat] = useState(false);
  const [post, setPost] = useState<Post[]>([]);
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`,
        {
          withCredentials: true,
        }
      );
      const userData = res.data.user;
      setUser(userData);
    } catch (error) {
      console.log("No user logged in or error fetching user");
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tprofile/${params.id}`
      );
      console.log("✅ Posts fetched:", res.data);
      setTourist(res.data);
    } catch (err) {
      console.error("❌ Post fetch failed:", err);
    }
  };
  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${params.id}`
      );
      console.log("✅ Posts fetched:", res.data);
      setPost(res.data);
    } catch (err) {
      console.error("❌ Post fetch failed:", err);
    }
  };
  useEffect(() => {
    fetchUser();
    fetchProfile();
    fetchPosts();
  }, []);
  const router = useRouter();
  const todetail = (id: string) => {
    router.push(`/Touristdetail/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Chat Component */}
      {chat && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-110 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="h-full w-full flex flex-col">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 pb-0 text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">
                  Chat with {tourist?._id.username}
                </h3>
                <button
                  onClick={() => setChat(false)}
                  className="text-white hover:text-gray-200 transition-colors">
                  x
                </button>
              </div>
            </div>
            <div className="flex w-full">
              <Chat user={user!} />
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Main Profile Card */}
        <MainProfile
          tourist={tourist!}
          post={post}
          chat={chat}
          setChat={setChat}
        />
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            {params.id === user?._id
              ? "Your posts"
              : `${tourist?._id.username}'s posts`}
          </h2>
          <div className="flex flex-col">
            {post.map((v, i) => {
              return (
                <Travelerpost
                  onclick={() => {
                    todetail(v.userId);
                  }}
                  key={i}
                  post={v}
                />
              );
            })}
          </div>
        </div>
        {/* Create Post Section */}
        {params.id === user?._id && (
          <div className="mt-8">
            <CreatePost onPostCreated={fetchPosts} />
          </div>
        )}
      </div>
    </div>
  );
}
