"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

// --- CONSTANTES & ESTILOS ---
const COLORS = {
  cyan: "#06b6d4",
  emerald: "#34d399",
  gold: "rgb(237, 191, 134)", 
};

const BackgroundStripes = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.04]"
    style={{
      backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZSURBVHgBxcghAQAAAIMw+pf+C+CZHLilebfsBfsvTewEAAAAAElFTkSuQmCC")`,
      backgroundRepeat: 'repeat',
    }}
  />
);

// --- DATOS (Agencia de Marketing) ---
const testimonials = [
  {
    text: "Client Connect completely overhauled our paid acquisition strategy. We went from a 2.1x ROAS to a stable 5.4x in just three months. Their data-driven approach is unmatched.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "CMO at TechFlow",
  },
  {
    text: "Finally, an agency that understands B2B pipelines. They didn't just bring us leads; they integrated with our CRM to ensure lead quality was actually driving revenue.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "Founder, SaaSify",
  },
  {
    text: "Their SEO audit revealed technical flaws our previous agency missed for years. Since the fix, our organic traffic has tripled and keeps compounding.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Head of Growth",
  },
  {
    text: "The creative team captured our brand voice perfectly. The rebrand wasn't just visual; it changed how the market perceives our value proposition.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "Director of Ops",
  },
  {
    text: "Communication is seamless. Having a dedicated Slack channel with their team makes us feel like they are truly an extension of our in-house marketing department.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Marketing Manager",
  },
  {
    text: "We were skeptical about scaling our budget, but their projection models were spot on. We scaled spend by 300% while maintaining profitability.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "E-commerce Founder",
  },
  {
    text: "The real-time dashboard they built for us ended the 'monthly report' guessing game. We know exactly where every dollar is going every single day.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "CEO, UrbanWear",
  },
  {
    text: "From CRO to Email flows, they optimized our entire funnel. Our conversion rate increased by 45% without changing our ad spend.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "Sales Director",
  },
  {
    text: "They don't just execute tasks; they provide strategy. Client Connect acts like a growth partner that truly cares about our bottom line.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "VP of Marketing",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- SUB-COMPONENTE: COLUMNA DE TESTIMONIOS ---
const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div 
                  key={i}
                  className="group relative p-8 rounded-none border border-zinc-200 bg-white transition-all duration-300 hover:border-emerald-400 hover:shadow-lg hover:-translate-y-1 w-full"
                >
                  <Quote className="absolute top-6 right-6 w-5 h-5 text-zinc-200 group-hover:text-emerald-200 transition-colors" />
                  
                  <p className="text-sm leading-relaxed text-zinc-600 mb-6 font-medium">
                    "{text}"
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative">
                        <img
                        src={image}
                        alt={name}
                        className="h-10 w-10 rounded-none object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-none" />
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-zinc-900 tracking-tight leading-tight">
                        {name}
                      </span>
                      <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                        {role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
const TestimonialsSection = () => {
  return (
    <section className="relative w-full bg-[#FAFAFA] py-24 sm:py-32 overflow-hidden">
      
      {/* Top Border */}
      <div className="w-full h-[1px] bg-zinc-200 absolute top-0 z-20" />

      {/* Background Pattern */}
      <BackgroundStripes />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[640px] mx-auto text-center mb-16"
        >
          <div className="text-sm font-medium tracking-[2.2px] uppercase text-gray-500 mb-4">
            SOCIAL PROOF
          </div>

          <h2 className="text-[26px] md:text-[32px] lg:text-[48px] font-bold leading-[1.1] tracking-tight text-gray-900 mb-6">
            Trusted by founders and{' '}
            <motion.span
              initial={{ backgroundPosition: "400% 50%" }}
              animate={{ backgroundPosition: ["400% 50%", "0% 50%"] }}
              transition={{
                duration: 12,
                ease: "linear",
                repeat: Infinity
              }}
              style={{
                display: "inline-block",
                backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, 0), ${COLORS.emerald}, ${COLORS.cyan}, rgba(255, 255, 255, 0))`,
                backgroundSize: "400% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              marketing leaders
            </motion.span>
          </h2>
          
          <p className="text-[16px] md:text-[18px] font-medium leading-relaxed text-gray-600 tracking-tight">
            See what happens when data-driven strategy meets creative excellence. Real results from real partners.
          </p>
        </motion.div>

        {/* Columnas de Testimonios */}
        <div className="relative flex justify-center gap-6 max-h-[740px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
          
          {/* Columna 1 */}
          <TestimonialsColumn 
            testimonials={firstColumn} 
            duration={45} 
            className="w-full md:w-1/2 lg:w-1/3"
          />
          
          {/* Columna 2 (Oculta en movil) */}
          <TestimonialsColumn 
            testimonials={secondColumn} 
            className="hidden md:block w-1/2 lg:w-1/3" 
            duration={55} 
          />
          
          {/* Columna 3 (Oculta en tablet/movil) */}
          <TestimonialsColumn 
            testimonials={thirdColumn} 
            className="hidden lg:block w-1/3" 
            duration={50} 
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;