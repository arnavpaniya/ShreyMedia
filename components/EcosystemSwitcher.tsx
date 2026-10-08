"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles, Zap, Megaphone, Terminal, CheckCircle2 } from "lucide-react";

interface EcosystemSwitcherProps {
  onSelectDivision: (division: "marketing" | "tech") => void;
  activeDivision: "marketing" | "tech";
}

export const EcosystemSwitcher: React.FC<EcosystemSwitcherProps> = ({
  onSelectDivision,
  activeDivision,
}) => {
  const steps = [
    { title: "Strategy", desc: "Audience & Market Architecture", division: "marketing" },
    { title: "Content", desc: "Viral Reels & Studio Shoots", division: "marketing" },
    { title: "Ads", desc: "Google & Meta Lead Influx", division: "marketing" },
    { title: "SEO & GEO", desc: "Search & AI Citation Visibility", division: "marketing" },
    { title: "Automation", desc: "WhatsApp Triggers & Follow-ups", division: "tech" },
    { title: "Technology", desc: "Custom CRM & Scalable Web", division: "tech" },
  ];

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Positioning Callout */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#D4FF00]/10 border border-[#D4FF00]/30 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span className="text-xs font-mono-tech uppercase tracking-wider text-[#D4FF00] font-semibold">
              The Growth & Tech Ecosystem
            </span>
          </div>

          <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Marketing Brings The Customer.
            <span className="block mt-1 font-serif-luxury italic text-[#00F0FF]">
              Technology Converts & Retains Them.
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-400">
            Most agencies only deliver traffic. We build both the customer acquisition engine and the software infrastructure to scale revenue.
          </p>
        </div>

        {/* Dual Pillar Switcher Tabs */}
        <div className="flex justify-center mb-10">
          <div className="clay-card p-1.5 flex rounded-full border border-white/15 bg-black/40 backdrop-blur-xl">
            <button
              onClick={() => onSelectDivision("marketing")}
              className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeDivision === "marketing"
                  ? "bg-gradient-to-r from-[#FF5E00] to-[#FFAE33] text-white shadow-[0_4px_20px_rgba(255,94,0,0.4)] scale-102"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Megaphone className="w-4 h-4" />
              <span>SHREY MEDIA (Growth & Ads)</span>
            </button>

            <button
              onClick={() => onSelectDivision("tech")}
              className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeDivision === "tech"
                  ? "bg-gradient-to-r from-[#00F0FF] to-[#7928CA] text-white shadow-[0_4px_20px_rgba(0,240,255,0.4)] scale-102"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>SHREY TECH (Build & Automate)</span>
            </button>
          </div>
        </div>

        {/* The 6-Step Visual Ecosystem Highway */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative">
          {steps.map((step, idx) => {
            const isMarketing = step.division === "marketing";
            const isActive = activeDivision === step.division;

            return (
              <div
                key={step.title}
                className={`clay-card p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative group ${
                  isActive
                    ? isMarketing
                      ? "border-[#FF5E00]/40 shadow-[0_8px_24px_rgba(255,94,0,0.15)] bg-gradient-to-b from-[#1C1410] to-[#121218]"
                      : "border-[#00F0FF]/40 shadow-[0_8px_24px_rgba(0,240,255,0.15)] bg-gradient-to-b from-[#0F1E26] to-[#121218]"
                    : "border-white/5 opacity-70 hover:opacity-100"
                }`}
              >
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono-tech text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                    0{idx + 1}
                  </span>
                  {idx < steps.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white hidden lg:block" />
                  )}
                </div>

                <h3 className="font-syne font-bold text-base sm:text-lg text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {step.desc}
                </p>

                {/* Bottom colored edge accent */}
                <div
                  className={`h-1 w-full rounded-full mt-4 ${
                    isMarketing ? "bg-[#FF5E00]" : "bg-[#00F0FF]"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
