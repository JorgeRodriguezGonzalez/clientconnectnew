import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, ArrowRight, Menu } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// --- UTILS ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// --- CONFIG ---
const SCROLL_THRESHOLD = 80;

// --- DATA ---
const navLinks = [
  { name: "Work", href: "/work" },
  { name: "Process", href: "/process" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
];

// --- MAIN COMPONENT ---
export function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollHeaderVisible, setIsScrollHeaderVisible] = useState(false);
  const [isHoveringTop, setIsHoveringTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current < SCROLL_THRESHOLD) {
        setIsScrollHeaderVisible(false);
      } else if (current > lastScrollY) {
        setIsScrollHeaderVisible(false);
      } else {
        setIsScrollHeaderVisible(true);
      }
      setScrollY(current);
      setLastScrollY(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setIsHoveringTop(e.clientY < 80);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const isStaticVisible = scrollY < SCROLL_THRESHOLD;
  const showScrollHeader = isScrollHeaderVisible || isHoveringTop || isMobileMenuOpen;

  const scrollHeaderVariants: Variants = {
    hidden: { y: -20, opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  const NavLinks = () => (
    <>
      {navLinks.map((link) => (
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
      ))}
    </>
  );

  const CTAButton = () => (
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
  );

  return (
    <>
      {/* ── HEADER ESTÁTICO ── */}
      <AnimatePresence>
        {isStaticVisible && (
          <motion.div
            key="static-header"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16, transition: { duration: 0.35, ease: "easeInOut" } }}
            className="fixed top-0 left-0 right-0 z-[999] font-sans"
          >
            <nav className="flex max-w-7xl mx-auto px-4 md:px-6 py-4 items-center justify-between">
              <Link to="/" className="flex items-center gap-3 no-underline">
                <span className="text-lg font-medium tracking-tight text-white">
                  Client Connect<span className="text-[#34d399]">.</span>
                </span>
              </Link>

              <button
                onClick={toggleMenu}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 lg:hidden focus:outline-none"
                aria-label="Open menu"
              >
                <Menu size={18} className="text-white" />
              </button>

              <div className="hidden lg:flex items-center gap-8">
                <NavLinks />
                <div className="h-6 w-px bg-white/10" />
                <CTAButton />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HEADER SCROLL / HOVER ── */}
      <motion.div
        key="scroll-header"
        role="banner"
        initial="hidden"
        animate={showScrollHeader ? "visible" : "hidden"}
        variants={scrollHeaderVariants}
        className={cn(
          "fixed top-0 left-0 right-0 z-[1000] font-sans",
          showScrollHeader ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <nav className="flex max-w-7xl mx-auto px-4 md:px-6 py-4 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <span className="text-lg font-medium tracking-tight text-white">
              Client Connect<span className="text-[#34d399]">.</span>
            </span>
          </Link>

          <button
            onClick={toggleMenu}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 lg:hidden focus:outline-none"
            aria-label="Open menu"
          >
            {isMobileMenuOpen ? <X size={18} className="text-white" /> : <Menu size={18} className="text-white" />}
          </button>

          <div className="hidden lg:flex items-center gap-8">
            <NavLinks />
            <div className="h-6 w-px bg-white/10" />
            <CTAButton />
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
            <div className="space-y-1 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={toggleMenu}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/5 no-underline"
                >
                  {link.name}
                </Link>
              ))}
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