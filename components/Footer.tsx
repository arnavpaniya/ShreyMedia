"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteConfig } from "@/types/content";
import { MapPin, Phone, MessageSquare, Mail, ArrowUpRight, Heart } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

interface FooterProps {
  config: SiteConfig;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  return (
    <footer id="contact" className="bg-[#07070A]/75 backdrop-blur-md border-t border-white/10 pt-16 pb-12 text-gray-400 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Office Location (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-500/30">
                <Image
                  src="/brand/logo.png"
                  alt="Shrey Media Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-syne font-black text-xl text-white tracking-tight">
                SHREY MEDIA
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm">
              Digital marketing agency in Jaipur helping businesses grow through performance marketing, SEO, social media, automation and technology.
            </p>

            {/* Verified Address */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-xs">
              <div className="flex items-start gap-2.5 text-gray-200">
                <MapPin className="w-4 h-4 text-[#FF5E00] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-syne">Headquarters &amp; Creative Studio:</strong>
                  <p className="text-gray-300 leading-relaxed mt-0.5">
                    {config.officeAddress.line1}, {config.officeAddress.line2}, {config.officeAddress.city}, {config.officeAddress.state}, {config.officeAddress.country}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2 border-t border-white/5">
                <Phone className="w-3.5 h-3.5 text-[#D4FF00]" />
                <a href={`tel:+91${config.phone}`} className="hover:text-white font-mono-tech text-xs">
                  +91 {config.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Services Matrix (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-syne font-bold text-white text-sm uppercase tracking-wider">
              Marketing &amp; Tech
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="#services" className="hover:text-[#FFAE33] transition-colors">Google Search &amp; Display Ads</Link></li>
              <li><Link href="#services" className="hover:text-[#FFAE33] transition-colors">Meta (Facebook &amp; IG) Ads</Link></li>
              <li><Link href="#services" className="hover:text-[#FFAE33] transition-colors">Search Engine Optimization (SEO)</Link></li>
              <li><Link href="#services" className="hover:text-[#FFAE33] transition-colors">Generative Engine Optimization (GEO)</Link></li>
              <li><Link href="#production" className="hover:text-[#FFAE33] transition-colors">Studio Photoshoots &amp; Reels</Link></li>
              <li><Link href="#services" className="hover:text-[#00F0FF] transition-colors">WhatsApp Automation &amp; CRM</Link></li>
              <li><Link href="#services" className="hover:text-[#00F0FF] transition-colors">Custom Websites &amp; Apps</Link></li>
            </ul>
          </div>

          {/* Col 3: Direct Social Handles (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-syne font-bold text-white text-sm uppercase tracking-wider">
              Connect Directly
            </h4>

            <div className="space-y-2.5">
              <a
                href={config.socials.shreyMediaInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <InstagramIcon className="w-4 h-4 text-[#FF1493]" />
                  <span className="text-xs text-gray-200 group-hover:text-white font-medium">
                    Shrey Media Official
                  </span>
                </div>
                <span className="text-[10px] font-mono-tech text-gray-400 group-hover:text-[#FF1493]">
                  @shrey_media_2025 ↗
                </span>
              </a>

              <a
                href={config.socials.shreyTechInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <InstagramIcon className="w-4 h-4 text-[#00F0FF]" />
                  <span className="text-xs text-gray-200 group-hover:text-white font-medium">
                    Shrey Tech Solutions
                  </span>
                </div>
                <span className="text-[10px] font-mono-tech text-gray-400 group-hover:text-[#00F0FF]">
                  @shreytechsolutions2k26 ↗
                </span>
              </a>

              <a
                href={config.socials.founderInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <InstagramIcon className="w-4 h-4 text-[#FFAE33]" />
                  <span className="text-xs text-gray-200 group-hover:text-white font-medium">
                    Shreyansh Malpani (Founder)
                  </span>
                </div>
                <span className="text-[10px] font-mono-tech text-gray-400 group-hover:text-[#FFAE33]">
                  @shrey_malpani_008i ↗
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Local SEO Keywords Strip */}
        <div className="py-6 border-b border-white/5 flex flex-wrap gap-2 text-[10px] font-mono-tech text-gray-400">
          <span className="text-gray-300 font-bold">Jaipur Local SEO:</span>
          {config.seo.secondaryKeywords.map((kw, idx) => (
            <span key={idx} className="bg-white/5 px-2 py-0.5 rounded">
              {kw}
            </span>
          ))}
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            © {new Date().getFullYear()} {config.companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
