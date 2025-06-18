"use client";
import Script from "next/script";
import { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.googleTranslateElementInit = function () {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,mn,ru,ja,ko,zh-CN",
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      };
    }
  }, []);

  return (
    <>
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
      <Script id="google-translate-init" strategy="beforeInteractive">
        {`
              window.googleTranslateElementInit = function () {
              new google.translate.TranslateElement(
                {
                  pageLanguage: 'en',
                  includedLanguages: 'en,mn,ru,ja,ko,zh-CN',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                },
                  'google_translate_element'
              );
            };
        `}
      </Script>
    </>
  );
}
