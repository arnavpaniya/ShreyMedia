"use client";

import React, { useState, useEffect, useRef } from "react";
import { SiteConfig } from "@/types/content";
import { 
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
  Zap,
  AlertCircle,
  ExternalLink,
  Sparkles
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
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("jewellery");
  const [selectedServices, setSelectedServices] = useState<string[]>(["reels", "ads"]);
  const [selectedBudget, setSelectedBudget] = useState<string>("growth");
  const [brandName, setBrandName] = useState<string>("");
  const [contactPerson, setContactPerson] = useState<string>("");
  const [honeypot, setHoneypot] = useState<string>(""); // Anti-spam honeypot field
  const mountTimeRef = useRef<number>(0);
  
  // Validation state
  const [errors, setErrors] = useState<{ contactPerson?: string; brandName?: string; services?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whatsappUrlGenerated, setWhatsappUrlGenerated] = useState<string>("");

  const modalRef = useRef<HTMLDivElement>(null);

  // Keyboard accessibility: Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      mountTimeRef.current = Date.now();
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validateStep1 = () => {
    // Spam protection: if honeypot is filled, reject
    if (honeypot.trim()) {
      return false;
    }

    const newErrors: { contactPerson?: string; brandName?: string } = {};
    if (!contactPerson.trim()) {
      newErrors.contactPerson = "Please enter your name";
    } else if (contactPerson.trim().length < 2) {
      newErrors.contactPerson = "Name must be at least 2 characters";
    }

    if (!brandName.trim()) {
      newErrors.brandName = "Please enter your brand or company name";
    } else if (brandName.trim().length < 2) {
      newErrors.brandName = "Brand name must be at least 2 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    if (selectedServices.length === 0) {
      setErrors({ services: "Please select at least one service module" });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!validateStep1()) return;
      setStep(2);
    } else if (step === 2) {
      if (!validateStep2()) return;
      setStep(3);
    }
  };

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: undefined }));
    }
  };

  const handleLaunchWhatsApp = () => {
    // Anti-spam checks: Honeypot & bot speed check (< 800ms)
    if (honeypot.trim() || (mountTimeRef.current && Date.now() - mountTimeRef.current < 800)) {
      onClose();
      return;
    }

    setIsSubmitting(true);
    const industryObj = INDUSTRIES.find((i) => i.id === selectedIndustry);
    const budgetObj = BUDGET_TIERS.find((b) => b.id === selectedBudget);
    const servicesNames = selectedServices
      .map((s) => SERVICE_OPTIONS.find((opt) => opt.id === s)?.label)
      .filter(Boolean)
      .join("\n• ");

    const formattedMessage = encodeURIComponent(
      `⚡ *PROJECT INQUIRY VIA SHREY MEDIA PROPOSAL BUILDER*\n\n` +
      `👤 *Name:* ${contactPerson.trim()}\n` +
      `🏢 *Brand/Company:* ${brandName.trim()}\n` +
      `🎯 *Industry:* ${industryObj?.label || "General"}\n` +
      `💰 *Estimated Budget:* ${budgetObj?.label || "Flexible"}\n\n` +
      `🛠️ *Requested Services:*\n• ${servicesNames}\n\n` +
      `📍 *Location:* Jaipur / Remote\n\n` +
      `Hi Shreyansh! I built this project scope on your website and would like to discuss next steps & campaign execution.`
    );

    const whatsappNumber = config.phone.replace(/[^0-9]/g, "");
    const targetUrl = `https://wa.me/${whatsappNumber}?text=${formattedMessage}`;
    setWhatsappUrlGenerated(targetUrl);
    setStep(4);

    // Automatically trigger WhatsApp tab with a gentle timeout
    setTimeout(() => {
      window.open(targetUrl, "_blank");
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="proposal-modal-title"
    >
      <div 
        ref={modalRef}
        className="clay-card relative w-full max-w-2xl bg-[#0C0C14] border border-white/15 rounded-3xl p-4 sm:p-6 sm:p-8 shadow-2xl overflow-hidden text-white max-h-[92vh] flex flex-col"
      >
        {/* Glow Accent */}
        <div className="ocarina-watercolor-bloom absolute -top-24 -right-24 w-80 h-80 bg-[#FF5E00]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="ocarina-watercolor-bloom absolute -bottom-24 -left-24 w-80 h-80 bg-[#00F0FF]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF5E00] to-[#FFAE33] flex items-center justify-center text-white shadow-lg shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 id="proposal-modal-title" className="font-syne font-bold text-sm sm:text-lg text-white truncate">
                Interactive Scope Builder
              </h3>
              <p className="text-[10px] sm:text-[11px] font-mono-tech text-gray-400">
                {step <= 3 ? `Step ${step} of 3 • Custom Proposal Generator` : "Proposal Ready"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="min-w-[40px] min-h-[40px] rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors active:scale-95 shrink-0 focus-visible:ring-2 focus-visible:ring-[#FF5E00]"
            aria-label="Close Proposal Builder"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar (visible during steps 1-3) */}
        {step <= 3 && (
          <div className="w-full bg-white/5 h-1.5 rounded-full my-3 sm:my-4 overflow-hidden shrink-0">
            <div 
              className="bg-gradient-to-r from-[#FF5E00] via-[#FFAE33] to-[#00F0FF] h-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Body / Scrollable Content */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 sm:space-y-6 py-1 sm:py-2 no-scrollbar">
          {/* STEP 1: Industry & Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-syne font-bold text-sm sm:text-base text-white mb-1">
                  1. Select Your Industry / Niche
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-400 font-mono-tech">
                  We tailor creative assets and ad strategy specifically for your business domain.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                {INDUSTRIES.map((ind) => {
                  const Icon = ind.icon;
                  const isSelected = selectedIndustry === ind.id;
                  return (
                    <button
                      key={ind.id}
                      type="button"
                      onClick={() => setSelectedIndustry(ind.id)}
                      className={`min-h-[52px] p-2.5 sm:p-3 rounded-2xl border text-left transition-all flex flex-col gap-1.5 sm:gap-2 active:scale-98 ${
                        isSelected
                          ? "bg-[#FF5E00]/15 border-[#FF5E00] text-white shadow-md shadow-[#FF5E00]/20"
                          : "bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.08]"
                      }`}
                    >
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${isSelected ? "text-[#FF5E00]" : "text-gray-400"}`} />
                      <span className="text-[11px] sm:text-xs font-bold leading-tight">{ind.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Hidden Honeypot Anti-Spam Field */}
              <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
                <label htmlFor="website_hp">Leave empty</label>
                <input
                  id="website_hp"
                  type="text"
                  name="website_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                <div>
                  <label htmlFor="proposal-name" className="text-[10px] sm:text-[11px] font-mono-tech text-gray-300 block mb-1">
                    Your Name <span className="text-[#FF5E00]">*</span>
                  </label>
                  <input
                    id="proposal-name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={contactPerson}
                    onChange={(e) => {
                      setContactPerson(e.target.value);
                      if (errors.contactPerson) setErrors((prev) => ({ ...prev, contactPerson: undefined }));
                    }}
                    className={`w-full bg-black/40 border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors ${
                      errors.contactPerson ? "border-red-500 bg-red-500/10" : "border-white/15 focus:border-[#FF5E00]"
                    }`}
                  />
                  {errors.contactPerson && (
                    <div className="flex items-center gap-1 text-[11px] text-red-400 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.contactPerson}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="proposal-brand" className="text-[10px] sm:text-[11px] font-mono-tech text-gray-300 block mb-1">
                    Brand / Company Name <span className="text-[#FF5E00]">*</span>
                  </label>
                  <input
                    id="proposal-brand"
                    type="text"
                    required
                    placeholder="e.g. Royal Jewels Jaipur"
                    value={brandName}
                    onChange={(e) => {
                      setBrandName(e.target.value);
                      if (errors.brandName) setErrors((prev) => ({ ...prev, brandName: undefined }));
                    }}
                    className={`w-full bg-black/40 border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors ${
                      errors.brandName ? "border-red-500 bg-red-500/10" : "border-white/15 focus:border-[#FF5E00]"
                    }`}
                  />
                  {errors.brandName && (
                    <div className="flex items-center gap-1 text-[11px] text-red-400 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.brandName}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Services Required */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-syne font-bold text-sm sm:text-base text-white mb-1">
                  2. What capabilities do you need?
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-400 font-mono-tech">
                  Select one or more growth and technology modules.
                </p>
              </div>

              {errors.services && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-300">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errors.services}</span>
                </div>
              )}

              <div className="space-y-2">
                {SERVICE_OPTIONS.map((srv) => {
                  const Icon = srv.icon;
                  const isSelected = selectedServices.includes(srv.id);
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => toggleService(srv.id)}
                      className={`w-full min-h-[48px] p-2.5 sm:p-3 rounded-2xl border text-left transition-all flex items-center justify-between active:scale-98 ${
                        isSelected
                          ? "bg-gradient-to-r from-[#FF5E00]/20 to-transparent border-[#FF5E00] text-white"
                          : "bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
                        <div className={`p-2 rounded-xl shrink-0 ${isSelected ? "bg-[#FF5E00] text-white" : "bg-white/10 text-gray-400"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold truncate">{srv.label}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border shrink-0 flex items-center justify-center ${isSelected ? "border-[#FF5E00] bg-[#FF5E00] text-white" : "border-white/20"}`}>
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
                <h4 className="font-syne font-bold text-sm sm:text-base text-white mb-1">
                  3. Estimated Monthly Investment
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-400 font-mono-tech">
                  Choose your target scale to receive an optimized roadmap.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {BUDGET_TIERS.map((tier) => {
                  const isSelected = selectedBudget === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedBudget(tier.id)}
                      className={`min-h-[56px] p-3 sm:p-4 rounded-2xl border text-left transition-all flex flex-col justify-between active:scale-98 ${
                        isSelected
                          ? "bg-[#00F0FF]/15 border-[#00F0FF] text-white shadow-lg shadow-[#00F0FF]/20"
                          : "bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      <span className={`text-xs sm:text-sm font-bold mb-0.5 sm:mb-1 ${isSelected ? "text-[#00F0FF]" : "text-white"}`}>
                        {tier.label}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-gray-400 font-mono-tech">{tier.desc}</span>
                    </button>
                  );
                })}
              </div>

              {/* Ready Proposal Notice */}
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2.5 text-xs text-emerald-300 leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Your project brief for <strong className="text-white">{brandName || "your brand"}</strong> is ready! Tapping the button below will immediately open WhatsApp with Shreyansh Malpani.
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: Submission Feedback Confirmation */}
          {step === 4 && (
            <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>

              <div className="space-y-2">
                <h4 className="font-syne font-extrabold text-xl sm:text-2xl text-white">
                  Proposal Scope Generated!
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  We are opening WhatsApp with <strong className="text-white">Shreyansh Malpani</strong> to review your brief for <strong className="text-[#FFAE33]">{brandName}</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 max-w-md mx-auto text-left text-xs font-mono-tech space-y-1.5 text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-400">Client Name:</span>
                  <span className="text-white font-bold">{contactPerson}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Brand Name:</span>
                  <span className="text-white font-bold">{brandName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Services:</span>
                  <span className="text-[#00F0FF]">{selectedServices.length} Selected</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={whatsappUrlGenerated}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-btn min-h-[46px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-xs sm:text-sm shadow-lg active:scale-98"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Click Here If WhatsApp Didn&apos;t Open</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[46px] w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-medium transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons (Steps 1 to 3) */}
        {step <= 3 && (
          <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between shrink-0 gap-2">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                className="min-h-[44px] px-4 py-2 rounded-full text-xs font-mono-tech text-gray-400 hover:text-white hover:bg-white/10 transition-colors flex items-center"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="clay-btn min-h-[44px] flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF5E00] to-[#FFAE33] text-white font-bold text-xs sm:text-sm shadow-lg active:scale-98"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleLaunchWhatsApp}
                disabled={isSubmitting}
                className="clay-btn min-h-[44px] flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-xs sm:text-sm shadow-lg active:scale-98 transition-transform disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Generating Scope..." : "Send Scope on WhatsApp"}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
