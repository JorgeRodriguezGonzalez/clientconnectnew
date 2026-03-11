import React, { useState, useEffect, useRef } from "react";
// Importación estricta de los iconos necesarios
import { 
  Globe, 
  TrendingUp, 
  Search, 
  Megaphone, 
  Check, 
  Code, 
  Zap, 
  ArrowRight 
} from "lucide-react";

const CYAN = "#06b6d4";
const GREEN = "#34d399";

// --- DATOS DE LOS CLIENTES ---
const caseStudies = [
  {
    id: "cs1",
    icon: Search,
    label: "Mould Remediation & Sanitising",
    title: "NANOTISE: DOMINATING THE HYGIENE SECTOR",
    highlight: "150% INCREASE IN ORGANIC INQUIRIES. TOP 3 RANKINGS.",
    description: "Nanotise needed to stand out in a competitive health market. We implemented a technical SEO audit and a content strategy that positioned them as the authority in mould remediation across Sydney.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
    top: 80,
  },
  {
    id: "cs2",
    icon: Globe,
    label: "Landscape Architecture",
    title: "LC LANDSCAPING: SYDNEY’S PREMIER DESIGNERS",
    highlight: "NEW HIGH-CONVERTING WEBSITE. 40% MORE BOOKINGS.",
    description: "We rebuilt their digital presence to match their craftsmanship. A mobile-first website combined with targeted Social Media strategy showcased their Sydney projects perfectly.",
    showTaskCard: true,
    top: 110,
  },
  {
    id: "cs3",
    icon: TrendingUp,
    label: "Roofing Services",
    title: "YOUR LOCAL ROOFERS: EXPERT ROOFING SERVICES",
    highlight: "SCALING GOOGLE ADS NATIONWIDE. $45 COST PER LEAD.",
    description: "For a national service provider, efficiency is key. We optimized their Google Ads and landing pages to reduce CPL by 30% while expanding to every major Australian city.",
    showCarousel: true,
    top: 140,
  },
  {
    id: "cs4",
    icon: Megaphone,
    label: "Outdoor Living",
    title: "PIONEER SHADE: SYDNEY’S BEST PERGOLAS",
    highlight: "DOMINATING LOCAL SEARCH & SOCIAL ENGAGEMENT.",
    description: "Pioneer Shade Structures designs premium patios. We delivered an integrated SEO and Meta Ads strategy that put their designs in front of Sydney homeowners.",
    image: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?w=800&q=80",
    top: 170,
  },
  {
    id: "cs5",
    icon: Code,
    label: "Bathroom Renovations",
    title: "PREMIER BATHROOMS: PREMIUM RENOVATIONS",
    highlight: "300+ QUALIFIED MONTHLY LEADS VIA GOOGLE ADS.",
    description: "Managing the renovation space required surgical precision. We deployed high-intent search campaigns that capture the Sydney renovation market daily.",
    image: "https://images.unsplash.com/photo-1584622781564-1d9876a13300?w=800&q=80",
    top: 200,
  },
  {
    id: "cs6",
    icon: Zap,
    label: "Renovation Specialists",
    title: "PROLEX BATHROOMS: SYDNEY'S PREMIER SPECIALISTS",
    highlight: "PAGE ONE RANKINGS FOR COMPETITIVE SYDNEY KEYWORDS.",
    description: "We boosted Prolex's organic visibility through localized SEO, ensuring they appear whenever someone in Sydney searches for a bathroom overhaul.",
    showTaskCard: true,
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
  <div className="bg-white rounded-2xl shadow-xl p-6 w-72 border border-gray-100 transform -rotate-2">
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="rounded-lg px-2 py-1 text-[10px] font-black uppercase tracking-wider" style={{ background: `${CYAN}18`, color: CYAN }}>
          SEO Live
        </span>
        <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
      </div>
      <div>
        <p className="text-gray-900 text-lg font-bold leading-tight">Growth Tracking</p>
        <p className="text-gray-400 text-xs uppercase font-bold tracking-tighter">Sydney Region</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: "82%", background: `linear-gradient(to right, ${CYAN}, ${GREEN})` }} />
        </div>
        <p className="text-gray-500 text-[10px] font-bold">82% Conversion Increase</p>
      </div>
    </div>
  </div>
);

const InfiniteCarousel = () => {
  const ref = useRef(null);
  useEffect(() => {
    let animationId;
    let pos = 0;
    const animate = () => {
      if (ref.current) {
        pos += 0.5;
        if (pos >= ref.current.scrollWidth / 2) pos = 0;
        ref.current.style.transform = `translateX(-${pos}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const logos = [...carouselLogos, ...carouselLogos, ...carouselLogos];

  return (
    <div className="absolute inset-0 flex items-center overflow-hidden bg-gray-50/30">
      <div ref={ref} className="flex items-center gap-12 px-6" style={{ willChange: "transform" }}>
        {logos.map((logo, i) => (
          <div key={i} className="flex-shrink-0 w-28 h-28 bg-white rounded-2xl shadow-sm flex items-center justify-center p-6 border border-gray-100">
            <img src={logo} alt="Partner" className="w-full h-full object-contain grayscale opacity-60" />
          </div>
        ))}
      </div>
    </div>
  );
};

const AnimatedImage = ({ src, alt }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className="absolute inset-0 flex items-center justify-center p-6">
      <div className={`w-full h-full max-w-[90%] max-h-[85%] rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---

export const HowWeWork = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4 py-24" style={{ background: "#FAFAFA", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-20 gap-4">
        <span className="px-4 py-1 rounded-full border text-[10px] font-black uppercase tracking-[0.3em] bg-white border-gray-200 text-gray-400">
          Success Stories
        </span>
        <h2 className="text-gray-900 font-black text-4xl md:text-7xl tracking-tighter leading-none">
          OUR RECENT <br />
          <span style={{
            background: `linear-gradient(90deg, ${GREEN}, ${CYAN}, ${GREEN})`,
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "gradientMove 3s linear infinite",
          }}>WORK</span>
        </h2>
        <p className="text-gray-500 font-medium text-lg max-w-lg mt-4">
          Driving measurable growth for Sydney's most ambitious service businesses.
        </p>
      </div>

      {/* Grid de Casos */}
      <div className="flex flex-col gap-10 w-full max-w-5xl">
        {caseStudies.map((study, index) => {
          const Icon = study.icon;
          return (
            <div 
              key={study.id} 
              className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden sticky"
              style={{ top: `${study.top}px`, zIndex: index + 1 }}
            >
              <div className="flex flex-col md:flex-row min-h-[480px]">
                
                {/* Texto */}
                <div className="p-10 md:w-[45%] flex flex-col justify-center border-r border-gray-50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${CYAN}10` }}>
                      <Icon size={20} color={CYAN} />
                    </div>
                    <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{study.label}</span>
                  </div>

                  <h3 className="text-gray-900 text-3xl font-black leading-tight mb-4 uppercase italic">
                    {study.title}
                  </h3>

                  <p className="font-bold text-xs tracking-tight mb-6" style={{ color: GREEN }}>
                    {study.highlight}
                  </p>

                  <p className="text-gray-500 text-base leading-relaxed mb-8 font-medium">
                    {study.description}
                  </p>

                  <div className="mt-auto">
                    <button className="flex items-center gap-2 group font-black text-[11px] uppercase tracking-tighter py-3 px-6 rounded-full bg-gray-900 text-white hover:bg-cyan-600 transition-all">
                      See the website
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Visual */}
                <div className="flex-1 relative bg-gray-50/50 min-h-[300px]">
                  {study.showTaskCard && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <TaskCard />
                    </div>
                  )}
                  {study.showCarousel && <InfiniteCarousel />}
                  {study.image && (
                    <AnimatedImage src={study.image} alt={study.title} />
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>
      
      <div className="h-40" /> {/* Espacio final para el scroll */}
    </div>
  );
};