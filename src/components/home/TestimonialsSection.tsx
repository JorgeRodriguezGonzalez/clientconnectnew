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
    text: "We needed a complete website rebuild for our physio clinic in Bondi. They nailed the design, it loads fast, looks professional and we started getting online bookings within the first week of launch.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Rachel Thompson",
    role: "Business Owner",
  },
  {
    text: "Our Google Ads were burning cash before we found these guys. They restructured our campaigns, cut our cost per lead in half and now we're consistently booked out two weeks in advance.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "James Nguyen",
    role: "Managing Director",
  },
  {
    text: "The SEO work has been a game changer for us. We went from page 4 to the top 3 for 'accountant Sydney CBD' in about five months. The organic leads just keep coming in now.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Sophie Mitchell",
    role: "Business Partner",
  },
  {
    text: "They manage all our socials — Instagram, Facebook, LinkedIn. The content actually looks and sounds like us, not some generic agency template. Our engagement has gone through the roof.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Daniel Park",
    role: "Founder",
  },
  {
    text: "Honestly didn't think paid social would work for a law firm. They proved me wrong. The Meta campaigns they built are generating quality enquiries we never would have reached through Google alone.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Priya Sharma",
    role: "Managing Partner",
  },
  {
    text: "We run a café in Surry Hills and they handle our content creation — photos, reels, stories, the lot. Our followers doubled in three months and we've noticed way more foot traffic from Instagram.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Laura Chen",
    role: "Business Owner",
  },
  {
    text: "Switched to them after a bad experience with another Sydney agency. Night and day difference. They actually explain what they're doing and the monthly reports make sense for once.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Mark O'Brien",
    role: "CEO",
  },
  {
    text: "They redesigned our e-commerce site and set up Google Shopping campaigns at the same time. Our online revenue went up 60% in the first quarter. Really know their stuff.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Anika Patel",
    role: "Founder",
  },
  {
    text: "Great team to work with. They handle our Google Ads, SEO and website updates all under one roof. Having everything in one place makes life so much easier as a small business owner.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Tom Bradley",
    role: "Business Owner",
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
                  className="group relative p-6 rounded-xl border border-white/10 bg-zinc-900 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:-translate-y-1 w-full"
                >
                  <Quote className="absolute top-5 right-5 w-5 h-5 text-zinc-700 group-hover:text-emerald-500/40 transition-colors" />

                  <p className="text-sm leading-relaxed text-zinc-300 mb-5 font-medium">
                    "{text}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={image}
                        alt={name}
                        className="h-9 w-9 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 border border-white/10"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white tracking-tight leading-tight">
                        {name}
                      </span>
                      <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
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