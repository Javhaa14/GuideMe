export const GuideProfile = ({
  name,
  location,
  about,
  price,
  rating,
}: {
  name: string;
  location: string;
  about: string;
  price: number;
  rating: number;
}) => {
  return (
    <div className="w-[500px] h-[200px] border-[1px] border-black rounded-lg flex flex-row gap-2">
      <img className="w-[300px] h-[200px]"></img>
      <div className="flex flex-col justify-between py-2 w-full gap-3 px-5">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col gap-1 w-full">
            <p className="text-[23px] text-black font-bold">{name}</p>
            <p className="text-[14px] text-gray-400">{location}</p>
          </div>
          <p className="text-blue-400">{price}</p>
        </div>
        <div className="w-full h-[1px] border-[1px] border-gray-300"></div>
        <p className="text-[14px] text-black">{about}</p>
        <div className="flex flex-row gap-5">
          <p className="text-[14px] text-black">Rating</p>
          <p className="text-black">{rating}</p>
        </div>
      </div>
    </div>
  );
};
