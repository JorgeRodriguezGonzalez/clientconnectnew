import type { ServiceItem } from "@/components/home/ServicesSection";

export const seoHeading = "What's Included in Our";
export const seoHighlight = "SEO Services";
export const seoSubtitle = "A comprehensive, data-driven approach to dominating search results.";

export const seoServices: ServiceItem[] = [
  {
    id: "technical-audit",
    title: "Technical SEO Audit",
    description: "Crawl errors, site speed, indexing issues — we find and fix everything holding your rankings back.",
    badges: ["Site Crawl", "Core Web Vitals", "Indexing", "Schema"],
    videoSrc: "/videos/websitedevelopment.mp4",
    link: "/services/seo",
    area: "top-left",
  },
  {
    id: "keyword-strategy",
    title: "Keyword Research & Strategy",
    description: "Data-driven keyword mapping aligned with search intent and your business goals.",
    badges: ["Search Intent", "Gap Analysis", "Long-Tail", "Mapping"],
    videoSrc: null,
    link: "/services/seo",
    area: "bottom-left",
  },
  {
    id: "on-page",
    title: "On-Page Optimization",
    description: "Title tags, meta descriptions, heading structure, and internal linking — optimized page by page.",
    badges: ["Meta Tags", "Headings", "Internal Links", "Content"],
    videoSrc: null,
    link: "/services/seo",
    area: "top-center",
  },
  {
    id: "link-building",
    title: "Link Building & Digital PR",
    description: "White-hat outreach and digital PR to earn authoritative backlinks that move the needle.",
    badges: ["Outreach", "Guest Posts", "Digital PR", "Authority"],
    videoSrc: "/videos/seo.mp4",
    link: "/services/seo",
    area: "bottom-center",
  },
  {
    id: "local-seo",
    title: "Local SEO",
    description: "Google Business Profile, local citations, and review strategy to dominate your area in Sydney and beyond.",
    badges: ["Google Business", "Citations", "Reviews", "Map Pack"],
    videoSrc: "/videos/brand.mp4",
    link: "/services/seo",
    area: "right",
  },
  {
    id: "content-strategy",
    title: "Content Strategy & Creation",
    description: "SEO-optimized blog posts, landing pages, and pillar content that ranks and converts. We handle research, writing, and publishing.",
    badges: ["Blog Posts", "Landing Pages", "Pillar Content", "Copywriting"],
    videoSrc: "/videos/googleads.mp4",
    link: "/services/seo",
    area: "bottom-wide",
  },
  {
    id: "reporting",
    title: "Reporting & Analytics",
    description: "Monthly reports with clear KPIs: rankings, traffic, conversions — no vanity metrics, just results.",
    badges: ["Rankings", "Traffic", "Conversions", "Insights"],
    videoSrc: null,
    link: "/services/seo",
    area: "bottom-right",
  },
];