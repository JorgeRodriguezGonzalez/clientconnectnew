// data/services/google-ads.ts
import { ServicePageData } from "@/types/service";

export const googleAdsData: ServicePageData = {
  slug: "google-ads",
  title: "Google Ads",
  subtitle: "Instant visibility with targeted campaigns that maximize ROI.",

  hero: {
    headline: "Turn Clicks\nInto Customers",
    subheadline:
      "Smart bidding, compelling ad copy, and continuous optimization to turn every dollar into measurable growth.",
    ctaLabel: "Launch Your Campaign",
    ctaLink: "/contact?service=google-ads",
    mediaSrc: "/videos/googleads.mp4",
    mediaType: "video",
    badges: ["Search Ads", "Display Network", "Shopping Ads", "Remarketing"],
  },

  overview: {
    heading: "Paid Search That Pays Off",
    body: "We build and manage Google Ads campaigns engineered for profitability. From keyword research to landing page alignment, every element is optimized so you get the highest return on every dollar spent.",
    imageSrc: "/images/services/googleads-overview.webp",
    stats: [
      { value: "5.4x", label: "Avg. ROAS" },
      { value: "-38%", label: "Cost per Lead" },
      { value: "2.1M+", label: "Ad Spend Managed" },
    ],
  },

  features: [
    {
      title: "Search Campaigns",
      description: "High-intent keyword targeting to capture users actively searching for your products or services.",
      icon: "Search",
    },
    {
      title: "Display & Video",
      description: "Visual campaigns across the Google Display Network and YouTube to build awareness at scale.",
      icon: "Monitor",
    },
    {
      title: "Shopping Ads",
      description: "Product feed optimization and Smart Shopping campaigns for e-commerce brands.",
      icon: "ShoppingBag",
    },
    {
      title: "Remarketing",
      description: "Re-engage visitors who didn't convert with tailored ads that bring them back.",
      icon: "RefreshCw",
    },
    {
      title: "Smart Bidding",
      description: "AI-powered bid strategies — Target CPA, Target ROAS, Maximize Conversions — tuned for your goals.",
      icon: "TrendingUp",
    },
    {
      title: "Conversion Tracking",
      description: "Precise tracking setup with GA4, GTM, and offline conversion imports for full-funnel visibility.",
      icon: "BarChart3",
    },
  ],

  process: {
    heading: "Our Google Ads Process",
    steps: [
      {
        title: "Account Audit & Research",
        description: "We audit your current setup, research competitors, and identify high-value keyword opportunities.",
      },
      {
        title: "Campaign Architecture",
        description: "Clean campaign structure with tightly themed ad groups, negative keywords, and audience layering.",
      },
      {
        title: "Ad Copy & Creative",
        description: "Compelling headlines and descriptions with A/B testing from day one.",
      },
      {
        title: "Optimize & Scale",
        description: "Weekly optimizations on bids, budgets, and targeting. We double down on what works.",
      },
    ],
  },

  faq: [
    {
      question: "How much should I spend on Google Ads?",
      answer: "It depends on your industry and goals. We typically recommend starting with a minimum of $1,500–$3,000/month to gather enough data for meaningful optimization.",
    },
    {
      question: "How fast will I see results?",
      answer: "You'll see traffic immediately. Meaningful conversion data and optimization typically kick in after 2–4 weeks.",
    },
    {
      question: "Do you manage the landing pages too?",
      answer: "Yes — we can build or optimize dedicated landing pages to improve your Quality Score and conversion rate.",
    },
  ],

  cta: {
    heading: "Ready to Grow with Google Ads?",
    subheading: "Get a free campaign audit and see where your ad spend could be working harder.",
    buttonLabel: "Get Your Free Audit",
    buttonLink: "/contact?service=google-ads",
  },

  meta: {
    title: "Google Ads Management Services | YourAgency",
    description: "Expert Google Ads management. Search, Display, Shopping, and Remarketing campaigns optimized for maximum ROI.",
    ogImage: "/images/og/google-ads.webp",
  },
};