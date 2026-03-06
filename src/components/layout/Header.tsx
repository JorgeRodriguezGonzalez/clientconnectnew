import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, ArrowRight, Menu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- UTILS ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// --- DATA ---
const serviceLinks = [
  { name: "Web Design", href: "/services/web-design" },
  { name: "Social Media Management", href: "/services/social-media-management" },
  { name: "Social Media Ads", href: "/services/social-media-ads" },
  { name: "SEO", href: "/services/seo" },
  { name: "Google Ads", href: "/services/google-ads" },
];

const navLinks = [
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services", children: serviceLinks },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Contact", href: "/contact" },
];

// --- MAIN COMPONENT ---
export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
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
    timeoutRef.current = setTimeout(() => setIsServicesOpen(false), 150);
  };

  return (
    <>
      {/* ── HEADER ── */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: scrollY > 80 ? 0 : 1, y: scrollY > 80 ? -16 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-[999] font-sans pointer-events-auto"
        style={{ pointerEvents: scrollY > 80 ? "none" : "auto" }}
      >
        <nav className="flex max-w-7xl mx-auto px-4 md:px-6 py-4 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <img
              src="/images/logoCCA2.png"
              alt="Client Connect Australia"
              className="w-14 h-14 shrink-0 object-contain"
            />
            <span className="text-xl font-medium tracking-tight text-white">
              Client Connect <span className="text-[#34d399]">Australia</span><span className="text-[#ffa93b]">.</span>
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
                  ref={servicesRef}
                  className="relative"
                  onMouseEnter={handleServicesEnter}
                  onMouseLeave={handleServicesLeave}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium transition-colors duration-200 bg-transparent border-none cursor-pointer",
                      location.pathname.startsWith("/services") ? "text-white" : "text-slate-300 hover:text-white"
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

                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl p-2 shadow-2xl"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className={cn(
                              "block rounded-lg px-3 py-2.5 text-sm font-medium no-underline transition-colors duration-150",
                              location.pathname === child.href
                                ? "text-white bg-white/10"
                                : "text-slate-300 hover:text-white hover:bg-white/5"
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
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
                    location.pathname === link.href ? "text-white" : "text-slate-300 hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              )
            )}
            <div className="h-6 w-px bg-white/10" />
            <Link
              to="/contact"
              className="group relative inline-flex cursor-pointer items-center justify-center rounded-full px-4 py-2 text-sm font-normal text-white/70 hover:text-white transition-all duration-[1000ms] ease-[cubic-bezier(0.15,0.83,0.66,1)] hover:-translate-y-[2px] hover:scale-[1.05] no-underline"
              style={{
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)",
                background: "radial-gradient(ellipse at bottom, rgba(71,81,92,1) 0%, rgba(0,0,0,1) 100%)",
              }}
            >
              <span className="relative z-10">Start Scaling</span>
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-1/2 h-[1px] w-[70%] -translate-x-1/2 opacity-20 transition-all duration-[1000ms] group-hover:opacity-80"
                style={{ background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)" }}
              />
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
                            {link.children.map((child) => (
                              <Link
                                key={child.name}
                                to={child.href}
                                onClick={toggleMenu}
                                className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 no-underline"
                              >
                                {child.name}
                              </Link>
                            ))}
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