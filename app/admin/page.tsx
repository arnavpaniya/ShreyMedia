"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CompleteSiteData, ServiceItem, IndustryItem, CaseStudyItem, TestimonialItem } from "@/types/content";
import { initialSiteData } from "@/lib/data/initial-content";
import { getSiteContent, updateSiteContent } from "@/lib/data/content-service";
import { 
  ShieldLock, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ArrowLeft, 
  Sparkles, 
  Database, 
  Building2, 
  Megaphone, 
  Terminal, 
  Gem, 
  FileText, 
  Bot, 
  Search,
  Plus,
  Trash2,
  Lock,
  UserCheck,
  Film,
  MessageSquare,
  Flame,
  Zap
} from "lucide-react";

type AdminTab = 
  | "business" 
  | "hero" 
  | "about" 
  | "production" 
  | "marketing" 
  | "tech" 
  | "industries" 
  | "testimonials" 
  | "caseStudies" 
  | "outro" 
  | "offer" 
  | "bots" 
  | "seo";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  const [siteData, setSiteData] = useState<CompleteSiteData>(initialSiteData);
  const [activeTab, setActiveTab] = useState<AdminTab>("business");

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    // Check local session authentication
    const authStatus = sessionStorage.getItem("shrey_admin_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }

    async function load() {
      const data = await getSiteContent();
      setSiteData(data);
    }
    load();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "9001" || pinInput === "admin2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("shrey_admin_auth", "true");
      setPinError("");
    } else {
      setPinError("Invalid Admin PIN. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("shrey_admin_auth");
  };

  const handleSaveToSupabase = async () => {
    setSaveStatus("saving");
    setStatusMessage("");

    try {
      const res = await updateSiteContent(siteData);
      if (res.success) {
        setSaveStatus("success");
        setStatusMessage("All changes successfully published live to Supabase!");
        setTimeout(() => setSaveStatus("idle"), 3500);
      } else {
        setSaveStatus("error");
        setStatusMessage(res.error || "Failed to save data to Supabase.");
      }
    } catch {
      setSaveStatus("error");
      setStatusMessage("Failed to connect to Supabase.");
    }
  };

  const handleResetDefaults = () => {
    if (confirm("Are you sure you want to reset all content back to verified defaults?")) {
      setSiteData(initialSiteData);
    }
  };

  // PIN Access Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#07070A] flex items-center justify-center p-4 relative overflow-hidden text-white selection:bg-[#FF5E00]">
        <div className="ocarina-watercolor-bloom absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF5E00]/20 -z-10" />

        <div className="clay-card w-full max-w-md p-8 rounded-3xl border border-white/15 shadow-2xl bg-[#0E0E16]/90 backdrop-blur-2xl text-center">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-amber-500/40 mx-auto mb-4 shadow-[0_0_20px_rgba(255,94,0,0.4)]">
            <Image src="/brand/logo.png" alt="Shrey Media Logo" fill className="object-cover" />
          </div>

          <h1 className="font-syne font-black text-2xl text-white mb-1">
            SHREY ADMIN STUDIO
          </h1>
          <p className="text-xs font-mono-tech text-gray-400 mb-6">
            Private Dynamic Content &amp; Database Control Panel
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-left">
              <label className="text-[11px] font-mono-tech text-gray-300 block mb-1.5 uppercase">
                Enter Master Security PIN
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="••••"
                  autoFocus
                  className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-center text-xl tracking-widest font-mono text-white focus:outline-none focus:border-[#FF5E00]"
                />
                <Lock className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {pinError && (
              <p className="text-xs font-mono-tech text-red-400 flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {pinError}
              </p>
            )}

            <button
              type="submit"
              className="clay-btn w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF5E00] to-[#FFAE33] text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2"
            >
              <ShieldLock className="w-4 h-4" />
              <span>Unlock Admin Studio</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10">
            <Link
              href="/"
              className="text-xs text-gray-400 hover:text-white inline-flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07070A] text-white flex flex-col selection:bg-[#FF5E00]">
      {/* Admin Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-xs font-mono-tech text-gray-400 hover:text-white bg-white/5 border border-white/10 px-3 py-1.5 rounded-full transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Link>

          <div className="flex items-center gap-2 border-l border-white/10 pl-4">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-amber-500 relative">
              <Image src="/brand/logo.png" alt="Shrey Media Logo" fill className="object-cover" />
            </div>
            <div>
              <h2 className="font-syne font-bold text-sm leading-tight text-white">Shrey Admin Studio</h2>
              <span className="text-[10px] font-mono-tech text-[#00F0FF] flex items-center gap-1">
                <Database className="w-2.5 h-2.5" /> Supabase Synchronized
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDefaults}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-tech text-gray-400 hover:text-white bg-white/5 border border-white/10 transition-colors"
            title="Reset form to initial verified data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleSaveToSupabase}
            disabled={saveStatus === "saving"}
            className="clay-btn flex items-center gap-2 bg-gradient-to-r from-[#FF5E00] to-[#FFAE33] text-white font-bold text-xs sm:text-sm px-5 py-2 rounded-full shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>{saveStatus === "saving" ? "Publishing..." : "Save Live"}</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-full text-xs font-mono-tech text-red-400 hover:text-white hover:bg-red-500/20 border border-red-500/30 transition-colors"
          >
            Lock
          </button>
        </div>
      </header>

      {/* Status Alert Banner */}
      {statusMessage && (
        <div className={`px-6 py-2.5 text-xs font-mono-tech flex items-center justify-between ${
          saveStatus === "success" ? "bg-emerald-500/20 text-emerald-300 border-b border-emerald-500/30" : "bg-red-500/20 text-red-300 border-b border-red-500/30"
        }`}>
          <div className="flex items-center gap-2">
            {saveStatus === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
            <span>{statusMessage}</span>
          </div>
          <button onClick={() => setStatusMessage("")} className="hover:opacity-75">✕</button>
        </div>
      )}

      {/* Main Admin Content Layout */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side Navigation Tabs */}
        <div className="lg:col-span-3 space-y-1.5">
          <span className="text-[10px] font-mono-tech text-gray-500 uppercase px-3 block mb-2 font-bold">
            DYNAMIC MODULES
          </span>

          {[
            { id: "business", label: "🏢 Business Info & HQ", icon: Building2 },
            { id: "hero", label: "⚡ Hero & Headlines", icon: Sparkles },
            { id: "about", label: "👤 About & Founder", icon: UserCheck },
            { id: "production", label: "🎬 In-House Production", icon: Film },
            { id: "marketing", label: "📈 Marketing Services (8)", icon: Megaphone },
            { id: "tech", label: "💻 Shrey Tech Stack (6)", icon: Terminal },
            { id: "industries", label: "🎯 Industries & Niches", icon: Gem },
            { id: "testimonials", label: "⭐ Client Testimonials", icon: MessageSquare },
            { id: "caseStudies", label: "📑 Client Journal & Logs", icon: FileText },
            { id: "outro", label: "⚡ Circuit Laser Outro", icon: Zap },
            { id: "offer", label: "🔥 Instagram Pop-up Offer", icon: Flame },
            { id: "bots", label: "🤖 Interactive 3D Bot", icon: Bot },
            { id: "seo", label: "🔍 Jaipur SEO & Meta", icon: Search },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-mono-tech font-bold transition-all text-left ${
                  isActive
                    ? "bg-[#FF5E00] text-white shadow-lg"
                    : "bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Tab Editor Panels */}
        <div className="lg:col-span-9 clay-card p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#0C0C14]">
          {/* TAB 1: Business Info */}
          {activeTab === "business" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-syne font-bold text-xl text-white">Business Information &amp; Contact</h3>
                <p className="text-xs text-gray-400 font-mono-tech">Edit core agency credentials and contact handles.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Company Name</label>
                  <input
                    type="text"
                    value={siteData.config.companyName}
                    onChange={(e) => setSiteData({ ...siteData, config: { ...siteData.config, companyName: e.target.value } })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-[#FF5E00] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Founder / Head</label>
                  <input
                    type="text"
                    value={siteData.config.founderName}
                    onChange={(e) => setSiteData({ ...siteData, config: { ...siteData.config, founderName: e.target.value } })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-[#FF5E00] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Phone / WhatsApp (+91)</label>
                  <input
                    type="text"
                    value={siteData.config.phone}
                    onChange={(e) => setSiteData({ ...siteData, config: { ...siteData.config, phone: e.target.value, whatsapp: e.target.value } })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-[#FF5E00] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Contact Email</label>
                  <input
                    type="email"
                    value={siteData.config.email}
                    onChange={(e) => setSiteData({ ...siteData, config: { ...siteData.config, email: e.target.value } })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-[#FF5E00] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono-tech text-xs text-gray-400 block mb-1.5 uppercase">Office Address (Film Colony HQ)</label>
                <textarea
                  rows={2}
                  value={siteData.config.officeAddress.fullAddress}
                  onChange={(e) => setSiteData({ ...siteData, config: { ...siteData.config, officeAddress: { ...siteData.config.officeAddress, fullAddress: e.target.value } } })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-xs focus:border-[#FF5E00] focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <h4 className="font-mono-tech text-xs text-gray-300 font-bold uppercase">Official Social Links</h4>
                <div className="grid grid-cols-1 gap-3 text-xs">
                  <div>
                    <label className="font-mono-tech text-[10px] text-gray-400 block mb-1">Shrey Media Instagram</label>
                    <input
                      type="text"
                      value={siteData.config.socials.shreyMediaInstagram}
                      onChange={(e) => setSiteData({ ...siteData, config: { ...siteData.config, socials: { ...siteData.config.socials, shreyMediaInstagram: e.target.value } } })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="font-mono-tech text-[10px] text-gray-400 block mb-1">Shrey Tech Instagram</label>
                    <input
                      type="text"
                      value={siteData.config.socials.shreyTechInstagram}
                      onChange={(e) => setSiteData({ ...siteData, config: { ...siteData.config, socials: { ...siteData.config.socials, shreyTechInstagram: e.target.value } } })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="font-mono-tech text-[10px] text-gray-400 block mb-1">Founder Instagram</label>
                    <input
                      type="text"
                      value={siteData.config.socials.founderInstagram}
                      onChange={(e) => setSiteData({ ...siteData, config: { ...siteData.config, socials: { ...siteData.config.socials, founderInstagram: e.target.value } } })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Hero & Headlines */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-syne font-bold text-xl text-white">Hero Section &amp; Headlines</h3>
                <p className="text-xs text-gray-400 font-mono-tech">Control the main conversion message, rotating keywords, and CTAs.</p>
              </div>

              <div className="text-xs space-y-4">
                <div>
                  <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Eyebrow Tagline</label>
                  <input
                    type="text"
                    value={siteData.hero.eyebrow}
                    onChange={(e) => setSiteData({ ...siteData, hero: { ...siteData.hero, eyebrow: e.target.value } })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Headline Main</label>
                    <input
                      type="text"
                      value={siteData.hero.headlineMain}
                      onChange={(e) => setSiteData({ ...siteData, hero: { ...siteData.hero, headlineMain: e.target.value } })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="font-mono-tech text-[#FF5E00] block mb-1.5 uppercase font-bold">Accent Word (Italic)</label>
                    <input
                      type="text"
                      value={siteData.hero.headlineAccent}
                      onChange={(e) => setSiteData({ ...siteData, hero: { ...siteData.hero, headlineAccent: e.target.value } })}
                      className="w-full bg-black/40 border border-[#FF5E00]/40 rounded-xl p-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Suffix</label>
                    <input
                      type="text"
                      value={siteData.hero.headlineSuffix}
                      onChange={(e) => setSiteData({ ...siteData, hero: { ...siteData.hero, headlineSuffix: e.target.value } })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Subheadline Copy</label>
                  <textarea
                    rows={3}
                    value={siteData.hero.subheadline}
                    onChange={(e) => setSiteData({ ...siteData, hero: { ...siteData.hero, subheadline: e.target.value } })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Typewriter Rotating Keywords (Comma separated)</label>
                  <input
                    type="text"
                    value={(siteData.hero.typewriterKeywords || []).join(", ")}
                    onChange={(e) => setSiteData({
                      ...siteData,
                      hero: {
                        ...siteData.hero,
                        typewriterKeywords: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                      }
                    })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white font-mono-tech"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Primary CTA Text</label>
                    <input
                      type="text"
                      value={siteData.hero.primaryCtaText}
                      onChange={(e) => setSiteData({ ...siteData, hero: { ...siteData.hero, primaryCtaText: e.target.value } })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Secondary CTA Text</label>
                    <input
                      type="text"
                      value={siteData.hero.secondaryCtaText}
                      onChange={(e) => setSiteData({ ...siteData, hero: { ...siteData.hero, secondaryCtaText: e.target.value } })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: About & Founder */}
          {activeTab === "about" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-syne font-bold text-xl text-white">About The Agency &amp; Founder</h3>
                <p className="text-xs text-gray-400 font-mono-tech">Edit founder narrative, experience stats, and industry tags.</p>
              </div>

              <div className="text-xs space-y-4">
                <div>
                  <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Eyebrow Tagline</label>
                  <input
                    type="text"
                    value={siteData.about.eyebrow}
                    onChange={(e) => setSiteData({ ...siteData, about: { ...siteData.about, eyebrow: e.target.value } })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white"
                  />
                </div>

                <div>
                  <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Headline</label>
                  <input
                    type="text"
                    value={siteData.about.headline}
                    onChange={(e) => setSiteData({ ...siteData, about: { ...siteData.about, headline: e.target.value } })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white"
                  />
                </div>

                <div>
                  <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Bio Paragraph 1</label>
                  <textarea
                    rows={3}
                    value={siteData.about.bioParagraph1}
                    onChange={(e) => setSiteData({ ...siteData, about: { ...siteData.about, bioParagraph1: e.target.value } })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Bio Paragraph 2</label>
                  <textarea
                    rows={3}
                    value={siteData.about.bioParagraph2}
                    onChange={(e) => setSiteData({ ...siteData, about: { ...siteData.about, bioParagraph2: e.target.value } })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-xs"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Experience Stat</label>
                    <input
                      type="text"
                      value={siteData.about.experienceYears}
                      onChange={(e) => setSiteData({ ...siteData, about: { ...siteData.about, experienceYears: e.target.value } })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Businesses Scaled</label>
                    <input
                      type="text"
                      value={siteData.about.businessesScaled}
                      onChange={(e) => setSiteData({ ...siteData, about: { ...siteData.about, businessesScaled: e.target.value } })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Location Badge</label>
                    <input
                      type="text"
                      value={siteData.about.locationBadge}
                      onChange={(e) => setSiteData({ ...siteData, about: { ...siteData.about, locationBadge: e.target.value } })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Industries List (Comma-separated pills)</label>
                  <textarea
                    rows={3}
                    value={siteData.about.industriesList.join(", ")}
                    onChange={(e) => setSiteData({
                      ...siteData,
                      about: {
                        ...siteData.about,
                        industriesList: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                      }
                    })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-xs font-mono-tech"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: In-House Creative Production */}
          {activeTab === "production" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-syne font-bold text-xl text-white">In-House Creative Studio &amp; Reels</h3>
                <p className="text-xs text-gray-400 font-mono-tech">Edit studio copywriting and manage carousel reels.</p>
              </div>

              <div className="text-xs space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Eyebrow</label>
                    <input
                      type="text"
                      value={siteData.production.eyebrow}
                      onChange={(e) => setSiteData({ ...siteData, production: { ...siteData.production, eyebrow: e.target.value } })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Headline Main</label>
                    <input
                      type="text"
                      value={siteData.production.headlineMain}
                      onChange={(e) => setSiteData({ ...siteData, production: { ...siteData.production, headlineMain: e.target.value } })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="font-mono-tech text-[#FF5E00] block mb-1.5 uppercase font-bold">Accent</label>
                    <input
                      type="text"
                      value={siteData.production.headlineAccent}
                      onChange={(e) => setSiteData({ ...siteData, production: { ...siteData.production, headlineAccent: e.target.value } })}
                      className="w-full bg-black/40 border border-[#FF5E00]/40 rounded-xl p-2.5 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Handwritten Note</label>
                  <input
                    type="text"
                    value={siteData.production.handwrittenNote}
                    onChange={(e) => setSiteData({ ...siteData, production: { ...siteData.production, handwrittenNote: e.target.value } })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white font-hand text-base"
                  />
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-mono-tech text-xs text-white font-bold uppercase">Showcase Items ({siteData.production.creativeReels.length})</h4>
                    <button
                      onClick={() => {
                        const newId = Date.now();
                        setSiteData({
                          ...siteData,
                          production: {
                            ...siteData.production,
                            creativeReels: [
                              ...siteData.production.creativeReels,
                              {
                                id: newId,
                                type: "video",
                                title: "New Campaign Showcase",
                                niche: "Luxury Jewellery",
                                duration: "0:20",
                                image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
                                videoUrl: "",
                                websiteUrl: "",
                                stats: "100K Views • 5x ROAS"
                              }
                            ]
                          }
                        });
                      }}
                      className="clay-btn px-3 py-1.5 rounded-lg bg-[#FF5E00] text-white text-xs flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Showcase Item
                    </button>
                  </div>

                  <div className="space-y-3">
                    {siteData.production.creativeReels.map((reel, idx) => (
                      <div key={reel.id} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-mono-tech text-[10px] text-[#FFAE33] font-bold">Item #{idx + 1}</span>
                            <select
                              value={reel.type || "video"}
                              onChange={(e) => {
                                const updated = [...siteData.production.creativeReels];
                                updated[idx].type = e.target.value as "video" | "image" | "website";
                                setSiteData({ ...siteData, production: { ...siteData.production, creativeReels: updated } });
                              }}
                              className="bg-black/80 border border-white/20 rounded px-2 py-0.5 text-[11px] text-white font-mono-tech"
                            >
                              <option value="video">🎥 Video / Reel Clip</option>
                              <option value="image">📸 Image / Photoshoot</option>
                              <option value="website">💻 Live Website / App</option>
                            </select>
                          </div>
                          <button
                            onClick={() => {
                              const updated = siteData.production.creativeReels.filter((_, i) => i !== idx);
                              setSiteData({ ...siteData, production: { ...siteData.production, creativeReels: updated } });
                            }}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={reel.title}
                            placeholder="Title (e.g. Royal Polki Shoot / D2C Store)"
                            onChange={(e) => {
                              const updated = [...siteData.production.creativeReels];
                              updated[idx].title = e.target.value;
                              setSiteData({ ...siteData, production: { ...siteData.production, creativeReels: updated } });
                            }}
                            className="bg-black/60 border border-white/10 rounded p-2 text-xs text-white sm:col-span-2"
                          />
                          <input
                            type="text"
                            value={reel.niche}
                            placeholder="Niche (e.g. Jewellery / Fashion)"
                            onChange={(e) => {
                              const updated = [...siteData.production.creativeReels];
                              updated[idx].niche = e.target.value;
                              setSiteData({ ...siteData, production: { ...siteData.production, creativeReels: updated } });
                            }}
                            className="bg-black/60 border border-white/10 rounded p-2 text-xs text-white"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] font-mono-tech text-gray-400 block mb-1">Image / Thumbnail URL</label>
                            <input
                              type="text"
                              value={reel.image}
                              placeholder="https://... image thumbnail"
                              onChange={(e) => {
                                const updated = [...siteData.production.creativeReels];
                                updated[idx].image = e.target.value;
                                setSiteData({ ...siteData, production: { ...siteData.production, creativeReels: updated } });
                              }}
                              className="w-full bg-black/60 border border-white/10 rounded p-2 text-xs text-white"
                            />
                          </div>

                          {(reel.type === "video" || !reel.type) && (
                            <div>
                              <label className="text-[10px] font-mono-tech text-[#FF1493] block mb-1">Video MP4 / Reel URL</label>
                              <input
                                type="text"
                                value={reel.videoUrl || ""}
                                placeholder="https://... mp4 or video link"
                                onChange={(e) => {
                                  const updated = [...siteData.production.creativeReels];
                                  updated[idx].videoUrl = e.target.value;
                                  setSiteData({ ...siteData, production: { ...siteData.production, creativeReels: updated } });
                                }}
                                className="w-full bg-black/60 border border-white/10 rounded p-2 text-xs text-white"
                              />
                            </div>
                          )}

                          {reel.type === "website" && (
                            <div>
                              <label className="text-[10px] font-mono-tech text-[#00F0FF] block mb-1">Live Website URL</label>
                              <input
                                type="text"
                                value={reel.websiteUrl || ""}
                                placeholder="https://example.com"
                                onChange={(e) => {
                                  const updated = [...siteData.production.creativeReels];
                                  updated[idx].websiteUrl = e.target.value;
                                  setSiteData({ ...siteData, production: { ...siteData.production, creativeReels: updated } });
                                }}
                                className="w-full bg-black/60 border border-white/10 rounded p-2 text-xs text-white"
                              />
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={reel.stats}
                            placeholder="Stats / Results (e.g. 500K Views • 14x ROAS)"
                            onChange={(e) => {
                              const updated = [...siteData.production.creativeReels];
                              updated[idx].stats = e.target.value;
                              setSiteData({ ...siteData, production: { ...siteData.production, creativeReels: updated } });
                            }}
                            className="bg-black/60 border border-white/10 rounded p-2 text-xs text-[#D4FF00]"
                          />
                          <input
                            type="text"
                            value={reel.duration || ""}
                            placeholder="Duration or Label (e.g. 0:24 / Live Web App)"
                            onChange={(e) => {
                              const updated = [...siteData.production.creativeReels];
                              updated[idx].duration = e.target.value;
                              setSiteData({ ...siteData, production: { ...siteData.production, creativeReels: updated } });
                            }}
                            className="bg-black/60 border border-white/10 rounded p-2 text-xs text-gray-300"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Marketing Services */}
          {activeTab === "marketing" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-syne font-bold text-xl text-white">Digital Marketing Services</h3>
                <p className="text-xs text-gray-400 font-mono-tech">Manage all 8 Shrey Media marketing services.</p>
              </div>

              <div className="space-y-4">
                {siteData.marketingServices.map((svc, idx) => (
                  <div key={svc.id} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tech text-[10px] text-[#FF5E00] font-bold">Marketing Service #{idx + 1}</span>
                      <input
                        type="text"
                        value={svc.badge || ""}
                        placeholder="Badge (e.g. High ROAS)"
                        onChange={(e) => {
                          const updated = [...siteData.marketingServices];
                          updated[idx].badge = e.target.value;
                          setSiteData({ ...siteData, marketingServices: updated });
                        }}
                        className="bg-black/60 border border-white/10 rounded px-2.5 py-1 text-[11px] text-white w-36"
                      />
                    </div>
                    <input
                      type="text"
                      value={svc.title}
                      onChange={(e) => {
                        const updated = [...siteData.marketingServices];
                        updated[idx].title = e.target.value;
                        setSiteData({ ...siteData, marketingServices: updated });
                      }}
                      className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-xs font-bold text-white"
                    />
                    <textarea
                      rows={2}
                      value={svc.shortDesc}
                      onChange={(e) => {
                        const updated = [...siteData.marketingServices];
                        updated[idx].shortDesc = e.target.value;
                        setSiteData({ ...siteData, marketingServices: updated });
                      }}
                      className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-xs text-gray-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Shrey Tech Services */}
          {activeTab === "tech" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-syne font-bold text-xl text-white">Shrey Tech Solutions Services</h3>
                <p className="text-xs text-gray-400 font-mono-tech">Manage all 6 software, CRM &amp; automation services.</p>
              </div>

              <div className="space-y-4">
                {siteData.techServices.map((svc, idx) => (
                  <div key={svc.id} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tech text-[10px] text-[#00F0FF] font-bold">Tech Service #{idx + 1}</span>
                      <input
                        type="text"
                        value={svc.badge || ""}
                        placeholder="Badge (e.g. Ultra Fast)"
                        onChange={(e) => {
                          const updated = [...siteData.techServices];
                          updated[idx].badge = e.target.value;
                          setSiteData({ ...siteData, techServices: updated });
                        }}
                        className="bg-black/60 border border-white/10 rounded px-2.5 py-1 text-[11px] text-white w-36"
                      />
                    </div>
                    <input
                      type="text"
                      value={svc.title}
                      onChange={(e) => {
                        const updated = [...siteData.techServices];
                        updated[idx].title = e.target.value;
                        setSiteData({ ...siteData, techServices: updated });
                      }}
                      className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-xs font-bold text-white"
                    />
                    <textarea
                      rows={2}
                      value={svc.shortDesc}
                      onChange={(e) => {
                        const updated = [...siteData.techServices];
                        updated[idx].shortDesc = e.target.value;
                        setSiteData({ ...siteData, techServices: updated });
                      }}
                      className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-xs text-gray-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: Industries */}
          {activeTab === "industries" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-syne font-bold text-xl text-white">Targeted Industry Playbooks</h3>
                <p className="text-xs text-gray-400 font-mono-tech">Edit industry growth formulas and descriptions.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {siteData.industries.map((ind, idx) => (
                  <div key={ind.id} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                    <input
                      type="text"
                      value={ind.name}
                      onChange={(e) => {
                        const updated = [...siteData.industries];
                        updated[idx].name = e.target.value;
                        setSiteData({ ...siteData, industries: updated });
                      }}
                      className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-xs font-bold text-white"
                    />
                    <input
                      type="text"
                      value={ind.tagline}
                      onChange={(e) => {
                        const updated = [...siteData.industries];
                        updated[idx].tagline = e.target.value;
                        setSiteData({ ...siteData, industries: updated });
                      }}
                      className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-[11px] text-[#D4FF00]"
                    />
                    <textarea
                      rows={2}
                      value={ind.growthAngle}
                      placeholder="Growth formula"
                      onChange={(e) => {
                        const updated = [...siteData.industries];
                        updated[idx].growthAngle = e.target.value;
                        setSiteData({ ...siteData, industries: updated });
                      }}
                      className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-[11px] text-gray-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: Testimonials */}
          {activeTab === "testimonials" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-syne font-bold text-xl text-white">Client Reviews &amp; Testimonials</h3>
                  <p className="text-xs text-gray-400 font-mono-tech">Manage verified reviews from Jaipur founders.</p>
                </div>
                <button
                  onClick={() => {
                    const newId = `test-${Date.now()}`;
                    setSiteData({
                      ...siteData,
                      testimonials: [
                        ...siteData.testimonials,
                        {
                          id: newId,
                          name: "New Client",
                          role: "Founder",
                          business: "Jaipur Brand",
                          location: "Jaipur, Rajasthan",
                          quote: "Shrey Media transformed our digital marketing and lead generation results.",
                          rating: 5,
                          verified: true
                        }
                      ]
                    });
                  }}
                  className="clay-btn px-3 py-1.5 rounded-lg bg-[#FF5E00] text-white text-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Review
                </button>
              </div>

              <div className="space-y-4">
                {siteData.testimonials.map((t, idx) => (
                  <div key={t.id} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tech text-[10px] text-[#D4FF00] font-bold">Review #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const updated = siteData.testimonials.filter((_, i) => i !== idx);
                          setSiteData({ ...siteData, testimonials: updated });
                        }}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <input
                        type="text"
                        value={t.name}
                        placeholder="Client Name"
                        onChange={(e) => {
                          const updated = [...siteData.testimonials];
                          updated[idx].name = e.target.value;
                          setSiteData({ ...siteData, testimonials: updated });
                        }}
                        className="bg-black/60 border border-white/10 rounded p-2 text-xs text-white"
                      />
                      <input
                        type="text"
                        value={t.business}
                        placeholder="Business / Company"
                        onChange={(e) => {
                          const updated = [...siteData.testimonials];
                          updated[idx].business = e.target.value;
                          setSiteData({ ...siteData, testimonials: updated });
                        }}
                        className="bg-black/60 border border-white/10 rounded p-2 text-xs text-white"
                      />
                      <input
                        type="text"
                        value={t.role}
                        placeholder="Role / Title"
                        onChange={(e) => {
                          const updated = [...siteData.testimonials];
                          updated[idx].role = e.target.value;
                          setSiteData({ ...siteData, testimonials: updated });
                        }}
                        className="bg-black/60 border border-white/10 rounded p-2 text-xs text-white"
                      />
                      <input
                        type="text"
                        value={t.location}
                        placeholder="Location (e.g. Jaipur)"
                        onChange={(e) => {
                          const updated = [...siteData.testimonials];
                          updated[idx].location = e.target.value;
                          setSiteData({ ...siteData, testimonials: updated });
                        }}
                        className="bg-black/60 border border-white/10 rounded p-2 text-xs text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          value={t.avatar || ""}
                          placeholder="Avatar / Photo URL (https://...)"
                          onChange={(e) => {
                            const updated = [...siteData.testimonials];
                            updated[idx].avatar = e.target.value;
                            setSiteData({ ...siteData, testimonials: updated });
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded p-2 text-xs text-white"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <label className="text-[11px] font-mono-tech text-gray-400">Stars:</label>
                          <select
                            value={t.rating}
                            onChange={(e) => {
                              const updated = [...siteData.testimonials];
                              updated[idx].rating = parseInt(e.target.value, 10);
                              setSiteData({ ...siteData, testimonials: updated });
                            }}
                            className="bg-black/80 border border-white/20 rounded px-2 py-1 text-xs text-[#FFAE33]"
                          >
                            <option value={5}>★★★★★ (5 Stars)</option>
                            <option value={4}>★★★★☆ (4 Stars)</option>
                            <option value={3}>★★★☆☆ (3 Stars)</option>
                          </select>
                        </div>
                        <label className="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={t.verified}
                            onChange={(e) => {
                              const updated = [...siteData.testimonials];
                              updated[idx].verified = e.target.checked;
                              setSiteData({ ...siteData, testimonials: updated });
                            }}
                            className="rounded accent-[#00F0FF]"
                          />
                          <span className="text-[10px] font-mono-tech">Verified</span>
                        </label>
                      </div>
                    </div>

                    <textarea
                      rows={2}
                      value={t.quote}
                      placeholder="Quote review..."
                      onChange={(e) => {
                        const updated = [...siteData.testimonials];
                        updated[idx].quote = e.target.value;
                        setSiteData({ ...siteData, testimonials: updated });
                      }}
                      className="w-full bg-black/60 border border-white/10 rounded p-2 text-xs text-gray-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: Case Studies */}
          {activeTab === "caseStudies" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-syne font-bold text-xl text-white">Case Studies &amp; Client Logs</h3>
                <p className="text-xs text-gray-400 font-mono-tech">Manage client growth logs and verified results.</p>
              </div>

              <div className="space-y-4">
                {siteData.caseStudies.map((cs, idx) => (
                  <div key={cs.id} className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="font-mono-tech text-[10px] text-gray-400 block mb-1">Client Name</label>
                        <input
                          type="text"
                          value={cs.clientName}
                          onChange={(e) => {
                            const updated = [...siteData.caseStudies];
                            updated[idx].clientName = e.target.value;
                            setSiteData({ ...siteData, caseStudies: updated });
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-xs font-bold text-white"
                        />
                      </div>
                      <div>
                        <label className="font-mono-tech text-[10px] text-gray-400 block mb-1">Industry</label>
                        <input
                          type="text"
                          value={cs.industry}
                          onChange={(e) => {
                            const updated = [...siteData.caseStudies];
                            updated[idx].industry = e.target.value;
                            setSiteData({ ...siteData, caseStudies: updated });
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-mono-tech text-[10px] text-gray-400 block mb-1">Title</label>
                      <input
                        type="text"
                        value={cs.title}
                        onChange={(e) => {
                          const updated = [...siteData.caseStudies];
                          updated[idx].title = e.target.value;
                          setSiteData({ ...siteData, caseStudies: updated });
                        }}
                        className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: Circuit Outro */}
          {activeTab === "outro" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-syne font-bold text-xl text-white">Circuit Logo Outro Section</h3>
                <p className="text-xs text-gray-400 font-mono-tech">Edit bottom laser nodes and marketing pipeline keywords.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Top Tagline</label>
                  <input
                    type="text"
                    value={siteData.outro.topTagline}
                    onChange={(e) => setSiteData({ ...siteData, outro: { ...siteData.outro, topTagline: e.target.value } })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white"
                  />
                </div>

                <div>
                  <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Pipeline Keywords (Comma separated)</label>
                  <input
                    type="text"
                    value={siteData.outro.pipelineKeywords.join(", ")}
                    onChange={(e) => setSiteData({
                      ...siteData,
                      outro: {
                        ...siteData.outro,
                        pipelineKeywords: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                      }
                    })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white font-mono-tech"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Left Annotation</label>
                    <textarea
                      rows={2}
                      value={siteData.outro.leftAnnotation}
                      onChange={(e) => setSiteData({ ...siteData, outro: { ...siteData.outro, leftAnnotation: e.target.value } })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Right Annotation</label>
                    <textarea
                      rows={2}
                      value={siteData.outro.rightAnnotation}
                      onChange={(e) => setSiteData({ ...siteData, outro: { ...siteData.outro, rightAnnotation: e.target.value } })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">CTA Button Text</label>
                    <input
                      type="text"
                      value={siteData.outro.primaryCtaText}
                      onChange={(e) => setSiteData({ ...siteData, outro: { ...siteData.outro, primaryCtaText: e.target.value } })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Instagram Handle Button</label>
                    <input
                      type="text"
                      value={siteData.outro.instagramHandleText}
                      onChange={(e) => setSiteData({ ...siteData, outro: { ...siteData.outro, instagramHandleText: e.target.value } })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: Instagram Pop-up Offer */}
          {activeTab === "offer" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-syne font-bold text-xl text-white">Instagram Promotion Pop-up Modal</h3>
                  <p className="text-xs text-gray-400 font-mono-tech">Easily add, customize, or completely remove the promotional pop-up on the main website.</p>
                </div>

                {/* Main Toggle Button */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSiteData({ ...siteData, offer: { ...siteData.offer, enabled: !siteData.offer.enabled } })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold font-mono-tech flex items-center gap-2 transition-all ${
                      siteData.offer.enabled
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30"
                        : "bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${siteData.offer.enabled ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`} />
                    <span>{siteData.offer.enabled ? "ACTIVE (Showing on Website)" : "DISABLED (Hidden from Website)"}</span>
                  </button>
                </div>
              </div>

              {/* Status Alert & Quick Action Bar */}
              <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                siteData.offer.enabled ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-200" : "bg-red-950/20 border-red-500/30 text-red-200"
              }`}>
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{siteData.offer.enabled ? "🟢" : "🔴"}</span>
                  <div>
                    <strong className="block font-syne">{siteData.offer.enabled ? "Pop-up Offer is Currently Live" : "Pop-up Offer is Currently Disabled"}</strong>
                    <span className="text-[11px] opacity-80">{siteData.offer.enabled ? "Visitors will see this promotion after 2.8 seconds on the site." : "No pop-up will appear for visitors on the website."}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {siteData.offer.enabled ? (
                    <button
                      onClick={() => {
                        setSiteData({ ...siteData, offer: { ...siteData.offer, enabled: false } });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-red-500/30 hover:bg-red-500/50 text-red-100 font-mono-tech text-[11px] font-bold transition-colors border border-red-500/40"
                    >
                      ✕ Remove Offer from Site
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSiteData({ ...siteData, offer: { ...siteData.offer, enabled: true } });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/30 hover:bg-emerald-500/50 text-emerald-100 font-mono-tech text-[11px] font-bold transition-colors border border-emerald-500/40"
                    >
                      ✓ Activate Offer
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Presets */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <span className="text-[10px] font-mono-tech uppercase text-gray-400 font-bold block">Quick Presets</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setSiteData({
                        ...siteData,
                        offer: {
                          enabled: true,
                          accountHandle: "shrey_media_2025",
                          locationTag: "Jaipur, Rajasthan",
                          imageUrl: "/images/diwali-offer.png",
                          whatsappDmMessage: "Hi Shreyansh! I saw your Diwali Special Offer Instagram post and want to claim 1 of the 5 slots for my business."
                        }
                      });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-xs text-white border border-white/10 flex items-center gap-1.5 transition-colors"
                  >
                    <span>🪔</span>
                    <span>Load Diwali Festival Offer Preset</span>
                  </button>

                  <button
                    onClick={() => {
                      setSiteData({
                        ...siteData,
                        offer: {
                          enabled: true,
                          accountHandle: "shrey_media_2025",
                          locationTag: "Jaipur HQ • Film Colony",
                          imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
                          whatsappDmMessage: "Hi Shreyansh, I want to book a Free 30-Min Marketing Strategy Audit for my brand in Jaipur."
                        }
                      });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-xs text-white border border-white/10 flex items-center gap-1.5 transition-colors"
                  >
                    <span>🎯</span>
                    <span>Load Free Strategy Audit Preset</span>
                  </button>

                  <button
                    onClick={() => {
                      setSiteData({
                        ...siteData,
                        offer: {
                          enabled: false,
                          accountHandle: "shrey_media_2025",
                          locationTag: "Jaipur, Rajasthan",
                          imageUrl: "",
                          whatsappDmMessage: ""
                        }
                      });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs text-red-300 border border-red-500/20 flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All &amp; Disable</span>
                  </button>
                </div>
              </div>

              {/* Form & Live Visual Preview Side-by-Side */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Form Fields (7 cols) */}
                <div className="lg:col-span-7 space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Instagram Profile Handle</label>
                      <input
                        type="text"
                        value={siteData.offer.accountHandle}
                        onChange={(e) => setSiteData({ ...siteData, offer: { ...siteData.offer, accountHandle: e.target.value } })}
                        placeholder="shrey_media_2025"
                        className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white font-mono-tech"
                      />
                    </div>
                    <div>
                      <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Location Tag</label>
                      <input
                        type="text"
                        value={siteData.offer.locationTag}
                        onChange={(e) => setSiteData({ ...siteData, offer: { ...siteData.offer, locationTag: e.target.value } })}
                        placeholder="Jaipur, Rajasthan"
                        className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white font-mono-tech"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Offer Poster Image URL</label>
                    <input
                      type="text"
                      value={siteData.offer.imageUrl}
                      onChange={(e) => setSiteData({ ...siteData, offer: { ...siteData.offer, imageUrl: e.target.value } })}
                      placeholder="/images/diwali-offer.png or https://..."
                      className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white font-mono-tech"
                    />
                  </div>

                  <div>
                    <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">WhatsApp Direct Inquiry Message</label>
                    <textarea
                      rows={3}
                      value={siteData.offer.whatsappDmMessage}
                      onChange={(e) => setSiteData({ ...siteData, offer: { ...siteData.offer, whatsappDmMessage: e.target.value } })}
                      placeholder="Hi Shreyansh, I saw your special offer..."
                      className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white text-xs"
                    />
                  </div>
                </div>

                {/* Live Preview (5 cols) */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <span className="text-[10px] font-mono-tech uppercase text-gray-400 mb-2 font-bold">Live Visual Preview</span>
                  <div className="w-full max-w-[260px] rounded-2xl overflow-hidden bg-white text-black shadow-2xl border border-gray-300">
                    <div className="p-2.5 bg-white flex items-center justify-between border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden bg-amber-500 relative border">
                          <Image src="/brand/logo.png" alt="Logo" fill className="object-cover" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold block leading-none">{siteData.offer.accountHandle || "account"}</span>
                          <span className="text-[9px] text-gray-500 leading-none">{siteData.offer.locationTag || "Jaipur"}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-blue-600 font-bold">Follow</span>
                    </div>

                    <div className="relative w-full aspect-[4/5] bg-black flex items-center justify-center">
                      {siteData.offer.imageUrl ? (
                        <Image
                          src={siteData.offer.imageUrl}
                          alt="Preview"
                          fill
                          unoptimized={true}
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-gray-500 text-xs font-mono">No Image Set</span>
                      )}
                    </div>

                    <div className="p-2 bg-white flex items-center justify-between border-t border-gray-100 text-xs">
                      <span>❤️ 💬 ↗</span>
                      <span>🔖</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: 3D Bots */}
          {activeTab === "bots" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-syne font-bold text-xl text-white">Interactive Assistant Prompts</h3>
                <p className="text-xs text-gray-400 font-mono-tech">Configure speech bubble prompts for the interactive bots.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Growth Bot Name</label>
                  <input
                    type="text"
                    value={siteData.bots.marketingBotName}
                    onChange={(e) => setSiteData({ ...siteData, bots: { ...siteData.bots, marketingBotName: e.target.value } })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white"
                  />
                </div>

                <div>
                  <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Tech Bot Name</label>
                  <input
                    type="text"
                    value={siteData.bots.techBotName}
                    onChange={(e) => setSiteData({ ...siteData, bots: { ...siteData.bots, techBotName: e.target.value } })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white"
                  />
                </div>

                <div>
                  <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">WhatsApp Quick Greeting</label>
                  <input
                    type="text"
                    value={siteData.bots.whatsappBotGreeting}
                    onChange={(e) => setSiteData({ ...siteData, bots: { ...siteData.bots, whatsappBotGreeting: e.target.value } })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 13: SEO */}
          {activeTab === "seo" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-syne font-bold text-xl text-white">Jaipur Local SEO &amp; Meta Settings</h3>
                <p className="text-xs text-gray-400 font-mono-tech">Configure page title, meta description, and keywords.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Primary Keyword</label>
                  <input
                    type="text"
                    value={siteData.config.seo.primaryKeyword}
                    onChange={(e) => setSiteData({ ...siteData, config: { ...siteData.config, seo: { ...siteData.config.seo, primaryKeyword: e.target.value } } })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white"
                  />
                </div>

                <div>
                  <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Suggested Homepage Title</label>
                  <input
                    type="text"
                    value={siteData.config.seo.suggestedTitle}
                    onChange={(e) => setSiteData({ ...siteData, config: { ...siteData.config, seo: { ...siteData.config.seo, suggestedTitle: e.target.value } } })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white"
                  />
                </div>

                <div>
                  <label className="font-mono-tech text-gray-400 block mb-1.5 uppercase">Meta Description</label>
                  <textarea
                    rows={3}
                    value={siteData.config.seo.suggestedMetaDescription}
                    onChange={(e) => setSiteData({ ...siteData, config: { ...siteData.config, seo: { ...siteData.config.seo, suggestedMetaDescription: e.target.value } } })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-xs"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
