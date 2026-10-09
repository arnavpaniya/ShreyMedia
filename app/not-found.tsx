import React from "react";
import Link from "next/link";
import { initialSiteData } from "@/lib/data/initial-content";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Home, 
  Layers, 
  PhoneCall, 
  Sparkles 
} from "lucide-react";

export default function NotFound() {
  const config = initialSiteData.config;
  const whatsappUrl = `https://wa.me/91${config.phone}?text=${encodeURIComponent(
    "Hi Shreyansh! I encountered a 404 page on your website and would like assistance."
  )}`;

  return (
    <div className="min-h-screen bg-[#07070A] text-white flex flex-col selection:bg-[#FF5E00]">
      <Navbar config={config} />

      <main className="flex-1 flex items-center justify-center pt-32 pb-24 px-4 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="ocarina-watercolor-bloom absolute top-1/3 left-1/2 -translate-x-1/2 w-[90vw] max-w-[600px] h-[300px] bg-gradient-to-r from-[#FF5E00]/20 via-[#FFAE33]/15 to-[#00F0FF]/15 -z-10" />

        <div className="max-w-2xl w-full text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#FF5E00]/10 border border-[#FF5E00]/30 px-4 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#FFAE33]" />
            <span className="text-xs font-mono-tech uppercase text-[#FFAE33] font-semibold tracking-wider">
              404 • Page Not Found
            </span>
          </div>

          <h1 className="font-syne text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight">
            Lost in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E00] via-[#FFAE33] to-[#00F0FF]">Hyperspace</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-lg mx-auto leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="clay-btn min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FF5E00] to-[#FFAE33] text-white font-bold text-sm shadow-lg active:scale-98"
            >
              <Home className="w-4 h-4 shrink-0" />
              <span>Back to Homepage</span>
            </Link>

            <Link
              href="/services"
              className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white text-sm font-medium transition-colors active:scale-98"
            >
              <Layers className="w-4 h-4 text-[#00F0FF] shrink-0" />
              <span>Browse Services Directory</span>
            </Link>
          </div>

          <div className="pt-6 border-t border-white/10 max-w-md mx-auto">
            <p className="text-xs text-gray-400 font-mono-tech mb-2">
              Need immediate support or custom inquiries?
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#25D366] hover:underline font-bold"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>WhatsApp Shreyansh Malpani (+91 {config.phone})</span>
            </a>
          </div>
        </div>
      </main>

      <Footer config={config} />
    </div>
  );
}
