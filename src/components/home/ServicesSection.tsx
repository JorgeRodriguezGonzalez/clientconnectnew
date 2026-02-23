import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Palette, Code2, Search, MousePointerClick, TrendingUp } from "lucide-react";

const services = [
  {
    id: "digital-strategy",
    title: "Digital Strategy",
    description: "We map out a clear path to grow your business online. From market research to channel selection and KPI setting, we build a custom roadmap that aligns your marketing with your business goals.",
    videoSrc: "https://framerusercontent.com/assets/CDUMuSViiwfgUWtLCKDQ2HUa80.mp4",
    icon: Compass,
  },
  {
    id: "brand-identity",
    title: "Brand Identity",
    description: "Your brand is more than a logo. We craft a cohesive visual and verbal identity — from color palettes and typography to tone of voice — that makes your business instantly recognizable and memorable.",
    videoSrc: "https://framerusercontent.com/assets/k1qSt6h5RhCO3Zs5SwsO37iqjo.mp4",
    icon: Palette,
  },
  {
    id: "website-development",
    title: "Website Development",
    description: "Beautiful, fast, and conversion-focused websites built to represent your brand perfectly. Every page is designed to guide visitors toward action and deliver an unforgettable user experience.",
    videoSrc: "https://framerusercontent.com/assets/f2fyZuzpw4LXDReDBa9x0RM74.mp4",
    icon: Code2,
  },
  {
    id: "seo",
    title: "SEO",
    description: "Rank higher on Google and drive organic traffic that converts into customers. We build long-term visibility through technical excellence, content strategy, and authoritative link building.",
    videoSrc: "https://framerusercontent.com/assets/tdObAjmo5rYV9y0dSN1y6Fi8E.mp4",
    icon: Search,
  },
  {
    id: "google-ads",
    title: "Google Ads",
    description: "Get instant visibility with targeted campaigns that maximize your ROI. Smart bidding, compelling ad copy, and continuous optimization to turn every dollar into measurable growth.",
    videoSrc: "https://framerusercontent.com/assets/G76LWpCqcnDqr4JqhtkD3NlnRtU.mp4",
    icon: MousePointerClick,
  },
  {
    id: "paid-social-ads",
    title: "Paid Social Ads",
    description: "Reach your ideal customers on Facebook, Instagram, TikTok, and LinkedIn with precision. Creative-led campaigns with sharp targeting that generate leads and scale profitably across platforms.",
    videoSrc: "https://framerusercontent.com/assets/CDUMuSViiwfgUWtLCKDQ2HUa80.mp4",
    icon: TrendingUp,
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
        <div className="flex flex-col justify-between items-start gap-4 flex-1 z-20 max-w-xl">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/5 rounded-full border border-white/10">
                <service.icon className="w-4 h-4" style={{ color: "#f97316" }} />
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