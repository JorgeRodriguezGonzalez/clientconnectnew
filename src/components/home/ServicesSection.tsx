import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Search, MousePointerClick, Globe, Share2, TrendingUp, ArrowRight } from "lucide-react";

const services = [
  {
    id: "seo",
    title: "SEO",
    description: "Rank higher on Google and drive organic traffic that converts into customers. We build long-term visibility through technical excellence, content strategy, and authoritative link building.",
    videoSrc: "https://framerusercontent.com/assets/CDUMuSViiwfgUWtLCKDQ2HUa80.mp4",
    icon: Search,
    link: "/services/seo",
  },
  {
    id: "google-ads",
    title: "Google Ads",
    description: "Get instant visibility with targeted campaigns that maximize your ROI. Smart bidding, compelling ad copy, and continuous optimization to turn every dollar into measurable growth.",
    videoSrc: "https://framerusercontent.com/assets/k1qSt6h5RhCO3Zs5SwsO37iqjo.mp4",
    icon: MousePointerClick,
    link: "/services/google-ads",
  },
  {
    id: "web-design",
    title: "Web Design",
    description: "Beautiful, conversion-focused websites that represent your brand perfectly. Every pixel is crafted to guide visitors toward action and deliver an unforgettable user experience.",
    videoSrc: "https://framerusercontent.com/assets/f2fyZuzpw4LXDReDBa9x0RM74.mp4",
    icon: Globe,
    link: "/services/web-design",
  },
  {
    id: "social-media-management",
    title: "Social Media Management",
    description: "Build authentic connections with your audience through strategic social content. Consistent posting, community engagement, and data-driven content calendars that grow your brand.",
    videoSrc: "https://framerusercontent.com/assets/tdObAjmo5rYV9y0dSN1y6Fi8E.mp4",
    icon: Share2,
    link: "/services/social-media-management",
  },
  {
    id: "social-media-ads",
    title: "Social Media Advertising",
    description: "Reach your ideal customers on Facebook, Instagram, and LinkedIn with precision. Creative-led campaigns with sharp targeting that generate leads and scale profitably.",
    videoSrc: "https://framerusercontent.com/assets/G76LWpCqcnDqr4JqhtkD3NlnRtU.mp4",
    icon: TrendingUp,
    link: "/services/social-media-ads",
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full rounded-[30px] overflow-hidden cursor-pointer group min-h-[300px]"
      style={{
        background: "radial-gradient(50% 50% at 0% 0%, #1a1a1a 2.21%, #050505 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex flex-col lg:flex-row p-8 relative z-10 gap-6 h-full">
        {/* Content */}
        <div className="flex flex-col justify-between items-start gap-4 flex-1 z-20 max-w-xl">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/5 rounded-full border border-white/10">
                <service.icon className="w-4 h-4 text-primary" style={{ color: "#f97316" }} />
              </div>
              <h3 className="font-bold text-[22px] leading-tight text-white">
                {service.title}
              </h3>
            </div>
            <p className="font-light text-[15px] leading-[24px] text-white/60 max-w-[340px]">
              {service.description}
            </p>
          </div>
          <div className="mt-4 bg-[#0d0d0d] border border-white/10 backdrop-blur-sm rounded-[27px] pl-5 pr-1 py-1.5 flex items-center gap-2 transition-transform duration-300 origin-left group-hover:scale-105">
            <span className="font-light text-[11px] uppercase text-white tracking-wide">
              Learn More
            </span>
            <div className="w-[28px] h-[28px] bg-white/10 rounded-full flex items-center justify-center">
              <ArrowRight className="w-3 h-3 text-white/90 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* Video */}
        <div className="relative w-full lg:w-[220px] h-[180px] lg:h-full lg:absolute lg:-right-4 lg:-top-4 transition-transform duration-700 ease-out lg:group-hover:-translate-x-4 lg:group-hover:translate-y-2 mt-4 lg:mt-0">
          <div className="absolute inset-0 rounded-[20px] overflow-hidden transform lg:rotate-3 transition-transform duration-700 lg:group-hover:rotate-0 border border-white/5">
            <div className="absolute inset-0 bg-black/40 z-10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0 pointer-events-none" />
            <video
              ref={videoRef}
              src={service.videoSrc}
              muted
              loop
              playsInline
              preload="metadata"
              className={cn(
                "w-full h-full object-cover transition-all duration-700 filter",
                isHovered ? "grayscale-0 scale-110" : "grayscale-[0.5] scale-100"
              )}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section className="py-20 bg-white px-5 lg:px-10">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Comprehensive Digital Marketing Services
          </h2>
          <p className="text-lg text-gray-500">
            Everything you need to grow your business online, all under one roof.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;