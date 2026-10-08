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
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Options Box */}
      {isOpen ? (
        <div className="clay-card w-80 sm:w-88 rounded-3xl p-5 border border-white/20 shadow-2xl bg-[#121218]/95 backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF5E00] to-[#FFAE33] flex items-center justify-center text-white font-bold shadow-lg">
                <MessageSquare className="w-4 h-4 fill-white" />
              </div>
              <div>
                <h4 className="font-syne font-bold text-sm text-white">
                  Shrey Media WhatsApp
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

          <div className="space-y-2 text-xs text-gray-300">
            <a
              href={`https://wa.me/91${config.phone}?text=Hi%20Shreyansh,%20I'd%20like%20to%20scale%20my%20business%20marketing.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-[#FF5E00]/20 border border-white/10 text-gray-200 hover:text-white flex items-center justify-between transition-colors"
            >
              <span>📈 Performance Ads &amp; Growth</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#FF5E00]" />
            </a>

            <a
              href={`https://wa.me/91${config.phone}?text=Hi%20Shreyansh,%20I%20want%20to%20inquire%20about%20a%20Custom%20Website%20or%20CRM.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-[#00F0FF]/20 border border-white/10 text-gray-200 hover:text-white flex items-center justify-between transition-colors"
            >
              <span>💻 Custom Software / CRM</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#00F0FF]" />
            </a>

            <a
              href={`https://wa.me/91${config.phone}?text=Hi%20Shreyansh,%20I%20want%20to%20book%20a%20Free%20Growth%20Strategy%20Call.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#FF5E00] to-[#FFAE33] text-white font-bold flex items-center justify-between transition-colors shadow-lg"
            >
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 fill-white" />
                <span>Free Strategy Call (+91 {config.phone})</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      ) : (
        /* Clean Floating Trigger Avatar / WhatsApp Button (No speech bubble text) */
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-3.5 rounded-3xl bg-gradient-to-tr from-[#FF5E00] via-[#FF8800] to-[#FFAE33] text-white shadow-[0_10px_35px_rgba(255,94,0,0.5)] transition-transform duration-300 hover:scale-110 active:scale-95 border-2 border-white/30 flex items-center gap-2"
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
