import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, ChevronLeft, ChevronRight } from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const COLORS = {
  cyan: "#06b6d4",
  emerald: "#34d399",
  gold: "rgb(237, 191, 134)",
};

const PANORAMIC_IMAGES = {
  strategy: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2600&auto=format&fit=crop",
  traffic: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2600&auto=format&fit=crop",
  creative: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2600&auto=format&fit=crop",
  data: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2600&auto=format&fit=crop",
};

const CARD_COLORS = [
  "linear-gradient(135deg, #06b6d4, #0891b2)",
  "linear-gradient(135deg, #34d399, #10b981)",
  "linear-gradient(135deg, #3f3f46, #52525b)",
  "linear-gradient(135deg, #0891b2, #34d399)",
  "linear-gradient(135deg, #06b6d4, #22d3ee)",
  "linear-gradient(135deg, #10b981, #06b6d4)",
  "linear-gradient(135deg, #52525b, #3f3f46)",
];

const SERVICES = [
  { id: "brand-identity", title: "Brand Identity", description: "Define your visual language and voice to create a lasting impression in the market.", capabilityCount: 4, tags: ["Logo Design", "Visual Guidelines", "Tone of Voice", "Brand Assets"], imageUrl: PANORAMIC_IMAGES.strategy, bgSize: "200% 100%", bgPosition: "100% 50%", videoUrl: "/videos/brand.mp4" },
  { id: "website-development", title: "Website Development", description: "Build fast, responsive, and conversion-focused websites that elevate your digital presence.", capabilityCount: 4, tags: ["Custom Design", "Responsive Dev", "CMS Integration", "Performance"], imageUrl: PANORAMIC_IMAGES.creative, bgSize: "cover", bgPosition: "center", videoUrl: "/videos/websitedevelopment.mp4" },
  { id: "seo", title: "SEO", description: "Dominate search results and drive organic traffic with technical and on-page optimization.", capabilityCount: 4, tags: ["Technical Audit", "Keyword Strategy", "Link Building", "Local SEO"], imageUrl: PANORAMIC_IMAGES.traffic, bgSize: "300% 100%", bgPosition: "0% 50%", videoUrl: "/videos/SEOclient.mp4" },
  { id: "google-ads", title: "Google Ads", description: "Drive high-intent traffic and maximize ROI with strategic search, display, and shopping campaigns.", capabilityCount: 4, tags: ["Search Campaigns", "Display Ads", "Shopping Ads", "Performance Max"], imageUrl: PANORAMIC_IMAGES.traffic, bgSize: "300% 100%", bgPosition: "50% 50%", videoUrl: "/videos/googleads.mp4" },
  { id: "paid-media", title: "Paid Media", description: "Accelerate acquisition through targeted campaigns across Google, Meta, and LinkedIn.", capabilityCount: 4, tags: ["Google Ads", "Social Ads", "Retargeting", "Display Network"], imageUrl: "/images/image2.jpg", bgSize: "cover", bgPosition: "center", videoUrl: "/videos/googleads.mp4" },
  { id: "social-media", title: "Social Media", description: "Build community and engagement with strategic content calendars and management.", capabilityCount: 4, tags: ["Content Strategy", "Community Mgmt", "Influencer Marketing", "Trend Analysis"], imageUrl: PANORAMIC_IMAGES.traffic, bgSize: "300% 100%", bgPosition: "100% 50%", videoUrl: "/videos/socialmedia.mp4" },
  { id: "content-creation", title: "Content Creation", description: "Bring your brand to life with compelling visuals, video, and copy that captivate your audience.", capabilityCount: 4, tags: ["Video Production", "Photography", "Copywriting", "Graphic Design"], imageUrl: PANORAMIC_IMAGES.creative, bgSize: "200% 100%", bgPosition: "0% 50%" },
];

const GradientText = ({ children, style = {} }) => (
  <motion.span
    initial={{ backgroundPosition: "0% 50%" }}
    animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
    transition={{ duration: 3, ease: "linear", repeat: Infinity }}
    style={{
      backgroundImage: `linear-gradient(90deg, ${COLORS.emerald}, ${COLORS.cyan}, ${COLORS.emerald})`,
      backgroundSize: "200% auto",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      color: "transparent",
      display: "inline-block",
      ...style,
    }}
  >
    {children}
  </motion.span>
);

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

const ServiceCard = ({ service, colorIndex }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!videoRef.current || !service.videoUrl) return;
    if (isHovered) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered, service.videoUrl]);

  return (
    <div
      className="group relative h-[420px] w-full overflow-hidden rounded-2xl bg-neutral-900 text-white transition-transform duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={isMobile ? { background: CARD_COLORS[colorIndex % CARD_COLORS.length] } : undefined}
    >
      {!isMobile && service.videoUrl && (
        <video
          ref={videoRef}
          src={service.videoUrl}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {!isMobile && !service.videoUrl && (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url('${service.imageUrl}')`,
            backgroundSize: service.bgSize,
            backgroundPosition: service.bgPosition,
            backgroundRepeat: "no-repeat",
          }}
        />
      )}

      {isMobile && service.videoUrl && (
        <video
          ref={videoRef}
          src={service.videoUrl}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
      )}

      {!isMobile && (
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500" />
      )}
      {isMobile && isHovered && service.videoUrl && (
        <div className="absolute inset-0 bg-black/50 transition-opacity duration-500" />
      )}

      <div className="relative h-full flex flex-col justify-between p-5 z-10">
        <div className="space-y-2 pt-1">
          <h3 className="text-2xl font-black tracking-tight leading-none text-white drop-shadow-md">
            {service.title}
          </h3>
          <p className="text-sm leading-relaxed text-white/90 max-w-[95%] drop-shadow-sm">
            {service.description}
          </p>
        </div>
        <div className="space-y-3 pb-1">
          <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/90 px-1 drop-shadow-sm">
            Includes {service.capabilityCount} capabilities
          </div>
          <div className="flex flex-wrap gap-1">
            <div className="w-5 h-5 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center mr-1 border border-white/20">
              <Check className="w-3 h-3 text-white" strokeWidth={2} />
            </div>
            {service.tags.map((tag, idx) => (
              <span key={idx} className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-black/30 backdrop-blur-md border border-white/10 text-white shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const [activeTab, setActiveTab] = useState(SERVICES[0].id);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [paddingLeft, setPaddingLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);
  const tabsContainerRef = useRef(null);
  const headerRef = useRef(null);

  const { scrollX } = useScroll({ container: scrollContainerRef });
  const animatedPadding = useTransform(scrollX, [0, 400], [paddingLeft, 0]);

  useEffect(() => {
    const calc = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setPaddingLeft(rect.left);
      }
    };
    calc();
    window.addEventListener("resize", calc);
    const t = setTimeout(calc, 100);
    return () => { window.removeEventListener("resize", calc); clearTimeout(t); };
  }, []);

  const checkScrollBounds = () => {
    if (!scrollContainerRef.current) return;
    const el = scrollContainerRef.current;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scrollByAmount = (dir) => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: dir * 370, behavior: "smooth" });
  };

  const scrollToCard = (id) => {
    setActiveTab(id);
    const card = document.getElementById(`card-${id}`);
    if (card && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      checkScrollBounds();
      const scrollPosition = scrollContainerRef.current.scrollLeft;
      let closestId = activeTab;
      let minDist = Infinity;
      SERVICES.forEach(s => {
        const card = document.getElementById(`card-${s.id}`);
        if (card) {
          const d = Math.abs(card.offsetLeft - scrollPosition);
          if (d < minDist) { minDist = d; closestId = s.id; }
        }
      });
      if (closestId !== activeTab) {
        setActiveTab(closestId);
        const tabBtn = document.getElementById(`tab-${closestId}`);
        if (tabBtn && tabsContainerRef.current) {
          tabBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
      }
    };
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    }
    return () => { if (container) container.removeEventListener("scroll", handleScroll); };
  }, [activeTab]);

  return (
    <div className="w-full bg-black relative z-10 min-h-screen py-20 font-sans text-white overflow-x-hidden pl-[3vw]">
      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none !important; }
        .hide-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
      `}</style>

      <div ref={headerRef} className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center gap-4 mb-16 pb-6 border-b border-white/10 md:pt-12">
          <span className="w-fit px-3 py-1.5 rounded-lg border bg-white/5 border-white/10 text-gray-400 font-semibold text-[10px] uppercase tracking-[2px]" style={{ fontFamily: "'Satoshi', sans-serif" }}>Digital Ecosystem</span>
          <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.5px" }} className="text-white">
            Services built to{" "}
            <motion.span
              initial={{ backgroundPosition: "400% 50%" }}
              animate={{ backgroundPosition: ["400% 50%", "0% 50%"] }}
              transition={{ duration: 12, ease: "linear", repeat: Infinity }}
              style={{
                display: "inline-block",
                backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0), ${COLORS.emerald}, ${COLORS.cyan}, rgba(255,255,255,0))`,
                backgroundSize: "400% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              scale you
            </motion.span>
          </h2>
          <div className="max-w-lg">
            <p className="section-text-dark">
              From initial strategy to final conversion, we cover every aspect of the digital landscape to ensure sustainable growth and measurable results.
            </p>
          </div>
        </div>

        <div className="relative mb-12">
          <div ref={tabsContainerRef} className="flex flex-wrap justify-center gap-2 pb-4 md:flex-nowrap md:overflow-x-auto md:justify-center md:gap-2 md:-mx-0 md:px-0 hide-scroll">
            {SERVICES.map(service => {
              const isActive = activeTab === service.id;
              const isHovered = hoveredTab === service.id;
              return (
                <button
                  key={service.id}
                  id={`tab-${service.id}`}
                  onClick={() => scrollToCard(service.id)}
                  onMouseEnter={() => setHoveredTab(service.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className="relative px-3 py-3 rounded-none text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-all duration-200 flex-shrink-0 z-10"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 -z-10 bg-black"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {!isActive && isHovered && (
                    <div className="absolute inset-0 -z-10 bg-white/10" />
                  )}
                  {isActive || isHovered ? (
                    <GradientText>{service.title}</GradientText>
                  ) : (
                    <span className="text-white/40">{service.title}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: canScrollLeft ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => scrollByAmount(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border border-white/20"
          style={{
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            pointerEvents: canScrollLeft ? "auto" : "none",
          }}
        >
          <ChevronLeft className="w-5 h-5 text-white" strokeWidth={2} />
        </motion.button>

        <motion.button
          initial={{ opacity: 1 }}
          animate={{ opacity: canScrollRight ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => scrollByAmount(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border border-white/20"
          style={{
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            pointerEvents: canScrollRight ? "auto" : "none",
          }}
        >
          <ChevronRight className="w-5 h-5 text-white" strokeWidth={2} />
        </motion.button>

        <motion.div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-12 pt-4 snap-x snap-mandatory w-full hide-scroll"
          style={{ paddingLeft: animatedPadding, paddingRight: "85vw" }}
        >
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              id={`card-${service.id}`}
              className="flex-shrink-0 snap-start w-[280px] sm:w-[305px] md:w-[350px]"
            >
              <ServiceCard service={service} colorIndex={index} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Services;