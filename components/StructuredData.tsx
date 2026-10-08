import React from "react";
import { SiteConfig } from "@/types/content";

interface StructuredDataProps {
  config: SiteConfig;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ config }) => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://shreymedia.in/#localbusiness",
        "name": "Shrey Media",
        "legalName": "Shrey Media & Technology Solutions",
        "alternateName": ["Shrey Tech Solutions", "Shrey Media Jaipur"],
        "url": "https://shreymedia.in",
        "logo": "https://shreymedia.in/brand/logo.png",
        "image": "https://shreymedia.in/images/hero-founder.jpg",
        "description": config.seo.suggestedMetaDescription,
        "telephone": `+91${config.phone}`,
        "email": config.email,
        "priceRange": "₹₹",
        "founder": {
          "@type": "Person",
          "name": config.founderName,
          "jobTitle": "Founder & Head of Growth",
          "sameAs": [config.socials.founderInstagram]
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": `${config.officeAddress.line1}, ${config.officeAddress.line2}`,
          "addressLocality": config.officeAddress.city,
          "addressRegion": config.officeAddress.state,
          "postalCode": "302003",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 26.9188,
          "longitude": 75.8176
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Jaipur"
          },
          {
            "@type": "State",
            "name": "Rajasthan"
          },
          {
            "@type": "Country",
            "name": "India"
          }
        ],
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "09:30",
          "closes": "20:00"
        },
        "sameAs": [
          config.socials.shreyMediaInstagram,
          config.socials.shreyTechInstagram,
          config.socials.founderInstagram
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "100",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://shreymedia.in/#service",
        "name": "Shrey Media Digital Marketing & Tech Services",
        "serviceType": [
          "Google Ads",
          "Meta Ads",
          "Search Engine Optimization (SEO)",
          "Generative Engine Optimization (GEO)",
          "Social Media Management",
          "Studio Photoshoots & Viral Reels",
          "WhatsApp Marketing & Automation",
          "Custom Website Development",
          "Custom CRM & Mobile App Engineering"
        ],
        "provider": {
          "@id": "https://shreymedia.in/#localbusiness"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
