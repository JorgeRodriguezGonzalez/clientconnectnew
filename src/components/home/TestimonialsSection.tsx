import { useState, useRef, useEffect } from "react";

const COLORS = {
  emerald: "#10b981",
  cyan: "#06b6d4",
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
];

const rotations = [-2, 1, -1, 2];

const gradientKeyframes = `
@keyframes gradientShift {
  0% { background-position: 400% 50%; }
  100% { background-position: 0% 50%; }
}
`;

export default function TestimonialsSection() {
  const railRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = () => {
    const el = railRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 10);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, []);

  const scroll = (dir) => {
    railRef.current?.scrollBy({ left: dir * 540, behavior: "smooth" });
  };

  const fontFamily = "'Satoshi', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  return (
    <div style={{
      background: "#000",
      padding: "48px 0",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily,
    }}>
      <style>{gradientKeyframes}</style>
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>

      <div style={{
        background: "#ffffff",
        borderRadius: 24,
        width: "100%",
        maxWidth: 1280,
        margin: "0 24px",
        padding: 32,
        position: "relative",
        boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
        overflow: "hidden",
      }}>

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          {/* Gradient Title */}
          <h2 style={{
            fontSize: "clamp(44px, 7vw, 88px)",
            fontWeight: 600,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            margin: 0,
            flexShrink: 0,
            fontFamily,
            backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0), ${COLORS.emerald}, ${COLORS.cyan}, rgba(0,0,0,0))`,
            backgroundSize: "400% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradientShift 12s linear infinite",
          }}>
            Testimonials.
          </h2>

          {/* Vertical separator */}
          <div style={{ width: 1, height: 40, background: "#e5e5e5", flexShrink: 0 }} />

          {/* Description */}
          <p style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: "#71717a",
            margin: 0,
            maxWidth: 480,
            letterSpacing: "-0.01em",
            flex: 1,
            minWidth: 200,
            fontFamily,
            fontWeight: 500,
          }}>
            Real stories, real success. Our customers have experienced firsthand the impact of our data-driven digital strategies.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#e5e5e5", margin: "20px 0 0 0" }} />

        {/* Carousel area */}
        <div style={{ position: "relative", marginTop: 32 }}>
          {/* Edge fades */}
          <div style={{
            position: "absolute", inset: "0 auto 0 0", width: 60, zIndex: 10, pointerEvents: "none",
            background: "linear-gradient(to right, #fff, transparent)",
          }} />
          <div style={{
            position: "absolute", inset: "0 0 0 auto", width: 60, zIndex: 10, pointerEvents: "none",
            background: "linear-gradient(to left, #fff, transparent)",
          }} />

          {/* Rail */}
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
            {testimonials.map((t, i) => (
              <article
                key={i}
                style={{
                  minWidth: 420,
                  maxWidth: 560,
                  background: "#fff",
                  border: "1px solid rgba(229,229,229,0.7)",
                  borderRadius: 24,
                  padding: 32,
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
                  fontSize: "clamp(18px, 2.2vw, 22px)",
                  lineHeight: 1.35,
                  color: "#18181b",
                  margin: 0,
                  letterSpacing: "-0.03em",
                  fontWeight: 500,
                  fontFamily,
                }}>
                  "{t.text}"
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 28 }}>
                  <img
                    src={t.image}
                    alt={t.name}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      objectFit: "cover",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                  <div>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#18181b",
                      letterSpacing: "-0.02em",
                      fontFamily,
                    }}>
                      {t.name}
                    </div>
                    <div style={{
                      fontSize: 11,
                      color: "#71717a",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      fontFamily,
                    }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Navigation controls */}
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
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid #e5e5e5",
                background: "#f5f5f5",
                color: "#18181b",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: canPrev ? "pointer" : "default",
                opacity: canPrev ? 1 : 0.4,
                pointerEvents: canPrev ? "auto" : "none",
                transition: "all 0.2s ease",
                fontFamily,
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
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "none",
                background: "#18181b",
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: canNext ? "pointer" : "default",
                opacity: canNext ? 1 : 0.4,
                pointerEvents: canNext ? "auto" : "none",
                transition: "all 0.2s ease",
                fontFamily,
              }}
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}