"use client";

import { useEffect, useState } from "react";

export const GoogleTranslate = () => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const scriptId = "google-translate-script";

    // Check if script already exists
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;

    // Initialize Google Translate
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,mn,ru,ja,ko,zh-CN",
          layout: (window as any).google.translate.TranslateElement.InlineLayout
            .SIMPLE,
        },
        "google_translate_element"
      );
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup function
      const scriptElement = document.getElementById(scriptId);
      if (scriptElement && scriptElement.parentNode) {
        try {
          document.body.removeChild(scriptElement);
        } catch (err) {
          console.warn("Error removing script:", err);
        }
      }
      delete (window as any).googleTranslateElementInit;
    };
  }, []);

  return null;
};
