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
    imageSrc: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    link: "/services/seo",
    area: "top-left",
  },
  {
    id: "keyword-strategy",
    title: "Keyword Research & Strategy",
    description: "Data-driven keyword mapping aligned with search intent and your business goals.",
    badges: ["Search Intent", "Gap Analysis", "Long-Tail", "Mapping"],
    link: "/services/seo",
    area: "bottom-left",
  },
  {
    id: "on-page",
    title: "On-Page Optimization",
    description: "Title tags, meta descriptions, heading structure, and internal linking — optimized page by page.",
    badges: ["Meta Tags", "Headings", "Internal Links", "Content"],
    link: "/services/seo",
    area: "top-center",
  },
  {
    id: "link-building",
    title: "Link Building & Digital PR",
    description: "White-hat outreach and digital PR to earn authoritative backlinks that move the needle.",
    badges: ["Outreach", "Guest Posts", "Digital PR", "Authority"],
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    link: "/services/seo",
    area: "bottom-center",
  },
  {
    id: "local-seo",
    title: "Local SEO",
    description: "Google Business Profile, local citations, and review strategy to dominate your area in Sydney and beyond.",
    badges: ["Google Business", "Citations", "Reviews", "Map Pack"],
    imageSrc: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
    link: "/services/seo",
    area: "right",
  },
  {
    id: "content-strategy",
    title: "Content Strategy & Creation",
    description: "SEO-optimized blog posts, landing pages, and pillar content that ranks and converts. We handle research, writing, and publishing.",
    badges: ["Blog Posts", "Landing Pages", "Pillar Content", "Copywriting"],
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    link: "/services/seo",
    area: "bottom-wide",
  },
  {
    id: "reporting",
    title: "Reporting & Analytics",
    description: "Monthly reports with clear KPIs: rankings, traffic, conversions — no vanity metrics, just results.",
    badges: ["Rankings", "Traffic", "Conversions", "Insights"],
    link: "/services/seo",
    area: "bottom-right",
  },
];