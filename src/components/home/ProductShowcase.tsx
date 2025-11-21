import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// Non-exported helpers and constants
const FEATURE_IMAGES = ["https://framerusercontent.com/images/4mjO0OJA9HtnNRv5wqa7Sct5SI.png?width=2618&height=2618", "https://framerusercontent.com/images/4C2xtl8JRiHhF1SC96bbFToa6X8.png?width=2347&height=2347", "https://framerusercontent.com/images/gIa2LVqt1UUbQ2Gp8vCamuTFM8.png?width=1991&height=2143", "https://framerusercontent.com/images/UC6nHuSzN060lUKnMZgv9p0794.png?width=2347&height=2347", "https://framerusercontent.com/images/TkDQuT7AJX6TcnqHuE2fmHQAs.png?width=2347&height=2347", "https://framerusercontent.com/images/InLO1TNnl0DIc9r9qiQzrfyL2eQ.png?width=2347&height=2347"];

const FadeInImage = ({
  src,
  index
}: {
  src: string;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-20% 0px -20% 0px",
    once: false
  });
  return <motion.div ref={ref} initial={{
    opacity: 0.1,
    scale: 0.95
  }} animate={{
    opacity: isInView ? 1 : 0.1,
    scale: isInView ? 1 : 0.95
  }} transition={{
    duration: 0.6,
    ease: "easeOut"
  }} className="relative w-full max-w-[620px] aspect-[3/4] flex-shrink-0">
      <img src={src} alt={`Feature ${index + 1}`} className="w-full h-full object-contain" loading="lazy" />
    </motion.div>;
};

// @component: ProductShowcase
export const ProductShowcase = () => {
  // @return
  return <div className="w-full bg-black text-white min-h-screen flex flex-col items-center overflow-hidden pb-32">
      
      {/* Problem Statement Section */}
      <section className="w-full max-w-[1240px] px-5 pt-32 pb-20 flex flex-col items-center text-center md:text-left">
        <div className="w-full max-w-[930px] flex flex-col gap-8 md:gap-12">
          <motion.h3 
            initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight tracking-tight text-white"
          >
            Kinso brings together all of your conversations, which uses AI to understand your goals and lets you focus on the most important messages and contacts.
          </motion.h3>
          
          <motion.h4 
            initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-base md:text-lg font-medium leading-relaxed text-neutral-400 max-w-[930px]"
          >
            <span className="text-neutral-200">Whether you're circling back over email,</span>{" "}
            digging for opportunities on LinkedIn, or buried under messages on Slack,{" "}
            <span className="text-neutral-200">business communication happens on too many platforms.</span>
          </motion.h4>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-[1240px] px-5 flex flex-col items-center">
        
        {/* Section Separator */}
        <div className="w-full flex items-center justify-center gap-4 py-12 md:py-24">
          <motion.div 
            initial={{ opacity: 0, filter: "blur(10px)", x: -20 }}
            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="h-[1px] w-24 md:w-48 bg-white" 
          />
          <motion.div 
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="border border-white rounded-full px-4 py-2 bg-black"
          >
            <span className="text-xs tracking-wider text-white font-medium">FEATURES</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, filter: "blur(10px)", x: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="h-[1px] w-24 md:w-48 bg-white" 
          />
        </div>

        {/* Sticky Scroll Layout */}
        <div className="w-full flex flex-col md:flex-row justify-between relative items-start gap-10 md:gap-0">
          
          {/* Sticky Sidebar (Text) */}
          <div className="w-full md:w-[450px] md:sticky md:top-32 flex flex-col justify-center h-fit md:h-[calc(100vh-16rem)] z-10">
            <div className="flex flex-col gap-8">
              <motion.h2 
                initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight"
              >
                <span className="text-white">Start every day knowing </span>
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
                    backgroundImage: "linear-gradient(45deg, rgba(0, 0, 0, 0), rgb(237, 191, 134), rgb(222, 131, 99), rgb(103, 188, 183), rgba(0, 0, 0, 0))",
                    backgroundSize: "400% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent"
                  }}
                >
                  what matters.
                </motion.span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                className="text-base md:text-lg text-neutral-400 leading-relaxed"
              >
                Kinso serves you a morning briefing that summarises crucial messages and action items. Whether it's the urgent client request or time-sensitive approval, you'll see it in order of what needs your attention first.
              </motion.p>
            </div>
          </div>

          {/* Scrollable Content (Images) */}
          <div className="w-full md:w-[620px] flex flex-col gap-24 md:gap-32 pb-32">
            {FEATURE_IMAGES.map((src, index) => <FadeInImage key={index} src={src} index={index} />)}
          </div>

        </div>
      </section>
    </div>;
};

export default ProductShowcase;