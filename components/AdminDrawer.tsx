"use client";

import React, { useState } from "react";
import { CompleteSiteData } from "@/types/content";
import { updateSiteContent } from "@/lib/data/content-service";
import { X, Save, CheckCircle, AlertCircle, Sparkles, RefreshCw } from "lucide-react";

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  siteData: CompleteSiteData;
  onDataUpdated: (newData: CompleteSiteData) => void;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
  siteData,
  onDataUpdated,
}) => {
  const [formData, setFormData] = useState<CompleteSiteData>(siteData);
  const [activeTab, setActiveTab] = useState<"general" | "hero" | "marketing" | "tech">("general");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSave = async () => {
    setStatus("saving");
    setErrorMessage("");

    try {
      const res = await updateSiteContent(formData);
      if (res.success) {
        setStatus("success");
        onDataUpdated(formData);
        setTimeout(() => setStatus("idle"), 2500);
      } else {
        setStatus("error");
        setErrorMessage(res.error || "Failed to save to Supabase.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network or Supabase error occurred.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#0F0F16] border-l border-white/15 h-full flex flex-col shadow-2xl text-white">
        {/* Drawer Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#14141E]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4FF00]" />
            <div>
              <h3 className="font-syne font-bold text-lg">Dynamic CMS &amp; Live Studio</h3>
              <p className="text-[11px] font-mono-tech text-gray-400">Zero Hardcoding • Supabase Integrated</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 px-5 bg-[#0C0C12] overflow-x-auto text-xs font-mono-tech">
          {[
            { id: "general", label: "🏢 Business Info" },
            { id: "hero", label: "⚡ Hero & Copy" },
            { id: "marketing", label: "📈 Marketing Services" },
            { id: "tech", label: "💻 Shrey Tech Services" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-3 px-4 border-b-2 font-bold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "border-[#FF5E00] text-[#FFAE33]"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === "general" && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-mono-tech uppercase text-gray-400 block mb-1">Company Name</label>
                <input
                  type="text"
                  value={formData.config.companyName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      config: { ...formData.config, companyName: e.target.value },
                    })
                  }
                  className="w-full bg-[#181824] border border-white/10 rounded-xl p-3 text-white"
                />
              </div>

              <div>
                <label className="font-mono-tech uppercase text-gray-400 block mb-1">Founder / Head Name</label>
                <input
                  type="text"
                  value={formData.config.founderName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      config: { ...formData.config, founderName: e.target.value },
                    })
                  }
                  className="w-full bg-[#181824] border border-white/10 rounded-xl p-3 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono-tech uppercase text-gray-400 block mb-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={formData.config.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        config: {
                          ...formData.config,
                          phone: e.target.value,
                          whatsapp: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-[#181824] border border-white/10 rounded-xl p-3 text-white"
                  />
                </div>
                <div>
                  <label className="font-mono-tech uppercase text-gray-400 block mb-1">Experience Years</label>
                  <input
                    type="text"
                    value={formData.config.experienceYears}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        config: { ...formData.config, experienceYears: e.target.value },
                      })
                    }
                    className="w-full bg-[#181824] border border-white/10 rounded-xl p-3 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono-tech uppercase text-gray-400 block mb-1">Full Office Address</label>
                <textarea
                  rows={2}
                  value={formData.config.officeAddress.fullAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      config: {
                        ...formData.config,
                        officeAddress: {
                          ...formData.config.officeAddress,
                          fullAddress: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full bg-[#181824] border border-white/10 rounded-xl p-3 text-white"
                />
              </div>

              <div className="space-y-3 pt-3 border-t border-white/10">
                <h4 className="font-mono-tech text-gray-300 font-bold uppercase">Social Media URLs</h4>
                <div>
                  <label className="font-mono-tech text-[10px] text-gray-400 block mb-1">Shrey Media Instagram</label>
                  <input
                    type="text"
                    value={formData.config.socials.shreyMediaInstagram}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        config: {
                          ...formData.config,
                          socials: {
                            ...formData.config.socials,
                            shreyMediaInstagram: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full bg-[#181824] border border-white/10 rounded-xl p-2.5 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="font-mono-tech text-[10px] text-gray-400 block mb-1">Shrey Tech Instagram</label>
                  <input
                    type="text"
                    value={formData.config.socials.shreyTechInstagram}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        config: {
                          ...formData.config,
                          socials: {
                            ...formData.config.socials,
                            shreyTechInstagram: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full bg-[#181824] border border-white/10 rounded-xl p-2.5 text-white text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "hero" && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-mono-tech uppercase text-gray-400 block mb-1">Eyebrow Tagline</label>
                <input
                  type="text"
                  value={formData.hero.eyebrow}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, eyebrow: e.target.value },
                    })
                  }
                  className="w-full bg-[#181824] border border-white/10 rounded-xl p-3 text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-mono-tech uppercase text-gray-400 block mb-1">Main Headline</label>
                  <input
                    type="text"
                    value={formData.hero.headlineMain}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, headlineMain: e.target.value },
                      })
                    }
                    className="w-full bg-[#181824] border border-white/10 rounded-xl p-3 text-white"
                  />
                </div>
                <div>
                  <label className="font-mono-tech uppercase text-[#FF5E00] block mb-1">Accent Word</label>
                  <input
                    type="text"
                    value={formData.hero.headlineAccent}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, headlineAccent: e.target.value },
                      })
                    }
                    className="w-full bg-[#181824] border border-[#FF5E00]/40 rounded-xl p-3 text-white"
                  />
                </div>
                <div>
                  <label className="font-mono-tech uppercase text-gray-400 block mb-1">Suffix</label>
                  <input
                    type="text"
                    value={formData.hero.headlineSuffix}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, headlineSuffix: e.target.value },
                      })
                    }
                    className="w-full bg-[#181824] border border-white/10 rounded-xl p-3 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono-tech uppercase text-gray-400 block mb-1">Subheadline Description</label>
                <textarea
                  rows={3}
                  value={formData.hero.subheadline}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, subheadline: e.target.value },
                    })
                  }
                  className="w-full bg-[#181824] border border-white/10 rounded-xl p-3 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono-tech uppercase text-gray-400 block mb-1">Primary CTA Text</label>
                  <input
                    type="text"
                    value={formData.hero.primaryCtaText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, primaryCtaText: e.target.value },
                      })
                    }
                    className="w-full bg-[#181824] border border-white/10 rounded-xl p-3 text-white"
                  />
                </div>
                <div>
                  <label className="font-mono-tech uppercase text-gray-400 block mb-1">Secondary CTA Text</label>
                  <input
                    type="text"
                    value={formData.hero.secondaryCtaText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, secondaryCtaText: e.target.value },
                      })
                    }
                    className="w-full bg-[#181824] border border-white/10 rounded-xl p-3 text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "marketing" && (
            <div className="space-y-4">
              <p className="text-xs text-gray-400">Edit titles and descriptions for the 8 Digital Marketing services.</p>
              {formData.marketingServices.map((service, idx) => (
                <div key={service.id} className="p-4 rounded-2xl bg-[#141420] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tech text-[10px] text-[#FF5E00] font-bold">Service #{idx + 1}</span>
                    <input
                      type="text"
                      value={service.badge || ""}
                      placeholder="Badge"
                      onChange={(e) => {
                        const updated = [...formData.marketingServices];
                        updated[idx].badge = e.target.value;
                        setFormData({ ...formData, marketingServices: updated });
                      }}
                      className="bg-black/50 border border-white/10 rounded px-2 py-0.5 text-[10px] text-white w-28"
                    />
                  </div>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => {
                      const updated = [...formData.marketingServices];
                      updated[idx].title = e.target.value;
                      setFormData({ ...formData, marketingServices: updated });
                    }}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs font-bold text-white"
                  />
                  <textarea
                    rows={2}
                    value={service.shortDesc}
                    onChange={(e) => {
                      const updated = [...formData.marketingServices];
                      updated[idx].shortDesc = e.target.value;
                      setFormData({ ...formData, marketingServices: updated });
                    }}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-[11px] text-gray-300"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === "tech" && (
            <div className="space-y-4">
              <p className="text-xs text-gray-400">Edit titles and descriptions for the 6 Shrey Tech Solutions services.</p>
              {formData.techServices.map((service, idx) => (
                <div key={service.id} className="p-4 rounded-2xl bg-[#141420] border border-white/10 space-y-2">
                  <span className="font-mono-tech text-[10px] text-[#00F0FF] font-bold">Tech Service #{idx + 1}</span>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => {
                      const updated = [...formData.techServices];
                      updated[idx].title = e.target.value;
                      setFormData({ ...formData, techServices: updated });
                    }}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs font-bold text-white"
                  />
                  <textarea
                    rows={2}
                    value={service.shortDesc}
                    onChange={(e) => {
                      const updated = [...formData.techServices];
                      updated[idx].shortDesc = e.target.value;
                      setFormData({ ...formData, techServices: updated });
                    }}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-[11px] text-gray-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer with Save Action */}
        <div className="p-5 border-t border-white/10 bg-[#14141E] flex items-center justify-between">
          <div className="flex items-center gap-2">
            {status === "saving" && (
              <span className="text-xs font-mono-tech text-yellow-400 flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Saving...
              </span>
            )}
            {status === "success" && (
              <span className="text-xs font-mono-tech text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Saved Live!
              </span>
            )}
            {status === "error" && (
              <span className="text-xs font-mono-tech text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {errorMessage}
              </span>
            )}
          </div>

          <button
            onClick={handleSave}
            disabled={status === "saving"}
            className="clay-btn flex items-center gap-2 bg-gradient-to-r from-[#FF5E00] to-[#FFAE33] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full"
          >
            <Save className="w-4 h-4" />
            <span>Save &amp; Publish Live</span>
          </button>
        </div>
      </div>
    </div>
  );
};
