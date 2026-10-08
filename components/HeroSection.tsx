"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HeroSectionData, SiteConfig } from "@/types/content";
import { Typewriter } from "./Typewriter";
import { 
  TrendingUp, 
  MapPin, 
  Users, 
  Trophy, 
  ArrowRight, 
  Play, 
  Sparkles,
  PhoneCall,
  CheckCircle2,
  X
} from "lucide-react";

interface HeroSectionProps {
  hero: HeroSectionData;
  config: SiteConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ hero, config }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const typewriterKeywords = [
    "High-ROAS Meta & Google Ads",
    "Automated WhatsApp CRM Funnels",
    "Jaipur Local SEO & Google Maps #1",
    "Studio Photoshoots & Viral Reels",
    "Generative AI Search Optimization (GEO)",
    "Custom Next.js Websites & Apps",
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "TrendingUp":
        return <TrendingUp className="w-5 h-5 text-[#FF5E00]" />;
      case "MapPin":
        return <MapPin className="w-5 h-5 text-[#D4FF00]" />;
      case "Users":
        return <Users className="w-5 h-5 text-[#00F0FF]" />;
      case "Trophy":
        return <Trophy className="w-5 h-5 text-[#FF1493]" />;
      default:
        return <TrendingUp className="w-5 h-5 text-[#FF5E00]" />;
    }
  };

  return (
    <section id="hero" className="relative pt-24 sm:pt-28 pb-16 bg-[#07070A] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="ocarina-watercolor-bloom absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#FF5E00]/20 via-[#FF1493]/15 to-[#00F0FF]/15 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tier: Clean Unobstructed Cinematic Visual matching Mockup */}
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] bg-[#0D0D14]">
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/11]">
            <Image
              src="/images/hero-bg.jpg"
              alt="Shrey Media - Digital Marketing & Technology Agency"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Soft bottom vignette to blend into text section */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07070A] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#07070A]/50 via-transparent to-transparent" />
          </div>
        </div>

        {/* Bottom Tier: Standalone Clean Headline, Typewriter, CTAs & Proof Bar */}
        <div className="mt-12 text-center max-w-4xl mx-auto relative z-10">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg mb-5">
            <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono-tech tracking-widest text-gray-200 uppercase font-semibold">
              {hero.eyebrow}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#FFAE33]" />
          </div>

          {/* Clean High-Impact Headline */}
          <h1 className="font-syne text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.08]">
            {hero.headlineMain}{" "}
            <span className="font-serif-luxury italic text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E00] via-[#FFAE33] to-[#FF7300] pr-2">
              {hero.headlineAccent}
            </span>{" "}
            {hero.headlineSuffix}
          </h1>

          {/* Dynamic Specializations Rotator */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm md:text-base font-space text-gray-300">
            <span>Specializing in:</span>
            <Typewriter
              words={typewriterKeywords}
              className="text-[#D4FF00] font-bold font-mono-tech bg-white/5 px-3 py-1 rounded-full border border-[#D4FF00]/40 backdrop-blur-md"
            />
          </div>

          {/* Subheadline Description */}
          <p className="mt-5 text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {hero.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={hero.primaryCtaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="clay-btn inline-flex items-center gap-2.5 bg-gradient-to-r from-[#FF5E00] via-[#FF8800] to-[#FFAE33] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-[0_10px_35px_rgba(255,94,0,0.5)] border border-white/20"
            >
              <PhoneCall className="w-4 h-4 fill-white" />
              <span>{hero.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => setVideoModalOpen(true)}
              className="inline-flex items-center gap-2.5 bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full backdrop-blur-xl transition-all duration-200 shadow-lg"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <Play className="w-3 h-3 fill-white ml-0.5" />
              </div>
              <span>{hero.secondaryCtaText}</span>
            </button>
          </div>
        </div>

        {/* 4-Column Minimal Proof Bar */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="clay-card p-4 sm:p-5 rounded-3xl border border-white/10 bg-[#0E0E14] shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {hero.proofMetrics.map((metric, idx) => (
                <div key={idx} className={`flex items-center gap-3.5 ${idx !== 0 ? "pt-3 sm:pt-0 sm:pl-6" : ""}`}>
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                    {getIcon(metric.icon)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-syne font-bold text-sm sm:text-base text-white">
                      {metric.label}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      {metric.sublabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal ("Watch Our Work") */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-[#121218] border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5E00]" />
                <span className="font-syne font-bold text-white text-base">Shrey Media &amp; Tech Showcase</span>
              </div>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-white bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black relative">
              <video
                src={hero.secondaryCtaVideoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 sm:p-6 bg-[#0E0E14] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4FF00]" />
                <span className="text-xs text-gray-300 font-mono-tech">
                  Studio Shoots • Performance Ads • Automation Workflows
                </span>
              </div>
              <a
                href={hero.primaryCtaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-btn bg-gradient-to-r from-[#FF5E00] to-[#FFAE33] text-white text-xs font-bold px-5 py-2 rounded-full"
              >
                Book Your Growth Call →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
