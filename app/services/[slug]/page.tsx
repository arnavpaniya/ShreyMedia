import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { initialSiteData } from "@/lib/data/initial-content";
import { ServiceItem } from "@/types/content";
import { 
  ArrowRight, 
  PhoneCall, 
  CheckCircle2, 
  HelpCircle, 
  Building2, 
  MapPin, 
  TrendingUp, 
  Zap 
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Combine all marketing and tech services
const allServices: ServiceItem[] = [
  ...initialSiteData.marketingServices,
  ...initialSiteData.techServices,
];

export async function generateStaticParams() {
  return allServices.map((service) => ({
    slug: service.slug,
  }));
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = allServices.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found | Shrey Media Jaipur",
      description: "The requested digital marketing or technology service page could not be found.",
    };
  }

  const isMarketing = service.division === "marketing";
  const divisionName = isMarketing ? "Shrey Media" : "Shrey Tech Solutions";
  const title = `${service.title} in Jaipur | ${divisionName}`;
  const description = `${service.fullDesc} Partner with Jaipur's premier agency for proven ROI, expert execution, and measurable growth.`;
  const canonicalUrl = `https://shreymedia.in/services/${service.slug}`;

  return {
    title,
    description,
    keywords: [
      `${service.title} Jaipur`,
      `${service.title} agency in Jaipur`,
      `${service.title} company Jaipur`,
      "Digital Marketing Agency Jaipur",
      "Shrey Media Jaipur",
      ...(service.features || []),
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Shrey Media",
      images: [
        {
          url: "/images/hero-founder.jpg",
          width: 1200,
          height: 630,
          alt: `${service.title} in Jaipur - Shrey Media`,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/hero-founder.jpg"],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = allServices.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const config = initialSiteData.config;
  const isMarketing = service.division === "marketing";
  const relatedServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 3);

  const whatsappMessage = encodeURIComponent(
    `Hi Shreyansh! I'm inquiring about your ${service.title} service for my business in Jaipur.`
  );
  const whatsappUrl = `https://wa.me/91${config.phone}?text=${whatsappMessage}`;

  // Structured Data Schema for Service + FAQ + Breadcrumb
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
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": service.title,
            "item": `https://shreymedia.in/services/${service.slug}`
          }
        ]
      },
      {
        "@type": "Service",
        "@id": `https://shreymedia.in/services/${service.slug}#service`,
        "name": `${service.title} in Jaipur`,
        "description": service.fullDesc,
        "serviceType": service.title,
        "provider": {
          "@type": "LocalBusiness",
          "name": "Shrey Media",
          "url": "https://shreymedia.in",
          "telephone": `+91${config.phone}`,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": `${config.officeAddress.line1}, ${config.officeAddress.line2}`,
            "addressLocality": config.officeAddress.city,
            "addressRegion": config.officeAddress.state,
            "postalCode": "302003",
            "addressCountry": "IN"
          }
        },
        "areaServed": {
          "@type": "City",
          "name": "Jaipur"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": `${service.title} Offerings`,
          "itemListElement": service.features.map((f, i) => ({
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": f
            },
            "position": i + 1
          }))
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `How does ${service.title} help my business grow in Jaipur?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `${service.fullDesc} In Jaipur's competitive market, our custom tailored strategy captures high-intent customers and scales your return on investment.`
            }
          },
          {
            "@type": "Question",
            "name": `How fast can we launch our ${service.title} campaign with Shrey Media?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Following our onboarding strategy session, campaigns and initial deliverables are typically deployed within 3 to 7 business days."
            }
          }
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
        <div className="ocarina-watercolor-bloom absolute top-1/4 left-1/2 -translate-x-1/2 w-[90vw] max-w-[700px] h-[350px] bg-gradient-to-r from-[#FF5E00]/20 via-[#FFAE33]/15 to-[#00F0FF]/15 -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs font-mono-tech text-gray-400 flex-wrap">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              </li>
              <li>/</li>
              <li className="text-[#FFAE33] font-bold truncate max-w-[200px] sm:max-w-none">
                {service.title}
              </li>
            </ol>
          </nav>

          {/* 1. Clear H1 Hero Section */}
          <div className="space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
              <span className={`w-2 h-2 rounded-full ${isMarketing ? "bg-[#FF5E00]" : "bg-[#00F0FF]"}`} />
              <span className="text-xs font-mono-tech uppercase text-gray-300">
                {isMarketing ? "Shrey Media Growth Module" : "Shrey Tech Solutions Module"}
              </span>
            </div>

            <h1 className="font-syne text-3xl min-[360px]:text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {service.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E00] via-[#FFAE33] to-[#00F0FF]">in Jaipur</span>
            </h1>

            <p className="text-base sm:text-xl text-gray-300 max-w-3xl leading-relaxed font-sans">
              {service.shortDesc}
            </p>

            {/* Quick Action CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-btn min-h-[48px] inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#FF5E00] to-[#FFAE33] text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-[0_10px_30px_rgba(255,94,0,0.4)] border border-white/20 active:scale-98 transition-transform"
              >
                <PhoneCall className="w-4 h-4 fill-white shrink-0" />
                <span>Book Free Strategy Call</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>

              <Link
                href="/#contact"
                className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white text-sm font-medium px-6 py-3.5 rounded-full transition-colors active:scale-98"
              >
                <span>Visit Jaipur Studio</span>
                <MapPin className="w-4 h-4 text-[#00F0FF] shrink-0" />
              </Link>
            </div>
          </div>

          {/* 2. H2: Comprehensive Overview & Strategy */}
          <section className="clay-card p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#0E0E16]/90 backdrop-blur-xl shadow-2xl mb-12">
            <h2 className="font-syne font-bold text-xl sm:text-2xl text-white mb-4">
              Strategic Approach &amp; Market Value
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans mb-6">
              {service.fullDesc}
            </p>

            {/* Key Deliverables Matrix */}
            <h3 className="font-syne font-bold text-base sm:text-lg text-white mb-4 uppercase tracking-wider text-xs font-mono-tech text-[#FFAE33]">
              What We Deliver for Your Business:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {service.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#D4FF00] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-gray-200 font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 3. H2: Why Jaipur Businesses Choose Shrey Media */}
          <section className="mb-12">
            <h2 className="font-syne font-bold text-2xl sm:text-3xl text-white tracking-tight mb-6">
              Why Partner With Shrey Media in Jaipur?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#0C0C14] border border-white/10 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#FF5E00]/10 border border-[#FF5E00]/30 flex items-center justify-center text-[#FF5E00] mb-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-syne font-bold text-base text-white">High-ROAS Focus</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  We focus strictly on customer acquisition and real revenue growth rather than vanity metrics.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0C0C14] border border-white/10 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] mb-3">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-syne font-bold text-base text-white">Film Colony Studio HQ</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Local Jaipur presence at Film Colony, Malpani Chamber for face-to-face strategy and studio shoots.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0C0C14] border border-white/10 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#D4FF00]/10 border border-[#D4FF00]/30 flex items-center justify-center text-[#D4FF00] mb-3">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-syne font-bold text-base text-white">Marketing + Tech Stack</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Uniquely combining high-converting creative ads with custom software &amp; WhatsApp automation.
                </p>
              </div>
            </div>
          </section>

          {/* 4. H2: Frequently Asked Questions */}
          <section className="clay-card p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#0E0E16]/90 backdrop-blur-xl mb-12">
            <div className="inline-flex items-center gap-2 bg-[#D4FF00]/10 border border-[#D4FF00]/30 px-3 py-1 rounded-full mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-[#D4FF00]" />
              <span className="text-xs font-mono-tech uppercase text-[#D4FF00] font-semibold">
                FAQ
              </span>
            </div>
            <h2 className="font-syne font-bold text-xl sm:text-2xl text-white mb-6">
              Frequently Asked Questions About {service.title}
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <h3 className="font-syne font-bold text-sm sm:text-base text-white">
                  How does {service.title} scale businesses in Jaipur?
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  By pairing localized market knowledge with proven conversion architectures, we position your brand directly in front of buyers actively searching in Jaipur and across India.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <h3 className="font-syne font-bold text-sm sm:text-base text-white">
                  How do we get started?
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Click the button below to message Shreyansh directly on WhatsApp, or book a quick strategy session to review your business goals.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Related Services Navigation */}
          <section className="pt-8 border-t border-white/10">
            <h2 className="font-syne font-bold text-lg sm:text-xl text-white mb-4">
              Explore More Jaipur Growth Modules
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-colors group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono-tech text-[#FFAE33] block mb-1">
                      {rel.division === "marketing" ? "Growth & Ads" : "Tech & CRM"}
                    </span>
                    <h3 className="font-syne font-bold text-sm text-white group-hover:text-[#FF5E00] transition-colors">
                      {rel.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono-tech text-gray-400 group-hover:text-white flex items-center gap-1 mt-3">
                    <span>View Blueprint</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer config={config} />
    </div>
  );
}
