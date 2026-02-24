import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";
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

// --- SUB-COMPONENTS ---

const StaticNavLink = ({ name, href, isActive }: { name: string; href: string; isActive: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link
      to={href}
      className="relative block px-5 py-2 no-underline group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center relative z-10">
        <span className={cn(
          "text-[14px] font-sans font-medium leading-tight transition-colors duration-300 tracking-wide uppercase",
          isActive ? "text-white" : "text-white/70 group-hover:text-white"
        )}>
          {name}
        </span>
        <motion.div
          className="absolute -bottom-1 h-[1px] bg-[#34d399]"
          initial={{ width: "0%" }}
          animate={{ width: isHovered || isActive ? "100%" : "0%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </Link>
  );
};

const ScrollNavLink = ({ name, href, isActive }: { name: string; href: string; isActive: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link
      to={href}
      className="relative block px-5 py-2 no-underline group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center relative z-10">
        <span className={cn(
          "text-[14px] font-sans font-medium leading-tight transition-colors duration-300 tracking-wide uppercase",
          isActive ? "text-white" : "text-zinc-400 group-hover:text-white"
        )}>
          {name}
        </span>
        <motion.div
          className="absolute -bottom-1 h-[1px] bg-[#06b6d4]"
          initial={{ width: "0%" }}
          animate={{ width: isHovered || isActive ? "100%" : "0%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </Link>
  );
};

const MobileNavLink = ({ name, href, onClick }: { name: string; href: string; onClick: () => void }) => (
  <Link
    to={href}
    onClick={onClick}
    className="group flex w-full items-center justify-between border-b border-zinc-800 py-6 text-zinc-400 no-underline transition-colors hover:text-white"
  >
    <span className="text-[20px] font-sans font-semibold uppercase tracking-tight">{name}</span>
    <div className="flex h-10 w-10 items-center justify-center overflow-hidden border border-zinc-700 text-zinc-400 transition-all group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-black">
      <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
    </div>
  </Link>
);

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

  return (
    <>
      {/* ── HEADER ESTÁTICO ── */}
      <AnimatePresence>
        {isStaticVisible && (
          <motion.header
            key="static-header"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16, transition: { duration: 0.35, ease: "easeInOut" } }}
            className="fixed top-0 left-0 right-0 z-[999] flex h-[80px] w-full items-center px-6 md:px-10 font-sans bg-transparent"
          >
            <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between">

              <Link to="/" className="flex items-center gap-2">
                <span className="font-sans text-lg md:text-xl font-bold tracking-tight text-white">
                  Client Connect Australia<span className="text-[#34d399]">.</span>
                </span>
              </Link>

              <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
                <div className="flex items-center px-6 py-0">
                  {navLinks.map((link) => (
                    <StaticNavLink key={link.name} name={link.name} href={link.href} isActive={location.pathname === link.href} />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  to="/contact"
                  className="hidden lg:flex px-6 py-2.5 font-sans font-bold text-[13px] uppercase tracking-wide transition-all duration-300 border border-white/30 text-white hover:bg-white hover:text-black"
                >
                  Start Scaling
                </Link>

                <div className="block lg:hidden">
                  <button onClick={toggleMenu} className="flex items-center justify-center p-2 focus:outline-none" aria-label="Toggle menu">
                    <div className="flex flex-col space-y-1.5 p-2">
                      <span className="block h-[2px] w-6 bg-white" />
                      <span className="block h-[2px] w-6 bg-white" />
                    </div>
                  </button>
                </div>
              </div>

            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ── HEADER SCROLL / HOVER — PILL ── */}
      <motion.div
        key="scroll-header"
        role="banner"
        initial="hidden"
        animate={showScrollHeader ? "visible" : "hidden"}
        variants={scrollHeaderVariants}
        className={cn(
          "fixed top-4 left-0 right-0 z-[1000] flex justify-center px-6 font-sans",
          showScrollHeader ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <nav
          className="flex items-center justify-between w-full max-w-[860px] px-5 py-3 rounded-full"
          style={{
            background: "rgba(28, 28, 30, 0.85)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.5)",
          }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 relative z-[1002] shrink-0">
            <span className="font-sans text-[17px] font-bold tracking-tight text-white whitespace-nowrap">
              Client Connect<span className="text-[#34d399]">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="px-4 py-1.5 rounded-full text-[13.5px] font-medium transition-all duration-200 no-underline"
                style={{
                  color: location.pathname === link.href ? "#fff" : "rgba(255,255,255,0.5)",
                  background: location.pathname === link.href ? "rgba(255,255,255,0.08)" : "transparent",
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden lg:flex items-center px-5 py-2 rounded-full font-sans font-bold text-[13px] uppercase tracking-wide transition-all duration-200 no-underline"
              style={{ background: "#10b981", color: "#000" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#34d399")}
              onMouseLeave={e => (e.currentTarget.style.background = "#10b981")}
            >
              Start Scaling
            </Link>

            <div className="block lg:hidden relative z-[1002]">
              <button onClick={toggleMenu} className="flex items-center justify-center p-2 focus:outline-none" aria-label="Toggle menu">
                {isMobileMenuOpen ? (
                  <X size={22} className="text-white" />
                ) : (
                  <div className="flex flex-col space-y-[5px]">
                    <span className="block h-[2px] w-5 bg-white" />
                    <span className="block h-[2px] w-5 bg-white" />
                    <span className="block h-[2px] w-5 bg-white" />
                  </div>
                )}
              </button>
            </div>
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
            className="fixed inset-0 z-[1001] flex flex-col bg-[#050505] px-6 pt-32 font-sans"
          >
            <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.05]">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid-pattern-mobile" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern-mobile)" />
              </svg>
            </div>

            <div className="flex flex-col space-y-2 relative z-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
                >
                  <MobileNavLink name={link.name} href={link.href} onClick={toggleMenu} />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                className="pt-8"
              >
                <Link
                  to="/contact"
                  onClick={toggleMenu}
                  className="flex w-full items-center justify-center gap-2 py-4 bg-white text-black font-sans font-bold text-sm uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                >
                  Start Scaling
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}