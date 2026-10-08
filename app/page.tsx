"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CompleteSiteData } from "@/types/content";
import { initialSiteData } from "@/lib/data/initial-content";
import { getSiteContent } from "@/lib/data/content-service";

import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { EcosystemSwitcher } from "@/components/EcosystemSwitcher";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { ProductionShowcase } from "@/components/ProductionShowcase";
import { AboutFounderSection } from "@/components/AboutFounderSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { OutroLaserSection } from "@/components/OutroLaserSection";
import { Footer } from "@/components/Footer";
import { Interactive3DBot } from "@/components/Interactive3DBot";

// Performance Optimization: Lazy-load below-the-fold interactive components
const AnimatedOfficeMap = dynamic(
  () => import("@/components/AnimatedOfficeMap").then((mod) => mod.AnimatedOfficeMap),
  { ssr: false }
);

const InstagramOfferModal = dynamic(
  () => import("@/components/InstagramOfferModal").then((mod) => mod.InstagramOfferModal),
  { ssr: false }
);

const ProposalBuilderModal = dynamic(
  () => import("@/components/ProposalBuilderModal").then((mod) => mod.ProposalBuilderModal),
  { ssr: false }
);

export default function HomePage() {
  const [siteData, setSiteData] = useState<CompleteSiteData>(initialSiteData);
  const [activeDivision, setActiveDivision] = useState<"marketing" | "tech">("marketing");
  const [isProposalOpen, setIsProposalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const data = await getSiteContent();
      setSiteData(data);
    }
    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-[#07070A] text-white flex flex-col relative selection:bg-[#FF5E00] selection:text-white">
      {/* 1. Header Navigation with Live Jaipur Status */}
      <Navbar 
        config={siteData.config} 
        onOpenProposal={() => setIsProposalOpen(true)}
      />

      {/* 2. Full-Canvas Hero Section */}
      <HeroSection 
        hero={siteData.hero} 
        config={siteData.config} 
      />

      {/* 3. The Growth & Tech Ecosystem Switcher */}
      <EcosystemSwitcher
        activeDivision={activeDivision}
        onSelectDivision={(div) => setActiveDivision(div)}
      />

      {/* 4. Streamlined Services Showcase (Marketing & Tech) */}
      <ServicesShowcase
        marketingServices={siteData.marketingServices}
        techServices={siteData.techServices}
        activeDivision={activeDivision}
        config={siteData.config}
      />

      {/* 5. In-House Production & Creative Reels */}
      <ProductionShowcase production={siteData.production} />

      {/* 6. About Founder & Industries Served */}
      <AboutFounderSection config={siteData.config} about={siteData.about} />

      {/* 7. Client Testimonials & Social Proof */}
      <TestimonialsSection testimonials={siteData.testimonials} />

      {/* 8. Animated Office Location & Radar Google Map (Lazy loaded) */}
      <AnimatedOfficeMap config={siteData.config} />

      {/* 9. Stylized Circuit Outro with SHREY Display Typography */}
      <OutroLaserSection config={siteData.config} outro={siteData.outro} />

      {/* 10. Footer & Local SEO Hub */}
      <Footer config={siteData.config} />

      {/* 11. Clean Floating WhatsApp Trigger */}
      <Interactive3DBot config={siteData.config} botConfig={siteData.bots} />

      {/* 12. Dynamic Instagram Offer Pop-up Modal (Lazy loaded) */}
      <InstagramOfferModal config={siteData.config} offer={siteData.offer} />

      {/* 13. Interactive Multi-Step Proposal Builder Modal (Lazy loaded) */}
      <ProposalBuilderModal
        isOpen={isProposalOpen}
        onClose={() => setIsProposalOpen(false)}
        config={siteData.config}
      />
    </main>
  );
}
