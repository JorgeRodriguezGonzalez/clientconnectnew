// types/service.ts

export interface ServiceFeature {
    title: string;
    description: string;
    icon?: string; // nombre del ícono de lucide-react u otro
  }
  
  export interface ServiceFAQ {
    question: string;
    answer: string;
  }
  
  export interface ServiceTestimonial {
    quote: string;
    author: string;
    role: string;
    company: string;
    avatarSrc?: string;
  }
  
  export interface ServicePricingTier {
    name: string;
    price: string;
    description: string;
    features: string[];
    highlighted?: boolean;
    ctaLabel?: string;
  }
  
  export interface ServicePageData {
    // Identidad
    slug: string;
    title: string;
    subtitle: string;
  
    // Hero
    hero: {
      headline: string;
      subheadline: string;
      ctaLabel: string;
      ctaLink: string;
      mediaSrc?: string;       // video o imagen hero
      mediaType?: "video" | "image";
      badges?: string[];
    };
  
    // Sección de overview / intro
    overview: {
      heading: string;
      body: string;             // puede ser HTML o markdown
      imageSrc?: string;
      stats?: { value: string; label: string }[];
    };
  
    // Features / servicios incluidos
    features: ServiceFeature[];
  
    // Proceso / pasos
    process?: {
      heading: string;
      steps: { title: string; description: string }[];
    };
  
    // Testimonios
    testimonials?: ServiceTestimonial[];
  
    // Pricing (opcional)
    pricing?: {
      heading: string;
      subtitle?: string;
      tiers: ServicePricingTier[];
    };
  
    // FAQ
    faq?: ServiceFAQ[];
  
    // CTA final
    cta: {
      heading: string;
      subheading?: string;
      buttonLabel: string;
      buttonLink: string;
    };
  
    // Meta / SEO
    meta: {
      title: string;
      description: string;
      ogImage?: string;
    };
  }