import type { ServiceItem } from "@/components/home/SubServicesSection";

export const socialMgmtHeading = "What's Included in Our";
export const socialMgmtHighlight = "Social Media Management";
export const socialMgmtSubtitle = "Everything you need to build your brand and grow your audience.";

export const socialMgmtServices: ServiceItem[] = [
  {
    id: "brand-immersion",
    title: "Brand Immersion & Voice",
    description: "We learn your brand voice, visual identity, audience, and goals inside and out — so every post sounds authentically you.",
    badges: ["Brand Voice", "Visual Identity", "Audience", "Tone"],
    videoSrc: "/videos/websitedevelopment.mp4",
    link: "/services/social-media-management",
    area: "top-left",
  },
  {
    id: "content-calendar",
    title: "Content Strategy & Calendar",
    description: "Monthly content calendars aligned with your brand pillars, campaigns, and business objectives — approved by you before anything goes live.",
    badges: ["Monthly Calendar", "Brand Pillars", "Campaigns", "Approval"],
    videoSrc: null,
    link: "/services/social-media-management",
    area: "bottom-left",
  },
  {
    id: "content-creation",
    title: "Content Creation & Design",
    description: "Copywriting, graphic design, Reels, and Stories — all on-brand and optimised for each platform's algorithm and audience.",
    badges: ["Reels", "Stories", "Graphics", "Copywriting"],
    videoSrc: null,
    link: "/services/social-media-management",
    area: "top-center",
  },
  {
    id: "scheduling",
    title: "Scheduling & Publishing",
    description: "Consistent posting at optimal times across all your platforms. We handle everything end-to-end so you never miss a beat.",
    badges: ["Optimal Times", "Cross-Platform", "Consistency", "Automation"],
    videoSrc: "/videos/seo.mp4",
    link: "/services/social-media-management",
    area: "bottom-center",
  },
  {
    id: "community",
    title: "Community Management",
    description: "We monitor comments, DMs, and mentions — responding on your behalf to keep engagement high and your audience happy.",
    badges: ["Comments", "DMs", "Mentions", "Engagement"],
    videoSrc: "/videos/SPweb4.mp4",
    link: "/services/social-media-management",
    area: "right",
  },
  {
    id: "influencer",
    title: "Influencer Coordination",
    description: "We identify, brief, and manage influencer partnerships that amplify your reach authentically and drive real engagement.",
    badges: ["Outreach", "Briefing", "Management", "Partnerships"],
    videoSrc: "/videos/SPweb3.mp4",
    link: "/services/social-media-management",
    area: "bottom-wide",
  },
  {
    id: "monthly-reporting",
    title: "Monthly Performance Reports",
    description: "Clear reports on growth, engagement, reach, and content performance with actionable insights to refine the strategy.",
    badges: ["Growth", "Engagement", "Reach", "Insights"],
    videoSrc: null,
    link: "/services/social-media-management",
    area: "bottom-right",
  },
];