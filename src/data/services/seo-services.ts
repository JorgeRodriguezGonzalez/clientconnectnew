import type { ServiceItem } from "@/components/home/SubServicesSection";

export const webdesignHeading = "What We Include in";
export const webdesignHighlight = "Web Design";
export const webdesignSubtitle = "Every website we build comes packed with these core capabilities.";

export const webdesignServices: ServiceItem[] = [
  {
    id: "discovery-architecture",
    title: "Discovery & Site Architecture",
    description: "Before we touch a single pixel, we research your market and plan every page. You get a clear sitemap and content strategy built around how your customers think.",
    badges: ["Research", "Sitemap", "Content Strategy", "User Journey"],
    videoSrc: "/videos/websitedevelopment.mp4",
    link: "/services/website-development",
    area: "top-left",
  },
  {
    id: "bespoke-designs",
    title: "Bespoke Page Designs",
    description: "Every page is wireframed and designed from scratch to match your brand. No cookie-cutter templates — just tailored layouts built to convert.",
    badges: ["Wireframes", "UI Design", "Brand-Led", "Conversion"],
    videoSrc: null,
    link: "/services/website-development",
    area: "bottom-left",
  },
  {
    id: "responsive-dev",
    title: "Built for Every Screen",
    description: "Mobile-first development that adapts perfectly to any device. We obsess over speed and usability so your visitors stay engaged.",
    badges: ["Mobile-First", "Tablet", "Desktop", "Fast Loading"],
    videoSrc: null,
    link: "/services/website-development",
    area: "top-center",
  },
  {
    id: "seo-foundations",
    title: "SEO Foundations Built In",
    description: "We implement essential SEO best practices from day one — meta tags, heading structure, schema markup, and keyword-friendly content so Google finds you fast.",
    badges: ["Meta Tags", "Schema", "Keywords", "Site Speed"],
    videoSrc: "/videos/seo.mp4",
    link: "/services/seo",
    area: "bottom-center",
  },
  {
    id: "lead-tracking",
    title: "Forms, CRM & Lead Tracking",
    description: "Smart contact forms wired to your CRM so every lead is captured and tracked automatically. You'll never miss a potential customer.",
    badges: ["Contact Forms", "CRM Setup", "Lead Capture", "Automation"],
    videoSrc: "/videos/SPweb4.mp4",
    link: "/services/website-development",
    area: "right",
  },
  {
    id: "analytics-tracking",
    title: "Data & Performance Tracking",
    description: "We set up Google Analytics, heatmaps, and conversion tracking so you can measure what matters and make data-driven decisions from day one.",
    badges: ["GA4", "Heatmaps", "Conversions", "Tag Manager"],
    videoSrc: "/videos/SPweb3.mp4",
    link: "/services/website-development",
    area: "bottom-wide",
  },
  {
    id: "launch-support",
    title: "Launch Support & Maintenance",
    description: "We don't disappear after launch. CMS training, security patches, and monthly performance checks to keep your site running at its best.",
    badges: ["CMS Training", "Security", "Backups", "Monitoring"],
    videoSrc: null,
    link: "/services/website-development",
    area: "bottom-right",
  },
];