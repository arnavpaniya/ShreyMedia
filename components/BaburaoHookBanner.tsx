"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, PhoneCall, Sparkles } from "lucide-react";
import { SiteConfig } from "@/types/content";

interface BaburaoHookBannerProps {
  config: SiteConfig;
}

export const BaburaoHookBanner: React.FC<BaburaoHookBannerProps> = ({ config }) => {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="clay-card rounded-3xl p-8 sm:p-12 border border-[#FF5E00]/30 bg-gradient-to-br from-[#1C130E] via-[#121218] to-[#0A0A0E] relative overflow-hidden shadow-[0_20px_50px_rgba(255,94,0,0.15)]">
          {/* Blueprint grid background */}
          <div className="blueprint-grid-dense absolute inset-0 opacity-40 pointer-events-none" />

          {/* Dotted curve paths */}
          <svg
            className="absolute top-0 right-0 w-80 h-80 opacity-20 pointer-events-none"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle cx="100" cy="100" r="80" stroke="#FF5E00" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M20 100 Q 100 20 180 100" stroke="#D4FF00" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Poster Graphic Image */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-56 sm:w-64 aspect-[4/5] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
                <Image
                  src="/images/baburao-marketing.png"
                  alt="Marketing Nahi Toh... Business Ka Kya Future Hai Re Baba?"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Text & CTA */}
            <div className="md:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 bg-[#FF5E00]/15 border border-[#FF5E00]/40 px-3.5 py-1 rounded-full mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#FFAE33]" />
                <span className="text-xs font-mono-tech uppercase text-[#FFAE33] font-bold">
                  The Honest Reality
                </span>
              </div>

              <h3 className="font-syne text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                &ldquo;Marketing Nahi Toh...<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E00] to-[#D4FF00]">
                  Business Ka Kya Future Hai Re Baba?&rdquo;
                </span>
              </h3>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
                Relying solely on word-of-mouth won&apos;t scale your business in 2026. Put your customer acquisition and follow-up on autopilot with Shrey Media &amp; Shrey Tech Solutions.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/91${config.phone}?text=Hi%20Shreyansh,%20I%20want%20to%20scale%20my%20business%20marketing%20with%20Shrey%20Media.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-btn inline-flex items-center gap-2 bg-gradient-to-r from-[#FF5E00] to-[#FFAE33] text-white font-bold text-sm px-6 py-3 rounded-full"
                >
                  <PhoneCall className="w-4 h-4 fill-white" />
                  <span>Talk to Shreyansh (+91 {config.phone})</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
