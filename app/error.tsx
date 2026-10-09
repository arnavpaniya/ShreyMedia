"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { 
  AlertTriangle, 
  RotateCcw, 
  Home, 
  PhoneCall 
} from "lucide-react";
import { initialSiteData } from "@/lib/data/initial-content";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Runtime Production Application Error:", error);
  }, [error]);

  const config = initialSiteData.config;
  const whatsappUrl = `https://wa.me/91${config.phone}?text=${encodeURIComponent(
    `Hi Shreyansh! I experienced a technical error on your website: ${error.message || "App Error"}`
  )}`;

  return (
    <div className="min-h-screen bg-[#07070A] text-white flex flex-col items-center justify-center p-4 selection:bg-[#FF5E00] relative overflow-hidden">
      {/* Background glow effect */}
      <div className="ocarina-watercolor-bloom absolute top-1/3 left-1/2 -translate-x-1/2 w-[90vw] max-w-[600px] h-[300px] bg-gradient-to-r from-[#FF5E00]/20 via-[#FF1493]/15 to-[#00F0FF]/15 -z-10" />

      <div className="max-w-md w-full clay-card p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#0C0C14]/90 backdrop-blur-2xl text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 text-red-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(239,68,68,0.4)]">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="font-syne font-black text-2xl sm:text-3xl text-white tracking-tight">
            Unexpected System Error
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
            Our engine encountered an unexpected runtime issue. You can retry loading the route or return to safety.
          </p>
          {error.digest && (
            <p className="text-[10px] font-mono-tech text-gray-500">
              Error Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={() => reset()}
            className="clay-btn min-h-[46px] w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF5E00] to-[#FFAE33] text-white font-bold text-sm shadow-lg active:scale-98 transition-transform focus-visible:ring-2 focus-visible:ring-[#FF5E00]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again / Reload</span>
          </button>

          <Link
            href="/"
            className="min-h-[46px] w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white text-sm font-medium transition-colors active:scale-98 focus-visible:ring-2 focus-visible:ring-[#FF5E00]"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-white/10">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[#25D366] hover:underline font-bold"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Report issue to Founder (+91 {config.phone})</span>
          </a>
        </div>
      </div>
    </div>
  );
}
