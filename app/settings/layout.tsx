import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "设置",
  description: "阅读偏好与数据管理",
  openGraph: {
    title: "设置",
    description: "阅读偏好与数据管理",
  },
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
