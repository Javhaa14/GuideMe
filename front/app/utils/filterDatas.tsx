const mocData = [
  {
    id: "1",
    profileName: "guide1",
    profileImage: "/profileImage.webp",
    experience: "1 year",
    review: "5",
    chargeStatus: "free",
    facebookA: "host:://",
    instagramA: "host:://",
    location: "Ulaanbaatar",
    gender: "male",
    language: ["English", "French", "Japanese"],
  },
  {
    id: "2",
    profileName: "guide2",
    profileImage: "/profileImage.webp",
    experience: "3 year",
    review: "3",
    chargeStatus: "paid",
    facebookA: "host:://",
    instagramA: "host:://",
    location: "Khuvsgul",
    gender: "female",
    language: ["English", "Korean"],
  },
  {
    id: "3",
    profileName: "guide3",
    profileImage: "/profileImage.webp",
    experience: "2 years",
    review: "3",
    chargeStatus: "free",
    facebookA: "host:://",
    instagramA: "host:://",
    location: "Khentii",
    gender: "male",
    language: ["Korean"],
  },
  {
    id: "4",
    profileName: "guide4",
    profileImage: "/profileImage.webp",
    experience: "6 year",
    review: "4",
    chargeStatus: "free",
    facebookA: "host:://",
    instagramA: "host:://",
    location: "Khentii",
    gender: "female",
    language: ["English"],
  },
];

const reviews = [
  {
    id: 1,
    review: "1",
    isChecked: false,
  },
  {
    id: 2,
    review: "2",
    isChecked: false,
  },
  {
    id: 3,
    review: "3",
    isChecked: false,
  },
  {
    id: 4,
    review: "4",
    isChecked: false,
  },
  {
    id: 5,
    review: "5",
    isChecked: false,
  },
];

const locations = [
  {
    id: 1,
    location: "Ulaanbaatar",
    isChecked: false,
  },
  {
    id: 2,
    location: "Bulgan",
    isChecked: false,
  },
  {
    id: 3,
    location: "Khentii",
    isChecked: false,
  },
  {
    id: 4,
    location: "Khuvsgul",
    isChecked: false,
  },
  {
    id: 5,
    location: "Zavkhan",
    isChecked: false,
  },
];

const languagesData = [
  "Mongolian",
  "English",
  "Spanish",
  "Chinese",
  "Japanese",
  "Hindi",
  "Portuguese",
  "Russian",
  "Korean",
  "Turkish",
  "Arabic",
  "German",
  "French",
  "Italian",
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

export { mocData, reviews, locations, languages, experience };
