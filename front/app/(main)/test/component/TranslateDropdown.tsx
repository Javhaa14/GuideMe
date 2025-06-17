'use client';

import { useEffect, useState } from 'react';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'mn', label: 'Монгол' },
  { code: 'ru', label: 'Русский' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'zh-CN', label: '中文' },
];

// Cookie-оос googtrans-ийн утгыг авч хэлний код буцаана
function getInitialLangFromCookie(): string {
  const match = document.cookie.match(
    /(?:^|;\s*)googtrans=\/[a-z-]+\/([a-z-]+)/i
  );
  return match?.[1] || 'en';
}

export default function CustomGoogleTranslate() {
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    // Reload хийгдсэн дараа cookie-оос хэлний утгыг авах
    setLanguage(getInitialLangFromCookie());

    const addScript = () => {
      if (document.getElementById('google-translate-script')) return;

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,mn,ru,ja,ko,zh-CN',
          layout: (window as any).google.translate.TranslateElement.InlineLayout
            .SIMPLE,
        },
        'google_translate_element'
      );
    };

    addScript();
  }, []);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    const googTransValue = `/en/${lang}`;

    // Cookie бичих domain-оо зөв тохируулна уу.
    // Жишээ нь: ".yourdomain.com" гэх мэт
    document.cookie = `googtrans=${googTransValue};path=/;domain=${window.location.hostname};`;

    // 500ms хүлээгээд reload хийж болно, cookie бүрэн бичигдэхэд
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (
    <div
      translate="no"
      className="fixed top-4 right-4 bg-white shadow p-2 rounded z-50">
      <select
        value={language}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="border p-1 rounded">
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>

      <div id="google_translate_element" className="hidden" />
    </div>
  );
}
