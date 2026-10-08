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
import { BaburaoHookBanner } from "@/components/BaburaoHookBanner";
import { IndustriesGrid } from "@/components/IndustriesGrid";
import { CaseStudiesJournal } from "@/components/CaseStudiesJournal";
import { OutroLaserSection } from "@/components/OutroLaserSection";
import { Footer } from "@/components/Footer";
import { Interactive3DBot } from "@/components/Interactive3DBot";
import { AdminDrawer } from "@/components/AdminDrawer";

export default function HomePage() {
  const [siteData, setSiteData] = useState<CompleteSiteData>(initialSiteData);
  const [activeDivision, setActiveDivision] = useState<"marketing" | "tech">("marketing");
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const data = await getSiteContent();
      setSiteData(data);
    }
    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-[#0A0A0E] text-white flex flex-col relative selection:bg-[#FF5E00] selection:text-white">
      {/* Navigation Header */}
      <Navbar
        config={siteData.config}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Hero Section */}
      <HeroSection
        hero={siteData.hero}
        config={siteData.config}
      />

      {/* The Growth & Tech Ecosystem Highway */}
      <EcosystemSwitcher
        activeDivision={activeDivision}
        onSelectDivision={(div) => setActiveDivision(div)}
      />

      {/* Services Showcase (Marketing & Tech) */}
      <ServicesShowcase
        marketingServices={siteData.marketingServices}
        techServices={siteData.techServices}
        activeDivision={activeDivision}
        config={siteData.config}
      />

      {/* In-House Production & Creative Reel Scroller */}
      <ProductionShowcase />

      {/* Pop-Culture Viral Marketing Banner (Baburao) */}
      <BaburaoHookBanner config={siteData.config} />

      {/* Targeted Industry Playbooks */}
      <IndustriesGrid
        industries={siteData.industries}
        config={siteData.config}
      />

      {/* Client Journal & Case Studies Desk */}
      <CaseStudiesJournal
        caseStudies={siteData.caseStudies}
        config={siteData.config}
      />

      {/* Post-Footer 3D Typographic Laser Outro */}
      <OutroLaserSection config={siteData.config} />

      {/* Local SEO & HQ Footer */}
      <Footer config={siteData.config} />

      {/* Floating Interactive 3D Bot & WhatsApp Quick Trigger */}
      <Interactive3DBot
        config={siteData.config}
        botConfig={siteData.bots}
      />

      {/* CMS Studio Drawer */}
      <AdminDrawer
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        siteData={siteData}
        onDataUpdated={(newData) => setSiteData(newData)}
      />
    </main>
  );
}
