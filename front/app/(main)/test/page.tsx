// "use client";
// import { useState } from "react";

import LanguageSelector from "./LanguageSelector";

// const data = {
//   Mongolia: ["Ulaanbaatar", "Darkhan", "Erdenet"],
//   Japan: ["Tokyo", "Osaka", "Kyoto"],
// };

// export default function DependentSelect() {
//   const [country, setCountry] = useState("Mongolia");
//   const [city, setCity] = useState(data["Mongolia"][0]);

//   const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedCountry = e.target.value;
//     setCountry(selectedCountry);
//     setCity(data[selectedCountry][0]);
//   };

//   return (
//     <div className="flex flex-col gap-4 p-4 text-black">
//       <label>
//         Country:
//         <select value={country} onChange={handleCountryChange}>
//           {Object.keys(data).map((c) => (
//             <option key={c} value={c}>
//               {c}
//             </option>
//           ))}
//         </select>
//       </label>

//       <label>
//         City:
//         <select value={city} onChange={(e) => setCity(e.target.value)}>
//           {data[country].map((ct) => (
//             <option key={ct} value={ct}>
//               {ct}
//             </option>
//           ))}
//         </select>
//       </label>
//     </div>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const LANGUAGES = [
//   { code: "en", label: "English" },
//   { code: "mn", label: "Монгол" },
//   { code: "ru", label: "Русский" },
//   { code: "ja", label: "日本語" },
//   { code: "ko", label: "한국어" },
//   { code: "zh-CN", label: "中文" },
// ];

// function getInitialLangFromCookie(): string {
//   const match = document.cookie.match(
//     /(?:^|;\s*)googtrans=\/[a-z-]+\/([a-z-]+)/i
//   );
//   return match?.[1] || "en";
// }

// export default function LanguageSelector() {
//   const [language, setLanguage] = useState<string>("en");

//   // 👉 Script dynamically add
//   useEffect(() => {
//     setLanguage(getInitialLangFromCookie());

//     // Зөвхөн client талд ажиллах
//     if (typeof window === "undefined") return;

//     if (!(window as any).google?.translate) {
//       const script = document.createElement("script");
//       script.src =
//         "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//       script.async = true;
//       script.id = "google-translate-script";
//       document.body.appendChild(script);
//     }

//     // Global function
//     (window as any).googleTranslateElementInit = () => {
//       new (window as any).google.translate.TranslateElement(
//         {
//           pageLanguage: "en",
//           includedLanguages: LANGUAGES.map((lang) => lang.code).join(","),
//           layout: (window as any).google.translate.TranslateElement.InlineLayout
//             .SIMPLE,
//           autoDisplay: false,
//         },
//         "google_translate_element"
//       );
//     };
//   }, []);

//   const handleLanguageChange = (lang: string) => {
//     setLanguage(lang);

//     // Cookie-д хадгалах
//     const cookieValue = `/en/${lang}`;
//     document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`;

//     // Google Translate ажиллуулж буй simulate
//     const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
//     if (select) {
//       select.value = lang;
//       select.dispatchEvent(new Event("change"));
//     }
//   };

//   return (
//     <div className="flex flex-col items-start space-y-2">
//       {/* Хэрэглэгчийн харах Select */}
//       <Select value={language} onValueChange={handleLanguageChange}>
//         <SelectTrigger className="w-[180px]">
//           <SelectValue placeholder="Select language" />
//         </SelectTrigger>
//         <SelectContent>
//           {LANGUAGES.map((lang) => (
//             <SelectItem key={lang.code} value={lang.code}>
//               {lang.label}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       {/* Хэрэглэгчдэд харагдахгүй Google Translate контейнер */}
//       <div id="google_translate_element" style={{ display: "none" }} />
//     </div>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";

// const LANGUAGES = [
//   { code: "en", label: "English" },
//   { code: "mn", label: "Монгол" },
//   { code: "ru", label: "Русский" },
//   { code: "ja", label: "日本語" },
//   { code: "ko", label: "한국어" },
//   { code: "zh-CN", label: "中文" },
// ];

// export default function LanguageSwitcher() {
//   const [selectedLang, setSelectedLang] = useState("en");

//   useEffect(() => {
//     const addGoogleTranslateScript = () => {
//       if (document.getElementById("google-translate-script")) return;

//       const script = document.createElement("script");
//       script.id = "google-translate-script";
//       script.src =
//         "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//       script.async = true;
//       document.body.appendChild(script);
//     };

//     (window as any).googleTranslateElementInit = () => {
//       new (window as any).google.translate.TranslateElement(
//         {
//           pageLanguage: "en",
//           includedLanguages: LANGUAGES.map((l) => l.code).join(","),
//           layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
//           autoDisplay: false,
//         },
//         "google_translate_element"
//       );
//     };

//     addGoogleTranslateScript();
//     setTimeout(() => {
//       // Detect current language from cookie
//       const match = document.cookie.match(/googtrans=\/[a-z-]+\/([a-z-]+)/);
//       if (match?.[1]) setSelectedLang(match[1]);
//     }, 1000);
//   }, []);

//   const changeLang = (lang: string) => {
//     setSelectedLang(lang);

//     // Set cookie
//     const domain = window.location.hostname;
//     document.cookie = `googtrans=/en/${lang};path=/;domain=${domain}`;
//     document.cookie = `googtrans=/en/${lang};path=/`;

//     // Trigger translate
//     const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
//     if (select) {
//       select.value = lang;
//       select.dispatchEvent(new Event("change"));
//     }
//   };

//   return (
//     <div>
//       <Select value={selectedLang} onValueChange={changeLang}>
//         <SelectTrigger className="w-[200px]">
//           <SelectValue placeholder="Language" />
//         </SelectTrigger>
//         <SelectContent>
//           {LANGUAGES.map((lang) => (
//             <SelectItem key={lang.code} value={lang.code}>
//               {lang.label}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       {/* Hidden element for Google Translate */}
//       <div id="google_translate_element" />
//     </div>
//   );
// }

export default function HomePage() {
  return (
    <main className="p-8 text-black">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to my multilingual site
      </h1>
      <LanguageSelector />
    </main>
  );
}
