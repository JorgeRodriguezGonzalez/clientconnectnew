import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  X,
  ArrowRight,
  Menu,
  ChevronDown,
  Globe,
  Share2,
  Target,
  Search,
  MousePointerClick,
  Camera,
  Palette,
  Phone,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- UTILS ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// --- DATA ---
const serviceLinks = [
  {
    name: "Web Design",
    href: "/services/web-design",
    icon: Globe,
    description: "Websites that convert visitors into customers",
  },
  {
    name: "Social Media Management",
    href: "/services/social-media-management",
    icon: Share2,
    description: "Grow your brand presence organically",
  },
  {
    name: "Social Media Ads",
    href: "/services/social-media-ads",
    icon: Target,
    description: "Targeted campaigns on Meta, TikTok & more",
  },
  {
    name: "SEO",
    href: "/services/seo",
    icon: Search,
    description: "Rank higher and get found online",
  },
  {
    name: "Google Ads",
    href: "/services/google-ads",
    icon: MousePointerClick,
    description: "Pay-per-click campaigns that deliver ROI",
  },
  {
    name: "Content Creation",
    href: "/services/content-creation",
    icon: Camera,
    description: "Scroll-stopping content for every platform",
  },
  {
    name: "Brand Identity",
    href: "/services/brand-identity",
    icon: Palette,
    description: "Logos, guidelines & visual strategy",
  },
];

const navLinks = [
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services", children: serviceLinks },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Contact", href: "/contact" },
];

// --- SCROLL HIDE HOOK ---
function useScrollHide(idleDelay = 300) {
  const [visible, setVisible] = useState(true);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;

    // Always show at the very top
    if (currentY < 20) {
      setVisible(true);
      lastScrollY.current = currentY;
      return;
    }

    // Hide while actively scrolling
    setVisible(false);

    // Clear previous idle timer
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    // Show again after user stops scrolling
    scrollTimeoutRef.current = setTimeout(() => {
      setVisible(true);
    }, idleDelay);

    lastScrollY.current = currentY;
  }, [idleDelay]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [handleScroll]);

  return visible;
}

// --- MAIN COMPONENT ---
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const headerVisible = useScrollHide(300);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    setIsMobileServicesOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const handleServicesEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsServicesOpen(true);
  };

  const handleServicesLeave = () => {
    timeoutRef.current = setTimeout(() => setIsServicesOpen(false), 200);
  };

  return (
    <>
      {/* ── HEADER ── */}
      <motion.div
        initial={{ y: 0 }}
        animate={{
          y: headerVisible ? 0 : -100,
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-[999] font-sans"
      >
        <nav className="flex max-w-7xl mx-auto px-4 md:px-6 py-4 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <img
              src="/images/logoCCA2.png"
              alt="Client Connect Australia"
              className="w-14 h-14 shrink-0 object-contain"
            />
            <span className="text-xl font-medium tracking-tight text-white">
              Client Connect{" "}
              <span className="text-[#34d399]">Australia</span>
              <span className="text-[#ffa93b]">.</span>
            </span>
          </Link>

          <button
            onClick={toggleMenu}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 lg:hidden focus:outline-none"
            aria-label="Open menu"
          >
            <Menu size={18} className="text-white" />
          </button>

          {/* ── DESKTOP NAV ── */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={handleServicesEnter}
                  onMouseLeave={handleServicesLeave}
                >
                  <button
                    aria-expanded={isServicesOpen}
                    aria-haspopup="true"
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium transition-colors duration-200 bg-transparent border-none cursor-pointer",
                      location.pathname.startsWith("/services")
                        ? "text-white"
                        : "text-slate-300 hover:text-white"
                    )}
                  >
                    {link.name}
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        isServicesOpen ? "rotate-180" : ""
                      )}
                    />
                  </button>

                  {/* ── MEGA DROPDOWN ── */}
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.97 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute top-full -left-48 mt-4 w-[680px] rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/95 backdrop-blur-2xl shadow-[0_25px_60px_-12px_rgba(0,0,0,0.7)] overflow-hidden"
                      >
                        <div className="flex">
                          {/* ── LEFT: SERVICES LIST ── */}
                          <div className="flex-1 p-4">
                            <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                              Our Services
                            </p>
                            <div className="space-y-0.5">
                              {link.children.map((child) => {
                                const Icon = child.icon;
                                return (
                                  <Link
                                    key={child.name}
                                    to={child.href}
                                    className={cn(
                                      "group flex items-start gap-3 rounded-xl px-3 py-2.5 no-underline transition-all duration-150",
                                      location.pathname === child.href
                                        ? "bg-white/[0.08] text-white"
                                        : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors duration-150",
                                        location.pathname === child.href
                                          ? "border-[#34d399]/30 bg-[#34d399]/10 text-[#34d399]"
                                          : "border-white/[0.08] bg-white/[0.03] text-slate-400 group-hover:border-white/[0.15] group-hover:text-slate-200"
                                      )}
                                    >
                                      <Icon size={15} />
                                    </span>
                                    <div className="min-w-0">
                                      <p className="text-sm font-medium leading-tight">
                                        {child.name}
                                      </p>
                                      <p className="mt-0.5 text-xs leading-snug text-slate-500 group-hover:text-slate-400 transition-colors">
                                        {child.description}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>

                          {/* ── RIGHT: CTA PANEL ── */}
                          <div className="w-[250px] border-l border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-5 flex flex-col justify-between">
                            <div>
                              <h3 className="text-base font-semibold text-white leading-snug">
                                Not sure where
                                <br />
                                to start?
                              </h3>
                              <p className="mt-2 text-[13px] leading-relaxed text-slate-400">
                                Tell us what you're trying to solve and we'll
                                build a tailored strategy for your business.
                              </p>
                            </div>

                            <div className="mt-5 space-y-3">
                              <div className="space-y-2">
                                <a
                                  href="tel:1300662718"
                                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors no-underline"
                                >
                                  <Phone size={13} className="text-[#34d399]" />
                                  <span className="font-medium">
                                    1300 662 718
                                  </span>
                                </a>
                                <a
                                  href="mailto:info@clientconnectaustralia.com"
                                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors no-underline"
                                >
                                  <Mail size={13} className="text-[#34d399]" />
                                  <span className="font-medium truncate">
                                    info@clientconnectaustralia.com
                                  </span>
                                </a>
                              </div>

                              <Link
                                to="/contact"
                                className="group/cta flex w-full items-center justify-center gap-2 rounded-xl bg-[#34d399] px-4 py-2.5 text-sm font-semibold text-[#0a0a0a] no-underline transition-all duration-300 hover:bg-[#2cc48a] hover:shadow-[0_0_20px_rgba(52,211,153,0.25)]"
                              >
                                Get in Touch
                                <ArrowRight
                                  size={14}
                                  className="transition-transform duration-300 group-hover/cta:translate-x-0.5"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "text-sm font-medium no-underline transition-colors duration-200",
                    location.pathname === link.href
                      ? "text-white"
                      : "text-slate-300 hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              )
            )}
            <div className="h-6 w-px bg-white/10" />
            <Link
              to="/contact"
              className="group relative inline-flex cursor-pointer items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-white no-underline transition-all duration-500 hover:-translate-y-[2px] hover:scale-[1.03] animate-[glowPulse_3s_ease-in-out_infinite]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(6,182,212,0.05) 100%)",
                boxShadow:
                  "0 0 15px rgba(6,182,212,0.15), 0 0 30px rgba(6,182,212,0.05), inset 0 0 0 1px rgba(6,182,212,0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(6,182,212,0.3), 0 0 40px rgba(6,182,212,0.15), inset 0 0 0 1px rgba(6,182,212,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 15px rgba(6,182,212,0.15), 0 0 30px rgba(6,182,212,0.05), inset 0 0 0 1px rgba(6,182,212,0.25)";
              }}
            >
              <style>{`
                @keyframes glowPulse {
                  0%, 100% { box-shadow: 0 0 15px rgba(6,182,212,0.15), 0 0 30px rgba(6,182,212,0.05), inset 0 0 0 1px rgba(6,182,212,0.25); }
                  50% { box-shadow: 0 0 20px rgba(6,182,212,0.25), 0 0 40px rgba(6,182,212,0.1), inset 0 0 0 1px rgba(6,182,212,0.35); }
                }
              `}</style>
              <span className="relative z-10 flex items-center gap-2">
                Start Scaling
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </div>
        </nav>
      </motion.div>

      {/* ── MOBILE MENU OVERLAY ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1001] flex flex-col bg-[#050505] px-4 pt-24 font-sans"
          >
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 flex items-center justify-center h-9 w-9 rounded-lg border border-white/10 bg-white/5 focus:outline-none"
              aria-label="Close menu"
            >
              <X size={18} className="text-white" />
            </button>

            <div className="space-y-1 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.name}>
                    <button
                      onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/5 bg-transparent border-none cursor-pointer"
                    >
                      {link.name}
                      <ChevronDown
                        size={14}
                        className={cn(
                          "text-slate-400 transition-transform duration-200",
                          isMobileServicesOpen ? "rotate-180" : ""
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {isMobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 space-y-1 py-1">
                            {link.children.map((child) => {
                              const Icon = child.icon;
                              return (
                                <Link
                                  key={child.name}
                                  to={child.href}
                                  onClick={toggleMenu}
                                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 no-underline"
                                >
                                  <Icon size={14} className="text-slate-500" />
                                  {child.name}
                                </Link>
                              );
                            })}
                          </div>

                          {/* Mobile CTA inside services */}
                          <div className="mx-3 mt-2 mb-1 rounded-lg border border-white/[0.08] bg-white/[0.03] p-3">
                            <p className="text-xs font-medium text-slate-300">
                              Not sure where to start?
                            </p>
                            <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
                              Let's chat about your goals.
                            </p>
                            <Link
                              to="/contact"
                              onClick={toggleMenu}
                              className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#34d399] no-underline"
                            >
                              Get in Touch
                              <ArrowRight size={12} />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={toggleMenu}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/5 no-underline"
                  >
                    {link.name}
                  </Link>
                )
              )}
              <div className="my-2 h-px w-full bg-white/10" />
              <Link
                to="/contact"
                onClick={toggleMenu}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-black hover:bg-white/90 no-underline"
              >
                Start Scaling
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}