import Image from "next/image";
import { TentTree } from "lucide-react";

const LeftLayout = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Image
        src="/Tavan_Bogd_Mountain.jpg"
        alt="Background"
        fill
        className="object-cover z-0"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/80 backdrop-blur-md z-10" />

      <div className="relative z-20 flex flex-col w-full h-full">
        <div className="flex items-center gap-2 absolute top-8 left-28">
          <TentTree color="white" />
          <p className="text-white text-base font-bold">Guide</p>
        </div>

        <div className="flex flex-col items-center text-center absolute top-1/3 left-1/2 transform -translate-x-1/2">
          <Image
            src="/logo-transparent.png"
            alt="App Icon"
            width={240}
            height={240}
            className="w-60 h-60"
          />

          <p className="text-2xl font-bold text-white pt-9 pb-3">
            Fund your guide
          </p>
          <p className="text-base text-white max-w-[455px]">
            Your adventure starts with the right guide.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftLayout;
