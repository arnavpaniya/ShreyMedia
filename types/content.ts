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
  marketingServices: ServiceItem[];
  techServices: ServiceItem[];
  industries: IndustryItem[];
  caseStudies: CaseStudyItem[];
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
  bots: Interactive3DBotConfig;
}
