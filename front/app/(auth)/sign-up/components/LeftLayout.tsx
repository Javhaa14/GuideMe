import Image from "next/image";
import { TentTree } from "lucide-react";

const LeftLayout = () => {
  return (
    <div className="flex flex-col w-screen h-screen px-20 py-8 relative">
      <div className="flex gap-2 absolute top-[32px] left-[108px]">
        <TentTree />
        <p className="text-[16px] font-bold">Guide</p>
      </div>

      <div className="flex flex-col items-center text-center absolute top-1/3 left-1/2 transform -translate-x-1/2">
        <div className="relative w-60 h-60">
          <Image
            alt="icon"
            height={240}
            width={240}
            className="w-[240px] h-[240px] "
            src={"/coffee.png"}
          ></Image>
        </div>

        <p className="text-2xl font-bold text-[#09090B] pt-9 pb-3">
          Fund your guide
        </p>
        <p className="text-base text-[#09090B] max-w-[455px]">
          Accept support. Start a membership. Setup a shop. It’s easier than you
          think.
        </p>
      </div>
    </div>
  );
};

export default LeftLayout;
