"use client";

import React from "react";
import Image from "next/image";
import { TestimonialItem } from "@/types/content";
import { Star, CheckCircle2, Quote, Sparkles } from "lucide-react";

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-20 relative bg-[#09090D] overflow-hidden border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="ocarina-watercolor-bloom absolute top-1/2 right-1/4 w-96 h-96 bg-[#FF5E00]/15 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#D4FF00]/10 border border-[#D4FF00]/30 px-3.5 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span className="text-xs font-mono-tech uppercase text-[#D4FF00] font-semibold">
              Client Feedback • 100+ Brands Scaled
            </span>
          </div>
          <h2 className="font-syne text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Trusted by Jaipur Businesses
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Real feedback from founders who scaled customer acquisition with our marketing and technology.
          </p>
        </div>

        {/* 3-Column Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="clay-card p-6 rounded-3xl border border-white/15 bg-[#0E0E16]/90 backdrop-blur-xl flex flex-col justify-between group hover:border-[#FF5E00]/40 transition-all duration-300 relative shadow-xl"
            >
              {/* Paper Clip in corner */}
              <div className="absolute -top-3 right-6 bg-[#FFF5E4] text-black text-[10px] font-hand font-bold px-3 py-0.5 rounded shadow rotate-[4deg]">
                Verified Client 📎
              </div>

              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFAE33] text-[#FFAE33]" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6 font-sans italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Details */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/20 shrink-0">
                  <Image
                    src={t.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-syne font-bold text-sm text-white">{t.name}</h4>
                    {t.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF]" />}
                  </div>
                  <span className="text-[11px] font-mono-tech text-gray-400 block">
                    {t.role}, {t.business}
                  </span>
                  <span className="text-[10px] font-mono-tech text-[#FFAE33] block">
                    📍 {t.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
