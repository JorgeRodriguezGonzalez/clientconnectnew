import { useState, useEffect, useRef } from "react";
import { Globe, TrendingUp, Search, Megaphone } from "lucide-react";

const CYAN = "#06b6d4";
const GREEN = "#34d399";

// Datos actualizados con tus clientes y servicios
const caseStudies = [
  {
    id: "cs1",
    icon: Search,
    label: "Mould Remediation & Sanitising",
    title: "NANOTISE: DOMINATING THE HYGIENE SECTOR",
    highlight: "150% INCREASE IN ORGANIC INQUIRIES. TOP 3 RANKINGS.",
    description:
      "Nanotise needed to stand out in a competitive health-focused market. We implemented a technical SEO audit and a content strategy that positioned them as the authority in mould remediation across Sydney, driving consistent high-quality leads.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
    top: 126,
  },
  {
    id: "cs2",
    icon: Globe,
    label: "Landscape Architecture",
    title: "LC LANDSCAPING: SYDNEY’S PREMIER DESIGNERS",
    highlight: "NEW HIGH-CONVERTING PORTFOLIO WEBSITE. 40% MORE BOOKINGS.",
    description:
      "We rebuilt their digital presence to match the quality of their physical craftsmanship. A mobile-first website combined with a targeted Social Media strategy showcased their Sydney projects, turning passive scrollers into premium clients.",
    showTaskCard: true, // Mantiene la animación de la tarjeta de tareas (SEO/Tasks)
    top: 156,
  },
  {
    id: "cs3",
    icon: TrendingUp,
    label: "Roofing Services",
    title: "YOUR LOCAL ROOFERS: NATIONWIDE GROWTH",
    highlight: "SCALING GOOGLE ADS ACROSS AUSTRALIA. $45 COST PER LEAD.",
    description:
      "For a national service provider, efficiency is key. We optimized their Google Ads campaigns and landing pages to reduce CPL by 30% while expanding their reach to every major Australian city.",
    showCarousel: true, // Mantiene el carrusel de herramientas (Ads/Meta)
    top: 186,
  },
  {
    id: "cs4",
    icon: Megaphone,
    label: "Outdoor Living",
    title: "PIONEER SHADE: SYDNEY’S BEST PERGOLAS",
    highlight: "DOMINATING LOCAL SEARCH & SOCIAL ENGAGEMENT.",
    description:
      "Pioneer Shade Structures designs premium patios. We delivered an integrated SEO and Meta Ads strategy that put their designs in front of Sydney homeowners, resulting in a record-breaking summer season.",
    image: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?w=800&q=80",
    top: 216,
  },
  {
    id: "cs5",
    icon: Globe,
    label: "Bathroom Renovations",
    title: "PREMIER & PROLEX: THE RENOVATION SPECIALISTS",
    highlight: "DUAL-BRAND STRATEGY. 300+ QUALIFIED MONTHLY LEADS.",
    description:
      "Managing two major players in the bathroom renovation space required surgical precision. We deployed separate SEO and Google Ads funnels for Premier and Prolex to capture the entire Sydney renovation market.",
    image: "https://images.unsplash.com/photo-1584622781564-1d9876a13300?w=800&q=80",
    top: 246,
  },
];

// ... (Componentes TaskCard, AddButton, InfiniteCarousel, AnimatedImage se mantienen igual)

export const HowWeWork = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center px-10 py-40" style={{ background: "#FAFAFA" }}>
      <style>{`
        @keyframes gradientMove {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <div className="flex flex-col items-center text-center" style={{ gap: 16 }}>
        <span className="px-3 py-1.5 rounded-lg border font-semibold uppercase tracking-widest"
          style={{ fontSize: 10, letterSpacing: 2, background: "rgb(250,250,250)", borderColor: "rgb(228,228,231)", color: "rgb(107,114,128)" }}>
          Proven Results
        </span>

        <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.5px" }}>
          <span style={{ color: "#111827" }}>Client </span>
          <span style={{
            background: "linear-gradient(90deg, #34d399, #06b6d4, #34d399)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "gradientMove 3s linear infinite",
          }}>
            Success Stories
          </span>
        </h2>

        <p style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500, fontSize: 16, lineHeight: 1.6, color: "#6b7280", maxWidth: 550 }}>
          Real results for Sydney's leading businesses. From SEO to high-converting websites, we help local brands dominate their industry.
        </p>
      </div>

      <div className="flex flex-col gap-8 w-full" style={{ maxWidth: 1000, marginTop: 96 }}>
        {caseStudies.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              style={{ position: "sticky", top: step.top, zIndex: index + 1, background: "#ffffff" }}>
              <div className="flex" style={{ height: 420 }}>
                {/* Lado Izquierdo: Texto */}
                <div className="flex flex-col gap-4 p-10" style={{ width: 450 }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${CYAN}18` }}>
                      <Icon size={16} color={CYAN} />
                    </div>
                    <h5 className="text-gray-400 text-xs font-bold uppercase tracking-wider">{step.label}</h5>
                  </div>
                  
                  <h3 className="text-gray-900 text-2xl font-black leading-tight">
                    {step.title}
                  </h3>

                  <p className="font-bold text-sm" style={{ color: GREEN }}>
                    {step.highlight}
                  </p>

                  <p className="text-gray-500 text-base leading-relaxed" style={{ marginTop: 8 }}>
                    {step.description}
                  </p>

                  <button className="mt-auto flex items-center gap-2 font-bold text-sm uppercase tracking-tight text-gray-800 border-b-2 border-black w-fit pb-1 hover:text-cyan-600 hover:border-cyan-600 transition-all">
                    View Case Study
                  </button>
                </div>

                {/* Lado Derecho: Visuales */}
                <div className="flex-1 relative overflow-hidden bg-gray-50">
                  {step.showTaskCard && <TaskCardBackground />}
                  {step.showCarousel && <InfiniteCarousel />}
                  {step.image && (
                    <AnimatedImage src={step.image} alt={step.title} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};