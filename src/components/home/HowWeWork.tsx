import { useState, useEffect, useRef } from "react";
import { Search, Globe, TrendingUp, Zap, Check, Edit, Droplets, Home, Wrench, Shield } from "lucide-react";

const CYAN = "#06b6d4";
const GREEN = "#34d399";
const DARK_BG = "#0A0A0A"; // Fondo principal de la página
const CARD_BG = "#161616"; // Color único para TODA la tarjeta

const workSteps = [
  {
    id: "s1",
    icon: Search,
    label: "Mould Remediation",
    title: "Nanotise: Mould Remediation & Sanitising works",
    description: "We implemented a strategic SEO and content roadmap for Nanotise, establishing them as Sydney's leading authority in mould remediation and hygiene services.",
    services: ["SEO", "Content Strategy", "Google Ads"],
    image: "/images/nanotise10.jpg",
    top: 80,
  },
  {
    id: "s2",
    icon: Globe,
    label: "Landscaping",
    title: "LC Landscaping: Sydney’s Premier Landscape Designers",
    description: "For LC Landscaping, we built a high-converting digital presence that showcases their premium landscape designs to high-end residential clients across Sydney.",
    services: ["Website", "UI/UX Design", "Local SEO"],
    showTaskCard: true,
    top: 105,
  },
  {
    id: "s3",
    icon: Wrench,
    label: "Plumbing Services",
    title: "Asset Plumbing Solutions: Sydney's Trusted Experts",
    description: "200+ leads at $50 CPL. We optimized Asset Plumbing's local SEO and Google Ads campaigns, driving 16 new keywords to the top rankings.",
    services: ["Google Ads", "Lead Gen", "SEO"],
    image: "/images/asset.jpg",
    top: 130,
  },
  {
    id: "s4",
    icon: Shield,
    label: "Roofing",
    title: "Your Local Roofers: Expert services across Australia",
    description: "We scaled their lead generation through optimized Google Ads and local SEO, delivering consistent results for their roofing services on a national scale.",
    services: ["Google Ads", "National SEO", "Website"],
    showCarousel: true,
    top: 155,
  },
  {
    id: "s5",
    icon: Zap,
    label: "Outdoor Living",
    title: "Pioneer Shades: Sydney’s Best Pergolas & Patios",
    description: "Through targeted social media and search campaigns, we helped Pioneer Shade Structures dominate the Sydney market for custom pergolas.",
    services: ["Social Media", "Google Ads", "SEO"],
    image: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?w=800&q=80",
    top: 180,
  },
  {
    id: "s6",
    icon: Droplets,
    label: "Bathroom Renovations",
    title: "Premier Bathrooms: Luxury Renovations in Sydney",
    description: "We deployed high-intent search campaigns and a premium UI/UX design that captures qualified leads daily in the competitive Sydney market.",
    services: ["Website", "Google Ads", "UI/UX"],
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    top: 205,
  },
  {
    id: "s7",
    icon: Home,
    label: "Renovation Specialists",
    title: "Prolex Bathrooms: Sydney's Premier Specialists",
    description: "Scaling visibility through localized SEO and technical optimization, ensuring Prolex remains the top choice for modern bathroom overhauls.",
    services: ["Technical SEO", "Local SEO", "Website"],
    image: "/images/proleximage.png",
    top: 230,
  },
];

const carouselLogos = [
  "https://cdn.worldvectorlogo.com/logos/google-ads-1.svg",
  "https://cdn.worldvectorlogo.com/logos/meta-1.svg",
  "https://cdn.worldvectorlogo.com/logos/google-analytics-2.svg",
  "https://cdn.worldvectorlogo.com/logos/semrush-1.svg",
];

// --- COMPONENTES AUXILIARES ---

const TaskCard = () => (
  <div className="bg-[#1e1e1e] rounded-2xl shadow-xl p-5 w-80 border border-white/5">
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <span className="rounded-lg px-2 py-1.5 text-xs font-medium" style={{ background: `${CYAN}18`, color: CYAN }}>SEO Campaign</span>
        <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center">
          <svg width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="#878689" strokeWidth="2"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-white text-lg font-semibold leading-7">Keyword Research</p>
        <p className="text-gray-400 text-sm leading-5">Target high-value keywords for Sydney market</p>
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

const AddButton = () => (
  <div className="bg-[#1e1e1e] rounded-2xl shadow-xl p-5 w-80 h-16 flex items-center justify-center border border-white/5">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
      </div>
      <p className="text-gray-300 text-sm font-medium">Add a new campaign</p>
    </div>
  </div>
);

const InfiniteCarousel = () => {
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

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div style={{ maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)", width: "100%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", height: 200 }}>
        <div ref={ref} className="flex items-center gap-5" style={{ width: "fit-content", willChange: "transform" }}>
          {logos.map((logo, i) => (
            <div key={i} className="flex-shrink-0 w-36 h-36 p-2">
              <div className="flex items-center justify-center w-full h-full bg-[#1e1e1e] rounded-2xl shadow-lg p-6 border border-white/5">
                <img src={logo} alt="Tool" className="w-20 h-20 object-contain brightness-110" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AnimatedMedia = ({ src, type = "image" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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

const TaskCardBackground = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
    <TaskCard />
    <AddButton />
  </div>
);

// --- COMPONENTE PRINCIPAL ---

export const HowWeWork = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center px-10 py-40" style={{ background: DARK_BG }}>
      <style>{`@keyframes gradientMove { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }`}</style>

      <div className="flex flex-col items-center" style={{ gap: 16 }}>
        <span className="px-3 py-1.5 rounded-lg border font-semibold uppercase tracking-widest" style={{ fontSize: 10, letterSpacing: 2, background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)", color: "rgb(156,163,175)" }}>
          Proven Results
        </span>
        <h2 className="text-center text-white" style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.5px" }}>
          Our <span style={{ background: "linear-gradient(90deg, transparent, #34d399, #06b6d4, transparent)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradientMove 3s linear infinite" }}>Case Studies</span>
        </h2>
        <p className="text-center" style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500, fontSize: 16, lineHeight: 1.6, color: "#9ca3af", maxWidth: 400 }}>
          Real results from Sydney's leading businesses. See how we help brands grow with tailored digital strategies.
        </p>
      </div>

      <div className="flex flex-col gap-8 w-full" style={{ maxWidth: 1000, marginTop: 96 }}>
        {workSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="rounded-3xl shadow-2xl overflow-hidden border border-white/5" style={{ position: "sticky", top: step.top, zIndex: index + 1, background: CARD_BG }}>
              <div className="flex" style={{ height: 420 }}>
                {/* Lado Izquierdo: Texto */}
                <div className="flex flex-col gap-5 p-10" style={{ width: 440 }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${CYAN}18` }}>
                      <Icon size={16} color={CYAN} />
                    </div>
                    <h5 className="text-gray-400 text-xs font-bold tracking-widest uppercase">{step.label}</h5>
                  </div>
                  <h2 className="text-white text-3xl font-bold leading-tight" style={{ maxWidth: 360 }}>{step.title}</h2>
                  <p className="text-gray-400 text-base leading-relaxed" style={{ maxWidth: 340 }}>{step.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {step.services?.map((service) => (
                      <span 
                        key={service} 
                        className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-white/10"
                        style={{ backgroundColor: `rgba(255,255,255,0.05)`, color: "#D1D5DB" }}
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Lado Derecho: Medios (Ahora con el mismo fondo) */}
                <div className="flex-1 relative overflow-hidden" style={{ background: CARD_BG }}>
                  {step.showTaskCard && <TaskCardBackground />}
                  {step.showCarousel && <InfiniteCarousel />}
                  {step.video && <AnimatedMedia src={step.video} type="video" />}
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