"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CaseStudyItem, SiteConfig } from "@/types/content";
import { ArrowUpRight, CheckCircle2, Bookmark, Sparkles } from "lucide-react";

interface CaseStudiesJournalProps {
  caseStudies: CaseStudyItem[];
  config: SiteConfig;
}

export const CaseStudiesJournal: React.FC<CaseStudiesJournalProps> = ({ caseStudies, config }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const filterOptions = ["All", "Jewellery", "Dental Clinic", "Clothing & Fashion"];

  const filteredStudies =
    selectedFilter === "All"
      ? caseStudies
      : caseStudies.filter((cs) => cs.industry.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <section id="journal" className="py-20 relative bg-[#0B0B0F] overflow-hidden">
      {/* Ocarina subtle ambient lighting */}
      <div className="ocarina-watercolor-bloom absolute top-10 right-1/4 w-96 h-96 bg-[#7928CA]/15 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full mb-3">
              <Bookmark className="w-3.5 h-3.5 text-[#D4FF00]" />
              <span className="text-xs font-mono-tech uppercase text-gray-300">
                Verified Client Journal • 3+ Years Record
              </span>
            </div>
            <h2 className="font-syne text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Case Studies &amp; Growth Logs
            </h2>
          </div>

          {/* Filter Toolbar inspired by nodebmsit.live */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelectedFilter(opt)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium font-mono-tech transition-all shrink-0 ${
                  selectedFilter === opt
                    ? "bg-[#D4FF00] text-black font-bold shadow-md"
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Entries Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredStudies.map((cs) => (
            <div
              key={cs.id}
              className="clay-card rounded-3xl p-6 border border-white/10 flex flex-col justify-between group hover:border-white/25 transition-all duration-300 relative"
            >
              {/* Paper Washi Tape in corner */}
              <div className="absolute -top-3 left-8 bg-[#FFF5E4] text-black text-[11px] font-hand font-bold px-4 py-0.5 rounded shadow-md rotate-[-2deg] z-20">
                {cs.industry} Log 📌
              </div>

              <div>
                {/* Visual Image Header */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-white/10 bg-[#181822]">
                  <Image
                    src={cs.image}
                    alt={cs.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Division Badge */}
                  <div className="absolute bottom-3 left-3">
                    <span className="font-mono-tech text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#D4FF00] border border-white/15">
                      {cs.division === "marketing" ? "Shrey Media Campaign" : "Shrey Tech System"}
                    </span>
                  </div>
                </div>

                {/* Client & Title */}
                <span className="text-xs font-mono-tech text-gray-400 block mb-1">
                  Client: <strong className="text-white">{cs.clientName}</strong>
                </span>
                <h3 className="font-syne font-bold text-lg text-white mb-3 leading-snug group-hover:text-[#FFAE33] transition-colors">
                  {cs.title}
                </h3>

                {/* Challenge & Solution */}
                <div className="space-y-2 mb-5 text-xs text-gray-300">
                  <p>
                    <span className="text-red-400 font-bold font-mono-tech">Problem: </span>
                    {cs.challenge}
                  </p>
                  <p>
                    <span className="text-emerald-400 font-bold font-mono-tech">Solution: </span>
                    {cs.solution}
                  </p>
                </div>

                {/* Verified Metrics Chips */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white/[0.03] border border-white/5 mb-5">
                  {cs.metrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <span className="font-syne font-bold text-sm sm:text-base text-[#D4FF00] block">
                        {m.value}
                      </span>
                      <span className="text-[9px] font-mono-tech text-gray-400 leading-tight block">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Handwritten Note Accent */}
                {cs.handwrittenNote && (
                  <div className="p-3 rounded-xl bg-[#FFF5E4]/5 border border-[#FFAE33]/30 mb-5 relative">
                    <span className="font-hand text-base text-[#FFAE33] leading-tight block">
                      &ldquo;{cs.handwrittenNote}&rdquo;
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Tags & Strategy Call Trigger */}
              <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono-tech text-gray-400 bg-white/5 px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <a
                  href={`https://wa.me/91${config.phone}?text=Hi%20Shreyansh,%20I%20read%20the%20${cs.clientName}%20case%20study%20and%20want%20similar%20growth.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-[#FF5E00] text-gray-300 hover:text-white transition-colors"
                  title="Inquire about this strategy"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
