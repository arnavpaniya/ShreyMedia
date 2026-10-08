"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.14]);

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
    <section id="hero" ref={heroRef} className="relative w-full bg-[#07070A] overflow-hidden">
      {/* 1. Full Canvas Edge-to-Edge Hero Stage (100vw Full Bleed) with Parallax */}
      <div className="relative w-full h-[75vh] sm:h-[88vh] lg:h-[95vh] min-h-[550px] overflow-hidden">
        {/* Full Canvas Background Image - Full HD Uncompressed with Parallax Motion */}
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          <Image
            src="/images/hero-bg.jpg"
            alt="Shrey Media - Digital Marketing & Technology Agency in Jaipur"
            fill
            priority
            quality={100}
            unoptimized={true}
            sizes="100vw"
            className="object-cover object-top sm:object-center"
          />
        </motion.div>

        {/* Top Navbar Shadow Fade */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#07070A]/90 via-[#07070A]/40 to-transparent pointer-events-none" />

        {/* Bottom Smooth Feather Gradient into Content */}
        <div className="absolute inset-x-0 bottom-0 h-44 sm:h-56 bg-gradient-to-t from-[#07070A] via-[#07070A]/80 to-transparent pointer-events-none" />
        
        {/* Ambient Ocarina Glows */}
        <div className="ocarina-watercolor-bloom absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[#FF5E00]/25 via-[#FF1493]/20 to-[#00F0FF]/20 -z-10" />
      </div>

      {/* 2. Standalone Editorial Content Section directly following the Canvas */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-28 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 bg-black/70 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-md shadow-2xl mb-6">
            <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono-tech tracking-widest text-gray-200 uppercase font-semibold">
              {hero.eyebrow}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#FFAE33]" />
          </div>

          {/* High-Impact Main Display Headline */}
          <h1 className="font-syne text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.12] sm:leading-[1.1] drop-shadow-2xl overflow-visible">
            {hero.headlineMain}{" "}
            <span className="font-serif-luxury italic text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E00] via-[#FFAE33] to-[#FF7300] inline-block py-2 px-2 overflow-visible leading-none">
              {hero.headlineAccent}
            </span>{" "}
            {hero.headlineSuffix}
          </h1>

          {/* Dynamic Specializations Rotator */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm md:text-base font-space text-gray-300">
            <span>Specializing in:</span>
            <Typewriter
              words={typewriterKeywords}
              className="text-[#D4FF00] font-bold font-mono-tech bg-white/5 px-3.5 py-1 rounded-full border border-[#D4FF00]/40 backdrop-blur-md"
            />
          </div>

          {/* Subheadline Description */}
          <p className="mt-5 text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed drop-shadow">
            {hero.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={hero.primaryCtaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="clay-btn inline-flex items-center gap-2.5 bg-gradient-to-r from-[#FF5E00] via-[#FF8800] to-[#FFAE33] text-white font-bold text-sm sm:text-base px-8 py-4 rounded-full shadow-[0_10px_35px_rgba(255,94,0,0.5)] border border-white/20"
            >
              <PhoneCall className="w-4 h-4 fill-white" />
              <span>{hero.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => setVideoModalOpen(false || true)}
              className="inline-flex items-center gap-2.5 bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-white font-semibold text-sm sm:text-base px-6 py-4 rounded-full backdrop-blur-xl transition-all duration-200 shadow-xl"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <Play className="w-3 h-3 fill-white ml-0.5" />
              </div>
              <span>{hero.secondaryCtaText}</span>
            </button>
          </div>
        </div>

        {/* 4-Column Minimal Proof Bar */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="clay-card p-5 sm:p-6 rounded-3xl border border-white/15 bg-[#0E0E14]/90 backdrop-blur-xl shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {hero.proofMetrics.map((metric, idx) => (
                <div key={idx} className={`flex items-center gap-3.5 ${idx !== 0 ? "pt-3 sm:pt-0 sm:pl-6" : ""}`}>
                  <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                    {getIcon(metric.icon)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-syne font-bold text-sm sm:text-base text-white">
                      {metric.label}
                    </span>
                    <span className="text-xs text-gray-400">
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
