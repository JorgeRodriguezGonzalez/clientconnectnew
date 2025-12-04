"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Target, Globe, Search, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// --- Components ---

const BackgroundStripes = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden opacity-[0.04]"
    style={{
      backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZSURBVHgBxcghAQAAAIMw+pf+C+CZHLilebfsBfsvTewEAAAAAElFTkSuQmCC")`,
      backgroundRepeat: 'repeat',
    }}
  />
);

// --- Types ---

export type OurStepsVersion2Entry = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
  image?: string;
  button?: {
    url: string;
    text: string;
  };
};

export interface OurStepsVersion2Props {
  titlePrefix?: string;
  gradientTitle?: string;
  description?: string;
  entries?: OurStepsVersion2Entry[];
  className?: string;
}

// --- Data ---

export const defaultEntries: OurStepsVersion2Entry[] = [
  {
    icon: Target,
    title: "Qualified Lead Generation",
    subtitle: "Phase 1 • Daily Influx",
    description:
      "Our targeted campaigns connect you with customers actively searching for your services. Watch your inbox fill with genuine opportunities ready to convert.",
    items: [
      "AI-driven audience targeting strategies",
      "High-conversion landing page optimization",
      "Real-time lead qualification & verification",
      "Automated nurturing sequences for cold leads",
      "Direct integration with your sales CRM",
    ],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    button: {
      url: "#contact",
      text: "Start Getting Leads",
    },
  },
  {
    icon: Globe,
    title: "Omni-Channel Expansion",
    subtitle: "Phase 2 • Visibility",
    description:
      "From Google to social media, we create cohesive strategies that maximize your visibility. Your brand deserves to be seen everywhere your customers are.",
    items: [
      "Cohesive cross-platform brand identity",
      "SEO-optimized content for Google rankings",
      "Social media management & viral strategies",
      "Paid advertising on Meta, LinkedIn & TikTok",
    ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
  },
  {
    icon: Search,
    title: "Strategic Digital Audit",
    subtitle: "Phase 3 • Analysis",
    description:
      "We analyze your current digital presence and provide a clear roadmap. Every recommendation comes with our commitment to implement the changes for you.",
    items: [
      "Deep-dive competitor performance analysis",
      "Technical SEO & User Experience (UX) review",
      "Conversion Rate Optimization (CRO) audit",
      "Data-driven roadmap with actionable steps",
    ],
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2670&auto=format&fit=crop",
  },
  {
    icon: TrendingUp,
    title: "High-Intent Conversion",
    subtitle: "Phase 4 • Revenue",
    description:
      "Our lead generation strategies target customers ready to buy. We optimize every touchpoint to turn interest into revenue for your business.",
    items: [
      "End-to-end sales funnel optimization",
      "Advanced retargeting for interested prospects",
      "Revenue tracking & ROI reporting",
      "Sales enablement materials & scripts",
    ],
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2632&auto=format&fit=crop",
    button: {
      url: "#pricing",
      text: "Scale Your Revenue",
    },
  },
];

const COLORS = {
  turquoise: "rgb(103, 188, 183)", // #67bcb7
  coral: "rgb(222, 131, 99)",     // #de8363
  gold: "rgb(237, 191, 134)",     // #edbf86
};

// --- Main Component ---

export default function OurStepsVersion2({
  titlePrefix = "Our Proven",
  gradientTitle = "Marketing Process",
  description = "A data-driven approach designed to scale your business, optimize your presence, and turn prospects into loyal customers.",
  entries = defaultEntries,
}: OurStepsVersion2Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setItemRef = (el: HTMLDivElement | null, i: number) => {
    itemRefs.current[i] = el;
  };
  const setSentinelRef = (el: HTMLDivElement | null, i: number) => {
    sentinelRefs.current[i] = el;
  };

  useEffect(() => {
    if (!sentinelRefs.current.length) return;

    let frame = 0;
    const updateActiveByProximity = () => {
      frame = requestAnimationFrame(updateActiveByProximity);
      const centerY = window.innerHeight / 2;
      let bestIndex = 0;
      let bestDist = Infinity;
      sentinelRefs.current.forEach((node, i) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });
      if (bestIndex !== activeIndex) setActiveIndex(bestIndex);
    };

    frame = requestAnimationFrame(updateActiveByProximity);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(0);
  }, []);

  return (
    // SECCIÓN PRINCIPAL
    <section className="relative w-full overflow-hidden bg-white">
      
      {/* 1. FONDO DE RAYAS (Visible en los laterales) */}
      <BackgroundStripes />

      {/* 
         2. CONTENEDOR ESTRUCTURAL 
         - Cambiado max-w-[1280px] a max-w-5xl (1024px) para estrechar la caja blanca
         - border-l y border-r añaden las líneas grises verticales
      */}
      <div className="relative z-10 w-full max-w-5xl mx-auto bg-white border-l border-r border-zinc-200">
        
        {/* Padding interno del contenido */}
        <div className="py-32 px-4 md:px-8">
          
          {/* HEADER */}
          <div className="mx-auto max-w-[600px] flex flex-col gap-6 text-center mb-16 md:mb-24">
            <div className="text-sm font-medium tracking-[2.2px] uppercase text-gray-500">
              WORKFLOW
            </div>

            <h2 className="text-[26px] md:text-[32px] lg:text-[42px] font-bold leading-[1.1] tracking-tight text-gray-900">
              {titlePrefix}{' '}
              <span className="whitespace-nowrap">
                <motion.span
                  initial={{ backgroundPosition: "400% 50%" }}
                  animate={{ backgroundPosition: ["400% 50%", "0% 50%"] }}
                  transition={{
                    duration: 12,
                    ease: "linear",
                    repeat: Infinity
                  }}
                  style={{
                    display: "inline-block",
                    backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, 0), ${COLORS.gold}, ${COLORS.coral}, ${COLORS.turquoise}, rgba(255, 255, 255, 0))`,
                    backgroundSize: "400% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent"
                  }}
                >
                  {gradientTitle}
                </motion.span>
                <span className="text-gray-900">.</span>
              </span>
            </h2>

            <p className="text-[14px] md:text-[16px] font-medium leading-relaxed text-gray-600 tracking-tight">
              {description}
            </p>
          </div>

          {/* LISTA DE PASOS */}
          <div className="mx-auto max-w-3xl space-y-16 md:space-y-24">
            {entries.map((entry, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={index}
                  className="relative flex flex-col gap-4 md:flex-row md:gap-16"
                  ref={(el) => setItemRef(el, index)}
                  aria-current={isActive ? "true" : "false"}
                >
                  {/* Sticky meta column */}
                  <div className="top-32 flex h-min w-64 shrink-0 items-center gap-4 md:sticky">
                    <div className="flex items-center gap-3">
                      <div 
                        className={`p-2 rounded-lg transition-colors duration-300 ${
                          isActive ? "text-white" : "bg-gray-100 text-gray-500"
                        }`}
                        style={{
                          backgroundColor: isActive ? COLORS.turquoise : undefined
                        }}
                      >
                        <entry.icon className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {entry.title}
                        </span>
                        <span className="text-xs text-gray-500">
                          {entry.subtitle}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Invisible sentinel */}
                  <div
                    ref={(el) => setSentinelRef(el, index)}
                    aria-hidden
                    className="absolute -top-24 left-0 h-12 w-12 opacity-0"
                  />

                  {/* Content column */}
                  <article
                    className={
                      "flex flex-col rounded-2xl border p-3 transition-all duration-300 " +
                      (isActive
                        ? "bg-white shadow-xl shadow-slate-200/50 scale-[1.02]"
                        : "bg-gray-50/50 border-gray-100 opacity-70")
                    }
                    style={{
                      borderColor: isActive ? "rgba(103, 188, 183, 0.2)" : undefined
                    }}
                  >
                    {entry.image && (
                      <img
                        src={entry.image}
                        alt={`${entry.title} visual`}
                        className="mb-4 w-full h-72 rounded-lg object-cover bg-gray-100"
                        loading="lazy"
                      />
                    )}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h2
                          className={
                            "text-md font-bold leading-tight tracking-tight md:text-lg transition-colors duration-200 text-gray-900"
                          }
                        >
                          {entry.title}
                        </h2>
                        
                        <p
                          className={
                            "text-xs leading-relaxed md:text-sm transition-all duration-300 " +
                            (isActive 
                              ? "text-gray-600 line-clamp-none font-medium" 
                              : "text-gray-400 line-clamp-2")
                          }
                        >
                          {entry.description}
                        </p>
                      </div>

                      <div
                        aria-hidden={!isActive}
                        className={
                          "grid transition-all duration-500 ease-out " +
                          (isActive 
                            ? "grid-rows-[1fr] opacity-100" 
                            : "grid-rows-[0fr] opacity-0")
                        }
                      >
                        <div className="overflow-hidden">
                          <div className="space-y-4 pt-2">
                            {entry.items && entry.items.length > 0 && (
                              <div className="rounded-lg border border-gray-100 bg-white p-4">
                                <ul className="space-y-2">
                                  {entry.items.map((item, itemIndex) => (
                                    <li 
                                      key={itemIndex} 
                                      className="flex items-start gap-2 text-sm text-gray-600"
                                    >
                                      <div 
                                        className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" 
                                        style={{ backgroundColor: COLORS.turquoise }}
                                      />
                                      <span className="leading-relaxed">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {entry.button && (
                              <div className="flex justify-end">
                                <Button 
                                  size="sm"
                                  className="group font-normal transition-all duration-200 text-white shadow-md hover:shadow-lg active:scale-95 border-none" 
                                  style={{
                                    backgroundColor: COLORS.coral,
                                  }}
                                  asChild
                                >
                                  <a href={entry.button.url} target="_blank" rel="noreferrer">
                                    {entry.button.text} 
                                    <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                  </a>
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}