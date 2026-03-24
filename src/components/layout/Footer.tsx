import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useTracking } from "@/context/TrackingContext";

// --- COLORS ---
const COLORS = {
  cyan: "#06b6d4", 
  emerald: "#34d399", 
};

// --- DATA ---
const navigation = {
  main: [
    { name: "About Us", href: "/about" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Contact", href: "/contact" },
    { name: "Services", href: "/services/seo" },
  ],
  social: [
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ]
};

function Footer(): JSX.Element {
  const { phoneDisplay, phoneTel } = useTracking();
  return (
    <footer className="relative bg-black text-white pt-24 pb-12 overflow-hidden font-sans border-t border-zinc-800">
      
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.2]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern-footer" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#27272a" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern-footer)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* 1. TOP SECTION: CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 border-b border-zinc-800 pb-16 mb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-2 h-2 bg-emerald-500 rounded-none"></div>
               <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Growth Partners</span>
            </div>

            <h2 className="font-sans font-bold text-[40px] md:text-[60px] leading-[1.05] mb-6 text-white tracking-tight">
              Ready to dominate <br />
              <motion.span
                initial={{ backgroundPosition: "400% 50%" }}
                whileInView={{ backgroundPosition: ["400% 50%", "0% 50%"] }}
                viewport={{ once: true }}
                transition={{
                  duration: 5,
                  ease: "linear",
                  repeat: Infinity
                }}
                style={{
                  display: "inline-block",
                  backgroundImage: `linear-gradient(45deg, ${COLORS.emerald}, ${COLORS.cyan}, #ffffff, ${COLORS.cyan}, ${COLORS.emerald})`,
                  backgroundSize: "300% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                  paddingBottom: "5px"
                }}
              >
                your market?
              </motion.span>
            </h2>
            <p className="font-sans font-medium text-zinc-400 text-lg max-w-lg leading-relaxed">
              We build scalable growth engines for Australian businesses. Stop guessing and start scaling with data-driven precision.
            </p>
          </div>

          {/* UPDATED BUTTON: Book Strategy Call */}
          <Link 
            to="/contact"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent overflow-hidden transition-all duration-300 flex-shrink-0 rounded-full"
            style={{
              border: `1px solid ${COLORS.cyan}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = `1px solid ${COLORS.emerald}`;
              e.currentTarget.style.boxShadow = `0 0 20px rgba(52,211,153,0.5)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = `1px solid ${COLORS.cyan}`;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
             <span 
               className="relative font-sans font-bold text-lg z-10 transition-colors duration-300 footer-cta-text"
               style={{ color: COLORS.cyan }}
             >
                Book Strategy Call
             </span>
             <ArrowRight 
               size={20} 
               className="relative z-10 transition-all duration-300 group-hover:translate-x-1 footer-cta-icon"
               style={{ color: COLORS.cyan }}
               strokeWidth={2.5}
             />

             {/* Hover color swap via group-hover workaround with CSS */}
             <style>{`
               .group:hover .footer-cta-icon,
               .group:hover .footer-cta-text {
                 color: ${COLORS.emerald} !important;
               }
             `}</style>
          </Link>
        </div>

        {/* 2. MIDDLE SECTION: LINKS & INFO */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col gap-6">
             <Link to="/" className="inline-flex items-center gap-2 no-underline">
                <img
                  src="/images/CCA-icon.png"
                  alt="Client Connect"
                  className="w-14 h-14 shrink-0 object-contain"
                />
                <span className="text-2xl font-medium tracking-tight text-white">
                  Cl
                  <span
                    className="text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(to bottom, #34d399 38%, white 38%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    i
                  </span>
                  ent Connect
                </span>
             </Link>
             <p className="font-sans text-zinc-500 leading-relaxed max-w-sm text-sm">
               Australia's premier growth partner. We combine technical SEO, paid media, and retention strategies into one unified ecosystem.
             </p>
             <div className="flex gap-3 mt-2">
                {navigation.social.map((item) => (
                   <a 
                     key={item.name} 
                     href={item.href}
                     className="w-10 h-10 border border-zinc-800 bg-zinc-900/50 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 hover:bg-zinc-800 transition-all duration-300 rounded-none"
                   >
                      <item.icon size={18} />
                   </a>
                ))}
             </div>
          </div>

          {/* Links Column */}
          <div className="md:col-span-2 md:col-start-6">
             <h3 className="font-sans font-bold text-white text-sm uppercase tracking-wider mb-6">Explore</h3>
             <ul className="flex flex-col gap-3">
                {navigation.main.map((item) => (
                   <li key={item.name}>
                      <Link 
                        to={item.href} 
                        className="font-sans text-sm text-zinc-400 hover:text-emerald-400 transition-colors"
                      >
                         {item.name}
                      </Link>
                   </li>
                ))}
             </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4 md:col-start-9">
             <h3 className="font-sans font-bold text-white text-sm uppercase tracking-wider mb-6">Contact</h3>
             <ul className="flex flex-col gap-4">
                <li>
                   <a href="mailto:info@clientconnectaustralia.com.au" className="flex items-center gap-3 group">
                      <div className="p-2 border border-zinc-800 bg-zinc-900 text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors rounded-none">
                        <Mail size={16} />
                      </div>
                      <span className="font-sans text-sm text-zinc-400 group-hover:text-white transition-colors">
                        info@clientconnectaustralia.com.au
                      </span>
                   </a>
                </li>
                <li>
                  <a href={`tel:${phoneTel}`} className="flex items-center gap-3 group">
                      <div className="p-2 border border-zinc-800 bg-zinc-900 text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors rounded-none">
                        <Phone size={16} />
                      </div>
                      <span className="font-sans text-sm text-zinc-400 group-hover:text-white transition-colors">
                      {phoneDisplay}
                      </span>
                   </a>
                </li>
                <li>
                   <div className="flex items-center gap-3 group">
                      <div className="p-2 border border-zinc-800 bg-zinc-900 text-zinc-400 rounded-none">
                        <MapPin size={16} />
                      </div>
                      <span className="font-sans text-sm text-zinc-400">
                        Sydney, Australia
                      </span>
                   </div>
                </li>
             </ul>
          </div>
        </div>

        {/* 3. BIG TYPE BOTTOM */}
        <div className="w-full border-t border-zinc-800 pt-16 pb-4 flex flex-col items-center select-none pointer-events-none">
           <p className="font-sans font-black text-[12vw] leading-[0.8] tracking-tighter text-zinc-900 text-center whitespace-nowrap opacity-80">
              CLIENT CONNECT
           </p>
        </div>

        {/* 4. COPYRIGHT & LEGAL */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-0 pt-8 border-t border-zinc-800/50">
           <p className="font-sans text-xs text-zinc-600 font-medium">
              &copy; {new Date().getFullYear()} Client Connect Australia. All rights reserved.
           </p>
           <div className="flex gap-8">
              {navigation.legal.map((item) => (
                 <a 
                   key={item.name} 
                   href={item.href}
                   className="font-sans text-xs text-zinc-600 hover:text-zinc-400 transition-colors font-medium"
                 >
                    {item.name}
                 </a>
              ))}
           </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;