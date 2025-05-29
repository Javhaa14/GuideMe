import { Separator } from "@radix-ui/react-select";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

type Props = {
  profileImage: string;
  profileName: string;
  experience: string;
  review: string;
  chargeStatus: string;
  facebookLink: string;
  instagramLink: string;
};

export const GuideListInPost = (data: Props) => {
  const {
    profileImage,
    profileName,
    experience,
    review,
    chargeStatus,
    facebookLink,
    instagramLink,
  } = data;
  return (
    <div className="flex w-[600px] h-fit border solid border-gray rounded-md p-3">
      <div className="flex w-[150px] h-[150px] rounded-md relative">
        <Image
          src={profileImage}
          alt="image"
          fill={true}
          priority
          unoptimized
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col gap-5 w-full p-2">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 justify-center items-center">
            <h3>{profileName}</h3>
            <span>{experience}</span>
          </div>
          <p>{chargeStatus}</p>
        </div>
        <Separator />
        <div className="flex justify-around items-center">
          <p>{review}</p>
          <div className="flex flex-col">
            {/* <p>Social Media Links</p> */}
            <div className="flex gap-3">
              <Link href={`/${facebookLink}`}>
                <FaFacebookF />
              </Link>
              <Link href={`/${instagramLink}`}>
                <FaInstagram />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
