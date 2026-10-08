"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SiteConfig } from "@/types/content";
import { 
  MapPin, 
  Navigation, 
  Compass, 
  ExternalLink, 
  PhoneCall, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Layers
} from "lucide-react";

interface AnimatedOfficeMapProps {
  config: SiteConfig;
}

export const AnimatedOfficeMap: React.FC<AnimatedOfficeMapProps> = ({ config }) => {
  const [activeView, setActiveView] = useState<"interactive" | "satellite">("interactive");
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
    <section className="py-20 relative bg-[#07070A] overflow-hidden border-t border-white/10">
      {/* Background glow effects */}
      <div className="ocarina-watercolor-bloom absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#FF5E00]/15 -z-10" />
      <div className="ocarina-watercolor-bloom absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#00F0FF]/15 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FF5E00]/10 border border-[#FF5E00]/30 px-3.5 py-1.5 rounded-full mb-3">
              <Compass className="w-3.5 h-3.5 text-[#FF5E00] animate-spin" style={{ animationDuration: "12s" }} />
              <span className="text-xs font-mono-tech uppercase text-[#FFAE33] font-semibold">
                Headquarters &amp; Production Studio
              </span>
            </div>
            <h2 className="font-syne text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Visit Our Jaipur Office
            </h2>
          </div>

          {/* Right Status Badge & Clock */}
          <div className="flex items-center gap-4">
            <div className="clay-badge px-4 py-2 rounded-2xl flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#D4FF00]" />
              <div className="text-left">
                <span className="text-[10px] font-mono-tech text-gray-400 block leading-none">Jaipur Local Time</span>
                <span className="font-mono-tech text-xs font-bold text-white">{jaipurTime || "10:30 PM IST"}</span>
              </div>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="clay-btn inline-flex items-center gap-2 bg-gradient-to-r from-[#FF5E00] to-[#FFAE33] text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-lg"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* The Animated Map Container */}
        <div className="clay-card rounded-3xl p-3 sm:p-4 border border-white/15 bg-[#0D0D14] shadow-2xl relative overflow-hidden">
          {/* Top Control Bar with Coordinates HUD */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#12121B] rounded-2xl border border-white/10 mb-3">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#10B981] animate-ping" />
              <span className="font-mono-tech text-xs text-gray-200">
                ● 11, Film Colony, Malpani Chamber • Near Golcha Cinema, Jaipur
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono-tech text-[11px] text-[#FFAE33] hidden sm:inline-block">
                LAT: 26.9188° N • LNG: 75.8176° E
              </span>
              <div className="flex bg-black/40 p-1 rounded-xl border border-white/10 text-xs font-mono-tech">
                <button
                  onClick={() => setActiveView("interactive")}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    activeView === "interactive"
                      ? "bg-[#FF5E00] text-white font-bold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Live Map
                </button>
                <button
                  onClick={() => setActiveView("satellite")}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    activeView === "satellite"
                      ? "bg-[#00F0FF] text-black font-bold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Radar Pulse
                </button>
              </div>
            </div>
          </div>

          {/* Map View Frame */}
          <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden bg-[#0A0A0F] border border-white/10">
            {activeView === "interactive" ? (
              /* Embedded Interactive Google Map with Dark Mode Styling */
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
                    <span className="absolute w-28 h-28 rounded-full bg-[#FF5E00]/25 animate-ping" />
                    <span className="absolute w-16 h-16 rounded-full bg-[#D4FF00]/30 animate-pulse" />
                    
                    {/* Custom 3D Shrey Media Pin Badge */}
                    <div className="clay-card p-2 rounded-2xl bg-[#0A0A0E] border-2 border-[#FF5E00] shadow-[0_0_25px_#FF5E00] flex items-center gap-2 animate-bounce duration-1000">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden border border-amber-400">
                        <Image src="/brand/logo.png" alt="Shrey Media Logo" fill className="object-cover" />
                      </div>
                      <div className="text-left pr-1">
                        <span className="font-syne font-black text-xs text-white block leading-none">
                          SHREY MEDIA HQ
                        </span>
                        <span className="text-[9px] font-mono-tech text-[#D4FF00]">
                          Creative Studio &amp; Tech Hub
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-1 h-6 bg-gradient-to-b from-[#FF5E00] to-transparent mt-1" />
                </div>
              </div>
            ) : (
              /* Cyber Radar Blueprint Mode */
              <div className="relative w-full h-full blueprint-grid flex items-center justify-center bg-[#07070B] overflow-hidden">
                {/* Concentric circular radar lines */}
                <div className="absolute w-[600px] h-[600px] rounded-full border border-white/5 animate-ping duration-[4000ms]" />
                <div className="absolute w-[450px] h-[450px] rounded-full border border-[#FF5E00]/20" />
                <div className="absolute w-[300px] h-[300px] rounded-full border border-[#00F0FF]/25 animate-pulse" />
                <div className="absolute w-[150px] h-[150px] rounded-full border border-[#D4FF00]/30" />

                {/* Radar sweeping beam */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-full h-full bg-gradient-to-r from-transparent via-[#FF5E00]/10 to-transparent animate-spin"
                    style={{ animationDuration: "8s" }}
                  />
                </div>

                {/* Center Pin Information Card */}
                <div className="relative z-10 clay-card p-6 rounded-3xl border border-[#FF5E00]/40 max-w-md mx-4 text-center bg-[#0E0E16]/95 backdrop-blur-xl shadow-2xl">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF5E00] to-[#FFAE33] flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-syne font-extrabold text-xl text-white mb-1">
                    Malpani Chamber HQ
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    11, Film Colony, Near Golcha Cinema, Jaipur, Rajasthan, India
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="clay-btn py-2 px-3 rounded-xl bg-[#FF5E00] text-white font-bold flex items-center justify-center gap-1.5"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Open Maps</span>
                    </a>
                    <a
                      href={`https://wa.me/91${config.phone}?text=Hi%20Shreyansh,%20I%20want%20to%20visit%20the%20Film%20Colony%20office.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="clay-btn py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center gap-1.5 border border-white/15"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Book Visit</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Quick Contact Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FF5E00]/10 border border-[#FF5E00]/30 flex items-center justify-center text-[#FF5E00]">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="text-gray-400 block text-[10px] font-mono-tech">LANDMARK</span>
                <span className="text-white font-semibold">Near Golcha Cinema</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#D4FF00]/10 border border-[#D4FF00]/30 flex items-center justify-center text-[#D4FF00]">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="text-gray-400 block text-[10px] font-mono-tech">DIRECT CALL</span>
                <a href={`tel:+91${config.phone}`} className="text-white font-semibold hover:text-[#FFAE33]">
                  +91 {config.phone}
                </a>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF]">
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
