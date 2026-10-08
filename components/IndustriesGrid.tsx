"use client";

import React, { useState } from "react";
import { IndustryItem, SiteConfig } from "@/types/content";
import { 
  Gem, 
  Shirt, 
  Sparkles, 
  HeartPulse, 
  Dumbbell, 
  Wand2, 
  Brain, 
  Salad, 
  Store, 
  ShoppingBag,
  ArrowRight
} from "lucide-react";

interface IndustriesGridProps {
  industries: IndustryItem[];
  config: SiteConfig;
}

export const IndustriesGrid: React.FC<IndustriesGridProps> = ({ industries, config }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case "Gem": return <Gem className="w-6 h-6 text-[#FFAE33]" />;
      case "Shirt": return <Shirt className="w-6 h-6 text-[#FF1493]" />;
      case "Sparkles": return <Sparkles className="w-6 h-6 text-[#00F0FF]" />;
      case "HeartPulse": return <HeartPulse className="w-6 h-6 text-[#10B981]" />;
      case "Dumbbell": return <Dumbbell className="w-6 h-6 text-[#D4FF00]" />;
      case "Wand2": return <Wand2 className="w-6 h-6 text-[#EC4899]" />;
      case "Brain": return <Brain className="w-6 h-6 text-[#8B5CF6]" />;
      case "Salad": return <Salad className="w-6 h-6 text-[#84CC16]" />;
      case "Store": return <Store className="w-6 h-6 text-[#3B82F6]" />;
      case "ShoppingBag": return <ShoppingBag className="w-6 h-6 text-[#F97316]" />;
      default: return <Sparkles className="w-6 h-6 text-[#FF5E00]" />;
    }
  };

  return (
    <section id="industries" className="py-20 relative bg-[#09090D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FFAE33]" />
            <span className="text-xs font-mono-tech uppercase text-gray-300">
              Targeted Industry Playbooks
            </span>
          </div>
          <h2 className="font-syne text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Tailored Growth For Your Industry
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400">
            Every market operates differently. Here is how we craft custom acquisition strategies across Jaipur&apos;s leading business sectors.
          </p>
        </div>

        {/* Industries 10-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {industries.map((ind) => {
            const isHovered = selectedIndustry === ind.id;
            const waText = encodeURIComponent(
              `Hi Shrey Media, I run a ${ind.name} business in Jaipur and want to scale with your team.`
            );

            return (
              <div
                key={ind.id}
                onMouseEnter={() => setSelectedIndustry(ind.id)}
                onMouseLeave={() => setSelectedIndustry(null)}
                className={`clay-card p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group ${
                  ind.featured
                    ? "border-amber-500/20 bg-gradient-to-b from-[#181410] to-[#121218]"
                    : "border-white/5 hover:border-white/20"
                }`}
              >
                <div>
                  {/* Icon & Tagline */}
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {getIndustryIcon(ind.icon)}
                  </div>

                  <h3 className="font-syne font-bold text-lg text-white mb-1 group-hover:text-[#FFAE33] transition-colors">
                    {ind.name}
                  </h3>
                  <span className="text-[11px] font-mono-tech text-[#D4FF00] block mb-3">
                    {ind.tagline}
                  </span>

                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    {ind.description}
                  </p>
                </div>

                {/* Growth Formula Pill */}
                <div className="mt-auto border-t border-white/5 pt-3">
                  <div className="text-[10px] font-mono-tech text-gray-400 mb-2">
                    <span className="text-[#FF5E00] font-bold">Growth Formula: </span>
                    {ind.growthAngle}
                  </div>

                  <a
                    href={`https://wa.me/91${config.phone}?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-[#FFAE33] transition-colors mt-1"
                  >
                    <span>Scale My Brand</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
