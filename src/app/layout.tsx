import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import EmotionCacheProvider from "@/lib/emotion-cache";
import type { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <EmotionCacheProvider>
          <Header />
          {children}
          <Footer />
        </EmotionCacheProvider>
      </body>
    </html>
  );
}
