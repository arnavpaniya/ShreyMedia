"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SiteConfig } from "@/types/content";
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Clock
} from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

interface InstagramOfferPostProps {
  config: SiteConfig;
}

export const InstagramOfferPost: React.FC<InstagramOfferPostProps> = ({ config }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(842);
  const [bookmarked, setBookmarked] = useState(false);
  const [showHeartAnim, setShowHeartAnim] = useState(false);

  const handleDoubleTap = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    }
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 900);
  };

  const handleLikeToggle = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  const dmText = encodeURIComponent(
    "Hi Shreyansh! I saw your Diwali Special Offer Instagram post and want to claim 1 of the 5 slots for my business."
  );

  return (
    <section className="py-20 relative bg-[#07070B] overflow-hidden border-t border-white/10">
      {/* Ambient festive glow */}
      <div className="ocarina-watercolor-bloom absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#FF5E00]/20 -z-10" />
      <div className="ocarina-watercolor-bloom absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#FFAE33]/15 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FF5E00]/10 border border-[#FF5E00]/30 px-3.5 py-1.5 rounded-full mb-3">
            <InstagramIcon className="w-3.5 h-3.5 text-[#FF1493]" />
            <span className="text-xs font-mono-tech uppercase text-[#FFAE33] font-semibold">
              Live Instagram Campaign
            </span>
          </div>
          <h2 className="font-syne text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Special Festive Growth Offer 🪔
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400">
            Limited enrollment opportunity for select Jaipur businesses looking to scale their digital presence.
          </p>
        </div>

        {/* The Instagram Post Mockup Card */}
        <div className="max-w-md mx-auto clay-card rounded-3xl border border-white/20 bg-[#000000] shadow-[0_25px_60px_-15px_rgba(255,94,0,0.25)] overflow-hidden">
          {/* 1. Instagram Post Header */}
          <div className="p-4 flex items-center justify-between border-b border-white/10 bg-[#0E0E14]">
            <a
              href={config.socials.shreyMediaInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              {/* Profile Avatar with Instagram Story Gradient Ring */}
              <div className="p-[2px] rounded-full bg-gradient-to-tr from-[#FF5E00] via-[#FF1493] to-[#FFAE33]">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-black bg-black">
                  <Image
                    src="/brand/logo.png"
                    alt="Shrey Media Profile"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1">
                  <span className="font-syne font-bold text-xs sm:text-sm text-white group-hover:text-[#FFAE33] transition-colors">
                    shrey_media_2025
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF] fill-[#00F0FF]/20" />
                </div>
                <span className="text-[10px] font-mono-tech text-gray-400 block">
                  Jaipur, Rajasthan • Sponsored
                </span>
              </div>
            </a>

            <div className="flex items-center gap-2">
              <a
                href={config.socials.shreyMediaInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold font-mono-tech text-[#00F0FF] hover:underline"
              >
                Follow
              </a>
              <button className="text-gray-400 hover:text-white p-1">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. Post Image Canvas (Double-Tap to Like) */}
          <div
            onDoubleClick={handleDoubleTap}
            className="relative w-full aspect-[4/5] bg-black select-none cursor-pointer overflow-hidden group"
          >
            <Image
              src="/images/diwali-offer.png"
              alt="Shrey Media Diwali Special Offer"
              fill
              quality={100}
              unoptimized={true}
              priority
              className="object-contain sm:object-cover"
            />

            {/* Double-tap Floating Heart Animation */}
            {showHeartAnim && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-in zoom-in-50 fade-in duration-300">
                <Heart className="w-24 h-24 fill-[#FF1493] text-[#FF1493] drop-shadow-[0_0_30px_rgba(255,20,147,0.8)]" />
              </div>
            )}

            {/* Tap Hint */}
            <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono-tech text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
              Double-tap to ❤️
            </div>
          </div>

          {/* 3. Action Bar */}
          <div className="p-4 bg-[#0A0A0F]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLikeToggle}
                  className="transition-transform active:scale-125"
                  aria-label="Like Post"
                >
                  <Heart
                    className={`w-6 h-6 transition-colors ${
                      liked
                        ? "fill-[#FF1493] text-[#FF1493]"
                        : "text-white hover:text-gray-300"
                    }`}
                  />
                </button>

                <a
                  href={`https://wa.me/91${config.phone}?text=${dmText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#00F0FF] transition-colors"
                  aria-label="Comment"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>

                <a
                  href={`https://wa.me/91${config.phone}?text=${dmText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#00F0FF] transition-colors"
                  aria-label="Share"
                >
                  <Send className="w-6 h-6" />
                </a>
              </div>

              <button
                onClick={() => setBookmarked(!bookmarked)}
                className="text-white hover:text-yellow-400 transition-colors"
                aria-label="Save Post"
              >
                <Bookmark
                  className={`w-6 h-6 ${
                    bookmarked ? "fill-white text-white" : ""
                  }`}
                />
              </button>
            </div>

            {/* Like Counter */}
            <p className="font-syne font-bold text-xs text-white mb-2">
              {likeCount.toLocaleString()} likes
            </p>

            {/* Caption */}
            <div className="text-xs text-gray-300 space-y-1.5 leading-relaxed">
              <p>
                <strong className="text-white font-syne mr-1.5">shrey_media_2025</strong>
                🪔 <strong>Diwali Special Growth Offer is Live!</strong> Light up your business this festive season with customized digital marketing &amp; technology solutions.
              </p>

              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1 text-[11px] font-mono-tech text-gray-300">
                <div className="text-[#D4FF00] font-bold">⚡ ONLY 5 SLOTS AVAILABLE</div>
                <div className="text-gray-400">
                  Includes: Website Dev • GMB Setup • Google &amp; Meta Ads • AI UGC Videos
                </div>
                <div className="text-red-400 flex items-center gap-1 pt-1">
                  <Clock className="w-3 h-3" /> Valid: 7th Oct – 15th Oct 2026
                </div>
              </div>
            </div>

            {/* Direct DM "DIWALI" WhatsApp Action Button */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <a
                href={`https://wa.me/91${config.phone}?text=${dmText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-btn w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF5E00] via-[#FF8800] to-[#FFAE33] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg tracking-wide uppercase font-mono-tech"
              >
                <Send className="w-3.5 h-3.5 fill-white" />
                <span>DM &ldquo;DIWALI&rdquo; ON WHATSAPP (+91 {config.phone})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
