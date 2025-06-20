"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { Button } from "@/components/ui/button";

// Example component showing how to use translations throughout the website
export const TranslationExample = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-4">
        {t("welcome")} - {t("language")}: {language.toUpperCase()}
      </h2>

      <div className="space-y-4 text-white">
        <p>
          <strong>{t("search")}:</strong> {t("discover")}
        </p>
        <p>
          <strong>{t("profile")}:</strong> {t("personalInfo")}
        </p>
        <p>
          <strong>{t("booking")}:</strong> {t("price")} - {t("duration")}
        </p>
        <p>
          <strong>{t("reviews")}:</strong> {t("rating")} - {t("writeReview")}
        </p>
      </div>

      <div className="mt-6 space-y-2">
        <Button
          onClick={() => setLanguage("en")}
          className="mr-2"
          variant={language === "en" ? "default" : "outline"}>
          🇺🇸 English
        </Button>
        <Button
          onClick={() => setLanguage("zh")}
          className="mr-2"
          variant={language === "zh" ? "default" : "outline"}>
          🇨🇳 中文
        </Button>
        <Button
          onClick={() => setLanguage("ja")}
          className="mr-2"
          variant={language === "ja" ? "default" : "outline"}>
          🇯🇵 日本語
        </Button>
        <Button
          onClick={() => setLanguage("es")}
          className="mr-2"
          variant={language === "es" ? "default" : "outline"}>
          🇪🇸 Español
        </Button>
        <Button
          onClick={() => setLanguage("de")}
          className="mr-2"
          variant={language === "de" ? "default" : "outline"}>
          🇩🇪 Deutsch
        </Button>
        <Button
          onClick={() => setLanguage("ko")}
          className="mr-2"
          variant={language === "ko" ? "default" : "outline"}>
          🇰🇷 한국어
        </Button>
        <Button
          onClick={() => setLanguage("mn")}
          className="mr-2"
          variant={language === "mn" ? "default" : "outline"}>
          🇲🇳 Монгол
        </Button>
      </div>
    </div>
  );
};
