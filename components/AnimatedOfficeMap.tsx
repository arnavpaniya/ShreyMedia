"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SiteConfig } from "@/types/content";
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  PhoneCall, 
  Clock, 
  ShieldCheck
} from "lucide-react";

interface AnimatedOfficeMapProps {
  config: SiteConfig;
}

export const AnimatedOfficeMap: React.FC<AnimatedOfficeMapProps> = ({ config }) => {
  const [jaipurTime, setJaipurTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setJaipurTime(timeString);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "11, Film Colony, Malpani Chamber, Near Golcha Cinema, Jaipur, Rajasthan, India"
  )}`;

  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.564757530491!2d75.81765037599026!3d26.91884497664406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db6b26dc00001%3A0x7d6f5f9227181f21!2sGolcha%20Cinema!5e0!3m2!1sen!2sin!4v1712500000000!5m2!1sen!2sin`;

  return (
    <section className="py-20 relative bg-transparent overflow-hidden">
      {/* Background glow effects */}
      <div className="ocarina-watercolor-bloom absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#FF5E00]/15 -z-10" />
      <div className="ocarina-watercolor-bloom absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#00F0FF]/15 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
          <div>
            <h2 className="font-syne text-2xl min-[360px]:text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Visit Our Jaipur Office
            </h2>
          </div>

          {/* Right Status Badge & Clock */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="clay-badge px-3.5 sm:px-4 py-2 rounded-2xl flex items-center gap-2 sm:gap-2.5">
              <Clock className="w-4 h-4 text-[#D4FF00] shrink-0" />
              <div className="text-left">
                <span className="text-[9px] sm:text-[10px] font-mono-tech text-gray-400 block leading-none">Jaipur Local Time</span>
                <span className="font-mono-tech text-[11px] sm:text-xs font-bold text-white">{jaipurTime || "10:30 PM IST"}</span>
              </div>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="clay-btn min-h-[44px] inline-flex items-center gap-2 bg-gradient-to-r from-[#FF5E00] to-[#FFAE33] text-white font-bold text-xs px-4 sm:px-5 py-2.5 rounded-full shadow-lg active:scale-98"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* The Animated Map Container */}
        <div className="clay-card rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 border border-white/15 bg-[#0D0D14] shadow-2xl relative overflow-hidden">
          {/* Top Address Indicator Bar */}
          <div className="flex items-start sm:items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-[#12121B] rounded-xl sm:rounded-2xl border border-white/10 mb-2.5 sm:mb-3">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping shrink-0" />
              <span className="font-mono-tech text-[11px] sm:text-xs text-gray-200 leading-snug break-words">
                11, Film Colony, Malpani Chamber • Near Golcha Cinema, Jaipur, Rajasthan
              </span>
            </div>
          </div>

          {/* Map View Frame */}
          <div className="relative w-full h-[320px] sm:h-[480px] rounded-xl sm:rounded-2xl overflow-hidden bg-[#0A0A0F] border border-white/10">
            {/* Embedded Interactive Google Map with Dark Mode Styling */}
            <div className="relative w-full h-full">
              <iframe
                  title="Shrey Media Office Location"
                  src={embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(1.1) brightness(0.95)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                {/* Animated Pulsing Radar Floating Pin Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 flex flex-col items-center">
                  {/* Outer Radar Rings */}
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-20 sm:w-28 h-20 sm:h-28 rounded-full bg-[#FF5E00]/25 animate-ping" />
                    <span className="absolute w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-[#D4FF00]/30 animate-pulse" />
                    
                    {/* Custom 3D Shrey Media Pin Badge */}
                    <div className="clay-card p-1.5 sm:p-2 rounded-2xl bg-[#0A0A0E] border-2 border-[#FF5E00] shadow-[0_0_25px_#FF5E00] flex items-center gap-2 animate-bounce duration-1000">
                      <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border border-amber-400 shrink-0">
                        <Image src="/brand/logo.png" alt="Shrey Media Logo" fill className="object-cover" />
                      </div>
                      <div className="text-left pr-1">
                        <span className="font-syne font-black text-[11px] sm:text-xs text-white block leading-none">
                          SHREY MEDIA HQ
                        </span>
                        <span className="text-[8px] sm:text-[9px] font-mono-tech text-[#D4FF00]">
                          Creative Studio &amp; Tech Hub
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-[#FF5E00] to-transparent mt-1" />
                </div>
              </div>
          </div>

          {/* Bottom Quick Contact Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mt-2.5 sm:mt-3">
            <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FF5E00]/10 border border-[#FF5E00]/30 flex items-center justify-center text-[#FF5E00] shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="text-gray-400 block text-[10px] font-mono-tech">LANDMARK</span>
                <span className="text-white font-semibold">Near Golcha Cinema</span>
              </div>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#D4FF00]/10 border border-[#D4FF00]/30 flex items-center justify-center text-[#D4FF00] shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="text-gray-400 block text-[10px] font-mono-tech">DIRECT CALL</span>
                <a href={`tel:+91${config.phone}`} className="text-white font-semibold hover:text-[#FFAE33]">
                  +91 {config.phone}
                </a>
              </div>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="text-gray-400 block text-[10px] font-mono-tech">VISIT HOURS</span>
                <span className="text-white font-semibold">Mon - Sat: 10:00 AM - 7:30 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
