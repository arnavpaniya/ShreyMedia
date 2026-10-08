"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, PhoneCall } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { SiteConfig } from "@/types/content";

interface OutroLaserSectionProps {
  config: SiteConfig;
}

export const OutroLaserSection: React.FC<OutroLaserSectionProps> = ({ config }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMouseOffset({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative py-28 lg:py-36 bg-[#060608] overflow-hidden border-t border-white/10"
    >
      {/* Laser network floor glow & grid background */}
      <div className="absolute inset-0 blueprint-grid-dense opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Top Header Tagline */}
        <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-gray-400 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#FF5E00]" />
          <span>JAIPUR&apos;S PREMIER DIGITAL MARKETING &amp; GROWTH NETWORK</span>
        </div>

        {/* Marketing Growth Pipeline */}
        <div className="font-syne font-extrabold text-xs sm:text-base tracking-widest text-white uppercase mb-8 flex items-center justify-center gap-2 sm:gap-5 flex-wrap">
          <span>STRATEGY</span>
          <span className="text-[#FF5E00]">×</span>
          <span>CONTENT</span>
          <span className="text-[#D4FF00]">×</span>
          <span>ADS</span>
          <span className="text-[#FF1493]">×</span>
          <span>AUTOMATION</span>
          <span className="text-[#00F0FF]">×</span>
          <span>SCALE</span>
        </div>

        {/* Floating Handwritten Red/Orange Callout Annotations */}
        <div className="relative max-w-5xl mx-auto">
          {/* Left annotation */}
          <div className="absolute -top-10 left-0 hidden md:block text-left select-none pointer-events-none">
            <p className="font-hand text-xl text-[#FF5E00] leading-none -rotate-6">
              Marketing brings the audience.<br />Sharper ideas.
            </p>
            <span className="text-[#FF5E00] text-2xl ml-12">⤵</span>
          </div>

          {/* Right annotation */}
          <div className="absolute -top-10 right-0 hidden md:block text-right select-none pointer-events-none">
            <p className="font-hand text-xl text-[#D4FF00] leading-none rotate-6">
              Strategy, Ads &amp; Content<br />that scale your brand into revenue.
            </p>
            <span className="text-[#D4FF00] text-2xl mr-12">⤵</span>
          </div>

          {/* Stylized Circuit-Line Art SHREY Logo matching uploaded artwork */}
          <div
            className="my-10 transition-transform duration-300 ease-out select-none flex flex-col items-center justify-center"
            style={{
              transform: `perspective(1000px) rotateX(${mouseOffset.y * -8}deg) rotateY(${mouseOffset.x * 8}deg)`,
            }}
          >
            <div className="relative w-full max-w-3xl aspect-[21/9] sm:aspect-[24/9]">
              <Image
                src="/images/shrey-circuit-logo.png"
                alt="SHREY Stylized Circuit Line Art"
                fill
                className="object-contain filter drop-shadow-[0_0_25px_rgba(255,94,0,0.35)]"
                priority
              />
            </div>
            <span className="font-mono-tech text-sm sm:text-xl text-[#FFAE33] tracking-widest uppercase font-bold block mt-4">
              MEDIA &amp; TECH SOLUTIONS
            </span>
          </div>
        </div>

        {/* Glowing Laser Grid Nodes Floor Simulation */}
        <div className="relative max-w-4xl mx-auto mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0E]/90 py-5 px-4 sm:px-6">
          {/* Pulsing red/amber laser beams */}
          <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5E00] to-transparent animate-laser top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />

          {/* Marketing & Growth Nodes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 relative z-10">
            {[
              { label: "Jaipur HQ", status: "Film Colony" },
              { label: "100+ Brands", status: "Scaled" },
              { label: "Meta & Google", status: "High ROAS" },
              { label: "WhatsApp Funnels", status: "Automated" },
              { label: "GEO AI Search", status: "Next-Gen" },
            ].map((node, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-2 rounded-xl bg-white/[0.02]">
                <div className="w-3.5 h-3.5 rounded bg-[#1A1A24] border border-[#FF5E00] flex items-center justify-center shadow-[0_0_10px_#FF5E00] mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-ping" />
                </div>
                <span className="font-mono-tech text-[11px] text-gray-200 font-medium leading-tight">
                  {node.label}
                </span>
                <span className="font-mono-tech text-[10px] text-[#FFAE33] font-semibold mt-0.5">
                  {node.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Buttons */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`https://wa.me/91${config.phone}?text=Hi%20Shreyansh,%20let's%20scale%20my%20business%20marketing.`}
            target="_blank"
            rel="noopener noreferrer"
            className="clay-btn inline-flex items-center gap-2 bg-gradient-to-r from-[#FF5E00] via-[#FF8800] to-[#FFAE33] text-white font-bold text-sm sm:text-base px-8 py-4 rounded-full shadow-[0_10px_35px_rgba(255,94,0,0.5)]"
          >
            <PhoneCall className="w-4 h-4 fill-white" />
            <span>Start Your Marketing Project</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={config.socials.shreyMediaInstagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-sm sm:text-base px-6 py-4 rounded-full transition-colors"
          >
            <InstagramIcon className="w-4 h-4 text-[#FF1493]" />
            <span>Follow @shrey_media_2025</span>
          </a>
        </div>
      </div>
    </section>
  );
};
