// data/services/website-development.ts
import { ServicePageData } from "@/types/service";

export const websiteDevelopmentData: ServicePageData = {
  slug: "website-development",
  title: "Website Development",
  subtitle: "Beautiful, fast websites built to convert.",

  hero: {
    headline: "Websites That Work\nAs Hard As You Do",
    subheadline:
      "We design and build high-performance websites that look stunning, load fast, and turn visitors into customers.",
    ctaLabel: "Start Your Project",
    ctaLink: "/contact?service=website-development",
    mediaSrc: "/videos/websitedevelopment.mp4",
    mediaType: "video",
    badges: ["UI/UX Design", "CMS Integration", "Performance", "SEO Ready"],
  },

  overview: {
    heading: "More Than Just a Pretty Face",
    body: "Your website is the foundation of your digital presence. We combine clean design with technical excellence to create sites that are accessible, lightning-fast, and optimized for every device. From custom builds to CMS-powered solutions, we tailor every project to your goals.",
    imageSrc: "/images/services/web-overview.webp",
    stats: [
      { value: "99", label: "Lighthouse Score Avg." },
      { value: "2.1s", label: "Avg. Load Time" },
      { value: "3x", label: "Conversion Uplift" },
    ],
  },

  features: [
    {
      title: "Custom UI/UX Design",
      description:
        "Every pixel is intentional. We craft interfaces that guide users toward action with clarity and delight.",
      icon: "Palette",
    },
    {
      title: "CMS Integration",
      description:
        "WordPress, Webflow, Sanity — pick your stack. We set it up so your team can update content without a developer.",
      icon: "Layers",
    },
    {
      title: "Performance Optimization",
      description:
        "Lazy loading, code splitting, image optimization. Your site scores 90+ on Core Web Vitals.",
      icon: "Zap",
    },
    {
      title: "Responsive & Accessible",
      description:
        "Mobile-first design with WCAG 2.1 compliance baked in from the start.",
      icon: "Smartphone",
    },
    {
      title: "SEO Foundation",
      description:
        "Semantic HTML, structured data, optimized meta — your site is search-ready from day one.",
      icon: "Search",
    },
    {
      title: "Analytics & Tracking",
      description:
        "GA4, Tag Manager, conversion tracking — we wire up the data so you can measure what matters.",
      icon: "BarChart3",
    },
  ],

  process: {
    heading: "How We Build It",
    steps: [
      {
        title: "Discovery & Strategy",
        description:
          "We map your goals, audience, and competitors to define the perfect approach.",
      },
      {
        title: "Design & Prototyping",
        description:
          "Interactive Figma prototypes so you see and feel the experience before a single line of code.",
      },
      {
        title: "Development & QA",
        description:
          "Clean, modular code with rigorous cross-browser and device testing.",
      },
      {
        title: "Launch & Optimize",
        description:
          "We handle deployment, monitor performance, and iterate based on real user data.",
      },
    ],
  },

  testimonials: [
    {
      quote:
        "They delivered a site that not only looks incredible but tripled our lead generation in the first month.",
      author: "Sarah Mitchell",
      role: "Marketing Director",
      company: "Greenline Co.",
      avatarSrc: "/images/testimonials/sarah.webp",
    },
  ],

  faq: [
    {
      question: "How long does a website project take?",
      answer:
        "Most projects take 6–10 weeks from kickoff to launch, depending on complexity and content readiness.",
    },
    {
      question: "Do you work with WordPress?",
      answer:
        "Yes — we build on WordPress, Webflow, Next.js, and headless CMS setups depending on your needs.",
    },
    {
      question: "Will I be able to edit the site myself?",
      answer:
        "Absolutely. We set up an intuitive CMS and train your team so you're never dependent on us for simple changes.",
    },
  ],

  cta: {
    heading: "Ready to Build Something Great?",
    subheading: "Let's talk about your project and create a site that drives results.",
    buttonLabel: "Get a Free Consultation",
    buttonLink: "/contact?service=website-development",
  },

  meta: {
    title: "Website Development Services | YourAgency",
    description:
      "Custom website design and development that converts. Fast, accessible, SEO-ready sites built for growth.",
    ogImage: "/images/og/website-development.webp",
  },
};