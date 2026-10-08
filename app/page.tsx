"use client";

import React, { useState, useEffect } from "react";
import { CompleteSiteData } from "@/types/content";
import { initialSiteData } from "@/lib/data/initial-content";
import { getSiteContent } from "@/lib/data/content-service";

import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { EcosystemSwitcher } from "@/components/EcosystemSwitcher";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { ProductionShowcase } from "@/components/ProductionShowcase";
import { InstagramOfferPost } from "@/components/InstagramOfferPost";
import { IndustriesGrid } from "@/components/IndustriesGrid";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { OutroLaserSection } from "@/components/OutroLaserSection";
import { AnimatedOfficeMap } from "@/components/AnimatedOfficeMap";
import { Footer } from "@/components/Footer";
import { Interactive3DBot } from "@/components/Interactive3DBot";

export default function HomePage() {
  const [siteData, setSiteData] = useState<CompleteSiteData>(initialSiteData);
  const [activeDivision, setActiveDivision] = useState<"marketing" | "tech">("marketing");

  useEffect(() => {
    async function loadData() {
      const data = await getSiteContent();
      setSiteData(data);
    }
    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-[#07070A] text-white flex flex-col relative selection:bg-[#FF5E00] selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar config={siteData.config} />

      {/* 2. Full-Canvas Hero Section */}
      <HeroSection hero={siteData.hero} config={siteData.config} />

      {/* 3. The Growth & Tech Ecosystem Switcher */}
      <EcosystemSwitcher
        activeDivision={activeDivision}
        onSelectDivision={(div) => setActiveDivision(div)}
      />

      {/* 4. Streamlined Services Showcase */}
      <ServicesShowcase
        marketingServices={siteData.marketingServices}
        techServices={siteData.techServices}
        activeDivision={activeDivision}
        config={siteData.config}
      />

      {/* 5. In-House Production & Creative Reels */}
      <ProductionShowcase />

      {/* 6. Live Instagram Campaign & Diwali Special Offer */}
      <InstagramOfferPost config={siteData.config} />

      {/* 7. Targeted Industry Playbooks */}
      <IndustriesGrid industries={siteData.industries} config={siteData.config} />

      {/* 8. Client Testimonials & Social Proof */}
      <TestimonialsSection testimonials={siteData.testimonials} />

      {/* 9. Stylized Circuit Outro */}
      <OutroLaserSection config={siteData.config} />

      {/* 10. Animated Office Location & Radar Google Map */}
      <AnimatedOfficeMap config={siteData.config} />

      {/* 11. Footer & Local SEO Hub */}
      <Footer config={siteData.config} />

      {/* 12. Floating 3D Assistant & WhatsApp Trigger */}
      <Interactive3DBot config={siteData.config} botConfig={siteData.bots} />
    </main>
  );
}
