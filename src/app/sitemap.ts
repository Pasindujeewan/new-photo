import type { MetadataRoute } from "next";
import { albums } from "@/data/albums";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const staticRoutes = ["", "/albums", "/services", "/about", "/contact", "/privacy", "/terms"];
  return [
    ...staticRoutes.map((route) => ({ url: `${siteUrl}${route}`, lastModified: new Date() })),
    ...albums.map((album) => ({ url: `${siteUrl}/albums/${album.slug}`, lastModified: new Date(album.year) }))
  ];
}
