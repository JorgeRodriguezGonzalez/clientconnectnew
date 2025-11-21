import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

// Non-exported helpers and constants
const FEATURE_IMAGES = ["https://framerusercontent.com/images/4mjO0OJA9HtnNRv5wqa7Sct5SI.png?width=2618&height=2618", "https://framerusercontent.com/images/4C2xtl8JRiHhF1SC96bbFToa6X8.png?width=2347&height=2347", "https://framerusercontent.com/images/gIa2LVqt1UUbQ2Gp8vCamuTFM8.png?width=1991&height=2143", "https://framerusercontent.com/images/UC6nHuSzN060lUKnMZgv9p0794.png?width=2347&height=2347", "https://framerusercontent.com/images/TkDQuT7AJX6TcnqHuE2fmHQAs.png?width=2347&height=2347", "https://framerusercontent.com/images/InLO1TNnl0DIc9r9qiQzrfyL2eQ.png?width=2347&height=2347"];

const CONTENT_SLIDES = [
  {
    title: "Partner with Australia's top ",
    highlightText: "digital marketing agency.",
    description: "We specialize in SEO, Google Ads, web design, and social media management. Let us transform your online presence and drive real results for your business."
  },
  {
    title: "Start receiving qualified ",
    highlightText: "leads daily.",
    description: "Our targeted campaigns connect you with customers actively searching for your services. Watch your inbox fill with genuine opportunities ready to convert."
  },
  {
    title: "Expand across all ",
    highlightText: "digital channels.",
    description: "From Google to social media, we create cohesive strategies that maximize your visibility. Your brand deserves to be seen everywhere your customers are."
  },
  {
    title: "Get a customized audit with ",
    highlightText: "actionable improvements.",
    description: "We analyze your current digital presence and provide a clear roadmap. Every recommendation comes with our commitment to implement the changes for you."
  },
  {
    title: "Close more deals with ",
    highlightText: "high-intent prospects.",
    description: "Our lead generation strategies target customers ready to buy. We optimize every touchpoint to turn interest into revenue for your business."
  },
  {
    title: "Track your success with ",
    highlightText: "transparent reporting.",
    description: "Receive detailed monthly reports showing exactly how your investment translates to growth. Real metrics, real KPIs, real accountability."
  }
];

const FadeInText = ({ 
  children, 
  delay = 0, 
  className = "",
  direction = "up"
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const directionOffset = {
    up: { y: 10, x: 0 },
    left: { y: 0, x: -20 },
    right: { y: 0, x: 20 }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        filter: "blur(10px)",
        ...directionOffset[direction]
      }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        filter: isInView ? "blur(0px)" : "blur(10px)",
        y: isInView ? 0 : directionOffset[direction].y,
        x: isInView ? 0 : directionOffset[direction].x
      }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut", 
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// @component: ProductShowcase
export const ProductShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const stickyPanelRef = useRef(null);

  // --- Scroll Handler ---
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollableHeight = container.scrollHeight - window.innerHeight;
      const stepHeight = scrollableHeight / CONTENT_SLIDES.length;
      const newActiveIndex = Math.min(
        CONTENT_SLIDES.length - 1,
        Math.floor(container.scrollTop / stepHeight)
      );
      setActiveIndex(newActiveIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // @return
  return <div className="w-full bg-black text-white min-h-screen flex flex-col items-center overflow-hidden pb-32">
      
      {/* Problem Statement Section */}
      <section className="w-full max-w-[1240px] px-5 pt-32 pb-20 flex flex-col items-center text-center md:text-left">
        <div className="w-full max-w-[930px] flex flex-col gap-8 md:gap-12">
          <FadeInText delay={0.2}>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight tracking-tight text-white">
              Kinso brings together all of your conversations, which uses AI to understand your goals and lets you focus on the most important messages and contacts.
            </h3>
          </FadeInText>
          
          <FadeInText delay={0.3}>
            <h4 className="text-base md:text-lg font-medium leading-relaxed text-neutral-400 max-w-[930px]">
              <span className="text-neutral-200">Whether you're circling back over email,</span>{" "}
              digging for opportunities on LinkedIn, or buried under messages on Slack,{" "}
              <span className="text-neutral-200">business communication happens on too many platforms.</span>
            </h4>
          </FadeInText>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-[1240px] px-5 flex flex-col items-center">
        
        {/* Section Separator */}
        <div className="w-full flex items-center justify-center gap-4 py-12 md:py-24">
          <FadeInText delay={0.4} direction="left">
            <div className="h-[1px] w-24 md:w-48 bg-white" />
          </FadeInText>
          
          <FadeInText delay={0.5}>
            <div className="border border-white rounded-full px-4 py-2 bg-black">
              <span className="text-xs tracking-wider text-white font-medium">FEATURES</span>
            </div>
          </FadeInText>
          
          <FadeInText delay={0.4} direction="right">
            <div className="h-[1px] w-24 md:w-48 bg-white" />
          </FadeInText>
        </div>

        {/* Scrolling Feature Showcase */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `
        }} />
        <div 
          ref={scrollContainerRef}
          className="hide-scrollbar h-screen w-full overflow-y-auto"
        >
          <div style={{ height: `${CONTENT_SLIDES.length * 100}vh` }}>
            <div ref={stickyPanelRef} className="sticky top-0 h-screen w-full flex flex-col items-center justify-center bg-transparent text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full max-w-7xl mx-auto">
                
                {/* Left Column: Text Content & Pagination */}
                <div className="relative flex flex-col justify-center p-8 md:p-16">
                  {/* Pagination Bars */}
                  <div className="absolute top-16 left-16 flex space-x-2">
                    {CONTENT_SLIDES.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                            const container = scrollContainerRef.current;
                            if(container){
                                const scrollableHeight = container.scrollHeight - window.innerHeight;
                                const stepHeight = scrollableHeight / CONTENT_SLIDES.length;
                                container.scrollTo({ top: stepHeight * index, behavior: 'smooth' });
                            }
                        }}
                        className={`h-1 rounded-full transition-all duration-500 ease-in-out ${
                          index === activeIndex ? 'w-12 bg-white' : 'w-6 bg-white/30'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <div className="relative h-64 w-full">
                    {CONTENT_SLIDES.map((slide, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                          index === activeIndex
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                        }`}
                      >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight">
                          <span className="text-white">{slide.title}</span>
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
                            {slide.highlightText}
                          </motion.span>
                        </h2>
                        <p className="mt-6 text-base md:text-lg text-neutral-400 leading-relaxed max-w-md">{slide.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Image Content */}
                <div className="hidden md:flex items-center justify-center p-8">
                  <div className="relative w-[80%] h-[80vh] rounded-2xl overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out"
                      style={{ transform: `translateY(-${activeIndex * 100}%)` }}
                    >
                      {CONTENT_SLIDES.map((slide, index) => (
                        <div key={index} className="w-full h-full">
                          <img
                            src={FEATURE_IMAGES[index]}
                            alt={slide.title}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>;
};

export default ProductShowcase;