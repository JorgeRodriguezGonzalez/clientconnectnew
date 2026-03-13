import type { ServiceItem } from "@/components/home/SubServicesSection";

export const contentCreationHeading = "What's Included in Our";
export const contentCreationHighlight = "Content Creation";
export const contentCreationSubtitle = "Strategic content that drives engagement, builds authority, and converts.";

export const contentCreationServices: ServiceItem[] = [
  {
    id: "blog-writing",
    title: "Blog & Article Writing",
    description: "SEO-optimised blog posts and long-form articles that establish thought leadership and drive organic traffic.",
    badges: ["Research", "SEO Copy", "Editing", "Publishing"],
    videoSrc: null,
    link: "/services/content-creation",
    area: "top-left",
  },
  {
    id: "video-content",
    title: "Video Content",
    description: "Scripts, storyboards, and video production support for social, ads, and website content that engages.",
    badges: ["Scripts", "Storyboards", "Short-Form", "Tutorials"],
    videoSrc: null,
    link: "/services/content-creation",
    area: "bottom-left",
  },
  {
    id: "photography",
    title: "Photography & Visuals",
    description: "Professional photography and curated visuals that bring your brand story to life across all channels.",
    badges: ["Product Shots", "Lifestyle", "Stock Curation", "Editing"],
    videoSrc: null,
    link: "/services/content-creation",
    area: "top-center",
  },
  {
    id: "social-media-content",
    title: "Social Media Content",
    description: "Scroll-stopping captions, carousels, and stories designed for engagement and brand consistency.",
    badges: ["Captions", "Carousels", "Stories", "Reels"],
    videoSrc: null,
    link: "/services/content-creation",
    area: "bottom-center",
  },
  {
    id: "email-newsletters",
    title: "Email Newsletters",
    description: "Newsletter strategy, copy, and design that keep your audience engaged and drive repeat visits.",
    badges: ["Strategy", "Copy", "Design", "Automation"],
    videoSrc: null,
    link: "/services/content-creation",
    area: "right",
  },
  {
    id: "infographics",
    title: "Infographics & Visual Content",
    description: "Data-driven infographics and visual assets that simplify complex ideas and boost shareability.",
    badges: ["Data Viz", "Branded", "Downloadable", "Social"],
    videoSrc: null,
    link: "/services/content-creation",
    area: "bottom-wide",
  },
];
