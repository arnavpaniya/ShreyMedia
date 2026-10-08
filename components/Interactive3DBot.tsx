"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Bot, Sparkles, X, ChevronRight } from "lucide-react";
import { SiteConfig, Interactive3DBotConfig } from "@/types/content";

interface Interactive3DBotProps {
  config: SiteConfig;
  botConfig: Interactive3DBotConfig;
}

export const Interactive3DBot: React.FC<Interactive3DBotProps> = ({ config, botConfig }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const botMessages = [
    "👋 Looking to scale your business in Jaipur?",
    "🚀 Ask Shreyansh for a tailored growth roadmap!",
    "⚙️ Need a custom CRM or WhatsApp automation?",
    "📸 Book a studio product photoshoot in Film Colony!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMessageIndex((prev) => (prev + 1) % botMessages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [botMessages.length]);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Speech Bubble Pill */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className="mb-3 max-w-xs cursor-pointer clay-card p-3 rounded-2xl border border-white/20 shadow-2xl animate-bounce duration-1000 hidden sm:flex items-center gap-2.5 bg-gradient-to-r from-[#181824] to-[#121218]"
        >
          <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-ping shrink-0" />
          <p className="text-xs text-gray-200 font-medium font-sans">
            {botMessages[activeMessageIndex]}
          </p>
          <ChevronRight className="w-4 h-4 text-[#FFAE33] shrink-0" />
        </div>
      )}

      {/* Expanded Interactive Bot Assistant Box */}
      {isOpen ? (
        <div className="clay-card w-80 sm:w-96 rounded-3xl p-5 border border-white/20 shadow-2xl bg-[#121218]/95 backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#FF5E00] to-[#D4FF00] flex items-center justify-center text-black font-bold shadow-lg">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-syne font-bold text-sm text-white">
                  Shrey AI Assistant
                </h4>
                <span className="text-[10px] font-mono-tech text-[#D4FF00] block">
                  ● Online • Direct to Shreyansh
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-gray-400 hover:text-white bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 mb-5 text-xs text-gray-300">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
              <p className="leading-relaxed">
                Hi there! Welcome to <strong>Shrey Media &amp; Shrey Tech Solutions</strong>. How can we help you scale your business today?
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <a
                href={`https://wa.me/91${config.phone}?text=Hi%20Shreyansh,%20I%20need%20help%20with%20Google%20&%20Meta%20Ads.`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-[#FF5E00]/20 border border-white/10 text-gray-200 hover:text-white flex items-center justify-between transition-colors"
              >
                <span>📈 Scale with Google &amp; Meta Ads</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#FF5E00]" />
              </a>

              <a
                href={`https://wa.me/91${config.phone}?text=Hi%20Shreyansh,%20I%20need%20a%20Custom%20Website%20or%20CRM.`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-[#00F0FF]/20 border border-white/10 text-gray-200 hover:text-white flex items-center justify-between transition-colors"
              >
                <span>💻 Build Custom Website / CRM</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#00F0FF]" />
              </a>

              <a
                href={`https://wa.me/91${config.phone}?text=Hi%20Shreyansh,%20I%20want%20to%20book%20a%20Free%20Growth%20Strategy%20Call.`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#FF5E00] text-white font-bold flex items-center justify-between transition-colors shadow-lg"
              >
                <span>🔥 Free Strategy Call (+91 {config.phone})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* Floating Trigger Avatar / Bot Button */
        <button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative group p-3.5 rounded-3xl bg-gradient-to-tr from-[#FF5E00] via-[#FF8800] to-[#D4FF00] text-white shadow-[0_10px_35px_rgba(255,94,0,0.5)] transition-transform duration-300 hover:scale-110 active:scale-95 border-2 border-white/30"
          aria-label="Open Shrey Media AI Assistant"
        >
          {/* Animated 3D Bot / WhatsApp Monogram */}
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 fill-white text-white" />
            <span className="font-syne font-bold text-xs pr-1 hidden sm:inline-block">
              Chat on WhatsApp
            </span>
          </div>
          {/* Pulsing online indicator badge */}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#00F0FF] border-2 border-[#0A0A0E] animate-ping" />
        </button>
      )}
    </div>
  );
};
