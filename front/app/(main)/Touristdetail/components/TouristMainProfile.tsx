"use client";
import Chat from "../../components/Chat";
import CreatePost from "./CreatePost";
import { useEffect, useState } from "react";
import Travelerpost from "../../components/Travelerpost";
import { useParams } from "next/navigation";
import { MainProfile } from "./MainProfile";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/Usercontext";
import { axiosInstance } from "@/lib/utils";
import { PostType } from "../../Travelersinfo/page";
import { useOnlineStatus } from "@/app/context/Onlinestatus";
import { fetchTProfile } from "@/app/utils/fetchProfile";
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
export interface OnlineUserStatus {
  isOnline: boolean;
  lastSeen: string;
}

export type OnlineUsers = {
  [userId: string]: OnlineUserStatus;
};

export default function TravelerProfile() {
  const params = useParams();
  const { onlineUsers, fetchOnlineUsers } = useOnlineStatus();

  const { user } = useUser();
  const [tourist, setTourist] = useState<TouristProfile>();
  const [chat, setChat] = useState(false);
  const [post, setPost] = useState<PostType[]>([]);

  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get(`/post/${params.id}`);
      console.log("✅ Posts fetched:", res.data);
      setPost(res.data);
    } catch (err) {
      console.error("❌ Post fetch failed:", err);
    }
  };
  useEffect(() => {
    const loadData = async () => {
      if (params.id && typeof params.id === "string") {
        const tpro = await fetchTProfile(params.id);
        setTourist(tpro);
      }
      fetchPosts();
    };

    loadData();
  }, []);

  const router = useRouter();
  const todetail = (id: string) => {
    router.push(`/Touristdetail/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Chat Component */}
      {chat && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-120 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="h-full w-full flex flex-col">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 pb-0 text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">
                  Chat with {tourist?._id.username}
                </h3>
                <button
                  onClick={() => setChat(false)}
                  className="text-white hover:text-gray-200 transition-colors cursor-pointer"
                >
                  x
                </button>
              </div>
            </div>
            <div className="flex w-full">
              <Chat onlineUsers={onlineUsers} user={user!} />
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Main Profile Card */}
        <MainProfile
          onlineUsers={onlineUsers}
          tourist={tourist!}
          post={post}
          chat={chat}
          setChat={setChat}
        />
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            {params.id === user?.id
              ? "Your posts"
              : `${tourist?._id.username}'s posts`}
          </h2>
          <div className="flex flex-col gap-5">
            {post.map((v, i) => {
              return (
                <Travelerpost
                  onclick={() => {
                    todetail(v.userId);
                  }}
                  key={i}
                  post={v}
                  user={user}
                />
              );
            })}
          </div>
        </div>
        {/* Create Post Section */}
        {params.id === user?.id && (
          <div className="mt-8">
            <CreatePost onPostCreated={fetchPosts} />
          </div>
        )}
      </div>
    </div>
  );
}
