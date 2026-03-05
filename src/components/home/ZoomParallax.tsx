'use client';
import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Lenis from 'lenis';
import { ArrowDown } from 'lucide-react';

// --- FONT STYLES ---
const fontStyles = `
  @import url('https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap');
  
  .font-satoshi { font-family: 'Satoshi', sans-serif; }
`;

// --- HOOK: useIsMobile ---
function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < breakpoint);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, [breakpoint]);
    return isMobile;
}

// --- SUB-COMPONENT: PARALLAX VIDEO ---
const ParallaxVideo = ({ src, objectPosition = 'center' }: { src: string, objectPosition?: string }) => {
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
            style={{ objectPosition }}
        />
    );
};

// --- SUB-COMPONENT: PARALLAX LOGIC ---
function ParallaxContent({ videos, isMobile }: { videos: { src: string }[], isMobile: boolean }) {
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

    // Inverse scale to keep CTA text fixed size
    const inverseScale = useTransform(scale4, v => 1 / v);
    // On mobile: text starts small and grows as card expands
    const mobileCtaScale = useTransform(scrollYProgress, [0.4, 0.85], [0.5, 1.2]);
    const overlayOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
    const contentOpacity = useTransform(scrollYProgress, [0.4, 0.65], [0, 1]);
    const contentY = useTransform(scrollYProgress, [0.4, 0.65], [20, 0]);

    // Mobile overrides per card index (only applied on mobile)
    const mobileOverrides: Record<number, React.CSSProperties> = {
        2: { top: '-3vh', left: '-30vw', height: '30vh', width: '25vw' },
    };

    return (
        <div ref={container} className="relative h-[300vh] bg-[#050505]">
            <div className="sticky top-0 h-screen overflow-hidden">
                {videos.map(({ src }, index) => {
                    const scale = scales[index % scales.length];
                    const hasMobileOverride = isMobile && mobileOverrides[index];

                    return (
                        <motion.div
                            key={index}
                            style={{ scale }}
                            className={`absolute top-0 flex h-full w-full items-center justify-center 
                                ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} 
                                ${index === 2 && !isMobile ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} 
                                ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} 
                                ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} 
                                ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} 
                                ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''} 
                            `}
                        >
                            <div
                                className="relative h-[25vh] w-[25vw] overflow-hidden rounded-[20px] border border-white/10 bg-[#1a1a1a] shadow-2xl"
                                style={hasMobileOverride ? mobileOverrides[index] : undefined}
                            >
                                <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none mix-blend-overlay" />
                                <ParallaxVideo src={src} objectPosition={index === 5 || index === 1 || index === 2 ? 'center top' : 'center'} />

                                {/* Overlay + CTA only on center card (index 0) */}
                                {index === 0 && (
                                    <>
                                        <motion.div
                                            style={{ opacity: overlayOpacity }}
                                            className="absolute inset-0 z-20 bg-black/75 backdrop-blur-[2px]"
                                        />
                                        <motion.div
                                            style={{ opacity: contentOpacity, scale: isMobile ? mobileCtaScale : inverseScale }}
                                            className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 px-6 text-center"
                                        >
                                            <h3
                                                    className="font-satoshi font-bold text-white"
                                                    style={{
                                                        fontSize: isMobile ? '28px' : '56px',
                                                        lineHeight: 1.1,
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    Your{' '}
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
                                                        }}
                                                    >
                                                        brand
                                                    </motion.span>{' '}
                                                    could be next.
                                                </h3>
                                            <div className="flex gap-3 mt-2">
                                                <motion.a
                                                    href="#contact"
                                                    whileHover={{
                                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                                        boxShadow: '0 0 20px rgba(255,255,255,0.3)',
                                                        borderColor: 'rgba(255,255,255,1)',
                                                    }}
                                                    className="font-satoshi font-semibold whitespace-nowrap flex items-center"
                                                    style={{
                                                        fontSize: '15px',
                                                        height: '48px',
                                                        padding: '12px 24px',
                                                        borderRadius: '50px',
                                                        background: 'rgba(255,255,255,0.1)',
                                                        backdropFilter: 'blur(8px)',
                                                        border: '1px solid rgba(255,255,255,0.2)',
                                                        color: '#ffffff',
                                                        transition: 'all 0.3s ease',
                                                    }}
                                                >
                                                    Let's chat
                                                </motion.a>
                                                <motion.a
                                                    href="#book"
                                                    whileHover={{
                                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                                        boxShadow: '0 0 20px rgba(52,211,153,0.5)',
                                                        borderColor: '#34d399',
                                                        color: '#34d399',
                                                    }}
                                                    className="font-satoshi font-semibold whitespace-nowrap flex items-center gap-2"
                                                    style={{
                                                        fontSize: '15px',
                                                        height: '48px',
                                                        padding: '12px 24px',
                                                        borderRadius: '50px',
                                                        background: 'rgba(255,255,255,0.1)',
                                                        backdropFilter: 'blur(8px)',
                                                        border: '1px solid #06b6d4',
                                                        color: '#06b6d4',
                                                        transition: 'all 0.3s ease',
                                                    }}
                                                >
                                                    Book a Call
                                                </motion.a>
                                            </div>
                                            <motion.div
                                                className="flex flex-col items-center gap-1 mt-4 text-white/40 cursor-pointer"
                                                animate={{ y: [0, 6, 0] }}
                                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                            >
                                                <span className="font-satoshi text-[11px] uppercase tracking-[2px]">See our testimonials</span>
                                                <ArrowDown className="w-4 h-4" />
                                            </motion.div>
                                        </motion.div>
                                    </>
                                )}
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
    const isMobile = useIsMobile();

    useEffect(() => {
        const lenis = new Lenis();
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }, []);

    const videos = [
        { src: "https://res.cloudinary.com/dsdnvhpmr/video/upload/v1772058232/prolexbathrooms_f8cpx0.mov" },
        { src: "https://res.cloudinary.com/dsdnvhpmr/video/upload/v1771978172/landscaping_lierf1.mov" },
        { src: "https://res.cloudinary.com/dsdnvhpmr/video/upload/v1771987258/0225_spcg8h.mov" },
        { src: "https://res.cloudinary.com/dsdnvhpmr/video/upload/v1771978168/nanotise_s5oatf.mov" },
        { src: "https://res.cloudinary.com/dsdnvhpmr/video/upload/v1771978181/driveways_sdxoqa.mov" },
        { src: "https://res.cloudinary.com/dsdnvhpmr/video/upload/v1771992243/assetplumbing_a73cav.mov" },
        { src: "https://res.cloudinary.com/dsdnvhpmr/video/upload/v1771989643/0225_1_jymeqw.mov" },
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
                        className="w-fit px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 mb-6"
                    >
                        <span className="text-[10px] font-sans font-semibold uppercase tracking-[2px] text-gray-400">
                            Our Work
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
                        <span style={{ color: '#ffffff' }}>Websites built to</span>{' '}
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
                            convert & grow.
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
                        A selection of websites we've built for{' '}
                        <strong style={{ color: '#ffffff', fontWeight: 500 }}>Australian businesses</strong>.
                        {' '}From local service brands to{' '}
                        <strong style={{ color: '#ffffff', fontWeight: 500 }}>high-converting landing pages</strong>.
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
            <ParallaxContent videos={videos} isMobile={isMobile} />

            {/* FOOTER SPACER */}
            <div className="h-[25vh] bg-[#050505] relative z-10" />
        </section>
    );
}