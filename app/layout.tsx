import type { Metadata } from "next";
import { Ma_Shan_Zheng, Noto_Serif_SC, Long_Cang } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import ToastProvider from "@/components/Toast";
import PageTransition from "@/components/PageTransition";
import ErrorBoundary from "@/components/ErrorBoundary";

const maShanZheng = Ma_Shan_Zheng({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ma-shan-zheng",
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  weight: ["400", "500", "600", "700"],
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

export const metadata: Metadata = {
  title: {
    default: "古籍焕新 - 交互式古籍阅读平台",
    template: "%s - 古籍焕新",
  },
  description:
    '让千年文字"活"起来。双语阅读、异兽图鉴、诗境漫游、古今对话，开启一场跨越时空的文化之旅。',
  openGraph: {
    title: "古籍焕新 - 交互式古籍阅读平台",
    description:
      '让千年文字"活"起来。双语阅读、异兽图鉴、诗境漫游、古今对话。',
    type: "website",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: { url: "/icon.png?v=4", type: "image/png" },
    shortcut: { url: "/favicon.ico?v=4", type: "image/x-icon" },
    apple: { url: "/icon.png?v=4", type: "image/png" },
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
          try {
            const theme = localStorage.getItem('theme');
            if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
            }
          } catch {}
        ` }} />
      </head>
      <body className="min-h-screen">
        <Navbar />
        <KeyboardShortcuts />
        <ToastProvider>
          <PageTransition>{children}</PageTransition>
        </ToastProvider>
      </body>
    </html>
  );
}
