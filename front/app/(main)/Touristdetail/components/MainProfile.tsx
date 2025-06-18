import {
  Calendar,
  Globe,
  MapPin,
  MessageCircle,
  Users,
  VenusAndMarsIcon,
} from "lucide-react";
import Image from "next/image";
import { PostType } from "../../Travelersinfo/page";
import { OnlineUsers } from "./TouristMainProfile";
import { useParams } from "next/navigation";
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
  const params = useParams();
  const profileId = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!profileId) {
    return <p>User ID not found in URL params.</p>;
  }
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
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

          {onlineUsers[profileId]?.isOnline ? (
            <div className="absolute bottom-2 right-2 w-6 h-6 animate-pulse bg-green-500 border-3 border-white rounded-full"></div>
          ) : (
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-red-500 border-3 border-white rounded-full"></div>
          )}
        </div>

        <div className="md:ml-52">
          {/* Name and Basic Info */}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {tourist?._id.username}
              </h1>
              <p className="text-lg text-gray-600 mt-2">Travel Enthusiast</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 py-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-900">
                  {post.length}
                </div>
                <div className="text-sm text-blue-700">Posts</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-900">{2}</div>
                <div className="text-sm text-green-700">Followers</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-900">{1}</div>
                <div className="text-sm text-purple-700">Following</div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin size={20} className="text-blue-600" />
                </div>
                <span className="text-lg">{tourist?.location}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Globe size={20} className="text-green-600" />
                </div>
                <span className="text-lg">
                  {tourist?.languages?.join(", ")}
                </span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <VenusAndMarsIcon size={20} className="text-purple-600" />
                </div>
                <span className="text-lg capitalize">{tourist?.gender}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Calendar size={20} className="text-orange-600" />
                </div>
                <span className="text-lg">
                  Joined in{"  "}
                  {new Date(tourist?.createdAt ?? "").toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
            </div>

            {/* About Section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                About Me
              </h3>
              <p className="text-gray-700 leading-relaxed">{tourist?.about}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => setChat(!chat)}
                className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <MessageCircle className="w-6 h-6" />
                Start Conversation
              </button>

              <button className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-green-600 text-green-600 rounded-2xl hover:bg-green-50 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl">
                <Users className="w-6 h-6" />
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
