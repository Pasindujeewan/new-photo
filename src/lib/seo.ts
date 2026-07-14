import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";

const siteName = process.env.NEXT_PUBLIC_STUDIO_NAME || "Ceylon Frame Studio";

export function pageMetadata({
  title,
  description,
  path = "/",
  images = ["https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=82"],
  keywords = []
}: {
  title: string;
  description: string;
  path?: string;
  images?: string[];
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "website",
      images
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images
    }
  };
}
