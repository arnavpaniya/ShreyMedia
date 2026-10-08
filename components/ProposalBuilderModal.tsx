"use client";

import React, { useState } from "react";
import { SiteConfig } from "@/types/content";
import { 
  Sparkles, 
  X, 
  Send, 
  CheckCircle2, 
  Gem, 
  Shirt, 
  Building, 
  Coffee, 
  Stethoscope, 
  Laptop, 
  Video, 
  Megaphone, 
  Code2, 
  Bot, 
  Search,
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react";

interface ProposalBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
}

const INDUSTRIES = [
  { id: "jewellery", label: "Jewellery & Gems", icon: Gem },
  { id: "fashion", label: "Fashion & Luxury Apparel", icon: Shirt },
  { id: "realestate", label: "Real Estate & Architecture", icon: Building },
  { id: "hospitality", label: "Cafes, Dining & Resorts", icon: Coffee },
  { id: "healthcare", label: "Clinics & Aesthetics", icon: Stethoscope },
  { id: "tech_ecommerce", label: "E-Commerce & Tech Startups", icon: Laptop },
];

const SERVICE_OPTIONS = [
  { id: "reels", label: "4K Cine Production & Viral Reels", icon: Video },
  { id: "ads", label: "Meta & Google High-ROAS Ads", icon: Megaphone },
  { id: "tech", label: "Custom Website & CRM Development", icon: Code2 },
  { id: "automation", label: "WhatsApp & Lead Flow Automation", icon: Bot },
  { id: "seo", label: "Jaipur Local SEO & Google Maps Dominance", icon: Search },
];

const BUDGET_TIERS = [
  { id: "starter", label: "₹25,000 - ₹50,000 / mo", desc: "Starter Content & Growth" },
  { id: "growth", label: "₹50,000 - ₹1,20,000 / mo", desc: "Full-Funnel Acquisition (Popular)" },
  { id: "scale", label: "₹1,20,000+ / mo", desc: "Full Agency Retainer + Custom Tech" },
  { id: "custom", label: "One-Time Custom Project", desc: "Web Development / Single Campaign" },
];

export const ProposalBuilderModal: React.FC<ProposalBuilderModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("jewellery");
  const [selectedServices, setSelectedServices] = useState<string[]>(["reels", "ads"]);
  const [selectedBudget, setSelectedBudget] = useState<string>("growth");
  const [brandName, setBrandName] = useState<string>("");
  const [contactPerson, setContactPerson] = useState<string>("");

  if (!isOpen) return null;

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleLaunchWhatsApp = () => {
    const industryObj = INDUSTRIES.find((i) => i.id === selectedIndustry);
    const budgetObj = BUDGET_TIERS.find((b) => b.id === selectedBudget);
    const servicesNames = selectedServices
      .map((s) => SERVICE_OPTIONS.find((opt) => opt.id === s)?.label)
      .filter(Boolean)
      .join("\n• ");

    const formattedMessage = encodeURIComponent(
      `⚡ *PROJECT INQUIRY VIA SHREY MEDIA PROPOSAL BUILDER*\n\n` +
      `👤 *Name:* ${contactPerson.trim() || "Client"}\n` +
      `🏢 *Brand/Company:* ${brandName.trim() || "Not specified"}\n` +
      `🎯 *Industry:* ${industryObj?.label || "General"}\n` +
      `💰 *Estimated Budget:* ${budgetObj?.label || "Flexible"}\n\n` +
      `🛠️ *Requested Services:*\n• ${servicesNames}\n\n` +
      `📍 *Location:* Jaipur / Remote\n\n` +
      `Hi Shreyansh! I built this scope on your website and would like to discuss next steps & campaign execution.`
    );

    const whatsappNumber = config.phone.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${whatsappNumber}?text=${formattedMessage}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="clay-card relative w-full max-w-2xl bg-[#0C0C14] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-white max-h-[90vh] flex flex-col">
        {/* Glow Accent */}
        <div className="ocarina-watercolor-bloom absolute -top-24 -right-24 w-80 h-80 bg-[#FF5E00]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="ocarina-watercolor-bloom absolute -bottom-24 -left-24 w-80 h-80 bg-[#00F0FF]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF5E00] to-[#FFAE33] flex items-center justify-center text-white shadow-lg">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-syne font-bold text-lg text-white">Interactive Scope &amp; Proposal Builder</h3>
              <p className="text-[11px] font-mono-tech text-gray-400">Step {step} of 3 • Instant WhatsApp Proposal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/5 h-1.5 rounded-full my-4 overflow-hidden shrink-0">
          <div 
            className="bg-gradient-to-r from-[#FF5E00] via-[#FFAE33] to-[#00F0FF] h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Modal Body / Scrollable Content */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-6 py-2">
          {/* STEP 1: Industry & Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-syne font-bold text-base text-white mb-1">1. Select Your Industry / Niche</h4>
                <p className="text-xs text-gray-400 font-mono-tech">We tailor scripts and ad strategies specifically for your market.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {INDUSTRIES.map((ind) => {
                  const Icon = ind.icon;
                  const isSelected = selectedIndustry === ind.id;
                  return (
                    <button
                      key={ind.id}
                      type="button"
                      onClick={() => setSelectedIndustry(ind.id)}
                      className={`p-3 rounded-2xl border text-left transition-all flex flex-col gap-2 ${
                        isSelected
                          ? "bg-[#FF5E00]/15 border-[#FF5E00] text-white shadow-md shadow-[#FF5E00]/20"
                          : "bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.08]"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? "text-[#FF5E00]" : "text-gray-400"}`} />
                      <span className="text-xs font-bold leading-tight">{ind.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-[11px] font-mono-tech text-gray-300 block mb-1">Your Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#FF5E00]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono-tech text-gray-300 block mb-1">Brand / Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Royal Jewels Jaipur"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#FF5E00]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Services Required */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-syne font-bold text-base text-white mb-1">2. What capabilities do you need?</h4>
                <p className="text-xs text-gray-400 font-mono-tech">Select one or more growth and technology modules.</p>
              </div>

              <div className="space-y-2">
                {SERVICE_OPTIONS.map((srv) => {
                  const Icon = srv.icon;
                  const isSelected = selectedServices.includes(srv.id);
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => toggleService(srv.id)}
                      className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-gradient-to-r from-[#FF5E00]/20 to-transparent border-[#FF5E00] text-white"
                          : "bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${isSelected ? "bg-[#FF5E00] text-white" : "bg-white/10 text-gray-400"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold">{srv.label}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? "border-[#FF5E00] bg-[#FF5E00] text-white" : "border-white/20"}`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Budget & Summary */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-syne font-bold text-base text-white mb-1">3. Estimated Monthly Investment</h4>
                <p className="text-xs text-gray-400 font-mono-tech">Choose your target scale to receive an optimized roadmap.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BUDGET_TIERS.map((tier) => {
                  const isSelected = selectedBudget === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedBudget(tier.id)}
                      className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#00F0FF]/15 border-[#00F0FF] text-white shadow-lg shadow-[#00F0FF]/20"
                          : "bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      <span className={`text-xs sm:text-sm font-bold mb-1 ${isSelected ? "text-[#00F0FF]" : "text-white"}`}>
                        {tier.label}
                      </span>
                      <span className="text-[11px] text-gray-400 font-mono-tech">{tier.desc}</span>
                    </button>
                  );
                })}
              </div>

              {/* Ready Proposal Notice */}
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2.5 text-xs text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Your project brief is ready! Tapping the button below will immediately open WhatsApp with Shreyansh Malpani with your structured project details.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between shrink-0">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
              className="px-4 py-2 rounded-full text-xs font-mono-tech text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3)}
              className="clay-btn flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF5E00] to-[#FFAE33] text-white font-bold text-xs sm:text-sm shadow-lg"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleLaunchWhatsApp}
              className="clay-btn flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-xs sm:text-sm shadow-lg hover:scale-102 transition-transform"
            >
              <Send className="w-4 h-4" />
              <span>Send Scope on WhatsApp</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
