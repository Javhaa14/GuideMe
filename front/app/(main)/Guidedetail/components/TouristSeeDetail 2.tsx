import Image from "next/image";

export function TouristSeeDetail() {
  return (
    <div>
      <div className="flex flex-col">
        <Image
          src="/Tavan_Bogd_Mountain.jpg"
          alt="App Icon"
          width={540}
          height={240}
          className="w-200 h-60 rounded-2xl"
        />

        <div className="flex flex-col ">
          <div>
            <h2 className="text-[30px] font-semibold">Tavan Bogd</h2>
            <div className="flex justify-between">
              <p className="text-[#09090B] text-[16px]">
                ter2 gazraar yvj ym uzuulnee
              </p>
              <p className="text-[#09090B] text-[16px]">8/20/2025</p>
            </div>

            <div className="flex justify-between">
              <p className="text-[#09090B] text-[16px]">Total price</p>
              <h3 className="text-[24px] font-semibold text-[#09090B] pb-4">
                ₮20k
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
