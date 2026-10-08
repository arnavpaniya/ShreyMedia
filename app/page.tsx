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
import { AboutFounderSection } from "@/components/AboutFounderSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { OutroLaserSection } from "@/components/OutroLaserSection";
import { AnimatedOfficeMap } from "@/components/AnimatedOfficeMap";
import { Footer } from "@/components/Footer";
import { Interactive3DBot } from "@/components/Interactive3DBot";
import { InstagramOfferModal } from "@/components/InstagramOfferModal";

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

      {/* 8. Animated Office Location & Radar Google Map */}
      <AnimatedOfficeMap config={siteData.config} />

      {/* 9. Footer & Local SEO Hub */}
      <Footer config={siteData.config} />

      {/* 10. Stylized Circuit Outro (Positioned after footer) */}
      <OutroLaserSection config={siteData.config} outro={siteData.outro} />

      {/* 11. Clean Floating WhatsApp Trigger (No speech bubble text) */}
      <Interactive3DBot config={siteData.config} botConfig={siteData.bots} />

      {/* 12. Light-Theme Instagram Offer Pop-up Modal */}
      <InstagramOfferModal config={siteData.config} offer={siteData.offer} />
    </main>
  );
}
