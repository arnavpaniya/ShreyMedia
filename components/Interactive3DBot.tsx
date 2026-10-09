"use client";

import React, { useState } from "react";
import { MessageSquare, X, ChevronRight, PhoneCall } from "lucide-react";
import { SiteConfig, Interactive3DBotConfig } from "@/types/content";

interface Interactive3DBotProps {
  config: SiteConfig;
  botConfig: Interactive3DBotConfig;
}

export const Interactive3DBot: React.FC<Interactive3DBotProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end max-w-[calc(100vw-2rem)]">
      {/* Expanded Quick Options Box */}
      {isOpen ? (
        <div className="clay-card w-[calc(100vw-2rem)] max-w-[320px] sm:max-w-none sm:w-88 rounded-3xl p-4 sm:p-5 border border-white/20 shadow-2xl bg-[#121218]/95 backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 sm:mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF5E00] to-[#FFAE33] flex items-center justify-center text-white font-bold shadow-lg shrink-0">
                <MessageSquare className="w-4 h-4 fill-white" />
              </div>
              <div className="min-w-0">
                <h4 className="font-syne font-bold text-sm text-white truncate">
                  Shrey Media WhatsApp
                </h4>
                <span className="text-[10px] font-mono-tech text-[#D4FF00] block truncate">
                  ● Online • Direct to Shreyansh
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="min-w-[36px] min-h-[36px] p-1.5 rounded-full text-gray-400 hover:text-white bg-white/5 flex items-center justify-center active:scale-95"
              aria-label="Close Chat Window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 text-xs text-gray-300">
            <a
              href={`https://wa.me/91${config.phone}?text=Hi%20Shreyansh,%20I'd%20like%20to%20scale%20my%20business%20marketing.`}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] p-2.5 sm:p-3 rounded-xl bg-white/5 hover:bg-[#FF5E00]/20 border border-white/10 text-gray-200 hover:text-white flex items-center justify-between transition-colors active:scale-98"
            >
              <span className="truncate pr-2">📈 Performance Ads &amp; Growth</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#FF5E00] shrink-0" />
            </a>

            <a
              href={`https://wa.me/91${config.phone}?text=Hi%20Shreyansh,%20I%20want%20to%20inquire%20about%20a%20Custom%20Website%20or%20CRM.`}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] p-2.5 sm:p-3 rounded-xl bg-white/5 hover:bg-[#00F0FF]/20 border border-white/10 text-gray-200 hover:text-white flex items-center justify-between transition-colors active:scale-98"
            >
              <span className="truncate pr-2">💻 Custom Software / CRM</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
            </a>

            <a
              href={`https://wa.me/91${config.phone}?text=Hi%20Shreyansh,%20I%20want%20to%20book%20a%20Free%20Growth%20Strategy%20Call.`}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-[#FF5E00] to-[#FFAE33] text-white font-bold flex items-center justify-between transition-colors shadow-lg active:scale-98"
            >
              <span className="flex items-center gap-1.5 truncate pr-2">
                <PhoneCall className="w-3.5 h-3.5 fill-white shrink-0" />
                <span className="truncate">Free Strategy Call (+91 {config.phone})</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </div>
      ) : (
        /* Clean Floating Trigger Avatar / WhatsApp Button */
        <button
          onClick={() => setIsOpen(true)}
          className="min-w-[48px] min-h-[48px] relative group p-3 sm:p-3.5 rounded-full sm:rounded-3xl bg-gradient-to-tr from-[#FF5E00] via-[#FF8800] to-[#FFAE33] text-white shadow-[0_10px_35px_rgba(255,94,0,0.5)] transition-transform duration-300 hover:scale-110 active:scale-95 border-2 border-white/30 flex items-center justify-center gap-2"
          aria-label="Open WhatsApp Chat"
        >
          <MessageSquare className="w-5 h-5 fill-white text-white" />
          <span className="font-syne font-bold text-xs pr-1 hidden sm:inline-block">
            Chat with Shreyansh
          </span>
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#00F0FF] border-2 border-[#0A0A0E] animate-ping" />
        </button>
      )}
    </div>
  );
};
