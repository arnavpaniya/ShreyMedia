import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { initialSiteData } from "@/lib/data/initial-content";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Code2, 
  PhoneCall, 
  CheckCircle2, 
  MapPin 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Growth Marketing & Technology Services in Jaipur | Shrey Media",
  description: "Explore performance marketing, Google Ads, Meta Ads, SEO, custom web development, and WhatsApp CRM automation engineered for Jaipur businesses by Shrey Media.",
  keywords: [
    "Digital Marketing Services Jaipur",
    "Web Development Services Jaipur",
    "Google Ads Agency Jaipur",
    "Meta Ads Agency Jaipur",
    "SEO Services Jaipur",
    "Custom CRM Software Jaipur",
    "WhatsApp Marketing Jaipur",
    "Shrey Media Services",
  ],
  alternates: {
    canonical: "https://shreymedia.in/services",
  },
  openGraph: {
    title: "Growth Marketing & Technology Services in Jaipur | Shrey Media",
    description: "Explore performance marketing, Google Ads, Meta Ads, SEO, custom web development, and WhatsApp CRM automation engineered for Jaipur businesses.",
    url: "https://shreymedia.in/services",
    siteName: "Shrey Media",
    images: [
      {
        url: "/images/hero-founder.jpg",
        width: 1200,
        height: 630,
        alt: "Shrey Media Services Directory - Jaipur HQ",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth Marketing & Technology Services in Jaipur | Shrey Media",
    description: "Explore performance marketing, Google Ads, Meta Ads, SEO, custom web development, and WhatsApp CRM automation engineered for Jaipur businesses.",
    images: ["/images/hero-founder.jpg"],
  },
};

export default function ServicesIndexPage() {
  const config = initialSiteData.config;
  const marketingServices = initialSiteData.marketingServices;
  const techServices = initialSiteData.techServices;

  const whatsappMessage = encodeURIComponent(
    "Hi Shreyansh! I'm reviewing your full services directory and would like to discuss a custom growth roadmap for my business in Jaipur."
  );
  const whatsappUrl = `https://wa.me/91${config.phone}?text=${whatsappMessage}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://shreymedia.in"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://shreymedia.in/services"
          }
        ]
      },
      {
        "@type": "ItemList",
        "name": "Shrey Media & Tech Services Directory",
        "description": "Full directory of digital marketing, media production, and software development services in Jaipur",
        "itemListElement": [
          ...marketingServices.map((s, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": s.title,
            "url": `https://shreymedia.in/services/${s.slug}`
          })),
          ...techServices.map((s, idx) => ({
            "@type": "ListItem",
            "position": marketingServices.length + idx + 1,
            "name": s.title,
            "url": `https://shreymedia.in/services/${s.slug}`
          }))
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#07070A] text-white flex flex-col selection:bg-[#FF5E00]">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar config={config} />

      <main className="flex-1 pt-28 sm:pt-36 pb-20 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="ocarina-watercolor-bloom absolute top-1/4 left-1/2 -translate-x-1/2 w-[90vw] max-w-[800px] h-[400px] bg-gradient-to-r from-[#FF5E00]/20 via-[#FFAE33]/15 to-[#00F0FF]/15 -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs font-mono-tech text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li className="text-[#FFAE33] font-bold">Services Directory</li>
            </ol>
          </nav>

          {/* 1. Page Header (Single H1) */}
          <div className="space-y-4 mb-16 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#FFAE33]" />
              <span className="text-xs font-mono-tech uppercase text-gray-300">
                End-to-End Growth Architecture
              </span>
            </div>

            <h1 className="font-syne text-3xl min-[360px]:text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Growth Marketing &amp; Technology Services <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E00] via-[#FFAE33] to-[#00F0FF]">in Jaipur</span>
            </h1>

            <p className="text-base sm:text-xl text-gray-300 max-w-3xl leading-relaxed font-sans">
              Discover our integrated dual-engine ecosystem: hyper-targeted marketing campaigns paired with high-performance custom software engineering to scale your business.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-btn min-h-[48px] inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF5E00] to-[#FFAE33] text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-[0_10px_30px_rgba(255,94,0,0.4)] border border-white/20 active:scale-98 transition-transform"
              >
                <PhoneCall className="w-4 h-4 fill-white shrink-0" />
                <span>Request Custom Growth Blueprint</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>
              <Link
                href="/#contact"
                className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white text-sm font-medium px-6 py-3.5 rounded-full transition-colors active:scale-98"
              >
                <MapPin className="w-4 h-4 text-[#00F0FF] shrink-0" />
                <span>Visit Jaipur Studio HQ</span>
              </Link>
            </div>
          </div>

          {/* 2. Section 1: Shrey Media (Marketing & Ads) */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#FF5E00]/15 border border-[#FF5E00]/40 flex items-center justify-center text-[#FF5E00]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-syne font-bold text-2xl sm:text-3xl text-white">
                  Shrey Media: Marketing, Ads &amp; Production
                </h2>
                <p className="text-xs sm:text-sm text-gray-400">
                  Customer acquisition, paid ads, SEO ranking, and brand content tailored for high conversion.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketingServices.map((service) => (
                <div
                  key={service.slug}
                  className="clay-card p-6 rounded-3xl border border-white/10 bg-[#0E0E16]/80 backdrop-blur-md flex flex-col justify-between hover:border-[#FF5E00]/50 transition-colors group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono-tech uppercase text-[#FF5E00] tracking-wider font-semibold">
                        Growth Module
                      </span>
                      <span className="text-xs font-mono-tech text-gray-400">Jaipur HQ</span>
                    </div>

                    <h3 className="font-syne font-bold text-lg text-white group-hover:text-[#FFAE33] transition-colors mb-2">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mb-4">
                      {service.shortDesc}
                    </p>

                    <div className="space-y-1.5 mb-6">
                      {service.features.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D4FF00] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="min-h-[44px] inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white/5 hover:bg-[#FF5E00] text-white text-xs font-semibold font-mono-tech transition-all group-hover:shadow-[0_4px_20px_rgba(255,94,0,0.3)]"
                  >
                    <span>Explore Service Blueprint</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Section 2: Shrey Tech Solutions (Software, CRM & Web) */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/15 border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF]">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-syne font-bold text-2xl sm:text-3xl text-white">
                  Shrey Tech Solutions: Software &amp; Automation
                </h2>
                <p className="text-xs sm:text-sm text-gray-400">
                  Custom web applications, enterprise CRMs, mobile apps, and automated WhatsApp workflows.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techServices.map((service) => (
                <div
                  key={service.slug}
                  className="clay-card p-6 rounded-3xl border border-white/10 bg-[#0E0E16]/80 backdrop-blur-md flex flex-col justify-between hover:border-[#00F0FF]/50 transition-colors group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono-tech uppercase text-[#00F0FF] tracking-wider font-semibold">
                        Tech Solution
                      </span>
                      <span className="text-xs font-mono-tech text-gray-400">Jaipur HQ</span>
                    </div>

                    <h3 className="font-syne font-bold text-lg text-white group-hover:text-[#00F0FF] transition-colors mb-2">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mb-4">
                      {service.shortDesc}
                    </p>

                    <div className="space-y-1.5 mb-6">
                      {service.features.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="min-h-[44px] inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white/5 hover:bg-[#00F0FF] hover:text-black text-white text-xs font-semibold font-mono-tech transition-all group-hover:shadow-[0_4px_20px_rgba(0,240,255,0.3)]"
                  >
                    <span>Explore Tech Blueprint</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Contact & Consultation Banner */}
          <section className="clay-card p-8 sm:p-12 rounded-3xl border border-white/15 bg-gradient-to-br from-[#0E0E16] via-[#141420] to-[#0A0A0E] text-center space-y-6">
            <h2 className="font-syne font-black text-2xl sm:text-4xl text-white">
              Ready to Accelerate Your Brand in Jaipur?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Whether you need high-impact ad campaigns, cinematic video reels, or custom software solutions, we build systems that generate measurable revenue.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-btn min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF5E00] to-[#FFAE33] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg border border-white/20"
              >
                <PhoneCall className="w-4 h-4 fill-white shrink-0" />
                <span>Chat with Shreyansh Malpani</span>
              </a>
              <Link
                href="/#contact"
                className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-medium px-8 py-3.5 rounded-full transition-colors"
              >
                <span>Request Custom Quote</span>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer config={config} />
    </div>
  );
}
