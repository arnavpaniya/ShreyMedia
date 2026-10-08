import type { Metadata, Viewport } from "next";
import {
  Syne,
  Bricolage_Grotesque,
  Instrument_Serif,
  Space_Grotesk,
  Space_Mono,
  DM_Mono,
  Caveat,
  Plus_Jakarta_Sans,
  Bebas_Neue,
  Anton,
  Russo_One,
  Unbounded,
} from "next/font/google";
import "./globals.css";
import { initialSiteData } from "@/lib/data/initial-content";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const russoOne = Russo_One({
  variable: "--font-russo-one",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0E",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://shreymedia.in"),
  title: initialSiteData.config.seo.suggestedTitle,
  description: initialSiteData.config.seo.suggestedMetaDescription,
  keywords: initialSiteData.config.seo.secondaryKeywords,
  authors: [{ name: initialSiteData.config.founderName, url: initialSiteData.config.socials.founderInstagram }],
  openGraph: {
    title: initialSiteData.config.seo.suggestedTitle,
    description: initialSiteData.config.seo.suggestedMetaDescription,
    url: "https://shreymedia.in",
    siteName: "Shrey Media",
    images: [
      {
        url: "/images/hero-founder.jpg",
        width: 1200,
        height: 630,
        alt: "Shrey Media - Digital Marketing & Technology Agency in Jaipur",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: initialSiteData.config.seo.suggestedTitle,
    description: initialSiteData.config.seo.suggestedMetaDescription,
    images: ["/images/hero-founder.jpg"],
  },
  icons: {
    icon: [
      { url: "/brand/logo.png", type: "image/png" },
    ],
    shortcut: "/brand/logo.png",
    apple: [
      { url: "/brand/logo.png", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "https://shreymedia.in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "IN-RJ",
    "geo.placename": "Jaipur",
    "geo.position": "26.9188;75.8176",
    "ICBM": "26.9188, 75.8176",
  },
};

import { StructuredData } from "@/components/StructuredData";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontVariables = [
    syne.variable,
    bricolage.variable,
    instrumentSerif.variable,
    spaceGrotesk.variable,
    spaceMono.variable,
    dmMono.variable,
    caveat.variable,
    plusJakartaSans.variable,
    bebasNeue.variable,
    anton.variable,
    russoOne.variable,
    unbounded.variable,
  ].join(" ");

  return (
    <html lang="en" className={`dark ${fontVariables} scroll-smooth`}>
      <head>
        <StructuredData config={initialSiteData.config} />
      </head>
      <body className="bg-[#0A0A0E] text-[#F3F4F6] font-sans antialiased selection:bg-[#FF5E00] selection:text-white min-h-screen flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
