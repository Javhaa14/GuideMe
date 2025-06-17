"use client";
import {
  Calendar,
  Globe,
  MapPin,
  MessageCircle,
  Users,
  VenusAndMarsIcon,
  Pencil,
} from "lucide-react";
import Image from "next/image";
import { PostType } from "../../Travelersinfo/page";
import { OnlineUsers } from "./TouristMainProfile";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/app/context/Usercontext";

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

type MainProfileProps = {
  tourist: TouristProfile;
  post: PostType[];
  chat: boolean;
  setChat: React.Dispatch<React.SetStateAction<boolean>>;
  onlineUsers: OnlineUsers;
};

export const MainProfile = ({
  tourist,
  post,
  chat,
  setChat,
  onlineUsers,
}: MainProfileProps) => {
  const { user } = useUser();
  const params = useParams();
  const router = useRouter();
  const profileId = Array.isArray(params.id) ? params.id[0] : params.id;

  const isOwnProfile = user?.id === tourist?._id._id;

  if (!profileId) return <p>User ID not found in URL params.</p>;

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
      {/* Cover Image */}
      <div className="relative w-full h-64 md:h-80 lg:h-96">
        <Image
          src={tourist?.backgroundimage || "/placeholder.svg"}
          alt="Cover"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Profile Content */}
      <div className="relative px-6 md:px-12 pb-12 pt-20 md:pt-24">
        {/* Profile Image */}
        <div className="absolute -top-16 md:-top-20 left-6 md:left-12">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-6 border-white shadow-2xl overflow-hidden bg-white">
            <Image
              src={tourist?.profileimage || "/placeholder.svg"}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>

          {/* Online Status */}
          <div
            className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-3 border-white ${
              onlineUsers[profileId]?.isOnline
                ? "bg-green-500 animate-pulse"
                : "bg-red-500"
            }`}
          />
        </div>

        {/* Right section */}
        <div className="md:ml-52">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {tourist?._id.username}
              </h1>
              <p className="text-lg text-gray-500 mt-1">Travel Enthusiast</p>
            </div>

            {/* ✏️ Edit Button */}
            {isOwnProfile && (
              <button
                onClick={() => router.push("/edit-profile")}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                <Pencil size={18} />
                Edit Profile
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 py-6">
            <StatBox
              icon={<Calendar />}
              label="Posts"
              count={post.length}
              color="blue"
            />
            <StatBox
              icon={<Users />}
              label="Followers"
              count={2}
              color="green"
            />
            <StatBox
              icon={<Users />}
              label="Following"
              count={1}
              color="purple"
            />
          </div>

          {/* Details */}
          <div className="space-y-4 text-gray-700">
            <Detail icon={<MapPin />} text={tourist?.location} color="blue" />
            <Detail
              icon={<Globe />}
              text={tourist?.languages?.join(", ")}
              color="green"
            />
            <Detail
              icon={<VenusAndMarsIcon />}
              text={tourist?.gender}
              color="purple"
            />
            <Detail
              icon={<Calendar />}
              text={
                "Joined " +
                new Date(tourist?.createdAt ?? "").toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              }
              color="orange"
            />
          </div>

          {/* About Me */}
          <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-inner">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              About Me
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {tourist?.about}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => setChat(!chat)}
              className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-300 text-lg font-semibold"
            >
              <MessageCircle className="w-6 h-6" />
              Start Conversation
            </button>

            <button className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-green-600 text-green-600 rounded-2xl hover:bg-green-50 transition-all duration-300 text-lg font-semibold shadow-md hover:shadow-lg">
              <Users className="w-6 h-6" />
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable sub-components
const StatBox = ({
  icon,
  label,
  count,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
  color: string;
}) => (
  <div
    className={`text-center p-4 bg-gradient-to-br from-${color}-50 to-${color}-100 rounded-xl`}
  >
    <div className={`w-6 h-6 mx-auto mb-2 text-${color}-600`}>{icon}</div>
    <div className={`text-2xl font-bold text-${color}-900`}>{count}</div>
    <div className={`text-sm text-${color}-700`}>{label}</div>
  </div>
);

const Detail = ({
  icon,
  text,
  color,
}: {
  icon: React.ReactNode;
  text: string | undefined;
  color: string;
}) => (
  <div className="flex items-center gap-3">
    <div
      className={`w-10 h-10 bg-${color}-100 rounded-full flex items-center justify-center`}
    >
      <div className={`text-${color}-600`}>{icon}</div>
    </div>
    <span className="text-lg">{text}</span>
  </div>
);
