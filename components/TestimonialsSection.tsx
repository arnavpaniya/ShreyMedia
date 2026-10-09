"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TestimonialItem } from "@/types/content";
import { 
  Star, 
  CheckCircle2, 
  Sparkles, 
  Quote, 
  X, 
  ZoomIn 
} from "lucide-react";

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const [activeProofModal, setActiveProofModal] = useState<TestimonialItem | null>(null);

  // Keyboard accessibility: Escape key to close proof modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeProofModal) {
        setActiveProofModal(null);
      }
    };
    if (activeProofModal) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeProofModal]);

  return (
    <section id="testimonials" className="py-16 sm:py-24 relative bg-transparent overflow-hidden">
      {/* Background ambient lighting */}
      <div className="ocarina-watercolor-bloom absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#FF5E00]/15 -z-10" />
      <div className="ocarina-watercolor-bloom absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#00F0FF]/15 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-[#D4FF00]/10 border border-[#D4FF00]/30 px-3.5 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span className="text-xs font-mono-tech uppercase text-[#D4FF00] font-semibold tracking-wider">
              Client Feedback • 100+ Brands Scaled
            </span>
          </div>
          <h2 className="font-syne text-2xl min-[360px]:text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Real Proof From Real Founders
          </h2>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
            Genuine testimonials and direct client reviews across Etsy management, Google Business Profiles, and growth campaigns.
          </p>
        </div>

        {/* 4-Item Responsive Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="clay-card p-5 sm:p-6 rounded-3xl border border-white/15 bg-[#0E0E16]/90 backdrop-blur-xl flex flex-col justify-between group hover:border-[#FF5E00]/50 transition-all duration-300 relative shadow-xl overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5E00] to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header: Service Tag & Verified Badge */}
                <div className="flex items-center justify-between mb-4 gap-2">
                  <span className="text-[10px] font-mono-tech uppercase font-semibold text-[#FFAE33] bg-[#FFAE33]/10 border border-[#FFAE33]/25 px-2.5 py-0.5 rounded-full truncate">
                    {t.serviceTag || "Client Review"}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-mono-tech text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified</span>
                  </div>
                </div>

                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-3.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FFAE33] text-[#FFAE33]" />
                  ))}
                </div>

                {/* Quote Text */}
                <div className="relative mb-6">
                  <Quote className="w-5 h-5 text-white/10 absolute -top-2 -left-1 pointer-events-none" />
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-sans italic relative z-10 pl-2">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Author Footer & Card Proof Trigger */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0 bg-black/60">
                    <Image
                      src={t.avatar || "/brand/logo.png"}
                      alt={`${t.name} - Testimonial`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-syne font-bold text-xs sm:text-sm text-white truncate">
                      {t.name}
                    </h4>
                    <span className="text-[10px] font-mono-tech text-gray-400 block truncate">
                      {t.business}
                    </span>
                    <span className="text-[9px] font-mono-tech text-[#00F0FF] block truncate">
                      📍 {t.location}
                    </span>
                  </div>
                </div>

                {t.proofImage && (
                  <button
                    type="button"
                    onClick={() => setActiveProofModal(t)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-[#FF5E00]/20 text-gray-300 hover:text-white border border-white/10 transition-colors shrink-0 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#FF5E00]"
                    title="View Original Review Card"
                    aria-label={`View ${t.name} review card`}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Proof Lightbox Modal */}
      {activeProofModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setActiveProofModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Client Testimonial Proof"
        >
          <div 
            className="relative w-full max-w-lg bg-[#0C0C14] border border-white/20 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div>
                <h3 className="font-syne font-bold text-sm sm:text-base text-white">
                  {activeProofModal.name} • Review Proof
                </h3>
                <span className="text-[11px] font-mono-tech text-gray-400">
                  {activeProofModal.business} • {activeProofModal.serviceTag}
                </span>
              </div>
              <button
                onClick={() => setActiveProofModal(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative w-full aspect-square sm:aspect-[4/5] rounded-2xl overflow-hidden bg-black/80 border border-white/10">
              <Image
                src={activeProofModal.proofImage || ""}
                alt={`${activeProofModal.name} Testimonial Proof Card`}
                fill
                quality={100}
                unoptimized={true}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
