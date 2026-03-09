// data/services/index.ts

export { websiteDevelopmentData } from "./website-development";
export { seoData } from "./seo";
export { googleAdsData } from "./google-ads";
export { socialMediaAdsData } from "./social-media-ads";
export { socialMediaManagementData } from "./social-media-management";

// Helper para buscar por slug
import { websiteDevelopmentData } from "./website-development";
import { seoData } from "./seo";
import { googleAdsData } from "./google-ads";
import { socialMediaAdsData } from "./social-media-ads";
import { socialMediaManagementData } from "./social-media-management";
import type { ServicePageData } from "@/types/service";

const allServices: ServicePageData[] = [
  websiteDevelopmentData,
  seoData,
  googleAdsData,
  socialMediaAdsData,
  socialMediaManagementData,
];

export const getServiceBySlug = (slug: string): ServicePageData | undefined =>
  allServices.find((s) => s.slug === slug);

export const getAllServiceSlugs = (): string[] =>
  allServices.map((s) => s.slug);