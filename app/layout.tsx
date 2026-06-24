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
  title: "古籍焕新 - AI 驱动的古籍交互阅读平台",
  description:
    '让千年文字"活"起来。AI 双语阅读、异兽图鉴、诗境漫游、古今对话，以 TRAE 之力焕古籍之新。',
  openGraph: {
    title: "古籍焕新 - AI 驱动的古籍交互阅读平台",
    description:
      '让千年文字"活"起来。AI 双语阅读、异兽图鉴、诗境漫游、古今对话。',
    type: "website",
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
