"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, Film, Video, Scissors, Sparkles, Play, ArrowUpRight } from "lucide-react";

export const ProductionShowcase: React.FC = () => {
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);

  const creativeReels = [
    {
      id: 1,
      title: "Handcrafted Bridal Jewellery Macro Showcase",
      niche: "Luxury Jewellery",
      duration: "0:24",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80",
      stats: "320K Views • 14x Roas",
    },
    {
      id: 2,
      title: "Autumn Streetwear & Ethnic Fusion Collection",
      niche: "Fashion & Apparel",
      duration: "0:18",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
      stats: "540K Reach • Viral Reel",
    },
    {
      id: 3,
      title: "Aesthetic Dental Smile Makeover Procedure",
      niche: "Healthcare & Clinic",
      duration: "0:30",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=80",
      stats: "85 Consultations Booked",
    },
    {
      id: 4,
      title: "Botanical Skincare & Glow Serum Product Reel",
      niche: "Cosmetics & Beauty",
      duration: "0:15",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80",
      stats: "1,200+ Units Sold",
    },
    {
      id: 5,
      title: "High-Energy Fitness Transformation & Facility Tour",
      niche: "Gym & Fitness",
      duration: "0:22",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80",
      stats: "140 Free Trials Claimed",
    },
  ];

  return (
    <section id="production" className="py-20 relative bg-[#07070A] overflow-hidden">
      {/* Decorative Ocarina Glows */}
      <div className="ocarina-watercolor-bloom absolute top-1/2 left-10 w-[400px] h-[400px] bg-[#FF5E00]/15 -z-10" />
      <div className="ocarina-watercolor-bloom absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#FF1493]/15 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Graphic Header inspired by "Shoot. Edit. Deliver. Repeat." */}
        <div className="relative text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FF1493]/10 border border-[#FF1493]/30 px-4 py-1.5 rounded-full mb-4">
            <Film className="w-3.5 h-3.5 text-[#FF1493]" />
            <span className="text-xs font-mono-tech uppercase tracking-wider text-[#FF1493] font-semibold">
              In-House Creative Studio
            </span>
          </div>

          <div className="relative">
            <h2 className="font-syne text-5xl sm:text-7xl font-extrabold text-white tracking-tight leading-none mb-2">
              Shoot. Edit.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E00] via-[#FFAE33] to-[#D4FF00]">
                Deliver. Repeat.
              </span>
            </h2>

            {/* Floating 3D context badges */}
            <div className="hidden md:flex flex-wrap items-center justify-center gap-3 mt-6">
              <span className="clay-badge px-4 py-1.5 rounded-full text-xs font-mono-tech text-gray-300">
                🎬 Studio & On-Location Shoots
              </span>
              <span className="clay-badge px-4 py-1.5 rounded-full text-xs font-mono-tech text-[#D4FF00]">
                ⚡ Reel & Short-Form Content
              </span>
              <span className="clay-badge px-4 py-1.5 rounded-full text-xs font-mono-tech text-gray-300">
                ✂️ High-End Post-Production
              </span>
              <span className="clay-badge px-4 py-1.5 rounded-full text-xs font-mono-tech text-[#00F0FF]">
                📸 Brand & Product Photography
              </span>
            </div>
          </div>

          <p className="mt-6 text-sm sm:text-base text-gray-400 font-hand text-xl text-[#FFAE33]">
            Ready to make your brand unforgettable in Jaipur? Let&apos;s roll! 🎥
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Image / Video Scroller */}
      <div className="relative w-full overflow-hidden py-4">
        <div className="animate-marquee gap-6 px-4">
          {[...creativeReels, ...creativeReels].map((reel, idx) => (
            <div
              key={`${reel.id}-${idx}`}
              className="relative w-72 sm:w-80 aspect-[9/14] rounded-3xl overflow-hidden clay-card border border-white/15 shrink-0 group cursor-pointer"
              onClick={() => setActiveReelIndex(reel.id)}
            >
              <Image
                src={reel.image}
                alt={reel.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Tape sticker in corner */}
              <div className="absolute top-3 left-3 bg-[#FFF5E4] text-black text-[10px] font-hand font-bold px-3 py-0.5 rounded shadow rotate-[-4deg]">
                {reel.niche}
              </div>

              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:scale-115 transition-transform duration-300 shadow-xl">
                  <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                </div>
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-0 inset-x-0 p-4">
                <h4 className="font-syne font-bold text-white text-sm line-clamp-2 mb-1">
                  {reel.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] font-mono-tech text-[#D4FF00]">
                  <span>{reel.stats}</span>
                  <span className="text-gray-400">{reel.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
