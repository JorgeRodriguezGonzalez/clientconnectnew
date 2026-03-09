// data/services/social-media-management.ts
import { ServicePageData } from "@/types/service";

export const socialMediaManagementData: ServicePageData = {
  slug: "social-media-management",
  title: "Social Media Management",
  subtitle: "Build your brand and engage your community, consistently.",

  hero: {
    headline: "Your Brand,\nAlways On",
    subheadline:
      "We plan, create, and publish content that builds your audience and keeps your brand top of mind — so you can focus on running your business.",
    ctaLabel: "Get Started",
    ctaLink: "/contact?service=social-media-management",
    mediaSrc: null,
    mediaType: undefined,
    badges: ["Content Strategy", "Community Management", "Analytics", "Brand Voice"],
  },

  overview: {
    heading: "Consistency Builds Brands",
    body: "Social media isn't optional anymore — it's where your customers discover, evaluate, and connect with your brand. We handle everything from strategy and content creation to publishing and community management, ensuring your brand shows up with purpose every single day.",
    imageSrc: "/images/services/social-mgmt-overview.webp",
    stats: [
      { value: "340%", label: "Avg. Engagement Growth" },
      { value: "150+", label: "Posts/Month Managed" },
      { value: "24/7", label: "Community Monitoring" },
    ],
  },

  features: [
    {
      title: "Content Strategy",
      description: "Monthly content calendars aligned with your brand pillars, campaigns, and business objectives.",
      icon: "Calendar",
    },
    {
      title: "Content Creation",
      description: "Copywriting, graphic design, Reels, and Stories — all on-brand and optimized for each platform.",
      icon: "Palette",
    },
    {
      title: "Scheduling & Publishing",
      description: "Consistent posting at optimal times across all your platforms, managed end-to-end.",
      icon: "Clock",
    },
    {
      title: "Community Management",
      description: "We monitor comments, DMs, and mentions — responding on your behalf to keep engagement high.",
      icon: "MessageCircle",
    },
    {
      title: "Influencer Coordination",
      description: "Identify, brief, and manage influencer partnerships that amplify your reach authentically.",
      icon: "Star",
    },
    {
      title: "Monthly Reporting",
      description: "Clear reports on growth, engagement, reach, and content performance with actionable insights.",
      icon: "BarChart3",
    },
  ],

  process: {
    heading: "How We Manage Your Social",
    steps: [
      {
        title: "Brand Immersion",
        description: "We learn your brand voice, visual identity, audience, and goals inside and out.",
      },
      {
        title: "Strategy & Calendar",
        description: "A tailored content strategy and monthly calendar, approved by you before anything goes live.",
      },
      {
        title: "Create & Publish",
        description: "Our team produces all content, schedules posts, and manages publishing across platforms.",
      },
      {
        title: "Engage & Report",
        description: "Active community management plus monthly performance reviews to refine the strategy.",
      },
    ],
  },

  faq: [
    {
      question: "Which platforms do you manage?",
      answer: "We manage Instagram, Facebook, LinkedIn, TikTok, X (Twitter), and Pinterest. We'll recommend the right platforms based on where your audience is.",
    },
    {
      question: "Do I need to approve every post?",
      answer: "You'll receive the monthly content calendar for approval before publishing. Once approved, we handle everything — but you can always request changes.",
    },
    {
      question: "Can you work with our existing brand guidelines?",
      answer: "Absolutely. We adapt to your existing brand book, tone of voice, and visual guidelines to ensure consistency.",
    },
  ],

  cta: {
    heading: "Let Us Handle Your Social",
    subheading: "Free up your time and grow your audience with a dedicated social media team.",
    buttonLabel: "Book a Discovery Call",
    buttonLink: "/contact?service=social-media-management",
  },

  meta: {
    title: "Social Media Management Services | YourAgency",
    description: "Full-service social media management: strategy, content creation, publishing, and community management to grow your brand online.",
    ogImage: "/images/og/social-media-management.webp",
  },
};