"use client";

import { useEffect } from "react";

const languages = [
  { code: "", label: "Select Language" },
  { code: "en", label: "English" },
  { code: "mn", label: "Mongolian" },
  { code: "ru", label: "Russian" },
  { code: "ja", label: "Japanese" },
];

const LanguageSelector = () => {
  useEffect(() => {
    // Insert Google Translate script
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    if (!lang) return;

    const trySelect = () => {
      const iframe = document.querySelector<HTMLIFrameElement>(
        "iframe.goog-te-menu-frame"
      );
      const langSelector = document.querySelector<HTMLSelectElement>(
        "select.goog-te-combo"
      );
      if (langSelector) {
        langSelector.value = lang;
        langSelector.dispatchEvent(new Event("change"));
        clearInterval(interval);
      } else if (iframe) {
        const iframeDoc =
          iframe.contentDocument || iframe.contentWindow?.document;
        const items = iframeDoc?.querySelectorAll<HTMLSpanElement>(
          ".goog-te-menu2-item span.text"
        );
        items?.forEach((item) => {
          if (item.innerText.toLowerCase().includes(lang.toLowerCase())) {
            item.click();
            clearInterval(interval);
          }
        });
      }
    };

    const interval = setInterval(trySelect, 500);
    setTimeout(() => clearInterval(interval), 10000); // stop after 10s
  };

  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }} />
      <select onChange={handleLanguageChange} className="border p-2 rounded-md">
        {languages.map(({ code, label }) => (
          <option value={code} key={code}>
            {label}
          </option>
        ))}
      </select>
    </>
  );
};

export default LanguageSelector;
