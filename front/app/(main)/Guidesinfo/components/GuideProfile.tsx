import { HandCoins, Heart, Star, ThumbsUp } from "lucide-react";

export const GuideProfile = ({
  name,
  location,
  about,
  price,
  rating,
  status,
  profileimage,
  onclick,
}: {
  name: string;
  profileimage: string;
  location: string;
  about: string;
  price: number | string;
  rating: number;
  status: string;
  onclick: () => void;
}) => {
  return (
    <div
      onClick={onclick}
      className="w-[500px] h-[200px] border-[1px] border-black rounded-lg flex flex-row gap-2">
      <img
        src={profileimage == "" ? "/user.jpg" : profileimage}
        className="size-[200px] rounded-lg"></img>
      <div className="flex flex-col justify-between py-2 w-full px-5">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col gap-1 w-full">
            <p className="text-[23px] text-black font-bold">{name}</p>
            <p className="text-[14px] text-blue-400">{location}</p>
          </div>
          <HandCoins className="text-blue-600 size-5 mr-2" />
          {price == "FREE" ? (
            <p className="text-blue-400 font-bold">{price}</p>
          ) : (
            <p className="text-blue-400 font-bold">{price}$/h</p>
          )}
          <div
            className={`w-3 h-2 rounded-full ml-3 ${
              status == "available" ? "bg-green-500" : "bg-red-600"
            }`}></div>
        </div>
        <div className="w-full h-[1px] border-[1px] border-gray-300"></div>
        <p className="text-[14px] text-black">{about}</p>
        <div className="flex w-full justify-between flex-row gap-5">
          <div className="flex gap-2">
            <p className="text-[14px] text-black">Rating</p>

            <p className="text-black">{rating}</p>
            <Star className="size-5 text-yellow-300" />
          </div>
          <button className="size-10 flex bg-red-200 justify-center items-center rounded-full text-red-500">
            <ThumbsUp />
          </button>
        </div>
      </div>
    </div>
  );
};
