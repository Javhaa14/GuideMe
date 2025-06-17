import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { Providers } from './providers';
import Script from 'next/script';

export const metadata = {
  title: 'GuideMe',
  description: 'GuideMe official website',
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white w-screen h-screen`}
        style={{ cursor: 'auto' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
