import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import { X, Phone, ArrowRight, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// --- UTILS ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function FloatingBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const location = useLocation();

  const isContactPage = location.pathname === "/contact";

  useEffect(() => {
    // DESCOMENTAR PARA PRODUCCIÓN:
    /* 
    const dismissed = sessionStorage.getItem("bannerDismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    } 
    */

    const handleScroll = () => {
      const totalDocHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = totalDocHeight - windowHeight;
      
      // CAMBIO 1: UMBRAL DE SCROLL MÁS AVANZADO
      // Antes era 0.15 (15%), ahora es 0.35 (35%). 
      // El usuario debe scrollear más de un tercio de la web.
      const scrollThreshold = maxScroll * 0.35; 
      
      const currentScroll = window.scrollY;

      const footer = document.querySelector("footer");
      
      let isFooterVisible = false;
      if (footer) {
        const rect = footer.getBoundingClientRect();
        isFooterVisible = rect.top <= windowHeight + 50; 
      }

      if (currentScroll > scrollThreshold && !isFooterVisible) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll(); 

    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem("bannerDismissed", "true");
  };

  if (isDismissed || isContactPage) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          // Posición inicial y final centrada en X (-50%)
          initial={{ y: 50, opacity: 0, x: "-50%" }}
          animate={{ y: 0, opacity: 1, x: "-50%" }}
          exit={{ y: 50, opacity: 0, x: "-50%" }}
          // CAMBIO: Duración un poco más lenta para más suavidad
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "fixed bottom-6 left-1/2 z-[100]",
            "w-[calc(100%-32px)] md:w-auto md:max-w-4xl",
            "pointer-events-none" 
          )}
        >
          <div className={cn(
            "pointer-events-auto relative",
            "w-full md:w-auto",
            
            // CAMBIO 2: GLASSMORPHISM (Dark Glass)
            // bg-black/80 da transparencia, backdrop-blur-md desenfoca el fondo
            "bg-black/80 backdrop-blur-md border border-zinc-800/80",
            
            "p-5 md:py-4 md:px-6",
            "shadow-2xl shadow-black/50", 
            "rounded-none" 
          )}>
            
            {/* Glow sutil */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent opacity-60" />

            {/* Botón Cerrar (X) */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 md:-top-3 md:-right-3 w-6 h-6 md:w-7 md:h-7 rounded-none bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-all flex items-center justify-center z-10"
              aria-label="Close banner"
            >
              <X className="w-3 h-3 md:w-3.5 md:h-3.5" />
            </button>

            <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-10">
              
              {/* Left: Icon & Text */}
              <div className="flex items-center gap-4 text-center md:text-left w-full md:w-auto justify-start">
                
                <div className="hidden sm:flex w-10 h-10 rounded-none bg-zinc-900/80 border border-zinc-800 items-center justify-center flex-shrink-0 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </div>
                
                <div className="flex flex-col items-start text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-sans font-bold text-[15px] text-white leading-none tracking-tight">
                      Ready to scale?
                    </h3>
                    <div className="flex items-center gap-1.5 px-1.5 py-0.5 bg-zinc-900/60 border border-zinc-800/50 rounded-none backdrop-blur-sm">
                       <span className="relative flex h-1.5 w-1.5">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                         <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                       </span>
                       <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wide leading-none">Open</span>
                    </div>
                  </div>
                  <p className="font-sans font-medium text-[13px] text-zinc-300 leading-tight">
                    Get a comprehensive strategy audit for free.
                  </p>
                </div>
              </div>

              {/* Right: Buttons */}
              <div className="flex flex-row gap-3 w-full md:w-auto items-stretch md:items-center">
                
                <a 
                  href="tel:0290734731"
                  className="group flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-none border border-zinc-700 bg-zinc-900/40 hover:bg-zinc-800/60 text-zinc-300 hover:text-white transition-all backdrop-blur-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span className="font-sans font-semibold text-xs whitespace-nowrap">Call us</span>
                </a>

                <button
                  onClick={() => {
                    const element = document.getElementById('get-in-touch');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-none bg-white hover:bg-zinc-200 text-black shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all"
                >
                  <span className="font-sans font-bold text-xs whitespace-nowrap">Get Free Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={3} />
                </button>

              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}