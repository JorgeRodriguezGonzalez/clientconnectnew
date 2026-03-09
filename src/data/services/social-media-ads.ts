// data/services/social-media-ads.ts
import { ServicePageData } from "@/types/service";

export const socialMediaAdsData: ServicePageData = {
  slug: "social-media-ads",
  title: "Paid Social Ads",
  subtitle: "Reach your ideal customers with precision targeting.",

  hero: {
    headline: "Ads That Stop\nThe Scroll",
    subheadline:
      "We create and manage high-performing campaigns on Meta, TikTok, and LinkedIn that reach the right people at the right time.",
    ctaLabel: "Start Advertising",
    ctaLink: "/contact?service=social-media-ads",
    mediaSrc: "/videos/brand.mp4",
    mediaType: "video",
    badges: ["Meta Ads", "TikTok Ads", "LinkedIn Ads", "Retargeting"],
  },

  overview: {
    heading: "Social Advertising That Converts",
    body: "Social platforms have the most powerful targeting on the planet. We combine deep audience research, scroll-stopping creative, and rigorous testing to turn impressions into pipeline. Every campaign is built to drive measurable business outcomes — not just vanity metrics.",
    imageSrc: "/images/services/social-ads-overview.webp",
    stats: [
      { value: "4.8x", label: "Avg. ROAS" },
      { value: "62%", label: "Lower CPA" },
      { value: "12M+", label: "People Reached" },
    ],
  },

  features: [
    {
      title: "Meta Ads (Facebook & Instagram)",
      description: "Full-funnel campaigns leveraging Meta's audience network, Advantage+ automation, and dynamic creative.",
      icon: "Facebook",
    },
    {
      title: "TikTok Ads",
      description: "Native-feeling video ads that blend into the feed and drive engagement with younger demographics.",
      icon: "Video",
    },
    {
      title: "LinkedIn Ads",
      description: "B2B campaigns targeting by job title, company, industry, and seniority for high-value lead generation.",
      icon: "Briefcase",
    },
    {
      title: "Retargeting & Lookalikes",
      description: "Custom and lookalike audiences to re-engage warm prospects and find new ones just like your best customers.",
      icon: "Users",
    },
    {
      title: "Creative Production",
      description: "Thumb-stopping static, video, and carousel ads designed and tested for performance.",
      icon: "Image",
    },
    {
      title: "Attribution & Reporting",
      description: "Clear reporting across platforms with unified dashboards so you see the full picture.",
      icon: "PieChart",
    },
  ],

  process: {
    heading: "How We Run Your Ads",
    steps: [
      {
        title: "Audience & Market Research",
        description: "Deep dive into your ideal customer profiles, competitor ad libraries, and platform opportunities.",
      },
      {
        title: "Creative Strategy",
        description: "Ad concepts, copy variations, and visual formats tailored to each platform's best practices.",
      },
      {
        title: "Launch & Test",
        description: "Structured A/B testing across audiences, creatives, and placements to find winning combinations fast.",
      },
      {
        title: "Scale Winners",
        description: "We kill underperformers, scale winners, and continuously iterate creative to beat ad fatigue.",
      },
    ],
  },

  faq: [
    {
      question: "Which platform should I advertise on?",
      answer: "It depends on your audience. B2C brands often see the best results on Meta and TikTok, while B2B companies thrive on LinkedIn. We'll recommend the right mix based on your goals.",
    },
    {
      question: "Do you create the ad creative?",
      answer: "Yes — our team handles copywriting, graphic design, and video editing for all ad formats.",
    },
    {
      question: "What's the minimum budget?",
      answer: "We recommend at least $2,000/month per platform to get statistically meaningful data for optimization.",
    },
  ],

  cta: {
    heading: "Let's Make Social Work for You",
    subheading: "Book a strategy call and discover how paid social can fuel your growth.",
    buttonLabel: "Book a Strategy Call",
    buttonLink: "/contact?service=social-media-ads",
  },

  meta: {
    title: "Paid Social Ads Services | YourAgency",
    description: "Expert paid social advertising on Meta, TikTok, and LinkedIn. Precision targeting, creative production, and continuous optimization.",
    ogImage: "/images/og/social-media-ads.webp",
  },
};