import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// --- UTILS ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// --- CONFIGURACIÓN ---
const SCROLL_THRESHOLD = 200; // Píxeles de scroll necesarios para que empiece a funcionar la lógica

// --- DATA ---
const navLinks = [
  { name: "Work", href: "/work" },
  { name: "Process", href: "/process" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
];

// --- SUB-COMPONENTS ---

// Desktop Navigation Link
const DesktopNavLink = ({ name, href, isActive }: { name: string, href: string, isActive: boolean }) => {
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
        
        {/* Línea animada Cyan */}
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

// Mobile Navigation Link
const MobileNavLink = ({ name, href, onClick }: { name: string, href: string, onClick: () => void }) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className="group flex w-full items-center justify-between border-b border-zinc-800 py-6 text-zinc-400 no-underline transition-colors hover:text-white"
    >
      <span className="text-[20px] font-sans font-semibold uppercase tracking-tight">{name}</span>
      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-none border border-zinc-700 text-zinc-400 transition-all group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-black">
        <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
      </div>
    </Link>
  );
};

// --- MAIN COMPONENT ---
export function Header() {
  const [isVisible, setIsVisible] = useState(false); // Inicia oculto
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // LÓGICA DE VISIBILIDAD:
      // 1. Si estamos en la parte superior (antes del umbral), siempre oculto.
      // 2. Si bajamos (current > last), oculto.
      // 3. Si subimos (current < last) Y hemos pasado el umbral, visible.
      
      if (currentScroll < SCROLL_THRESHOLD) {
        setIsVisible(false);
      } else if (currentScroll > lastScrollY) {
        setIsVisible(false); 
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Bloquear scroll body cuando se abre menú móvil
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // VARIANTS: Efecto Suave (Soft Fade)
  const headerVariants: Variants = {
    hidden: { 
      y: -20, // Menos desplazamiento para que se sienta más como un fade
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        // Curva suave para entrada elegante
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  // Si el menú móvil está abierto, forzamos que el header sea visible e interactivo
  const shouldShowHeader = isVisible || isMobileMenuOpen;
  const isInteractive = shouldShowHeader;

  return (
    <>
      <motion.header
        role="banner"
        initial="hidden"
        animate={shouldShowHeader ? "visible" : "hidden"}
        variants={headerVariants}
        className={cn(
          "fixed top-0 left-0 right-0 z-[1000] flex w-full h-[80px] items-center justify-between px-6 md:px-10 font-sans",
          isInteractive ? "pointer-events-auto" : "pointer-events-none",
          // ESTILO GLASSMORPHISM MEJORADO:
          // Más transparencia (/70) y más blur (blur-lg) para el efecto cristal
          "bg-[#050505]/70 backdrop-blur-lg border-b border-white/5 shadow-sm"
        )}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between">
          
          {/* 1. LOGO */}
          <Link to="/" className="flex items-center relative z-[1002] gap-2 group">
            <span
              className={cn(
                "font-sans text-lg md:text-xl font-bold tracking-tight text-white transition-colors duration-300"
              )}
            >
              Client Connect Australia<span className="text-[#34d399]">.</span>
            </span>
          </Link>

          {/* 2. DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center px-6 py-0 border-x border-white/5 bg-transparent">
              {navLinks.map((link) => (
                <DesktopNavLink
                  key={link.name}
                  name={link.name}
                  href={link.href}
                  isActive={location.pathname === link.href}
                />
              ))}
            </div>
          </div>

          {/* 3. RIGHT SIDE (CTA + Mobile Toggle) */}
          <div className="flex items-center gap-4">
            
            {/* Desktop CTA */}
            <Link 
                to="/contact"
                className={cn(
                    "hidden lg:flex px-6 py-2.5 rounded-none font-sans font-bold text-[13px] uppercase tracking-wide transition-all duration-300 border border-transparent",
                    "bg-white text-black hover:bg-zinc-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                )}
            >
                Start Scaling
            </Link>

            {/* Mobile Toggle Button */}
            <div className="block lg:hidden relative z-[1002]">
              <button
                onClick={toggleMenu}
                className="flex items-center justify-center p-2 focus:outline-none pointer-events-auto"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X size={24} className="text-white" />
                ) : (
                  <div className="flex flex-col space-y-1.5 p-2 bg-transparent">
                    <span className="block h-[2px] w-6 bg-white"></span>
                    <span className="block h-[2px] w-6 bg-white"></span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1001] flex flex-col bg-[#050505] px-6 pt-32 font-sans"
          >
            {/* Background Grid Sutil */}
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

            {/* Links */}
            <div className="flex flex-col space-y-2 relative z-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
                >
                  <MobileNavLink
                    name={link.name}
                    href={link.href}
                    onClick={toggleMenu}
                  />
                </motion.div>
              ))}
              
              {/* Mobile CTA */}
               <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                  className="pt-8"
                >
                    <Link 
                        to="/contact"
                        onClick={toggleMenu}
                        className="flex w-full items-center justify-center gap-2 rounded-none py-4 bg-white text-black font-sans font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-zinc-200 transition-colors"
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