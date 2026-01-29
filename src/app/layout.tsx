import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import EmotionCacheProvider from "@/lib/emotion-cache";
import type { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
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
