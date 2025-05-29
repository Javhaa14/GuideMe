import { Filter } from "lucide-react";
import { FilterButton } from "./filterButton";
import { GuideListInPost } from "./guideListInPost";
import { Tripdone } from "./Tripdone";

const mocData = [
  {
    profileName: "guide1",
    profileImage: "/profileImage.webp",
    experience: "about",
    review: "* * * *",
    chargestatus: "free",
    facebook: "host:://",
    instagram: "host:://",
  },
  {
    profileName: "guide2",
    profileImage: "/profileImage.webp",
    experience: "about",
    review: "* * *",
    chargestatus: "paid",
    facebook: "host:://",
    instagram: "host:://",
  },
];

export const CheckedGuides = () => {
  return (
    <div className="flex flex-col gap-5 pl-[80px] pt-[80px]">
      <div className="flex gap-5">
        <FilterButton />
      </div>
      <div className="flex flex-col gap-3">
        {mocData?.map((guide, index) => (
          <div key={index}>
            <GuideListInPost
              profileImage={guide.profileImage}
              profileName={guide.profileName}
              experience={guide.experience}
              review={guide.review}
              facebookLink={guide.facebook}
              instagramLink={guide.instagram}
              chargeStatus={guide.chargestatus}
            />
          </div>
        ))}
        <Tripdone />
      </div>
    </div>
  );
};
