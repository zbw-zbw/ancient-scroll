import type { MetadataRoute } from "next";

const BASE_URL = "https://scroll.kyriewen.cn";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/reading",
    "/bestiary",
    "/poetry",
    "/dialogue",
    "/quiz",
    "/about",
    "/notes",
    "/favorites",
    "/achievements",
    "/settings",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
