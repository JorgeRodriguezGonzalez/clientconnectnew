"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

// --- CONSTANTES & ESTILOS ---
const COLORS = {
  cyan: "#06b6d4",
  emerald: "#34d399",
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

// --- DATA (Adaptada a Marketing Digital) ---
const faqData = [
  {
    id: 1,
    question: "How quickly will we start seeing results from our campaigns?",
    answer: "Digital marketing is a momentum game. While paid channels (like Google Ads or Meta) can generate traffic almost immediately, a sustainable ROI typically stabilizes within the first 3 months. For organic strategies like SEO, we generally see significant traction and compound growth between months 4 and 6. We focus on building a long-term engine, not just a short-term spike.",
  },
  {
    id: 2,
    question: "Do you work with specific industries or niches?",
    answer: "We are strategy-first, which allows us to be industry-agnostic. However, we specialize in partnering with service-based businesses, e-commerce brands, and SaaS companies looking to scale. Our data-driven framework adapts to your specific market dynamics, whether you are targeting B2B decision-makers or B2C consumers.",
  },
  {
    id: 3,
    question: "What makes Client Connect different from other agencies?",
    answer: "We don't just report on 'vanity metrics' like impressions or likes. We integrate directly with your sales data to track revenue and actual ROI. While other agencies might celebrate a low cost-per-click, we only celebrate when you see more qualified leads and closed deals. We act as a strategic growth partner, not just a service provider executing tasks.",
  },
  {
    id: 4,
    question: "What does the onboarding process look like?",
    answer: "We believe in rapid deployment without sacrificing quality. Once we kick off, we conduct a deep-dive audit of your current digital ecosystem within the first 5 days. You will get access to a dedicated Slack channel for instant communication and a real-time performance dashboard, ensuring you are never left wondering about the status of your campaigns.",
  },
  {
    id: 5,
    question: "Are we locked into a long-term contract?",
    answer: "We believe our results should keep you with us, not a piece of paper. While we recommend a 3-month initial runway to allow for proper testing and optimization, our agreements are designed to be flexible. We offer clear, transparent terms because we are confident in our ability to deliver value month over month.",
  },
];

// --- COMPONENTE PRINCIPAL ---

export default function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <section className="relative w-full bg-white py-24 sm:py-32 overflow-hidden">
      
      {/* Top Border */}
      <div className="w-full h-[1px] bg-zinc-200 absolute top-0 z-20" />

      {/* Background Pattern */}
      <BackgroundStripes />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col gap-6 max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium tracking-[2.2px] uppercase text-gray-500"
          >
            SUPPORT
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[26px] md:text-[32px] lg:text-[48px] font-bold leading-[1.1] tracking-tight text-gray-900"
          >
            Frequently asked{' '}
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
                // Gradiente Emerald & Cyan
                backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, 0), ${COLORS.emerald}, ${COLORS.cyan}, rgba(255, 255, 255, 0))`,
                backgroundSize: "400% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              questions
            </motion.span>
            <span className="text-gray-900">.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[16px] md:text-[18px] font-medium leading-relaxed text-gray-600 tracking-tight"
          >
            Everything you need to know about how we work, our methodology, and how we help businesses scale.
          </motion.p>
        </div>

        {/* Accordion Container */}
        <div className="max-w-[800px] mx-auto">
           {/* Timestamp "Chat" style decoration */}
           <div className="flex justify-center mb-8">
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 bg-zinc-50 px-3 py-1 border border-zinc-100">
                Updated Today
              </span>
           </div>

          <Accordion.Root
            type="single"
            collapsible
            value={openItem || ""}
            onValueChange={(value) => setOpenItem(value)}
            className="space-y-4"
          >
            {faqData.map((item, index) => (
              <Accordion.Item 
                value={item.id.toString()} 
                key={item.id} 
                className="group"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-start gap-x-4 focus:outline-none group">
                    {/* Chat Bubble: Question (User side) */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className={cn(
                        "relative flex items-center justify-between w-full p-5 text-left transition-all duration-300 border rounded-none",
                        // Estados activos vs inactivos
                        openItem === item.id.toString() 
                          ? "bg-white border-zinc-300 shadow-md z-10" 
                          : "bg-zinc-50 border-zinc-200 hover:bg-white hover:border-zinc-300"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-none transition-colors duration-300",
                          openItem === item.id.toString() ? "bg-zinc-900 text-white" : "bg-zinc-200 text-zinc-500"
                        )}>
                            <MessageSquare size={14} />
                        </div>
                        <span className={cn(
                          "text-base md:text-lg font-semibold transition-colors duration-300",
                          openItem === item.id.toString() ? "text-zinc-900" : "text-zinc-600"
                        )}>
                          {item.question}
                        </span>
                      </div>

                      <span 
                        className={cn(
                          "ml-4 transition-transform duration-300",
                          openItem === item.id.toString() ? "text-emerald-500 rotate-180" : "text-zinc-400"
                        )}
                      >
                        {openItem === item.id.toString() ? (
                          <Minus className="h-5 w-5" />
                        ) : (
                          <Plus className="h-5 w-5" />
                        )}
                      </span>

                      {/* Accent Line on active */}
                      {openItem === item.id.toString() && (
                        <motion.div 
                            layoutId="active-line"
                            className="absolute left-0 top-0 bottom-0 w-[3px]"
                            style={{ backgroundColor: COLORS.emerald }}
                        />
                      )}
                    </motion.div>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content asChild forceMount>
                  <AnimatePresence initial={false}>
                    {openItem === item.id.toString() && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        {/* Chat Bubble: Answer (Agency side) */}
                        <div className="flex justify-end mt-2 ml-8 md:ml-16">
                            <div
                                className={cn(
                                "relative max-w-2xl p-6 text-sm md:text-base leading-relaxed rounded-none shadow-sm",
                                // Fondo Oscuro para la respuesta (Estilo industrial/tech)
                                "bg-zinc-900 text-zinc-100"
                                )}
                            >
                                {/* Decorative corner */}
                                <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500/20" />
                                
                                {item.answer}
                            </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
}