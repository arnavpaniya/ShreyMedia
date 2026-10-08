"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, PhoneCall } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { SiteConfig, OutroSectionData } from "@/types/content";

interface OutroLaserSectionProps {
  config: SiteConfig;
  outro?: OutroSectionData;
}

export const OutroLaserSection: React.FC<OutroLaserSectionProps> = ({ config, outro }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMouseOffset({ x, y });
  };

  const topTagline = outro?.topTagline || "JAIPUR'S PREMIER DIGITAL MARKETING & GROWTH NETWORK";
  const pipelineKeywords = outro?.pipelineKeywords && outro.pipelineKeywords.length > 0
    ? outro.pipelineKeywords
    : ["STRATEGY", "CONTENT", "ADS", "AUTOMATION", "SCALE"];
  const leftAnnotation = outro?.leftAnnotation || "Marketing brings the audience.\nSharper ideas.";
  const rightAnnotation = outro?.rightAnnotation || "Strategy, Ads & Content\nthat scale your brand into revenue.";
  const subLogoText = outro?.subLogoText || "MEDIA & TECH SOLUTIONS";
  const ctaBtnText = outro?.primaryCtaText || "Start Your Marketing Project";
  const igHandleText = outro?.instagramHandleText || "Follow @shrey_media_2025";

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative py-10 sm:py-14 bg-transparent overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Top Header Tagline */}
        <div className="inline-flex items-center gap-2 text-[11px] font-mono-tech uppercase tracking-widest text-gray-400 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E00]" />
          <span>{topTagline}</span>
        </div>

        {/* Marketing Growth Pipeline */}
        <div className="font-syne font-extrabold text-[11px] sm:text-sm tracking-widest text-white uppercase mb-4 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
          {pipelineKeywords.map((kw, idx) => (
            <React.Fragment key={idx}>
              <span className="hover:text-[#FFAE33] transition-colors">{kw}</span>
              {idx < pipelineKeywords.length - 1 && (
                <span className={idx % 2 === 0 ? "text-[#FF5E00]" : "text-[#D4FF00]"}>×</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Dynamic Centerpiece: Original Circuit-Line Art SHREY (NO BOX, FREELY FLOATING WITH 3D TILT & GLOW) */}
        <div className="relative my-4 max-w-4xl mx-auto">
          {/* Handwritten Left Callout */}
          <div className="absolute top-2 left-2 hidden md:block text-left select-none pointer-events-none z-20">
            <p className="font-hand text-base lg:text-lg text-[#FF5E00] leading-tight -rotate-6 whitespace-pre-line">
              {leftAnnotation}
            </p>
            <span className="text-[#FF5E00] text-xl ml-8">⤵</span>
          </div>

          {/* Handwritten Right Callout */}
          <div className="absolute top-2 right-2 hidden md:block text-right select-none pointer-events-none z-20">
            <p className="font-hand text-base lg:text-lg text-[#D4FF00] leading-tight rotate-6 whitespace-pre-line">
              {rightAnnotation}
            </p>
            <span className="text-[#D4FF00] text-xl mr-8">⤵</span>
          </div>

          {/* Glowing Radial Ambient Backlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[520px] h-[160px] bg-gradient-to-r from-[#FF5E00]/25 via-[#FFAE33]/20 to-[#00F0FF]/20 blur-3xl pointer-events-none -z-10" />

          {/* Original Stylized Circuit-Line Art SHREY Logo without any box */}
          <div
            className="transition-transform duration-300 ease-out select-none flex flex-col items-center justify-center py-2"
            style={{
              transform: `perspective(1000px) rotateX(${mouseOffset.y * -6}deg) rotateY(${mouseOffset.x * 6}deg)`,
            }}
          >
            <div className="relative w-full max-w-xl sm:max-w-2xl md:max-w-3xl aspect-[22/9]">
              <Image
                src="/images/shrey-circuit-logo.png"
                alt="SHREY Stylized Circuit Line Art"
                fill
                className="object-contain filter drop-shadow-[0_0_30px_rgba(255,94,0,0.45)]"
                priority
              />
            </div>
            <span className="font-mono-tech text-xs sm:text-sm text-[#FFAE33] tracking-[0.35em] uppercase font-bold mt-2 drop-shadow">
              {subLogoText}
            </span>
          </div>
        </div>

        {/* Compact CTA Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`https://wa.me/91${config.phone}?text=Hi%20Shreyansh,%20let's%20scale%20my%20business%20marketing.`}
            target="_blank"
            rel="noopener noreferrer"
            className="clay-btn inline-flex items-center gap-2 bg-gradient-to-r from-[#FF5E00] via-[#FF8800] to-[#FFAE33] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-[0_6px_25px_rgba(255,94,0,0.45)]"
          >
            <PhoneCall className="w-3.5 h-3.5 fill-white" />
            <span>{ctaBtnText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <a
            href={config.socials.shreyMediaInstagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-xs sm:text-sm px-5 py-2.5 rounded-full transition-colors"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-[#FF1493]" />
            <span>{igHandleText}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
