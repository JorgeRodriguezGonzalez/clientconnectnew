// components/ServicePageTemplate.tsx
"use client";

import { useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import {
  Palette, Layers, Zap, Smartphone, Search, BarChart3,
  Settings, FileText, Link, MapPin, Monitor, ShoppingBag,
  RefreshCw, TrendingUp, Video, Briefcase, Users, Image,
  PieChart, Calendar, Clock, MessageCircle, Star,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  Palette, Layers, Zap, Smartphone, Search, BarChart3,
  Settings, FileText, Link, MapPin, Monitor, ShoppingBag,
  RefreshCw, TrendingUp, Video, Briefcase, Users, Image,
  PieChart, Calendar, Clock, MessageCircle, Star,
};
import type { ServicePageData, ServiceFAQ } from "@/types/service";

// ─── Helpers ────────────────────────────────────────────────

const Badge = ({ label }: { label: string }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "5px 14px",
      borderRadius: "999px",
      fontSize: "11px",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.12)",
      color: "rgba(255,255,255,0.85)",
      fontFamily: "'Satoshi', sans-serif",
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </span>
);

/** Resuelve un ícono de lucide-react por nombre string */
const DynamicIcon = ({ name, ...props }: { name?: string } & React.SVGProps<SVGSVGElement>) => {
  if (!name) return null;
  const Icon = iconMap[name];
  return Icon ? <Icon {...props} /> : null;
};

// ─── Secciones ──────────────────────────────────────────────

/* ── Hero ── */
const HeroSection = ({ hero }: { hero: ServicePageData["hero"] }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#080808",
      }}
    >
      {/* Media de fondo */}
      {hero.mediaSrc && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.85) 100%)",
            }}
          />
          {hero.mediaType === "video" ? (
            <video
              ref={videoRef}
              src={hero.mediaSrc}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <img
              src={hero.mediaSrc}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </div>
      )}

      {/* Contenido */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: "800px",
          padding: "0 24px",
        }}
      >
        <h1
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(36px, 6vw, 64px)",
            lineHeight: 1.1,
            color: "#fff",
            marginBottom: "20px",
            whiteSpace: "pre-line",
          }}
        >
          {hero.headline}
        </h1>
        <p
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "18px",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.7)",
            maxWidth: "560px",
            margin: "0 auto 32px",
          }}
        >
          {hero.subheadline}
        </p>

        {/* Badges */}
        {hero.badges && hero.badges.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "36px",
            }}
          >
            {hero.badges.map((b, i) => (
              <Badge key={i} label={b} />
            ))}
          </div>
        )}

        {/* CTA */}
        <a
          href={hero.ctaLink}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px 32px",
            borderRadius: "999px",
            background: "#06b6d4",
            color: "#fff",
            fontSize: "15px",
            fontWeight: 700,
            fontFamily: "'Satoshi', sans-serif",
            textDecoration: "none",
            boxShadow: "0 4px 20px rgba(6,182,212,0.4)",
            transition: "transform 0.3s ease",
          }}
        >
          {hero.ctaLabel}
          <ArrowRight style={{ width: 16, height: 16 }} />
        </a>
      </div>
    </section>
  );
};

/* ── Overview / Stats ── */
const OverviewSection = ({ overview }: { overview: ServicePageData["overview"] }) => (
  <section
    style={{
      padding: "100px 24px",
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: overview.imageSrc ? "1fr 1fr" : "1fr",
      gap: "60px",
      alignItems: "center",
    }}
  >
    <div>
      <h2
        style={{
          fontFamily: "'Satoshi', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(28px, 4vw, 42px)",
          lineHeight: 1.15,
          color: "#111827",
          marginBottom: "20px",
        }}
      >
        {overview.heading}
      </h2>
      <p
        style={{
          fontFamily: "'Satoshi', sans-serif",
          fontSize: "16px",
          lineHeight: 1.7,
          color: "#6b7280",
        }}
      >
        {overview.body}
      </p>

      {/* Stats */}
      {overview.stats && (
        <div style={{ display: "flex", gap: "40px", marginTop: "40px" }}>
          {overview.stats.map((s, i) => (
            <div key={i}>
              <div
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 700,
                  fontSize: "36px",
                  color: "#06b6d4",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: "13px",
                  color: "#9ca3af",
                  marginTop: "4px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    {overview.imageSrc && (
      <div style={{ borderRadius: "20px", overflow: "hidden" }}>
        <img
          src={overview.imageSrc}
          alt={overview.heading}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    )}
  </section>
);

/* ── Features Grid ── */
const FeaturesSection = ({ features }: { features: ServicePageData["features"] }) => (
  <section style={{ padding: "80px 24px", background: "#f9fafb" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <h2
        style={{
          fontFamily: "'Satoshi', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(28px, 4vw, 40px)",
          color: "#111827",
          textAlign: "center",
          marginBottom: "56px",
        }}
      >
        What's Included
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
        }}
      >
        {features.map((f, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "32px",
              border: "1px solid #e5e7eb",
              transition: "box-shadow 0.3s ease",
            }}
          >
            {f.icon && (
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "rgba(6,182,212,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  color: "#06b6d4",
                }}
              >
                <DynamicIcon name={f.icon} width={24} height={24} />
              </div>
            )}
            <h3
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 700,
                fontSize: "18px",
                color: "#111827",
                marginBottom: "8px",
              }}
            >
              {f.title}
            </h3>
            <p
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "14px",
                lineHeight: 1.6,
                color: "#6b7280",
                margin: 0,
              }}
            >
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Process / Steps ── */
const ProcessSection = ({ process }: { process: NonNullable<ServicePageData["process"]> }) => (
  <section style={{ padding: "100px 24px", maxWidth: "900px", margin: "0 auto" }}>
    <h2
      style={{
        fontFamily: "'Satoshi', sans-serif",
        fontWeight: 700,
        fontSize: "clamp(28px, 4vw, 40px)",
        color: "#111827",
        textAlign: "center",
        marginBottom: "56px",
      }}
    >
      {process.heading}
    </h2>

    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
      {process.steps.map((step, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: "24px",
            paddingBottom: i < process.steps.length - 1 ? "40px" : 0,
          }}
        >
          {/* Línea + número */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: "48px",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "#06b6d4",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "16px",
                flexShrink: 0,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            {i < process.steps.length - 1 && (
              <div
                style={{
                  flex: 1,
                  width: "2px",
                  background: "linear-gradient(to bottom, #06b6d4, transparent)",
                  marginTop: "8px",
                }}
              />
            )}
          </div>

          {/* Texto */}
          <div style={{ paddingTop: "10px" }}>
            <h3
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                color: "#111827",
                marginBottom: "6px",
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "14px",
                lineHeight: 1.6,
                color: "#6b7280",
                margin: 0,
              }}
            >
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ── FAQ Accordion ── */
const FAQItem = ({ item }: { item: ServiceFAQ }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid #e5e7eb",
        padding: "20px 0",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          all: "unset",
          cursor: "pointer",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "'Satoshi', sans-serif",
          fontWeight: 600,
          fontSize: "16px",
          color: "#111827",
        }}
      >
        {item.question}
        <ChevronDown
          style={{
            width: 20,
            height: 20,
            color: "#9ca3af",
            transition: "transform 0.3s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      <div
        style={{
          maxHeight: open ? "300px" : "0",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        <p
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "14px",
            lineHeight: 1.7,
            color: "#6b7280",
            marginTop: "12px",
          }}
        >
          {item.answer}
        </p>
      </div>
    </div>
  );
};

const FAQSection = ({ faq }: { faq: ServiceFAQ[] }) => (
  <section style={{ padding: "80px 24px", background: "#f9fafb" }}>
    <div style={{ maxWidth: "720px", margin: "0 auto" }}>
      <h2
        style={{
          fontFamily: "'Satoshi', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(28px, 4vw, 40px)",
          color: "#111827",
          textAlign: "center",
          marginBottom: "48px",
        }}
      >
        Frequently Asked Questions
      </h2>
      {faq.map((item, i) => (
        <FAQItem key={i} item={item} />
      ))}
    </div>
  </section>
);

/* ── CTA Final ── */
const CTASection = ({ cta }: { cta: ServicePageData["cta"] }) => (
  <section
    style={{
      padding: "100px 24px",
      background: "linear-gradient(135deg, #080808 0%, #0f172a 100%)",
      textAlign: "center",
    }}
  >
    <h2
      style={{
        fontFamily: "'Satoshi', sans-serif",
        fontWeight: 700,
        fontSize: "clamp(28px, 4vw, 44px)",
        color: "#fff",
        marginBottom: "14px",
      }}
    >
      {cta.heading}
    </h2>
    {cta.subheading && (
      <p
        style={{
          fontFamily: "'Satoshi', sans-serif",
          fontSize: "16px",
          color: "rgba(255,255,255,0.6)",
          marginBottom: "36px",
          maxWidth: "500px",
          margin: "0 auto 36px",
        }}
      >
        {cta.subheading}
      </p>
    )}
    <a
      href={cta.buttonLink}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "16px 36px",
        borderRadius: "999px",
        background: "#06b6d4",
        color: "#fff",
        fontSize: "15px",
        fontWeight: 700,
        fontFamily: "'Satoshi', sans-serif",
        textDecoration: "none",
        boxShadow: "0 4px 24px rgba(6,182,212,0.4)",
      }}
    >
      {cta.buttonLabel}
      <ArrowRight style={{ width: 16, height: 16 }} />
    </a>
  </section>
);

// ─── Template Principal ─────────────────────────────────────

interface ServicePageTemplateProps {
  data: ServicePageData;
}

function ServicePageTemplate({ data }: ServicePageTemplateProps) {
  return (
    <>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400,300&display=swap');
      `}</style>

      <HeroSection hero={data.hero} />
      <OverviewSection overview={data.overview} />
      <FeaturesSection features={data.features} />
      {data.process && <ProcessSection process={data.process} />}
      {data.faq && data.faq.length > 0 && <FAQSection faq={data.faq} />}
      <CTASection cta={data.cta} />
    </>
  );
}

export default ServicePageTemplate;