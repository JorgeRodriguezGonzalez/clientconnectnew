import { useState, useRef, useEffect } from "react";

const COLORS = {
  emerald: "#10b981",
  cyan: "#06b6d4",
};

const testimonials = [
  {
    text: "Client Connect Australia has helped my business grow from just me in my van to 6 employees in the space of 9 months. Their expert team helped train myself and develop my structure to handle the influx of work. Highly recommend!!!",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    name: "Adam Stefanel",
    role: "Business Owner",
  },
  {
    text: "Effective digital campaigns brought consistent high-intent enquiries and noticeable business growth. Transparent support and impressive outcomes.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    name: "Marceau Guillot",
    role: "Business Owner",
  },
  {
    text: "Great guys. Understand my business. Good results.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Steve Haddy",
    role: "Local Guide",
  },
  {
    text: "They manage all our socials — Instagram, Facebook, LinkedIn. The content actually looks and sounds like us, not some generic agency template. Our engagement has gone through the roof.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Daniel Park",
    role: "Founder",
  },
];

const rotations = [-2, 1, -1, 2];
const cardSizes = [
  { minW: 420, maxW: 560, pad: 32 },
  { minW: 340, maxW: 440, pad: 26 },
  { minW: 340, maxW: 440, pad: 26 },
  { minW: 420, maxW: 560, pad: 32 },
];

const styles = `
@keyframes gradientShift {
  0% { background-position: 400% 50%; }
  100% { background-position: 0% 50%; }
}
div::-webkit-scrollbar { display: none; }
`;

const ff = "'Satoshi', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const bg = "#050505";
const containerBg = "rgba(255,255,255,0.08)";
const containerBorder = "rgba(255,255,255,0.08)";

function Card({ t, i, isMobile }) {
  const rot = rotations[i % rotations.length];
  const size = cardSizes[i % cardSizes.length];

  return (
    <article
      style={{
        minWidth: isMobile ? "100%" : size.minW,
        maxWidth: isMobile ? "100%" : size.maxW,
        background: "#18181b",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: isMobile ? 20 : 24,
        padding: isMobile ? 24 : size.pad,
        flexShrink: 0,
        transform: `rotate(${rot}deg)`,
        boxShadow: "0 20px 50px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.2)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        cursor: "default",
      }}
      onMouseEnter={e => {
        if (isMobile) return;
        e.currentTarget.style.transform = `rotate(${rot * 0.3}deg) translateY(-4px)`;
        e.currentTarget.style.boxShadow = "0 28px 60px rgba(0,0,0,0.4), 0 0 20px rgba(0,0,0,0.5)";
        e.currentTarget.style.borderColor = "rgba(16,185,129,0.5)";
      }}
      onMouseLeave={e => {
        if (isMobile) return;
        e.currentTarget.style.transform = `rotate(${rot}deg)`;
        e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.2)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
      }}
    >
      <p style={{
        fontSize: isMobile ? 15 : 14,
        lineHeight: 1.7,
        color: "#d4d4d8",
        margin: 0,
        letterSpacing: "-0.01em",
        fontWeight: 500,
        fontFamily: ff,
      }}>
        "{t.text}"
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: isMobile ? 24 : 28 }}>
        <img
          src={t.image}
          alt={t.name}
          style={{
            width: isMobile ? 36 : 40,
            height: isMobile ? 36 : 40,
            borderRadius: isMobile ? 10 : 12,
            objectFit: "cover",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />
        <div>
          <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em", fontFamily: ff }}>
            {t.name}
          </div>
          <div style={{ fontSize: isMobile ? 10 : 11, color: "#71717a", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, fontFamily: ff }}>
            {t.role}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function TestimonialsSection() {
  const railRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const updateButtons = () => {
    const el = railRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 10);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    if (isMobile) return;
    const el = railRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, [isMobile]);

  const scroll = (dir) => {
    railRef.current?.scrollBy({ left: dir * 540, behavior: "smooth" });
  };

  const mobileNav = (dir) => {
    setActiveIndex(prev => {
      const next = prev + dir;
      if (next < 0 || next >= testimonials.length) return prev;
      return next;
    });
  };

  return (
    <div style={{
      background: bg,
      padding: isMobile ? "24px 0" : "48px 0",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: ff,
    }}>
      <style>{styles}</style>

      <div style={{
        background: containerBg,
        border: `1px solid ${containerBorder}`,
        borderRadius: isMobile ? 20 : 24,
        width: "100%",
        maxWidth: 1280,
        margin: isMobile ? "0 12px" : "0 24px",
        padding: isMobile ? 20 : 32,
        position: "relative",
        boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
        overflow: "hidden",
      }}>

        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? 0 : 24,
          flexDirection: isMobile ? "column" : "row",
        }}>
          <h2 style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 700,
            fontSize: isMobile ? 32 : 48,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            margin: 0,
            flexShrink: 0,
            backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0), ${COLORS.emerald}, ${COLORS.cyan}, rgba(0,0,0,0))`,
            backgroundSize: "400% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradientShift 12s linear infinite",
          }}>
            Testimonials.
          </h2>

          {!isMobile && (
            <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
          )}

          <p style={{
            fontSize: isMobile ? 13 : 14,
            lineHeight: 1.6,
            color: "#71717a",
            margin: 0,
            marginTop: isMobile ? 10 : 0,
            maxWidth: 480,
            letterSpacing: "-0.01em",
            flex: 1,
            fontFamily: ff,
            fontWeight: 500,
          }}>
            Real stories, real success. Our customers have experienced firsthand the impact of our data-driven digital strategies.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "20px 0 0 0" }} />

        {/* === MOBILE === */}
        {isMobile ? (
          <div style={{ marginTop: 24, position: "relative" }}>
            <Card t={testimonials[activeIndex]} i={activeIndex} isMobile={true} />

            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
            }}>
              <div style={{ display: "flex", gap: 6 }}>
                {testimonials.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    style={{
                      width: activeIndex === i ? 20 : 6,
                      height: 6,
                      borderRadius: 3,
                      background: activeIndex === i ? COLORS.emerald : "rgba(255,255,255,0.15)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => mobileNav(-1)}
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#a1a1aa",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    cursor: activeIndex > 0 ? "pointer" : "default",
                    opacity: activeIndex > 0 ? 1 : 0.35,
                    transition: "all 0.2s ease",
                  }}
                  aria-label="Previous"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
                  </svg>
                </button>
                <button
                  onClick={() => mobileNav(1)}
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    border: "none", background: "#fff", color: "#050505",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    cursor: activeIndex < testimonials.length - 1 ? "pointer" : "default",
                    opacity: activeIndex < testimonials.length - 1 ? 1 : 0.35,
                    transition: "all 0.2s ease",
                  }}
                  aria-label="Next"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* === DESKTOP === */
          <div style={{ position: "relative", marginTop: 32 }}>
            <div style={{
              position: "absolute", inset: "0 auto 0 0", width: 60, zIndex: 10, pointerEvents: "none",
              background: "linear-gradient(to right, rgba(18,18,20,0.9), transparent)",
            }} />
            <div style={{
              position: "absolute", inset: "0 0 0 auto", width: 60, zIndex: 10, pointerEvents: "none",
              background: "linear-gradient(to left, rgba(18,18,20,0.9), transparent)",
            }} />

            <div
              ref={railRef}
              style={{
                display: "flex",
                gap: 24,
                overflowX: "auto",
                padding: "24px 24px 80px 24px",
                scrollBehavior: "smooth",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                alignItems: "center",
              }}
            >
              {testimonials.map((item, i) => (
                <Card key={i} t={item} i={i} isMobile={false} />
              ))}
            </div>

            {/* Desktop nav */}
            <div style={{
              position: "absolute",
              bottom: 20,
              right: 32,
              zIndex: 20,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}>
              <button
                onClick={() => scroll(-1)}
                style={{
                  width: 40, height: 40, borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#a1a1aa",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  cursor: canPrev ? "pointer" : "default",
                  opacity: canPrev ? 1 : 0.4,
                  pointerEvents: canPrev ? "auto" : "none",
                  transition: "all 0.2s ease",
                }}
                aria-label="Previous"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
                </svg>
              </button>
              <button
                onClick={() => scroll(1)}
                style={{
                  width: 40, height: 40, borderRadius: "50%",
                  border: "none", background: "#fff", color: "#050505",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  cursor: canNext ? "pointer" : "default",
                  opacity: canNext ? 1 : 0.4,
                  pointerEvents: canNext ? "auto" : "none",
                  transition: "all 0.2s ease",
                }}
                aria-label="Next"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}