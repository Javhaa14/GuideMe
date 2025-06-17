import { Building2, ShoppingBag, Telescope, Utensils } from "lucide-react";
import { LiaHorseHeadSolid } from "react-icons/lia";
import { MdOutlineHiking } from "react-icons/md";
import { MdFestival } from "react-icons/md";
import { PiMountainsBold } from "react-icons/pi";

const mocData = [
  {
    id: "1",
    profileName: "guide1",
    profileImage: "/profileImage.webp",
    experience: "1 year",
    review: 5,
    chargeStatus: "free",
    facebookA: "host:://",
    instagramA: "host:://",
    location: "Bulgan, Mongolia",
    gender: "male",
    language: ["English", "French", "Japanese"],
    price: "82",
  },
  {
    id: "2",
    profileName: "guide2",
    profileImage: "/profileImage.webp",
    experience: "3 year",
    review: 3,
    chargeStatus: "paid",
    facebookA: "host:://",
    instagramA: "host:://",
    location: "Khuvsgul, Mongolia",
    gender: "female",
    language: ["English", "Korean"],
    price: "24",
  },
  {
    id: "3",
    profileName: "guide3",
    profileImage: "/profileImage.webp",
    experience: "2 years",
    review: 3,
    chargeStatus: "free",
    facebookA: "host:://",
    instagramA: "host:://",
    location: "Khentii, Mongolia",
    gender: "male",
    language: ["Korean"],
    price: "39",
  },
  {
    id: "4",
    profileName: "guide4",
    profileImage: "/profileImage.webp",
    experience: "6 year",
    review: 4,
    chargeStatus: "free",
    facebookA: "host:://",
    instagramA: "host:://",
    location: "Khentii, Mongolia",
    gender: "female",
    language: ["English"],
    price: "75",
  },
  {
    id: "5",
    profileName: "guide5",
    profileImage: "/profileImage.webp",
    experience: "1 year",
    review: 4,
    chargeStatus: "paid",
    facebookA: "host:://",
    instagramA: "host:://",
    location: "Ulaanbaatar, Mongolia",
    gender: "female",
    language: ["English", "Spanish"],
    price: "81",
  },
];

const languagesData = [
  "Mongolian",
  "Japanese",
  "Hindi",
  "Portuguese",
  "Russian",
  "Turkish",
  "Arabic",
  "Italian",
  "Portuguese",
  "Afrikaans",
  "Albanian",
  "Slovak",
  "Kazakh",
  "Serbian",
  "Norwegian",
  "Greek",
  "Danish",
  "Finnish",
  "Bulgarian",
  "Thai",
  "Vietnamese",
  "Indonesian",
  "Swedish",
  "Ukrainian",
  "Kyrgyz",
  "Latvian",
  "Estonian",
  "Czech",
  "Armenian",
  "Hungarian",
];

type Types = {
  id: number;
  language: string;
  isChecked: boolean;
};

const languageExperience: Types[] = [];
languagesData.map((lang, index) =>
  languageExperience.push({
    id: index + 1,
    language: lang,
    isChecked: false,
  })
);
const languages = languageExperience;

const experience = [
  {
    id: 1,
    experience: "up to 1 year",
    experienceNumber: "1",
    isChecked: false,
  },
  {
    id: 2,
    experience: "1 - 5 year",
    experienceNumber: "5",
    isChecked: false,
  },
  {
    id: 3,
    experience: "more than 5 years",
    experienceNumber: "6",
    isChecked: false,
  },
];

const topLanguages = [
  {
    id: 1,
    language: "English",
    isChecked: false,
  },
  {
    id: 2,
    language: "Korean",
    isChecked: false,
  },
  {
    id: 3,
    language: "Spanish",
    isChecked: false,
  },
  {
    id: 4,
    language: "French",
    isChecked: false,
  },
  {
    id: 5,
    language: "Chinese",
    isChecked: false,
  },
  {
    id: 6,
    language: "German",
    isChecked: false,
  },
];

const selectActivites = [
  {
    icon: <Building2 />,
    activity: "City tour",
  },
  {
    icon: <Utensils />,
    activity: "Eat & Drink",
  },
  {
    icon: <ShoppingBag />,
    activity: "Shopping",
  },
  {
    icon: <LiaHorseHeadSolid />,
    activity: "Horse riding",
  },
  {
    icon: <MdOutlineHiking />,
    activity: "Hiking",
  },
  {
    icon: <Telescope />,
    activity: "Stargazing",
  },
  {
    icon: <MdFestival />,
    activity: "Festivals",
  },
  {
    icon: <PiMountainsBold />,
    activity: "Sightseeing",
  },
];

export { mocData, languages, experience, topLanguages, selectActivites };
