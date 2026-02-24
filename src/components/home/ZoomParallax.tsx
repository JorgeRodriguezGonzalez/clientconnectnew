'use client';
import React, { useRef, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Lenis from 'lenis';
import { ArrowDown } from 'lucide-react';

// --- FONT STYLES ---
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
  
  .font-syne { font-family: 'Syne', sans-serif; }
  .font-inter { font-family: 'Inter', sans-serif; }
`;

// --- SUB-COMPONENT: PARALLAX VIDEO ---
const ParallaxVideo = ({ src }: { src: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlay = () => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                setTimeout(() => {
                    if (video.paused) video.play().catch(() => null);
                }, 100);
            });
        }
    };

    useEffect(() => { handlePlay(); }, []);

    return (
        <video
            ref={videoRef}
            src={src}
            onCanPlay={handlePlay}
            onLoadedData={handlePlay}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
        />
    );
};

// --- SUB-COMPONENT: PARALLAX LOGIC ---
function ParallaxContent({ videos }: { videos: { src: string }[] }) {
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

    return (
        <div ref={container} className="relative h-[300vh] bg-[#050505]">
            <div className="sticky top-0 h-screen overflow-hidden">
                {videos.map(({ src }, index) => {
                    const scale = scales[index % scales.length];
                    return (
                        <motion.div
                            key={index}
                            style={{ scale }}
                            className={`absolute top-0 flex h-full w-full items-center justify-center 
                                ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} 
                                ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} 
                                ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} 
                                ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} 
                                ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} 
                                ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''} 
                            `}
                        >
                            <div className="relative h-[25vh] w-[25vw] overflow-hidden rounded-[20px] border border-white/10 bg-[#1a1a1a] shadow-2xl">
                                <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none mix-blend-overlay" />
                                <ParallaxVideo src={src} />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

// --- MAIN COMPONENT ---
export default function ZoomParallax() {

    useEffect(() => {
        const lenis = new Lenis();
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }, []);

    const videos = [
        { src: "https://framerusercontent.com/assets/CDUMuSViiwfgUWtLCKDQ2HUa80.mp4" },
        { src: "https://framerusercontent.com/assets/k1qSt6h5RhCO3Zs5SwsO37iqjo.mp4" },
        { src: "https://framerusercontent.com/assets/f2fyZuzpw4LXDReDBa9x0RM74.mp4" },
        { src: "https://framerusercontent.com/assets/tdObAjmo5rYV9y0dSN1y6Fi8E.mp4" },
        { src: "https://framerusercontent.com/assets/G76LWpCqcnDqr4JqhtkD3NlnRtU.mp4" },
        { src: "https://framerusercontent.com/assets/CDUMuSViiwfgUWtLCKDQ2HUa80.mp4" },
        { src: "https://framerusercontent.com/assets/k1qSt6h5RhCO3Zs5SwsO37iqjo.mp4" },
    ];

    return (
        <section className="w-full bg-[#050505] text-white">
            <style>{fontStyles}</style>

            {/* HEADER SECTION */}
            <div className="relative flex h-[70vh] flex-col items-center justify-center gap-8 px-4 overflow-hidden">

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-1/2 left-1/2 h-[100vmin] w-[100vmin] -translate-x-1/2 rounded-full blur-[100px] opacity-20"
                    style={{
                        background: 'radial-gradient(circle, rgba(238,156,33,0.3) 0%, rgba(5,5,5,0) 70%)'
                    }}
                />

                <div className="relative z-10 text-center flex flex-col items-center">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
                        <span className="font-inter text-xs md:text-sm font-medium tracking-wider uppercase text-white/60">
                            Portfolio
                        </span>
                    </div>

                    <h1 className="font-syne font-bold text-[40px] md:text-[60px] lg:text-[72px] leading-[1.1] tracking-tight max-w-4xl text-white">
                        <span className="text-white">Videos & campaigns that</span> <br className="hidden md:block" />

                        <motion.span
                            initial={{ backgroundPosition: "400% 50%" }}
                            animate={{ backgroundPosition: ["400% 50%", "0% 50%"] }}
                            transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                            style={{
                                display: "inline-block",
                                backgroundImage: "linear-gradient(45deg, #AD2624, #C96928, #EE9C21, #ffffff, #EE9C21, #C96928, #AD2624)",
                                backgroundSize: "300% 100%",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                color: "transparent",
                                paddingBottom: "10px"
                            }}
                        >
                            drive real growth.
                        </motion.span>
                    </h1>

                    <p className="font-inter text-white/50 text-lg md:text-xl max-w-xl mt-6">
                        A selection of work produced for brands across Spain, Germany, Australia, and the US. From strategic ad campaigns to high-performance creatives.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-12 flex flex-col items-center gap-2 text-white/40"
                >
                    <span className="font-inter text-xs uppercase tracking-widest">Explore</span>
                    <ArrowDown className="w-5 h-5 animate-bounce" />
                </motion.div>
            </div>

            {/* PARALLAX COMPONENT */}
            <ParallaxContent videos={videos} />

            {/* FOOTER SPACER */}
            <div className="h-[50vh] flex items-center justify-center bg-[#050505] relative z-10">
                <h2 className="font-syne font-bold text-3xl md:text-5xl text-white/20 text-center px-4">
                    Your brand could be next.
                </h2>
            </div>
        </section>
    );
}