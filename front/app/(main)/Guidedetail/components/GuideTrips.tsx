import Image from "next/image";

export function GuideTrips() {
  return (
    <div className="h-[300px] w-[500px] border border-[#a0e89e] rounded-2xl flex justify-center items-start flex-col">
      <Image
        alt="icon"
        height={130}
        width={440}
        src={"/altai.png"}
        className="rounded-xl p-4"
      ></Image>
      <p>Altai</p>
    </div>
  );
}
