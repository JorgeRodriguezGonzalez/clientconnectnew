import { useState, useEffect, useRef } from "react";
import { Search, Globe, TrendingUp, Zap, Check, Edit, Droplets, Home, Wrench, Shield, ExternalLink } from "lucide-react";

const CYAN = "#06b6d4";
const GREEN = "#34d399";
const DARK_BG = "#0A0A0A";
const CARD_BG = "#161616";

const workSteps = [
  {
    id: "s1",
    icon: Search,
    label: "Mould Remediation",
    title: "Nanotise: Mould Remediation & Sanitising works",
    description: "We implemented a strategic SEO and content roadmap for Nanotise, establishing them as Sydney's leading authority in mould remediation and hygiene services.",
    services: ["SEO", "Content Strategy", "Google Ads"],
    image: "/images/nanotise10.jpg",
    websiteUrl: "https://nanotise.com.au/",
    top: 80,
    mobileTop: 20,
  },
  {
    id: "s2",
    icon: Globe,
    label: "Landscaping",
    title: "Lifestyle Concepts: Sydney's Premier Landscape Designers",
    description: "For Lifestyle Concepts, we built a high-converting digital presence that showcases their premium landscape designs to high-end residential clients across Sydney.",
    services: ["Website", "UI/UX Design", "Local SEO"],
    showTaskCard: true,
    websiteUrl: "https://lclandscaping.com.au/",
    top: 105,
    mobileTop: 25,
  },
  {
    id: "s3",
    icon: Wrench,
    label: "Plumbing Services",
    title: "Asset Plumbing Solutions: Sydney's Trusted Experts",
    description: "200+ leads at $50 CPL. We optimized Asset Plumbing's local SEO and Google Ads campaigns, driving 16 new keywords to the top rankings.",
    services: ["Google Ads", "Lead Gen", "SEO"],
    image: "/images/asset.jpg",
    websiteUrl: "https://assetplumbingsolutions.com.au/",
    top: 130,
    mobileTop: 30,
  },
  {
    id: "s4",
    icon: Shield,
    label: "Roofing",
    title: "Your Local Roofers: Expert services across Australia",
    description: "We scaled their lead generation through optimized Google Ads, local SEO, and social media advertising, delivering consistent results for their roofing services on a national scale.",
    services: ["Google Ads", "National SEO", "Website", "Social Media Ads"],
    showCarousel: true,
    websiteUrl: "https://yourlocalroofers.com.au/",
    top: 155,
    mobileTop: 35,
  },
  {
    id: "s5",
    icon: Zap,
    label: "Outdoor Living",
    title: "Pioneer Shades: Sydney's Best Pergolas & Patios",
    description: "Through targeted social media and search campaigns, we helped Pioneer Shade Structures dominate the Sydney market for custom pergolas.",
    services: ["Social Media", "Google Ads", "SEO"],
    image: "/images/piooner.jpg",
    websiteUrl: "https://pioneershade.com.au/",
    top: 180,
    mobileTop: 40,
  },
  {
    id: "s6",
    icon: Droplets,
    label: "Bathroom Renovations",
    title: "Premier Bathrooms: Luxury Renovations in Sydney",
    description: "We deployed high-intent search campaigns, hyperlocal landing pages and a premium UI/UX design that captures qualified leads daily in the competitive Sydney market.",
    services: ["Website", "Google Ads", "SEO", "UI/UX"],
    showPremierStats: true,
    websiteUrl: "https://premierbathrooms.com.au/",
    top: 205,
    mobileTop: 45,
  },
  {
    id: "s7",
    icon: Home,
    label: "Renovation Specialists",
    title: "Prolex Bathrooms: Sydney's Premier Specialists",
    description: "Scaling visibility through localized SEO and technical optimization, ensuring Prolex remains the top choice for modern bathroom overhauls.",
    services: ["Technical SEO", "Local SEO", "Website"],
    image: "/images/proleximage.jpg",
    websiteUrl: "https://prolexbathroomrenovations.com.au/",
    top: 230,
    mobileTop: 50,
  },
];

// Colored logo SVG components for carousel (alternating cyan/emerald)
const GoogleLogo = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="48" height="48" fill={color}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const FacebookLogo = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="48" height="48" fill={color}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramLogo = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="48" height="48" fill={color}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const YouTubeLogo = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="48" height="48" fill={color}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const TikTokLogo = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="48" height="48" fill={color}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const carouselLogos = [
  { id: "google", alt: "Google", Component: GoogleLogo, color: CYAN },
  { id: "facebook", alt: "Facebook", Component: FacebookLogo, color: GREEN },
  { id: "instagram", alt: "Instagram", Component: InstagramLogo, color: CYAN },
  { id: "youtube", alt: "YouTube", Component: YouTubeLogo, color: GREEN },
  { id: "tiktok", alt: "TikTok", Component: TikTokLogo, color: CYAN },
];

// --- Hook para detectar mobile ---
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
};

// --- COMPONENTES AUXILIARES ---

const TaskCard = ({ isMobile = false }) => (
  <div className={`bg-[#1e1e1e] rounded-2xl shadow-xl border border-white/5 ${isMobile ? "p-4 w-full" : "p-5 w-80"}`}>
    <div className={`flex flex-col ${isMobile ? "gap-3" : "gap-5"}`}>
      <div className="flex items-center justify-between">
        <span className="rounded-lg px-2 py-1.5 text-xs font-medium" style={{ background: `${CYAN}18`, color: CYAN }}>SEO Campaign</span>
        <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center">
          <svg width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="#878689" strokeWidth="2"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className={`text-white font-semibold leading-7 ${isMobile ? "text-base" : "text-lg"}`}>Keyword Research</p>
        <p className={`text-gray-400 leading-5 ${isMobile ? "text-xs" : "text-sm"}`}>Target high-value keywords for Sydney market</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: "74%", background: `linear-gradient(to right, ${CYAN}, ${GREEN})` }} />
        </div>
        <p className="text-gray-500 text-xs font-medium">74% completed</p>
      </div>
    </div>
  </div>
);

const AddButton = ({ isMobile = false }) => (
  <div className={`bg-[#1e1e1e] rounded-2xl shadow-xl flex items-center justify-center border border-white/5 ${isMobile ? "p-3 w-full h-12" : "p-5 w-80 h-16"}`}>
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
      </div>
      <p className="text-gray-300 text-sm font-medium">Add a new campaign</p>
    </div>
  </div>
);

const InfiniteCarousel = ({ isMobile = false }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let pos = 0;
    let id;
    const animate = () => {
      pos += 0.5;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.style.transform = `translateX(-${pos}px)`;
      id = requestAnimationFrame(animate);
    };
    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  const logos = [...carouselLogos, ...carouselLogos, ...carouselLogos, ...carouselLogos];
  const logoSize = isMobile ? "w-20 h-20" : "w-36 h-36";

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div style={{ maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)", width: "100%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", height: isMobile ? 120 : 200 }}>
        <div ref={ref} className="flex items-center gap-3" style={{ width: "fit-content", willChange: "transform" }}>
          {logos.map((logo, i) => (
            <div key={i} className={`flex-shrink-0 ${logoSize} p-1.5`}>
              <div className="flex items-center justify-center w-full h-full bg-[#1e1e1e] rounded-xl shadow-lg p-3 border border-white/5">
                {logo.Component && <logo.Component color={logo.color} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PremierStatsCard = ({ isMobile = false }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { label: "Traffic Growth", value: "+409%", color: GREEN },
    { label: "#1 Rankings", value: "8", color: CYAN },
    { label: "Local Pages", value: "27", color: GREEN },
    { label: "First Page", value: "88%", color: CYAN },
  ];

  if (isMobile) {
    return (
      <div ref={ref} className="w-full flex flex-col gap-3 px-1">
        <div
          className="bg-[#1e1e1e] rounded-2xl shadow-xl p-4 w-full border border-white/5"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease-out" }}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="rounded-lg px-2 py-1 text-[10px] font-medium" style={{ background: `${GREEN}18`, color: GREEN }}>Performance</span>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: GREEN }} />
                <span className="text-[9px] text-gray-500 font-bold tracking-wide">LIVE</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="bg-white/5 rounded-xl p-2.5 border border-white/5"
                  style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)", transition: `all 0.5s ease-out ${0.2 + i * 0.1}s` }}
                >
                  <div className="text-lg font-bold text-white">{s.value}</div>
                  <div className="text-[8px] font-semibold uppercase tracking-wider text-gray-500">{s.label}</div>
                  <div className="mt-1.5 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: visible ? "100%" : "0%",
                        background: `linear-gradient(90deg, ${s.color}, ${s.color}88)`,
                        transition: `width 1.2s ease-out ${0.4 + i * 0.15}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="bg-[#1e1e1e] rounded-2xl shadow-xl p-3 w-full border border-white/5 flex items-center gap-3"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease-out 0.5s" }}
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${CYAN}18` }}>
            <TrendingUp size={16} color={CYAN} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold">6-Month Growth</p>
            <p className="text-gray-500 text-[10px]">SEO + Google Ads combined</p>
          </div>
          <div className="text-base font-bold flex-shrink-0" style={{ color: GREEN }}>+409%</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-end overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-5 py-8" style={{ width: 420 }}>
      <div
        className="bg-[#1e1e1e] rounded-2xl shadow-xl p-5 w-80 border border-white/5"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease-out" }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="rounded-lg px-2 py-1.5 text-xs font-medium" style={{ background: `${GREEN}18`, color: GREEN }}>Performance</span>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: GREEN }} />
              <span className="text-[10px] text-gray-500 font-bold tracking-wide">LIVE</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="bg-white/5 rounded-xl p-3 border border-white/5"
                style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)", transition: `all 0.5s ease-out ${0.2 + i * 0.1}s` }}
              >
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-[9px] font-semibold uppercase tracking-wider text-gray-500">{s.label}</div>
                <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: visible ? "100%" : "0%",
                      background: `linear-gradient(90deg, ${s.color}, ${s.color}88)`,
                      transition: `width 1.2s ease-out ${0.4 + i * 0.15}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="bg-[#1e1e1e] rounded-2xl shadow-xl p-4 w-80 border border-white/5 flex items-center gap-4"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease-out 0.5s" }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${CYAN}18` }}>
          <TrendingUp size={18} color={CYAN} />
        </div>
        <div className="flex-1">
          <p className="text-white text-sm font-semibold">6-Month Growth</p>
          <p className="text-gray-500 text-xs">SEO + Google Ads combined strategy</p>
        </div>
        <div className="text-lg font-bold" style={{ color: GREEN }}>+409%</div>
      </div>
      </div>
    </div>
  );
};

const AnimatedMedia = ({ src, type = "image", isMobile = false }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (isMobile) {
    return (
      <div ref={ref} className="w-full overflow-hidden" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease-out" }}>
        <div className="relative overflow-hidden rounded-2xl bg-black" style={{ width: "100%", height: 200 }}>
          {type === "video" ? (
            <video src={src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
          ) : (
            <img src={src} className="w-full h-full object-cover" alt="Case Study" />
          )}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-end overflow-hidden">
      <div className="relative overflow-hidden shadow-2xl bg-black" style={{ width: 420, height: 346, borderRadius: "16px 0 0 16px", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(200px)", transition: "opacity 0.8s ease-out, transform 0.8s ease-out" }}>
        {type === "video" ? (
          <video src={src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        ) : (
          <img src={src} className="w-full h-full object-cover" alt="Case Study" />
        )}
      </div>
    </div>
  );
};

const TaskCardBackground = ({ isMobile = false }) => {
  if (isMobile) {
    return (
      <div className="w-full flex flex-col gap-3 px-1">
        <TaskCard isMobile />
        <AddButton isMobile />
      </div>
    );
  }
  return (
    <div className="absolute inset-0 flex items-center justify-end overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-5" style={{ width: 420 }}>
        <TaskCard />
        <AddButton />
      </div>
    </div>
  );
};

const ViewWebsiteButton = ({ href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-3 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all duration-300 w-fit"
    style={{ background: "rgba(255,255,255,0.05)" }}
  >
    <ExternalLink size={10} />
    View Website
  </a>
);

// --- COMPONENTE PRINCIPAL ---

export const HowWeWork = () => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-40" style={{ background: DARK_BG, padding: isMobile ? "80px 16px" : "160px 40px" }}>
      <style>{`@keyframes gradientMove { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }`}</style>

      <div className="flex flex-col items-center" style={{ gap: 16 }}>
        <span className="px-3 py-1.5 rounded-lg border font-semibold uppercase tracking-widest" style={{ fontSize: 10, letterSpacing: 2, background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)", color: "rgb(156,163,175)" }}>
          Proven Results
        </span>
        <h2 className="text-center text-white" style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: isMobile ? "clamp(26px, 7vw, 36px)" : "clamp(32px, 5vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.5px" }}>
          Our <span style={{ background: "linear-gradient(90deg, transparent, #34d399, #06b6d4, transparent)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradientMove 3s linear infinite" }}>Case Studies</span>
        </h2>
        <p className="text-center" style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500, fontSize: isMobile ? 14 : 16, lineHeight: 1.6, color: "#9ca3af", maxWidth: 400, padding: isMobile ? "0 8px" : 0 }}>
          Real results from Sydney's leading businesses. See how we help brands grow with tailored digital strategies.
        </p>
      </div>

      <div className="flex flex-col w-full" style={{ maxWidth: 1000, marginTop: isMobile ? 48 : 96, gap: isMobile ? 20 : 32 }}>
        {workSteps.map((step, index) => {
          const Icon = step.icon;

          if (isMobile) {
            return (
              <div
                key={step.id}
                className="rounded-2xl shadow-2xl overflow-hidden border border-white/5"
                style={{ position: "sticky", top: step.mobileTop, zIndex: index + 1, background: CARD_BG }}
              >
                <div className="flex flex-col">
                  {/* Texto */}
                  <div className="flex flex-col gap-3 p-5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${CYAN}18` }}>
                        <Icon size={14} color={CYAN} />
                      </div>
                      <h5 className="text-gray-400 text-[10px] font-bold tracking-widest uppercase">{step.label}</h5>
                    </div>
                    <h2 className="text-white text-xl font-bold leading-tight">{step.title}</h2>
                    <p className="text-gray-400 text-xs leading-relaxed">{step.description}</p>

                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {step.services?.map((service) => (
                        <span
                          key={service}
                          className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase border border-white/10"
                          style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#D1D5DB" }}
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    <ViewWebsiteButton href={step.websiteUrl} />
                  </div>

                  {/* Media mobile */}
                  <div className="w-full px-4 pb-4">
                    {step.showTaskCard && <TaskCardBackground isMobile />}
                    {step.showCarousel && (
                      <div className="relative w-full overflow-hidden rounded-2xl" style={{ height: 120, background: CARD_BG }}>
                        <InfiniteCarousel isMobile />
                      </div>
                    )}
                    {step.showPremierStats && <PremierStatsCard isMobile />}
                    {step.image && <AnimatedMedia src={step.image} type="image" isMobile />}
                  </div>
                </div>
              </div>
            );
          }

          // Desktop (sin cambios)
          return (
            <div key={step.id} className="rounded-3xl shadow-2xl overflow-hidden border border-white/5" style={{ position: "sticky", top: step.top, zIndex: index + 1, background: CARD_BG }}>
              <div className="flex" style={{ height: 420 }}>
                <div className="flex flex-col gap-4 p-10" style={{ width: 520 }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${CYAN}18` }}>
                      <Icon size={16} color={CYAN} />
                    </div>
                    <h5 className="text-gray-400 text-xs font-bold tracking-widest uppercase">{step.label}</h5>
                  </div>
                  <h2 className="text-white text-3xl font-bold leading-tight">{step.title}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {step.services?.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-white/10"
                        style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#D1D5DB" }}
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  <ViewWebsiteButton href={step.websiteUrl} />
                </div>

                <div className="flex-1 relative overflow-hidden" style={{ background: CARD_BG }}>
                  {step.showTaskCard && <TaskCardBackground />}
                  {step.showCarousel && <InfiniteCarousel />}
                  {step.showPremierStats && <PremierStatsCard />}
                  {step.image && <AnimatedMedia src={step.image} type="image" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};