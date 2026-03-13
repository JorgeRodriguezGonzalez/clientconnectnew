import type { ServiceItem } from "@/components/home/SubServicesSection";

export const brandIdentityHeading = "What's Included in Our";
export const brandIdentityHighlight = "Brand Identity";
export const brandIdentitySubtitle = "A cohesive visual identity that makes your business instantly recognizable.";

export const brandIdentityServices: ServiceItem[] = [
  {
    id: "logo-design",
    title: "Logo Design",
    description: "Memorable logos that capture your brand essence and work across every touchpoint and size.",
    badges: ["Concepts", "Refinement", "File Formats", "Usage"],
    videoSrc: null,
    link: "/services/brand-identity",
    area: "top-left",
  },
  {
    id: "brand-guidelines",
    title: "Brand Guidelines",
    description: "Clear guidelines for logo use, colours, typography, and tone so your brand stays consistent.",
    badges: ["Logo Rules", "Spacing", "Don'ts", "Examples"],
    videoSrc: null,
    link: "/services/brand-identity",
    area: "bottom-left",
  },
  {
    id: "typography",
    title: "Typography",
    description: "Typeface selection and hierarchy that reinforce your brand personality and improve readability.",
    badges: ["Primary Font", "Secondary", "Hierarchy", "Web & Print"],
    videoSrc: null,
    link: "/services/brand-identity",
    area: "top-center",
  },
  {
    id: "color-palette",
    title: "Color Palette",
    description: "Strategic colour systems that evoke the right emotions and ensure accessibility and consistency.",
    badges: ["Primary", "Secondary", "Accents", "Accessibility"],
    videoSrc: null,
    link: "/services/brand-identity",
    area: "bottom-center",
  },
  {
    id: "brand-strategy",
    title: "Brand Strategy",
    description: "Positioning, messaging, and voice that differentiate you and resonate with your audience.",
    badges: ["Positioning", "Messaging", "Voice", "Personality"],
    videoSrc: null,
    link: "/services/brand-identity",
    area: "right",
  },
  {
    id: "visual-identity-system",
    title: "Visual Identity System",
    description: "Complete system of templates, patterns, and assets for marketing, social, and collateral.",
    badges: ["Templates", "Patterns", "Icons", "Assets"],
    videoSrc: null,
    link: "/services/brand-identity",
    area: "bottom-wide",
  },
];
