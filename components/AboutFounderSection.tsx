"use client";

import React from "react";
import Image from "next/image";
import { SiteConfig, AboutSectionData } from "@/types/content";
import { 
  Sparkles, 
  MapPin, 
  TrendingUp, 
  PhoneCall, 
  ArrowUpRight, 
  CheckCircle2,
  Building,
  Award
} from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

interface AboutFounderSectionProps {
  config: SiteConfig;
  about?: AboutSectionData;
}

export const AboutFounderSection: React.FC<AboutFounderSectionProps> = ({ config, about }) => {
  const industriesList = about?.industriesList && about.industriesList.length > 0
    ? about.industriesList
    : [
        "💎 Jewellery Brands",
        "👗 Clothing & Fashion",
        "✨ Cosmetics & Beauty",
        "🏋️ Gyms & Fitness",
        "🦷 Dentists & Dental Clinics",
        "🩺 Dermatologists & Skin Clinics",
        "🧠 Psychologists",
        "🥗 Dieticians & Nutritionists",
        "🏬 Local Jaipur Businesses",
        "🛍️ D2C & E-Commerce",
      ];

  const eyebrowText = about?.eyebrow || "About The Agency & Founder";
  const headlineText = about?.headline || "Scaling Jaipur Brands Through Performance & Technology";
  const bio1 = about?.bioParagraph1 || `Founded by ${config.founderName} in Jaipur, Shrey Media was established with a singular vision: to bridge the gap between creative storytelling, high-ROAS performance marketing, and software engineering.`;
  const bio2 = about?.bioParagraph2 || `Over the past ${config.experienceYears || "3+ years"}, we have partnered with ${config.clientsCount || "100+ businesses"} to build custom customer acquisition funnels, studio creative content, and automated CRM systems under one unified ecosystem.`;
  const expYears = about?.experienceYears || config.experienceYears || "3+ Years";
  const expLabel = about?.experienceLabel || "Proven Experience";
  const busScaled = about?.businessesScaled || config.clientsCount || "100+";
  const busLabel = about?.businessesLabel || "Businesses Scaled";
  const locBadge = about?.locationBadge || "Jaipur HQ";
  const locLabel = about?.locationLabel || "Film Colony Studio";
  const indHeader = about?.industriesHeader || "Industries & Niches We Specialize In";
  const ctaBtnText = about?.ctaText || `Talk With ${config.founderName.split(" ")[0] || "Shreyansh"}`;

  return (
    <section id="about" className="py-20 sm:py-28 relative bg-transparent overflow-hidden">
      {/* Ambient glowing washes */}
      <div className="ocarina-watercolor-bloom absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#FF5E00]/15 -z-10" />
      <div className="ocarina-watercolor-bloom absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#00F0FF]/15 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: High-Impact Founder Visual Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden clay-card border border-white/20 shadow-[0_25px_60px_-15px_rgba(255,94,0,0.3)] group">
              <Image
                src="/images/founder-card.jpg"
                alt={`${config.founderName} - Founder of Shrey Media`}
                fill
                quality={100}
                unoptimized={true}
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

              {/* Floating Verified Badge */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
                <span className="text-[11px] font-mono-tech text-gray-200 uppercase font-semibold">
                  Founder &amp; Head
                </span>
              </div>

              {/* Bottom Card Identity Details */}
              <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/15">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-syne font-extrabold text-lg text-white">
                      {config.founderName}
                    </h3>
                    <p className="text-[11px] font-mono-tech text-[#FFAE33]">
                      Founder • Shrey Media &amp; Shrey Tech
                    </p>
                  </div>

                  <a
                    href={config.socials.founderInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/10 hover:bg-[#FF1493] text-white transition-colors"
                    title="Follow on Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Narrative & Industries Served (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#FF5E00]/10 border border-[#FF5E00]/30 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5E00]" />
              <span className="text-xs font-mono-tech uppercase text-[#FFAE33] font-semibold">
                {eyebrowText}
              </span>
            </div>

            <h2 className="font-syne text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {headlineText}
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
              <p>{bio1}</p>
              <p>{bio2}</p>
            </div>

            {/* Credibility Key Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-2">
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                <span className="font-syne font-black text-xl text-[#FF5E00] block">{expYears}</span>
                <span className="text-[11px] font-mono-tech text-gray-400">{expLabel}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                <span className="font-syne font-black text-xl text-[#D4FF00] block">{busScaled}</span>
                <span className="text-[11px] font-mono-tech text-gray-400">{busLabel}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 col-span-2 sm:col-span-1">
                <span className="font-syne font-black text-xl text-[#00F0FF] block">{locBadge}</span>
                <span className="text-[11px] font-mono-tech text-gray-400">{locLabel}</span>
              </div>
            </div>

            {/* Industries Served Tag Cloud */}
            <div className="pt-3 border-t border-white/10">
              <h4 className="font-syne font-bold text-sm text-white uppercase tracking-wider mb-3">
                {indHeader}
              </h4>
              <div className="flex flex-wrap gap-2">
                {industriesList.map((ind) => (
                  <span
                    key={ind}
                    className="clay-badge px-3 py-1.5 rounded-full text-xs font-mono-tech text-gray-300 hover:text-white hover:border-[#FF5E00]/40 transition-colors"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/91${config.phone}?text=Hi%20Shreyansh,%20let's%20discuss%20growing%20my%20business.`}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-btn inline-flex items-center gap-2 bg-gradient-to-r from-[#FF5E00] to-[#FFAE33] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg"
              >
                <PhoneCall className="w-4 h-4 fill-white" />
                <span>{ctaBtnText} (+91 {config.phone})</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={config.socials.founderInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs sm:text-sm font-medium px-5 py-3 rounded-full transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-[#FFAE33]" />
                <span>@shrey_malpani_008i</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
