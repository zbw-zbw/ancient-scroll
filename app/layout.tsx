import type { Metadata } from "next";
import { Ma_Shan_Zheng, Noto_Serif_SC, Long_Cang } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
  title: "古籍焕新 - 交互式古籍阅读平台",
  description:
    '让千年文字"活"起来。双语阅读、异兽图鉴、诗境漫游、古今对话，开启一场跨越时空的文化之旅。',
  openGraph: {
    title: "古籍焕新 - 交互式古籍阅读平台",
    description:
      '让千年文字"活"起来。双语阅读、异兽图鉴、诗境漫游、古今对话。',
    type: "website",
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
      <body className="min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
