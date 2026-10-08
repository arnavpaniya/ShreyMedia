"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SiteConfig, InstagramOfferData } from "@/types/content";
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  X, 
  CheckCircle2
} from "lucide-react";

interface InstagramOfferModalProps {
  config: SiteConfig;
  offer?: InstagramOfferData;
}

export const InstagramOfferModal: React.FC<InstagramOfferModalProps> = ({ config, offer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showHeartAnim, setShowHeartAnim] = useState(false);

  const isEnabled = offer ? Boolean(offer.enabled) : false;
  const accountHandle = offer?.accountHandle || "shrey_media_2025";
  const locationTag = offer?.locationTag || "Jaipur, Rajasthan";
  const posterImage = offer?.imageUrl || "/images/diwali-offer.png";
  const rawDmText = offer?.whatsappDmMessage || "Hi Shreyansh! I saw your Special Offer Instagram post and want to claim a slot for my business.";

  useEffect(() => {
    if (!isEnabled) return;
    // Show pop-up after a gentle delay on page visit
    const timer = setTimeout(() => {
      const hasDismissed = sessionStorage.getItem("diwali_modal_dismissed");
      if (!hasDismissed) {
        setIsOpen(true);
      }
    }, 2800);
    return () => clearTimeout(timer);
  }, [isEnabled]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("diwali_modal_dismissed", "true");
  };

  const handleDoubleTap = () => {
    setLiked(true);
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 900);
  };

  const dmText = encodeURIComponent(rawDmText);

  if (!isEnabled) return null;

  return (
    <>
      {/* Light Theme Instagram Pop-up Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-3xl overflow-hidden bg-white text-black shadow-2xl animate-in zoom-in-95 duration-200 border border-gray-200">
            {/* 1. Light Theme Instagram Header */}
            <div className="px-4 py-3 bg-white flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                {/* Profile Avatar with Story Ring */}
                <div className="p-[2px] rounded-full bg-gradient-to-tr from-[#FF5E00] via-[#FF1493] to-[#FFAE33]">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white">
                    <Image
                      src="/brand/logo.png"
                      alt={`${accountHandle} Profile`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span className="font-sans font-bold text-xs text-gray-900">
                      {accountHandle}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10" />
                  </div>
                  <span className="text-[10px] font-sans text-gray-500 block leading-tight">
                    {locationTag}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={config.socials.shreyMediaInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-600 hover:text-blue-800"
                >
                  Follow
                </a>
                <button
                  onClick={handleClose}
                  className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 2. Poster Image (Double-Tap to Like) */}
            <div
              onDoubleClick={handleDoubleTap}
              className="relative w-full aspect-[4/5] bg-black select-none cursor-pointer overflow-hidden group"
            >
              <Image
                src={posterImage}
                alt={`${accountHandle} Offer`}
                fill
                quality={100}
                unoptimized={true}
                priority
                className="object-contain"
              />

              {/* Floating Double-Tap Heart Animation */}
              {showHeartAnim && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-in zoom-in-50 fade-in duration-300">
                  <Heart className="w-20 h-20 fill-[#FF1493] text-[#FF1493] drop-shadow-[0_0_20px_rgba(255,20,147,0.7)]" />
                </div>
              )}
            </div>

            {/* 3. Light Theme Action Icons Only */}
            <div className="px-4 py-3 bg-white flex items-center justify-between border-t border-gray-100">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setLiked(!liked)}
                  className="transition-transform active:scale-125 text-gray-900"
                  aria-label="Like Post"
                >
                  <Heart
                    className={`w-6 h-6 transition-colors ${
                      liked ? "fill-red-500 text-red-500" : "hover:text-gray-600"
                    }`}
                  />
                </button>

                <a
                  href={`https://wa.me/91${config.phone}?text=${dmText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-gray-600 transition-colors"
                  aria-label="Message"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>

                <a
                  href={`https://wa.me/91${config.phone}?text=${dmText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-gray-600 transition-colors"
                  aria-label="Share"
                >
                  <Send className="w-6 h-6" />
                </a>
              </div>

              <button
                onClick={() => setBookmarked(!bookmarked)}
                className="text-gray-900 hover:text-gray-600 transition-colors"
                aria-label="Save Post"
              >
                <Bookmark
                  className={`w-6 h-6 ${bookmarked ? "fill-black" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
