import type { ServiceItem } from "@/components/home/SubServicesSection";

export const webdesignHeading = "What We Include in";
export const webdesignHighlight = "Web Design";
export const webdesignSubtitle = "Every website we build comes packed with these core capabilities.";

export const webdesignServices: ServiceItem[] = [
  {
    id: "custom-uiux",
    title: "Custom UI/UX Design",
    description: "Every pixel is intentional. We craft interfaces that guide users toward action with clarity and delight.",
    badges: ["Figma", "Prototyping", "User Research", "Wireframes"],
    videoSrc: "/videos/websitedevelopment.mp4",
    link: "/services/website-development",
    area: "top-left",
  },
  {
    id: "cms-integration",
    title: "CMS Integration",
    description: "WordPress, Webflow, Sanity — we set it up so your team can update content without a developer.",
    badges: ["WordPress", "Webflow", "Sanity", "Headless"],
    videoSrc: null,
    link: "/services/website-development",
    area: "bottom-left",
  },
  {
    id: "responsive-design",
    title: "Responsive Design",
    description: "Mobile-first layouts that look and work flawlessly on every screen size and device.",
    badges: ["Mobile-First", "Tablet", "Desktop", "Cross-Browser"],
    videoSrc: null,
    link: "/services/website-development",
    area: "top-center",
  },
  {
    id: "performance",
    title: "Performance Optimization",
    description: "Lazy loading, code splitting, image optimization. Your site scores 90+ on Core Web Vitals.",
    badges: ["Core Web Vitals", "Speed", "Caching", "CDN"],
    videoSrc: "/videos/seo.mp4",
    link: "/services/website-development",
    area: "bottom-center",
  },
  {
    id: "seo-foundation",
    title: "SEO Foundation",
    description: "Semantic HTML, structured data, optimized meta tags — your site is search-ready from day one.",
    badges: ["Schema Markup", "Meta Tags", "Sitemap", "Indexing"],
    videoSrc: "/videos/brand.mp4",
    link: "/services/seo",
    area: "right",
  },
  {
    id: "analytics",
    title: "Analytics & Tracking",
    description: "GA4, Tag Manager, conversion tracking — we wire up the data so you can measure what matters and make informed decisions.",
    badges: ["GA4", "GTM", "Heatmaps", "Conversion Tracking"],
    videoSrc: "/videos/googleads.mp4",
    link: "/services/website-development",
    area: "bottom-wide",
  },
  {
    id: "ongoing-support",
    title: "Ongoing Support",
    description: "Post-launch maintenance, security updates, and performance monitoring to keep your site running perfectly.",
    badges: ["Maintenance", "Security", "Updates", "Monitoring"],
    videoSrc: null,
    link: "/services/website-development",
    area: "bottom-right",
  },
];