// data/services/seo.ts
import { ServicePageData } from "@/types/service";

export const seoData: ServicePageData = {
  slug: "seo",
  title: "SEO",
  subtitle: "Dominate search results and drive organic traffic.",

  hero: {
    headline: "Get Found.\nGet Clicked.\nGet Customers.",
    subheadline:
      "We combine technical SEO, strategic content, and authoritative link building to put you at the top of Google — and keep you there.",
    ctaLabel: "Get Your Free SEO Audit",
    ctaLink: "/contact?service=seo",
    mediaSrc: "/videos/seo.mp4",
    mediaType: "video",
    badges: ["Technical Audit", "Keyword Strategy", "Link Building", "Local SEO"],
  },

  overview: {
    heading: "Organic Growth, Engineered",
    body: "SEO isn't guesswork — it's a system. We audit your technical foundation, research the keywords your customers actually use, and build a content and link strategy that compounds over time. No black-hat shortcuts, just sustainable growth.",
    imageSrc: "/images/services/seo-overview.webp",
    stats: [
      { value: "187%", label: "Avg. Traffic Increase" },
      { value: "Top 3", label: "Keyword Rankings" },
      { value: "4.2x", label: "ROI in 12 Months" },
    ],
  },

  features: [
    {
      title: "Technical SEO Audit",
      description:
        "Crawl errors, site speed, indexing issues — we find and fix everything holding you back.",
      icon: "Settings",
    },
    {
      title: "Keyword Research & Strategy",
      description:
        "Data-driven keyword mapping aligned with search intent and your business goals.",
      icon: "Search",
    },
    {
      title: "On-Page Optimization",
      description:
        "Title tags, meta descriptions, heading structure, internal linking — optimized page by page.",
      icon: "FileText",
    },
    {
      title: "Link Building",
      description:
        "White-hat outreach and digital PR to earn authoritative backlinks that move the needle.",
      icon: "Link",
    },
    {
      title: "Local SEO",
      description:
        "Google Business Profile, local citations, and review strategy to dominate your area.",
      icon: "MapPin",
    },
    {
      title: "Reporting & Analytics",
      description:
        "Monthly reports with clear KPIs: rankings, traffic, conversions — no vanity metrics.",
      icon: "BarChart3",
    },
  ],

  process: {
    heading: "Our SEO Process",
    steps: [
      {
        title: "Audit & Analysis",
        description:
          "Full technical crawl, competitor analysis, and keyword gap assessment.",
      },
      {
        title: "Strategy & Roadmap",
        description:
          "Prioritized action plan based on impact and effort, aligned with your business goals.",
      },
      {
        title: "Execution",
        description:
          "On-page fixes, content creation, and link building — executed week by week.",
      },
      {
        title: "Monitor & Iterate",
        description:
          "Continuous tracking, A/B testing, and strategy refinement based on real data.",
      },
    ],
  },

  faq: [
    {
      question: "How long before I see results?",
      answer:
        "SEO is a long game. Most clients see meaningful traffic increases in 3–6 months, with compounding returns after that.",
    },
    {
      question: "Do you guarantee #1 rankings?",
      answer:
        "No one can guarantee specific rankings — anyone who does is lying. We guarantee a rigorous, proven process and transparent reporting.",
    },
    {
      question: "Do you write the content too?",
      answer:
        "Yes. Our content team creates SEO-optimized blog posts, landing pages, and pillar content as part of the strategy.",
    },
  ],

  cta: {
    heading: "Stop Losing Traffic to Competitors",
    subheading: "Get a free SEO audit and see exactly where you're leaving money on the table.",
    buttonLabel: "Claim Your Free Audit",
    buttonLink: "/contact?service=seo",
  },

  meta: {
    title: "SEO Services | YourAgency",
    description:
      "Data-driven SEO services: technical audits, keyword strategy, link building, and local SEO to grow your organic traffic.",
    ogImage: "/images/og/seo.webp",
  },
};