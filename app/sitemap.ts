import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/reading",
    "/bestiary",
    "/poetry",
    "/dialogue",
    "/notes",
    "/favorites",
    "/achievements",
    "/settings",
  ];

  return routes.map((route) => ({
    url: route || "/",
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
