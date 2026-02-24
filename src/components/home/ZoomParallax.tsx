'use client';
import React, { useRef, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Lenis from 'lenis';
import { ArrowDown } from 'lucide-react';

// --- FONT STYLES ---
const fontStyles = `
  @import url('https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap');
  
  .font-satoshi { font-family: 'Satoshi', sans-serif; }
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

                {/* Glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-1/2 left-1/2 h-[100vmin] w-[100vmin] -translate-x-1/2 rounded-full blur-[100px] opacity-20"
                    style={{
                        background: 'radial-gradient(circle, rgba(52,211,153,0.25) 0%, rgba(5,5,5,0) 70%)'
                    }}
                />

                <div className="relative z-10 text-center flex flex-col items-center">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-fit px-3 py-1.5 rounded-none border border-white/10 bg-white/5 transition-colors duration-300 mb-6"
                    >
                        <span
                            className="font-satoshi font-semibold uppercase"
                            style={{
                                fontSize: '10px',
                                letterSpacing: '2px',
                                color: '#9ca3af',
                            }}
                        >
                            Portfolio
                        </span>
                    </motion.div>

                    {/* Title */}
                    <h2
                        className="font-satoshi font-bold tracking-tight max-w-4xl text-white"
                        style={{
                            fontSize: 'clamp(32px, 5vw, 48px)',
                            lineHeight: 1.1,
                        }}
                    >
                        <span style={{ color: '#ffffff' }}>Videos & campaigns that</span>{' '}
                        <br className="hidden md:block" />

                        <motion.span
                            initial={{ backgroundPosition: "400% 50%" }}
                            animate={{ backgroundPosition: ["400% 50%", "0% 50%"] }}
                            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                            style={{
                                display: "inline-block",
                                backgroundImage: "linear-gradient(45deg, rgba(255,255,255,0), #34d399, #06b6d4, rgba(255,255,255,0))",
                                backgroundSize: "400% 100%",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                color: "transparent",
                                paddingBottom: "10px"
                            }}
                        >
                            drive real growth.
                        </motion.span>
                    </h2>

                    {/* Description */}
                    <p
                        className="font-satoshi font-medium max-w-sm mt-6"
                        style={{
                            fontSize: '15px',
                            lineHeight: 1.6,
                            color: '#6b7280',
                        }}
                    >
                        A selection of work produced for brands across{' '}
                        <strong style={{ color: '#ffffff', fontWeight: 500 }}>Spain, Germany, Australia, and the US</strong>.
                        {' '}From strategic ad campaigns to{' '}
                        <strong style={{ color: '#ffffff', fontWeight: 500 }}>high-performance creatives</strong>.
                    </p>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-12 flex flex-col items-center gap-2"
                    style={{ color: '#6b7280' }}
                >
                    <span
                        className="font-satoshi uppercase"
                        style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '2px' }}
                    >
                        Explore
                    </span>
                    <ArrowDown className="w-5 h-5 animate-bounce" />
                </motion.div>
            </div>

            {/* PARALLAX COMPONENT */}
            <ParallaxContent videos={videos} />

            {/* FOOTER SPACER */}
            <div className="h-[50vh] flex items-center justify-center bg-[#050505] relative z-10">
                <h2
                    className="font-satoshi font-bold text-center px-4"
                    style={{
                        fontSize: 'clamp(24px, 4vw, 48px)',
                        lineHeight: 1.1,
                        color: 'rgba(255,255,255,0.15)',
                    }}
                >
                    Your brand could be next.
                </h2>
            </div>
        </section>
    );
}