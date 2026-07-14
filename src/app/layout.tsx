import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { absoluteUrl, cn } from "@/lib/utils";

const serif = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", weight: ["500", "600", "700"], display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "Ceylon Frame Studio | Editorial Photography", template: "%s | Ceylon Frame Studio" },
  description: "Premium photography studio for weddings, portraits, events, fashion, product, and commercial campaigns.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }]
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn(serif.variable, sans.variable)}>
      <body className="font-sans">
        <ToastProvider>
          <JsonLd data={{
            "@context": "https://schema.org",
            "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
            name: "Ceylon Frame Studio",
            url: absoluteUrl("/"),
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=82",
            address: { "@type": "PostalAddress", addressLocality: "Colombo", addressCountry: "LK" }
          }} />
          <Navbar />
          {children}
          <Footer />
          <BackToTop />
        </ToastProvider>
      </body>
    </html>
  );
}
