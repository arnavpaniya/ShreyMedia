export interface SiteConfig {
  companyName: string;
  tagline: string;
  founderName: string;
  businessType: string;
  experienceYears: string;
  clientsCount: string;
  primaryMarket: string;
  phone: string;
  whatsapp: string;
  email: string;
  officeAddress: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    fullAddress: string;
  };
  socials: {
    shreyMediaInstagram: string;
    shreyTechInstagram: string;
    founderInstagram: string;
  };
  seo: {
    primaryKeyword: string;
    secondaryKeywords: string[];
    suggestedTitle: string;
    suggestedMetaDescription: string;
  };
}

export interface HeroSectionData {
  eyebrow: string;
  headlineMain: string;
  headlineAccent: string;
  headlineSuffix: string;
  subheadline: string;
  typewriterKeywords: string[];
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaVideoUrl: string;
  proofMetrics: Array<{
    icon: string;
    label: string;
    sublabel: string;
    highlight?: boolean;
  }>;
  floatingStats: Array<{
    id: string;
    title: string;
    value: string;
    trend: string;
    position: string;
  }>;
}

export interface AboutSectionData {
  eyebrow: string;
  headline: string;
  bioParagraph1: string;
  bioParagraph2: string;
  experienceYears: string;
  experienceLabel: string;
  businessesScaled: string;
  businessesLabel: string;
  locationBadge: string;
  locationLabel: string;
  industriesHeader: string;
  industriesList: string[];
  ctaText: string;
}

export interface ShowcaseReelItem {
  id: number | string;
  type?: 'video' | 'image' | 'website';
  title: string;
  niche: string;
  duration?: string;
  image: string;
  videoUrl?: string;
  websiteUrl?: string;
  stats: string;
}

export interface ProductionSectionData {
  eyebrow: string;
  headlineMain: string;
  headlineAccent: string;
  badgePills: string[];
  handwrittenNote: string;
  creativeReels: ShowcaseReelItem[];
}

export interface OutroSectionData {
  topTagline: string;
  pipelineKeywords: string[];
  leftAnnotation: string;
  rightAnnotation: string;
  subLogoText: string;
  nodes: Array<{
    label: string;
    status: string;
  }>;
  primaryCtaText: string;
  instagramHandleText: string;
}

export interface InstagramOfferData {
  enabled: boolean;
  accountHandle: string;
  locationTag: string;
  imageUrl: string;
  whatsappDmMessage: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  division: 'marketing' | 'tech';
  shortDesc: string;
  fullDesc: string;
  features: string[];
  icon: string;
  badge?: string;
  colorAccent?: string;
  gradient?: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  icon: string;
  description: string;
  growthAngle: string;
  featured?: boolean;
}

export interface CaseStudyItem {
  id: string;
  title: string;
  clientName: string;
  industry: string;
  division: 'marketing' | 'tech';
  challenge: string;
  solution: string;
  metrics: Array<{
    label: string;
    value: string;
  }>;
  handwrittenNote?: string;
  image: string;
  tags: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  business: string;
  location: string;
  quote: string;
  rating: number;
  avatar?: string;
  proofImage?: string;
  serviceTag?: string;
  duration?: string;
  verified: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'marketing' | 'tech' | 'pricing';
}

export interface Interactive3DBotConfig {
  marketingBotName: string;
  marketingBotSpeech: string;
  techBotName: string;
  techBotSpeech: string;
  whatsappBotGreeting: string;
}

export interface CompleteSiteData {
  config: SiteConfig;
  hero: HeroSectionData;
  about: AboutSectionData;
  production: ProductionSectionData;
  marketingServices: ServiceItem[];
  techServices: ServiceItem[];
  industries: IndustryItem[];
  caseStudies: CaseStudyItem[];
  testimonials: TestimonialItem[];
  outro: OutroSectionData;
  offer: InstagramOfferData;
  faqs: FaqItem[];
  bots: Interactive3DBotConfig;
}
