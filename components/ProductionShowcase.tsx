"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductionSectionData, ShowcaseReelItem } from "@/types/content";
import { Film, Play, ExternalLink, Eye, X, Video, Image as ImageIcon, Globe } from "lucide-react";

interface ProductionShowcaseProps {
  production?: ProductionSectionData;
}

export const ProductionShowcase: React.FC<ProductionShowcaseProps> = ({ production }) => {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "video" | "image" | "website">("all");
  const [activeModalItem, setActiveModalItem] = useState<ShowcaseReelItem | null>(null);

  const creativeReels: ShowcaseReelItem[] = production?.creativeReels && production.creativeReels.length > 0
    ? production.creativeReels
    : [
        {
          id: 1,
          type: "video",
          title: "Handcrafted Bridal Jewellery Macro Showcase",
          niche: "Luxury Jewellery",
          duration: "0:24",
          image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80",
          videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hand-holding-a-gold-ring-with-a-diamond-40502-large.mp4",
          stats: "320K Views • 14x ROAS",
        },
        {
          id: 2,
          type: "image",
          title: "Autumn Streetwear & Ethnic Fusion Collection",
          niche: "Fashion & Apparel",
          duration: "Studio Shoot",
          image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
          stats: "540K Reach • Viral Creative",
        },
        {
          id: 3,
          type: "website",
          title: "D2C Luxury Storefront & Custom Next.js Platform",
          niche: "E-Commerce",
          duration: "Live Web App",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
          websiteUrl: "https://shreymedia.in",
          stats: "2.8x Conversion Rate",
        },
        {
          id: 4,
          type: "video",
          title: "Botanical Skincare & Glow Serum Product Reel",
          niche: "Cosmetics & Beauty",
          duration: "0:15",
          image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80",
          videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-beauty-product-bottle-41584-large.mp4",
          stats: "1,200+ Units Sold",
        },
        {
          id: 5,
          type: "website",
          title: "Multi-Location Clinic Automated CRM & Appointment Portal",
          niche: "Healthcare & Tech",
          duration: "Custom Software",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
          websiteUrl: "https://shreymedia.in",
          stats: "85 Consultations Booked/Wk",
        },
        {
          id: 6,
          type: "image",
          title: "High-Fashion Editorial Model & Brand Shoot",
          niche: "Editorial Fashion",
          duration: "Location Shoot",
          image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80",
          stats: "High Brand Recall",
        },
      ];

  const filteredItems = creativeReels.filter((item) => {
    if (selectedFilter === "all") return true;
    return (item.type || "video") === selectedFilter;
  });

  const eyebrow = production?.eyebrow || "In-House Creative Studio";
  const headlineMain = production?.headlineMain || "Shoot. Edit.";
  const headlineAccent = production?.headlineAccent || "Deliver. Repeat.";
  const note = production?.handwrittenNote || "Ready to make your brand unforgettable in Jaipur? Let's roll! 🎥";
  const badgePills = production?.badgePills && production.badgePills.length > 0
    ? production.badgePills
    : [
        "🎬 Studio & On-Location Shoots",
        "⚡ Reel & Short-Form Content",
        "✂️ High-End Post-Production",
        "📸 Brand & Product Photography",
      ];

  const handleItemClick = (item: ShowcaseReelItem) => {
    if (item.type === "website" && item.websiteUrl) {
      window.open(item.websiteUrl, "_blank", "noopener,noreferrer");
    } else {
      setActiveModalItem(item);
    }
  };

  return (
    <section id="production" className="py-16 sm:py-24 relative bg-transparent overflow-hidden">
      {/* Decorative ambient glows */}
      <div className="ocarina-watercolor-bloom absolute top-1/2 left-10 w-[400px] h-[400px] bg-[#FF5E00]/15 -z-10" />
      <div className="ocarina-watercolor-bloom absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#FF1493]/15 -z-10" />

      {/* Aesthetic Agency Sticker Badges */}
      <div className="absolute top-12 right-6 lg:right-20 hidden md:flex items-center gap-2 bg-[#FFF5E4] text-black px-3.5 py-1 rounded-full font-hand font-bold text-xs shadow-xl rotate-[6deg] z-20 border border-black/10 select-none">
        <span>⚡ 100% IN-HOUSE STUDIO</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered Graphic Header */}
        <div className="relative text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FF1493]/10 border border-[#FF1493]/30 px-4 py-1.5 rounded-full mb-3">
            <Film className="w-3.5 h-3.5 text-[#FF1493]" />
            <span className="text-xs font-mono-tech uppercase tracking-wider text-[#FF1493] font-semibold">
              {eyebrow}
            </span>
          </div>

          <div className="relative">
            <h2 className="font-syne text-3xl min-[360px]:text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-none mb-2">
              {headlineMain}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E00] via-[#FFAE33] to-[#D4FF00]">
                {headlineAccent}
              </span>
            </h2>

            {/* Dynamic Context Badges */}
            <div className="hidden md:flex flex-wrap items-center justify-center gap-2.5 mt-4">
              {badgePills.map((badge, idx) => (
                <span key={idx} className="clay-badge px-3.5 py-1 rounded-full text-xs font-mono-tech text-gray-200">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-hand text-base sm:text-xl text-[#FFAE33]">
            {note}
          </p>
        </div>

        {/* Media Filter Tabs: All, Clips & Reels, Photoshoots, Websites */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`min-h-[40px] px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 active:scale-98 ${
              selectedFilter === "all"
                ? "bg-white text-black shadow-lg"
                : "bg-white/5 text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            All Works ({creativeReels.length})
          </button>
          <button
            onClick={() => setSelectedFilter("video")}
            className={`min-h-[40px] flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 active:scale-98 ${
              selectedFilter === "video"
                ? "bg-[#FF1493] text-white shadow-lg"
                : "bg-white/5 text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Clips &amp; Reels</span>
          </button>
          <button
            onClick={() => setSelectedFilter("image")}
            className={`min-h-[40px] flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 active:scale-98 ${
              selectedFilter === "image"
                ? "bg-[#FF5E00] text-white shadow-lg"
                : "bg-white/5 text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Photoshoots &amp; Creatives</span>
          </button>
          <button
            onClick={() => setSelectedFilter("website")}
            className={`min-h-[40px] flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 active:scale-98 ${
              selectedFilter === "website"
                ? "bg-[#00F0FF] text-black font-extrabold shadow-lg"
                : "bg-white/5 text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Websites &amp; Apps</span>
          </button>
        </div>
      </div>

      {/* Infinite Horizontal Image / Video Scroller & Responsive Showcase */}
      <div className="relative w-full overflow-hidden py-2">
        <div className="flex gap-3.5 sm:gap-6 px-4 overflow-x-auto no-scrollbar snap-x snap-mandatory sm:justify-center flex-nowrap sm:flex-wrap">
          {filteredItems.map((item, idx) => {
            const itemType = item.type || "video";

            return (
              <div
                key={`${item.id}-${idx}`}
                className="relative w-[75vw] min-w-[230px] max-w-[280px] sm:w-72 aspect-[9/13] rounded-3xl overflow-hidden clay-card border border-white/15 shrink-0 snap-center group cursor-pointer shadow-xl hover:scale-103 transition-transform duration-300"
                onClick={() => handleItemClick(item)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Sticker badge in corner */}
                <div className="absolute top-3 left-3 bg-[#FFF5E4] text-black text-[10px] font-hand font-bold px-2.5 py-0.5 rounded shadow rotate-[-4deg] flex items-center gap-1">
                  {itemType === "video" && <span>🎥 Reel</span>}
                  {itemType === "image" && <span>📸 Shoot</span>}
                  {itemType === "website" && <span>💻 Live Site</span>}
                  <span>• {item.niche}</span>
                </div>

                {/* Center Action Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:scale-115 transition-transform duration-300 shadow-xl">
                    {itemType === "video" && <Play className="w-5 h-5 fill-white text-white ml-0.5" />}
                    {itemType === "image" && <Eye className="w-5 h-5 text-white" />}
                    {itemType === "website" && <ExternalLink className="w-5 h-5 text-white" />}
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/95 to-transparent">
                  <h4 className="font-syne font-bold text-white text-xs sm:text-sm line-clamp-2 mb-1">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] font-mono-tech">
                    <span className="text-[#D4FF00] font-semibold">{item.stats}</span>
                    <span className="text-gray-400">{item.duration}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Modal Popup for Clips & Image Lightbox */}
      {activeModalItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveModalItem(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-[#0F0F16] border border-white/20 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono-tech uppercase text-[#FFAE33] font-bold">
                  {activeModalItem.niche} • {activeModalItem.stats}
                </span>
                <h3 className="font-syne font-bold text-white text-base sm:text-lg">
                  {activeModalItem.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center active:scale-95"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Media Body */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              {activeModalItem.type === "video" && activeModalItem.videoUrl ? (
                <video 
                  src={activeModalItem.videoUrl} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain"
                />
              ) : (
                <Image
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  fill
                  className="object-contain"
                />
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#0A0A0E] flex items-center justify-between text-xs font-mono-tech text-gray-400">
              <span>{activeModalItem.duration}</span>
              {activeModalItem.websiteUrl && (
                <a
                  href={activeModalItem.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#00F0FF] hover:underline font-bold"
                >
                  <span>Open Live Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
