import React from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// --- Assets & Constants ---

const COLORS = {
  turquoise: "rgb(103, 188, 183)", // #67bcb7
  coral: "rgb(222, 131, 99)",     // #de8363
  gold: "rgb(237, 191, 134)",     // #edbf86
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

// --- Content Data ---

const plans = [
  {
    name: "Growth",
    price: "$2,500",
    description: "Perfect for local businesses ready to build a solid foundation.",
    features: [
      "Local SEO Optimization",
      "Social Media Management (2 platforms)",
      "Monthly Content Calendar",
      "Google Business Profile Management",
      "Basic Monthly Reporting",
    ],
    highlighted: false,
    cta: "Start Growing",
  },
  {
    name: "Scale",
    price: "$4,500",
    description: "For brands ready to expand their reach and drive aggressive leads.",
    features: [
      "Advanced SEO & Link Building",
      "Paid Ads Management (Google & Meta)",
      "Email Marketing Automation",
      "CRO (Conversion Rate Optimization)",
      "Bi-Weekly Strategy Calls",
      "Real-time ROI Dashboard",
    ],
    highlighted: true,
    cta: "Scale Your Brand",
  },
  {
    name: "Dominance",
    price: "Custom",
    description: "Full-service partnership for industry leaders and large organizations.",
    features: [
      "Dedicated Fractional CMO",
      "Omni-Channel Strategy Execution",
      "Custom Web Development & Design",
      "Video Production & Photography",
      "Priority 24/7 Support",
      "Competitor Market Takeover",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="relative bg-white py-24 sm:py-32 overflow-hidden">
      
      {/* --- TOP BORDER LINE --- */}
      <div className="w-full h-[1px] bg-zinc-200 absolute top-0 z-20" />

      {/* Background Pattern */}
      <BackgroundStripes />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium tracking-[2.2px] uppercase text-gray-500 mb-4"
          >
            INVESTMENT
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[26px] md:text-[32px] lg:text-[48px] font-bold leading-[1.1] tracking-tight text-gray-900 mb-6"
          >
            Transparent pricing for{' '}
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
                backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, 0), ${COLORS.gold}, ${COLORS.coral}, ${COLORS.turquoise}, rgba(255, 255, 255, 0))`,
                backgroundSize: "400% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              measurable results
            </motion.span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[16px] md:text-[18px] font-medium leading-relaxed text-gray-600 tracking-tight"
          >
            Choose the partnership level that aligns with your growth goals. No hidden fees, just clear deliverables.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className={`relative flex flex-col p-8 rounded-2xl bg-white transition-all duration-300 ${
                plan.highlighted 
                  ? 'border border-transparent shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] md:scale-105 z-10' 
                  : 'border border-zinc-200 hover:border-zinc-300 hover:shadow-lg'
              }`}
            >
              {/* Highlight Border/Gradient Effect */}
              {plan.highlighted && (
                <div className="absolute inset-0 rounded-2xl p-[1px] -z-10 bg-gradient-to-b from-[rgb(103,188,183)] via-[rgb(222,131,99)] to-[rgb(237,191,134)]" />
              )}

              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gray-900 text-white shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[rgb(237,191,134)]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Most Popular</span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed min-h-[40px]">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold tracking-tight ${plan.highlighted ? "text-gray-900" : "text-gray-900"}`}>
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && <span className="text-gray-400 font-medium">/month</span>}
                </div>
              </div>

              {/* Action Button */}
              <Button
                className={`w-full mb-8 h-12 text-sm font-semibold tracking-wide transition-all duration-300 group ${
                  plan.highlighted 
                    ? 'text-white shadow-md hover:shadow-lg hover:scale-[1.02]' 
                    : 'bg-white text-gray-900 border border-zinc-200 hover:bg-gray-50 hover:border-zinc-300'
                }`}
                style={{
                  backgroundColor: plan.highlighted ? "rgb(30, 41, 59)" : undefined, // Dark button for highlight
                  backgroundImage: plan.highlighted 
                    ? `linear-gradient(135deg, ${COLORS.turquoise}, ${COLORS.coral})` 
                    : undefined
                }}
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>

              <div className="w-full h-px bg-zinc-100 mb-8" />

              <ul className="space-y-4 flex-1">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      <Check className="h-4 w-4" style={{ color: COLORS.turquoise }} strokeWidth={2.5} />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;