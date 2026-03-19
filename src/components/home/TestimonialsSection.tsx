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

  const ff = "'Satoshi', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  const t = isMobile ? testimonials[activeIndex] : null;

  return (
    <div style={{
      background: "#000",
      padding: isMobile ? "24px 0" : "48px 0",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: ff,
    }}>
      <style>{styles}</style>

      <div style={{
        background: "#ffffff",
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
            fontSize: isMobile ? 40 : "clamp(44px, 8vw, 96px)",
            fontWeight: 600,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            margin: 0,
            flexShrink: 0,
            fontFamily: ff,
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
            <div style={{ width: 1, height: 40, background: "#e5e5e5", flexShrink: 0 }} />
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
        <div style={{ height: 1, background: "#e5e5e5", margin: "20px 0 0 0" }} />

        {/* === MOBILE === */}
        {isMobile ? (
          <div style={{ marginTop: 24, position: "relative" }}>
            {/* Single card */}
            <div
              key={activeIndex}
              style={{
                background: "#fff",
                border: "1px solid rgba(229,229,229,0.7)",
                borderRadius: 20,
                padding: 24,
                transform: `rotate(${rotations[activeIndex]}deg)`,
                boxShadow: "0 20px 50px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)",
                transition: "transform 0.4s ease, opacity 0.4s ease",
              }}
            >
              <p style={{
                fontSize: 17,
                lineHeight: 1.4,
                color: "#18181b",
                margin: 0,
                letterSpacing: "-0.02em",
                fontWeight: 500,
                fontFamily: ff,
              }}>
                "{t.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24 }}>
                <img
                  src={t.image}
                  alt={t.name}
                  style={{ width: 36, height: 36, borderRadius: 10, objectFit: "cover" }}
                />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#18181b", letterSpacing: "-0.02em", fontFamily: ff }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: 10, color: "#71717a", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, fontFamily: ff }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile nav */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
            }}>
              {/* Dots */}
              <div style={{ display: "flex", gap: 6 }}>
                {testimonials.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    style={{
                      width: activeIndex === i ? 20 : 6,
                      height: 6,
                      borderRadius: 3,
                      background: activeIndex === i ? COLORS.emerald : "#e5e5e5",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => mobileNav(-1)}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "1px solid #e5e5e5",
                    background: "#f5f5f5",
                    color: "#18181b",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
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
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "none",
                    background: "#18181b",
                    color: "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
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
              background: "linear-gradient(to right, #fff, transparent)",
            }} />
            <div style={{
              position: "absolute", inset: "0 0 0 auto", width: 60, zIndex: 10, pointerEvents: "none",
              background: "linear-gradient(to left, #fff, transparent)",
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
                <article
                  key={i}
                  style={{
                    minWidth: cardSizes[i].minW,
                    maxWidth: cardSizes[i].maxW,
                    background: "#fff",
                    border: "1px solid rgba(229,229,229,0.7)",
                    borderRadius: 24,
                    padding: cardSizes[i].pad,
                    flexShrink: 0,
                    transform: `rotate(${rotations[i]}deg)`,
                    boxShadow: "0 20px 50px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = `rotate(${rotations[i] * 0.3}deg) translateY(-4px)`;
                    e.currentTarget.style.boxShadow = "0 28px 60px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.06)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = `rotate(${rotations[i]}deg)`;
                    e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)";
                  }}
                >
                  <p style={{
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: "#18181b",
                    margin: 0,
                    letterSpacing: "-0.01em",
                    fontWeight: 500,
                    fontFamily: ff,
                  }}>
                    "{item.text}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 28 }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: 40, height: 40, borderRadius: 12, objectFit: "cover", border: "1px solid rgba(255,255,255,0.1)" }}
                    />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#18181b", letterSpacing: "-0.02em", fontFamily: ff }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: 11, color: "#71717a", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, fontFamily: ff }}>
                        {item.role}
                      </div>
                    </div>
                  </div>
                </article>
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
                  border: "1px solid #e5e5e5", background: "#f5f5f5", color: "#18181b",
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
                  border: "none", background: "#18181b", color: "#fff",
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