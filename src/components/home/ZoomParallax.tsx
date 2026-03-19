'use client';
import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Lenis from 'lenis';
import { ArrowDown } from 'lucide-react';
import { useIsTablet } from "@/hooks/useIsTablet";
import { COLORS, BACKGROUNDS } from "@/lib/design-tokens";

// --- FONT STYLES ---
const fontStyles = `
  @import url('https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap');
  
  .font-satoshi { font-family: 'Satoshi', sans-serif; }

  @keyframes scrollUp {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }
  @keyframes scrollDown {
    0% { transform: translateY(-50%); }
    100% { transform: translateY(0); }
  }
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
    const isTablet = useIsTablet();

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

    useEffect(() => {
        if (!isTablet) return;
        const video = videoRef.current;
        if (!video || typeof IntersectionObserver === "undefined") return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        video.play().catch(() => null);
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(video);
        return () => {
            observer.disconnect();
        };
    }, [isTablet]);

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

// --- MOBILE CAROUSEL IMAGES (no videos for performance) ---
const mobileCol1Images = [
    { src: "/images/zoomparallax1.png", href: "https://brisbaneroofpaintingsolutions.com.au/" },
    { src: "/images/zoomparallax2.png", href: "https://lcdriveways.com.au/" },
    { src: "/images/zoomparallax3.png", href: "https://nanotise.com.au/" },
];

const mobileCol2Images = [
    { src: "/images/zoomparallax4.png", href: "https://prolexbathroomrenovations.com.au/" },
    { src: "/images/zoomparallax5.png", href: "https://yourlocalroofers.com.au/" },
    { src: "/images/zoomparallax6.png", href: "https://lclandscaping.com.au/" },
];

// --- SUB-COMPONENT: MOBILE CAROUSEL (two columns, images only) ---
function MobileCarousel() {
    return (
        <div className="relative h-[700px] overflow-hidden px-6">
            <div className="flex gap-3 h-full">
                {/* Column 1 - Scroll Up */}
                <div className="flex-1 overflow-hidden">
                    <div style={{ animation: 'scrollUp 35s linear infinite' }}>
                        <div className="flex flex-col gap-3">
                            {[...mobileCol1Images, ...mobileCol1Images].map((item, index) => (
                                <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className="aspect-[4/5] overflow-hidden rounded-[16px] border border-white/10 bg-[#1a1a1a] block">
                                    <img src={item.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Column 2 - Scroll Down */}
                <div className="flex-1 overflow-hidden">
                    <div style={{ animation: 'scrollDown 38s linear infinite' }}>
                        <div className="flex flex-col gap-3">
                            {[...mobileCol2Images, ...mobileCol2Images].map((item, index) => (
                                <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className="aspect-[4/5] overflow-hidden rounded-[16px] border border-white/10 bg-[#1a1a1a] block">
                                    <img src={item.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Gradient overlays */}
            <div className="absolute top-0 left-0 right-0 h-[80px] bg-gradient-to-b from-[#050505] via-[#050505]/40 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none z-10" />
        </div>
    );
}

// --- SUB-COMPONENT: PARALLAX LOGIC (desktop only) ---
function ParallaxContent({ videos, isMobile }: { videos: { src: string }[], isMobile: boolean }) {
    const container = useRef<HTMLDivElement>(null);
    const isTablet = useIsTablet();
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

    const inverseScale = useTransform(scale4, v => 1 / v);
    const overlayOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
    const contentOpacity = useTransform(scrollYProgress, [0.4, 0.65], [0, 1]);
    const contentY = useTransform(scrollYProgress, [0.4, 0.65], [20, 0]);

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

                                {index === 0 && (
                                    <>
                                        <motion.div
                                            style={{ opacity: overlayOpacity }}
                                            className={isTablet ? "absolute inset-0 z-20 bg-black/75" : "absolute inset-0 z-20 bg-black/75 backdrop-blur-[2px]"}
                                        />
                                        <motion.div
                                            style={{ opacity: contentOpacity, scale: inverseScale }}
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
                                                        backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0), ${COLORS.emerald}, ${COLORS.cyan}, rgba(255,255,255,0))`,
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
                                                    whileHover={
                                                        isTablet
                                                            ? { scale: 1.02, borderColor: 'rgba(255,255,255,1)' }
                                                            : {
                                                                backgroundColor: 'rgba(255,255,255,0.2)',
                                                                boxShadow: '0 0 20px rgba(255,255,255,0.3)',
                                                                borderColor: 'rgba(255,255,255,1)',
                                                              }
                                                    }
                                                    className="font-satoshi font-semibold whitespace-nowrap flex items-center"
                                                    style={{
                                                        fontSize: '15px',
                                                        height: '48px',
                                                        padding: '12px 24px',
                                                        borderRadius: '50px',
                                                        background: isTablet ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.1)',
                                                        ...(isTablet ? {} : { backdropFilter: 'blur(8px)' as any }),
                                                        border: '1px solid rgba(255,255,255,0.2)',
                                                        color: '#ffffff',
                                                        transition: 'all 0.3s ease',
                                                    }}
                                                >
                                                    Let's chat
                                                </motion.a>
                                                <motion.a
                                                    href="#book"
                                                    whileHover={
                                                        isTablet
                                                            ? { scale: 1.02, borderColor: `${COLORS.emerald}` }
                                                            : {
                                                                backgroundColor: 'rgba(255,255,255,0.2)',
                                                                boxShadow: `0 0 20px ${COLORS.emerald}80`,
                                                                borderColor: `${COLORS.emerald}`,
                                                                color: `${COLORS.emerald}`,
                                                              }
                                                    }
                                                    className="font-satoshi font-semibold whitespace-nowrap flex items-center gap-2"
                                                    style={{
                                                        fontSize: '15px',
                                                        height: '48px',
                                                        padding: '12px 24px',
                                                        borderRadius: '50px',
                                                        background: isTablet ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.1)',
                                                        ...(isTablet ? {} : { backdropFilter: 'blur(8px)' as any }),
                                                        border: `1px solid ${COLORS.cyan}`,
                                                        color: `${COLORS.cyan}`,
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
        if (typeof window !== "undefined") {
            const width = window.innerWidth;
            if (width >= 768 && width <= 1024) {
                return;
            }
        }

        const lenis = new Lenis();
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            // @ts-ignore
            lenis.destroy?.();
        };
    }, []);

    const ylrDesktop = "https://res.cloudinary.com/dsdnvhpmr/video/upload/v1771987258/0225_spcg8h.mov";
    const ylrMobile = "https://res.cloudinary.com/dsdnvhpmr/video/upload/v1773808379/YLRmobile_wh2rmc.mov";
    const landscapingDesktop = "https://res.cloudinary.com/dsdnvhpmr/video/upload/v1771978172/landscaping_lierf1.mov";
    const landscapingMobile = "https://res.cloudinary.com/dsdnvhpmr/video/upload/v1773808760/landscapingmobile_rokp6c.mov";

    const videos = [
        { src: "https://res.cloudinary.com/dsdnvhpmr/video/upload/v1772058232/prolexbathrooms_f8cpx0.mov" },
        { src: isMobile ? landscapingMobile : landscapingDesktop },
        { src: isMobile ? ylrMobile : ylrDesktop },
        { src: "https://res.cloudinary.com/dsdnvhpmr/video/upload/v1771978168/nanotise_s5oatf.mov" },
        { src: "https://res.cloudinary.com/dsdnvhpmr/video/upload/v1771978181/driveways_sdxoqa.mov" },
        { src: "https://res.cloudinary.com/dsdnvhpmr/video/upload/v1771992243/assetplumbing_a73cav.mov" },
        { src: "https://res.cloudinary.com/dsdnvhpmr/video/upload/v1771989643/0225_1_jymeqw.mov" },
    ];

    return (
        <section className="w-full bg-[#050505] text-white">
            <style>{fontStyles}</style>

            {/* HEADER SECTION */}
            <div className="relative flex h-[45vh] md:h-[70vh] flex-col items-center justify-center gap-8 px-4 overflow-hidden">

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
                        <span className="text-[10px] font-sans font-semibold uppercase tracking-[2px] text-zinc-400">
                            Our Work
                        </span>
                    </motion.div>

                    {/* Title - single line on desktop */}
                    <h2 className="section-title text-white max-w-4xl md:whitespace-nowrap">
                        <span style={{ color: '#ffffff' }}>Websites built to</span>{' '}
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

                    {/* Description - single line on desktop */}
                    <p className="section-text-dark max-w-sm md:max-w-3xl mt-6 md:whitespace-nowrap">
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
                    className="absolute bottom-12 flex flex-col items-center gap-2 text-zinc-500"
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

            {/* MOBILE: Two-column carousel / DESKTOP: Parallax zoom */}
            {isMobile ? (
                <MobileCarousel />
            ) : (
                <ParallaxContent videos={videos} isMobile={isMobile} />
            )}

            {/* FOOTER SPACER - Reduced for mobile only */}
            <div className={`${isMobile ? 'h-[10vh]' : 'h-[25vh]'} bg-[#050505] relative z-10`} />
        </section>
    );
}