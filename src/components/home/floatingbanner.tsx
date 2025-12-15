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

  // Ocultar en página de contacto
  const isContactPage = location.pathname === "/contact";

  useEffect(() => {
    // Verificar si el usuario ya lo cerró en esta sesión
    const dismissed = sessionStorage.getItem("bannerDismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    const handleScroll = () => {
      // Calcular altura y umbral (20% para no ser tan intrusivo al inicio)
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollThreshold = scrollHeight * 0.20;
      const currentScroll = window.scrollY;

      // Detectar footer para no solaparlo (opcional en modo modal, pero buena práctica)
      const footer = document.querySelector("footer");
      const isFooterVisible = footer && footer.getBoundingClientRect().top <= window.innerHeight;

      // Mostrar si pasamos el umbral
      if (currentScroll > scrollThreshold && !isFooterVisible) {
        setIsVisible(true);
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
    // Check inicial
    // handleScroll(); // Comentado para evitar que aparezca inmediatamente si recargas a mitad de página

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
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
          
          {/* 1. BACKDROP (Fondo Oscuro) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleDismiss} // Cerrar al hacer clic fuera
            className="absolute inset-0 bg-black/60 backdrop-blur-[4px]"
          />

          {/* 2. CARD (Centro Absoluto) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative w-full max-w-2xl",
              "bg-[#050505] border border-zinc-800",
              "shadow-2xl shadow-black",
              "rounded-none", // Estilo Blueprint (Recto)
              "overflow-hidden"
            )}
          >
            {/* Glow sutil superior (Esmeralda/Cyan) */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
            
            {/* Botón Cerrar (X) */}
            <button
              onClick={handleDismiss}
              className="absolute top-0 right-0 p-3 text-zinc-500 hover:text-white hover:bg-zinc-900 transition-colors z-20"
              aria-label="Close banner"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row">
              
              {/* Left Section: Visual/Icon */}
              <div className="bg-zinc-900/50 p-6 md:p-8 flex flex-col justify-center items-start md:w-[40%] border-b md:border-b-0 md:border-r border-zinc-800">
                <div className="w-12 h-12 rounded-none bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 shadow-inner">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                   <span className="relative flex h-2 w-2">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                   </span>
                   <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Available Now</span>
                </div>
                <h3 className="font-sans font-bold text-xl text-white leading-tight">
                  Strategy Audit
                </h3>
              </div>

              {/* Right Section: Content & Actions */}
              <div className="p-6 md:p-8 flex flex-col justify-center md:w-[60%]">
                <h4 className="font-sans font-semibold text-lg text-white mb-2">
                  Ready to scale your revenue?
                </h4>
                <p className="font-sans font-medium text-sm text-zinc-400 leading-relaxed mb-6">
                  Get a comprehensive analysis of your digital ecosystem. We identify the bottlenecks costing you conversions.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Action Button (Primary) */}
                  <button
                    onClick={() => {
                      const element = document.getElementById('get-in-touch');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        handleDismiss(); // Cerrar modal al ir
                      }
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-none bg-white hover:bg-zinc-200 text-black shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all group"
                  >
                    <span className="font-sans font-bold text-sm">Get Free Audit</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                  </button>

                  {/* Call Button (Secondary) */}
                  <a 
                    href="tel:0290734731"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-none border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="font-sans font-semibold text-sm">Call Us</span>
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}