import type { ServiceItem } from "@/components/home/SubServicesSection";

export const socialMgmtHeading = "What We Actually";
export const socialMgmtHighlight = "Do For You";
export const socialMgmtSubtitle = "No fluff. Here's exactly what you get when we run your socials.";

export const socialMgmtServices: ServiceItem[] = [
  {
    id: "consistent-content",
    title: "Your Feed, Always Fresh",
    description: "Two polished posts per week across your chosen platforms. Planned around your business goals and published like clockwork. No gaps, no guesswork, no last-minute scrambles.",
    badges: ["Instagram", "Facebook", "TikTok", "LinkedIn"],
    videoSrc: "/videos/websitedevelopment.mp4",
    link: "/services/social-media-management",
    area: "top-left",
  },
  {
    id: "captions-design",
    title: "Words & Visuals That Land",
    description: "We write copy in your voice and pair it with bold, on-brand design. Every post is crafted for the platform it lives on, not recycled across all of them.",
    badges: ["Copywriting", "Graphic Design", "Brand Voice", "Platform-Native"],
    videoSrc: null,
    link: "/services/social-media-management",
    area: "bottom-left",
  },
  {
    id: "scheduling-hashtags",
    title: "Posted at the Right Moment",
    description: "We figure out when your audience is paying attention and make sure your content lands right on time. Paired with targeted hashtags so the right people actually see it.",
    badges: ["Peak-Time Posting", "Hashtag Research", "Reach", "Visibility"],
    videoSrc: null,
    link: "/services/social-media-management",
    area: "top-center",
  },
  {
    id: "content-shoots",
    title: "Real Content, Shot by Us",
    description: "Ditch the stock library. We offer professional photo and video shoots tailored to your brand. Reels, product shots, behind-the-scenes, all filmed, edited and ready to post.",
    badges: ["Photography", "Video", "Reels", "Editing"],
    videoSrc: "/videos/seo.mp4",
    link: "/services/social-media-management",
    area: "bottom-center",
  },
  {
    id: "reporting",
    title: "Numbers Without the Nonsense",
    description: "Once a month we send you a straight-up breakdown. What grew, what flopped, and exactly what we're adjusting. Clear charts, zero jargon, always actionable.",
    badges: ["Monthly Reports", "Performance", "Growth", "Actionable"],
    videoSrc: "/videos/SPweb4.mp4",
    link: "/services/social-media-management",
    area: "right",
  },
  {
    id: "community",
    title: "Your Inbox, Our Problem",
    description: "We jump into your comments and DMs daily — answering questions, thanking followers and making sure every enquiry gets a response before it goes cold.",
    badges: ["DMs", "Comments", "Mentions", "Daily"],
    videoSrc: "/videos/SPweb3.mp4",
    link: "/services/social-media-management",
    area: "bottom-wide",
  },
  {
    id: "strategy",
    title: "Built Around Your Goals",
    description: "We kick things off with a full audit — your brand, your market, your competitors. Then we map out a content plan designed to move the needle on what actually matters to you.",
    badges: ["Brand Audit", "Market Research", "Content Plan", "KPIs"],
    videoSrc: null,
    link: "/services/social-media-management",
    area: "bottom-right",
  },
];