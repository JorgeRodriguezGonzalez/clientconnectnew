import type { ServiceItem } from "@/components/home/SubServicesSection";

export const googleAdsHeading = "What's Included in Our";
export const googleAdsHighlight = "Google Ads Management";
export const googleAdsSubtitle = "Every campaign is built to maximise your return on ad spend.";

export const googleAdsServices: ServiceItem[] = [
  {
    id: "account-audit",
    title: "Account Audit & Research",
    description: "We audit your current setup, research competitors, and identify high-value keyword opportunities you're missing.",
    badges: ["Competitor Analysis", "Keyword Gaps", "Account Health", "Opportunities"],
    videoSrc: "/videos/websitedevelopment.mp4",
    link: "/services/google-ads",
    area: "top-left",
  },
  {
    id: "campaign-structure",
    title: "Campaign Architecture",
    description: "Clean campaign structure with tightly themed ad groups, negative keywords, and audience layering for maximum relevance.",
    badges: ["Ad Groups", "Negatives", "Audiences", "Structure"],
    videoSrc: null,
    link: "/services/google-ads",
    area: "bottom-left",
  },
  {
    id: "ad-copy",
    title: "Ad Copy & Extensions",
    description: "Compelling headlines, descriptions, and sitelink extensions — all A/B tested from day one to find what converts.",
    badges: ["Headlines", "Descriptions", "Sitelinks", "A/B Testing"],
    videoSrc: null,
    link: "/services/google-ads",
    area: "top-center",
  },
  {
    id: "smart-bidding",
    title: "Smart Bidding & Budget",
    description: "AI-powered bid strategies — Target CPA, Target ROAS, Maximize Conversions — tuned and monitored for your specific goals.",
    badges: ["Target CPA", "Target ROAS", "Max Conversions", "Budget"],
    videoSrc: "/videos/seo.mp4",
    link: "/services/google-ads",
    area: "bottom-center",
  },
  {
    id: "remarketing",
    title: "Remarketing & Audiences",
    description: "Re-engage visitors who didn't convert with tailored ads across Search and Display. Custom audiences built from your best customers.",
    badges: ["Retargeting", "Display", "Custom Audiences", "Lookalikes"],
    videoSrc: "/videos/SPweb4.mp4",
    link: "/services/google-ads",
    area: "right",
  },
  {
    id: "conversion-tracking",
    title: "Conversion Tracking Setup",
    description: "Precise tracking with GA4, Google Tag Manager, and offline conversion imports so you know exactly what's driving results.",
    badges: ["GA4", "GTM", "Offline Imports", "Attribution"],
    videoSrc: "/videos/SPweb3.mp4",
    link: "/services/google-ads",
    area: "bottom-wide",
  },
  {
    id: "reporting-optimisation",
    title: "Reporting & Optimisation",
    description: "Weekly bid and budget adjustments with transparent monthly reports. We double down on what works and cut what doesn't.",
    badges: ["Weekly Tweaks", "Monthly Reports", "KPIs", "Transparency"],
    videoSrc: null,
    link: "/services/google-ads",
    area: "bottom-right",
  },
];