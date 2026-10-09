"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { HeroSectionData, SiteConfig } from "@/types/content";
import { Typewriter } from "./Typewriter";
import { 
  TrendingUp, 
  MapPin, 
  Users, 
  Trophy, 
  ArrowRight, 
  Play, 
  PhoneCall, 
  CheckCircle2, 
  X 
} from "lucide-react";

interface HeroSectionProps {
  hero: HeroSectionData;
  config?: SiteConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ hero }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const disableParallax = isMobile || shouldReduceMotion;

  // Parallax Scroll Tracking with Spring Smoothing (Active on Desktop, disabled on Mobile or if prefers-reduced-motion)
  const { scrollY } = useScroll();
  const rawImageY = useTransform(scrollY, [0, 900], disableParallax ? [0, 0] : [0, 240]);
  const imageY = useSpring(rawImageY, { stiffness: 350, damping: 60 });
  const imageScale = useTransform(scrollY, [0, 900], disableParallax ? [1, 1] : [1.02, 1.18]);
  const glowY = useTransform(scrollY, [0, 900], disableParallax ? [0, 0] : [0, 120]);

  const typewriterKeywords = hero.typewriterKeywords && hero.typewriterKeywords.length > 0 
    ? hero.typewriterKeywords 
    : [
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
      {/* 1. Full Canvas Edge-to-Edge Hero Stage with Separate Desktop/Mobile Artwork Crops */}
      <div className="relative w-full h-[65vh] min-[360px]:h-[72vh] sm:h-[88vh] lg:h-[95vh] min-h-[460px] sm:min-h-[550px] overflow-hidden">
        {/* Full Canvas Background Image - Separate crops for mobile (portrait) and desktop (panoramic) */}
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0 w-full h-[120%] sm:h-[135%] -top-[10%] sm:-top-[15%] will-change-transform"
        >
          {/* Mobile Portrait Crop */}
          <div className="relative w-full h-full block sm:hidden">
            <Image
              src="/images/hero-mobile.jpg"
              alt="Shrey Media - Digital Marketing & Technology Agency in Jaipur"
              fill
              priority
              quality={100}
              unoptimized={true}
              sizes="100vw"
              className="object-cover object-top min-[360px]:object-center select-none"
            />
          </div>

          {/* Desktop Panoramic Landscape Crop */}
          <div className="relative w-full h-full hidden sm:block">
            <Image
              src="/images/hero-bg.jpg"
              alt="Shrey Media - Digital Marketing & Technology Agency in Jaipur"
              fill
              priority
              quality={100}
              unoptimized={true}
              sizes="100vw"
              className="object-cover object-center select-none"
            />
          </div>
        </motion.div>

        {/* Top Navbar Shadow Fade */}
        <div className="absolute inset-x-0 top-0 h-28 sm:h-32 bg-gradient-to-b from-[#07070A]/90 via-[#07070A]/40 to-transparent pointer-events-none z-10" />

        {/* Bottom Smooth Feather Gradient into Content */}
        <div className="absolute inset-x-0 bottom-0 h-40 sm:h-64 bg-gradient-to-t from-[#07070A] via-[#07070A]/85 to-transparent pointer-events-none z-10" />
        
        {/* Ambient Ocarina Glows with Reduced Motion on Mobile */}
        <motion.div 
          style={{ y: glowY }}
          className="ocarina-watercolor-bloom absolute top-1/3 left-1/2 -translate-x-1/2 w-[90vw] max-w-[800px] h-[350px] sm:h-[500px] bg-gradient-to-r from-[#FF5E00]/20 via-[#FF1493]/15 to-[#00F0FF]/15 -z-10"
        />
      </div>

      {/* 2. Standalone Editorial Content Section directly following the Canvas */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 min-[360px]:-mt-20 sm:-mt-28 pb-16 sm:pb-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* High-Impact Main Display Headline */}
          <h1 className="font-syne text-3xl min-[360px]:text-4xl min-[410px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.15] sm:leading-[1.1] drop-shadow-2xl break-words overflow-visible">
            {hero.headlineMain}{" "}
            <span className="font-serif-luxury italic text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E00] via-[#FFAE33] to-[#FF7300] inline-block py-1 sm:py-2 px-1 sm:px-2 max-w-full break-words leading-none">
              {hero.headlineAccent}
            </span>{" "}
            {hero.headlineSuffix}
          </h1>

          {/* Floating Aesthetic Stickers */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 flex-wrap select-none">
            <span className="bg-[#FFF5E4] text-black px-3 py-1 rounded-full font-hand font-bold text-[11px] sm:text-xs shadow-lg rotate-[-2deg] sm:rotate-[-3deg] border border-black/10 flex items-center gap-1.5 hover:rotate-0 transition-transform cursor-default">
              <span>⭐</span> Top-Rated Jaipur Agency
            </span>
            <span className="bg-gradient-to-r from-[#FF5E00] to-[#FFAE33] text-white px-3 py-1 rounded-full font-mono-tech font-bold text-[9px] sm:text-[10px] uppercase shadow-lg rotate-[2deg] sm:rotate-[3deg] border border-white/20 flex items-center gap-1.5 hover:rotate-0 transition-transform cursor-default">
              <span>🔥</span> 100+ Brands Scaled
            </span>
            <span className="bg-[#00F0FF]/20 text-[#00F0FF] backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full font-mono-tech text-[9px] sm:text-[10px] uppercase font-bold border border-[#00F0FF]/40 rotate-[-1deg] sm:rotate-[-2deg] hover:rotate-0 transition-transform cursor-default">
              ⚡ Ads × Production × Tech
            </span>
          </div>

          {/* Dynamic Specializations Rotator */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-space text-gray-300">
            <span>Specializing in:</span>
            <Typewriter
              words={typewriterKeywords}
              className="text-[#D4FF00] font-bold font-mono-tech bg-white/5 px-3 sm:px-3.5 py-1 rounded-full border border-[#D4FF00]/40 backdrop-blur-md max-w-full text-center"
            />
          </div>

          {/* Subheadline Description */}
          <p className="mt-4 sm:mt-5 text-xs sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed drop-shadow px-1">
            {hero.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <a
              href={hero.primaryCtaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="clay-btn min-h-[48px] inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#FF5E00] via-[#FF8800] to-[#FFAE33] text-white font-bold text-xs sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-[0_10px_35px_rgba(255,94,0,0.5)] border border-white/20 active:scale-98 transition-transform"
            >
              <PhoneCall className="w-4 h-4 fill-white shrink-0" />
              <span>{hero.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>

            <button
              onClick={() => setVideoModalOpen(true)}
              className="min-h-[48px] inline-flex items-center justify-center gap-2.5 bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-white font-semibold text-xs sm:text-base px-6 py-3.5 sm:py-4 rounded-full backdrop-blur-xl transition-all duration-200 shadow-xl active:scale-98"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Play className="w-3 h-3 fill-white ml-0.5" />
              </div>
              <span>{hero.secondaryCtaText}</span>
            </button>
          </div>
        </div>

        {/* 4-Column Minimal Proof Bar */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
          <div className="clay-card p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/15 bg-[#0E0E14]/90 backdrop-blur-xl shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {hero.proofMetrics.map((metric, idx) => (
                <div key={idx} className={`flex items-center gap-2.5 sm:gap-3.5 ${idx !== 0 ? "pt-2.5 sm:pt-0 sm:pl-6" : ""}`}>
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                    {getIcon(metric.icon)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-syne font-bold text-xs sm:text-base text-white truncate">
                      {metric.label}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-400 truncate">
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
