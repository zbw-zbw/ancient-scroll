import type { Metadata, Viewport } from "next";
import { Ma_Shan_Zheng, Noto_Serif_SC, Long_Cang } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import ToastProvider from "@/components/Toast";
import PageTransition from "@/components/PageTransition";
import AchievementWatcher from "@/components/AchievementWatcher";
import NavbarVisibilityProvider from "@/components/NavbarVisibilityContext";
import BackToTop from "@/components/BackToTop";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import OfflineIndicator from "@/components/OfflineIndicator";

const maShanZheng = Ma_Shan_Zheng({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ma-shan-zheng",
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-noto-serif-sc",
  display: "swap",
});

const longCang = Long_Cang({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-long-cang",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://scroll.kyriewen.cn"),
  alternates: { canonical: "/" },
  title: {
    default: "古籍焕新 — AI 驱动的古籍交互阅读平台",
    template: "%s — 古籍焕新",
  },
  description:
    '让千年文字"活"起来。AI逐句翻译山海经18篇，92只异兽图鉴，27首古诗沉浸体验，15位历史人物穿越对话。',
  openGraph: {
    title: "古籍焕新 — AI 驱动的古籍交互阅读平台",
    description:
      '让千年文字"活"起来。AI逐句翻译山海经18篇，92只异兽图鉴，27首古诗沉浸体验，15位历史人物穿越对话。',
    type: "website",
    url: "https://scroll.kyriewen.cn",
  },
  icons: {
    icon: { url: "/icon.png?v=4", type: "image/png" },
    shortcut: { url: "/favicon.ico?v=4", type: "image/x-icon" },
    apple: { url: "/icons/icon-192.png", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${maShanZheng.variable} ${notoSerifSC.variable} ${longCang.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          document.documentElement.classList.add('js');
          try {
            const theme = localStorage.getItem('theme');
            if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
            }
          } catch {}
        ` }} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="古籍焕新" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="min-h-dvh">
        <OfflineIndicator />
        <NavbarVisibilityProvider>
        <Navbar />
        <KeyboardShortcuts />
        <ToastProvider>
          <AchievementWatcher />
          <PageTransition>{children}</PageTransition>
          <BackToTop />
        </ToastProvider>
        </NavbarVisibilityProvider>
        <ServiceWorkerRegister />
        <Analytics />
      </body>
    </html>
  );
}
