"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const COLORS = {
  cyan: "#06b6d4",
  emerald: "#34d399",
  gold: "rgb(237, 191, 134)",
};

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
        className="flex flex-col gap-5 pb-5"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  key={i}
                  className="group relative p-6 rounded-2xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 w-full"
                >
                  <Quote className="absolute top-5 right-5 w-4 h-4 text-zinc-200 group-hover:text-emerald-400/50 transition-colors" />

                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-zinc-900 leading-tight">
                        {name}
                      </span>
                      <span className="text-xs text-zinc-400 font-medium">
                        {role}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 mb-3">
                    {[...Array(5)].map((_, idx) => (
                      <svg
                        key={idx}
                        className="w-4 h-4 text-emerald-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-[13px] leading-relaxed text-zinc-600">
                    {text}
                  </p>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="relative w-full bg-[#FAFAFA] py-24 sm:py-32 overflow-hidden">
      <div className="w-full h-[1px] bg-black/10 absolute top-0 z-20" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[640px] mx-auto text-center mb-16"
        >
          <div className="text-sm font-medium tracking-[2.2px] uppercase text-zinc-400 mb-4">
            SOCIAL PROOF
          </div>

          <h2 className="text-[26px] md:text-[32px] lg:text-[48px] font-bold leading-[1.1] tracking-tight text-zinc-900 mb-6">
            Trusted by founders and{" "}
            <motion.span
              initial={{ backgroundPosition: "400% 50%" }}
              animate={{ backgroundPosition: ["400% 50%", "0% 50%"] }}
              transition={{
                duration: 12,
                ease: "linear",
                repeat: Infinity,
              }}
              style={{
                display: "inline-block",
                backgroundImage: `linear-gradient(45deg, rgba(0, 0, 0, 0), ${COLORS.emerald}, ${COLORS.cyan}, rgba(0, 0, 0, 0))`,
                backgroundSize: "400% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              marketing leaders
            </motion.span>
          </h2>

          <p className="text-[16px] md:text-[18px] font-medium leading-relaxed text-zinc-500 tracking-tight">
            See what happens when data-driven strategy meets creative excellence.
            Real results from real partners.
          </p>
        </motion.div>

        <div className="relative flex justify-center gap-5 max-w-5xl mx-auto max-h-[740px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_3%,black_97%,transparent)]">
          <TestimonialsColumn
            testimonials={firstColumn}
            duration={45}
            className="w-full md:w-1/2 lg:w-1/3"
          />

          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block w-1/2 lg:w-1/3"
            duration={55}
          />

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