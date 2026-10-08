"use client";

import React, { useState } from "react";
import { ServiceItem, SiteConfig } from "@/types/content";
import { 
  Search, 
  Target, 
  TrendingUp, 
  Bot, 
  Share2, 
  Camera, 
  MessageSquare, 
  Compass, 
  Globe, 
  Smartphone, 
  Database, 
  Code, 
  Cpu, 
  Layers,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from "lucide-react";

interface ServicesShowcaseProps {
  marketingServices: ServiceItem[];
  techServices: ServiceItem[];
  activeDivision: "marketing" | "tech";
  config: SiteConfig;
}

export const ServicesShowcase: React.FC<ServicesShowcaseProps> = ({
  marketingServices,
  techServices,
  activeDivision,
  config,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<"marketing" | "tech">(activeDivision);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Search": return <Search className="w-6 h-6" />;
      case "Target": return <Target className="w-6 h-6" />;
      case "TrendingUp": return <TrendingUp className="w-6 h-6" />;
      case "Bot": return <Bot className="w-6 h-6" />;
      case "Share2": return <Share2 className="w-6 h-6" />;
      case "Camera": return <Camera className="w-6 h-6" />;
      case "MessageSquare": return <MessageSquare className="w-6 h-6" />;
      case "Compass": return <Compass className="w-6 h-6" />;
      case "Globe": return <Globe className="w-6 h-6" />;
      case "Smartphone": return <Smartphone className="w-6 h-6" />;
      case "Database": return <Database className="w-6 h-6" />;
      case "Code": return <Code className="w-6 h-6" />;
      case "Cpu": return <Cpu className="w-6 h-6" />;
      case "Layers": return <Layers className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  const currentServices = selectedCategory === "marketing" ? marketingServices : techServices;
  const isMarketing = selectedCategory === "marketing";

  return (
    <section id="services" className="py-20 relative blueprint-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full mb-3">
              <span className={`w-2 h-2 rounded-full ${isMarketing ? "bg-[#FF5E00]" : "bg-[#00F0FF]"}`} />
              <span className="text-xs font-mono-tech uppercase text-gray-300">
                {isMarketing ? "Shrey Media • Digital Marketing" : "Shrey Tech Solutions • Engineering"}
              </span>
            </div>
            <h2 className="font-syne text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {isMarketing ? "Performance Marketing & Creative Engine" : "Custom Software & Technology Stack"}
            </h2>
          </div>

          {/* Category Toggle Tabs */}
          <div className="flex items-center gap-2 bg-[#121218] p-1.5 rounded-2xl border border-white/10 shrink-0">
            <button
              onClick={() => setSelectedCategory("marketing")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === "marketing"
                  ? "bg-[#FF5E00] text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Marketing ({marketingServices.length})
            </button>
            <button
              onClick={() => setSelectedCategory("tech")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === "tech"
                  ? "bg-[#00F0FF] text-black shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Shrey Tech ({techServices.length})
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentServices.map((service) => {
            const waText = encodeURIComponent(
              `Hi Shrey Media, I'm interested in your ${service.title} service for my business in Jaipur.`
            );

            return (
              <div
                key={service.id}
                className="clay-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between group hover:border-white/30 transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden"
              >
                {/* HUD Corner Accents */}
                <span className="hud-corner-tl" />
                <span className="hud-corner-tr" />

                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${service.gradient || "from-amber-500 to-orange-600"} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {getServiceIcon(service.icon)}
                    </div>
                    {service.badge && (
                      <span className="font-mono-tech text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-syne font-bold text-xl text-white mb-2.5 group-hover:text-[#FFAE33] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-5">
                    {service.shortDesc}
                  </p>

                  {/* Features Bullet List */}
                  <ul className="space-y-2 mb-6 border-t border-white/5 pt-4">
                    {service.features.slice(0, 4).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4FF00] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom WhatsApp Trigger */}
                <a
                  href={`https://wa.me/91${config.phone}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full py-2.5 px-4 rounded-xl text-xs font-bold font-mono-tech flex items-center justify-center gap-2 bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-colors group-hover:bg-[#FF5E00] group-hover:border-[#FF5E00]"
                >
                  <span>Inquire on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
