"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CompleteSiteData, ServiceItem, IndustryItem, CaseStudyItem } from "@/types/content";
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
  Globe, 
  Building2, 
  Megaphone, 
  Terminal, 
  Gem, 
  FileText, 
  Bot, 
  Search,
  Plus,
  Trash2,
  Lock
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  const [siteData, setSiteData] = useState<CompleteSiteData>(initialSiteData);
  const [activeTab, setActiveTab] = useState<
    "business" | "hero" | "marketing" | "tech" | "industries" | "caseStudies" | "bots" | "seo"
  >("business");

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
    // Default master PIN for Shrey Media Admin (matches founder contact prefix / secure key)
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
        setTimeout(() => setSaveStatus("idle"), 3000);
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
            Private Content &amp; Database Control Panel
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
                <Database className="w-2.5 h-2.5" /> Supabase Connected
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
          <span>{statusMessage}</span>
          <button onClick={() => setStatusMessage("")} className="hover:opacity-75">✕</button>
        </div>
      )}

      {/* Main Admin Content Layout */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side Navigation Tabs */}
        <div className="lg:col-span-3 space-y-1.5">
          <span className="text-[10px] font-mono-tech text-gray-500 uppercase px-3 block mb-2 font-bold">
            CONTENT MODULES
          </span>

          {[
            { id: "business", label: "🏢 Business Info & HQ", icon: Building2 },
            { id: "hero", label: "⚡ Hero & Copywriting", icon: Sparkles },
            { id: "marketing", label: "📈 Marketing Services (8)", icon: Megaphone },
            { id: "tech", label: "💻 Shrey Tech Stack (6)", icon: Terminal },
            { id: "industries", label: "🎯 Industry Playbooks (10)", icon: Gem },
            { id: "caseStudies", label: "📑 Client Journal & Logs", icon: FileText },
            { id: "bots", label: "🤖 3D Bot & Prompts", icon: Bot },
            { id: "seo", label: "🔍 Jaipur SEO & Meta", icon: Search },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-mono-tech font-bold transition-all text-left ${
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

          {/* TAB 2: Hero & Copywriting */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-syne font-bold text-xl text-white">Hero Section &amp; Headlines</h3>
                <p className="text-xs text-gray-400 font-mono-tech">Control the main conversion message and dynamic rotating words.</p>
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

          {/* TAB 3: Marketing Services */}
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
                      <span className="font-mono-tech text-[10px] text-[#FF5E00] font-bold">Service #{idx + 1}</span>
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

          {/* TAB 4: Shrey Tech Services */}
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

          {/* TAB 5: Industries */}
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

          {/* TAB 6: Case Studies */}
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

          {/* TAB 7: 3D Bots */}
          {activeTab === "bots" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-syne font-bold text-xl text-white">Interactive 3D Assistant Prompts</h3>
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

          {/* TAB 8: SEO */}
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
