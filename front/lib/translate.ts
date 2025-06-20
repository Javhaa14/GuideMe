// Google Translate API integration example
// You'll need to set up Google Cloud Translation API and get an API key

const GOOGLE_TRANSLATE_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY;

export interface TranslationRequest {
  text: string;
  targetLanguage: string;
  sourceLanguage?: string;
}

export const translateText = async (
  request: TranslationRequest
): Promise<string> => {
  if (!GOOGLE_TRANSLATE_API_KEY) {
    console.warn(
      "Google Translate API key not found. Using fallback translations."
    );
    return request.text; // Fallback to original text
  }

  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: request.text,
          target: request.targetLanguage,
          source: request.sourceLanguage || "en",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return request.text; // Fallback to original text
  }
};

// Language codes mapping
export const LANGUAGE_CODES = {
  en: "en",
  zh: "zh-CN",
  ja: "ja",
  es: "es",
  de: "de",
  ko: "ko",
  mn: "mn",
} as const;

// Example usage in your component:
/*
import { translateText, LANGUAGE_CODES } from '@/lib/translate';

const handleLanguageChange = async (newLanguage: string) => {
  const translatedText = await translateText({
    text: "Hello World",
    targetLanguage: LANGUAGE_CODES[newLanguage as keyof typeof LANGUAGE_CODES],
    sourceLanguage: LANGUAGE_CODES[language]
  });
  // Update your component state with translated text
};
*/
