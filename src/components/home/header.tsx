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
          <motion.div
            key="static-header"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16, transition: { duration: 0.35, ease: "easeInOut" } }}
            className="fixed top-0 left-0 right-0 z-[999] px-6 py-6 font-sans"
          >
            <div
              className="max-w-4xl mx-auto rounded-full px-6 py-3 border border-white/10"
              style={{
                background: "rgba(10, 11, 20, 0.9)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
              }}
            >
              <div className="flex items-center justify-between">

                <Link to="/" className="flex items-center shrink-0">
                  <span className="text-lg font-semibold tracking-tight text-white font-sans">
                    Client Connect<span className="text-[#34d399]">.</span>
                  </span>
                </Link>

                <ul className="hidden lg:flex items-center gap-1 text-sm font-medium text-white/60 list-none m-0 p-0">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className={cn(
                          "no-underline transition-colors duration-300 px-4 py-2 rounded-full hover:bg-white/5 font-sans block",
                          location.pathname === link.href ? "text-white" : "text-white/60 hover:text-white"
                        )}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2">
                  <Link
                    to="/contact"
                    className="hidden lg:flex items-center px-5 py-2 rounded-full font-sans font-semibold text-[13px] tracking-wide transition-all duration-300 no-underline border border-white/10 text-white/80 hover:text-white hover:bg-white/5"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    Start Scaling
                  </Link>

                  <div className="block lg:hidden">
                    <button onClick={toggleMenu} className="flex items-center justify-center p-2 rounded-full border border-white/5 hover:bg-white/5 transition-all duration-300 focus:outline-none" aria-label="Toggle menu">
                      <div className="flex flex-col space-y-[4px]">
                        <span className="block h-[1.5px] w-4 bg-white/60" />
                        <span className="block h-[1.5px] w-4 bg-white/60" />
                        <span className="block h-[1.5px] w-4 bg-white/60" />
                      </div>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HEADER SCROLL / HOVER — PILL ASTROLUX STYLE ── */}
      <motion.div
        key="scroll-header"
        role="banner"
        initial="hidden"
        animate={showScrollHeader ? "visible" : "hidden"}
        variants={scrollHeaderVariants}
        className={cn(
          "fixed top-0 left-0 right-0 z-[1000] px-6 py-6 font-sans",
          showScrollHeader ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          className="max-w-4xl mx-auto rounded-full px-6 py-3 border border-white/10"
          style={{
            background: "rgba(10, 11, 20, 0.9)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
          }}
        >
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <span className="text-lg font-semibold tracking-tight text-white font-sans">
                Client Connect<span className="text-[#34d399]">.</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-1 text-sm font-medium text-white/60 list-none m-0 p-0">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className={cn(
                      "no-underline transition-colors duration-300 px-4 py-2 rounded-full hover:bg-white/5 font-sans block",
                      location.pathname === link.href ? "text-white" : "text-white/60 hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-2">
              <Link
                to="/contact"
                className="hidden lg:flex items-center px-5 py-2 rounded-full font-sans font-semibold text-[13px] tracking-wide transition-all duration-300 no-underline border border-white/10 text-white/80 hover:text-white hover:bg-white/5"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                Start Scaling
              </Link>

              <div className="block lg:hidden relative z-[1002]">
                <button onClick={toggleMenu} className="flex items-center justify-center p-2 rounded-full border border-white/5 hover:bg-white/5 transition-all duration-300 focus:outline-none" aria-label="Toggle menu">
                  {isMobileMenuOpen ? (
                    <X size={16} className="text-white/60" />
                  ) : (
                    <div className="flex flex-col space-y-[4px]">
                      <span className="block h-[1.5px] w-4 bg-white/60" />
                      <span className="block h-[1.5px] w-4 bg-white/60" />
                      <span className="block h-[1.5px] w-4 bg-white/60" />
                    </div>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
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