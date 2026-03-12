import type { ServiceItem } from "@/components/home/SubServicesSection";

export const socialAdsHeading = "What's Included in Our";
export const socialAdsHighlight = "Social Media Ads";
export const socialAdsSubtitle = "Precision-targeted campaigns that turn impressions into customers.";

export const socialAdsServices: ServiceItem[] = [
  {
    id: "audience-research",
    title: "Audience & Market Research",
    description: "Deep dive into your ideal customer profiles, competitor ad libraries, and platform opportunities to find your best audience.",
    badges: ["ICP Research", "Competitor Ads", "Platform Fit", "Insights"],
    videoSrc: "/videos/websitedevelopment.mp4",
    link: "/services/social-media-ads",
    area: "top-left",
  },
  {
    id: "creative-strategy",
    title: "Creative Strategy & Production",
    description: "Thumb-stopping static, video, and carousel ads designed and copywritten specifically for each platform's best practices.",
    badges: ["Video Ads", "Carousels", "Copywriting", "Design"],
    videoSrc: null,
    link: "/services/social-media-ads",
    area: "bottom-left",
  },
  {
    id: "meta-campaigns",
    title: "Meta Ads (Facebook & Instagram)",
    description: "Full-funnel campaigns leveraging Meta's audience network, Advantage+ automation, and dynamic creative for maximum reach.",
    badges: ["Facebook", "Instagram", "Advantage+", "Dynamic"],
    videoSrc: null,
    link: "/services/social-media-ads",
    area: "top-center",
  },
  {
    id: "linkedin-ads",
    title: "LinkedIn Ads for B2B",
    description: "Campaigns targeting by job title, company size, industry, and seniority — built for high-value B2B lead generation.",
    badges: ["Job Targeting", "Company Size", "InMail", "Lead Gen"],
    videoSrc: "/videos/seo.mp4",
    link: "/services/social-media-ads",
    area: "bottom-center",
  },
  {
    id: "retargeting-lookalikes",
    title: "Retargeting & Lookalikes",
    description: "Custom and lookalike audiences to re-engage warm prospects and find new ones just like your best customers.",
    badges: ["Custom Audiences", "Lookalikes", "Retargeting", "Pixels"],
    videoSrc: "/videos/SPweb4.mp4",
    link: "/services/social-media-ads",
    area: "right",
  },
  {
    id: "testing-scaling",
    title: "A/B Testing & Scaling",
    description: "Structured testing across audiences, creatives, and placements. We kill underperformers, scale winners, and beat ad fatigue.",
    badges: ["Split Testing", "Creative Rotation", "Scaling", "Optimisation"],
    videoSrc: "/videos/SPweb3.mp4",
    link: "/services/social-media-ads",
    area: "bottom-wide",
  },
  {
    id: "attribution-reporting",
    title: "Attribution & Reporting",
    description: "Clear reporting across platforms with unified dashboards so you see the full picture — not just vanity metrics.",
    badges: ["Cross-Platform", "Dashboards", "ROAS", "Insights"],
    videoSrc: null,
    link: "/services/social-media-ads",
    area: "bottom-right",
  },
];