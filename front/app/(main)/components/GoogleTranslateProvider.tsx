"use client";

import { useEffect } from "react";

export function GoogleTranslateProvider() {
  useEffect(() => {
    // Only run on client-side
    if (typeof window === "undefined") return;

    const scriptId = "google-translate-script";

    // Check if already initialized
    if (window.google?.translate?.TranslateElement) return;
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;

    // Initialize Google Translate
    (window as any).googleTranslateElementInit = () => {
      try {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,mn,ru,ja,ko,zh-CN",
            layout: (window as any).google.translate.TranslateElement
              .InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      } catch (err) {
        console.error("Google Translate initialization failed:", err);
      }
    };

    // Add to document
    document.body.appendChild(script);

    return () => {
      // Alternative cleanup that never throws errors
      const scriptElement = document.getElementById(scriptId);
      if (scriptElement) {
        setTimeout(() => {
          try {
            if (scriptElement.parentNode) {
              scriptElement.parentNode.removeChild(scriptElement);
            }
          } catch (err) {
            console.warn("Script removal failed (non-critical):", err);
          }
        }, 100);
      }
      try {
        delete (window as any).googleTranslateElementInit;
      } catch (err) {
        console.warn("Cleanup of googleTranslateElementInit failed:", err);
      }
    };
  }, []);

  return null;
}
