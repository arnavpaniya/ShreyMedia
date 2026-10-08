"use client";

import React, { useState, useEffect } from "react";
import { ServiceItem, SiteConfig } from "@/types/content";
import { 
  Search, 
  Target, 
  TrendingUp, 
  Bot, 
  Share2, 
  Camera, 
  MessageSquare, 
  Compass, 
  Globe, 
  Smartphone, 
  Database, 
  Code, 
  Cpu, 
  Layers,
  ArrowRight,
  Sparkles,
  Zap,
  Flame,
  ChevronRight
} from "lucide-react";

interface ServicesShowcaseProps {
  marketingServices: ServiceItem[];
  techServices: ServiceItem[];
  activeDivision: "marketing" | "tech";
  config: SiteConfig;
}

export const ServicesShowcase: React.FC<ServicesShowcaseProps> = ({
  marketingServices,
  techServices,
  activeDivision,
  config,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<"marketing" | "tech">(activeDivision);

  useEffect(() => {
    setSelectedCategory(activeDivision);
  }, [activeDivision]);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Search": return <Search className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "Target": return <Target className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "TrendingUp": return <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "Bot": return <Bot className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "Share2": return <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "Camera": return <Camera className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "MessageSquare": return <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "Compass": return <Compass className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "Globe": return <Globe className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "Smartphone": return <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "Database": return <Database className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "Code": return <Code className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "Cpu": return <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "Layers": return <Layers className="w-4 h-4 sm:w-5 sm:h-5" />;
      default: return <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  const currentServices = selectedCategory === "marketing" ? marketingServices : techServices;
  const isMarketing = selectedCategory === "marketing";

  return (
    <section id="services" className="py-12 sm:py-20 relative bg-transparent overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-gradient-to-b from-[#FF5E00]/10 via-[#FFAE33]/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Header & Category Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FF5E00]/10 border border-[#FF5E00]/30 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3 h-3 text-[#FFAE33]" />
              <span className="text-[11px] font-mono-tech uppercase text-[#FFAE33] font-semibold tracking-wider">
                Services &amp; Solutions
              </span>
            </div>
            <h2 className="font-syne text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {isMarketing ? "Performance Marketing" : "Custom Tech & Automation"}
            </h2>
          </div>

          {/* Clean 2-Pill Segmented Switcher */}
          <div className="inline-flex items-center p-1 rounded-xl bg-black/60 border border-white/15 backdrop-blur-xl shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setSelectedCategory("marketing")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                isMarketing
                  ? "bg-gradient-to-r from-[#FF5E00] to-[#FFAE33] text-white shadow-[0_2px_12px_rgba(255,94,0,0.4)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Marketing ({marketingServices.length})</span>
            </button>

            <button
              onClick={() => setSelectedCategory("tech")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                !isMarketing
                  ? "bg-gradient-to-r from-[#00F0FF] to-[#3B82F6] text-black font-extrabold shadow-[0_2px_12px_rgba(0,240,255,0.4)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Shrey Tech ({techServices.length})</span>
            </button>
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex items-center justify-between sm:hidden text-[11px] font-mono-tech text-gray-400 mb-3 px-1">
          <span>Swipe to explore services</span>
          <span className="text-[#FFAE33] flex items-center">
            {currentServices.length} options <ChevronRight className="w-3 h-3 ml-0.5" />
          </span>
        </div>

        {/* Responsive Grid: Horizontal Snap Carousel on Mobile, Clean Bento Grid on Desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-4 sm:pb-0 no-scrollbar">
          {currentServices.map((service, index) => {
            const isMarketingService = service.division === "marketing";
            const waText = encodeURIComponent(
              `Hi Shreyansh, I'd like to inquire about your ${service.title} service for my business in Jaipur.`
            );

            return (
              <div
                key={service.id || index}
                className="w-[82vw] max-w-[290px] sm:w-auto shrink-0 snap-center rounded-2xl p-4 sm:p-5 bg-[#0C0C12]/90 border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-lg group relative overflow-hidden backdrop-blur-md"
              >
                {/* Subtle top edge accent */}
                <div 
                  className={`absolute top-0 inset-x-0 h-[2px] opacity-50 group-hover:opacity-100 transition-opacity duration-300 ${
                    isMarketingService
                      ? "bg-gradient-to-r from-transparent via-[#FF5E00] to-transparent"
                      : "bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent"
                  }`}
                />

                <div>
                  {/* Top: Icon + Badge */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div 
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-105 ${
                        isMarketingService
                          ? "bg-gradient-to-br from-[#FF5E00] to-[#FFAE33] shadow-[0_2px_10px_rgba(255,94,0,0.35)]"
                          : "bg-gradient-to-br from-[#00F0FF] to-[#0077B6] text-black shadow-[0_2px_10px_rgba(0,240,255,0.3)]"
                      }`}
                    >
                      {getServiceIcon(service.icon)}
                    </div>

                    {service.badge && (
                      <span className="font-mono-tech text-[9px] sm:text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-gray-300">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-syne font-bold text-base sm:text-lg text-white mb-1.5 group-hover:text-[#FFAE33] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  {/* Crisp 1-line Description */}
                  <p className="text-xs text-gray-400 leading-relaxed mb-3.5 line-clamp-2">
                    {service.shortDesc}
                  </p>

                  {/* Compact Feature Pills (Max 2 tags to prevent vertical bloat) */}
                  <div className="flex flex-wrap gap-1.5">
                    {service.features.slice(0, 2).map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono-tech text-gray-300 bg-white/[0.04] border border-white/10 px-2 py-0.5 rounded-md truncate max-w-full"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
